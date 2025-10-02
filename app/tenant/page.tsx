"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { strings, type Lang, localeFor } from "@/lib/i18n";
import {
  loadPayments,
  loadRewards,
  type DemoPayment,
  type RewardsState,
  formatPKR,
} from "@/lib/demo";

export default function TenantHomePage() {
  // TODO: wire language from a store/context later
  const lang: Lang = "en";
  const t = strings[lang];

  const [payments, setPayments] = useState<DemoPayment[] | null>(null);
  const [rewards, setRewards] = useState<RewardsState | null>(null);

  useEffect(() => {
    setPayments(loadPayments());
    setRewards(loadRewards());
  }, []);

  // Next rent due (demo): 5th of next month
  const nextDueText = useMemo(() => {
    const today = new Date();
    const due = new Date(today.getFullYear(), today.getMonth() + 1, 5, 0, 0, 0);
    return due.toLocaleDateString(localeFor(lang), {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, [lang]);

  const lastSent = useMemo(
    () => (payments ?? []).find((p) => p.status === "SENT") ?? null,
    [payments]
  );

  return (
    <AppShell role="tenant" title={t.tenant.home.title}>
      {/* Header */}
      <div className="mb-4">
        <p className="text-xs opacity-70">{t.tenant.home.subtitle}</p>
      </div>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rent due */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
          <div className="text-xs opacity-70">{t.tenant.home.rentDue}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">Rs 65,000</div>
          <div className="mt-1 text-xs opacity-70">Next due: {nextDueText}</div>
          <Link
            className="mt-3 inline-flex px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            href="/tenant/pay"
          >
            {t.tenant.home.quickPay}
          </Link>
        </div>

        {/* Rewards */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
          <div className="text-xs opacity-70">{t.tenant.home.rewardsBalance}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">
            {rewards ? rewards.balance : 0}
          </div>
          <Link
            className="mt-3 inline-flex px-3 py-2 rounded-lg border text-sm"
            href="/tenant/rewards"
          >
            {t.tenant.home.shortcuts.rewards}
          </Link>
        </div>

        {/* Last payment */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 sm:col-span-2">
          <div className="text-sm font-medium">{t.tenant.home.lastPayment}</div>

          {payments === null ? (
            <div className="mt-3 h-8 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
          ) : lastSent ? (
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-sm">
                  {formatPKR(lastSent.amount)} • {lastSent.method}
                </div>
                <div className="text-xs opacity-70">
                  {new Date(lastSent.createdAt).toLocaleString(localeFor(lang))}
                </div>
              </div>
              <Link
                href={`/tenant/receipt/${lastSent.id}`}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
              >
                {t.tenant.home.viewReceipt}
              </Link>
            </div>
          ) : (
            <div className="mt-3 text-xs opacity-70">
              {t.tenant.rewards.empty}
            </div>
          )}
        </div>
      </section>

      {/* Shortcuts */}
      <section className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/tenant/pay"
          className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center bg-white dark:bg-white/5"
        >
          <div className="text-sm font-medium">{t.tenant.home.shortcuts.pay}</div>
        </Link>
        <Link
          href="/tenant/rewards"
          className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center bg-white dark:bg-white/5"
        >
          <div className="text-sm font-medium">{t.tenant.home.shortcuts.rewards}</div>
        </Link>
        <Link
          href="/tenant"
          className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center bg-white dark:bg-white/5"
        >
          <div className="text-sm font-medium">{t.tenant.home.shortcuts.receipts}</div>
        </Link>
        <Link
          href="/tenant/profile"
          className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center bg-white dark:bg-white/5"
        >
          <div className="text-sm font-medium">{t.tenant.home.shortcuts.support}</div>
        </Link>
      </section>
    </AppShell>
  );
}
