// app/api/log/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    console.error("[client-log]", body);
  } catch (e) {
    console.error("[client-log] failed", e);
  }
  return NextResponse.json({ ok: true });
}
