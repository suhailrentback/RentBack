// app/tenant/rewards/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { CardSkel } from "@/components/Skeletons";
import { strings, type Lang } from "@/lib/i18n";
import { loadRewards, saveRewards, type RewardsState } from "@/lib/demo";

export default function TenantRewardsPage() {
  const lang: Lang = typeof window !== "undefined" && localStorage.getItem("demo-lang") === "ur" ? "ur" : "en";
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<RewardsState>({ balance: 0, activity: [] });
  const [displayBalance, setDisplayBalance] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    setLoading(true);
    const r = loadRewards();
    setRewards(r);
    setLoading(false);

    // animated count-up
    const duration = 600;
    const start = performance.now();
    const from = 0;
    const to = r.balance;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplayBalance(Math.round(from + (to - from) * p));
      if (p < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const redeemVoucher = () => {
    const points = 200; // fixed demo redemption
    if (rewards.balance < points) return;

    const entry = {
      id: Math.random().toString(36).slice(2, 9),
      type: "REDEEM" as const,
      points: -points,
      createdAt: new Date().toISOString(),
    };
    const updated: RewardsState = {
      balance: rewards.balance - points,
      activity: [entry, ...rewards.activity],
    };
    saveRewards(updated);
    setRewards(updated);
    setDisplayBalance(updated.balance);
    alert("Voucher redeemed! (demo)");
  };

  const pctToGold = Math.max(0, Math.min(100, Math.round((rewards.balance / 2000) * 100)));

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.tenant.rewards.title}</h1>
          <button
            onClick={redeemVoucher}
            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            disabled={rewards.balance < 200}
            title={rewards.balance < 200 ? "Need 200+ points to redeem (demo)" : ""}
          >
            {t.tenant.rewards.redeem}
          </button>
        </div>

        {loading ? (
          <CardSkel />
        ) : (
          <>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
              <div className="text-sm opacity-80">{t.tenant.rewards.balance}</div>
              <div className="mt-1 text-3xl font-semibold tracking-wide">{displayBalance} pts</div>

              <div className="mt-4 text-xs opacity-80">
                {t.tenant.rewards.progress.toGold.replace("{{pts}}", String(Math.max(0, 2000 - rewards.balance)))}
              </div>
              <div className="mt-2 h-2 rounded bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-emerald-600"
                  style={{ width: `${pctToGold}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
              <div className="text-sm font-medium">{t.tenant.rewards.activity}</div>
              <ul className="mt-3 space-y-2 text-sm">
                {rewards.activity.length === 0 ? (
                  <li className="opacity-70">{t.tenant.rewards.empty}</li>
                ) : (
                  rewards.activity.map((a) => (
                    <li key={a.id} className="flex items-center justify-between">
                      <span>{a.type === "EARN" ? t.tenant.rewards.earned : t.tenant.rewards.redeemed}</span>
                      <span className={a.points > 0 ? "text-emerald-700 dark:text-emerald-300" : "text-red-600"}>
                        {a.points > 0 ? `+${a.points}` : a.points} pts
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </MobileAppShell>
  );
}
