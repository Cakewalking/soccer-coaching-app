// Shared pieces for the academy coach's ADC screens: the page heading, the buttons, the step dots
// and the proof chips, sized as the boards draw them.

import type { CSSProperties, ReactNode } from 'react'
import { AMBER, G, INK, LINE, MAUVE, MAUVE_PALE, MUT, cap, plain } from './styles'

const btn: CSSProperties = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 10, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', boxSizing: 'border-box', cursor: 'pointer', flex: 'none' }
export const More = ({ children, onClick, style }: { children: ReactNode; onClick: () => void; style?: CSSProperties }) =>
  <button onClick={onClick} style={{ ...btn, padding: '0 16px', border: `1px solid ${LINE}`, background: '#ffffff', color: INK, ...style }}>{children}</button>
export const Primary = ({ children, onClick, style }: { children: ReactNode; onClick: () => void; style?: CSSProperties }) =>
  <button onClick={onClick} style={{ ...btn, padding: '0 18px', border: `1px solid ${G}`, background: G, color: '#ffffff', ...style }}>{children}</button>

/** The page heading: the name, one line beside it, and the page's buttons. */
export function Head({ title, sub, children }: { title: string; sub: string; children?: ReactNode }) {
  return (
    <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
        <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap', color: INK }}>{title}</h1>
        <span style={{ ...cap, whiteSpace: 'nowrap' }}>{sub}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, flex: 'none' }}>{children}</div>
    </div>
  )
}

/** The page under the menu: heading, then the tiles on the page background. */
export function Page({ head, columns, children }: { head: ReactNode; columns: string; children: ReactNode }) {
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)" }}>
      {head}
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: columns }}>{children}</main>
    </div>
  )
}

/** `flat`: a tile that sets its own gaps, so the heading adds none. */
export const TileHead = ({ title, right, flat = false }: { title: string; right?: ReactNode; flat?: boolean }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: flat ? 0 : 6 }}>
    <h2 style={{ margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</h2>
    {typeof right === 'string' ? <span style={cap}>{right}</span> : right}
  </div>
)

/** A step on a five-step skill, as filled and empty dots. */
export function Dots({ step, size = 12, of = 5 }: { step: number; size?: number; of?: number }) {
  return (
    <span role="img" aria-label={`${step} of ${of}`} style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
      {Array.from({ length: of }, (_, i) => <span key={i} style={{ width: size, height: size, borderRadius: 999, boxSizing: 'border-box', ...(i < step ? { background: G } : { background: '#ffffff', border: `1.5px solid ${LINE}` }) }} />)}
    </span>
  )
}

const chip: CSSProperties = { flex: 'none', height: 22, padding: '0 8px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', color: INK }
/** Counted from film of every session or game. The only use of amber. */
export const Strong = () => <span style={{ ...chip, background: AMBER }}>Strong</span>
/** Worked out, not counted. */
export const Estimate = () => <span style={{ ...chip, background: '#ffffff', border: '1px dashed #8a9794' }}>Estimate</span>
/** A coach's own count: words, never a chip. */
export const YouCounted = () => <span style={{ fontSize: 11, fontWeight: 700, color: MUT, textTransform: 'uppercase' }}>You counted</span>

export const Initials = ({ children, size = 34, pale = false }: { children: string; size?: number; pale?: boolean }) =>
  <span style={{ flex: 'none', width: size, height: size, borderRadius: 999, background: pale ? MAUVE_PALE : MAUVE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{children}</span>

/** Two lines: a strong one and a quieter one under it. */
export const Two = ({ a, b, size = 15 }: { a: string; b: string; size?: number }) => (
  <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
    <strong style={{ fontSize: size, lineHeight: `${size + 5}px` }}>{a}</strong>
    <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{b}</span>
  </span>
)

/** A film still with a play button: the whole picture is the control. */
export function Film({ title, len, height, onPlay }: { title: string; len: string; height: number; onPlay: () => void }) {
  return (
    <button onClick={onPlay} aria-label={`Play: ${title}`} style={{ ...plain, flex: 'none', height, borderRadius: 14, background: 'linear-gradient(160deg,#1c3a33,#2f5d50)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
      <span style={{ width: 56, height: 56, borderRadius: 999, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
      </span>
      <span style={{ position: 'absolute', left: 12, bottom: 10, fontSize: 13, fontWeight: 700 }}>{title}</span>
      <span style={{ position: 'absolute', right: 12, bottom: 10, fontSize: 12 }}>{len}</span>
    </button>
  )
}
