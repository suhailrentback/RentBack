"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function LandlordHomePage() {
  return (
    <AppShell role="landlord" title="Landlord Dashboard">
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Welcome, Landlord</h1>
        <p className="text-sm opacity-70">
          Manage your properties, track payouts, and review tenant payments.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/landlord/ledger"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <div className="text-sm font-medium">Ledger</div>
            <div className="text-xs opacity-70 mt-1">
              View all rent payments and receipts
            </div>
          </Link>

          <Link
            href="/landlord/payouts"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <div className="text-sm font-medium">Payouts</div>
            <div className="text-xs opacity-70 mt-1">
              Weekly settlement summaries & export
            </div>
          </Link>

          <Link
            href="/landlord/properties"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <div className="text-sm font-medium">Properties</div>
            <div className="text-xs opacity-70 mt-1">
              Manage your rental units and tenants
            </div>
          </Link>

          <Link
            href="/landlord/discrepancies"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <div className="text-sm font-medium">Discrepancies</div>
            <div className="text-xs opacity-70 mt-1">
              Flagged payments pending more than 3 days
            </div>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
