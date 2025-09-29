"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// Optional central demo engine (if you already have one).
// We import the *module* and access properties dynamically to avoid build errors.
let demo: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  demo = require("@/lib/demo");
} catch (_) {
  demo = null;
}

/** ---------- i18n (reads what your shell writes to <html lang="…">) ---------- */
type Lang = "en" | "ur";
const strings = {
  en: {
    title: "Rewards",
    subtitle: "Pakistan-focused perks",
    balance: "Points balance",
    redeem: "Redeem",
    choose: "Choose denomination",
    confirm: "Confirm Redemption",
    cancel: "Cancel",
    recent: "Recent Redemptions",
    none: "No redemptions yet.",
    viewReceipt: "View Redemption Receipt",
    brand: "Brand",
    amount: "Amount",
    status: "Status",
    demoPill: "Demo",
    needPoints: "Not enough points",
  },
  ur: {
    title: "انعامات",
    subtitle: "پاکستان کے لیے سہولتیں",
    balance: "پوائنٹس بیلنس",
    redeem: "ریڈیم",
    choose: "رقم منتخب کریں",
    confirm: "تصدیق",
    cancel: "منسوخ",
    recent: "حالیہ ریڈیمپشنز",
    none: "ابھی تک کوئی ریڈیمپشن نہیں۔",
    viewReceipt: "ریڈیمپشن رسید",
    brand: "برانڈ",
    amount: "رقم",
    status: "اسٹیٹس",
    demoPill: "ڈیمو",
    needPoints: "پوائنٹس ناکافی",
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

/** ------------------- Local demo store (fallback) ------------------- */
type Redemption = {
  id: string;
  brand: string;
  amount: number;
  points: number; // points debited
  createdAt: string; // ISO
  status: "POSTED";
};

const LS_POINTS = "rb-demo-points";
const LS_REDEMPTIONS = "rb-demo-redemptions";

// Seed nice demo defaults if empty.
function ensureSeed() {
  const hasPoints = localStorage.getItem(LS_POINTS);
  const hasRedemptions = localStorage.getItem(LS_REDEMPTIONS);
  if (!hasPoints) localStorage.setItem(LS_POINTS, JSON.stringify(12000)); // 12,000 pts
  if (!hasRedemptions) localStorage.setItem(LS_REDEMPTIONS, JSON.stringify([]));
}

function getPoints(): number {
  if (demo?.getPointsBalance) return demo.getPointsBalance();
  try {
    ensureSeed();
    return JSON.parse(localStorage.getItem(LS_POINTS) || "0");
  } catch {
    return 0;
  }
}

function setPoints(val: number) {
  if (demo?.setPointsBalance) return demo.setPointsBalance(val);
  localStorage.setItem(LS_POINTS, JSON.stringify(Math.max(0, Math.floor(val))));
}

function listRedemptions(): Redemption[] {
  if (demo?.listRedemptions) return demo.listRedemptions();
  try {
    ensureSeed();
    return JSON.parse(localStorage.getItem(LS_REDEMPTIONS) || "[]");
  } catch {
    return [];
  }
}

function pushRedemption(rec: Redemption) {
  if (demo?.pushRedemption) return demo.pushRedemption(rec);
  const arr = listRedemptions();
  arr.unshift(rec);
  localStorage.setItem(LS_REDEMPTIONS, JSON.stringify(arr));
}

function redeemVoucher(brand: string, amount: number): Redemption | null {
  // If central engine exists, prefer it.
  if (demo?.redeemVoucher) return demo.redeemVoucher(brand, amount);

  const pts = getPoints();
  const needed = amount; // 1 PKR = 1 point equivalence (demo)
  if (pts < needed) return null;

  const rec: Redemption = {
    id: `rb-red-${Date.now()}`,
    brand,
    amount,
    points: needed,
    createdAt: new Date().toISOString(),
    status: "POSTED",
  };
  setPoints(pts - needed);
  pushRedemption(rec);
  return rec;
}

/** --------------------- Page Component --------------------- */
export default function RewardsPage() {
  const lang = useLang();
  const t = strings[lang];

  // UI state
  const [balance, setBalance] = useState<number>(0);
  const [list, setList] = useState<Redemption[]>([]);
  const [brand, setBrand] = useState<string>("FoodPanda");
  const [denom, setDenom] = useState<number>(500);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>("");

  // seed + load on mount
  useEffect(() => {
    try {
      if (!demo) ensureSeed();
      setBalance(getPoints());
      setList(listRedemptions());
    } catch {}
  }, []);

  const denominations = useMemo(() => [250, 500, 1000, 2500, 5000], []);
  const brands = useMemo(
    () => ["FoodPanda", "Careem", "Daraz", "KE Electric", "JazzCash"],
    []
  );

  async function onRedeem() {
    setError("");
    setBusy(true);
    console.warn("[demo] redeem", { brand, denom });
    try {
      const res = redeemVoucher(brand, denom);
      if (!res) {
        setError(t.needPoints);
      } else {
        // Refresh lists
        setBalance(getPoints());
        setList(listRedemptions());
      }
    } catch (e) {
      setError("Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  // "Demo" pill in-page (your bottom nav stays as-is)
  const demoPill = (
    <span className="ml-2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] px-2 py-1">
      {t.demoPill}
    </span>
  );

  return (
    <div className="max-w-md mx-auto p-4 space-y-10">
      {/* Header card */}
      <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-sm opacity-70">{t.subtitle}</p>
          </div>
          {demoPill}
        </div>

        <div className="mt-5 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white p-4">
          <div className="text-xs opacity-90">{t.balance}</div>
          <div className="text-3xl font-extrabold">{balance.toLocaleString()} pts</div>
        </div>
      </section>

      {/* Redeem card */}
      <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5 space-y-4">
        <h2 className="font-semibold">{t.redeem}</h2>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs opacity-70">{t.brand}</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs opacity-70">{t.amount}</label>
            <select
              value={denom}
              onChange={(e) => setDenom(parseInt(e.target.value))}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
            >
              {denominations.map((d) => (
                <option key={d} value={d}>
                  PKR {d.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            disabled={busy}
            onClick={onRedeem}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60"
          >
            {t.confirm}
          </button>
          <button
            disabled={busy}
            onClick={() => {
              setBrand("FoodPanda");
              setDenom(500);
              setError("");
            }}
            className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10"
          >
            {t.cancel}
          </button>
        </div>
      </section>

      {/* Recent redemptions */}
      <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
        <h2 className="font-semibold">{t.recent}</h2>
        <div className="mt-3 space-y-3">
          {list.length === 0 && (
            <p className="text-sm opacity-70">{t.none}</p>
          )}
          {list.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{r.brand}</div>
                <div className="text-xs opacity-70">
                  PKR {r.amount.toLocaleString()} •{" "}
                  {new Date(r.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs rounded-full px-2 py-1 border border-black/10 dark:border-white/10">
                  {r.status}
                </span>
                <Link
                  href={`/tenant/redeem/${encodeURIComponent(r.id)}`}
                  className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {t.viewReceipt}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
