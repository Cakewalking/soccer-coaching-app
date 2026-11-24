import CoachNav from '../academycoach/CoachNav'
import { coachGo } from '../academycoach/menu'
import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACC5OneOnOne({ onNav }: { onBack?: () => void; onNav?: (s: string) => void }) {
  const [selectedPart, setSelectedPart] = useState<number | null>(null)
  const [done, setDone] = useState<string[]>([])
  const mark = (k: string) => setDone(d => d.includes(k) ? d : [...d, k])
  const is = (k: string) => done.includes(k)

  const parts = [
    { mins: '10', title: 'Ball each, left foot only', desc: 'Touches, turns and a strike at the wall' },
    { mins: '15', title: 'Set, touch, finish', desc: 'You serve from the right. Left-foot finish, near post then far' },
    { mins: '15', title: 'Finish under pressure', desc: 'You close him down from behind. One touch, then strike' },
    { mins: '5', title: 'His choice', desc: 'Kai picks the finish he wants to show his mum' },
  ]

  const rules = [
    { title: 'In open view', detail: 'Pitch 2, beside the Advanced group' },
    { title: 'Parent knows where and when', detail: 'Tess confirmed on Tuesday. She\'s welcome to watch' },
    { title: 'Start and finish are logged', detail: 'So there\'s a record of every session' },
  ]

  return (
    <div style={{ width: 1180, background: '#faf5ec', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>
      <CoachNav active="today" sub="One-on-one" go={coachGo(onNav)} />

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '14px 28px 0', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>One-on-one · Kai Okonkwo</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: MUT }}>Thursday 6:45 to 7:30 · pitch 2</p>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button onClick={() => mark('move')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: is('move') ? PALE : '#fff', border: `1px solid ${is('move') ? G : '#c5c8c4'}`, color: is('move') ? G : INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{is('move') ? 'Pick a time…' : 'Move the session'}</button>
          <button onClick={() => mark('finish')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: is('finish') ? '#40826d' : G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{is('finish') ? '✓ Summary sent' : 'Finish and send summary'}</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 14 }}>
        {/* Left: session parts */}
        <div style={{ gridColumn: 'span 7', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>45 minutes, built from Kai's goal</span>
            <button onClick={() => mark('film')} style={{ background: 'none', border: 'none', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>{is('film') ? 'Filming on ●' : 'Film a finish'}</button>
          </div>
          {parts.map((part, i) => (
            <div key={i} onClick={() => setSelectedPart(i)} style={{ minHeight: 64, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 14, padding: '8px 6px', cursor: 'pointer', background: selectedPart === i ? PALE : 'transparent', borderRadius: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: PALE, border: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: G, flexShrink: 0 }}>{part.mins}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{part.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{part.desc}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 10, padding: '10px 0 0', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>
            Goal this term: score with his left foot in a game.
          </div>
        </div>

        {/* Right: 2 tiles */}
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {/* Rules */}
          <div style={{ background: PALE, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>One-on-one rules</span>
            {rules.map((rule, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderTop: i === 0 ? `1px solid ${LN}` : `1px solid ${LN}` }}>
                <div style={{ width: 24, height: 24, borderRadius: 999, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>✓</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{rule.title}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{rule.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* After the session */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10, flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: INK }}>After the session</h2>
            <p style={{ margin: 0, fontSize: 14, color: MUT, lineHeight: 1.55 }}>
              Two taps on how it went, and Tess gets a short summary with a clip. The session is paid already: $90, by card.
            </p>
            <div style={{ marginTop: 'auto', fontSize: 12, color: MUT }}>Kai has trained 3 times this week. Keep the sprints short.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
