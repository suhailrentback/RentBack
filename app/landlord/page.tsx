// app/landlord/page.tsx
"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { strings } from "@/lib/i18n";

export default function LandlordHomePage() {
  const { lang } = useLang();
  const t = strings[lang];

  return (
    <AppShell role="landlord" title={t.landlord.home.title}>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold">{t.landlord.home.title}</h1>
          <p className="text-xs opacity-70">{t.landlord.home.welcome}</p>
        </div>

        {/* Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/landlord/ledger"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:border-emerald-600 transition-colors"
          >
            <div className="text-sm font-medium">Ledger</div>
            <div className="mt-1 text-xs opacity-70">
              View rent inflows and adjustments
            </div>
          </Link>

          <Link
            href="/landlord/payouts"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:border-emerald-600 transition-colors"
          >
            <div className="text-sm font-medium">Payouts</div>
            <div className="mt-1 text-xs opacity-70">
              Track transfers to your bank
            </div>
          </Link>

          <Link
            href="/landlord/properties"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:border-emerald-600 transition-colors"
          >
            <div className="text-sm font-medium">{t.landlord.properties.title}</div>
            <div className="mt-1 text-xs opacity-70">
              {t.landlord.properties.subtitle}
            </div>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
