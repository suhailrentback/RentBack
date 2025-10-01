// app/tenant/receipt/[id]/page.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, type DemoPayment, formatPKR } from "@/lib/demo";
import Link from "next/link";

export default function TenantReceiptPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const lang: Lang = typeof window !== "undefined" && localStorage.getItem("demo-lang") === "ur" ? "ur" : "en";
  const t = strings[lang];

  const [payment, setPayment] = useState<DemoPayment | null>(null);

  useEffect(() => {
    const found = loadPayments().find((p) => p.id === id) || null;
    setPayment(found);
  }, [id]);

  const statusLabel = useMemo(() => {
    if (!payment) return "";
    return payment.status === "SENT" ? t.tenant.receipt.sent : t.tenant.receipt.pending;
  }, [payment, t]);

  const onPrint = () => window.print();

  return (
    <MobileAppShell>
      <div className="p-4">
        {!payment ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-center">
            <div className="text-lg font-semibold">{t.tenant.receipt.notFoundTitle}</div>
            <div className="mt-2 text-sm opacity-80">{t.tenant.receipt.notFoundBody}</div>
            <Link
              href="/tenant"
              className="inline-block mt-4 text-sm px-3 py-1 rounded-lg bg-emerald-600 text-white"
            >
              {t.tenant.receipt.backHome}
            </Link>
          </div>
        ) : (
          <div className="mx-auto max-w-[850px] print:w-[210mm] print:mx-0 print:max-w-none">
            {/* Print toolbar (hidden when printing) */}
            <div className="flex items-center justify-between mb-4 print:hidden">
              <h1 className="text-xl font-semibold">{t.tenant.receipt.title}</h1>
              <button
                onClick={onPrint}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
              >
                {t.tenant.receipt.print}
              </button>
            </div>

            {/* A4 friendly receipt */}
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white dark:bg-white/5 print:border-0 print:rounded-none print:p-0">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{t.app}</div>
                  <div className="text-xs opacity-70">{t.demo}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{statusLabel}</div>
                  <div className="text-xs opacity-70">{new Date(payment.createdAt).toLocaleString()}</div>
                </div>
              </div>

              <hr className="my-4 border-black/10 dark:border-white/10" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="opacity-70">{t.tenant.receipt.details.tenant}</div>
                  <div className="font-medium">Demo Tenant</div>
                  <div className="opacity-70 mt-2">{t.tenant.receipt.details.email}</div>
                  <div>tenant@example.com</div>
                </div>
                <div>
                  <div className="opacity-70">{t.tenant.receipt.details.property}</div>
                  <div className="font-medium">{payment.property}</div>
                  <div className="opacity-70 mt-2">{t.tenant.receipt.details.method}</div>
                  <div>{payment.method}</div>
                </div>
                <div>
                  <div className="opacity-70">{t.tenant.receipt.details.amount}</div>
                  <div className="font-semibold">{formatPKR(payment.amount)}</div>
                </div>
                <div>
                  <div className="opacity-70">{t.tenant.receipt.details.status}</div>
                  <div>{payment.status}</div>
                </div>
              </div>

              {/* QR placeholder (demo) */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-24 h-24 border border-black/20 rounded grid place-items-center text-[10px]">
                  QR<br/>({t.tenant.receipt.qrLabel})
                </div>
                <div className="text-xs opacity-70">Ref: {payment.id}</div>
              </div>

              {/* Footer */}
              <div className="mt-6 text-xs opacity-70">
                {t.tenant.receipt.demo}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
