// app/tenant/pay/page.tsx
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { CardSkel } from "@/components/Skeletons";
import { strings, type Lang } from "@/lib/i18n";
import {
  loadPayments,
  savePayments,
  loadRewards,
  saveRewards,
  type DemoPayment,
  type Method,
  type RewardsState,
  formatPKR,
} from "@/lib/demo";

type FormState = {
  property: string;
  amount: string; // keep as string for input
  method: Method;
};

const METHODS: Method[] = ["RAAST", "BANK", "JAZZCASH"];

export default function TenantPayPage() {
  const lang: Lang = typeof window !== "undefined" && localStorage.getItem("demo-lang") === "ur" ? "ur" : "en";
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [form, setForm] = useState<FormState>({ property: "", amount: "", method: "RAAST" });
  const [error, setError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    setLoading(true);
    setPayments(loadPayments());
    setLoading(false);
  }, []);

  const dueHint = useMemo(() => {
    const today = new Date();
    const due = new Date(today.getFullYear(), today.getMonth() + 1, 5, 0, 0, 0);
    return due.toLocaleDateString(lang === "ur" ? "ur-PK" : "en-PK", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, [lang]);

  const validate = (): boolean => {
    if (!form.property.trim()) {
      setError("Please select a property.");
      return false;
    }
    const amt = Number(form.amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      setError("Enter a valid amount.");
      return false;
    }
    setError(null);
    return true;
  };

  const createPayment = () => {
    if (busy.current) return;
    if (!validate()) return;
    busy.current = true;

    const amt = Number(form.amount);
    const id = Math.random().toString(36).slice(2, 9);
    const next: DemoPayment = {
      id,
      createdAt: new Date().toISOString(),
      property: form.property,
      amount: amt,
      method: form.method,
      status: "PENDING",
    };

    const updated = [next, ...loadPayments()];
    savePayments(updated);
    setPayments(updated);
    setCreatedId(id);
    setTimeout(() => (busy.current = false), 400); // debounce window
  };

  const markSent = () => {
    if (!createdId) return;
    const all = loadPayments();
    const next = all.map((p) => (p.id === createdId ? { ...p, status: "SENT" } : p));
    savePayments(next);
    setPayments(next);

    // +1% rewards credit
    const just = next.find((p) => p.id === createdId);
    if (just && just.status === "SENT") {
      const add = Math.round(just.amount * 0.01);
      const rewards = loadRewards();
      const entry = {
        id: Math.random().toString(36).slice(2, 9),
        type: "EARN" as const,
        points: add,
        createdAt: new Date().toISOString(),
      };
      const updated: RewardsState = {
        balance: rewards.balance + add,
        activity: [entry, ...rewards.activity],
      };
      saveRewards(updated);
    }
  };

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.tenant.pay.title}</h1>
          <span className="text-xs opacity-70">
            Due around: <strong>{dueHint}</strong>
          </span>
        </div>

        {loading ? (
          <CardSkel />
        ) : payments.length === 0 ? (
          <EmptyState
            title={t.tenant.pay.subtitle}
            body="Create a payment and mark as sent to generate a receipt."
            ctaLabel={t.tenant.home.quickPay}
            ctaHref="#pay-form"
          />
        ) : null}

        <section id="pay-form" className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5 space-y-4">
          <div>
            <label className="text-sm">{t.tenant.pay.property}</label>
            <select
              value={form.property}
              onChange={(e) => setForm((f) => ({ ...f, property: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2"
            >
              <option value="">Select…</option>
              <option value="Apt 12 — Park View">Apt 12 — Park View</option>
              <option value="House 5 — Zamzama">House 5 — Zamzama</option>
              <option value="Unit B — Gulshan">Unit B — Gulshan</option>
            </select>
          </div>

          <div>
            <label className="text-sm">{t.tenant.pay.amount}</label>
            <input
              inputMode="numeric"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="text-sm">{t.tenant.pay.method}</label>
            <div className="mt-2 flex gap-2">
              {METHODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setForm((f) => ({ ...f, method: m }))}
                  className={`px-3 py-1 rounded-lg border text-sm ${
                    form.method === m
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-black/10 dark:border-white/10 bg-white dark:bg-white/5"
                  }`}
                >
                  {t.tenant.pay.methods[m]}
                </button>
              ))}
            </div>
          </div>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <div className="flex items-center gap-2">
            <button
              onClick={createPayment}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
              disabled={busy.current}
            >
              {t.tenant.pay.create}
            </button>
            <button
              onClick={markSent}
              className="px-4 py-2 rounded-lg border border-emerald-600 text-emerald-700 dark:text-emerald-300 text-sm"
              disabled={!createdId}
              title={createdId ? "" : "Create a payment first"}
            >
              {t.tenant.pay.markSent}
            </button>
          </div>

          {createdId ? (
            <div className="text-xs opacity-80">
              Created payment <strong>{createdId}</strong>. After “{t.tenant.pay.markSent}”, you’ll see +1% rewards and a receipt.
            </div>
          ) : null}
        </section>

        {payments.length > 0 ? (
          <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-sm font-medium">{t.tenant.home.lastPayment}</div>
            <div className="mt-2 text-sm opacity-80">
              {payments[0].property} — {formatPKR(payments[0].amount)} — {payments[0].status}
            </div>
          </section>
        ) : null}
      </div>
    </MobileAppShell>
  );
}
