"use client";
export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";
import { formatPKR, getPaymentById } from "@/lib/demo";

// very loose type so we don't block builds if demo shape changes
type PaymentMethod = "RAAST" | "CARD" | "WALLET" | "CASH" | string;
type DemoPayment = {
  id: string;
  amount: number;
  landlord?: string;
  property?: string;
  propertyName?: string;
  method?: PaymentMethod;
  status?: string;
  createdAt?: string;
  memo?: string;
  iban?: string;
  party?: string;
};

export default function ReceiptPage({ params }: { params: { id: string } }) {
  const [payment, setPayment] = useState<DemoPayment | null>(null);
  const [loading, setLoading] = useState(true);

  // read language for labels
  const lang: "en" | "ur" = useMemo(() => {
    if (typeof window !== "undefined") {
      const l = localStorage.getItem("rb-lang");
      if (l === "en" || l === "ur") return l;
    }
    return (process.env.NEXT_PUBLIC_DEFAULT_LANG as any) === "ur" ? "ur" : "en";
  }, []);
  const t = strings[lang];

  useEffect(() => {
    try {
      const found = getPaymentById(params.id);
      setPayment(found ?? null);
    } catch (e) {
      console.warn("receipt: load error", e);
      setPayment(null);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto p-4">
        {/* Header / actions */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/tenant"
            className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            ← {t.nav.home}
          </Link>

          <button
            onClick={() => window.print()}
            className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t.pay.print}
          </button>
        </div>

        {/* Loading / Empty */}
        {loading && (
          <div className="space-y-3">
            <RowSkel />
            <RowSkel />
            <RowSkel />
          </div>
        )}

        {!loading && !payment && (
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-lg font-semibold mb-1">{t.pay.receipt}</div>
            <div className="text-sm opacity-75 mb-4">Not found.</div>
            <Link
              href="/tenant"
              className="inline-block text-sm px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t.nav.home}
            </Link>
          </div>
        )}

        {/* Receipt card */}
        {payment && (
          <div className="print:shadow-none print:border print:border-black/10 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-5">
            {/* Brand + demo watermark */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                <Logo />
                <span>RentBack</span>
              </div>
              <span className="text-xs px-2 py-1 rounded-lg bg-black/5 dark:bg-white/10">
                Demo
              </span>
            </div>

            <div className="mt-4 text-2xl font-semibold tracking-tight">
              {formatPKR(payment.amount || 0)}
            </div>

            <div className="mt-1 text-sm opacity-75">
              {labelFor(lang, "status")}: {labelStatus(payment.status)}
            </div>

            <hr className="my-5 border-black/10 dark:border-white/10" />

            <dl className="grid grid-cols-1 gap-3 text-sm">
              <Row label={t.pay.landlord} value={pickProperty(payment)} />
              <Row label={t.pay.method} value={payment.method || "RAAST"} />
              <Row label={t.pay.transferTo} value={payment.iban || t.pay.collections} />
              <Row label="Ref #" value={payment.id} />
              <Row label="Created" value={safeDate(payment.createdAt)} />
              {payment.memo ? <Row label={t.pay.memo} value={payment.memo} /> : null}
            </dl>

            {/* Fake Raast QR / verification */}
            <div className="mt-6 grid grid-cols-[96px,1fr] gap-4 items-center">
              <div className="h-24 w-24 rounded bg-black/5 dark:bg-white/10 flex items-center justify-center text-[10px] opacity-70">
                QR
              </div>
              <p className="text-xs opacity-70 leading-relaxed">
                Demo: Not a real payment. This receipt is for product preview only.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Print styles (A4 friendly margins) */}
      <style jsx global>{`
        @media print {
          html,
          body {
            background: #fff !important;
          }
          nav,
          button[aria-label="Open menu"],
          .fixed {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border {
            border-width: 1px !important;
          }
          @page {
            margin: 16mm;
          }
        }
      `}</style>
    </MobileAppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="opacity-70">{label}</dt>
      <dd className="font-medium text-right">{value}</dd>
    </div>
  );
}

function RowSkel() {
  return <div className="h-10 rounded-lg bg-black/5 dark:bg-white/10 animate-pulse" />;
}

function Logo({ size = 20, stroke = "#059669" }: { size?: number; stroke?: string }) {
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

/* ---------- helpers ---------- */

function labelFor(lang: "en" | "ur", key: keyof typeof strings["en"]["pay"]) {
  return strings[lang].pay[key] as string;
}

function labelStatus(s?: string) {
  if (!s) return "Pending";
  const up = s.toUpperCase();
  if (up.includes("POST")) return "Succeeded";
  if (up.includes("FAIL")) return "Failed";
  if (up.includes("SENT")) return "Sent";
  return "Pending";
}

function pickProperty(p: DemoPayment) {
  return p.property || p.propertyName || p.landlord || p.party || "Property";
}

function safeDate(createdAt?: string) {
  const iso = createdAt || new Date().toISOString();
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
