"use client";
import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { csvForLedger, formatPKR, getLandlordLedger } from "@/lib/demo";

export default function LedgerPage(){
  const [rows, setRows] = useState<any[]>([]);
  useEffect(()=>{ setRows(getLandlordLedger()); }, []);

  function download(){
    const csv = csvForLedger(rows);
    const blob = new Blob([csv], { type:"text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "ledger.csv"; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">Ledger</h1>
        <p className="text-sm opacity-70">Posted payments from tenants</p>

        <div className="mt-4">
          <button onClick={download} className="h-10 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">Download CSV</button>
        </div>

        <div className="mt-4 grid gap-2">
          {rows.map(r=>(
            <div key={r.id} className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.property}</div>
                  <div className="text-xs opacity-70">{r.tenant} • {new Date(r.date).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPKR(r.amount)}</div>
                  <div className="text-xs opacity-70">{r.method} • {r.status}</div>
                </div>
              </div>
            </div>
          ))}
          {rows.length===0 && <div className="text-sm opacity-70">No entries.</div>}
        </div>
      </div>
    </MobileAppShell>
  );
}
