import { useState } from 'react'

type RefView = 'asked' | 'games' | 'report' | 'feedback' | 'me'

function PhoneShell({ children, activeTab, onTab }: { children: React.ReactNode; activeTab: RefView; onTab: (v: RefView) => void }) {
  const tabs: Array<{ id: RefView; label: string; icon: string }> = [
    { id: 'games',    label: 'My games', icon: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' },
    { id: 'report',   label: 'Report',   icon: 'M12 8v4m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z' },
    { id: 'feedback', label: 'Feedback', icon: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
    { id: 'me',       label: 'Me',       icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' },
  ]

  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f5f6f4', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      <div style={{ background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', height: 56, flexShrink: 0 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => onTab(tab.id)} style={{ flex: 1, border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, fontFamily: 'inherit', fontSize: 10, fontWeight: tab.id === activeTab ? 700 : 600, color: tab.id === activeTab ? '#2f6252' : '#4a5a57', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon}/></svg>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function RefAsked({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  return (
    <>
      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px' }}>
        <div style={{ fontSize: 12, color: '#cfe6dc' }}>Wattle Creek FC · referees</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 2 }}>Can you do a game?</div>
        <div style={{ width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, marginTop: 10 }}>ZP</div>
      </div>

      <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* From */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#4a5a57', marginBottom: 6 }}>From Ruth, referee coordinator</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>U13 Girls Meg v Northgate City</div>
          <div style={{ fontSize: 15, color: '#2f6252', fontWeight: 600, marginBottom: 10 }}>Assistant referee · Sat 6 Jun · 12:00 · pitch 1</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            {[
              { label: 'Be there by', value: '11:40' },
              { label: 'Game length', value: '2 × 30 minutes' },
              { label: 'Referee', value: 'Appointed by the league' },
              { label: 'Your other game', value: '8:30 · U7 Dan, pitch 5' },
            ].map(r => (
              <div key={r.label} style={{ background: '#f7f8f7', borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, color: '#4a5a57', fontWeight: 700, marginBottom: 2 }}>{r.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Support note */}
        <div style={{ background: '#eef5f2', borderRadius: 14, padding: '12px 14px', fontSize: 14, color: '#2f6252', lineHeight: '20px' }}>
          You won't be on your own. Ruth is at the ground all day, and the ground marshal in the hi-vis vest steps in if anyone on the sideline gives you a hard time.
        </div>
        <div style={{ fontSize: 13, color: '#4a5a57', textAlign: 'center' as const }}>Three other referees were asked too. The first to say yes gets it.</div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onAccept} style={{ flexGrow: 1, height: 52, borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Yes, I'll do it</button>
          <button onClick={onDecline} style={{ flexGrow: 1, height: 52, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Can't this time</button>
        </div>
      </div>
    </>
  )
}

function RefGames() {
  return (
    <>
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px' }}>
        <div style={{ fontSize: 12, color: '#cfe6dc' }}>Wattle Creek FC · game leader, Level 4</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 2 }}>Hi Zoe</div>
        <div style={{ width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, marginTop: 10 }}>ZP</div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ background: '#eef5f2', borderRadius: 14, padding: '12px 14px', fontSize: 14, color: '#2f6252', lineHeight: '20px' }}>
          Ruth asked: can you do 12:00 Saturday? Assistant referee · U13 Girls Meg
        </div>

        {[
          { date: 'SAT 6 JUN', games: [
            { time: '8:30',  desc: 'U7 Dan v Ironbark United', role: 'Game leader · pitch 5 · festival', mine: true },
            { time: '12:00', desc: 'U13 Girls Meg v Northgate', role: 'Assistant referee · pitch 1', asked: true },
          ]},
          { date: 'SAT 13 JUN', games: [
            { time: '9:00',  desc: 'U9 Mark v Bayside Lions', role: 'Game leader · pitch 4', mine: true },
            { time: '10:30', desc: 'U11 Luke v Glenview Park', role: 'Game leader · pitch 3', asked: true },
          ]},
        ].map((week, wi) => (
          <div key={wi} style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#4a5a57', marginBottom: 10 }}>{week.date}</div>
            {week.games.map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1ef' : 'none', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 44, fontSize: 13, fontWeight: 600, color: '#2f6252', paddingTop: 2 }}>{g.time}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{g.desc}</div>
                  <div style={{ fontSize: 13, color: '#4a5a57' }}>{g.role}</div>
                </div>
                {g.mine && <span style={{ padding: '3px 8px', borderRadius: '999px', background: '#eef5f2', color: '#2f6252', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>Yours</span>}
                {g.asked && <span style={{ padding: '3px 8px', borderRadius: '999px', background: '#f5f3ef', color: '#7a5a00', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>Asked</span>}
              </div>
            ))}
          </div>
        ))}

        <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8', display: 'flex', gap: 16 }}>
          {[{ label: 'Games', value: '21' }, { label: 'Feedback', value: '19 great or good' }].map(s => (
            <div key={s.label} style={{ flex: 1 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#10211f' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#4a5a57' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: '#4a5a57', textAlign: 'center' as const }}>You see your games and nothing about the players.</div>
      </div>
    </>
  )
}

function RefReport({ onSend }: { onSend: () => void }) {
  const [what, setWhat] = useState<string | null>(null)
  const [team, setTeam] = useState<string | null>(null)
  const [why, setWhy] = useState<string | null>(null)

  return (
    <>
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>U13 Girls Meg v Northgate City · Sat 6 Jun</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 2 }}>Report something</div>
        <div style={{ width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, marginTop: 10 }}>ZP</div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* What happened */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57', marginBottom: 8 }}>What happened</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Yellow card', 'Red card', 'Injury', 'Sideline behaviour', 'Nothing to report'].map(opt => (
              <button key={opt} onClick={() => setWhat(opt)} style={{ height: 44, borderRadius: 10, border: `2px solid ${what === opt ? '#2f6252' : '#c5c8c4'}`, background: what === opt ? '#eef5f2' : '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: what === opt ? 700 : 500, color: what === opt ? '#2f6252' : '#10211f', cursor: 'pointer' }}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {what && what !== 'Nothing to report' && (
          <>
            {/* Team */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57', marginBottom: 8 }}>Team</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Wattle Creek', 'Northgate City'].map(t => (
                  <button key={t} onClick={() => setTeam(t)} style={{ flex: 1, height: 44, borderRadius: 10, border: `2px solid ${team === t ? '#2f6252' : '#c5c8c4'}`, background: team === t ? '#eef5f2' : '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, color: team === t ? '#2f6252' : '#10211f', cursor: 'pointer' }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Why */}
            {(what === 'Yellow card' || what === 'Red card') && (
              <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57', marginBottom: 8 }}>Why</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['Late tackle', 'Dissent', 'Time wasting', 'Other'].map(opt => (
                    <button key={opt} onClick={() => setWhy(opt)} style={{ height: 44, borderRadius: 10, border: `2px solid ${why === opt ? '#2f6252' : '#c5c8c4'}`, background: why === opt ? '#eef5f2' : '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: why === opt ? 700 : 500, color: why === opt ? '#2f6252' : '#10211f', cursor: 'pointer' }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '18px' }}>Cards go to Ruth, who enters them in Dribl. For anything about how adults behaved, only Ruth and the welfare officer see it.</div>

        <button onClick={onSend} style={{ height: 52, borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Send to Ruth</button>
      </div>
    </>
  )
}

export default function RefereesPhoneScreen({ empty = false }: { empty?: boolean }) {
  const [view, setView] = useState<RefView>('asked')
  const [toast, setToast] = useState('')
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(''), 2800) }

  return (
    <PhoneShell activeTab={view === 'asked' ? 'games' : view} onTab={setView}>
      {view === 'asked' && <RefAsked onAccept={() => { showToast("You're confirmed for 12:00."); setView('games') }} onDecline={() => { showToast("That's fine. We'll ask someone else."); setView('games') }} />}
      {view === 'games' && (empty ? (
        <div style={{ flexGrow: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>No games yet</div>
          <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5 }}>{"When Ruth needs a game leader or referee, you'll get a message. Say yes and it shows here."}</div>
        </div>
      ) : <RefGames />)}
      {view === 'report' && <RefReport onSend={() => { showToast('Report sent to Ruth.'); setView('games') }} />}
      {(view === 'feedback' || view === 'me') && (
        <div style={{ padding: '48px 20px 20px', textAlign: 'center' as const, color: '#4a5a57', fontSize: 15 }}>
          {view === 'feedback' ? 'Feedback — 19 responses, all positive.' : 'Zoe Park · Level 4 · 21 games this season.'}
        </div>
      )}
      {toast && (
        <div style={{ position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)', background: '#10211f', color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 50, whiteSpace: 'nowrap' as const, pointerEvents: 'none' }}>{toast}</div>
      )}
    </PhoneShell>
  )
}
