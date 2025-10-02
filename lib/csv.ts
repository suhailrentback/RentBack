// lib/csv.ts
export function toCSV(
  rows: Record<string, string | number | boolean | null | undefined>[]
) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);

  const esc = (v: any) => {
    const s = v ?? "";
    const str = typeof s === "string" ? s : String(s);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const head = headers.map(esc).join(",");
  const body = rows.map((r) => headers.map((h) => esc(r[h])).join(",")).join("\n");
  return head + "\n" + body;
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
