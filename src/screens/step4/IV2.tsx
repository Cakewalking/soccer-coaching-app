import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type WWCStatus = 'have' | 'inprogress' | 'noneyet'

export default function IV2(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [status, setStatus] = useState<WWCStatus>('have')
  const [state, setState] = useState<string>('VIC')

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const states = ['VIC', 'NSW', 'QLD', 'WA']

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', fontFamily: 'var(--font-sans)', position: 'relative', overflowY: 'auto', boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '18px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Clean Sheet</span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>2 of 3</span>
      </div>

      <div style={{ padding: '28px 20px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>Working with children check</div>
      </div>

      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Why we ask */}
        <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${LN}`, padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Why we ask</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.55 }}>
            Everyone who works with kids at Wattle Creek FC needs a current WWC check. Sam K asked us to verify yours.
          </div>
        </div>

        {/* Radio options */}
        <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${LN}`, overflow: 'hidden' }}>
          {([
            ['have', 'I have a current WWC check'],
            ['inprogress', 'My check is in progress'],
            ['noneyet', "I don't have one yet"],
          ] as [WWCStatus, string][]).map(([val, label], i) => (
            <label
              key={val}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: i === 0 ? 'none' : `1px solid ${LN}`, cursor: 'pointer' }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: '50%', border: `2px solid ${status === val ? G : LN}`,
                background: status === val ? G : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {status === val && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}
              </div>
              <span style={{ fontSize: 15, color: INK, fontWeight: status === val ? 600 : 400 }}>{label}</span>
              <input type="radio" name="wwc" value={val} checked={status === val} onChange={() => setStatus(val)} style={{ display: 'none' }} />
            </label>
          ))}
        </div>

        {/* Conditional content */}
        {status === 'have' && (
          <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${LN}`, overflow: 'hidden' }}>
            {/* WWC number */}
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MUT, marginBottom: 6, letterSpacing: '0.03em' }}>Your WWC number</div>
              <input
                defaultValue="WWC1234567A"
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: 16, color: INK, background: 'transparent', boxSizing: 'border-box' }}
              />
            </div>
            {/* State chips */}
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MUT, marginBottom: 10, letterSpacing: '0.03em' }}>State</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {states.map(s => (
                  <button
                    key={s}
                    onClick={() => setState(s)}
                    style={{
                      padding: '7px 14px', borderRadius: 20, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                      border: `1.5px solid ${state === s ? G : LN}`,
                      background: state === s ? G : '#fff',
                      color: state === s ? '#fff' : MUT,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info boxes */}
        {status === 'have' && (
          <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
            <span style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>
              Your number is checked against the register. Sam K is told it's valid — not the number itself.
            </span>
          </div>
        )}
        {status === 'inprogress' && (
          <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
            <span style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>
              Let us know when it arrives. You can still set up your account.
            </span>
          </div>
        )}
        {status === 'noneyet' && (
          <div style={{ background: '#fff3f0', borderRadius: 12, padding: '12px 14px', border: '1px solid #f5c5bb' }}>
            <span style={{ fontSize: 13, color: '#8b3a2a', lineHeight: 1.5 }}>
              Sam K will be told you need one before you can be added as a team manager.
            </span>
          </div>
        )}

        {/* Continue */}
        <button
          onClick={() => t('Check verified. One more step.')}
          style={{ width: '100%', padding: '15px 0', background: G, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 4, marginBottom: 32 }}
        >
          Continue
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', zIndex: 999 }}>
          {toast}
        </div>
      )}
    </div>
  )
}
