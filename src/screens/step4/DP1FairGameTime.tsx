import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const TEAMS = [
  { name: 'U7 Dan', coach: 'Dan W', pct: 100, junior: false },
  { name: 'U8 Hannah', coach: 'Hannah L', pct: 100, junior: false },
  { name: 'U9 Mark', coach: 'Mark D', pct: 88, junior: false },
  { name: 'U9 Tom', coach: 'Tom E', pct: 92, junior: false },
  { name: 'U10 Nadia', coach: 'Nadia C', pct: 95, junior: false },
  { name: 'U11 Girls Kate', coach: 'Kate M', pct: 78, junior: false },
  { name: 'U11 Luke', coach: 'Luke P', pct: 82, junior: false },
  { name: 'U12 Sam', coach: 'Sam N', pct: 72, junior: false },
  { name: 'U12 Girls Ana', coach: 'Ana B', pct: 68, junior: false },
  { name: 'U13 Chris', coach: 'Chris P', pct: 48, junior: false },
  { name: 'U13 Girls Meg', coach: 'Meg T', pct: 65, junior: false },
  { name: 'U14 Josh', coach: 'Josh R', pct: 55, junior: true },
  { name: 'U15 Girls Bec', coach: 'Bec W', pct: 61, junior: true },
  { name: 'U16 Ollie', coach: 'Ollie P', pct: 58, junior: true },
]
export default function DP1FairGameTime(_: { onBack?: () => void }) {
  const [activeNav, setActiveNav] = useState('Players')
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [reminded, setReminded] = useState(false)
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} onClick={() => setActiveNav(tab)} style={{ fontSize: 13, fontWeight: tab === activeNav ? 700 : 500, color: tab === activeNav ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 260px', gap: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Fair game time</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Season to date · 14 teams · 12 of 14 on target</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 90px 1fr 60px 100px', gap: 8, padding: '8px 16px', fontSize: 11, fontWeight: 700, color: MUT, background: PALE }}>
              {['Team', 'Coach', 'Minutes spread', 'Fewest%', 'Status'].map(h => <div key={h}>{h}</div>)}
            </div>
            {TEAMS.map(r => {
              const policy = r.junior ? 33 : 50
              const ok = r.pct >= policy
              return (
                <div key={r.name} onClick={() => setSelectedTeam(r.name)} style={{ display: 'grid', gridTemplateColumns: '140px 90px 1fr 60px 100px', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${LN}`, alignItems: 'center', cursor: 'pointer', background: selectedTeam === r.name ? PALE : 'transparent' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{r.coach}</div>
                  <div style={{ position: 'relative' as const, background: PALE, borderRadius: 6, height: 10 }}>
                    <div style={{ background: ok ? G : '#e53935', width: `${Math.min(r.pct, 100)}%`, height: '100%', borderRadius: 6 }} />
                    <div style={{ position: 'absolute' as const, left: `${policy}%`, top: -3, width: 2, height: 16, background: MUT, borderRadius: 1 }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: ok ? G : '#c00' }}>{r.pct}%</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: ok ? G : '#c00', background: ok ? PALE : '#fff0f0', padding: '3px 8px', borderRadius: 20, display: 'inline-block' }}>{ok ? 'On target' : 'Below policy'}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>The policy</div>
            <div style={{ fontSize: 13, color: INK, lineHeight: 1.6, marginBottom: 12 }}>Every player gets at least half the available game minutes in U13 and under. For U14 and above, the minimum is one third.</div>
            <div style={{ background: PALE, borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: G }}>U13 and under</div>
              <div style={{ fontSize: 12, color: MUT }}>Minimum 50% of game minutes</div>
            </div>
            <div style={{ background: PALE, borderRadius: 10, padding: '10px 12px', marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: G }}>U14 and above</div>
              <div style={{ fontSize: 12, color: MUT }}>Minimum 33% of game minutes</div>
            </div>
            <button onClick={() => setReminded(true)} style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: reminded ? '#40826d' : G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{reminded ? '✓ Reminded 2 coaches below target' : 'Remind coaches below target'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
