"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import EmptyState from "@/components/EmptyState";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, type DemoPayment } from "@/lib/demo";
// Skeletons: use the shared names we standardized to
import { TableSkel } from "@/components/Skeletons";

function formatPKR(v: number) {
  return `Rs ${Math.round(v).toLocaleString("en-PK")}`;
}

// tiny CSV helper (safe & local); if you already have a shared one, you can swap it in.
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
          // escape quotes
          const escaped = s.replace(/"/g, '""');
          // wrap if contains comma or quotes
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

type StatusFilter = "ALL" | "PENDING" | "SENT";

export default function AdminTransactionsPage() {
  const lang: Lang = "en";
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<DemoPayment[]>([]);
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [q, setQ] = useState("");

  useEffect(() => {
    const all = loadPayments();
    setRows(all);
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (status !== "ALL" && r.status !== status) return false;
      if (!q.trim()) return true;
      const hay = `${r.id} ${r.property} ${r.method}`.toLowerCase();
      return hay.includes(q.trim().toLowerCase());
    });
  }, [rows, status, q]);

  const download = () => {
    exportCsv(
      filtered.map((r) => ({
        id: r.id,
        createdAt: r.createdAt,
        property: r.property,
        amount: r.amount,
        method: r.method,
        status: r.status,
      })),
      "transactions.csv"
    );
  };

  return (
    <AppShell role="admin" title="Transactions">
      <div className="p-4 space-y-4">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusFilter)}
              className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              <option value="ALL">All statuses</option>
              <option value="PENDING">Pending</option>
              <option value="SENT">Sent</option>
            </select>
            <input
              placeholder="Search by property or method…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={download}
            className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm"
          >
            Export CSV
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <TableSkel />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No transactions found"
            body="Try widening your filters or clearing search."
            ctaLabel="Reset filters"
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
                  <th className="px-3 py-2 text-right">Amount</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-black/5 dark:border-white/5">
                    <td className="px-3 py-2 font-mono text-[11px]">{r.id}</td>
                    <td className="px-3 py-2">
                      {new Date(r.createdAt).toLocaleString("en-PK")}
                    </td>
                    <td className="px-3 py-2">{r.property}</td>
                    <td className="px-3 py-2">{r.method}</td>
                    <td className="px-3 py-2 text-right">{formatPKR(r.amount)}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded ${
                          r.status === "SENT"
                            ? "bg-emerald-600 text-white"
                            : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                        }`}
                      >
                        {r.status}
                      </span>
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
