// components/mobile/ScreenSection.tsx
import * as React from "react";

export default function ScreenSection({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={
        "rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 mb-4 " +
        className
      }
    >
      {title ? (
        <h3 className="text-sm font-semibold mb-2 opacity-80">{title}</h3>
      ) : null}
      {children}
    </section>
  );
}
