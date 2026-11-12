import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Rating = 'Starting out' | 'Getting there' | 'Strong'

export default function ACC3TrialAssess(_: { onBack?: () => void }) {
  const [toast, setToast] = useState('')
  const [ratings, setRatings] = useState<Record<string, Rating>>({
    ballMastery: 'Strong',
    firstTouch: 'Getting there',
    oneVOne: 'Strong',
    passing: 'Getting there',
  })

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const skills: { key: string; name: string; desc: string }[] = [
    { key: 'ballMastery', name: 'Ball mastery', desc: 'Keeps the ball close with both feet' },
    { key: 'firstTouch', name: 'First touch', desc: 'Sets the ball where they want it' },
    { key: 'oneVOne', name: 'One against one', desc: 'Takes a player on, or stops one' },
    { key: 'passing', name: 'Passing', desc: 'Finds a teammate, right weight' },
  ]
  const ratingOptions: Rating[] = ['Starting out', 'Getting there', 'Strong']

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>
      {/* Top nav */}
      <div style={{ background: G, height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 0, flexShrink: 0 }}>
        <span style={{ color: '#fff', fontSize: 21, fontWeight: 700, marginRight: 32, letterSpacing: '-0.01em' }}>Clean Sheet</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {[{ label: 'Today', icon: '⌂' }, { label: 'Players', icon: '👥' }, { label: 'Game day', icon: '⚽' }, { label: 'Library', icon: '📅' }].map(item => (
            <button key={item.label} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.82)', fontSize: 14, fontWeight: 500, padding: '0 14px', height: 64, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => showToast('Opening academy selector.')} style={{ background: 'rgba(255,255,255,0.18)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 500, padding: '0 14px', height: 44, borderRadius: 999, cursor: 'pointer', marginRight: 12 }}>Tall Timber Academy ▾</button>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: INK }}>RW</div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', height: 44, borderBottom: `1px solid #c5c8c4`, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 0, flexShrink: 0 }}>
        {['Today', 'Run a session', 'Trial player', 'One-on-one', 'Record', 'Suggested'].map(tab => {
          const active = tab === 'Trial player'
          return (
            <button key={tab} style={{ background: 'none', border: 'none', borderBottom: active ? `2px solid ${G}` : '2px solid transparent', color: active ? G : MUT, fontSize: 14, fontWeight: active ? 700 : 500, padding: '0 14px', height: 44, cursor: 'pointer', marginBottom: -1 }}>
              {tab}
            </button>
          )
        })}
        <div style={{ flex: 1 }} />
        <span style={{ height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>Academy coach</span>
      </div>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '14px 28px 0', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Trial · Arjun Mehta, 10</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: MUT }}>In Development today · 4 taps, then send</p>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button onClick={() => showToast('Trial rescheduled.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Not today</button>
          <button onClick={() => showToast('Sent. Dani can make Arjun\'s family an offer tonight.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send to Dani</button>
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
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>SUGGESTED GROUP</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: INK }}>Development</div>
            <div style={{ fontSize: 13, color: MUT }}>Tue and Thu 4:30 · 2 places open. He'd fit in comfortably and be stretched on first touch.</div>
            <button onClick={() => showToast('Changed to Advanced. Dani will see your reason.')} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0, marginTop: 4 }}>Suggest another group</button>
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

      {toast && (
        <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>
      )}
    </div>
  )
}
