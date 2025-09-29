"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const r = useRouter();
  const next = useSearchParams().get("next") || "/tenant";

  function pick(role: "TENANT"|"LANDLORD"|"ADMIN") {
    document.cookie = `rb-role=${role}; path=/; max-age=${60*60*24*30}`;
    r.push(role === "TENANT" ? next : role === "LANDLORD" ? "/landlord" : "/admin");
  }

  return (
    <div className="min-h-screen grid place-items-center bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      <div className="w-full max-w-sm p-6 rounded-2xl border border-black/10 dark:border-white/10">
        <h1 className="text-xl font-bold">Choose a demo role</h1>
        <p className="text-sm opacity-70 mt-1">No real auth — sets a cookie so protected pages load.</p>
        <div className="mt-5 grid gap-2">
          <button onClick={()=>pick("TENANT")}    className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">Continue as Tenant</button>
          <button onClick={()=>pick("LANDLORD")}  className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">Continue as Landlord</button>
          <button onClick={()=>pick("ADMIN")}     className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">Continue as Admin</button>
        </div>
      </div>
    </div>
  );
}
