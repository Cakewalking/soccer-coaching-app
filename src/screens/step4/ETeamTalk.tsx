import { useState } from 'react'

const G = '#2f6252'

export default function ETeamTalk(_: { onBack?: () => void }) {
  const [slide, setSlide] = useState(0)
  const [toast, setToast] = useState<string|null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const slides = [
    {
      title: 'Win the ball back faster',
      body: 'When we lose it, we hunt it back together. Six seconds.',
      metric: 'Boot sensors · seconds to win it back',
      rows: [
        { label: 'Saturday', val: '7 s', color: '#c05' },
        { label: 'Our usual', val: '4 s', color: G },
      ],
      note: 'Min 16. Lost it on halfway. 9 seconds to win it back.',
      clips: '4 clips in total',
    },
  ]

  return (
    <div style={{ width: 1180, background: '#1a2e2a', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      {/* Header */}
      <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Team talk · U12 Sam · Wattle Creek FC</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>1 of 3</div>
          <button onClick={() => showToast('Closing team talk — returning to match day.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Close</button>
          <button onClick={() => setSlide(1)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Next</button>
        </div>
      </div>

      {/* Slide */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ width: 680 }}>
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', marginBottom: 12 }}>{slides[0].title}</div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.5 }}>{slides[0].body}</div>

          {/* Metric chart */}
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 24px', marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>{slides[0].metric}</div>
            {slides[0].rows.map(r => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
                <div style={{ width: 100, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{r.label}</div>
                <div style={{ flex: 1, height: 32, background: 'rgba(255,255,255,0.1)', borderRadius: 8, overflow: 'hidden', position: 'relative' as const }}>
                  <div style={{ width: r.label === 'Saturday' ? '70%' : '40%', height: '100%', background: r.color, borderRadius: 8 }} />
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: r.color, width: 50, textAlign: 'right' as const }}>{r.val}</div>
              </div>
            ))}
          </div>

          {/* Clip note */}
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 18px' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{slides[0].note}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: G }}>{slides[0].clips}</div>
          </div>

          {/* Nav dots */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 32 }}>
            {[0, 1, 2].map(i => (
              <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 24 : 8, height: 8, borderRadius: 4, background: i === slide ? G : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'width 0.2s' }} />
            ))}
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
