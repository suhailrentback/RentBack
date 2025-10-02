"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import EmptyState from "@/components/EmptyState";
import { TableSkel } from "@/components/Skeletons";
import { loadPayments, type DemoPayment } from "@/lib/demo";

function formatPKR(v: number) {
  return `Rs ${Math.round(v).toLocaleString("en-PK")}`;
}

export default function LandlordLedgerPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<DemoPayment[]>([]);

  useEffect(() => {
    setRows(loadPayments());
    setLoading(false);
  }, []);

  return (
    <AppShell role="landlord" title="Ledger">
      <div className="p-4 space-y-4">
        {loading ? (
          <TableSkel />
        ) : rows.length === 0 ? (
          <EmptyState
            title="No payments yet"
            body="Payments you receive will appear here."
            ctaLabel="Back to Dashboard"
            ctaHref="/landlord"
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
                  <th className="px-3 py-2">Receipt</th>
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
                    <td className="px-3 py-2">
                      {r.status === "SENT" ? (
                        <Link
                          href={`/tenant/receipt/${r.id}`}
                          className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          View receipt
                        </Link>
                      ) : (
                        <span className="text-xs opacity-50">—</span>
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
