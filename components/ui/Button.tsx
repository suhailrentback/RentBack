// components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

type Variant = "default" | "outline" | "ghost" | "destructive" | "solid"; // add solid
type Size = "sm" | "md" | "lg";

export default function Button({
  variant = "default",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<Variant, string> = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700",
    solid:  "bg-emerald-600 text-white hover:bg-emerald-700", // alias
    outline: "border border-emerald-200 text-emerald-700 bg-white hover:bg-emerald-50 dark:bg-transparent dark:text-emerald-300 dark:border-emerald-700/50",
    ghost: "text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-white/10",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  const sizes: Record<Size, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3 text-base",
  };
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />;
}
