const G = '#2f6252', GD = '#1f4a3e', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const GAMES = [
  { time: '8:30', team: 'U8 Hannah', opp: 'Ironbark United', ref: null },
  { time: '9:00', team: 'U9 Mark', opp: 'Tealside Town', ref: 'Liam Shaw' },
  { time: '10:30', team: 'U11 Luke', opp: 'Glenview Park', ref: 'Ethan Moss' },
  { time: '11:00', team: 'U12 Sam', opp: 'Moorfield FC', ref: 'Zoe Park' },
  { time: '12:00', team: 'U13 Girls Meg', opp: 'Northgate City', ref: null },
  { time: '1:00', team: 'U16 Ollie', opp: 'Riverside Rovers', ref: 'Zoe Park' },
]
const REFS = [
  { ini: 'ZP', name: 'Zoe Park', age: '16', level: 'Level 4', games: 21 },
  { ini: 'EM', name: 'Ethan Moss', age: '15', level: 'Level 3', games: 11 },
  { ini: 'LS', name: 'Liam Shaw', age: '17', level: 'Level 4', games: 18 },
  { ini: 'RA', name: 'Ruth Adeyemi', age: 'Adult', level: 'Coordinator', games: 0 },
]

export default function FR1Referees(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <span style={{ padding: '2px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>CLUB</span>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · Club coordinator</div>
        {['Home','Registrations','Fixtures','Referees','Cards'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Referees' ? 700 : 500, color: '#fff', background: n === 'Referees' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Referees</h1>
        <span style={{ fontSize: 14, color: MUT }}>Saturday 14 Jun · 2 games still need a ref</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const }}>
          <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr 1fr 160px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, paddingBottom: 6 }}>
            {['Time','Game','Referee',''].map(h => <span key={h}>{h}</span>)}
          </div>
          {GAMES.map((g, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '56px 1fr 1fr 160px', alignItems: 'center', minHeight: 52, borderTop: `1px solid ${LN}`, gap: 8, background: !g.ref ? '#fef8f0' : undefined, borderRadius: !g.ref ? 8 : undefined, padding: !g.ref ? '0 4px' : undefined }}>
              <strong style={{ fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>{g.time}</strong>
              <span style={{ fontSize: 14 }}><strong>{g.team}</strong><br /><span style={{ color: MUT, fontSize: 13 }}>v {g.opp}</span></span>
              {g.ref
                ? <span style={{ fontSize: 14 }}>{g.ref}</span>
                : <span style={{ fontSize: 14, color: '#c00', fontStyle: 'italic' }}>Not assigned</span>}
              {!g.ref
                ? <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Assign ref</button>
                : <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Change</button>}
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 13, color: MUT }}>Feedback so far: 5 of 5 great or good ratings this season.</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Club referees</div>
          {REFS.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, borderTop: `1px solid ${LN}`, paddingTop: 8, alignItems: 'center' }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: PALE, color: G, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.ini}</span>
              <span style={{ flex: 1 }}>
                <strong style={{ fontSize: 14 }}>{r.name}</strong>
                <span style={{ display: 'block', fontSize: 12, color: MUT }}>{r.age} · {r.level}{r.games > 0 ? ` · ${r.games} games` : ''}</span>
              </span>
            </div>
          ))}
          <button style={{ height: 42, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 'auto' }}>Contact Ruth</button>
        </div>
      </div>
    </div>
  )
}
