import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PM8ParentReadOnly(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const pollOptions = [
    { label: '9:00 slot', filled: 2, total: 2 },
    { label: '10:30 slot', filled: 1, total: 2 },
    { label: '12:00 slot', filled: 0, total: 2 },
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

      {/* Pinned banner */}
      <div style={{ background: PALE, borderBottom: `1px solid ${LN}`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 14 }}>📌</span>
        <span style={{ fontSize: 13, color: G, fontWeight: 600 }}>Pinned: Canteen slots — 3 spots left</span>
      </div>

      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '16px 16px 0', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>

        {/* Poll message from Coach Ben */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-start', gap: 4 }}>
          <div style={{ fontSize: 12, color: MUT, paddingLeft: 52 }}>Coach Ben · Mon</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: INK, flexShrink: 0 }}>CB</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: '4px 16px 16px 16px', padding: '12px 14px', maxWidth: 270 }}>
              <div style={{ display: 'inline-block', background: G, color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', borderRadius: 4, padding: '2px 6px', marginBottom: 6 }}>POLL</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: INK, marginBottom: 10 }}>Canteen slots for Saturday</div>
              {pollOptions.map((opt, i) => (
                <div key={opt.label} style={{ marginBottom: i < pollOptions.length - 1 ? 8 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: INK, marginBottom: 3 }}>
                    <span style={{ fontWeight: 500 }}>{opt.label}</span>
                    <span style={{ color: opt.filled === opt.total ? '#c0392b' : G, fontWeight: 600 }}>{opt.filled} / {opt.total}{opt.filled === opt.total ? ' full' : ''}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: LN, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(opt.filled / opt.total) * 100}%`, background: opt.filled === opt.total ? '#c0392b' : G, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 12, color: MUT }}>6 of 11 families answered</div>
            </div>
          </div>
        </div>

        {/* Photo message from Ben */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-start', gap: 4 }}>
          <div style={{ fontSize: 12, color: MUT, paddingLeft: 52 }}>Ben (Coach) · Wed</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: INK, flexShrink: 0 }}>CB</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: '4px 16px 16px 16px', padding: '10px 14px', maxWidth: 240 }}>
              <div style={{ width: 160, height: 90, borderRadius: 8, background: '#d8e0de', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 8 }}>🖼️</div>
              <div style={{ fontSize: 15, color: INK }}>Great defending on Saturday!</div>
            </div>
          </div>
        </div>

        <div style={{ height: 16 }} />
      </div>

      {/* Bottom bar — read only */}
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>🔒</span>
        <span style={{ fontSize: 13, color: MUT, flex: 1 }}>Only coaches and manager can post</span>
        <button onClick={() => t('Message sent privately.')} style={{ height: 44, padding: '0 12px', borderRadius: 20, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: INK, whiteSpace: 'nowrap' as const }}>Message Sam K</button>
        <button onClick={() => t('Message sent privately.')} style={{ height: 44, padding: '0 12px', borderRadius: 20, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>Message Ben</button>
      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
