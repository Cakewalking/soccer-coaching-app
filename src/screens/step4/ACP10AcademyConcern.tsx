import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACP10AcademyConcern() {
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', position: 'relative' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tall Timber Academy</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 2 }}>Tell someone</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Concerns about Kai's welfare</div>
      </div>

      <div style={{ padding: '16px 20px 100px' }}>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>All messages are private. Only welfare officers see them.</div>

        {[
          { label: 'At academy training', name: 'Dani Okafor', role: 'Welfare officer · Tall Timber' },
          { label: 'At Saturday game', name: 'Helen Park', role: 'Child safety officer · Wattle Creek FC' },
          { label: "Not sure where it happened", name: 'Both are notified', role: 'They coordinate between them' },
        ].map((opt, i) => (
          <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{opt.label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 2 }}>{opt.name}</div>
            <div style={{ fontSize: 12, color: MUT }}>{opt.role}</div>
          </div>
        ))}

        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: GD, lineHeight: 1.5 }}>We show you how to go straight to the regulator if you prefer to report outside the club.</div>
        </div>

        {!sent ? (
          <button onClick={() => { setSent(true); t('Message sent privately.') }} style={{ width: '100%', height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Send privately</button>
        ) : (
          <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>Message sent</div>
            <div style={{ fontSize: 13, color: G, marginTop: 4 }}>Someone will follow up with you.</div>
          </div>
        )}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
