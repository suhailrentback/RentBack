"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/tenant" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0b0b]">
      <form onSubmit={onSubmit} className="w-full max-w-sm p-6 rounded-2xl border border-black/10 dark:border-white/10">
        <h1 className="text-xl font-bold mb-4">Sign in</h1>
        <input className="w-full mb-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full mb-4 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2" placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full rounded-lg bg-emerald-600 text-white py-2">Sign in</button>

        <div className="mt-6 text-xs opacity-80 space-y-1">
          <div>Demo accounts:</div>
          <div>tenant@rentback.pk / tenant</div>
          <div>landlord@rentback.pk / landlord</div>
          <div>admin@rentback.pk / admin</div>
        </div>
      </form>
    </div>
  );
}
