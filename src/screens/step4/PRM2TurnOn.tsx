import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM2TurnOn({ onClose, onConfirm }: { onClose?: () => void; onConfirm?: () => void }) {
  const [agreed, setAgreed] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,33,30,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: 480, background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        {/* Header */}
        <div style={{ background: GD, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', marginBottom: 2 }}>ADD-ON · LIVE GAME HELP</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Turn on for U14 Josh</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>

        <div style={{ padding: '24px' }}>
          {/* What you get */}
          <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 8 }}>What this turns on</div>
            {[
              'Suggested substitutions during games',
              'Shape and formation nudges in real time',
              'Fatigue flags for players on the pitch',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: 8, padding: '4px 0' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}><polyline points="20 6 9 17 4 12"/></svg>
                <div style={{ fontSize: 13, color: INK }}>{item}</div>
              </div>
            ))}
          </div>

          {/* Cost */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Live game help · U14 Josh</div>
                <div style={{ fontSize: 12, color: MUT }}>Billed monthly · cancel anytime</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>$10 <span style={{ fontSize: 13, fontWeight: 400, color: MUT }}>/mo</span></div>
            </div>
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 12, color: MUT }}>New monthly total</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>$394 / month</div>
            </div>
          </div>

          {/* Not for rule */}
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.5 }}>Live game help is not available for MiniRoos or any team under 10. U14 Josh qualifies.</div>
          </div>

          {/* Agree */}
          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 20, cursor: 'pointer' }}>
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 2, width: 16, height: 16, cursor: 'pointer' }} />
            <div style={{ fontSize: 13, color: INK, lineHeight: 1.5 }}>I understand this adds $10/month to the club's bill, charged to Rachel Moore's payment method.</div>
          </label>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, height: 44, borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Not now</button>
            <button onClick={() => { onConfirm?.(); st('Live game help is now on for U14 Josh.') }} style={{ flex: 2, height: 44, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Turn on, $15 a month</button>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
