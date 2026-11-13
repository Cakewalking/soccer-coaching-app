import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function EDUp1PlayerLearn({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [played, setPlayed] = useState<string | null>(null)
  const [didIt, setDidIt] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

  const lessons = [
    { id: 'l1', al: 'Weak-foot finish across the keeper Leo, U13 · 7 seconds', title: 'Weak-foot finish across the keeper', credit: 'Leo, U13', dur: '7 seconds' },
    { id: 'l2', al: 'Passing with the other foot Ava, U13 Girls · 9 seconds', title: 'Passing with the other foot', credit: 'Ava, U13 Girls', dur: '9 seconds' },
    { id: 'l3', al: 'Stepping up together U14 back four · 14 seconds', title: 'Stepping up together', credit: 'U14 back four', dur: '14 seconds' },
    { id: 'l4', al: 'Closing the space behind the press Grace, your team · 11 seconds', title: 'Closing the space behind the press', credit: 'Grace, your team', dur: '11 seconds' },
  ]

  const navItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Clips', icon: 'clips' },
    { label: 'Learn', icon: 'learn', active: true },
    { label: 'Goals', icon: 'goals' },
    { label: 'Me', icon: 'me' },
  ]

  function NavIcon({ icon, active }: { icon: string; active?: boolean }) {
    const c = active ? G : MUT
    if (icon === 'home') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    if (icon === 'clips') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    if (icon === 'learn') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
    if (icon === 'goals') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  }

  return (
    <div data-lasttool={lastTool} style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '14px 20px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', flex: 1 }}>Learn</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>S</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '0 0 80px', overflowY: 'auto' }}>
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 4 }}>This week from Sam</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 8 }}>Short videos of your teammates. Watch them and try it at training.</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>No likes, no comments, no counts of who watched most.</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 20 }}>Sam used your pass against Ironbark to show "playing forward first time". It is in the club library.</div>

          {lessons.map(l => {
            const isPlayed = played === l.id
            return (
              <div key={l.id} style={{ position: 'relative', background: '#fff', border: `1px solid ${isPlayed ? G : LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
                {/* invisible button overlay — no text so aria-label is used by __find */}
                <button aria-label={l.al} onClick={() => { setPlayed(l.id); tool(l.id); st(`${l.title} plays, then shows what to notice.`) }} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'none', zIndex: 1 }} />
                <div style={{ background: GD, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '2px 6px' }}>{l.dur}</div>
                </div>
                <div style={{ padding: '12px', position: 'relative', zIndex: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: MUT, marginBottom: l.id === 'l2' ? 10 : 0 }}>{l.credit} · {l.dur}</div>
                  {l.id === 'l2' && !didIt && (
                    <>
                      <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>20 passes against a wall with your left foot. From "Passing with the other foot". Counts towards your goal.</div>
                      <button onClick={() => { setDidIt(true); tool('I did it'); st('Nice one. Sam can see you practised. 2 of 3 this week.') }} style={{ height: 44, width: '100%', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', position: 'relative', zIndex: 2 }}>I did it</button>
                    </>
                  )}
                  {isPlayed && l.id !== 'l2' && (
                    <div style={{ fontSize: 12, color: G, fontWeight: 600 }}>Watched</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: 390, background: '#fff', borderTop: `1px solid ${LN}`, padding: '10px 0 20px', display: 'flex', justifyContent: 'space-around' }}>
        {navItems.map(n => (
          <button
            key={n.label}
            onClick={() => n.active ? tool('Learn') : tool(n.label)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', minWidth: 44, minHeight: 44, justifyContent: 'center' }}
          >
            <NavIcon icon={n.icon} active={n.active} />
            <span style={{ fontSize: 11, color: n.active ? G : MUT, fontWeight: n.active ? 700 : 400 }}>{n.label}</span>
          </button>
        ))}
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
