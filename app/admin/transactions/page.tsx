"use client";

import { useMemo, useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { TableSkel } from "@/components/Skeletons";
import { loadPayments, type DemoPayment } from "@/lib/demo";

type Filters = {
  method: "ALL" | "RAAST" | "BANK" | "JAZZCASH";
  status: "ALL" | "PENDING" | "SENT";
};

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function AdminTransactionsPage() {
  const [rows, setRows] = useState<DemoPayment[] | null>(null);
  const [filters, setFilters] = useState<Filters>({ method: "ALL", status: "ALL" });

  useEffect(() => {
    setRows(loadPayments());
  }, []);

  const filtered = useMemo(() => {
    if (!rows) return null;
    return rows.filter((r) => {
      const m = filters.method === "ALL" || r.method === filters.method;
      const s = filters.status === "ALL" || r.status === filters.status;
      return m && s;
    });
  }, [rows, filters]);

  return (
    <AppShell role="admin" title="Transactions">
      <div className="p-4 space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            className="px-2 py-1 rounded-lg border border-black/10 dark:border-white/10 text-sm bg-transparent"
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
            className="px-2 py-1 rounded-lg border border-black/10 dark:border-white/10 text-sm bg-transparent"
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value as Filters["status"] }))
            }
          >
            <option value="ALL">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="SENT">Sent</option>
          </select>
        </div>

        {/* Table */}
        {filtered === null ? (
          <TableSkel />
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-sm opacity-70">
            No transactions found.
          </div>
        ) : (
          <ul className="space-y-2">
            {filtered.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
              >
                <div className="text-sm">
                  <div className="font-medium">{p.property}</div>
                  <div className="text-xs opacity-70">
                    {new Date(p.createdAt).toLocaleString("en-PK")} • {p.method} • {p.status}
                  </div>
                </div>
                <div className="text-sm font-semibold">{formatPKR(p.amount)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
