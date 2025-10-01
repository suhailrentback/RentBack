"use client";

import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import Link from "next/link";
import { strings, getLang, type Lang } from "@/lib/i18n";
import { formatPKR, loadPayments } from "@/lib/demo";

export default function LandlordHomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = strings[lang].landlord.home;

  const [payments, setPayments] = useState<any[]>([]);
  useEffect(() => {
    setLang(getLang());
    setPayments(loadPayments());
  }, []);

  const collected30d = payments
    .filter((p) => p.status === "SENT")
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingCount = payments.filter((p) => p.status === "PENDING").length;
  const last = payments[payments.length - 1];
  const weeklySettled = collected30d > 0 ? collected30d * 0.9 : null; // fake stub
  const discrepancies = payments.filter((p) => p.amount < 65000).length;

  return (
    <MobileAppShell>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <span className="text-xs opacity-70">{t.welcome}</span>
        </div>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white p-5">
            <div className="text-xs opacity-90">{t.rentCollected}</div>
            <div className="mt-2 text-2xl font-semibold tracking-wide">
              {formatPKR(collected30d)}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">{t.pendingCount}</div>
            <div className="mt-2 text-2xl font-semibold">
              {pendingCount}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{t.payouts.title}</div>
              <div className="text-xs opacity-70">
                {t.payouts.next}: {t.payouts.day}
              </div>
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {weeklySettled ? (
                formatPKR(weeklySettled)
              ) : (
                <span className="opacity-70">{t.payouts.none}</span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-sm font-medium">
              {t.discrepancies.title}
            </div>
            <div className="text-xs opacity-70">
              {t.discrepancies.subtitle}
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {discrepancies}
            </div>
          </div>
        </section>

        {/* Last Payment */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{t.lastPayment}</div>
            {last ? (
              <Link
                href={`/tenant/receipt/${last.id}`}
                className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {t.viewReceipt}
              </Link>
            ) : null}
          </div>
          <div className="mt-2 text-sm">
            {last
              ? `${last.property} • ${formatPKR(last.amount)}`
              : "—"}
          </div>
        </section>

        {/* Navigation Links */}
        <section className="grid grid-cols-2 gap-4">
          <Link
            href="/landlord/ledger"
            className="rounded-xl p-4 border border-black/10 dark:border-white/10 text-center"
          >
            {t.ledgerCard}
          </Link>
          <Link
            href="/landlord/payouts"
            className="rounded-xl p-4 border border-black/10 dark:border-white/10 text-center"
          >
            {t.payoutsCard}
          </Link>
          <Link
            href="/landlord/discrepancies"
            className="rounded-xl p-4 border border-black/10 dark:border-white/10 text-center"
          >
            {t.discrepanciesCard}
          </Link>
          <Link
            href="/landlord/properties"
            className="rounded-xl p-4 border border-black/10 dark:border-white/10 text-center"
          >
            {t.propertiesCard}
          </Link>
        </section>
      </div>
    </MobileAppShell>
  );
}
