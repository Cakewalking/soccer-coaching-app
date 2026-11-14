import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Job = { label: string; time: string }

export default function FILp2ParentSignUp({ onBack, onNav }: {
  onBack?: () => void
  onNav?: (s: string) => void
}) {
  const [done, setDone] = useState(false)
  const [cantHelp, setCantHelp] = useState(false)
  const [myJobs, setMyJobs] = useState<string[]>(['Oranges and ice'])

  const jobs: Job[] = [
    { label: "Scorer's table", time: 'Games 3 and 4 · 1 place' },
    { label: 'Oranges and ice', time: 'All day · 1 place left' },
    { label: 'Pack down', time: '1:15 pm · 1 place left' },
    { label: 'Lifts from the club', time: '7:45 am · 1 car needed' },
  ]

  function toggle(label: string) {
    setMyJobs(j => j.includes(label) ? j.filter(x => x !== label) : [...j, label])
  }

  if (done) {
    return (
      <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>All done!</div>
        <div style={{ fontSize: 14, color: MUT }}>Sam can see you responded.</div>
      </div>
    )
  }

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 10, minHeight: 60, flexShrink: 0 }}>
        <button aria-label="Back" onClick={() => onNav?.('FILp1-ParentFiles') ?? onBack?.()}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   minWidth: 44, minHeight: 44, flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U12 Sam · sign-up</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Summer sevens: can you help?</div>
        </div>
        <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKp2-PhoneAskOpen')}
          style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                   display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
        </div>
      </div>

      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 4 }}>Sat 13 Dec at Banksia Park. Pick one, or more if you like.</div>
        <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>You did canteen twice this season, so those are not shown first. Full jobs are hidden.</div>

        {jobs.map(j => {
          const mine = myJobs.includes(j.label)
          return (
            <div key={j.label} onClick={() => toggle(j.label)}
              style={{ background: mine ? PALE : '#fff', border: `1.5px solid ${mine ? G : LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: mine ? G : LN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {mine && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{j.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{j.time}</div>
                </div>
                {mine && <div style={{ fontSize: 12, color: G, fontWeight: 700 }}>Yours</div>}
              </div>
            </div>
          )
        })}

        {!cantHelp && (
          <button onClick={() => setCantHelp(true)}
            style={{ width: '100%', minHeight: 44, borderRadius: 14, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: MUT, cursor: 'pointer', fontFamily: 'inherit', marginTop: 4 }}>
            Can't help this time
          </button>
        )}
        {cantHelp && (
          <div style={{ background: PALE, borderRadius: 14, padding: '12px 16px', marginTop: 4, fontSize: 13, color: G }}>Noted, no worries. Sam can see you responded.</div>
        )}

        <button onClick={() => setDone(true)}
          style={{ width: '100%', minHeight: 50, borderRadius: 14, background: G, color: '#fff', border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 16 }}>
          Done
        </button>
      </div>
    </div>
  )
}
