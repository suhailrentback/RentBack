"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { loadPayments, type DemoPayment } from "@/lib/demo";

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

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

export default function LandlordPayoutsPage() {
  const [payments, setPayments] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const { sent30, pending, total30 } = useMemo(() => {
    if (!payments) return { sent30: [], pending: [], total30: 0 };
    const now = Date.now();
    const days30 = 30 * 24 * 3600 * 1000;
    const sent = payments.filter((p) => p.status === "SENT");
    const sentIn30 = sent.filter((p) => now - new Date(p.createdAt).getTime() <= days30);
    const total = sentIn30.reduce((sum, p) => sum + p.amount, 0);
    const pend = payments.filter((p) => p.status === "PENDING");
    return { sent30: sentIn30, pending: pend, total30: total };
  }, [payments]);

  function exportCSV() {
    if (!payments) return;
    const rows: string[][] = [
      ["id", "createdAt", "property", "method", "amount", "status"],
      ...payments.map((p) => [
        p.id,
        p.createdAt,
        p.property,
        p.method,
        String(p.amount),
        p.status,
      ]),
    ];
    downloadCSV(`payouts-${new Date().toISOString().slice(0,10)}.csv`, rows);
  }

  return (
    <AppShell role="landlord" title="Payouts">
      <div className="p-4 space-y-4">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">Sent in last 30 days</div>
            <div className="mt-2 text-2xl font-semibold">{formatPKR(total30)}</div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">Payments sent (30d)</div>
            <div className="mt-2 text-2xl font-semibold">{sent30.length}</div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">Pending confirmations</div>
            <div className="mt-2 text-2xl font-semibold">{pending.length}</div>
          </div>
        </div>

        {/* Export */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">All Payments</div>
          <button
            onClick={exportCSV}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
          >
            Export CSV
          </button>
        </div>

        {/* Table */}
        {!payments ? (
          <div className="h-24 rounded-xl bg-black/10 dark:bg-white/10 animate-pulse" />
        ) : payments.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
            <div className="text-sm font-medium">No payments yet</div>
            <div className="text-xs opacity-70 mt-1">Create or receive payments to see payouts.</div>
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
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {[...payments]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((p) => (
                    <tr key={p.id} className="border-t border-black/10 dark:border-white/10">
                      <td className="px-4 py-2">
                        {new Date(p.createdAt).toLocaleString("en-PK")}
                      </td>
                      <td className="px-4 py-2">{p.property}</td>
                      <td className="px-4 py-2">{p.method}</td>
                      <td className="px-4 py-2 font-medium">{formatPKR(p.amount)}</td>
                      <td className="px-4 py-2">{p.status}</td>
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
