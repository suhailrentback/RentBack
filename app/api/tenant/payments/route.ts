import { NextResponse } from "next/server";
import { listPayments, createPayment, PaymentMethod } from "@/lib/demoData";

export async function GET() {
  return NextResponse.json({ items: listPayments() });
}

export async function POST(req: Request) {
  const body = await req.json().catch(()=> ({}));
  const { tenantEmail = "tenant@rentback.app", landlord, amountPKR, method, memo } = body || {};
  if (!landlord || !amountPKR || !method) {
    return NextResponse.json({ error: "Missing landlord/amount/method" }, { status: 400 });
  }
  const created = createPayment({
    tenantEmail,
    landlord,
    amountPKR: Number(amountPKR),
    method: String(method).toUpperCase() as PaymentMethod,
    memo,
  });
  return NextResponse.json({ item: created }, { status: 201 });
}
