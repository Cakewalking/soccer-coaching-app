const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const RUNS = [
  { date: 'Thu 4 Jun', label: 'Run 3', avgTime: '5.2 s', winRate: '68%' },
  { date: 'Tue 2 Jun', label: 'Run 2', avgTime: '6.1 s', winRate: '52%' },
  { date: 'Thu 28 May', label: 'Run 1', avgTime: '7.0 s', winRate: '46%' },
]

const HISTORY = [
  { date: 'Thu 4 Jun', drill: 'Win it back · 6 seconds', rounds: 3, avg: '5.2 s', verdict: 'Improving' },
  { date: 'Tue 2 Jun', drill: 'Win it back · 6 seconds', rounds: 3, avg: '6.1 s', verdict: 'Improving' },
  { date: 'Thu 28 May', drill: 'Win it back · 6 seconds', rounds: 2, avg: '7.0 s', verdict: 'Baseline' },
  { date: 'Tue 26 May', drill: 'Rondo 5 v 2', rounds: 4, avg: '—', verdict: 'Logged' },
]

const BARS = [
  { label: 'Avg time (s)', vals: [7.0, 6.1, 5.2], max: 10, color: '#40826d' },
  { label: 'Win rate (%)', vals: [46, 52, 68], max: 100, color: '#2f6252' },
]

export default function RC6RunHistory(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Record' ? INK : MUT, borderBottom: `3px solid ${n === 'Record' ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Run history · Win it back in 6 seconds</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {BARS.map(b => (
              <div key={b.label}>
                <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 8 }}>{b.label}</div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 60 }}>
                  {b.vals.map((v, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{v}</div>
                      <div style={{ width: '100%', height: Math.round((v / b.max) * 48), background: b.color, borderRadius: '4px 4px 0 0' }} />
                      <div style={{ fontSize: 11, color: MUT }}>{RUNS[i].label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 60px 80px 100px', padding: '10px 18px', background: '#f7f8f7', borderBottom: `1px solid ${LN}` }}>
              {['Date', 'Drill', 'Rounds', 'Average', 'Verdict'].map(h => <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>)}
            </div>
            {HISTORY.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 60px 80px 100px', padding: '10px 18px', borderTop: `1px solid ${LN}`, alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: MUT }}>{r.date}</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{r.drill}</div>
                <div style={{ fontSize: 15 }}>{r.rounds}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{r.avg}</div>
                <div style={{ fontSize: 12, fontWeight: 700, background: r.verdict === 'Improving' ? PALE : '#f7f8f7', color: r.verdict === 'Improving' ? G : MUT, borderRadius: 999, padding: '2px 8px', display: 'inline-block' }}>{r.verdict}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Is it a fair comparison?</div>
            {['Same players in all 3 runs', 'Same 40 × 30 m grid', 'Same 6-second rule'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderTop: `1px solid ${LN}`, fontSize: 14 }}>
                <span style={{ color: G }}>✓</span><span>{item}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, padding: '6px 0', borderTop: `1px solid ${LN}`, fontSize: 14 }}>
              <span style={{ color: '#c05' }}>!</span><span>No vest data for run 1</span>
            </div>
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 6 }}>Does it show on Saturday?</div>
            <div style={{ fontSize: 14, lineHeight: '21px', color: MUT }}>After the first 2 runs, pressing wins went up 3 per game. Run 3 happened today — Saturday's data will show if it sticks.</div>
          </div>
        </div>
      </main>
    </div>
  )
}
