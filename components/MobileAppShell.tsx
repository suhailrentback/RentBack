"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function MobileAppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  // theme/lang persisted on <html>
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<"en" | "ur">("en");

  useEffect(() => {
    try {
      const t = localStorage.getItem("rb-theme");
      const l = localStorage.getItem("rb-lang");
      if (t === "light" || t === "dark") setTheme(t);
      if (l === "en" || l === "ur") setLang(l);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem("rb-theme", theme);
      localStorage.setItem("rb-lang", lang);
    } catch {}
  }, [theme, lang]);

  return (
    <div className="min-h-dvh bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      {/* page content */}
      <div className="pb-20 pt-2">{children}</div>

      {/* bottom nav (imported) */}
      <BottomNav />
    </div>
  );
}
