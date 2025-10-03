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

const formatPKR = (v: number, locale: Intl.LocalesArgument) =>
  `Rs ${Math.round(v).toLocaleString(locale)}`;

export default function TenantPayPage() {
  const { t, locale } = useLang();

  // form state
  const [property, setProperty] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [method, setMethod] = useState<Method>("RAAST");

  // data state
  const [payments, setPayments] = useState<DemoPayment[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [markingId, setMarkingId] = useState<string | null>(null);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const dueAmount = 65000; // demo constant
  const belowDueWarning = useMemo(() => {
    if (amount === "") return false;
    return Number(amount) < dueAmount;
  }, [amount]);

  const createPayment = async () => {
    if (!property || amount === "" || Number(amount) <= 0) return;
    setCreating(true);

    // make new demo payment
    const created: DemoPayment = {
      id: Math.random().toString(36).slice(2, 9).toUpperCase(),
      createdAt: new Date().toISOString(),
      property,
      amount: Number(amount),
      method,
      status: "PENDING" as Status,
    };

    const next = [created, ...(payments ?? [])];
    savePayments(next);
    setPayments(next);
    setCreating(false);

    // reset form
    setProperty("");
    setAmount("");
    setMethod("RAAST");
  };

  const markSent = async (id: string) => {
    if (!payments) return;
    setMarkingId(id);

    const next = payments.map((p) => (p.id === id ? { ...p, status: "SENT" as Status } : p));
    savePayments(next);
    setPayments(next);

    setMarkingId(null);
  };

  return (
    <AppShell role="tenant" title={t.tenant.pay.title} subtitle={t.tenant.pay.subtitle}>
      <div className="p-4 space-y-6">
        {/* Pay card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/60 dark:bg-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Property */}
            <label className="flex flex-col gap-1">
              <span className="text-xs opacity-70">{t.tenant.pay.property}</span>
              <input
                className="px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 outline-none"
                placeholder="e.g., 12-A, Sunset Apartments"
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              />
            </label>

            {/* Amount */}
            <label className="flex flex-col gap-1">
              <span className="text-xs opacity-70">{t.tenant.pay.amount}</span>
              <input
                className="px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 outline-none"
                placeholder="e.g., 75000"
                inputMode="numeric"
                value={amount}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "");
                  setAmount(v === "" ? "" : Number(v));
                }}
              />
              {belowDueWarning && (
                <span className="text-xs text-amber-600 dark:text-amber-400">
                  {t.tenant.pay.warnBelowDue}
                </span>
              )}
            </label>

            {/* Method */}
            <label className="flex flex-col gap-1">
              <span className="text-xs opacity-70">{t.tenant.pay.method}</span>
              <select
                className="px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 outline-none"
                value={method}
                onChange={(e) => setMethod(e.target.value as Method)}
              >
                <option value="RAAST">{t.tenant.pay.methods.RAAST}</option>
                <option value="BANK">{t.tenant.pay.methods.BANK}</option>
                <option value="JAZZCASH">{t.tenant.pay.methods.JAZZCASH}</option>
              </select>
            </label>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={createPayment}
              disabled={creating || !property || amount === "" || Number(amount) <= 0}
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm"
            >
              {t.tenant.pay.create}
            </button>
            {amount !== "" && (
              <span className="text-xs opacity-70">
                {formatPKR(Number(amount), locale)}
              </span>
            )}
          </div>
        </section>

        {/* Recent payments */}
        <section className="space-y-2">
          <h3 className="text-sm font-semibold opacity-80">{t.tenant.pay.receipt}</h3>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
            {/* header row */}
            <div className="grid grid-cols-5 gap-2 px-3 py-2 text-xs opacity-70">
              <div>{t.tenant.receipt.details.property}</div>
              <div className="text-right">{t.tenant.receipt.details.amount}</div>
              <div>{t.tenant.receipt.details.method}</div>
              <div>{t.tenant.receipt.details.date}</div>
              <div className="text-right">{t.tenant.receipt.details.status}</div>
            </div>
            <div className="h-px bg-black/10 dark:bg-white/10" />
            {/* rows */}
            {payments === null ? (
              <div className="p-3">
                <div className="h-6 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
              </div>
            ) : payments.length === 0 ? (
              <div className="p-3 text-sm opacity-70">{t.tenant.rewards.empty}</div>
            ) : (
              payments.map((p) => (
                <div key={p.id} className="grid grid-cols-5 gap-2 px-3 py-2 text-sm items-center">
                  <div className="truncate">{p.property}</div>
                  <div className="text-right">{formatPKR(p.amount, locale)}</div>
                  <div className="truncate">{t.tenant.pay.methods[p.method]}</div>
                  <div className="truncate">
                    {new Date(p.createdAt).toLocaleString(locale)}
                  </div>
                  <div className="text-right flex items-center justify-end gap-2">
                    <span
                      className={
                        p.status === "SENT"
                          ? "text-emerald-600 font-medium"
                          : "text-yellow-700 dark:text-yellow-300 font-medium"
                      }
                    >
                      {p.status === "SENT" ? t.tenant.pay.sent : t.tenant.pay.pending}
                    </span>
                    {p.status !== "SENT" && (
                      <button
                        onClick={() => markSent(p.id)}
                        disabled={markingId === p.id}
                        className="px-2 py-1 rounded-md border border-black/10 dark:border-white/10 text-xs"
                      >
                        {t.tenant.pay.markSent}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
