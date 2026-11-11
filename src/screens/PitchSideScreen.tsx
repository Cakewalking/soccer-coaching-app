import { useState } from 'react'

type View = 'attendance' | 'drill' | 'review'

const DRILL_PLAN = [
  { tag: 'Warm-up',   name: 'Rondo 4v2',           mins: 10, color: '#c3e6d4' },
  { tag: 'Main',      name: 'Win it back high',     mins: 15, color: '#40826d' },
  { tag: 'Main',      name: 'Compact shape 5v5',    mins: 15, color: '#40826d' },
  { tag: 'Game',      name: 'Full game — shape focus', mins: 25, color: '#2f6252' },
  { tag: 'Recovery',  name: 'Cool-down stretch',    mins: 5,  color: '#c3e6d4' },
]

const PLAYERS_HERE = [
  { ini: 'MT', name: 'Maya T',     status: 'here' as const,     note: '' },
  { ini: 'JL', name: 'Jake L',     status: 'here' as const,     note: '' },
  { ini: 'NO', name: 'Noah O',     status: 'here' as const,     note: 'Sprint cap 2 of 3 tonight' },
  { ini: 'ZK', name: 'Zoe K',      status: 'here' as const,     note: 'Shoulder — no contact' },
  { ini: 'EA', name: 'Ella A',     status: 'here' as const,     note: '' },
  { ini: 'MI', name: 'Mia I',      status: 'here' as const,     note: '' },
  { ini: 'LH', name: 'Liam H',     status: 'here' as const,     note: '' },
  { ini: 'AW', name: 'Ava W',      status: 'here' as const,     note: '' },
  { ini: 'OC', name: 'Oliver C',   status: 'here' as const,     note: '' },
  { ini: 'SC', name: 'Sophia C',   status: 'away' as const,     note: 'Sick — mum messaged' },
  { ini: 'EC', name: 'Ethan C',    status: 'here' as const,     note: '' },
  { ini: 'IS', name: 'Isla S',     status: 'unknown' as const,  note: 'No response' },
  { ini: 'WM', name: 'Will M',     status: 'here' as const,     note: '' },
  { ini: 'AB', name: 'Amara B',    status: 'here' as const,     note: '' },
  { ini: 'FL', name: 'Felix L',    status: 'here' as const,     note: '' },
  { ini: 'GC', name: 'Grace C',    status: 'here' as const,     note: '' },
]

const ADJUSTMENTS = [
  { ini: 'NO', name: 'Noah',   note: 'Sprint cap 2/3 tonight',       color: '#c39797' },
  { ini: 'ZK', name: 'Zoe',    note: 'No contact — shoulder',         color: '#c39797' },
  { ini: 'EA', name: 'Ella',   note: 'Lighter rest from 6:50',        color: '#cbbeb5' },
  { ini: 'MI', name: 'Mia',    note: 'In the rondo — build confidence', color: '#cbbeb5' },
]

const HOW_IT_WORKS = [
  'Set up two 15×15 m squares side by side.',
  'Attackers try to keep possession for 5 passes.',
  'Defenders press in pairs — no splitting.',
  'Rotate defenders every 90 seconds.',
]

const SAY_THIS = [
  '"Get the ball side early."',
  '"Pressure the ball — cover the pass."',
  '"Squeeze — don\'t dive."',
]

const TONIGHT_NUMS = [
  { label: 'Total mins',   value: '74 / 75' },
  { label: 'Here tonight', value: '14 / 15' },
  { label: 'Load',         value: '96 %' },
  { label: 'Sprint caps',  value: '2 triggered' },
]

function statusColor(s: 'here' | 'away' | 'unknown') {
  if (s === 'here')    return '#2f6252'
  if (s === 'away')    return '#a33030'
  return '#8a8f8c'
}
function statusBg(s: 'here' | 'away' | 'unknown') {
  if (s === 'here')    return '#e4f2eb'
  if (s === 'away')    return '#fbe9e9'
  return '#f2f3f2'
}

type Rating = 'not-yet' | 'getting' | 'yes' | null

interface ReviewState {
  q1: Rating
  q2: Rating
  q3: Rating
  note: string
}

const REVIEW_QS = [
  { key: 'q1' as const, label: 'Win the ball back faster' },
  { key: 'q2' as const, label: 'Keep lines close' },
  { key: 'q3' as const, label: 'Energy tonight' },
]

function RatingRow({ q, label, value, onChange }: { q: string; label: string; value: Rating; onChange: (v: Rating) => void }) {
  const opts: Array<{ val: Rating; text: string }> = [
    { val: 'not-yet', text: 'Not yet' },
    { val: 'getting', text: 'Getting there' },
    { val: 'yes',     text: 'Yes!' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 0', borderTop: '1px solid #e9eae8' }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#10211f' }}>{label}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {opts.map(o => (
          <button key={`${q}-${o.val}`} onClick={() => onChange(o.val === value ? null : o.val)} style={{
            flex: 1, height: 36, borderRadius: 10,
            border: `1.5px solid ${value === o.val ? '#40826d' : '#d6d9d7'}`,
            background: value === o.val ? '#e4f2eb' : '#ffffff',
            color: value === o.val ? '#2f6252' : '#6f7f7b',
            fontFamily: 'inherit', fontSize: 13, fontWeight: value === o.val ? 700 : 500, cursor: 'pointer',
          }}>{o.text}</button>
        ))}
      </div>
    </div>
  )
}

export default function PitchSideScreen({ onClose, empty }: { onClose: () => void; empty?: boolean }) {
  const [view, setView] = useState<View>('attendance')
  const [drillIndex, setDrillIndex] = useState(1)
  const [paused, setPaused] = useState(false)
  const [timer] = useState('22:14')
  const [review, setReview] = useState<ReviewState>({ q1: null, q2: null, q3: null, note: '' })
  const [moment, setMoment] = useState<'good' | 'work-on' | null>(null)

  const drill = DRILL_PLAN[drillIndex]
  const totalMins = DRILL_PLAN.reduce((s, d) => s + d.mins, 0)
  const doneMinutes = DRILL_PLAN.slice(0, drillIndex).reduce((s, d) => s + d.mins, 0)
  const progress = doneMinutes / totalMins

  const hereCount  = PLAYERS_HERE.filter(p => p.status === 'here').length
  const totalCount = PLAYERS_HERE.length

  function setRating(key: keyof ReviewState, val: Rating) {
    setReview(r => ({ ...r, [key]: val }))
  }

  if (empty) {
    const emptyPlan = [
      { time: '6:00', name: 'Rondo warm-up',      mins: 10 },
      { time: '6:10', name: '6-second press',      mins: 20 },
      { time: '6:30', name: 'Small game',          mins: 25 },
      { time: '6:55', name: 'Cool-down',           mins: 5  },
    ]
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#f7f9f7', zIndex: 100, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ flex: 'none', background: '#1f4a3e', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.12)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>Starter session · Win it back · 60 min</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 1 }}>Before you start</div>
          </div>
          <button onClick={() => setView('drill')} style={{ height: 44, padding: '0 20px', borderRadius: '999px', border: 0, background: '#40826d', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            Start the warm-up
          </button>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ flexGrow: 1, padding: '24px 32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>{"Who's here?"}</div>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 14, color: '#4a5a57' }}>Nobody to tick off yet</div>
                <div style={{ fontSize: 13, color: '#6f7f7b' }}>Everyone expected is here</div>
                <div style={{ marginTop: 8, padding: '12px 16px', background: '#eef5f2', borderRadius: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#2f6252', marginBottom: 4 }}>No squad yet, no problem</div>
                  <div style={{ fontSize: 13, color: '#1f4a3e', lineHeight: 1.5 }}>Run tonight as a starter session. Add your players later and attendance, load and minutes start counting.</div>
                  <button onClick={onClose} style={{ marginTop: 10, height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: '#2f6252', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add players</button>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>Starter session: Win it back</div>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, overflow: 'hidden' }}>
                {emptyPlan.map((step, i) => (
                  <div key={i} style={{ padding: '14px 20px', borderBottom: i < emptyPlan.length - 1 ? '1px solid #f0f1f0' : 'none', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 12, color: '#6f7f7b', width: 36, flexShrink: 0, paddingTop: 2 }}>{step.time}</div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{step.name}</div>
                      <div style={{ fontSize: 12, color: '#4a5a57' }}>{step.mins}{'′'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'attendance') {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#f7f9f7', zIndex: 100, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        {/* Header */}
        <div style={{ flex: 'none', background: '#1f4a3e', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.12)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>Before you start</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 1 }}>Tonight · 6:30 – 7:45 pm · Wattle Creek Reserve</div>
          </div>
          <button onClick={() => setView('drill')} style={{
            height: 40, padding: '0 20px', borderRadius: '999px', border: 0,
            background: '#40826d', color: '#ffffff',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            Start session
          </button>
        </div>

        {/* Body */}
        <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Player grid */}
          <div style={{ flexGrow: 1, padding: '24px 32px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f' }}>Who's here?</div>
              <div style={{ fontSize: 14, color: '#6f7f7b' }}>{hereCount} of {totalCount} expected</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {PLAYERS_HERE.map(p => (
                <div key={p.ini} style={{
                  background: '#ffffff', borderRadius: 12, padding: '14px 16px',
                  border: `1.5px solid ${p.status === 'here' ? '#c3e6d4' : p.status === 'away' ? '#f5c6c6' : '#e9eae8'}`,
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                      <span style={{
                        display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.03em', textTransform: 'uppercase',
                        color: statusColor(p.status), background: statusBg(p.status), borderRadius: 4, padding: '1px 6px',
                      }}>
                        {p.status === 'here' ? 'Here' : p.status === 'away' ? 'Away' : 'Unknown'}
                      </span>
                    </div>
                  </div>
                  {p.note && (
                    <div style={{ fontSize: 12, color: '#4a5a57', background: '#f7f8f7', borderRadius: 6, padding: '6px 8px', lineHeight: '16px' }}>{p.note}</div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <button onClick={() => setView('drill')} style={{
                height: 48, padding: '0 32px', borderRadius: 12, border: 0,
                background: '#2f6252', color: '#ffffff',
                fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                Everyone expected is here — start
              </button>
            </div>
          </div>

          {/* Right panel: Tonight's plan */}
          <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', background: '#ffffff', padding: '24px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>Tonight's plan</div>
              <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                {DRILL_PLAN.map((d, i) => (
                  <div key={i} title={d.name} style={{ flex: `${d.mins} 1 0`, height: 8, borderRadius: 4, background: d.color }} />
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {DRILL_PLAN.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '999px', background: d.color, flexShrink: 0 }} />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: '#6f7f7b' }}>{d.mins} min · {d.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Adjust tonight</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {ADJUSTMENTS.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '999px', background: a.color, color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{a.ini}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '16px' }}>{a.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'drill') {
    return (
      <>
      <div style={{ position: 'fixed', inset: 0, background: '#f7f9f7', zIndex: 100, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        {/* Dark green header */}
        <div style={{ flex: 'none', background: '#1f4a3e' }}>
          <div style={{ padding: '0 32px', height: 70, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Drill {drillIndex + 1} of {DRILL_PLAN.length}</span>
                <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.3)' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>{drill.tag}</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', marginTop: 2 }}>{drill.name}</div>
            </div>

            {/* Timer */}
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#ffffff', letterSpacing: '0.03em', lineHeight: '36px' }}>{timer}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{drill.mins} min drill</div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => setPaused(p => !p)} style={{
                height: 40, padding: '0 16px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)',
                background: 'transparent', color: '#ffffff',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {paused ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>Resume</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="4" x2="6" y2="20"/><line x1="18" y1="4" x2="18" y2="20"/></svg>Pause</>
                )}
              </button>
              {drillIndex < DRILL_PLAN.length - 1 ? (
                <button onClick={() => setDrillIndex(i => i + 1)} style={{
                  height: 40, padding: '0 16px', borderRadius: '999px', border: 0,
                  background: '#40826d', color: '#ffffff',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  Next drill
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              ) : (
                <button onClick={() => setView('review')} style={{
                  height: 40, padding: '0 16px', borderRadius: '999px', border: 0,
                  background: '#40826d', color: '#ffffff',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  Finish session
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: 'rgba(255,255,255,0.15)' }}>
            <div style={{ height: '100%', background: '#c3e6d4', width: `${progress * 100}%`, transition: 'width 0.5s' }} />
          </div>

          {/* Drill chip strip */}
          <div style={{ display: 'flex', gap: 2, padding: '8px 32px' }}>
            {DRILL_PLAN.map((d, i) => (
              <button key={i} onClick={() => setDrillIndex(i)} style={{
                height: 28, padding: '0 12px', borderRadius: '999px', border: 0,
                background: i === drillIndex ? '#ffffff' : i < drillIndex ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                color: i === drillIndex ? '#10211f' : '#ffffff',
                fontFamily: 'inherit', fontSize: 12, fontWeight: i === drillIndex ? 700 : 500, cursor: 'pointer',
                opacity: i > drillIndex ? 0.6 : 1,
              }}>{d.name}</button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left: pitch + how it works + say this */}
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Pitch diagram (simplified) */}
            <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, border: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>Set-up</div>
              <svg viewBox="0 0 320 200" style={{ width: '100%', maxWidth: 320, display: 'block' }} aria-label="Pitch diagram">
                <rect width="320" height="200" rx="8" fill="#3a7a5a"/>
                {/* Pitch lines */}
                <rect x="10" y="10" width="300" height="180" rx="4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                <line x1="160" y1="10" x2="160" y2="190" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                <circle cx="160" cy="100" r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                {/* Player dots */}
                {[
                  [80,60],[140,80],[120,120],[100,100],[160,50],
                  [220,70],[200,110],[240,140],[180,160],[260,100],[140,145],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={9} fill={i < 5 ? '#ffffff' : '#c39797'} stroke={i < 5 ? '#1f4a3e' : '#7a3030'} strokeWidth="1.5"/>
                ))}
              </svg>
            </div>

            {/* How it works */}
            <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, border: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>How it works</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {HOW_IT_WORKS.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#2f6252', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ fontSize: 14, lineHeight: '20px', color: '#10211f', paddingTop: 2 }}>{step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Say this */}
            <div style={{ background: '#e4f2eb', borderRadius: 16, padding: 24, border: '1px solid #c3e6d4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#2f6252' }}>Say this</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SAY_THIS.map((line, i) => (
                  <div key={i} style={{ fontSize: 14, lineHeight: '20px', color: '#10211f', fontStyle: 'italic', paddingLeft: 8, borderLeft: '3px solid #40826d' }}>{line}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ width: 280, flex: 'none', borderLeft: '1px solid #e9eae8', background: '#ffffff', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Keep an eye on</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {ADJUSTMENTS.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '999px', background: a.color, color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{a.ini}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '16px' }}>{a.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e9eae8', paddingTop: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Mark a moment</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button onClick={() => setMoment('good')} style={{
                  height: 44, borderRadius: 10, border: 0,
                  background: '#e4f2eb', color: '#2f6252',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  Good moment
                </button>
                <button onClick={() => setMoment('work-on')} style={{
                  height: 44, borderRadius: 10, border: 0,
                  background: '#fdf0ee', color: '#7a3030',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                  To work on
                </button>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e9eae8', paddingTop: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Upcoming drills</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {DRILL_PLAN.slice(drillIndex + 1).map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '999px', background: d.color, flexShrink: 0 }} />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: '#6f7f7b' }}>{d.mins} min</div>
                    </div>
                  </div>
                ))}
                {drillIndex >= DRILL_PLAN.length - 1 && (
                  <div style={{ fontSize: 13, color: '#6f7f7b' }}>This is the last drill.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {moment !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', fontFamily: 'var(--font-sans)' }}>
          <div style={{ width: '100%', background: '#fff', borderRadius: '20px 20px 0 0', padding: '24px 24px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: moment === 'good' ? '#2f6252' : '#7a3030' }}>
                {moment === 'good' ? 'Good moment' : 'To work on'}
              </div>
              <button onClick={() => setMoment(null)} style={{ width: 32, height: 32, borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Player</div>
              <select style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 14 }}>
                {PLAYERS_HERE.filter(p => p.status === 'here').map(p => <option key={p.ini}>{p.name}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>What happened?</div>
              <textarea placeholder="Describe the moment…" style={{ width: '100%', height: 72, borderRadius: 8, border: '1px solid #e9eae8', padding: 10, fontFamily: 'inherit', fontSize: 14, resize: 'none', boxSizing: 'border-box' }} />
            </div>
            <button onClick={() => setMoment(null)} style={{ width: '100%', height: 44, borderRadius: 12, border: 0, background: moment === 'good' ? '#2f6252' : '#7a3030', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Save</button>
          </div>
        </div>
      )}
      </>
    )
  }

  // View: review
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#f7f9f7', zIndex: 100, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ flex: 'none', background: '#1f4a3e', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => setView('drill')} style={{ width: 40, height: 40, borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.12)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>How did it go?</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 1 }}>{DRILL_PLAN.length} drills · {totalMins} minutes</div>
        </div>
        <button onClick={onClose} style={{
          height: 40, padding: '0 20px', borderRadius: '999px', border: 0,
          background: '#40826d', color: '#ffffff',
          fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
        }}>
          Save and finish
        </button>
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: rating questions */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 32px' }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>Rate the focus areas</div>
            <div style={{ fontSize: 14, color: '#6f7f7b', marginBottom: 20 }}>How did tonight go for each session goal?</div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {REVIEW_QS.map(q => (
                <RatingRow key={q.key} q={q.key} label={q.label} value={review[q.key]} onChange={v => setRating(q.key, v)} />
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#10211f', marginBottom: 10 }}>Anything to remember?</div>
              <textarea
                placeholder="Notes for next session, player moments, what to adjust…"
                value={review.note}
                onChange={e => setReview(r => ({ ...r, note: e.target.value }))}
                style={{
                  width: '100%', minHeight: 100, borderRadius: 12, border: '1.5px solid #d6d9d7',
                  padding: '12px 14px', fontFamily: 'inherit', fontSize: 14, lineHeight: '20px',
                  color: '#10211f', background: '#ffffff', resize: 'vertical', boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            <button onClick={onClose} style={{
              marginTop: 24, height: 48, padding: '0 32px', borderRadius: 12, border: 0,
              background: '#2f6252', color: '#ffffff',
              fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            }}>
              Save and finish
            </button>
          </div>
        </div>

        {/* Right: Tonight in numbers */}
        <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', background: '#ffffff', padding: '24px 20px', overflowY: 'auto' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 16 }}>Tonight in numbers</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {TONIGHT_NUMS.map(n => (
              <div key={n.label} style={{ background: '#f7f9f7', borderRadius: 12, padding: '14px 14px' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', letterSpacing: '-0.02em' }}>{n.value}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{n.label}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Adjustments applied</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {ADJUSTMENTS.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div style={{ width: 24, height: 24, borderRadius: '999px', background: a.color, color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{a.ini}</div>
                <div style={{ fontSize: 13, color: '#10211f', fontWeight: 600 }}>{a.name}</div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#40826d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
