// lib/demo.ts
// Demo types + helpers shared across tenant / landlord / admin

// ----- Types expected by pages -----
export type PaymentStatus = "initiated" | "sent" | "succeeded" | "refunded";
export type PaymentMethod = "Bank Transfer" | "Card" | "Wallet";

export type Payment = {
  id: string;
  ref: string;
  amount: number;
  landlord: string; // property or payee label
  method: PaymentMethod;
  status: PaymentStatus;
  ts: number; // epoch ms
};

// Admin/landlord demo types (optional but handy)
export type Transaction = {
  id: string;
  ref: string;
  tenant: string;
  landlord: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: number;
};

export type LedgerEntry = {
  id: string;
  ref: string;
  Property: string;
  Tenant: string;
  Amount: number;
  Status: PaymentStatus;
  Method: PaymentMethod;
  Date: number;
};

// ----- Formatters & generators -----
export function formatPKR(n: number): string {
  try {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `PKR ${Math.round(n).toLocaleString()}`;
  }
}

// For numeric inputs (keeps only digits, returns pretty view + numeric value)
export function formatPKRInput(raw: string): { view: string; value: number } {
  const digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return { view: "", value: 0 };
  const value = Number(digits);
  const view = new Intl.NumberFormat("en-PK").format(value);
  return { view, value };
}

export function makeRef(prefix = "RB"): string {
  return `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
}

// ----- CSV helpers -----
export function toCSV(rows: (string | number)[][]): string {
  return rows
    .map((r) =>
      r
        .map((cell) => {
          const s = String(cell ?? "");
          return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(",")
    )
    .join("\n");
}

export function downloadCSVBrowser(filename: string, rows: (string | number)[][]) {
  const csv = toCSV(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ----- Demo data for landlord/admin -----
const now = Date.now();
function rnd(n: number) { return Math.floor(Math.random() * n); }

export function getDemoTransactions(count = 24): Transaction[] {
  const tenants = ["Ali Khan", "Ayesha Iqbal", "Bilal Ahmed", "Zara Saeed"];
  const landlords = [
    "Khan Estates – DHA",
    "City View Residency – Block B",
    "Garden Heights – 5C",
  ];
  const methods: PaymentMethod[] = ["Bank Transfer", "Card", "Wallet"];
  const statuses: PaymentStatus[] = ["initiated", "sent", "succeeded", "refunded"];

  return Array.from({ length: count }).map((_, i) => {
    const method = methods[rnd(methods.length)];
    const status = statuses[rnd(statuses.length)];
    return {
      id: String(now - i * 60_000),
      ref: makeRef("RB"),
      tenant: tenants[rnd(tenants.length)],
      landlord: landlords[rnd(landlords.length)],
      amount: [85000, 95000, 100000, 120000, 180000][rnd(5)],
      method,
      status,
      createdAt: now - i * 86_400_000 + rnd(86_400_000),
    };
  });
}

export function getDemoLedger(count = 18): LedgerEntry[] {
  return getDemoTransactions(count).map((t) => ({
    id: t.id,
    ref: t.ref,
    Property: t.landlord,
    Tenant: t.tenant,
    Amount: t.amount,
    Status: t.status,
    Method: t.method,
    Date: t.createdAt,
  }));
}
