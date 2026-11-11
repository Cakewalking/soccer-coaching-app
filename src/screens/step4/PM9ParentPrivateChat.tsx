import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PM9ParentPrivateChat(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const waveHeights = [10, 16, 22, 14, 26, 18, 12, 24, 16, 20, 14, 10]

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
      <div style={{ background: GD, padding: '52px 20px 12px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={_.onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', padding: 0, lineHeight: 1 }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Sam K</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Coach · U12 Sam</div>
        </div>
      </div>

      {/* Privacy banner */}
      <div style={{ background: PALE, borderBottom: `1px solid ${LN}`, padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>🔒</span>
        <span style={{ fontSize: 13, color: G, lineHeight: 1.4 }}>This is private between you and Sam. Sam's employer can read it.</span>
      </div>

      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '16px 16px 0', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>

        {/* 1. Outgoing */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: G, borderRadius: '16px 16px 4px 16px', padding: '10px 14px', maxWidth: 270, fontSize: 15, color: '#fff' }}>
            Hi Sam, Mia will be 10 minutes late on Thursday — dentist appointment
          </div>
        </div>

        {/* 2. Incoming */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-start', gap: 4 }}>
          <div style={{ fontSize: 12, color: MUT, paddingLeft: 48 }}>Sam K · 2:15 pm</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: INK, flexShrink: 0 }}>SK</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: '4px 16px 16px 16px', padding: '10px 14px', maxWidth: 250, fontSize: 15, color: INK }}>
              No worries, I'll keep her in the warm-up group
            </div>
          </div>
        </div>

        {/* 3. Action chip */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#e8edeb', borderRadius: 999, padding: '5px 14px', fontSize: 12, color: MUT, fontWeight: 500 }}>
            Mia is marked 10 minutes late · Thursday
          </div>
        </div>

        {/* 4. Incoming — video */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: INK, flexShrink: 0 }}>SK</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: '4px 16px 16px 16px', padding: '10px 14px', maxWidth: 250 }}>
            <div style={{ width: 180, height: 80, borderRadius: 8, background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, position: 'relative' as const }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>▶️</div>
              <div style={{ position: 'absolute', bottom: 6, right: 8, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 11, fontWeight: 600, borderRadius: 4, padding: '1px 5px' }}>0:28</div>
            </div>
            <div style={{ fontSize: 15, color: INK }}>Mia's left-foot work from today 🎉</div>
          </div>
        </div>

        {/* 5. Outgoing — voice note */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: G, borderRadius: '16px 16px 4px 16px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 32 }}>
              {waveHeights.map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: 'rgba(255,255,255,0.8)', borderRadius: 2 }} />
              ))}
            </div>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>0:08</span>
          </div>
        </div>

        <div style={{ height: 16 }} />
      </div>

      {/* Compose bar */}
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div onClick={() => setSheet('attach')} style={{ width: 36, height: 36, borderRadius: 999, border: `2px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: MUT, cursor: 'pointer', flexShrink: 0 }}>+</div>
        <div style={{ flex: 1, background: '#f4f7f5', borderRadius: 20, padding: '10px 14px', fontSize: 15, color: '#aaa' }}>Write to Sam K</div>
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
