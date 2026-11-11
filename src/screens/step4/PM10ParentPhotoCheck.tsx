import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PM10ParentPhotoCheck(_: { onBack?: () => void }) {
  const [selected, setSelected] = useState<string>('blur')
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const options = [
    { key: 'noharper', label: "No, Harper isn't in this photo" },
    { key: 'blur', label: 'Yes — blur Harper and send' },
    { key: 'dontsend', label: "Don't send this photo" },
  ]

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f4f7f5', fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '52px 20px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={_.onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', padding: 0, lineHeight: 1 }}>‹</button>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Check this photo</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '16px 16px 120px', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>

        {/* Photo preview */}
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: 200, background: '#d8e0de', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="8" width="40" height="32" rx="4" stroke={MUT} strokeWidth="2.5" fill="none" />
              <circle cx="24" cy="22" r="7" stroke={MUT} strokeWidth="2.5" fill="none" />
              <circle cx="36" cy="14" r="2" fill={MUT} />
            </svg>
          </div>
          <div style={{ padding: '10px 14px', fontSize: 13, color: MUT, textAlign: 'center' as const }}>Photo from camera roll</div>
        </div>

        {/* Question */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, paddingLeft: 2 }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: INK }}>Is Harper Quinn in this photo?</div>
          <div style={{ fontSize: 14, color: MUT }}>Harper's family said no to photos being shared.</div>
        </div>

        {/* Radio options */}
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
          {options.map((opt, i) => (
            <div
              key={opt.key}
              onClick={() => setSelected(opt.key)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: i < options.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer', background: selected === opt.key ? PALE : '#fff' }}
            >
              <div style={{ width: 22, height: 22, borderRadius: 999, border: selected === opt.key ? `6px solid ${G}` : `2px solid #ccc`, background: '#fff', flexShrink: 0 }} />
              <span style={{ fontSize: 15, fontWeight: selected === opt.key ? 600 : 400, color: INK }}>{opt.label}</span>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', fontSize: 14, color: G, lineHeight: 1.5 }}>
          Blurring takes about 30 seconds. The photo is checked again before it reaches the chat.
        </div>
      </div>

      {/* Bottom buttons */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: `1px solid ${LN}`, padding: '16px', display: 'flex', gap: 10 }}>
        <button
          onClick={() => t('Photo not sent.')}
          style={{ flex: 1, height: 52, borderRadius: 14, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', color: INK }}
        >
          Cancel
        </button>
        <button
          onClick={() => t('Blurring Harper... photo will send in 30 seconds.')}
          style={{ flex: 2, height: 52, borderRadius: 14, border: 0, background: selected === 'blur' ? G : (selected === 'noharper' ? G : MUT), color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
        >
          {selected === 'blur' ? 'Blur and send' : selected === 'noharper' ? 'Send photo' : "Don't send"}
        </button>
      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
