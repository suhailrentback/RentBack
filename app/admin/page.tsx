// app/admin/page.tsx
"use client";

import Link from "next/link";
import MobileAppShell from "@/components/MobileAppShell";

export default function AdminHomePage() {
  const cards = [
    {
      href: "/admin/payouts",
      title: "Payouts Overview",
      subtitle: "Weekly settlements across landlords",
      emoji: "💸",
      bg: "from-emerald-600 to-emerald-500",
    },
    {
      href: "/admin/discrepancies",
      title: "Discrepancy Report",
      subtitle: "Expected vs paid, by landlord/tenant",
      emoji: "⚠️",
      bg: "from-amber-500 to-orange-500",
    },
    // If you have /admin/transactions already, keep this card. If not, remove it.
    {
      href: "/admin/transactions",
      title: "Transactions",
      subtitle: "All incoming rent payments (demo)",
      emoji: "📄",
      bg: "from-sky-500 to-indigo-500",
    },
  ];

  return (
    <MobileAppShell>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold">Admin</h1>
          <p className="text-sm opacity-70">
            Quick links to payouts, discrepancy monitoring and transactions.
          </p>
        </div>

        {/* Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden group"
            >
              <div
                className={`p-5 bg-gradient-to-br ${c.bg} text-white flex items-center justify-between`}
              >
                <div className="text-2xl">{c.emoji}</div>
                <div className="text-right">
                  <div className="text-sm opacity-90">{c.title}</div>
                  <div className="text-xs opacity-80">{c.subtitle}</div>
                </div>
              </div>
              <div className="p-4 text-sm bg-white dark:bg-white/5 flex items-center justify-between">
                <span className="opacity-70">Open</span>
                <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* Helpful tips / housekeeping */}
        <section className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-xs opacity-70 bg-white dark:bg-white/5">
          This is a demo view — CSV exports live on each page. Data is local to
          your browser (no real payments).
        </section>
      </div>
    </MobileAppShell>
  );
}
