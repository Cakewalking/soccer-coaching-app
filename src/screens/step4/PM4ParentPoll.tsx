import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PM4ParentPoll(_: { onBack?: () => void }) {
  const [selected, setSelected] = useState<string>('coming')
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const options = [
    { key: 'coming', label: 'Coming', count: 9 },
    { key: 'cantcome', label: "Can't come", count: 3 },
    { key: 'notsure', label: 'Not sure yet', count: 2 },
  ]

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f4f7f5', fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '52px 20px 16px', flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Clean Sheet</div>
      </div>

      {/* Page heading */}
      <div style={{ padding: '20px 16px 8px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: INK, marginBottom: 2 }}>Who's coming?</div>
        <div style={{ fontSize: 14, color: MUT }}>U12 Sam · for Saturday's game</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '8px 16px 120px', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>

        {/* Poll card */}
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 10px', fontWeight: 700, fontSize: 17, color: INK, borderBottom: `1px solid ${LN}` }}>Who's coming on Saturday?</div>
          {options.map((opt, i) => (
            <div
              key={opt.key}
              onClick={() => setSelected(opt.key)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: i < options.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer', background: selected === opt.key ? PALE : '#fff' }}
            >
              {/* Radio dot */}
              <div style={{ width: 22, height: 22, borderRadius: 999, border: selected === opt.key ? `6px solid ${G}` : `2px solid #ccc`, background: '#fff', flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 16, fontWeight: selected === opt.key ? 600 : 400, color: INK }}>{opt.label}</span>
              {selected === opt.key && (
                <div style={{ background: G, color: '#fff', fontSize: 12, fontWeight: 700, borderRadius: 999, padding: '2px 10px' }}>{opt.count}</div>
              )}
            </div>
          ))}
        </div>

        {/* Info box */}
        <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', fontSize: 14, color: G, fontWeight: 500 }}>
          This also answers the team's availability for Saturday.
        </div>

        {/* Who's answered */}
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>14 of 17 families</div>
          <div style={{ fontSize: 14, color: MUT }}>Sam K: last 3 needed by Thursday</div>
        </div>
      </div>

      {/* Save button */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(transparent, #f4f7f5 40%)' }}>
        <button
          onClick={() => t('Saved. Sam K can see Mia is coming.')}
          style={{ width: '100%', height: 52, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}
        >
          Save
        </button>
      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
