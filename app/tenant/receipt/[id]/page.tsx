"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import Link from "next/link";

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function TenantReceiptPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const lang: Lang = "en"; // TODO: wire from store
  const t = strings[lang];

  const [payment, setPayment] = useState<DemoPayment | null | undefined>(undefined);

  useEffect(() => {
    const all = loadPayments();
    setPayment(all.find((p) => p.id === params.id) ?? null);
  }, [params.id]);

  const statusBadge = useMemo(() => {
    if (!payment) return null;
    const label = payment.status === "SENT" ? t.tenant.receipt.sent : t.tenant.receipt.pending;
    const cls =
      payment.status === "SENT"
        ? "bg-emerald-600 text-white"
        : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300";
    return <span className={`text-[10px] px-2 py-0.5 rounded ${cls}`}>{label}</span>;
  }, [payment, t]);

  if (payment === undefined) {
    // loading
    return (
      <AppShell role="tenant" title={t.tenant.receipt.title} hideNav>
        <div className="h-24 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
      </AppShell>
    );
  }

  if (payment === null) {
    return (
      <AppShell role="tenant" title={t.tenant.receipt.title} hideNav>
        <div className="max-w-[800px] mx-auto bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
          <h1 className="text-xl font-semibold">{t.tenant.receipt.notFoundTitle}</h1>
          <p className="mt-2 text-sm opacity-70">{t.tenant.receipt.notFoundBody}</p>
          <div className="mt-4 flex gap-2">
            <Link href="/tenant" className="px-3 py-2 rounded-lg border text-sm">
              {t.tenant.receipt.backHome}
            </Link>
            <Link href="/tenant/pay" className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm">
              {t.tenant.receipt.makeAnotherPayment}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell role="tenant" title={t.tenant.receipt.title} hideNav>
      {/* A4-ish printable card */}
      <div className="max-w-[800px] mx-auto bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 print:border-0 print:rounded-none print:p-0">
        {/* header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs opacity-70">{t.tenant.receipt.title}</div>
            <div className="text-2xl font-semibold tracking-wide">RentBack</div>
            <div className="mt-1 text-xs opacity-70">{t.tenant.receipt.demo}</div>
          </div>
          <div className="flex items-center gap-2">
            {statusBadge}
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
            >
              {t.tenant.receipt.print}
            </button>
          </div>
        </div>

        {/* details grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs opacity-70">{t.tenant.receipt.details.tenant}</div>
            <div className="font-medium">Demo Tenant</div>
          </div>
          <div>
            <div className="text-xs opacity-70">{t.tenant.receipt.details.email}</div>
            <div className="font-medium">tenant@example.com</div>
          </div>
          <div>
            <div className="text-xs opacity-70">{t.tenant.receipt.details.property}</div>
            <div className="font-medium">{payment.property}</div>
          </div>
          <div>
            <div className="text-xs opacity-70">{t.tenant.receipt.details.amount}</div>
            <div className="font-medium">{formatPKR(payment.amount)}</div>
          </div>
          <div>
            <div className="text-xs opacity-70">{t.tenant.receipt.details.method}</div>
            <div className="font-medium">{payment.method}</div>
          </div>
          <div>
            <div className="text-xs opacity-70">{t.tenant.receipt.details.date}</div>
            <div className="font-medium">
              {new Date(payment.createdAt).toLocaleString(lang === "ur" ? "ur-PK" : "en-PK")}
            </div>
          </div>
          <div>
            <div className="text-xs opacity-70">{t.tenant.receipt.details.raast}</div>
            <div className="font-medium">RB-{payment.id}</div>
          </div>
          <div>
            <div className="text-xs opacity-70">{t.tenant.receipt.details.status}</div>
            <div className="font-medium">{payment.status}</div>
          </div>
        </div>

        {/* QR (demo placeholder) */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <div className="text-xs opacity-70">{t.tenant.receipt.qrLabel}</div>
            <div className="text-xs opacity-70">ID: {payment.id}</div>
          </div>
          <div className="h-24 w-24 rounded-lg border border-black/10 dark:border-white/10 grid place-items-center text-[10px] opacity-70">
            QR
          </div>
        </div>

        {/* footer actions (hidden in print) */}
        <div className="mt-8 flex gap-2 print:hidden">
          <button onClick={() => router.back()} className="px-3 py-2 rounded-lg border text-sm">
            {t.tenant.receipt.backHome}
          </button>
          <Link href="/tenant/pay" className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm">
            {t.tenant.receipt
