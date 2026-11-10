import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACP2Offer() {
  const [accepted, setAccepted] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', position: 'relative' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tall Timber Academy</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 4 }}>Offer for Kai Okonkwo</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Advanced group · Tuesday and Thursday</div>
      </div>

      <div style={{ padding: '16px 20px 100px' }}>
        {/* Details */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          {[
            ['Days', 'Tuesday and Thursday'],
            ['Time', '5:30 – 6:40 pm'],
            ['Venue', 'Messmate Primary School'],
            ['Group', 'Advanced (10–12 year olds)'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, color: MUT }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Fees */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Fees</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 13, color: MUT }}>Full term</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>$320</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
            <div style={{ fontSize: 13, color: MUT }}>7 weeks remaining</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: G }}>$224</div>
          </div>
        </div>

        {/* Place held */}
        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: GD, fontWeight: 600 }}>Place held until Saturday 16 May</div>
          <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>After that it may go to someone on the waitlist.</div>
        </div>

        <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>Next step: let his game team know before you confirm.</div>

        {!accepted ? (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <button onClick={() => { setAccepted(true); t('Place confirmed for Kai.') }} style={{ height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Accept place</button>
            <button onClick={() => t('Declined. The place will be released.')} style={{ height: 48, borderRadius: 14, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Decline</button>
          </div>
        ) : (
          <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>Place confirmed</div>
            <div style={{ fontSize: 13, color: G, marginTop: 4 }}>First session Thursday 14 May, 5:30 pm.</div>
          </div>
        )}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
