// prisma/seed.ts
/* Minimal seed that SKIPS on Vercel/CI and seeds locally for demo. */

import { PrismaClient, Role, PaymentStatus } from "@prisma/client";

function shouldSkip(): boolean {
  // Vercel/CI or read-only environments — do nothing.
  if (process.env.VERCEL === "1") return true;
  if (process.env.CI === "true" || process.env.CI === "1") return true;
  // If you ever set READ_ONLY=1 in prod, skip too.
  if (process.env.READ_ONLY === "1") return true;
  return false;
}

async function main() {
  if (shouldSkip()) {
    console.log("💡 Seed skipped (Vercel/CI/read-only env).");
    return;
  }

  const db = new PrismaClient();
  try {
    console.log("🌱 Seeding local demo data…");

    // --- Users
    const tenant = await db.user.upsert({
      where: { email: "tenant@rentback.app" },
      update: {},
      create: {
        email: "tenant@rentback.app",
        name: "Demo Tenant",
        role: Role.TENANT,
        // ⚠️ demo only, not for production
        password: "tenant123",
      },
    });

    const landlord = await db.user.upsert({
      where: { email: "landlord@rentback.app" },
      update: {},
      create: {
        email: "landlord@rentback.app",
        name: "Demo Landlord",
        role: Role.LANDLORD,
        password: "landlord123",
      },
    });

    await db.user.upsert({
      where: { email: "admin@rentback.app" },
      update: {},
      create: {
        email: "admin@rentback.app",
        name: "Demo Admin",
        role: Role.ADMIN,
        password: "admin123",
      },
    });

    // --- Property
    const prop = await db.property.create({
      data: {
        name: "Gulberg One Apartments",
        address: "Gulberg III, Lahore",
        landlordId: landlord.id,
      },
    });

    // --- Lease
    const lease = await db.lease.create({
      data: {
        tenantId: tenant.id,
        propertyId: prop.id,
        monthlyPKR: 95000,
        startDate: new Date("2025-01-01"),
      },
    });

    // --- Payments
    const now = new Date();
    await db.payment.createMany({
      data: [
        {
          leaseId: lease.id,
          userId: tenant.id,
          amountPKR: 95000,
          status: PaymentStatus.POSTED,
          reference: "RB-2408-0001",
          createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 60), // ~2 mo ago
        },
        {
          leaseId: lease.id,
          userId: tenant.id,
          amountPKR: 95000,
          status: PaymentStatus.POSTED,
          reference: "RB-2409-0002",
          createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30), // ~1 mo ago
        },
        {
          leaseId: lease.id,
          userId: tenant.id,
          amountPKR: 95000,
          status: PaymentStatus.PENDING,
          reference: "RB-2510-0003",
        },
      ],
    });

    // --- Rewards
    await db.rewardEntry.createMany({
      data: [
        { userId: tenant.id, points: 950, note: "August rent" },
        { userId: tenant.id, points: 950, note: "September rent" },
      ],
    });

    console.log("✅ Seed completed.");
  } finally {
    // Always disconnect
    await new PrismaClient().$disconnect().catch(() => {});
  }
}

main().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
