// lib/rewardsDemo.ts
import { listPayments } from "@/lib/demoData";

export type RewardEntry = {
  id: string;
  createdAt: string;
  type: "EARN" | "REDEEM";
  points: number;
  memo?: string;
};

let seq = 1;
const redemptions: RewardEntry[] = [];

export function computeEarnedPoints(): number {
  // Simple demo: 1 point per PKR 100 on POSTED payments
  const posted = listPayments().filter(p => p.status === "POSTED");
  const earned = Math.floor(
    posted.reduce((sum, p) => sum + p.amountPKR, 0) / 100
  );
  return earned;
}

export function listRewards(): { balance: number; entries: RewardEntry[] } {
  const earned = computeEarnedPoints();
  const spent = redemptions.reduce((s, r) => s + (r.type === "REDEEM" ? r.points : 0), 0);
  const balance = Math.max(0, earned - spent);
  const earns: RewardEntry[] = [
    { id: "earn_aggregate", createdAt: new Date().toISOString(), type: "EARN", points: earned, memo: "Earned from rent payments" }
  ];
  return { balance, entries: [...earns, ...redemptions].sort((a,b)=> b.createdAt.localeCompare(a.createdAt)) };
}

export function redeem(points: number, memo?: string): { ok: boolean; balance: number } {
  const { balance } = listRewards();
  if (points <= 0 || points > balance) return { ok: false, balance };
  const id = `redeem_${String(seq++).padStart(3,"0")}`;
  redemptions.unshift({
    id,
    createdAt: new Date().toISOString(),
    type: "REDEEM",
    points,
    memo,
  });
  return { ok: true, balance: listRewards().balance };
}
