import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function STWa1eWhereWeAtEmpty({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 14px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snba = { ...snb, color: G, fontWeight: 700, borderBottom: `2.5px solid ${G}` }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 768, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 24, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Home" onClick={() => tool('Home')} style={tnb}>Home</button>
        <button aria-label="Squad" onClick={() => tool('Squad tab')} style={tnb}>Squad</button>
        <button aria-label="Training" onClick={() => tool('Training tab')} style={tnb}>Training</button>
        <button aria-label="Match day" onClick={() => tool('Match day tab (Sat)')} style={tnb}>Match day</button>
        <button aria-label="Clips" onClick={() => tool('Clips tab')} style={tnb}>Clips</button>
        <button aria-label="Record" onClick={() => onNav?.('REC1-RecordHub')} style={tnb}>Record</button>
        <div style={{ flex: 1 }} />
        <button aria-label="U12 Sam · Wattle Creek" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U12 Sam · Wattle Creek</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>S</div>
      </nav>

      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="Overview" onClick={() => onNav?.('PH1-HomeJuniorsSame')} style={snb}>Overview</button>
        <button aria-label="Messages" onClick={() => tool('Home › Inbox')} style={snb}>Messages</button>
        <button aria-label="Calendar" onClick={() => tool('Home › Fixtures and results')} style={snb}>Calendar</button>
        <button aria-label="Fixtures and results" onClick={() => tool('Home › Fixtures and results')} style={snb}>Fixtures and results</button>
        <button aria-label="Our style" onClick={() => tool('Home › Our style')} style={snb}>Our style</button>
        <button aria-label="Where we're at" onClick={() => onNav?.('WA1-WhereWeAt')} style={snba}>Where we're at</button>
        <button aria-label="Team staff" onClick={() => tool('Home › Team staff')} style={snb}>Team staff</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 20px' }}>
        <div style={{ maxWidth: 560, width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: INK, marginBottom: 4 }}>Where we're at</div>
            <div style={{ fontSize: 14, color: MUT }}>U12 Sam · no games recorded yet</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '24px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Clean Sheet measures the style you set and shows it here the day after. It gets clearer after three games.</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: INK }}>Your style, in six numbers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: INK }}>Each with a trend and a target</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: INK }}>Never one against another</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: INK }}>The same screen for every age. Under 12s see how they play, never the score.</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              <button aria-label="Record Saturday's game" onClick={() => onNav?.('REC1-RecordHub')} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Record Saturday's game</button>
              <button aria-label="Set our style" onClick={() => tool('Home › Our style')} style={{ height: 44, padding: '0 24px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Set our style</button>
            </div>
          </div>

          <div style={{ background: PALE, borderRadius: 12, padding: '14px 18px' }}>
            <div style={{ fontSize: 13, color: MUT }}>Set your style first so Clean Sheet knows what to look for in the recording.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
