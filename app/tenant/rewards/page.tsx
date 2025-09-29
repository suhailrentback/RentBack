"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import Link from "next/link";

type Lang = "en" | "ur";

type RewardEntry = {
  id: string;
  createdAt: string;
  type: "EARN" | "REDEEM";
  points: number;          // positive numbers for both earn and redeem (we’ll show minus visually)
  note?: string;
  meta?: { brand?: string; code?: string; amountPKR?: number };
};

// ---------- i18n ----------
const labels = {
  en: {
    title: "Rewards",
    subtitle: "Pakistan-focused perks",
    balance: "Points Balance",
    redeem: "Redeem",
    choose: "Choose a voucher",
    confirm: "Confirm Redemption",
    cancel: "Cancel",
    recent: "Recent Activity",
    none: "No redemptions yet — make a payment to earn points, then redeem a voucher.",
    notEnough: "Not enough points for that voucher.",
    receiptTitle: "Redemption Receipt",
    voucher: {
      foodpanda: "foodpanda",
      daraz: "Daraz",
      careem: "Careem",
      cinepax: "Cinepax",
    },
    denom: "Denomination",
    brandVoucher: "Voucher",
    code: "Code",
    points: "Points",
    done: "Done",
    viewReceipt: "View Receipt",
    print: "Print / Save",
    back: "Back",
  },
  ur: {
    title: "انعامات",
    subtitle: "پاکستان کے لیے سہولتیں",
    balance: "پوائنٹس بیلنس",
    redeem: "ریڈیم",
    choose: "وؤچر منتخب کریں",
    confirm: "تصدیق کریں",
    cancel: "منسوخ",
    recent: "حالیہ سرگرمی",
    none: "ابھی کوئی ریڈیمشن نہیں — پوائنٹس حاصل کرنے کے لیے ادائیگی کریں، پھر وؤچر ریڈیم کریں۔",
    notEnough: "اس وؤچر کے لیے پوائنٹس ناکافی ہیں۔",
    receiptTitle: "ریڈیمشن رسید",
    voucher: {
      foodpanda: "فوڈ پانڈا",
      daraz: "دراز",
      careem: "کریم",
      cinepax: "سینی پیکس",
    },
    denom: "رقم",
    brandVoucher: "وؤچر",
    code: "کوڈ",
    points: "پوائنٹس",
    done: "مکمل",
    viewReceipt: "رسید",
    print: "پرنٹ / محفوظ کریں",
    back: "واپس",
  },
} as const;

// ---------- demo storage helpers (shared with Pay flow) ----------
function loadPoints(): number {
  try {
    const raw = localStorage.getItem("rb-reward-balance");
    return raw ? Number(raw) : 0;
  } catch {
    return 0;
  }
}
function savePoints(v: number) {
  try {
    localStorage.setItem("rb-reward-balance", String(Math.max(0, Math.floor(v))));
  } catch {}
}
function loadRewardEntries(): RewardEntry[] {
  try {
    const raw = localStorage.getItem("rb-reward-entries");
    return raw ? (JSON.parse(raw) as RewardEntry[]) : [];
  } catch {
    return [];
  }
}
function saveRewardEntries(list: RewardEntry[]) {
  try {
    localStorage.setItem("rb-reward-entries", JSON.stringify(list));
  } catch {}
}

// ---------- simple brand catalog (demo) ----------
const catalog = [
  { id: "fp-1000", brand: "foodpanda", cost: 1000, pkr: 1000 },
  { id: "daraz-2000", brand: "daraz", cost: 2000, pkr: 2000 },
  { id: "careem-1500", brand: "careem", cost: 1500, pkr: 1500 },
  { id: "cinepax-1200", brand: "cinepax", cost: 1200, pkr: 1200 },
] as const;

export default function RewardsPage() {
  // lang / dir
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const htmlLang = document.documentElement.getAttribute("lang");
    setLang(htmlLang === "ur" ? "ur" : "en");
  }, []);
  const t = useMemo(() => labels[lang], [lang]);
  const dir = lang === "ur" ? "rtl" : "ltr";

  // data
  const [balance, setBalance] = useState(0);
  const [entries, setEntries] = useState<RewardEntry[]>([]);
  useEffect(() => {
    setBalance(loadPoints());
    setEntries(loadRewardEntries());
  }, []);

  // UI state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<RewardEntry | null>(null);

  const selected = catalog.find((c) => c.id === selectedId) || null;

  function redeemSelected() {
    if (!selected) return;
    if (balance < selected.cost) {
      alert(t.notEnough);
      return;
    }
    const id = `redeem-${Date.now()}`;
    const code = makeVoucherCode();
    const newEntry: RewardEntry = {
      id,
      createdAt: new Date().toISOString(),
      type: "REDEEM",
      points: selected.cost, // we store positive; show minus in UI
      note: `${selected.brand.toUpperCase()} ${selected.pkr}`,
      meta: { brand: selected.brand, code, amountPKR: selected.pkr },
    };

    // update localStorage
    const nextBalance = balance - selected.cost;
    const nextEntries = [newEntry, ...entries].slice(0, 200);
    setBalance(nextBalance);
    setEntries(nextEntries);
    savePoints(nextBalance);
    saveRewardEntries(nextEntries);

    setPickerOpen(false);
    setReceipt(newEntry);
    console.warn("[DEMO] Redeemed voucher", newEntry);
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-6" style={{ direction: dir }}>
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-sm opacity-70">{t.subtitle}</p>
        </div>

        {/* Points Card */}
        <div className="relative">
          <div
            className="rounded-2xl p-5 text-white shadow-lg overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(5,150,105,1) 0%, rgba(16,185,129,1) 60%, rgba(52,211,153,1) 100%)",
            }}
          >
            <div className="absolute -inset-16 opacity-20 blur-2xl bg-white/20 pointer-events-none" />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="text-xs/4 opacity-90">{t.balance}</div>
                <div className="mt-1 text-4xl font-extrabold tracking-tight">
                  {formatPoints(balance)}
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={() => setPickerOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 text-sm"
                >
                  {t.redeem}
                </button>
              </div>
            </div>
            <div className="mt-4 text-[11px] opacity-85">
              Demo: Earn +1% when you mark a payment “Sent” on Pay.
            </div>
          </div>
        </div>

        {/* Quick Redeem grid */}
        <section>
          <div className="text-sm font-medium opacity-80 mb-2">{t.choose}</div>
          <div className="grid grid-cols-2 gap-3">
            {catalog.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedId(c.id);
                  setPickerOpen(true);
                }}
                className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 text-left hover:bg-black/5 dark:hover:bg-white/10"
              >
                <div className="text-lg font-semibold capitalize">
                  {t.voucher[c.brand as keyof typeof t.voucher] ?? c.brand}
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {t.denom}: {formatPKR(c.pkr, lang)} • {t.points}: {formatPoints(c.cost)}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Recent activity */}
        <section className="space-y-2">
          <div className="text-sm font-medium opacity-80">{t.recent}</div>
          {entries.length === 0 ? (
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-sm opacity-75">
              {t.none}
            </div>
          ) : (
            <div className="space-y-2">
              {entries.slice(0, 10).map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-white/5 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-medium">
                      {r.type === "EARN" ? "Earn" : "Redeem"}
                    </div>
                    <div className="text-xs opacity-70">
                      {new Date(r.createdAt).toLocaleString()} • {r.note || ""}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={
                        "text-sm font-semibold " +
                        (r.type === "EARN" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")
                      }
                    >
                      {r.type === "EARN" ? "+" : "–"}
                      {formatPoints(r.points)}
                    </div>
                    {r.type === "REDEEM" && (
                      <button
                        onClick={() => setReceipt(r)}
                        className="mt-1 text-[11px] px-2 py-1 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        {t.viewReceipt}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Back to Home */}
        <div className="pt-1">
          <Link
            href="/tenant"
            className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            ← {t.back}
          </Link>
        </div>
      </div>

      {/* Redeem sheet */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center md:justify-center">
          <div className="w-full md:max-w-md bg-white dark:bg-[#0b0b0b] rounded-t-2xl md:rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{t.confirm}</div>
              <button
                onClick={() => setPickerOpen(false)}
                className="text-sm opacity-70 hover:opacity-100"
              >
                {t.cancel}
              </button>
            </div>
            <div className="mt-3 rounded-xl border border-black/10 dark:border-white/10 p-3">
              <div className="text-sm">
                <span className="opacity-70">{t.brandVoucher}:</span>{" "}
                <span className="font-medium capitalize">
                  {selected ? (labels[lang].voucher as any)[selected.brand] ?? selected.brand : "-"}
                </span>
              </div>
              <div className="text-sm mt-1">
                <span className="opacity-70">{t.denom}:</span>{" "}
                <span className="font-medium">{selected ? formatPKR(selected.pkr, lang) : "-"}</span>
              </div>
              <div className="text-sm mt-1">
                <span className="opacity-70">{t.points}:</span>{" "}
                <span className="font-medium">{selected ? formatPoints(selected.cost) : "-"}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setPickerOpen(false)}
                className="flex-1 px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              >
                {t.cancel}
              </button>
              <button
                onClick={redeemSelected}
                className="flex-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt modal */}
      {receipt && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="w-full max-w-md bg-white dark:bg-[#0b0b0b] rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{t.receiptTitle}</div>
              <button onClick={() => setReceipt(null)} className="opacity-70 hover:opacity-100">
                ✕
              </button>
            </div>

            <div className="mt-3 rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
              <div className="text-sm">
                <span className="opacity-70">{t.brandVoucher}:</span>{" "}
                <span className="font-medium capitalize">
                  {receipt.meta?.brand
                    ? (labels[lang].voucher as any)[receipt.meta.brand] ?? receipt.meta.brand
                    : "-"}
                </span>
              </div>
              <div className="text-sm mt-1">
                <span className="opacity-70">{t.denom}:</span>{" "}
                <span className="font-medium">
                  {receipt.meta?.amountPKR ? formatPKR(receipt.meta.amountPKR, lang) : "-"}
                </span>
              </div>
              <div className="text-sm mt-1">
                <span className="opacity-70">{t.points}:</span>{" "}
                <span className="font-medium">-{formatPoints(receipt.points)}</span>
              </div>
              <div className="text-sm mt-1">
                <span className="opacity-70">ID:</span>{" "}
                <span className="font-mono">{receipt.id}</span>
              </div>
              <div className="text-sm mt-1">
                <span className="opacity-70">{t.code}:</span>{" "}
                <span className="font-mono">{receipt.meta?.code ?? "-"}</span>
              </div>
              <div className="text-[11px] opacity-70 mt-3">
                Demo: Not a real redemption.
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              >
                {t.print}
              </button>
              <button
                onClick={() => setReceipt(null)}
                className="flex-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {t.done}
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileAppShell>
  );
}

// ---------- utils ----------
function makeVoucherCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 12; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s.replace(/(.{4})/g, "$1-").replace(/-$/g, "");
}
function formatPoints(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.max(0, Math.floor(n)));
}
function formatPKR(amount: number, lang: Lang) {
  try {
    return new Intl.NumberFormat(lang === "ur" ? "ur-PK" : "en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `PKR ${amount.toLocaleString()}`;
  }
}
