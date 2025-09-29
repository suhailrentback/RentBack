"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";

type Lang = "en" | "ur";

type RewardEntry = {
  id: string;
  createdAt: string;
  type: "EARN" | "REDEEM";
  points: number; // positive for EARN, negative for REDEEM
  note?: string;
};

const labels = {
  en: {
    title: "Rewards",
    subtitle: "Pakistan-focused perks (demo)",
    balance: "Balance",
    redeem: "Redeem",
    recent: "Recent redemptions",
    none: "No redemptions yet.",
    voucher: "Voucher",
    confirm: "Confirm Redemption",
    cancel: "Cancel",
  },
  ur: {
    title: "انعامات",
    subtitle: "پاکستان کے لیے سہولتیں (ڈیمو)",
    balance: "بیلنس",
    redeem: "ریڈیم",
    recent: "حالیہ ریڈیمپشنز",
    none: "ابھی تک کوئی ریڈیمپشن نہیں۔",
    voucher: "واؤچر",
    confirm: "تصدیق",
    cancel: "منسوخ",
  },
} as const;

// storage helpers
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

// demo voucher catalog
const vouchers = [
  { id: "khaadi-500", brand: "Khaadi", denom: 500, cost: 500 },
  { id: "ideas-1000", brand: "Gul Ahmed Ideas", denom: 1000, cost: 950 },
  { id: "foodpanda-1500", brand: "Foodpanda", denom: 1500, cost: 1400 },
];

export default function RewardsPage() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const htmlLang = document.documentElement.getAttribute("lang");
    setLang(htmlLang === "ur" ? "ur" : "en");
  }, []);
  const t = useMemo(() => labels[lang], [lang]);
  const dir = lang === "ur" ? "rtl" : "ltr";

  const [points, setPoints] = useState(0);
  const [ledger, setLedger] = useState<RewardEntry[]>([]);
  const [sel, setSel] = useState<string | null>(null);

  useEffect(() => {
    setPoints(loadPoints());
    setLedger(loadRewardEntries());
  }, []);

  function redeem(id: string) {
    const v = vouchers.find((x) => x.id === id);
    if (!v) return;
    if (points < v.cost) return alert("Not enough points.");
    const newBal = points - v.cost;
    setPoints(newBal);
    savePoints(newBal);

    const entry: RewardEntry = {
      id: `redeem-${Date.now()}`,
      createdAt: new Date().toISOString(),
      type: "REDEEM",
      points: -v.cost,
      note: `${v.brand} PKR ${v.denom}`,
    };
    const next = [entry, ...ledger].slice(0, 200);
    setLedger(next);
    saveRewardEntries(next);
    setSel(null);
    console.warn("[DEMO] Redeemed voucher", entry);
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4" style={{ direction: dir }}>
        <div>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-sm opacity-70">{t.subtitle}</p>
        </div>

        {/* Balance card */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
          <div className="text-xs opacity-70">{t.balance}</div>
          <div className="mt-2 text-3xl font-semibold">{points.toLocaleString()}</div>
        </div>

        {/* Catalog */}
        <div className="grid grid-cols-1 gap-3">
          {vouchers.map((v) => (
            <div
              key={v.id}
              className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{v.brand}</div>
                <div className="text-xs opacity-70">
                  {t.voucher}: PKR {v.denom.toLocaleString()} • Cost: {v.cost.toLocaleString()} pts
                </div>
              </div>
              <button
                onClick={() => setSel(v.id)}
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
              >
                {t.redeem}
              </button>
            </div>
          ))}
        </div>

        {/* Confirm modal (simple inline card) */}
        {sel && (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            {(() => {
              const v = vouchers.find((x) => x.id === sel)!;
              return (
                <>
                  <div className="font-medium">
                    {t.redeem}: {v.brand} — PKR {v.denom.toLocaleString()}
                  </div>
                  <div className="text-sm opacity-70 mt-1">Cost: {v.cost.toLocaleString()} pts</div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => redeem(v.id)}
                      className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                    >
                      {t.confirm}
                    </button>
                    <button
                      onClick={() => setSel(null)}
                      className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm"
                    >
                      {t.cancel}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Recent redemptions */}
        <section className="space-y-2">
          <div className="text-sm font-medium opacity-80">{t.recent}</div>
          {ledger.filter((e) => e.type === "REDEEM").length === 0 ? (
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-sm opacity-75">
              {t.none}
            </div>
          ) : (
            ledger
              .filter((e) => e.type === "REDEEM")
              .slice(0, 8)
              .map((e) => (
                <div
                  key={e.id}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between bg-white dark:bg-white/5"
                >
                  <div>
                    <div className="font-medium">{e.note || "Voucher"}</div>
                    <div className="text-xs opacity-70">{new Date(e.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{e.points.toLocaleString()} pts</div>
                    <div className="text-[11px] opacity-70">Redeemed</div>
                  </div>
                </div>
              ))
          )}
        </section>
      </div>
    </MobileAppShell>
  );
}
