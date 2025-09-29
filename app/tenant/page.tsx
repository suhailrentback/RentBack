"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MobileAppShell from "@/components/MobileAppShell";

type Lang = "en" | "ur";
type Method = "RAAST" | "CARD" | "WALLET";

type DemoPayment = {
  id: string;
  createdAt: string;
  property: string;
  amount: number;
  method: Method;
  status: "PENDING" | "SENT";
};

const labels = {
  en: {
    title: "Pay Rent",
    subtitle: "Demo mode — no real charges",
    amount: "Amount (PKR)",
    landlord: "Landlord / Property",
    method: "Method",
    methodRaast: "Raast (Bank Transfer)",
    methodCard: "Card",
    methodWallet: "Wallet",
    submit: "Create Payment (Demo)",
    invalid: "Enter amount and landlord name.",
    recent: "Recent",
    markSent: "Mark as Sent (+1% points)",
    viewReceipt: "View Receipt",
    created: "Payment created (demo)",
    noneYet: "No recent payments yet.",
  },
  ur: {
    title: "کرایہ ادا کریں",
    subtitle: "ڈیمو — کوئی حقیقی چارج نہیں",
    amount: "رقم (PKR)",
    landlord: "مالک / پراپرٹی",
    method: "طریقہ",
    methodRaast: "راست (بینک ٹرانسفر)",
    methodCard: "کارڈ",
    methodWallet: "والیٹ",
    submit: "ادائیگی بنائیں (ڈیمو)",
    invalid: "رقم اور مالک/پراپرٹی لکھیں۔",
    recent: "حالیہ",
    markSent: "بھیجا ہوا نشان (+1% پوائنٹس)",
    viewReceipt: "رسید دیکھیں",
    created: "ادائیگی بن گئی (ڈیمو)",
    noneYet: "ابھی تک کوئی ادائیگی نہیں۔",
  },
} as const;

// storage helpers
function loadPayments(): DemoPayment[] {
  try {
    const raw = localStorage.getItem("rb-payments");
    return raw ? (JSON.parse(raw) as DemoPayment[]) : [];
  } catch {
    return [];
  }
}
function savePayments(list: DemoPayment[]) {
  try {
    localStorage.setItem("rb-payments", JSON.stringify(list));
  } catch {}
}
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
type RewardEntry = {
  id: string;
  createdAt: string;
  type: "EARN" | "REDEEM";
  points: number; // positive for EARN, negative for REDEEM
  note?: string;
};
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

export default function TenantPayPage() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const htmlLang = document.documentElement.getAttribute("lang");
    setLang(htmlLang === "ur" ? "ur" : "en");
  }, []);
  const t = useMemo(() => labels[lang], [lang]);
  const dir = lang === "ur" ? "rtl" : "ltr";

  // form
  const [amount, setAmount] = useState("");
  const [landlord, setLandlord] = useState("");
  const [method, setMethod] = useState<Method>("RAAST");

  // data
  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [justCreatedId, setJustCreatedId] = useState<string | null>(null);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  function submitDemo() {
    const val = Number((amount || "").replace(/[, ]/g, ""));
    if (!landlord || isNaN(val) || val <= 0) {
      alert(t.invalid);
      return;
    }
    const id = String(Date.now());
    const p: DemoPayment = {
      id,
      createdAt: new Date().toISOString(),
      property: landlord.trim(),
      amount: val,
      method,
      status: "PENDING",
    };
    const next: DemoPayment[] = [p, ...payments].slice(0, 50);
    setPayments(next);
    savePayments(next);
    setJustCreatedId(id);
    console.warn("[DEMO] Created payment", p);
  }

  function markSent(id: string) {
    // ✅ Force the mapped result to be DemoPayment[] and keep the literal "SENT"
    const next: DemoPayment[] = payments.map((p): DemoPayment =>
      p.id === id ? { ...p, status: "SENT" as const } : p
    );
    setPayments(next);
    savePayments(next);

    // rewards: +1% on SENT
    const paid = next.find((p) => p.id === id);
    if (paid) {
      const earn = Math.floor(paid.amount * 0.01);
      const prev = loadPoints();
      const newBal = prev + earn;
      savePoints(newBal);

      const ledger = loadRewardEntries();
      ledger.unshift({
        id: `earn-${id}`,
        createdAt: new Date().toISOString(),
        type: "EARN",
        points: earn,
        note: `1% back for payment ${id}`,
      });
      saveRewardEntries(ledger.slice(0, 200));
      console.warn("[DEMO] Marked as sent & awarded points", { id, earn, newBal });
    }
  }

  const justCreated = payments.find((p) => p.id === justCreatedId) || null;

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4" style={{ direction: dir }}>
        <h1 className="text-xl font-semibold">{t.title}</h1>
        <p className="text-sm opacity-70">{t.subtitle}</p>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 space-y-3">
          <div>
            <label className="text-xs opacity-70">{t.amount}</label>
            <input
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="65,000"
              className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="text-xs opacity-70">{t.landlord}</label>
            <input
              value={landlord}
              onChange={(e) => setLandlord(e.target.value)}
              placeholder="Ali Estates — Clifton"
              className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="text-xs opacity-70">{t.method}</label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {(["RAAST", "CARD", "WALLET"] as Method[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`px-3 py-2 rounded-lg border ${
                    method === m
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "border-black/10 dark:border-white/10"
                  }`}
                >
                  {m === "RAAST" ? t.methodRaast : m === "CARD" ? t.methodCard : t.methodWallet}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={submitDemo}
              className="w-full px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            >
              {t.submit}
            </button>
          </div>
        </div>

        {justCreated && (
          <div className="rounded-xl border border-emerald-600/30 bg-emerald-600/10 p-3">
            <div className="text-sm">
              ✅ {t.created}: <span className="font-mono">{justCreated.id}</span>
            </div>
            <div className="mt-2 flex gap-2">
              {justCreated.status !== "SENT" && (
                <button
                  onClick={() => markSent(justCreated.id)}
                  className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
                >
                  {t.markSent}
                </button>
              )}
              <Link
                href={`/tenant/receipt/${justCreated.id}`}
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
              >
                {t.viewReceipt}
              </Link>
            </div>
          </div>
        )}

        <section className="space-y-2">
          <h2 className="text-sm font-medium opacity-80">{t.recent}</h2>
          {payments.length === 0 ? (
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-sm opacity-75">
              {t.noneYet}
            </div>
          ) : (
            payments.slice(0, 6).map((p) => {
              const fmt = new Intl.NumberFormat(lang === "ur" ? "ur-PK" : "en-PK", {
                style: "currency",
                currency: "PKR",
                maximumFractionDigits: 0,
              });
              return (
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
              );
            })
          )}
        </section>
      </div>
    </MobileAppShell>
  );
}
