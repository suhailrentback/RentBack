"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function AdminHomePage() {
  return (
    <AppShell role="admin" title="Admin Dashboard">
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Welcome, Admin</h1>
        <p className="text-sm opacity-70">
          Monitor transactions, payouts, and discrepancy reports.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/transactions"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <div className="text-sm font-medium">Transactions</div>
            <div className="text-xs opacity-70 mt-1">
              All tenant payments with filters & CSV export
            </div>
          </Link>

          <Link
            href="/admin/payouts"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <div className="text-sm font-medium">Payouts Overview</div>
            <div className="text-xs opacity-70 mt-1">
              Weekly settlements summary & export
            </div>
          </Link>

          <Link
            href="/admin/discrepancies"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <div className="text-sm font-medium">Discrepancy Report</div>
            <div className="text-xs opacity-70 mt-1">
              Pending > 3 days & other flags with CSV export
            </div>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
