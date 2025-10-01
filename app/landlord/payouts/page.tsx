// app/landlord/payouts/page.tsx
"use client";

import { useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { formatPKR } from "@/lib/demo";

export default function LandlordPayoutsPage() {
  const lang: Lang = "en";
  const t = strings[lang].landlord;

  const [payouts] = useState([
    { id: "p1", week: "2025-09-20", amount: 120000 },
    { id: "p2", week: "2025-09-27", amount: 140000 },
  ]);

  function exportCSV() {
    const csv = [
      ["Week", "Amount"],
      ...payouts.map((p) => [p.week, p.amount]),
    ]
      .map((r) => r.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payouts.csv";
    a.click();
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">{t.payoutsCard}</h1>
        <button
          onClick={exportCSV}
          className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm"
        >
          Export CSV
        </button>
        <ul className="space-y-2">
          {payouts.map((p) => (
            <li
              key={p.id}
              className="rounded-lg border border-black/10 dark:border-white/10 p-3 flex justify-between"
            >
              <div>{p.week}</div>
              <div>{formatPKR(p.amount)}</div>
            </li>
          ))}
        </ul>
      </div>
    </MobileAppShell>
  );
}
