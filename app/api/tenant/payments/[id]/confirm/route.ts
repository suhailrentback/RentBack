import { NextResponse } from "next/server";
import { confirmPayment } from "@/lib/demoData";

type Params = { params: { id: string } };

export async function POST(_: Request, { params }: Params) {
  const updated = confirmPayment(params.id);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: updated });
}
