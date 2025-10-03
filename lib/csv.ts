export function exportToCSV(rows: Array<Record<string, any>>, filename: string) {
  if (!rows || rows.length === 0) return;

  const headers = Array.from(
    rows.reduce<Set<string>>((acc, row) => {
      Object.keys(row).forEach((k) => acc.add(k));
      return acc;
    }, new Set<string>())
  );

  const escape = (val: any) => {
    const s = String(val ?? "");
    // Escape quotes and wrap if contains comma/quote/newline
    const needsWrap = /[",\n]/.test(s);
    const body = s.replace(/"/g, '""');
    return needsWrap ? `"${body}"` : body;
    // (commas are allowed; we only escape quotes/newlines properly)
  };

  const lines = [
    headers.join(","), // headers
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ];

  const csv = lines.join("\n");
  if (typeof window === "undefined") return csv; // SSR-safe: just return string

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
