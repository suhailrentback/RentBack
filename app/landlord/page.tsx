"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { strings } from "@/lib/i18n";

export default function LandlordHomePage() {
  const { lang } = useLang();
  const t = strings[lang];

  const cards = [
    {
      href: "/landlord/ledger",
      title: t.landlord?.home?.quickLinks?.ledger ?? "Ledger",
      desc:
        lang === "ur"
          ? "آپ کی ادائیگیاں اور اندراجات"
          : "Your payouts & entries",
    },
    {
      href: "/landlord/payouts",
      title: lang === "ur" ? "ادائیگیاں" : "Payouts",
      desc:
        lang === "ur"
          ? "تازہ ترین ادائیگی کی فہرست"
          : "Latest payout runs",
    },
    {
      href: "/landlord/properties",
      title: lang === "ur" ? "جائیدادیں" : "Properties",
      desc:
        lang === "ur"
          ? "اپنی جائیدادوں اور کرایہ داروں کا نظم کریں"
          : "Manage properties & tenants",
    },
  ];

  return (
    <AppShell role="landlord" title={t.landlord?.home?.title ?? "Landlord Dashboard"}>
      <div className="p-4 space-y-4">
        <p className="text-sm opacity-80">
          {t.landlord?.home?.welcome ??
            (lang === "ur"
              ? "ادائیگیوں، لیجر اور جائیدادوں کا جائزہ"
              : "Overview of payouts, ledger and properties")}
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <div className="text-base font-semibold">{c.title}</div>
              <div className="text-sm opacity-70 mt-1">{c.desc}</div>
            </Link>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
