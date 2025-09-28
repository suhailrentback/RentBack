import { NextResponse } from "next/server";
import { listPayments } from "@/lib/demoData";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const p = listPayments().find(x => x.id === params.id);
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: p });
}
