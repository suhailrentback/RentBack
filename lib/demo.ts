// lib/demo.ts
/* Demo-only data + helpers. No DB, no auth libs. Safe on Vercel. */

export type Role = 'TENANT' | 'LANDLORD' | 'ADMIN';
export type PaymentStatus = 'PENDING' | 'POSTED' | 'FAILED';
export type Method = 'RAAST' | 'CARD' | 'WALLET';

export const isDemo =
  (process.env.NEXT_PUBLIC_DEMO ?? 'true').toLowerCase() === 'true';

export const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'RentBack';
export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'help@rentback.app';

export function formatPKR(n: number) {
  try {
    return new Intl.NumberFormat('ur-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    // fallback
    return `PKR ${Math.round(n).toLocaleString('en-PK')}`;
  }
}
export function normalizePKR(n: number) {
  // for CSV numeric column (machine friendly)
  return Math.round(n).toString();
}
export function iso(d: Date | number | string) {
  const dd = typeof d === 'string' ? new Date(d) : new Date(d);
  return dd.toISOString();
}

export function toCSV<T extends Record<string, any>>(rows: T[], headers: Record<string, keyof T>) {
  const head = Object.keys(headers);
  const body = rows.map(r =>
    head
      .map(k => {
        const v = r[headers[k]];
        const s = v == null ? '' : String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
      })
      .join(',')
  );
  return [head.join(','), ...body].join('\n');
}

// --- Demo “models” (plain types) ---
export interface User { id: string; role: Role; name: string; email: string; }
export interface Lease {
  id: string; tenantId: string; landlordId: string;
  propertyName: string; monthlyRent: number; iban: string;
}
export interface Payment {
  id: string; tenantId: string; landlordId: string; leaseId: string;
  propertyName: string; amount: number; status: PaymentStatus;
  method: Method; createdAt: string; updatedAt: string;
  raastRef: string; memo?: string;
}
export interface RewardEntry {
  id: string; tenantId: string; points: number; createdAt: string; note?: string;
}

// --- Seed (static, survives build; fine for demo) ---
const users: User[] = [
  { id: 'u_tenant', role: 'TENANT', name: 'Ali Khan', email: 'ali@demo.pk' },
  { id: 'u_landlord', role: 'LANDLORD', name: 'Zain Properties', email: 'zain@demo.pk' },
  { id: 'u_admin', role: 'ADMIN', name: 'Admin', email: 'ops@demo.pk' },
];

const leases: Lease[] = [
  {
    id: 'l_1',
    tenantId: 'u_tenant',
    landlordId: 'u_landlord',
    propertyName: 'Gulberg Heights — Apt 1202',
    monthlyRent: 65000,
    iban: 'PK00-RENT-0000-0007',
  },
  {
    id: 'l_2',
    tenantId: 'u_tenant',
    landlordId: 'u_landlord',
    propertyName: 'DHA Phase 6 — House 43',
    monthlyRent: 120000,
    iban: 'PK00-RENT-0012-0342',
  },
];

let payments: Payment[] = [
  {
    id: 'p_1001',
    tenantId: 'u_tenant',
    landlordId: 'u_landlord',
    leaseId: 'l_1',
    propertyName: 'Gulberg Heights — Apt 1202',
    amount: 65000,
    status: 'POSTED',
    method: 'RAAST',
    createdAt: iso(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: iso(Date.now() - 1000 * 60 * 60 * 24 * 9),
    raastRef: 'RB-DEMO-1001',
    memo: 'Sep rent',
  },
];

let rewards: RewardEntry[] = [
  { id: 'rw_1', tenantId: 'u_tenant', points: 650, createdAt: iso(Date.now() - 1000 * 60 * 60 * 24 * 9), note: 'Rent posted' },
];

let idCounter = 2000;
function nextId(prefix: string) { idCounter += 1; return `${prefix}${idCounter}`; }

// --- Selectors & actions (log breadcrumbs in demo) ---
export function getTenantContext(tenantId = 'u_tenant') {
  const user = users.find(u => u.id === tenantId)!;
  const ls = leases.filter(l => l.tenantId === tenantId);
  const ps = payments.filter(p => p.tenantId === tenantId).sort((a,b) => b.createdAt.localeCompare(a.createdAt));
  const pts = rewards.filter(r => r.tenantId === tenantId).reduce((s, r) => s + r.points, 0);
  return { user, leases: ls, payments: ps, rewardPoints: pts };
}

export function getLandlordLedger(landlordId = 'u_landlord') {
  return payments
    .filter(p => p.landlordId === landlordId)
    .sort((a,b) => b.createdAt.localeCompare(a.createdAt));
}

export function getAdminTransactions() {
  return payments.slice().sort((a,b) => b.createdAt.localeCompare(a.createdAt));
}

export function createDemoPayment(opts: {
  tenantId: string; leaseId: string; amount: number; method: Method; memo?: string;
}) {
  if (!isDemo) throw new Error('Not allowed outside demo');
  const l = leases.find(x => x.id === opts.leaseId)!;
  const id = nextId('p_');
  const now = iso(Date.now());
  const raastRef = `RB-DEMO-${id.replace('p_', '')}`;
  const p: Payment = {
    id, tenantId: opts.tenantId, landlordId: l.landlordId, leaseId: l.id,
    propertyName: l.propertyName, amount: Math.round(opts.amount),
    status: 'PENDING', method: opts.method, createdAt: now, updatedAt: now, raastRef, memo: opts.memo,
  };
  payments.unshift(p);
  console.warn('[demo] createPayment', p);
  return p;
}

export function markPaymentSent(id: string) {
  if (!isDemo) throw new Error('Not allowed outside demo');
  const p = payments.find(x => x.id === id);
  if (p) {
    p.status = 'POSTED';
    p.updatedAt = iso(Date.now());
    rewards.unshift({
      id: nextId('rw_'),
      tenantId: p.tenantId,
      points: Math.round(p.amount / 100), // 1% back in points
      createdAt: iso(Date.now()),
      note: 'Rent posted (demo)',
    });
    console.warn('[demo] markSent', { id, pointsAdded: Math.round(p.amount / 100) });
  }
  return p;
}

export function redeemDemo(tenantId: string, points: number, note = 'Redeem voucher') {
  if (!isDemo) throw new Error('Not allowed outside demo');
  const current = rewards.filter(r => r.tenantId === tenantId).reduce((s, r) => s + r.points, 0);
  if (points > current) throw new Error('Not enough points');
  rewards.unshift({ id: nextId('rw_'), tenantId, points: -points, createdAt: iso(Date.now()), note });
  console.warn('[demo] redeem', { tenantId, points });
}

export function csvForTenantPayments(tenantId = 'u_tenant') {
  const rows = getTenantContext(tenantId).payments.map(p => ({
    id: p.id,
    createdAt: p.createdAt,
    property: p.propertyName,
    amount: normalizePKR(p.amount),
    status: p.status,
    method: p.method,
    raastRef: p.raastRef,
  }));
  return toCSV(rows, {
    id: 'id',
    createdAt: 'createdAt',
    property: 'property',
    amount: 'amount',
    status: 'status',
    method: 'method',
    raastRef: 'raastRef',
  });
}

export function csvForLedger(landlordId = 'u_landlord') {
  const rows = getLandlordLedger(landlordId).map(p => ({
    id: p.id,
    createdAt: p.createdAt,
    tenant: users.find(u => u.id === p.tenantId)?.name || 'Tenant',
    property: p.propertyName,
    amount: normalizePKR(p.amount),
    status: p.status,
    method: p.method,
    raastRef: p.raastRef,
  }));
  return toCSV(rows, {
    id: 'id',
    createdAt: 'createdAt',
    tenant: 'tenant',
    property: 'property',
    amount: 'amount',
    status: 'status',
    method: 'method',
    raastRef: 'raastRef',
  });
}

export function csvForAdmin() {
  const rows = getAdminTransactions().map(p => ({
    id: p.id,
    createdAt: p.createdAt,
    tenant: users.find(u => u.id === p.tenantId)?.email || 'tenant@demo',
    landlord: users.find(u => u.id === p.landlordId)?.name || 'Landlord',
    property: p.propertyName,
    amount: normalizePKR(p.amount),
    status: p.status,
    method: p.method,
    raastRef: p.raastRef,
  }));
  return toCSV(rows, {
    id: 'id',
    createdAt: 'createdAt',
    tenant: 'tenant',
    landlord: 'landlord',
    property: 'property',
    amount: 'amount',
    status: 'status',
    method: 'method',
    raastRef: 'raastRef',
  });
}
