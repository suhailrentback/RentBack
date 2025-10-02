"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { loadPayments, type DemoPayment } from "@/lib/demo";

function downloadCSV(filename: string, rows: string[][]) {
  const csv = rows.map((r) =>
    r
      .map((cell) => {
        const s = String(cell ?? "");
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
      })
      .join(",")
  ).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function LandlordDiscrepanciesPage() {
  const [payments, setPayments] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  // Heuristic discrepancy: PENDING older than 3 days
  const oldPendings = useMemo(() => {
    if (!payments) return [];
    const threeDays = 3 * 24 * 3600 * 1000;
    const now = Date.now();
    return payments.filter(
      (p) => p.status === "PENDING" && now - new Date(p.createdAt).getTime() > threeDays
    );
  }, [payments]);

  function exportCSV() {
    const rows: string[][] = [
      ["id", "createdAt", "property", "method", "amount", "status", "ageDays"],
      ...oldPendings.map((p) => [
        p.id,
        p.createdAt,
        p.property,
        p.method,
        String(p.amount),
        p.status,
        String(Math.floor((Date.now() - new Date(p.createdAt).getTime()) / (24 * 3600 * 1000))),
      ]),
    ];
    downloadCSV(`discrepancies-${new Date().toISOString().slice(0,10)}.csv`, rows);
  }

  return (
    <AppShell role="landlord" title="Discrepancies">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Pending &gt; 3 days</div>
          <button
            onClick={exportCSV}
            disabled={!oldPendings.length}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              oldPendings.length
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-black/20 dark:bg-white/20 text-white/70 cursor-not-allowed"
            }`}
          >
            Export CSV
          </button>
        </div>

        {!payments ? (
          <div className="h-24 rounded-xl bg-black/10 dark:bg-white/10 animate-pulse" />
        ) : oldPendings.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
            <div className="text-sm font-medium">No discrepancies detected</div>
            <div className="text-xs opacity-70 mt-1">Everything looks up-to-date.</div>
          </div>
        ) : (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-black/5 dark:bg-white/10 text-xs">
                <tr className="text-left">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Property</th>
                  <th className="px-4 py-2">Method</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Age (days)</th>
                </tr>
              </thead>
              <tbody>
                {oldPendings.map((p) => (
                  <tr key={p.id} className="border-t border-black/10 dark:border-white/10">
                    <td className="px-4 py-2">
                      {new Date(p.createdAt).toLocaleString("en-PK")}
                    </td>
                    <td className="px-4 py-2">{p.property}</td>
                    <td className="px-4 py-2">{p.method}</td>
                    <td className="px-4 py-2">{`Rs ${Math.round(p.amount).toLocaleString("en-PK")}`}</td>
                    <td className="px-4 py-2">
                      {Math.floor(
                        (Date.now() - new Date(p.createdAt).getTime()) / (24 * 3600 * 1000)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
