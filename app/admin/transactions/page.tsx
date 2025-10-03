"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { localeFor } from "@/lib/i18n";
import { exportToCSV } from "@/lib/csv";

const formatPKR = (v: number, locale: Intl.LocalesArgument) =>
  `Rs ${Math.round(v).toLocaleString(locale)}`;

export default function AdminTransactionsPage() {
  const { lang } = useLang();
  const title = lang === "ur" ? "ٹرانزیکشنز" : "Transactions";
  const locale = useMemo(() => localeFor(lang), [lang]);

  const [rows, setRows] = useState<DemoPayment[] | null>(null);
  useEffect(() => {
    setRows(loadPayments());
  }, []);

  const csv = useMemo(
    () =>
      (rows ?? []).map((p) => ({
        id: p.id,
        date: new Date(p.createdAt).toLocaleString(locale),
        property: p.property,
        method: p.method,
        amount: p.amount,
        status: p.status,
      })),
    [rows, locale]
  );

  return (
    <AppShell role="admin" title={title}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm disabled:opacity-50"
            disabled={!rows}
            onClick={() => exportToCSV(csv, "admin_transactions")}
          >
            CSV
          </button>
        </div>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
          {!rows ? (
            <div className="space-y-2">
              <div className="h-9 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
              <div className="h-9 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
              <div className="h-9 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
            </div>
          ) : rows.length === 0 ? (
            <div className="text-sm opacity-70">
              {lang === "ur" ? "کوئی ٹرانزیکشن موجود نہیں۔" : "No transactions."}
            </div>
          ) : (
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {rows.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-2 py-2">
                  <div className="flex flex-col">
                    <div className="font-medium">{p.property}</div>
                    <div className="text-xs opacity-70">
                      {new Date(p.createdAt).toLocaleString(locale)} • {p.method} • {p.status}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{formatPKR(p.amount, locale)}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
