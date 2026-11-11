import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PC1bConcernSent(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const steps = [
    { n: '1', title: 'Helen reads your concern', sub: 'Within one working day' },
    { n: '2', title: 'Helen calls you', sub: 'To talk through what happened' },
    { n: '3', title: 'You both agree a next step', sub: 'Or Helen takes it from here' },
  ]

  return (
    <div style={{ width: 390, minHeight: 844, fontFamily: 'var(--font-sans)', background: '#f7f8f7', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '12px 16px 14px', paddingTop: 'env(safe-area-inset-top, 12px)' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
      </div>

      <div style={{ padding: '36px 16px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        {/* Checkmark circle */}
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M7 15l6 6 10-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: INK, marginBottom: 8 }}>Thank you for telling us</div>
          <div style={{ fontSize: 15, color: MUT }}>Helen Park will read your concern privately.</div>
        </div>

        {/* Steps card */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.n}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 0' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: PALE, border: `2px solid ${G}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: G, flexShrink: 0 }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{s.sub}</div>
                </div>
              </div>
              {i < steps.length - 1 && <div style={{ height: 1, background: LN, marginLeft: 46 }} />}
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', width: '100%', boxSizing: 'border-box', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <rect x="3" y="8" width="12" height="8" rx="2" fill={G} />
            <path d="M6 8V6a3 3 0 016 0v2" stroke={G} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="9" cy="12" r="1.2" fill="#fff" />
          </svg>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>
            No one else at the club will know unless you say so, or if someone is in danger.
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => t('Going back.')}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: 14,
            border: 'none',
            background: G,
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Back to Mia's week
        </button>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>
          {toast}
        </div>
      )}
    </div>
  )
}
