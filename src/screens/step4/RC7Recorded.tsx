const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const FILTERS = ['All', 'League', 'Friendly', 'Drills', 'Warm-ups', 'Tests']
const RECORDS = [
  { date: 'Thu 4 Jun', label: 'Win it back · 6 seconds', type: 'Drill', players: '8', key: '5.2 s avg · 68% win rate' },
  { date: 'Sat 30 May', label: 'vs Ironbark United', type: 'League', players: '16', key: 'W 3–1 · measured' },
  { date: 'Tue 2 Jun', label: 'Win it back · 6 seconds', type: 'Drill', players: '8', key: '6.1 s avg · 52% win rate' },
  { date: 'Thu 28 May', label: 'Win it back · 6 seconds', type: 'Drill', players: '7', key: '7.0 s avg · 46% win rate' },
  { date: 'Sat 23 May', label: 'vs Saltmarsh City', type: 'League', players: '16', key: 'L 1–2 · measured' },
  { date: 'Tue 26 May', label: 'Rondo 5 v 2', type: 'Drill', players: '12', key: 'Passing accuracy 84%' },
  { date: 'Sat 16 May', label: 'vs Northgate', type: 'League', players: '15', key: 'D 1–1 · measured' },
  { date: 'Thu 14 May', label: '11+ Kids warm-up', type: 'Warm-up', players: '16', key: 'Full set completed' },
]

const TYPE_COLORS: Record<string, string> = { League: GD, Friendly: '#40826d', Drill: G, 'Warm-up': '#738678', Test: '#9d7c80' }

export default function RC7Recorded(_: { onBack?: () => void }) {
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

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Everything recorded</div>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>+ Record something</button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {FILTERS.map(f => (
            <button key={f} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${f === 'All' ? G : LN}`, background: f === 'All' ? PALE : '#fff', fontSize: 14, fontWeight: f === 'All' ? 700 : 500, color: f === 'All' ? G : INK, cursor: 'pointer' }}>{f}</button>
          ))}
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 90px 60px 1fr', padding: '10px 18px', background: '#f7f8f7', borderBottom: `1px solid ${LN}`, flex: 'none' }}>
            {['Date', 'Name', 'Type', 'Players', 'Key number'].map(h => <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>)}
          </div>
          <div style={{ overflowY: 'auto' as const, flex: 1 }}>
            {RECORDS.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 90px 60px 1fr', padding: '12px 18px', borderTop: `1px solid ${LN}`, alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: 13, color: MUT }}>{r.date}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{r.label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, background: TYPE_COLORS[r.type] || G, color: '#fff', borderRadius: 999, padding: '2px 8px', display: 'inline-block' }}>{r.type}</div>
                <div style={{ fontSize: 15 }}>{r.players}</div>
                <div style={{ fontSize: 14, color: MUT }}>{r.key}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
