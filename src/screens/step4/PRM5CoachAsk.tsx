import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function PRM5CoachAsk({ onNav }: { onNav?: (s: string) => void }) {
  const [reason, setReason] = useState('')
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  function handleSend() {
    setSent(true)
    st('Your note has been sent to Rachel.')
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(16,33,31,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, fontFamily: 'var(--font-sans)' }}>
      {!sent ? (
        <div style={{ background: '#fff', borderRadius: 20, padding: '32px', width: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 8 }}>Ask Rachel for Live game help</div>
          <div style={{ fontSize: 14, color: MUT, marginBottom: 20 }}>Rachel decides what each team gets. Tell her why it would help U9 Tom.</div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, marginBottom: 6 }}>Why it would help</div>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="I have 12 children on Saturday and I'm on my own. Help with who has played least would let me watch the game."
            style={{ width: '100%', height: 100, border: `1.5px solid ${LN}`, borderRadius: 12, padding: '12px', fontSize: 14, fontFamily: 'var(--font-sans)', resize: 'none', outline: 'none', boxSizing: 'border-box' }}
          />
          <div style={{ fontSize: 12, color: MUT, marginTop: 8, marginBottom: 20 }}>Rachel sees your note with the cost to the club. You will hear back in the app. You can ask once a term.</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button onClick={() => onNav?.('PRM4-CoachOff')} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button onClick={handleSend} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send to Rachel</button>
          </div>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 20, padding: '32px', width: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 8 }}>Note sent to Rachel</div>
          <div style={{ fontSize: 14, color: MUT, marginBottom: 24 }}>Rachel sees your note with the cost to the club. You will hear back in the app. You can ask once a term.</div>
          <button onClick={() => onNav?.('PRM4-CoachOff')} style={{ height: 44, padding: '0 32px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }} role="status">{toast}</div>
      )}
    </div>
  )
}
