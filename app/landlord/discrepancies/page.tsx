"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { TableSkel } from "@/components/Skeletons";

type DiscRow = {
  id: string;
  receiptId: string;
  reason: string;
  amount: number;
};

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

function toCSV(rows: DiscRow[]) {
  const head = ["id", "receiptId", "reason", "amount"];
  const body = rows.map(r => [r.id, r.receiptId, r.reason, String(r.amount)]);
  const csv = [head, ...body].map(line => line.map(v => `"${v.replace?.(/"/g, '""') ?? v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `discrepancies_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LandlordDiscrepanciesPage() {
  const [rows, setRows] = useState<DiscRow[] | null>(null);

  useEffect(() => {
    // Demo rows
    setRows([
      { id: "d_001", receiptId: "p_abc123", reason: "Amount mismatch", amount: 1500 },
      { id: "d_002", receiptId: "p_xyz789", reason: "Duplicate payment", amount: 65000 },
    ]);
  }, []);

  const exportCSV = () => rows && toCSV(rows);

  return (
    <AppShell role="landlord" title="Discrepancies">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Discrepancies</h1>
          <button
            onClick={exportCSV}
            disabled={!rows || rows.length === 0}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>

        {rows === null ? (
          <TableSkel />
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-sm opacity-70">
            No discrepancies found.
          </div>
        ) : (
          <ul className="space-y-2">
            {rows.map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
              >
                <div className="text-sm">
                  <div className="font-medium">{r.reason}</div>
                  <div className="text-xs opacity-70">Receipt: {r.receiptId}</div>
                </div>
                <div className="text-sm font-semibold">{formatPKR(r.amount)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
