// lib/csv.ts
export function toCSV<T extends Record<string, any>>(rows: T[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v: any) =>
    v == null
      ? ""
      : String(v).includes(",") || String(v).includes('"') || String(v).includes("\n")
      ? `"${String(v).replace(/"/g, '""')}"`
      : String(v);
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => esc(r[h])).join(",")),
  ];
  return lines.join("\n");
}

export function downloadCSV(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
