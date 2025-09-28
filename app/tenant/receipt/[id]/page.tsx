import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/util";

export default async function Receipt({ params }: { params: { id: string } }) {
  const p = await prisma.payment.findUnique({
    where: { id: params.id },
    include: { payer: true, lease: { include: { property: true } } }
  });
  if (!p) return <div className="p-8">Not found.</div>;
  return (
    <div className="max-w-md mx-auto p-6 print:max-w-none">
      <h1 className="text-2xl font-extrabold">Payment Receipt</h1>
      <div className="mt-4 space-y-1 text-sm">
        <div><b>Ref:</b> {p.ref}</div>
        <div><b>Status:</b> {p.status}</div>
        <div><b>Amount:</b> {formatPKR(p.amount)}</div>
        <div><b>Method:</b> {p.method.toUpperCase()}</div>
        <div><b>Payer:</b> {p.payer.email}</div>
        <div><b>Property:</b> {p.lease.property.title}</div>
        <div><b>Date:</b> {p.postedAt?.toLocaleString() ?? p.createdAt.toLocaleString()}</div>
      </div>
      <button
        className="mt-6 px-3 py-2 rounded bg-emerald-600 text-white print:hidden"
        onClick={()=>window.print()}
      >Print</button>
    </div>
  );
}
