"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import exportToCSV from "@/lib/csv";

export default function LandlordDiscrepanciesPage() {
  const { lang, locale } = useLang();
  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  const labels = {
    en: { title: "Discrepancies", csv: "CSV", none: "No discrepancies found" },
    ur: { title: "فرق/غلطیاں", csv: "CSV", none: "کوئی فرق نہیں ملا" },
  }[lang];

  useEffect(() => {
    // Demo create a small subset (pretend these need review)
    setRows(loadPayments().slice(0, 5));
  }, []);

  const csv = (rows ?? []).map((r) => ({
    id: r.id,
    createdAt: new Date(r.createdAt).toLocaleString(locale),
    property: r.property,
    amount: r.amount,
    method: r.method,
    status: r.status,
  }));

  return (
    <AppShell role="landlord" title={labels.title}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div />
          <button
            onClick={() => exportToCSV(csv, "landlord_discrepancies")}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
          >
            {labels.csv}
          </button>
        </div>

        <section className="rounded-2xl border border-black/10 dark:border-white/10">
          {rows === null ? (
            <div className="p-4 text-sm opacity-70">…</div>
          ) : rows.length === 0 ? (
            <div className="p-4 text-sm opacity-70">{labels.none}</div>
          ) : (
            <div className="divide-y divide-black/10 dark:divide-white/10">
              {rows.map((r) => (
                <div key={r.id} className="px-3 py-3 text-sm flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.property}</div>
                    <div className="text-xs opacity-70">
                      {new Date(r.createdAt).toLocaleString(locale)} • {r.method}
                    </div>
                  </div>
                  <div className="text-xs opacity-70">#{r.id}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
