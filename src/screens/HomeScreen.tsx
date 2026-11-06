import { INBOX, METRICS, WEEK_SCHEDULE, RESULTS, SQUAD, type Role } from '../data'

type Screen = 'home' | 'training' | 'matchday' | 'teamtalk'

interface Props {
  role: Role
  onRole: (r: Role) => void
  onNav: (s: Screen) => void
}

function iconBg(type: 'green' | 'rose' | 'stone') {
  if (type === 'rose')  return '#c39797'
  if (type === 'stone') return '#cbbeb5'
  return '#40826d'
}

function iconColor(type: 'green' | 'rose' | 'stone') {
  return type === 'green' ? '#ffffff' : '#10211f'
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const W = 80, H = 34
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / range) * (H * 0.72) - H * 0.14,
  }))
  const last = pts[pts.length - 1]
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" style={{ flex: 'none' }}>
      <polyline points={pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')} stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x.toFixed(1)} cy={last.y.toFixed(1)} r="3.5" fill={color} />
    </svg>
  )
}

function sparkColor(type: 'bad' | 'good' | 'neutral') {
  if (type === 'good')    return '#40826d'
  if (type === 'neutral') return '#6f7f7b'
  return '#9d7c80'
}

function tileChipStyle(type: 'bad' | 'good' | 'neutral') {
  if (type === 'good')    return { background: '#40826d', color: '#ffffff' }
  if (type === 'neutral') return { background: '#cbbeb5', color: '#10211f' }
  return { background: '#c39797', color: '#10211f' }
}

function resultStyle(r: 'W' | 'D' | 'L') {
  const base = { width: 36, height: 36, borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' } as const
  if (r === 'W') return { ...base, background: '#2f6252', color: '#ffffff' }
  if (r === 'L') return { ...base, background: '#c39797', color: '#10211f' }
  return               { ...base, background: '#e9eae8', color: '#10211f' }
}

function weekRowStyle(type: string) {
  const base = { display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 8, minHeight: 36 } as const
  if (type === 'today') return { ...base, background: '#2f6252', color: '#ffffff' }
  if (type === 'game')  return { ...base, background: '#cbbeb5', color: '#10211f' }
  return { ...base, color: '#10211f' }
}

export default function HomeScreen({ onNav }: Props) {
  return (
    <main style={{
      flexGrow: 1, minHeight: 0, padding: '18px 28px 22px',
      boxSizing: 'border-box', display: 'grid',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 18,
    }}>

      {/* ── Inbox (span 4) ── */}
      <section className="tile" style={{ gridColumn: 'span 4', padding: '0 0 8px', overflow: 'hidden', gap: 0 }} aria-label="Inbox">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#1f4a3e', color: '#ffffff' }}>
          <h2 className="h2">Inbox</h2>
          <span style={{ background: '#ffffff', color: '#006666', borderRadius: '999px', padding: '2px 10px', fontSize: 13, lineHeight: '18px', fontWeight: 700 }}>3 new</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {INBOX.map((item, i) => (
            <button key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              width: '100%', minHeight: 76, padding: '10px 18px',
              boxSizing: 'border-box', border: 0, borderTop: '1px solid #e9eae8',
              background: item.unread ? '#ffffff' : '#f7f8f7', color: '#10211f', textAlign: 'left',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <span style={{
                flex: 'none', width: 36, height: 36, borderRadius: '999px', marginTop: 2,
                background: iconBg(item.iconBg), color: iconColor(item.iconBg),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={item.iconPath} />
                </svg>
              </span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{item.category}</span>
                  <span style={{ flex: 'none', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{item.time}</span>
                </span>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: item.unread ? 600 : 400 }}>{item.title}</span>
              </span>
              {item.unread && <span style={{ flex: 'none', width: 10, height: 10, borderRadius: '999px', background: '#40826d', marginTop: 6 }} aria-label="Unread" />}
            </button>
          ))}
        </div>
      </section>

      {/* ── Center column (span 5) ── */}
      <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 18, minHeight: 0 }}>

        {/* TODAY card */}
        <section style={{
          flex: 'none', position: 'relative', overflow: 'hidden',
          background: '#40826d', color: '#ffffff', borderRadius: 18,
          padding: '20px 22px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', gap: 12,
        }} aria-label="Today">
          {/* Decorative dot grid */}
          <svg width="70" height="92" viewBox="0 0 70 92" style={{ position: 'absolute', right: 18, top: 16 }} aria-hidden="true">
            <g fill="#2f6252">
              <circle cx="9" cy="9" r="7"/><circle cx="35" cy="9" r="7"/><circle cx="61" cy="9" r="7"/>
              <circle cx="9" cy="33" r="7"/><circle cx="35" cy="33" r="7"/><circle cx="61" cy="33" r="7"/>
              <circle cx="35" cy="57" r="7"/><circle cx="61" cy="57" r="7"/>
              <circle cx="61" cy="81" r="7"/>
            </g>
            <circle cx="9" cy="57" r="7" fill="#cbbeb5" />
          </svg>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: '#ffffff', color: '#2f6252', borderRadius: '999px', padding: '2px 10px', fontSize: 13, lineHeight: '18px', fontWeight: 700, letterSpacing: '0.04em' }}>TODAY</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>6:00 pm · Wattle Creek Oval</span>
          </div>
          <div>
            <div style={{ fontSize: 28, lineHeight: '34px', fontWeight: 700, letterSpacing: '-0.02em' }}>Training tonight</div>
            <div style={{ fontSize: 15, lineHeight: '22px' }}>75 minutes · 4 drills · built from Saturday's game</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Win the ball back faster', 'Keep the lines close', 'Strong last 20'].map(cue => (
              <span key={cue} style={{ background: '#2f6252', borderRadius: '999px', padding: '4px 12px', fontSize: 14, lineHeight: '20px', fontWeight: 600 }}>{cue}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onNav('training')}
              style={{
                flex: 1, height: 48, borderRadius: 12,
                border: '2px solid #ffffff', background: '#ffffff', color: '#2f6252',
                fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              Open training plan
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            <button
              onClick={() => onNav('teamtalk')}
              style={{
                height: 48, padding: '0 18px', borderRadius: 12,
                border: '2px solid rgba(255,255,255,0.5)', background: 'transparent', color: '#ffffff',
                fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Team talk
            </button>
          </div>
        </section>

        {/* Where we're at */}
        <section className="tile" style={{ flexGrow: 1 }} aria-label="Where we're at">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="h2">Where we're at</h2>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
              <span style={{ fontSize: 13, color: '#6f7f7b' }}>Measured against our style: press high · build from the back</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gridTemplateRows: 'repeat(2, minmax(0, 1fr))', gap: 10, flexGrow: 1, minHeight: 0 }}>
            {METRICS.map((m, i) => (
              <button key={i} style={{
                display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px',
                background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 14,
                textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <span style={{ fontSize: 14, lineHeight: '19px', fontWeight: 600 }}>{m.label}</span>
                <span style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, width: '100%' }}>
                  <span style={{ fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>{m.value}</span>
                  <Sparkline data={m.sparkData} color={sparkColor(m.statusType)} />
                </span>
                <span style={{ ...tileChipStyle(m.statusType), borderRadius: '999px', padding: '2px 10px', fontSize: 13, lineHeight: '18px', fontWeight: 700 }}>
                  {m.status}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* ── Right column (span 3) ── */}
      <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>

        {/* This week */}
        <section className="tile" style={{ flex: 'none', gap: 6 }} aria-label="This week">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="h2">This week</h2>
            <button style={{ border: 0, background: 'transparent', color: 'var(--green-deep)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Calendar</button>
          </div>
          {WEEK_SCHEDULE.map(d => (
            <div key={d.day} style={weekRowStyle(d.type)}>
              <span style={{ flex: 'none', width: 52, fontSize: 14, fontWeight: 700 }}>{d.day}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={d.icon} />
              </svg>
              <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '18px' }}>{d.label}</span>
            </div>
          ))}
        </section>

        {/* Results */}
        <button className="tile" style={{ flex: 'none', gap: 8 }} aria-label="Results">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
            <h2 className="h2">Results</h2>
            <span className="cap">3rd of 10</span>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {RESULTS.games.map((r, i) => (
              <span key={i} style={resultStyle(r)}>{r}</span>
            ))}
          </div>
          <div style={{ background: '#cbbeb5', color: '#10211f', borderRadius: 10, padding: '6px 10px', fontSize: 14, lineHeight: '20px', width: '100%', boxSizing: 'border-box' }}>
            Next: <strong>Sat vs Harbour Rovers</strong> (6th)
          </div>
        </button>

        {/* Squad */}
        <button className="tile" style={{ flexGrow: 1, gap: 8 }} aria-label="Squad">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
            <h2 className="h2">Squad</h2>
            <span className="cap">{SQUAD.total} players</span>
          </div>
          <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', gap: 2, width: '100%' }} role="img" aria-label={`${SQUAD.ready} ready, ${SQUAD.manage} to manage, ${SQUAD.checkIn} to check in`}>
            <span style={{ flex: `${SQUAD.ready} 1 0`, background: '#40826d' }} />
            <span style={{ flex: `${SQUAD.manage} 1 0`, background: '#9d7c80' }} />
            <span style={{ flex: `${SQUAD.checkIn} 1 0`, background: '#c39797' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: 14, lineHeight: '20px' }}>
            <span><strong>{SQUAD.ready}</strong> ready</span>
            <span><strong>{SQUAD.manage}</strong> manage</span>
            <span><strong>{SQUAD.checkIn}</strong> check in</span>
          </div>
        </button>
      </div>

    </main>
  )
}
