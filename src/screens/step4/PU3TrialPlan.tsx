import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU3TrialPlan({ onNav }: { onNav?: (s: string) => void }) {
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
            <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Leo Costa · Trial plan</div>
            <div style={{ fontSize: 13, color: MUT }}>U13 Chris → U14 Josh · week 3 of 4 · review Thursday 18 June</div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button aria-label="Message both coaches" onClick={() => tool('Chat with Chris and Josh opens.')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Message both coaches</button>
            <div style={{ flex: 1 }} />
            <button aria-label="Do the review" onClick={() => tool('The review opens on 18 June: Leo\'s view, both coaches\' views, the numbers.')} style={{ height: 44, padding: '0 18px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Do the review</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>The plan</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { n: 1, t: '4 weeks · Tuesdays up, Thursdays and Saturdays with his own team', s: 'Started 26 May · 3 Tuesdays done' },
                { n: 2, t: 'Two Saturdays, at least 30 minutes each. Still in the U13 chat', s: 'Playing Saturday 7 June and 14 June with U14 Josh' },
                { n: 3, t: 'Stay up, do both, or back to U13. Looked at every 6 weeks after', s: 'Review opens 18 June' },
              ].map(step => (
                <div key={step.n} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{step.n}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{step.t}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{step.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>Progress so far</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {[
                { label: 'Tuesdays', val: '3 of 4 done' },
                { label: 'Game minutes (U14)', val: '65 of 60 target' },
                { label: 'Load cap', val: 'Inside' },
                { label: 'Pain flags', val: 'None' },
              ].map(m => (
                <div key={m.label} style={{ background: PALE, borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, color: MUT }}>{m.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Who knows</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 6 }}>Leo, his parents, U13 Chris, U14 Josh. Told on 26 May.</div>
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 4 }}>Going back is part of the plan, not a failure. Everyone is told that at step 1.</div>
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>Leo is age-eligible for under 14. Clean Sheet checks the team sheet before each game.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
