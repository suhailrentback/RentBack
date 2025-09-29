// lib/demo.ts
// Demo-only data + helpers (runs fully client-side with localStorage).
// Provides: isDemo, formatPKR, payments, rewards, landlord ledger, admin CSVs, etc.

//
// --------- Types
//
export type PaymentMethod = "Raast" | "Card" | "Wallet";
export type PaymentStatus = "CREATED" | "SENT";

export type Payment = {
  id: string;
  landlord: string;
  amount: number; // PKR
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string; // ISO
};

export type Redemption = {
  id: string;
  brand: string;
  amount: number; // voucher PKR
  points: number; // points deducted (1pt == 1PKR in demo)
  createdAt: string; // ISO
  status: "POSTED";
};

//
// --------- Env & LS keys
//
const canUseLS = typeof window !== "undefined";
export const isDemo = () => {
  // default true unless an env explicitly disables
  if (typeof process !== "undefined") {
    const v = (process.env.NEXT_PUBLIC_DEMO || "true").toLowerCase();
    return v !== "false" && v !== "0";
  }
  return true;
};

const LS_POINTS = "rb-demo-points";
const LS_REDEMPTIONS = "rb-demo-redemptions";
const LS_PAYMENTS = "rb-demo-payments";
const LS_REWARDED_IDS = "rb-demo-rewarded-ids";

function readJSON<T>(key: string, fallback: T): T {
  if (!canUseLS) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeJSON<T>(key: string, val: T) {
  if (!canUseLS) return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

//
// --------- Seed
//
export function ensureSeed() {
  if (!canUseLS || !isDemo()) return;

  if (localStorage.getItem(LS_POINTS) == null) writeJSON(LS_POINTS, 12000);
  if (localStorage.getItem(LS_REDEMPTIONS) == null)
    writeJSON<Redemption[]>(LS_REDEMPTIONS, []);
  if (localStorage.getItem(LS_REWARDED_IDS) == null)
    writeJSON<string[]>(LS_REWARDED_IDS, []);

  if (localStorage.getItem(LS_PAYMENTS) == null) {
    const now = Date.now();
    const seeded: Payment[] = [
      {
        id: "rb-pay-1001",
        landlord: "Gulshan Residency",
        amount: 65000,
        method: "Raast",
        status: "SENT",
        createdAt: new Date(now - 14 * 86400000).toISOString(),
      },
      {
        id: "rb-pay-1002",
        landlord: "Al-Habib Apartments",
        amount: 65000,
        method: "Card",
        status: "SENT",
        createdAt: new Date(now - 44 * 86400000).toISOString(),
      },
      {
        id: "rb-pay-1003",
        landlord: "Crescent Towers",
        amount: 70000,
        method: "Wallet",
        status: "CREATED",
        createdAt: new Date(now - 2 * 86400000).toISOString(),
      },
    ];
    writeJSON(LS_PAYMENTS, seeded);

    // mark first two as rewarded so we don't double-credit on load
    writeJSON(LS_REWARDED_IDS, ["rb-pay-1001", "rb-pay-1002"]);
  }
}

//
// --------- Utilities
//
export function formatPKR(n: number): string {
  // Keep simple and predictable across locales
  return `PKR ${Number(n || 0).toLocaleString("en-PK")}`;
}

function iso(d: Date | number | string) {
  return new Date(d).toISOString();
}

//
// --------- Points & Redemptions (Rewards)
//
export function getPointsBalance(): number {
  ensureSeed();
  return readJSON<number>(LS_POINTS, 0);
}
export function setPointsBalance(val: number) {
  writeJSON<number>(LS_POINTS, Math.max(0, Math.floor(val)));
}

export function listRedemptions(): Redemption[] {
  ensureSeed();
  return readJSON<Redemption[]>(LS_REDEMPTIONS, []);
}
export function getRedemptionById(id: string): Redemption | null {
  return listRedemptions().find((r) => r.id === id) || null;
}

export function pushRedemption(rec: Redemption) {
  const arr = listRedemptions();
  arr.unshift(rec);
  writeJSON(LS_REDEMPTIONS, arr);
}

export function redeemVoucher(brand: string, amount: number): Redemption | null {
  ensureSeed();
  const pts = getPointsBalance();
  const needed = Math.floor(amount);
  if (pts < needed) return null;

  const rec: Redemption = {
    id: `rb-red-${Date.now()}`,
    brand,
    amount: needed,
    points: needed,
    createdAt: iso(Date.now()),
    status: "POSTED",
  };
  setPointsBalance(pts - needed);
  pushRedemption(rec);

  // breadcrumb
  console.warn("[demo] redeem", { brand, amount: needed, newBalance: getPointsBalance() });
  return rec;
}

//
// --------- Payments (Tenant) + accrual 1%
//
export function listPayments(): Payment[] {
  ensureSeed();
  return readJSON<Payment[]>(LS_PAYMENTS, []);
}
export function getPaymentById(id: string): Payment | null {
  return listPayments().find((p) => p.id === id) || null;
}
export function upsertPayment(p: Payment) {
  const arr = listPayments();
  const i = arr.findIndex((x) => x.id === p.id);
  if (i >= 0) arr[i] = p;
  else arr.unshift(p);
  writeJSON(LS_PAYMENTS, arr);
}

export function accrueForPayment(paymentId: string, amountPKR: number) {
  ensureSeed();
  const rewardedIds = readJSON<string[]>(LS_REWARDED_IDS, []);
  if (rewardedIds.includes(paymentId)) return; // already credited

  const add = Math.max(1, Math.floor(amountPKR * 0.01)); // 1%
  setPointsBalance(getPointsBalance() + add);

  rewardedIds.push(paymentId);
  writeJSON(LS_REWARDED_IDS, rewardedIds);

  console.warn("[demo] rewards accrual", {
    paymentId,
    amountPKR,
    add,
    newBalance: getPointsBalance(),
  });
}

//
// --------- Tenant context (used by receipt page)
//
export function getTenantContext() {
  ensureSeed();
  return {
    points: getPointsBalance(),
    payments: listPayments(),
    redemptions: listRedemptions(),
  };
}

//
// --------- Landlord ledger (derive from SENT payments)
//
export function getLandlordLedger() {
  // In demo, treat all SENT payments as ledger entries
  const sent = listPayments().filter((p) => p.status === "SENT");
  // pretend each payment belongs to the current landlord view if landlord matches
  // (your /landlord/ledger page likely just lists all for demo)
  return sent.map((p) => ({
    id: p.id,
    date: p.createdAt,
    tenant: "Demo Tenant",
    property: p.landlord,
    amount: p.amount,
    method: p.method,
    status: "POSTED" as const,
  }));
}

export function csvForLedger() {
  const rows = [
    ["id", "dateISO", "tenant", "property", "amountPKR", "method", "status"],
    ...getLandlordLedger().map((r) => [
      r.id,
      new Date(r.date).toISOString(),
      r.tenant,
      r.property,
      String(r.amount), // machine-friendly
      r.method,
      r.status,
    ]),
  ];
  return rows.map((r) => r.map(escapeCSV).join(",")).join("\n");
}

//
// --------- Admin transactions (aggregate all payments)
//
export function getAdminTransactions() {
  return listPayments().map((p) => ({
    id: p.id,
    createdAt: p.createdAt,
    party: p.landlord,
    amount: p.amount,
    method: p.method,
    status: p.status === "SENT" ? "POSTED" : "PENDING",
  }));
}

export function csvForAdmin() {
  const rows = [
    ["id", "createdAtISO", "counterparty", "amountPKR", "method", "status"],
    ...getAdminTransactions().map((r) => [
      r.id,
      new Date(r.createdAt).toISOString(),
      r.party,
      String(r.amount),
      r.method,
      r.status,
    ]),
  ];
  return rows.map((r) => r.map(escapeCSV).join(",")).join("\n");
}

//
// --------- Helpers (CSV escaping)
//
function escapeCSV(s: string) {
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
