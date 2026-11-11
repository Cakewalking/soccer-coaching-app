const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

export default function SG3AskCleanSheet(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Suggested' ? INK : MUT, borderBottom: `3px solid ${n === 'Suggested' ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 0', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, paddingBottom: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Ask Clean Sheet</div>

          <div style={{ flex: 1, minHeight: 0, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 18, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' as const }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ maxWidth: '70%', background: G, color: '#fff', borderRadius: '14px 14px 2px 14px', padding: '10px 14px', fontSize: 15, lineHeight: '22px' }}>
                What drills work best for helping U12s press higher up the pitch?
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ maxWidth: '80%', background: PALE, borderRadius: '14px 14px 14px 2px', padding: '12px 16px', fontSize: 14, lineHeight: '21px' }}>
                For U12s, the most effective pressing drills keep the numbers small so everyone gets lots of touches. Here are three that have worked well for teams at this level:
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {['Fits your kit', 'Based on your data', 'U12-appropriate'].map(chip => (
                  <div key={chip} style={{ fontSize: 12, fontWeight: 600, background: '#fff', border: `1px solid ${LN}`, borderRadius: 999, padding: '2px 10px', color: G }}>{chip}</div>
                ))}
              </div>
              {[
                { name: 'Rondo 5 v 2', desc: '10 × 10 m · two hunters · 10 min', tag: 'Your library' },
                { name: 'Win it back · 6 seconds', desc: '8 v 8 · counter-press game · 25 min', tag: 'Suggested tonight' },
                { name: 'Ball winner 3 v 1', desc: 'Small grid · 1 defender hunts · 8 min', tag: 'New' },
              ].map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', background: '#fff', border: `1px solid ${LN}`, borderRadius: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{d.name}</div>
                    <div style={{ fontSize: 13, color: MUT }}>{d.desc}</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, background: PALE, color: G, borderRadius: 999, padding: '2px 8px' }}>{d.tag}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 'none', display: 'flex', gap: 10, padding: '0 0 4px' }}>
            <input placeholder="Ask a follow-up…" style={{ flex: 1, height: 48, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 14px', fontSize: 15, color: INK, background: '#fff', fontFamily: 'inherit' }} />
            <button style={{ height: 48, padding: '0 20px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Send</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Try asking</div>
            {['Why do you suggest pressing drills for tonight?', 'What helped Noah\'s first touch improve?', 'Show drills that work without GPS vests', 'What did you learn from the last 3 games?'].map(q => (
              <button key={q} style={{ display: 'block', width: '100%', textAlign: 'left' as const, padding: '8px 12px', border: `1px solid ${LN}`, borderRadius: 8, background: '#fff', fontSize: 14, color: G, fontWeight: 600, marginBottom: 6, cursor: 'pointer' }}>{q}</button>
            ))}
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 6 }}>Where answers come from</div>
            <div style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>Your team's match data, training records, and wellness. Never from other clubs' data about players.</div>
          </div>
        </div>
      </main>
    </div>
  )
}
