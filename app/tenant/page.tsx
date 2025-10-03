"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { localeFor, strings } from "@/lib/i18n";

export default function TenantHomePage() {
  const { lang, t } = useLang();
  const L = t.tenant.home;
  const locale = localeFor(lang);

  // demo data
  const [payments, setPayments] = useState<DemoPayment[] | null>(null);
  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const last = useMemo(() => (payments && payments[0]) || null, [payments]);

  return (
    <AppShell role="tenant" title={L.title}>
      <div className="p-4 space-y-4">
        {/* Page subtitle (moved out of AppShell to avoid duplication) */}
        <p className="text-sm opacity-70">{L.subtitle}</p>

        {/* Current Rent Due */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs opacity-70">{L.rentDue}</div>
              <div className="text-xl font-semibold">
                {/* demo number */}
                {new Intl.NumberFormat(locale, {
                  style: "currency",
                  currency: "PKR",
                  maximumFractionDigits: 0,
                }).format(123000)}
              </div>
            </div>
            <Link
              href="/tenant/pay"
              className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            >
              {L.quickPay}
            </Link>
          </div>
        </section>

        {/* Rewards balance */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs opacity-70">{L.rewardsBalance}</div>
              <div className="text-xl font-semibold">8,618,681 pts</div>
            </div>
            <Link
              href="/tenant/rewards"
              className="h-10 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
            >
              {strings[lang].tenant.rewards.title}
            </Link>
          </div>
        </section>

        {/* Last payment */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs opacity-70">{L.lastPayment}</div>
              {last ? (
                <div className="text-sm mt-1">
                  {new Intl.NumberFormat(locale, {
                    style: "currency",
                    currency: "PKR",
                    maximumFractionDigits: 0,
                  }).format(last.amount)}{" "}
                  • {last.method} •{" "}
                  {new Date(last.createdAt).toLocaleString(locale, {
                    hour12: lang === "en",
                  })}
                </div>
              ) : (
                <div className="text-sm mt-1 opacity-70">—</div>
              )}
            </div>

            {last ? (
              <Link
                href={`/tenant/receipt/${last.id}`}
                className="h-10 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
              >
                {L.viewReceipt}
              </Link>
            ) : null}
          </div>
        </section>

        {/* Shortcuts */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/tenant/pay"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 text-center hover:bg-black/5 dark:hover:bg-white/10"
          >
            <div className="font-medium">{L.shortcuts.pay}</div>
          </Link>
          <Link
            href="/tenant/rewards"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 text-center hover:bg-black/5 dark:hover:bg-white/10"
          >
            <div className="font-medium">{L.shortcuts.rewards}</div>
          </Link>
          <Link
            href="/tenant/receipts"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 text-center hover:bg-black/5 dark:hover:bg-white/10"
          >
            <div className="font-medium">{L.shortcuts.receipts}</div>
          </Link>
          <Link
            href="/support"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 text-center hover:bg黑/5 dark:hover:bg白/10"
          >
            <div className="font-medium">{L.shortcuts.support}</div>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
