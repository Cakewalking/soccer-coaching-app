// The player that leads Learn to coach: the home, every lesson and the phone (learn-to-coach-v3, 1b).
// It plays in the page. Its chapters are built from what exists for that lesson and that coach:
// "Your team" (the coach's own clip), the lesson drawn, then "Try it" as a still with its button.
// No film is made yet, so there is no "The film" chapter: the player runs what exists and says "Film coming".

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'
import { G, INK } from '../capture/marks'
import type { Lesson } from './course'

export type Frame = 'team' | 'drawn' | 'figure'
/** `frame` is what is drawn while it plays: the coach's own team, the practice square, or a library clip. `slow` plays it at half speed. */
export type Chapter = { key: string; frame?: Frame; label: string; short: string; secs: number; lines: string[]; slow?: boolean }
export type PlayerHandle = { play: (key: string) => void }
const frameOf = (c: Chapter): Frame => c.frame ?? (c.key === 'team' ? 'team' : 'drawn')
type TryCard = { heading: string; at: string; task: string; button: string; done: boolean; onAdd: () => void }

/** What this lesson can play for this coach. `drawnLabel` is "The idea, drawn" on a lesson and "The set-up, drawn" on the home. */
export function chaptersFor(l: Lesson, hasClip: boolean, drawnLabel = 'The idea, drawn'): Chapter[] {
  const lines = [l.idea, ...l.steps]
  return [
    ...(hasClip && l.own_team_clip ? [{ key: 'team' as const, label: 'Your team', short: 'Your team', secs: 11, lines: [l.own_team_clip.example_caption] }] : []),
    { key: 'drawn' as const, label: drawnLabel, short: 'Drawn', secs: lines.length * 10, lines },
  ]
}
export const lengthOf = (ch: Chapter[]) => ch.reduce((a, c) => a + c.secs, 0)
export const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

const W = '#ffffff'
/** The coach's own clip, as the clips are drawn everywhere in the app: the pitch, both sides, the player it is about. */
function TeamFrame({ t }: { t: number }) {
  const f = (t % 3) / 3, pulse = 7 + Math.sin(t * 3) * 0.8
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Your own team, drawn from the game film" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'block' }}>
      <rect width="160" height="90" fill="#3d7a5f" /><rect x="8" y="7" width="144" height="76" fill="none" stroke={W} strokeWidth="0.8" opacity="0.7" /><path d="M80 7v76" stroke={W} strokeWidth="0.8" opacity="0.7" /><circle cx="80" cy="45" r="11" fill="none" stroke={W} strokeWidth="0.8" opacity="0.7" />
      {[[30, 30], [34, 60], [52, 45], [70, 24], [66, 66]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#faf5ec" stroke={INK} strokeWidth="0.5" />)}
      {[[60, 40], [84, 52], [98, 30], [104, 62]].map(([x, y], i) => <circle key={`${x}-${y}`} cx={x + Math.sin(t + i) * 1.2} cy={y + Math.cos(t * 0.8 + i) * 1.2} r="2.6" fill={INK} />)}
      <circle cx="52" cy="45" r={pulse} fill="none" stroke={W} strokeWidth="1.2" /><path d="M60 28l22-8" stroke={W} strokeWidth="1" strokeDasharray="2 2" />
      <circle cx={55.5 + f * 4} cy={46.5 - f * 2} r="1.3" fill={W} />
    </svg>)
}
/** The lesson drawn: the practice square, the ball moving round it. */
function DrawnFrame({ t, thumb }: { t: number; thumb?: boolean }) {
  const f = (t % 4) / 4, first = f < 0.5, g = first ? f * 2 : (f - 0.5) * 2
  const bx = first ? 84 + 25 * g : 109 - 25 * g, by = first ? 19 + 22 * g : 49 + 22 * g
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" role="img" aria-label="The practice, drawn" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'block' }}>
      <rect width="160" height="90" fill={G} /><rect x="48" y="16" width="64" height="58" fill="none" stroke={W} strokeWidth="1" opacity="0.8" />
      {[[80, 16], [112, 45], [80, 74], [48, 45]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.6" fill={W} />)}
      <circle cx={74 + Math.sin(t * 1.3) * 3} cy={41 + Math.cos(t) * 2} r="3.6" fill="none" stroke={W} strokeWidth="1.2" /><circle cx={88 + Math.cos(t * 1.1) * 3} cy={50 + Math.sin(t) * 2} r="3.6" fill="none" stroke={W} strokeWidth="1.2" />
      <path d="M84 19l25 22" stroke={W} strokeWidth="1" /><path d="M109 49L84 71" stroke={W} strokeWidth="1" strokeDasharray="2.5 2.5" />
      {!thumb && <circle cx={bx} cy={by} r="1.8" fill="#10211f" stroke={W} strokeWidth="0.6" />}
    </svg>)
}

/** A clip from the library: one child with a ball in front, the group behind. A stand-in until the clip is filmed. */
function FigureFrame({ t }: { t: number }) {
  const sway = Math.sin(t * 2) * 1.5, ball = 44 + ((t * 6) % 12)
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A clip from the library, drawn" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'block' }}>
      <rect width="160" height="90" fill="#24493d" /><rect y="40" width="160" height="50" fill="#3d7a5f" /><path d="M0 40h160" stroke={W} strokeWidth="0.6" opacity="0.5" /><path d="M16 90l34-50M150 90l-38-50" stroke={W} strokeWidth="0.5" opacity="0.35" />
      <g fill={INK}><circle cx={30 + sway} cy="36" r="4.4" /><rect x={25.5 + sway} y="41" width="9" height="16" rx="3" /><rect x={26 + sway} y="56" width="3" height="12" /><rect x={31 + sway} y="56" width="3" height="12" /></g>
      {[[70, 44], [82, 47], [96, 43], [108, 46], [88, 54]].map(([x, y], i) => <g key={x} fill={i === 4 ? '#c9cdc9' : W}><circle cx={x} cy={y - 5} r="1.6" /><rect x={x - 1.6} y={y - 3} width="3.2" height="6" rx="1" /></g>)}
      <circle cx={ball} cy="68" r="1.6" fill={W} />
    </svg>)
}
const draw = (f: Frame, t: number, thumb = false) => f === 'team' ? <TeamFrame t={t} /> : f === 'figure' ? <FigureFrame t={t} /> : <DrawnFrame t={t} thumb={thumb} />

/** A small still with its length, for "Up next" and the shelves. `wide` fills the card it sits in. */
export function Thumb({ kind, len, wide }: { kind: Frame; len: number | string; wide?: boolean }) {
  return (
    <span style={{ flex: 'none', position: 'relative', width: wide ? '100%' : 124, height: wide ? undefined : 70, aspectRatio: wide ? '16 / 9' : undefined, borderRadius: 10, overflow: 'hidden', background: '#1b1d1d', display: 'block' }}>
      {draw(kind, 0, true)}
      <span style={{ position: 'absolute', right: 5, bottom: 5, background: INK, color: W, borderRadius: 5, padding: '0 5px', fontSize: 11, lineHeight: '17px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{typeof len === 'number' ? clock(len) : len}</span>
    </span>)
}

const ctl: React.CSSProperties = { flex: 'none', width: 44, height: 44, border: 0, background: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: W, cursor: 'pointer', boxSizing: 'border-box' }
const svg = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

export default function LearnPlayer({ chapters, chips, tryCard, captions, onCaptions, say, ratio, phone, ref, tryLabel = 'Try it', noTry = false }: {
  chapters: Chapter[]; /** the dark chip, then any white ones */ chips: string[]; tryCard: TryCard
  captions: boolean; onCaptions: (on: boolean) => void; say: (m: string) => void; ratio: string; phone?: boolean; ref?: Ref<PlayerHandle>; /** the last chapter: the thing to do, as a still */ tryLabel?: string; /** a reel or a single clip: it ends on its last frame, with nothing to try */ noTry?: boolean
}) {
  const total = lengthOf(chapters)
  const [t, setT] = useState(0), [playing, setPlaying] = useState(false)
  const box = useRef<HTMLElement>(null)
  const over = t >= total, ended = over && !noTry
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setT(v => { const n = Math.min(total, v + 0.1); if (n >= total) setPlaying(false); return n }), 100)
    return () => clearInterval(id)
  }, [playing, total])
  const startOf = (key: string) => { let s = 0; for (const c of chapters) { if (c.key === key) return s; s += c.secs } return total }
  const jump = (key: string, label: string) => { const s = startOf(key); setT(s); setPlaying(s < total); say(`Jumps to: ${label}.`) }
  useImperativeHandle(ref, () => ({ play: key => { setT(startOf(key)); setPlaying(true); box.current?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' }) } }))
  const toggle = () => { if (playing) { setPlaying(false); say('Paused.') } else { if (over) setT(0); setPlaying(true); say('Plays here, in the page. Tap again to pause.') } }

  // where the playhead is: which chapter, how far through it, which line is being said
  let into = t, at = chapters[chapters.length - 1]
  for (const c of chapters) { if (into < c.secs) { at = c; break } into -= c.secs }
  const line = at.lines[Math.min(at.lines.length - 1, Math.floor(into / (at.secs / at.lines.length)))]
  const fill = (key: string, secs: number) => { const s = startOf(key); return Math.max(0, Math.min(1, (t - s) / secs)) }
  const seg = (label: string, len: string, on: boolean, pct: number, flex: number, onClick: () => void) => (
    <button key={label} onClick={onClick} aria-label={len ? `${label}, ${len}` : label} style={{ flex, minWidth: 0, height: 44, border: 0, background: 'none', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5, color: W, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
      <span style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.35)', overflow: 'hidden', display: 'block' }}><span style={{ display: 'block', height: 5, width: `${pct * 100}%`, background: W }} /></span>
      <span style={{ fontSize: 12, lineHeight: '15px', fontWeight: on ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label} {len && <span style={{ opacity: 0.8 }}>{len}</span>}</span>
    </button>)

  return (
    <section ref={box} aria-label="Player" style={{ position: 'relative', width: '100%', aspectRatio: ratio, borderRadius: phone ? 14 : 18, overflow: 'hidden', background: '#1b1d1d', color: W }}>
      {draw(frameOf(at), at.slow ? t / 2 : t)}
      <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: phone ? 100 : 150, background: 'linear-gradient(rgba(16,33,31,0),rgba(16,33,31,0.92))' }} />
      <span style={{ position: 'absolute', left: phone ? 12 : 16, top: phone ? 12 : 14, right: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>{chips.map((c, i) => <span key={c} style={{ height: 28, padding: '0 12px', borderRadius: 999, background: i ? W : INK, color: i ? INK : W, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center' }}>{c}</span>)}</span>

      {ended ? (
        /* the film has ended: the thing to try, as a still, with its button. The next lesson does not start by itself. */
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.9)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: phone ? 6 : 10, padding: phone ? '44px 16px 56px' : '56px 15% 70px' }}>
          <strong style={{ fontSize: phone ? 17 : 24, lineHeight: phone ? '22px' : '30px', letterSpacing: '-0.01em' }}>{tryCard.heading}</strong>
          {tryCard.at && !phone && <span style={{ alignSelf: 'flex-start', height: 24, padding: '0 9px', borderRadius: 999, background: W, color: INK, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center' }}>{tryCard.at}</span>}
          <span style={{ fontSize: phone ? 13 : 16, lineHeight: phone ? '18px' : '23px' }}>{tryCard.task}</span>
          {!phone && <button onClick={tryCard.onAdd} aria-pressed={tryCard.done} style={{ alignSelf: 'flex-start', height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: W, color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{tryCard.button}</button>}
        </div>
      ) : <>
        {!playing && <button aria-label="Play" onClick={toggle} style={{ position: 'absolute', left: '50%', top: '44%', transform: 'translate(-50%,-50%)', width: phone ? 56 : 76, height: phone ? 56 : 76, borderRadius: 999, border: 0, background: W, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(16,33,31,0.35)', cursor: 'pointer' }}><svg width={phone ? 22 : 28} height={phone ? 22 : 28} viewBox="0 0 24 24" strokeWidth="2.4" {...svg}><path d="M8 5l11 7-11 7z" /></svg></button>}
        {captions && <span style={{ position: 'absolute', left: '50%', bottom: phone ? 62 : 74, transform: 'translateX(-50%)', width: 'max-content', maxWidth: '84%', background: 'rgba(16,33,31,0.85)', borderRadius: 6, padding: '3px 10px', fontSize: phone ? 13 : 15, lineHeight: phone ? '18px' : '21px', fontWeight: 600, textAlign: 'center', textWrap: 'balance' }}>{line}</span>}
      </>}

      <div style={{ position: 'absolute', left: phone ? 8 : 16, right: phone ? 8 : 16, bottom: phone ? 4 : 8, display: 'flex', alignItems: 'center', gap: phone ? 6 : 12 }}>
        <button aria-label={playing ? 'Pause' : ended ? 'Play again' : 'Play'} onClick={toggle} style={ctl}><svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.4" {...svg}><path d={playing ? 'M8 5v14M16 5v14' : 'M8 5l11 7-11 7z'} /></svg></button>
        <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', gap: 8 }}>
          {chapters.map(c => seg(phone ? c.short : c.label, phone ? '' : clock(c.secs), at === c && !ended, fill(c.key, c.secs), c.key === 'team' ? 2 : 4, () => jump(c.key, c.label)))}
          {!noTry && seg(tryLabel, '', ended, ended ? 1 : 0, phone ? 1 : tryLabel.length > 6 ? 2 : 1, () => jump('try', tryLabel))}
        </div>
        {!phone && <span style={{ flex: 'none', fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{clock(t)} / {clock(total)}</span>}
        <button role="switch" aria-checked={captions} aria-label="Captions" onClick={() => { onCaptions(!captions); say(captions ? 'Captions off. They are on by default.' : 'Captions on.') }} style={{ ...ctl, borderBottom: `3px solid ${captions ? W : 'transparent'}` }}><svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.8" {...svg}><path d="M4 6h16v12H4zM8.5 13.5a2 2 0 110-3M15.5 13.5a2 2 0 110-3" /></svg></button>
        <button aria-label="Full screen" onClick={() => { const el = box.current; if (document.fullscreenElement) void document.exitFullscreen?.(); else { void el?.requestFullscreen?.().catch(() => { /* the browser said no: it keeps playing in the page */ }); say('Full screen.') } }} style={ctl}><svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" {...svg}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg></button>
      </div>
    </section>)
}
