import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM4CoachOff({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb: React.CSSProperties = { height: 56, padding: '0 10px', background: 'none', color: 'rgba(255,255,255,0.75)', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const snb: React.CSSProperties = { height: 44, padding: '0 14px', background: 'none', color: MUT, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav — MiniRoos coach frame */}
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button onClick={() => onNav?.('MS5-HomeMiniRoosSame')} style={tnb}>Home</button>
        <button onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Squad</button>
        <button onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Training</button>
        <button onClick={() => tool('the matching MiniRoos screen already in the app')} style={{ ...tnb, background: 'rgba(255,255,255,0.15)' }}>Game day</button>
        <button onClick={() => tool('MiniRoos: a best moment each')} style={tnb}>Clips</button>
        <button onClick={() => tool('MiniRoos: film for clips')} style={tnb}>Record</button>
        <div style={{ flex: 1 }} />
        <button onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)', marginRight: 8 }}>Ask Clean Sheet</button>
        <button onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U9 Tom</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>TA</div>
      </nav>
      {/* Sub-nav */}
      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Turns</button>
        <button onClick={() => onNav?.('PRM4-CoachOff')} style={{ ...snb, color: G, fontWeight: 700, borderBottom: `2px solid ${G}`, height: 44 }}>Live</button>
        <button onClick={() => onNav?.('MS3-MiniRoosReview')} style={snb}>Review</button>
        <button onClick={() => tool('the matching screen already in the app')} style={snb}>What we saw</button>
        <button onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Open turns</button>
        <button onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>What you still have today</button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: MUT }}>Coach · MiniRoos</div>
      </nav>

      {/* Page header */}
      <div style={{ padding: '16px 24px', background: '#fff', borderBottom: `1px solid ${LN}`, flexShrink: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>Saturday at Northgate City</div>
        <div style={{ fontSize: 13, color: MUT }}>U9 Tom · kick-off 8:30 · game 2 of 4</div>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        {/* Main: feature off card */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 48px' }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '48px 56px', textAlign: 'center' as const, maxWidth: 500 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 12 }}>Live game help is off for MiniRoos</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.7, marginBottom: 32 }}>
              Wattle Creek FC has this off for under 6 to under 11. "New coaches learn to read the game first." Rachel, director of football.
            </div>
            {/* Ask Rachel [nth=1, change] */}
            <button onClick={() => tool('A note goes to Rachel. Say why it would help your team.')} style={{ height: 44, padding: '0 28px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Rachel</button>
          </div>
        </div>

        {/* Right: what you still have */}
        <div style={{ width: 300, padding: '24px', borderLeft: `1px solid ${LN}`, background: '#fff', flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 16 }}>Still here on game day</div>
          {[
            { n: 1, label: 'Turns', sub: 'Who starts, who is in goal, who is captain' },
            { n: 2, label: 'A game clock', sub: 'With a buzz at each change' },
            { n: 3, label: 'Quick notes', sub: 'Three taps after each game' },
            { n: 4, label: 'The review on Sunday', sub: 'From the film, as usual' },
          ].map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: G, flexShrink: 0 }}>{item.n}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{item.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{item.sub}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, fontSize: 12, color: MUT }}>Nothing you already recorded is lost when a feature is off.</div>
        </div>
      </div>
    </div>
  )
}
