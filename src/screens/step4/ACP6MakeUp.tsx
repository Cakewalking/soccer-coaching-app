import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const OPTIONS = [
  { id: 'tue', label: 'Tuesday 9 June', sub: '5:30 – 6:40 pm · Advanced group' },
  { id: 'sat', label: 'Saturday 13 June', sub: '9:00 – 10:00 am · Mixed make-up' },
]

export default function ACP6MakeUp() {
  const [chosen, setChosen] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', position: 'relative' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tall Timber Academy</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 2 }}>Book a make-up</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Can't make Kai's Thursday session?</div>
      </div>

      <div style={{ padding: '16px 20px 100px' }}>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>Pick a session to swap into. You keep 1 make-up to use by the end of term.</div>

        {OPTIONS.map(opt => (
          <button key={opt.id} onClick={() => setChosen(opt.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, background: '#fff', border: `2px solid ${chosen === opt.id ? G : LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10, cursor: 'pointer', textAlign: 'left' as const }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${chosen === opt.id ? G : LN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              {chosen === opt.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: G }} />}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{opt.sub}</div>
            </div>
          </button>
        ))}

        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginTop: 6, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: GD }}>Keep 1 make-up to use by end of term. You have 1 remaining.</div>
        </div>

        {!booked ? (
          <button onClick={() => { if (chosen) { setBooked(true); t('Make-up booked.') } else t('Pick a session first.') }} style={{ width: '100%', height: 48, borderRadius: 14, border: 0, background: chosen ? G : LN, color: chosen ? '#fff' : MUT, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Confirm make-up</button>
        ) : (
          <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>Make-up booked</div>
            <div style={{ fontSize: 13, color: G, marginTop: 4 }}>{OPTIONS.find(o => o.id === chosen)?.label}</div>
          </div>
        )}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
