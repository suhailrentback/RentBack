"use client";

import AppShell from "@/components/AppShell";
import Link from "next/link";

export default function AdminHomePage() {
  return (
    <AppShell role="admin" title="Admin Dashboard">
      <div className="p-4 space-y-5">
        <p className="text-sm opacity-70">Ops overview & quick links</p>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="text-sm font-medium">Transactions</div>
            <p className="text-xs opacity-70 mt-1">
              Filter & review tenant payments.
            </p>
            <div className="mt-3">
              <Link href="/admin/transactions" className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm">
                Open
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="text-sm font-medium">Payouts Overview</div>
            <p className="text-xs opacity-70 mt-1">
              Export payout batches.
            </p>
            <div className="mt-3">
              <Link href="/admin/payouts" className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm">
                Open
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="text-sm font-medium">Discrepancy Report</div>
            <p className="text-xs opacity-70 mt-1">
              Export reconciliation issues.
            </p>
            <div className="mt-3">
              <Link href="/admin/discrepancies" className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm">
                Open
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
