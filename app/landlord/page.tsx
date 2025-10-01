// app/landlord/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import MobileAppShell from '@/components/MobileAppShell';
import { strings } from '@/lib/i18n';
import { formatPKR } from '@/lib/demo';

/**
 * Minimal demo types (kept flexible for safety in builds)
 */
type Method = 'RAAST' | 'BANK' | 'JAZZCASH';
type DemoPayment = {
  id: string;
  createdAt: string;           // ISO
  property: string;
  amount: number;
  method: Method | string;
  status: 'PENDING' | 'SENT' | string;
};

/**
 * Storage helpers
 */
const STORAGE_KEY = 'rb-payments';

function loadPayments(): DemoPayment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr as DemoPayment[];
  } catch {
    return [];
  }
}

export default function LandlordHomePage() {
  // Cast i18n safely to avoid TypeScript property errors if keys were added recently.
  const t = strings() as any;

  const [payments, setPayments] = useState<DemoPayment[]>([]);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  // Totals for the header cards
  const collected30d = useMemo(() => {
    const now = Date.now();
    const THIRTY_D = 30 * 24 * 60 * 60 * 1000;
    return payments
      .filter(p => p.status === 'SENT' && now - new Date(p.createdAt).getTime() <= THIRTY_D)
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  }, [payments]);

  const pendingCount = useMemo(
    () => payments.filter(p => p.status === 'PENDING').length,
    [payments]
  );

  const weeklySettled = useMemo(() => {
    // Demo “weekly settlement”: sum all SENT in the last 7 days
    const now = Date.now();
    const SEVEN_D = 7 * 24 * 60 * 60 * 1000;
    const total = payments
      .filter(p => p.status === 'SENT' && now - new Date(p.createdAt).getTime() <= SEVEN_D)
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    return total || 0;
  }, [payments]);

  const discrepancies = useMemo(() => {
    // Demo discrepancy rule: anything SENT with amount < 50,000 is “flagged”
    return payments.filter(p => p.status === 'SENT' && Number(p.amount) < 50000).length;
  }, [payments]);

  // Last payment (most recent by createdAt)
  const last: DemoPayment | null = useMemo(() => {
    if (!payments.length) return null;
    return [...payments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  }, [payments]);

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {t?.landlord?.home?.title ?? 'Landlord Dashboard'}
          </h1>
          <span className="text-xs opacity-70">
            {t?.landlord?.home?.welcome ?? 'Overview of payouts, ledger and properties'}
          </span>
        </div>

        {/* Summary cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Collected (30d) */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white p-5">
            <div className="text-xs opacity-90">
              {t?.landlord?.home?.rentCollected ?? 'Rent collected (30 days)'}
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-wide">
              {formatPKR(collected30d)}
            </div>
          </div>

          {/* Pending count */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">
              {t?.landlord?.home?.pendingCount ?? 'Payments pending confirmation'}
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {pendingCount}
            </div>
          </div>
        </section>

        {/* Payouts + Discrepancies */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Payouts card */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                {t?.landlord?.home?.payouts?.title ?? 'Payouts'}
              </div>
              <div className="text-xs opacity-70">
                {(t?.landlord?.home?.payouts?.next ?? 'Next settlement') + ': '}
                {t?.landlord?.home?.payouts?.day ?? 'Friday'}
              </div>
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {weeklySettled
                ? formatPKR(weeklySettled)
                : <span className="opacity-70">{t?.landlord?.home?.payouts?.none ?? 'None'}</span>}
            </div>
            <div className="mt-3">
              <Link
                href="/landlord/payouts"
                className="text-xs px-3 py-1 rounded-lg bg-black/80 text-white hover:bg-black"
              >
                {t?.landlord?.home?.payoutsCard ?? 'Payouts'}
              </Link>
            </div>
          </div>

          {/* Discrepancies card */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-sm font-medium">
              {t?.landlord?.home?.discrepancies?.title ?? 'Discrepancies'}
            </div>
            <div className="text-xs opacity-70">
              {t?.landlord?.home?.discrepancies?.subtitle ?? 'Payments below due amount'}
            </div>
            <div className="mt-2 text-2xl font-semibold">{discrepancies}</div>
            <div className="mt-3">
              <Link
                href="/landlord/discrepancies"
                className="text-xs px-3 py-1 rounded-lg bg-black/80 text-white hover:bg-black"
              >
                {t?.landlord?.home?.discrepanciesCard ?? 'Discrepancies'}
              </Link>
            </div>
          </div>
        </section>

        {/* Last payment + quick actions */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              {t?.landlord?.home?.lastPayment ?? 'Last payment'}
            </div>
            {last ? (
              <Link
                href={`/tenant/receipt/${last.id}`}
                className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {t?.landlord?.home?.viewReceipt ?? 'View receipt'}
              </Link>
            ) : null}
          </div>

          <div className="mt-3 text-sm">
            {!last ? (
              <div className="opacity-70">
                {t?.landlord?.home?.emptyLastPayment ?? 'No payments yet'}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{last.property}</div>
                  <div className="text-xs opacity-70">
                    {new Date(last.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPKR(last.amount)}</div>
                  <div className="text-xs opacity-70">{String(last.method || 'RAAST')}</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Link
              href="/landlord/ledger"
              className="text-xs px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t?.landlord?.home?.ledgerCard ?? 'Ledger'}
            </Link>
            <Link
              href="/landlord/properties"
              className="text-xs px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t?.landlord?.home?.propertiesCard ?? 'Properties'}
            </Link>
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
