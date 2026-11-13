import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU6Review({ onNav }: { onNav?: (s: string) => void }) {
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button aria-label="Back to the plan" onClick={() => onNav?.('PU3-TrialPlan')} style={{ height: 44, padding: '0 16px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Back to the plan</button>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Leo Costa · Review</div>
              <div style={{ fontSize: 13, color: MUT }}>U13 Chris → U14 Josh · 4 weeks of Tuesday training done · Thursday 18 June</div>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Leo, today</div>
            <div style={{ fontSize: 14, color: INK, marginBottom: 4, fontStyle: 'italic' }}>Leo, today: "I want to keep going on Tuesdays. I don't want to leave my team yet."</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>4 weeks of training</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>In week 1 he was in their lower third on all four. Load stayed inside his cap. No pain flags.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {[
                { label: 'Week 1', val: 'Lower third' },
                { label: 'Week 2', val: 'Middle' },
                { label: 'Week 3', val: 'Middle' },
                { label: 'Week 4', val: 'Upper middle' },
              ].map(w => (
                <div key={w.label} style={{ background: PALE, borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: MUT }}>{w.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{w.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 6 }}>What do you want to do?</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 14 }}>Clean Sheet suggests "Do both": it is what Leo asked for, and both coaches agree.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                aria-label="Do both Tuesdays with U14 Josh, games with U13 Chris. Look again on 30 July"
                onClick={() => tool('Do both. Leo, his parents and both coaches are told today.')}
                style={{ padding: '16px 20px', background: G, color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const }}
              >Do both Tuesdays with U14 Josh, games with U13 Chris. Look again on 30 July
              </button>
              <button
                aria-label="Move up Train and play with U14 Josh. Half a game at least. Check in every 6 weeks"
                onClick={() => tool('Move up. Leo, his parents and both coaches are told today.')}
                style={{ padding: '16px 20px', background: '#fff', color: INK, border: `1.5px solid ${LN}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const }}
              >Move up Train and play with U14 Josh. Half a game at least. Check in every 6 weeks
                <div style={{ fontSize: 12, fontWeight: 400, color: MUT, marginTop: 4 }}>Move up</div>
              </button>
              <button
                aria-label="Back to U13 Chris A good four weeks. Nothing is lost; he can try again when he is ready"
                onClick={() => tool('Back to U13 Chris. Leo, his parents and both coaches are told today.')}
                style={{ padding: '16px 20px', background: '#fff', color: INK, border: `1.5px solid ${LN}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const }}
              >Back to U13 Chris A good four weeks. Nothing is lost; he can try again when he is ready
              </button>
            </div>
          </div>
        </div>

        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>Whoever you pick, Leo, his parents and both coaches are told today.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
