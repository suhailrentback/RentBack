// lib/demoData.ts
export type PaymentMethod = "RAAST" | "CARD" | "WALLET";
export type PaymentStatus = "PENDING" | "POSTED" | "FAILED";

export type Payment = {
  id: string;
  createdAt: string;           // ISO
  tenantEmail: string;
  landlord: string;
  amountPKR: number;
  method: PaymentMethod;
  status: PaymentStatus;
  ref: string;
  memo?: string;
};

let seq = 3; // simple id counter for demo

const payments: Payment[] = [
  {
    id: "txn_demo_001",
    createdAt: new Date().toISOString(),
    tenantEmail: "tenant@rentback.app",
    landlord: "Sunrise Apartments",
    amountPKR: 120_000,
    method: "RAAST",
    status: "POSTED",
    ref: "RB-0001",
  },
  {
    id: "txn_demo_002",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    tenantEmail: "tenant@rentback.app",
    landlord: "Canal View Flats",
    amountPKR: 95_000,
    method: "CARD",
    status: "PENDING",
    ref: "RB-0002",
  },
];

export function listPayments(): Payment[] {
  return payments.slice().sort((a,b)=> b.createdAt.localeCompare(a.createdAt));
}

export function createPayment(input: {
  tenantEmail: string;
  landlord: string;
  amountPKR: number;
  method: PaymentMethod;
  memo?: string;
}): Payment {
  const id = `txn_demo_${String(seq++).padStart(3, "0")}`;
  const p: Payment = {
    id,
    createdAt: new Date().toISOString(),
    tenantEmail: input.tenantEmail,
    landlord: input.landlord,
    amountPKR: input.amountPKR,
    method: input.method,
    status: "PENDING",
    ref: `RB-${String(seq).padStart(4, "0")}`,
    memo: input.memo,
  };
  payments.unshift(p);
  return p;
}

export function confirmPayment(id: string): Payment | undefined {
  const p = payments.find(x => x.id === id);
  if (p) p.status = "POSTED";
  return p;
}

// For admin "transactions", we just expose the same list.
export function listTransactions(): Payment[] {
  return listPayments();
}

// CSV helper
export function toCSV(rows: Payment[]): string {
  const header = [
    "id","createdAt","tenantEmail","landlord","amountPKR","method","status","ref","memo"
  ];
  const body = rows.map(r => [
    r.id, r.createdAt, r.tenantEmail, r.landlord, r.amountPKR, r.method, r.status, r.ref, r.memo??""
  ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(","));
  return [header.join(","), ...body].join("\n");
}
