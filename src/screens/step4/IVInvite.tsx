import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function IVInvite(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: 844, background: '#fff', fontFamily: 'var(--font-sans)', position: 'relative', overflowY: 'auto', boxSizing: 'border-box' }}>

      {/* Logo */}
      <div style={{ padding: '20px 20px 0' }}>
        <span style={{ fontSize: 21, fontWeight: 700, color: GD }}>Clean Sheet</span>
      </div>

      {/* Hero */}
      <div style={{ padding: '32px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>WC</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: INK, marginTop: 4 }}>Wattle Creek FC</div>
        <div style={{ fontSize: 14, color: MUT }}>invites you to join as</div>
        <div style={{ background: G, color: '#fff', borderRadius: 20, padding: '5px 16px', fontSize: 15, fontWeight: 700 }}>
          Manager · U12 Sam
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Invited by */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#d6b896', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: '#6b4c2a' }}>SK</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Invited by Sam K, head coach</div>
            <div style={{ fontSize: 13, color: MUT }}>Wattle Creek FC · U12 Sam</div>
          </div>
        </div>

        {/* Your role */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.08em', marginBottom: 12 }}>YOUR ROLE</div>
          {[
            'Post announcements to families',
            'Manage the team roster and fixtures',
            'Handle canteen and volunteer rosters',
            'Message families privately',
            'See attendance and availability',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill={PALE} />
                <path d="M5 9l3 3 5-5" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 14, color: INK }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 16, marginTop: 1 }}>🔒</span>
          <span style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>
            No parent phone numbers are shared. Everything stays inside the app.
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 32, marginTop: 4 }}>
          <button
            onClick={() => t('Opening account setup...')}
            style={{ width: '100%', padding: '15px 0', background: G, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
          >
            Create your account
          </button>
          <button
            onClick={() => t('Sign in...')}
            style={{ width: '100%', padding: '15px 0', background: '#fff', color: G, border: `2px solid ${G}`, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
          >
            I already have an account
          </button>
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
