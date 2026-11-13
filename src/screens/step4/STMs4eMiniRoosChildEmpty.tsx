import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function STMs4eMiniRoosChildEmpty({ onNav }: { onNav?: (s: string) => void }) {
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
        <button aria-label="Players" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Players</button>
        <div style={{ flex: 1 }} />
        <button aria-label="U9 Tom · Wattle Creek" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U9 Tom · Wattle Creek</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>T</div>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>Theo</div>
            <div style={{ fontSize: 13, color: MUT }}>U9 Tom · joined this week</div>
          </div>

          <nav style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, height: 44, display: 'flex', alignItems: 'center', padding: '0 4px', flexShrink: 0, overflow: 'hidden' }}>
            <button aria-label="Turns" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Turns</button>
            <button aria-label="Goals" onClick={() => onNav?.('MS4-MiniRoosChild')} style={snb}>Goals</button>
            <button aria-label="Who's coming" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Who's coming</button>
            <button aria-label="Consent" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Consent</button>
          </nav>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 6 }}>Nothing about Theo yet</div>
              <div style={{ fontSize: 13, color: MUT }}>After his first filmed game you will see his touches and a best moment. You can set one goal with him and his family any time.</div>
            </div>

            <div style={{ background: PALE, borderRadius: 10, padding: '14px 18px', width: '100%' }}>
              <div style={{ fontSize: 13, color: MUT }}>Each child is only ever compared with their own past.</div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              <button aria-label="Set a goal with Theo" onClick={() => tool('Pick a goal from your three things, or write one in his words.')} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Set a goal with Theo</button>
              <button aria-label="Add a note" onClick={() => onNav?.('HM1n-QuickNotes')} style={{ height: 44, padding: '0 24px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Add a note</button>
              <button aria-label="Ask" onClick={() => tool("Consent questions sent to Theo's dad.")} style={{ height: 44, padding: '0 24px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
