// lib/demo.ts
// Demo data helpers (payments, rewards) with strict TypeScript types.
// Safe to import in client components; these functions only touch
// localStorage when running in the browser.

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

export type RewardActivityType = "EARN" | "REDEEM";

export type RewardActivity = {
  id: string;
  type: RewardActivityType;
  points: number;
  createdAt: string; // ISO
  note?: string;
};

export type RewardsState = {
  balance: number;
  activity: RewardActivity[];
};

const STORAGE_PAYMENTS = "rb_demo_payments";
const STORAGE_REWARDS = "rb_demo_rewards";

// ---------- Utilities ----------
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

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function uid(prefix = "rb"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}_${Date.now()
    .toString(36)
    .slice(-4)}`;
}

// ---------- Seed Demo Data Once ----------
function seedDemo() {
  if (!isBrowser()) return;

  // Seed payments (if empty)
  const rawP = localStorage.getItem(STORAGE_PAYMENTS);
  if (!rawP) {
    const now = Date.now();
    const seed: DemoPayment[] = [
      {
        id: uid("pay"),
        createdAt: new Date(now - 1000 * 60 * 60 * 24 * 14).toISOString(),
        property: "Clifton Block 5 – Apt 702",
        amount: 65000,
        method: "BANK",
        status: "SENT",
      },
      {
        id: uid("pay"),
        createdAt: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
        property: "DHA Phase 6 – House 21B",
        amount: 65000,
        method: "RAAST",
        status: "PENDING",
      },
    ];
    localStorage.setItem(STORAGE_PAYMENTS, JSON.stringify(seed));
  }

  // Seed rewards (if empty)
  const rawR = localStorage.getItem(STORAGE_REWARDS);
  if (!rawR) {
    const seed: RewardsState = {
      balance: 650, // e.g., +1% of a prior 65,000 payment
      activity: [
        {
          id: uid("rew"),
          type: "EARN",
          points: 650,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
          note: "1% on rent payment",
        },
      ],
    };
    localStorage.setItem(STORAGE_REWARDS, JSON.stringify(seed));
  }
}

// Ensure seed runs (no-ops on server)
seedDemo();

// ---------- Payments ----------
export function loadPayments(): DemoPayment[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_PAYMENTS);
    if (!raw) return [];
    const arr = JSON.parse(raw) as DemoPayment[];
    // Defensive cast to the proper union
    return arr.map((p) => ({
      ...p,
      status: (p.status === "SENT" ? "SENT" : "PENDING") as Status,
      method:
        p.method === "BANK"
          ? "BANK"
          : p.method === "JAZZCASH"
          ? "JAZZCASH"
          : ("RAAST" as Method),
    }));
  } catch {
    return [];
  }
}

export function savePayments(next: DemoPayment[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_PAYMENTS, JSON.stringify(next));
}

export function createPayment(input: {
  property: string;
  amount: number;
  method: Method;
}): DemoPayment {
  const all = loadPayments();
  const payment: DemoPayment = {
    id: uid("pay"),
    createdAt: new Date().toISOString(),
    property: input.property,
    amount: input.amount,
    method: input.method,
    status: "PENDING",
  };
  const next: DemoPayment[] = [payment, ...all];
  savePayments(next);
  return payment;
}

export function markPaymentSent(id: string): DemoPayment | undefined {
  const all = loadPayments();
  const next: DemoPayment[] = all.map((p) =>
    p.id === id ? { ...p, status: "SENT" as Status } : p
  );
  savePayments(next);

  // Rewards +1% when a payment flips to SENT
  const just = next.find((p) => p.id === id);
  if (just && just.status === "SENT") {
    addRewardEarn(Math.round(just.amount * 0.01), "1% on rent payment");
  }
  return just;
}

// ---------- Rewards ----------
export function loadRewards(): RewardsState {
  if (!isBrowser()) return { balance: 0, activity: [] };
  try {
    const raw = localStorage.getItem(STORAGE_REWARDS);
    if (!raw) return { balance: 0, activity: [] };
    const state = JSON.parse(raw) as RewardsState;
    return {
      balance: Number(state.balance) || 0,
      activity: Array.isArray(state.activity) ? state.activity : [],
    };
  } catch {
    return { balance: 0, activity: [] };
  }
}

export function saveRewards(state: RewardsState): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_REWARDS, JSON.stringify(state));
}

export function addRewardEarn(points: number, note?: string): void {
  const curr = loadRewards();
  const activity: RewardActivity = {
    id: uid("rew"),
    type: "EARN",
    points: Math.max(0, Math.round(points)),
    createdAt: new Date().toISOString(),
    note,
  };
  const next: RewardsState = {
    balance: curr.balance + activity.points,
    activity: [activity, ...curr.activity],
  };
  saveRewards(next);
}

export function redeemReward(points: number, note?: string): void {
  const curr = loadRewards();
  const use = Math.max(0, Math.min(points, curr.balance));
  const activity: RewardActivity = {
    id: uid("rew"),
    type: "REDEEM",
    points: use,
    createdAt: new Date().toISOString(),
    note,
  };
  const next: RewardsState = {
    balance: curr.balance - use,
    activity: [activity, ...curr.activity],
  };
  saveRewards(next);
}
