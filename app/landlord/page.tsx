"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, type DemoPayment } from "@/lib/demo";

function formatPKR(v: number) {
  return `Rs ${Math.round(v).toLocaleString("en-PK")}`;
}

export default function LandlordHomePage() {
  const lang: Lang = "en";
  const t = strings[lang];

  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPayments(loadPayments());
    setLoading(false);
  }, []);

  const last30Total = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return payments
      .filter((p) => p.status === "SENT" && new Date(p.createdAt).getTime() >= cutoff)
      .reduce((s, p) => s + p.amount, 0);
  }, [payments]);

  const pendingCount = useMemo(
    () => payments.filter((p) => p.status === "PENDING").length,
    [payments]
  );

  const last = useMemo(
    () => payments.find((p) => p.status === "SENT"),
    [payments]
  );

  return (
    <AppShell role="landlord" title={t.landlord.home.title}>
      <div className="p-4 space-y-5">
        <p className="text-sm opacity-70">{t.landlord.home.welcome}</p>

        {/* KPI grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">Rent collected (30 days)</div>
            <div className="mt-1 text-2xl font-semibold">{formatPKR(last30Total)}</div>
          </section>

          <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">Payments pending confirmation</div>
            <div className="mt-1 text-2xl font-semibold">{pendingCount}</div>
          </section>

          <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">Last payment</div>
            <div className="mt-1 text-sm">
              {last ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate">
                    <div className="font-medium">{formatPKR(last.amount)}</div>
                    <div className="text-xs opacity-70">
                      {new Date(last.createdAt).toLocaleString("en-PK")}
                    </div>
                  </div>
                  <Link
                    href={`/tenant/receipt/${last.id}`}
                    className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap"
                  >
                    View receipt
                  </Link>
                </div>
              ) : (
                <span className="opacity-70 text-xs">No payments yet</span>
              )}
            </div>
          </section>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/landlord/ledger"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <div className="text-sm font-medium">{t.landlord.home.quickLinks.ledger}</div>
            <div className="text-xs opacity-70 mt-1">
              All payments with receipt links
            </div>
          </Link>
          <Link
            href="/landlord/payouts"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <div className="text-sm font-medium">Payouts</div>
            <div className="text-xs opacity-70 mt-1">Weekly totals & CSV export</div>
          </Link>
          <Link
            href="/landlord/discrepancies"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <div className="text-sm font-medium">Discrepancies</div>
            <div className="text-xs opacity-70 mt-1">Pending &gt; 3 days + CSV</div>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
