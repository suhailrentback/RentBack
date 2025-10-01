// app/tenant/rewards/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { ListSkeleton } from "@/components/Skeletons";
import { strings, type Lang } from "@/lib/i18n";
import {
  loadRewards,
  saveRewards,
  type RewardsState,
  type RewardActivity,
} from "@/lib/demo";

function useCountUp(target: number, duration = 600) {
  const [val, setVal] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    start.current = null;
    const step = (ts: number) => {
      if (start.current == null) start.current = ts;
      const p = Math.min(1, (ts - start.current) / duration);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return val;
}

export default function TenantRewardsPage() {
  const [lang] = useState<Lang>("en");
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [activity, setActivity] = useState<RewardActivity[]>([]);

  useEffect(() => {
    const r: RewardsState = loadRewards();
    setBalance(r.balance || 0);
    setActivity(r.activity || []);
    setLoading(false);
  }, []);

  const animated = useCountUp(balance);
  const toNextTier = useMemo(() => Math.max(0, 1000 - balance), [balance]);

  function redeem(vendor: string, cost: number) {
    if (balance < cost) return;
    const code =
      vendor.slice(0, 3).toUpperCase() +
      "-" +
      Math.random().toString(36).slice(2, 8).toUpperCase();
    const now = new Date().toISOString();

    const newBal = balance - cost;
    const entry: RewardActivity = {
      id: crypto.randomUUID(),
      type: "REDEEM",
      points: cost,
      createdAt: now,
      vendor,
      code,
    };
    const next = [entry, ...activity];

    setBalance(newBal);
    setActivity(next);
    const updated: RewardsState = { balance: newBal, activity: next };
    saveRewards(updated);
    alert(`${vendor} ${t.tenant.rewards.voucherCode}: ${code}`);
  }

  const vendors = [
    { name: "Foodpanda", cost: 200 },
    { name: "Daraz", cost: 300 },
    { name: "Careem", cost: 250 },
    { name: "Cinepax", cost: 150 },
  ];

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.tenant.rewards.title}</h1>
          <div className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">
            {t.demo}
          </div>
        </div>

        {/* Balance card */}
        {loading ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5">
            <div className="h-3 w-24 bg-black/10 dark:bg-white/10 rounded mb-3" />
            <div className="h-8 w-40 bg-black/10 dark:bg-white/10 rounded" />
          </div>
        ) : (
          <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-gradient-to-br from-indigo-600 to-fuchsia-500 text-white">
            <div className="text-xs opacity-90">{t.tenant.rewards.balance}</div>
            <div className="mt-2 text-3xl font-semibold tabular-nums">
              {animated.toLocaleString()}
            </div>

            {/* Progress to tier */}
            <div className="mt-4 text-xs opacity-90">
              {t.tenant.rewards.progress.toGold.replace(
                "{{pts}}",
                String(toNextTier)
              )}
            </div>
            <div className="h-2 w-full bg-white/20 rounded-full mt-2">
              <div
                className="h-2 bg-white/80 rounded-full"
                style={{ width: `${Math.min(100, (balance / 1000) * 100)}%` }}
              />
            </div>
          </section>
        )}

        {/* Quick Redeem */}
        <section>
          <div className="text-xs opacity-70 mb-2">{t.tenant.rewards.redeem}</div>
          <div className="grid grid-cols-2 gap-3">
            {vendors.map((v) => (
              <button
                key={v.name}
                onClick={() => redeem(v.name, v.cost)}
                disabled={balance < v.cost}
                className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-left hover:bg-black/5 dark:hover:bg-white/5 transition disabled:opacity-50"
              >
                <div className="font-medium">{v.name}</div>
                <div className="text-xs opacity-70">{v.cost} pts</div>
              </button>
            ))}
          </div>
        </section>

        {/* Recent activity */}
        <section>
          <div className="text-xs opacity-70 mb-2">{t.tenant.rewards.activity}</div>
          {loading ? (
            <ListSkeleton />
          ) : activity.length === 0 ? (
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-xs opacity-70">
              {t.tenant.rewards.empty}
            </div>
          ) : (
            <ul className="space-y-2">
              {activity.map((a) => (
                <li
                  key={a.id}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">
                      {a.type === "EARN"
                        ? t.tenant.rewards.earned
                        : t.tenant.rewards.redeemed}
                    </div>
                    <div className="text-xs opacity-70">
                      {new Date(a.createdAt).toLocaleString(
                        lang === "ur" ? "ur-PK" : "en-PK"
                      )}
                      {a.vendor && ` • ${a.vendor}`}
                      {a.code &&
                        ` • ${t.tenant.rewards.voucherCode}: ${a.code}`}
                      {a.ref && ` • ref: ${a.ref}`}
                    </div>
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      a.type === "EARN" ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {a.type === "EARN" ? "+" : "-"}
                    {a.points}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </MobileAppShell>
  );
}
