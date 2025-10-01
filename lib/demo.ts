// lib/demo.ts
// Demo-only localStorage helpers + types for RentBack.

export type Method = "RAAST" | "BANK" | "JAZZCASH";
export type Status = "PENDING" | "SENT";

export type DemoPayment = {
  id: string;
  createdAt: string;
  property: string;
  amount: number;
  method: Method;
  status: Status;
};

// Rewards
export type RewardActivity = {
  id: string;
  type: "EARN" | "REDEEM";
  points: number;
  createdAt: string;
  vendor?: string; // only for redeem
  code?: string;   // only for redeem
};

export type RewardsState = {
  balance: number;
  activity: RewardActivity[];
};

// ---------- Helpers ----------

// Format currency (PKR)
export function formatPKR(amount: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ---------- Payments ----------

const PAY_KEY = "demo-payments";

export function loadPayments(): DemoPayment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PAY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DemoPayment[];
  } catch {
    return [];
  }
}

export function savePayments(list: DemoPayment[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PAY_KEY, JSON.stringify(list));
}

// ---------- Rewards ----------

const REWARDS_KEY = "demo-rewards";

export function loadRewards(): RewardsState {
  if (typeof window === "undefined") return { balance: 0, activity: [] };
  try {
    const raw = localStorage.getItem(REWARDS_KEY);
    if (!raw) return { balance: 0, activity: [] };
    return JSON.parse(raw) as RewardsState;
  } catch {
    return { balance: 0, activity: [] };
  }
}

export function saveRewards(state: RewardsState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REWARDS_KEY, JSON.stringify(state));
}
