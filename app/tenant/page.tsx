"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

// i18n — your existing strings file
import { strings } from "@/lib/i18n";

/**
 * Local storage keys we use across the demo.
 */
const LS_KEYS = {
  lang: "rb-lang",
  theme: "rb-theme",
  payments: "rb-payments",    // Demo payments array
  rewards: "rb-rewards",      // { balance: number, entries: [...] }
  profile: "rb-profile",      // { name, email } (optional)
};

/**
 * Small helpers
 */
type Lang = "en" | "ur";
type Theme = "light" | "dark";
type Method = "RAAST" | "BANK_TRANSFER" | "JAZZCASH";
type Status = "PENDING" | "SENT";

type DemoPayment = {
  id: string;
  createdAt: string; // ISO
  property: string;
  amount: number;
  method: Method;
  status: Status;
};

type RewardsStore = {
  balance: number;
  entries: Array<{
    id: string;
    type: "earn" | "redeem";
    points: number;
    createdAt: string;
    note?: string;
  }>;
};

function formatPKR(n: number) {
  try {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `PKR ${Math.round(n).toLocaleString()}`;
  }
}

/**
 * Next rent due:
 * - If you’ve paid before: suggest the last amount and set due to the 1st of next month.
 * - If no payments yet: 65,000 due on the 1st of next month.
 */
function getNextDue(payments: DemoPayment[]) {
  const last = [...payments].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  const baseAmount = last?.amount ?? 65000;

  const now = new Date();
  const due = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0));
  // Format date nicely (DD Mon, YYYY)
  const dateLabel = due.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return { amount: baseAmount, dateLabel };
}

/**
 * Pull demo state from localStorage on the client.
 */
function useDemoState() {
  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [rewards, setRewards] = useState<RewardsStore | null>(null);

  useEffect(() => {
    try {
      const rawP = localStorage.getItem(LS_KEYS.payments);
      const rawR = localStorage.getItem(LS_KEYS.rewards);
      setPayments(rawP ? JSON.parse(rawP) : []);
      setRewards(
        rawR
          ? JSON.parse(rawR)
          : {
              balance: 0,
              entries: [],
            }
      );
    } catch {
      setPayments([]);
      setRewards({ balance: 0, entries: [] });
    }
  }, []);

  const lastPayment = useMemo(() => {
    if (!payments?.length) return null;
    const sorted = [...payments].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sorted[0];
  }, [payments]);

  return { payments, rewards, lastPayment };
}

/**
 * Language/theme controls (persisted to <html> + localStorage)
 */
function useLangTheme() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");

  // hydrate
  useEffect(() => {
    try {
      const l = localStorage.getItem(LS_KEYS.lang);
      const t = localStorage.getItem(LS_KEYS.theme);
      if (l === "en" || l === "ur") setLang(l);
      if (t === "light" || t === "dark") setTheme(t);
    } catch {}
  }, []);

  // apply
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem(LS_KEYS.lang, lang);
      localStorage.setItem(LS_KEYS.theme, theme);
    } catch {}
  }, [lang, theme]);

  return { lang, theme, setLang, setTheme };
}

/**
 * Simple cards
 */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 ${className}`}>
      {children}
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="opacity-70 text-sm">{label}</span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
}

export default function TenantHome() {
  const path = usePathname();
  const { lang, setLang, theme, setTheme } = useLangTheme();
  const t = strings[lang];
  const dir = lang === "ur" ? "rtl" : "ltr";

  const { payments, rewards, lastPayment } = useDemoState();
  const { amount: dueAmount, dateLabel } = getNextDue(payments);
  const recentReceiptHref = lastPayment ? `/tenant/receipt/${encodeURIComponent(lastPayment.id)}` : null;

  return (
    <div
      className="min-h-dvh bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white"
      style={{ direction: dir }}
    >
      {/* Page header (kept light; global bottom nav is in MobileAppShell) */}
      <header className="sticky top-0 z-20 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-md px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300">
            <Logo />
            <span>{t.app}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}
              className="px-2 py-1 text-xs rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="toggle language"
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
            <button
              onClick={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
              className="px-2 py-1 text-xs rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="toggle theme"
            >
              {theme === "dark" ? t.light : t.dark}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-md p-4 space-y-4">
        {/* Main card — Rent Due */}
        <Card className="p-5 relative overflow-hidden">
          <div className="absolute -inset-20 -z-10 opacity-20 dark:opacity-30 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-400 via-emerald-600 to-emerald-800" />
          <h2 className="text-base font-semibold">{lang === "en" ? "Rent Due" : "کرایہ واجب الادا"}</h2>
          <p className="mt-1 text-sm opacity-70">
            {lang === "en" ? "Due" : "واجب الادا"}: <span className="font-medium opacity-90">{dateLabel}</span>
          </p>
          <div className="mt-4 text-3xl font-extrabold tracking-tight">
            {formatPKR(dueAmount)}
          </div>
          <div className="mt-5">
            <Link
              href="/tenant/pay"
              className="w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {lang === "en" ? "Pay Now" : "ابھی ادائیگی کریں"}
            </Link>
          </div>
        </Card>

        {/* Secondary — Rewards + Last Payment */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-xs opacity-70">{lang === "en" ? "Rewards Balance" : "ریوارڈز بیلنس"}</div>
            <div className="mt-1 text-xl font-bold">
              {(rewards?.balance ?? 0).toLocaleString()} <span className="text-xs opacity-70">pts</span>
            </div>
            <Link
              href="/tenant/rewards"
              className="mt-3 inline-flex text-xs px-3 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {lang === "en" ? "View rewards" : "ریوارڈز دیکھیں"}
            </Link>
          </Card>

          <Card className="p-4">
            <div className="text-xs opacity-70">{lang === "en" ? "Last Payment" : "آخری ادائیگی"}</div>
            {lastPayment ? (
              <>
                <div className="mt-1 text-sm font-medium truncate">{lastPayment.property}</div>
                <div className="text-xs opacity-70">
                  {new Date(lastPayment.createdAt).toLocaleDateString()} • {formatPKR(lastPayment.amount)}
                </div>
                {recentReceiptHref && (
                  <Link
                    href={recentReceiptHref}
                    className="mt-3 inline-flex text-xs px-3 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    {lang === "en" ? "Receipt" : "رسید"}
                  </Link>
                )}
              </>
            ) : (
              <div className="mt-1 text-sm opacity-70">
                {lang === "en" ? "No payments yet." : "ابھی تک کوئی ادائیگی نہیں۔"}
              </div>
            )}
          </Card>
        </div>

        {/* Shortcuts */}
        <section className="grid grid-cols-4 gap-3">
          <Shortcut href="/tenant/pay" icon="💸" label={lang === "en" ? "Pay" : "ادائیگی"} />
          <Shortcut href="/tenant/rewards" icon="🎁" label={lang === "en" ? "Rewards" : "انعامات"} />
          {recentReceiptHref ? (
            <Shortcut href={recentReceiptHref} icon="🧾" label={lang === "en" ? "Receipt" : "رسید"} />
          ) : (
            <Shortcut href="/tenant/rewards#recent" icon="🧾" label={lang === "en" ? "Receipts" : "رسائد"} />
          )}
          <Shortcut href="mailto:help@rentback.app" icon="🛟" label={lang === "en" ? "Support" : "مدد"} />
        </section>

        {/* Helpful tip / demo banner */}
        <p className="text-[11px] opacity-60 text-center">
          {lang === "en"
            ? "Demo preview — no real payments are processed."
            : "ڈیمو پریویو — کوئی حقیقی ادائیگیاں پروسیس نہیں ہوتیں۔"}
        </p>
      </main>
    </div>
  );
}

function Shortcut({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 px-2 py-3 flex flex-col items-center justify-center text-xs"
    >
      <span className="text-lg leading-none">{icon}</span>
      <span className="mt-1 truncate">{label}</span>
    </Link>
  );
}

function Logo({ size = 20, stroke = "#059669" }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}
