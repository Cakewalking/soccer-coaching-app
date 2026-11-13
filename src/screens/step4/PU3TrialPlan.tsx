import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU3TrialPlan({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb: React.CSSProperties = { height: 56, padding: '0 10px', background: 'none', color: 'rgba(255,255,255,0.75)', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const snb: React.CSSProperties = { height: 44, padding: '0 14px', background: 'none', color: MUT, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Club" onClick={() => tool('Club › Overview')} style={tnb}>Club</button>
        <button aria-label="Teams" onClick={() => tool('Teams')} style={tnb}>Teams</button>
        <button aria-label="Coaches" onClick={() => tool('Coaches')} style={tnb}>Coaches</button>
        <button aria-label="Players" onClick={() => tool('Players')} style={tnb}>Players</button>
        <button aria-label="Safeguarding" onClick={() => tool('Safeguarding')} style={tnb}>Safeguarding</button>
        <button aria-label="Reports" onClick={() => tool('Reports › Board report')} style={tnb}>Reports</button>
        <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button aria-label="Whole club" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>Whole club</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>RM</div>
      </nav>
      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="All players" onClick={() => tool('Players')} style={snb}>All players</button>
        <button aria-label="Pathway" onClick={() => tool('DP1-Pathway')} style={snb}>Pathway</button>
        <button aria-label="Playing across" onClick={() => onNav?.('PU1-PlayingUp')} style={snb}>Playing across</button>
        <button aria-label="Fair game time" onClick={() => tool('Players')} style={snb}>Fair game time</button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: MUT }}>Director of football</div>
      </nav>

      <div style={{ flex: 1, display: 'flex', overflow: 'auto' }}>
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Leo Costa's trial</div>
              <div style={{ fontSize: 13, color: MUT }}>U13 Chris → U14 Josh · week 3 of 4 · review Thursday 18 June</div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <button aria-label="Message both coaches" onClick={() => tool('Chat with Chris and Josh opens.')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Message both coaches</button>
              <button aria-label="Do the review" onClick={() => tool("The review opens on 18 June: Leo's view, both coaches' views, the numbers.")} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Do the review</button>
            </div>
          </div>

          {/* Steps */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 16 }}>Steps</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
              {[
                { n: 1, label: 'Leo and his parents said yes', sub: "Asked 20 May. Leo: 'I want to try.' Dad agreed 21 May", status: 'Done', statusColor: G },
                { n: 2, label: 'Train with U14 Josh, play with U13 Chris', sub: '4 weeks · Tuesdays up, Thursdays and Saturdays with his own team', status: 'Week 3', statusColor: '#d4820a' },
                { n: 3, label: 'Review', sub: '18 June · Leo first, then Chris and Josh, then you', status: 'Next', statusColor: MUT },
                { n: 4, label: 'Half a game with U14 Josh', sub: 'Two Saturdays, at least 30 minutes each. Still in the U13 chat', status: 'If it goes well', statusColor: MUT },
                { n: 5, label: 'Decide', sub: 'Stay up, do both, or back to U13. Looked at every 6 weeks after', status: 'By 9 July', statusColor: MUT },
              ].map((step) => (
                <div key={step.n} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: step.status === 'Done' ? G : PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: step.status === 'Done' ? '#fff' : G, flexShrink: 0 }}>{step.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{step.label}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{step.sub}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: step.statusColor, flexShrink: 0 }}>{step.status}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 10, padding: '12px 16px', fontSize: 12, color: G, fontWeight: 600, flex: 1 }}>Going back is part of the plan, not a failure. Everyone is told that at step 1.</div>
            <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 10, padding: '12px 16px', fontSize: 12, color: MUT, flex: 1 }}>Leo is age-eligible for under 14. Clean Sheet checks the team sheet before each game.</div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 280, flexShrink: 0, padding: '20px 20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 12 }}>How it is going</div>
            {[
              { initials: 'LC', bg: '#6090c0', name: 'Leo, each Tuesday', quote: '"Hard but fun" three weeks running' },
              { initials: 'J', bg: '#d4820a', name: 'Josh', quote: '"Keeps up. Quiet in the group so far."' },
              { initials: 'C', bg: G, name: 'Chris', quote: '"Still our best on Saturdays."' },
            ].map(item => (
              <div key={item.name} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{item.initials}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{item.quote}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 10 }}>Watching</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Total load</div>
                  <div style={{ fontSize: 11, color: MUT }}>Up 20%. Fine. Capped at 3 sessions a week</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Game time</div>
                  <div style={{ fontSize: 11, color: MUT }}>Must get half a game wherever he plays</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
