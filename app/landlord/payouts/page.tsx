// app/landlord/payouts/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { strings, type Lang, localeFor } from "@/lib/i18n";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { exportToCSV } from "@/lib/csv";
import { TableSkel } from "@/components/Skeletons";

const formatPKR = (v: number, lang: Lang) =>
  `Rs ${Math.round(v).toLocaleString(localeFor(lang))}`;

export default function LandlordPayoutsPage() {
  const { lang } = useLang(); // "en" | "ur"
  const t = strings[lang];

  // Localized page title — do NOT read a missing key from i18n
  const pageTitle = lang === "ur" ? "ادائیگیاں" : "Payouts";

  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    // Demo rule: treat all SENT payments as "payouts"
    const all = loadPayments();
    const sent = all.filter((p) => p.status === "SENT");
    setRows(sent);
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
            onClick={() => exportToCSV(csv, "payouts")}
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
              {lang === "ur" ? "ابھی کوئی ادائیگی نہیں۔" : "No payouts yet."}
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
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-600 text-white h-fit">
                      {t.tenant.pay.sent || "Sent"}
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
