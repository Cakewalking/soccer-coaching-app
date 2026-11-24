// The pieces the academy owner's counted screens are drawn with (programs v2, 24 Nov): the page heading, number tiles,
// pills, table headings and rows, bars, and the "where these numbers come from" line. Sizes and colours are the boards' own.
// Nothing here holds a number: every screen passes in what it counted from the store.
import type { CSSProperties, ReactNode } from 'react'
import { S, INK } from './adStyles'
import Tap from './Tap'
import { initials, worthACall, type Player } from './academyStore'

export const G = '#2f6252', PALE = '#eef5f2', MAUVE = '#f4e6e6', SAND = '#e8cfcf', LINE = '#e9eae8', MUTED = '#4a5a57', LOW = '#a86b78'
/** Words in mauve where a count is low. Dark enough to read on white. */
export const LOW_INK = '#7a3b4a'
export const MAIN: CSSProperties = { flexGrow: 1, minHeight: 0, padding: '14px 28px 20px', display: 'flex', flexDirection: 'column', gap: 12 }

export const chevron = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d="M9 6l6 6-6 6" /></svg>

/** The top of a page: its name, one line under it, and its buttons. */
export function Head({ title, sub, children }: { title: string; sub: ReactNode; children?: ReactNode }) {
  return (
    <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</h1>
        <span style={{ fontSize: 14, lineHeight: '20px', color: MUTED }}>{sub}</span>
      </div>
      {children}
    </div>
  )
}

/** A number tile: a small label, the number, and what it is counted from. */
export function Kpi({ label, value, sub, bg = '#ffffff' }: { label: string; value: ReactNode; sub: ReactNode; bg?: string }) {
  return (
    <div style={{ ...S.tile, gap: 2, padding: '12px 16px', background: bg }}>
      <span style={S.label}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><strong style={{ ...S.num, fontSize: 30, lineHeight: '36px', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{value}</strong></span>
      <span style={{ fontSize: 13, lineHeight: '18px', color: MUTED }}>{sub}</span>
    </div>
  )
}
export const Kpis = ({ children, n }: { children: ReactNode; n: number }) => <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: `repeat(${n}, minmax(0,1fr))`, gap: 12 }}>{children}</div>

type PillKind = 'good' | 'warn' | 'soft' | 'plain' | 'mauve'
const PILL: Record<PillKind, CSSProperties> = { good: { background: G, color: '#ffffff' }, warn: { background: '#c39797', color: INK }, soft: { background: PALE, color: INK }, plain: { background: LINE, color: INK }, mauve: { background: MAUVE, color: INK } }
export function Pill({ kind = 'plain', children }: { kind?: PillKind; children: ReactNode }) {
  return <span style={{ display: 'flex' }}><span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', ...PILL[kind] }}>{children}</span></span>
}
/** Fees: Paid, On a plan, or how late. */
export const FeePill = ({ p }: { p: Player }) => p.fees_status === 'Paid' ? <Pill kind="good">Paid</Pill> : p.fees_status === 'Late' ? <Pill kind="warn">{p.fees_note.split(' · ')[0] || 'Late'}</Pill> : <Pill kind="soft">On a plan</Pill>
export const Term3Pill = ({ p }: { p: Player }) => <Pill kind={p.term3 === 'Staying' ? 'good' : p.term3 === 'Leaving' ? 'warn' : 'mauve'}>{p.term3}</Pill>
export const ReportPill = ({ p }: { p: Player }) => <Pill kind={p.term_report === 'Drafted' ? 'good' : p.term_report === 'To write' ? 'mauve' : 'plain'}>{p.term_report}</Pill>

export const Avatar = ({ children, bg = SAND, size = 30 }: { children: ReactNode; bg?: string; size?: number }) => (
  <span style={{ flex: 'none', width: size, height: size, borderRadius: 999, background: bg, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{children}</span>
)
/** A name with its initials and one line under it. */
export function Who({ ini, name, sub, bg }: { ini: string; name: string; sub?: ReactNode; bg?: string }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
      <Avatar bg={bg}>{ini}</Avatar>
      <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <strong style={{ fontSize: 14, lineHeight: '18px', whiteSpace: 'nowrap' }}>{name}</strong>
        {sub != null && <span style={{ fontSize: 12, color: MUTED }}>{sub}</span>}
      </span>
    </span>
  )
}
/** A player in a table: the initials are tinted where the family is worth a call or a fee is late. */
export const PlayerName = ({ p, sub, isNew }: { p: Player; sub?: ReactNode; isNew?: boolean }) => (
  <Who ini={initials(p.name)} name={p.name} bg={worthACall(p) || p.fees_status === 'Late' ? MAUVE : SAND} sub={sub ?? `Age ${p.age}${isNew ? ' · new this term' : ''}`} />
)

/** Table headings. */
export const Th = ({ cols, heads }: { cols: string; heads: string[] }) => (
  <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, alignItems: 'end', paddingBottom: 6 }}>{heads.map((h, i) => <span key={i} style={S.th}>{h}</span>)}</div>
)
const rowLook = (cols: string, h: number): CSSProperties => ({ display: 'grid', gridTemplateColumns: cols, gap: 10, alignItems: 'center', minHeight: h, borderTop: `1px solid ${LINE}`, fontSize: 14, lineHeight: '19px', color: INK, textDecoration: 'none', boxSizing: 'content-box' })
/** A table row. With `to` the whole row opens that screen. `band` is the tinted row a program or a total sits on. */
export function Row({ cols, to, h = 48, band, label, children }: { cols: string; to?: string; h?: number; band?: boolean; label?: string; children: ReactNode }) {
  const look: CSSProperties = { ...rowLook(cols, h), ...(band ? { background: '#faf5ec', padding: '0 8px', margin: '0 -8px', borderRadius: 8 } : null) }
  return to ? <Tap to={to} style={look} aria-label={label}>{children}</Tap> : <div style={look}>{children}</div>
}

/** A bar: how much of something, never a ranking. Mauve when `low`. */
export const Bar = ({ pct, low, w = 56 }: { pct: number; low?: boolean; w?: number }) => (
  <span style={{ flex: 'none', display: 'inline-block', width: w, height: 8, borderRadius: 4, background: LINE, overflow: 'hidden', verticalAlign: 'middle' }}>
    <span style={{ display: 'block', height: '100%', width: `${Math.max(0, Math.min(100, pct))}%`, background: low ? LOW : G }} />
  </span>
)
/** "13 of 16" with its bar. */
export const Of = ({ n, of, low, w }: { n: number; of: number; low?: boolean; w?: number }) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Bar pct={of ? Math.round(100 * n / of) : 0} low={low} w={w} /><span style={{ ...S.num, fontWeight: 700, whiteSpace: 'nowrap' }}>{n} of {of}</span></span>
)
/** One measure down a tile: its name, "n of total", a full-width bar, and a line under it. Opens the place the number is put in. */
export function Met({ title, n, of, sub, to, low }: { title: string; n: number; of: number; sub: string; to: string; low?: boolean }) {
  return (
    <Tap to={to} style={{ display: 'flex', flexDirection: 'column', gap: 4, minHeight: 60, justifyContent: 'center', borderTop: `1px solid ${LINE}`, textDecoration: 'none', color: INK, boxSizing: 'content-box' }}>
      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{title}</strong><strong style={{ ...S.num, fontSize: 15, whiteSpace: 'nowrap' }}>{n} of {of}</strong></span>
      <span role="img" aria-label={`${n} of ${of}`} style={{ display: 'block', height: 8, borderRadius: 4, background: LINE, overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${of ? Math.round(100 * n / of) : 0}%`, background: low ? LOW : G }} /></span>
      <span style={{ fontSize: 12, lineHeight: '16px', color: MUTED }}>{sub}</span>
    </Tap>
  )
}

/** How sure a number is. Amber is proof only: Strong means it was counted from every session (or from 50 answers or more). Estimate, and a number the owner counted by hand, is a dashed ring. */
export const Proof = ({ kind }: { kind: 'Strong' | 'Estimate' | 'You counted' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>
    <span style={{ width: 9, height: 9, borderRadius: 999, boxSizing: 'border-box', ...(kind === 'Strong' ? { background: '#f4c95d', border: '1px solid #b98f1d' } : { border: `1.5px dashed ${MUTED}` }) }} />{kind}
  </span>
)

/** A white tile with a heading, something on the right of the heading, and its rows. */
export function Tile({ title, right, children, style, label }: { title: ReactNode; right?: ReactNode; children: ReactNode; style?: CSSProperties; label?: string }) {
  return (
    <section aria-label={label} style={{ ...S.tile, flex: 'none', gap: 2, padding: '12px 16px', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}><h2 style={S.h2}>{title}</h2>{right}</div>
      {children}
    </section>
  )
}
export const Cap = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => <span style={{ ...S.cap, ...style }}>{children}</span>
/** A link in a heading line. It is as tall as the words; the padding makes it a 44px target without moving the line. */
export const Link = ({ to, children }: { to: string; children: ReactNode }) => <Tap to={to} style={{ fontSize: 14, fontWeight: 700, paddingTop: 13, paddingBottom: 13, marginTop: -13, marginBottom: -13 }}>{children}</Tap>

/** A list of lines that each open the place to deal with them. */
export function Lines({ items }: { items: { text: string; to: string }[] }) {
  return <>{items.map((n, i) => (
    <Tap key={i} to={n.to} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: `1px solid ${LINE}`, textDecoration: 'none', color: INK, boxSizing: 'content-box' }}>
      <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '18px' }}>{n.text}</span>{chevron}
    </Tap>
  ))}</>
}

/** "Where these numbers come from": the screens each number is put in at. */
export function Sources({ items }: { items: [string, string][] }) {
  return (
    <div style={{ ...S.cap, flex: 'none', display: 'flex', flexWrap: 'wrap', gap: '4px 14px', alignItems: 'center' }}>
      <strong style={{ color: INK }}>Where these numbers come from</strong>
      {items.map(([t, to]) => <Tap key={t} to={to} style={{ fontWeight: 700, minHeight: 44, display: 'inline-flex', alignItems: 'center', textDecoration: 'underline' }}>{t}</Tap>)}
    </div>
  )
}
export const SOURCES: [string, string][] = [['The roll', 'ACC2-RunSession'], ['Notes after a session', 'ADC11-AfterSession'], ['Goals', 'ADC10-SetGoal'], ['Clips sent', 'ADC3-SessionFilm'], ['Fees', 'AC5-Fees'], ['Term 3 answers', 'AD4-NextTerm'], ['Rates', 'AD21-RatesCosts']]

/** The four steps in a table cell. A step that moved up this term is green with how far. */
export function Steps({ p }: { p: Player }) {
  return (
    <span style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4 }}>
      {p.skills_now.map((now, k) => now > p.skills_then[k]
        ? <span key={k} style={{ ...S.num, fontSize: 14, fontWeight: 700, color: G }}>{now} <span style={{ fontSize: 11 }}>+{now - p.skills_then[k]}</span></span>
        : <span key={k} style={{ ...S.num, fontSize: 14, color: '#33443f' }}>{now}</span>)}
    </span>
  )
}
export const Num = ({ children, bold, low }: { children: ReactNode; bold?: boolean; low?: boolean }) => <span style={{ ...S.num, ...(bold || low ? { fontWeight: 700 } : null), ...(low ? { color: LOW_INK } : null) }}>{children}</span>
