import { useState } from 'react'
import { EmptyCard } from '../clubadmin/ui'

type Attending = 'yes' | 'maybe' | 'no' | 'away'

const PLAYERS: { ini: string; name: string; status: Attending; note?: string }[] = [
  { ini: 'IC', name: 'Ivy Chen', status: 'yes' },
  { ini: 'MB', name: 'Max Bailey', status: 'yes' },
  { ini: 'AK', name: 'Arlo Kaur', status: 'yes' },
  { ini: 'ZM', name: 'Zara Moore', status: 'yes' },
  { ini: 'LW', name: 'Leo Wright', status: 'yes' },
  { ini: 'EN', name: 'Evie Nolan', status: 'yes' },
  { ini: 'TS', name: 'Theo Santos', status: 'yes' },
  { ini: 'PD', name: 'Poppy Dunn', status: 'maybe', note: 'Not sure yet' },
  { ini: 'OH', name: 'Omar Haddad', status: 'away', note: 'Away' },
  { ini: 'JL', name: 'Jude Lim', status: 'no', note: 'No answer' },
]

const STATUS_LABEL: Record<Attending, string> = { yes: 'Coming', maybe: 'Maybe', no: 'No answer', away: 'Away' }
const STATUS_BG: Record<Attending, string> = { yes: '#2f6252', maybe: '#cbbeb5', no: '#c39797', away: '#e9eae8' }
const STATUS_COLOR: Record<Attending, string> = { yes: '#fff', maybe: '#10211f', no: '#10211f', away: '#10211f' }

export default function ComingMiniRoos({ empty }: { empty?: boolean }) {
  const [toast, setToast] = useState('')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3200) }

  if (empty) return <EmptyCard icon="M20 6L9 17l-5-5" title="Answers appear when families join" desc="Each week, parents get one question: can they make it? Their answers line up here." cta="Copy the team link" sidebarTitle="How it works" items={[{ title: 'Asked on Monday', desc: 'One tap to answer' }, { title: 'Reminded once', desc: "On Thursday, if there's no answer" }, { title: 'You see the count', desc: 'And who to chase' }]} />

  const coming = PLAYERS.filter(p => p.status === 'yes').length
  const notSure = PLAYERS.filter(p => p.status === 'maybe').length
  const noAnswer = PLAYERS.filter(p => p.status === 'no').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Who's coming</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>U9 Tom · Saturday 6 Jun</span>
        </div>
        <button onClick={() => showToast('Reminder sent to 2 families.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Remind 2 families</button>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 300px' }}>

        {/* Player list */}
        <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px 8px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 12px', borderRadius: '999px', fontSize: 13, fontWeight: 700, background: '#2f6252', color: '#fff' }}>Coming · {coming}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 12px', borderRadius: '999px', fontSize: 13, fontWeight: 700, background: '#cbbeb5', color: '#10211f' }}>Maybe · {notSure}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 12px', borderRadius: '999px', fontSize: 13, fontWeight: 700, background: '#c39797', color: '#10211f' }}>No answer · {noAnswer}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1.5fr', gap: 10, paddingBottom: 8 }}>
            {['Child', 'Answer', 'Note'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>{h}</span>
            ))}
          </div>

          {PLAYERS.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1.5fr', gap: 10, alignItems: 'center', minHeight: 50, borderTop: '1px solid #e9eae8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '999px', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{p.ini}</span>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{p.name}</span>
              </span>
              <span>
                <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: STATUS_BG[p.status], color: STATUS_COLOR[p.status], whiteSpace: 'nowrap' as const }}>
                  {STATUS_LABEL[p.status]}
                </span>
              </span>
              <span style={{ fontSize: 14, color: '#4a5a57' }}>{p.note || '—'}</span>
            </div>
          ))}

          <span style={{ fontSize: 14, color: '#4a5a57', marginTop: 'auto', paddingTop: 8 }}>Families answer from their app. The game-day turns are updated when everyone has replied.</span>
        </section>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section style={{ flexShrink: 0, background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Tonight · training</h2>
            <span style={{ fontSize: 14, color: '#4a5a57' }}>8 of 10 have confirmed. Jude and Poppy are unconfirmed. The session plan adjusts to whoever turns up.</span>
          </section>
          <section style={{ flexShrink: 0, background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>How families answer</h2>
            {[
              { n: '1', text: 'They get a notification Thursday morning' },
              { n: '2', text: 'One tap — coming, not sure, can\'t make it' },
              { n: '3', text: 'You see it here straight away' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, minHeight: 44 }}>
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{item.n}</span>
                <span style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', paddingTop: 3 }}>{item.text}</span>
              </div>
            ))}
          </section>
          <section style={{ flexGrow: 1, background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Not answered by Friday?</h2>
            <span style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>A reminder goes out automatically Friday at 6 pm to anyone who hasn't replied.</span>
            <button onClick={() => showToast('Reminder sent to Jude\'s family.')} style={{ height: 40, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left' as const }}>Nudge Jude's family now →</button>
          </section>
        </div>
      </main>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
