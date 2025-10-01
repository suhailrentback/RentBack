"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { formatPKR } from "@/lib/demo";

// --- Types used by this page (kept minimal so build stays happy)
type Method = "RAAST" | "BANK" | "JAZZCASH";
type DemoPayment = {
  id: string;
  createdAt: string;
  tenant?: string;
  property: string;
  amount: number;
  method: Method;
  status: "PENDING" | "SENT";
  expected?: number; // optional: for discrepancy calc
};

// Safe localStorage read helpers
function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function LandlordHomePage() {
  // Language (en | ur)
  const [lang, setLang] = useState<Lang>("en");
  // Payments used to compute stats
  const [payments, setPayments] = useState<DemoPayment[]>([]);

  // Load demo data from localStorage on mount
  useEffect(() => {
    const initialLang = (typeof window !== "undefined"
      ? (localStorage.getItem("rb:lang") as Lang | null)
      : null) || "en";
    setLang(initialLang);

    const stored: DemoPayment[] = loadJSON<DemoPayment[]>("rb:payments", []);
    setPayments(stored);
  }, []);

  const t = strings[lang].landlord.home;

  // === Derived metrics ===
  const {
    collected30d,
    pendingCount,
    weeklySettled,
    discrepancies,
    last,
  } = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - 30);

    let collected = 0;
    let pending = 0;
    let lastPayment: DemoPayment | undefined;

    const sent = payments.filter((p) => p.status === "SENT");
    for (const p of payments) {
      const dt = new Date(p.createdAt);
      if (p.status === "PENDING") pending++;
      if (p.status === "SENT" && dt >= cutoff) collected += p.amount;
      if (!lastPayment || new Date(p.createdAt) > new Date(lastPayment.createdAt)) {
        lastPayment = p;
      }
    }

    // Discrepancies (paid < expected), if `expected` present; otherwise derive a soft rule: below 60,000 PKR
    const disc = payments.filter((p) => {
      if (typeof p.expected === "number") return p.amount < p.expected;
      // soft heuristic just for demo
      return p.amount > 0 && p.amount < 60000;
    }).length;

    // Simulated weekly settled total: last 7d SENT sum (purely to make the card look alive)
    const cutoff7 = new Date(now);
    cutoff7.setDate(cutoff7.getDate() - 7);
    const weekly = sent
      .filter((p) => new Date(p.createdAt) >= cutoff7)
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      collected30d: collected,
      pendingCount: pending,
      weeklySettled: weekly,
      discrepancies: disc,
      last: lastPayment,
    };
  }, [payments]);

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <span className="text-xs opacity-70">{t.welcome}</span>
        </div>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Rent collected (30 days) */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white p-5">
            <div className="text-xs opacity-90">{t.rentCollected}</div>
            <div className="mt-2 text-2xl font-semibold tracking-wide">
              {formatPKR(collected30d)}
            </div>
          </div>

          {/* Pending confirmation count */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">{t.pendingCount}</div>
            <div className="mt-2 text-2xl font-semibold">{pendingCount}</div>
          </div>
        </section>

        {/* Payouts (simulated weekly) */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{t.payouts.title}</div>
            <div className="text-xs opacity-70">
              {t.payouts.next}: {t.payouts.day}
            </div>
          </div>
          <div className="mt-2
