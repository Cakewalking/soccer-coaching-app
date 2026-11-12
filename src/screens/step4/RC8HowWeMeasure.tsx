import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const MEASURES = [
  { measure: 'Time to win it back', plain: 'Seconds from losing to winning the ball', from: 'Boot sensors', sure: 'High', runs: 3 },
  { measure: 'Pressing win rate', plain: 'Percentage of presses that win the ball', from: 'Boot sensors', sure: 'High', runs: 2 },
  { measure: 'Line gap', plain: 'Metres between defence and midfield', from: 'Match camera', sure: 'Medium', runs: 5 },
  { measure: 'Sprint count', plain: 'High-speed runs above 18 km/h per player', from: 'GPS vest', sure: 'High', runs: 1 },
  { measure: 'Distance covered', plain: 'Total km per player per session', from: 'GPS vest', sure: 'High', runs: 1 },
  { measure: 'Passes completed', plain: 'Percentage of passes that reach a teammate', from: 'Match camera', sure: 'Medium', runs: 4 },
  { measure: 'Left-foot passes', plain: 'Passes struck with the non-dominant foot', from: 'Boot sensors', sure: 'High', runs: 3 },
  { measure: 'Headers won', plain: 'Aerial duels won out of those attempted', from: 'Match camera', sure: 'Medium', runs: 5 },
  { measure: 'Ball speed', plain: 'Average speed of passes in km/h', from: 'Boot sensors', sure: 'High', runs: 3 },
]

const SURE_COLOR: Record<string, string> = { High: G, Medium: '#b78c00', Low: '#c05' }

export default function RC8HowWeMeasure(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button onClick={() => st('Opening team selector.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Record' ? INK : MUT, borderBottom: `3px solid ${n === 'Record' ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>How we measure things</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 70px 80px', padding: '10px 18px', background: '#f7f8f7', borderBottom: `1px solid ${LN}`, flex: 'none' }}>
              {['Measure', 'Plain words', 'Comes from', 'How sure', 'Runs needed'].map(h => <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>)}
            </div>
            <div style={{ overflowY: 'auto' as const, flex: 1 }}>
              {MEASURES.map(m => (
                <div key={m.measure} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 70px 80px', padding: '11px 18px', borderTop: `1px solid ${LN}`, alignItems: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{m.measure}</div>
                  <div style={{ fontSize: 13, color: MUT, lineHeight: '19px' }}>{m.plain}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, background: PALE, color: G, borderRadius: 999, padding: '1px 8px', display: 'inline-block' }}>{m.from}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: SURE_COLOR[m.sure] }}>{m.sure}</div>
                  <div style={{ fontSize: 14 }}>{m.runs}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Three rules</div>
            {['We only report a measure when we have enough data to be confident.', 'We tell you how confident we are, so you can decide how much to trust it.', 'We never use a measure for a development goal before it\'s been verified.'].map((rule, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flex: 'none' }}>{i + 1}</div>
                <div style={{ fontSize: 14, lineHeight: '20px' }}>{rule}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>By age</div>
            <div style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>U12 and under: sprint counts and high-speed distance thresholds are adjusted for growth stage. Players growing more than 6 cm a year get lower caps automatically.</div>
          </div>
        </div>

      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </main>
    </div>
  )
}
