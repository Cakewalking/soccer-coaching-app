import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const MINI = [
  { age: 'U7', coach: 'Dan', n: 11 }, { age: 'U8', coach: 'Hannah', n: 12 }, { age: 'U9', coach: 'Mark', n: 13 },
  { age: 'U9', coach: 'Tom', n: 11 }, { age: 'U10', coach: 'Nadia', n: 14 }, { age: 'U11 Girls', coach: 'Kate', n: 12 }, { age: 'U11', coach: 'Luke', n: 13 },
]
const JUNIORS = [
  { age: 'U12', coach: 'Sam', n: 16 }, { age: 'U12 Girls', coach: 'Ana', n: 14 }, { age: 'U13', coach: 'Chris', n: 16 },
  { age: 'U13 Girls', coach: 'Meg', n: 15 }, { age: 'U14', coach: 'Josh', n: 17 }, { age: 'U15 Girls', coach: 'Bec', n: 15 }, { age: 'U16', coach: 'Ollie', n: 16 },
]
function TeamCard({ age, coach, n, warn }: { age: string; coach: string; n: number; warn?: boolean }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${warn ? '#f57c00' : LN}`, borderRadius: 14, padding: '14px 16px' }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 2 }}>{age}</div>
      <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>{coach} · {n} players</div>
      {warn && <div style={{ fontSize: 11, fontWeight: 700, color: '#f57c00', background: '#fff8f0', borderRadius: 6, padding: '2px 6px', display: 'inline-block' }}>Needs attention</div>}
    </div>
  )
}
export default function D2Teams(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState(false)
  const [filter, setFilter] = useState('All teams')
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Teams' ? 700 : 500, color: tab === 'Teams' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Teams</div>
            <div style={{ fontSize: 13, color: MUT }}>14 teams · 204 players</div>
          </div>
          <button onClick={() => setSheet(true)} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Add a team</button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['All teams', 'Needs attention', 'Girls', 'Recording games'].map(f => (
            <div key={f} onClick={() => setFilter(f)} style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${f === filter ? G : LN}`, background: f === filter ? PALE : '#fff', fontSize: 12, fontWeight: f === filter ? 700 : 500, color: f === filter ? G : MUT, cursor: 'pointer' }}>{f}{f === 'Needs attention' ? ' 3' : ''}</div>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>MiniRoos · U6–U11</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
          {MINI.map(m => <TeamCard key={m.age + m.coach} {...m} warn={m.coach === 'Mark' || m.coach === 'Dan'} />)}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Juniors · U12–U18</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {JUNIORS.map(m => <TeamCard key={m.age + m.coach} {...m} warn={m.coach === 'Chris'} />)}
        </div>
      </div>
      {sheet && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, width: 380 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 16 }}>Add a team</div>
            {['Age group', 'Head coach', 'Training night'].map(f => (
              <div key={f} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: MUT, marginBottom: 4 }}>{f}</div>
                <input placeholder={f} style={{ width: '100%', height: 38, borderRadius: 8, border: `1px solid ${LN}`, padding: '0 10px', fontFamily: 'inherit', fontSize: 13, boxSizing: 'border-box' as const }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button onClick={() => setSheet(false)} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setSheet(false); t('Team added.') }} style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Add team</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
