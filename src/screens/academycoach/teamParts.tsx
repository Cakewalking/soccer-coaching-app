// Pieces the coach's team page (ADC2), player file (ADCP) and home (ACC1) share, sized as the programs v2 boards draw them.

import type { ReactNode } from 'react'
import { G, INK, PALE, MAUVE_PALE, T } from './styles'

/** The page heading: the name, one line under it, and the page's buttons. */
export const Hd = ({ title, sub, children }: { title: string; sub: string; children?: ReactNode }) => (
  <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
    <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', letterSpacing: '-0.02em', color: INK }}>{title}</h1>
      <span style={T.cap}>{sub}</span>
    </div>
    {children}
  </div>
)

const PILL = { good: { background: G, color: '#ffffff' }, warn: { background: '#c39797', color: INK }, soft: { background: PALE, color: INK }, plain: { background: '#e9eae8', color: INK }, mauve: { background: MAUVE_PALE, color: INK } } as const
export const Pill = ({ children, kind = 'plain' }: { children: ReactNode; kind?: keyof typeof PILL }) =>
  <span style={{ display: 'flex' }}><span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', ...PILL[kind] }}>{children}</span></span>

/** Counted, not judged: the only use of amber. */
export const StrongDot = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>
    <span style={{ width: 9, height: 9, borderRadius: 999, boxSizing: 'border-box', background: '#f4c95d', border: '1px solid #b98f1d' }} />Strong
  </span>
)

export const Chevron = ({ size = 14 }: { size?: number }) =>
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d="M9 6l6 6-6 6" /></svg>
