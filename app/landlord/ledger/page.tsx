"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import MobileAppShell from "@/components/MobileAppShell";

type Row = { id?: string; createdAt?: string; date?: string; tenant?: string; property?: string; amount?: number; method?: string; status?: string };

export default function LandlordLedgerPage() {
  const [rows, setRows] = useState<Row[]|null>(null);

  useEffect(() => {
    // demo data; replace with real state if you already have it.
    setTimeout(() => {
      setRows([
        { id: "rbpmt_001", createdAt: new Date().toISOString(), tenant: "Ali Raza", property: "Gulberg Heights A-14", amount: 65000, method: "RAAST", status: "POSTED" },
        { id: "rbpmt_000", createdAt: new Date(Date.now()-86400000).toISOString(), tenant: "Sara Khan", property: "Emaar Crescent 9-B", amount: 95000, method: "Bank Transfer", status: "POSTED" },
      ]);
    }, 300);
  }, []);

  function downloadCSV() {
    if (!rows?.length) return;
    const headers = ["id","date","tenant","property","amount_pkr","method","status"];
    const lines = [
      headers.join(","),
      ...rows.map(r => [
        safe(r.id ?? ""),
        safe(r.createdAt ?? r.date ?? ""),
        safe(r.tenant ?? ""),
        safe(r.property ?? ""),
        num(r.amount ?? 0),
        safe(r.method ?? ""),
        safe(r.status ?? ""),
      ].join(","))
    ];
    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "landlord_ledger.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Ledger</h1>
          <button onClick={downloadCSV} className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
            Export CSV
          </button>
        </div>

        {!rows && <div className="h-24 rounded-xl bg-black/5 dark:bg-white/10 animate-pulse" />}

        {rows && rows.length === 0 && (
          <div className="text-sm opacity-70">No payments yet.</div>
        )}

        {rows && rows.length > 0 && (
          <div className="space-y-3">
            {rows.map((r, i) => (
              <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.property ?? "Property"}</div>
                    <div className="text-xs opacity-70">
                      {r.tenant ?? "Tenant"} · {new Date(r.createdAt ?? r.date ?? Date.now()).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₨ {(r.amount ?? 0).toLocaleString("en-PK")}</div>
                    <div className="text-xs opacity-70">{r.method ?? "Method"}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white">{r.status ?? "POSTED"}</span>
                  {r.id ? (
                    <Link
                      href={`/tenant/receipt/${encodeURIComponent(r.id)}`}
                      className="text-xs px-2 py-1 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      View receipt →
                    </Link>
                  ) : (
                    <span className="text-xs opacity-60">No receipt link</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}

function safe(v: any) {
  const s = String(v ?? "");
  const esc = s.replace(/"/g, '""');
  return /[",\n]/.test(esc) ? `"${esc}"` : esc;
}
function num(n: number) {
  return isFinite(n) ? String(n) : "0";
}
