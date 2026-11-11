import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PP1TwoChildren(_: { onBack?: () => void }) {
  const [filter, setFilter] = useState('both')
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const filters = [
    { id: 'both', label: 'Both' },
    { id: 'mia', label: 'Mia' },
    { id: 'bao', label: 'Bao' },
  ]

  const showMia = filter === 'both' || filter === 'mia'
  const showBao = filter === 'both' || filter === 'bao'

  return (
    <div style={{ width: 390, minHeight: 844, fontFamily: 'var(--font-sans)', background: '#f7f8f7', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '12px 16px 14px', paddingTop: 'env(safe-area-inset-top, 12px)' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Clean Sheet</div>
        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8 }}>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: filter === f.id ? 'none' : '1.5px solid rgba(255,255,255,0.35)',
                background: filter === f.id ? '#fff' : 'transparent',
                color: filter === f.id ? GD : '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Saturday summary card */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Saturday 7 June</div>
            <div style={{ background: LN, borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 600, color: MUT }}>Tomorrow</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0 }} />
              <div style={{ fontSize: 14, color: INK }}>Mia · 9:30 am vs Riverside FC</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0 }} />
              <div style={{ fontSize: 14, color: INK }}>Bao · 11:00 am U8 Hannah</div>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: '8px 10px', background: PALE, borderRadius: 8 }}>
            <div style={{ fontSize: 13, color: MUT }}>Canteen roster: Linh is on at 9 am</div>
          </div>
        </div>

        {/* Mia section */}
        {showMia && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: G, marginBottom: 10 }}>Mia Tran · U12 Sam</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: '#fff', borderRadius: 14, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Saturday 9:30 · Game</div>
                    <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>vs Riverside FC</div>
                  </div>
                  <div style={{ background: G, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#fff' }}>Coming</div>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Thursday 4:15 · Training</div>
                    <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>Sam K</div>
                  </div>
                  <div style={{ background: G, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#fff' }}>Will be there</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bao section */}
        {showBao && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: G, marginBottom: 10 }}>Bao Tran · U8 Hannah</div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Saturday 11:00 · Game</div>
                  <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>U8 Hannah</div>
                </div>
                <button
                  onClick={() => t("Opening Bao's availability...")}
                  style={{
                    background: '#f59e0b',
                    borderRadius: 20,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Answer for Bao
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>
          {toast}
        </div>
      )}
    </div>
  )
}
