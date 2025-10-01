// app/admin/payouts/page.tsx
"use client";

import { useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { formatPKR } from "@/lib/demo";

export default function AdminPayoutsPage() {
  const [rows] = useState([
    { id: "a1", landlord: "Ahmed", week: "2025-09-20", amount: 120000 },
    { id: "a2", landlord: "Sara", week: "2025-09-27", amount: 140000 },
  ]);

  function exportCSV() {
    const csv = [
      ["Landlord", "Week", "Amount"],
      ...rows.map((r) => [r.landlord, r.week, r.amount]),
    ]
      .map((r) => r.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "admin_payouts.csv";
    a.click();
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Admin Payouts Overview</h1>
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
              <div>
                {r.landlord} ({r.week})
              </div>
              <div>{formatPKR(r.amount)}</div>
            </li>
          ))}
        </ul>
      </div>
    </MobileAppShell>
  );
}
