"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { strings, type Lang, localeFor } from "@/lib/i18n";
import { loadPayments, type DemoPayment, formatPKR } from "@/lib/demo";

export default function LandlordLedgerPage() {
  const lang: Lang = "en"; // TODO: wire from context/store
  const t = strings[lang];

  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    setRows(loadPayments());
  }, []);

  return (
    <AppShell role="landlord" title="Ledger">
      {rows === null ? (
        <div className="h-24 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white dark:bg-white/5">
          <div className="text-sm font-medium">No payments yet</div>
          <div className="text-xs opacity-70 mt-1">When tenants pay, they’ll appear here.</div>
        </div>
      ) : (
        <ul className="space-y-2">
          {rows.map((p) => (
            <li
              key={p.id}
              className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{p.property}</div>
                <div className="text-xs opacity-70">
                  {new Date(p.createdAt).toLocaleString(localeFor(lang))} • {p.method}
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
    </AppShell>
  );
}
