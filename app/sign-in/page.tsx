// app/sign-in/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "TENANT" | "LANDLORD" | "ADMIN";

export default function SignInPage() {
  const router = useRouter();
  const search = useSearchParams();
  const nextUrl = search.get("next") || "";

  const [loading, setLoading] = useState<Role | null>(null);

  function setRole(role: Role) {
    // set cookie for 30 days
    const secure = typeof window !== "undefined" && window.location.protocol === "https:";
    const cookie = `rb-role=${role}; Path=/; Max-Age=2592000; SameSite=Lax${secure ? "; Secure" : ""}`;
    document.cookie = cookie;

    const fallback =
      role === "TENANT" ? "/tenant" :
      role === "LANDLORD" ? "/landlord" :
      "/admin";

    const dest = nextUrl || fallback;
    router.push(dest);
  }

  function signOut() {
    const secure = typeof window !== "undefined" && window.location.protocol === "https:";
    // expire cookie
    document.cookie = `rb-role=; Path=/; Max-Age=0; SameSite=Lax${secure ? "; Secure" : ""}`;
    router.push("/");
  }

  // if already signed in, bounce user to their area
  useEffect(() => {
    const m = document.cookie.match(/(?:^|;\s*)rb-role=([^;]+)/);
    const role = (m?.[1] as Role | undefined) || undefined;
    if (role) {
      const fallback =
        role === "TENANT" ? "/tenant" :
        role === "LANDLORD" ? "/landlord" :
        "/admin";
      router.replace(nextUrl || fallback);
    }
  }, [router, nextUrl]);

  return (
    <div className="min-h-dvh bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/80 dark:bg-black/30 backdrop-blur">
        <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
          <Logo />
          <span>RentBack</span>
        </div>
        <h1 className="mt-3 text-xl font-semibold">Demo sign-in</h1>
        <p className="mt-1 text-sm opacity-80">
          Choose a role to preview the app. No real accounts are created.
        </p>

        <div className="mt-6 grid gap-2">
          <button
            onClick={() => { setLoading("TENANT"); setRole("TENANT"); }}
            disabled={loading !== null}
            className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium disabled:opacity-70"
          >
            {loading === "TENANT" ? "Opening tenant…" : "Continue as Tenant"}
          </button>
          <button
            onClick={() => { setLoading("LANDLORD"); setRole("LANDLORD"); }}
            disabled={loading !== null}
            className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 font-medium"
          >
            {loading === "LANDLORD" ? "Opening landlord…" : "Continue as Landlord"}
          </button>
          <button
            onClick={() => { setLoading("ADMIN"); setRole("ADMIN"); }}
            disabled={loading !== null}
            className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 font-medium"
          >
            {loading === "ADMIN" ? "Opening admin…" : "Continue as Admin"}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs opacity-80">
          <span>Demo mode — no real data</span>
          <button onClick={signOut} className="underline hover:opacity-100">
            Sign out
          </button>
        </div>

        {/* Legal / support */}
        <div className="mt-4 flex items-center justify-between text-xs opacity-80">
          <div className="flex gap-3">
            <a href="/privacy" className="hover:opacity-100">Privacy</a>
            <a href="/terms" className="hover:opacity-100">Terms</a>
          </div>
          <a href="mailto:help@rentback.app" className="hover:opacity-100">Help</a>
        </div>
      </div>
    </div>
  );
}

function Logo({ size = 20, stroke = "#059669" }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}
