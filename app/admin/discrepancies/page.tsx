"use client";

import AppShell from "@/components/AppShell";
import { useEffect, useState } from "react";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { useLang } from "@/hooks/useLang";
import { exportToCSV } from "@/lib/csv";
import { TableSkel } from "@/components/Skeletons";

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function AdminDiscrepanciesPage() {
  const { lang, locale } = useLang();
  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    setRows(loadPayments().filter((r) => r.status !== "SENT"));
  }, []);

  const L = lang === "ur"
    ? { title: "غیر مطابقتیں", export: "CSV", empty: "کوئی غیر مطابقت نہیں۔" }
    : { title: "Discrepancies", export: "CSV", empty: "No discrepancies." };

  const handleExport = () => {
    if (!rows) return;
    const data = rows.map((r) => ({
      id: r.id,
      createdAt: new Date(r.createdAt).toLocaleString(locale),
      property: r.property,
      method: r.method,
      amount: r.amount,
      status: r.status,
    }));
    exportToCSV(data, "admin_discrepancies");
  };

  return (
    <AppShell role="admin" title={L.title}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-end">
          <button
            onClick={handleExport}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
          >
            {L.export}
          </button>
        </div>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
          {rows === null ? (
            <TableSkel rows={8} />
          ) : rows.length === 0 ? (
            <div className="text-sm opacity-70">{L.empty}</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-black/5 dark:bg-white/5 text-xs uppercase tracking-wide">
                <tr className="text-left">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Property</th>
                  <th className="px-3 py-2">Method</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-t border-black/10 dark:border-white/10">
                    <td className="px-3 py-2">{new Date(p.createdAt).toLocaleString(locale)}</td>
                    <td className="px-3 py-2">{p.property}</td>
                    <td className="px-3 py-2">{p.method}</td>
                    <td className="px-3 py-2">{formatPKR(p.amount)}</td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          p.status === "SENT"
                            ? "text-[11px] px-2 py-0.5 rounded bg-emerald-600 text-white"
                            : "text-[11px] px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                        }
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </AppShell>
  );
}
