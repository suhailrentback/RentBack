// lib/csv.ts
// Tiny client-safe CSV exporter used by Admin/Landlord pages.

export type CSVRow = Record<
  string,
  string | number | boolean | null | undefined
>;

function toCSV(rows: CSVRow[]): string {
  if (!rows || rows.length === 0) return "";

  const headers = Array.from(
    rows.reduce<Set<string>>((set, row) => {
      Object.keys(row).forEach((k) => set.add(k));
      return set;
    }, new Set<string>())
  );

  const escape = (val: unknown) => {
    if (val === null || val === undefined) return "";
    const s = String(val);
    // Quote if contains comma, quote or newline
    if (/[",\n]/.test(s)) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const lines = [
    headers.join(","), // header row
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
  ];

  // Prepend BOM so Excel opens UTF-8 correctly
  return "\uFEFF" + lines.join("\n");
}

/**
 * Triggers a CSV download in the browser.
 * Safe to call from client components only.
 */
export function exportToCSV(rows: CSVRow[], filename = "export") {
  const csv = toCSV(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

// Provide both named and default export so pages can use either style
export default exportToCSV;
