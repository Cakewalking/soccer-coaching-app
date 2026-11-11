const G = '#2f6252', GD = '#1f4a3e', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const REPORTS = [
  { ini: 'HP', by: 'Helen Park', what: 'Spectator shouting at players', team: 'U12 Sam', tag: 'Resolved', tagC: PALE, tagT: G, note: 'Helen spoke to the parent. Agreed to stay calm.' },
  { ini: 'AP', by: 'Away parent', what: 'Swearing near young players', team: 'U9 Mark', tag: 'Sent to Glenview Park', tagC: '#fff0d4', tagT: '#c06000', note: 'Referred to Glenview Park FC coordinator.' },
  { ini: 'CO', by: 'Unknown coach', what: 'Coach stepped onto the pitch during play', team: 'U7 Dan', tag: 'Closed', tagC: '#f0f0f0', tagT: MUT, note: 'Sent reminder to all coaches about pitch entry rules.' },
]
const CODE_STATS = [
  { n: '228/243', label: 'Parents agreed', sub: '15 to remind' },
  { n: '27/29', label: 'Players 15+', sub: '2 missing' },
  { n: '31/31', label: 'Coaches', sub: 'All signed' },
]

export default function FS1Sideline(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <span style={{ padding: '2px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>CLUB</span>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · Welfare officer</div>
        {['Cases','Reports','Code of conduct'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Reports' ? 700 : 500, color: '#fff', background: n === 'Reports' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Sideline reports</h1>
        <span style={{ fontSize: 14, color: MUT }}>3 this season · 1 pending</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
          {REPORTS.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, minHeight: 72, borderTop: i > 0 ? `1px solid ${LN}` : undefined, paddingTop: i > 0 ? 10 : 0, alignItems: 'flex-start' }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: PALE, color: G, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.ini}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <strong style={{ fontSize: 14 }}>{r.what}</strong>
                  <span style={{ padding: '1px 8px', borderRadius: 99, background: r.tagC, color: r.tagT, fontWeight: 700, fontSize: 11 }}>{r.tag}</span>
                </div>
                <div style={{ fontSize: 13, color: MUT }}>{r.team} · reported by {r.by}</div>
                <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{r.note}</div>
              </div>
            </div>
          ))}
          <button style={{ marginTop: 10, height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Log a new incident</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Code of conduct sign-ups</div>
            {CODE_STATS.map(s => (
              <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${LN}`, paddingTop: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{s.n}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{s.label}</div>
                </div>
                <span style={{ fontSize: 12, color: MUT }}>{s.sub}</span>
              </div>
            ))}
          </div>
          <button style={{ height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Remind 15 parents</button>
          <button style={{ height: 42, borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Edit the code</button>
        </div>
      </div>
    </div>
  )
}
