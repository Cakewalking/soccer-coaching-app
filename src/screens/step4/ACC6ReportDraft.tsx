import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACC6ReportDraft(_: { onBack?: () => void }) {
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const skills: { name: string; filled: number; progress?: number; total: number }[] = [
    { name: 'Ball mastery', filled: 4, total: 5 },
    { name: 'First touch', filled: 2, progress: 3, total: 5 },
    { name: 'One against one', filled: 4, total: 5 },
    { name: 'Passing', filled: 3, total: 5 },
    { name: 'Finishing', filled: 2, total: 5 },
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
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>
      {/* Top nav */}
      <div style={{ background: G, height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', flexShrink: 0 }}>
        <span style={{ color: '#fff', fontSize: 21, fontWeight: 700, marginRight: 32, letterSpacing: '-0.01em' }}>Clean Sheet</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {[{ label: 'Today', icon: '⌂' }, { label: 'Players', icon: '👥', active: true }, { label: 'Game day', icon: '⚽' }, { label: 'Library', icon: '📅' }].map(item => (
            <button key={item.label} style={{ background: (item as any).active ? 'rgba(255,255,255,0.18)' : 'none', border: 'none', color: '#fff', fontSize: 14, fontWeight: (item as any).active ? 700 : 500, padding: '0 14px', height: 64, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => showToast('Opening academy selector.')} style={{ background: 'rgba(255,255,255,0.18)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 500, padding: '0 14px', height: 44, borderRadius: 999, cursor: 'pointer', marginRight: 12 }}>Tall Timber Academy ▾</button>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: INK }}>RW</div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', height: 44, borderBottom: `1px solid #c5c8c4`, display: 'flex', alignItems: 'center', padding: '0 28px', flexShrink: 0 }}>
        {['Player plan', 'Term report'].map(tab => {
          const active = tab === 'Term report'
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
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Term report · Kai Okonkwo</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: MUT }}>Drafted from your 5 session notes · check it, then send to Dani</p>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button onClick={() => showToast('Opening Ana\'s. Too new for a report, so skipped.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Next draft</button>
          <button onClick={() => showToast('Sent to Dani to approve. 3 more drafts to check.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Looks right, send to Dani</button>
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
            <button onClick={() => showToast('Shortened to three sentences.')} style={{ height: 44, padding: '0 14px', borderRadius: 8, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Make it shorter</button>
            <button onClick={() => showToast('Tap any sentence to edit it.')} style={{ height: 44, padding: '0 14px', borderRadius: 8, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Change a word</button>
            <button onClick={() => showToast('Pick from Kai\'s 4 clips this term.')} style={{ height: 44, padding: '0 14px', borderRadius: 8, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Add a clip</button>
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

      {toast && (
        <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>
      )}
    </div>
  )
}
