import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function OBSignUp(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 32px', display: 'flex', alignItems: 'center', background: G }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
        <div style={{ width: 540, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: G, marginBottom: 8 }}>Welcome</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Set up Clean Sheet for your team</div>
            <div style={{ fontSize: 16, color: MUT, lineHeight: '24px' }}>Takes about 3 minutes. You'll need your team's age group and division.</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5', text: 'Your account and children check' },
              { icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z', text: 'Team and division' },
              { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', text: 'Invite your coaching staff' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: '#fff', border: `1px solid ${LN}`, borderRadius: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d={step.icon} />
                  </svg>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{step.text}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => st('Continuing with Google.')} style={{ flex: 1, height: 52, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={LN} strokeWidth="1.5"/><path d="M15.5 8.5a3 3 0 00-6 0v2h6V8.5z" fill="#4285f4"/><rect x="6.5" y="10.5" width="11" height="8" rx="1" fill="#4285f4"/></svg>
              Continue with Google
            </button>
            <button onClick={() => st('Continuing with Apple.')} style={{ flex: 1, height: 52, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer' }}>Continue with Apple</button>
          </div>

          <div style={{ textAlign: 'center' as const, fontSize: 14, color: MUT }}>or</div>

          <button onClick={() => st('Continuing with email.')} style={{ width: '100%', height: 52, borderRadius: 12, border: 0, background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Continue with email →
          </button>

          <div style={{ textAlign: 'center' as const, fontSize: 13, color: MUT }}>Already have an account? <span style={{ color: G, fontWeight: 600 }}>Sign in</span></div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
