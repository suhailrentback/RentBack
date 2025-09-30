"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { ListSkeleton } from "@/components/Skeletons";
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
  return p ? p.rentPKR : 65000;
}

type Row = {
  id: string;
  date: string;
  tenant: string;
  property: string;
  amount: number;
  method: Method;
  status: "POSTED";
  under: boolean;
};

export default function LandlordLedgerPage() {
  const lang = getLang();
  const t = strings[lang];
  const dir = dirFor(lang);

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);
  const [propsList, setPropsList] = useState<DemoProperty[]>([]);

  useEffect(() => {
    setLoading(true);
    const props = loadProperties();
    setPropsList(props);
    try {
      const raw = localStorage.getItem("rb-payments");
      const payments: DemoPayment[] = raw ? JSON.parse(raw) : [];
      const sent = payments.filter(p => p.status === "SENT");
      const mapped: Row[] = sent.map(p => ({
        id: p.id,
        date: p.createdAt,
        tenant: "Demo Tenant",
        property: p.property,
        amount: p.amount,
        method: p.method,
        status: "POSTED",
        under: p.amount < expectedRentFor(p.property, props),
      }))
      .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRows(mapped);
    } catch {
      setRows([]);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  }, []);

  const downloadCSV = () => {
    const header = [
      t.landlord.ledger.date,
      t.landlord.ledger.tenant,
      t.landlord.ledger.property,
      "AmountPKR",
      t.landlord.ledger.method,
      t.landlord.ledger.status,
      "UnderExpected",
      "PaymentID",
    ];
    const lines = rows.map(r => [
      new Date(r.date).toISOString(),
      safeCSV(r.tenant),
      safeCSV(r.property),
      String(Math.round(r.amount)),
      r.method,
      r.status,
      r.under ? "YES" : "NO",
      r.id
    ].join(","));
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rentback-ledger.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const content = useMemo(() => {
    if (loading) return <ListSkeleton rows={6} />;
    if (!rows.length) {
      return (
        <EmptyState
          title={t.landlord.ledger.title}
          body={t.landlord.ledger.empty}
          ctaLabel={strings[lang].pay?.title || "Pay Rent"}
          ctaHref="/tenant/pay"
        />
      );
    }
    return (
      <div className="space-y-3">
        {rows.map(r => (
          <div key={r.id} className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{r.property}</div>
                <div className="text-xs opacity-70">
                  {new Date(r.date).toLocaleString()} • {r.method} • {t.landlord.ledger.posted}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatPKR(r.amount)}</div>
                <div className="mt-1 flex items-center justify-end gap-2">
                  {r.under ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white">
                      {t.landlord.ledger.discrepancy}
                    </span>
                  ) : null}
                  <Link
                    href={`/tenant/receipt/${r.id}`}
                    className="inline-block text-xs px-2 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    {t.landlord.ledger.receipt}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, rows, lang]);

  return (
    <MobileAppShell>
      <main className="p-4 space-y-4" style={{ direction: dir }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{t.landlord.ledger.title}</h1>
            <p className="text-xs opacity-70">{t.landlord.ledger.subtitle}</p>
          </div>
          <button
            onClick={downloadCSV}
            className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t.landlord.ledger.exportCSV}
          </button>
        </div>
        {content}
      </main>
    </MobileAppShell>
  );
}

function safeCSV(s: string) {
  return `"${String(s).replace(/"/g, '""')}"`;
}
