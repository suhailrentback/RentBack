"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { strings } from "@/lib/i18n";
import { useLang } from "@/hooks/useLang";
import { loadRewards, type RewardsState } from "@/lib/demo";
import { TableSkel } from "@/components/Skeletons";

export default function TenantRewardsPage() {
  const { lang } = useLang();
  const t = strings[lang];

  const [data, setData] = useState<RewardsState | null>(null);

  useEffect(() => {
    setData(loadRewards());
  }, []);

  const total = data?.balance ?? 0;
  const list = data?.activity ?? [];

  return (
    <AppShell role="tenant" title={t.tenant.rewards.title}>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold">{t.tenant.rewards.title}</h1>
          <p className="text-xs opacity-70">{t.tenant.rewards.activity}</p>
        </div>

        {/* Balance card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
          <div className="text-xs opacity-70">{t.tenant.rewards.balance}</div>
          <div className="text-2xl font-semibold mt-1">{total} pts</div>
        </section>

        {/* Activity */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          {data === null ? (
            <TableSkel rows={4} />
          ) : list.length === 0 ? (
            <div className="text-sm opacity-70">{t.tenant.rewards.empty}</div>
          ) : (
            <ul className="space-y-2">
              {list.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 p-3"
                >
                  <div className="text-sm font-medium">
                    {a.type === "EARN" ? t.tenant.rewards.earned : t.tenant.rewards.redeemed}
                  </div>
                  <div className="text-xs opacity-70">
                    {new Date(a.createdAt).toLocaleString(lang === "ur" ? "ur-PK" : "en-PK")}
                  </div>
                  <div className="text-sm font-semibold">{a.points} pts</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
