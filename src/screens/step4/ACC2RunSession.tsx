import CoachNav from '../academycoach/CoachNav'
import { coachGo } from '../academycoach/menu'
import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Attendance = 'here' | 'away'

export default function ACC2RunSession({ onNav }: { onBack?: () => void; onNav?: (s: string) => void }) {
  const [toast, setToast] = useState('')
  const [selectedDrill, setSelectedDrill] = useState<number | null>(1)
  const [done, setDone] = useState<string[]>([])
  const mark = (k: string) => setDone(d => d.includes(k) ? d : [...d, k])
  const is = (k: string) => done.includes(k)
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
    <div style={{ width: 1180, background: '#faf5ec', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>
      <CoachNav active="today" sub="Run a session" go={coachGo(onNav)} />

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '14px 28px 0', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Advanced · 12 to 14</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: MUT }}>Thursday 5:30 to 6:40 · finishing with the weaker foot</p>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button onClick={() => mark('swap')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: is('swap') ? PALE : '#fff', border: `1px solid ${is('swap') ? G : '#c5c8c4'}`, color: is('swap') ? G : INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{is('swap') ? 'Pick a drill…' : 'Swap a drill'}</button>
          <button onClick={() => mark('finish')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: is('finish') ? '#40826d' : G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{is('finish') ? 'Writing notes ✓' : 'Finish and write notes'}</button>
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
                <div style={{ width: 36, height: 36, borderRadius: 999, background: '#e8cfcf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: INK, flexShrink: 0 }}>{p.initials}</div>
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
            <button onClick={() => mark('film')} style={{ background: 'none', border: 'none', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>{is('film') ? 'Filming on ●' : 'Film this drill'}</button>
          </div>

          {/* Drill rows */}
          {[
            { time: '5:30', name: 'Ball each · both feet', meta: '10 min · done', badge: 'Done', badgeColor: MUT, active: false },
            { time: '5:40', name: '2v1 to a small goal · finish weaker foot', meta: '20 min · running now, 12 minutes left', badge: 'Now', badgeColor: G, active: true },
            { time: '6:00', name: 'Finishing circuit · three stations', meta: '15 min', badge: null, badgeColor: '', active: false },
            { time: '6:15', name: '4v4 · a weaker-foot goal counts double', meta: '20 min', badge: null, badgeColor: '', active: false },
          ].map((drill, i) => (
            <div key={i} onClick={() => setSelectedDrill(i)} style={{
              minHeight: 74, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', cursor: 'pointer',
              ...(selectedDrill === i ? { background: PALE, margin: '0 -10px', padding: '8px 10px', borderRadius: 12 } : {}),
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
          <div style={{ background: '#faf5ec', borderRadius: 12, padding: '10px 12px', marginTop: 8 }}>
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
