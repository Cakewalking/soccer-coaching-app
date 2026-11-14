import { useState } from 'react'

const G = '#2f6252', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const ACTIVE = [
  { ini: 'KR', name: 'Kai Russo', what: 'Ankle sprain · 2 weeks ago', tag: 'Modified', step: 2 },
  { ini: 'TR', name: 'Tom Reyes', what: 'Hamstring strain · 3 weeks ago', tag: 'Modified', step: 3 },
  { ini: 'NO', name: 'Noah Okafor', what: 'Knee soreness · 1 week ago', tag: 'Modified', step: 1 },
]
const BACK = [
  { ini: 'IM', name: 'Isla Morgan', what: 'Ankle sprain', tag: 'Back', step: 4 },
  { ini: 'LM', name: 'Leo Marsh', what: 'Shin splints', tag: 'Back', step: 4 },
]
const STEPS = ['Rest','Modified','Training','Back']

const StepBar = ({ n }: { n: number }) => (
  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
    {STEPS.map((_, i) => (
      <div key={i} style={{ width: 24, height: 8, borderRadius: 4, background: i < n ? G : '#e8edeb' }} />
    ))}
    <span style={{ fontSize: 11, color: MUT, marginLeft: 4 }}>Step {n}/{STEPS.length}</span>
  </div>
)

export default function IL1Injuries(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: G, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek · Fitness coach</div>
        {['Home','Squad','Training','Match day','Clips'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 500, color: '#fff', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Injuries</h1>
        <span style={{ fontSize: 14, color: MUT }}>Week 9 · 7 total this season</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {[['7','Total injuries','this season'],['19','Average days','to return'],['4/7','In training','modified'],['2','Saw doctor','this season']].map(([n, l, s]) => (
              <div key={n} style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ fontSize: 26, fontWeight: 800 }}>{n}</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{l}</div>
                <div style={{ fontSize: 12, color: MUT }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: MUT, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Active</div>
            {ACTIVE.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 120px 180px', alignItems: 'center', minHeight: 52, borderTop: `1px solid ${LN}`, gap: 12 }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#fce9e9', color: '#c00', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</span>
                <span><strong style={{ fontSize: 14 }}>{p.name}</strong><br /><span style={{ fontSize: 12, color: MUT }}>{p.what}</span></span>
                <span style={{ padding: '2px 10px', borderRadius: 99, background: '#fff0d4', color: '#c06000', fontWeight: 700, fontSize: 12, display: 'inline-block' }}>{p.tag}</span>
                <StepBar n={p.step} />
              </div>
            ))}
            <div style={{ fontSize: 14, fontWeight: 700, margin: '10px 0 6px', color: MUT, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Cleared</div>
            {BACK.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 120px 180px', alignItems: 'center', minHeight: 48, borderTop: `1px solid ${LN}`, gap: 12, opacity: 0.7 }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, color: G, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</span>
                <span><strong style={{ fontSize: 14 }}>{p.name}</strong><br /><span style={{ fontSize: 12, color: MUT }}>{p.what}</span></span>
                <span style={{ padding: '2px 10px', borderRadius: 99, background: PALE, color: G, fontWeight: 700, fontSize: 12, display: 'inline-block' }}>{p.tag}</span>
                <StepBar n={p.step} />
              </div>
            ))}
          </div>
          <div style={{ background: '#fce9e9', border: '1px solid #f0a0a0', borderRadius: 12, padding: '10px 14px', fontSize: 14 }}>Any head knock? Start the concussion protocol. Do not let the player return to training until cleared by a doctor.</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Log an injury</div>
          <div style={{ fontSize: 13, color: MUT }}>Tap the area on the body map to record where the injury occurred.</div>
          <svg viewBox="0 0 100 200" style={{ width: '100%', height: 200 }}>
            <ellipse cx="50" cy="22" rx="18" ry="20" fill={PALE} stroke={LN} strokeWidth="1.5" />
            <rect x="30" y="44" width="40" height="60" rx="8" fill={PALE} stroke={LN} strokeWidth="1.5" />
            <rect x="12" y="46" width="16" height="52" rx="8" fill={PALE} stroke={LN} strokeWidth="1.5" />
            <rect x="72" y="46" width="16" height="52" rx="8" fill={PALE} stroke={LN} strokeWidth="1.5" />
            <rect x="30" y="106" width="18" height="60" rx="8" fill={PALE} stroke={LN} strokeWidth="1.5" />
            <rect x="52" y="106" width="18" height="60" rx="8" fill={PALE} stroke={LN} strokeWidth="1.5" />
          </svg>
          <input placeholder="What happened? (optional)" style={{ height: 44, borderRadius: 8, border: `1px solid #c5c8c4`, padding: '0 10px', fontSize: 14, fontFamily: 'inherit' }} />
          <button style={{ height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }} onClick={() => st('Logging injury.')}>Log injury</button>
        </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
