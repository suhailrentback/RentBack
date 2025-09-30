// app/tenant/receipt/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, dirFor, type Lang } from "@/lib/i18n";
import { formatPKR } from "@/lib/demo"; // simple formatter; safe to import client-side

type Method = "RAAST" | "BANK" | "JAZZCASH";
type Status = "PENDING" | "SENT";

type DemoPayment = {
  id: string;
  createdAt: string;
  property: string;
  amount: number;
  method: Method;
  status: Status;
};

function getLang(): Lang {
  try {
    const l = localStorage.getItem("rb-lang");
    if (l === "ur" || l === "en") return l;
  } catch {}
  return (process.env.NEXT_PUBLIC_DEFAULT_LANG as Lang) || "en";
}

function fakeRaastRef(id: string) {
  return `RB-${id.slice(0, 4).toUpperCase()}-${id.slice(-4).toUpperCase()}`;
}

function usePaymentById(id: string | undefined) {
  const [payment, setPayment] = useState<DemoPayment | null>(null);

  useEffect(() => {
    if (!id) return;
    try {
      const raw = localStorage.getItem("rb-payments");
      const arr: DemoPayment[] = raw ? JSON.parse(raw) : [];
      const found = arr.find((p) => p.id === id) || null;
      setPayment(found);
    } catch {
      setPayment(null);
    }
  }, [id]);

  return payment;
}

export default function TenantReceiptPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const lang = getLang();
  const t = strings[lang];
  const dir = dirFor(lang);
  const payment = usePaymentById(id);

  const createdAt = useMemo(() => {
    if (!payment) return new Date().toISOString();
    return payment.createdAt || new Date().toISOString();
  }, [payment]);

  return (
    <MobileAppShell>
      <div className="p-4" style={{ direction: dir }}>
        {/* Branded Header */}
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden print:border-0 print:shadow-none">
            <div className="px-4 py-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <Logo />
                <div className="font-semibold">RentBack</div>
              </div>
              <div className="text-xs px-2 py-1 rounded-full bg-amber-500 text-white">
                {t.receipt.demo}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6">
              {!payment ? (
                <NotFound lang={lang} />
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h1 className="text-xl font-semibold">{t.receipt.title}</h1>
                      <p className="text-xs opacity-70">
                        {new Date(createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white print:hidden"
                    >
                      {t.receipt.print}
                    </button>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label={t.receipt.details.tenant}
                      value={getDemoUserName() || "Demo Tenant"}
                    />
                    <Field
                      label={t.receipt.details.email}
                      value={getDemoUserEmail() || "tenant@rentback.app"}
                    />
                    <Field label={t.receipt.details.property} value={payment.property} />
                    <Field label={t.receipt.details.amount} value={formatPKR(payment.amount)} />
                    <Field label={t.receipt.details.method} value={payment.method} />
                    <Field
                      label={t.receipt.details.date}
                      value={new Date(createdAt).toLocaleString()}
                    />
                    <Field
                      label={t.receipt.details.status}
                      value={payment.status === "SENT" ? t.receipt.sent : t.receipt.pending}
                    />
                    <Field label={t.receipt.details.raast} value={fakeRaastRef(payment.id)} />
                  </div>

                  {/* QR mock */}
                  <div>
                    <div className="text-sm font-medium mb-2">{t.receipt.qrLabel}</div>
                    <div className="w-40 h-40 rounded-lg border border-black/10 dark:border-white/10 bg-[repeating-linear-gradient(45deg,#10b981_0_6px,#ffffff10_6px_12px)]" />
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center justify-between gap-3 print:hidden">
                    <Link
                      href="/tenant"
                      className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      {t.receipt.backHome}
                    </Link>
                    <div className="flex gap-2">
                      <Link
                        href="/tenant/pay"
                        className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        {t.receipt.makeAnotherPayment}
                      </Link>
                      <Link
                        href="/tenant/rewards"
                        className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        {t.receipt.rewardsLinkLabel}
                      </Link>
                    </div>
                  </div>

                  {/* Print watermark */}
                  <div className="hidden print:block text-center text-xs opacity-70 pt-6">
                    {t.receipt.demo}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MobileAppShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-white/5">
      <div className="text-[11px] uppercase tracking-wider opacity-60">{label}</div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}

function NotFound({ lang }: { lang: Lang }) {
  const t = strings[lang];
  return (
    <div className="text-center py-10">
      <h2 className="text-lg font-semibold">{t.receipt.notFoundTitle}</h2>
      <p className="text-sm opacity-70 mt-2">{t.receipt.notFoundBody}</p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <Link
          href="/tenant"
          className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
        >
          {t.receipt.backHome}
        </Link>
        <Link
          href="/tenant/pay"
          className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {t.receipt.makeAnotherPayment}
        </Link>
      </div>
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

/** Demo helpers — read from localStorage set by /tenant/pay */
function getDemoUserName(): string | null {
  try {
    return localStorage.getItem("rb-user-name");
  } catch {
    return null;
  }
}
function getDemoUserEmail(): string | null {
  try {
    return localStorage.getItem("rb-user-email");
  } catch {
    return null;
  }
}
