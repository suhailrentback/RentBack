// app/admin/transactions/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { TableSkeleton } from "@/components/Skeletons";
import { strings, type Lang } from "@/lib/i18n";
import {
  type DemoPayment,
  type Method,
  loadPayments,
  formatPKR,
} from "@/lib/demo";
import { toCSV, downloadCSV } from "@/lib/csv";

type Filters = {
  q: string;
  method: "ALL" | Method;
  status: "ALL" | "PENDING" | "SENT";
};

export default function AdminTransactionsPage() {
  const lang: Lang = "en";
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState<DemoPayment[]>([]);
  const [filters, setFilters] = useState<Filters>({
    q: "",
    method: "ALL",
    status: "ALL",
  });

  useEffect(() => {
    setAll(loadPayments());
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    return all
      .filter((p) =>
        filters.method === "ALL" ? true : p.method === filters.method
      )
      .filter((p) =>
        filters.status === "ALL" ? true : p.status === filters.status
      )
      .filter((p) => {
        const q = filters.q.trim().toLowerCase();
        if (!q) return true;
        return (
          p.id.toLowerCase().includes(q) ||
          p.property.toLowerCase().includes(q) ||
          p.method.toLowerCase().includes(q)
        );
      });
  }, [all, filters]);

  const exportCSV = () => {
    const rows = filtered.map((p) => ({
      id: p.id,
      createdAt: p.createdAt,
      status: p.status,
      property: p.property,
      amount: p.amount,
      method: p.method,
    }));
    downloadCSV("transactions.csv", toCSV(rows));
  };

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Transactions</h1>
          <button
            onClick={exportCSV}
            className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700"
          >
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <input
            placeholder="Search by id/property/method"
            className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:border-white/10"
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
          />
          <select
            className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:border-white/10"
            value={filters.method}
            onChange={(e) =>
              setFilters((f) => ({ ...f, method: e.target.value as Filters["method"] }))
            }
          >
            <option value="ALL">All methods</option>
            <option value="RAAST">Raast</option>
            <option value="BANK">Bank</option>
            <option value="JAZZCASH">JazzCash</option>
          </select>
          <select
            className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:border-white/10"
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value as Filters["status"] }))
            }
          >
            <option value="ALL">All status</option>
            <option value="PENDING">Pending</option>
            <option value="SENT">Sent</option>
          </select>
        </div>

        {/* List */}
        {loading ? (
          <TableSkeleton />
        ) : !filtered.length ? (
          <EmptyState
            title="No transactions found"
            body="Try widening your filters."
          />
        ) : (
          <ul className="divide-y divide-black/10 dark:divide-white/10 rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
            {filtered.map((p) => (
              <li key={p.id} className="flex items-center justify-between p-3 text-sm">
                <div>
                  <div className="font-medium">{p.property}</div>
                  <div className="text-xs opacity-70">
                    {p.method} • {new Date(p.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPKR(p.amount)}</div>
                  <div className="text-xs opacity-70">{p.status}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MobileAppShell>
  );
}
