// FBp1 — the formation board on the coach's phone. Tap a bench player, then tap a
// spot. Each half has its own line-up, and Save keeps both on this device.

import { useState } from 'react'
import { TEAMS, shapesFor, shapeByName, remap, type Player } from './formationData'

const INK = '#10211f', MUT = '#4a5a57', G = '#2f6252', GD = '#1f4a3e', PITCH = '#1c3a33', LINE = '#c5c8c4'
const KEY = 'cs_formation_phone_v1'
type Saved = { shape: string; halves: (string | null)[][] }
const load = (): Saved | null => { try { return JSON.parse(localStorage.getItem(KEY) || 'null') } catch { return null } }

export default function FormationPhone({ onNav }: { onNav?: (s: string) => void }) {
  const cfg = TEAMS.juniors, shapes = shapesFor(cfg.side)
  const byId = Object.fromEntries(cfg.roster.map(p => [p.id, p])) as Record<string, Player>
  const [saved, setSaved] = useState<Saved | null>(load)
  const [shapeName, setShapeName] = useState(saved?.shape ?? cfg.defaultShape)
  const [halves, setHalves] = useState<(string | null)[][]>(saved?.halves ?? [[...cfg.start], [...cfg.start]])
  const [half, setHalf] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(t => t === m ? null : t), 2800) }

  const shape = shapeByName(cfg.side, shapeName) ?? shapes[0]
  const placed = halves[half]
  const on = new Set(placed.filter(Boolean) as string[])
  const bench = cfg.roster.filter(p => p.available && !on.has(p.id))
  const setPlaced = (next: (string | null)[]) => setHalves(h => h.map((x, i) => i === half ? next : x))
  const dirty = !saved || saved.shape !== shapeName || JSON.stringify(saved.halves) !== JSON.stringify(halves)

  function pickShape(name: string) {
    const to = shapeByName(cfg.side, name); if (!to || name === shapeName) return
    setHalves(h => h.map(x => remap(shape, to, x))); setShapeName(name); setPicked(null); say(`${name}.`)
  }
  function tapBench(p: Player) {
    if (picked === p.id) { setPicked(null); return }
    setPicked(p.id); say(`${p.first}: picked. Tap a spot on the pitch.`)
  }
  function tapPitch(id: string, i: number) {
    if (picked && picked !== id) {
      const next = [...placed], from = placed.indexOf(picked)
      if (from >= 0) next[from] = id          // two on the pitch swap places
      next[i] = picked
      setPlaced(next); say(`${byId[picked].first} swapped with ${byId[id].first}.`); setPicked(null); return
    }
    if (picked === id) { setPicked(null); return }
    setPicked(id); say(`${byId[id].first}: drag to move or swap. Or tap, then tap where they go.`)
  }
  function save() {
    const s = { shape: shapeName, halves }
    try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* private window: kept for this visit only */ }
    setSaved(s); say('Saved as Saturday’s line-up.')
  }

  const pk = picked ? byId[picked] : null
  const hint = pk
    ? on.has(pk.id) ? `${pk.first} is picked. Tap another player to swap.` : `${pk.first} is picked. ${(() => { const i = shape.slots.findIndex(s => pk.positions.includes(s.pos)); return i >= 0 && placed[i] ? `${byId[placed[i]!].first}’s spot is a usual one for ${pk.first}.` : 'Tap a spot on the pitch.' })()} Hold and drag works too.`
    : 'Tap a player on the bench, then tap where they go.'

  return (
    <div data-screen="FBp1-FormationPhone" style={{ width: 390, minHeight: 844, margin: '0 auto', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <header style={{ flex: 'none', background: G, color: '#fff', padding: '8px 14px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => onNav?.('CPh1-CoachPhoneHome')} aria-label="Back" style={{ flex: 'none', width: 44, height: 44, border: 0, background: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg></button>
        <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 12, lineHeight: '16px', opacity: 0.85 }}>{cfg.teamLabel.split(' · ')[0]} · {cfg.game.replace(' · ', ' ')}</span>
          <strong style={{ fontSize: 20, lineHeight: '26px' }}>Formation</strong>
        </span>
        <button onClick={() => onNav?.('ASKp2-PhoneAskOpen')} aria-label="Ask Clean Sheet" style={{ flex: 'none', width: 44, height: 44, borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.7)', background: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 3l1.9 5.1L17 10l-5.1 1.9L10 17l-1.9-5.1L3 10l5.1-1.9zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z" /></svg></button>
        <span aria-hidden="true" style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#cbbeb5', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>SK</span>
      </header>

      <main style={{ flexGrow: 1, padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div role="group" aria-label="Shape" style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -14px', padding: '0 14px' }}>
          {shapes.map(s => { const sel = s.name === shapeName; return (
            <button key={s.name} aria-pressed={sel} onClick={() => pickShape(s.name)} style={{ flex: 'none', height: 44, padding: '0 14px', borderRadius: 12, border: `1px solid ${sel ? G : LINE}`, background: sel ? G : '#fff', color: sel ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, letterSpacing: '0.04em', cursor: 'pointer' }}>{s.name}</button>) })}
        </div>

        <div role="group" aria-label={`${half ? 'Second' : 'First'} half line-up`} style={{ position: 'relative', height: 440, borderRadius: 18, background: PITCH, overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" stroke="rgba(255,255,255,0.32)" strokeWidth="0.4" fill="none">
            <rect x="3" y="3" width="94" height="94" rx="1.5" /><line x1="3" y1="50" x2="97" y2="50" /><ellipse cx="50" cy="50" rx="13" ry="10" />
            <rect x="24" y="3" width="52" height="14" /><rect x="40" y="1.5" width="20" height="1.5" /><rect x="24" y="83" width="52" height="14" /><rect x="40" y="97" width="20" height="1.5" />
          </svg>
          <span style={{ position: 'absolute', left: 22, top: 20, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}>ATTACKING THIS WAY ↑</span>
          {shape.slots.map((slot, i) => { const id = placed[i], p = id ? byId[id] : null, sel = !!id && picked === id, target = !!pk && !on.has(pk.id) && pk.positions.includes(slot.pos); return p && id ? (
            <button key={i} onClick={() => tapPitch(id, i)} aria-pressed={sel} aria-label={`${p.num} ${p.captain ? 'C ' : ''}${p.first} ${slot.pos}`} style={{ position: 'absolute', left: `${slot.x}%`, top: `${slot.y}%`, transform: 'translate(-50%,-46%)', minWidth: 56, minHeight: 64, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <span style={{ position: 'relative', width: 44, height: 44, borderRadius: 999, background: sel ? G : '#fff', color: sel ? '#fff' : INK, boxShadow: target || sel ? '0 0 0 3px #1c3a33, 0 0 0 6px #fff' : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 800 }}>{p.num}{p.captain && <span style={{ position: 'absolute', top: -3, left: -5, width: 16, height: 16, borderRadius: 999, background: '#fff', color: INK, border: `1px solid ${INK}`, boxSizing: 'border-box', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>C</span>}</span>
              <span style={{ background: 'rgba(16,33,31,0.78)', borderRadius: 999, padding: '1px 8px', fontSize: 13, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{p.first} <span style={{ fontSize: 10, opacity: 0.8 }}>{slot.pos}</span></span>
            </button>) : (
            <button key={i} onClick={() => { if (!picked) { say(`${slot.pos}: empty. Pick a player, then tap here.`); return } const next = [...placed], from = placed.indexOf(picked); if (from >= 0) next[from] = null; next[i] = picked; setPlaced(next); say(`${byId[picked].first} to ${slot.pos}.`); setPicked(null) }} aria-label={`${slot.pos}: empty`} style={{ position: 'absolute', left: `${slot.x}%`, top: `${slot.y}%`, transform: 'translate(-50%,-50%)', width: 48, height: 48, borderRadius: 999, border: '2px dashed rgba(255,255,255,0.7)', background: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>{slot.pos}</button>) })}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT }}>BENCH · TAP ONE, THEN TAP A SPOT</span><span style={{ fontSize: 13, color: MUT }}>{bench.length}</span></div>
        <div role="group" aria-label="Bench" style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -14px', padding: '0 14px' }}>
          {bench.map(p => { const sel = picked === p.id; return (
            <button key={p.id} aria-pressed={sel} aria-label={`${p.num} ${p.first}`} onClick={() => tapBench(p)} style={{ flex: 'none', height: 48, padding: '0 14px 0 6px', borderRadius: 999, border: `1px solid ${sel ? GD : LINE}`, background: sel ? GD : '#fff', color: sel ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 34, height: 34, borderRadius: 999, background: '#fff', color: INK, border: `1.5px solid ${INK}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{p.num}</span>{p.first}
            </button>) })}
          {!bench.length && <span style={{ fontSize: 14, color: MUT, padding: '12px 0' }}>Everyone available is on the pitch.</span>}
        </div>
        <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>{hint}</span>
      </main>

      <footer style={{ flex: 'none', position: 'sticky', bottom: 0, background: '#fff', borderTop: `1px solid ${LINE}`, padding: '10px 14px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button aria-pressed={half === 1} onClick={() => { const n = half ? 0 : 1; setHalf(n); setPicked(null); say(n ? 'Second half: its own line-up.' : 'First half.') }} style={{ minHeight: 48, borderRadius: 12, border: `1px solid ${LINE}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>{half ? 'First half' : 'Second half'}</button>
        <button onClick={save} style={{ minHeight: 48, borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>{dirty ? 'Save' : 'Saved'}</button>
      </footer>
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 84, transform: 'translateX(-50%)', width: 'min(358px, calc(100vw - 32px))', boxSizing: 'border-box', zIndex: 60, padding: '12px 14px', borderRadius: 14, background: GD, color: '#fff', fontSize: 14, lineHeight: '20px', fontWeight: 600 }}>{toast}</div>}
    </div>
  )
}
