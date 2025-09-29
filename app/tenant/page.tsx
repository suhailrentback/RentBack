"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Payment = {
  id: string; createdAt: string; landlord: string; amountPKR: number;
  method: string; status: string; ref: string;
};

export default function TenantHome() {
  const [rows, setRows] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tenant/payments", { cache: "no-store" })
      .then(r => r.json())
      .then(d => setRows(d.items ?? []))
      .finally(()=> setLoading(false));
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-3">Tenant</h1>

      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-70">Quick actions</div>
            <div className="text-sm mt-1">
              <Link href="/tenant/pay" className="text-emerald-600 dark:text-emerald-400 font-medium">Pay Rent →</Link>
            </div>
          </div>
          <Link
            href="/tenant/rewards"
            className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
          >
            Rewards
          </Link>
        </div>
      </div>

      <h2 className="text-sm font-medium opacity-80 mb-2">Recent Payments</h2>
      {loading ? (
        <p className="text-sm opacity-70">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm opacity-70">No payments yet.</p>
      ) : (
        <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
          {rows.map(r => (
            <Link
              href={`/tenant/receipt/${r.id}`}
              key={r.id}
              className="flex items-center justify-between px-4 py-3 border-b last:border-0 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <div>
                <div className="text-sm font-medium">{r.landlord}</div>
                <div className="text-xs opacity-70">{new Date(r.createdAt).toLocaleString()} • {r.method} • {r.status}</div>
              </div>
              <div className="text-sm font-semibold">₨ {r.amountPKR.toLocaleString("en-PK")}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
