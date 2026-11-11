const G = '#2f6252', GD = '#1f4a3e', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const FIXTURES = [
  { time: '8:30', team: 'U8 Hannah', opp: 'Ironbark United', pitch: 'P1', tag: 'Same' },
  { time: '9:00', team: 'U9 Mark', opp: 'Tealside Town', pitch: 'P2', tag: 'Same' },
  { time: '10:30', team: 'U11 Luke', opp: 'Glenview Park', pitch: 'P3', tag: 'Changed' },
  { time: '11:00', team: 'U12 Sam', opp: 'Moorfield FC', pitch: 'P4', tag: 'Same' },
  { time: '12:00', team: 'U13 Girls Meg', opp: 'Northgate City', pitch: 'P1', tag: 'Same' },
  { time: '1:00', team: 'U16 Ollie', opp: 'Riverside Rovers', pitch: 'P2', tag: 'Changed' },
]
const RESULTS = [
  { team: 'U7 Dan', score: '3–1', tag: 'Sent' },
  { team: 'U9 Mark', score: '2–2', tag: 'Sent' },
  { team: 'U11 Luke', score: '1–4', tag: 'Waiting' },
  { team: 'U12 Sam', score: '2–1', tag: 'Sent' },
  { team: 'U14 Josh', score: '0–2', tag: 'Score differs' },
]

export default function FF1LeagueSync(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <span style={{ padding: '2px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>CLUB</span>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · Club coordinator</div>
        {['Home','Registrations','Fixtures','Referees','Cards'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Fixtures' ? 700 : 500, color: '#fff', background: n === 'Fixtures' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>League sync</h1>
        <span style={{ fontSize: 14, color: MUT }}>Synced with Dribl 6:02 am · 2 changes from last week</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 14 }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>This weekend from the league</div>
          <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 70px 60px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, paddingBottom: 6 }}>
            {['Time','Game','Pitch',''].map(h => <span key={h}>{h}</span>)}
          </div>
          {FIXTURES.map((f, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 70px 80px', alignItems: 'center', minHeight: 48, borderTop: `1px solid ${LN}`, gap: 8 }}>
              <strong style={{ fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>{f.time}</strong>
              <span style={{ fontSize: 14 }}><strong>{f.team}</strong> v {f.opp}</span>
              <span style={{ fontSize: 13, color: MUT }}>{f.pitch}</span>
              <span style={{ padding: '2px 8px', borderRadius: 99, background: f.tag === 'Changed' ? '#fff0d4' : PALE, color: f.tag === 'Changed' ? '#c06000' : G, fontWeight: 700, fontSize: 11, display: 'inline-block' }}>{f.tag}</span>
            </div>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: 10, fontSize: 13, color: MUT }}>8 more games at away venues — view in Dribl</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Results to the league</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 110px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, paddingBottom: 6 }}>
            {['Team','Score','Status'].map(h => <span key={h}>{h}</span>)}
          </div>
          {RESULTS.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 110px', alignItems: 'center', minHeight: 48, borderTop: `1px solid ${LN}`, gap: 8 }}>
              <strong style={{ fontSize: 14 }}>{r.team}</strong>
              <span style={{ fontSize: 15, fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{r.score}</span>
              <span style={{ padding: '2px 8px', borderRadius: 99, background: r.tag === 'Sent' ? PALE : r.tag === 'Score differs' ? '#fce9e9' : '#fff0d4', color: r.tag === 'Sent' ? G : r.tag === 'Score differs' ? '#c00' : '#c06000', fontWeight: 700, fontSize: 11, display: 'inline-block' }}>{r.tag}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, background: '#fce9e9', border: '1px solid #f0a0a0', borderRadius: 12, padding: '10px 12px', fontSize: 13 }}>
            <strong>Score differs — U14 Josh:</strong> we recorded 0–2, Dribl shows 1–2. Contact the league to confirm.
          </div>
        </div>
      </div>
    </div>
  )
}
