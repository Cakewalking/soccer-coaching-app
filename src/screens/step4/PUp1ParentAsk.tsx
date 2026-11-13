import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PUp1ParentAsk() {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  if (answer !== null) {
    return (
      <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: answer === 'yes' ? PALE : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={answer === 'yes' ? G : '#c05'} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>
          {answer === 'yes' ? 'Thanks! Rachel will be in touch.' : 'No worries at all.'}
        </div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>
          {answer === 'yes'
            ? 'If you say yes and Mia says yes too, Rachel will tell you the next step. Nothing happens until everyone agrees.'
            : 'This stays between you and Rachel. No one else is told.'}
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }}>
      <div style={{ background: GD, padding: '32px 24px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>From Rachel Moore · Director of football</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 8 }}>An idea for Mia</div>
      </div>

      <div style={{ flex: 1, padding: '24px 20px', overflowY: 'auto' }}>
        <div style={{ fontSize: 15, color: INK, lineHeight: 1.7, marginBottom: 24 }}>
          Hi — I'm reaching out because Sam and I have noticed that Mia is doing really well in U12 and might enjoy a bigger challenge.
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>What we're thinking</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>
            An idea for Mia to train with the under 13 girls a few times and see how she gets on. She would stay in U12 Sam and play her own games as normal. It's just an idea — nothing happens unless Mia and you are both happy.
          </div>
        </div>
        <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>
            Mia is an under 12. This would be training with the under 13s, which is one age group up. It's a try, not a move. She stays her age in every other way.
          </div>
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>Would you like to hear more?</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => { setAnswer('yes'); st('') }} style={{ width: '100%', height: 50, borderRadius: 14, background: G, color: '#fff', border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Yes, tell me more</button>
          <button onClick={() => { setAnswer('no'); st('') }} style={{ width: '100%', height: 50, borderRadius: 14, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 16, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Not for us, thanks</button>
        </div>

        <div style={{ marginTop: 20, fontSize: 12, color: MUT, lineHeight: 1.6, textAlign: 'center' }}>
          No is completely fine. It stays private — nobody else is told.
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
