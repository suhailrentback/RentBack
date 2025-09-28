import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/util";

export default async function AdminTx() {
  const rows = await prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { payer: true, lease: { include: { property: true } } }
  });

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Transactions</h1>
        <a href="/api/export/transactions" className="text-sm underline opacity-80">Export CSV</a>
      </div>
      <div className="mt-4 space-y-2">
        {rows.map(r=>(
          <div key={r.id} className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
            <div className="font-medium">{formatPKR(r.amount)} • {r.status}</div>
            <div className="text-sm">{r.payer.email} • {r.method.toUpperCase()} • {r.lease.property.title}</div>
            <div className="text-xs opacity-70">{r.ref} • {r.createdAt.toISOString()}</div>
          </div>
        ))}
        {!rows.length && <div className="text-sm opacity-70">No transactions.</div>}
      </div>
    </div>
  );
}
