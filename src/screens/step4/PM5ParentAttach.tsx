import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PM5ParentAttach(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>('attach')
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const waveHeights = [14, 20, 28, 18, 32, 24, 16, 30, 22, 26]

  const attachOptions = [
    { icon: '🖼️', label: 'Photo', action: () => { setSheet(null); t('Opening photo consent...') } },
    { icon: '🎥', label: 'Video', action: () => { setSheet(null); t('Pick from camera roll or record') } },
    { icon: '🎙️', label: 'Voice note', action: () => { setSheet(null); t('Recording...') } },
    { icon: '📍', label: 'Place', action: () => { setSheet(null); t('Share your location') } },
    { icon: '📎', label: 'File', action: () => { setSheet(null); t('Pick a file from this device') } },
  ]

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f4f7f5', fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '52px 20px 0', flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0 }}>
          {['Chats', 'Team', 'My child'].map(tab => (
            <div key={tab} style={{ flex: 1, textAlign: 'center', paddingBottom: 10, fontSize: 15, fontWeight: 600, color: tab === 'Chats' ? '#fff' : 'rgba(255,255,255,0.6)', borderBottom: tab === 'Chats' ? '2px solid #fff' : '2px solid transparent' }}>{tab}</div>
          ))}
        </div>
      </div>

      {/* Chat content — abbreviated */}
      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '16px 16px 0', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: 4 }}>
          <div style={{ background: G, borderRadius: '16px 16px 4px 16px', padding: '10px 14px', maxWidth: 260 }}>
            <div style={{ fontSize: 15, color: '#fff', marginBottom: 8 }}>Who's bringing oranges on Saturday?</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 1].map(i => (
                <div key={i} style={{ width: 72, height: 52, borderRadius: 8, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🖼️</div>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 999, padding: '2px 10px', fontSize: 13 }}>👍 3</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-start', gap: 4 }}>
          <div style={{ fontSize: 12, color: MUT, paddingLeft: 52 }}>Sam K · 10:21 am</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: INK, flexShrink: 0 }}>SK</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: '4px 16px 16px 16px', padding: '10px 14px', maxWidth: 240, fontSize: 15, color: INK }}>I'll sort oranges! Mia, great left foot work this week 🎉</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-start', gap: 4 }}>
          <div style={{ fontSize: 12, color: MUT, paddingLeft: 52 }}>Jess · 10:35 am</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: INK, flexShrink: 0 }}>JL</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: '4px 16px 16px 16px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 36 }}>
                {waveHeights.map((h, i) => (
                  <div key={i} style={{ width: 3, height: h, background: G, borderRadius: 2, opacity: 0.8 }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: MUT, fontWeight: 600 }}>0:12</span>
            </div>
          </div>
        </div>

        <div style={{ height: 16 }} />
      </div>

      {/* Compose bar */}
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div onClick={() => setSheet('attach')} style={{ width: 36, height: 36, borderRadius: 999, border: `2px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: MUT, cursor: 'pointer', flexShrink: 0 }}>+</div>
        <div style={{ flex: 1, background: '#f4f7f5', borderRadius: 20, padding: '10px 14px', fontSize: 15, color: '#aaa' }}>Write to U12 Sam</div>
        <div style={{ width: 36, height: 36, borderRadius: 999, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>↑</div>
      </div>

      {/* Attach sheet from bottom */}
      {sheet === 'attach' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.3)', zIndex: 40 }} onClick={() => setSheet(null)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px 0 32px' }}
          >
            <div style={{ width: 36, height: 4, background: LN, borderRadius: 2, margin: '0 auto 16px' }} />
            <div style={{ padding: '0 20px 12px', fontWeight: 700, fontSize: 17, color: INK }}>Add to your message</div>

            {attachOptions.map(opt => (
              <div
                key={opt.label}
                onClick={opt.action}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', cursor: 'pointer', borderTop: `1px solid ${LN}` }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 12, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{opt.icon}</div>
                <span style={{ flex: 1, fontSize: 16, fontWeight: 500, color: INK }}>{opt.label}</span>
                <span style={{ fontSize: 18, color: MUT }}>›</span>
              </div>
            ))}

            {/* Poll — locked */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderTop: `1px solid ${LN}`, opacity: 0.5 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🔒</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: INK }}>Poll</div>
                <div style={{ fontSize: 12, color: MUT }}>Polls are set by the coach or manager</div>
              </div>
            </div>

            <div style={{ padding: '12px 20px 0' }}>
              <button onClick={() => setSheet(null)} style={{ width: '100%', height: 48, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', color: INK }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
