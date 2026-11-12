import { useState } from 'react'

const DRILLS = [
  {
    time: '5:00', duration: '10 min', name: 'Traffic lights dribble', tag: 'Fun warm-up',
    desc: "Everyone has a colour. Green: go. Red: stop with your foot on it. Amber: toe taps.",
    tooEasy: "Add 'blue': swap balls with a friend",
  },
  {
    time: '5:10', duration: '10 min', name: 'Treasure island', tag: 'Skill game',
    desc: 'Balls are treasure in the middle. Dribble one back to your island. Most treasure wins.',
    tooEasy: 'Now you can steal from other islands',
  },
  {
    time: '5:20', duration: '10 min', name: 'Gates galore', tag: 'Skill game',
    desc: 'Dribble through as many cone gates as you can in a minute. Beat your own score.',
    tooEasy: 'A friend guards one gate',
  },
  {
    time: '5:30', duration: '15 min', name: '4 v 4 four-goal game', tag: 'Game',
    desc: 'Two small goals each end. No keepers. Let them play, and praise brave dribbling.',
    tooEasy: 'A goal after a pass counts double',
  },
]

const TONIGHT_REMEMBER = [
  { ini: 'PD', name: 'Poppy', note: 'First game with Zara, first kick-off' },
  { ini: 'AK', name: 'Arlo',  note: 'New. Show him each game first' },
  { ini: 'OM', name: 'Omar',  note: 'Away tonight' },
]

function tagColor(tag: string) {
  if (tag === 'Fun warm-up') return { bg: '#eef5f2', color: '#2f6252' }
  if (tag === 'Skill game')  return { bg: '#e8f0ee', color: '#1f4a3e' }
  return                            { bg: '#cbbeb5', color: '#10211f' }
}

export default function TrainingMiniRoos({ empty }: { empty?: boolean }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  if (empty) {
    return (
      <div style={{ flexGrow: 1, padding: '28px 32px', overflowY: 'auto', fontFamily: 'var(--font-sans)' }}>
        <div style={{ maxWidth: 500 }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Training</h1>
          <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 20 }}>No session planned yet</div>
          <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Your session plan appears here</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.6, marginBottom: 16 }}>Set a focus for the fortnight and Clean Sheet drafts a session from the drill library. Each session is 45 minutes of games and skill activities.</div>
            <button onClick={() => showToast('Opening the focus picker.')} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Set a focus</button>
          </div>
        </div>
        {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
      </div>
    )
  }
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ flex: 'none', padding: '16px 28px 14px', background: '#ffffff', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <h1 style={{ margin: '0 0 2px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Training tonight · 5:00–5:45 pm</h1>
          <div style={{ fontSize: 14, color: '#4a5a57' }}>Wattle Creek Reserve · 9 coming · this fortnight: running with the ball</div>
        </div>
        <button onClick={() => showToast('Opening the drill swap screen.')} style={{ height: 44, padding: '0 18px', borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Swap a game</button>
        <button onClick={() => showToast('Starting the training session timer.')} style={{ height: 44, padding: '0 22px', borderRadius: 12, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Start</button>
      </div>

      {/* Main content */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20, padding: '18px 28px 20px', overflow: 'hidden', boxSizing: 'border-box' }}>

        {/* Drill list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflowY: 'auto' }}>
          {DRILLS.map((d, i) => (
            <button key={i} style={{ display: 'grid', gridTemplateColumns: '56px minmax(0,1fr) 24px', gap: 0, background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 0, overflow: 'hidden', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              {/* Time col */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px 0', background: '#f7f8f7', borderRight: '1px solid #e9eae8', gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{d.time}</span>
                <span style={{ fontSize: 11, color: '#6f7f7b' }}>{d.duration}</span>
              </div>
              {/* Content col */}
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>{d.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, padding: '1px 8px', borderRadius: '999px', ...tagColor(d.tag) }}>{d.tag}</span>
                </div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{d.desc}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b', lineHeight: '18px' }}>
                  <span style={{ fontWeight: 600 }}>Too easy?</span> {d.tooEasy}
                </div>
              </div>
              {/* Chevron */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
              </div>
            </button>
          ))}
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>

          {/* Bring */}
          <section style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700 }}>Bring</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>
              10 balls, 20 cones, 8 bibs, 4 small goals. Set up takes about 5 minutes. One grid, 20 by 20 metres, works for all four games.
            </p>
          </section>

          {/* Tonight, remember */}
          <section style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px' }}>
            <h2 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700 }}>Tonight, remember</h2>
            {TONIGHT_REMEMBER.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
                <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', fontSize: 11, fontWeight: 700, color: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</span>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '17px' }}>{p.note}</div>
                </div>
              </div>
            ))}
          </section>

          {/* At this age */}
          <section style={{ background: '#eef5f2', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#1f4a3e' }}>At this age</h2>
            <p style={{ margin: '0 0 10px', fontSize: 14, color: '#2f6252', lineHeight: '20px' }}>
              A ball each, no laps, no lines, no lectures. Show it, let them play, and change the game if it's too hard or too easy.
            </p>
            <p style={{ margin: 0, fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>
              From the national curriculum's Discovery phase.
            </p>
          </section>
        </div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
