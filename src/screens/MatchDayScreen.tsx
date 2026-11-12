import { useState } from 'react'

type Screen = 'home' | 'training' | 'matchday' | 'teamtalk'

interface Props {
  onNav: (s: Screen) => void
  empty?: boolean
  opponent?: string
}

function MatchDayEmpty() {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  const setupItems = [
    { title: 'Charge the match camera', sub: 'Takes about 3 hours from flat', action: 'How to' },
    { title: 'Plan where it goes', sub: 'Halfway line, raised, facing the pitch', action: 'How to' },
    { title: 'Pair the boot sensors', sub: 'One pair per player', action: 'Pair' },
    { title: 'Hand out GPS vests', sub: 'Name each vest to a player', action: 'Assign' },
    { title: 'Send check-in reminders', sub: 'Goes to players at 7:30 am', action: 'Set up' },
  ]
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Match day</h1>
        <span style={{ fontSize: 14, color: '#4a5a57' }}>No game scheduled</span>
        <div style={{ flexGrow: 1 }} />
        <button onClick={() => showToast('Opening the add fixture form.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          Add a fixture
        </button>
      </div>

      {/* Main two-column */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, padding: '14px 28px 18px', overflow: 'hidden' }}>
        {/* Left: team talk preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>Team talk · <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>Builds itself after your first recorded game</span></div>

          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, flexGrow: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 4 }}>
              {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: c }} />
              ))}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>Clips of what went well, and what to fix</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', maxWidth: 400 }}>After each game, Clean Sheet picks the clips and numbers for a 4-minute talk, with notes on what to say.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => showToast('Opening the recording guide.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>How to record a game</button>
              <button onClick={() => showToast('Opening the manual team talk builder.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Build one yourself</button>
            </div>
          </div>

          {/* Tab strip (grayed) */}
          <div style={{ display: 'flex', gap: 2, padding: '0 2px' }}>
            {['Start', 'Went well', 'To fix', 'To fix', 'Finish'].map((t, i) => (
              <div key={i} style={{ flex: 1, height: 36, borderRadius: 8, border: '1px solid #e9eae8', background: '#f7f8f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#c5c8c4' }}>{t}</div>
            ))}
          </div>

          {/* Player check is off */}
          <div style={{ background: '#f7f8f7', border: '1px solid #e9eae8', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            </span>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Player check is off</div>
              <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '16px' }}>On game morning, players answer three quick questions. You'll see who is carrying a knock or feeling flat before kick-off.</div>
            </div>
            <button onClick={() => showToast('Player check-ins turned on. Players will get reminders on game morning.')} style={{ flex: 'none', height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Turn on check-ins</button>
          </div>
        </div>

        {/* Right: before first game checklist */}
        <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Before your first game</div>
          <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 4 }}>A one-off setup. After this it's a quick checklist every game day.</div>
          {setupItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef' }}>
              <div style={{ width: 20, height: 20, borderRadius: '999px', border: '1.5px solid #c5c8c4', flex: 'none' }} />
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, lineHeight: '18px' }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '16px' }}>{item.sub}</div>
              </div>
              <button onClick={() => showToast(`Opening: ${item.title}.`)} style={{ flex: 'none', height: 44, padding: '0 10px', borderRadius: 7, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#2f6252' }}>{item.action}</button>
            </div>
          ))}
          <button onClick={() => showToast('Playing the 2-minute setup guide.')} style={{ marginTop: 'auto', height: 44, borderRadius: 10, border: '1px solid #2f6252', background: '#ffffff', color: '#2f6252', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            Watch the 2-minute setup guide
          </button>
        </aside>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

function makeSlides(opponent: string) {
  return [
    { id: 0, label: 'START',     title: `${opponent} today`,           text: 'Last game we won 3–1. Here is what worked, and three things we fix today.',  color: '#2f6252' },
    { id: 1, label: 'WENT WELL', title: 'Pressing high worked',        text: '+18% more ball wins in their half vs our average.',                           color: '#40826d' },
    { id: 2, label: 'WENT WELL', title: 'We scored when attacked fast',text: '2 of 3 fast attacks ended in a goal. Best rate all season.',                  color: '#40826d' },
    { id: 3, label: 'FIX THIS',  title: 'Win the ball back faster',    text: '7 seconds average on Saturday. Our best is 4.',                               color: '#6b4a4e' },
    { id: 4, label: 'FIX THIS',  title: 'Keep our lines close',        text: '26 m gap between lines. Under 20 m is our target.',                           color: '#6b4a4e' },
    { id: 5, label: 'FIX THIS',  title: 'Keep running to the whistle', text: 'Sprint speed dropped 22% after minute 50. Hold it.',                          color: '#6b4a4e' },
    { id: 6, label: 'TODAY',     title: `vs ${opponent}`,              text: 'Press early. Win it back fast. Keep the shape in the last 20.',                color: '#2f6252' },
  ]
}

const SAY_THIS = [
  'Keep it short and upbeat. Two things we did well, three to fix.',
  'Tell them what pressing high got us — mention a specific player who made it happen.',
  'Show the goal from the fast attack. Ask: what did we do well here?',
  'Show the clip of the 7-second moment. Ask: what can we do differently?',
  'Show the gap on the pitch diagram. Ask: how do we fix this?',
  'Show the sprint data drop. Tell them one thing: keep going at minute 50.',
  'Build them up. Remind them of the last result. Send them out loud.',
]

const WHAT_NUMBERS = {
  wentWell: [
    { label: 'Pressing high worked',             value: '+18%' },
    { label: 'We scored when we attacked fast',  value: '2 of 3' },
  ],
  notSoGood: [
    { label: 'Win the ball back faster',          value: '7 s' },
    { label: 'Keep our lines close',              value: '26 m' },
    { label: 'Keep running to the final whistle', value: '−22%' },
  ],
}

const PLAYER_CHECKS = [
  { ini: 'KR', name: 'Kai',  badge: 'Tight hamstring', rating: 3.3, bg: '#fdf8e8', textColor: '#7a5a00' },
  { ini: 'EB', name: 'Ella', badge: 'Low 3 days',      rating: 2.3, bg: '#fdf0ee', textColor: '#7a3030' },
  { ini: 'MT', name: 'Mia',  badge: 'Heavy legs',      rating: 3.3, bg: '#fdf8e8', textColor: '#7a5a00' },
  { ini: 'NO', name: 'Noah', badge: 'Sore knees',      rating: 3.8, bg: '#fdf0ee', textColor: '#7a3030' },
]

export default function MatchDayScreen({ onNav, empty, opponent = 'Harbour Rovers' }: Props) {
  if (empty) return <MatchDayEmpty />
  const SLIDES = makeSlides(opponent)
  const [slide, setSlide] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  const s = SLIDES[slide]

  return (
    <>
      {/* Match info row */}
      <div style={{ flex: 'none', background: '#ffffff', borderBottom: '1px solid #e9eae8', padding: '14px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6f7f7b', letterSpacing: '0.02em', textTransform: 'uppercase', marginBottom: 2 }}>
              Sat 6 Jun · 9:30 am · home
            </div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f', lineHeight: '28px' }}>
              vs {opponent}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 'none' }}>
            {/* Kick-off chip */}
            <div style={{
              height: 36, padding: '0 14px', borderRadius: '999px',
              border: '1px solid #40826d', background: '#edf8f2',
              display: 'flex', alignItems: 'center', gap: 7,
              fontSize: 14, fontWeight: 600, color: '#2f6252',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '999px', background: '#40826d', display: 'block', flexShrink: 0 }} />
              Kick-off in 2 h 15 min
            </div>
            {/* 3 of 5 ready */}
            <div style={{
              height: 36, padding: '0 14px', borderRadius: '999px',
              background: '#fdf8e8', border: '1px solid #e9d88a',
              display: 'flex', alignItems: 'center', gap: 7,
              fontSize: 14, fontWeight: 600, color: '#7a5a00',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '999px', background: '#d4a844', display: 'block', flexShrink: 0 }} />
              3 of 5 ready
            </div>
            <button onClick={() => showToast(`Opening minutes plan for Saturday vs ${opponent}.`)} style={{
              height: 36, padding: '0 14px', borderRadius: '999px', border: '1px solid #c5c8c4',
              background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>Minutes plan</button>
            <button onClick={() => showToast('Recording. Players who miss the talk can watch it later.')} style={{
              height: 36, padding: '0 14px', borderRadius: '999px', border: 0,
              background: '#c03030', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
            }}>
              <span style={{ width: 10, height: 10, borderRadius: '999px', background: '#ff9999', display: 'block', flexShrink: 0 }} />
              Record
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <main style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left: team talk prep + player check */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 32px 32px' }}>

          {/* Team talk header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#10211f' }}>Team talk</span>
            <span style={{ fontSize: 14, color: '#6f7f7b' }}>7 slides · 4 min · from the last 5 games</span>
            <div style={{ flexGrow: 1 }} />
            <button onClick={() => showToast('Edit mode on. Tap a slide to change it.')} style={{ border: 0, background: 'transparent', color: '#2f6252', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Edit talk</button>
          </div>

          {/* Filmstrip */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
            {SLIDES.map((sl, i) => (
              <button key={sl.id} onClick={() => setSlide(i)} style={{
                flex: 'none', width: 104, height: 64, borderRadius: 10,
                background: sl.color, border: `2px solid ${slide === i ? 'rgba(255,255,255,0.8)' : 'transparent'}`,
                outline: slide === i ? `2px solid #40826d` : 'none',
                cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                padding: '7px 8px', boxSizing: 'border-box',
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{sl.label}</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#ffffff', lineHeight: '14px', textAlign: 'left' }}>
                    {sl.title.length > 22 ? sl.title.slice(0, 22) + '…' : sl.title}
                  </span>
                  <span style={{ flex: 'none', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>{i + 1}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Large slide preview */}
          <div style={{
            borderRadius: 16, background: s.color,
            padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 32,
            marginBottom: 14, minHeight: 180,
          }}>
            <div style={{ flexGrow: 1, minWidth: 0, color: '#ffffff' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 10 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '32px', marginBottom: 10 }}>{s.title}</div>
              <div style={{ fontSize: 15, lineHeight: '22px', color: 'rgba(255,255,255,0.85)' }}>{s.text}</div>
            </div>
            <button onClick={() => onNav('teamtalk')} style={{
              flex: 'none', width: 72, height: 72, borderRadius: '999px',
              border: '3px solid rgba(255,255,255,0.75)', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            </button>
          </div>

          {/* Slide dots */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 28 }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} style={{
                width: i === slide ? 20 : 8, height: 8, borderRadius: 4,
                background: i === slide ? '#40826d' : '#d0d4d2',
                border: 0, cursor: 'pointer', padding: 0,
              }} />
            ))}
          </div>

          {/* Player check */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Player check</span>
            <span style={{ fontSize: 14, color: '#6f7f7b' }}>14 of 16 done this morning · squad average 3.6</span>
            <div style={{ flexGrow: 1 }} />
            <span style={{ fontSize: 14, color: '#6f7f7b' }}>Not filled in: <strong style={{ color: '#10211f' }}>Zoe and Sam</strong></span>
            <button onClick={() => showToast('Reminder sent to Zoe and Sam.')} style={{
              height: 32, padding: '0 14px', borderRadius: '999px',
              border: '1px solid #c5c8c4', background: '#ffffff',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#10211f',
            }}>Remind</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {PLAYER_CHECKS.map(p => (
              <div key={p.ini} style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#10211f' }}>{p.ini}</div>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 3 }}>{p.name}</div>
                  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: p.textColor, background: p.bg, borderRadius: 4, padding: '2px 7px' }}>{p.badge}</span>
                </div>
                <div style={{ flex: 'none', textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#10211f', lineHeight: '26px' }}>{p.rating}</div>
                  <div style={{ fontSize: 11, color: '#6f7f7b' }}>out of 5</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar: Say this + What the numbers say */}
        <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', padding: '24px 20px', overflowY: 'auto', background: '#fafafa' }}>

          {/* Say this */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 2 }}>
              Say this · {slide + 1} of {SLIDES.length} · about 20 s
            </div>
            <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: '23px', color: '#10211f', fontWeight: 500 }}>
              "{SAY_THIS[slide]}"
            </p>
          </div>

          <div style={{ height: 1, background: '#e9eae8', marginBottom: 20 }} />

          {/* What the numbers say */}
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>What the numbers say</div>

          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#40826d', marginBottom: 6 }}>Went well</div>
          {WHAT_NUMBERS.wentWell.map((item, i) => (
            <button key={i} onClick={() => setSlide(i + 1)} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', width: '100%', border: 0, borderTop: '1px solid #e9eae8',
              background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <span style={{ fontSize: 14, color: '#10211f', textAlign: 'left', lineHeight: '19px' }}>{item.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#2f6252', flexShrink: 0, marginLeft: 10 }}>{item.value}</span>
            </button>
          ))}

          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9d7c80', marginTop: 16, marginBottom: 6 }}>Not so good</div>
          {WHAT_NUMBERS.notSoGood.map((item, i) => (
            <button key={i} onClick={() => setSlide(i + 3)} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', width: '100%', border: 0, borderTop: '1px solid #e9eae8',
              background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <span style={{ fontSize: 14, color: '#10211f', textAlign: 'left', lineHeight: '19px' }}>{item.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#9d7c80', flexShrink: 0, marginLeft: 10 }}>{item.value}</span>
            </button>
          ))}

          <p style={{ margin: '16px 0 0', fontSize: 13, lineHeight: '18px', color: '#6f7f7b' }}>
            Tap a row to jump to its slide. Each fix was practised on Thursday.
          </p>
        </div>
      </main>
      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </>
  )
}
