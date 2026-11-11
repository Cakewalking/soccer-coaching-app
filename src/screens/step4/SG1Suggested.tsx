const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const DRILLS = [
  { rank: 1, name: 'Win it back in 6 seconds', evidence: 'Strong match data', based: ['Saturday pressing', '3 games of data'], drill: '8 v 8 · 25 min · 40 × 30 m' },
  { rank: 2, name: 'Tight shape, 3 zones', evidence: 'Match + training data', based: ['Defence gap', '5 sessions'], drill: '7 v 7 + GKs · 30 min · Half pitch' },
  { rank: 3, name: 'Rondo, 5 v 2', evidence: 'Training data', based: ['Passing accuracy', '4 sessions'], drill: '7 per group · 10 min · 10 × 10 m' },
]

export default function SG1Suggested(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Suggested' ? INK : MUT, borderBottom: `3px solid ${n === 'Suggested' ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Suggested for tonight</div>
          <div style={{ fontSize: 14, color: MUT }}>Based on Saturday vs Ironbark United · 3 fixes · built from game and training data</div>
          {DRILLS.map(d => (
            <div key={d.rank} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flex: 'none' }}>{d.rank}</div>
                <div style={{ fontSize: 17, fontWeight: 700, flex: 1 }}>{d.name}</div>
                <div style={{ fontSize: 12, fontWeight: 700, background: PALE, color: G, borderRadius: 999, padding: '2px 10px' }}>{d.evidence}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {d.based.map(b => <div key={b} style={{ fontSize: 12, background: '#f7f8f7', border: `1px solid ${LN}`, borderRadius: 999, padding: '2px 10px', color: MUT }}>Based on: {b}</div>)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6, borderTop: `1px solid ${LN}` }}>
                <div style={{ fontSize: 14, color: MUT }}>{d.drill}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: INK }}>Why →</button>
                  <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Add to plan</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Changed since last week</div>
            {[['Pressing wins', '+3 per game', true], ['Passing accuracy', '-2%', false], ['Sprint count', '+18%', true]].map(([label, val, up]) => (
              <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: `1px solid ${LN}`, fontSize: 14 }}>
                <span style={{ color: MUT }}>{label as string}</span>
                <span style={{ fontWeight: 700, color: up ? G : '#c05' }}>{val as string}</span>
              </div>
            ))}
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 6 }}>You decide</div>
            <div style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>These are suggestions only. Swap or remove any drill. Clean Sheet learns from what you pick.</div>
          </div>
        </div>
      </main>
    </div>
  )
}
