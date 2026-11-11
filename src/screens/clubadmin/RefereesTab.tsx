import { useState } from 'react'
import { EmptyCard, FOOTER_DEFAULT } from './ui'

const HOME_GAMES = [
  { time: '8:30',  game: 'U7 Dan v Ironbark United · festival', role: 'Game leader', who: 'Zoe Park, 16', needed: false },
  { time: '8:30',  game: 'U8 Hannah v Ironbark United · festival', role: 'Game leader', who: '', needed: true },
  { time: '9:00',  game: 'U9 Mark v Glenview Park', role: 'Game leader', who: 'Ethan Moss, 15', needed: false },
  { time: '9:30',  game: 'U12 Sam v Harbour Rovers', role: 'Referee', who: 'Dana · club referee', needed: false },
  { time: '11:00', game: 'U12 Girls Ana v Tealside Town', role: 'Referee', who: 'Appointed by the league', needed: false },
  { time: '12:00', game: 'U13 Girls Meg v Northgate City', role: 'Assistant referee', who: '', needed: true },
]

const CLUB_REFS = [
  { ini: 'ZP', name: 'Zoe Park',    age: 16, games: 21, note: '21 games · Level 4' },
  { ini: 'EM', name: 'Ethan Moss',  age: 15, games: 12, note: '12 games · new this year' },
  { ini: 'LS', name: 'Liam Shaw',   age: 17, games: 26, note: '26 games · Level 4' },
  { ini: 'RA', name: 'Ruth Adeyemi', age: 0, games: 30, note: 'Adult · 30 games · coordinator' },
]

export default function RefereesTab({ empty }: { empty?: boolean }) {
  const [toastMsg, setToastMsg] = useState('')
  function showToast(m: string) { setToastMsg(m); setTimeout(() => setToastMsg(''), 3000) }

  if (empty) return <EmptyCard icon="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" title="No club referees yet" desc="Add your game leaders and referees. On Thursday, Clean Sheet shows which home games still need one." cta="Add a referee" items={[{ title: 'Home games covered', desc: 'Or who to ask' }, { title: 'Kind feedback only', desc: 'For young referees' }]} footer={FOOTER_DEFAULT} />

  return (
    <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, alignItems: 'start' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Home games */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Referees</h2>
            <span style={{ fontSize: 14, color: '#c39797', fontWeight: 700 }}>2 still needed</span>
          </div>
          <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 10 }}>Home games Sat 6 Jun · club game leaders and referees</div>

          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '52px minmax(0,1fr) 110px minmax(0,1fr) 72px', gap: '0 10px', borderBottom: '1px solid #e9eae8', paddingBottom: 6, marginBottom: 2 }}>
            {['Time', 'Game', 'Role', 'Who', ''].map((h, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>{h}</span>
            ))}
          </div>
          {HOME_GAMES.map((g, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '52px minmax(0,1fr) 110px minmax(0,1fr) 72px', gap: '0 10px', alignItems: 'center', minHeight: 52, borderTop: i > 0 ? '1px solid #f0f1ef' : 'none' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#4a5a57' }}>{g.time}</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{g.game}</span>
              <span style={{ fontSize: 13, color: '#4a5a57' }}>{g.role}</span>
              <span style={{ fontSize: 14, color: g.needed ? '#c39797' : '#10211f', fontWeight: g.needed ? 700 : 400 }}>{g.needed ? 'Needed' : g.who}</span>
              {g.needed && (
                <button onClick={() => showToast('Opening referee requests.')} style={{ height: 44, padding: '0 10px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Ask</button>
              )}
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 12, color: '#4a5a57', borderTop: '1px solid #e9eae8', paddingTop: 10 }}>Team managers sign off each game on their phone, and can say how the referee went. Young referees only ever see kind feedback; the referee coordinator sees the rest.</div>
        </div>

        {/* Feedback */}
        <div style={{ background: '#eef5f2', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Feedback this week · 5 · all positive</span>
          <button onClick={() => showToast('Opening referee feedback.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>View</button>
        </div>
      </section>

      {/* Sidebar: club referees */}
      <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px' }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700 }}>Club referees</h2>
        {CLUB_REFS.map((r, i) => (
          <div key={r.ini} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{r.ini}</div>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</div>
              <div style={{ fontSize: 13, color: '#4a5a57' }}>{r.note}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 12, borderTop: '1px solid #e9eae8', paddingTop: 12 }}>
          <button onClick={() => showToast('Opening add referee form.')} style={{ height: 44, width: '100%', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Add a referee</button>
        </div>
      </aside>

      {toastMsg && (
        <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: '#10211f', color: '#fff', padding: '12px 22px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 50, whiteSpace: 'nowrap' as const, pointerEvents: 'none' }}>{toastMsg}</div>
      )}
    </div>
  )
}
