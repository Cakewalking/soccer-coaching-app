// The highlights reel as video: a player, and clips shown as thumbnails.
// The demo has no film, so "playing" runs the clip's length on a progress bar
// and moves to the next clip, the way the real reel will.

import { useEffect, useState } from 'react'
import { G, INK, MUT, LINE, PALE } from '../capture/marks'
import type { ReelClip } from './trialStore'

const secs = (d: string) => { const [m, s] = d.split(':').map(Number); return m * 60 + s }
const Pitch = () => <svg viewBox="0 0 320 180" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true"><g stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none"><rect x="14" y="12" width="292" height="156" /><path d="M160 12v156" /><circle cx="160" cy="90" r="24" /><rect x="14" y="52" width="40" height="76" /><rect x="266" y="52" width="40" height="76" /></g></svg>
const PlayGlyph = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
const PauseGlyph = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>

/** A small video thumbnail: pitch, play mark, length. */
export function Thumb({ clip, order, playing }: { clip: ReelClip; order?: number; playing?: boolean }) {
  return (
    <span style={{ flex: 'none', position: 'relative', width: 96, height: 56, borderRadius: 8, overflow: 'hidden', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      <Pitch />
      <span style={{ position: 'relative', width: 26, height: 26, borderRadius: 999, background: playing ? '#fff' : 'rgba(16,33,31,0.6)', color: playing ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{playing ? <PauseGlyph size={12} /> : <PlayGlyph size={12} />}</span>
      <span style={{ position: 'absolute', right: 4, bottom: 4, padding: '0 5px', borderRadius: 4, background: 'rgba(16,33,31,0.75)', fontSize: 11, lineHeight: '16px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{clip.duration}</span>
      {order ? <span style={{ position: 'absolute', left: 4, top: 4, minWidth: 18, height: 18, borderRadius: 999, background: '#fff', color: INK, fontSize: 11, lineHeight: '18px', fontWeight: 700, textAlign: 'center' }}>{order}</span> : null}
    </span>
  )
}

/** The player: one clip at a time, plays through the reel in order. */
export function ReelPlayer({ clips, at, setAt, playing, setPlaying }: { clips: ReelClip[]; at: number; setAt: (i: number) => void; playing: boolean; setPlaying: (p: boolean) => void }) {
  const cur = clips[Math.min(at, clips.length - 1)]
  const [run, setRun] = useState(0)   // restarts the bar when the clip changes
  useEffect(() => { setRun(r => r + 1) }, [at, playing])
  useEffect(() => {
    if (!playing || !cur) return
    const t = setTimeout(() => { if (at < clips.length - 1) setAt(at + 1); else setPlaying(false) }, secs(cur.duration) * 1000)
    return () => clearTimeout(t)
  }, [playing, at, cur, clips.length, setAt, setPlaying])
  if (!cur) return null
  return (
    <div>
      <button onClick={() => setPlaying(!playing)} aria-label={`${playing ? 'Pause' : 'Play'} clip ${at + 1} of ${clips.length}: ${cur.title}`} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', aspectRatio: '16 / 9', padding: 0, border: 0, borderRadius: 12, overflow: 'hidden', background: G, color: '#fff', cursor: 'pointer' }}>
        <Pitch />
        <span style={{ position: 'relative', width: 60, height: 60, borderRadius: 999, background: 'rgba(16,33,31,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{playing ? <PauseGlyph size={24} /> : <PlayGlyph size={24} />}</span>
        <span style={{ position: 'absolute', left: 10, right: 10, bottom: 12, display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 12, fontWeight: 700 }}><span>Clip {at + 1} of {clips.length} · {cur.gameLabel} · min {cur.min}</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{cur.duration}</span></span>
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: 'rgba(255,255,255,0.25)' }}>
          <span key={run} style={{ display: 'block', height: '100%', background: '#fff', width: playing ? '100%' : '0%', transition: playing ? `width ${secs(cur.duration)}s linear` : 'none' }} ref={el => { if (el && playing) { el.style.width = '0%'; requestAnimationFrame(() => { el.style.width = '100%' }) } }} />
        </span>
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 6 }}><strong style={{ fontSize: 15, lineHeight: '20px', color: INK }}>{cur.title}</strong><span style={{ fontSize: 13, color: MUT }}>{playing ? 'Playing. Other players are blurred. Sound is off.' : 'Other players are blurred. Sound is off.'}</span></div>
    </div>
  )
}

/** The clips as a list of thumbnails. Tap one to play it; in "change it" mode, tap to add or take out. */
export function ClipList({ clips, chosen, at, playing, onPlay, onToggle }: { clips: ReelClip[]; chosen: number[]; at?: number; playing?: boolean; onPlay?: (i: number) => void; onToggle?: (id: number) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 8 }}>
      {clips.map((c, i) => {
        const order = chosen.indexOf(c.id) + 1, on = order > 0
        const now = !onToggle && at === i
        const st = { display: 'flex', alignItems: 'center', gap: 10, minHeight: 68, padding: 6, borderRadius: 12, border: `1.5px solid ${onToggle ? (on ? G : LINE) : now ? G : LINE}`, background: onToggle ? (on ? PALE : '#fff') : now ? PALE : '#fff', color: INK, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' } as const
        return (
          <button key={c.id} style={st} aria-pressed={onToggle ? on : undefined} aria-label={onToggle ? `${on ? 'Take out' : 'Add'}: ${c.title}, ${c.duration}` : `Play ${c.title}, ${c.duration}`} onClick={() => onToggle ? onToggle(c.id) : onPlay?.(i)}>
            <Thumb clip={c} order={on ? order : undefined} playing={now && playing} />
            <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{c.title}</strong><span style={{ fontSize: 12, color: MUT }}>{c.gameLabel} · min {c.min}</span>{onToggle && <span style={{ fontSize: 12, fontWeight: 700, color: G }}>{on ? 'In the reel · tap to take out' : 'Tap to add'}</span>}</span>
          </button>
        )
      })}
    </div>
  )
}
