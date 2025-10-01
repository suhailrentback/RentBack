// app/landlord/discrepancies/page.tsx
"use client";

import { useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { formatPKR } from "@/lib/demo";

export default function LandlordDiscrepanciesPage() {
  const lang: Lang = "en";
  const t = strings[lang].landlord;

  const [rows] = useState([
    { id: "d1", tenant: "Ali", expected: 65000, paid: 60000 },
  ]);

  function exportCSV() {
    const csv = [
      ["Tenant", "Expected", "Paid", "Difference"],
      ...rows.map((r) => [r.tenant, r.expected, r.paid, r.expected - r.paid]),
    ]
      .map((r) => r.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "discrepancies.csv";
    a.click();
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">{t.discrepanciesCard}</h1>
        <button
          onClick={exportCSV}
          className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm"
        >
          Export CSV
        </button>
        <ul className="space-y-2">
          {rows.map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-black/10 dark:border-white/10 p-3 flex justify-between"
            >
              <div>{r.tenant}</div>
              <div className="text-right">
                <div>{formatPKR(r.paid)}</div>
                <div className="text-xs opacity-70">
                  Diff: {formatPKR(r.expected - r.paid)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MobileAppShell>
  );
}
