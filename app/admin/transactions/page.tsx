"use client";
import { useEffect, useState } from "react";

type Row = {
  id: string;
  createdAt: string;
  tenantEmail: string;
  landlord: string;
  amountPKR: number;
  method: string;
  status: string;
  ref: string;
  memo?: string;
};

export default function AdminTransactions() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/transactions", { cache: "no-store" })
      .then(r => r.json())
      .then(d => setRows(d.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Admin · Transactions</h1>
        <a
          href="/api/export/transactions"
          className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
        >
          Download CSV
        </a>
      </div>

      {loading ? (
        <p className="opacity-70 text-sm">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="opacity-70 text-sm">No transactions.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-black/5 dark:bg-white/10">
              <tr>
                <Th>ID</Th><Th>Date</Th><Th>Tenant</Th><Th>Landlord</Th>
                <Th>Amount</Th><Th>Method</Th><Th>Status</Th><Th>Ref</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-t border-black/10 dark:border-white/10">
                  <Td className="font-mono">{r.id}</Td>
                  <Td>{new Date(r.createdAt).toLocaleString()}</Td>
                  <Td>{r.tenantEmail}</Td>
                  <Td>{r.landlord}</Td>
                  <Td>₨ {r.amountPKR.toLocaleString("en-PK")}</Td>
                  <Td>{r.method}</Td>
                  <Td>{r.status}</Td>
                  <Td>{r.ref}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-3 py-2 font-medium">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
