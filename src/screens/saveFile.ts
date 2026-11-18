import { clubNowColours } from '../clubTheme'
// Hand the person a real file to keep: a readings table as CSV, a report as text.
// Everything is made in the browser; nothing is sent anywhere.
export function saveFile(name: string, text: string, type = 'text/csv') {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }))
  const a = document.createElement('a')
  a.href = url; a.download = name; a.style.display = 'none'
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
export const csv = (rows: (string | number)[][]) => rows.map(r => r.map(c => { const s = String(c); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s }).join(',')).join('\n')

// A real one-page PDF, written by hand so the demo needs no library: a title and plain lines in Helvetica.
const CP1252: Record<string, number> = { '’': 0x92, '‘': 0x91, '“': 0x93, '”': 0x94, '–': 0x96, '—': 0x97, '·': 0xb7, '…': 0x85, '•': 0x95 }
const pdfText = (s: string) => [...s].map(ch => { const c = CP1252[ch] ?? ch.charCodeAt(0); if (ch === '\\' || ch === '(' || ch === ')') return '\\' + ch; return c >= 32 && c < 127 ? ch : c < 256 ? '\\' + c.toString(8).padStart(3, '0') : '?' }).join('')
const wrap = (s: string, n = 92) => { const out: string[] = []; let cur = ''; for (const w of s.split(' ')) { if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w } else cur = (cur + ' ' + w).trim() } out.push(cur); return out }
export function savePdf(name: string, title: string, lines: string[]) {
  const body = lines.flatMap(l => l === '' ? [''] : wrap(l)).slice(0, 48)
  // A club with colours gets its band across the top, a line in its second colour, and "Made with Clean Sheet" in green at the foot.
  const club = clubNowColours(), pc = (hex: string) => [1, 3, 5].map(i => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3)).join(' ')
  const text = `BT /F1 11 Tf 56 ${club ? 736 : 752} Td 15 TL\n${body.slice(0, club ? 44 : 48).map(l => `(${pdfText(l)}) Tj T*`).join('\n')}\nET`
  const stream = club
    ? `${pc(club.main)} rg 0 772 595 70 re f\n${pc(club.line)} rg 0 766 595 6 re f\n${pc(club.onMain)} rg BT /F2 18 Tf 56 800 Td (${pdfText(title)}) Tj ET\n0.063 0.129 0.122 rg ${text}\n0.29 0.353 0.341 rg BT /F1 9 Tf 56 40 Td (Made with ) Tj ET\n0.184 0.384 0.322 rg BT /F2 9 Tf 101 40 Td (Clean Sheet) Tj ET`
    : `BT /F2 18 Tf 56 782 Td (${pdfText(title)}) Tj ET\n${text}`
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ]
  let pdf = '%PDF-1.4\n'; const at: number[] = []
  objs.forEach((o, i) => { at.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n` })
  const xref = pdf.length
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${at.map(a => String(a).padStart(10, '0') + ' 00000 n \n').join('')}trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  const bytes = new Uint8Array(pdf.length); for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff
  const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
  const a = document.createElement('a'); a.href = url; a.download = name; a.style.display = 'none'
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000)
}
