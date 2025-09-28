"use client";
export const dynamic = "force-dynamic";

import AppShell from "@/components/AppShell";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useTL } from "@/components/providers/ThemeLangProvider";

export default function SignInPage() {
  const { t } = useTL();

  return (
    <AppShell>
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-xl font-bold mb-1">{t.signIn}</h1>
          <p className="text-sm opacity-80 mb-4">
            Use demo sign-in (no backend). Routes to Tenant by default.
          </p>
          <form
            className="grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/tenant";
            }}
          >
            <input
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 outline-none"
              placeholder="Email"
              type="email"
              required
            />
            <input
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 outline-none"
              placeholder="Password"
              type="password"
              required
            />
            <Button type="submit">{t.signIn}</Button>
          </form>
          <div className="flex items-center gap-2 mt-4 text-sm">
            <span className="opacity-75">Quick links:</span>
            <Link href="/tenant" className="underline">Tenant</Link>
            <Link href="/landlord" className="underline">Landlord</Link>
            <Link href="/admin" className="underline">Admin</Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
