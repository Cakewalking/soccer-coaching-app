import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
const GAMES = [
  { time: '8:30', color: '#1565c0', home: 'U7 Dan', away: 'Moorabbin U7', venue: 'Pitch 1' },
  { time: '9:00', color: G, home: 'U8 Hannah', away: 'Hampton U8', venue: 'Pitch 2' },
  { time: '9:00', color: '#7b1fa2', home: 'U9 Mark', away: 'Mordialloc U9', venue: 'Pitch 3' },
  { time: '9:30', color: '#c62828', home: 'U9 Tom', away: 'Cheltenham U9', venue: 'Pitch 1' },
  { time: '10:00', color: G, home: 'U10 Nadia', away: 'Parkdale U10', venue: 'Pitch 2' },
  { time: '10:30', color: '#1565c0', home: 'U11 Girls Kate', away: 'Mentone U11G', venue: 'Pitch 3' },
  { time: '10:30', color: '#f57c00', home: 'U11 Luke', away: 'Bonbeach U11', venue: 'Pitch 4' },
  { time: '11:00', color: G, home: 'U12 Sam', away: 'Aspendale U12', venue: 'Main pitch' },
  { time: '11:00', color: '#7b1fa2', home: 'U12 Girls Ana', away: 'Edithvale U12G', venue: 'Pitch 2' },
  { time: '12:00', color: '#c62828', home: 'U13 Chris', away: 'Carrum U13', venue: 'Main pitch' },
  { time: '12:30', color: G, home: 'U13 Girls Meg', away: 'Patterson U13G', venue: 'Pitch 3' },
  { time: '1:30', color: '#1565c0', home: 'U14 Josh', away: 'Seaford U14', venue: 'Main pitch' },
  { time: '2:30', color: '#f57c00', home: 'U15 Girls Bec', away: 'Frankston U15G', venue: 'Pitch 2' },
  { time: '3:00', color: G, home: 'U16 Ollie', away: 'Baxter U16', venue: 'Main pitch' },
]
const UPCOMING = [
  { date: 'Fri 5 Jun', events: ['Coach meeting · 7:30 pm · Clubrooms'] },
  { date: 'Sat 6 Jun', events: ['14 games · see today →'] },
  { date: 'Mon 8 Jun', events: ['FV registration deadline'] },
  { date: 'Sat 13 Jun', events: ['10 away games · no home fixtures'] },
  { date: 'Thu 18 Jun', events: ['Children\'s check reminder · Chris Pham'] },
  { date: 'Sat 20 Jun', events: ['Club course · 9 am · Clubrooms', '12 home games'] },
]
export default function DC1Calendar(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Club' ? 700 : 500, color: tab === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Saturday 6 Jun</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>14 games · all home</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {GAMES.map((g, i) => (
              <div key={i} onClick={() => t(`${g.home} vs ${g.away}`)} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ width: 3, height: 36, borderRadius: 3, background: g.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, color: MUT }}>{g.time}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{g.home}</div>
                  <div style={{ fontSize: 12, color: MUT }}>vs {g.away} · {g.venue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Coming up</div>
          {UPCOMING.map(u => (
            <div key={u.date} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.04em', marginBottom: 4 }}>{u.date}</div>
              {u.events.map(e => (
                <div key={e} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '8px 12px', fontSize: 13, color: INK, marginBottom: 4 }}>{e}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
