import { prisma } from "@/lib/prisma";

export default async function RewardsPage() {
  // Server query for total + entries
  const entries = await prisma.rewardEntry.findMany({ orderBy: { createdAt: 'desc' }});
  const total = entries.reduce((s,e)=>s+e.points,0);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
        <div className="text-sm opacity-70">Total points</div>
        <div className="text-3xl font-extrabold">{total.toLocaleString()}</div>
      </div>
      <div className="mt-4 space-y-2">
        {entries.map(e=>(
          <div key={e.id} className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
            <div className="font-medium">+{e.points} pts</div>
            <div className="text-xs opacity-70">{e.reason}</div>
          </div>
        ))}
        {!entries.length && <div className="text-sm opacity-70">No rewards yet.</div>}
      </div>
    </div>
  );
}
