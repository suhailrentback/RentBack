"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import EmptyState from "@/components/EmptyState";
import { TableSkel } from "@/components/Skeletons";
import { loadPayments, type DemoPayment } from "@/lib/demo";

function formatPKR(v: number) {
  return `Rs ${Math.round(v).toLocaleString("en-PK")}`;
}

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

// naive weekly bucketing by ISO week
function weekKey(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

type Row = { week: string; total: number; count: number };

export default function AdminPayoutsOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const all = loadPayments().filter((p) => p.status === "SENT");
    const byWeek = new Map<string, { total: number; count: number }>();
    all.forEach((p) => {
      const k = weekKey(new Date(p.createdAt));
      const prev = byWeek.get(k) ?? { total: 0, count: 0 };
      prev.total += p.amount;
      prev.count += 1;
      byWeek.set(k, prev);
    });
    const table = Array.from(byWeek.entries())
      .map(([week, v]) => ({ week, total: v.total, count: v.count }))
      .sort((a, b) => (a.week < b.week ? 1 : -1));
    setRows(table);
    setLoading(false);
  }, []);

  const total = useMemo(() => rows.reduce((s, r) => s + r.total, 0), [rows]);

  const download = () =>
    exportCsv(
      rows.map((r) => ({ week: r.week, count: r.count, total: r.total })),
      "payouts_overview.csv"
    );

  return (
    <AppShell role="admin" title="Payouts Overview">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm opacity-70">
            Settled totals by ISO week (SENT only)
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
            title="No payouts yet"
            body="No SENT payments to aggregate."
            ctaLabel="View Transactions"
            ctaHref="/admin/transactions"
          />
        ) : (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs opacity-70">
                <tr>
                  <th className="px-3 py-2">Week</th>
                  <th className="px-3 py-2">Count</th>
                  <th className="px-3 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.week} className="border-t border-black/5 dark:border-white/5">
                    <td className="px-3 py-2 font-mono text-[11px]">{r.week}</td>
                    <td className="px-3 py-2">{r.count}</td>
                    <td className="px-3 py-2 text-right">{formatPKR(r.total)}</td>
                  </tr>
                ))}
                <tr className="border-t border-black/10 dark:border-white/10 font-medium">
                  <td className="px-3 py-2">Total</td>
                  <td className="px-3 py-2">{rows.reduce((s, r) => s + r.count, 0)}</td>
                  <td className="px-3 py-2 text-right">{formatPKR(total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
