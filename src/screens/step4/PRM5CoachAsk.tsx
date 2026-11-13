import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM5CoachAsk({ onNav }: { onNav?: (s: string) => void }) {
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
        <button onClick={() => onNav?.('PRM4-CoachOff')} style={snb}>Cancel</button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: MUT }}>Coach · MiniRoos</div>
      </nav>

      {/* Page header */}
      <div style={{ padding: '16px 24px', background: '#fff', borderBottom: `1px solid ${LN}`, flexShrink: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>Ask for Live game help</div>
        <div style={{ fontSize: 13, color: MUT }}>U9 Tom · kick-off 8:30 · game 2 of 4</div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 48px' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '32px 36px', width: 560 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Live game help is off for MiniRoos</div>
            <div style={{ fontSize: 13, color: MUT }}>Wattle Creek FC has this off for under 6 to under 11.</div>
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 10, padding: '14px 16px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>Rachel decides what each team gets. Tell her why it would help U9 Tom.</div>
          </div>

          <div style={{ marginBottom: 6, fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>Why it would help</div>
          <div style={{ background: PALE, border: `1.5px solid ${LN}`, borderRadius: 10, padding: '14px 16px', marginBottom: 8, minHeight: 80 }}>
            <div style={{ fontSize: 14, color: MUT, fontStyle: 'italic' }}>I have 12 children on Saturday and I'm on my own. Help with who has played least would let me watch the game.</div>
          </div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 24 }}>Rachel sees your note with the cost to the club. You will hear back in the app. You can ask once a term.</div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => onNav?.('PRM4-CoachOff')} style={{ height: 44, flex: 1, background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button onClick={() => tool('Sent. Rachel usually answers within a few days.')} style={{ height: 44, flex: 2, background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send to Rachel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
