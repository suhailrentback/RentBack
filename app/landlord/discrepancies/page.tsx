"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { strings } from "@/lib/i18n";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { exportToCSV } from "@/lib/csv";
import { TableSkel } from "@/components/Skeletons";

export default function LandlordDiscrepanciesPage() {
  const { lang } = useLang();
  const t = strings[lang];

  const [rows, setRows] = useState<DemoPayment[] | null>(null);
  useEffect(() => {
    // Demo rule: mark PENDING as discrepancy
    setRows(loadPayments().filter((p) => p.status === "PENDING"));
  }, []);

  const csv = useMemo(
    () =>
      (rows ?? []).map((r) => ({
        id: r.id,
        createdAt: new Date(r.createdAt).toLocaleString(lang === "ur" ? "ur-PK" : "en-PK"),
        property: r.property,
        method: r.method,
        amount: r.amount,
        status: r.status,
      })),
    [rows, lang]
  );

  return (
    <AppShell role="landlord" title={t.landlord.home.title}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.landlord.home.discrepancies?.title ?? "Discrepancies"}</h1>
          <button
            onClick={() => exportToCSV(csv, "discrepancies")}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
          >
            CSV
          </button>
        </div>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
          {rows === null ? (
            <TableSkel rows={6} />
          ) : rows.length === 0 ? (
            <div className="text-sm opacity-70">No discrepancies found.</div>
          ) : (
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {rows.map((p) => (
                <li key={p.id} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.property}</div>
                    <div className="text-xs opacity-70">
                      {new Date(p.createdAt).toLocaleString(lang === "ur" ? "ur-PK" : "en-PK")} • {p.method}
                    </div>
                  </div>
                  <div className="text-xs">{p.status}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
