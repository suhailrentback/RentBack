"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function AdminHomePage() {
  const { lang } = useLang();

  const title = lang === "ur" ? "ایڈمن ڈیش بورڈ" : "Admin Dashboard";
  const welcome =
    lang === "ur"
      ? "ادائیگیاں، فرق اور پے آؤٹس کا جائزہ"
      : "Overview of transactions, discrepancies and payouts";

  const cards = [
    {
      href: "/admin/transactions",
      title: lang === "ur" ? "ٹرانزیکشنز" : "Transactions",
      sub: lang === "ur" ? "تمام ادائیگیاں" : "All payments",
    },
    {
      href: "/admin/payouts",
      title: lang === "ur" ? "پے آؤٹس" : "Payouts",
      sub: lang === "ur" ? "حالیہ ٹرانسفرز" : "Recent transfers",
    },
    {
      href: "/admin/discrepancies",
      title: lang === "ur" ? "فرق" : "Discrepancies",
      sub: lang === "ur" ? "نظرِ ثانی درکار" : "Needs review",
    },
  ];

  return (
    <AppShell role="admin" title={title}>
      <div className="p-4 space-y-3">
        <p className="text-sm opacity-70">{welcome}</p>

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
