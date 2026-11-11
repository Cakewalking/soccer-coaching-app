import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PP2SeasonSummary(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const stats = [
    { value: '17 of 18', label: 'Games' },
    { value: 'Fair', label: 'Minutes' },
    { value: '2 of 2', label: 'Goals' },
  ]

  const nextRows = [
    { label: 'Program', value: 'U12 Sam' },
    { label: 'Coach', value: 'Sam K' },
    { label: 'Start date', value: 'Sat 2 Aug' },
  ]

  return (
    <div style={{ width: 390, minHeight: 844, fontFamily: 'var(--font-sans)', background: '#f7f8f7', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '12px 16px 14px', paddingTop: 'env(safe-area-inset-top, 12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={_.onBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 17l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Mia's season</div>
        </div>
      </div>

      <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Coach note card */}
        <div style={{ background: G, borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Sam K · Coach</div>
          <div style={{ fontSize: 15, color: '#fff', lineHeight: 1.55 }}>
            "Mia has grown so much this season. Her left foot is now a real weapon and she reads the game ahead of her age."
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: G, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: MUT }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Favourite moment */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Favourite moment</div>
          <div style={{ background: '#1a2b28', borderRadius: 10, height: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, position: 'relative' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6 4l9 5-9 5V4z" fill="#fff" />
              </svg>
            </div>
            <div style={{ position: 'absolute', bottom: 8, right: 10, background: 'rgba(0,0,0,0.6)', borderRadius: 6, padding: '2px 7px', fontSize: 12, color: '#fff', fontWeight: 600 }}>0:34</div>
          </div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 8 }}>Goal vs Banksia Park, Round 11</div>
        </div>

        {/* Next season */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Next season</div>
          {nextRows.map((r, i) => (
            <div key={r.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                <div style={{ fontSize: 14, color: MUT }}>{r.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.value}</div>
                  <div style={{ fontSize: 12, color: G, fontWeight: 600, background: PALE, borderRadius: 10, padding: '2px 8px' }}>confirmed</div>
                </div>
              </div>
              {i < nextRows.length - 1 && <div style={{ height: 1, background: LN }} />}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => t('Link copied.')}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: 14,
              border: `2px solid ${LN}`,
              background: '#fff',
              color: INK,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Share
          </button>
          <button
            onClick={() => t('Downloading PDF...')}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: 14,
              border: 'none',
              background: G,
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Download
          </button>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>
          {toast}
        </div>
      )}
    </div>
  )
}
