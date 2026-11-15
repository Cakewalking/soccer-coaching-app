import { useState } from 'react'
import { DARK, AMBER, PALEON } from './directorParts'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function PU1ePlayingUpEmpty({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 10px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snba = { ...snb, color: G, fontWeight: 700 as const, borderBottom: `2.5px solid ${G}` }

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
        <button aria-label="Playing across" onClick={() => onNav?.('PU1-PlayingUp')} style={snba}>Playing across</button>
        <button aria-label="Fair game time" onClick={() => tool('Players')} style={snb}>Fair game time</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Playing across</div>
              <div style={{ fontSize: 13, color: MUT }}>Wattle Creek FC · nobody flagged yet</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button aria-label="What the club counts" onClick={() => onNav?.('PU5-Settings')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>What the club counts</button>
              <button aria-label="Nominate a player" onClick={() => tool('Pick any player. Their coach is asked for a view.')} style={{ height: 44, padding: '0 18px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Nominate a player</button>
            </div>
          </div>

          <div style={{ background: DARK, borderRadius: 16, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, color: '#fff' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', border: `1.5px solid ${AMBER}`, color: AMBER, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>→</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Nobody flagged yet</div>
            <div style={{ fontSize: 14, color: PALEON, maxWidth: 500, textAlign: 'center', lineHeight: '21px' }}>Clean Sheet needs 5 recorded games for a team before it says anything. Until then, coaches can nominate a player and you can plan a trial by hand.</div>
            <div style={{ maxWidth: 500, width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              {[['How far ahead in games, for how long', 'Well above their own age group, sustained over weeks.'], ['Growth, pain, speed against the older group', 'Nothing that should hold them back from a trial.'], ['From the player and the coach', 'Their own view matters as much as the numbers.']].map(([t, s]) => (
                <div key={t} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 18px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t}</div>
                  <div style={{ fontSize: 12, color: PALEON }}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: PALEON, maxWidth: 500, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 16, marginTop: 4 }}>It suggests a conversation. It never moves a player.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
