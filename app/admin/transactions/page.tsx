"use client";

import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { TableSkel } from "@/components/Skeletons";

type Transaction = {
  id: string;
  party: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
};

export default function AdminTransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setTransactions([]);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Admin Transactions</h1>
        <p className="text-sm opacity-70">All tenant → landlord payments.</p>

        {loading ? (
          <TableSkel rows={10} />
        ) : transactions.length === 0 ? (
          <EmptyState
            title="No transactions found"
            subtitle="Try widening your date range or filters."
          />
        ) : (
          <ul className="space-y-2">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="rounded-lg border border-black/10 dark:border-white/10 p-3 flex justify-between"
              >
                <div>
                  <div className="font-medium">{tx.party}</div>
                  <div className="text-xs opacity-70">
                    {new Date(tx.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">PKR {tx.amount}</div>
                  <div className="text-xs opacity-70">{tx.status}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MobileAppShell>
  );
}
