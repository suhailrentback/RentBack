// app/tenant/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";

export default function TenantHomePage() {
  const { t, lang, locale } = useLang();
  const L = useMemo(() => t.tenant.home, [t]);

  // Demo: load latest payment to show "Last payment"
  const [payments, setPayments] = useState<DemoPayment[] | null>(null);
  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const last = useMemo(
    () =>
      (payments ?? [])
        .slice()
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0],
    [payments]
  );

  // Demo values
  const dueAmount = 123000;
  const rewardsBalance = 8618681;

  return (
    <AppShell
      role="tenant"
      // Single source of truth for page header (prevents duplication)
      title={L.title}
      subtitle={L.subtitle}
    >
      <div className="p-4 space-y-4">
        {/* Current Rent Due */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-70">{L.rentDue}</div>
              <div className="text-2xl font-semibold">
                {new Intl.NumberFormat(locale, {
                  style: "currency",
                  currency: "PKR",
                  maximumFractionDigits: 0,
                }).format(dueAmount)}
              </div>
            </div>
            <Link
              href="/tenant/pay"
              className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium"
            >
              {L.quickPay}
            </Link>
          </div>
        </section>

        {/* Rewards */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-70">{L.rewardsBalance}</div>
              <div className="text-2xl font-semibold">
                {new Intl.NumberFormat(locale).format(rewardsBalance)} pts
              </div>
            </div>
            <Link
              href="/tenant/rewards"
              className="px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-sm font-medium"
            >
              {t.tenant.home.shortcuts.rewards}
            </Link>
          </div>
        </section>

        {/* Last Payment */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-70">{L.lastPayment}</div>
              <div className="text-base font-medium">
                {last
                  ? [
                      new Intl.NumberFormat(locale, {
                        style: "currency",
                        currency: "PKR",
                        maximumFractionDigits: 0,
                      }).format(last.amount),
                      "•",
                      last.method,
                      "•",
                      new Date(last.createdAt).toLocaleString(locale),
                    ].join(" ")
                  : "—"}
              </div>
            </div>
            {last ? (
              <Link
                href={`/tenant/receipt/${last.id}`}
                className="px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-sm font-medium"
              >
                {L.viewReceipt}
              </Link>
            ) : null}
          </div>
        </section>

        {/* Shortcuts */}
        <section className="grid grid-cols-2 gap-3">
          <Link
            href="/tenant/pay"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 text-center font-medium hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            {L.shortcuts.pay}
          </Link>
          <Link
            href="/tenant/rewards"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 text-center font-medium hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            {L.shortcuts.rewards}
          </Link>
          <Link
            href="/tenant/receipts"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 text-center font-medium hover:bg.black/5 dark:hover:bg-white/5 transition"
          >
            {L.shortcuts.receipts}
          </Link>
          <Link
            href="/support"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 text-center font-medium hover:bg-black/5 dark:hover:bg.white/5 transition"
          >
            {L.shortcuts.support}
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
