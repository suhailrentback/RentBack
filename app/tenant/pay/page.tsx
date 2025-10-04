"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import {
  loadPayments,
  savePayments,
  type DemoPayment,
  type Method,
  type Status,
} from "@/lib/demo";

export default function TenantPayPage() {
  const { t, locale } = useLang();

  // form state
  const [property, setProperty] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [method, setMethod] = useState<Method>("RAAST");

  // demo data
  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [createdId, setCreatedId] = useState<string | null>(null);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const warnBelowDue = useMemo(() => {
    // demo: due is 123000 everywhere
    const due = 123000;
    const a = typeof amount === "number" ? amount : 0;
    return a > 0 && a < due;
  }, [amount]);

  function createPayment() {
    if (!property || !amount || Number(amount) <= 0) return;
    const id = Math.random().toString(36).slice(2, 10);
    const now = new Date().toISOString();

    const next: DemoPayment = {
      id,
      createdAt: now,
      property,
      amount: Number(amount),
      method,
      status: "PENDING" as Status,
    };

    const all = [...payments, next];
    savePayments(all);
    setPayments(all);
    setCreatedId(id);
  }

  function markSent() {
    if (!createdId) return;
    const all = loadPayments();
    const next = all.map((p) =>
      p.id === createdId ? { ...p, status: "SENT" as Status } : p
    );
    savePayments(next);
    setPayments(next);
  }

  const last = payments.slice().reverse()[0];

  return (
    <AppShell role="tenant" title={t.tenant.pay.title}>
      {/* Subtitle moved inside page content (no duplication, no prop) */}
      <div className="px-4 pt-2 text-sm opacity-70">{t.tenant.pay.subtitle}</div>

      <div className="p-4 space-y-6">
        {/* Pay card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/60 dark:bg-white/5">
          <div className="grid gap-3">
            <label className="text-sm font-medium">
              {t.tenant.pay.property}
              <input
                type="text"
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                placeholder="e.g., 12-A, Sunset Apartments"
                className="mt-1 w-full h-11 rounded-xl px-3 border border-black/10 dark:border-white/10 bg-white/80 dark:bg-transparent"
              />
            </label>

            <label className="text-sm font-medium">
              {t.tenant.pay.amount}
              <input
                type="number"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g., 75000"
                className="mt-1 w-full h-11 rounded-xl px-3 border border-black/10 dark:border-white/10 bg-white/80 dark:bg-transparent"
              />
            </label>

            <label className="text-sm font-medium">
              {t.tenant.pay.method}
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as Method)}
                className="mt-1 w-full h-11 rounded-xl px-3 border border-black/10 dark:border-white/10 bg-white/80 dark:bg-transparent"
              >
                <option value="RAAST">{t.tenant.pay.methods.RAAST}</option>
                <option value="BANK">{t.tenant.pay.methods.BANK}</option>
                <option value="JAZZCASH">{t.tenant.pay.methods.JAZZCASH}</option>
              </select>
            </label>

            {warnBelowDue && (
              <div className="text-xs text-amber-700 dark:text-amber-300">
                {t.tenant.pay.warnBelowDue}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={createPayment}
                className="h-11 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {t.tenant.pay.create}
              </button>
              <button
                type="button"
                onClick={markSent}
                className="h-11 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                disabled={!createdId}
                aria-disabled={!createdId}
                title={!createdId ? "Create a payment first" : ""}
              >
                {t.tenant.pay.markSent}
              </button>
            </div>
          </div>
        </section>

        {/* Last Payment */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm font-medium mb-2">{t.tenant.home.lastPayment}</div>
          {last ? (
            <div className="text-sm opacity-80">
              {new Intl.NumberFormat(locale, {
                style: "currency",
                currency: "PKR",
                maximumFractionDigits: 0,
              }).format(last.amount)}{" "}
              • {last.method} •{" "}
              {new Date(last.createdAt).toLocaleString(locale)}
            </div>
          ) : (
            <div className="text-sm opacity-60">—</div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
