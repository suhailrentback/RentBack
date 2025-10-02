"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import Link from "next/link";
import { TableSkel } from "@/components/Skeletons";

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function LandlordLedgerPage() {
  const lang: Lang = "en";
  const t = strings[lang];

  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    setRows(loadPayments());
  }, []);

  return (
    <AppShell role="landlord" title="Ledger">
      <div className="p-4 space-y-4">
        {rows === null ? (
          <TableSkel />
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-sm opacity-70">
            No payments found.
          </div>
        ) : (
          <ul className="space-y-2">
            {rows.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
              >
                <div className="text-sm">
                  <div className="font-medium">{p.property}</div>
                  <div className="text-xs opacity-70">
                    {new Date(p.createdAt).toLocaleString(lang === "ur" ? "ur-PK" : "en-PK")} • {p.method}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold">{formatPKR(p.amount)}</div>
                  <Link
                    href={`/tenant/receipt/${p.id}`}
                    className="text-xs px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    View receipt
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
