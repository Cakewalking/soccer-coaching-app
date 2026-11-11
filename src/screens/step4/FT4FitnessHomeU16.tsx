const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const WATCH = [
  { ini: 'TO', name: 'Theo Ortiz', tag: 'Full training', col: PALE, tc: G },
  { ini: 'CW', name: 'Cal West', tag: 'Rest Wednesday', col: '#fff0d4', tc: '#c06000' },
  { ini: 'DM', name: 'Dev Mehta', tag: 'Talk to him', col: '#fce9e9', tc: '#c00' },
  { ini: '+4', name: '4 under game time', tag: 'Watching', col: '#f0f0f0', tc: MUT },
]
const TILES = [
  { n: '+30%', label: 'Load spike', sub: 'Two weeks running', warn: true },
  { n: '3.4/5', label: 'Wellness', sub: 'Below target', warn: true },
  { n: '9↑', label: 'Yo-Yo test', sub: 'Improved' },
  { n: '14/14', label: 'GPS tracked', sub: 'All tagged' },
]
const BARS = [80, 95, 75, 100, 90, 82, 92]
const FELT = [72, 98, 68, 95, 85, 78, 88]
const DAYS = ['M','T','W','T','F','S','S']

export default function FT4FitnessHomeU16(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: G, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ flex: 1 }}><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', display: 'block' }}>Wattle Creek FC · Fitness coach</span><span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Hi Ollie</span></div>
        {['Home','Squad','Training','Match day','Clips'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Home' ? 700 : 500, color: '#fff', background: n === 'Home' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ background: '#fce9e9', border: '1px solid #f0a0a0', borderRadius: 14, padding: '10px 14px', fontSize: 14 }}>
            <strong style={{ color: '#c00' }}>Heavy legs two weeks running.</strong> Load is 30% above target and wellness is dipping. Recommend a step-back week.
          </div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Effort vs felt load — this week</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90 }}>
              {BARS.map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 2 }}>
                  <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', gap: 2, height: 72 }}>
                    <div style={{ flex: 1, height: h * 0.72, background: G, borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
                    <div style={{ flex: 1, height: FELT[i] * 0.72, background: '#f0a0a0', borderRadius: '4px 4px 0 0' }} />
                  </div>
                  <span style={{ fontSize: 11, color: MUT }}>{DAYS[i]}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 6, fontSize: 12, color: MUT }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 12, height: 10, background: G, borderRadius: 2, display: 'inline-block' }} />Target</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 12, height: 10, background: '#f0a0a0', borderRadius: 2, display: 'inline-block' }} />Felt</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {TILES.map(t => (
              <div key={t.n} style={{ background: '#fff', border: `1px solid ${t.warn ? '#f0a0a0' : '#c5c8c4'}`, borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: t.warn ? '#c00' : INK }}>{t.n}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Who to watch</div>
          {WATCH.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${LN}`, paddingTop: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, color: G, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{p.name}</span>
              <span style={{ padding: '2px 8px', borderRadius: 99, background: p.col, color: p.tc, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' as const }}>{p.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
