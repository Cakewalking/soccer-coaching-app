import { useState } from 'react'
import { EmptyCard, FOOTER_DEFAULT } from './ui'

const SAT_GAMES = [
  { time: '8:30',  team: 'U7 Dan vs Ironbark United',      detail: 'Home festival · pitch 5',         changed: false },
  { time: '8:30',  team: 'U8 Hannah vs Ironbark United',   detail: 'Home festival · pitch 6',         changed: false },
  { time: '8:30',  team: 'U9 Tom vs Northgate City',       detail: 'Away · Redgum Res',               changed: false },
  { time: '9:00',  team: 'U9 Mark vs Glenview Park',       detail: 'Home · pitch 4',                  changed: false },
  { time: '9:30',  team: 'U10 Nadia vs Bayside Lions',     detail: 'Away · Elderberry Park',          changed: false },
  { time: '9:30',  team: 'U12 Sam vs Harbour Rovers',      detail: 'Home · pitch 2 · Kit 1',         changed: false },
  { time: '10:30', team: 'U11 Girls Kate vs Harbour Rovers', detail: 'Home · pitch 3',               changed: false },
  { time: '10:30', team: 'U11 Luke vs Kingfisher United',  detail: 'Away · Kingfisher Reserve',          changed: false },
  { time: '11:00', team: 'U12 Girls Ana vs Bayside Lions', detail: 'Home · pitch 2 · Kit 3',         changed: false },
  { time: '12:00', team: 'U13 Girls Meg vs Northgate City', detail: 'Home · pitch 1 · Kit 4',        changed: false },
  { time: '12:30', team: 'U13 Chris vs Glenview Park',     detail: 'Away · Glenview Reserve',         changed: false },
  { time: '1:30',  team: 'U14 Josh vs Ironbark United',   detail: 'Away · Ironbark Park',             changed: false },
  { time: '2:30',  team: 'U15 Girls Bec vs Kingfisher United', detail: 'Home · pitch 1',             changed: false },
  { time: '3:30',  team: 'U16 Ollie vs Harbour Rovers',   detail: 'Away · Rovers Park',               changed: false },
]

const COMING_UP = [
  { date: 'FRI 5 JUN',  time: '5:00',  note: 'Camera kits 1, 3, 4 picked up',      sub: 'Team managers · clubrooms' },
  { date: 'MON 8 JUN',  time: '7:00',  note: 'U16 Ollie light session',             sub: 'Priya cut the load' },
  { date: 'TUE 9 JUN',  time: '7:30',  note: 'Coach meeting',                       sub: 'Clubrooms · agenda ready' },
  { date: 'THU 11 JUN', time: '5:30',  note: 'Heights measured',                   sub: 'U12 Sam, U13 Girls Meg, U14 Josh · Priya' },
  { date: 'FRI 12 JUN', time: '',       note: 'Camera kit 2 back from repair',      sub: 'Then all 4 kits on Saturdays' },
  { date: 'SUN 14 JUN', time: '',       note: "Chris Pham's check ends",             sub: 'Unless renewed' },
  { date: 'SAT 20 JUN', time: '9:00',  note: 'Club course',                         sub: '9 new coaches · clubrooms' },
]

export default function CalendarTab({ empty }: { empty?: boolean }) {
  const [synced, setSynced] = useState(false)

  if (empty) return <EmptyCard icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" title="Nothing on the calendar yet" desc="Fixtures come in from Dribl and training nights from each coach. Add club events yourself." cta="Add a club event" items={[{ title: "Every team's games", desc: 'Home in green, away in sand' }, { title: 'Clashes flagged', desc: 'Pitches and camera kits' }]} footer={FOOTER_DEFAULT} />

  return (
    <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, alignItems: 'start' }}>
      <section>
        {/* Saturday games */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Saturday 6 Jun · 14 games</h2>
              <div style={{ fontSize: 13, color: '#4a5a57', marginTop: 2 }}>Green home · sand away</div>
            </div>
            <button onClick={() => setSynced(true)} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${synced ? '#2f6252' : '#c5c8c4'}`, background: synced ? '#e4f2eb' : '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: synced ? '#2f6252' : '#10211f' }}>
              {synced ? 'Synced' : 'Sync to my calendar'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '48px minmax(0,1fr)', gap: '0 12px' }}>
            {SAT_GAMES.map((g, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <div style={{ padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1ef' : 'none', fontSize: 13, fontWeight: 600, color: '#4a5a57', paddingTop: i > 0 ? 8 : 0 }}>{g.time}</div>
                <div style={{ padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1ef' : 'none', paddingTop: i > 0 ? 8 : 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{g.team}</div>
                  <div style={{ fontSize: 13, color: '#4a5a57' }}>{g.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 13, color: '#4a5a57', borderTop: '1px solid #e9eae8', paddingTop: 10 }}>Meet times are set by each team manager. U12 Sam meet at 8:40.</div>
        </div>
      </section>

      {/* Coming up sidebar */}
      <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700 }}>Coming up</h2>
        {COMING_UP.map((item, i) => (
          <div key={i} style={{ padding: '10px 0', borderTop: '1px solid #e9eae8', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, minWidth: 68 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4a5a57' }}>{item.date}</div>
              {item.time && <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{item.time}</div>}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{item.note}</div>
              <div style={{ fontSize: 13, color: '#4a5a57' }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </aside>
    </div>
  )
}
