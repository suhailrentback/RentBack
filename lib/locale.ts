import type { Lang } from "./i18n";

export function localeFor(lang: Lang): "en-PK" | "ur-PK" {
  return lang === "ur" ? "ur-PK" : "en-PK";
}

export function formatDate(lang: Lang, d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString(localeFor(lang), {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatPKR(_lang: Lang, amount: number) {
  // Keep "Rs" prefix consistent with your app copy
  const rounded = Math.round(amount);
  return `Rs ${rounded.toLocaleString("en-PK")}`;
}
