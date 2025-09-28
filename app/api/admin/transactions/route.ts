import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession();
  if ((session as any)?.role !== 'ADMIN') return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  const status = url.searchParams.get("status") ?? "";
  const take = Number(url.searchParams.get("take") ?? 100);

  const payments = await prisma.payment.findMany({
    where: {
      AND: [
        status ? { status: status as any } : {},
        q ? {
          OR: [
            { ref: { contains: q, mode: 'insensitive' } },
            { method: { contains: q, mode: 'insensitive' } },
            { payer: { email: { contains: q, mode: 'insensitive' } } },
          ]
        } : {}
      ]
    },
    orderBy: { createdAt: 'desc' },
    take,
    include: { payer: true, lease: { include: { property: true } } }
  });

  return NextResponse.json({ payments });
}
