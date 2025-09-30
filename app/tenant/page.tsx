"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";

// ---------- Local demo helpers ----------
const BAL_KEY = "rb-rewards-balance";
const HIST_KEY = "rb-rewards-history";
const PAY_KEY = "rb-tenant-payments";

type Method = "RAAST" | "BANK" | "JAZZCASH";
type Status = "PENDING" | "SENT";

type DemoPayment = {
  id: string;
  createdAt: string; // ISO
  property: string;
  amount: number; // PKR
  method: Method;
  status: Status;
};

type Redemption = {
  id: string;
  createdAt: string;
  brand: string;
  amountPts: number; // +/- points
  kind: "REDEEM" | "EARN";
  meta?: { voucherCode?: string; denomination?: number; sourcePaymentId?: string };
};

function lsGetNumber(key: string, fallback = 0) {
  try {
    const raw = localStorage.getItem(key);
    const n = raw != null ? Number(raw) : NaN;
    return Number.isFinite(n) ? n : fallback;
  } catch {
    return fallback;
  }
}
function lsSetNumber(key: string, val: number) {
  try {
    localStorage.setItem(key, String(val));
  } catch {}
}
function lsGetJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function lsSetJSON(key: string, val: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}
function formatPKR(amount: number) {
  try {
    return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(
      amount
    );
  } catch {
    return `PKR ${amount.toLocaleString()}`;
  }
}

function ensureSeed() {
  if (!localStorage.getItem(BAL_KEY)) lsSetNumber(BAL_KEY, 1350);
  if (!localStorage.getItem(HIST_KEY)) {
    const seed: Redemption[] = [
      { id: crypto.randomUUID(), createdAt: new Date().toISOString(), brand: "Earnings", amountPts: +650, kind: "EARN", meta: { sourcePaymentId: "PAY-DEMO-3912" } },
    ];
    lsSetJSON(HIST_KEY, seed);
  }
  if (!localStorage.getItem(PAY_KEY)) {
    const seed: DemoPayment[] = [
      {
        id: "PAY-DEMO-3912",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        property: "Gulberg Heights, Lahore",
        amount: 65000,
        method: "RAAST",
        status: "SENT",
      },
    ];
    lsSetJSON(PAY_KEY, seed);
  }
}

export default function TenantHomePage() {
  const [balance, setBalance] = useState<number>(0);
  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ensureSeed();
    setBalance(lsGetNumber(BAL_KEY, 0));
    setPayments(lsGetJSON<DemoPayment[]>(PAY_KEY, []));
    // tiny skeleton delay for nicer load feel
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const lastPayment = useMemo(() => {
    return [...payments].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0];
  }, [payments]);

  // Simple “due” mock: next month’s same amount as last payment (or default)
  const nextDueAmount = lastPayment?.amount ?? 65000;
  const nextDueDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    d.setDate(5); // 5th of next month (demo)
    return d.toDateString();
  }, []);

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        {/* Main card: Next rent due */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-400" />
          <div className="relative p-5 text-white">
            <div className="text-xs/5 opacity-90">Next Rent Due</div>
            <div className="mt-1 text-3xl font-extrabold tracking-tight">{formatPKR(nextDueAmount)}</div>
            <div className="mt-1 text-xs/5 opacity-90">Due by {nextDueDate}</div>
            <Link
              href="/tenant/pay"
              className="inline-block mt-4 px-4 py-2 rounded-xl bg-white text-emerald-700 font-semibold hover:bg-white/90"
            >
              Pay now
            </Link>
          </div>
        </div>

        {/* Secondary cards */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/tenant/rewards"
            className="rounded-2xl p-4 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-sm transition"
          >
            <div className="text-xs opacity-70">Rewards</div>
            <div className="mt-1 text-xl font-semibold">{loading ? "—" : `${balance.toLocaleString()} pts`}</div>
            <div className="text-[11px] opacity-60 mt-1">Tap to redeem</div>
          </Link>

          <Link
            href={lastPayment ? `/tenant/receipt/${lastPayment.id}` : "/tenant/pay"}
            className="rounded-2xl p-4 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-sm transition"
          >
            <div className="text-xs opacity-70">Last Payment</div>
            {loading ? (
              <div className="mt-1 h-5 rounded bg-black/5 dark:bg-white/10 animate-pulse" />
            ) : lastPayment ? (
              <>
                <div className="mt-1 text-sm font-medium">{formatPKR(lastPayment.amount)}</div>
                <div className="text-[11px] opacity-60">{new Date(lastPayment.createdAt).toLocaleString()}</div>
              </>
            ) : (
              <div className="mt-1 text-sm opacity-70">No payments yet — make one</div>
            )}
          </Link>
        </div>

        {/* Shortcuts grid */}
        <div>
          <h2 className="text-sm font-semibold opacity-90">Shortcuts</h2>
          <div className="mt-3 grid grid-cols-4 gap-3">
            <Shortcut href="/tenant/pay" icon="💸" label="Pay Rent" />
            <Shortcut href="/tenant/rewards" icon="🎁" label="Rewards" />
            <Shortcut href={lastPayment ? `/tenant/receipt/${lastPayment.id}` : "/tenant/pay"} icon="🧾" label="Receipts" />
            <Shortcut href="mailto:help@rentback.app" icon="🛟" label="Support" />
          </div>
        </div>
      </div>
    </MobileAppShell>
  );
}

function Shortcut({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl p-3 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 flex flex-col items-center justify-center hover:shadow-sm transition"
    >
      <span className="text-xl">{icon}</span>
      <span className="mt-2 text-[11px]">{label}</span>
    </Link>
  );
}
