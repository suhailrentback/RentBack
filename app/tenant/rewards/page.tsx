// app/tenant/rewards/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { CardSkel } from "@/components/Skeletons";
import {
  loadRewards,
  saveRewards,
  type RewardsState,
} from "@/lib/demo";

export default function TenantRewardsPage() {
  const lang: Lang = "en";
  const t = strings[lang];

  const [rewards, setRewards] = useState<RewardsState | null>(null);
  const [voucher, setVoucher] = useState("");

  useEffect(() => {
    setRewards(loadRewards());
  }, []);

  const toGold = useMemo(() => {
    if (!rewards) return 0;
    const threshold = 1000;
    return Math.max(0, threshold - rewards.balance);
  }, [rewards]);

  function redeemVoucher() {
    if (!rewards || !voucher.trim()) return;
    const pts = 100; // demo value
    const id = `v_${Math.random().toString(36).slice(2, 8)}`;

    const activityItem = {
      id,
      type: "REDEEMED" as const,
      points: -pts,
      createdAt: new Date().toISOString(),
    };

    const updated: RewardsState = {
      balance: Math.max(0, rewards.balance - pts),
      activity: [activityItem, ...rewards.activity],
    };

    saveRewards(updated);
    setRewards(updated);
    setVoucher("");
  }

  if (!rewards) {
    return (
      <MobileAppShell>
        <div className="p-4 space-y-5">
          <CardSkel />
          <CardSkel />
        </div>
      </MobileAppShell>
    );
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        <div>
          <h1 className="text-xl font-semibold">{t.tenant.rewards.title}</h1>
          <p className="text-xs opacity-70">{t.tenant.rewards.activity}</p>
        </div>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm">{t.tenant.rewards.balance}</div>
          <div className="mt-2 text-3xl font-semibold">{rewards.balance} pts</div>
          <div className="mt-1 text-xs opacity-70">
            {t.tenant.rewards.progress.toGold.replace("{{pts}}", String(toGold))}
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 space-y-2">
          <div className="text-sm font-medium">{t.tenant.rewards.redeem}</div>
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder={t.tenant.rewards.voucherCode}
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
            />
            <button
              onClick={redeemVoucher}
              className="px-4 py-2 rounded-lg text-sm text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Redeem
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm font-medium">{t.tenant.rewards.activity}</div>
          <ul className="mt-2 space-y-2 text-sm">
            {rewards.activity.map(a => (
              <li key={a.id} className="flex items-center justify-between">
                <span>{a.type}</span>
                <span className={a.points >= 0 ? "text-emerald-600" : "text-red-600"}>
                  {a.points > 0 ? `+${a.points}` : a.points} pts
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
