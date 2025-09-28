import { NextResponse } from "next/server";
import { listTransactions, toCSV } from "@/lib/demoData";

export async function GET() {
  const csv = toCSV(listTransactions());
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="transactions_demo.csv"`,
    },
  });
}
