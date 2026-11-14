import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FILp3ParentForm({ onBack, onNav }: {
  onBack?: () => void
  onNav?: (s: string) => void
}) {
  const [kitSize1, setKitSize1] = useState<string | null>(null)
  const [kitSize2, setKitSize2] = useState<string | null>(null)
  const [dietary, setDietary] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [savedLater, setSavedLater] = useState(false)

  if (submitted) {
    return (
      <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>All done!</div>
        <div style={{ fontSize: 14, color: MUT }}>Thanks. Sam has Mia's sizes.</div>
      </div>
    )
  }

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 10, minHeight: 60, flexShrink: 0 }}>
        <button aria-label="Back" onClick={() => onNav?.('FILp1-ParentFiles') ?? onBack?.()}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   minWidth: 44, minHeight: 44, flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U12 Sam · form</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Kit sizes and photo day</div>
        </div>
        <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKp2-PhoneAskOpen')}
          style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                   display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
        </div>
      </div>

      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        <div style={{ fontSize: 12, color: G, fontWeight: 600, marginBottom: 12, padding: '8px 12px', background: PALE, borderRadius: 10 }}>
          2 of 4 answered. You can finish later; closes Fri 12 June.
        </div>

        {/* Q1: shirt size */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>1. What size shirt for Mia?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {['S', 'M', '8', '10', '12', '14'].map(s => (
              <button key={s} onClick={() => setKitSize1(s)}
                style={{ height: 44, borderRadius: 10, border: `1.5px solid ${kitSize1 === s ? G : LN}`, background: kitSize1 === s ? PALE : '#fff', fontSize: 15, fontWeight: kitSize1 === s ? 700 : 400, color: kitSize1 === s ? G : INK, cursor: 'pointer', fontFamily: 'inherit' }}>
                {s}
              </button>
            ))}
          </div>
          {kitSize1 && <div style={{ fontSize: 12, color: G, marginTop: 8 }}>Last year: 10</div>}
        </div>

        {/* Q2: shorts size */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>2. What size shorts?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {['S', 'M', '8', '10', '12', '14'].map(s => (
              <button key={s} onClick={() => setKitSize2(s)}
                style={{ height: 44, borderRadius: 10, border: `1.5px solid ${kitSize2 === s ? G : LN}`, background: kitSize2 === s ? PALE : '#fff', fontSize: 15, fontWeight: kitSize2 === s ? 700 : 400, color: kitSize2 === s ? G : INK, cursor: 'pointer', fontFamily: 'inherit' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Q3: dietary */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>3. Any dietary needs at presentation lunch?</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Leave blank if none</div>
          <textarea value={dietary} onChange={e => setDietary(e.target.value)} placeholder="e.g. vegetarian, no nuts" style={{ width: '100%', height: 72, border: `1.5px solid ${LN}`, borderRadius: 10, padding: '10px', fontSize: 14, fontFamily: 'inherit', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Q4: photo day */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>4. Team photo on Sat 20 June?</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>You said yes to team photos in March, so Mia is in. Change it in Consent.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{ label: 'Yes', val: true }, { label: 'No', val: false }].map(({ label }) => (
              <div key={label} style={{ height: 44, borderRadius: 10, border: `1.5px solid ${LN}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: INK }}>
                {label}
              </div>
            ))}
          </div>
        </div>

        {savedLater && (
          <div style={{ background: PALE, borderRadius: 10, padding: '10px 14px', marginBottom: 10, fontSize: 13, color: G, fontWeight: 600 }}>
            Saved. We will remind you on Thursday.
          </div>
        )}

        <button onClick={() => setSubmitted(true)}
          style={{ width: '100%', minHeight: 50, borderRadius: 14, background: G, color: '#fff', border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 10 }}>
          Send
        </button>
        <button onClick={() => setSavedLater(true)}
          style={{ width: '100%', minHeight: 44, borderRadius: 14, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>
          Finish later
        </button>
      </div>
    </div>
  )
}
