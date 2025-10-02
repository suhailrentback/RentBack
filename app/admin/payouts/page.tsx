"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { exportToCSV } from "@/lib/csv";
import { TableSkel } from "@/components/Skeletons";

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function AdminPayoutsPage() {
  const { lang } = useLang();

  const [rows, setRows] = useState<DemoPayment[] | null>(null);
  useEffect(() => setRows(loadPayments().filter((p) => p.status === "SENT")), []);

  const csv = useMemo(
    () =>
      (rows ?? []).map((r) => ({
        id: r.id,
        createdAt: new Date(r.createdAt).toLocaleString(lang === "ur" ? "ur-PK" : "en-PK"),
        property: r.property,
        method: r.method,
        amount: r.amount,
        status: r.status,
      })),
    [rows, lang]
  );

  return (
    <AppShell role="admin" title="Payouts">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Payouts</h1>
          <button
            onClick={() => exportToCSV(csv, "admin_payouts")}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
          >
            CSV
          </button>
        </div>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
          {rows === null ? (
            <TableSkel rows={8} />
          ) : rows.length === 0 ? (
            <div className="text-sm opacity-70">No payouts yet.</div>
          ) : (
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {rows.map((p) => (
                <li key={p.id} className="p-3 grid grid-cols-5 gap-2 items-center">
                  <div className="text-xs opacity-70 col-span-2">
                    {new Date(p.createdAt).toLocaleString(lang === "ur" ? "ur-PK" : "en-PK")}
                  </div>
                  <div className="text-sm font-medium">{p.property}</div>
                  <div className="text-xs opacity-70">{p.method}</div>
                  <div className="text-sm font-semibold text-right">{formatPKR(p.amount)}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
