// app/tenant/rewards/page.tsx
"use client";

import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadRewards, type RewardActivity } from "@/lib/demo";
import { CardSkeleton } from "@/components/Skeletons";

export default function TenantRewardsPage() {
  const lang: Lang = "en";
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [activity, setActivity] = useState<RewardActivity[]>([]);

  useEffect(() => {
    const r = loadRewards();
    setBalance(r.balance);
    setActivity(r.activity);
    setLoading(false);
  }, []);

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">{t.tenant.rewards.title}</h1>

        {loading ? (
          <CardSkeleton />
        ) : (
          <section className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
            <div className="text-sm opacity-70">{t.tenant.rewards.balance}</div>
            <div className="mt-2 text-2xl font-semibold tracking-wide">
              {balance} pts
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
          <div className="text-sm font-medium">{t.tenant.rewards.activity}</div>
          {!activity.length ? (
            <div className="mt-2 text-xs opacity-70">{t.tenant.rewards.empty}</div>
          ) : (
            <ul className="mt-2 space-y-2">
              {activity.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between rounded-lg border border-black/10 p-3 text-sm dark:border-white/10"
                >
                  <div>{a.type === "EARNED" ? t.tenant.rewards.earned : t.tenant.rewards.redeemed}</div>
                  <div className="text-right">
                    <div className="font-medium">+{a.points} pts</div>
                    <div className="text-xs opacity-70">
                      {new Date(a.createdAt).toLocaleString()}
                    </div>
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
