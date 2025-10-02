"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AppShell from "@/components/AppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadRewards, saveRewards, type RewardsState } from "@/lib/demo";

export default function TenantRewardsPage() {
  const lang: Lang = "en"; // TODO: wire from global store
  const t = strings[lang];

  const [rewards, setRewards] = useState<RewardsState | null>(null);
  const [displayBalance, setDisplayBalance] = useState(0);
  const [voucher, setVoucher] = useState("");
  const [error, setError] = useState<string | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const r = loadRewards();
    setRewards(r);
    // simple count-up
    let current = 0;
    const target = r.balance;
    const step = Math.max(1, Math.round(target / 30));
    function tick() {
      current = Math.min(target, current + step);
      setDisplayBalance(current);
      if (current < target) animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const progressToGold = useMemo(() => {
    const goal = 1000;
    const now = rewards?.balance ?? 0;
    const pct = Math.max(0, Math.min(100, Math.round((now / goal) * 100)));
    return { now, goal, pct, remaining: Math.max(0, goal - now) };
  }, [rewards]);

  function handleRedeem(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const code = voucher.trim().toUpperCase();

    // Simple demo rule: RB-<points>, e.g., RB-250
    const m = /^RB-(\d{2,5})$/.exec(code);
    if (!m) {
      setError("Invalid voucher format. Try something like RB-250");
      return;
    }
    const pts = parseInt(m[1], 10);
    if (!(pts > 0)) {
      setError("Voucher must be a positive value.");
      return;
    }

    const prev = rewards ?? { balance: 0, activity: [] };
    const updated: RewardsState = {
      balance: Math.max(0, prev.balance - pts),
      activity: [
        {
          id: `redeem_${Date.now()}`,
          type: "REDEEM",
          points: pts,
          createdAt: new Date().toISOString(),
        },
        ...prev.activity,
      ],
    };

    saveRewards(updated);
    setRewards(updated);
    setVoucher("");
    setDisplayBalance(updated.balance);
  }

  return (
    <AppShell role="tenant" title={t.tenant.rewards.title}>
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">{t.tenant.rewards.title}</h1>
        <p className="text-xs opacity-70">{t.tenant.rewards.activity}</p>
      </div>

      {/* Balance + progress */}
      <section className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 space-y-3">
        <div className="text-xs opacity-70">{t.tenant.rewards.balance}</div>
        <div className="text-3xl font-semibold tracking-wide">{displayBalance}</div>
        <div className="text-xs opacity-70">
          {t.tenant.rewards.progress.toGold.replace("{{pts}}", String(progressToGold.remaining))}
        </div>
        <div className="h-2 rounded bg-black/10 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full bg-emerald-600"
            style={{ width: `${progressToGold.pct}%` }}
          />
        </div>
      </section>

      {/* Redeem */}
      <section className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 space-y-3">
        <div className="text-sm font-medium">{t.tenant.rewards.redeem}</div>
        <form onSubmit={handleRedeem} className="flex items-center gap-2">
          <input
            className="flex-1 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="RB-250"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
            <button
              type="submit"
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            >
              {t.tenant.pay.print /* just a short label reuse, or swap to 'Redeem' literal if preferred */}
            </button>
        </form>
        {error ? <div className="text-xs text-red-600">{error}</div> : null}
      </section>

      {/* Activity */}
      <section className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
        {!rewards || rewards.activity.length === 0 ? (
          <div className="text-xs opacity-70">{t.tenant.rewards.empty}</div>
        ) : (
          <ul className="space-y-2">
            {rewards.activity.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 px-3 py-2"
              >
                <div className="text-xs">
                  <div className="font-medium">
                    {a.type === "EARN" ? t.tenant.rewards.earned : t.tenant.rewards.redeemed}
                  </div>
                  <div className="opacity-70">{new Date(a.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm font-semibold">
                  {a.type === "EARN" ? "+" : "-"}
                  {a.points}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppShell>
  );
}
