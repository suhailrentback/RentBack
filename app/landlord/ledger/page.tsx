"use client";

import { useState, useEffect } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, formatPKR } from "@/lib/demo";
import Link from "next/link";

type Method = "RAAST" | "BANK" | "JAZZCASH";
type Status = "PENDING" | "SENT";
type DemoPayment = {
  id: string;
  createdAt: string;
  property: string;
  amount: number;
  method: Method;
  status: Status;
};

// simple CSV helper
function downloadCSV(filename: string, rows: string[][]) {
  const csv = rows.map(r => r.map(c => `"${String(c).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function LandlordLedgerPage() {
  const lang: Lang = "en"; // keep simple to avoid i18n type noise; wire cookie later
  const t = strings[lang];

  const [rows, setRows] = useState<DemoPayment[]>([]);

  useEffect(() => {
    setRows(loadPayments());
  }, []);

  const exportCSV = () => {
    const header = ["ID", "Date", "Property", "Amount (PKR)", "Method", "Status"];
    const data = rows.map(p => [
      p.id,
      new Date(p.createdAt).toLocaleString(),
      p.property,
      String(p.amount),
      p.method,
      p.status,
    ]);
    downloadCSV("ledger.csv", [header, ...data]);
  };

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {t.landlord.home.quickLinks.ledger /* "View Ledger" label */ }
          </h1>
          <button
            onClick={exportCSV}
            className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm"
          >
            CSV
          </button>
        </div>

        {rows.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-sm opacity-80">
            No rows yet.
          </div>
        ) : (
          <ul className="space-y-2">
            {rows.map(p => (
              <li
                key={p.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.property}</div>
                    <div className="text-xs opacity-70">
                      {new Date(p.createdAt).toLocaleString()} · {p.method}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatPKR(p.amount)}</div>
                    <div className="text-xs opacity-70">{p.status}</div>
                  </div>
                </div>

                {/* View receipt link */}
                <div className="mt-2 text-right">
                  {p.status === "SENT" ? (
                    <Link
                      href={`/tenant/receipt/${p.id}`}
                      className="inline-flex text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      View receipt
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MobileAppShell>
  );
}
