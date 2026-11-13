import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU4Compare({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 10px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }

  const measures = [
    { label: 'Forward passes', mia: 82, lo: 55, hi: 95, mid: 68 },
    { label: 'Duels won %', mia: 54, lo: 44, hi: 72, mid: 52 },
    { label: 'Touches', mia: 78, lo: 60, hi: 88, mid: 71 },
    { label: 'Ball under pressure', mia: 76, lo: 58, hi: 90, mid: 69 },
    { label: 'Space found', mia: 63, lo: 50, hi: 80, mid: 62 },
    { label: 'Head: settling in', mia: 85, lo: 60, hi: 90, mid: 72 },
    { label: 'Sprint speed', mia: 65, lo: 52, hi: 82, mid: 64 },
    { label: 'Vest: 1v1', mia: 72, lo: 58, hi: 88, mid: 68 },
    { label: 'Vest: small group', mia: 70, lo: 55, hi: 85, mid: 65 },
  ]

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 768, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Club" onClick={() => tool('Club › Overview')} style={tnb}>Club</button>
        <button aria-label="Teams" onClick={() => tool('Teams')} style={tnb}>Teams</button>
        <button aria-label="Coaches" onClick={() => tool('Coaches')} style={tnb}>Coaches</button>
        <button aria-label="Players" onClick={() => tool('Players')} style={tnb}>Players</button>
        <button aria-label="Safeguarding" onClick={() => tool('Safeguarding')} style={tnb}>Safeguarding</button>
        <button aria-label="Reports" onClick={() => tool('Reports › Board report')} style={tnb}>Reports</button>
        <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' as const }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button aria-label="Whole club" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>Whole club</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>RM</div>
      </nav>
      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="All players" onClick={() => tool('Players')} style={snb}>All players</button>
        <button aria-label="Pathway" onClick={() => tool('DP1-Pathway')} style={snb}>Pathway</button>
        <button aria-label="Playing across" onClick={() => onNav?.('PU1-PlayingUp')} style={snb}>Playing across</button>
        <button aria-label="Fair game time" onClick={() => tool('Players')} style={snb}>Fair game time</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Mia Tran vs U13 Girls</div>
              <div style={{ fontSize: 13, color: MUT }}>U12 Sam → U13 Girls Meg · all 14 players · per 60 minutes</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button aria-label="Midfielders only" onClick={() => tool('Now compared with the 5 midfielders in U13 Girls Meg.')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Midfielders only</button>
              <button aria-label="Back to Mia" onClick={() => onNav?.('PU2-PlayerReadiness')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Back to Mia</button>
              <button aria-label="Plan a trial" onClick={() => onNav?.('PU3-TrialPlan')} style={{ height: 44, padding: '0 18px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Plan a trial</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Green band: the U13 girls, slowest to fastest. Dark line: their middle player. Dot: Mia. No U13 player is named.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {measures.map(m => {
                const range = m.hi - m.lo
                const dotPos = Math.min(100, Math.max(0, (m.mia - m.lo) / range * 100))
                const midPos = (m.mid - m.lo) / range * 100
                return (
                  <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 160, fontSize: 12, color: INK, flexShrink: 0 }}>{m.label}</div>
                    <div style={{ flex: 1, position: 'relative', height: 20 }}>
                      <div style={{ position: 'absolute', left: '0%', right: '0%', top: 7, height: 6, background: '#c0d8cc', borderRadius: 3 }} />
                      <div style={{ position: 'absolute', left: `${midPos}%`, top: 4, width: 2, height: 12, background: GD, transform: 'translateX(-50%)' }} />
                      <div style={{ position: 'absolute', left: `${dotPos}%`, top: 2, width: 16, height: 16, borderRadius: '50%', background: G, border: '2px solid #fff', transform: 'translateX(-50%)' }} />
                    </div>
                    <div style={{ width: 100, fontSize: 12, color: m.mia >= m.mid ? G : MUT, fontWeight: m.mia >= m.mid ? 600 : 400 }}>
                      {m.mia >= m.hi ? 'Above range' : m.mia >= m.mid ? 'Above middle' : 'Near middle'}
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop: 14, fontSize: 13, color: MUT }}>inside or above the U13 range. Above their middle on 5.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Guest sessions</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>2 guest sessions with the U13s. Duels won 48%, against their middle of 52%.</div>
            <div style={{ fontSize: 12, color: MUT }}>Small, but it is against the right opposition. A trial gives 4 weeks of this.</div>
          </div>
        </div>

        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>Her game numbers were made against under 12s, so they flatter her. Goals depend on position and team. Tests and vests compare fairly.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
