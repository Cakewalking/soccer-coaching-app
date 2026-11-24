// The one dashboard layout (dashboards handover v1, 24 Nov): a dark result strip, three or four
// headline tiles, a fixed grid of tiles, and a 330px right column of two short lists.
// Every dashboard in this folder is made from these pieces, so the six roles read the same way.

import type { CSSProperties, ReactNode } from 'react'

export const INK = '#10211f', MUT = '#4a5a57', G = '#2f6252', LINE = '#c5c8c4', HAIR = '#e9eae8'
export const PALE = '#eef5f2', SAND = '#f3ecdf', MAUVE_PALE = '#f4e6e6', STRIP = '#1c3a33', AMBER = '#f4c95d'
const FONT = "var(--font-sans, 'DM Sans', system-ui, sans-serif)"

// ── Switches and placeholders ────────────────────────────────────────────────

/**
 * "Our chances" and "Their chances" are estimates of chance quality. They must not ship until
 * junior shot values are validated. On: the two headline tiles show, as the boards draw them.
 * Off: the headline row is Our style and the thing to fix, and the grid stands on its own.
 */
export const SHOW_CHANCE_QUALITY_TILES = true

/** Close = within this share of the aim. Placeholder from the handover, to confirm. */
export const CLOSE_WITHIN_SHARE_OF_AIM = 0.15

/** Director's weekend: a team with this many measures on target, or more, is on target. Placeholder. */
export const TEAM_ON_TARGET_FROM = 5
/** Director's weekend: a team with this many is close; fewer is off target. Placeholder. */
export const TEAM_CLOSE_FROM = 4

// ── States and proof ─────────────────────────────────────────────────────────

export type State = 'on' | 'close' | 'off' | 'nofilm'
/** How sure a number is. Strong: counted from film of the whole game. Estimate: modelled, or part of the game. */
export type Sure = 'Strong' | 'Estimate' | 'You tapped'

/** Tile colour, bar colour, the words on the chip, and the edge. The words are always shown: colour is never the only signal. */
export const LOOK: Record<State, { bg: string; bar: string; says: string; edge: string; block: string }> = {
  on:     { bg: PALE,       bar: G,         says: 'On target',  edge: '#cfe3da', block: G },
  close:  { bg: SAND,       bar: '#8a7a55', says: 'Close',      edge: '#e2d6bd', block: '#d9c9a3' },
  off:    { bg: MAUVE_PALE, bar: '#a86b78', says: 'Off target', edge: '#c39797', block: '#c39797' },
  nofilm: { bg: '#ffffff',  bar: 'transparent', says: 'Not filmed', edge: '#8a9794', block: '#ffffff' },
}

/**
 * One measure on a tile. `n` and `target` are the numbers behind the words; `n` is null when there is no film.
 * `better`: higher is better, lower is better (4 s or less), or under (fewer than 10).
 * `fill` and `tick` place the bar and the black line at the aim, as shares of the bar's width.
 * A lower-is-better bar still fills left to right with the value: on target means it ends before the line.
 */
export type Measure = {
  name: string; value: string; aim: string
  n: number | null; target: number; better: 'higher' | 'lower' | 'under'
  fill: number; tick: number; sure: Sure
  /** The board draws this tile in a state the Close rule does not give. Kept as drawn; listed in DASHBOARDS-NOTES. */
  drawn?: State
  /** The two parts of the headline tile when this is the measure furthest from its aim. */
  fix?: { big: string; line: string }
}

/** How far a number is from its aim, as a share of the aim. Zero or less is on target. */
export const shareFromAim = (n: number, target: number, better: Measure['better']) => better === 'higher' ? (target - n) / target : (n - target) / target

/** The rule: on target, close (within the placeholder share of the aim), or off target. */
export function stateFor(n: number | null, target: number, better: Measure['better']): State {
  if (n === null) return 'nofilm'
  const gap = shareFromAim(n, target, better)
  if (better === 'under' ? gap < 0 : gap <= 0) return 'on'
  return gap <= CLOSE_WITHIN_SHARE_OF_AIM ? 'close' : 'off'
}
export const stateOf = (m: Measure): State => m.n === null ? 'nofilm' : m.drawn ?? stateFor(m.n, m.target, m.better)

/** The director's rule for a team: measures on target out of the club's 8. Null is no film. */
export const teamState = (onTarget: number | null): State => onTarget === null ? 'nofilm' : onTarget >= TEAM_ON_TARGET_FROM ? 'on' : onTarget >= TEAM_CLOSE_FROM ? 'close' : 'off'

/** Counts for the Our style headline tile: on target, close, off, of the measures with film. */
export function tally(ms: Measure[]) {
  const s = ms.map(stateOf)
  return { on: s.filter(x => x === 'on').length, close: s.filter(x => x === 'close').length, off: s.filter(x => x === 'off').length, of: ms.length }
}
/** The off-target measure furthest from its aim, as a share of the aim. None when nothing is off target. */
export function furthestOff(ms: Measure[]): Measure | undefined {
  return ms.filter(m => stateOf(m) === 'off' && m.n !== null).sort((a, b) => shareFromAim(b.n!, b.target, b.better) - shareFromAim(a.n!, a.target, a.better))[0]
}

// ── Shared styles ────────────────────────────────────────────────────────────

export const num: CSSProperties = { fontVariantNumeric: 'tabular-nums' }
export const tile: CSSProperties = { background: '#ffffff', border: `1px solid ${LINE}`, borderRadius: 16, boxSizing: 'border-box', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0, minWidth: 0 }
export const h2: CSSProperties = { margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em' }
const labelStyle: CSSProperties = { fontSize: 11, lineHeight: '15px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a4b5b' }
/** A tile, a row or a pill that is pressed: a button with nothing of its own drawn. */
export const plain: CSSProperties = { margin: 0, font: 'inherit', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer', boxSizing: 'border-box' }

const PLAY = 'M8 5l11 7-11 7z'
export const PlayIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d={PLAY} /></svg>
)

// ── Proof mark ───────────────────────────────────────────────────────────────

/** Strong: a filled amber dot. Estimate: a dashed ring. You tapped: the words alone. Always with the word. */
export function SureMark({ sure, size = 12 }: { sure: Sure; size?: number }) {
  if (sure === 'You tapped') return <span style={{ fontSize: size, fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>You tapped</span>
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: size, fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>
      <span style={{ width: 9, height: 9, borderRadius: 999, boxSizing: 'border-box', ...(sure === 'Strong' ? { background: AMBER, border: '1px solid #b98f1d' } : { border: `1.5px dashed ${MUT}` }) }} />{sure}
    </span>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

/**
 * The page under a role's menu. `tight` trims the spacing a little for a frame whose menu takes
 * more room than the board's (the club coach's grouped sub-menu), so every tile stays in view at 1180 by 820.
 */
export function DashPage({ id, tight = false, children }: { id: string; tight?: boolean; children: ReactNode }) {
  return (
    <div data-board={id} data-dash="" style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#faf5ec', color: INK, fontFamily: FONT }}>
      <main style={{ flexGrow: 1, minHeight: 0, boxSizing: 'border-box', padding: tight ? '6px 28px 6px' : '14px 28px 16px', display: 'flex', flexDirection: 'column', gap: tight ? 8 : 12 }}>{children}</main>
    </div>
  )
}

/** The grid and the right column, side by side. */
export const Columns = ({ children }: { children: ReactNode }) => <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12 }}>{children}</div>
export const RightColumn = ({ children }: { children: ReactNode }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>{children}</div>

// ── 1. Result strip ──────────────────────────────────────────────────────────

/** Dark green, white writing: one big figure, a title, one line of detail, then the tabs and the one amber button. */
export function Strip({ big, title, detail, tight = false, children }: { big: string; title: string; detail: string; tight?: boolean; children?: ReactNode }) {
  return (
    <section aria-label="Result" style={{ flex: 'none', borderRadius: 18, background: STRIP, color: '#ffffff', padding: tight ? '6px 18px' : '12px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <strong style={{ ...num, flex: 'none', fontSize: 44, lineHeight: '48px', letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>{big}</strong>
      <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontSize: 19, lineHeight: '24px' }}>{title}</strong>
        <span style={{ fontSize: 13, lineHeight: '18px', color: '#cfe6dc' }}>{detail}</span>
      </span>
      {children}
    </section>
  )
}
/** A tab on the strip. The one that is open is green with white writing. */
export const StripTab = ({ on = false, onClick, children }: { on?: boolean; onClick: () => void; children: ReactNode }) => (
  <button aria-current={on ? 'page' : undefined} onClick={onClick} style={{ ...plain, flex: 'none', height: 44, padding: '0 18px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', background: on ? G : '#ffffff', color: on ? '#ffffff' : INK, border: `1px solid ${on ? G : LINE}` }}>{children}</button>
)
/** The amber button: always "play the film", and the only amber button on a screen. */
export const PlayFilm = ({ onClick, children }: { onClick: () => void; children: ReactNode }) => (
  <button data-play-film="" onClick={onClick} style={{ ...plain, flex: 'none', height: 44, padding: '0 16px', borderRadius: 999, border: 0, background: AMBER, color: INK, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }}><PlayIcon />{children}</button>
)

// ── 2. Headline tiles ────────────────────────────────────────────────────────

export const Headlines = ({ children, count }: { children: ReactNode; count: number }) => <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: `repeat(${count}, minmax(0,1fr))`, gap: 12 }}>{children}</div>

/** A label, a number at 30px, one line under it. `fix`: the thing to fix, on pale mauve, with all its writing in ink. */
export function Headline({ label, big, line, extra, fix = false, tight = false }: { label: string; big: string; line: string; extra?: ReactNode; fix?: boolean; tight?: boolean }) {
  return (
    <div style={{ ...tile, gap: 2, padding: tight ? '6px 16px' : '12px 16px', background: fix ? MAUVE_PALE : '#ffffff' }}>
      <span style={{ ...labelStyle, ...(fix ? { color: INK } : null) }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <strong style={{ ...num, fontSize: 30, lineHeight: '36px', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{big}</strong>{extra}
      </span>
      <span style={{ fontSize: 13, lineHeight: '18px', color: fix ? INK : MUT }}>{line}</span>
    </div>
  )
}

/** One block per measure, in the order on target, close, off. */
export function Blocks({ on, close, off }: { on: number; close: number; off: number }) {
  const cols = [...Array(on).fill(LOOK.on.block), ...Array(close).fill(LOOK.close.block), ...Array(off).fill(LOOK.off.block)] as string[]
  return (
    <span role="img" aria-label={`${on} on target, ${close} close, ${off} off target`} style={{ display: 'inline-flex', gap: 3 }}>
      {cols.map((c, i) => <span key={i} style={{ width: 14, height: 22, borderRadius: 4, background: c }} />)}
    </span>
  )
}

/** The headline row of a style dashboard: Our style, the two chance tiles (behind the switch), and the thing to fix. */
export function StyleHeadlines({ measures, styleLine, chances, fixLabel, tight }: {
  measures: Measure[]; styleLine: string; fixLabel: string; tight?: boolean
  /** Left out when the club's rules do not show chances to this team. */
  chances?: { ours: [big: string, line: string]; theirs: [big: string, line: string] }
}) {
  const t = tally(measures), worst = furthestOff(measures)
  const showChances = SHOW_CHANCE_QUALITY_TILES && !!chances
  return (
    <Headlines count={showChances ? 4 : 2}>
      <Headline tight={tight} label="Our style" big={`${t.on} of ${t.of}`} line={`${styleLine} · ${t.close} close · ${t.off} off`} extra={<Blocks on={t.on} close={t.close} off={t.off} />} />
      {showChances && <Headline tight={tight} label="Our chances" big={chances.ours[0]} line={chances.ours[1]} extra={<SureMark sure="Estimate" />} />}
      {showChances && <Headline tight={tight} label="Their chances" big={chances.theirs[0]} line={chances.theirs[1]} extra={<SureMark sure="Estimate" />} />}
      {worst
        ? <Headline tight={tight} fix label={fixLabel} big={worst.fix?.big ?? worst.value} line={worst.fix?.line ?? `${worst.name.toLowerCase()} · ${worst.aim}`} extra={<SureMark sure={worst.sure} />} />
        : <Headline tight={tight} label={fixLabel} big="Nothing off target" line="every measure is on target or close" />}
    </Headlines>
  )
}

// ── 3. The grid ──────────────────────────────────────────────────────────────

/** A text link in a tile's heading. The tap area is 44px tall; the line it sits on stays its own height. */
export const HeadLink = ({ onClick, children }: { onClick: () => void; children: ReactNode }) => (
  <button onClick={onClick} style={{ ...plain, height: 44, minWidth: 44, justifyContent: 'flex-end', margin: '-12px 0', padding: 0, border: 0, background: 'transparent', color: G, fontSize: 14, fontWeight: 700, textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>{children}</button>
)

/** The white tile that holds the grid: a heading, links, the tiles in fixed columns and rows, and one line under them. */
export function GridTile({ title, links, cols, rows, caption, tight = false, children }: { title: string; links?: ReactNode; cols: number; rows: number; caption: string; tight?: boolean; children: ReactNode }) {
  return (
    <section aria-label={title} style={{ ...tile, gap: tight ? 8 : 10, padding: tight ? '10px 16px' : '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 style={h2}>{title}</h2>
        <span style={{ display: 'flex', gap: 16 }}>{links}</span>
      </div>
      <div data-dash-grid="" style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0,1fr))`, gap: 10 }}>{children}</div>
      <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>{caption}</span>
    </section>
  )
}

const chip: CSSProperties = { flex: 'none', height: 22, padding: '0 8px', borderRadius: 999, boxSizing: 'border-box', background: '#ffffff', display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }

/**
 * A measure tile: the name, the state in words, the number at 38px, a bar with a black line at the aim,
 * the aim in words, and how sure the number is. Pressing it plays the clips behind the number.
 * With no film: a dash, no bar, and "Not filmed" on a white tile with a dashed edge.
 */
export function MeasureTile({ m, onPlay, tight = false }: { m: Measure; onPlay: () => void; tight?: boolean }) {
  const st = stateOf(m), look = LOOK[st], none = st === 'nofilm'
  return (
    <button data-dash-tile="" onClick={onPlay} aria-label={`${m.name}. ${look.says}. ${none ? 'No number' : m.value}, ${m.aim}.${none ? '' : ` ${m.sure}.`} Play the clips`}
      style={{ ...plain, display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 16, padding: tight ? '8px 14px' : '12px 14px', background: look.bg, border: `1px ${none ? 'dashed' : 'solid'} ${look.edge}`, minHeight: 0, minWidth: 0 }}>
      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ fontSize: 13, lineHeight: '17px', fontWeight: 700, minHeight: 34 }}>{m.name}</span>
        <span style={{ ...chip, ...(none ? { border: '1px dashed #8a9794' } : null) }}>{look.says}</span>
      </span>
      <strong style={{ ...num, fontSize: 38, lineHeight: '42px', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{none ? '–' : m.value}</strong>
      {!none && (
        <span role="img" aria-label={`${m.value}, ${m.aim}`} style={{ display: 'block', flex: 'none', alignSelf: 'stretch', position: 'relative', height: 8, borderRadius: 4, background: '#ffffff', margin: '6px 0 4px' }}>
          <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${m.fill}%`, borderRadius: 4, background: look.bar }} />
          <span style={{ position: 'absolute', left: `${m.tick}%`, top: -4, width: 2, height: 16, background: INK }} />
        </span>
      )}
      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', gap: 6, marginTop: 'auto' }}>
        <span style={{ fontSize: 12, lineHeight: '16px', color: INK }}>{m.aim}</span>
        {!none && <SureMark sure={m.sure} />}
      </span>
    </button>
  )
}

// ── 4. Right column ──────────────────────────────────────────────────────────

/** A short list: three rows at most. `grow`: the bottom list takes the room that is left. */
export function SideList({ title, link, grow = false, children }: { title: string; link?: ReactNode; grow?: boolean; children: ReactNode }) {
  return (
    <section aria-label={title} style={{ ...tile, gap: 4, padding: '12px 14px', ...(grow ? { flexGrow: 1 } : null) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={h2}>{title}</h2>{link}</div>
      {children}
    </section>
  )
}

export type WorkOn = { minute: string; title: string; line: string; value: string; sure: Sure }
/** Something to work on: the minute of its clip, a short title, one line, the number and how sure it is. Pressing it plays that clip. */
export function WorkRow({ w, onPlay, tight = false }: { w: WorkOn; onPlay: () => void; tight?: boolean }) {
  return (
    <button onClick={onPlay} aria-label={`Minute ${w.minute}. ${w.title}. ${w.line}. ${w.value}, ${w.sure}. Play the clip`} style={{ ...plain, display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) auto', gap: 10, alignItems: 'center', minHeight: tight ? 52 : 58, padding: 0, border: 0, borderTop: `1px solid ${HAIR}`, background: 'transparent' }}>
      <span style={{ height: 44, borderRadius: 12, background: STRIP, color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, lineHeight: '12px' }}>MIN<span style={{ ...num, fontSize: 16, lineHeight: '18px' }}>{w.minute}</span></span>
      <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontSize: 14, lineHeight: '18px' }}>{w.title}</strong>
        <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{w.line}</span>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        <strong style={{ ...num, fontSize: 20, lineHeight: '24px', whiteSpace: 'nowrap' }}>{w.value}</strong><SureMark sure={w.sure} />
      </span>
    </button>
  )
}

export type Tone = 'good' | 'look' | 'close'
const TONE: Record<Tone, string> = { good: PALE, look: MAUVE_PALE, close: SAND }
/** A person, a team's coach, a numbered step or an arrow, with a name and one line. */
export function PersonRow({ mark, name, line, tone, onClick }: { mark: string; name: string; line: string; tone: Tone; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ ...plain, display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, padding: 0, border: 0, borderTop: `1px solid ${HAIR}`, background: 'transparent' }}>
      <span aria-hidden="true" style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: TONE[tone], color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{mark}</span>
      <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontSize: 14, lineHeight: '18px' }}>{name}</strong>
        <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{line}</span>
      </span>
    </button>
  )
}
