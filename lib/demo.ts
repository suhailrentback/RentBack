// lib/demo.ts
// Local demo engine for Pay + Rewards (no backend/DB).
// Uses localStorage safely and prevents double-crediting.

type Redemption = {
  id: string;
  brand: string;
  amount: number;
  points: number;
  createdAt: string;
  status: "POSTED";
};

type Payment = {
  id: string;
  landlord: string;
  amount: number;
  method: "Raast" | "Card" | "Wallet";
  status: "CREATED" | "SENT";
  createdAt: string;
};

const canUseLS = typeof window !== "undefined";
const LS_POINTS = "rb-demo-points";
const LS_REDEMPTIONS = "rb-demo-redemptions";
const LS_PAYMENTS = "rb-demo-payments";
const LS_REWARDED_IDS = "rb-demo-rewarded-ids"; // track credited payments

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

export function ensureSeed() {
  if (!canUseLS) return;
  if (localStorage.getItem(LS_POINTS) == null) writeJSON(LS_POINTS, 12000);
  if (localStorage.getItem(LS_REDEMPTIONS) == null) writeJSON<Redemption[]>(LS_REDEMPTIONS, []);
  if (localStorage.getItem(LS_PAYMENTS) == null) {
    const now = Date.now();
    writeJSON<Payment[]>(LS_PAYMENTS, [
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
    ]);
  }
  if (localStorage.getItem(LS_REWARDED_IDS) == null) writeJSON<string[]>(LS_REWARDED_IDS, []);
}

/** Points */
export function getPointsBalance(): number {
  ensureSeed();
  return readJSON<number>(LS_POINTS, 0);
}
export function setPointsBalance(val: number) {
  writeJSON<number>(LS_POINTS, Math.max(0, Math.floor(val)));
}

/** Redemptions */
export function listRedemptions(): Redemption[] {
  ensureSeed();
  return readJSON<Redemption[]>(LS_REDEMPTIONS, []);
}
export function pushRedemption(rec: Redemption) {
  const arr = listRedemptions();
  arr.unshift(rec);
  writeJSON(LS_REDEMPTIONS, arr);
}
export function redeemVoucher(brand: string, amount: number): Redemption | null {
  ensureSeed();
  const pts = getPointsBalance();
  const needed = amount; // 1 PKR = 1 pt (demo)
  if (pts < needed) return null;
  const rec: Redemption = {
    id: `rb-red-${Date.now()}`,
    brand,
    amount,
    points: needed,
    createdAt: new Date().toISOString(),
    status: "POSTED",
  };
  setPointsBalance(pts - needed);
  pushRedemption(rec);
  return rec;
}
export function getRedemptionById(id: string): Redemption | null {
  return listRedemptions().find((r) => r.id === id) || null;
}

/** Payments */
export function listPayments(): Payment[] {
  ensureSeed();
  return readJSON<Payment[]>(LS_PAYMENTS, []);
}
export function upsertPayment(p: Payment) {
  const arr = listPayments();
  const i = arr.findIndex((x) => x.id === p.id);
  if (i >= 0) arr[i] = p;
  else arr.unshift(p);
  writeJSON(LS_PAYMENTS, arr);
}

/** Rewards accrual: +1% (min 1 pt) when a payment is marked SENT */
export function accrueForPayment(paymentId: string, amountPKR: number) {
  ensureSeed();
  const rewarded = readJSON<string[]>(LS_REWARDED_IDS, []);
  if (rewarded.includes(paymentId)) return; // already credited

  const before = getPointsBalance();
  const add = Math.max(1, Math.floor(amountPKR * 0.01));
  setPointsBalance(before + add);

  rewarded.push(paymentId);
  writeJSON(LS_REWARDED_IDS, rewarded);

  // breadcrumb
  // eslint-disable-next-line no-console
  console.warn("[demo] rewards accrual", { paymentId, amountPKR, add, newBalance: getPointsBalance() });
}
