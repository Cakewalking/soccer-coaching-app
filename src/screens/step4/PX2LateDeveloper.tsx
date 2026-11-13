import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PX2LateDeveloper({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 10px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }

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
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Eli Ward</div>
            <div style={{ fontSize: 13, color: MUT }}>U14 Josh · born November 2012 · worth a talk about training with U13 Chris</div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button aria-label="Not now" onClick={() => tool('Noted with your reason. Looked at again in 8 weeks. Eli and his family are not told.')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Not now</button>
            <div style={{ flex: 1 }} />
            <button aria-label="Plan it" onClick={() => onNav?.('PU3-TrialPlan')} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Plan it</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>What it sees</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>Upper third of his team for forward passes and for keeping it under pressure.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { label: 'Forward passes', val: 'Upper third', trend: '↑' },
                { label: 'Ball under pressure', val: 'Upper third', trend: '↑' },
                { label: 'Duels won', val: 'Lower third', trend: '↓' },
                { label: 'Sprint speed', val: 'Lower third', trend: '↓' },
                { label: 'Game minutes', val: '22 min avg', trend: '↓' },
                { label: 'Wellness', val: 'Steady', trend: '→' },
              ].map(m => (
                <div key={m.label} style={{ background: PALE, borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, color: MUT }}>{m.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{m.val} {m.trend}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Load</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>Two sessions and a game. Game time has fallen from 40 to 22 minutes since March.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>What to consider</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>U13 Chris train Thursdays. League games an age group down need the league's OK, before next season.</div>
            <div style={{ fontSize: 13, color: G, fontWeight: 600 }}>Worth a talk. Thursdays with U13 Chris for 6 weeks, keep playing U14, then look again. Or start with one mixed-age session.</div>
          </div>
        </div>

        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>Born in November: one of the youngest in his year, and growing late. Players like Eli often catch up at 15 to 17. The aim is that he is still playing then.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
