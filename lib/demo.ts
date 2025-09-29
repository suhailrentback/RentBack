// lib/demo.ts
export const isDemo = () => process.env.NEXT_PUBLIC_DEMO === "true";

// --- currency ---
export function formatPKR(n: number) {
  try {
    return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `PKR ${Math.round(n).toLocaleString("en-PK")}`;
  }
}

// --- localStorage keys (client only) ---
const K = {
  tenantPayments: "rb-demo-tenant-payments",
  tenantRewards: "rb-demo-tenant-rewards",
  landlordLedger: "rb-demo-landlord-ledger",
  adminTx: "rb-demo-admin-tx",
  role: "rb-role",
};

// --- seed once ---
const SEED_FLAG = "rb-demo-seeded-v1";
export function ensureSeed() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEED_FLAG)) return;

  const now = Date.now();
  const payments = [
    { id: "pmt_1001", createdAt: new Date(now - 86400e3 * 12).toISOString(), property: "Shahbaz Residency A-2", amount: 65000, method: "RAAST", status: "POSTED" as const },
    { id: "pmt_1002", createdAt: new Date(now - 86400e3 * 40).toISOString(), property: "Shahbaz Residency A-2", amount: 65000, method: "CARD",  status: "POSTED" as const },
  ];
  const rewards = { balance: 1300, recent: [{ id: "rw_1", createdAt: new Date(now - 86400e3 * 5).toISOString(), partner: "Foodpanda PK", points: -500, status: "POSTED" as const }] };
  const ledger  = payments.map(p => ({ id: p.id, date: p.createdAt, tenant: "Ali Raza", property: p.property, amount: p.amount, method: p.method, status: "POSTED" as const }));
  const admin   = payments.map(p => ({ id: p.id, createdAt: p.createdAt, party: "Ali Raza", amount: p.amount, method: p.method, status: "POSTED" }));

  localStorage.setItem(K.tenantPayments, JSON.stringify(payments));
  localStorage.setItem(K.tenantRewards, JSON.stringify(rewards));
  localStorage.setItem(K.landlordLedger, JSON.stringify(ledger));
  localStorage.setItem(K.adminTx, JSON.stringify(admin));
  localStorage.setItem(SEED_FLAG, "1");
}

// --- role cookie (for middleware) convenience ---
export function getRole(): "TENANT"|"LANDLORD"|"ADMIN"|null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;)\s*rb-role=([^;]+)/);
  return m ? (decodeURIComponent(m[1]) as any) : null;
}

// --- tenant payments ---
export type DemoPayment = { id:string; createdAt:string; property:string; amount:number; method:"RAAST"|"CARD"|"WALLET"; status:"PENDING"|"POSTED"|"SENT"|"FAILED" };
export function getTenantPayments(): DemoPayment[] {
  if (typeof window === "undefined") return [];
  ensureSeed();
  return JSON.parse(localStorage.getItem(K.tenantPayments) || "[]");
}
export function createDemoPayment(input: { amount:number; property:string; method:"RAAST"|"CARD"|"WALLET" }) {
  if (typeof window === "undefined") return;
  const list = getTenantPayments();
  const id = `pmt_${Date.now()}`;
  list.unshift({ id, createdAt: new Date().toISOString(), property: input.property, amount: input.amount, method: input.method, status: "PENDING" });
  localStorage.setItem(K.tenantPayments, JSON.stringify(list));
  // mirror to landlord + admin right away
  const ledger = getLandlordLedgerRaw();
  ledger.unshift({ id, date: new Date().toISOString(), tenant: "Ali Raza", property: input.property, amount: input.amount, method: input.method, status: "POSTED" });
  localStorage.setItem(K.landlordLedger, JSON.stringify(ledger));
  const admin = getAdminTransactionsRaw();
  admin.unshift({ id, createdAt: new Date().toISOString(), party: "Ali Raza", amount: input.amount, method: input.method, status: "POSTED" });
  localStorage.setItem(K.adminTx, JSON.stringify(admin));
  // add points (1% of payment) to rewards
  addRewardPoints(Math.round(input.amount * 0.01), `Rent Payment`);
  console.warn("[DEMO] create payment", id, input);
  return id;
}
export function markPaymentSent(id: string) {
  if (typeof window === "undefined") return;
  const list = getTenantPayments();
  const found = list.find(p => p.id === id);
  if (found) { found.status = "SENT"; localStorage.setItem(K.tenantPayments, JSON.stringify(list)); }
  console.warn("[DEMO] mark sent", id);
}
export function getPaymentById(id:string): DemoPayment | null {
  return getTenantPayments().find(p => p.id === id) ?? null;
}

// --- rewards ---
type RewardsState = { balance:number; recent:{ id:string; createdAt:string; partner:string; points:number; status:"POSTED" }[] };
function getRewards(): RewardsState {
  if (typeof window === "undefined") return { balance:0, recent:[] };
  ensureSeed();
  return JSON.parse(localStorage.getItem(K.tenantRewards) || `{"balance":0,"recent":[]}`);
}
function setRewards(r: RewardsState) { localStorage.setItem(K.tenantRewards, JSON.stringify(r)); }
function addRewardPoints(points: number, partner = "RentBack") {
  const r = getRewards();
  r.balance += points;
  r.recent.unshift({ id:`rw_${Date.now()}`, createdAt:new Date().toISOString(), partner, points, status:"POSTED" });
  setRewards(r);
}
export function redeemVoucher(partner:string, cost:number) {
  const r = getRewards();
  if (r.balance < cost) throw new Error("Insufficient points");
  r.balance -= cost;
  r.recent.unshift({ id:`rw_${Date.now()}`, createdAt:new Date().toISOString(), partner, points:-cost, status:"POSTED" });
  setRewards(r);
}
export function getRewardsContext() { return getRewards(); }

// --- landlord ledger ---
type LedgerRow = { id:string; date:string; tenant:string; property:string; amount:number; method:"RAAST"|"CARD"|"WALLET"; status:"POSTED" };
function getLandlordLedgerRaw(): LedgerRow[] {
  if (typeof window === "undefined") return [];
  ensureSeed();
  return JSON.parse(localStorage.getItem(K.landlordLedger) || "[]");
}
export function getLandlordLedger() { return getLandlordLedgerRaw(); }
export function csvForLedger(rows: LedgerRow[]) {
  const head = ["id","date","tenant","property","amount_pkr","method","status"].join(",");
  const body = rows.map(r => [r.id, r.date, r.tenant, r.property, String(Math.round(r.amount)), r.method, r.status].join(",")).join("\n");
  return head + "\n" + body;
}

// --- admin tx ---
type AdminTx = { id:string; createdAt:string; party:string; amount:number; method:"RAAST"|"CARD"|"WALLET"; status:string };
function getAdminTransactionsRaw(): AdminTx[] {
  if (typeof window === "undefined") return [];
  ensureSeed();
  return JSON.parse(localStorage.getItem(K.adminTx) || "[]");
}
export function getAdminTransactions() { return getAdminTransactionsRaw(); }
export function csvForAdmin(rows: AdminTx[]) {
  const head = ["id","created_at","party","amount_pkr","method","status"].join(",");
  const body = rows.map(r => [r.id, r.createdAt, r.party, String(Math.round(r.amount)), r.method, r.status].join(",")).join("\n");
  return head + "\n" + body;
}
