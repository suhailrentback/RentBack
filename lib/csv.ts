// Lightweight CSV helper used across Admin/Landlord pages

export type CSVRow = Record<string, string | number | boolean | null | undefined>;

/** Turn rows into a CSV string (with optional explicit header order). */
export function toCSV(rows: CSVRow[], headers?: string[]): string {
  if (!rows || rows.length === 0) return "";

  const keys = headers && headers.length ? headers : Array.from(
    rows.reduce<Set<string>>((acc, r) => {
      Object.keys(r || {}).forEach((k) => acc.add(k));
      return acc;
    }, new Set<string>())
  );

  const escape = (val: unknown) => {
    if (val === null || val === undefined) return "";
    const s = String(val);
    // quote if contains comma, quote or newline
    if (/[",\n]/.test(s)) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const headerLine = keys.join(",");
  const lines = rows.map((row) => keys.map((k) => escape(row[k])).join(","));
  return [headerLine, ...lines].join("\n");
}

/** Trigger a browser download of the CSV. Safe to call from client components. */
export function exportToCSV(filename: string, rows: CSVRow[], headers?: string[]) {
  const csv = toCSV(rows, headers);
  // Add UTF-8 BOM so Excel recognizes Unicode
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
