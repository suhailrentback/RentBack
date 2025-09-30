"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopRightToggles from "./TopRightToggles";

const isDemo = () => String(process.env.NEXT_PUBLIC_DEMO).toLowerCase() === "true";

export default function MobileAppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const items = [
    { href: "/tenant", icon: HomeIcon, label: "Home" },
    { href: "/tenant/pay", icon: PayIcon, label: "Pay" },
    { href: "/tenant/rewards", icon: RewardsIcon, label: "Rewards" },
    { href: "/tenant/profile", icon: ProfileIcon, label: "Profile" },
  ];

  return (
    <div className="min-h-dvh bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      {/* Top-right toggles visible on ALL app pages */}
      <TopRightToggles />

      {/* Page content */}
      <div className="pb-20 pt-2">{children}</div>

      {/* Bottom nav (solid, brandy) */}
      <nav className="fixed bottom-0 inset-x-0 h-16 border-t border-black/10 dark:border-white/10 bg-white/85 dark:bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30">
        <div className="relative max-w-md mx-auto px-2 h-full grid grid-cols-4 items-center">
          {/* DEMO pill */}
          {isDemo() && (
            <div className="absolute -top-6 left-3 text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white shadow">
              Demo
            </div>
          )}
          {items.map((it) => {
            const ActiveIcon = it.icon;
            const active = path.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`flex flex-col items-center justify-center h-full text-[11px] ${
                  active ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "opacity-80 hover:opacity-100"
                }`}
              >
                <ActiveIcon active={active} />
                <span className="mt-1">{it.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

/* --- Inline brand-ish solid icons (no extra deps) --- */
function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}
function PayIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
function RewardsIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 17l-5.5 3 1.5-6L3 9l6.2-.5L12 3l2.8 5.5L21 9l-5 5 1.5 6z"/>
    </svg>
  );
}
function ProfileIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-3.5 5-6 8-6s6.5 2.5 8 6" />
    </svg>
  );
}
