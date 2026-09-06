function quote(value) {
  const s = value === undefined || value === null ? '' : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

// Ported from admin.html's client-side CSV export: BOM-prefixed for Excel,
// every cell quoted, internal quotes doubled.
export function downloadCsv(filename, headers, rows) {
  const lines = [headers.map(quote).join(',')];
  for (const row of rows) lines.push(row.map(quote).join(','));
  const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
