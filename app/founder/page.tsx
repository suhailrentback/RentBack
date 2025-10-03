// app/founder/page.tsx
"use client";

import { useLang } from "@/hooks/useLang";
import AppShell from "@/components/AppShell";

export default function FounderPage() {
  const { t } = useLang();

  const L = {
    title: "Our Founder",
    subtitle:
      "RentBack was created to make paying rent rewarding, transparent, and simple.",
    story:
      "Led by our founder, Suhail Ahmed, RentBack is building the future of rent payments in Pakistan and beyond. The mission is to transform an everyday expense into an opportunity for financial growth, security, and rewards.",
    vision:
      "This demo is the first step — showing how technology, design, and trust can come together. Soon, RentBack will expand into a full platform that benefits tenants, landlords, and partners equally.",
    closing: "Thank you for being part of our journey.",
  };

  return (
    <AppShell role="tenant" title={L.title}>
      <div className="p-4 space-y-4">
        {/* Hero card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur">
          <h1 className="text-2xl font-bold">{L.title}</h1>
          <p className="text-sm opacity-80 mt-1">{L.subtitle}</p>
        </section>

        {/* Story card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur space-y-3">
          <p className="text-base leading-relaxed">{L.story}</p>
          <p className="text-base leading-relaxed">{L.vision}</p>
          <p className="text-base font-medium">{L.closing}</p>
        </section>
      </div>
    </AppShell>
  );
}
