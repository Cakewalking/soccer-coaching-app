import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PM7ParentReport(_: { onBack?: () => void }) {
  const [selected, setSelected] = useState<string>('unkind')
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const options = [
    { key: 'unkind', label: 'It\'s unkind or disrespectful' },
    { key: 'private', label: 'It shares private information' },
    { key: 'safety', label: 'It\'s about child safety' },
  ]

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f4f7f5', fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '52px 20px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={_.onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', padding: 0, lineHeight: 1 }}>‹</button>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Report a message</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '16px 16px 120px', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>

        {/* Message card */}
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: INK, flexShrink: 0 }}>DC</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>Dan Chen</div>
              <div style={{ fontSize: 12, color: MUT }}>Thu 4:12 pm</div>
            </div>
          </div>
          <div style={{ fontSize: 15, color: INK, lineHeight: 1.5, fontStyle: 'italic' as const, padding: '8px 12px', background: '#fff8f8', borderRadius: 10, border: '1px solid #fde' }}>
            "Mia should just quit — she's holding the team back."
          </div>
        </div>

        {/* Why section */}
        <div style={{ fontWeight: 700, fontSize: 16, color: INK, paddingLeft: 2 }}>Why are you reporting this?</div>

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

        {/* Privacy note */}
        <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>🔒</span>
          <div style={{ fontSize: 14, color: G, lineHeight: 1.5 }}>
            Only the welfare officer Helen Park and the coach will see this report.
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: `1px solid ${LN}`, padding: '16px', display: 'flex', gap: 10 }}>
        <button
          onClick={() => t('Report cancelled.')}
          style={{ flex: 1, height: 52, borderRadius: 14, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', color: INK }}
        >
          Cancel
        </button>
        <button
          onClick={() => t('Report sent to Helen Park.')}
          style={{ flex: 2, height: 52, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
        >
          Send to Helen Park
        </button>
      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
