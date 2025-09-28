"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useTL } from "@/components/providers/ThemeLangProvider";

export default function LandingPage() {
  const { t } = useTL();

  return (
    <AppShell>
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            RentBack — Pay rent, earn rewards
          </h1>
          <p className="opacity-80">
            Pakistan-first fintech experience: rent payments, points, and clean ledgers for
            tenants & landlords.
          </p>
          <div className="flex gap-3">
            <Link href="/sign-in">
              <Button>{t.signIn}</Button>
            </Link>
            <Link href="/tenant">
              <Button variant="outline">Explore tenant</Button>
            </Link>
          </div>
        </div>
        <Card className="p-6">
          <div className="text-sm opacity-80 mb-2">Preview</div>
          <div className="rounded-2xl h-48 md:h-56 bg-gradient-to-br from-emerald-600 to-teal-400 shadow-lg" />
          <div className="mt-3 text-sm">
            Clean UI · Dark/Light · English/Urdu · Mobile-first
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
