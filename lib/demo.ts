// Demo data + helpers used by landlord/admin pages

export type PaymentStatus = "initiated" | "sent" | "succeeded" | "refunded";
export type Method = "Bank Transfer" | "Card" | "Wallet";

export type Transaction = {
  id: string;
  ref: string;
  tenant: string;
  landlord: string;
  amount: number;
  method: Method;
  status: PaymentStatus;
  createdAt: number; // epoch ms
};

export type LedgerEntry = {
  id: string;
  ref: string;
  Property: string;
  Tenant: string;
  Amount: number;
  Status: PaymentStatus;
  Method: Method;
  Date: number;
};

const now = Date.now();

function rnd(n: number) {
  return Math.floor(Math.random() * n);
}

function ref(prefix = "RB") {
  return `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function getDemoTransactions(count = 24): Transaction[] {
  const tenants = ["Ali Khan", "Ayesha Iqbal", "Bilal Ahmed", "Zara Saeed"];
  const landlords = [
    "Khan Estates – DHA",
    "City View Residency – Block B",
    "Garden Heights – 5C",
  ];
  const methods: Method[] = ["Bank Transfer", "Card", "Wallet"];
  const statuses: PaymentStatus[] = ["initiated", "sent", "succeeded", "refunded"];

  return Array.from({ length: count }).map((_, i) => {
    const status = statuses[rnd(statuses.length)];
    const method = methods[rnd(methods.length)];
    return {
      id: String(now - i * 60_000),
      ref: ref("RB"),
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

export function toCSV(rows: (string | number)[][]): string {
  return rows.map((r) =>
    r
      .map((cell) => {
        const s = String(cell ?? "");
        return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
      })
      .join(",")
  ).join("\n");
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
