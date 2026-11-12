import { useState } from 'react'
import { INBOX, METRICS, WEEK_SCHEDULE, RESULTS, SQUAD, type Role } from '../data'
import { useSandbox } from './sandbox/SandboxContext'
import { addTeam } from './sandbox/sandboxStore'

interface Props {
  role: Role
  onRole: (r: Role) => void
  onNav: (s: string) => void
  onCalendar?: () => void
  empty?: boolean
}

function HomeEmpty({ onNav }: { onNav: (s: string) => void }) {
  const { active: inSandbox, store, update } = useSandbox()
  const [teamName, setTeamName] = useState('')

  function saveTeam() {
    const name = teamName.trim()
    if (!name || !inSandbox) return
    update(addTeam(store, { name, ageGroup: '' }))
    setTeamName('')
  }

  const teamLabel = inSandbox ? (store.teams[0]?.name ?? '') : 'U12 Sam'
  const hasTeam   = inSandbox ? store.teams.length > 0 : true

  const steps: Array<{ n: number; title: string; body: string; btn: string; nav: string }> = [
    { n: 1, title: 'Add your squad',          body: 'Names, positions and a parent contact. Import a spreadsheet or share an invite link.', btn: 'Add players',  nav: 'squad'    },
    { n: 2, title: 'Add your fixtures',        body: 'Clean Sheet plans training around your game days.',                                    btn: 'Add fixtures', nav: 'fixtures' },
    { n: 3, title: 'Connect the match camera', body: 'Your match camera records games and finds the clips for you.',                         btn: 'Connect',      nav: 'clips'    },
    { n: 4, title: 'Pair boots and vests',     body: 'Boot sensors and GPS vests measure running, sprints and touches.',                     btn: 'Pair devices', nav: 'metric'   },
    { n: 5, title: 'Turn on wellness check-ins', body: 'Players answer three quick questions on their phone before training and games.',     btn: 'Turn on',      nav: 'metric'   },
  ]
  const styleRows = [
    { label: 'PRESSING', desc: 'Wins of the ball in their half' },
  ]
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, padding: '20px 28px 24px', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1 style={{ margin: '0 0 2px', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>
            {inSandbox ? 'Welcome to Clean Sheet' : 'Welcome to Clean Sheet, Sam'}
          </h1>
          <div style={{ fontSize: 14, color: '#4a5a57' }}>
            {inSandbox ? (teamLabel || 'Your team') : 'U12 Sam'} · let's get your team ready
          </div>
        </div>
        {inSandbox && !hasTeam && (
          <form onSubmit={e => { e.preventDefault(); saveTeam() }} style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 20px', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57', marginBottom: 6 }}>Name your team to get started</label>
              <input value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="e.g. U12 Blues, U16 Redbacks" autoFocus style={{ width: '100%', height: 44, padding: '0 12px', border: '1px solid #c5c8c4', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const, outline: 'none', color: '#10211f' }} />
            </div>
            <button type="submit" style={{ height: 44, padding: '0 18px', borderRadius: 8, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Save</button>
          </form>
        )}
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: '#2f6252', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>Get set up</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>0 of 5 done · about 15 minutes</span>
            <div style={{ flexGrow: 1 }} />
            <div style={{ height: 6, width: 120, borderRadius: 3, background: 'rgba(255,255,255,0.3)' }} />
          </div>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px minmax(0,1fr) auto', gap: 12, padding: '14px 16px', alignItems: 'center', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef' }}>
              <span style={{ width: 28, height: 28, borderRadius: '999px', border: '1.5px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#4a5a57', flex: 'none' }}>{s.n}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{s.body}</div>
              </div>
              <button onClick={() => onNav(s.nav)} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: s.n === 1 ? 0 : '1px solid #c5c8c4', background: s.n === 1 ? '#2f6252' : '#ffffff', color: s.n === 1 ? '#ffffff' : '#10211f', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>{s.btn}</button>
            </div>
          ))}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f1ef', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a5a57" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>Setting up for the whole club? We can walk you through it.</span>
            <button onClick={() => onNav('call')} style={{ border: 0, background: 'transparent', color: '#2f6252', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Book a 15-minute call</button>
          </div>
        </div>
      </div>
      <div style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>What happens next</div>
          {[
            { icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', title: 'Record your first game', body: 'Camera on the halfway line, press record.' },
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944', title: 'Get your match review', body: 'About 25 minutes after you upload the video.' },
            { icon: 'M4 11l8-7 8 7v9H4z', title: "Get next week's training plan", body: 'Three things to fix, and drills to fix them.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef' }}>
              <span style={{ flex: 'none', width: 8, height: 8, borderRadius: '999px', background: '#40826d', marginTop: 5 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '17px' }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Where we're at</div>
            <button onClick={() => onNav('setstyle')} style={{ height: 44, padding: '0 12px', borderRadius: 8, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Set our style</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {styleRows.map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef' }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: '#6f7f7b', width: 100, flex: 'none' }}>{row.label}</span>
                <span style={{ fontSize: 13, color: '#4a5a57', flexGrow: 1 }}>{row.desc}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#c5c8c4', flex: 'none' }}>—</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: '#4a5a57', lineHeight: '16px' }}>Fills in after your first recorded game.</div>
        </div>
        <div style={{ background: '#eef5f2', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
          <span style={{ fontSize: 13, color: '#2f6252', flexGrow: 1 }}>Nothing needs you yet. Reviews and alerts arrive here.</span>
          <button onClick={() => onNav('inbox')} style={{ border: 0, background: 'transparent', color: '#2f6252', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Open inbox</button>
        </div>
      </div>
    </div>
  )
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
  const W = 72, H = 30
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / range) * (H * 0.72) - H * 0.14,
  }))
  const last = pts[pts.length - 1]
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" style={{ flex: 'none' }}>
      <polyline points={pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')} stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x.toFixed(1)} cy={last.y.toFixed(1)} r="3" fill={color} />
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

const LAST_GAME_FINDINGS = [
  { text: 'Pressing high worked: 13 wins in their half', label: 'Keep',    keep: true  },
  { text: '7 seconds to win the ball back, usually 4',  label: 'Tonight', keep: false },
  { text: '26 m gap between defence and midfield',       label: 'Tonight', keep: false },
]

export default function HomeScreen({ onNav, onCalendar, empty }: Props) {
  if (empty) return <HomeEmpty onNav={onNav} />
  return (
    <main style={{
      flexGrow: 1, minHeight: 0, padding: '18px 28px 22px',
      boxSizing: 'border-box', display: 'grid',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 18,
    }}>

      {/* ── Left column: Needs you + Where we're at (span 4) ── */}
      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>

        {/* Needs you */}
        <section className="tile" style={{ flex: 'none', padding: '0', overflow: 'hidden', gap: 0 }} aria-label="Needs you">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#1f4a3e', color: '#ffffff' }}>
            <h2 className="h2">Needs you</h2>
            <span style={{ background: '#ffffff', color: '#006666', borderRadius: '999px', padding: '2px 10px', fontSize: 13, lineHeight: '18px', fontWeight: 700 }}>3 new</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {INBOX.filter(item => item.unread).map((item, i) => (
              <button key={i} onClick={() => onNav('inbox')} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                width: '100%', minHeight: 72, padding: '10px 18px',
                boxSizing: 'border-box', border: 0, borderTop: '1px solid #e9eae8',
                background: '#ffffff', color: '#10211f', textAlign: 'left',
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
                  <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 600 }}>{item.title}</span>
                </span>
                <span style={{ flex: 'none', width: 10, height: 10, borderRadius: '999px', background: '#40826d', marginTop: 6 }} aria-label="Unread" />
              </button>
            ))}
          </div>
          <button onClick={() => onNav('inbox')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, width: '100%', height: 44, border: 0, borderTop: '1px solid #e9eae8', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, color: '#2f6252', fontWeight: 600 }}>
            All messages · 3 more
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </section>

        {/* Where we're at */}
        <section className="tile" style={{ flexGrow: 1, gap: 10 }} aria-label="Where we're at">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="h2">Where we're at</h2>
            <button onClick={() => onNav('metric')} style={{ border: 0, background: 'transparent', color: '#2f6252', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>All 4</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
            {METRICS.slice(0, 2).map((m, i) => (
              <button key={i} onClick={() => onNav('metric')} style={{
                display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 14px',
                background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 14,
                textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', flexGrow: 1,
              }}>
                <span style={{ fontSize: 14, lineHeight: '19px', fontWeight: 600 }}>{m.label}</span>
                <span style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, width: '100%' }}>
                  <span style={{ fontSize: 24, lineHeight: '30px', fontWeight: 700, letterSpacing: '-0.02em' }}>{m.value}</span>
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

      {/* ── Center column: TODAY + Last game (span 5) ── */}
      <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>

        {/* TODAY card */}
        <section style={{
          flex: 'none', position: 'relative', overflow: 'hidden',
          background: '#40826d', color: '#ffffff', borderRadius: 18,
          padding: '20px 22px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', gap: 12,
        }} aria-label="Today">
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
            <span style={{ fontSize: 14, fontWeight: 600 }}>5:45 pm · Wattle Creek Reserve</span>
          </div>
          <div>
            <div style={{ fontSize: 28, lineHeight: '34px', fontWeight: 700, letterSpacing: '-0.02em' }}>Training tonight</div>
            <div style={{ fontSize: 15, lineHeight: '22px' }}>90 minutes · warm-up and 4 drills · built from Saturday's game</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Win the ball back faster', 'Keep the lines close', 'Strong last 15 minutes'].map(cue => (
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
              Open the plan
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

        {/* Last game */}
        <section className="tile" style={{ flexGrow: 1, gap: 10 }} aria-label="Last game">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="h2">Last game</h2>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>Sat 30 May · away</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>Ironbark United</div>
              <div style={{ fontSize: 13, color: '#4a5a57', marginTop: 2 }}>Mia, Jai and Zoe scored</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 32, height: 32, borderRadius: '999px', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>W</span>
              <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: '1' }}>3–1</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {LAST_GAME_FINDINGS.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
                <span style={{ flexGrow: 1, fontSize: 14, color: '#10211f', lineHeight: '19px' }}>{f.text}</span>
                <span style={{ flex: 'none', padding: '2px 10px', borderRadius: '999px', fontSize: 13, fontWeight: 700, background: f.keep ? '#40826d' : '#cbbeb5', color: f.keep ? '#ffffff' : '#10211f' }}>{f.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
            <button onClick={() => onNav('matchday')} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Open the review</button>
            <span style={{ height: 44, padding: '0 14px', borderRadius: 10, background: '#eef5f2', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: '#2f6252', gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              Clips · 7
            </span>
          </div>
        </section>
      </div>

      {/* ── Right column (span 3) ── */}
      <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>

        {/* This week */}
        <section className="tile" style={{ flex: 'none', gap: 6 }} aria-label="This week">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="h2">This week</h2>
            <button onClick={onCalendar} style={{ border: 0, background: 'transparent', color: 'var(--green-deep)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Calendar</button>
          </div>
          {WEEK_SCHEDULE.map(d => (
            <div key={d.day} style={weekRowStyle(d.type)}>
              <span style={{ flex: 'none', width: 52, fontSize: 14, fontWeight: 700 }}>{d.day} {d.date}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={d.icon} />
              </svg>
              <span style={{ flexGrow: 1, fontSize: 14, lineHeight: '18px' }}>{d.label}</span>
            </div>
          ))}
        </section>

        {/* Last 5 */}
        <button className="tile" onClick={() => onNav('matchday')} style={{ flex: 'none', gap: 8 }} aria-label="Last 5">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
            <h2 className="h2">Last 5</h2>
            <span className="cap">{RESULTS.position}</span>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {RESULTS.games.map((r, i) => (
              <span key={i} style={resultStyle(r)}>{r}</span>
            ))}
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: 14, lineHeight: '20px', marginBottom: 6 }}>Next: <strong>{RESULTS.next}</strong></div>
            <div style={{ background: '#cbbeb5', color: '#10211f', borderRadius: 10, padding: '6px 10px', fontSize: 14, lineHeight: '20px' }}>
              {RESULTS.nextDetail}
            </div>
          </div>
        </button>

        {/* Squad */}
        <button className="tile" onClick={() => onNav('squad')} style={{ flexGrow: 1, gap: 8 }} aria-label="Squad">
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
