"use client";
import { useEffect, useMemo, useState } from "react";

type Row = {
  id: string; createdAt: string; landlord: string; amountPKR: number;
  method: string; status: string; ref: string;
};

export default function LandlordLedger() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Re-use admin transactions feed for demo
    fetch("/api/admin/transactions", { cache: "no-store" })
      .then(r => r.json())
      .then(d => setRows(d.items ?? []))
      .finally(()=> setLoading(false));
  }, []);

  const totalPosted = useMemo(
    () => rows.filter(r=> r.status === "POSTED").reduce((s,r)=> s + r.amountPKR, 0),
    [rows]
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-3">Ledger</h1>

      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 mb-4">
        <div className="text-sm opacity-70">Total Posted</div>
        <div className="text-2xl font-semibold mt-1">₨ {totalPosted.toLocaleString("en-PK")}</div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium opacity-80">Transactions</div>
        <a
          href="/api/export/transactions"
          className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
        >
          Download CSV
        </a>
      </div>

      {loading ? (
        <p className="text-sm opacity-70">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm opacity-70">No transactions.</p>
      ) : (
        <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
          {rows.map(r => (
            <div key={r.id} className="px-4 py-3 border-b last:border-0 border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{r.landlord}</div>
                  <div className="text-xs opacity-70">{new Date(r.createdAt).toLocaleString()} • {r.method} • {r.status}</div>
                </div>
                <div className="text-sm font-semibold">₨ {r.amountPKR.toLocaleString("en-PK")}</div>
              </div>
              <div className="text-xs opacity-70 mt-1">Ref: {r.ref}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
