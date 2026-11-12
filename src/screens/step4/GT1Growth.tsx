const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', BG = '#f5f6f4'

const PLAYERS = [
  { init: 'NO', name: 'Noah Okafor', height: '149.7 cm', rate: '+8.4', flags: 'Knee pain ×3' },
  { init: 'ZH', name: 'Zoe Hartley', height: '147.6 cm', rate: '+8.0', flags: 'Heel pain ×2' },
  { init: 'JP', name: 'Jai Patel', height: '151.2 cm', rate: '+7.2', flags: 'Growing fast' },
  { init: 'RC', name: 'Ruby Chen', height: '153.0 cm', rate: '+6.8', flags: '' },
  { init: 'EB', name: 'Ella Brandt', height: '150.1 cm', rate: '+6.4', flags: '' },
  { init: 'IM', name: 'Isla Morgan', height: '146.3 cm', rate: '+6.0', flags: '' },
  { init: 'MT', name: 'Mia Tran', height: '148.8 cm', rate: '+5.6', flags: '' },
  { init: 'LM', name: 'Leo Marsh', height: '155.4 cm', rate: '+5.2', flags: '' },
  { init: 'LN', name: 'Lily Nguyen', height: '144.9 cm', rate: '+5.0', flags: '' },
  { init: 'GO', name: 'Grace Owusu', height: '157.2 cm', rate: '+4.8', flags: '' },
  { init: 'FW', name: 'Finn Walsh', height: '146.0 cm', rate: '+4.8', flags: '' },
  { init: 'AL', name: 'Ava Lindqvist', height: '152.5 cm', rate: '+4.4', flags: '' },
  { init: 'SD', name: 'Sam Delaney', height: '145.1 cm', rate: '+4.4', flags: '' },
  { init: 'OB', name: 'Oscar Brennan', height: '143.8 cm', rate: '+4.0', flags: '' },
  { init: 'KR', name: 'Kai Russo', height: '147.4 cm', rate: '+3.6', flags: '' },
  { init: 'TR', name: 'Tom Reyes', height: '149.0 cm', rate: '+3.2', flags: '' },
]

function MiniChart() {
  // Simple sparkline-style chart
  const pts = [144, 146, 148, 149.7]
  const min = 142, max = 152
  const w = 200, h = 60
  const toX = (i: number) => (i / (pts.length - 1)) * (w - 20) + 10
  const toY = (v: number) => h - ((v - min) / (max - min)) * (h - 10) - 5
  const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ')
  const dashed = `M ${toX(pts.length - 1)} ${toY(pts[pts.length - 1])} L ${toX(pts.length)} ${toY(150.5)}`
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <path d={d} fill="none" stroke={G} strokeWidth={2} />
      <path d={dashed} fill="none" stroke={G} strokeWidth={2} strokeDasharray="4,4" opacity={0.5} />
      <circle cx={toX(pts.length - 1)} cy={toY(pts[pts.length - 1])} r={4} fill={G} />
    </svg>
  )
}

export function GT1Growth() {
  const fitnessNav = ['Play level', 'Growth', 'Injuries', 'Wellness', 'Availability']
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Squad' ? 700 : 500, color: t === 'Squad' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>PS</div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left nav */}
        <div style={{ width: 200, background: '#fff', borderRight: `1px solid ${LN}`, flexShrink: 0, padding: '12px 0' }}>
          {fitnessNav.map(item => (
            <div key={item} style={{
              padding: '10px 20px', fontSize: 14,
              fontWeight: item === 'Growth' ? 700 : 500,
              color: item === 'Growth' ? G : MUT,
              background: item === 'Growth' ? PALE : 'transparent',
              borderLeft: item === 'Growth' ? `3px solid ${G}` : '3px solid transparent',
              cursor: 'pointer',
            }}>{item}</div>
          ))}
          <div style={{ marginTop: 8, padding: '8px 20px', fontSize: 11, color: MUT, borderTop: `1px solid ${LN}` }}>Fitness coach</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', flex: 1, overflow: 'hidden' }}>
          {/* Table */}
          <div style={{ overflowY: 'auto', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 2 }}>Growth</div>
                <div style={{ fontSize: 13, color: MUT }}>U12 Sam · measured every 3 months · last 11 Mar · next due Thu 11 Jun</div>
                <div style={{ fontSize: 12, color: MUT }}>Flag at 7 cm a year</div>
              </div>
              <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Start measuring session</button>
            </div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                <thead>
                  <tr style={{ background: '#fafafa' }}>
                    {['Player', 'Height', 'Growing (cm a year)', 'Flag'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, textAlign: 'left' as const, borderBottom: `1px solid ${LN}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PLAYERS.map((p, i) => {
                    const isFast = parseFloat(p.rate) >= 7
                    const hasInjury = p.flags.includes('pain')
                    return (
                      <tr key={p.init} style={{ cursor: 'pointer', background: p.init === 'NO' ? PALE : 'transparent', borderBottom: `1px solid ${LN}` }}>
                        <td style={{ padding: '10px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.init}</div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '10px 16px', fontSize: 13, color: INK }}>{p.height}</td>
                        <td style={{ padding: '10px 16px' }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: isFast ? '#dc2626' : G }}>{p.rate}</span>
                        </td>
                        <td style={{ padding: '10px 16px' }}>
                          {p.flags && (
                            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: hasInjury ? '#fef2f2' : '#fffbeb', color: hasInjury ? '#dc2626' : '#d97706' }}>{p.flags}</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div style={{ padding: '12px 16px', fontSize: 12, color: MUT, borderTop: `1px solid ${LN}` }}>All 16, fastest first. Rates come from the last two measurements. Parents can add a height at home between sessions.</div>
            </div>
          </div>

          {/* Player detail */}
          <div style={{ background: '#fff', borderLeft: `1px solid ${LN}`, overflowY: 'auto', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>NO</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Noah Okafor</div>
                <div style={{ fontSize: 12, color: MUT }}>Striker · 12 · growing +8.4 cm a year</div>
              </div>
            </div>

            {/* Growth chart */}
            <div style={{ background: BG, borderRadius: 12, padding: '16px', marginBottom: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <MiniChart />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: MUT }}>
                  <span>Jun 25</span><span>Sep</span><span>Dec</span><span>Mar</span><span>Jun</span>
                </div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>149.7 cm</div>
              <div style={{ fontSize: 12, color: MUT }}>Dotted: where he'll likely be at the next check if he keeps growing at this rate.</div>
            </div>

            {/* Injury note */}
            <div style={{ background: '#fef2f2', border: `1px solid #fca5a5`, borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#dc2626', marginBottom: 6 }}>Knee pain after 3 sessions</div>
              <div style={{ fontSize: 12, color: INK }}>Just below the kneecap. Common in fast growth. No jumps and fewer sprints until it settles, and suggest his parents see a physio if it lasts.</div>
            </div>

            {/* Restrictions */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 16 }}>
              {[
                { label: 'Sprint cap', value: '3 a session' },
                { label: 'Jumps', value: 'Off until pain-free' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: BG, borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: MUT }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.value}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, color: MUT }}>Parent told · Dan, Tue 2 Jun</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GT1eGrowthEmpty() {
  const fitnessNav = ['Play level', 'Growth', 'Injuries', 'Wellness', 'Availability']
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Squad' ? 700 : 500, color: t === 'Squad' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>PS</div>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 200, background: '#fff', borderRight: `1px solid ${LN}`, flexShrink: 0, padding: '12px 0' }}>
          {fitnessNav.map(item => (
            <div key={item} style={{ padding: '10px 20px', fontSize: 14, fontWeight: item === 'Growth' ? 700 : 500, color: item === 'Growth' ? G : MUT, background: item === 'Growth' ? PALE : 'transparent', borderLeft: item === 'Growth' ? `3px solid ${G}` : '3px solid transparent', cursor: 'pointer' }}>{item}</div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div style={{ textAlign: 'center' as const, maxWidth: 420 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>No growth data yet</div>
            <div style={{ fontSize: 14, color: MUT, marginBottom: 24 }}>Run a measuring session to record your squad's heights. Clean Sheet will track growth rates and flag fast growers.</div>
            <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Start measuring session</button>
          </div>
        </div>
      </div>
    </div>
  )
}
