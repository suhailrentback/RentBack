// app/admin/transactions/page.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { TableSkel } from "@/components/Skeletons";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, type DemoPayment, formatPKR } from "@/lib/demo";
import { toCSV, downloadCSV } from "@/lib/csv";

type Filter = "ALL" | "SENT" | "PENDING";

export default function AdminTransactionsPage() {
  const lang: Lang = typeof window !== "undefined" && localStorage.getItem("demo-lang") === "ur" ? "ur" : "en";
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [filter, setFilter] = useState<Filter>("ALL");

  useEffect(() => {
    setLoading(true);
    setPayments(loadPayments());
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    if (filter === "ALL") return payments;
    return payments.filter((p) => p.status === filter);
  }, [payments, filter]);

  const exportCSV = () => {
    const csv = toCSV(
      filtered.map((p) => ({
        id: p.id,
        date: p.createdAt,
        property: p.property,
        amount: p.amount,
        method: p.method,
        status: p.status,
      }))
    );
    downloadCSV("admin-transactions.csv", csv);
  };

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Transactions</h1>
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
              className="px-2 py-1 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-sm"
            >
              <option value="ALL">All</option>
              <option value="SENT">{t.tenant.pay.sent}</option>
              <option value="PENDING">{t.tenant.pay.pending}</option>
            </select>
            <button
              onClick={exportCSV}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>

        {loading ? (
          <TableSkel />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No transactions found"
            body="Try widening your date range or filters."
          />
        ) : (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-black/[.03] dark:bg-white/[.03]">
                <tr className="text-left">
                  <th className="p-3">Date</th>
                  <th className="p-3">Property</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-black/5 dark:border-white/10">
                    <td className="p-3">{new Date(p.createdAt).toLocaleString()}</td>
                    <td className="p-3">{p.property}</td>
                    <td className="p-3">{formatPKR(p.amount)}</td>
                    <td className="p-3">{p.method}</td>
                    <td className="p-3">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
