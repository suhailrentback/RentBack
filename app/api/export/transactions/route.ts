import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { toCSV } from "@/lib/util";

export async function GET() {
  const session = await getServerSession();
  if ((session as any)?.role !== 'ADMIN' && (session as any)?.role !== 'LANDLORD')
    return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const rows = await prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { payer: true, lease: { include: { property: true } } }
  });

  const flat = rows.map(r => ({
    id: r.id,
    createdAt: r.createdAt.toISOString(),
    postedAt: r.postedAt?.toISOString() ?? "",
    status: r.status,
    amount: r.amount,
    method: r.method,
    ref: r.ref,
    tenant: r.payer.email,
    property: r.lease.property.title,
  }));

  const csv = toCSV(flat);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="transactions.csv"`
    }
  });
}
