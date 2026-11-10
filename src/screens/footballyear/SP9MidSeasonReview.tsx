import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const CHATS = [
  { initials: 'MT', name: 'Mia Tran',    goal: 'Play forward on her first touch',   when: 'Tue 9 Jun, after training', status: 'On track' },
  { initials: 'LM', name: 'Leo Marsh',   goal: 'Use his left foot to pass',         when: 'Tue 9 Jun, after training', status: 'Needs a new step' },
  { initials: 'GO', name: 'Grace Owusu', goal: 'Talk to her back four',              when: 'Thu 11 Jun',                status: 'Done early' },
  { initials: 'EB', name: 'Ella Brandt', goal: 'Enjoy it again',                    when: 'With her mum, by phone',    status: 'Go gently' },
]

const statusColor = (s: string) => s === 'On track' ? G : s === 'Done early' ? G : s === 'Needs a new step' ? '#7a5a1a' : MUT

export default function SP9MidSeasonReview({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Mid-season reviews</div>
          <div style={{ fontSize: 14, color: MUT }}>Thu 4 June · round 9 of 18 · halfway</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>The football year</button>
          <button onClick={() => t('10-minute chats offered to 13 families for the next two weeks.')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Book the rest</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Chats list */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '10px 16px', background: G, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Ten minutes with each player</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>4 booked · 13 to go</span>
            </div>
            {CHATS.map(chat => (
              <div key={chat.name} style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) auto', gap: 12, padding: '12px 16px', alignItems: 'center', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 11, fontWeight: 700, color: G }}>{chat.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{chat.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>Goal: {chat.goal} · {chat.when}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: statusColor(chat.status), whiteSpace: 'nowrap' as const }}>{chat.status}</span>
              </div>
            ))}
            <div style={{ padding: '10px 16px', background: '#f9faf9', fontSize: 12, color: MUT }}>4 of 17 shown. Each chat has the player's own clips and their goal. A parent is welcome at every one.</div>
          </div>

          <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px' }}>
            <div style={{ fontSize: 13, color: GD, lineHeight: 1.5 }}>Each chat is one thing going well, one thing to try, and a question for the player.</div>
          </div>
        </div>

        {/* Right */}
        <div>
          {/* Regrade */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 6 }}>The league's regrade window opens Monday</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 10 }}>One request per team, mid-season. U12 Sam is fine where it is.</div>
            <button onClick={() => t('Opening grading')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Open grading</button>
          </div>

          {/* Also at halfway */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Also at halfway</div>
            {[
              { label: 'Mid-season tests',   note: '13 to 20 June · the same four as March' },
              { label: 'Fair minutes check', note: 'Everyone within 6 minutes of the average' },
              { label: 'A note to families', note: "What's going well, drafted for you", action: 'Read', onAct: () => t("Draft opened. Change any word before it goes.") },
            ].map(item => (
              <div key={item.label} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{item.note}</div>
                </div>
                {item.action && <button onClick={item.onAct} style={{ height: 32, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{item.action}</button>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
