"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";

type Method = "RAAST" | "BANK" | "JAZZCASH";
type Status = "PENDING" | "SENT";
type DemoPayment = {
  id: string;
  createdAt: string; // ISO
  property: string;
  amount: number; // PKR
  method: Method;
  status: Status;
};

const PAY_KEY = "rb-tenant-payments";

// ---- helpers ----
type Lang = "en" | "ur";
function formatPKR(amount: number) {
  try {
    return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `PKR ${amount.toLocaleString()}`;
  }
}
function lsGetJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function langFromHtml(): Lang {
  if (typeof document === "undefined") return "en";
  const l = document.documentElement.getAttribute("lang");
  return l === "ur" ? "ur" : "en";
}

// Simple fake Raast reference derived from payment id and date
function raastFor(p: DemoPayment) {
  const d = new Date(p.createdAt);
  const yyyy = d.getFullYear().toString().slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const tail = p.id.slice(-4).replace(/\D/g, "").padStart(4, "0");
  return `PK${yyyy}${mm}${dd}-RB-${tail}`;
}

// Tiny CSS “QR”: 21×21 pseudo grid with a deterministic pattern from the id.
function QR({ seed }: { seed: string }) {
  const bits: number[] = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  for (let i = 0; i < 21 * 21; i++) {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    bits.push(h & 1);
  }
  return (
    <div className="grid grid-cols-[repeat(21,6px)] grid-rows-[repeat(21,6px)] gap-[2px] p-2 rounded-lg bg-white border border-black/10">
      {bits.map((b, i) => (
        <div key={i} className={b ? "bg-black" : "bg-white"} />
      ))}
    </div>
  );
}

export default function ReceiptPage({ params }: { params: { id: string } }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = strings[lang].receipt;
  const [payment, setPayment] = useState<DemoPayment | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setLang(langFromHtml());
    const all = lsGetJSON<DemoPayment[]>(PAY_KEY, []);
    const hit = all.find((p) => p.id === params.id) || null;
    setPayment(hit);
    setMissing(!hit);
  }, [params.id]);

  const ref = useMemo(() => (payment ? raastFor(payment) : "—"), [payment]);

  // demo tenant identity (from cookie-less stub)
  const demoTenant = { name: "Mr Renter", email: "tenant@demo.pk" };

  if (missing) {
    return (
      <MobileAppShell>
        <div className="p-4">
          <div className="rounded-2xl p-6 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-center">
            <div className="text-5xl mb-2">🧾</div>
            <div className="font-semibold">{t.notFoundTitle}</div>
            <p className="text-sm opacity-70 mt-1">{t.notFoundBody}</p>
            <div className="mt-4 flex gap-2 justify-center">
              <Link href="/tenant/pay" className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
                Pay
              </Link>
              <Link href="/tenant" className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                {t.backHome}
              </Link>
            </div>
          </div>
        </div>
      </MobileAppShell>
    );
  }

  if (!payment) return null;

  return (
    <MobileAppShell>
      {/* Print styles (A4) */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 16mm; }
          body { background: #fff !important; }
          nav, button#print-hide, a#print-hide { display: none !important; }
          .print-card { box-shadow: none !important; border-color: #000 !important; }
        }
      `}</style>

      <div className="p-4 space-y-4">
        {/* Top controls (hidden in print) */}
        <div className="flex items-center justify-between" id="print-hide">
          <Link
            href="/tenant"
            className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {t.backHome}
          </Link>
          <button
            onClick={() => window.print()}
            className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t.print}
          </button>
        </div>

        {/* Branded header */}
        <div className="rounded-2xl overflow-hidden print-card border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
          <div className="p-5 border-b border-black/10 dark:border-white/10 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold">
                <Logo /> <span>RentBack</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">{t.demo}</span>
            </div>
            <div className="mt-3 text-2xl font-extrabold">{t.title}</div>
          </div>

          {/* Details grid */}
          <div className="p-5 grid md:grid-cols-3 gap-5">
            {/* Left: who */}
            <div className="rounded-xl p-4 border border-black/10 dark:border-white/10">
              <div className="text-xs opacity-70">{t.details.tenant}</div>
              <div className="mt-1 font-semibold">{demoTenant.name}</div>
              <div className="text-sm opacity-80">{t.details.email}: {demoTenant.email}</div>
            </div>

            {/* Middle: payment core */}
            <div className="rounded-xl p-4 border border-black/10 dark:border-white/10">
              <Row label={t.details.property} value={payment.property} />
              <Row label={t.details.amount} value={formatPKR(payment.amount)} />
              <Row label={t.details.method} value={payment.method} />
              <Row label={t.details.date} value={new Date(payment.createdAt).toLocaleString()} />
              <Row
                label={t.details.status}
                value={
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      payment.status === "SENT"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                    }`}
                  >
                    {payment.status === "SENT" ? t.sent : t.pending}
                  </span>
                }
              />
              <Row label={t.details.raast} value={ref} mono />
            </div>

            {/* Right: QR */}
            <div className="rounded-xl p-4 border border-black/10 dark:border-white/10 flex items-center justify-center">
              <div className="text-center">
                <QR seed={payment.id} />
                <div className="mt-2 text-xs opacity-70">{t.qrLabel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex items-center justify-between" id="print-hide">
          <Link
            href="/tenant/rewards"
            className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {t.rewardsLinkLabel}
          </Link>
          <Link
            href="/tenant/pay"
            className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t.makeAnotherPayment}
          </Link>
        </div>
      </div>
    </MobileAppShell>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <div className="text-xs opacity-70">{label}</div>
      <div className={`text-sm text-right ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
  );
}

function Logo({ size = 20, stroke = "#fff" }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}
