import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function STMs3MiniRoosReview({ onNav }: { onNav?: (s: string) => void }) {
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

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>Review</div>
              <div style={{ fontSize: 13, color: MUT }}>U9 Tom · 4 short games · no score kept</div>
            </div>
          </div>

          <nav style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, height: 44, display: 'flex', alignItems: 'center', padding: '0 4px', flexShrink: 0, overflow: 'hidden' }}>
            <button aria-label="Turns" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Turns</button>
            <button aria-label="Review" onClick={() => onNav?.('MS3-MiniRoosReview')} style={snba}>Review</button>
            <button aria-label="What we saw" onClick={() => tool('the matching screen already in the app')} style={snb}>What we saw</button>
            <button aria-label="Thank the parents" onClick={() => tool('the matching screen already in the app')} style={snb}>Thank the parents</button>
            <button aria-label="A best moment each" onClick={() => tool('MiniRoos: a best moment each')} style={snb}>A best moment each</button>
            <button aria-label="Build Tuesday from this" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Build Tuesday from this</button>
          </nav>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 12 }}>WHAT HAPPENED</div>
            <div style={{ fontSize: 14, color: INK, marginBottom: 10 }}>24 dribbles. Poppy tried her first three, and beat a player with one.</div>
            <div style={{ fontSize: 14, color: INK, marginBottom: 10 }}>Back in 8 seconds. When three chased, it took 4.</div>
            <div style={{ fontSize: 14, color: INK, marginBottom: 16 }}>6 children were within 5 metres of the ball. Nobody free to pass to.</div>
            <div style={{ background: PALE, borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: G, fontWeight: 700 }}>You tapped "Brave dribbling" and "Bunching round the ball". The film agrees with both.</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ position: 'relative' as const, background: '#f4f6f5', borderRadius: 10, padding: '12px 16px', flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 4 }}>5 clips</div>
                <div style={{ fontSize: 12, color: MUT }}>Brave dribbling</div>
                <button aria-label="5 clips" onClick={() => tool('5 clips plays here.')} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
              </div>
              <div style={{ position: 'relative' as const, background: '#f4f6f5', borderRadius: 10, padding: '12px 16px', flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 4 }}>4 clips</div>
                <div style={{ fontSize: 12, color: MUT }}>Bunching round the ball</div>
                <button aria-label="4 clips" onClick={() => tool('4 clips plays here.')} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
              </div>
              <div style={{ position: 'relative' as const, background: '#f4f6f5', borderRadius: 10, padding: '12px 16px', flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 4 }}>3 clips</div>
                <div style={{ fontSize: 12, color: MUT }}>Finding a friend</div>
                <button aria-label="3 clips" onClick={() => tool('3 clips plays here.')} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 12 }}>WHAT WE DON'T SHOW</div>
            <div style={{ fontSize: 13, color: MUT }}>The score, who scored most, or any child compared with another. Two children have no film consent and are blurred.</div>
          </div>
        </div>

        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 8 }}>SATURDAY'S GAMES</div>
            <div style={{ fontSize: 13, color: INK, marginBottom: 12 }}>Sat 7 June · Wattle Creek Reserve · 4 short games</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button aria-label="Change" onClick={() => tool('the matching screen already in the app')} style={{ height: 44, padding: '0 16px', background: '#fff', color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flex: 1 }}>Change</button>
              <button aria-label="Open" onClick={() => tool('the matching MiniRoos screen already in the app')} style={{ height: 44, padding: '0 16px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flex: 1 }}>Open</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
