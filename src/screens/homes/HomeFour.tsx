import { useState, type CSSProperties, type ReactNode } from 'react'
import { useBackState } from '../../backState'
import { Crest } from '../../clubTheme'
import { demoToast } from '../demoToast'
import { openScreen } from '../openThing'
import type { Act, Block, DotState, Fig, Frame, Home, IconKey, Link, Meter, Row, Tone } from './types'

// The four-part home (Homes v1, 24 Nov). Every tablet home is drawn here from its data in data.ts:
//   1 Now          a slim strip: the next one or two things, and the one button for today
//   2 Progress     the dark band: one sentence, up to four then-and-now figures, the film behind it
//   3 Development  dots for one squad, or four number tiles across many
//   4 Oversight    meters "N of M", who else sees them, and one "needs you" row
// Sizes and colours are the boards' (homes/boards/STO*.dc.html). Amber is the film button, the
// figures in the dark band and the Strong mark. All writing on a tint is INK.

const INK = '#10211f', GREEN = '#2f6252', DARK = '#1c3a33', AMBER = '#f4c95d'
const BORDER = '#c5c8c4', HAIR = '#e9eae8', GREY = '#4a5a57', MID = '#33443f', SOFT = '#cfe6dc'
const PALE = '#eef5f2', BLUSH = '#f4e6e6', ROSE = '#e8cfcf', MAUVE = '#a86b78', EDGE = '#c39797'
const FONT = "'DM Sans',system-ui,sans-serif"
const TONE: Record<Tone, string> = { green: PALE, mauve: BLUSH, rose: ROSE }

const ICON: Record<IconKey, string> = {
  home: 'M4 11l8-7 8 7v9H4z',
  people: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5',
  calendar: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4',
  ball: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z',
  play: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z',
  record: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z',
  cap: 'M12 3l9 4-9 4-9-4zM7 9v5c0 2 2.5 3.5 5 3.5s5-1.5 5-3.5V9',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  doc: 'M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9zM14 3v6h6M8 13h8M8 17h5',
}
const SPARKLE = 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'
const PERSON = 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0'
const CHEVRON = 'M9 6l6 6-6 6'

const Svg = ({ d, size = 16, w = 2 }: { d: string; size?: number; w?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d={d} /></svg>
)

/** A share of the bar, rounded the way the boards round it (a half goes to the even number). */
const pct = (n: number, of: number) => { const x = (n / of) * 100, r = Math.round(x); return Math.abs(x - Math.trunc(x)) === 0.5 && r % 2 ? r - 1 : r }
/** A meter turns mauve below two-thirds. */
const meterColour = (n: number, of: number) => n * 3 < of * 2 ? MAUVE : GREEN

type Go = (a: Act) => void
const reset: CSSProperties = { font: 'inherit', color: INK, background: 'none', border: 0, padding: 0, margin: 0, textAlign: 'left', cursor: 'pointer', boxSizing: 'border-box' }
const tile: CSSProperties = { background: '#ffffff', border: `1px solid ${BORDER}`, borderRadius: 16, boxSizing: 'border-box', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0, minWidth: 0 }
const h2: CSSProperties = { margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em' }
const cap: CSSProperties = { fontSize: 14, lineHeight: '20px', color: GREY }
const small: CSSProperties = { fontSize: 13, lineHeight: '18px', color: GREY }
const tiny: CSSProperties = { fontSize: 12, lineHeight: '16px', color: GREY }
const num: CSSProperties = { fontVariantNumeric: 'tabular-nums' }
const headRow: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }
const box = (primary?: boolean): CSSProperties => ({ ...reset, flex: 'none', height: 44, padding: '0 16px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', background: primary ? GREEN : '#ffffff', color: primary ? '#ffffff' : INK, border: `1px solid ${primary ? GREEN : BORDER}` })

/** The text link at the top right of a panel. 44px tall to press, without moving the heading. */
function TextLink({ link, go }: { link: Link; go: Go }) {
  return <button onClick={() => go(link.act)} style={{ ...reset, flex: 'none', minHeight: 44, margin: '-11px -8px -10px 0', padding: '0 8px', display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 700, color: GREEN, textDecoration: 'underline' }}>{link.label}</button>
}

// ── 1 Now ────────────────────────────────────────────────────────────────────
function NowStrip({ now, go }: { now: Home['now']; go: Go }) {
  return (
    <section aria-label="Now" style={{ flex: 'none', borderRadius: 16, background: '#ffffff', border: `1px solid ${BORDER}`, padding: '8px 10px 8px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <strong style={{ fontSize: 15, whiteSpace: 'nowrap' }}>{now.day}</strong>
      {now.chips.map(c => (
        <button key={c.title} onClick={() => go({ to: c.to })} style={{ ...reset, height: 44, padding: '0 14px', borderRadius: 12, background: PALE, display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', whiteSpace: 'nowrap' }}>
          <strong style={{ fontSize: 13, lineHeight: '16px' }}>{c.title}</strong>
          <span style={{ fontSize: 12, lineHeight: '15px', color: MID }}>{c.sub}</span>
        </button>
      ))}
      <span style={{ flexGrow: 1 }} />
      <button onClick={() => go(now.other.act)} style={box()}>{now.other.label}</button>
      <button onClick={() => go(now.main.act)} style={box(true)}>{now.main.label}</button>
    </section>
  )
}

// ── 2 Progress ───────────────────────────────────────────────────────────────
function Figure({ f }: { f: Fig }) {
  const label: CSSProperties = { fontSize: 12, lineHeight: '16px', color: SOFT, whiteSpace: 'nowrap' }
  if (f.kind === 'bar') return (
    <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={label}>{f.label}</span>
      <span role="img" aria-label={`${f.label}: ${f.then} then, ${f.now} now, of ${f.of}`} style={{ display: 'block', position: 'relative', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.16)' }}>
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct(f.now, f.of)}%`, borderRadius: 5, background: AMBER }} />
        <span style={{ position: 'absolute', left: `${pct(f.then, f.of)}%`, top: -3, width: 2, height: 16, background: '#ffffff' }} />
      </span>
      <span style={{ fontSize: 13, color: '#ffffff' }}><strong style={num}>{f.now}</strong> now · {f.then} then</span>
    </span>
  )
  return (
    <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={label}>{f.label}</span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 5, whiteSpace: 'nowrap' }}>
        <strong style={{ ...num, fontSize: 24, lineHeight: '28px', color: AMBER }}>{f.value}</strong>
        <span style={{ fontSize: 13, color: '#ffffff' }}>{f.unit}</span>
      </span>
      <span style={label}>{f.then}</span>
    </span>
  )
}

function ProgressBand({ p, go }: { p: Home['progress']; go: Go }) {
  const pill: CSSProperties = { ...reset, height: 44, padding: '0 16px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }
  return (
    <section aria-label="Progress" style={{ flex: 'none', borderRadius: 18, background: DARK, color: '#ffffff', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER }}>{p.label}</span>
          <strong style={{ fontSize: 25, lineHeight: '31px', letterSpacing: '-0.01em' }}>{p.headline}</strong>
          <span style={{ fontSize: 14, lineHeight: '20px', color: SOFT }}>{p.sub}</span>
        </span>
        <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch' }}>
          {p.film && <button onClick={() => go({ say: p.film!.say })} style={{ ...pill, gap: 8, background: AMBER, color: INK }}><Svg d="M8 5l11 7-11 7z" />{p.film.label}</button>}
          {p.btns.map(b => <button key={b.label} onClick={() => go(b.act)} style={{ ...pill, justifyContent: 'center', border: '1px solid #ffffff', color: '#ffffff' }}>{b.label}</button>)}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end', marginTop: 4 }}>
        {p.figs.map(f => <Figure key={f.label} f={f} />)}
      </div>
    </section>
  )
}

// ── 3 Development ────────────────────────────────────────────────────────────
const dotStyle = (s: DotState, size: number): CSSProperties => ({
  flex: 'none', width: size, height: size, borderRadius: 999, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700,
  ...(s === 'up' ? { background: GREEN, color: '#ffffff' } : s === 'same' ? { background: '#ffffff', color: INK, border: `1.5px solid ${BORDER}` } : { background: '#ffffff', color: GREY, border: '1.5px dashed #8a9794' }),
})

function ActionRow({ r, go, tight }: { r: Row; go: Go; tight?: boolean }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: tight ? 48 : 56, borderTop: `1px solid ${HAIR}` }}>
      <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: TONE[r.tone], color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.badge}</span>
      <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontSize: 15, lineHeight: '20px' }}>{r.title}</strong>
        <span style={small}>{r.sub}</span>
      </span>
      <button onClick={() => go(r.act)} aria-label={`${r.action}: ${r.title}`} style={box(r.primary)}>{r.action}</button>
    </span>
  )
}

function MiniBar({ n, of, width }: { n: number; of: number; width?: number }) {
  return (
    <span role="img" aria-label={`${n} of ${of}`} style={{ flex: 'none', display: 'block', width, height: 8, borderRadius: 4, background: HAIR, overflow: 'hidden' }}>
      <span style={{ display: 'block', height: '100%', width: `${pct(n, of)}%`, background: meterColour(n, of) }} />
    </span>
  )
}

// ── 4 Oversight ──────────────────────────────────────────────────────────────
function MeterRow({ m, go }: { m: Meter; go: Go }) {
  return (
    <button onClick={() => go({ to: m.to })} style={{ ...reset, display: 'flex', flexDirection: 'column', gap: 4, minHeight: 60, justifyContent: 'center', borderTop: `1px solid ${HAIR}` }}>
      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <strong style={{ fontSize: 14, lineHeight: '18px' }}>{m.label}</strong>
        <strong style={{ ...num, fontSize: 15, whiteSpace: 'nowrap' }}>{m.n} of {m.of}</strong>
      </span>
      <MiniBar n={m.n} of={m.of} />
      <span style={tiny}>{m.note}</span>
    </button>
  )
}

function ProofMark({ mark }: { mark: 'strong' | 'tapped' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>
      <span style={{ width: 9, height: 9, borderRadius: 999, boxSizing: 'border-box', ...(mark === 'strong' ? { background: AMBER, border: '1px solid #b98f1d' } : { border: `1.5px dashed ${GREY}` }) }} />
      {mark === 'strong' ? 'Strong' : 'You tapped'}
    </span>
  )
}

function BlockView({ b, go }: { b: Block; go: Go }) {
  if (b.kind === 'dots') return (
    <section aria-label="Development" style={{ ...tile, gap: 8, padding: '12px 16px 0', flexGrow: 1 }}>
      <div style={headRow}><h2 style={h2}>{b.title}</h2><TextLink link={b.link} go={go} /></div>
      {/* One press for the row: every dot opens the same list, and 30px is too small to press one by one. */}
      <button onClick={() => go({ to: b.dotTo })} aria-label={`${b.dots.length} in squad order. ${b.dotOpens}`} style={{ ...reset, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'nowrap', minHeight: 44, margin: '-7px 0' }}>
        {b.dots.map(([ini, s]) => <span key={ini} title={`${ini}: ${b.says[s]}`} style={dotStyle(s, 30)}>{ini}</span>)}
      </button>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
        {b.legend.map(([s, text]) => <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: MID }}><span style={{ ...dotStyle(s, 14), display: 'block' }} />{text}</span>)}
      </div>
      {b.rows.map(r => <ActionRow key={r.title} r={r} go={go} />)}
      <span style={{ ...cap, marginTop: 'auto' }}>{b.foot}</span>
      {/* The space under the last line: 12px, down to 6px where a three-line headline leaves less room (as the boards do). */}
      <span aria-hidden="true" style={{ flex: '1 0 6px', maxHeight: 12, marginTop: -8 }} />
    </section>
  )
  if (b.kind === 'rows') return (
    <section aria-label={b.name} style={{ ...tile, gap: 2, padding: '12px 16px', flexGrow: 1 }}>
      <div style={headRow}><h2 style={h2}>{b.title}</h2><TextLink link={b.link} go={go} /></div>
      {b.rows.map(r => <ActionRow key={r.title} r={r} go={go} tight={b.tight} />)}
      {b.foot && <span style={{ ...cap, marginTop: 'auto' }}>{b.foot}</span>}
    </section>
  )
  if (b.kind === 'tiles') return (
    <div aria-label="Development" style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
      {b.tiles.map((t, i) => (
        <button key={t.label} onClick={() => go(t.act)} style={{ ...reset, ...tile, gap: 2, padding: '10px 14px', justifyContent: 'flex-start', ...(i === 0 ? { background: PALE, borderColor: '#cfe3da' } : i === b.tiles.length - 1 ? { background: BLUSH, borderColor: EDGE } : null) }}>
          <strong style={{ ...num, fontSize: 28, lineHeight: '32px', letterSpacing: '-0.02em' }}>{t.n}</strong>
          <strong style={{ fontSize: 14, lineHeight: '18px' }}>{t.label}</strong>
          <span style={tiny}>{t.note}</span>
        </button>
      ))}
    </div>
  )
  if (b.kind === 'table') return (
    <section aria-label="Oversight" style={{ ...tile, gap: 4, padding: '12px 16px', flexGrow: 1 }}>
      <div style={headRow}><h2 style={h2}>{b.title}</h2><TextLink link={b.link} go={go} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: b.grid, gap: 10, paddingBottom: 4 }}>
        {b.cols.map(c => <span key={c} style={{ fontSize: 12, fontWeight: 700, color: GREY }}>{c}</span>)}
      </div>
      {b.rows.map(r => (
        <button key={r.team} onClick={() => go({ to: r.to })} style={{ ...reset, display: 'grid', gridTemplateColumns: b.grid, gap: 10, alignItems: 'center', minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14 }}>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 14, lineHeight: '18px' }}>{r.team}</strong>
            <span style={{ fontSize: 12, color: GREY }}>{r.note}</span>
          </span>
          {r.cells.map((c, i) => typeof c === 'string' ? <span key={i}>{c}</span> : (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MiniBar n={c[0]} of={c[1]} width={56} />
              <span style={{ ...num, fontWeight: 700, whiteSpace: 'nowrap' }}>{c[0]} of {c[1]}</span>
            </span>
          ))}
        </button>
      ))}
      {b.foot && <span style={{ ...cap, marginTop: 'auto' }}>{b.foot}</span>}
    </section>
  )
  if (b.kind === 'meters') return (
    <section aria-label={b.name} style={{ ...tile, gap: 2, padding: '12px 14px', flexGrow: b.grow === false ? undefined : 1 }}>
      <div style={headRow}><h2 style={h2}>{b.title}</h2>{b.mark && <ProofMark mark={b.mark} />}</div>
      {b.sub && <span style={small}>{b.sub}</span>}
      {b.meters.map(m => <MeterRow key={m.label} m={m} go={go} />)}
      {b.foot && <span style={{ ...cap, marginTop: 'auto' }}>{b.foot}</span>}
    </section>
  )
  if (b.kind === 'needs') return (
    <button onClick={() => go({ to: b.to })} aria-label={b.title} style={{ ...reset, ...tile, flex: 'none', flexDirection: 'row', alignItems: 'center', gap: 12, padding: '12px 14px', borderTop: `4px solid ${EDGE}` }}>
      <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, background: BLUSH, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{b.count}</span>
      <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontSize: 15 }}>{b.title}</strong>
        <span style={small}>{b.sub}</span>
      </span>
      <Svg d={CHEVRON} w={2.4} />
    </button>
  )
  if (b.kind === 'needsList') return (
    <section aria-label={b.title} style={{ ...tile, gap: 0, padding: '12px 14px', flexGrow: 1, borderTop: `4px solid ${EDGE}` }}>
      <div style={{ ...headRow, paddingBottom: 4 }}><h2 style={h2}>{b.title}</h2><span style={cap}>{b.count}</span></div>
      {b.items.map(it => (
        <button key={it.label} onClick={() => go({ to: it.to })} style={{ ...reset, display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: `1px solid ${HAIR}` }}>
          <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '18px' }}>{it.label}</span>
          <Svg d={CHEVRON} w={2.4} />
        </button>
      ))}
      <span style={{ ...cap, marginTop: 'auto' }}>{b.foot}</span>
    </section>
  )
  return (
    <section aria-label="Oversight" style={{ ...tile, gap: 2, padding: '12px 14px', flexGrow: 1 }}>
      <h2 style={h2}>{b.title}</h2>
      <span style={small}>{b.sub}</span>
      {b.jobs.map(j => (
        <button key={j.title} onClick={() => go({ to: j.to })} style={{ ...reset, display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, borderTop: `1px solid ${HAIR}` }}>
          <span role="img" aria-label={j.done ? 'Done' : 'Waiting on you'} style={{ flex: 'none', width: 28, height: 28, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: j.done ? PALE : BLUSH }}><Svg d={j.done ? 'M5 12l5 5 9-10' : 'M12 7v6M12 17v.5'} size={15} w={2.6} /></span>
          <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 14, lineHeight: '18px' }}>{j.title}</strong>
            <span style={tiny}>{j.note}</span>
          </span>
          <Svg d={CHEVRON} w={2.4} />
        </button>
      ))}
      <span style={{ ...cap, marginTop: 'auto' }}>{b.foot}</span>
    </section>
  )
}

/** The four parts, without a frame: 712px is the room under the two bars on a tablet. */
function FourParts({ home, go }: { home: Home; go: Go }) {
  const column: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }
  return (
    <main data-home={home.id} style={{ flexGrow: 1, minHeight: 712, boxSizing: 'border-box', padding: '14px 28px 16px', display: 'flex', flexDirection: 'column', gap: 12, background: '#faf5ec', color: INK, fontFamily: FONT, lineHeight: 'normal' }}>
      <NowStrip now={home.now} go={go} />
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12 }}>
        <div style={column}>
          <ProgressBand p={home.progress} go={go} />
          {home.left.map((b, i) => <BlockView key={i} b={b} go={go} />)}
        </div>
        <div style={column}>{home.right.map((b, i) => <BlockView key={i} b={b} go={go} />)}</div>
      </div>
    </main>
  )
}

/** A line is said with the shared toast, and kept on the page so a check can read the last one. */
function useSay(): [string, (line: string) => void] {
  const [last, setLast] = useState('')
  return [last, (line: string) => { setLast(line); demoToast(line) }]
}

// A screen opened from the home, where the role's own frame has no tab for it.
function BackShell({ onBack, children }: { onBack: () => void; children: ReactNode }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#faf5ec' }}>
      <div style={{ padding: '10px 28px', borderBottom: `1px solid ${HAIR}`, background: '#fff', flexShrink: 0 }}>
        <button onClick={onBack} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Svg d="M19 12H5M12 5l-7 7 7 7" size={13} w={2.5} />
          Back to Home
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>{children}</div>
    </div>
  )
}

/**
 * The home inside a role's own app: the app draws the bars (and the round Ask button), this draws the four parts.
 * A link first tries the app's own tabs (frameNav), then opens over the home with a way back.
 */
export function HomeFourBody({ home, onNav, renderTarget, frameNav }: { home: Home; onNav?: (s: string) => void; renderTarget?: (id: string) => ReactNode; frameNav?: (id: string) => boolean }) {
  const [open, setOpen] = useBackState<string | null>(null)
  const [last, say] = useSay()
  const go: Go = a => {
    if ('say' in a) return say(a.say)
    if (frameNav?.(a.to)) return
    if (renderTarget) setOpen(a.to); else if (onNav) onNav(a.to)
  }
  if (open && renderTarget) return <BackShell onBack={() => setOpen(null)}>{renderTarget(open)}</BackShell>
  return (
    <div data-lasttool={last} style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: '#faf5ec' }}>
      <FourParts home={home} go={go} />
    </div>
  )
}

function Bars({ frame, go }: { frame: Frame; go: Go }) {
  return (
    <>
      <div data-club-bar="" style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 14, background: GREEN }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <nav aria-label="Main" style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          {frame.nav.map(n => (
            <button key={n.label} data-club-tab={n.on ? 'on' : 'off'} aria-current={n.on ? 'page' : undefined} onClick={() => go({ to: n.to })} style={{ ...reset, height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, color: n.on ? '#ffffff' : HAIR, background: n.on ? '#40826d' : 'none', fontSize: 16, fontWeight: 600 }}>
              {n.icon && <Svg d={ICON[n.icon]} size={20} />}{n.label}
            </button>
          ))}
        </nav>
        <button onClick={() => go({ to: 'ASKd4-PanelFirst' })} aria-label="Ask Clean Sheet" style={{ ...reset, flex: 'none', width: 44, height: 44, borderRadius: 999, border: '1px solid #a9cfc0', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Svg d={SPARKLE} size={20} /></button>
        <button data-club-pill="" onClick={() => go({ to: 'VS1-SwitchView' })} style={{ ...reset, height: 44, padding: '0 14px', borderRadius: 999, background: '#ffffff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}><Crest size={18} />{frame.team} <Svg d="M6 9l6 6 6-6" w={2.4} /></button>
        <button onClick={() => openScreen('SET1-Account', frame.who)} aria-label="Your account and settings" data-club-keep="" style={{ ...reset, flex: 'none', width: 44, height: 44, borderRadius: 999, background: EDGE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>{frame.avatar}</button>
      </div>
      <div style={{ flex: 'none', height: 44, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24, background: '#ffffff', borderBottom: `1px solid ${BORDER}` }}>
        <nav aria-label="Home" style={{ display: 'flex', gap: 24, flexGrow: 1, height: 44 }}>
          {frame.sub.map(n => (
            <button key={n.label} aria-current={n.on ? 'page' : undefined} onClick={() => go({ to: n.to })} style={{ ...reset, height: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 4px', color: n.on ? INK : GREY, fontSize: 15, fontWeight: 600, borderBottom: `3px solid ${n.on ? '#40826d' : 'transparent'}`, whiteSpace: 'nowrap' }}>{n.label}</button>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: BLUSH, color: INK, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}><Svg d={PERSON} size={14} w={2.4} />{frame.role}</span>
        </div>
      </div>
    </>
  )
}

/** The home at its own address, with the bars as drawn on the board. Ask is the round button in the top bar. */
export function HomeFourTablet({ home, onNav }: { home: Home; onNav?: (s: string) => void }) {
  const [last, say] = useSay()
  const go: Go = a => 'say' in a ? say(a.say) : onNav?.(a.to)
  return (
    <div data-lasttool={last} style={{ width: 1180, minHeight: 820, boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: FONT, lineHeight: 'normal', display: 'flex', flexDirection: 'column' }}>
      <Bars frame={home.frame} go={go} />
      <FourParts home={home} go={go} />
    </div>
  )
}
