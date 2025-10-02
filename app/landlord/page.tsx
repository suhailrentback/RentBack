"use client";

import AppShell from "@/components/AppShell";
import { strings, type Lang } from "@/lib/i18n";
import Link from "next/link";

export default function LandlordHomePage() {
  const lang: Lang = "en";
  const t = strings[lang];

  return (
    <AppShell role="landlord" title={t.landlord.home.title}>
      <div className="p-4 space-y-5">
        <p className="text-sm opacity-70">{t.landlord.home.welcome}</p>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ledger */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="text-sm font-medium">Ledger</div>
            <p className="text-xs opacity-70 mt-1">
              View a list of payments and open any receipt.
            </p>
            <div className="mt-3">
              <Link
                href="/landlord/ledger"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
              >
                {t.landlord.home.quickLinks.ledger}
              </Link>
            </div>
          </div>

          {/* Payouts */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="text-sm font-medium">Payouts</div>
            <p className="text-xs opacity-70 mt-1">
              Export recent payout runs for your records.
            </p>
            <div className="mt-3">
              <Link
                href="/landlord/payouts"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
              >
                Open Payouts
              </Link>
            </div>
          </div>

          {/* Discrepancies */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="text-sm font-medium">Discrepancies</div>
            <p className="text-xs opacity-70 mt-1">
              Review and export reconciliation issues (demo).
            </p>
            <div className="mt-3">
              <Link
                href="/landlord/discrepancies"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
              >
                Open Discrepancies
              </Link>
            </div>
          </div>

          {/* Properties */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="text-sm font-medium">{t.landlord.properties.title}</div>
            <p className="text-xs opacity-70 mt-1">{t.landlord.properties.subtitle}</p>
            <div className="mt-3">
              <Link
                href="/landlord/properties"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
              >
                Open Properties
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
