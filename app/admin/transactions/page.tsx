"use client";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { csvForAdmin, formatPKR, getAdminTransactions } from "@/lib/demo";

export default function AdminTxPage(){
  const [rows, setRows] = useState<any[]>([]);
  const [days, setDays] = useState(30);

  useEffect(()=>{ setRows(getAdminTransactions()); }, []);

  const filtered = useMemo(()=>{
    const since = Date.now() - days*86400e3;
    return rows.filter((r:any)=> new Date(r.createdAt).getTime() >= since );
  }, [rows, days]);

  function download(){
    const csv = csvForAdmin(filtered as any);
    const blob = new Blob([csv], { type:"text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "transactions.csv"; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="mt-3 flex items-center gap-2">
          <label className="text-sm opacity-70">Last</label>
          <select className="h-10 px-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5" value={days} onChange={e=>setDays(parseInt(e.target.value))}>
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
          </select>
          <button type="button" onClick={download} className="ml-auto h-10 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">Export CSV</button>
        </div>

        <div className="mt-4 grid gap-2">
          {filtered.map(r=>(
            <div key={r.id} className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.party}</div>
                  <div className="text-xs opacity-70">{new Date(r.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPKR(r.amount)}</div>
                  <div className="text-xs opacity-70">{r.method} • {r.status}</div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length===0 && <div className="text-sm opacity-70">No transactions in range.</div>}
        </div>
      </div>
    </MobileAppShell>
  );
}
