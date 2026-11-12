import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const BARS = [
  { label: 'Sat vs Ironbark', val: 7, max: 10, color: '#c39797' },
  { label: 'Our usual', val: 4, max: 10, color: '#40826d' },
]

export default function SG2WhySuggested(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button onClick={() => st('Opening team selector.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Suggested' ? INK : MUT, borderBottom: `3px solid ${n === 'Suggested' ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: G, marginBottom: 4 }}>Why suggested · Drill 1</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Win it back in 6 seconds</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>Game data · Sat 30 May vs Ironbark United</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Seconds to win the ball back</div>
              {BARS.map(b => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 110, fontSize: 13, color: MUT }}>{b.label}</div>
                  <div style={{ flex: 1, height: 14, background: '#e9eae8', borderRadius: 7 }}>
                    <div style={{ width: `${(b.val / b.max) * 100}%`, height: '100%', background: b.color, borderRadius: 7 }} />
                  </div>
                  <div style={{ width: 36, textAlign: 'right' as const, fontSize: 16, fontWeight: 700 }}>{b.val} s</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, lineHeight: '19px', color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 10 }}>
              Boot sensors · 7 seconds average on Saturday. Our usual is 4 seconds.
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>Evidence</div>
            {[
              { icon: '📋', label: 'Coach note', text: 'Min 16 · "Lost it on halfway. 9 seconds to win it back."' },
              { icon: '🧤', label: 'GPS vest', text: 'Sprints dropped 18% when we lost the ball.' },
              { icon: '🎥', label: 'Match camera', text: '4 clips of slow pressing · ', link: 'Watch' },
            ].map(e => (
              <div key={e.label} style={{ display: 'flex', gap: 12, padding: '8px 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ fontSize: 18, flex: 'none', width: 24 }}>{e.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 2 }}>{e.label}</div>
                  <div style={{ fontSize: 14, lineHeight: '20px' }}>{e.text}{e.link && <span style={{ color: G, fontWeight: 600, cursor: 'pointer' }}>{e.link}</span>}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>What Clean Sheet makes of it</div>
            <div style={{ fontSize: 14, lineHeight: '21px', color: MUT, marginBottom: 12 }}>On Saturday it took 7 seconds on average to win the ball back. The team's usual is 4 seconds. The difference showed up in 6 of the 8 goals conceded this season.</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Why this drill</div>
            {['A game reward for pressing fast: win it in 6 seconds or give a point away.', 'Closest match to what went wrong on Saturday.', 'Your players improved this in 3 sessions last term.'].map((point, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flex: 'none', marginTop: 2 }}>✓</div>
                <div style={{ fontSize: 14, lineHeight: '20px' }}>{point}</div>
              </div>
            ))}
          </div>
          <button onClick={() => st("Added to tonight's plan.")} style={{ height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Add to tonight's plan</button>
          <button onClick={() => st('Going back to suggestions.')} style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer' }}>← Back to suggestions</button>
        </div>
      </main>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
