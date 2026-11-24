import CoachNav from '../academycoach/CoachNav'
import { coachGo } from '../academycoach/menu'
import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Rating = 'Starting out' | 'Getting there' | 'Strong'

export default function ACC3TrialAssess({ onNav }: { onBack?: () => void; onNav?: (s: string) => void }) {
  const [done, setDone] = useState<string[]>([])
  const mark = (k: string) => setDone(d => d.includes(k) ? d : [...d, k])
  const is = (k: string) => done.includes(k)
  const [ratings, setRatings] = useState<Record<string, Rating>>({
    firstTouch: 'Getting there',
    running: 'Strong',
    oneVOne: 'Strong',
    striking: 'Getting there',
  })

  const skills: { key: string; name: string; desc: string }[] = [
    { key: 'firstTouch', name: 'First touch', desc: 'Sets the ball where they want it' },
    { key: 'running', name: 'Running with the ball', desc: 'Keeps it close at speed, head up' },
    { key: 'oneVOne', name: 'One against one', desc: 'Takes a player on, or stops one' },
    { key: 'striking', name: 'Striking the ball', desc: 'Clean contact, either foot' },
  ]
  const ratingOptions: Rating[] = ['Starting out', 'Getting there', 'Strong']

  return (
    <div style={{ width: 1180, background: '#faf5ec', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>
      <CoachNav active="today" sub="Trial player" go={coachGo(onNav)} />

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '14px 28px 0', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Trial · Arjun Mehta, 10</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: MUT }}>In Development today · 4 taps, then send</p>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button onClick={() => mark('nottoday')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: is('nottoday') ? PALE : '#fff', border: `1px solid ${is('nottoday') ? G : '#c5c8c4'}`, color: is('nottoday') ? G : INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{is('nottoday') ? 'Rescheduled ✓' : 'Not today'}</button>
          <button onClick={() => mark('send')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: is('send') ? '#40826d' : G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{is('send') ? '✓ Sent to Dani' : 'Send to Dani'}</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 14 }}>
        {/* Left: What you saw */}
        <div style={{ gridColumn: 'span 8', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>What you saw</span>
            <span style={{ fontSize: 13, color: MUT }}>For his age</span>
          </div>
          {skills.map(skill => (
            <div key={skill.key} style={{ minHeight: 84, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{skill.name}</div>
                <div style={{ fontSize: 13, color: MUT }}>{skill.desc}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {ratingOptions.map(opt => {
                  const sel = ratings[skill.key] === opt
                  return (
                    <button
                      key={opt}
                      onClick={() => setRatings(r => ({ ...r, [skill.key]: opt }))}
                      style={{
                        height: 34, padding: '0 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        background: sel ? G : '#fff',
                        color: sel ? '#fff' : INK,
                        border: sel ? 'none' : `1px solid #c5c8c4`,
                      }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 10, padding: '10px 0 0', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>
            These four go into his first plan if he joins. They're never shown as a score.
          </div>
        </div>

        {/* Right: 2 tiles */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {/* Suggested group */}
          <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#7a4b5b', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>SUGGESTED GROUP</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: INK }}>Development</div>
            <div style={{ fontSize: 13, color: MUT }}>Tue and Thu 4:30 · 2 places open. He'd fit in comfortably and be stretched on first touch.</div>
            <button onClick={() => mark('group')} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0, marginTop: 4 }}>{is('group') ? 'Changed to Advanced ✓' : 'Suggest another group'}</button>
          </div>

          {/* A line for the family */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10, flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: INK }}>A line for the family</h2>
            <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 12, padding: '12px 14px', fontSize: 14, color: INK, lineHeight: 1.55, fontStyle: 'italic' as const }}>
              "Arjun loved taking players on and never hid from the ball. We'd work on his first touch."
            </div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 'auto' }}>Written for you from your taps. Change any word.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
