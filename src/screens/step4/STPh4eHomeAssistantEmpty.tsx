import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function STPh4eHomeAssistantEmpty({ onNav }: { onNav?: (s: string) => void }) {
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
        <button aria-label="U12 Sam · Wattle Creek" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U12 Sam · Wattle Creek</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>J</div>
      </nav>

      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="Overview" onClick={() => onNav?.('PH4-HomeAssistantSame')} style={snba}>Overview</button>
        <button aria-label="Messages" onClick={() => tool('Home › Inbox')} style={snb}>Messages</button>
        <button aria-label="Calendar" onClick={() => tool('Home › Fixtures and results')} style={snb}>Calendar</button>
        <button aria-label="Fixtures and results" onClick={() => tool('Home › Fixtures and results')} style={snb}>Fixtures and results</button>
        <button aria-label="Our style" onClick={() => tool('Home › Our style')} style={snb}>Our style</button>
        <button aria-label="Where we're at" onClick={() => onNav?.('WA1-WhereWeAt')} style={snb}>Where we're at</button>
        <button aria-label="Team staff" onClick={() => tool('Home › Team staff')} style={snb}>Team staff</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button aria-label="Ask about U12 Sam… How do I plan a session?" onClick={() => onNav?.('ASKd2-HomeFocus')} style={{ width: '100%', textAlign: 'left', background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '0 20px', fontSize: 14, color: MUT, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', height: 44 }}>
            Ask about U12 Sam… How do I plan a session?
          </button>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '24px 24px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Sam added you to U12 Sam. Nothing needs you yet. As the squad, games and sessions go in, this becomes the same Home Sam sees.</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              <button aria-label="See who does what" onClick={() => tool('Home › Team staff')} style={{ height: 44, padding: '0 20px', background: PALE, color: G, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>See who does what</button>
              <button aria-label="Message Sam" onClick={() => tool('Chat with Sam opens.')} style={{ height: 44, padding: '0 20px', background: '#fff', color: G, border: `1.5px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Message Sam</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px 24px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: INK, marginBottom: 12 }}>You can do together</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
              <div style={{ fontSize: 13, color: INK }}>Plans, line-ups, clips, reviews</div>
              <div style={{ fontSize: 13, color: MUT }}>The squad, our style and player goals stay with Sam</div>
              <div style={{ fontSize: 13, color: MUT }}>You see how many need a look, not the answers</div>
            </div>
          </div>
        </div>

        <div style={{ width: 420, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px 24px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>Sam can change this on Team staff.</div>
            <div style={{ fontSize: 12, color: MUT }}>Any time from Team staff.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
