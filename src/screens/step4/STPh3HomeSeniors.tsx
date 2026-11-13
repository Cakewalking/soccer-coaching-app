import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function STPh3HomeSeniors({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 14px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const tnba = { ...tnb, background: 'rgba(255,255,255,0.15)' as const, color: '#fff', fontWeight: 700 }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snba = { ...snb, color: G, fontWeight: 700, borderBottom: `2.5px solid ${G}` }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 768, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 24, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Home" onClick={() => tool('Home')} style={tnba}>Home</button>
        <button aria-label="Squad" onClick={() => tool('Squad tab')} style={tnb}>Squad</button>
        <button aria-label="Training" onClick={() => tool('Training tab')} style={tnb}>Training</button>
        <button aria-label="Match day" onClick={() => tool('Match day tab (Sat)')} style={tnb}>Match day</button>
        <button aria-label="Clips" onClick={() => tool('Clips tab')} style={tnb}>Clips</button>
        <button aria-label="Record" onClick={() => onNav?.('REC1-RecordHub')} style={tnb}>Record</button>
        <div style={{ flex: 1 }} />
        <button aria-label="Men's 1sts" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>Men's 1sts</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>R</div>
      </nav>

      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="Overview" onClick={() => onNav?.('PH3-HomeSeniorsSame')} style={snba}>Overview</button>
        <button aria-label="Messages" onClick={() => tool('Home › Inbox')} style={snb}>Messages</button>
        <button aria-label="Calendar" onClick={() => tool('Home › Fixtures and results')} style={snb}>Calendar</button>
        <button aria-label="Fixtures and results" onClick={() => tool('Home › Fixtures and results')} style={snb}>Fixtures and results</button>
        <button aria-label="Our style" onClick={() => tool('Home › Our style')} style={snb}>Our style</button>
        <button aria-label="Where we're at" onClick={() => onNav?.('WA1-WhereWeAt')} style={snb}>Where we're at</button>
        <button aria-label="Team staff" onClick={() => tool('Home › Team staff')} style={snb}>Team staff</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button aria-label="Ask about Men's 1sts… Who is one yellow from a ban?" onClick={() => onNav?.('ASKd2-HomeFocus')} style={{ width: '100%', textAlign: 'left', background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '0 20px', fontSize: 14, color: MUT, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', height: 44 }}>
            Ask about Men's 1sts… Who is one yellow from a ban?
          </button>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ background: GD, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.07em' }}>TONIGHT · 7:30 pm · Wattle Creek Reserve</span>
              <button aria-label="Open the plan" onClick={() => tool('Training tab')} style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 6, padding: '0 12px', cursor: 'pointer', fontFamily: 'inherit', height: 44, display: 'flex', alignItems: 'center' }}>Open the plan</button>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 6 }}>90 minutes · 5 drills · built from Saturday and Banksia Park's last two games</div>
              <div style={{ fontSize: 13, color: G, fontWeight: 700, marginBottom: 12 }}>Compact middle: keep. Set pieces against: tonight.</div>
              <button aria-label="Review" onClick={() => tool('Match day › Review')} style={{ height: 44, padding: '0 20px', background: PALE, color: G, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Review</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 8 }}>SQUAD FITNESS</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>18 fit, 2 on modified training, 1 suspended. Team sheet is due Friday 6:00 pm.</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>Ryan Petersen is suspended for Saturday</div>
            <button aria-label="Squad" onClick={() => tool('Squad tab')} style={{ height: 44, padding: '0 20px', background: PALE, color: G, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Squad</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.07em' }}>MESSAGES</span>
              <button aria-label="All messages · 5 more" onClick={() => tool('Home › Inbox')} style={{ fontSize: 13, fontWeight: 700, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', height: 44, display: 'flex', alignItems: 'center' }}>All messages · 5 more</button>
            </div>
            <div style={{ fontSize: 13, color: INK }}>Jordan: Confirmed for tonight, also Saturday.</div>
          </div>
        </div>

        <div style={{ width: 420, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: INK }}>Where we're at</span>
              <button aria-label="All 6" onClick={() => onNav?.('WA3-WhereWeAtSeniors')} style={{ fontSize: 13, fontWeight: 700, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', height: 44, minWidth: 44, display: 'flex', alignItems: 'center' }}>All 6</button>
            </div>
            <div style={{ fontSize: 13, color: G, fontWeight: 700, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>Set pieces against · Tonight · 4 a game</div>
            <div style={{ fontSize: 13, color: INK, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>Compact middle: keep. Set pieces against: tonight.</div>
            <div style={{ fontSize: 13, color: MUT, padding: '10px 0' }}>Winning the ball back · Keep · 5 seconds</div>
          </div>
        </div>
      </div>
    </div>
  )
}
