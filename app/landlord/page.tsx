"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, dirFor, type Lang } from "@/lib/i18n";
import { formatPKR } from "@/lib/demo";

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

type DemoProperty = {
  name: string;
  tenant: string;
  rentPKR: number;
  nextDueISO: string;
  active: boolean;
};

function getLang(): Lang {
  try {
    const l = localStorage.getItem("rb-lang");
    if (l === "ur" || l === "en") return l;
  } catch {}
  return (process.env.NEXT_PUBLIC_DEFAULT_LANG as Lang) || "en";
}

function fallbackProperties(): DemoProperty[] {
  // used if user hasn't saved any demo properties
  const today = new Date();
  const nextDue = new Date(today.getFullYear(), today.getMonth(), 28).toISOString();
  return [
    { name: "Apartment 12, DHA Phase 6", tenant: "Demo Tenant", rentPKR: 65000, nextDueISO: nextDue, active: true },
    { name: "Shop 4, MM Alam Road", tenant: "Demo Tenant 2", rentPKR: 85000, nextDueISO: nextDue, active: true },
  ];
}

function loadProperties(): DemoProperty[] {
  try {
    const raw = localStorage.getItem("rb-properties");
    if (!raw) return fallbackProperties();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || !arr.length) return fallbackProperties();
    return arr;
  } catch {
    return fallbackProperties();
  }
}

function expectedRentFor(propertyName: string, props: DemoProperty[]): number {
  const p = props.find(x => x.name === propertyName);
  return p ? p.rentPKR : 65000; // sensible default
}

export default function LandlordHomePage() {
  const lang = getLang();
  const t = strings[lang];
  const dir = dirFor(lang);

  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [properties, setProperties] = useState<DemoProperty[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("rb-payments");
      setPayments(raw ? JSON.parse(raw) : []);
    } catch { setPayments([]); }
    setProperties(loadProperties());
  }, []);

  const sent = useMemo(() => payments.filter(p => p.status === "SENT"), [payments]);

  const last = useMemo(
    () => [...sent].sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime())[0],
    [sent]
  );

  const collected30d = useMemo(() => {
    const cutoff = Date.now() - 30*24*60*60*1000;
    return sent
      .filter(p => new Date(p.createdAt).getTime() >= cutoff)
      .reduce((sum,p)=>sum+p.amount, 0);
  }, [sent]);

  const weeklySettled = useMemo(() => {
    const cutoff = Date.now() - 7*24*60*60*1000;
    const amount = sent
      .filter(p => new Date(p.createdAt).getTime() >= cutoff)
      .reduce((sum,p)=>sum+p.amount, 0);
    return amount;
  }, [sent]);

  const discrepancies = useMemo(() => {
    return sent.filter(p => p.amount < expectedRentFor(p.property, properties)).length;
  }, [sent, properties]);

  return (
    <MobileAppShell>
      <main className="p-4 space-y-4" style={{ direction: dir }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.landlord.home.title}</h1>
          <span className="text-xs opacity-70">{t.landlord.home.welcome}</span>
        </div>

        {/* Top cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white p-5">
            <div className="text-xs opacity-90">{t.landlord.home.rentCollected}</div>
            <div className="mt-2 text-2xl font-semibold tracking-wide">{formatPKR(collected30d)}</div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">{t.landlord.home.pendingCount}</div>
            <div className="mt-2 text-2xl font-semibold">
              {payments.filter(p => p.status === "PENDING").length}
            </div>
          </div>
        </section>

        {/* Payouts & Discrepancies */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{t.landlord.home.payouts.title}</div>
              <div className="text-xs opacity-70">
                {t.landlord.home.payouts.next}: {t.landlord.home.payouts.day}
              </div>
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {weeklySettled ? formatPKR(weeklySettled) : <span className="opacity-70">{t.landlord.home.payouts.none}</span>}
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-sm font-medium">{t.landlord.home.discrepancies.title}</div>
            <div className="text-xs opacity-70">{t.landlord.home.discrepancies.subtitle}</div>
            <div className="mt-2 text-2xl font-semibold">{discrepancies}</div>
          </div>
        </section>

        {/* Last payment */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{t.landlord.home.lastPayment}</div>
            {last ? (
              <Link
                href={`/tenant/receipt/${last.id}`}
                className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {t.landlord.home.viewReceipt}
              </Link>
            ) : null}
          </div>
          <div className="mt-3 text-sm">
            {!last ? (
              <div className="opacity-70">{t.landlord.home.emptyLastPayment}</div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{last.property}</div>
                  <div className="text-xs opacity-70">
                    {new Date(last.createdAt).toLocaleString()} • {last.method}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPKR(last.amount)}</div>
                  {last.amount < expectedRentFor(last.property, properties) ? (
                    <div className="text-[10px] mt-1 inline-block px-2 py-0.5 rounded-full bg-amber-500 text-white">
                      {strings[lang].landlord.ledger.discrepancy}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Shortcuts */}
        <section>
          <div className="grid grid-cols-4 gap-3">
            <Shortcut href="/landlord/ledger" label={t.landlord.home.quickLinks.ledger} icon="📒" />
            <Shortcut href="/landlord/properties" label={t.landlord.home.quickLinks.properties} icon="🏢" />
            <Shortcut href="/tenant" label={t.landlord.home.quickLinks.receipts} icon="🧾" />
            <Shortcut href="mailto:help@rentback.app" label={t.landlord.home.quickLinks.support} icon="🛟" />
          </div>
        </section>
      </main>
    </MobileAppShell>
  );
}

function Shortcut({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-black/10 dark:border-white/10 p-3 text-center bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10"
    >
      <div className="text-2xl leading-none">{icon}</div>
      <div className="text-xs mt-1">{label}</div>
    </Link>
  );
}
