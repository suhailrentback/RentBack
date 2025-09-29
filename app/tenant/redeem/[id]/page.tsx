"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Optional central demo module (safe dynamic access)
let demo: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  demo = require("@/lib/demo");
} catch (_) {
  demo = null;
}

/** i18n */
type Lang = "en" | "ur";
const strings = {
  en: {
    title: "Redemption Receipt",
    back: "Back to Rewards",
    brand: "Brand",
    amount: "Amount",
    points: "Points Debited",
    date: "Date",
    status: "Status",
    print: "Print / Save PDF",
    disclaimer: "Demo: Not a real payment",
  },
  ur: {
    title: "ریڈیمپشن رسید",
    back: "واپس انعامات",
    brand: "برانڈ",
    amount: "رقم",
    points: "کٹے گئے پوائنٹس",
    date: "تاریخ",
    status: "اسٹیٹس",
    print: "پرنٹ / PDF",
    disclaimer: "ڈیمو: یہ حقیقی ادائیگی نہیں ہے",
  },
} as const;

function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    try {
      const l =
        (document?.documentElement.getAttribute("lang") as Lang) ||
        (localStorage.getItem("rb-lang") as Lang) ||
        "en";
      if (l === "ur" || l === "en") setLang(l);
    } catch {}
  }, []);
  return lang;
}

/** Local fallback store */
type Redemption = {
  id: string;
  brand: string;
  amount: number;
  points: number;
  createdAt: string;
  status: "POSTED";
};
const LS_REDEMPTIONS = "rb-demo-redemptions";
function getRedemptionById(id: string): Redemption | null {
  if (demo?.getRedemptionById) return demo.getRedemptionById(id);
  try {
    const arr: Redemption[] = JSON.parse(
      localStorage.getItem(LS_REDEMPTIONS) || "[]"
    );
    return arr.find((r) => r.id === id) || null;
  } catch {
    return null;
  }
}

/** Page */
export default function RedeemReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const lang = useLang();
  const t = strings[lang];

  const [rec, setRec] = useState<Redemption | null>(null);

  useEffect(() => {
    if (!id) return;
    try {
      const r = getRedemptionById(id);
      setRec(r);
    } catch {
      setRec(null);
    }
  }, [id]);

  const dateText = useMemo(
    () => (rec ? new Date(rec.createdAt).toLocaleString() : ""),
    [rec]
  );

  if (!rec) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white dark:bg-white/5">
          <p className="opacity-70">Not found.</p>
          <Link
            href="/tenant/rewards"
            className="inline-block mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 print:max-w-none print:p-0">
      {/* Printable A4-friendly card */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-6 print:rounded-none print:border-0 print:p-10">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
            <Logo />
            <span>RentBack</span>
          </div>
          <div className="text-sm opacity-70">{t.disclaimer}</div>
        </header>

        <h1 className="text-2xl font-extrabold mb-1">{t.title}</h1>
        <p className="opacity-70 mb-6">#{rec.id}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Field label={t.brand} value={rec.brand} />
          <Field label={t.amount} value={`PKR ${rec.amount.toLocaleString()}`} />
          <Field label={t.points} value={`${rec.points.toLocaleString()} pts`} />
          <Field label={t.status} value={rec.status} />
          <Field label={t.date} value={dateText} />
        </div>

        <div className="mt-8 flex gap-3 print:hidden">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t.print}
          </button>
          <Link
            href="/tenant/rewards"
            className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10"
          >
            {t.back}
          </Link>
        </div>

        {/* QR-ish fake Raast ref for looks */}
        <div className="mt-10 border-t border-black/10 dark:border-white/10 pt-6 grid grid-cols-2 gap-4">
          <div className="text-xs opacity-70">
            RAAST REF: RB-{rec.id.slice(-8).toUpperCase()}
          </div>
          <div className="justify-self-end">
            <FakeQR />
          </div>
        </div>
      </div>
    </div>
  );
}

/** UI bits */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 p-3">
      <div className="text-[11px] opacity-70">{label}</div>
      <div className="font-medium mt-1">{value}</div>
    </div>
  );
}

function Logo({ size = 22, stroke = "#059669" }: { size?: number; stroke?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}

// simple blocky “QR” for demo print
function FakeQR() {
  return (
    <div className="grid grid-cols-7 gap-0.5 p-1 border border-black/10 dark:border-white/10 rounded">
      {Array.from({ length: 49 }).map((_, i) => (
        <div
          key={i}
          className={((i * 37) % 7) < 3 ? "w-3 h-3 bg-black/80 dark:bg-white" : "w-3 h-3 bg-transparent border border-black/10 dark:border-white/10"}
        />
      ))}
    </div>
  );
}
