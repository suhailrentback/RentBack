"use client";

import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { TableSkel } from "@/components/Skeletons";
import { strings } from "@/lib/i18n";

type LedgerRow = {
  id: string;
  tenant: string;
  property: string;
  amount: number;
  status: string;
  date: string;
};

export default function LandlordLedgerPage() {
  const lang: "en" | "ur" = "en"; // replace with your lang state later
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [ledger, setLedger] = useState<LedgerRow[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setLedger([]);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Ledger</h1>
        <p className="text-sm opacity-70">Landlord view of tenant payments.</p>

        {loading ? (
          <TableSkel rows={8} />
        ) : ledger.length === 0 ? (
          <EmptyState
            title="No ledger entries"
            subtitle="When tenants send payments, they’ll appear here."
          />
        ) : (
          <ul className="space-y-2">
            {ledger.map((row) => (
              <li
                key={row.id}
                className="rounded-lg border border-black/10 dark:border-white/10 p-3 flex justify-between"
              >
                <div>
                  <div className="font-medium">{row.tenant}</div>
                  <div className="text-xs opacity-70">{row.property}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">PKR {row.amount}</div>
                  <div className="text-xs opacity-70">{row.status}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MobileAppShell>
  );
}
