const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const PLAYERS = [
  { ini: 'RP', name: 'Ryan Petersen', team: 'U16 Ollie', yellows: 2, red: true, status: 'Suspended', note: 'Misses Saturday' },
  { ini: 'DV', name: 'Dean Vukovic', team: 'U14 Josh', yellows: 4, red: false, status: '1 from ban', note: 'Next yellow = 1 match' },
  { ini: 'NF', name: 'Nina Ferraro', team: 'U13 Girls Meg', yellows: 3, red: false, status: 'OK', note: 'Clears after round 12' },
  { ini: 'LB', name: 'Leon Brooks', team: 'U16 Ollie', yellows: 2, red: false, status: 'OK', note: '' },
  { ini: 'CN', name: 'Cody Nash', team: 'U12 Sam', yellows: 1, red: false, status: 'OK', note: '' },
  { ini: 'JO', name: 'Jade Okoro', team: 'U13 Boys Kai', yellows: 1, red: false, status: 'OK', note: '' },
]

const YCard = () => <div style={{ width: 10, height: 14, background: '#f5c300', borderRadius: 2, flexShrink: 0 }} />
const RCard = () => <div style={{ width: 10, height: 14, background: '#e02020', borderRadius: 2, flexShrink: 0 }} />

export default function FD1Cards(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <span style={{ padding: '2px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>CLUB</span>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · Club coordinator</div>
        {['Home','Registrations','Fixtures','Referees','Cards'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Cards' ? 700 : 500, color: '#fff', background: n === 'Cards' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Cards and suspensions</h1>
        <span style={{ fontSize: 14, color: MUT }}>1 player suspended · 1 near ban · Season 2026</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const }}>
          <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 120px 80px 100px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, paddingBottom: 6 }}>
            {['','Player','Team','Cards','Status'].map(h => <span key={h}>{h}</span>)}
          </div>
          {PLAYERS.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 120px 80px 100px', alignItems: 'center', minHeight: 52, borderTop: `1px solid ${LN}`, gap: 8, background: p.status === 'Suspended' ? '#fef0f0' : p.status === '1 from ban' ? '#fef8f0' : undefined, borderRadius: 6 }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: p.status === 'Suspended' ? '#fce9e9' : PALE, color: p.status === 'Suspended' ? '#c00' : G, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</span>
              <span><strong style={{ fontSize: 14 }}>{p.name}</strong>{p.note ? <span style={{ display: 'block', fontSize: 12, color: MUT }}>{p.note}</span> : null}</span>
              <span style={{ fontSize: 13, color: MUT }}>{p.team}</span>
              <span style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {Array.from({ length: p.yellows }).map((_, j) => <YCard key={j} />)}
                {p.red && <RCard />}
              </span>
              <span style={{ padding: '2px 10px', borderRadius: 99, background: p.status === 'Suspended' ? '#fce9e9' : p.status === '1 from ban' ? '#fff0d4' : PALE, color: p.status === 'Suspended' ? '#c00' : p.status === '1 from ban' ? '#c06000' : G, fontWeight: 700, fontSize: 12, display: 'inline-block' }}>{p.status}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>How FV counts</div>
          {[['Red card','Miss next game'],['5 yellows','1 match ban'],['10 yellows','2 match ban'],['15 yellows','3 match ban'],['MiniRoos','No cards']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${LN}`, paddingTop: 6, fontSize: 14 }}>
              <span style={{ color: MUT }}>{k}</span><strong>{v}</strong>
            </div>
          ))}
          <div style={{ marginTop: 'auto', borderTop: `1px solid ${LN}`, paddingTop: 10, fontSize: 13, color: MUT, lineHeight: '19px' }}>Cards are automatically synced from the league. Suspensions apply from the next scheduled match.</div>
        </div>
      </div>
    </div>
  )
}
