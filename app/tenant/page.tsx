"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { useLang } from "@/components/providers/LanguageProvider";
import { formatDate, formatPKR } from "@/lib/locale";

export default function TenantHomePage() {
  const { lang } = useLang();
  const t = strings[lang as Lang];

  const [payments, setPayments] = useState<DemoPayment[]>([]);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const nextDue = useMemo(() => {
    const today = new Date();
    const due = new Date(today.getFullYear(), today.getMonth() + 1, 5, 0, 0, 0);
    return formatDate(lang as Lang, due);
  }, [lang]);

  const last = payments.find((p) => p.status === "SENT");

  return (
    <AppShell role="tenant" title={t.tenant.home.title}>
      <div className="p-4 space-y-5">
        <p className="text-xs opacity-70">{t.tenant.home.subtitle}</p>

        {/* Rent due */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
          <div className="text-sm opacity-70">{t.tenant.home.rentDue}</div>
          <div className="mt-1 text-xl font-semibold">Rs 65,000</div>
          <div className="mt-1 text-xs opacity-70">{t.tenant.home.quickPay} • {t.tenant.home.lastPayment}</div>
          <div className="mt-1 text-xs opacity-70">
            {t.tenant.home.quickPay} • {t.tenant.home.viewReceipt}
          </div>
          <div className="mt-2 text-xs opacity-70">
            {t.tenant.home.rentDue} • {t.tenant.home.lastPayment}
          </div>
          <div className="mt-2 text-xs opacity-70">
            Next due: {nextDue}
          </div>
        </section>

        {/* Last payment */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm font-medium">{t.tenant.home.lastPayment}</div>
          <div className="mt-2 text-xs opacity-70">
            {last
              ? `${formatPKR(lang as Lang, last.amount)} • ${formatDate(lang as Lang, last.createdAt)}`
              : t.tenant.rewards.empty}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
