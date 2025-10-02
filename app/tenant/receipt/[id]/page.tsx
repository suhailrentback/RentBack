// app/tenant/receipt/[id]/page.tsx
"use client";

import { useMemo } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang, dirFor } from "@/lib/i18n";
import { loadPayments } from "@/lib/demo";

export default function TenantReceiptPage({
  params,
}: { params: { id: string } }) {
  const lang: Lang = "en"; // wire from store later
  const t = strings[lang];
  const dir = dirFor(lang);

  const payment = useMemo(
    () => loadPayments().find(p => p.id === params.id),
    [params.id]
  );

  return (
    <MobileAppShell>
      <div className="p-4" dir={dir}>
        <style>{`
          @media print {
            @page { size: A4; margin: 16mm; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            nav, footer { display: none !important; }
          }
        `}</style>

        {!payment ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
            <h1 className="text-lg font-semibold">{t.receipt.notFoundTitle}</h1>
            <p className="text-sm opacity-70 mt-2">{t.receipt.notFoundBody}</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 space-y-4 bg-white dark:bg-white/5">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">{t.receipt.title}</h1>
              {/* simple QR demo */}
              <div className="text-[10px] opacity-70 text-right">
                {t.receipt.qrLabel}
                <div className="mt-1 h-12 w-12 bg-black/80 dark:bg-white/80" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="opacity-70">{t.receipt.details.property}</div>
                <div className="font-medium">{payment.property}</div>
              </div>
              <div>
                <div className="opacity-70">{t.receipt.details.amount}</div>
                <div className="font-medium">PKR {payment.amount.toLocaleString()}</div>
              </div>
              <div>
                <div className="opacity-70">{t.receipt.details.method}</div>
                <div className="font-medium">{payment.method}</div>
              </div>
              <div>
                <div className="opacity-70">{t.receipt.details.date}</div>
                <div className="font-medium">
                  {new Date(payment.createdAt).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="opacity-70">{t.receipt.details.status}</div>
                <div className="font-medium">{payment.status}</div>
              </div>
            </div>

            <div className="pt-4 print:hidden">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg text-sm text-white bg-emerald-600 hover:bg-emerald-700"
              >
                {t.receipt.print}
              </button>
            </div>
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
