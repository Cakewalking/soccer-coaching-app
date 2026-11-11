import { useState } from 'react'
import { DATA, COLOR_MAP, type Role } from '../data'

type Screen = 'home' | 'training' | 'matchday' | 'teamtalk' | 'pitchside' | 'addgame'

interface Props {
  role: Role
  onNav: (s: Screen) => void
  empty?: boolean
}

function TrainingEmpty({ onNav }: { onNav: (s: 'addgame') => void }) {
  const starterSessions = [
    { tag: 'Ready-made', title: 'Pressing basics', sub: '6-second press · small game', note: 'Good first session for any age group' },
    { tag: 'Ready-made', title: 'Pass and move',   sub: 'Passing squares · 3 v 1 · small game', note: 'Builds confidence on the ball' },
    { tag: 'Ready-made', title: 'Shape and defending', sub: 'Walk-through · 4 v 4 · step up together', note: 'Sets up the back line' },
  ]
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Training</h1>
        <span style={{ fontSize: 14, color: '#4a5a57' }}>No session planned yet</span>
        <div style={{ flexGrow: 1 }} />
        <button style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Build your own</button>
      </div>

      {/* Main two-column */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)', gap: 20, padding: '14px 28px', overflow: 'hidden' }}>
        {/* Left: why + skeleton drills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ background: '#f7f8f7', border: '1px solid #e9eae8', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Why this plan</div>
            <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>After your first recorded game</div>
            <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '17px', marginTop: 6 }}>Each drill will link to a clip or a number from your last game, so you can see why it was picked.</div>
          </div>
          {[65, 55, 50].map((w, i) => (
            <div key={i} style={{ height: 56, border: '1px dashed #c5c8c4', borderRadius: 12, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
              <div style={{ width: 48, height: 36, borderRadius: 8, background: '#e9eae8', flex: 'none' }} />
              <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${w}%` }} />
            </div>
          ))}
        </div>

        {/* Right: first plan callout + starter drills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ background: '#eef5f2', borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#40826d', marginBottom: 6 }}>Your first plan</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Plans come from your games</div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px', marginBottom: 14 }}>After your first recorded game, Clean Sheet picks drills that fix what it sees in the video and wearable data. Until then, start from a ready-made session.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Use a starter session</button>
              <button onClick={() => onNav('addgame')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #2f6252', background: '#ffffff', color: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Record a game</button>
            </div>
          </div>
          {[65, 50].map((w, i) => (
            <div key={i} style={{ height: 56, border: '1px dashed #c5c8c4', borderRadius: 12, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
              <div style={{ width: 48, height: 36, borderRadius: 8, background: '#e9eae8', flex: 'none' }} />
              <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Starter sessions strip */}
      <div style={{ flex: 'none', borderTop: '1px solid #e9eae8', padding: '14px 28px', background: '#ffffff' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 10 }}>Starter sessions · 60 minutes · 4 drills each</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {starterSessions.map(s => (
            <div key={s.title} style={{ background: '#f7f8f7', border: '1px solid #e9eae8', borderRadius: 12, padding: '12px 14px' }}>
              <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: '999px', background: '#eef5f2', color: '#2f6252', marginBottom: 6 }}>{s.tag}</span>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: '#4a5a57', marginBottom: 4 }}>{s.sub}</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: adjust for players */}
      <div style={{ flex: 'none', borderTop: '1px solid #e9eae8', padding: '10px 28px', display: 'flex', gap: 24, background: '#fafafa' }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Adjust for players</div>
          <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>Players who need a lighter night show up here once wellness check-ins and vests are on.</div>
        </div>
        <button style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Turn on check-ins</button>
      </div>
    </div>
  )
}


function DrillDiagram({ tag }: { tag: string }) {
  const bg = COLOR_MAP[tag] ?? '#cbbeb5'
  const isFocus1 = tag === 'Focus 1'
  const isFocus2 = tag === 'Focus 2'
  const isWarmup = tag === 'Warm-up'

  return (
    <div style={{
      width: 72, height: 56, borderRadius: 10, flex: 'none',
      background: bg, position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: 0.9,
    }}>
      <svg width="60" height="46" viewBox="0 0 60 46" fill="none" aria-hidden="true">
        {/* Pitch outline */}
        <rect x="2" y="4" width="56" height="38" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
        {isWarmup && <>
          {/* Rondo circle formation */}
          {[0,60,120,180,240,300].map((a,i) => (
            <circle key={i} cx={30 + 14 * Math.cos(a * Math.PI / 180)} cy={23 + 10 * Math.sin(a * Math.PI / 180)} r="3" fill="rgba(255,255,255,0.8)" />
          ))}
          <circle cx="30" cy="23" r="3" fill="rgba(255,255,255,0.4)" />
        </>}
        {isFocus1 && <>
          {/* Two teams pressing */}
          <circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.9)" />
          <circle cx="22" cy="18" r="3" fill="rgba(255,255,255,0.9)" />
          <circle cx="12" cy="30" r="3" fill="rgba(255,255,255,0.9)" />
          <circle cx="22" cy="34" r="3" fill="rgba(255,255,255,0.9)" />
          <circle cx="38" cy="12" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="48" cy="18" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="38" cy="30" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="48" cy="34" r="3" fill="rgba(255,255,255,0.4)" />
          <line x1="30" y1="4" x2="30" y2="42" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 2" />
        </>}
        {isFocus2 && <>
          {/* Half-pitch with zones */}
          <line x1="2" y1="19" x2="58" y2="19" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="2" y1="29" x2="58" y2="29" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 2" />
          {[10,20,30,40,50].map((x,i) => (
            <circle key={i} cx={x} cy={i % 2 === 0 ? 11 : 24} r="2.5" fill="rgba(255,255,255,0.8)" />
          ))}
          {[10,30,50].map((x,i) => (
            <circle key={i} cx={x} cy="37" r="2.5" fill="rgba(255,255,255,0.4)" />
          ))}
        </>}
        {tag === 'Recovery' && <>
          {/* Circle formation */}
          {[0,45,90,135,180,225,270,315].map((a,i) => (
            <circle key={i} cx={30 + 16 * Math.cos(a * Math.PI / 180)} cy={23 + 12 * Math.sin(a * Math.PI / 180)} r="2.5" fill="rgba(255,255,255,0.7)" />
          ))}
        </>}
      </svg>
    </div>
  )
}

function OfflineView() {
  const [backOnline, setBackOnline] = useState(false)
  const WORKS = [
    { title: "Tonight's plan and drill diagrams", sub: 'Saved when you opened the app at home' },
    { title: "Who's here", sub: 'Tick players off as they arrive' },
    { title: 'Sprint limits and adjustments', sub: 'Noah, Zoe, Ella and Kai' },
    { title: 'First-aid cards', sub: 'Asthma, allergies, emergency contacts' },
    { title: 'Game timer, subs and tags', sub: 'Minutes count on the tablet' },
  ]
  const WAITING = [
    { title: "Who's here", sub: '12 ticks · Thu 4 Jun' },
    { title: 'Effort ratings', sub: "2 from players' phones" },
    { title: 'Injury note', sub: 'Kai · hamstring, passing only' },
    { title: 'Sprint counts', sub: 'Noah 3, Zoe 3' },
  ]
  return (
    <div style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px', gridTemplateRows: 'auto minmax(0,1fr)', boxSizing: 'border-box' }}>
      {/* Banner */}
      <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 14, background: backOnline ? '#eef5f2' : '#cbbeb5', color: '#10211f' }}>
        {backOnline
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 8.5a15 15 0 0120 0M5 12a10 10 0 0114 0M8.5 15.5a5 5 0 017 0M12 19h.01M3 3l18 18"/></svg>
        }
        <span style={{ flexGrow: 1 }}>
          <strong style={{ display: 'block', fontSize: 16 }}>{backOnline ? 'Back online' : 'No signal at Wattle Creek Reserve'}</strong>
          <span style={{ fontSize: 14 }}>{backOnline ? 'Everything from tonight has been sent.' : 'Carry on. Tonight\'s session is saved on this tablet.'}</span>
        </span>
        <span style={{ fontSize: 14, color: '#4a5a57', whiteSpace: 'nowrap' }}>Last updated {backOnline ? '7:22 pm' : '5:31 pm'}</span>
        <button onClick={() => setBackOnline(o => !o)} style={{ height: 44, padding: '0 12px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Demo: {backOnline ? 'go offline' : 'back online'}</button>
      </div>
      {/* Works without signal */}
      <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px 10px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{backOnline ? 'Saved for next time' : 'Works without signal'}</h2>
        <div style={{ height: 4 }} />
        {WORKS.map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8' }}>
            <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '999px', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
            </span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{w.title}</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{w.sub}</span>
            </span>
          </div>
        ))}
        <h2 style={{ margin: '14px 0 0', fontSize: 17, fontWeight: 700 }}>{backOnline ? 'Back on' : 'Waits for signal'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, marginTop: 8 }}>
          {[{ title: 'New clips', sub: backOnline ? 'Up to date' : 'Need the internet' }, { title: 'Messages', sub: backOnline ? 'Up to date' : 'Sent when you\'re back online' }, { title: 'Dribl', sub: backOnline ? 'Up to date' : 'Team sheets and results' }].map(c => (
            <div key={c.title} style={{ border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px' }}>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>{c.title}</span>
              <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{c.sub}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Waiting to send */}
      <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 0, minHeight: 0 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{backOnline ? 'Nothing waiting' : 'Waiting to send · 4'}</h2>
        {backOnline ? (
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center', padding: '24px 0' }}>
            <span style={{ width: 72, height: 72, borderRadius: '999px', background: '#eef5f2', color: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>All sent</span>
            <span style={{ fontSize: 15, lineHeight: '22px', color: '#4a5a57' }}>4 things went up at 7:22 pm: who was here, effort ratings, Kai's note and sprint counts.</span>
          </div>
        ) : (
          <>
            {WAITING.map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: '1px solid #e9eae8' }}>
                <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>↑</span>
                <span style={{ flexGrow: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{w.title}</span>
                  <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{w.sub}</span>
                </span>
              </div>
            ))}
            <span style={{ fontSize: 14, color: '#4a5a57', marginTop: 'auto', paddingTop: 12 }}>Sends itself when the tablet finds signal. Nothing is lost if you close the app.</span>
          </>
        )}
      </section>
    </div>
  )
}

export default function TrainingScreen({ role, onNav, empty }: Props) {
  const [offline, setOffline] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  if (empty) return <TrainingEmpty onNav={onNav} />
  if (offline) {
    return (
      <>
        <div style={{ flex: 'none', background: '#ffffff', borderBottom: '1px solid #e9eae8', padding: '14px 32px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f', lineHeight: '28px' }}>Tonight's session</h1>
            <div style={{ fontSize: 13, color: '#6f7f7b', marginTop: 2 }}>Thu 4 Jun · Wattle Creek Reserve · <strong>offline</strong></div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Open pitch-side</button>
            <button onClick={() => setOffline(false)} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#6f7f7b' }}>Exit offline demo</button>
          </div>
        </div>
        <OfflineView />
      </>
    )
  }
  const d = DATA[role]
  const totalMins = d.drills.reduce((s, x) => s + x.mins, 0)
  const focus = d.focus.slice(0, 3)

  return (
    <>
      {/* Session info row (below the shared app bar sub-tabs) */}
      <div style={{ flex: 'none', background: '#ffffff', borderBottom: '1px solid #e9eae8', padding: '14px 32px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f', lineHeight: '28px' }}>
              Training tonight · {d.start}–{d.end}
            </h1>
            <div style={{ fontSize: 13, lineHeight: '18px', marginTop: 2, color: '#6f7f7b' }}>
              Wattle Creek Reserve · 16 players · {totalMins} minutes · 2 days to Harbour Rovers
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 'none' }}>
            <button onClick={() => onNav('teamtalk')} style={{
              height: 36, padding: '0 14px', borderRadius: '999px', border: '1px solid #c5c8c4',
              background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>
              Team talk
            </button>
            <button onClick={() => showToast('Opening the session plan editor.')} style={{
              height: 36, padding: '0 14px', borderRadius: '999px', border: '1px solid #c5c8c4',
              background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>Edit plan</button>
            <button onClick={() => onNav('pitchside')} style={{
              height: 36, padding: '0 16px', borderRadius: '999px', border: 0,
              background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              Start session
            </button>
            <button onClick={() => setOffline(true)} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#6f7f7b' }}>Offline demo</button>
          </div>
        </div>
      </div>

      {/* Body: left sidebar + main drill list */}
      <main style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left sidebar */}
        <aside style={{
          width: 280, flex: 'none', background: '#f7f8f7',
          borderRight: '1px solid #e9eae8', padding: '20px 20px 24px',
          display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto',
        }}>
          {/* Why this plan */}
          <section>
            <h2 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#10211f' }}>Why this plan</h2>
            <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>
              3 fixes from Saturday vs Ironbark United
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {focus.map((f, i) => (
                <button key={i} onClick={() => onNav('teamtalk')} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 0', border: 0, borderTop: '1px solid #e9eae8', background: 'transparent',
                  textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <span style={{
                    flex: 'none', width: 22, height: 22, borderRadius: '999px',
                    background: '#40826d', color: '#ffffff', fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                  }}>{i + 1}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 14, lineHeight: '20px', fontWeight: 600, color: '#10211f' }}>{f.title}</span>
                    <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: '#4a5a57', marginTop: 2 }}>
                      1 drill tonight · clip and data
                    </span>
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
                </button>
              ))}
            </div>
          </section>

          {/* Adjust tonight */}
          <section>
            <h2 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700, color: '#10211f' }}>Adjust tonight</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {d.players.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none',
                }}>
                  <span style={{
                    flex: 'none', width: 32, height: 32, borderRadius: '999px',
                    background: '#c39797', color: '#10211f', fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{p.ini}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{p.name.split(' ')[0]}</span>
                    <span style={{ display: 'block', fontSize: 12, lineHeight: '17px', color: '#4a5a57', marginTop: 1 }}>{p.todo}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Main: drill list */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '0 32px 24px' }}>
          {/* Timeline bar */}
          <div style={{ padding: '20px 0 16px', borderBottom: '1px solid #e9eae8', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{d.drills.length} drills</span>
              <div style={{ display: 'flex', gap: 3, flex: 1 }}>
                {d.drills.map((x, i) => (
                  <div key={i} title={x.name} style={{ flex: `${x.mins} 1 0`, height: 10, borderRadius: 5, background: COLOR_MAP[x.tag] }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: '#4a5a57', fontWeight: 500 }}>Tap a drill for the full set-up</span>
            </div>
          </div>

          {/* Drills */}
          {d.drills.map((x, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, padding: '20px 0',
              borderBottom: '1px solid #e9eae8', alignItems: 'flex-start',
            }}>
              {/* Time */}
              <div style={{ flex: 'none', width: 44, paddingTop: 2 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{x.startTime ?? ''}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', marginTop: 2 }}>{x.mins} min</div>
              </div>

              {/* Diagram */}
              <DrillDiagram tag={x.tag} />

              {/* Info */}
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
                    background: COLOR_MAP[x.tag], color: x.tag === 'Warm-up' || x.tag === 'Recovery' ? '#10211f' : '#ffffff',
                    borderRadius: 6, padding: '2px 8px',
                  }}>{x.tag}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#10211f', lineHeight: '22px', marginBottom: 4 }}>{x.name}</div>
                {x.why && (
                  <div style={{ fontSize: 14, lineHeight: '20px', color: '#4a5a57', marginBottom: 6 }}>
                    <strong style={{ color: '#10211f' }}>Why:</strong> {x.why}
                  </div>
                )}
                {x.format && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {x.format.map((f, j) => (
                      <span key={j} style={{
                        fontSize: 13, fontWeight: 500, color: '#4a5a57',
                        background: '#f7f8f7', border: '1px solid #e9eae8', borderRadius: 6, padding: '2px 8px',
                      }}>{f}</span>
                    ))}
                  </div>
                )}
                {x.playerNote && (
                  <div style={{
                    marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: '#e8f2ee', color: '#2f6252', borderRadius: 8, padding: '4px 10px',
                    fontSize: 13, fontWeight: 600,
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                    {x.playerNote}
                  </div>
                )}
              </div>

              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none', marginTop: 4 }}><path d="M9 6l6 6-6 6"/></svg>
            </div>
          ))}
        </div>
      </main>
      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </>
  )
}
