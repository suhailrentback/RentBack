"use client";

import { useMemo } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";
import { loadPayments, formatPKR } from "@/lib/demo";

// Simple CSV helper (same pattern used across other pages)
function downloadCSV(filename: string, rows: string[][]) {
  const csv = rows.map(r => r.map(cell => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function LandlordDiscrepanciesPage() {
  const t = strings.en; // or pick from cookie if you already wired it—kept simple to prevent build breaks

  // A "discrepancy" is defined as: PENDING and amount < 65,000 (demo rule)
  const discrepancies = useMemo(() => {
    const all = loadPayments();
    return all.filter(p => p.status === "PENDING" && p.amount < 65000);
  }, []);

  function exportCSV() {
    const header = ["ID", "Date", "Property", "Amount (PKR)", "Method", "Status"];
    const rows = discrepancies.map(d => [
      d.id,
      new Date(d.createdAt).toLocaleDateString(),
      d.property,
      String(d.amount),
      d.method,
      d.status,
    ]);
    downloadCSV("landlord_discrepancies.csv", [header, ...rows]);
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        {/* Header uses nested keys under landlord.home.discrepancies */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {t.landlord.home.discrepancies?.title ?? "Discrepancies"}
          </h1>
          <button
            onClick={exportCSV}
            className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm"
          >
            CSV
          </button>
        </div>
        <p className="text-sm opacity-70">
          {t.landlord.home.discrepancies?.subtitle ?? "Payments below due or pending review"}
        </p>

        {discrepancies.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-sm opacity-80">
            No discrepancies found.
          </div>
        ) : (
          <ul className="space-y-2">
            {discrepancies.map(d => (
              <li
                key={d.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{d.property}</div>
                    <div className="text-xs opacity-70">
                      {new Date(d.createdAt).toLocaleString()} · {d.method}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatPKR(d.amount)}</div>
                    <div className="text-xs text-amber-600">PENDING</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MobileAppShell>
  );
}
