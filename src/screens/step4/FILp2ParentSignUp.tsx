import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Job = { label: string; time: string; places: number; taken: boolean }

export default function FILp2ParentSignUp() {
  const [toast, setToast] = useState<string | null>(null)
  const [cantHelp, setCantHelp] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([
    { label: 'Canteen set-up', time: 'Sat 13 Dec · 8:00 am', places: 1, taken: false },
    { label: 'Oranges and water', time: 'Sat 13 Dec · all day', places: 2, taken: false },
    { label: 'Pack-up canteen', time: 'Sat 13 Dec · 1:00 pm', places: 2, taken: false },
    { label: 'Photos', time: 'Sat 13 Dec · 9:00 am', places: 1, taken: false },
  ])
  const [myJobs, setMyJobs] = useState<string[]>([])
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  function toggle(label: string) {
    if (myJobs.includes(label)) {
      setMyJobs(j => j.filter(x => x !== label))
      setJobs(js => js.map(j => j.label === label ? { ...j, taken: false } : j))
      st('Place given back.')
    } else {
      setMyJobs(j => [...j, label])
      setJobs(js => js.map(j => j.label === label ? { ...j, taken: true } : j))
      st('Done! You\'re on the list.')
    }
  }

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }}>
      <div style={{ background: GD, padding: '24px 20px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U12 Sam · sign-up</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Summer sevens · who can help</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Closes Thu 11 Dec 6:00 pm</div>
      </div>

      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>Tap a job to take it. Tap again to give it back before closing time.</div>

        {jobs.map(j => {
          const mine = myJobs.includes(j.label)
          return (
            <div key={j.label} onClick={() => toggle(j.label)} style={{ background: mine ? PALE : '#fff', border: `1.5px solid ${mine ? G : LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: mine ? G : LN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {mine && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{j.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{j.time}</div>
                </div>
                {mine && <div style={{ fontSize: 12, color: G, fontWeight: 700 }}>You're on this</div>}
              </div>
            </div>
          )
        })}

        {!cantHelp && (
          <button onClick={() => { setCantHelp(true); st('Noted. No worries.') }} style={{ width: '100%', height: 44, borderRadius: 14, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: MUT, cursor: 'pointer', fontFamily: 'inherit', marginTop: 4 }}>Can't help this time</button>
        )}
        {cantHelp && (
          <div style={{ background: PALE, borderRadius: 14, padding: '12px 16px', marginTop: 4, fontSize: 13, color: G }}>Noted, no worries. Sam can see you responded.</div>
        )}
      </div>

      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '12px 20px', display: 'flex', justifyContent: 'space-around' }}>
        {['Home', 'Chat', 'Files', 'More'].map(t => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{ width: 24, height: 24 }} />
            <div style={{ fontSize: 10, color: t === 'Files' ? G : MUT }}>{t}</div>
          </div>
        ))}
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
