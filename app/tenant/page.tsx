"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { localeFor } from "@/lib/i18n";
import {
  loadPayments,
  savePayments,
  type DemoPayment,
  type Method,
  type Status,
} from "@/lib/demo";

export default function TenantPayPage() {
  const { lang, t } = useLang();
  const L = t.tenant.pay;
  const locale = localeFor(lang);

  // demo state
  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [property, setProperty] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<Method>("RAAST");
  const [createdId, setCreatedId] = useState<string | null>(null);

  // hydrate demo payments
  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const lastCreated = useMemo(
    () => (createdId ? payments.find((p) => p.id === createdId) ?? null : null),
    [createdId, payments]
  );

  function formatPKR(n: number) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(n);
  }

  function createPayment() {
    if (!property || amount <= 0) return;

    const id = Math.random().toString(36).slice(2, 8).toUpperCase();
    const now = new Date().toISOString();

    const payment: DemoPayment = {
      id,
      createdAt: now,
      property,
      amount,
      method,
      status: "PENDING" as Status,
    };

    const next = [payment, ...payments];
    savePayments(next);
    setPayments(next);
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

  return (
    <AppShell role="tenant" title={L.title}>
      <div className="p-4 space-y-6">
        {/* Page subtitle moved into content to avoid header duplication */}
        <p className="text-sm opacity-70">{L.subtitle}</p>

        {/* Pay card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/60 dark:bg-white/5">
          <div className="grid gap-3">
            {/* Property */}
            <label className="grid gap-1">
              <span className="text-xs opacity-70">{L.property}</span>
              <input
                type="text"
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                placeholder="e.g., 12-A, Sunset Apartments"
                className="h-11 rounded-xl px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-transparent outline-none"
              />
            </label>

            {/* Amount */}
            <label className="grid gap-1">
              <span className="text-xs opacity-70">{L.amount}</span>
              <input
                type="number"
                value={Number.isFinite(amount) ? amount : 0}
                onChange={(e) => setAmount(parseInt(e.target.value || "0", 10))}
                placeholder="e.g., 75000"
                className="h-11 rounded-xl px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-transparent outline-none"
              />
            </label>

            {/* Method */}
            <label className="grid gap-1">
              <span className="text-xs opacity-70">{L.method}</span>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as Method)}
                className="h-11 rounded-xl px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-transparent outline-none"
              >
                <option value="RAAST">{L.methods.RAAST}</option>
                <option value="BANK">{L.methods.BANK}</option>
                <option value="JAZZCASH">{L.methods.JAZZCASH}</option>
              </select>
            </label>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={createPayment}
                className="h-11 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {L.create}
              </button>
              <button
                type="button"
                onClick={markSent}
                disabled={!createdId}
                className="h-11 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-50"
              >
                {L.markSent}
              </button>

              {/* Status tag for last created */}
              {lastCreated ? (
                <span className="ml-auto text-xs rounded-lg px-2 py-1 border border-black/10 dark:border-white/10">
                  {lastCreated.status === "SENT" ? L.sent : L.pending}
                </span>
              ) : null}
            </div>

            {/* Below-due warning (demo rule: 123000 due) */}
            {amount > 0 && amount < 123000 ? (
              <div className="text-xs text-amber-600 dark:text-amber-400">
                {L.warnBelowDue}
              </div>
            ) : null}
          </div>
        </section>

        {/* Receipt preview (for last created) */}
        {lastCreated ? (
          <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs opacity-70">{L.receipt}</div>
                <div className="text-sm mt-1">
                  {formatPKR(lastCreated.amount)} • {lastCreated.method} •{" "}
                  {new Date(lastCreated.createdAt).toLocaleString(locale, {
                    hour12: lang === "en",
                  })}
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/tenant/receipt/${lastCreated.id}`}
                  className="h-10 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
                >
                  {L.print}
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
