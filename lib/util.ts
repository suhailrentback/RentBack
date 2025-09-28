export const formatPKR = (v: number) =>
  new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(v);

export function toCSV(rows: Record<string, any>[]) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (s:any)=>`"${String(s ?? "").replaceAll('"','""')}"`;
  const head = headers.map(escape).join(",");
  const body = rows.map(r => headers.map(h => escape(r[h])).join(",")).join("\n");
  return head + "\n" + body;
}
