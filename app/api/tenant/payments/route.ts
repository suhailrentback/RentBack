import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email }});
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const payments = await prisma.payment.findMany({
    where: { payerId: user.id },
    orderBy: { createdAt: 'desc' },
    include: { lease: { include: { property: true }} }
  });
  return NextResponse.json({ payments });
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email }});
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const lease = await prisma.lease.findFirst({ where: { tenantId: user.id, active: true }});
  if (!lease) return NextResponse.json({ error: "no-active-lease" }, { status: 400 });

  const body = await req.json();
  const amount = Number(body?.amount ?? 0);
  const method = String(body?.method ?? "raast");

  const ref = "RB-" + Math.random().toString().slice(2,8).padStart(6,'0');

  const payment = await prisma.payment.create({
    data: { leaseId: lease.id, payerId: user.id, amount, method, ref, status: "PENDING" }
  });

  return NextResponse.json({ payment });
}
