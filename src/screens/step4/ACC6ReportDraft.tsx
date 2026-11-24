import CoachNav from '../academycoach/CoachNav'
import { coachGo } from '../academycoach/menu'
import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACC6ReportDraft({ onNav }: { onBack?: () => void; onNav?: (s: string) => void }) {
  const [done, setDone] = useState<string[]>([])
  const mark = (k: string) => setDone(d => d.includes(k) ? d : [...d, k])
  const is = (k: string) => done.includes(k)

  const skills: { name: string; filled: number; progress?: number; total: number }[] = [
    { name: 'First touch', filled: 2, progress: 3, total: 5 },
    { name: 'Running with the ball', filled: 4, total: 5 },
    { name: 'One against one', filled: 4, total: 5 },
    { name: 'Striking the ball', filled: 2, total: 5 },
  ]

  const renderDots = (skill: typeof skills[0]) => {
    const dots = []
    for (let i = 1; i <= skill.total; i++) {
      const isFilled = i <= skill.filled
      const isProgress = !isFilled && skill.progress && i === skill.progress
      dots.push(
        <div key={i} style={{
          width: 14, height: 14, borderRadius: 999,
          background: isFilled ? G : 'transparent',
          border: isProgress ? `2px solid ${G}` : isFilled ? 'none' : `2px solid #c5c8c4`,
        }} />
      )
    }
    return dots
  }

  return (
    <div style={{ width: 1180, background: '#faf5ec', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>
      <CoachNav active="players" sub="Term report" go={coachGo(onNav)} />

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '14px 28px 0', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Term report · Kai Okonkwo</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: MUT }}>Drafted from your 5 session notes · check it, then send to Dani</p>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button onClick={() => mark('next')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: is('next') ? PALE : '#fff', border: `1px solid ${is('next') ? G : '#c5c8c4'}`, color: is('next') ? G : INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{is('next') ? 'Next draft ✓' : 'Next draft'}</button>
          <button onClick={() => mark('send')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: is('send') ? '#40826d' : G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{is('send') ? '✓ Sent to Dani' : 'Looks right, send to Dani'}</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 14 }}>
        {/* Left: report text */}
        <div style={{ gridColumn: 'span 7', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>What Kai's family will read</span>
            <span style={{ fontSize: 13, color: MUT }}>2 short paragraphs</span>
          </div>
          <div style={{ border: `1px solid #c5c8c4`, borderRadius: 12, padding: '14px 16px', fontSize: 15, lineHeight: '23px', color: INK }}>
            <p style={{ margin: '0 0 12px' }}>
              Kai has had a strong first term. He takes players on with confidence and keeps the ball close with both feet. His first touch has moved up a step: he now sets the ball out of his feet before he looks up.
            </p>
            <p style={{ margin: 0 }}>
              We've worked on finishing with his left foot. He has scored three in training and practises at home most weeks. Next term's goal is to do it in a game.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => mark('shorter')} style={{ height: 44, padding: '0 14px', borderRadius: 8, background: is('shorter') ? PALE : '#fff', border: `1px solid ${is('shorter') ? G : '#c5c8c4'}`, color: is('shorter') ? G : INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{is('shorter') ? 'Shortened ✓' : 'Make it shorter'}</button>
            <button onClick={() => mark('word')} style={{ height: 44, padding: '0 14px', borderRadius: 8, background: is('word') ? PALE : '#fff', border: `1px solid ${is('word') ? G : '#c5c8c4'}`, color: is('word') ? G : INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{is('word') ? 'Editing on ✓' : 'Change a word'}</button>
            <button onClick={() => mark('clip')} style={{ height: 44, padding: '0 14px', borderRadius: 8, background: is('clip') ? PALE : '#fff', border: `1px solid ${is('clip') ? G : '#c5c8c4'}`, color: is('clip') ? G : INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{is('clip') ? 'Clip added ✓' : 'Add a clip'}</button>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>
            Written from what you noted, in plain words. It never compares Kai with another child.
          </div>
        </div>

        {/* Right: skills then and now */}
        <div style={{ gridColumn: 'span 5', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 10 }}>Skills, then and now</span>
          {skills.map((skill, i) => (
            <div key={i} style={{ minHeight: 52, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '6px 0' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{skill.name}</span>
              <div style={{ display: 'flex', gap: 5 }}>{renderDots(skill)}</div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${LN}`, marginTop: 6 }} />
          {[
            { label: 'Came to', value: '5 of 6 sessions' },
            { label: "Next term's goal", value: 'Left-foot goal in a game' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <span style={{ fontSize: 13, color: MUT }}>{row.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{row.value}</span>
            </div>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: 10, fontSize: 12, color: MUT }}>The lighter dot is what moved this term.</div>
        </div>
      </div>
    </div>
  )
}
