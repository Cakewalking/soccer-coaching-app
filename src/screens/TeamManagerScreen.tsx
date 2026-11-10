import { useState } from 'react'
import HeatScreen from './teammanager/HeatScreen'
import GameDayPapersScreen from './teammanager/GameDayPapersScreen'
import MessagesTab from './teammanager/MessagesTab'

type ManagerTab = 'home' | 'gameday' | 'messages' | 'roster'
type GamedayPhase = 'before' | 'during' | 'after'

const TODO = [
  { icon: '📋', title: 'Duty roster for Saturday', sub: 'Linesman still needed · oranges and canteen done', tag: '1 gap', tagColor: '#c39797' },
  { icon: '📷', title: 'Camera kit 1 booked',      sub: 'Pick up from the clubrooms Fri after 5 pm',      tag: 'Booked', tagColor: '#40826d' },
  { icon: '📝', title: 'Team sheet',               sub: 'Sam picks the line-up Fri night, you send it',    tag: 'Fri', tagColor: '#6f7f7b' },
  { icon: '📄', title: "Harper's consent form",    sub: "New player · parent hasn't finished it",          tag: 'Chase', tagColor: '#c39797' },
]
const SAT_DUTIES = [
  { ini: 'IM', name: 'Isla (Morgan family)',  duty: 'Oranges at half-time',  status: 'confirmed' as const },
  { ini: 'LT', name: 'Linh Tran (Mia\'s mum)', duty: 'Canteen 10 to 11',   status: 'confirmed' as const },
]
const RSVP = [
  { ini: 'MT', name: 'Mia',   status: 'yes'    as const },
  { ini: 'NO', name: 'Noah',  status: 'yes'    as const },
  { ini: 'EB', name: 'Ella',  status: 'maybe'  as const },
  { ini: 'JP', name: 'Jai',   status: 'yes'    as const },
  { ini: 'ZH', name: 'Zoe',   status: 'yes'    as const },
  { ini: 'GO', name: 'Grace', status: 'yes'    as const },
  { ini: 'LH', name: 'Liam',  status: 'no'     as const },
  { ini: 'FW', name: 'Finn',  status: 'yes'    as const },
  { ini: 'RC', name: 'Ruby',  status: 'maybe'  as const },
  { ini: 'KR', name: 'Kai',   status: 'no-reply' as const },
  { ini: 'SD', name: 'Sam',   status: 'yes'    as const },
  { ini: 'OB', name: 'Oscar', status: 'no-reply' as const },
]


export default function TeamManagerScreen({ empty }: { empty?: boolean }) {
  const [tab, setTab] = useState<ManagerTab>('home')
  const [showChange, setShowChange] = useState(false)
  const [gamedayPhase, setGamedayPhase] = useState<GamedayPhase>('before')
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [showHeadKnock, setShowHeadKnock] = useState(false)
  const [showSideline, setShowSideline] = useState(false)
  const [showSignOff, setShowSignOff] = useState(false)
  const [showInjury, setShowInjury] = useState(false)
  const [showHeat, setShowHeat] = useState(false)
  const [showGameDayPapers, setShowGameDayPapers] = useState(false)
  const [byeWeek, setByeWeek] = useState(false)
  const [sidelineTeam, setSidelineTeam] = useState<string | null>(null)
  const [signOffChoices, setSignOffChoices] = useState<Record<number, string>>({})
  const [showWhosComing, setShowWhosComing] = useState(false)

  function toggleCheck(i: number) {
    setCheckedItems(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n })
  }

  function switchTab(t: ManagerTab) {
    if (t !== 'messages') setShowChange(false)
    setTab(t)
  }

  const BottomNav = () => (
    <div style={{ flex: 'none', borderTop: '1px solid #e9eae8', background: '#fff', display: 'flex' }}>
      {([
        { id: 'home'    as ManagerTab, label: 'Home',     icon: 'M4 11l8-7 8 7v9H4z' },
        { id: 'gameday' as ManagerTab, label: 'Game day', icon: 'M12 22a10 10 0 100-20 10 10 0 000 20zm0-10V7' },
        { id: 'messages'as ManagerTab, label: 'Messages', icon: 'M4 5h16v11H8l-4 4z' },
        { id: 'roster'  as ManagerTab, label: 'Roster',   icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 7a3 3 0 010 6M22 20c0-3-2-5-4-5.5' },
      ] as const).map(t => (
        <button key={t.id} onClick={() => switchTab(t.id)} style={{
          flex: 1, padding: '10px 0 12px', border: 0, background: 'transparent',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tab === t.id ? '#2f6252' : '#9a9f9d'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon}/></svg>
          <span style={{ fontSize: 11, fontWeight: 600, color: tab === t.id ? '#2f6252' : '#9a9f9d' }}>{t.label}</span>
        </button>
      ))}
    </div>
  )

  if (empty) {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', border: '1px solid #e9eae8', borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        {tab === 'messages' ? (
          <div style={{ flex: 'none', padding: '14px 18px 12px', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ flexGrow: 1 }}>
              <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>U12 Sam</span>
              <span style={{ display: 'block', fontSize: 21, lineHeight: '27px', fontWeight: 700 }}>Messages</span>
            </span>
            <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</span>
          </div>
        ) : (
          <div style={{ background: '#1f4a3e', padding: '48px 24px 28px', color: '#fff', flex: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>
                  {tab === 'gameday' ? 'U12 Sam' : tab === 'roster' ? 'U12 Sam · Saturdays' : 'U12 Sam · Team manager'}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>
                  {tab === 'gameday' ? 'Game day' : tab === 'roster' ? 'Duty roster' : 'Welcome, Rob'}
                </div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
            </div>
          </div>
        )}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
          {tab === 'home' && (<>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Get your families in</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5, marginBottom: 16 }}>Send the team link to parents. Once they join, you can share meet times, ask who's coming and fill the duty roster.</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 20 }}>
              <button style={{ height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Copy the team link</button>
              <button style={{ height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See what parents see</button>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b', marginBottom: 8 }}>NEXT GAME</div>
            <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 12, padding: '12px 14px', fontSize: 13, color: '#4a5a57', marginBottom: 10 }}>Fixtures appear here once Sam or the club adds them.</div>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>0 of 17 families joined.</div>
          </>)}
          {tab === 'gameday' && (<>
            <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>No game this week</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5, marginBottom: 14 }}>{"It's a bye round. Your game-day checklist opens here on the morning of the next game."}</div>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 999, border: '1px solid #e9eae8', background: '#fff', color: '#2f6252', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>See fixtures</button>
            </div>
            {[
              { title: 'ON THE DAY', items: ['Arrival text', 'Duty roster', 'Who signed on', 'First-aid card', 'Head knock form', 'Sign-off after the game'] },
              { title: 'FIRST AID CARD', items: ['The first aid card shows only what parents choose to share, like asthma or allergies, and their phone number.'] },
            ].map((section, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b', marginBottom: 8 }}>{section.title}</div>
                {section.items.map((item, j) => (
                  <div key={j} style={{ padding: '10px 14px', background: '#fff', border: '1px solid #e9eae8', borderRadius: 10, fontSize: 13, color: '#4a5a57', marginBottom: 6 }}>{item}</div>
                ))}
              </div>
            ))}
          </>)}
          {tab === 'messages' && (<>
            <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>No messages yet</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5, marginBottom: 14 }}>Tell every family about a change in one go. You'll see who has read it, and nudge anyone who hasn't.</div>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 999, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Tell parents about a change</button>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b', marginBottom: 8 }}>CONVERSATIONS</div>
            <div style={{ padding: '12px 14px', background: '#fff', border: '1px solid #e9eae8', borderRadius: 10, fontSize: 13, color: '#4a5a57' }}>Messages to a player always go to their parents too. Coaches see team messages in their inbox.</div>
          </>)}
          {tab === 'roster' && (<>
            <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>No duties yet</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5, marginBottom: 14 }}>{"Pick the jobs your team needs each week. Families sign up from their phone, and swap if they can't make it."}</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ height: 36, padding: '0 16px', borderRadius: 999, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Add the usual jobs</button>
                <button style={{ height: 36, padding: '0 16px', borderRadius: 999, border: '1px solid #e9eae8', background: '#fff', color: '#4a5a57', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Choose my own</button>
              </div>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b', marginBottom: 8 }}>FILLS IN LIKE THIS</div>
            <div style={{ padding: '12px 14px', background: '#fff', border: '1px solid #e9eae8', borderRadius: 10, fontSize: 13, color: '#4a5a57' }}>Most junior teams need oranges at half-time, a canteen hour and a club linesman over 16.</div>
          </>)}
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', border: '1px solid #e9eae8', borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>

      {/* Header */}
      {tab === 'messages' ? (
        <div style={{ flex: 'none', padding: '14px 18px 12px', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ flexGrow: 1 }}>
            <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>{showChange ? 'Tell parents about a change' : 'U12 Sam · Team manager'}</span>
            <span style={{ display: 'block', fontSize: 21, lineHeight: '27px', fontWeight: 700 }}>{showChange ? 'Something changed' : 'Messages'}</span>
          </span>
          <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</span>
        </div>
      ) : (
        <div style={{ background: '#1f4a3e', padding: '48px 20px 20px', color: '#fff', flex: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U12 Sam · Team manager</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>Hi Rob</div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>

        {tab === 'home' && (
          <div style={{ padding: '16px' }}>
            {/* Change alert */}
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 14px', background: '#fdf8f4', border: '1px solid #f0dcc8', borderRadius: 12, marginBottom: 16, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c39797" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              <span style={{ flexGrow: 1, fontSize: 14, fontWeight: 600, color: '#10211f' }}>Something changed? Tell parents</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
            </button>

            {/* Game card */}
            <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ background: '#1f4a3e', color: '#fff', borderRadius: 8, padding: '6px 10px', textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.04em' }}>SAT</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>7</div>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>vs Harbour Rovers</div>
                  <div style={{ fontSize: 13, color: '#6f7f7b' }}>Home · pitch 2 · arrive 8:40 · kick-off 9:30</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', marginBottom: 12 }}>
                {[{ n: 12, l: 'In' }, { n: 1, l: 'Maybe' }, { n: 2, l: 'No' }, { n: 2, l: 'No answer' }].map(s => (
                  <div key={s.l}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#10211f' }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: '#6f7f7b' }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowWhosComing(w => !w)} style={{ width: '100%', height: 36, borderRadius: 8, border: '1px solid #e9eae8', background: '#fff', color: '#2f6252', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>
                {showWhosComing ? 'Hide' : 'Who\'s coming'}
              </button>
              {showWhosComing && (
                <div style={{ marginBottom: 10 }}>
                  {([
                    { label: 'In', names: ['Mia','Noah','Jai','Zoe','Grace','Finn','Isla','Liam','Sam','Oscar','Ella','Ruby'] },
                    { label: 'Maybe', names: ['Ruby · might have a school concert'] },
                    { label: "Can't", names: ["Kai · family wedding", "Lily · sick, back next week"] },
                    { label: 'No answer', names: ["Harper · new, consent pending", "Sam D · reminded Wed"] },
                  ] as { label: string; names: string[] }[]).map(g => g.names.length > 0 && (
                    <div key={g.label} style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: g.label === 'In' ? '#40826d' : g.label === "Can't" ? '#c39797' : '#6f7f7b', marginBottom: 4 }}>{g.label} · {g.names.length}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4 }}>
                        {g.names.map(n => (
                          <span key={n} style={{ fontSize: 12, color: '#10211f', background: g.label === 'In' ? '#eef5f2' : g.label === "Can't" ? '#fdf4f4' : '#f4f4f4', borderRadius: 6, padding: '2px 8px' }}>{n}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button style={{ width: '100%', height: 36, borderRadius: 8, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Remind the 2 who haven't answered</button>
                </div>
              )}
              {!showWhosComing && <button style={{ width: '100%', height: 36, borderRadius: 8, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Remind the 2 who haven't answered</button>}
            </div>

            {/* To do */}
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>To do this week</div>
            {TODO.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '17px', marginTop: 2 }}>{item.sub}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.tagColor, background: item.tagColor + '22', borderRadius: 6, padding: '2px 8px', flexShrink: 0 }}>{item.tag}</span>
              </div>
            ))}

            {/* Saturday duties */}
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginTop: 16, marginBottom: 10 }}>Saturday duties</div>
            {SAT_DUTIES.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{d.ini}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b' }}>{d.duty}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'gameday' && (
          <div>
            {/* Bye week toggle (demo) */}
            <div style={{ padding: '8px 16px', background: '#f7f9f7', borderBottom: '1px solid #f0f1f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#6f7f7b' }}>Demo: bye week</span>
              <button onClick={() => setByeWeek(b => !b)} style={{ width: 40, height: 24, borderRadius: 12, border: 0, background: byeWeek ? '#40826d' : '#d6d9d7', cursor: 'pointer', position: 'relative' }}>
                <div style={{ width: 16, height: 16, borderRadius: '999px', background: '#fff', position: 'absolute', top: 4, left: byeWeek ? 20 : 4 }} />
              </button>
            </div>

            {byeWeek ? (
              <div style={{ padding: '24px 16px' }}>
                <div style={{ border: '2px dashed #d6d9d7', borderRadius: 16, padding: '32px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>☕</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f', marginBottom: 6 }}>No game this week</div>
                  <div style={{ fontSize: 14, color: '#6f7f7b', marginBottom: 20 }}>Bye round · SAT 14 JUN. Use this week for extra training or a break.</div>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                    <button style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#4a5a57', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Extra training session?</button>
                    <button style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Tell parents</button>
                  </div>
                </div>
                <div style={{ marginTop: 16, background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Next game</div>
                  <div style={{ fontSize: 13, color: '#6f7f7b' }}>SAT 21 JUN · vs Northern Hawks · Home · kick-off 9:30 am</div>
                </div>
              </div>
            ) : (
              <>
            {/* Phase tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e9eae8', background: '#fff' }}>
              {(['before', 'during', 'after'] as GamedayPhase[]).map(p => (
                <button key={p} onClick={() => setGamedayPhase(p)} style={{ flex: 1, height: 42, border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 13, fontWeight: gamedayPhase === p ? 700 : 400, cursor: 'pointer', color: gamedayPhase === p ? '#1f4a3e' : '#6f7f7b', borderBottom: gamedayPhase === p ? '2px solid #1f4a3e' : '2px solid transparent', textTransform: 'capitalize' }}>{p}</button>
              ))}
            </div>
            <div style={{ padding: '16px' }}>

              {gamedayPhase === 'before' && (
                <>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Before you go</div>
                  {[
                    { label: 'Team sheet sent to league', note: 'Sam confirmed line-up at 8:04 pm' },
                    { label: 'Fees collected', note: '12 of 14 paid · Harper and Finn outstanding' },
                    { label: 'Camera kit checked out', note: 'Booted up and mounted on tripod' },
                    { label: 'First aid kit in bag', note: 'Check expiry on ice pack sleeves' },
                    { label: 'Orange bibs packed (10)', note: 'In the kit bag already' },
                  ].map((item, i) => (
                    <div key={i} onClick={() => toggleCheck(i)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', cursor: 'pointer' }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checkedItems.has(i) ? '#2f6252' : '#d6d9d7'}`, background: checkedItems.has(i) ? '#2f6252' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        {checkedItems.has(i) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: checkedItems.has(i) ? '#6f7f7b' : '#10211f', textDecoration: checkedItems.has(i) ? 'line-through' : 'none' }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{item.note}</div>
                      </div>
                    </div>
                  ))}

                  {/* First aid cards */}
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', margin: '16px 0 10px' }}>First aid cards</div>
                  {[
                    { ini: 'OB', name: 'Oscar Brennan', cond: 'Asthma', action: 'Blue inhaler in his bag. Use if wheezing starts.', color: '#c3a84a' },
                    { ini: 'FW', name: 'Finn Walsh', cond: 'Bee/wasp sting allergy', action: 'EpiPen in the first aid kit. Inject outer thigh.', color: '#c39797' },
                  ].map((p, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', border: `1px solid ${p.color}44`, marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p.name}</div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: p.color, background: p.color + '22', borderRadius: 6, padding: '2px 8px', marginLeft: 'auto' }}>{p.cond}</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#4a5a57' }}>{p.action}</div>
                    </div>
                  ))}

                  {/* Game day extras */}
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', margin: '16px 0 10px' }}>Game-day info</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 4 }}>
                    <button onClick={() => setShowHeat(true)} style={{ padding: '12px', borderRadius: 12, border: '1px solid #c3a84a44', background: '#fff', color: '#c3a84a', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>Hot day · 34°</button>
                    <button onClick={() => setShowGameDayPapers(true)} style={{ padding: '12px', borderRadius: 12, border: '1px solid #2f625244', background: '#fff', color: '#2f6252', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>Game-day papers</button>
                  </div>

                  {/* Something happened */}
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', margin: '16px 0 10px' }}>Something happened?</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      { label: 'Log an injury', color: '#c3a84a', onClick: () => setShowInjury(true) },
                      { label: 'Log a head knock', color: '#c39797', onClick: () => setShowHeadKnock(true) },
                      { label: 'Report sideline behaviour', color: '#c39797', onClick: () => setShowSideline(true) },
                      { label: 'Sign off the game', color: '#2f6252', onClick: () => setShowSignOff(true) },
                    ].map((btn, i) => (
                      <button key={i} onClick={btn.onClick} style={{ padding: '12px', borderRadius: 12, border: `1px solid ${btn.color}44`, background: '#fff', color: btn.color, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>{btn.label}</button>
                    ))}
                  </div>
                </>
              )}

              {gamedayPhase === 'during' && (
                <>
                  <div style={{ background: '#1f4a3e', borderRadius: 14, padding: '14px', marginBottom: 14, color: '#fff' }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Live · 62 min</div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>vs Harbour Rovers</div>
                    <div style={{ display: 'flex', gap: 24, marginTop: 10 }}>
                      <div style={{ textAlign: 'center' }}><div style={{ fontSize: 36, fontWeight: 900 }}>2</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Us</div></div>
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>–</div>
                      <div style={{ textAlign: 'center' }}><div style={{ fontSize: 36, fontWeight: 900 }}>1</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Them</div></div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>On the pitch</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
                    {[{ ini: 'MT', name: 'Mia' }, { ini: 'NO', name: 'Noah' }, { ini: 'JP', name: 'Jai' }, { ini: 'ZH', name: 'Zoe' }, { ini: 'GO', name: 'Grace' }, { ini: 'FW', name: 'Finn' }, { ini: 'RC', name: 'Ruby' }, { ini: 'IM', name: 'Isla' }, { ini: 'LH', name: 'Liam' }, { ini: 'SD', name: 'Sam' }, { ini: 'OB', name: 'Oscar' }].map(p => (
                      <div key={p.ini} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#2f6252', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</div>
                        <span style={{ fontSize: 11, color: '#6f7f7b' }}>{p.name}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <button onClick={() => setShowHeadKnock(true)} style={{ padding: '12px', borderRadius: 12, border: '1px solid #c3979744', background: '#fff', color: '#c39797', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Log a head knock</button>
                    <button onClick={() => setShowSideline(true)} style={{ padding: '12px', borderRadius: 12, border: '1px solid #c3979744', background: '#fff', color: '#c39797', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Report sideline</button>
                  </div>
                </>
              )}

              {gamedayPhase === 'after' && (
                <>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>After the game</div>
                  {[
                    { label: 'Kit collected', note: 'All bibs and cones in the bag' },
                    { label: 'Camera kit returned', note: 'Back to clubrooms before 1 pm' },
                    { label: 'Report to committee', note: 'Any incidents or concerns this week?' },
                  ].map((item, i) => (
                    <div key={i} onClick={() => toggleCheck(i + 10)} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', cursor: 'pointer' }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checkedItems.has(i + 10) ? '#2f6252' : '#d6d9d7'}`, background: checkedItems.has(i + 10) ? '#2f6252' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        {checkedItems.has(i + 10) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{item.note}</div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setShowSignOff(true)} style={{ marginTop: 16, width: '100%', height: 44, borderRadius: 12, border: 0, background: '#1f4a3e', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Sign off the game</button>
                </>
              )}
            </div>
            </>
            )}
          </div>
        )}

        {tab === 'messages' && <MessagesTab showChange={showChange} setShowChange={setShowChange} />}

        {tab === 'roster' && (
          <div style={{ padding: '16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>Duty roster</div>
            <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 14 }}>SAT 6 JUN · VS Harbour Rovers</div>

            {/* Specific duties */}
            {[
              { duty: 'Oranges at half-time', who: 'Morgan family (Isla)', status: 'done' as const,   note: null },
              { duty: 'Canteen 10 to 11',     who: 'Linh Tran (Mia)',     status: 'done' as const,   note: null },
              { duty: 'Club linesman',         who: 'Needs someone over 16 · flag in the blue bag', status: 'ask' as const, note: null },
              { duty: 'Ground marshal',        who: 'Brennan family',      status: 'done' as const,   note: 'Hi-vis vest · over 18' },
              { duty: 'Camera on halfway line',who: 'You · kit 1, picked up Friday', status: 'you' as const, note: null },
            ].map((d, i) => (
              <div key={i} style={{ padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{d.duty}</div>
                    <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{d.who}</div>
                    {d.note && <div style={{ fontSize: 11, color: '#9a9f9d', marginTop: 1 }}>{d.note}</div>}
                  </div>
                  {d.status === 'done' && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#40826d', background: '#e4f2eb', borderRadius: 6, padding: '2px 8px', flexShrink: 0 }}>Done</span>
                  )}
                  {d.status === 'you' && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: 6, padding: '2px 8px', flexShrink: 0 }}>You</span>
                  )}
                  {d.status === 'ask' && (
                    <button style={{ height: 32, padding: '0 14px', borderRadius: 999, border: 'none', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Ask</button>
                  )}
                </div>
              </div>
            ))}

            {/* Fair share divider */}
            <div style={{ marginTop: 20, marginBottom: 12, fontSize: 13, fontWeight: 700, color: '#10211f' }}>Fair share this season</div>
            {[
              { ini: 'LT', family: 'Tran family',        duty: 'Canteen ×2, oranges ×1', count: 3 },
              { ini: 'IM', family: 'Morgan family',       duty: 'Oranges ×2',             count: 2 },
              { ini: 'GO', family: 'Owusu family (you)',  duty: 'Camera ×8',              count: 8, you: true },
              { ini: 'FW', family: 'Walsh family',        duty: 'Linesman ×1',            count: 1 },
              { ini: 'OB', family: 'Brennan family',      duty: 'Not yet',                count: 0 },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: '1px solid #f0f1f0' }}>
                <div style={{ width: 28, height: 28, borderRadius: '999px', background: r.you ? '#c39797' : '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.ini}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{r.family}</div>
                  <div style={{ fontSize: 11, color: '#6f7f7b' }}>{r.duty}</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: r.count === 0 ? '#c39797' : '#10211f' }}>{r.count}</div>
              </div>
            ))}
            <div style={{ marginTop: 10, padding: '10px 12px', background: '#f7f9f7', borderRadius: 10, fontSize: 12, color: '#6f7f7b', lineHeight: '17px' }}>Asking families who've done the least first. They answer from the parent app.</div>
          </div>
        )}
      </div>

      <BottomNav />

      {/* Head knock overlay */}
      {showHeadKnock && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
          <div style={{ background: '#1f4a3e', padding: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Log a head knock</div>
            <button onClick={() => setShowHeadKnock(false)} style={{ width: 32, height: 32, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ background: '#fdf8ed', borderRadius: 12, padding: '12px 14px', border: '1px solid #c3a84a44', marginBottom: 20, fontSize: 13, color: '#10211f' }}>
              Head knock protocol: player must leave the field. Do not return them to play. Notify parents now.
            </div>
            {[
              { label: 'Player', input: <select style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 14 }}>{RSVP.map(p => <option key={p.ini}>{p.name}</option>)}</select> },
              { label: 'What happened?', input: <textarea placeholder="Describe the incident…" style={{ width: '100%', height: 72, borderRadius: 8, border: '1px solid #e9eae8', padding: '10px', fontFamily: 'inherit', fontSize: 14, resize: 'none', boxSizing: 'border-box' }} /> },
              { label: 'Time of incident', input: <input type="time" defaultValue="09:52" style={{ height: 40, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 14 }} /> },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>{f.label}</div>
                {f.input}
              </div>
            ))}
            <button style={{ width: '100%', height: 44, borderRadius: 12, border: 0, background: '#c39797', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>Log and notify parents</button>
            <div style={{ fontSize: 12, color: '#6f7f7b', textAlign: 'center' }}>A copy goes to the club's safeguarding officer</div>
          </div>
        </div>
      )}

      {/* Sideline behaviour overlay */}
      {showSideline && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
          <div style={{ background: '#1f4a3e', padding: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Report sideline behaviour</div>
            <button onClick={() => setShowSideline(false)} style={{ width: 32, height: 32, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
            {[
              { label: 'Who was involved?', input: <input placeholder="Name or role (e.g. 'parent on east sideline')" style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' }} /> },
              { label: 'Which team were they from?', input: <div style={{ display: 'flex', gap: 10 }}>{['Ours', 'Opponents', 'Unknown'].map(o => <button key={o} onClick={() => setSidelineTeam(o)} style={{ flex: 1, height: 40, borderRadius: 10, border: `1px solid ${sidelineTeam === o ? '#2f6252' : '#e9eae8'}`, background: sidelineTeam === o ? '#e4f2eb' : '#f7f9f7', color: sidelineTeam === o ? '#2f6252' : '#4a5a57', fontFamily: 'inherit', fontSize: 13, fontWeight: sidelineTeam === o ? 700 : 400, cursor: 'pointer' }}>{o}</button>)}</div> },
              { label: 'What happened?', input: <textarea placeholder="Describe the behaviour…" style={{ width: '100%', height: 80, borderRadius: 8, border: '1px solid #e9eae8', padding: '10px', fontFamily: 'inherit', fontSize: 14, resize: 'none', boxSizing: 'border-box' }} /> },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>{f.label}</div>
                {f.input}
              </div>
            ))}
            <button style={{ width: '100%', height: 44, borderRadius: 12, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>Submit report</button>
            <div style={{ fontSize: 12, color: '#6f7f7b', textAlign: 'center' }}>Sent to the club's committee and league if needed</div>
          </div>
        </div>
      )}

      {/* Log injury overlay */}
      {showInjury && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
          <div style={{ background: '#1f4a3e', padding: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Log an injury</div>
            <button onClick={() => setShowInjury(false)} style={{ width: 32, height: 32, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
            {[
              { label: 'Player', input: <select style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 14 }}>{RSVP.map(p => <option key={p.ini}>{p.name}</option>)}</select> },
              { label: 'What happened?', input: <textarea placeholder="Describe the injury…" style={{ width: '100%', height: 72, borderRadius: 8, border: '1px solid #e9eae8', padding: '10px', fontFamily: 'inherit', fontSize: 14, resize: 'none', boxSizing: 'border-box' }} /> },
              { label: 'Which part of the body?', input: <input placeholder="e.g. left ankle, right knee" style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' }} /> },
              { label: 'Time of incident', input: <input type="time" defaultValue="09:52" style={{ height: 40, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 14 }} /> },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>{f.label}</div>
                {f.input}
              </div>
            ))}
            <button style={{ width: '100%', height: 44, borderRadius: 12, border: 0, background: '#c3a84a', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>Log and notify parents</button>
            <div style={{ fontSize: 12, color: '#6f7f7b', textAlign: 'center' }}>A copy goes to the club's first aid officer</div>
          </div>
        </div>
      )}

      {/* Sign off game overlay */}
      {showSignOff && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
          <div style={{ background: '#1f4a3e', padding: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Sign off the game</div>
            <button onClick={() => setShowSignOff(false)} style={{ width: 32, height: 32, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9eae8', padding: '14px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>SAT 6 JUN · vs Harbour Rovers · Home</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#10211f', marginTop: 4 }}>2 – 1</div>
            </div>
            {[
              { label: 'Any incidents to report?', opts: ['No', 'Yes — add note'] },
              { label: 'All players accounted for?', opts: ['Yes, all safe', 'Missing player'] },
            ].map((q, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>{q.label}</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {q.opts.map(o => <button key={o} onClick={() => setSignOffChoices(prev => ({ ...prev, [i]: o }))} style={{ flex: 1, height: 40, borderRadius: 10, border: `1px solid ${signOffChoices[i] === o ? '#2f6252' : '#e9eae8'}`, background: signOffChoices[i] === o ? '#e4f2eb' : '#f7f9f7', color: signOffChoices[i] === o ? '#2f6252' : '#4a5a57', fontFamily: 'inherit', fontSize: 13, fontWeight: signOffChoices[i] === o ? 700 : 400, cursor: 'pointer' }}>{o}</button>)}
                </div>
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Anything for next week?</div>
              <textarea placeholder="Optional note for Sam and the committee…" style={{ width: '100%', height: 72, borderRadius: 8, border: '1px solid #e9eae8', padding: '10px', fontFamily: 'inherit', fontSize: 14, resize: 'none', boxSizing: 'border-box' }} />
            </div>
            <button style={{ width: '100%', height: 44, borderRadius: 12, border: 0, background: '#1f4a3e', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Sign off</button>
          </div>
        </div>
      )}

      {showHeat && <HeatScreen onBack={() => setShowHeat(false)} />}
      {showGameDayPapers && <GameDayPapersScreen onBack={() => setShowGameDayPapers(false)} />}
    </div>
  )
}
