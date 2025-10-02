"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import exportToCSV from "@/lib/csv";

export default function LandlordPayoutsPage() {
  const { lang, locale } = useLang();
  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  const labels = {
    en: { title: "Payouts", csv: "CSV", next: "Next Payout", count: "Payments", total: "Total" },
    ur: { title: "ادائیگیاں", csv: "CSV", next: "اگلی ادائیگی", count: "ادائیگیاں", total: "کل" },
  }[lang];

  useEffect(() => {
    setRows(loadPayments());
  }, []);

  const summary = useMemo(() => {
    const data = rows ?? [];
    const total = data.reduce((s, r) => s + r.amount, 0);
    return { count: data.length, total };
  }, [rows]);

  return (
    <AppShell role="landlord" title={labels.title}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm opacity-70">
            {labels.next}: {new Date().toLocaleDateString(locale)}
          </div>
          <button
            onClick={() => {
              const csv = (rows ?? []).map((r) => ({
                id: r.id,
                createdAt: new Date(r.createdAt).toLocaleString(locale),
                property: r.property,
                method: r.method,
                amount: r.amount,
                status: r.status,
              }));
              exportToCSV(csv, "landlord_payouts");
            }}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
          >
            {labels.csv}
          </button>
        </div>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
          <div className="text-sm">{labels.count}: {summary.count.toLocaleString(locale)}</div>
          <div className="mt-1 text-sm">{labels.total}: {summary.total.toLocaleString(locale)}</div>
        </section>
      </div>
    </AppShell>
  );
}
