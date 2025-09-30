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
  if (!localStorage.getItem(BAL_KEY)) lsSetNumber(BAL_KEY, 1350);
  if (!localStorage.getItem(HIST_KEY)) {
    const seedHist: Redemption[] = [
      { id: crypto.randomUUID(), createdAt: new Date().toISOString(), brand: "Earnings", amountPts: +650, kind: "EARN", meta: { sourcePaymentId: "PAY-DEMO-3912" } },
    ];
    lsSetJSON(HIST_KEY, seedHist);
  }
}

function getBalance(): number {
  const n = lsGetNumber(BAL_KEY, 0);
  return Math.max(0, Math.floor(n));
}
function setBalance(n: number) {
  lsSetNumber(BAL_KEY, Math.max(0, Math.floor(n)));
}
function pushEarnHistory(points: number, paymentId: string) {
  const hist = lsGetJSON<Redemption[]>(HIST_KEY, []);
  hist.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    brand: "Earnings",
    amountPts: points,
    kind: "EARN",
    meta: { sourcePaymentId: paymentId },
  });
  lsSetJSON(HIST_KEY, hist);
}

function coerceStatus(s: any): Status {
  return s === "SENT" ? "SENT" : "PENDING";
}

export default function TenantPayPage() {
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState("Gulberg Heights, Lahore");
  const [amount, setAmount] = useState<number>(65000);
  const [method, setMethod] = useState<Method>("RAAST");
  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    ensureSeed();
    // hydrate recent payments
    const raw = lsGetJSON<DemoPayment[]>(PAY_KEY, []);
    // coerce status to union to satisfy TS
    const coerced = raw.map((p) => ({ ...p, status: coerceStatus(p.status) }));
    setPayments(coerced);
    // small skeleton delay
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const lastPayment = useMemo(() => {
    return [...payments].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0];
  }, [payments]);

  function savePayments(next: DemoPayment[]) {
    lsSetJSON(PAY_KEY, next);
  }

  function createPayment() {
    if (!amount || amount <= 0) {
      alert("Enter a valid amount in PKR.");
      return;
    }
    setBusy(true);
    const id = "PAY-" + Math.floor(Math.random() * 1e8).toString().padStart(8, "0");
    const p: DemoPayment = {
      id,
      createdAt: new Date().toISOString(),
      property: property || "Property",
      amount: Math.floor(amount),
      method,
      status: "PENDING",
    };
    const next = [p, ...payments];
    setPayments(next);
    savePayments(next);
    setBusy(false);
    // small toast-like hint
    console.warn("[demo] Created payment", p);
  }

  function markSent(id: string) {
    const next = payments.map((p) => (p.id === id ? { ...p, status: "SENT" } as DemoPayment : p));
    setPayments(next);
    savePayments(next);

    // +1% rewards for SENT
    const just = next.find((p) => p.id === id);
    if (just) {
      const earnPts = Math.max(1, Math.round(just.amount * 0.01));
      const current = getBalance();
      setBalance(current + earnPts);
      pushEarnHistory(earnPts, just.id);
      console.warn("[demo] Rewards +1%", { amount: just.amount, earnPts, paymentId: just.id });
    }
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold">Pay Rent</h1>
          <p className="text-sm opacity-70">Demo — no real charges.</p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl p-4 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
          <div className="grid gap-3">
            <label className="text-sm">
              <div className="opacity-70 text-xs mb-1">Property</div>
              <input
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-transparent border border-black/10 dark:border-white/10 focus:outline-none"
                placeholder="Property name"
              />
            </label>

            <label className="text-sm">
              <div className="opacity-70 text-xs mb-1">Amount (PKR)</div>
              <input
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
                className="w-full px-3 py-2 rounded-lg bg-transparent border border-black/10 dark:border-white/10 focus:outline-none"
                placeholder="65000"
              />
              {amount > 0 && (
                <div className="text-[11px] opacity-70 mt-1">≈ {formatPKR(amount)}</div>
              )}
            </label>

            <label className="text-sm">
              <div className="opacity-70 text-xs mb-1">Method</div>
              <div className="grid grid-cols-3 gap-2">
                {(["RAAST", "BANK", "JAZZCASH"] as Method[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      method === m
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </label>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (!lastPayment) return;
                  setProperty(lastPayment.property);
                  setAmount(lastPayment.amount);
                  setMethod(lastPayment.method);
                }}
                className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/10"
              >
                Autofill last payment
              </button>

              <button
                onClick={createPayment}
                disabled={busy}
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold disabled:opacity-60"
              >
                {busy ? "Creating..." : "Create Payment (Demo)"}
              </button>
            </div>
          </div>
        </div>

        {/* Recent payments */}
        <section className="pb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold opacity-90">Recent</h2>
            <Link
              href="/tenant"
              className="text-xs px-2 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Home
            </Link>
          </div>

          {loading ? (
            <div className="mt-3 space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 rounded-xl bg-black/5 dark:bg-white/10 animate-pulse" />
              ))}
            </div>
          ) : payments.length === 0 ? (
            <div className="mt-3 rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white dark:bg-white/5 text-center">
              <div className="text-5xl mb-2">🧾</div>
              <div className="font-semibold">No payments yet</div>
              <div className="text-sm opacity-70">Create your first demo payment to see it here.</div>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl p-3 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{p.property}</div>
                      <div className="text-xs opacity-70">{new Date(p.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatPKR(p.amount)}</div>
                      <div className="text-xs opacity-70">{p.method}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        p.status === "SENT"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                      }`}
                    >
                      {p.status === "SENT" ? "Sent" : "Pending"}
                    </span>

                    <div className="flex gap-2">
                      {p.status === "PENDING" && (
                        <button
                          onClick={() => markSent(p.id)}
                          className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
                        >
                          Mark as Sent
                        </button>
                      )}
                      <Link
                        href={`/tenant/receipt/${p.id}`}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                      >
                        View Receipt
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </MobileAppShell>
  );
}
