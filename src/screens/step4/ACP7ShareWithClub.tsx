import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACP7ShareWithClub() {
  const [sharing, setSharing] = useState({ goal: true, days: false, report: false })
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  function toggle(key: keyof typeof sharing) {
    setSharing(prev => ({ ...prev, [key]: !prev[key] }))
    t('Saved.')
  }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', position: 'relative' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tall Timber Academy</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 2 }}>Share with his game club</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Kai plays for Banksia Park U11 (not linked)</div>
      </div>

      <div style={{ padding: '16px 20px 32px' }}>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>Choose what Banksia Park can see. Fees are never shared.</div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '10px 16px', marginBottom: 14 }}>
          {[
            { key: 'goal' as const, label: "Kai's goal and plan", sub: 'What he is working on this term' },
            { key: 'days' as const, label: 'Training days and attendance', sub: 'Tue/Thu 5:30 pm · weeks attended' },
            { key: 'report' as const, label: 'Term report', sub: 'Skills ratings and coach comments' },
          ].map(item => (
            <button key={item.key} onClick={() => toggle(item.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', background: 'none', border: 'none', borderBottom: `1px solid ${LN}`, cursor: 'pointer', textAlign: 'left' as const }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{item.sub}</div>
              </div>
              <div style={{ width: 44, height: 26, borderRadius: 999, background: sharing[item.key] ? G : LN, flex: 'none', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: 3, left: sharing[item.key] ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
              </div>
            </button>
          ))}
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 13, color: GD }}>Fees are never shared with the game club.</div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
