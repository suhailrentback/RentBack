"use client";
import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { getRewardsContext, redeemVoucher, ensureSeed } from "@/lib/demo";

export default function RewardsPage() {
  const [bal, setBal] = useState(0);
  const [recent, setRecent] = useState<{id:string;createdAt:string;partner:string;points:number;status:string}[]>([]);
  function refresh(){ const r = getRewardsContext(); setBal(r.balance); setRecent(r.recent); }
  useEffect(()=>{ ensureSeed(); refresh(); }, []);
  function redeem(partner:string, cost:number){ try { redeemVoucher(partner, cost); refresh(); alert("Redeemed in demo!"); } catch(e:any){ alert(e.message || "Failed"); } }
  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">Rewards</h1>
        <p className="text-sm opacity-70">Pakistan-focused perks</p>
        <div className="mt-5 rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
          <div className="text-xs opacity-70">Points Balance</div>
          <div className="text-3xl font-extrabold">{bal.toLocaleString()}</div>
        </div>
        <h2 className="mt-6 mb-2 font-semibold">Redeem</h2>
        <div className="grid gap-2">
          {[["Foodpanda PK",500],["Careem Credits",800],["Daraz Voucher",1000]].map(([name, cost])=>(
            <button type="button" key={name as string} onClick={()=>redeem(name as string, cost as number)}
              className="h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-between px-4">
              <span>{name}</span><span className="text-sm opacity-70">{cost} pts</span>
            </button>
          ))}
        </div>
        <h2 className="mt-6 mb-2 font-semibold">Recent Redemptions</h2>
        <div className="grid gap-2">
          {recent.map(r=>(
            <div key={r.id} className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.partner}</div>
                  <div className="text-xs opacity-70">{new Date(r.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{r.points} pts</div>
                  <div className="text-xs opacity-70">{r.status}</div>
                </div>
              </div>
            </div>
          ))}
          {recent.length===0 && <div className="text-sm opacity-70">No redemptions yet.</div>}
        </div>
      </div>
    </MobileAppShell>
  );
}
