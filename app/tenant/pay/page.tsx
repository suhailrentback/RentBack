"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ensureSeed,
  listPayments,
  upsertPayment,
  accrueForPayment,
} from "@/lib/demo";

type Lang = "en" | "ur";
const strings = {
  en: {
    title: "Pay Rent",
    subtitle: "Demo Mode — no real charges",
    amount: "Amount (PKR)",
    landlord: "Landlord / Property",
    method: "Method",
    create: "Create Payment (Demo)",
    recent: "Recent",
    markSent: "Mark as Sent",
    status: "Status",
    sent: "Sent",
    created: "Created",
    csv: "Download CSV",
    invalid: "Enter amount and landlord name.",
    demoPill: "Demo",
  },
  ur: {
    title: "کرایہ ادا کریں",
    subtitle: "ڈیمو — کوئی حقیقی چارج نہیں",
    amount: "رقم (PKR)",
    landlord: "مالک / پراپرٹی",
    method: "طریقہ",
    create: "ادائیگی بنائیں (ڈیمو)",
    recent: "حالیہ",
    markSent: "Sent نشان",
    status: "اسٹیٹس",
    sent: "بھیج دیا",
    created: "بن گیا",
    csv: "CSV ڈاؤن لوڈ",
    invalid: "رقم اور مالک/پراپرٹی لکھیں۔",
    demoPill: "ڈیمو",
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

type Payment = {
  id: string;
  landlord: string;
  amount: number;
  method: "Raast" | "Card" | "Wallet";
  status: "CREATED" | "SENT";
  createdAt: string;
};

export default function PayPage() {
  const lang = useLang();
  const t = strings[lang];

  const [amount, setAmount] = useState<number | "">("");
  const [landlord, setLandlord] = useState("");
  const [method, setMethod] = useState<Payment["method"]>("Raast");
  const [error, setError] = useState("");

  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    ensureSeed();
    refresh();
  }, []);

  function refresh() {
    setPayments(listPayments());
  }

  function onCreate() {
    setError("");
    const amt = typeof amount === "string" ? 0 : amount;
    if (!amt || !landlord.trim()) {
      setError(t.invalid);
      return;
    }
    const p: Payment = {
      id: `rb-pay-${Date.now()}`,
      landlord: landlord.trim(),
      amount: Math.floor(amt),
      method,
      status: "CREATED",
      createdAt: new Date().toISOString(),
    };
    upsertPayment(p);
    refresh();
    setAmount("");
    setLandlord("");
    setMethod("Raast");
    console.warn("[demo] create payment", p);
  }

  function onMarkSent(p: Payment) {
    if (p.status === "SENT") return;
    const updated: Payment = { ...p, status: "SENT" };
    upsertPayment(updated);
    accrueForPayment(updated.id, updated.amount); // ← 1% points
    refresh();
  }

  function toCSV() {
    const rows = [
      ["id", "createdAt", "landlord", "amountPKR", "method", "status"],
      ...payments.map((p) => [
        p.id,
        new Date(p.createdAt).toISOString(),
        p.landlord,
        String(p.amount),
        p.method,
        p.status,
      ]),
    ];
    const csv = rows.map((r) => r.map(escapeCSV).join(",")).join("\n");
    downloadBlob(csv, "text/csv;charset=utf-8;", "tenant-payments.csv");
  }

  const demoPill = (
    <span className="ml-2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] px-2 py-1">
      {t.demoPill}
    </span>
  );

  return (
    <div className="max-w-md mx-auto p-4 space-y-10">
      <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-sm opacity-70">{t.subtitle}</p>
          </div>
          {demoPill}
        </div>

        <div className="grid grid-cols-1 gap-3 mt-5">
          <div>
            <label className="text-xs opacity-70">{t.amount}</label>
            <input
              inputMode="numeric"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value ? parseInt(e.target.value.replace(/\D/g, "")) : "")
              }
              placeholder="65000"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-black/10 dark:border_white/10 bg-transparent"
            />
          </div>
          <div>
            <label className="text-xs opacity-70">{t.landlord}</label>
            <input
              value={landlord}
              onChange={(e) => setLandlord(e.target.value)}
              placeholder="Gulshan Residency"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-black/10 dark:border_white/10 bg-transparent"
            />
          </div>
          <div>
            <label className="text-xs opacity-70">{t.method}</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as Payment["method"])}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-black/10 dark:border_white/10 bg-transparent"
            >
              <option>Raast</option>
              <option>Card</option>
              <option>Wallet</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={onCreate}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {t.create}
            </button>
            <button
              onClick={toCSV}
              className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10"
            >
              {t.csv}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">{t.recent}</h2>
        </div>

        <div className="space-y-3">
          {payments.length === 0 && <p className="text-sm opacity-70">No payments yet.</p>}

          {payments.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">
                  PKR {p.amount.toLocaleString()} • {p.landlord}
                </div>
                <div className="text-xs opacity-70">
                  {new Date(p.createdAt).toLocaleString()} • {t.status}:{" "}
                  <span className="font-medium">
                    {p.status === "SENT" ? t.sent : t.created}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/tenant/receipt/${encodeURIComponent(p.id)}`}
                  className="text-xs px-3 py-2 rounded-lg border border-black/10 dark:border-white/10"
                >
                  Receipt
                </Link>
                {p.status !== "SENT" && (
                  <button
                    onClick={() => onMarkSent(p)}
                    className="text-xs px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {t.markSent}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function escapeCSV(s: string) {
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
function downloadBlob(text: string, type: string, filename: string) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
