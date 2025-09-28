import { prisma } from "../src/lib/prisma"; // adjust if your tsconfig outDir differs

async function main() {
  // clear
  await prisma.rewardEntry.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.lease.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: { email: "admin@rentback.pk", name: "Admin", role: "ADMIN", password: "admin" },
  });

  const landlord = await prisma.user.create({
    data: { email: "landlord@rentback.pk", name: "Landlord", role: "LANDLORD", password: "landlord" },
  });

  const tenant = await prisma.user.create({
    data: { email: "tenant@rentback.pk", name: "Tenant", role: "TENANT", password: "tenant" },
  });

  const prop = await prisma.property.create({
    data: {
      title: "Gulberg One-Bed",
      address: "Lahore",
      landlordId: landlord.id,
    },
  });

  const lease = await prisma.lease.create({
    data: {
      tenantId: tenant.id,
      propertyId: prop.id,
      monthlyRent: 120000,
      currency: "PKR",
    },
  });

  const pay1 = await prisma.payment.create({
    data: {
      leaseId: lease.id,
      payerId: tenant.id,
      amount: 120000,
      method: "raast",
      ref: "RB-000001",
      status: "POSTED",
      postedAt: new Date(),
    },
  });

  await prisma.rewardEntry.create({
    data: {
      userId: tenant.id,
      paymentId: pay1.id,
      points: 1200,
      reason: "rent-posted",
    },
  });

  await prisma.payment.createMany({
    data: [
      { leaseId: lease.id, payerId: tenant.id, amount: 120000, method: "card", ref: "RB-000002", status: "PENDING" },
      { leaseId: lease.id, payerId: tenant.id, amount: 120000, method: "wallet", ref: "RB-000003", status: "FAILED" },
    ],
  });

  console.log("Seeded demo users:\n- tenant@rentback.pk / tenant\n- landlord@rentback.pk / landlord\n- admin@rentback.pk / admin");
}

main().finally(() => prisma.$disconnect());
