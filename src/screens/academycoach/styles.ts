// Colours and shared styles for the academy coach's ADC screens, sized as the boards draw them.

import type { CSSProperties } from 'react'

export const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LINE = '#c5c8c4', HAIR = '#e9eae8'
export const PALE = '#eef5f2', MAUVE = '#e8cfcf', MAUVE_PALE = '#f4e6e6', PLUM_LABEL = '#7a4b5b'
export const AMBER = '#f4c95d'   // proof only: the Strong chip

export const cap: CSSProperties = { fontSize: 14, lineHeight: '20px', color: MUT }
export const th: CSSProperties = { fontSize: 11, lineHeight: '15px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: PLUM_LABEL }
export const label: CSSProperties = { fontSize: 11, lineHeight: '15px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: PLUM_LABEL }
export const tile: CSSProperties = { background: '#ffffff', border: `1px solid ${LINE}`, borderRadius: 16, boxSizing: 'border-box', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0, minWidth: 0 }
/** A tile that holds a list: tighter rows, a little more room at the sides. */
export const listTile: CSSProperties = { ...tile, gap: 0, padding: '14px 18px 10px' }
export const foot: CSSProperties = { ...cap, marginTop: 'auto', paddingTop: 8 }
export const note: CSSProperties = { borderRadius: 12, background: PALE, padding: '10px 12px', fontSize: 14, lineHeight: '20px', color: INK }
/** A row, a card or a picture that is pressed: a button with nothing of its own drawn. */
export const plain: CSSProperties = { border: 0, margin: 0, padding: 0, background: 'transparent', color: INK, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }

// The coach's team page (ADC2), player file (ADCP) and home (ACC1), sized as the programs v2 boards draw them.
export const T = {
  main: { flexGrow: 1, minHeight: 0, padding: '14px 28px 20px', display: 'flex', flexDirection: 'column', gap: 12 },
  tile: { background: '#ffffff', border: `1px solid ${LINE}`, borderRadius: 16, boxSizing: 'border-box', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0, minWidth: 0 },
  h2: { margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em' },
  cap: { fontSize: 14, lineHeight: '20px', color: MUT },
  sub: { fontSize: 13, lineHeight: '18px', color: MUT },
  num: { fontVariantNumeric: 'tabular-nums' },
  between: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 },
} satisfies Record<string, CSSProperties>
/** A link in a line of writing, with a 44px target that does not move the line. */
export const textLink: CSSProperties = { ...plain, display: 'inline-flex', alignItems: 'center', minHeight: 44, margin: '-12px 0', color: G, fontSize: 14, fontWeight: 700, textDecoration: 'underline' }
