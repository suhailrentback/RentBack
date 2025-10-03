"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function LandlordHomePage() {
  const { t, lang } = useLang();

  const cards = [
    {
      href: "/landlord/ledger",
      title: lang === "ur" ? "لیجر" : "Ledger",
      sub: lang === "ur" ? "ریاستی خلاصہ" : "Monthly summary",
    },
    {
      href: "/landlord/payouts",
      title: lang === "ur" ? "پے آؤٹس" : "Payouts",
      sub: lang === "ur" ? "حالیہ ٹرانسفرز" : "Recent transfers",
    },
    {
      href: "/landlord/properties",
      title: t.landlord.properties.title,
      sub: t.landlord.properties.subtitle,
    },
    {
      href: "/landlord/discrepancies",
      title: lang === "ur" ? "فرق" : "Discrepancies",
      sub: lang === "ur" ? "نظرِ ثانی درکار" : "Needs review",
    },
  ];

  return (
    <AppShell role="landlord" title={t.landlord.home.title}>
      <div className="p-4 space-y-3">
        <p className="text-sm opacity-70">{t.landlord.home.welcome}</p>

        <div className="grid grid-cols-2 gap-3">
          {cards.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-black/10 dark:border-white/10 p-3 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <div className="text-base font-semibold">{c.title}</div>
              <div className="text-xs opacity-70 mt-1">{c.sub}</div>
            </a>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
