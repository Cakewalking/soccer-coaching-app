import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function IV3(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const features = [
    { icon: '👥', title: 'The team and families', sub: 'Names and contact through the app only' },
    { icon: '📅', title: 'Fixtures and attendance', sub: "Who's coming to each game" },
    { icon: '📢', title: 'Post announcements', sub: 'Goes to all 17 families at once' },
    { icon: '💬', title: 'Team chat', sub: 'You can read and post in U12 Sam chat' },
    { icon: '🛡️', title: 'Child safety', sub: 'Any concern goes to Helen Park, welfare officer' },
  ]

  const wontSee = [
    'Player medical or family details',
    'Private messages between parents and Sam K',
    'Concern details — only that one exists',
  ]

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', fontFamily: 'var(--font-sans)', position: 'relative', overflowY: 'auto', boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '18px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Clean Sheet</span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>3 of 3</span>
      </div>

      <div style={{ padding: '28px 20px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>What you'll see as manager</div>
        <div style={{ fontSize: 14, color: MUT, marginTop: 5 }}>U12 Sam · Wattle Creek FC</div>
      </div>

      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Feature rows */}
        <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${LN}`, overflow: 'hidden' }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                borderTop: i === 0 ? 'none' : `1px solid ${LN}`
              }}
            >
              <span style={{ fontSize: 24, flexShrink: 0, width: 32, textAlign: 'center' }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>{f.title}</div>
                <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Won't see box */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 10 }}>You won't see</div>
          {wontSee.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 8,
                padding: '6px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${LN}`
              }}
            >
              <span style={{ color: MUT, fontSize: 14, marginTop: 1, flexShrink: 0 }}>✕</span>
              <span style={{ fontSize: 14, color: MUT, lineHeight: 1.45 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Accept button */}
        <button
          onClick={() => t('Welcome to Wattle Creek FC! Tap around to explore.')}
          style={{ width: '100%', padding: '15px 0', background: G, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 4, marginBottom: 32 }}
        >
          Accept and join
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', zIndex: 999 }}>
          {toast}
        </div>
      )}
    </div>
  )
}
