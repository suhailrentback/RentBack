// app/landlord/discrepancies/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { strings, type Lang, localeFor } from "@/lib/i18n";
import { loadPayments, type DemoPayment, type Method, type Status } from "@/lib/demo";
import { exportToCSV } from "@/lib/csv";
import { TableSkel as TableSkel } from "@/components/Skeletons";

const formatPKR = (v: number, lang: Lang) =>
  `Rs ${Math.round(v).toLocaleString(localeFor(lang))}`;

export default function LandlordDiscrepanciesPage() {
  const { lang } = useLang(); // "en" | "ur"
  const t = strings[lang];

  // Localized page title (don’t read a missing key)
  const pageTitle = lang === "ur" ? "غیر مطابقت" : "Discrepancies";

  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    // Demo rule: treat all PENDING payments as "discrepancies"
    const all = loadPayments();
    const pending = all.filter((p) => p.status === "PENDING");
    setRows(pending);
  }, []);

  const csv = useMemo(() => {
    if (!rows || rows.length === 0) return "";
    const header = ["id", "createdAt", "property", "method", "amount", "status"];
    const body = rows.map((r) =>
      [
        r.id,
        r.createdAt,
        r.property,
        r.method,
        String(r.amount),
        r.status,
      ].join(",")
    );
    return [header.join(","), ...body].join("\n");
  }, [rows]);

  return (
    <AppShell role="landlord" title={pageTitle}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
          <button
            onClick={() => exportToCSV(csv, "discrepancies")}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm disabled:opacity-60"
            disabled={!rows || rows.length === 0}
          >
            CSV
          </button>
        </div>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
          {rows === null ? (
            <TableSkel rows={8} />
          ) : rows.length === 0 ? (
            <div className="text-sm opacity-70">
              {lang === "ur" ? "کوئی غیر مطابقت نہیں ملی۔" : "No discrepancies found."}
            </div>
          ) : (
            <div className="divide-y divide-black/5 dark:divide-white/10">
              {rows.map((p) => (
                <div key={p.id} className="py-2 grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-6">
                    <div className="font-medium">{p.property}</div>
                    <div className="text-xs opacity-70">
                      {new Date(p.createdAt).toLocaleString(localeFor(lang))} • {p.method}
                    </div>
                  </div>
                  <div className="sm:col-span-3 text-sm sm:text-right">
                    {formatPKR(p.amount, lang)}
                  </div>
                  <div className="sm:col-span-3 flex sm:justify-end">
                    <span
                      className={
                        p.status === "SENT"
                          ? "text-[10px] px-2 py-0.5 rounded bg-emerald-600 text-white h-fit"
                          : "text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 h-fit"
                      }
                    >
                      {p.status === "SENT"
                        ? (t.tenant.pay.sent || "Sent")
                        : (t.tenant.pay.pending || "Pending")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
