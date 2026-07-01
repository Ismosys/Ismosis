// Pure, dependency-free exporters. Used client-side to turn the results table
// into downloadable JSON / CSV / Excel / XML / HTML files.

import type { Lead } from './types';
import { safeHref } from './links';

export type ExportFormat = 'json' | 'csv' | 'xlsx' | 'xml' | 'html';

// These columns mirror the on-screen results table exactly (source lives in the
// meta block, not per row).
const COLUMNS: Array<{ key: keyof Lead; label: string }> = [
  { key: 'name', label: 'Business Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
  { key: 'category', label: 'Category' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'social', label: 'Instagram / Other' },
  { key: 'mapUrl', label: 'Map Preview' },
];

function cell(lead: Lead, key: keyof Lead): string {
  const v = lead[key];
  return v == null ? '' : String(v);
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function csvField(s: string): string {
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(leads: Lead[]): string {
  const header = COLUMNS.map((c) => csvField(c.label)).join(',');
  const rows = leads.map((l) => COLUMNS.map((c) => csvField(cell(l, c.key))).join(','));
  return [header, ...rows].join('\r\n');
}

function toXml(leads: Lead[]): string {
  const items = leads
    .map((l) => {
      const fields = COLUMNS.map(
        (c) => `    <${c.key}>${escapeXml(cell(l, c.key))}</${c.key}>`,
      ).join('\n');
      return `  <lead>\n${fields}\n  </lead>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<leads>\n${items}\n</leads>`;
}

function toHtml(leads: Lead[]): string {
  const head = COLUMNS.map((c) => `<th>${escapeXml(c.label)}</th>`).join('');
  const link = (href: string | null, label: string, val: string) =>
    href ? `<td><a href="${escapeXml(href)}" target="_blank" rel="noopener">${label}</a></td>` : `<td>${val}</td>`;

  const rows = leads
    .map((l) => {
      const tds = COLUMNS.map((c) => {
        const raw = cell(l, c.key);
        const val = escapeXml(raw);
        if (!raw) return '<td>—</td>';
        if (c.key === 'email') {
          const href = safeHref(`mailto:${raw}`);
          return href ? `<td><a href="${escapeXml(href)}">${val}</a></td>` : `<td>${val}</td>`;
        }
        if (c.key === 'facebook') {
          const label = l.facebookType === 'page' ? 'Facebook page' : 'Find on Facebook';
          return link(safeHref(raw), label, val);
        }
        if (c.key === 'social') return link(safeHref(raw), 'Open', val);
        if (c.key === 'mapUrl') return link(safeHref(raw), 'Map', val);
        return `<td>${val}</td>`;
      }).join('');
      return `<tr>${tds}</tr>`;
    })
    .join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Lead export (${leads.length})</title>
<style>
  body{font-family:system-ui,sans-serif;margin:2rem;color:#0A0A0A}
  h1{font-size:1.25rem}
  table{border-collapse:collapse;width:100%;font-size:13px}
  th,td{border:1px solid #E5E5E5;padding:8px 10px;text-align:left;vertical-align:top}
  th{background:#0E2148;color:#fff;font-weight:600}
  tr:nth-child(even){background:#FAFAF9}
  a{color:#0E2148}
</style>
</head>
<body>
<h1>${leads.length} leads</h1>
<table><thead><tr>${head}</tr></thead><tbody>
${rows}
</tbody></table>
</body>
</html>`;
}

// Excel 2003 SpreadsheetML — opens natively in Excel/Numbers/LibreOffice with
// no third-party dependency.
function toExcelXml(leads: Lead[]): string {
  const headerCells = COLUMNS.map(
    (c) => `<Cell><Data ss:Type="String">${escapeXml(c.label)}</Data></Cell>`,
  ).join('');
  const rows = leads
    .map((l) => {
      const cells = COLUMNS.map(
        (c) => `<Cell><Data ss:Type="String">${escapeXml(cell(l, c.key))}</Data></Cell>`,
      ).join('');
      return `<Row>${cells}</Row>`;
    })
    .join('\n');
  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Leads">
  <Table>
   <Row>${headerCells}</Row>
${rows}
  </Table>
 </Worksheet>
</Workbook>`;
}

export interface ExportFile {
  content: string;
  mime: string;
  ext: string;
}

export function buildExport(leads: Lead[], format: ExportFormat): ExportFile {
  switch (format) {
    case 'json':
      return { content: JSON.stringify(leads, null, 2), mime: 'application/json', ext: 'json' };
    case 'csv':
      return { content: toCsv(leads), mime: 'text/csv', ext: 'csv' };
    case 'xml':
      return { content: toXml(leads), mime: 'application/xml', ext: 'xml' };
    case 'html':
      return { content: toHtml(leads), mime: 'text/html', ext: 'html' };
    case 'xlsx':
      return {
        content: toExcelXml(leads),
        mime: 'application/vnd.ms-excel',
        ext: 'xls',
      };
  }
}

/** Open all results rendered as an HTML page in a new browser tab. */
export function previewInBrowser(leads: Lead[]) {
  const { content } = buildExport(leads, 'html');
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank', 'noopener,noreferrer');
  // Give the new tab time to load before releasing the blob.
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export function downloadExport(leads: Lead[], format: ExportFormat, baseName: string) {
  const { content, mime, ext } = buildExport(leads, format);
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${baseName}.${ext}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
