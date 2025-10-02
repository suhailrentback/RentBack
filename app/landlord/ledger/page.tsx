"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import Link from "next/link";

const currency = (n: number, locale: Intl.LocalesArgument) =>
  new Intl.NumberFormat(locale, { style: "currency", currency: "PKR", maximumFractionDigits: 0 })
    .format(Math.round(n))
    .replace("PKR", "Rs");

export default function LandlordLedgerPage() {
  const { lang, locale } = useLang();
  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  const labels = {
    en: { title: "Ledger", property: "Property", date: "Date", method: "Method", amount: "Amount", receipt: "Receipt" },
    ur: { title: "لیجر", property: "پراپرٹی", date: "تاریخ", method: "طریقہ", amount: "رقم", receipt: "رسید" },
  }[lang];

  useEffect(() => {
    setRows(loadPayments());
  }, []);

  return (
    <AppShell role="landlord" title={labels.title}>
      <div className="p-4 space-y-4">
        <section className="rounded-2xl border border-black/10 dark:border-white/10">
          <div className="grid grid-cols-12 px-3 py-2 text-xs opacity-70">
            <div className="col-span-4">{labels.property}</div>
            <div className="col-span-3">{labels.date}</div>
            <div className="col-span-2">{labels.method}</div>
            <div className="col-span-2 text-right">{labels.amount}</div>
            <div className="col-span-1 text-right">{labels.receipt}</div>
          </div>
          <div className="divide-y divide-black/10 dark:divide-white/10">
            {rows === null ? (
              <div className="p-4 text-sm opacity-70">…</div>
            ) : rows.length === 0 ? (
              <div className="p-4 text-sm opacity-70">No records</div>
            ) : (
              rows.map((p) => (
                <div key={p.id} className="grid grid-cols-12 px-3 py-3 text-sm">
                  <div className="col-span-4">
                    <div className="font-medium">{p.property}</div>
                  </div>
                  <div className="col-span-3 opacity-70">{new Date(p.createdAt).toLocaleString(locale)}</div>
                  <div className="col-span-2 opacity-70">{p.method}</div>
                  <div className="col-span-2 text-right font-medium">{currency(p.amount, locale)}</div>
                  <div className="col-span-1 text-right">
                    <Link href={`/tenant/receipt/${p.id}`} className="text-emerald-600 hover:underline">
                      #
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
