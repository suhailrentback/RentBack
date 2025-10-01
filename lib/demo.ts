// lib/demo.ts
// Browser-safe demo data helpers used across Tenant & Landlord pages.

export type Method = "RAAST" | "BANK" | "JAZZCASH";
export type Status = "PENDING" | "SENT";

export type DemoPayment = {
  id: string;
  createdAt: string; // ISO string
  property: string;
  amount: number;
  method: Method;
  status: Status;
};

const PAYMENTS_KEY = "rb_payments";
const REWARDS_KEY = "rb_rewards";

const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

// PKR formatter
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

// ID helper
function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

// Demo seed (only in browser, only if empty)
function seedIfEmpty(): void {
  if (!isBrowser) return;
  const raw = window.localStorage.getItem(PAYMENTS_KEY);
  if (raw) return;

  const now = new Date();
  const days = (d: number) => {
    const t = new Date(now);
    t.setDate(now.getDate() - d);
    return t.toISOString();
  };

  const seed: DemoPayment[] = [
    {
      id: uid(),
      createdAt: days(25),
      property: "Gulberg Heights Apt 302",
      amount: 65000,
      method: "RAAST",
      status: "SENT",
    },
    {
      id: uid(),
      createdAt: days(5),
      property: "Gulberg Heights Apt 302",
      amount: 65000,
      method: "BANK",
      status: "PENDING",
    },
  ];

  window.localStorage.setItem(PAYMENTS_KEY, JSON.stringify(seed));
  // also seed rewards a little (1% of sent = 650)
  const sentTotal = seed
    .filter(p => p.status === "SENT")
    .reduce((s, p) => s + p.amount, 0);
  const pts = Math.round(sentTotal * 0.01);
  window.localStorage.setItem(REWARDS_KEY, JSON.stringify(pts));
}

// ----- Payments -----
export function loadPayments(): DemoPayment[] {
  if (!isBrowser) return [];
  seedIfEmpty();
  try {
    const raw = window.localStorage.getItem(PAYMENTS_KEY);
    return raw ? (JSON.parse(raw) as DemoPayment[]) : [];
  } catch {
    return [];
  }
}

export function savePayments(next: DemoPayment[]): void {
  if (!isBrowser) return;
  window.localStorage.setItem(PAYMENTS_KEY, JSON.stringify(next));
}

// Convenience: add a new payment
export function addPayment(p: Omit<DemoPayment, "id" | "createdAt" | "status">) {
  const all = loadPayments();
  const item: DemoPayment = {
    id: uid(),
    createdAt: new Date().toISOString(),
    status: "PENDING",
    ...p,
  };
  const next = [item, ...all];
  savePayments(next);
  return item;
}

// Mark sent by id (+1% rewards)
export function markPaymentSent(id: string) {
  const all = loadPayments();
  const next = all.map(p => (p.id === id ? { ...p, status: "SENT" } : p));
  savePayments(next);

  const just = next.find(p => p.id === id);
  if (just && just.status === "SENT") {
    const inc = Math.round(just.amount * 0.01);
    const cur = loadRewards();
    saveRewards(cur + inc);
  }

  return next;
}

// ----- Rewards -----
export function loadRewards(): number {
  if (!isBrowser) return 0;
  try {
    const raw = window.localStorage.getItem(REWARDS_KEY);
    return raw ? (JSON.parse(raw) as number) : 0;
  } catch {
    return 0;
  }
}

export function saveRewards(n: number): void {
  if (!isBrowser) return;
  window.localStorage.setItem(REWARDS_KEY, JSON.stringify(Math.max(0, n)));
}
