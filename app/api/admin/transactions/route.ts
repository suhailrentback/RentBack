import { NextResponse } from "next/server";
import { listTransactions } from "@/lib/demoData";

export async function GET() {
  return NextResponse.json({ items: listTransactions() });
}
