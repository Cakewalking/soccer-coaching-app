import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function STMs3eMiniRoosReviewEmpty({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 12px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 12px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 768, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 20, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Home" onClick={() => onNav?.('MS5-HomeMiniRoosSame')} style={tnb}>Home</button>
        <button aria-label="Squad" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Squad</button>
        <button aria-label="Training" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Training</button>
        <button aria-label="Game day" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Game day</button>
        <button aria-label="Clips" onClick={() => tool('MiniRoos: a best moment each')} style={tnb}>Clips</button>
        <button aria-label="Record" onClick={() => tool('MiniRoos: film for clips')} style={tnb}>Record</button>
        <div style={{ flex: 1 }} />
        <button aria-label="U9 Tom · Wattle Creek" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U9 Tom · Wattle Creek</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>T</div>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>Review</div>
            <div style={{ fontSize: 13, color: MUT }}>U9 Tom · nothing filmed yet</div>
          </div>

          <nav style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, height: 44, display: 'flex', alignItems: 'center', padding: '0 4px', flexShrink: 0, overflow: 'hidden' }}>
            <button aria-label="Turns" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Turns</button>
            <button aria-label="Review" onClick={() => onNav?.('MS3-MiniRoosReview')} style={snb}>Review</button>
            <button aria-label="What we saw" onClick={() => tool('the matching screen already in the app')} style={snb}>What we saw</button>
            <button aria-label="Thank the parents" onClick={() => tool('the matching screen already in the app')} style={snb}>Thank the parents</button>
          </nav>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 6 }}>Your first review comes after a filmed game</div>
              <div style={{ fontSize: 13, color: MUT }}>Three things we saw, a best moment for every child, and games for Tuesday. No score.</div>
            </div>

            <div style={{ background: PALE, borderRadius: 10, padding: '14px 18px', width: '100%' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 4 }}>So the review knows what to look for</div>
              <div style={{ fontSize: 12, color: MUT }}>Set your three things in Our style before Saturday.</div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              <button aria-label="Film Saturday's game" onClick={() => tool('MiniRoos: film for clips')} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Film Saturday's game</button>
              <button aria-label="Tell us what you saw instead" onClick={() => tool('the matching screen already in the app')} style={{ height: 44, padding: '0 24px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Tell us what you saw instead</button>
              <button aria-label="Pick" onClick={() => onNav?.('MS1-MiniRoosStyle')} style={{ height: 44, padding: '0 24px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Pick</button>
            </div>

            <div style={{ fontSize: 13, color: MUT }}>Without a camera, your three taps after the game still build Tuesday.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
