import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FIL3bDocParent({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column' }} data-lasttool={lastTool}>
      {/* Header */}
      <div style={{ background: GD, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 60, flexShrink: 0 }}>
        <button aria-label="Back" onClick={() => onNav?.('FILp1-ParentFiles')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   minWidth: 44, minHeight: 44, flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>Saturday, home to Harbour Rovers</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 1 }}>From Sam, your coach</div>
        </div>
        <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKp2-PhoneAskOpen')}
          style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                   display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px 20px 40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* When */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>When</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Sat 6 June · kick-off 9:30 · finished by 10:45</div>
        </div>

        {/* Where */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>Where</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 10 }}>Wattle Creek Reserve, pitch 2 · gate on Banksia Street</div>
          <button onClick={() => tool('Directions')}
            style={{ minHeight: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${G}`,
                     background: PALE, fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Directions
          </button>
        </div>

        {/* Live change */}
        <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: G, flexShrink: 0 }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: G }}>Updated</div>
          </div>
          <div style={{ fontSize: 14, color: INK, lineHeight: 1.5 }}>Changed last night: meet time is now 8:40. Tick the list as you pack.</div>
        </div>

        {/* Duty */}
        <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 4 }}>On duty</div>
          <div style={{ fontSize: 14, color: INK }}>You are on duty. Oranges at half-time.</div>
        </div>

        {/* Add to calendar */}
        <button onClick={() => tool('Add to my calendar')}
          style={{ width: '100%', minHeight: 44, borderRadius: 14, border: `1.5px solid ${LN}`,
                   background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>
          Add to my calendar
        </button>
      </div>
    </div>
  )
}
