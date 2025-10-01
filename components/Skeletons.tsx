// components/Skeletons.tsx
"use client";

export function CardSkel() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
      <div className="h-5 w-32 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
      <div className="mt-3 h-10 w-full rounded bg-black/10 dark:bg-white/10 animate-pulse" />
    </div>
  );
}

export function TableSkel() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
      <div className="h-5 w-40 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
      <div className="mt-3 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-full rounded bg-black/10 dark:bg-white/10 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export function ListSkel() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-full rounded bg-black/10 dark:bg-white/10 animate-pulse"
        />
      ))}
    </div>
  );
}
