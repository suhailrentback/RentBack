import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(_: Request, { params }: { params: { id: string }}) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email }});
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const p = await prisma.payment.findFirst({ where: { id: params.id, payerId: user.id }});
  if (!p) return NextResponse.json({ error: "not-found" }, { status: 404 });
  if (p.status === 'POSTED') return NextResponse.json({ payment: p });

  const updated = await prisma.payment.update({
    where: { id: p.id },
    data: { status: "POSTED", postedAt: new Date() }
  });

  // accrual: 1% of amount as points (simple MVP)
  await prisma.rewardEntry.create({
    data: { userId: user.id, paymentId: p.id, points: Math.floor(p.amount * 0.01), reason: "rent-posted" }
  });

  return NextResponse.json({ payment: updated });
}
