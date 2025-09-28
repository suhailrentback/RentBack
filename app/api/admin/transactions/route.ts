// app/api/admin/transactions/route.ts
import { NextResponse } from "next/server";

// Simple in-memory/demo data – replace with real DB later
const demoTransactions = [
  {
    id: "txn_demo_001",
    createdAt: new Date().toISOString(),
    tenantEmail: "tenant@rentback.app",
    landlord: "Sunrise Apartments",
    amountPKR: 120000,
    method: "RAAST",
    status: "POSTED",
    ref: "RB-0001"
  },
  {
    id: "txn_demo_002",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    tenantEmail: "tenant@rentback.app",
    landlord: "Canal View Flats",
    amountPKR: 95000,
    method: "CARD",
    status: "PENDING",
    ref: "RB-0002"
  }
];

export async function GET() {
  return NextResponse.json({ items: demoTransactions });
}
