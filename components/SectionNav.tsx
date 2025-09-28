"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

export default function SectionNav({
  base = "",
  items,
}: {
  base?: string;
  items: Item[];
}) {
  const path = usePathname() || "/";
  return (
    <div className="border-b border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur">
      <div className="max-w-6xl mx-auto flex">
        {items.map((it) => {
          const href = `${base}${it.href}`;
          const active = path === href;
          return (
            <Link
              key={it.href}
              href={href}
              className={`px-4 py-3 text-center font-medium ${
                active
                  ? "text-brand border-b-2 border-brand"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
