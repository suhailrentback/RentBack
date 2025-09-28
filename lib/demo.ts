// lib/demo.ts
import { DEMO } from "./env";

export type Role = "TENANT" | "LANDLORD" | "ADMIN";
export type PaymentStatus = "PENDING" | "POSTED" | "REFUNDED";

export type User = { id: string; email: string; name: string; role: Role };
export type Lease = { id: string; tenantId: string; landlordId: string; property: string; monthly: number };
export type Payment = {
  id: string; createdAt: string; tenantId: string; landlordId: string;
  property: string; amount: number; method: "RAAST"|"CARD"|"WALLET"; status: PaymentStatus; ref: string;
};
export type Redemption = { id: string; createdAt: string; tenantId: string; points: number; denom: number; status: "SUCCEEDED" };

export const users: User[] = [
  { id: "u_tenant",   email: "tenant@demo.pk",   name: "Mr Renter",   role: "TENANT" },
  { id: "u_landlord", email: "landlord@demo.pk", name: "Ms Owner",    role: "LANDLORD" },
  { id: "u_admin",    email: "admin@demo.pk",    name: "Admin User",  role: "ADMIN" },
];

export const leases: Lease[] = [
  { id: "l1", tenantId: "u_tenant", landlordId: "u_landlord", property: "Sunset Towers Apt 12", monthly: 65000 },
];

export const payments: Payment[] = [
  {
    id: "p1", createdAt: new Date(Date.now()-1000*60*60*24*10).toISOString(),
    tenantId: "u_tenant", landlordId: "u_landlord", property: "Sunset Towers Apt 12",
    amount: 65000, method: "RAAST", status: "POSTED", ref: "RB-2409-001"
  },
  {
    id: "p2", createdAt: new Date(Date.now()-1000*60*60*24*3).toISOString(),
    tenantId: "u_tenant", landlordId: "u_landlord", property: "Sunset Towers Apt 12",
    amount: 65000, method: "CARD", status: "REFUNDED", ref: "RB-2409-002"
  },
];

export const redemptions: Redemption[] = [
  { id:"r1", createdAt:new Date(Date.now()-1000*60*60*24*2).toISOString(), tenantId:"u_tenant", points: 650, denom: 500, status:"SUCCEEDED" }
];

export function makeRef() {
  const n = Math.floor(Math.random()*900)+100;
  return `RB-${new Date().toISOString().slice(2,10).replace(/-/g,"")}-${n}`;
}

export const formatPKR = (n:number)=> new Intl.NumberFormat("en-PK", { style:"currency", currency:"PKR", maximumFractionDigits:0 }).format(n);
export const dateISO = (d: string|number|Date)=> new Date(d).toISOString();

export const DEMO_USERS = {
  tenant: { email: "tenant@demo.pk", password: "demo" },
  landlord: { email: "landlord@demo.pk", password: "demo" },
  admin: { email: "admin@demo.pk", password: "demo" },
};

// no-DB create/update helpers for demo
export function createPaymentDemo(input: Omit<Payment,"id"|"createdAt"|"ref"|"status"> & { status?:PaymentStatus }) {
  const p: Payment = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ref: makeRef(), status:"PENDING", ...input };
  payments.unshift(p);
  return p;
}
export function setPaymentStatus(id:string, status:PaymentStatus){
  const p = payments.find(x=>x.id===id); if(p){ p.status=status; }
  return p ?? null;
}
export function addRedemptionDemo(tenantId:string, denom:number){
  const r: Redemption = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), tenantId, points: denom, denom, status:"SUCCEEDED" };
  redemptions.unshift(r);
  return r;
}

export const isDemo = ()=> DEMO;
