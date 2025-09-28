"use client";
import { useEffect, useState } from "react";

type RewardEntry = {
  id: string;
  createdAt: string;
  type: "EARN" | "REDEEM";
  points: number;
  memo?: string;
};

export default function RewardsPage() {
  const [balance, setBalance] = useState(0);
  const [entries, setEntries] = useState<RewardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [redeemPts, setRedeemPts] = useState<number | "">("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function load() {
    setLoading(true);
    fetch("/api/tenant/rewards", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setBalance(d.balance ?? 0);
        setEntries(d.entries ?? []);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function redeem(points: number) {
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/tenant/rewards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points, memo: "Gift card" }),
      });
      if (!r.ok) {
        const msg = await r.text();
        throw new Error(msg || "Redemption failed");
      }
      const data = await r.json();
      setBalance(data.balance ?? 0);
      setRedeemPts("");
      load();
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-3">Rewards</h1>

      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 mb-4">
        <div className="text-sm opacity-70">Points Balance</div>
        <div className="text-3xl font-semibold mt-1">{balance.toLocaleString("en-PK")}</div>

        <div className="mt-4 grid sm:grid-cols-2 gap-2">
          {[100, 500, 1000].map((p) => (
            <button
              key={p}
              disabled={busy || p > balance}
              onClick={() => redeem(p)}
              className={`px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm disabled:opacity-50`}
            >
              Redeem {p.toLocaleString("en-PK")} pts
            </button>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
            placeholder="Custom points"
            inputMode="numeric"
            value={redeemPts}
            onChange={(e) =>
              setRedeemPts(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
          <button
            disabled={busy || !redeemPts || Number(redeemPts) <= 0 || Number(redeemPts) > balance}
            onClick={() => redeem(Number(redeemPts))}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
          >
            {busy ? "Processing…" : "Redeem"}
          </button>
        </div>

        {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
      </div>

      <h2 className="text-sm font-medium opacity-80 mb-2">Recent Activity</h2>
      {loading ? (
        <p className="text-sm opacity-70">Loading…</p>
      ) : entries.length === 0 ? (
        <p className="text-sm opacity-70">No rewards yet.</p>
      ) : (
        <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
          {entries.map((e) => (
            <div
              key={e.id}
              className="px-4 py-3 border-b last:border-0 border-black/10 dark:border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">
                    {e.type === "EARN" ? "Earned" : "Redeemed"}
                  </div>
                  <div className="text-xs opacity-70">
                    {new Date(e.createdAt).toLocaleString()}
                    {e.memo ? ` • ${e.memo}` : ""}
                  </div>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    e.type === "EARN"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {e.type === "EARN" ? "+" : "−"} {e.points.toLocaleString("en-PK")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
