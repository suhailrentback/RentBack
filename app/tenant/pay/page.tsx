"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MobileAppShell from "@/components/MobileAppShell";

// 1) Local i18n just for this page (so we don't rely on t.pay)
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
    markSent: "Mark as Sent",
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
    markSent: "بھیجا ہوا نشان لگائیں",
    viewReceipt: "رسید دیکھیں",
    created: "ادائیگی بن گئی (ڈیمو)",
    noneYet: "ابھی تک کوئی ادائیگی نہیں۔",
  },
} as const;

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

// Helpers to read/save demo payments from localStorage
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

export default function TenantPayPage() {
  // 2) Detect language and direction from <html> (set by MobileAppShell)
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const htmlLang = document.documentElement.getAttribute("lang");
    setLang(htmlLang === "ur" ? "ur" : "en");
  }, []);
  const t = useMemo(() => labels[lang], [lang]);
  const dir = lang === "ur" ? "rtl" : "ltr";

  // 3) Form state
  const [amount, setAmount] = useState<string>("");
  const [landlord, setLandlord] = useState<string>("");
  const [method, setMethod] = useState<Method>("RAAST");

  // 4) Demo data state
  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [justCreatedId, setJustCreatedId] = useState<string | null>(null);
  const justCreated = useMemo(
    () => payments.find((p) => p.id === justCreatedId) || null,
    [payments, justCreatedId]
  );

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  function submitDemo() {
    const val = Number(amount.replace(/[, ]/g, ""));
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
    const next = [p, ...payments].slice(0, 50);
    setPayments(next);
    savePayments(next);
    setJustCreatedId(id);
    console.warn("[DEMO] Created payment", p);
  }

  function markSent(id: string) {
    const next = payments.map((p) => (p.id === id ? { ...p, status: "SENT" } : p));
    setPayments(next);
    savePayments(next);
    console.warn("[DEMO] Marked as sent", id);
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4" style={{ direction: dir }}>
        <h1 className="text-xl font-semibold">{t.title}</h1>
        <p className="text-sm opacity-70">{t.subtitle}</p>

        {/* Form card */}
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
              <button
                onClick={() => setMethod("RAAST")}
                className={`px-3 py-2 rounded-lg border ${
                  method === "RAAST"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-black/10 dark:border-white/10"
                }`}
              >
                {t.methodRaast}
              </button>
              <button
                onClick={() => setMethod("CARD")}
                className={`px-3 py-2 rounded-lg border ${
                  method === "CARD"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-black/10 dark:border-white/10"
                }`}
              >
                {t.methodCard}
              </button>
              <button
                onClick={() => setMethod("WALLET")}
                className={`px-3 py-2 rounded-lg border ${
                  method === "WALLET"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-black/10 dark:border-white/10"
                }`}
              >
                {t.methodWallet}
              </button>
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

        {/* Created banner + actions */}
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

        {/* Recent list */}
        <section className="space-y-2">
          <h2 className="text-sm font-medium opacity-80">{t.recent}</h2>
          {payments.length === 0 ? (
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-sm opacity-75">
              {t.noneYet}
            </div>
          ) : (
            payments.slice(0, 6).map((p) => (
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
                  <div className="font-semibold">
                    {new Intl.NumberFormat(lang === "ur" ? "ur-PK" : "en-PK", {
                      style: "currency",
                      currency: "PKR",
                      maximumFractionDigits: 0,
                    }).format(p.amount)}
                  </div>
                  <div className="text-[11px] opacity-70">{p.status}</div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </MobileAppShell>
  );
}
