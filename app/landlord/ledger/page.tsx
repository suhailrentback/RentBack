// app/landlord/ledger/page.tsx
"use client";

import { useState, useEffect } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, formatPKR } from "@/lib/demo";
import { loadPayments, loadRewards, formatPKR } from "@/lib/demo";
import Link from "next/link";

export default function LandlordLedgerPage() {
  const lang: Lang = "en";
  const t = strings[lang].landlord;

  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  function exportCSV() {
    const csv = [
      ["ID", "Property", "Amount", "Status", "Date"],
      ...payments.map((p) => [
        p.id,
        p.property,
        p.amount,
        p.status,
        p.createdAt,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ledger.csv";
    a.click();
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">{t.ledgerCard}</h1>
        <button
          onClick={exportCSV}
          className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm"
        >
          Export CSV
        </button>
        <ul className="space-y-2">
          {payments.map((p) => (
            <li
              key={p.id}
              className="rounded-lg border border-black/10 dark:border-white/10 p-3 flex justify-between"
            >
              <div>
                <div className="font-medium">{p.property}</div>
                <div className="text-xs opacity-70">{p.status}</div>
              </div>
              <div className="text-right">
                <div>{formatPKR(p.amount)}</div>
                <Link
                  href={`/tenant/receipt/${p.id}`}
                  className="text-xs text-emerald-600 hover:underline"
                >
                  View Receipt
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MobileAppShell>
  );
}
