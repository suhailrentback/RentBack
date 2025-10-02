"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadRewards, type RewardsState } from "@/lib/demo";

export default function TenantRewardsPage() {
  const { t, locale } = useLang();
  const [rewards, setRewards] = useState<RewardsState | null>(null);

  useEffect(() => {
    setRewards(loadRewards());
  }, []);

  const recent = rewards?.activity ?? [];
  const progressText = useMemo(() => {
    const bal = rewards?.balance ?? 0;
    const toGold = Math.max(0, 1000 - bal); // demo threshold
    return t.tenant.rewards.progress.toGold.replace("{{pts}}", toGold.toLocaleString(locale));
  }, [rewards, t, locale]);

  return (
    <AppShell role="tenant" title={t.tenant.rewards.title}>
      <div className="p-4 space-y-5">
        {/* Balance Card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
          <div className="text-sm opacity-70">{t.tenant.rewards.balance}</div>
          <div className="mt-2 text-2xl font-semibold">{(rewards?.balance ?? 0).toLocaleString(locale)} pts</div>
          <div className="mt-1 text-xs opacity-70">{progressText}</div>
        </section>

        {/* Activity */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm font-medium">{t.tenant.rewards.activity}</div>
          <div className="mt-3 space-y-3">
            {recent.length === 0 ? (
              <div className="text-sm opacity-70">{t.tenant.rewards.empty}</div>
            ) : (
              recent.slice(0, 10).map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <div className="text-sm">
                    {a.type === "EARN" ? t.tenant.rewards.earned : t.tenant.rewards.redeemed}
                  </div>
                  <div className="text-xs opacity-70">
                    {a.points.toLocaleString(locale)} pts • {new Date(a.createdAt).toLocaleString(locale)}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
