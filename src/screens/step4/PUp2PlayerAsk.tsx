import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PUp2PlayerAsk() {
  const [feeling, setFeeling] = useState<'yes' | 'maybe' | 'no' | null>(null)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, fontSize: 32 }}>⚽</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>
          {feeling === 'no' ? 'All good — no worries.' : 'Thanks, Mia!'}
        </div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>
          {feeling === 'yes' ? 'Rachel and Sam will work out the next step and your parents will hear about it too.' : feeling === 'maybe' ? 'Rachel will talk with you and your family before anything happens.' : 'Nothing changes. This stays between you and Rachel.'}
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }}>
      <div style={{ background: GD, padding: '32px 24px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>From Rachel · just for you</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 8 }}>Hi Mia 👋</div>
      </div>

      <div style={{ flex: 1, padding: '24px 20px', overflowY: 'auto' }}>
        <div style={{ fontSize: 15, color: INK, lineHeight: 1.7, marginBottom: 24 }}>
          Sam and I think you're doing really well and might enjoy training with the under 13 girls sometimes. Your parents have already said they're happy to hear more.
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Do you know anyone in that team?</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Isla Chen', 'Zoe Park', 'Grace Reid', 'Priya Shah'].map(name => (
              <div key={name} style={{ height: 32, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, display: 'flex', alignItems: 'center' }}>{name}</div>
            ))}
            <div style={{ height: 32, padding: '0 12px', borderRadius: 999, background: PALE, border: `1.5px solid ${G}`, fontSize: 13, color: G, fontWeight: 700, display: 'flex', alignItems: 'center' }}>Isla Chen +2</div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>How do you feel about giving it a try?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { key: 'yes' as const, emoji: '😊', label: "I'd like to try it" },
              { key: 'maybe' as const, emoji: '🤔', label: "Maybe — can I find out more first?" },
              { key: 'no' as const, emoji: '😕', label: "Not for me right now" },
            ].map(o => (
              <button key={o.key} onClick={() => setFeeling(o.key)} style={{ width: '100%', height: 56, borderRadius: 14, border: `1.5px solid ${feeling === o.key ? G : LN}`, background: feeling === o.key ? PALE : '#fff', fontSize: 15, color: feeling === o.key ? G : INK, fontWeight: feeling === o.key ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', paddingLeft: 20, gap: 12 }}>
                <span style={{ fontSize: 20 }}>{o.emoji}</span>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => { if (feeling) setSubmitted(true) }} disabled={!feeling} style={{ width: '100%', height: 50, borderRadius: 14, background: feeling ? G : '#c8d4d0', color: '#fff', border: 'none', fontSize: 16, fontWeight: 700, cursor: feeling ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
          {feeling ? 'Send to Rachel' : 'Pick one above first'}
        </button>

        <div style={{ marginTop: 16, fontSize: 12, color: MUT, textAlign: 'center', lineHeight: 1.6 }}>
          No is completely fine. It's private — only you and Rachel.
        </div>
      </div>
    </div>
  )
}
