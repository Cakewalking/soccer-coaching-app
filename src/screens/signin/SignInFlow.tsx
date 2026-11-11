import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', PALE = '#eef5f2'
const BG = '#f5f6f4'

type SIState = 'email' | 'code' | 'wrong' | 'expired' | 'toomany' | 'newdevice' | 'signedout'

interface Props {
  initialState?: SIState
  phone?: boolean
  onDemo?: () => void
  onBack?: () => void
}

function AuthShell({ children, phone }: { children: React.ReactNode; phone?: boolean }) {
  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: phone ? '0 20px' : '0 32px', height: 56 }}>
        <span style={{ color: G, fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button style={{ background: 'none', border: 'none', color: G, fontWeight: 600, fontSize: 14, cursor: 'pointer', padding: 0 }}>Help</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: phone ? '32px 20px 40px' : '48px 20px 60px' }}>
        {children}
      </div>
    </div>
  )
}

const CARD_STYLE: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #d4d6d4',
  borderRadius: 16,
  padding: '36px 40px',
  width: 540,
  maxWidth: '100%',
  boxSizing: 'border-box',
}

const PHONE_CARD: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #d4d6d4',
  borderRadius: 0,
  padding: 0,
  width: '100%',
  maxWidth: 390,
  minHeight: 'calc(100vh - 56px)',
  boxSizing: 'border-box',
}

const BTN_GREEN: React.CSSProperties = {
  width: '100%', height: 52, borderRadius: 12, border: 0,
  background: GD, color: '#fff', fontFamily: 'inherit',
  fontSize: 15, fontWeight: 700, cursor: 'pointer',
}

const LINK: React.CSSProperties = {
  background: 'none', border: 'none', color: G, fontFamily: 'inherit',
  fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: 0,
}

const LABEL: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
  textTransform: 'uppercase', color: MUT, marginBottom: 6, display: 'block',
}

const INPUT: React.CSSProperties = {
  width: '100%', height: 52, borderRadius: 10,
  border: '1.5px solid #c5c8c4', padding: '0 14px',
  fontFamily: 'inherit', fontSize: 15, color: INK,
  background: '#fff', outline: 'none', boxSizing: 'border-box',
  display: 'block',
}

const DEMO_DIGITS = ['4', '8', '2', '9', '1', '5']
const WRONG_DIGITS = ['4', '8', '2', '9', '5', '1']
const NEW_DEV_DIGITS = ['3', '0', '7', '', '', '']

function CodeBoxes({ digits, greyed }: { digits: string[]; greyed?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 8, margin: '20px 0' }}>
      {digits.map((d, i) => (
        <div key={i} style={{
          flex: 1, height: 64, minWidth: 0,
          border: `1.5px solid ${greyed ? '#d4d6d4' : (d ? '#c5c8c4' : '#c5c8c4')}`,
          borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 700, color: greyed ? '#a8b0ae' : INK,
          background: greyed ? '#f5f6f4' : '#fff', boxSizing: 'border-box',
        }}>{d}</div>
      ))}
    </div>
  )
}

function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 10, background: '#f5f5f3', borderRadius: 10, padding: '12px 14px', margin: '12px 0' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 2 }}>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <span style={{ fontSize: 14, color: INK, lineHeight: 1.5 }}>{children}</span>
    </div>
  )
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 10, background: PALE, borderRadius: 10, padding: '12px 14px', margin: '12px 0' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 2 }}>
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span style={{ fontSize: 14, color: INK, lineHeight: 1.5 }}>{children}</span>
    </div>
  )
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 52, height: 52, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
      {children}
    </div>
  )
}

export default function SignInFlow({ initialState = 'email', phone, onDemo, onBack }: Props) {
  const [state, setState] = useState<SIState>(initialState)
  const [email, setEmail] = useState('sam@example.com')

  const phone_w = phone ? PHONE_CARD : CARD_STYLE
  const p = phone ? { padding: '28px 20px' } : {}

  function card(content: React.ReactNode) {
    return (
      <AuthShell phone={phone}>
        <div style={{ ...phone_w, ...p }}>{content}</div>
      </AuthShell>
    )
  }

  if (state === 'email' || state === 'signedout') {
    const isSignedOut = state === 'signedout'
    return card(
      <>
        {isSignedOut && (
          <IconCircle>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </IconCircle>
        )}
        <h1 style={{ margin: '0 0 8px', fontSize: phone ? 26 : 28, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>
          {isSignedOut ? 'You\'ve been signed out' : 'Sign in'}
        </h1>
        {isSignedOut ? (
          <p style={{ margin: '0 0 20px', fontSize: 15, color: MUT, lineHeight: 1.5 }}>
            This tablet hadn't been used for 30 days, so we signed you out. Nothing was lost.
          </p>
        ) : (
          <p style={{ margin: '0 0 20px', fontSize: 15, color: MUT }}>
            We email you a code. There's no password to remember.
          </p>
        )}
        <label style={LABEL}>YOUR EMAIL</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="sam@example.com"
          style={{ ...INPUT, marginBottom: 14 }}
        />
        <button style={BTN_GREEN} onClick={() => setState('code')}>Email me a code</button>
        {!isSignedOut && !phone && (
          <>
            <div style={{ height: 1, background: '#e8e9e7', margin: '20px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button style={LINK}>New here? Set up your team</button>
              <button style={{ ...LINK, textAlign: 'right' }} onClick={onDemo}>Just looking? Try the demo</button>
            </div>
            <p style={{ margin: '16px 0 0', fontSize: 13, color: MUT, lineHeight: 1.5 }}>
              Invited by a coach or your club? Use the link in your invite instead. It signs you in and puts you in the right team.
            </p>
          </>
        )}
        {isSignedOut && (
          <p style={{ margin: '16px 0 0', fontSize: 13, color: MUT, lineHeight: 1.5 }}>
            Shared tablet at the club? Signing out after training keeps players' details private. You can also sign out of every device from Settings › Privacy.
          </p>
        )}
        {onBack && (
          <div style={{ marginTop: 20 }}>
            <button style={LINK} onClick={onBack}>← Back to sign up</button>
          </div>
        )}
        {phone && !isSignedOut && (
          <>
            <p style={{ margin: '16px 0 0', fontSize: 13, color: MUT, lineHeight: 1.5 }}>
              Invited by a coach or your club? Use the link in your invite instead.
            </p>
            <div style={{ height: 1, background: '#e8e9e7', margin: '32px 0 20px' }} />
            <button style={{ ...LINK, display: 'block', marginBottom: 20 }}>New here? Join with an invite</button>
            <button style={{ ...LINK, display: 'block' }} onClick={onDemo}>Just looking? Try the demo</button>
          </>
        )}
      </>
    )
  }

  if (state === 'code' || state === 'wrong') {
    const isWrong = state === 'wrong'
    const digits = isWrong ? WRONG_DIGITS : DEMO_DIGITS
    return card(
      <>
        <h1 style={{ margin: '0 0 10px', fontSize: phone ? 26 : 28, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>
          Check your email
        </h1>
        <p style={{ margin: '0 0 4px', fontSize: 15, color: MUT }}>
          We sent a 6-digit code to <strong style={{ color: INK }}>{email}</strong>.{' '}
          {!isWrong && !phone && 'It works for 10 minutes.'}
          {!isWrong && phone && 'It works for 10 minutes.'}
        </p>
        <CodeBoxes digits={digits} />
        {isWrong && (
          <WarnBox>
            <strong>That code isn't right.</strong> {phone ? 'Type it again. 2 tries left.' : 'Check the email and type it again. 2 tries left.'}
          </WarnBox>
        )}
        <button style={{ ...BTN_GREEN, marginTop: isWrong ? 4 : 0 }} onClick={() => setState('code')}>Sign in</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <button style={LINK} onClick={() => setState('expired')}>Send a new code</button>
          {!phone && <button style={LINK} onClick={() => setState('email')}>Use a different email</button>}
        </div>
        {phone && (
          <button style={{ ...LINK, display: 'block', marginTop: 16 }} onClick={() => setState('email')}>Use a different email</button>
        )}
        {!isWrong && (
          <p style={{ margin: phone ? '24px 0 0' : '16px 0 0', fontSize: 13, color: MUT }}>
            Nothing there? Look in junk or spam.{phone ? '' : ' The email comes from Clean Sheet.'}
          </p>
        )}
        {phone && !isWrong && (
          <p style={{ position: 'absolute', bottom: 20, left: 20, right: 20, fontSize: 13, color: MUT, textAlign: 'center' }}>
            Codes run out after 10 minutes. If yours has, ask for a new one.
          </p>
        )}
        {/* Demo nav buttons to explore other states */}
        {!phone && (
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #f0f1f0', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button style={{ ...LINK, fontSize: 12, color: '#8fa09b' }} onClick={() => setState('wrong')}>→ wrong code</button>
            <button style={{ ...LINK, fontSize: 12, color: '#8fa09b' }} onClick={() => setState('expired')}>→ expired</button>
            <button style={{ ...LINK, fontSize: 12, color: '#8fa09b' }} onClick={() => setState('toomany')}>→ too many</button>
            <button style={{ ...LINK, fontSize: 12, color: '#8fa09b' }} onClick={() => setState('newdevice')}>→ new device</button>
            <button style={{ ...LINK, fontSize: 12, color: '#8fa09b' }} onClick={() => setState('signedout')}>→ signed out</button>
          </div>
        )}
      </>
    )
  }

  if (state === 'expired') {
    return card(
      <>
        <h1 style={{ margin: '0 0 10px', fontSize: phone ? 26 : 28, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>
          That code has run out
        </h1>
        <p style={{ margin: '0 0 4px', fontSize: 15, color: MUT }}>
          Codes work for 10 minutes. This one was sent at 5:12 pm.
        </p>
        <CodeBoxes digits={DEMO_DIGITS} greyed />
        <button style={{ ...BTN_GREEN, marginTop: 4 }} onClick={() => setState('code')}>Send a new code</button>
        <div style={{ marginTop: 16 }}>
          <button style={LINK} onClick={() => setState('email')}>Use a different email</button>
        </div>
      </>
    )
  }

  if (state === 'toomany') {
    return card(
      <>
        <IconCircle>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </IconCircle>
        <h1 style={{ margin: '0 0 10px', fontSize: phone ? 26 : 28, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>
          Too many tries
        </h1>
        <p style={{ margin: '0 0 4px', fontSize: 15, color: MUT, lineHeight: 1.5 }}>
          To keep the account safe, wait 15 minutes. Then ask for a new code.
        </p>
        <InfoBox>You can try again at <strong>5:31 pm</strong>.</InfoBox>
        <p style={{ margin: '12px 0 16px', fontSize: 14, color: MUT, lineHeight: 1.5 }}>
          Don't use that email any more? Ask your coach or your club to change it. They can do it from Team staff or Players.
        </p>
        <button style={LINK} onClick={() => setState('email')}>Back to sign in</button>
      </>
    )
  }

  if (state === 'newdevice') {
    return card(
      <>
        <h1 style={{ margin: '0 0 10px', fontSize: phone ? 26 : 28, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>
          One more step on a new device
        </h1>
        <p style={{ margin: '0 0 4px', fontSize: 15, color: MUT, lineHeight: 1.5 }}>
          You haven't signed in on this tablet before. We texted a second code to the mobile ending <strong style={{ color: INK }}>482</strong>.
        </p>
        <CodeBoxes digits={NEW_DEV_DIGITS} />
        <button style={BTN_GREEN}>Finish signing in</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <button style={LINK}>Text it again</button>
          <button style={LINK}>I've changed my number</button>
        </div>
        <p style={{ margin: '16px 0 0', fontSize: 13, color: MUT, lineHeight: 1.5 }}>
          You asked for this in Settings › Account. You can turn it off there.
        </p>
      </>
    )
  }

  return null
}
