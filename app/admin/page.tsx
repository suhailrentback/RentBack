"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";

type Lang = "en" | "ur";

export default function AdminHomePage() {
  const [lang, setLang] = useState<Lang>("en");

  // Respect whatever your app set on <html lang="...">
  useEffect(() => {
    try {
      const l = document.documentElement.getAttribute("lang");
      if (l === "ur" || l === "en") setLang(l);
    } catch {}
  }, []);

  const t = (strings as any)[lang] || {};
  const dir = lang === "ur" ? "rtl" : "ltr";

  // i18n safe fallbacks
  const title = t?.admin?.home?.title ?? "Admin";
  const subtitle = t?.admin?.home?.subtitle ?? "Tools for monitoring demo data";

  const payoutsTitle = t?.admin?.home?.payoutsTitle ?? "Payouts Overview";
  const payoutsDesc = t?.admin?.home?.payoutsDesc ?? "Weekly settlements by landlord (demo).";

  const discTitle = t?.admin?.home?.discTitle ?? "Discrepancy Report";
  const discDesc =
    t?.admin?.home?.discDesc ?? "Shows payments below expected rent for quick follow-up.";

  const txTitle = t?.admin?.home?.txTitle ?? "Transactions";
  const txDesc =
    t?.admin?.home?.txDesc ?? "Filter recent transactions and export CSV (demo).";

  const view = t?.common?.view ?? "View";

  return (
    <MobileAppShell>
      <div className="p-4" style={{ direction: dir }}>
        <div className="max-w-md mx-auto space-y-4">
          {/* Header */}
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm opacity-70">{subtitle}</p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-3">
            {/* Payouts Overview */}
            <Link
              href="/admin/payouts"
              className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">{payoutsTitle}</div>
                  <div className="text-xs opacity-70 mt-1">{payoutsDesc}</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-lg bg-emerald-600 text-white">{view}</div>
              </div>
            </Link>

            {/* Discrepancy Report */}
            <Link
              href="/admin/discrepancies"
              className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">{discTitle}</div>
                  <div className="text-xs opacity-70 mt-1">{discDesc}</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-lg bg-emerald-600 text-white">{view}</div>
              </div>
            </Link>

            {/* Transactions */}
            <Link
              href="/admin/transactions"
              className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">{txTitle}</div>
                  <div className="text-xs opacity-70 mt-1">{txDesc}</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-lg bg-emerald-600 text-white">{view}</div>
              </div>
            </Link>
          </div>

          {/* Spacer to keep content above bottom nav comfortably */}
          <div className="h-2" />
        </div>
      </div>
    </MobileAppShell>
  );
}
