import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function ASKd9PhoneScreen({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)
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
        <div style={{ flex: 1, fontSize: 15, fontWeight: 800, color: '#fff' }}>Coming?</div>
        <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKp2-PhoneAskOpen')} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
        </button>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>M</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '16px 16px 80px', overflowY: 'auto' }}>
        {/* Game banner */}
        <div style={{ background: GD, borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.07em', marginBottom: 2 }}>SAT 6 JUNE · 9:30 V HARBOUR ROVERS</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>Wattle Creek Reserve, pitch 2 · arrive by 9:00</div>
        </div>

        {/* Ask tip */}
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginBottom: 16, padding: '0 4px' }}>
          The button at the top right asks about this screen: "What does Mia need for Saturday?"
        </div>

        {/* Attendance question */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 4 }}>Is Mia coming on Saturday?</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>Sam needs to know by 3:00 pm on Friday.</div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { setAnswer('yes'); tool('Yes'); st('Sam can see Mia is coming.') }} style={{ flex: 1, height: 44, borderRadius: 10, background: answer === 'yes' ? G : '#fff', color: answer === 'yes' ? '#fff' : INK, border: `1.5px solid ${answer === 'yes' ? G : LN}`, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Yes</button>
            <button onClick={() => { setAnswer('no'); tool('No'); st('Sam can see Mia is away.') }} style={{ flex: 1, height: 44, borderRadius: 10, background: answer === 'no' ? '#c04040' : '#fff', color: answer === 'no' ? '#fff' : INK, border: `1.5px solid ${answer === 'no' ? '#c04040' : LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>No</button>
            <button onClick={() => { setAnswer(null); tool('Change your answer any time until 3:00 pm on the day.'); st('Change your answer any time until 3:00 pm on the day.') }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Change</button>
          </div>
        </div>

        {/* Training notice */}
        <div style={{ marginTop: 12, background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 4 }}>TUE 9 JUNE · TRAINING 5:45 PM</div>
          <div style={{ fontSize: 13, color: INK }}>Wattle Creek Reserve · pitch 1</div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: 390, background: '#fff', borderTop: `1px solid ${LN}`, padding: '10px 0 20px', display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={() => onNav?.('ASKd8-PhoneHome')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', minWidth: 44, minHeight: 44, justifyContent: 'center' }}>
          <NavIcon icon="home" />
          <span style={{ fontSize: 11, color: MUT }}>Home</span>
        </button>
        <button onClick={() => onNav?.('ASKd9-PhoneScreen')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', minWidth: 44, minHeight: 44, justifyContent: 'center' }}>
          <NavIcon icon="coming" active />
          <span style={{ fontSize: 11, color: G, fontWeight: 700 }}>Coming</span>
        </button>
        <button onClick={() => onNav?.('MSGp1-ParentMessages')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', minWidth: 44, minHeight: 44, justifyContent: 'center' }}>
          <NavIcon icon="messages" />
          <span style={{ fontSize: 11, color: MUT }}>Messages</span>
        </button>
        <button onClick={() => onNav?.('FILp1-ParentFiles')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', minWidth: 44, minHeight: 44, justifyContent: 'center' }}>
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
