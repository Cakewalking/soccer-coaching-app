import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU2PlayerReadiness({ onNav }: { onNav?: (s: string) => void }) {
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
            <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Mia Tran</div>
            <div style={{ fontSize: 13, color: MUT }}>U12 Sam → U13 Girls Meg · born March 2014 · nominated by Sam on 1 June</div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button aria-label="Compare with U13" onClick={() => onNav?.('PU4-Compare')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Compare with U13</button>
            <button aria-label="Not now" onClick={() => tool('Noted with your reason. Looked at again in 8 weeks. Mia and her family are not told.')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Not now</button>
            <div style={{ flex: 1 }} />
            <button aria-label="Plan a trial" onClick={() => onNav?.('PU3-TrialPlan')} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Plan a trial</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Readiness</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>Steady growth, 4 cm this year. No pain flags. Against the U13 girls:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { label: 'Forward passes', val: 'Above middle', trend: '↑' },
                { label: 'Duels won', val: 'Near middle', trend: '→' },
                { label: 'Touches', val: 'Above middle', trend: '↑' },
                { label: 'Ball under pressure', val: 'Above middle', trend: '↑' },
                { label: 'Space found', val: 'Near middle', trend: '→' },
                { label: 'Head: settling in', val: 'Strong', trend: '↑' },
              ].map(m => (
                <div key={m.label} style={{ background: PALE, borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, color: MUT }}>{m.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{m.val} {m.trend}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
              <button aria-label="All 9 measures" onClick={() => onNav?.('PU4-Compare')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>All 9 measures</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Load and wellness</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>Two sessions and a game a week. No other sport this term. Wellness steady.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { label: 'Sessions/week', val: '2' },
                { label: 'Other sport', val: 'None' },
                { label: 'Wellness', val: 'Steady' },
              ].map(m => (
                <div key={m.label} style={{ background: PALE, borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, color: MUT }}>{m.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{m.val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <button aria-label="All 9 measures" onClick={() => onNav?.('PU4-Compare')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>All 9 measures</button>
            </div>
          </div>
        </div>

        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: G, marginBottom: 6 }}>Ready to try</div>
            <div style={{ fontSize: 13, color: INK, marginBottom: 10 }}>Ready to try. Train with the U13s for 4 weeks, keep playing U12 on Saturdays, then look again.</div>
            <div style={{ fontSize: 12, color: MUT }}>It has seen this pattern hold for 8 weeks. It is a prompt, not a decision.</div>
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>Born in March: one of the older ones in her year. Some of her edge may be age, so the trial matters more than the numbers.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
