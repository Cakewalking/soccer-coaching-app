import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV = ['Home', 'Squad', 'Training', 'Game day']
const SUBNAV = ["Tonight's games", 'This term', 'Game library', 'Suggested']

export default function SGm1SuggestedMiniRoos(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 'none', background: G, height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? G2 : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U9 Tom · Wattle Creek ▾</div></div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#7a9a90', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>TA</div>
      </div>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: n === 'Suggested' ? 700 : 500, color: n === 'Suggested' ? INK : MUT, borderBottom: `3px solid ${n === 'Suggested' ? G2 : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Coach · MiniRoos</div>
      </div>
      <div style={{ padding: '16px 28px 0', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Suggested games</div>
        <div style={{ fontSize: 13, color: MUT }}>From what you've tapped after games, who had a go, and the curriculum</div>
      </div>
      <main style={{ flexGrow: 1, padding: '14px 28px 28px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr) 260px', gap: 16, overflowY: 'auto' }}>
        {[
          { n: 1, problem: 'They bunch around the ball', basis: ['Your taps, 3 weeks running', "Saturday's clips"], insight: 'Very normal at this age. Games with wide gates give them a reason to spread out, without you telling them to.', drill: 'Four goals: score in either wide gate', setup: '4 against 4 · 10 minutes · everyone on the ball' },
          { n: 2, problem: 'Poppy and Jude see less of the ball', basis: ['Who had a go, 2 weeks', 'Your note'], insight: 'Smaller teams mean more touches for quieter players. Nobody is singled out.', drill: 'Pairs: 2 against 2 to small goals', setup: 'Five little pitches · 8 minutes · swap partners each round' },
          { n: 3, problem: 'Next in the term plan: striking the ball', basis: ['Curriculum, weeks 7 and 8'], insight: "Nothing to fix here. It's simply what comes next for under 9s.", drill: 'Shoot on sight, 3 against 3', setup: '10 minutes · two keepers who swap every goal' },
        ].map(card => (
          <div key={card.n} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{card.n}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{card.problem}</div>
            <div style={{ background: PALE, borderRadius: 8, padding: '8px 12px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Based on</div>
              {card.basis.map((b, i) => <div key={i} style={{ fontSize: 12, color: MUT }}>{b}</div>)}
            </div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>{card.insight}</div>
            <div style={{ background: GD, borderRadius: 10, padding: '12px 14px', color: '#fff' }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{card.drill}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>{card.setup}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => st('Marked as not suitable.')} style={{ flex: 1, height: 36, borderRadius: 8, background: '#fff', color: MUT, border: `1px solid ${LN}`, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Not this</button>
              <button onClick={() => st('Added to Tuesday.')} style={{ flex: 1, height: 36, borderRadius: 8, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Add to Tuesday</button>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>No numbers at this age</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Suggestions come from your three taps after each game, who had a go, and what you film for clips. Nothing is counted or scored.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>What you said worked</div>
            {[{ label: 'Sharks and minnows', sub: 'Loved it, three weeks running' }, { label: 'Passing in lines', sub: "You said they got bored. Not suggested again" }].map((r, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{r.sub}</div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, marginTop: 10 }}>One tap after each game is all it needs.</div>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
