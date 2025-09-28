// components/mobile/StatCard.tsx
import * as React from "react";

export default function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4">
      <div className="text-xs opacity-70">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {hint ? <div className="mt-1 text-xs opacity-60">{hint}</div> : null}
    </div>
  );
}
