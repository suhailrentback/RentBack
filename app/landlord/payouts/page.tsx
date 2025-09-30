"use client";
import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { csvForPayouts } from "@/lib/demo";

type Row = { week: string; total: number; count: number };

export default function AdminPayoutsOverviewPage() {
  const [rows, setRows] = useState<Row[]|null>(null);

  useEffect(() => {
    setTimeout(() => {
      setRows([
        { week: "This Week", total: 485000, count: 7 },
        { week: "Last Week", total: 610000, count: 9 },
      ]);
    }, 300);
  }, []);

  function downloadCSV() {
    if (!rows?.length) return;
    const csv = csvForPayouts(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "admin_payouts_overview.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Payouts Overview</h1>
          <button onClick={downloadCSV} className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
            Export CSV
          </button>
        </div>
        {!rows && <div className="h-24 rounded-xl bg-black/5 dark:bg-white/10 animate-pulse" />}
        {rows && rows.length > 0 && rows.map(r => (
          <div key={r.week} className="rounded-xl border border-black/10 dark:border-white/10 p-4 flex items-center justify-between">
            <div className="font-medium">{r.week}</div>
            <div className="text-right">
              <div className="font-semibold">₨ {r.total.toLocaleString("en-PK")}</div>
              <div className="text-xs opacity-70">{r.count} payments</div>
            </div>
          </div>
        ))}
      </div>
    </MobileAppShell>
  );
}
