"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import {
  type DemoPayment,
  type Method,
  type RewardsState,
  loadPayments,
  savePayments,
  loadRewards,
  saveRewards,
} from "@/lib/demo";

type FormState = {
  property: string;
  amount: string; // keep as string for input, convert to number when saving
  method: Method;
};

export default function TenantPayPage() {
  const lang: Lang = "en"; // wire from context/store later
  const t = strings[lang];

  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [rewards, setRewards] = useState<RewardsState | null>(null);

  // Local form state
  const [form, setForm] = useState<FormState>({
    property: "",
    amount: "",
    method: "RAAST",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  useEffect(() => {
    setPayments(loadPayments());
    setRewards(loadRewards());
  }, []);

  const amountNumber = useMemo(() => {
    const n = Number(form.amount.replace(/,/g, ""));
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [form.amount]);

  const canCreate = useMemo(() => {
    return form.property.trim().length > 0 && amountNumber > 0 && !isSubmitting;
  }, [form.property, amountNumber, isSubmitting]);

  function onChange<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((s) => ({ ...s, [key]: val }));
  }

  // Create Payment (status PENDING)
  async function handleCreatePayment() {
    if (!canCreate) return;
    setIsSubmitting(true);
    try {
      const id = `p_${Math.random().toString(36).slice(2, 10)}`;
      const createdAt = new Date().toISOString();

      const newPayment: DemoPayment = {
        id,
        createdAt,
        property: form.property.trim(),
        amount: amountNumber,
        method: form.method,
        status: "PENDING" as const, // <<< important
      };

      const next = [newPayment, ...payments];
      savePayments(next);
      setPayments(next);
      setCreatedId(id);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Mark as SENT and credit +1% rewards
  async function handleMarkSent() {
    if (!createdId) return;
    setIsSubmitting(true);
    try {
      const all = loadPayments();
      const next = all.map((p) =>
        p.id === createdId ? { ...p, status: "SENT" as const } : p // <<< important
      );
      savePayments(next);
      setPayments(next);

      // +1% rewards credit
      const credited = Math.round(
        (next.find((p) => p.id === createdId)?.amount ?? 0) * 0.01
      );

      const prev = loadRewards();
      const activityItem = {
        id: `rw_${createdId}`,
        type: "EARNED" as const,
        points: credited,
        createdAt: new Date().toISOString(),
      };

      const updated: RewardsState = {
        balance: prev.balance + credited,
        activity: [activityItem, ...prev.activity],
      };

      saveRewards(updated);
      setRewards(updated);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold">{t.tenant.pay.title}</h1>
          <p className="text-xs opacity-70">{t.tenant.pay.subtitle}</p>
        </div>

        {/* Form Card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 space-y-4">
          {/* Property */}
          <div className="space-y-1">
            <label className="block text-xs opacity-70">
              {t.tenant.pay.property}
            </label>
            <input
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., 12-A, Sunset Apartments"
              value={form.property}
              onChange={(e) => onChange("property", e.target.value)}
            />
          </div>

          {/* Amount */}
          <div className="space-y-1">
            <label className="block text-xs opacity-70">
              {t.tenant.pay.amount}
            </label>
            <input
              inputMode="decimal"
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., 75000"
              value={form.amount}
              onChange={(e) => onChange("amount", e.target.value)}
            />
            {amountNumber <= 0 && form.amount.length > 0 ? (
              <div className="text-xs text-red-600">
                {t.tenant.pay.warnBelowDue}
              </div>
            ) : null}
          </div>

          {/* Method */}
          <div className="space-y-1">
            <label className="block text-xs opacity-70">
              {t.tenant.pay.method}
            </label>
            <select
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              value={form.method}
              onChange={(e) => onChange("method", e.target.value as Method)}
            >
              <option value="RAAST">{t.tenant.pay.methods.RAAST}</option>
              <option value="BANK">{t.tenant.pay.methods.BANK}</option>
              <option value="JAZZCASH">{t.tenant.pay.methods.JAZZCASH}</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCreatePayment}
              disabled={!canCreate}
              className={`px-4 py-2 rounded-lg text-sm text-white ${
                canCreate
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-black/20 dark:bg-white/20 cursor-not-allowed"
              }`}
            >
              {t.tenant.pay.create}
            </button>

            <button
              onClick={handleMarkSent}
              disabled={!createdId || isSubmitting}
              className={`px-4 py-2 rounded-lg text-sm text-white ${
                createdId && !isSubmitting
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-black/20 dark:bg-white/20 cursor-not-allowed"
              }`}
            >
              {t.tenant.pay.markSent}
            </button>

            {isSubmitting ? (
              <span className="text-xs opacity-70">…</span>
            ) : null}
          </div>

          {/* Status note */}
          {createdId ? (
            <div className="text-xs opacity-70">
              {t.tenant.pay.receipt}: <span className="font-mono">{createdId}</span>
            </div>
          ) : null}
        </section>

        {/* Latest payment preview */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm font-medium">{t.tenant.home.lastPayment}</div>
          <div className="mt-2 text-xs opacity-70">
            {payments.length
              ? `${payments[0].property} • ${payments[0].method} • ${new Date(
                  payments[0].createdAt
                ).toLocaleString()}`
              : t.tenant.rewards.empty}
          </div>
        </section>

        {/* Rewards summary */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm font-medium">{t.tenant.rewards.title}</div>
          <div className="mt-2 text-xs opacity-70">
            {t.tenant.rewards.balance}:{" "}
            <span className="font-semibold">
              {rewards ? rewards.balance : 0} pts
            </span>
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
