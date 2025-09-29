"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";

type Lang = "en" | "ur";
type Method = "RAAST" | "CARD" | "WALLET";
type Payment = {
  id: string;
  createdAt: string;
  property: string;
  amount: number;
  method: Method;
  status: "PENDING" | "SENT";
};

const labels = {
  en: {
    title: "Home",
    sub: "Overview & quick actions",
    nextRent: "Next rent due",
    payNow: "Pay now",
    viewAll: "View all",
    recent: "Recent payments",
    none: "No payments yet — make your first demo payment.",
    rewards: "Rewards",
    points: "points",
    seeRewards: "See rewards",
  },
  ur: {
    title: "ہوم",
    sub: "جائزہ اور فوری ایکشنز",
    nextRent: "اگلا کرایہ واجب الادا",
    payNow: "ابھی ادا کریں",
    viewAll: "سب دیکھیں",
    recent: "حالیہ ادائیگیاں",
    none: "ابھی تک کوئی ادائیگی نہیں — پہلی ڈیمو ادائیگی کریں۔",
    rewards: "انعامات",
    points: "پوائنٹس",
    seeRewards: "انعامات دیکھیں",
  },
} as const;

function loadPayments(): Payment[] {
  try {
    const raw = localStorage.getItem("rb-payments");
    return raw ? (JSON.parse(raw) as Payment[]) : [];
  } catch {
    return [];
  }
}

function loadPoints(): number {
  try {
    const raw = localStorage.getItem("rb-reward-balance");
    return raw ? Number(raw) : 0;
  } catch {
    return 0;
  }
}

export default function TenantHomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => labels[lang], [lang]);
  const dir = lang === "ur" ? "rtl" : "ltr";

  const [payments, setPayments] = useState<Payment[]>([]);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const htmlLang = document.documentElement.getAttribute("lang");
    setLang(htmlLang === "ur" ? "ur" : "en");
    setPayments(loadPayments());
    setPoints(loadPoints());
  }, []);

  const rentDueAmount = 65000; // demo
  const fmt = new Intl.NumberFormat(lang === "ur" ? "ur-PK" : "en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  });

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4" style={{ direction: dir }}>
        <div>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-sm opacity-70">{t.sub}</p>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Next rent */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">{t.nextRent}</div>
            <div className="mt-2 text-2xl font-semibold">{fmt.format(rentDueAmount)}</div>
            <Link
              href="/tenant/pay"
              className="mt-4 inline-block text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {t.payNow}
            </Link>
          </div>

          {/* Rewards */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">{t.rewards}</div>
            <div className="mt-2 text-2xl font-semibold">
              {Math.max(0, Math.floor(points)).toLocaleString()} <span className="text-sm opacity-70">{t.points}</span>
            </div>
            <Link
              href="/tenant/rewards"
              className="mt-4 inline-block text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t.seeRewards}
            </Link>
          </div>
        </div>

        {/* Recent payments */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium opacity-80">{t.recent}</div>
          <Link href="/tenant/pay" className="text-xs opacity-70 hover:opacity-100">
            {t.viewAll} →
          </Link>
        </div>

        {payments.length === 0 ? (
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-sm opacity-75">
            {t.none}
          </div>
        ) : (
          <div className="space-y-2">
            {payments.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between bg-white dark:bg-white/5"
              >
                <div>
                  <div className="font-medium">{p.property}</div>
                  <div className="text-xs opacity-70">
                    {new Date(p.createdAt).toLocaleString()} • {p.method}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{fmt.format(p.amount)}</div>
                  <div className="text-[11px] opacity-70">{p.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
