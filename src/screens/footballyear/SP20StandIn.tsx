import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SP20StandIn(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Hand over to Jess Wu</div>
          <div style={{ fontSize: 14, color: MUT }}>26 September to 11 October · 3 games</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Opening message to Jess')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Message Jess</button>
          <button onClick={() => t('Hand-over confirmed. Jess, Rob and families have been told.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Confirm hand-over</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Who's leading */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Who leads the team while you're away</div>
            {[
              {
                initials: 'JW', name: 'Jess Wu',
                role: 'Co-coach · leads training and games',
                badge: 'WWC checked',
                badgeColor: G,
                detail: 'Already on the team. Knows the players. Can see all sessions from September.',
              },
              {
                initials: 'RO', name: 'Rob Owusu',
                role: 'Team manager · logistics and communication',
                badge: 'WWC checked',
                badgeColor: G,
                detail: 'Sends match day info, collects fees, communicates with families.',
              },
              {
                initials: 'LT', name: 'Linh Tran',
                role: 'Support role · available but needs WWC check first',
                badge: 'WWC pending',
                badgeColor: '#8b3a3a',
                detail: 'Cannot lead a session until the check clears.',
              },
            ].map(person => (
              <div key={person.name} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${LN}`, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 12, fontWeight: 700, color: G }}>{person.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{person.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: person.badgeColor === G ? PALE : '#fff5f5', color: person.badgeColor }}>{person.badge}</span>
                  </div>
                  <div style={{ fontSize: 12, color: MUT, marginBottom: 2 }}>{person.role}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{person.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* What Jess can do */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>What Jess can do in the app</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
              {[
                { label: 'Run sessions', on: true },
                { label: 'Log injuries', on: true },
                { label: 'Send messages to families', on: true },
                { label: 'See player development data', on: true },
                { label: 'Change season dates', on: false },
                { label: 'Remove players from the squad', on: false },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: '#f7f8f7' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${item.on ? G : LN}`, background: item.on ? G : '#fff', flex: 'none' }} />
                  <div style={{ fontSize: 13, color: item.on ? INK : MUT }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: dates and games */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Dates away</div>
            <div style={{ background: PALE, borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Hand-over period</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>26 Sep – 11 Oct</div>
            </div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Jess leads 2 games and training in between. You come back for the final round.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Before you go</div>
            {[
              { text: 'Confirm Jess knows the game plan', done: true },
              { text: 'Give Rob the weekly checklist', done: true },
              { text: 'Linh Tran WWC check still pending', done: false },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', gap: 10, padding: '6px 0', borderBottom: `1px solid ${LN}`, alignItems: 'flex-start' }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: item.done ? G : '#fff', border: `2px solid ${item.done ? G : LN}`, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                  {item.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div style={{ fontSize: 13, color: item.done ? MUT : INK, textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
