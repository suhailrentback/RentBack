"use client";

export function RowSkel() {
  return <div className="h-10 rounded-lg bg-black/5 dark:bg-white/10 animate-pulse" />;
}

export function CardSkel({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
      <div className="h-4 w-1/3 bg-black/5 dark:bg-white/10 rounded mb-3 animate-pulse" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 w-full bg-black/5 dark:bg-white/10 rounded mb-2 animate-pulse"
        />
      ))}
    </div>
  );
}

export function TableSkel({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-10 rounded-lg bg-black/5 dark:bg-white/10 animate-pulse"
        />
      ))}
    </div>
  );
}
