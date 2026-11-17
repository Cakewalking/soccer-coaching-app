import { useState } from 'react'
import { toolTarget } from '../toolTargets'
import { useCapture, allowed, type Age } from '../capture/captureStore'
import type { ReactNode } from 'react'

// Home that tells a story (STO1–STO22). Shared four-part layout driven by a
// per-screen config. Measurements from HANDOVER-HOME.md. Amber #f4c95d only in
// the four listed places (proof small line, newest bar + number, proof main
// button, needs-you count). DM Sans, weights 400/700.

const DARK = '#1c3a33', PALE = '#a9cfc0', AMBER = '#f4c95d', INK = '#10211f'
const GREEN = '#2f6252', PALEG = '#dcefe8', BORDER = '#c5c8c4', HAIR = '#e9eae8'
const GREY = '#4a5a57', FACEBG = '#eef5f2'

type Bar = { n: string; when: string; amber?: boolean }
type StatusLine = { label: string; value: string }
type Face = { ini: string; has: boolean }
type MomentRow = { ini: string; title: string; sub: string; action: string; target?: string; done?: string }

export type FrameNavItem = { label: string; target?: string; active?: boolean }

// The "Your take" row inside the dark panel (after-game pack).
export type TakeCfg = {
  kind: 'before' | 'after' | 'miniroos' | 'miniroostraining' | 'parent'
  title: string
  sub?: string
  note?: string          // after: the coach's note, in quotes
  meta?: string[]         // after: e.g. "Used in Tuesday's plan", "9 of 14 players rated"
  score?: number          // after/miniroos: N (of 5)
  showRate?: boolean      // before: show "Rate players"
  addNoteTarget?: string  // default YT1-YourTake
  rateTarget?: string     // default YT3-PlayerNotes
  parentTarget?: string   // parent: YTp1-ParentVotes
}

export type HomeCfg = {
  id: string
  role: string            // role chip text e.g. "Coach · MiniRoos"
  team: string            // team pill text
  teamTarget?: string     // team pill opens the switcher (VS1-SwitchView)
  avatar: string          // avatar initials
  topNav: FrameNavItem[]  // top nav (Home, Squad, …) — target set = open, else existing
  subNav: FrameNavItem[]  // sub nav (Overview, Messages, …)
  ask: string
  askTarget: string
  proof: {
    label: string
    headline: string
    second: string
    bars?: Bar[]
    unit?: string
    reel?: { duration: string; chips: string[]; caption: string }  // one clickable block
    reelTarget?: string
    status?: StatusLine[]
    statusCaption?: string
    mainBtn: string
    mainTarget?: string
    mainBtnDone?: string
    outlineBtn?: string
    outlineTarget?: string
    outlineBtnDone?: string
    statusDone?: string[]   // per status line: a confirmation line (opens the list behind it)
  }
  ready: {
    when: string
    title: string
    text: string
    chips?: string[]
    pale?: string
    btn1: string
    btn1Target?: string
    btn1Done?: string
    btn2?: string
    btn2Target?: string
    btn2Done?: string
  }
  moments: {
    title: string
    link: string
    linkTarget?: string
    linkDone?: string
    faces: Face[]
    rows: MomentRow[]
    foot: string
  }
  done: { title: string; lines: string[]; next: string }
  needs: { count: number; title: string; sub?: string; target?: string }
  take?: TakeCfg
}

/** The clip preview as drawn: the move on a pitch, a play button, and how long it runs. */
function ClipThumb({ height, duration }: { height: number; duration: string }) {
  return (
    <span style={{ height, borderRadius: 12, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', color: '#fff', overflow: 'hidden' }}>
      <svg viewBox="0 0 330 92" preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5"><rect x="26" y="12" width="278" height="100" /><line x1="165" y1="12" x2="165" y2="92" /><circle cx="165" cy="46" r="58" /></g>
        <line x1="72" y1="60" x2="244" y2="64" stroke="#7fd6b5" strokeWidth="2" strokeLinecap="round" />
        <g fill="#fff"><circle cx="72" cy="60" r="5" /><circle cx="124" cy="50" r="5" /><circle cx="182" cy="53" r="5" /><circle cx="244" cy="38" r="5" /></g>
      </svg>
      <span style={{ position: 'relative', width: 40, height: 40, borderRadius: '50%', background: 'rgba(16,33,31,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
      </span>
      <span style={{ position: 'absolute', right: 10, bottom: 8, fontSize: 13, fontWeight: 700 }}>{duration}</span>
    </span>
  )
}

function Face({ ini, has }: Face) {
  return (
    <span style={{ width: 30, height: 30, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, color: has ? GREEN : GREY, background: has ? FACEBG : HAIR, opacity: has ? 1 : 0.55, boxShadow: has ? `0 0 0 2px #fff, 0 0 0 4px ${GREEN}` : undefined }}>{ini}</span>
  )
}

function Bars({ bars, unit }: { bars: Bar[]; unit?: string }) {
  return (
    <span style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
      {bars.map((b, i) => (
        <span key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 64 }}>
          <strong style={{ fontSize: b.amber ? 22 : 16, lineHeight: '24px', color: b.amber ? AMBER : PALE }}>{b.n}</strong>
          <span style={{ width: '100%', height: Math.max(8, parseInt(b.n) ? Math.round((parseInt(b.n) / Math.max(...bars.map(x => parseInt(x.n) || 1))) * 34) : 8), borderRadius: '6px 6px 0 0', background: b.amber ? AMBER : 'rgba(255,255,255,0.28)' }} />
          <span style={{ fontSize: 12, lineHeight: '16px', color: PALE, whiteSpace: 'nowrap' }}>{b.when}</span>
        </span>
      ))}
      {unit && <span style={{ alignSelf: 'center', fontSize: 13, lineHeight: '18px', color: PALE, maxWidth: 150 }}>{unit}</span>}
    </span>
  )
}

// The "Your take" row that sits inside the dark panel, full width.
function TakeRow({ take, nav, tool }: { take: TakeCfg; nav: (s: string) => void; tool: (s: string) => void }) {
  const [played, setPlayed] = useState<number | null>(take.kind === 'after' || take.kind === 'miniroos' ? (take.score ?? null) : null)
  const addNote = take.addNoteTarget ?? 'YT1-YourTake'
  const rate = take.rateTarget ?? 'YT3-PlayerNotes'
  const iconDone = played != null || take.kind === 'after' || take.kind === 'miniroos'

  const circle = (
    <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {iconDone
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
        : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>}
    </span>
  )
  const clearBtn: React.CSSProperties = { height: 44, padding: '0 14px', borderRadius: 10, background: 'transparent', border: `1px solid ${PALE}`, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }
  const square = (n: number): React.CSSProperties => ({ width: 44, height: 44, borderRadius: 12, border: `1px solid ${PALE}`, background: played === n ? '#fff' : 'transparent', color: played === n ? INK : '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' })

  const title = (t: string, s?: string) => (
    <span style={{ minWidth: 0 }}>
      <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#fff' }}>{t}</span>
      {s && <span style={{ display: 'block', fontSize: 14, color: PALE, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s}</span>}
    </span>
  )

  let right: React.ReactNode = null
  if (take.kind === 'parent') {
    right = <button onClick={() => nav(take.parentTarget ?? 'YTp1-ParentVotes')} style={{ ...clearBtn, background: AMBER, border: 'none', color: INK }}>Rate the game</button>
  } else if (take.kind === 'miniroostraining') {
    right = <span style={{ display: 'flex', gap: 8 }}><button onClick={() => nav(addNote)} style={clearBtn}>Open the taps</button><button onClick={() => nav(addNote)} style={clearBtn}>Add a note</button></span>
  } else if (take.kind === 'after') {
    right = <span style={{ display: 'flex', gap: 8 }}><button onClick={() => nav(addNote)} style={clearBtn}>Edit</button><button onClick={() => nav(rate)} style={clearBtn}>Rate the rest</button></span>
  } else if (take.kind === 'miniroos') {
    right = <span style={{ display: 'flex', gap: 8 }}><button onClick={() => nav(addNote)} style={clearBtn}>Change them</button><button onClick={() => nav(addNote)} style={clearBtn}>Add a note</button>{take.showRate !== false && <button onClick={() => nav(rate)} style={clearBtn}>Rate players</button>}</span>
  } else {
    // before: 1–5 squares then buttons; once tapped, show saved + buttons
    right = (
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13, color: PALE, whiteSpace: 'nowrap' }}>How did we play?</span>
        <span style={{ display: 'flex', gap: 6 }}>{[1, 2, 3, 4, 5].map(n => <button key={n} onClick={() => { setPlayed(n); tool(`How did we play? ${n} of 5. Saved.`) }} style={square(n)}>{n}</button>)}</span>
        <button onClick={() => nav(addNote)} style={clearBtn}>Add a note</button>
        {take.showRate && <button onClick={() => nav(rate)} style={clearBtn}>Rate players</button>}
      </span>
    )
  }

  // after-state content differs: show the note + meta when a take exists
  const showAfterText = take.kind === 'after' || take.kind === 'miniroos'
  return (
    <div style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(255,255,255,0.16)', marginTop: 10, paddingTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
      {circle}
      <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {title(played != null && take.kind === 'before' ? `Your take · ${played} of 5` : take.title, take.sub)}
        {showAfterText && take.note && <span style={{ fontSize: 14, color: PALE, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>“{take.note}”</span>}
        {showAfterText && take.meta && <span style={{ fontSize: 13, color: PALE }}>{take.meta.join(' · ')}</span>}
      </span>
      {right}
    </div>
  )
}

function ProofInner({ p, take, nav, tool }: { p: HomeCfg['proof']; take?: TakeCfg; nav: (s: string) => void; tool: (s: string) => void }) {
  const mainBtn: React.CSSProperties = { height: 46, padding: '0 18px', borderRadius: 12, fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, border: 'none', background: AMBER, color: INK, cursor: 'pointer', fontFamily: 'inherit' }
  const outBtn: React.CSSProperties = { height: 46, padding: '0 18px', borderRadius: 12, fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: `1px solid ${PALE}`, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 28, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER }}>{p.label}</span>
        <h1 style={{ margin: 0, fontSize: 27, lineHeight: '34px', letterSpacing: '-0.02em', color: '#fff', fontWeight: 700 }}>{p.headline}</h1>
        <span style={{ fontSize: 15, lineHeight: '21px', color: PALE }}>{p.second}</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 4, gap: 16 }}>
          {p.bars ? <Bars bars={p.bars} unit={p.unit} /> : <span />}
          <span style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <button onClick={() => p.mainTarget ? nav(p.mainTarget) : tool(p.mainBtnDone ?? p.mainBtn)} style={mainBtn}>{p.mainBtn}</button>
            {p.outlineBtn && <button onClick={() => p.outlineTarget ? nav(p.outlineTarget) : tool(p.outlineBtnDone ?? p.outlineBtn!)} style={outBtn}>{p.outlineBtn}</button>}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {p.reel ? (
          <button onClick={() => p.reelTarget ? nav(p.reelTarget) : tool(p.reel!.caption)} style={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
            <ClipThumb height={132} duration={p.reel.duration} />
            <span style={{ display: 'flex', gap: 6 }}>
              {p.reel.chips.map(c => <span key={c} style={{ flex: 1, height: 30, borderRadius: 6, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{c}</span>)}
            </span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: PALE }}>{p.reel.caption}</span>
          </button>
        ) : p.status ? (
          <>
            {p.status.map((s, i) => (
              <button key={s.label} onClick={() => tool(p.statusDone?.[i] ?? `${s.label}: ${s.value}. Opening the list behind it.`)} style={{ minHeight: 44, padding: '0 12px', borderRadius: 10, background: 'rgba(255,255,255,0.10)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                <span style={{ color: PALE }}>{s.label}</span><strong>{s.value}</strong>
              </button>
            ))}
            {p.statusCaption && <span style={{ fontSize: 13, lineHeight: '18px', color: PALE }}>{p.statusCaption}</span>}
          </>
        ) : null}
      </div>
      {take && <TakeRow take={take} nav={nav} tool={tool} />}
    </div>
  )
}

function CardShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', minHeight: 0, ...style }}>{children}</div>
}

function ReadyCard({ r, nav, tool }: { r: HomeCfg['ready']; nav: (s: string) => void; tool: (s: string) => void }) {
  return (
    <div style={{ background: GREEN, border: `1px solid ${GREEN}`, borderRadius: 16, padding: '14px 16px', color: '#fff', display: 'flex', flexDirection: 'column', gap: 7, overflow: 'hidden' }}>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em' }}>{r.when}</span>
      <strong style={{ fontSize: 22, lineHeight: '27px', letterSpacing: '-0.01em' }}>{r.title}</strong>
      <span style={{ fontSize: 14, lineHeight: '20px' }}>{r.text}</span>
      {r.chips && <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{r.chips.map(c => <span key={c} style={{ height: 28, padding: '0 10px', borderRadius: 999, background: 'rgba(255,255,255,0.18)', display: 'inline-flex', alignItems: 'center', fontSize: 13, fontWeight: 700 }}>{c}</span>)}</span>}
      {r.pale && <span style={{ fontSize: 13, lineHeight: '18px', color: PALEG, marginTop: 'auto' }}>{r.pale}</span>}
      <span style={{ display: 'flex', gap: 8, marginTop: r.pale ? 0 : 'auto' }}>
        <button onClick={() => r.btn1Target ? nav(r.btn1Target) : tool(r.btn1Done ?? r.btn1)} style={{ flex: 1, height: 46, borderRadius: 12, background: '#fff', color: INK, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{r.btn1}</button>
        {r.btn2 && <button onClick={() => r.btn2Target ? nav(r.btn2Target) : tool(r.btn2Done ?? r.btn2!)} style={{ height: 46, padding: '0 16px', borderRadius: 12, background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.6)', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{r.btn2}</button>}
      </span>
    </div>
  )
}

function MomentsCard({ m, nav, tool }: { m: HomeCfg['moments']; nav: (s: string) => void; tool: (s: string) => void }) {
  return (
    <CardShell style={{ gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <strong style={{ fontSize: 17, lineHeight: '23px' }}>{m.title}</strong>
        <button onClick={() => m.linkTarget ? nav(m.linkTarget) : tool(m.linkDone ?? m.link)} style={{ minHeight: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700, color: GREEN, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>{m.link}</button>
      </div>
      <div style={{ display: 'flex', gap: 4, padding: '4px 0 6px', overflow: 'hidden' }}>{m.faces.map((f, i) => <Face key={i} {...f} />)}</div>
      {m.rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', minHeight: 54, borderTop: `1px solid ${HAIR}`, paddingTop: 8 }}>
          <span style={{ width: 32, height: 32, borderRadius: '50%', background: FACEBG, color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{row.ini}</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, lineHeight: '20px', fontWeight: 700, color: INK }}>{row.title}</div>
            <div style={{ fontSize: 13, lineHeight: '18px', color: GREY }}>{row.sub}</div>
          </span>
          <button onClick={() => row.target ? nav(row.target) : tool(row.done ?? `${row.action} done.`)} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>{row.action}</button>
        </div>
      ))}
      <span style={{ fontSize: 14, lineHeight: '20px', color: GREY, marginTop: 'auto', borderTop: `1px solid ${HAIR}`, paddingTop: 8 }}>{m.foot}</span>
    </CardShell>
  )
}

function RightColumn({ done, needs, nav, tool }: { done: HomeCfg['done']; needs: HomeCfg['needs']; nav: (s: string) => void; tool: (s: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
      <CardShell style={{ gap: 7, flex: 1 }}>
        <strong style={{ fontSize: 17, lineHeight: '23px' }}>{done.title}</strong>
        {done.lines.map((l, i) => (
          <span key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 14, lineHeight: '19px' }}>
            <span style={{ flexShrink: 0, display: 'flex', marginTop: 1 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg></span>
            <span>{l}</span>
          </span>
        ))}
        <span style={{ fontSize: 14, lineHeight: '20px', color: GREY, marginTop: 'auto' }}>{done.next}</span>
      </CardShell>
      {needs.count > 0 ? (
        <button onClick={() => needs.target ? nav(needs.target) : tool('needs')} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
          <span style={{ width: 40, height: 40, borderRadius: '50%', background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, flexShrink: 0 }}>{needs.count}</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, lineHeight: '20px', fontWeight: 700, color: INK }}>{needs.title}</div>
            {needs.sub && <div style={{ fontSize: 13, lineHeight: '18px', color: GREY }}>{needs.sub}</div>}
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GREY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      ) : (
        <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '12px 16px', fontSize: 15, fontWeight: 700, color: GREY }}>Nothing needs you</div>
      )}
    </div>
  )
}

function Frame({ cfg, nav, tool, children }: { cfg: HomeCfg; nav: (s: string) => void; tool: (s: string) => void; children: React.ReactNode }) {
  const tnb = (it: FrameNavItem): React.CSSProperties => ({ height: 56, padding: '0 12px', background: it.active ? 'rgba(255,255,255,0.14)' : 'none', color: it.active ? '#fff' : 'rgba(255,255,255,0.75)', border: 'none', borderRadius: it.active ? 10 : 0, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 })
  const snb = (it: FrameNavItem): React.CSSProperties => ({ height: 44, minWidth: 44, padding: '0 10px', background: 'none', color: it.active ? GREEN : GREY, borderBottom: it.active ? `2px solid ${GREEN}` : '2px solid transparent', border: 'none', fontSize: 13, fontWeight: it.active ? 700 : 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 })
  const click = (it: FrameNavItem) => () => it.target ? nav(it.target) : tool(it.label)
  return (
    <div data-lasttool="" style={{ width: 1180, minHeight: 820, background: '#f4f6f5', fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: DARK, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16 }}>Clean Sheet</span>
        {cfg.topNav.map(it => <button key={it.label} onClick={click(it)} style={tnb(it)}>{it.label}</button>)}
        <div style={{ flex: 1 }} />
        <button onClick={() => cfg.teamTarget ? nav(cfg.teamTarget) : tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12 }}>{cfg.team}</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#b9777a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>{cfg.avatar}</div>
      </nav>
      <nav style={{ background: '#fff', borderBottom: `1px solid ${HAIR}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        {cfg.subNav.map(it => <button key={it.label} onClick={click(it)} style={snb(it)}>{it.label}</button>)}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: GREY, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>{cfg.role}
        </span>
      </nav>
      {children}
    </div>
  )
}

// ---- Phone (STO16–STO22) ----
export type PhoneTab = { label: string; target?: string; done?: string }
export type PhoneBtn = { label: string; target?: string; done?: string }
export type PhoneBlock =
  | { kind: 'proof'; label: string; headline: string; second: string; bars?: Bar[]; unit?: string; clip?: { duration: string; note: string }; btn: string; btnTarget?: string; btnDone?: string }
  | { kind: 'ready'; when?: string; title: string; text: string; btns: PhoneBtn[] }
  | { kind: 'list'; label?: string; title: string; text?: string; lines?: string[]; action?: string; actionTarget?: string; /** shown only where this age band has "Show team numbers to families" on */ familiesBand?: Age }
  | { kind: 'done'; title: string; lines: string[] }
  | { kind: 'needs'; count: number; title: string; target?: string }
  | { kind: 'note'; text: string }
export type PhoneCfg = { id: string; roleLine: string; greeting: string; avatar: string; tabs: PhoneTab[]; blocks: PhoneBlock[] }

export function HomeStoryPhone({ cfg, onNav, renderTarget }: { cfg: PhoneCfg; onNav?: (s: string) => void; renderTarget?: (id: string) => ReactNode }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(null)
  const cap = useCapture()   // the club's rules decide which family blocks show
  const tool = (s: string) => { const to = toolTarget(s); if (to && onNav) { onNav(to); return } setLastTool(s); setToast(s); setTimeout(() => setToast(null), 2200) }
  const nav = (s: string) => renderTarget ? setOpen(s) : (onNav ? onNav(s) : tool(s))
  if (open && renderTarget) return (
    <div style={{ width: 390, minHeight: 844, margin: '0 auto', background: '#f4f5f3', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px 16px', borderBottom: `1px solid ${HAIR}`, background: '#fff', flexShrink: 0 }}>
        <button onClick={() => setOpen(null)} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back to Home
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>{renderTarget(open)}</div>
    </div>
  )
  const amberBtn: React.CSSProperties = { height: 46, borderRadius: 12, border: 'none', background: AMBER, color: INK, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }
  return (
    <div data-lasttool={lastTool} style={{ width: 390, minHeight: 844, background: '#f4f5f3', fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column' }}>
      {/* Green bar with the greeting, as drawn on every phone home */}
      <header style={{ background: GREEN, padding: '12px 16px 14px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)' }}>{cfg.roleLine}</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{cfg.greeting}</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#cbbeb5', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{cfg.avatar}</div>
      </header>
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {cfg.blocks.map((b, i) => {
          if (b.kind === 'list' && b.familiesBand && !allowed(cap, b.familiesBand).families) return null
          if (b.kind === 'proof') return (
            <div key={i} style={{ background: DARK, borderRadius: 18, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, color: '#fff' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: AMBER }}>{b.label}</span>
              <strong style={{ fontSize: 20, lineHeight: '26px', letterSpacing: '-0.01em' }}>{b.headline}</strong>
              <span style={{ fontSize: 14, lineHeight: '19px', color: PALE }}>{b.second}</span>
              {b.bars && <div style={{ padding: '4px 0' }}><Bars bars={b.bars} unit={b.unit} /></div>}
              {b.clip && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <ClipThumb height={92} duration={b.clip.duration} />
                  <span style={{ fontSize: 12, lineHeight: '16px', color: PALE }}>{b.clip.note}</span>
                </div>
              )}
              <button onClick={() => b.btnTarget ? nav(b.btnTarget) : tool(b.btnDone ?? b.btn)} style={amberBtn}>{b.btn}</button>
            </div>
          )
          if (b.kind === 'ready') return (
            <div key={i} style={{ background: GREEN, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 5, color: '#fff' }}>
              {b.when && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>{b.when}</span>}
              <strong style={{ fontSize: 18, lineHeight: '23px' }}>{b.title}</strong>
              <span style={{ fontSize: 13, lineHeight: '18px' }}>{b.text}</span>
              <span style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                {b.btns.map((t, j) => <button key={t.label} onClick={() => t.target ? nav(t.target) : tool(t.done ?? t.label)} style={{ flex: j === 0 ? 1 : undefined, height: 46, padding: '0 16px', borderRadius: 12, border: j === 0 ? 'none' : '1px solid rgba(255,255,255,0.6)', background: j === 0 ? '#fff' : 'transparent', color: j === 0 ? INK : '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{t.label}</button>)}
              </span>
            </div>
          )
          if (b.kind === 'list') return (
            <div key={i} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {b.label && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: GREY }}>{b.label}</span>}
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>{b.title}</strong>
              {b.text && <span style={{ fontSize: 14, lineHeight: '19px', color: GREY }}>{b.text}</span>}
              {b.lines?.map(l => <span key={l} style={{ display: 'flex', gap: 8, fontSize: 14, lineHeight: '19px' }}><span style={{ flexShrink: 0, display: 'flex', marginTop: 1 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg></span><span>{l}</span></span>)}
              {b.action && <button onClick={() => b.actionTarget ? nav(b.actionTarget) : tool(b.action!)} style={{ minHeight: 44, borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit', marginTop: 2 }}>{b.action}</button>}
            </div>
          )
          if (b.kind === 'done') return (
            <div key={i} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>{b.title}</strong>
              {b.lines.map(l => <span key={l} style={{ display: 'flex', gap: 8, fontSize: 14, lineHeight: '19px' }}><span style={{ flexShrink: 0, display: 'flex', marginTop: 1 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg></span><span>{l}</span></span>)}
            </div>
          )
          if (b.kind === 'needs') return (
            <button key={i} onClick={() => b.target ? nav(b.target) : tool(b.title)} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '12px 14px', minHeight: 44, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{b.count}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: INK }}>{b.title}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GREY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          )
          return <span key={i} style={{ fontSize: 13, lineHeight: '18px', color: GREY }}>{b.text}</span>
        })}
      </div>
      <nav style={{ background: '#fff', borderTop: `1px solid ${HAIR}`, display: 'flex', flexShrink: 0 }}>
        {cfg.tabs.map((t, i) => (
          // First tab is Home: the story home IS the home, so stay here — never open the old home screen as a layer.
          <button key={t.label} onClick={() => i === 0 ? setOpen(null) : (t.target ? nav(t.target) : tool(t.done ?? t.label))} style={{ flex: 1, minHeight: 56, background: 'none', border: 'none', fontSize: 12, fontWeight: i === 0 ? 700 : 600, color: i === 0 ? GREEN : GREY, cursor: 'pointer', fontFamily: 'inherit' }}>{t.label}</button>
        ))}
      </nav>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '10px 16px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 13, fontWeight: 600, maxWidth: 340 }}>{toast}</div>}
    </div>
  )
}

export function HomeStoryTablet({ cfg, onNav }: { cfg: HomeCfg; onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const nav = (s: string) => onNav?.(s)
  const tool = (s: string) => { setLastTool(s); setToast(s); setTimeout(() => setToast(null), 2500) }
  return (
    <div data-lasttool={lastTool}>
      <Frame cfg={cfg} nav={nav} tool={tool}>
        <div style={{ padding: '14px 28px 0' }}>
          <button onClick={() => nav(cfg.askTarget)} style={{ width: '100%', height: 52, borderRadius: 14, border: `1px solid ${HAIR}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={GREEN} aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z" /></svg>
            <span style={{ fontSize: 15, color: GREY }}>{cfg.ask}</span>
          </button>
        </div>
        <div style={{ padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.08fr) 300px', gridTemplateRows: 'auto minmax(0,1fr)', flex: 1 }}>
          <div style={{ gridColumn: '1 / 4', background: DARK, borderRadius: 20, padding: cfg.take ? '14px 24px' : '18px 24px' }}>
            <ProofInner p={cfg.proof} take={cfg.take} nav={nav} tool={tool} />
          </div>
          <ReadyCard r={cfg.ready} nav={nav} tool={tool} />
          <MomentsCard m={cfg.moments} nav={nav} tool={tool} />
          <RightColumn done={cfg.done} needs={cfg.needs} nav={nav} tool={tool} />
        </div>
      </Frame>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600 }}>{toast}</div>}
    </div>
  )
}

// Back bar shown above a target screen opened from a Home deep-link.
function TargetShell({ onBack, children }: { onBack: () => void; children: ReactNode }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#f4f6f5' }}>
      <div style={{ padding: '10px 28px', borderBottom: `1px solid ${HAIR}`, background: '#fff', flexShrink: 0 }}>
        <button onClick={onBack} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: `1px solid ${BORDER}`, background: '#fff', fontSize: 13, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back to Home
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>{children}</div>
    </div>
  )
}

// Content-only Home (ask line + four-part grid) for dropping inside a role's
// existing frame (the role app supplies the top/sub nav and Ask panel).
export function HomeStoryBody({ cfg, onNav, renderTarget, frameNav }: { cfg: HomeCfg; onNav?: (s: string) => void; renderTarget?: (id: string) => ReactNode; frameNav?: (id: string) => boolean }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(null)
  // Deep-links first try the surrounding role frame (switch its real tab, lit in the top bar).
  // Only targets the frame can't place fall back to the in-place layer.
  const nav = (s: string) => { if (frameNav?.(s)) return; renderTarget ? setOpen(s) : (onNav ? onNav(s) : tool(s)) }
  const tool = (s: string) => { setLastTool(s); setToast(s); setTimeout(() => setToast(null), 2500) }
  if (open && renderTarget) return <TargetShell onBack={() => setOpen(null)}>{renderTarget(open)}</TargetShell>
  return (
    <div data-lasttool={lastTool} style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f4f6f5', fontFamily: "'DM Sans',system-ui,sans-serif", overflowY: 'auto' }}>
      <AskLine cfg={cfg} nav={nav} />
      <div style={{ padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.08fr) 300px', gridTemplateRows: 'auto minmax(0,1fr)', flex: 1 }}>
        <div style={{ gridColumn: '1 / 4', background: DARK, borderRadius: 20, padding: cfg.take ? '14px 24px' : '18px 24px' }}>
          <ProofInner p={cfg.proof} take={cfg.take} nav={nav} tool={tool} />
        </div>
        <ReadyCard r={cfg.ready} nav={nav} tool={tool} />
        <MomentsCard m={cfg.moments} nav={nav} tool={tool} />
        <RightColumn done={cfg.done} needs={cfg.needs} nav={nav} tool={tool} />
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600 }}>{toast}</div>}
    </div>
  )
}

function AskLine({ cfg, nav }: { cfg: HomeCfg; nav: (s: string) => void }) {
  return (
    <div style={{ padding: '14px 28px 0' }}>
      <button onClick={() => nav(cfg.askTarget)} style={{ width: '100%', height: 52, borderRadius: 14, border: `1px solid ${HAIR}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={GREEN} aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z" /></svg>
        <span style={{ fontSize: 15, color: GREY }}>{cfg.ask}</span>
      </button>
    </div>
  )
}

const outlineBtnDark: React.CSSProperties = { height: 46, padding: '0 18px', borderRadius: 12, fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: `1px solid ${PALE}`, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }
const amberBtnDark: React.CSSProperties = { height: 46, padding: '0 18px', borderRadius: 12, fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, border: 'none', background: AMBER, color: INK, cursor: 'pointer', fontFamily: 'inherit' }

// STO2 — MiniRoos training-day Home (bespoke proof + "Saturday in 40 seconds" card)
export function HomeStoryMiniRoosTraining({ cfg, onNav }: { cfg: HomeCfg; onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const nav = (s: string) => onNav?.(s)
  const tool = (s: string) => { setLastTool(s); setToast(s); setTimeout(() => setToast(null), 2500) }
  const games = ['5:00 · Traffic lights dribble', '5:10 · Treasure island', '5:20 · Gates galore', '5:30 · 4 v 4, four goals']
  return (
    <div data-lasttool={lastTool}>
      <Frame cfg={cfg} nav={nav} tool={tool}>
        <AskLine cfg={cfg} nav={nav} />
        <div style={{ padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.08fr) 300px', gridTemplateRows: 'auto minmax(0,1fr)', flex: 1 }}>
          <div style={{ gridColumn: '1 / 4', background: DARK, borderRadius: 20, padding: cfg.take ? '14px 24px' : '18px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 28, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER }}>TONIGHT · 5:00 pm · WATTLE CREEK RESERVE</span>
                <h1 style={{ margin: 0, fontSize: 27, lineHeight: '34px', letterSpacing: '-0.02em', color: '#fff', fontWeight: 700 }}>Four games, ready. Tonight is about finding a friend in space.</h1>
                <span style={{ fontSize: 15, lineHeight: '21px', color: PALE }}>Built from Saturday, when they bunched round the ball. 8 are coming, 2 still to answer.</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
                  {games.map(g => <span key={g} style={{ height: 30, padding: '0 12px', borderRadius: 8, background: 'rgba(255,255,255,0.10)', display: 'inline-flex', alignItems: 'center', fontSize: 13, color: '#fff' }}>{g}</span>)}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <button onClick={() => nav('HM3-TrainingMiniRoos')} style={amberBtnDark}>Start tonight</button>
                  <button onClick={() => nav('SGm1-SuggestedMiniRoos')} style={outlineBtnDark}>Swap a game</button>
                </div>
              </div>
              <button onClick={() => nav('RCm2-MiniRoosClips')} style={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <span style={{ height: 132, borderRadius: 12, background: 'rgba(255,255,255,0.10)', border: `1px solid ${PALE}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ opacity: 0.85 }}><path d="M8 5l11 7-11 7z" /></svg>
                  <span style={{ position: 'absolute', left: 10, bottom: 10, fontSize: 12, fontWeight: 700, background: 'rgba(0,0,0,0.35)', padding: '2px 8px', borderRadius: 6 }}>0:25</span>
                </span>
                <span style={{ display: 'flex', gap: 6 }}>{['Bunching', 'Space', 'A friend'].map(c => <span key={c} style={{ flex: 1, height: 30, borderRadius: 6, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{c}</span>)}</span>
                <span style={{ fontSize: 13, lineHeight: '18px', color: PALE }}>Why tonight: 25 seconds of Saturday’s bunching, to watch before you go.</span>
              </button>
            </div>
            {cfg.take && <TakeRow take={cfg.take} nav={nav} tool={tool} />}
          </div>
          {/* Saturday in 40 seconds card */}
          <div style={{ background: GREEN, border: `1px solid ${GREEN}`, borderRadius: 16, padding: '14px 16px', color: '#fff', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <strong style={{ fontSize: 22, lineHeight: '27px', letterSpacing: '-0.01em' }}>Saturday in 40 seconds</strong>
            <button onClick={() => nav('RCm2-MiniRoosClips')} style={{ height: 92, borderRadius: 12, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', fontFamily: 'inherit' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
              <span style={{ position: 'absolute', left: 10, bottom: 8, fontSize: 12, fontWeight: 700, background: 'rgba(0,0,0,0.35)', padding: '2px 8px', borderRadius: 6 }}>0:40</span>
            </button>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>Seven of ten took a player on. A month ago it was three.</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: PALEG }}>Brave with the ball: keep. Finding a friend: tonight.</span>
            <span style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button onClick={() => nav('MS3-MiniRoosReview')} style={{ flex: 1, height: 46, borderRadius: 12, background: '#fff', color: INK, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>What we saw</button>
              <button onClick={() => nav('RCm1-RecordMiniRoos')} style={{ height: 46, padding: '0 16px', borderRadius: 12, background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.6)', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Film tonight</button>
            </span>
          </div>
          <MomentsCard m={cfg.moments} nav={nav} tool={tool} />
          <RightColumn done={cfg.done} needs={cfg.needs} nav={nav} tool={tool} />
        </div>
      </Frame>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600 }}>{toast}</div>}
    </div>
  )
}

// STO3 — MiniRoos never-filmed Home (bespoke proof with taps + photos, + "See them do it")
export function HomeStoryMiniRoosNoFilm({ cfg, onNav }: { cfg: HomeCfg; onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const nav = (s: string) => onNav?.(s)
  const tool = (s: string) => { setLastTool(s); setToast(s); setTimeout(() => setToast(null), 2500) }
  const notes = ['Brave with the ball · keep', 'Six different kids had a shot · keep', 'Bunching round the ball · Tuesday']
  return (
    <div data-lasttool={lastTool}>
      <Frame cfg={cfg} nav={nav} tool={tool}>
        <AskLine cfg={cfg} nav={nav} />
        <div style={{ padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.08fr) 300px', gridTemplateRows: 'auto minmax(0,1fr)', flex: 1 }}>
          <div style={{ gridColumn: '1 / 4', background: DARK, borderRadius: 20, padding: '18px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 28, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER }}>SATURDAY AT NORTHGATE CITY · FROM YOUR THREE TAPS</span>
                <h1 style={{ margin: 0, fontSize: 27, lineHeight: '34px', letterSpacing: '-0.02em', color: '#fff', fontWeight: 700 }}>You worked on being brave with the ball. On Saturday you saw lots of them take a player on.</h1>
                <span style={{ fontSize: 15, lineHeight: '21px', color: PALE }}>That is three Saturdays running you have tapped it. No score kept.</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
                  {notes.map(n => <span key={n} style={{ fontSize: 14, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ display: 'flex' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={PALE} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg></span>{n}</span>)}
                </div>
                <div style={{ marginTop: 6 }}>
                  <button onClick={() => nav('MS3-MiniRoosReview')} style={amberBtnDark}>What we saw</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button onClick={() => nav('RCm1-RecordMiniRoos')} style={{ height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.10)', border: `1px solid ${PALE}`, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add a photo</button>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['From Rob', 'From Linh', 'Add yours'].map(c => <span key={c} style={{ flex: 1, height: 44, borderRadius: 8, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{c}</span>)}
                </div>
                <span style={{ fontSize: 13, lineHeight: '18px', color: PALE }}>Two photos from parents, checked against consent. Film one game on any phone or camera and this becomes a 40-second reel of the children doing it.</span>
              </div>
            </div>
          </div>
          <ReadyCard r={cfg.ready} nav={nav} tool={tool} />
          <MomentsCard m={cfg.moments} nav={nav} tool={tool} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
            <CardShell style={{ gap: 7 }}>
              <strong style={{ fontSize: 17, lineHeight: '23px' }}>{cfg.done.title}</strong>
              {cfg.done.lines.map((l, i) => (
                <span key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 14, lineHeight: '19px' }}>
                  <span style={{ flexShrink: 0, display: 'flex', marginTop: 1 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg></span>
                  <span>{l}</span>
                </span>
              ))}
            </CardShell>
            <button onClick={() => nav('RCm1-RecordMiniRoos')} style={{ background: FACEBG, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px', color: INK }}>See them do it</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: GREY }}>Prop a phone on the fence for one game. You get a reel, a clip for each child, and proof of what changed.</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: GREEN, marginTop: 2 }}>How filming works</span>
            </button>
            {cfg.needs.count > 0 && (
              <button onClick={() => cfg.needs.target ? nav(cfg.needs.target) : tool('needs')} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, flexShrink: 0 }}>{cfg.needs.count}</span>
                <span style={{ flex: 1, fontSize: 15, lineHeight: '20px', fontWeight: 700, color: INK }}>{cfg.needs.title}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GREY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            )}
          </div>
        </div>
      </Frame>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600 }}>{toast}</div>}
    </div>
  )
}
