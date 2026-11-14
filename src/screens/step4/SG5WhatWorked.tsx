import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const RESULTS = [
  { drill: 'Win it back · 6 seconds', runs: 4, moved: 'Pressing wins +3/game', verdict: 'Working', next: 'Keep' },
  { drill: 'Tight shape, 3 zones', runs: 3, moved: 'Line gap –7 m avg', verdict: 'Working', next: 'Keep' },
  { drill: 'Left foot passing gate', runs: 5, moved: 'Mia: 2→11 passes/game', verdict: 'Strong', next: 'Maintain' },
  { drill: 'Warm-up rondo', runs: 8, moved: 'Passing accuracy +2%', verdict: 'Partial', next: 'Adjust' },
]

export default function SG5WhatWorked(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button onClick={() => st('Opening team selector.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Suggested' ? INK : MUT, borderBottom: `3px solid ${n === 'Suggested' ? '#40826d' : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>What worked this term</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr 100px 80px', padding: '10px 18px', background: '#f7f8f7', borderBottom: `1px solid ${LN}` }}>
              {['Drill', 'Runs', 'What moved', 'Verdict', 'Next'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>
              ))}
            </div>
            {RESULTS.map(r => (
              <div key={r.drill} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr 100px 80px', padding: '12px 18px', borderTop: `1px solid ${LN}`, alignItems: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{r.drill}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{r.runs}</div>
                <div style={{ fontSize: 14, color: G, fontWeight: 600 }}>{r.moved}</div>
                <div style={{ fontSize: 13, fontWeight: 700, background: r.verdict === 'Strong' ? GD : PALE, color: r.verdict === 'Strong' ? '#fff' : G, borderRadius: 999, padding: '2px 10px', display: 'inline-block' }}>{r.verdict}</div>
                <div style={{ fontSize: 14, color: MUT }}>{r.next}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 6 }}>What it has learned</div>
            <div style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>Pressing drills with time pressure (like the 6-second rule) improved recovery speed 40% faster than passive possession drills for this group.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Training and games</div>
            {[['Drills run this term', '28'], ['Games measured', '8'], ['Players with full data', '12 of 16']].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: `1px solid ${LN}`, fontSize: 14 }}>
                <span style={{ color: MUT }}>{label}</span>
                <span style={{ fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </main>
    </div>
  )
}
