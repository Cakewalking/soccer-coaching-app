import { useState } from 'react'

const PLAYERS = [
  { ini: 'NO', name: 'Noah Okafor',   pos: 'Striker',  age: 12, height: 149.7, growth: 8.4, flag: 'Heel pain ×3',   flagColor: '#c39797' },
  { ini: 'ZH', name: 'Zoe Hartley',   pos: 'Midfield', age: 12, height: 147.6, growth: 8.0, flag: 'Heel pain ×2',   flagColor: '#c39797' },
  { ini: 'JP', name: 'Jai Patel',     pos: 'Defence',  age: 11, height: 151.2, growth: 7.2, flag: 'Growing fast',   flagColor: '#c3e6d4' },
  { ini: 'RC', name: 'Ruby Chen',     pos: 'Striker',  age: 12, height: 153.0, growth: 6.8, flag: null,             flagColor: '' },
  { ini: 'EB', name: 'Ella Brandt',   pos: 'Midfield', age: 11, height: 150.1, growth: 6.4, flag: null,             flagColor: '' },
  { ini: 'MI', name: 'Isla Morgan',   pos: 'Defence',  age: 12, height: 146.3, growth: 6.0, flag: null,             flagColor: '' },
  { ini: 'MT', name: 'Mia Tran',      pos: 'Midfield', age: 12, height: 148.8, growth: 5.6, flag: null,             flagColor: '' },
  { ini: 'LH', name: 'Leo Marsh',     pos: 'Defence',  age: 12, height: 155.4, growth: 5.2, flag: null,             flagColor: '' },
  { ini: 'LN', name: 'Lily Nguyen',   pos: 'Keeper',   age: 11, height: 144.9, growth: 5.0, flag: null,             flagColor: '' },
  { ini: 'GO', name: 'Grace Owusu',   pos: 'Midfield', age: 12, height: 157.2, growth: 4.8, flag: null,             flagColor: '' },
  { ini: 'FW', name: 'Finn Walsh',    pos: 'Striker',  age: 11, height: 146.0, growth: 4.8, flag: null,             flagColor: '' },
  { ini: 'AL', name: 'Ava Lindqvist', pos: 'Midfield', age: 12, height: 152.5, growth: 4.4, flag: null,             flagColor: '' },
  { ini: 'SD', name: 'Sam Delaney',   pos: 'Defence',  age: 11, height: 145.1, growth: 4.0, flag: null,             flagColor: '' },
  { ini: 'OB', name: 'Oscar Brennan', pos: 'Midfield', age: 12, height: 143.8, growth: 4.0, flag: null,             flagColor: '' },
  { ini: 'KR', name: 'Kai Russo',     pos: 'Defence',  age: 11, height: 147.4, growth: 3.6, flag: null,             flagColor: '' },
  { ini: 'TR', name: 'Tom Reyes',     pos: 'Striker',  age: 12, height: 149.0, growth: 3.2, flag: null,             flagColor: '' },
]

const GROWTH_POINTS = [146, 146.8, 147.5, 148.3, 149.1, 149.7]
const MONTHS = ['Jun 25', 'Sep', 'Dec', 'Mar', 'Nov']

function SparkBar({ pct, flagColor }: { pct: number; flagColor: string }) {
  const bg = flagColor === '#c39797' ? '#f5c6c6' : flagColor === '#c3e6d4' ? '#c3e6d4' : '#c3e6d4'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#e9eae8', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: bg, borderRadius: 3 }} />
      </div>
    </div>
  )
}

function GrowthChart() {
  const W = 220, H = 100
  const minH = 144, maxH = 152
  const pts = GROWTH_POINTS.map((h, i) => ({
    x: (i / (GROWTH_POINTS.length - 1)) * (W - 24) + 12,
    y: H - 16 - ((h - minH) / (maxH - minH)) * (H - 32),
  }))
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const extPts = [...pts, { x: W - 12, y: pts[pts.length - 1].y - 8 }]
  const extD = extPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-label="Height growth chart">
      <path d={pathD} fill="none" stroke="#40826d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={extD.slice(extD.indexOf('L', extD.length - 20))} fill="none" stroke="#40826d" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round"/>
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 5 : 3} fill={i === pts.length - 1 ? '#40826d' : '#ffffff'} stroke="#40826d" strokeWidth="2"/>
      ))}
      <text x={pts[pts.length - 1].x + 8} y={pts[pts.length - 1].y + 4} fontSize="11" fill="#10211f" fontWeight="700">149.7 cm</text>
    </svg>
  )
}

export default function GrowthLoadScreen({ empty }: { empty?: boolean }) {
  const [selected, setSelected] = useState(PLAYERS[0])

  if (empty) {
    return (
      <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '28px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Growth and load</h1>
            <span style={{ fontSize: 14, color: '#6f7f7b' }}>No measurements yet</span>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 16, padding: '24px', marginBottom: 20, display: 'flex', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 4, flex: 'none', alignSelf: 'flex-start', marginTop: 4 }}>
              {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: c }} />)}
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Protect players while they grow</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 16 }}>
                Measure height every 3 months. Clean Sheet flags anyone growing fast, so you can cut jumps and sprints before knees and heels get sore.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ height: 40, padding: '0 18px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
                  Plan a measuring session
                </button>
                <button style={{ height: 40, padding: '0 18px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See an example</button>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 10 }}>Fills in like this</div>
          {[85, 70, 90, 65, 80, 75, 60, 85].map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: '1px solid #f0f1f0' }}>
              <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
              <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', flex: `${w} 1 0`, maxWidth: `${w}%` }} />
              <div style={{ height: 10, borderRadius: 5, background: '#f0f1f0', flex: `${100 - w} 1 0` }} />
            </div>
          ))}
        </div>

        <aside style={{ width: 280, flex: 'none', borderLeft: '1px solid #e9eae8', background: '#ffffff', padding: '24px 20px', overflowY: 'auto' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 16 }}>What you'll need</div>
          {[
            { icon: 'M4 6h16M4 12h8M4 18h12', title: 'A tape on a wall', sub: 'Shoes off, back to the wall' },
            { icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-10V7', title: 'About 10 minutes', sub: 'Before training, every 3 months' },
            { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Pain reports', sub: 'Players tap a body map after training' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg>
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.sub}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, fontSize: 12, color: '#6f7f7b', lineHeight: '17px', background: '#f7f9f7', borderRadius: 10, padding: '10px 12px' }}>
            Weight is optional and never shown to players or other parents.
          </div>
        </aside>
      </div>
    )
  }

  const maxGrowth = Math.max(...PLAYERS.map(p => p.growth))

  return (
    <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Player table */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', letterSpacing: '-0.02em' }}>Growth</div>
            <div style={{ fontSize: 13, color: '#6f7f7b', marginTop: 2 }}>U12 Sam · measured every 3 months · last 11 Mar · next due Thu 11 Jun</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>Flag at 7 cm a year</div>
            <button style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Start measuring session</button>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1fr 110px', padding: '8px 16px', borderBottom: '1px solid #e9eae8' }}>
            {['Player', 'Height', 'Growing (cm a year)', 'Flag'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#6f7f7b' }}>{h}</div>
            ))}
          </div>
          {PLAYERS.map((p, i) => (
            <button key={p.ini} onClick={() => setSelected(p)} style={{
              display: 'grid', gridTemplateColumns: '1fr 100px 1fr 110px', padding: '10px 16px',
              borderTop: i > 0 ? '1px solid #f0f1f0' : 'none',
              background: selected.ini === p.ini ? '#f0f8f4' : '#ffffff',
              border: 0, width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{p.name}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{p.height} cm</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <SparkBar pct={(p.growth / maxGrowth) * 100} flagColor={p.flagColor} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f', minWidth: 36 }}>+{p.growth}</span>
              </div>
              <div>
                {p.flag && (
                  <span style={{ fontSize: 11, fontWeight: 700, background: p.flagColor === '#c39797' ? '#fbe9e9' : '#e4f2eb', color: p.flagColor === '#c39797' ? '#7a3030' : '#2f6252', borderRadius: 6, padding: '2px 8px' }}>{p.flag}</span>
                )}
              </div>
            </button>
          ))}
          <div style={{ padding: '10px 16px', borderTop: '1px solid #e9eae8', fontSize: 12, color: '#6f7f7b' }}>
            All 16, fastest first. Rates come from the last two measurements. Parents can add a height at home between sessions.
          </div>
        </div>
      </div>

      {/* Right detail */}
      <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', background: '#ffffff', padding: '24px 20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{selected.ini}</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>{selected.name}</div>
            <div style={{ fontSize: 12, color: '#6f7f7b' }}>{selected.pos} · {selected.age} · growing +{selected.growth} cm a year</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <GrowthChart />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {MONTHS.map(m => <span key={m} style={{ fontSize: 10, color: '#6f7f7b' }}>{m}</span>)}
          </div>
          <div style={{ fontSize: 11, color: '#9a9f9d', marginTop: 4 }}>Dotted: where he'll likely be at the next check if he keeps growing at this rate.</div>
        </div>

        {selected.flag && (
          <div style={{ background: selected.flagColor === '#c39797' ? '#fbe9e9' : '#e4f2eb', borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: selected.flagColor === '#c39797' ? '#7a3030' : '#1f4a3e', marginBottom: 4 }}>{selected.flag}</div>
            <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>
              {selected.flagColor === '#c39797'
                ? 'Common in fast growth. No jumps and fewer sprints until it settles, and suggest his parents see a physio if it lasts.'
                : 'Growing very quickly this season. Keep an eye on joint pain reports.'}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[
            { label: 'Sprint cap', value: 'Off until pain-free' },
            { label: 'Jumps', value: selected.flag === 'Heel pain ×3' ? 'Off until pain-free' : 'Normal' },
            { label: 'Parent told', value: 'Linh, Tue 2 Jun' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
              <span style={{ fontSize: 13, color: '#6f7f7b' }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{row.value}</span>
            </div>
          ))}
          <div style={{ padding: '8px 0', borderTop: '1px solid #f0f1f0' }}>
            <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 4 }}>3 sessions</div>
          </div>
        </div>
      </div>
    </div>
  )
}
