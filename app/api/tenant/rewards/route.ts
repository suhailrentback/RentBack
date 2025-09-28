import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email }});
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const entries = await prisma.rewardEntry.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' }});
  const total = entries.reduce((s,e)=>s+e.points,0);
  return NextResponse.json({ total, entries });
}
