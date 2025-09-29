// app/sign-in/page.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/tenant";

  function setRole(role: "TENANT" | "LANDLORD" | "ADMIN") {
    // Set a simple cookie for demo role. Expires in 2 days.
    const exp = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `rb-role=${role}; path=/; expires=${exp}`;
    router.push(next);
  }

  useEffect(() => {
    // If already signed in, go next
    const has = document.cookie.includes("rb-role=");
    if (has) router.push(next);
  }, [next, router]);

  return (
    <div className="min-h-screen grid place-items-center bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      <div className="w-full max-w-sm p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
        <h1 className="text-xl font-bold">Sign in (Demo)</h1>
        <p className="mt-2 text-sm opacity-75">Choose a role for the demo. No email required.</p>
        <div className="mt-6 grid gap-2">
          <button onClick={() => setRole("TENANT")} className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">Continue as Tenant</button>
          <button onClick={() => setRole("LANDLORD")} className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">Continue as Landlord</button>
          <button onClick={() => setRole("ADMIN")} className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">Continue as Admin</button>
        </div>
        <p className="mt-4 text-xs opacity-70">You can switch roles anytime by returning here.</p>
      </div>
    </div>
  );
}
