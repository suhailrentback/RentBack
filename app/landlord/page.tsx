"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";

export default function LandlordHomePage() {
  const { t, lang } = useLang();

  const labels = {
    en: {
      title: t.landlord.home.title,
      subtitle: t.landlord.home.welcome,
      ledger: "Ledger",
      payouts: "Payouts",
      properties: "Properties",
      discrepancies: "Discrepancies",
      open: "Open",
    },
    ur: {
      title: t.landlord.home.title,
      subtitle: t.landlord.home.welcome,
      ledger: "لیجر",
      payouts: "ادائیگیاں",
      properties: "جائیدادیں",
      discrepancies: "فرق/غلطیاں",
      open: "کھولیں",
    },
  }[lang];

  const cards = [
    { href: "/landlord/ledger", title: labels.ledger, desc: "Monthly ledger & receipts" },
    { href: "/landlord/payouts", title: labels.payouts, desc: "Scheduled payouts to bank" },
    { href: "/landlord/properties", title: labels.properties, desc: "Units & tenants" },
    { href: "/landlord/discrepancies", title: labels.discrepancies, desc: "Mismatches & disputes" },
  ];

  return (
    <AppShell role="landlord" title={labels.title} subtitle={labels.subtitle}>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            <div className="text-sm opacity-70">{c.desc}</div>
            <div className="mt-1 text-lg font-semibold">{c.title}</div>
            <div className="mt-3 text-xs font-medium text-emerald-600">{labels.open} →</div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
