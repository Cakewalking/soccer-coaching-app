// Styles the Record tab's screens share (pack v38), sized as the boards draw them.

import type { CSSProperties } from 'react'
import { HAIR, INK, plain } from './styles'

/** The dark green hero behind the viewfinder. */
export const HERO_BG = 'radial-gradient(120% 150% at 85% 0%,#2f6b5a 0%,#1c3a33 55%,#10211f 100%)'
/** On the dark hero: the white button, and the outlined one beside it. */
export const heroBtn = (solid: boolean): CSSProperties => ({ ...plain, height: 44, padding: '0 16px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap',
  ...(solid ? { background: '#ffffff', color: INK } : { border: '1.5px solid rgba(255,255,255,0.75)', color: '#ffffff' }) })
/** A row with a name on the left and a value on the right. */
export const pairRow: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14, width: '100%' }
