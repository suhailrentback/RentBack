"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import EmptyState from "@/components/EmptyState";
import { TableSkel } from "@/components/Skeletons";
import { loadPayments, type DemoPayment } from "@/lib/demo";

function exportCsv(rows: Array<Record<string, unknown>>, filename: string) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      headers
        .map((h) => {
          const cell = r[h];
          const s = cell == null ? "" : String(cell);
          const escaped = s.replace(/"/g, '""');
          return s.includes(",") || s.includes('"') ? `"${escaped}"` : escaped;
        })
        .join(",")
    ),
  ].join("\n");
  const blob = new Blob([lines], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function isOlderThanDays(iso: string, days: number) {
  const dt = new Date(iso).getTime();
  const now = Date.now();
  return now - dt > days * 24 * 60 * 60 * 1000;
}

export default function AdminDiscrepanciesPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<DemoPayment[]>([]);

  useEffect(() => {
    const all = loadPayments();
    const flagged = all.filter(
      (p) => p.status === "PENDING" && isOlderThanDays(p.createdAt, 3)
    );
    setRows(flagged);
    setLoading(false);
  }, []);

  const download = () =>
    exportCsv(
      rows.map((r) => ({
        id: r.id,
        createdAt: r.createdAt,
        property: r.property,
        amount: r.amount,
        method: r.method,
        status: r.status,
        reason: "Pending > 3 days",
      })),
      "admin_discrepancies.csv"
    );

  return (
    <AppShell role="admin" title="Discrepancy Report">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm opacity-70">
            Auto-flagged: payments pending more than 3 days.
          </div>
          <button
            onClick={download}
            className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm"
          >
            Export CSV
          </button>
        </div>

        {loading ? (
          <TableSkel />
        ) : rows.length === 0 ? (
          <EmptyState
            title="No discrepancies"
            body="Great! Nothing is pending beyond the threshold."
            ctaLabel="View Transactions"
            ctaHref="/admin/transactions"
          />
        ) : (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs opacity-70">
                <tr>
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Created</th>
                  <th className="px-3 py-2">Property</th>
                  <th className="px-3 py-2">Method</th>
                  <th className="px-3 py-2">Reason</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-black/5 dark:border-white/5">
                    <td className="px-3 py-2 font-mono text-[11px]">{r.id}</td>
                    <td className="px-3 py-2">
                      {new Date(r.createdAt).toLocaleString("en-PK")}
                    </td>
                    <td className="px-3 py-2">{r.property}</td>
                    <td className="px-3 py-2">{r.method}</td>
                    <td className="px-3 py-2 text-yellow-700 dark:text-yellow-300">
                      Pending &gt; 3 days
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
