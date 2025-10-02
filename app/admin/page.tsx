// app/admin/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, type DemoPayment, formatPKR } from "@/lib/demo";

export default function AdminHomePage() {
  const lang: Lang = "en";
  const t = strings[lang];

  const [all, setAll] = useState<DemoPayment[]>([]);

  useEffect(() => {
    setAll(loadPayments());
  }, []);

  const stats = useMemo(() => {
    const now = Date.now();
    const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

    const sent = all.filter((p) => p.status === "SENT");
    const pending = all.filter((p) => p.status === "PENDING");

    const last30 = sent.filter(
      (p) => now - new Date(p.createdAt).getTime() <= THIRTY_DAYS
    );
    const total30 = last30.reduce((sum, p) => sum + p.amount, 0);

    return {
      totalCount: all.length,
      sentCount: sent.length,
      pendingCount: pending.length,
      sent30Amount: total30,
    };
  }, [all]);

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        {/* Heading */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Admin</h1>
            <p className="text-xs opacity-70">
              Overview of transactions, payouts, and discrepancy reports
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
            <div className="text-xs opacity-70">Transactions (30 days)</div>
            <div className="mt-2 text-2xl font-semibold">
              {formatPKR(stats.sent30Amount)}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
            <div className="text-xs opacity-70">Sent</div>
            <div className="mt-2 text-2xl font-semibold">
              {stats.sentCount}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
            <div className="text-xs opacity-70">Pending</div>
            <div className="mt-2 text-2xl font-semibold">
              {stats.pendingCount}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            href="/admin/transactions"
            className="block rounded-2xl border border-black/10 bg-white p-4 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <div className="text-sm font-medium">Transactions</div>
            <div className="mt-1 text-xs opacity-70">
              Search, filter, and export CSV
            </div>
          </Link>

          <Link
            href="/admin/payouts"
            className="block rounded-2xl border border-black/10 bg-white p-4 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <div className="text-sm font-medium">Payouts Overview</div>
            <div className="mt-1 text-xs opacity-70">
              Weekly totals & CSV export
            </div>
          </Link>

          <Link
            href="/admin/discrepancies"
            className="block rounded-2xl border border-black/10 bg-white p-4 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <div className="text-sm font-medium">Discrepancy Report</div>
            <div className="mt-1 text-xs opacity-70">
              Flagged items & CSV export
            </div>
          </Link>
        </section>

        {/* Footer note */}
        <div className="text-[11px] opacity-60">
          App: {t.app} • Demo data only
        </div>
      </div>
    </MobileAppShell>
  );
}
