// One clip player any screen can open: playClips([...]) from a shot-map dot, a
// "best chances" row, a set-piece routine, a measure sheet. The demo has no film,
// so playing runs the clip's length on a progress bar and moves to the next clip.

import { useEffect, useState, useSyncExternalStore } from 'react'
import { record, onBack, isOpenInHistory } from '../../backState'

export type Clip = { title: string; sub?: string; /** seconds */ len?: number }
type State = { clips: Clip[]; at: number; heading: string } | null

let state: State = null
const subs = new Set<() => void>()
const set = (s: State) => { state = s; subs.forEach(f => f()) }

/** Open the player on these clips. `heading` names where they came from, such as "Corner: short, then cross". */
export function playClips(clips: Clip[], heading = 'Clip', at = 0) { if (clips.length) { set({ clips, at, heading }); record('ov:clip', true) } }
/** Close the player. If opening it added a history entry, going back is what closes it, so Back and the Close button agree. */
export const closeClips = () => { if (isOpenInHistory('ov:clip')) window.history.back(); else set(null) }
if (typeof window !== 'undefined') onBack(bag => { if (!bag['ov:clip'] && state) set(null) })

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LINE = '#c5c8c4'
const mmss = (s: number) => `0:${String(Math.round(s)).padStart(2, '0')}`

export function ClipSheetHost() {
  const s = useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => state)
  const [playing, setPlaying] = useState(true)
  const [run, setRun] = useState(0)
  const at = s?.at ?? 0, cur = s?.clips[at], len = cur?.len ?? 12, n = s?.clips.length ?? 0
  useEffect(() => { setPlaying(true); setRun(r => r + 1) }, [s?.clips, at])
  useEffect(() => {
    if (!s || !playing) return
    const t = setTimeout(() => { if (at < n - 1) set({ ...s, at: at + 1 }); else setPlaying(false) }, len * 1000)
    return () => clearTimeout(t)
  }, [s, playing, at, n, len])
  useEffect(() => {
    if (!s) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') closeClips() }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [s])
  if (!s || !cur) return null
  const step = (d: number) => set({ ...s, at: Math.max(0, Math.min(n - 1, at + d)) })
  const nav = { minWidth: 44, height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LINE}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' } as const
  return (
    <div data-clip-sheet role="dialog" aria-modal="true" aria-label={`${s.heading}: ${cur.title}`} onClick={e => { if (e.target === e.currentTarget) closeClips() }} style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(16,33,31,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{ width: 'min(640px, 100%)', background: '#fff', borderRadius: 18, padding: 16, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 10, color: INK }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>{s.heading}{n > 1 ? ` · clip ${at + 1} of ${n}` : ''}</span><strong style={{ fontSize: 18, lineHeight: '24px' }}>{cur.title}</strong></span>
          <button onClick={closeClips} aria-label="Close the clip" style={{ ...nav, width: 44, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
        </div>
        <button onClick={() => setPlaying(p => !p)} aria-label={`${playing ? 'Pause' : 'Play'}: ${cur.title}`} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', aspectRatio: '16 / 9', padding: 0, border: 0, borderRadius: 12, overflow: 'hidden', background: '#1c3a33', color: '#fff', cursor: 'pointer' }}>
          <svg viewBox="0 0 320 180" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true"><g stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"><rect x="14" y="12" width="292" height="156" /><path d="M160 12v156" /><circle cx="160" cy="90" r="26" /><rect x="14" y="52" width="40" height="76" /><rect x="266" y="52" width="40" height="76" /></g></svg>
          <span style={{ position: 'relative', width: 64, height: 64, borderRadius: 999, background: 'rgba(16,33,31,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5l11 7-11 7z" />}</svg></span>
          <span style={{ position: 'absolute', right: 12, bottom: 12, fontFamily: 'inherit', fontSize: 12, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{mmss(len)}</span>
          <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: 'rgba(255,255,255,0.25)' }}>
            <span key={`${run}-${playing}`} style={{ display: 'block', height: '100%', background: '#fff', width: '0%' }} ref={el => { if (el && playing) { el.style.transition = 'none'; el.style.width = '0%'; requestAnimationFrame(() => { el.style.transition = `width ${len}s linear`; el.style.width = '100%' }) } }} />
          </span>
        </button>
        <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>{cur.sub ? `${cur.sub} ` : ''}{playing ? 'Playing.' : 'Paused.'} Sound is off.</span>
        {n > 1 && <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><button style={{ ...nav, opacity: at ? 1 : 0.45 }} disabled={!at} onClick={() => step(-1)}>Previous</button><button style={{ ...nav, background: G, color: '#fff', border: 0, opacity: at < n - 1 ? 1 : 0.45 }} disabled={at >= n - 1} onClick={() => step(1)}>Next clip</button></div>}
      </div>
    </div>
  )
}
