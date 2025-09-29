"use client";
import { useEffect, useState } from "react";

export default function DebugRole() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const m = document.cookie.match(/(?:^|;\s*)rb-role=([^;]+)/);
    setRole(m ? decodeURIComponent(m[1]) : null);
  }, []);

  function clearRole() {
    document.cookie = "rb-role=; Path=/; Max-Age=0";
    location.reload();
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 p-6">
        <h1 className="text-xl font-bold mb-3">Debug: Role Cookie</h1>
        <p className="mb-2">rb-role = <b>{role ?? "(none)"}</b></p>
        <div className="flex gap-2 mt-4">
          <button onClick={() => { document.cookie = `rb-role=TENANT; Path=/; Max-Age=${60*60*24*30}`; location.reload(); }} className="px-3 py-2 rounded-lg bg-emerald-600 text-white">Set TENANT</button>
          <button onClick={() => { document.cookie = `rb-role=LANDLORD; Path=/; Max-Age=${60*60*24*30}`; location.reload(); }} className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10">Set LANDLORD</button>
          <button onClick={() => { document.cookie = `rb-role=ADMIN; Path=/; Max-Age=${60*60*24*30}`; location.reload(); }} className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10">Set ADMIN</button>
          <button onClick={clearRole} className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10">Clear</button>
        </div>
      </div>
    </div>
  );
}
