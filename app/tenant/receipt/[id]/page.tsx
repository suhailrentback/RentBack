// app/tenant/receipt/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang, dirFor } from "@/lib/i18n";
import { loadPayments, formatPKR, type DemoPayment } from "@/lib/demo";
import Link from "next/link";

function FakeQR() {
  return (
    <div className="w-28 h-28 rounded bg-[repeating-linear-gradient(45deg,#000,#000_4px,#fff_4px,#fff_8px)] border border-black/20" />
  );
}

export default function TenantReceiptPage({
  params,
}: {
  params: { id: string };
}) {
  const [lang] = useState<Lang>("en");
  const t = strings[lang];

  const [payment, setPayment] = useState<DemoPayment | null>(null);

  useEffect(() => {
    const all = loadPayments();
    setPayment(all.find((p) => p.id === params.id) || null);
  }, [params.id]);

  const found = !!payment;
  const statusLabel = payment?.status === "SENT" ? t.tenant.receipt.sent : t.tenant.receipt.pending;

  const dir = dirFor(lang);

  return (
    <MobileAppShell>
      <div className="p-4">
        <div dir={dir} className="mx-auto max-w-[860px] bg-white dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 p-6 print:rounded-none print:border-none print:p-0">
          {/* Branded header */}
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div>
              <div className="text-xs opacity-70">{t.tenant.receipt.demo}</div>
              <h1 className="text-2xl font-semibold">{t.tenant.receipt.title}</h1>
            </div>
            <FakeQR />
          </div>

          {/* Body */}
          {!found ? (
            <div className="p-6">
              <div className="text-lg font-semibold mb-2">{t.tenant.receipt.notFoundTitle}</div>
              <div className="text-sm opacity-70">{t.tenant.receipt.notFoundBody}</div>
              <div className="mt-4">
                <Link
                  href="/tenant"
                  className="inline-flex items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2"
                >
                  {t.tenant.receipt.backHome}
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Left: details */}
              <div className="space-y-2">
                <div className="text-xs opacity-70">{t.tenant.receipt.details.tenant}</div>
                <div className="font-medium">Demo Tenant</div>

                <div className="text-xs opacity-70 mt-3">{t.tenant.receipt.details.email}</div>
                <div>tenant@example.com</div>

                <div className="text-xs opacity-70 mt-3">{t.tenant.receipt.details.property}</div>
                <div>{payment!.property}</div>

                <div className="text-xs opacity-70 mt-3">{t.tenant.receipt.details.amount}</div>
                <div className="font-semibold">{formatPKR(payment!.amount)}</div>

                <div className="text-xs opacity-70 mt-3">{t.tenant.receipt.details.method}</div>
                <div>{payment!.method}</div>
              </div>

              {/* Right: metadata */}
              <div className="space-y-2">
                <div className="text-xs opacity-70">{t.tenant.receipt.details.date}</div>
                <div>
                  {new Date(payment!.createdAt).toLocaleString(
                    lang === "ur" ? "ur-PK" : "en-PK"
                  )}
                </div>

                <div className="text-xs opacity-70 mt-3">{t.tenant.receipt.details.status}</div>
                <div className="font-medium">{statusLabel}</div>

                <div className="text-xs opacity-70 mt-3">{t.tenant.receipt.details.raast}</div>
                <div>RB-{payment!.id.slice(0, 8).toUpperCase()}</div>
              </div>
            </div>
          )}

          {/* Footer actions (no show in print) */}
          <div className="flex items-center gap-2 border-t border-black/10 pt-4 mt-4 print:hidden">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-sm px-4 py-2"
            >
              {t.tenant.receipt.print}
            </button>
            <Link
              href="/tenant"
              className="inline-flex items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2"
            >
              {t.tenant.receipt.backHome}
            </Link>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: #fff !important; }
          @page { size: A4; margin: 12mm; }
        }
      `}</style>
    </MobileAppShell>
  );
}
