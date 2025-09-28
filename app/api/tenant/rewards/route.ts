import { NextResponse } from "next/server";
import { listRewards, redeem } from "@/lib/rewardsDemo";

export async function GET() {
  const data = listRewards();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json().catch(()=> ({}));
  const points = Number(body?.points ?? 0);
  const memo = String(body?.memo ?? "");
  const out = redeem(points, memo);
  if (!out.ok) return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
  return NextResponse.json({ balance: out.balance });
}
