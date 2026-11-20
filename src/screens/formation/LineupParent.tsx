import { useState } from 'react'
import { TEAMS, shapeByName, type Player } from './formationData'

// FBp2 — what a parent is sent: read-only line-up with their child ringed.
// First names only, no reasons, no bench order. Positions never sent for MiniRoos.

const INK = '#10211f', PITCH = '#1c3a33', GREEN = '#2f6252', LN = '#e8edeb', MUT = '#6f7f7b'

export default function LineupParent({ childId = 'p7', onNav }: { childId?: string; onNav?: (s: string) => void }) {
  const cfg = TEAMS.juniors
  const shape = shapeByName(cfg.side, cfg.defaultShape)!
  const byId = Object.fromEntries(cfg.roster.map(p => [p.id, p])) as Record<string, Player>
  const [part, setPart] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 2600) }

  const child = byId[childId]
  const childSlot = cfg.start.indexOf(childId)
  const childPos = childSlot >= 0 ? shape.slots[childSlot].pos : null
  const posName: Record<string, string> = { LM: 'the left of midfield', CM: 'the middle', RM: 'the right of midfield', ST: 'up front', CB: 'the centre of defence', LB: 'left back', RB: 'right back', GK: 'in goal' }

  return (
    <div style={{ width: 390, minHeight: 820, margin: '0 auto', background: '#f4f6f5', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }} data-screen="FBp2-LineupParent">
      {/* Phone top bar */}
      <div style={{ flex: 'none', background: GREEN, color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onNav?.('STO17-HomeStoryParent')} aria-label="Back" style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 16 }}>‹</button>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{cfg.teamLabel.split(' · ')[0]} · from Sam, Friday 6:00 pm</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Saturday’s line-up</div>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: 999, background: '#e8cfcf', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>LT</div>
      </div>

      <div style={{ flexGrow: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Message panel */}
        <div style={{ background: PITCH, color: '#fff', borderRadius: 16, padding: '16px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#e8c56a', marginBottom: 6 }}>SAT 6 JUNE · 9:30 HOME v HARBOUR ROVERS</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{child.first} starts on {childPos ? posName[childPos] ?? 'the pitch' : 'the pitch'}.</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 6, lineHeight: 1.5 }}>She plays the whole first half and comes back on for the last ten minutes.</div>
        </div>

        {/* Half switch */}
        <div style={{ display: 'flex', background: '#fff', borderRadius: 12, border: `1px solid ${LN}`, padding: 3 }}>
          {['First half', 'Second half'].map((p, i) => (
            <button key={p} onClick={() => { setPart(i); say(p) }} style={{ flex: 1, height: 40, borderRadius: 9, border: 0, background: part === i ? GREEN : 'transparent', color: part === i ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{p}</button>
          ))}
        </div>

        {/* Pitch (read-only, child ringed) */}
        <div style={{ position: 'relative', aspectRatio: '3 / 4', background: PITCH, borderRadius: 16, overflow: 'hidden' }}>
          {[0, 2, 4, 6].map(i => <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 12.5}%`, height: '12.5%', background: 'rgba(255,255,255,0.035)' }} />)}
          <div style={{ position: 'absolute', top: 10, left: 14, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>ATTACKING THIS WAY ↑</div>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <circle cx="50" cy="50" r="9" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4" />
            <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4" />
          </svg>
          {shape.slots.map((s, i) => {
            const pid = cfg.start[i]; const p = pid ? byId[pid] : null; if (!p) return null
            const isChild = pid === childId
            return (
              <div key={i} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <span style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, boxShadow: isChild ? '0 0 0 4px rgba(255,255,255,0.9), 0 0 0 7px rgba(64,130,109,0.9)' : '0 2px 6px rgba(0,0,0,0.3)' }}>{p.num}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(16,33,31,0.6)', borderRadius: 999, padding: '1px 7px' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{p.first}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.65)' }}>{s.pos}</span>
                </span>
              </div>
            )
          })}
        </div>

        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6, textAlign: 'center' }}>On the bench to start: {cfg.roster.filter(p => p.available && !cfg.start.includes(p.id)).map(p => p.first).join(', ')}. Everyone plays at least half. Meet 8:40 am at Wattle Creek Reserve.</div>
      </div>

      {/* Actions */}
      <div style={{ flex: 'none', display: 'flex', gap: 10, padding: 16, borderTop: `1px solid ${LN}`, background: '#fff' }}>
        <button onClick={() => onNav?.('MSGp1-ParentMessages')} style={{ flex: 1, height: 48, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: INK, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Message Sam</button>
        <button onClick={() => say('Thanks. Sam can see Mia is coming.')} style={{ flex: 1, height: 48, borderRadius: 12, border: 0, background: GREEN, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{child.first} is coming</button>
      </div>

      {toast && <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '10px 18px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600 }}>{toast}</div>}
    </div>
  )
}
