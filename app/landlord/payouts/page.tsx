"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { TableSkel } from "@/components/Skeletons";

type PayoutRow = {
  id: string;
  week: string;
  total: number;
  count: number;
};

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

function toCSV(rows: PayoutRow[]) {
  const head = ["id", "week", "total", "count"];
  const body = rows.map(r => [r.id, r.week, String(r.total), String(r.count)]);
  const csv = [head, ...body].map(line => line.map(v => `"${v.replace?.(/"/g, '""') ?? v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `payouts_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LandlordPayoutsPage() {
  const [rows, setRows] = useState<PayoutRow[] | null>(null);

  useEffect(() => {
    // Demo rows
    setRows([
      { id: "py_2025w40", week: "2025-W40", total: 325000, count: 6 },
      { id: "py_2025w41", week: "2025-W41", total: 291500, count: 5 },
    ]);
  }, []);

  const exportCSV = () => rows && toCSV(rows);

  return (
    <AppShell role="landlord" title="Payouts">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Payouts</h1>
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
            No payouts found.
          </div>
        ) : (
          <ul className="space-y-2">
            {rows.map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
              >
                <div className="text-sm">
                  <div className="font-medium">{r.week}</div>
                  <div className="text-xs opacity-70">{r.count} receipts</div>
                </div>
                <div className="text-sm font-semibold">{formatPKR(r.total)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
