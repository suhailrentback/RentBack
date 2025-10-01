// app/tenant/pay/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { ListSkeleton } from "@/components/Skeletons";
import { strings, type Lang } from "@/lib/i18n";
import {
  formatPKR,
  loadPayments,
  savePayments,
  loadRewards,
  saveRewards,
  type DemoPayment,
  type Method,
  type RewardsState,
  type RewardActivity,
} from "@/lib/demo";
import Link from "next/link";

type Status = "PENDING" | "SENT";

export default function TenantPayPage() {
  const [lang] = useState<Lang>("en");
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<DemoPayment[]>([]);

  const [property, setProperty] = useState("Gulshan 12A — Apt 4B");
  const [amount, setAmount] = useState<number>(65000);
  const [method, setMethod] = useState<Method>("RAAST");
  const [error, setError] = useState<string | null>(null);

  const creating = useRef(false);
  const marking = useRef<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const p = loadPayments();
    setPayments(p);
    const last = p[0];
    if (last) {
      setProperty(last.property);
      setAmount(last.amount);
      setMethod(last.method);
    }
    setLoading(false);
  }, []);

  const suggestedAmount = 65000;
  const warnBelowDue = amount < suggestedAmount;

  function createPayment() {
    if (creating.current) return;
    setError(null);

    if (!property) return setError("Please select a property.");
    if (!amount || amount <= 0) return setError("Enter a valid amount.");
    if (!method) return setError("Select a payment method.");

    creating.current = true;

    const newP: DemoPayment = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      property,
      amount: Math.round(amount),
      method,
      status: "PENDING",
    };

    const next = [newP, ...payments];
    setPayments(next);
    savePayments(next);

    setTimeout(() => {
      creating.current = false;
    }, 300);
  }

  function markSent(id: string) {
    if (marking.current === id) return;
    marking.current = id;

    // Update payment status
    const next = payments.map((p) =>
      p.id === id ? { ...p, status: "SENT" as Status } : p
    );
    setPayments(next);
    savePayments(next);

    // Credit +1% rewards on SENT — conform to RewardActivity shape
    const credited = next.find((p) => p.id === id);
    if (credited) {
      const current: RewardsState = loadRewards();
      const add = Math.floor(credited.amount * 0.01);

      const earnEntry: RewardActivity = {
        id: crypto.randomUUID(),
        type: "EARN",
        points: add,
        createdAt: new Date().toISOString(),
        ref: id,
      };

      const updated: RewardsState = {
        balance: (current.balance || 0) + add,
        activity: [earnEntry, ...(current.activity || [])],
      };

      saveRewards(updated);
    }

    setTimeout(() => {
      marking.current = null;
    }, 300);
  }

  const pending = useMemo(
    () => payments.filter((p) => p.status === "PENDING"),
    [payments]
  );
  const sent = useMemo(
    () => payments.filter((p) => p.status === "SENT"),
    [payments]
  );

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{t.tenant.pay.title}</h1>
            <div className="text-xs opacity-70">{t.tenant.pay.subtitle}</div>
          </div>
          <div className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">
            {t.demo}
          </div>
        </div>

        {/* Form */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="grid gap-3">
            <div>
              <label className="block text-xs opacity-70 mb-1">
                {t.tenant.pay.property}
              </label>
              <select
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-2 text-sm"
              >
                <option>Gulshan 12A — Apt 4B</option>
                <option>Clifton Block 5 — House 27</option>
              </select>
            </div>

            <div>
              <label className="block text-xs opacity-70 mb-1">
                {t.tenant.pay.amount}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value || "0", 10))}
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-2 text-sm"
                placeholder="65000"
              />
              {warnBelowDue && (
                <div className="mt-1 text-xs text-amber-600">
                  {t.tenant.pay.warnBelowDue}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs opacity-70 mb-1">
                {t.tenant.pay.method}
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as Method)}
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-2 text-sm"
              >
                <option value="RAAST">{t.tenant.pay.methods.RAAST}</option>
                <option value="BANK">{t.tenant.pay.methods.BANK}</option>
                <option value="JAZZCASH">{t.tenant.pay.methods.JAZZCASH}</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-2 text-xs text-red-600">{error}</div>
          )}

          <button
            onClick={createPayment}
            className="mt-3 inline-flex items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2"
          >
            {t.tenant.pay.create}
          </button>
        </section>

        {/* Pending */}
        <section>
          <div className="text-xs opacity-70 mb-2">Pending</div>
          {loading ? (
            <ListSkeleton />
          ) : pending.length === 0 ? (
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-xs opacity-70">
              No pending payments.
            </div>
          ) : (
            <ul className="space-y-2">
              {pending.map((p) => (
                <li
                  key={p.id}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{p.property}</div>
                    <div className="text-xs opacity-70">
                      {new Date(p.createdAt).toLocaleString(
                        lang === "ur" ? "ur-PK" : "en-PK"
                      )}{" "}
                      • {p.method}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{formatPKR(p.amount)}</div>
                    <button
                      onClick={() => markSent(p.id)}
                      className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      {t.tenant.pay.markSent}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Sent */}
        <section>
          <div className="text-xs opacity-70 mb-2">Sent</div>
          {loading ? (
            <ListSkeleton />
          ) : sent.length === 0 ? (
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-xs opacity-70">
              No sent payments yet.
            </div>
          ) : (
            <ul className="space-y-2">
              {sent.map((p) => (
                <li
                  key={p.id}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{p.property}</div>
                    <div className="text-xs opacity-70">
                      {new Date(p.createdAt).toLocaleString(
                        lang === "ur" ? "ur-PK" : "en-PK"
                      )}{" "}
                      • {p.method}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{formatPKR(p.amount)}</div>
                    <Link
                      href={`/tenant/receipt/${p.id}`}
                      className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      {t.tenant.pay.receipt}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </MobileAppShell>
  );
}
