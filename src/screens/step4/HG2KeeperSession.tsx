const G = '#2f6252', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const DRILLS = [
  { time: '6:00', name: 'Handling warm-up', dur: '10 min', note: '' },
  { time: '6:10', name: 'Start higher then sweep', dur: '15 min', note: 'Jack caught on line — focus today' },
  { time: '6:25', name: 'Quick restarts', dur: '12 min', note: "Grace's clip — use as example" },
  { time: '6:37', name: 'Crosses and calling', dur: '8 min', note: 'Holly demos' },
]
const GROUPS = [
  { label: 'Group A', desc: 'U12 + U13', n: 5 },
  { label: 'Group B', desc: 'U14–U16', n: 4 },
  { label: 'Group C', desc: 'Seniors', n: 2 },
]

export default function HG2KeeperSession(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: G, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · Goalkeeper coach</div>
        {['Home','Keepers','Sessions','Clips'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Sessions' ? 700 : 500, color: '#fff', background: n === 'Sessions' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Keeper session</h1>
        <span style={{ fontSize: 14, color: MUT }}>Tue 9 Jun · 6:00–6:45 pm · 11 of 14 coming</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Session plan</div>
          {DRILLS.map((d, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '56px 1fr 80px', gap: 12, alignItems: 'flex-start', minHeight: 60, borderTop: `1px solid ${LN}`, paddingTop: 10, paddingBottom: 6 }}>
              <span style={{ fontWeight: 700, color: MUT, fontSize: 14, paddingTop: 2 }}>{d.time}</span>
              <div>
                <strong style={{ fontSize: 15 }}>{d.name}</strong>
                {d.note && <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{d.note}</div>}
              </div>
              <span style={{ fontSize: 13, color: MUT, paddingTop: 2 }}>{d.dur}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, background: PALE, borderRadius: 10, padding: '10px 14px', fontSize: 13, lineHeight: '19px' }}>Focus theme this month: <strong>decision-making off the line</strong>. When to hold, when to sweep.</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Groups by age</div>
            {GROUPS.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${LN}`, paddingTop: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: PALE, color: G, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{g.label[0]}</span>
                <span style={{ flex: 1 }}>
                  <strong style={{ fontSize: 14 }}>{g.label}</strong>
                  <span style={{ display: 'block', fontSize: 12, color: MUT }}>{g.desc}</span>
                </span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{g.n}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Keep in mind</div>
            {["Ava Lim — only 1 session so far, encourage her.","Jack Byrne — starting position has been an issue in games.","Bring cones — club bag was reorganised last week."].map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, borderTop: `1px solid ${LN}`, paddingTop: 6, fontSize: 14, lineHeight: '19px' }}>
                <span style={{ color: G, fontWeight: 700, flexShrink: 0 }}>·</span>
                <span>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
