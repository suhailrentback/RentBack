"use client";

import AppShell from "@/components/AppShell";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { useLang } from "@/hooks/useLang";

export default function LandlordHomePage() {
  const { lang, t } = useLang();
  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    setRows(loadPayments());
  }, []);

  const stats = useMemo(() => {
    if (!rows) return { sent: 0, pending: 0, total: 0 };
    const sent = rows.filter((r) => r.status === "SENT").length;
    const pending = rows.filter((r) => r.status !== "SENT").length;
    const total = rows.length;
    return { sent, pending, total };
  }, [rows]);

  const labels =
    lang === "ur"
      ? {
          title: t.landlord.home.title,
          subtitle: t.landlord.home.welcome,
          ledger: "لیجر",
          payouts: "ادائیگیاں",
          properties: "جائیدادیں",
          sent: "بھیجی گئیں",
          pending: "زیر التواء",
          total: "کل ادائیگیاں",
          viewLedger: t.landlord.home.quickLinks.ledger,
        }
      : {
          title: t.landlord.home.title,
          subtitle: t.landlord.home.welcome,
          ledger: "Ledger",
          payouts: "Payouts",
          properties: "Properties",
          sent: "Sent",
          pending: "Pending",
          total: "Total Payments",
          viewLedger: t.landlord.home.quickLinks.ledger,
        };

  return (
    <AppShell role="landlord" title={labels.title}>
      <div className="p-4 space-y-4">
        <p className="text-sm opacity-70">{labels.subtitle}</p>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="text-xs opacity-70">{labels.sent}</div>
            <div className="mt-1 text-2xl font-semibold">{rows ? stats.sent : "—"}</div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="text-xs opacity-70">{labels.pending}</div>
            <div className="mt-1 text-2xl font-semibold">{rows ? stats.pending : "—"}</div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="text-xs opacity-70">{labels.total}</div>
            <div className="mt-1 text-2xl font-semibold">{rows ? stats.total : "—"}</div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          <Link
            href="/landlord/ledger"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <div className="text-sm font-semibold">{labels.ledger}</div>
            <div className="text-xs opacity-70 mt-1">{labels.viewLedger}</div>
          </Link>
          <Link
            href="/landlord/payouts"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <div className="text-sm font-semibold">{labels.payouts}</div>
            <div className="text-xs opacity-70 mt-1">View bank transfers</div>
          </Link>
          <Link
            href="/landlord/properties"
            className="rounded-2xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <div className="text-sm font-semibold">{labels.properties}</div>
            <div className="text-xs opacity-70 mt-1">{t.landlord.properties.subtitle}</div>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
