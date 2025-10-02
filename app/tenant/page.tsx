"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, loadRewards, type DemoPayment, type RewardsState } from "@/lib/demo";

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function TenantHomePage() {
  const lang: Lang = "en"; // TODO: wire from global store
  const t = strings[lang];

  const [payments, setPayments] = useState<DemoPayment[] | null>(null);
  const [rewards, setRewards] = useState<RewardsState | null>(null);

  useEffect(() => {
    setPayments(loadPayments());
    setRewards(loadRewards());
  }, []);

  const lastSent = useMemo(
    () => (payments ?? []).find((p) => p.status === "SENT"),
    [payments]
  );

  // Simple “next due” placeholder for demo
  const nextDue = useMemo(() => {
    const today = new Date();
    const due = new Date(today.getFullYear(), today.getMonth() + 1, 5, 0, 0, 0);
    return due.toLocaleDateString(lang === "ur" ? "ur-PK" : "en-PK", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, [lang]);

  return (
    <AppShell role="tenant" title={t.tenant.home.title}>
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">{t.tenant.home.title}</h1>
        <p className="text-xs opacity-70">{t.tenant.home.subtitle}</p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        {/* Rent due + quick pay */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4">
          <div className="text-xs opacity-70">{t.tenant.home.rentDue}</div>
          <div className="mt-1 text-2xl font-semibold tracking-wide">{formatPKR(65000)}</div>
          <div className="mt-1 text-xs opacity-70">Next due: {nextDue}</div>
          <div className="mt-3">
            <Link
              href="/tenant/pay"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-3 py-2"
            >
              {t.tenant.home.quickPay}
            </Link>
          </div>
        </section>

        {/* Rewards balance */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4">
          <div className="text-xs opacity-70">{t.tenant.home.rewardsBalance}</div>
          <div className="mt-1 text-2xl font-semibold tracking-wide">
            {rewards ? rewards.balance : 0}
          </div>
          <div className="mt-2">
            <Link
              href="/tenant/rewards"
              className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 text-sm px-3 py-2"
            >
              {t.tenant.home.shortcuts.rewards}
            </Link>
          </div>
        </section>

        {/* Last payment */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4">
          <div className="text-xs opacity-70">{t.tenant.home.lastPayment}</div>
          {payments === null ? (
            <div className="mt-2 h-6 w-40 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
          ) : lastSent ? (
            <div className="mt-2 text-sm">
              <div className="font-medium">{formatPKR(lastSent.amount)}</div>
              <div className="text-xs opacity-70">
                {new Date(lastSent.createdAt).toLocaleString()}
              </div>
              <div className="mt-2">
                <Link
                  href={`/tenant/receipt/${lastSent.id}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2 py-1"
                >
                  {t.tenant.home.viewReceipt}
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-2 text-xs opacity-70">{t.tenant.rewards.empty}</div>
          )}
        </section>

        {/* Shortcuts */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/tenant/pay"
              className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm"
            >
              {t.tenant.home.shortcuts.pay}
            </Link>
            <Link
              href="/tenant/rewards"
              className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm"
            >
              {t.tenant.home.shortcuts.rewards}
            </Link>
            <Link
              href="/tenant/receipt/p_demo"
              className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm"
            >
              {t.tenant.home.shortcuts.receipts}
            </Link>
            <a
              href="#support"
              className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm"
            >
              {t.tenant.home.shortcuts.support}
            </a>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
