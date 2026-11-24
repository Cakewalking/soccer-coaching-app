// The shared pieces the academy owner boards (AD1 to AD15) are drawn with: headings, captions,
// buttons, tiles and table headings. Sizes and colours are the boards' own.
import type { CSSProperties } from 'react'

export const INK = '#10211f'

export const S = {
  h2:      { margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em' },
  cap:     { fontSize: 14, lineHeight: '20px', color: '#4a5a57' },
  label:   { fontSize: 11, lineHeight: '15px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a4b5b' },
  more:    { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: INK, fontSize: 15, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', boxSizing: 'border-box' },
  primary: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, padding: '0 18px', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#ffffff', fontSize: 15, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', boxSizing: 'border-box' },
  tile:    { background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, boxSizing: 'border-box', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0, minWidth: 0 },
  card:    { background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 },
  num:     { fontVariantNumeric: 'tabular-nums' },
  trow:    { display: 'grid', alignItems: 'center', minHeight: 44, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: INK, boxSizing: 'content-box' },
  th:      { fontSize: 11, lineHeight: '15px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7a4b5b' },
} satisfies Record<string, CSSProperties>
