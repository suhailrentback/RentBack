// app/admin/transactions/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { ListSkeleton } from "@/components/Skeletons"; // ✅ use existing export
import { strings, type Lang } from "@/lib/i18n";
import {
  loadPayments,
  formatPKR,
  type DemoPayment,
} from "@/lib/demo";

// Local CSV helper (inline to avoid drift)
function downloadCSV(filename: string, rows: Array<Record<string, any>>) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (val: any) => `"${String(val ?? "").replace(/"/g, '""')}"`;
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

type Status = "PENDING" | "SENT";

export default function AdminTransactionsPage() {
  const [lang] = useState<Lang>("en");
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState<DemoPayment[]>([]);

  // Filters
  const [status, setStatus] = useState<Status | "ALL">("ALL");
  const [month, setMonth] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    setLoading(true);
    const data = loadPayments();
    setAll(data);
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    const [y, m] = month.split("-").map((n) => parseInt(n, 10));
    return all.filter((p) => {
      const dt = new Date(p.createdAt);
      const monthOk = dt.getFullYear() === y && dt.getMonth() + 1 === m;
      const statusOk = status === "ALL" ? true : p.status === status;
      return monthOk && statusOk;
    });
  }, [all, status, month]);

  const onExport = () => {
    const rows = filtered.map((p) => ({
      id: p.id,
      date: new Date(p.createdAt).toISOString(),
      property: p.property,
      amount: p.amount,
      method: p.method,
      status: p.status,
    }));
    downloadCSV(`admin-transactions-${month}.csv`, rows);
  };

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Admin — Transactions</h1>
          <div className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">
            {t.demo}
          </div>
        </div>

        {/* Filters + Export */}
        <div className="flex flex-wrap gap-2 items-end">
          <div>
            <label className="block text-xs opacity-70 mb-1">Month</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs opacity-70 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1 text-sm"
            >
              <option value="ALL">All</option>
              <option value="SENT">Sent</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
          <button
            onClick={onExport}
            className="ml-auto px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
          >
            Export CSV
          </button>
        </div>

        {/* List */}
        {loading ? (
          <ListSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No transactions found"
            body="Try changing the filters or date range."
          />
        ) : (
          <ul className="space-y-2">
            {filtered.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{p.property}</div>
                  <div className="text-xs opacity-70">
                    {new Date(p.createdAt).toLocaleString(
                      lang === "ur" ? "ur-PK" : "en-PK"
                    )}
                    {" • "}
                    {p.method} • {p.status}
                  </div>
                </div>
                <div className="text-sm font-semibold">{formatPKR(p.amount)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MobileAppShell>
  );
}
