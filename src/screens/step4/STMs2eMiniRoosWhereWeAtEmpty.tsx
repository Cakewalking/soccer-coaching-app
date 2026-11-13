import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function STMs2eMiniRoosWhereWeAtEmpty({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 12px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 12px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snba = { ...snb, color: G, fontWeight: 700, borderBottom: `2.5px solid ${G}` }

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

      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="Overview" onClick={() => onNav?.('MS5-HomeMiniRoosSame')} style={snb}>Overview</button>
        <button aria-label="Messages" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Messages</button>
        <button aria-label="Calendar" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Calendar</button>
        <button aria-label="Fixtures" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Fixtures</button>
        <button aria-label="Our style" onClick={() => onNav?.('MS1-MiniRoosStyle')} style={snb}>Our style</button>
        <button aria-label="Where we're at" onClick={() => onNav?.('MS2-MiniRoosWhereWeAt')} style={snba}>Where we're at</button>
        <button aria-label="Team staff" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Team staff</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 20px' }}>
        <div style={{ maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Where we're at</div>
            <div style={{ fontSize: 14, color: MUT, marginTop: 4 }}>U9 Tom · no games filmed yet</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '24px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Prop the tablet on the halfway line. Clean Sheet counts your three things and shows them here by Sunday.</div>
            <div style={{ background: PALE, borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 4 }}>Be brave, find a friend, win it back</div>
              <div style={{ fontSize: 12, color: MUT }}>Your current three things</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: MUT }}>Never one child against another</div>
              <div style={{ fontSize: 13, color: MUT }}>This is your starting point. It gets clearer after three games.</div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button aria-label="Film Saturday's game" onClick={() => tool('MiniRoos: film for clips')} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Film Saturday's game</button>
              <button aria-label="No camera? Count by taps" onClick={() => tool('the matching screen already in the app')} style={{ height: 44, padding: '0 24px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>No camera? Count by taps</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
