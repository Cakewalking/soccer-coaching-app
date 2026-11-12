import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const TEAMS_LEFT = [
  { name: 'U7 Dan', pf: 'U7 · Wallabies · 7 players', status: 'Matched' },
  { name: 'U8 Hannah', pf: 'U8 · Wallabies · 10 players', status: 'Matched' },
  { name: 'U9 Mark', pf: 'U9 · Kangaroos · 11 players', status: 'Matched' },
  { name: 'U9 Tom', pf: 'U9 · Joeys · 10 players', status: 'Matched' },
  { name: 'U10 Nadia', pf: 'U10 · Wallabies · 13 players', status: 'Matched' },
  { name: 'U11 Girls Kate', pf: 'U11 Girls · Kangaroos · 14 players', status: 'Matched' },
  { name: 'U11 Luke', pf: 'U11 · Wallabies · 13 players', status: 'Matched' },
]
const TEAMS_RIGHT = [
  { name: 'U12 Sam', pf: 'U12 · Division 1 · 17 players', status: 'Matched' },
  { name: 'U12 Girls Ana', pf: 'U12 Girls · Division 1 · 15 players', status: 'Matched' },
  { name: 'U13 Chris', pf: 'U13 · Division 2 · 17 players', status: '1 to check', warn: true },
  { name: 'U13 Girls Meg', pf: 'U13 Girls · Division 1 · 18 players', status: 'Matched' },
  { name: 'U14 Josh', pf: 'U14 · Division 1 · 18 players', status: 'Matched' },
  { name: 'U15 Girls Bec', pf: 'U15 Girls · Division 2 · 15 players', status: '1 to check', warn: true },
  { name: 'U16 Ollie', pf: 'U16 · Division 1 · 14 players', status: 'Matched' },
]

export default function FP1PlayFootball(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Players' ? 700 : 500, color: t === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Import from PlayFootball</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Teams, players and parents come across from your registrations · Wattle Creek FC</div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          {[{ n: '1', label: 'Connected', done: true }, { n: '2', label: 'Match teams', active: true }, { n: '3', label: 'Check people' }, { n: '4', label: 'Done' }].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: s.done ? G : (s as any).active ? GD : LN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: s.done || (s as any).active ? '#fff' : MUT }}>
                {s.done ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> : s.n}
              </div>
              <div style={{ fontSize: 13, fontWeight: (s as any).active ? 700 : 500, color: (s as any).active ? INK : MUT }}>{s.label}</div>
              {i < 3 && <div style={{ width: 24, height: 1, background: LN }} />}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Match each team</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>14 teams · 192 players found</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          {[TEAMS_LEFT, TEAMS_RIGHT].map((teams, col) => (
            <div key={col} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
              {teams.map((team, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{team.name}</div>
                    <div style={{ fontSize: 11, color: MUT }}>{team.pf}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: (team as any).warn ? '#c05' : G }}>{team.status}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: MUT, flex: 1 }}>2 players to check: one is registered but not on a team, one is on two teams.</div>
          <button onClick={() => st('Checking 2 players.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Check 2 players</button>
          <button onClick={() => st('Importing 192 players.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Import 192 players</button>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
