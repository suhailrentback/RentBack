"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { loadPayments, type DemoPayment } from "@/lib/demo";

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function LandlordLedgerPage() {
  const [payments, setPayments] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const rows = useMemo(() => {
    if (!payments) return [];
    return [...payments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [payments]);

  return (
    <AppShell role="landlord" title="Ledger">
      <div className="p-4 space-y-4">
        {!payments ? (
          <div className="h-24 rounded-xl bg-black/10 dark:bg-white/10 animate-pulse" />
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
            <div className="text-sm font-medium">No transactions yet</div>
            <div className="text-xs opacity-70 mt-1">New payments will appear here.</div>
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
                  <th className="px-4 py-2">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-t border-black/10 dark:border-white/10">
                    <td className="px-4 py-2">
                      {new Date(p.createdAt).toLocaleString("en-PK")}
                    </td>
                    <td className="px-4 py-2">{p.property}</td>
                    <td className="px-4 py-2">{p.method}</td>
                    <td className="px-4 py-2 font-medium">{formatPKR(p.amount)}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded ${
                          p.status === "SENT"
                            ? "bg-emerald-600 text-white"
                            : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        href={`/tenant/receipt/${p.id}`}
                        className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        View receipt
                      </Link>
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
