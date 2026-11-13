import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function STMs4MiniRoosChild({ onNav }: { onNav?: (s: string) => void }) {
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
        <button aria-label="Players" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Players</button>
        <div style={{ flex: 1 }} />
        <button aria-label="U9 Tom · Wattle Creek" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U9 Tom · Wattle Creek</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>T</div>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>Poppy</div>
            <div style={{ fontSize: 13, color: MUT }}>U9 Tom · joined in term 2 · against her own last month</div>
          </div>

          <nav style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, height: 44, display: 'flex', alignItems: 'center', padding: '0 4px', flexShrink: 0, overflow: 'hidden' }}>
            <button aria-label="Turns" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Turns</button>
            <button aria-label="Goals" onClick={() => onNav?.('MS4-MiniRoosChild')} style={snba}>Goals</button>
            <button aria-label="Who's coming" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Who's coming</button>
            <button aria-label="Consent" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Consent</button>
          </nav>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 10 }}>CURRENT GOAL</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 4 }}>"Take someone on and keep going."</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>Set with her mum on 12 May. She tried 3 dribbles on Saturday, her first three.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button aria-label="She did it" onClick={() => tool('Marked as done. Poppy and her mum get a well done, and you pick the next goal together.')} style={{ height: 44, padding: '0 20px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>She did it</button>
              <button aria-label="Change the goal" onClick={() => tool('Pick a goal from your three things, or write one in her words.')} style={{ height: 44, padding: '0 20px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Change the goal</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em' }}>HER NUMBERS</div>
              <button aria-label="All 4" onClick={() => tool('MiniRoos: a best moment each')} style={{ fontSize: 13, fontWeight: 700, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', height: 44, minWidth: 44, display: 'flex', alignItems: 'center' }}>All 4</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
              <div style={{ position: 'relative' as const, background: '#f4f6f5', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Touches</div>
                  <div style={{ fontSize: 12, color: MUT }}>Getting better · 18 a game · Was 9 last month</div>
                </div>
                <button aria-label="Touches Getting better 18 a game Was 9 last month" onClick={() => tool('Touches in each of her last 5 games.')} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
              </div>
              <div style={{ position: 'relative' as const, background: '#f4f6f5', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Dribbles tried</div>
                  <div style={{ fontSize: 12, color: MUT }}>New · 3 a game · Her first three, all on Saturday</div>
                </div>
                <button aria-label="Dribbles tried New 3 a game Her first three, all on Saturday" onClick={() => tool('Clips of her three dribbles.')} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
              </div>
              <div style={{ position: 'relative' as const, background: '#f4f6f5', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Passes to a friend</div>
                  <div style={{ fontSize: 12, color: MUT }}>About the same · 4 a game · Same as last month</div>
                </div>
                <button aria-label="Passes to a friend About the same 4 a game Same as last month" onClick={() => tool('Passes in each of her last 5 games.')} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 8 }}>NOTES</div>
            <div style={{ fontSize: 13, color: INK, marginBottom: 4 }}>"Asks for the ball now." 2 June. "Quiet at the start, fine once playing." 19 May.</div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button aria-label="Note for her family" onClick={() => onNav?.('HM6n-SeasonNoteOne')} style={{ height: 44, padding: '0 16px', background: '#fff', color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flex: 1 }}>Note for her family</button>
              <button aria-label="Add" onClick={() => onNav?.('HM1n-QuickNotes')} style={{ height: 44, padding: '0 16px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add</button>
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px 18px' }}>
            <button aria-label="Send a best moment" onClick={() => tool('MiniRoos: a best moment each')} style={{ height: 44, width: '100%', background: PALE, color: G, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send a best moment</button>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 6 }}>ABOUT THIS PAGE</div>
            <div style={{ fontSize: 12, color: MUT }}>No rating, no score, nothing that puts Poppy above or below another child. Her family sees the goal, the best moments and your note.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
