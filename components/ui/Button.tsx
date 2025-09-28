"use client";

import * as React from "react";
import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  asChild?: boolean; // future-proof
};

const VARIANT: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-emerald-600 text-white hover:bg-emerald-700",
  outline:
    "border border-emerald-200 text-emerald-700 bg-white hover:bg-emerald-50",
  ghost: "text-emerald-700 hover:bg-emerald-50",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const SIZE: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2",
  lg: "px-4 py-3 text-base",
};

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
        VARIANT[variant],
        SIZE[size],
        className
      )}
      {...props}
    />
  );
}

export default Button;
