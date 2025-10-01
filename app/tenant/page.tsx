"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import {
  formatPKR,
  loadPayments,
  loadRewards,
  type DemoPayment,
} from "@/lib/demo";
import Link from "next/link";

export default function TenantHomePage() {
  // Later: wire these from a global context or cookie
  const lang: Lang = "en";
  const t = strings[lang];

  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [rewards, setRewards] = useState<number>(0); // store just the numeric balance

  useEffect(() => {
    setPayments(loadPayments());
    const r = loadRewards();
    setRewards(r.balance); // ✅ FIX: loadRewards() returns object; we store only .balance
  }, []);

  const last = useMemo(
    () => payments.find((p) => p.status === "SENT"),
    [payments]
  );

  const nextDue = useMemo(() => {
    // Demo logic: assume one property, due next month same day
    const today = new Date();
    const due = new Date(today.getFullYear(), today.getMonth() + 1, 5, 0, 0, 0);
    return due.toLocaleDateString(lang === "ur" ? "ur-PK" : "en-PK", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, [lang]);

  const suggestedAmount = 65000; // demo default PKR

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{t.tenant.home.title}</h1>
            <div className="text-xs opacity-70">{t.tenant.home.subtitle}</div>
          </div>
          <div className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">
            {t.demo}
          </div>
        </div>

        {/* Main card: Rent due */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white p-5">
          <div className="text-xs opacity-90">{t.tenant.home.rentDue}</div>
          <div className="mt-1 text-2xl font-semibold tracking-wide">
            {formatPKR(suggestedAmount)}
          </div>
          <div className="mt-1 text-xs opacity-90">Next due: {nextDue}</div>

          <Link
            href="/tenant/pay"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur transition"
          >
            {t.tenant.home.quickPay}
          </Link>
        </section>

        {/* Secondary cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Rewards */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">{t.tenant.home.rewardsBalance}</div>
            <div className="mt-2 text-2xl font-semibold tabular-nums">
              {rewards.toLocaleString()}
            </div>
            <Link
              href="/tenant/rewards"
              className="mt-3 inline-flex items-center text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {t.tenant.home.shortcuts.rewards}
            </Link>
          </div>

          {/* Last payment */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">{t.tenant.home.lastPayment}</div>
            {last ? (
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm">
                  <div className="font-medium">{formatPKR(last.amount)}</div>
                  <div className="text-xs opacity-70">
                    {new Date(last.createdAt).toLocaleDateString(
                      lang === "ur" ? "ur-PK" : "en-PK",
                      { year: "numeric", month: "short", day: "2-digit" }
                    )}
                  </div>
                </div>
                <Link
                  href={`/tenant/receipt/${last.id}`}
                  className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {t.tenant.home.viewReceipt}
                </Link>
              </div>
            ) : (
              <div className="mt-2 text-xs opacity-70">
                {/* If no SENT payment in demo yet */}
                {t.tenant.pay.subtitle}
              </div>
            )}
          </div>
        </section>

        {/* Shortcuts */}
        <section>
          <div className="grid grid-cols-4 gap-3">
            <Link
              href="/tenant/pay"
              className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center text-xs hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              {t.tenant.home.shortcuts.pay}
            </Link>
            <Link
              href="/tenant/rewards"
              className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center text-xs hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              {t.tenant.home.shortcuts.rewards}
            </Link>
            <Link
              href="/tenant/receipts"
              className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center text-xs hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              {t.tenant.home.shortcuts.receipts}
            </Link>
            <a
              href="mailto:help@rentback.app"
              className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center text-xs hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              {t.tenant.home.shortcuts.support}
            </a>
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
