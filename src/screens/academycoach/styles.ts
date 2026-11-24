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
