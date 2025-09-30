"use client";
import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { csvForDiscrepancies } from "@/lib/demo";

type Row = { property: string; tenant: string; expected: number; paid: number };

export default function LandlordDiscrepanciesPage() {
  const [rows, setRows] = useState<Row[]|null>(null);

  useEffect(() => {
    // demo: one underpayment
    setTimeout(() => {
      setRows([
        { property: "Gulberg Heights A-14", tenant: "Ali Raza", expected: 65000, paid: 60000 },
      ]);
    }, 300);
  }, []);

  function downloadCSV() {
    if (!rows?.length) return;
    const csv = csvForDiscrepancies(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "landlord_discrepancies.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Discrepancies</h1>
          <button onClick={downloadCSV} className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
            Export CSV
          </button>
        </div>

        {!rows && <div className="h-24 rounded-xl bg-black/5 dark:bg-white/10 animate-pulse" />}
        {rows && rows.length === 0 && (
          <div className="text-sm opacity-70">All settled — no discrepancies.</div>
        )}
        {rows && rows.length > 0 && (
          <div className="space-y-3">
            {rows.map((r, i) => {
              const delta = r.paid - r.expected;
              const badge = delta < 0 ? "bg-amber-500" : delta > 0 ? "bg-blue-500" : "bg-emerald-600";
              const label = delta < 0 ? "Under" : delta > 0 ? "Over" : "On target";
              return (
                <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{r.property}</div>
                      <div className="text-xs opacity-70">{r.tenant}</div>
                    </div>
                    <div className={`text-[10px] px-2 py-0.5 rounded-full text-white ${badge}`}>{label}</div>
                  </div>
                  <div className="mt-3 text-sm">
                    Expected: <b>₨ {r.expected.toLocaleString("en-PK")}</b> &nbsp;·&nbsp; Paid: <b>₨ {r.paid.toLocaleString("en-PK")}</b> &nbsp;·&nbsp;
                    Delta: <b>₨ {(delta).toLocaleString("en-PK")}</b>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
