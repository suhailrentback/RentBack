"use client";

import AppShell from "@/components/AppShell";
import { useEffect, useMemo, useState } from "react";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { useLang } from "@/hooks/useLang";
import { exportToCSV } from "@/lib/csv";
import { TableSkel } from "@/components/Skeletons";

export default function LandlordDiscrepanciesPage() {
  const { lang, locale } = useLang();
  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    // Demo “discrepancies” == PENDING
    setRows(loadPayments().filter((r) => r.status !== "SENT"));
  }, []);

  const L = lang === "ur"
    ? { title: "غیر مطابقتیں", export: "CSV" }
    : { title: "Discrepancies", export: "CSV" };

  const csv = useMemo(() => {
    if (!rows) return "";
    const header = ["id", "createdAt", "property", "method", "amount", "status"];
    const body = rows.map((r) => [
      r.id,
      new Date(r.createdAt).toLocaleString(locale),
      r.property,
      r.method,
      String(r.amount),
      r.status,
    ]);
    return [header, ...body].map((a) => a.map((s) => `"${String(s).replace(/"/g, '""')}"`).join(",")).join("\n");
  }, [rows, locale]);

  return (
    <AppShell role="landlord" title={L.title}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{L.title}</h1>
          <button
            onClick={() => exportToCSV(csv, "landlord_discrepancies")}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
          >
            {L.export}
          </button>
        </div>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
          {rows === null ? (
            <TableSkel rows={8} />
          ) : rows.length === 0 ? (
            <div className="text-sm opacity-70">No discrepancies.</div>
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
                    <td className="px-3 py-2">{`Rs ${Math.round(p.amount).toLocaleString("en-PK")}`}</td>
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
