"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";

export default function TenantHomePage() {
  const { t, locale } = useLang();
  const [last, setLast] = useState<DemoPayment | null>(null);

  useEffect(() => {
    const all = loadPayments();
    setLast(all.slice().reverse()[0] ?? null);
  }, []);

  return (
    <AppShell role="tenant" title={t.tenant.home.title}>
      {/* Subtitle moved inside page content (no duplication, no prop) */}
      <div className="px-4 pt-2 text-sm opacity-70">{t.tenant.home.subtitle}</div>

      <div className="p-4 space-y-4">
        {/* Current Rent Due */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/60 dark:bg-white/5">
          <div className="text-sm opacity-70">{t.tenant.home.rentDue}</div>
          <div className="mt-1 text-2xl font-semibold">
            {new Intl.NumberFormat(locale, {
              style: "currency",
              currency: "PKR",
              maximumFractionDigits: 0,
            }).format(123000)}
          </div>
          <Link
            href="/tenant/pay"
            className="mt-3 inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 text-white text-sm font-medium"
          >
            {t.tenant.home.quickPay}
          </Link>
        </section>

        {/* Rewards / Last Payment */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm opacity-70">{t.tenant.home.rewardsBalance}</div>
              <div className="mt-1 text-xl font-semibold">8,618,681 pts</div>
              <Link
                href="/tenant/rewards"
                className="mt-3 inline-flex h-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 px-4 text-sm hover:bg-black/5 dark:hover:bg-white/10"
              >
                {t.tenant.home.shortcuts.rewards}
              </Link>
            </div>

            <div>
              <div className="text-sm opacity-70">{t.tenant.home.lastPayment}</div>
              {last ? (
                <>
                  <div className="mt-1 text-sm opacity-80">
                    {new Intl.NumberFormat(locale, {
                      style: "currency",
                      currency: "PKR",
                      maximumFractionDigits: 0,
                    }).format(last.amount)}{" "}
                    • {last.method} • {new Date(last.createdAt).toLocaleString(locale)}
                  </div>
                  <Link
                    href={`/tenant/receipt/${last.id}`}
                    className="mt-3 inline-flex h-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 px-4 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    {t.tenant.home.viewReceipt}
                  </Link>
                </>
              ) : (
                <div className="mt-1 text-sm opacity-60">—</div>
              )}
            </div>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <Link
              href="/tenant/pay"
              className="h-11 rounded-xl border border-black/10 dark:border-white/10 grid place-items-center hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t.tenant.home.shortcuts.pay}
            </Link>
            <Link
              href="/tenant/rewards"
              className="h-11 rounded-xl border border-black/10 dark:border-white/10 grid place-items-center hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t.tenant.home.shortcuts.rewards}
            </Link>
            <Link
              href="/tenant/receipts"
              className="h-11 rounded-xl border border-black/10 dark:border-white/10 grid place-items-center hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t.tenant.home.shortcuts.receipts}
            </Link>
            <Link
              href="/support"
              className="h-11 rounded-xl border border-black/10 dark:border-white/10 grid place-items-center hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t.tenant.home.shortcuts.support}
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
