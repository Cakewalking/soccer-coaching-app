import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function IV1(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', fontFamily: 'var(--font-sans)', position: 'relative', overflowY: 'auto', boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '18px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Clean Sheet</span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>1 of 3</span>
      </div>

      <div style={{ padding: '28px 20px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>Create your account</div>
        <div style={{ fontSize: 14, color: MUT, marginTop: 5 }}>Takes about 2 minutes.</div>
      </div>

      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Form card */}
        <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${LN}`, overflow: 'hidden' }}>
          {/* Name field */}
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: MUT, marginBottom: 6, letterSpacing: '0.03em' }}>Your name</div>
            <input
              defaultValue="Rob Owusu"
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: 16, color: INK, background: 'transparent', boxSizing: 'border-box' }}
            />
          </div>
          {/* Email field */}
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: MUT, marginBottom: 6, letterSpacing: '0.03em' }}>Email</div>
            <input
              defaultValue="rob.owusu@email.com"
              type="email"
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: 16, color: INK, background: 'transparent', boxSizing: 'border-box' }}
            />
          </div>
          {/* Password field */}
          <div style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: MUT, marginBottom: 6, letterSpacing: '0.03em' }}>Create a password</div>
            <input
              defaultValue="••••••••••"
              type="password"
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: 16, color: INK, background: 'transparent', boxSizing: 'border-box' }}
            />
            <div style={{ fontSize: 12, color: MUT, marginTop: 5 }}>Use 8 or more characters</div>
          </div>
        </div>

        {/* Privacy note */}
        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 16, marginTop: 1 }}>🔒</span>
          <span style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>
            We never sell your data or show ads.
          </span>
        </div>

        {/* Continue button */}
        <button
          onClick={() => t('Account created. Next: WWC check.')}
          style={{ width: '100%', padding: '15px 0', background: G, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 4 }}
        >
          Continue
        </button>

        {/* Legal */}
        <div style={{ textAlign: 'center', fontSize: 12, color: MUT, paddingBottom: 32, lineHeight: 1.5 }}>
          By continuing you agree to the{' '}
          <span style={{ color: G, fontWeight: 600 }}>Terms</span>
          {' '}and{' '}
          <span style={{ color: G, fontWeight: 600 }}>Privacy policy</span>.
        </div>
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
