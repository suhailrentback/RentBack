"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { localeFor } from "@/lib/i18n";

const formatPKR = (v: number, locale: Intl.LocalesArgument) =>
  `Rs ${Math.round(v).toLocaleString(locale)}`;

export default function TenantRewardsPage() {
  const { lang, t } = useLang();
  const locale = useMemo(() => localeFor(lang), [lang]);

  // Demo: compute rewards from payments (1% of SENT payments)
  const [payments, setPayments] = useState<DemoPayment[] | null>(null);
  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const balance = useMemo(() => {
    if (!payments) return 0;
    return payments.filter(p => p.status === "SENT").reduce((sum, p) => sum + Math.round(p.amount * 0.01), 0);
  }, [payments]);

  const recent = useMemo(() => {
    if (!payments) return [];
    // fake activity: earned rows from SENT payments (most recent first)
    return [...payments]
      .filter(p => p.status === "SENT")
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
      .slice(0, 6)
      .map(p => ({
        id: p.id,
        type: "earned" as const,
        pts: Math.round(p.amount * 0.01),
        date: new Date(p.createdAt),
        label: `${t.tenant.rewards.earned} • ${formatPKR(p.amount, locale)}`,
      }));
  }, [payments, t, locale]);

  return (
    <AppShell role="tenant" title={t.tenant.rewards.title}>
      <div className="p-4 space-y-4">
        {/* Balance card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm opacity-70">{t.tenant.rewards.balance}</div>
          {payments === null ? (
            <div className="mt-2 h-8 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
          ) : (
            <div className="mt-1 text-3xl font-semibold tracking-wide">{balance.toLocaleString(locale)}</div>
          )}
          <div className="mt-2 text-xs opacity-70">
            {t.tenant.rewards.progress.toGold.replace("{{pts}}", Math.max(0, 1000 - balance).toLocaleString(locale))}
          </div>
        </section>

        {/* Quick redeem */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">{t.tenant.rewards.redeem}</h2>
            <button
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm disabled:opacity-50"
              disabled={payments === null || balance < 100}
              onClick={() => alert(t.tenant.rewards.voucherCode + ": RB-DEMO-100")}
            >
              {t.tenant.rewards.voucherCode}
            </button>
          </div>
          <p className="mt-2 text-xs opacity-70">
            {payments === null
              ? ""
              : balance < 100
              ? `+${(100 - balance).toLocaleString(locale)} more pts to unlock`
              : "Available: 100+ pts"}
          </p>
        </section>

        {/* Activity */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
          <div className="px-1 py-1">
            <h3 className="text-sm font-semibold">{t.tenant.rewards.activity}</h3>
          </div>
          {payments === null ? (
            <div className="mt-2 space-y-2">
              <div className="h-9 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
              <div className="h-9 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
              <div className="h-9 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
            </div>
          ) : recent.length === 0 ? (
            <div className="p-3 text-sm opacity-70">{t.tenant.rewards.empty}</div>
          ) : (
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {recent.map((r) => (
                <li key={r.id} className="flex items-center justify-between px-2 py-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{r.label}</span>
                    <span className="text-xs opacity-70">
                      {r.date.toLocaleDateString(locale, { year: "numeric", month: "short", day: "2-digit" })}
                    </span>
                  </div>
                  <div className="text-sm font-semibold">+{r.pts.toLocaleString(locale)} pts</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
