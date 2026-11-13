import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function STMs5HomeMiniRoos({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 12px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const tnba = { ...tnb, background: 'rgba(255,255,255,0.15)' as const, color: '#fff', fontWeight: 700 }
  const snb = { height: 44, padding: '0 12px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snba = { ...snb, color: G, fontWeight: 700, borderBottom: `2.5px solid ${G}` }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 768, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 20, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Home" onClick={() => onNav?.('MS5-HomeMiniRoosSame')} style={tnba}>Home</button>
        <button aria-label="Squad" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Squad</button>
        <button aria-label="Training" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Training</button>
        <button aria-label="Game day" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Game day</button>
        <button aria-label="Clips" onClick={() => tool('MiniRoos: a best moment each')} style={tnb}>Clips</button>
        <button aria-label="Record" onClick={() => tool('MiniRoos: film for clips')} style={tnb}>Record</button>
        <div style={{ flex: 1 }} />
        <button aria-label="U9 Tom · Wattle Creek" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U9 Tom · Wattle Creek</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>T</div>
      </nav>

      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="Overview" onClick={() => onNav?.('MS5-HomeMiniRoosSame')} style={snba}>Overview</button>
        <button aria-label="Messages" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Messages</button>
        <button aria-label="Calendar" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Calendar</button>
        <button aria-label="Fixtures" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Fixtures</button>
        <button aria-label="Our style" onClick={() => onNav?.('MS1-MiniRoosStyle')} style={snb}>Our style</button>
        <button aria-label="Where we're at" onClick={() => onNav?.('MS2-MiniRoosWhereWeAt')} style={snb}>Where we're at</button>
        <button aria-label="Team staff" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Team staff</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button aria-label="Ask about U9 Tom… Who hasn't been in goal yet?" onClick={() => onNav?.('ASKd2-HomeFocus')} style={{ width: '100%', textAlign: 'left', background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '0 20px', fontSize: 14, color: MUT, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', height: 44 }}>
            Ask about U9 Tom… Who hasn't been in goal yet?
          </button>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ background: GD, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.07em' }}>TUE 9 JUNE · 5:00 pm · Wattle Creek Reserve</span>
              <button aria-label="Open the games" onClick={() => tool('the matching MiniRoos screen already in the app')} style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 6, padding: '0 12px', cursor: 'pointer', fontFamily: 'inherit', height: 44, display: 'flex', alignItems: 'center' }}>Open the games</button>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 6 }}>45 minutes · built from Saturday: spread out and find a friend</div>
              <div style={{ fontSize: 13, color: G, fontWeight: 700, marginBottom: 8 }}>Brave with the ball: keep. Finding a friend: Tuesday. No score kept.</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>In goal 7 of 10 · captain 6 of 10 · started 10 of 10. Next in goal: Ivy, Max and Arlo.</div>
              <button aria-label="Turns" onClick={() => tool('the matching MiniRoos screen already in the app')} style={{ height: 44, padding: '0 20px', background: PALE, color: G, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Turns</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.07em' }}>LAST REVIEW</span>
              <button aria-label="Review" onClick={() => onNav?.('MS3-MiniRoosReview')} style={{ fontSize: 13, fontWeight: 700, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', height: 44, display: 'flex', alignItems: 'center' }}>Review</button>
            </div>
            <div style={{ fontSize: 13, color: INK }}>Sat 7 June · Wattle Creek Reserve · 4 short games</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.07em' }}>MESSAGES</span>
              <button aria-label="All messages · 2 more" onClick={() => tool('the matching MiniRoos screen already in the app')} style={{ fontSize: 13, fontWeight: 700, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', height: 44, display: 'flex', alignItems: 'center' }}>All messages · 2 more</button>
            </div>
            <div style={{ fontSize: 13, color: MUT }}>2 families haven't said if they're coming</div>
          </div>
        </div>

        <div style={{ width: 420, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: INK }}>Where we're at</span>
              <button aria-label="All 6" onClick={() => onNav?.('MS2-MiniRoosWhereWeAt')} style={{ fontSize: 13, fontWeight: 700, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', height: 44, minWidth: 44, display: 'flex', alignItems: 'center' }}>All 6</button>
            </div>
            <div style={{ fontSize: 13, color: G, fontWeight: 700, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>Be brave with the ball · Getting better · 24 dribbles</div>
            <div style={{ fontSize: 13, color: INK, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>Brave with the ball: keep. Finding a friend: Tuesday. No score kept.</div>
            <div style={{ fontSize: 13, color: MUT, padding: '10px 0' }}>Find a friend · About the same · 17 passes</div>
          </div>
        </div>
      </div>
    </div>
  )
}
