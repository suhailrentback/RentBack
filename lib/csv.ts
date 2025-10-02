// lib/csv.ts
// Lightweight CSV helper used across Admin/Landlord pages

export type CSVRow = Record<string, string | number | boolean | null | undefined>;

/** Turn rows into a CSV string (with optional explicit header order). */
export function toCSV(rows: CSVRow[], headers?: string[]): string {
  if (!rows || rows.length === 0) return "";

  const keys =
    headers && headers.length
      ? headers
      : Array.from(
          rows.reduce<Set<string>>((acc, r) => {
            Object.keys(r || {}).forEach((k) => acc.add(k));
            return acc;
          }, new Set<string>())
        );

  const escape = (val: unknown) => {
    if (val === null || val === undefined) return "";
    const s = String(val);
    // quote if contains comma, quote or newline
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const headerLine = keys.join(",");
  const lines = rows.map((row) => keys.map((k) => escape(row[k])).join(","));
  return [headerLine, ...lines].join("\n");
}

/** Trigger a browser download of a CSV string. */
export function downloadCSVString(filename: string, csv: string) {
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

/**
 * Flexible export:
 * - exportToCSV("filename", rows, headers?)   // filename first
 * - exportToCSV(rows, "filename", headers?)   // rows first (matches some pages)
 */
export function exportToCSV(
  a: string | CSVRow[],
  b: CSVRow[] | string,
  headers?: string[]
) {
  let filename: string;
  let rows: CSVRow[];

  if (typeof a === "string" && Array.isArray(b)) {
    filename = a;
    rows = b;
  } else if (Array.isArray(a) && typeof b === "string") {
    rows = a;
    filename = b;
  } else {
    throw new Error(
      'exportToCSV usage: either exportToCSV("filename", rows[, headers]) or exportToCSV(rows, "filename"[, headers])'
    );
  }

  const csv = toCSV(rows, headers);
  downloadCSVString(filename, csv);
}
