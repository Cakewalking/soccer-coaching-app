import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SPp2ParentComingBack(_: { onBack?: () => void }) {
  const [answered, setAnswered] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  function answer(val: string) {
    setAnswered(val)
    t(val === 'yes'
      ? 'Great! Mia\'s place is kept for 2027.'
      : val === 'maybe'
      ? 'Noted. Sam will hold her spot for a few weeks.'
      : 'Thanks for letting us know. We\'ll free up the spot.')
  }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative', margin: '0 auto' }}>
      <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>9:41</div>
      </div>

      <div style={{ padding: '12px 20px 32px' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '24px 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Wattle Creek FC U12 Sam</div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>Is Mia coming back for 2027?</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5, marginBottom: 20 }}>Registration for next year opens soon. Sam needs to know who's returning before he can run trials for new players.</div>

          {!answered ? (
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              <button onClick={() => answer('yes')} style={{ height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Yes, Mia is coming back</button>
              <button onClick={() => answer('maybe')} style={{ height: 48, borderRadius: 14, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Not sure yet</button>
              <button onClick={() => answer('no')} style={{ height: 48, borderRadius: 14, border: `1px solid #f0c0c0`, background: '#fff5f5', color: '#8b3a3a', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>No, she won't be back</button>
            </div>
          ) : (
            <div style={{ padding: '14px 16px', background: PALE, borderRadius: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: GD }}>
                {answered === 'yes' ? "Mia's place is confirmed for 2027." : answered === 'maybe' ? 'Sam will hold her spot for a few weeks.' : "Spot freed up. Thanks for letting us know."}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>Trial dates: 12 to 25 October</div>
          <div style={{ fontSize: 13, color: MUT }}>Any spots that open up go to trial players after that window closes.</div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
