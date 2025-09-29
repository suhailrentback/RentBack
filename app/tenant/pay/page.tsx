// app/tenant/pay/page.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";
import {
  getTenantContext,
  createDemoPayment,
  markPaymentSent,
  csvForTenantPayments,
  formatPKR,
  type Method
} from "@/lib/demo";
import Link from "next/link";

function SkeletonRow() {
  return <div className="h-10 rounded-lg bg-black/5 dark:bg-white/10 animate-pulse" />;
}

export default function PayPage() {
  const [lang, setLang] = useState<"en" | "ur">("en");
  useEffect(() => {
    try {
      const l = localStorage.getItem("rb-lang");
      if (l === "ur" || l === "en") setLang(l);
    } catch {}
  }, []);
  const t = strings[lang];

  // fake load skeleton
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(id);
  }, []);

  // demo data
  const [version, setVersion] = useState(0); // bump to refresh lists
  const ctx = useMemo(() => getTenantContext(), [version]);
  const leases = ctx.leases;
  const payments = ctx.payments;

  // form
  const [amount, setAmount] = useState<number | ''>('');
  const [leaseId, setLeaseId] = useState(leases[0]?.id || '');
  const [method, setMethod] = useState<Method>('RAAST');
  const [memo, setMemo] = useState('');

  function makePayment() {
    if (!amount || !leaseId) return alert(t.tenant.pay.invalid);
    const p = createDemoPayment({ tenantId: ctx.user.id, leaseId, amount: Number(amount), method, memo });
    console.warn('[ui] payment created', p);
    setVersion(v => v + 1);
    setAmount('');
    setMemo('');
  }

  function markSent(id: string) {
    const p = markPaymentSent(id);
    console.warn('[ui] payment marked sent', p?.id);
    setVersion(v => v + 1);
  }

  function downloadCSV() {
    const blob = new Blob([csvForTenantPayments(ctx.user.id)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "tenant-payments.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-xl font-bold">{t.tenant.pay.title}</h1>
        <p className="text-sm opacity-70">{t.tenant.pay.subtitle}</p>

        {/* form card */}
        <div className="mt-4 p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
          <div className="grid gap-3">
            <label className="text-sm opacity-80">
              {t.tenant.pay.amount}
              <input
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || '')}
                type="number"
                inputMode="numeric"
                className="mt-1 w-full h-11 rounded-xl px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-transparent"
                placeholder="65000"
              />
            </label>

            <label className="text-sm opacity-80">
              {t.tenant.pay.lease}
              <select
                value={leaseId}
                onChange={(e) => setLeaseId(e.target.value)}
                className="mt-1 w-full h-11 rounded-xl px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-transparent"
              >
                {leases.map(l => <option key={l.id} value={l.id}>{l.propertyName}</option>)}
              </select>
            </label>

            <label className="text-sm opacity-80">
              {t.tenant.pay.method}
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as Method)}
                className="mt-1 w-full h-11 rounded-xl px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-transparent"
              >
                <option value="RAAST">{t.tenant.pay.methods.RAAST}</option>
                <option value="CARD">{t.tenant.pay.methods.CARD}</option>
                <option value="WALLET">{t.tenant.pay.methods.WALLET}</option>
              </select>
            </label>

            <label className="text-sm opacity-80">
              {t.tenant.pay.memo}
              <input
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="mt-1 w-full h-11 rounded-xl px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-transparent"
                placeholder="Sep rent"
              />
            </label>

            <button
              onClick={makePayment}
              className="mt-2 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              {t.tenant.pay.create}
            </button>
          </div>
        </div>

        {/* recent */}
        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-semibold">{t.tenant.pay.recent}</h2>
          <button onClick={downloadCSV} className="text-sm px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">
            {t.tenant.pay.csv}
          </button>
        </div>

        <div className="mt-3 grid gap-2">
          {loading && (
            <>
              <SkeletonRow /><SkeletonRow /><SkeletonRow />
            </>
          )}
          {!loading && payments.length === 0 && (
            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 text-sm opacity-80">
              No payments yet — create one above to see it here.
            </div>
          )}
          {!loading && payments.map(p => (
            <div key={p.id} className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.propertyName}</div>
                  <div className="text-xs opacity-70">{new Date(p.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPKR(p.amount)}</div>
                  <div className="text-xs opacity-70">{t.tenant.pay.statuses[p.status]}</div>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                {p.status !== 'POSTED' && (
                  <button onClick={() => markSent(p.id)} className="h-9 px-3 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">
                    {t.tenant.pay.actions.markSent}
                  </button>
                )}
                <Link href={`/tenant/receipt/${p.id}`} className="h-9 px-3 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 inline-flex items-center">
                  {t.tenant.pay.actions.receipt}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs opacity-60">
          {strings[lang].needHelp} <a className="underline hover:opacity-100" href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'help@rentback.app'}`}>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'help@rentback.app'}</a>
        </p>
      </div>
    </MobileAppShell>
  );
}
