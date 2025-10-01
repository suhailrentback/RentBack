"use client";

import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { loadPayments, loadRewards, formatPKR } from "@/lib/demo";
import Link from "next/link";

type Method = "RAAST" | "BANK" | "JAZZCASH";
type Status = "PENDING" | "SENT";
type DemoPayment = {
  id: string;
  createdAt: string;
  property: string;
  amount: number;
  method: Method;
  status: Status;
};

export default function TenantHomePage() {
  const lang: Lang = "en"; // keep simple to avoid i18n type noise; wire cookie later
  const t = strings[lang];

  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [rewards, setRewards] = useState<number>(0);

  useEffect(() => {
    setPayments(loadPayments());
    setRewards(loadRewards());
  }, []);

  const last = payments.find(p => p.status === "SENT");
  const duePKR = 65000;

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{t.tenant.home.title}</h1>
            <p className="text-xs opacity-70">{t.tenant.home.subtitle}</p>
          </div>
        </div>

        {/* Main card: current rent due */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
          <div className="text-xs opacity-70">{t.tenant.home.rentDue}</div>
          <div className="mt-1 text-2xl font-semibold">{formatPKR(duePKR)}</div>
          <div className="mt-3">
            <Link
              href="/tenant/pay"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            >
              {t.tenant.home.quickPay}
            </Link>
          </div>
        </section>

        {/* Secondary: rewards + last payment */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
            <div className="text-xs opacity-90">{t.tenant.home.rewardsBalance}</div>
            <div className="mt-1 text-2xl font-semibold">{rewards.toLocaleString()} pts</div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">{t.tenant.home.lastPayment}</div>
            {last ? (
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="font-medium">{last.property}</div>
                  <div className="text-xs opacity-70">
                    {new Date(last.createdAt).toLocaleString()} · {last.method}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPKR(last.amount)}</div>
                  <Link
                    href={`/tenant/receipt/${last.id}`}
                    className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {t.tenant.home.viewReceipt}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-2 text-sm opacity-70">
                {/* no dedicated empty key in your i18n for this; keeping simple */}
                No past payments yet.
              </div>
            )}
          </div>
        </section>

        {/* Shortcuts */}
        <section className="grid grid-cols-4 gap-2">
          <Link
            href="/tenant/pay"
            className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center text-xs bg-white dark:bg-white/5"
          >
            {t.tenant.home.shortcuts.pay}
          </Link>
          <Link
            href="/tenant/rewards"
            className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center text-xs bg-white dark:bg-white/5"
          >
            {t.tenant.home.shortcuts.rewards}
          </Link>
          <Link
            href="/tenant/receipt/last"
            className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center text-xs bg-white dark:bg-white/5"
          >
            {t.tenant.home.shortcuts.receipts}
          </Link>
          <a
            href="mailto:help@rentback.app"
            className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center text-xs bg-white dark:bg-white/5"
          >
            {t.tenant.home.shortcuts.support}
          </a>
        </section>
      </div>
    </MobileAppShell>
  );
}
