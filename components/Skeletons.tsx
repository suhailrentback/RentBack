"use client";

export function TableSkel({ rows = 6 }: { rows?: number }) {
  return (
    <div className="divide-y divide-black/10 dark:divide-white/10">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-9 bg-black/5 dark:bg-white/10 animate-pulse" />
      ))}
    </div>
  );
}
