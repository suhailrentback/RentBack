import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/util";

export default async function TenantHome() {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({ where: { email: session?.user?.email! }});
  const lease = await prisma.lease.findFirst({
    where: { tenantId: user!.id, active: true },
    include: { property: true }
  });

  const last = await prisma.payment.findFirst({
    where: { payerId: user!.id },
    orderBy: { createdAt: 'desc' }
  });

  const due = lease?.monthlyRent ?? 0;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold">Tenant</h1>
      <div className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 p-4">
        <div className="text-sm opacity-70">Property</div>
        <div className="font-medium">{lease?.property.title} — {lease?.property.address}</div>
        <div className="mt-3 text-sm opacity-70">Due this month</div>
        <div className="text-2xl font-extrabold">{formatPKR(due)}</div>
      </div>

      <div className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 p-4">
        <div className="text-sm opacity-70">Last activity</div>
        <div className="font-medium">
          {last ? `${last.status} • ${formatPKR(last.amount)} • ${last.method.toUpperCase()}` : "No payments yet"}
        </div>
      </div>
    </div>
  );
}
