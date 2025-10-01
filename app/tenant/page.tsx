// app/tenant/page.tsx
"use client";

import Link from "next/link";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { formatPKR, loadPayments, loadRewards } from "@/lib/demo";
import { loadPayments, loadRewards, formatPKR } from "@/lib/demo";

export default function TenantHomePage() {
  const lang: Lang = "en"; // Later: wire from context
  const t = strings[lang].tenant.home;

  const [payments, setPayments] = useState<any[]>([]);
  const [rewards, setRewards] = useState<number>(0);

  useEffect(() => {
    setPayments(loadPayments());
    setRewards(loadRewards());
  }, []);

  const last = payments.length > 0 ? payments[payments.length - 1] : null;

  return (
    <MobileAppShell>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-sm opacity-70">{t.subtitle}</p>
        </div>

        {/* Main rent card */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
          <div className="text-sm">{t.rentDue}</div>
          <div className="mt-2 text-2xl font-semibold tracking-wide">
            {formatPKR(65000)}
          </div>
          <Link
            href="/tenant/pay"
            className="mt-3 inline-block text-sm px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30"
          >
            {t.quickPay}
          </Link>
        </div>

        {/* Secondary cards */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/tenant/rewards"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5"
          >
            <div className="text-xs opacity-70">{t.rewardsBalance}</div>
            <div className="mt-1 text-xl font-semibold">{rewards} pts</div>
          </Link>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">{t.lastPayment}</div>
            {last ? (
              <Link
                href={`/tenant/receipt/${last.id}`}
                className="text-sm text-emerald-600 hover:underline"
              >
                {t.viewReceipt}
              </Link>
            ) : (
              <div className="text-sm opacity-50">—</div>
            )}
          </div>
        </div>

        {/* Shortcuts */}
        <div className="grid grid-cols-4 gap-3 text-center text-sm">
          <Link
            href="/tenant/pay"
            className="rounded-xl border border-black/10 dark:border-white/10 p-3 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {t.shortcuts.pay}
          </Link>
          <Link
            href="/tenant/rewards"
            className="rounded-xl border border-black/10 dark:border-white/10 p-3 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {t.shortcuts.rewards}
          </Link>
          <Link
            href="/tenant/receipt/last"
            className="rounded-xl border border-black/10 dark:border-white/10 p-3 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {t.shortcuts.receipts}
          </Link>
          <a
            href="mailto:help@rentback.app"
            className="rounded-xl border border-black/10 dark:border-white/10 p-3 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {t.shortcuts.support}
          </a>
        </div>
      </div>
    </MobileAppShell>
  );
}
