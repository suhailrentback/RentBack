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

function loadPayments(): Payment[] {
  try {
    const raw = localStorage.getItem("rb-payments");
    return raw ? (JSON.parse(raw) as Payment[]) : [];
  } catch {
    return [];
  }
}

const labels = {
  en: {
    back: "← Home",
    title: "Payment Receipt",
    demo: "Demo: Not a real payment",
    property: "Property",
    amount: "Amount",
    method: "Method",
    status: "Status",
    created: "Created At",
    print: "Print / Save PDF",
    support: "Need help?",
  },
  ur: {
    back: "← ہوم",
    title: "ادائیگی رسید",
    demo: "ڈیمو: حقیقی ادائیگی نہیں",
    property: "پراپرٹی",
    amount: "رقم",
    method: "طریقہ",
    status: "اسٹیٹس",
    created: "تاریخ",
    print: "پرنٹ / PDF",
    support: "مدد درکار؟",
  },
} as const;

export default function ReceiptPage({ params }: { params: { id: string } }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => labels[lang], [lang]);
  const dir = lang === "ur" ? "rtl" : "ltr";

  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    const htmlLang = document.documentElement.getAttribute("lang");
    setLang(htmlLang === "ur" ? "ur" : "en");
    const list = loadPayments();
    setPayment(list.find((p) => p.id === params.id) || null);
  }, [params.id]);

  const fmt = new Intl.NumberFormat(lang === "ur" ? "ur-PK" : "en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  });

  return (
    <MobileAppShell>
      <div className="p-4" style={{ direction: dir }}>
        <div className="flex items-center justify-between">
          <Link
            href="/tenant"
            className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {t.back}
          </Link>
          <button
            onClick={() => window.print()}
            className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t.print}
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-5 print:p-8 print:bg-white print:text-black">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{t.title}</div>
            <div className="text-xs px-2 py-1 rounded-full bg-amber-500 text-white">{t.demo}</div>
          </div>

          {!payment ? (
            <div className="mt-6 text-sm opacity-75">Not found.</div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 print:grid-cols-2">
                <div>
                  <div className="text-xs opacity-70">{t.property}</div>
                  <div className="font-medium">{payment.property}</div>
                </div>
                <div>
                  <div className="text-xs opacity-70">{t.amount}</div>
                  <div className="font-medium">{fmt.format(payment.amount)}</div>
                </div>
                <div>
                  <div className="text-xs opacity-70">{t.method}</div>
                  <div className="font-medium">{payment.method}</div>
                </div>
                <div>
                  <div className="text-xs opacity-70">{t.status}</div>
                  <div className="font-medium">{payment.status}</div>
                </div>
                <div>
                  <div className="text-xs opacity-70">{t.created}</div>
                  <div className="font-medium">{new Date(payment.createdAt).toLocaleString()}</div>
                </div>
              </div>

              {/* Fake Raast QR + ref */}
              <div className="mt-8 flex items-center gap-4 print:gap-8">
                <div
                  className="h-28 w-28 bg-[radial-gradient(circle,_#0ea5,#10b981_40%,_transparent_41%)]"
                  style={{ maskImage: "radial-gradient(circle, black 60%, transparent 61%)" }}
                />
                <div className="text-sm">
                  <div className="opacity-70">Ref</div>
                  <div className="font-mono text-lg">PK-RBT-{payment.id.slice(-6)}</div>
                </div>
              </div>

              <div className="mt-8 text-xs opacity-70">
                {t.demo}. RentBack • help@rentback.app
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media print {
          nav, button[aria-label="Open menu"], .fixed { display: none !important; }
          body, html { background: #fff !important; }
        }
      `}</style>
    </MobileAppShell>
  );
}
