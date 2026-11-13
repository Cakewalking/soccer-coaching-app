import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function ASKd8PhoneHome({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [coming, setComing] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

  function NavIcon({ icon, active }: { icon: string; active?: boolean }) {
    const c = active ? G : MUT
    if (icon === 'home') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    if (icon === 'coming') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    if (icon === 'messages') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  }

  return (
    <div data-lasttool={lastTool} style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
      {/* Title bar */}
      <div style={{ background: GD, padding: '14px 20px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 800, color: '#fff' }}>Home</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>M</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '0 0 80px', overflowY: 'auto' }}>
        {/* Ask line */}
        <button onClick={() => onNav?.('ASKp2-PhoneAskOpen')} style={{ width: '100%', textAlign: 'left', background: '#fff', border: 'none', borderBottom: `1px solid ${LN}`, padding: '12px 20px', fontSize: 13, color: MUT, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', minHeight: 44 }}>
          Ask about Mia…
        </button>

        {/* Upcoming game */}
        <div style={{ margin: '16px 16px 0', background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ background: GD, padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>NEXT GAME</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>9:30 v Harbour Rovers, home</div>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 13, color: INK, marginBottom: 4 }}>Be there by 9:00 · Wattle Creek Reserve, pitch 2</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Mia's check-in opens at 5:15</div>
            {!coming ? (
              <button onClick={() => { setComing(true); tool('Mia is coming'); st('Sam can see Mia is coming.') }} style={{ height: 44, width: '100%', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Mia is coming</button>
            ) : (
              <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: '#eef5f2', fontSize: 13, fontWeight: 700, color: G }}>Marked as coming</div>
            )}
          </div>
        </div>

        {/* Notice */}
        <div style={{ margin: '12px 16px 0', background: '#fff', border: `1px solid #f0c060`, borderRadius: 12, padding: '12px 16px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#b08020', marginBottom: 2 }}>UPDATE FROM SAM</div>
          <div style={{ fontSize: 13, color: INK }}>Meet time is now 8:40 on Saturday.</div>
        </div>

        {/* Recent training */}
        <div style={{ margin: '12px 16px 0', background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 4 }}>LAST TRAINING</div>
          <div style={{ fontSize: 13, color: INK }}>Tuesday · 5:45 pm · Wattle Creek Reserve</div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: 390, background: '#fff', borderTop: `1px solid ${LN}`, padding: '10px 0 20px', display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={() => onNav?.('ASKd8-PhoneHome')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', minWidth: 44, minHeight: 44, justifyContent: 'center' }}>
          <NavIcon icon="home" active />
          <span style={{ fontSize: 11, color: G, fontWeight: 700 }}>Home</span>
        </button>
        <button onClick={() => onNav?.('ASKd9-PhoneScreen')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', minWidth: 44, minHeight: 44, justifyContent: 'center' }}>
          <NavIcon icon="coming" />
          <span style={{ fontSize: 11, color: MUT }}>Coming</span>
        </button>
        <button onClick={() => onNav?.('MSGp1-ParentMessages')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', minWidth: 44, minHeight: 44, justifyContent: 'center' }}>
          <NavIcon icon="messages" />
          <span style={{ fontSize: 11, color: MUT }}>Messages</span>
        </button>
        <button onClick={() => tool('Mia')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', minWidth: 44, minHeight: 44, justifyContent: 'center' }}>
          <NavIcon icon="mia" />
          <span style={{ fontSize: 11, color: MUT }}>Mia</span>
        </button>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
