// Capture quality: the mark every number carries, and the one function that
// works it out. Source: capture-quality-v1 (17 Nov), HANDOVER part 3.
//
// A mark is never colour alone: each has its own dot shape and its word.
// No mark is amber. Amber stays for proof figures.

import type { CSSProperties, ReactNode } from 'react'

export const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LINE = '#c5c8c4', PALE = '#eef5f2', DARK = '#1c3a33', SOFT = '#2d3d3a', GREY = '#e9eae8'

export type MarkKind = 'strong' | 'estimate' | 'needs' | 'not'

/** What kind of number it is. */
export type NumberKind =
  | 'count'      // an event counted from film, each one a clip
  | 'distance'   // total distance and load, from a vest
  | 'touch'      // touches and which foot, from boot sensors
  | 'told'       // something a person told us: a check-in, a rating, a note
  | 'position'   // where a player stood, team shape: one camera
  | 'speed'      // top speed, sprint counts

export interface MarkInput {
  kind: NumberKind
  /** Was it captured in this recording at all? */
  captured: boolean
  /** Did a recording problem touch it (cut-off corner, faded lines, a dropout)? */
  problem?: boolean
  /** For a trend: how many games on the same format it rests on. Leave out for one game. */
  games?: number
  /** The club's rule for when a trend may be shown (QC11). */
  trendAfter?: number
}

/** The rules, in one place. Kind of number, quality of the recording, games it rests on. */
export function markFor({ kind, captured, problem = false, games, trendAfter = 3 }: MarkInput): MarkKind {
  if (!captured) return 'not'
  if (games !== undefined) {
    if (games < trendAfter) return 'needs'
    if (games < 6) return 'estimate'
  }
  if (kind === 'position' || kind === 'speed') return 'estimate'
  if (problem) return 'estimate'
  return 'strong'
}

export const MARK_WORD: Record<MarkKind, string> = { strong: 'Strong', estimate: 'Estimate', needs: 'Needs 3 games', not: 'Not today' }

/** A change is real only when the latest value is outside the usual swing. */
export function changeWord(latest: number, band: [number, number]): 'A real change' | 'About the same' {
  return latest < band[0] || latest > band[1] ? 'A real change' : 'About the same'
}

/** Families see Strong numbers only, unless the club turns Estimate on. */
export function familyMaySee(mark: MarkKind, showEstimate: boolean): boolean {
  return mark === 'strong' || (mark === 'estimate' && showEstimate)
}

const DOT: Record<MarkKind, ReactNode> = {
  strong: <circle cx="8" cy="8" r="6" fill="currentColor" />,
  estimate: <><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M8 2a6 6 0 010 12z" fill="currentColor" /></>,
  needs: <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />,
  not: <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" />,
}
const PILL: Record<MarkKind, CSSProperties> = {
  strong: { background: G, color: '#fff', border: `1.5px solid ${G}` },
  estimate: { background: '#fff', color: INK, border: `1.5px dashed ${MUT}` },
  needs: { background: '#fff', color: MUT, border: `1.5px solid ${LINE}` },
  not: { background: GREY, color: MUT, border: `1.5px solid ${GREY}` },
}

/** The pill. `label` replaces the word (keep the shape): "Strong · 13 of 16", "2 of 3 games". */
export function Mark({ kind, label, style }: { kind: MarkKind; label?: string; style?: CSSProperties }) {
  return (
    <span data-mark={kind} style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, height: 26, padding: '0 10px 0 7px', borderRadius: 999, boxSizing: 'border-box', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', ...PILL[kind], ...style }}>
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">{DOT[kind]}</svg>
      {label ?? MARK_WORD[kind]}
    </span>
  )
}

/** "Strong · 13 of 16" where a mark covers some players only. */
export const partLabel = (kind: MarkKind, n: number, of: number) => n >= of || kind !== 'strong' ? MARK_WORD[kind] : `${MARK_WORD[kind]} · ${n} of ${of}`

// ── Small shared pieces ──────────────────────────────────────────────────────

export function Ico({ d, size = 15, sw = 2 }: { d: string; size?: number; sw?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d={d} /></svg>
}
export const IC = {
  film: 'M4 7h11v10H4zM15 10l5-3v10l-5-3',
  vest: 'M8 4l4 3 4-3 3 4-3 2v10H8V10L5 8z',
  boot: 'M4 17h16v-3l-6-2-2-5H8v7H4z',
  chat: 'M4 5h16v11H9l-5 4z',
  pen: 'M4 20h4l10-10-4-4L4 16zM13 7l4 4',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  back: 'M19 12H5M11 6l-6 6 6 6',
  tick: 'M5 12l5 5 9-10',
  cross: 'M6 6l12 12M18 6L6 18',
  lock: 'M7 11V8a5 5 0 0110 0v3M5 11h14v9H5z',
  minus: 'M5 12h14',
  plus: 'M5 12h14M12 5v14',
  clock: 'M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z',
  person: 'M8 11a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 3-5 6-5s6 2 6 5',
  bang: 'M12 6v7M12 17v1',
  hand: 'M9 11V5a2 2 0 014 0v6M13 9a2 2 0 014 0v6a6 6 0 01-12 0v-2l4-2',
  chev: 'M9 6l6 6-6 6',
}

/** A numbered source chip. Opens How we measure at that row. */
export function Src({ n, onOpen }: { n: number; onOpen: (n: number) => void }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', margin: '0 1px' }}>
      <span aria-hidden="true" style={{ display: 'inline-block', minWidth: 18, padding: '0 5px', boxSizing: 'border-box', borderRadius: 6, background: '#fff', border: `1px solid ${G}`, color: G, fontSize: 12, lineHeight: '18px', fontWeight: 700, textAlign: 'center' }}>{n}</span>
      {/* the tap target is 44px, centred on the chip, and takes no room in the line */}
      <button onClick={() => onOpen(n)} aria-label={`Source ${n}, on How we measure`} style={{ position: 'absolute', left: '50%', top: '50%', width: 44, height: 44, transform: 'translate(-50%,-50%)', padding: 0, border: 0, borderRadius: 8, background: 'none', cursor: 'pointer' }} />
    </span>
  )
}

export const tile: CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, boxSizing: 'border-box', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0, minWidth: 0 }
export const h2: CSSProperties = { margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em', color: INK }
export const cap: CSSProperties = { fontSize: 14, lineHeight: '20px', color: MUT }
export const label: CSSProperties = { fontSize: 11, lineHeight: '15px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }

export function Btn({ children, onClick, primary, big, style, ...rest }: { children: ReactNode; onClick?: () => void; primary?: boolean; big?: boolean; style?: CSSProperties; 'aria-label'?: string; 'aria-pressed'?: boolean; disabled?: boolean }) {
  return (
    <button onClick={onClick} {...rest} style={{ flex: 'none', height: 44, padding: big ? '0 16px' : '0 14px', borderRadius: 10, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit', fontSize: big ? 15 : 14, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', background: primary ? G : '#fff', color: primary ? '#fff' : INK, border: `1px solid ${primary ? G : LINE}`, ...style }}>{children}</button>
  )
}

/** The pale "why" note under a panel. */
export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ borderRadius: 12, background: PALE, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <strong style={{ fontSize: 13, lineHeight: '18px', color: INK }}>{title}</strong>
      <span style={{ fontSize: 13, lineHeight: '19px', color: SOFT }}>{children}</span>
    </div>
  )
}

/** Round tick, or the "to fix" cross. */
export function Dot({ ok, size = 24 }: { ok: boolean; size?: number }) {
  return ok
    ? <span aria-label="Done" style={{ flex: 'none', width: size, height: size, borderRadius: 999, background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={IC.tick} size={13} sw={3} /></span>
    : <span aria-label="To fix" style={{ flex: 'none', width: size, height: size, borderRadius: 999, background: '#fff', color: INK, border: `2px solid ${INK}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={IC.cross} size={13} sw={3} /></span>
}

export function Switch({ on, onChange, label: l, locked }: { on: boolean; onChange?: () => void; label: string; locked?: boolean }) {
  return (
    <button role="switch" aria-checked={on} aria-label={l} aria-disabled={locked || undefined} onClick={locked ? undefined : onChange} style={{ flex: 'none', width: 56, height: 44, padding: 0, border: 0, background: 'none', cursor: locked ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ width: 44, height: 26, borderRadius: 999, boxSizing: 'border-box', background: on ? G : '#fff', border: `1.5px solid ${on ? G : MUT}`, position: 'relative', display: 'block' }}>
        <span style={{ position: 'absolute', top: 2.5, left: on ? 21 : 3, width: 18, height: 18, borderRadius: 999, background: on ? '#fff' : MUT, transition: 'left 120ms' }} />
      </span>
    </button>
  )
}
