import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/util";

export default async function LedgerPage() {
  const rows = await prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { lease: { include: { property: true } }, payer: true }
  });

  const totals = rows.reduce((s,r)=> s + (r.status==='POSTED'? r.amount:0), 0);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
        <div className="text-sm opacity-70">Collected</div>
        <div className="text-3xl font-extrabold">{formatPKR(totals)}</div>
        <a href="/api/export/transactions" className="text-sm underline opacity-80">Export CSV</a>
      </div>
      <div className="mt-4 space-y-2">
        {rows.map(r=>(
          <div key={r.id} className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
            <div className="font-medium">{r.lease.property.title}</div>
            <div className="text-sm">{formatPKR(r.amount)} • {r.method.toUpperCase()} • {r.status}</div>
            <div className="text-xs opacity-70">{r.payer.email} • {r.ref}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
