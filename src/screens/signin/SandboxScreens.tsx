import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', PALE = '#eef5f2'
const BG = '#f5f6f4'

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px', height: 56 }}>
        <span style={{ color: G, fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button style={{ background: 'none', border: 'none', color: G, fontWeight: 600, fontSize: 14, cursor: 'pointer', padding: 0 }}>Help</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 20px 60px' }}>
        {children}
      </div>
    </div>
  )
}

function SandboxBar({ daysLeft }: { daysLeft: number }) {
  return (
    <div style={{ background: GD, height: 40, display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between', fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: '#fff', textTransform: 'uppercase' as const }}>
          SANDBOX · {daysLeft} DAYS LEFT
        </div>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
          Your own club, as a <strong style={{ color: '#fff' }}>coach</strong>. {daysLeft} days left. Ends Thursday 18 June.
        </span>
      </div>
      <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>
        Switch to the demo
      </button>
    </div>
  )
}

const CARD: React.CSSProperties = {
  background: '#fff', border: '1px solid #d4d6d4', borderRadius: 16,
  padding: '36px 40px', width: 580, maxWidth: '100%', boxSizing: 'border-box',
}

const BTN_GREEN: React.CSSProperties = {
  height: 52, padding: '0 24px', borderRadius: 12, border: 0,
  background: GD, color: '#fff', fontFamily: 'inherit',
  fontSize: 15, fontWeight: 700, cursor: 'pointer',
}

const BTN_OUTLINE: React.CSSProperties = {
  height: 52, padding: '0 24px', borderRadius: 12,
  border: '1.5px solid #d4d6d4', background: '#fff', color: INK,
  fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer',
}

const LINK: React.CSSProperties = {
  background: 'none', border: 'none', color: G, fontFamily: 'inherit',
  fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: 0,
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 52, height: 52, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
      {children}
    </div>
  )
}

/* SB1 — Sandbox ending warning (shown 2 days before end) */
export function SB1SandboxEnding() {
  const [view, setView] = useState<'ending' | 'keepgoing'>('ending')
  if (view === 'keepgoing') return <SB4KeepGoingInner />
  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)' }}>
      <SandboxBar daysLeft={2} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px', height: 56 }}>
        <span style={{ color: G, fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button style={{ background: 'none', border: 'none', color: G, fontWeight: 600, fontSize: 14, cursor: 'pointer', padding: 0 }}>Help</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px 60px' }}>
        <div style={CARD}>
          <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>
            Your sandbox ends on Thursday
          </h1>
          <p style={{ margin: '0 0 20px', fontSize: 15, color: MUT, lineHeight: 1.5 }}>
            On Thursday 18 June everything you added is deleted. You've set up 1 team, 14 players and 2 sessions.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ border: `2px solid ${GD}`, borderRadius: 12, padding: '20px 20px 16px' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: INK, marginBottom: 6 }}>Keep it</div>
              <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5, marginBottom: 16 }}>Turn it into a real club. What you set up stays.</div>
              <button style={{ ...BTN_GREEN, width: '100%' }} onClick={() => setView('keepgoing')}>Keep my club</button>
            </div>
            <div style={{ border: '1px solid #d4d6d4', borderRadius: 12, padding: '20px 20px 16px' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: INK, marginBottom: 6 }}>Let it end</div>
              <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5, marginBottom: 16 }}>Nothing to do. We delete it and email you once it's gone.</div>
              <button style={{ ...BTN_OUTLINE, width: '100%' }}>Remind me tomorrow</button>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: MUT, lineHeight: 1.5 }}>
            Not ready to decide? You can start a new sandbox with the same email any time.
          </p>
        </div>
      </div>
    </div>
  )
}

/* SB2 — Sandbox has ended */
export function SB2SandboxEnded() {
  return (
    <AuthShell>
      <div style={CARD}>
        <IconCircle>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </IconCircle>
        <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>
          Your sandbox has ended
        </h1>
        <p style={{ margin: '0 0 20px', fontSize: 15, color: MUT, lineHeight: 1.5 }}>
          It ran for 14 days and was deleted on Thursday 18 June, with everything in it. We kept only your email, so you can start again.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <button style={BTN_GREEN}>Start a new sandbox</button>
          <button style={BTN_OUTLINE}>Follow the demo</button>
        </div>
        <button style={{ background: 'none', border: 'none', color: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: 16, display: 'block' }}>
          Ready for the real thing? Set up your club
        </button>
        <p style={{ margin: 0, fontSize: 14, color: MUT, lineHeight: 1.5 }}>
          Want your email removed too? Reply to the email we sent and we'll delete it.
        </p>
      </div>
    </AuthShell>
  )
}

/* SB3 — No sandbox on this device */
export function SB3NoSandbox() {
  const [email, setEmail] = useState('')
  return (
    <AuthShell>
      <div style={{ ...CARD, width: 540 }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>
          No sandbox open on this device
        </h1>
        <p style={{ margin: '0 0 20px', fontSize: 15, color: MUT, lineHeight: 1.5 }}>
          If you've started one, sign in with the same email and it opens here. If you haven't, this starts one.
        </p>
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6, display: 'block' }}>
          YOUR EMAIL
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ width: '100%', height: 52, borderRadius: 10, border: '1.5px solid #c5c8c4', padding: '0 14px', fontFamily: 'inherit', fontSize: 15, color: INK, background: '#fff', outline: 'none', boxSizing: 'border-box', display: 'block', marginBottom: 14 }}
        />
        <button style={{ ...BTN_GREEN, width: '100%', marginBottom: 20 }}>Email me a sign-in code</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={LINK}>Follow the demo instead</button>
          <span style={{ fontSize: 13, color: MUT }}>A sandbox lasts 14 days</span>
        </div>
      </div>
    </AuthShell>
  )
}

/* SB4 — Keep going (make it real) — also used internally from SB1 */
function SB4KeepGoingInner() {
  const [clubName, setClubName] = useState('Wattle Creek FC')
  const [sent, setSent] = useState(false)
  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)' }}>
      <SandboxBar daysLeft={2} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px', height: 56 }}>
        <span style={{ color: G, fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button style={{ background: 'none', border: 'none', color: G, fontWeight: 600, fontSize: 14, cursor: 'pointer', padding: 0 }}>Help</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px 60px' }}>
        <div style={{ ...CARD, width: 620 }}>
          {sent ? (
            <>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Request sent</h1>
              <p style={{ margin: 0, fontSize: 15, color: MUT, lineHeight: 1.5 }}>
                We'll email you within one working day. Your sandbox keeps running while we check.
              </p>
            </>
          ) : (
            <>
              <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Make this your real club</h1>
              <p style={{ margin: '0 0 24px', fontSize: 15, color: MUT }}>Three things change. Everything else stays as you set it up.</p>
              {[
                { label: 'Sample people are removed', sub: 'Anyone with a "Sample" tag goes. Your own players stay' },
                { label: 'Invites and messages send for real', sub: 'Until now they only pretended to. Nothing is sent until you press send again' },
                { label: 'We check who you are', sub: 'Your club name, your role, and a Working with Children Check' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 0', borderTop: i > 0 ? '1px solid #eceeed' : 'none', alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: MUT }}>{item.sub}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6, display: 'block' }}>CLUB NAME</label>
                <input
                  value={clubName}
                  onChange={e => setClubName(e.target.value)}
                  style={{ width: '100%', height: 52, borderRadius: 10, border: '1.5px solid #c5c8c4', padding: '0 14px', fontFamily: 'inherit', fontSize: 15, color: INK, background: '#fff', outline: 'none', boxSizing: 'border-box', display: 'block', marginBottom: 20 }}
                />
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <button style={BTN_GREEN} onClick={() => setSent(true)}>Make it real</button>
                <button style={BTN_OUTLINE}>Not yet</button>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: MUT, lineHeight: 1.5 }}>
                We'll confirm what Clean Sheet costs your club before anything is charged. Your sandbox keeps running while we check.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function SB4KeepGoing() {
  return <SB4KeepGoingInner />
}
