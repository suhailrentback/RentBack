"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const r = useRouter();
  const next = useSearchParams().get("next") || "/tenant";

  function pick(role: "TENANT" | "LANDLORD" | "ADMIN") {
    // Set a demo cookie so middleware lets you in
    document.cookie = `rb-role=${role}; Path=/; Max-Age=${60 * 60 * 24 * 30}`;
    // Route to the correct zone (or the originally requested page for TENANT)
    if (role === "TENANT") r.push(next);
    else if (role === "LANDLORD") r.push("/landlord");
    else r.push("/admin");
  }

  return (
    <div className="min-h-screen grid place-items-center bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      <div className="w-full max-w-sm p-6 rounded-2xl border border-black/10 dark:border-white/10">
        <h1 className="text-xl font-bold">Choose a demo role</h1>
        <p className="text-sm opacity-70 mt-1">
          This sets a cookie so protected app pages load. No real auth here.
        </p>

        <div className="mt-5 grid gap-2">
          <button
            type="button"
            onClick={() => pick("TENANT")}
            className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Continue as Tenant
          </button>
          <button
            type="button"
            onClick={() => pick("LANDLORD")}
            className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            Continue as Landlord
          </button>
          <button
            type="button"
            onClick={() => pick("ADMIN")}
            className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            Continue as Admin
          </button>
        </div>

        <p className="text-xs opacity-60 mt-4">
          Tip: use a new private/incognito window if you get stuck.
        </p>
      </div>
    </div>
  );
}
