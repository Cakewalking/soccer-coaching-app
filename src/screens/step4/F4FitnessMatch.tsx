const G = '#2f6252', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const LIMITS = [
  { ini: 'KR', name: 'Kai Russo', limit: 'No play', reason: 'Return to play step 1' },
  { ini: 'NO', name: 'Noah Okafor', limit: '30 min max', reason: 'Return to play step 2' },
  { ini: 'TM', name: 'Tom Reyes', limit: '45 min max', reason: 'Return to play step 3' },
  { ini: 'RC', name: 'Ruby Chen', limit: 'Full — monitor', reason: 'Growth spurt · avoid heading drills' },
  { ini: 'JL', name: 'Jai Patel', limit: 'Full — monitor', reason: 'Wellness score 2.1 this week' },
]

const TILES = [
  { n: '14', label: 'Available', sub: '2 limited, 0 no-play' },
  { n: '6/10', label: 'Avg wellness', sub: 'Zoe logged 3 — check in' },
  { n: '61', label: 'Avg mins', sub: 'Last 4 games' },
  { n: '3', label: 'Flags today', sub: 'See limits below' },
]

export default function F4FitnessMatch(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: G, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek · Fitness coach</div>
        {['Home','Squad','Training','Match day','Clips'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Match day' ? 700 : 500, color: '#fff', background: n === 'Match day' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Load limits · Saturday</h1>
        <span style={{ fontSize: 14, color: MUT }}>U12 Sam v Ironbark United · Sat 14 Jun · 10:00 am · Away</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {TILES.map(t => (
              <div key={t.n} style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em' }}>{t.n}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{t.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '44px 180px 140px 1fr', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, paddingBottom: 6 }}>
              {['','Player','Limit','Reason'].map(h => <span key={h}>{h}</span>)}
            </div>
            {LIMITS.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 180px 140px 1fr', alignItems: 'center', minHeight: 48, borderTop: `1px solid ${LN}` }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, color: G, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</span>
                <strong style={{ fontSize: 14 }}>{p.name}</strong>
                <span style={{ padding: '2px 10px', borderRadius: 99, background: p.limit === 'No play' ? '#fce9e9' : p.limit.includes('max') ? '#fff0d4' : PALE, color: p.limit === 'No play' ? '#c00' : p.limit.includes('max') ? '#c06000' : G, fontWeight: 700, fontSize: 13, display: 'inline-block' }}>{p.limit}</span>
                <span style={{ fontSize: 13, color: MUT }}>{p.reason}</span>
              </div>
            ))}
            <div style={{ marginTop: 10, fontSize: 13, color: MUT }}>7 players fully clear — no restrictions noted.</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Tell the coach</div>
            <div style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>Share load limits with Sam before the game. Tap to send a summary to the team chat.</div>
            <button style={{ height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Send limits to Sam</button>
          </div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Post-match tasks</div>
            {['Collect RPE from all players','Log minutes played per player','Record any new injuries or niggles'].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, borderTop: `1px solid ${LN}`, paddingTop: 6, fontSize: 14 }}>
                <span style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid #c5c8c4`, flexShrink: 0, marginTop: 2 }} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
