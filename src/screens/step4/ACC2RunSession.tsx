import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Attendance = 'here' | 'away'

export default function ACC2RunSession(_: { onBack?: () => void }) {
  const [toast, setToast] = useState('')
  const [attendance, setAttendance] = useState<Record<string, Attendance>>({
    kai: 'here', ana: 'here', jonah: 'here', lola: 'here', zane: 'here', mila: 'away', finn: 'here',
  })

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const toggleAttendance = (key: string, name: string, current: Attendance) => {
    const next = current === 'here' ? 'away' : 'here'
    setAttendance(a => ({ ...a, [key]: next }))
    showToast(next === 'away' ? `${name} marked away.` : `${name} marked here.`)
  }

  const players: { key: string; initials: string; name: string; goal: string }[] = [
    { key: 'kai', initials: 'KO', name: 'Kai Okonkwo', goal: 'Goal: Weaker-foot finishing' },
    { key: 'ana', initials: 'AC', name: 'Ana Costa', goal: 'Goal: Scanning before the ball arrives' },
    { key: 'jonah', initials: 'JM', name: 'Jonah Marsh', goal: 'Goal: First touch away from pressure' },
    { key: 'lola', initials: 'LF', name: 'Lola Ferris', goal: 'Goal: Make-up · 1v1 defending' },
    { key: 'zane', initials: 'ZA', name: 'Zane Abbas', goal: 'Goal: Weight of pass' },
    { key: 'mila', initials: 'MW', name: 'Mila Wójcik', goal: 'Goal: Receiving on the half turn' },
    { key: 'finn', initials: 'FB', name: 'Finn Byrne', goal: 'Goal: Make-up · striking through the ball' },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>
      {/* Top nav */}
      <div style={{ background: G, height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 0, flexShrink: 0 }}>
        <span style={{ color: '#fff', fontSize: 21, fontWeight: 700, marginRight: 32, letterSpacing: '-0.01em' }}>Clean Sheet</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {[
            { label: 'Today', icon: '⌂' },
            { label: 'Players', icon: '👥' },
            { label: 'Game day', icon: '⚽' },
            { label: 'Library', icon: '📅' },
          ].map(item => (
            <button key={item.label} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.82)', fontSize: 14, fontWeight: 500, padding: '0 14px', height: 64, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
        <button style={{ background: 'rgba(255,255,255,0.18)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 500, padding: '0 14px', height: 36, borderRadius: 999, cursor: 'pointer', marginRight: 12 }}>
          Tall Timber Academy ▾
        </button>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: INK }}>RW</div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', height: 44, borderBottom: `1px solid #c5c8c4`, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 0, flexShrink: 0 }}>
        {['Today', 'Run a session', 'Trial player', 'One-on-one', 'Record', 'Suggested'].map(tab => {
          const active = tab === 'Run a session'
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
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Advanced · 12 to 14</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: MUT }}>Thursday 5:30 to 6:40 · finishing with the weaker foot</p>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button onClick={() => showToast('Pick a replacement drill...')} style={{ height: 38, padding: '0 16px', borderRadius: 10, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Swap a drill</button>
          <button onClick={() => showToast('Session closed. Two taps per player, then you\'re done.')} style={{ height: 38, padding: '0 16px', borderRadius: 10, background: G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Finish and write notes</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 14 }}>
        {/* Left: Who's here */}
        <div style={{ gridColumn: 'span 5', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>Who's here</span>
            <span style={{ fontSize: 13, color: MUT }}>19 here · 1 away</span>
          </div>
          {players.map(p => {
            const att = attendance[p.key]
            return (
              <div key={p.key} style={{ minHeight: 54, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                <div style={{ width: 36, height: 36, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: INK, flexShrink: 0 }}>{p.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.goal}</div>
                </div>
                <button
                  onClick={() => toggleAttendance(p.key, p.name.split(' ')[0], att)}
                  style={{
                    height: 30, padding: '0 12px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                    background: att === 'here' ? G : '#fff',
                    color: att === 'here' ? '#fff' : INK,
                    border: att === 'here' ? 'none' : `1px solid #c5c8c4`,
                  }}
                >
                  {att === 'here' ? 'Here' : 'Away'}
                </button>
              </div>
            )
          })}
          <div style={{ marginTop: 10, padding: '10px 0 0', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>
            Showing 7 of 20. Each player's goal sits under their name so you can coach it in passing.
          </div>
        </div>

        {/* Right: The plan */}
        <div style={{ gridColumn: 'span 7', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>The plan</span>
            <button onClick={() => showToast('Filming on. Only players whose parents agreed appear in clips.')} style={{ background: 'none', border: 'none', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Film this drill</button>
          </div>

          {/* Drill rows */}
          {[
            { time: '5:30', name: 'Ball each · both feet', meta: '10 min · done', badge: 'Done', badgeColor: MUT, active: false },
            { time: '5:40', name: '2v1 to a small goal · finish weaker foot', meta: '20 min · running now, 12 minutes left', badge: 'Now', badgeColor: G, active: true },
            { time: '6:00', name: 'Finishing circuit · three stations', meta: '15 min', badge: null, badgeColor: '', active: false },
            { time: '6:15', name: '4v4 · a weaker-foot goal counts double', meta: '20 min', badge: null, badgeColor: '', active: false },
          ].map((drill, i) => (
            <div key={i} style={{
              minHeight: 74, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
              ...(drill.active ? { background: PALE, margin: '0 -10px', padding: '8px 10px', borderRadius: 12 } : {}),
            }}>
              <div style={{ width: 48, flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: MUT }}>{drill.time}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{drill.name}</div>
                <div style={{ fontSize: 13, color: MUT }}>{drill.meta}</div>
              </div>
              {drill.badge && (
                <span style={{ padding: '4px 10px', borderRadius: 999, background: drill.badgeColor === G ? PALE : '#f0f0f0', color: drill.badgeColor, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {drill.badge}
                </span>
              )}
            </div>
          ))}

          {/* Coaching tip */}
          <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '10px 12px', marginTop: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>Say this: </span>
            <span style={{ fontSize: 13, color: MUT }}>Open your hips, lock the ankle, and pick your corner before you strike.</span>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: MUT }}>
            Zane sits out the sprint finish at the last station. He has had a big week with his club.
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>
      )}
    </div>
  )
}
