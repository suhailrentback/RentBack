// app/tenant/receipt/[id]/page.tsx
"use client";

import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, formatPKR } from "@/lib/demo";

export default function TenantReceiptPage({
  params,
}: {
  params: { id: string };
}) {
  const lang: Lang = "en";
  const t = strings[lang];
  const p = loadPayments().find((x) => x.id === params.id);

  if (!p) {
    return (
      <MobileAppShell>
        <div className="p-4">
          <div className="rounded-2xl border border-black/10 p-6 text-center dark:border-white/10">
            <div className="text-sm font-medium">
              {t.tenant.receipt.notFoundTitle}
            </div>
            <div className="mt-1 text-xs opacity-70">
              {t.tenant.receipt.notFoundBody}
            </div>
          </div>
        </div>
      </MobileAppShell>
    );
  }

  return (
    <MobileAppShell>
      <div className="p-4 print:p-0">
        <div className="mx-auto max-w-[794px] rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white print:rounded-none print:border-0 print:shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-lg font-semibold">{t.tenant.receipt.title}</h1>
              <div className="text-xs opacity-70">{t.tenant.receipt.demo}</div>
            </div>
            {/* Simple QR placeholder */}
            <div className="h-20 w-20 rounded bg-black/10 dark:bg-white/20" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="opacity-70">{t.tenant.receipt.details.property}</div>
              <div className="font-medium">{p.property}</div>
            </div>
            <div>
              <div className="opacity-70">{t.tenant.receipt.details.method}</div>
              <div className="font-medium">{p.method}</div>
            </div>
            <div>
              <div className="opacity-70">{t.tenant.receipt.details.amount}</div>
              <div className="font-medium">{formatPKR(p.amount)}</div>
            </div>
            <div>
              <div className="opacity-70">{t.tenant.receipt.details.date}</div>
              <div className="font-medium">{new Date(p.createdAt).toLocaleString()}</div>
            </div>
            <div>
              <div className="opacity-70">{t.tenant.receipt.details.status}</div>
              <div className="font-medium">{p.status}</div>
            </div>
            <div>
              <div className="opacity-70">{t.tenant.receipt.details.raast}</div>
              <div className="font-mono text-xs">RB-{p.id.toUpperCase()}</div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between print:hidden">
            <a
              href="/tenant"
              className="rounded-lg px-3 py-1 text-sm opacity-80 hover:opacity-100"
            >
              {t.tenant.receipt.backHome}
            </a>
            <button
              onClick={() => window.print()}
              className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700"
            >
              {t.tenant.receipt.print}
            </button>
          </div>
        </div>
      </div>
    </MobileAppShell>
  );
}
