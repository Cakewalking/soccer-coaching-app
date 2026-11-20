import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const STEPS = ['Your account', 'Children check', 'Team setup', 'Invite staff', 'Done']
const STEP_BODY = [
  { title: 'Create your account', desc: 'Your details as a coach. Players and parents join separately.' },
  { title: 'Your children check', desc: 'Add your Working with Children Check number, or confirm you hold one.' },
  { title: 'Set up your team', desc: 'Name your team, pick the age group and your home ground.' },
  { title: 'Invite your staff', desc: 'Add an assistant coach and a team manager by email. They join with a link.' },
  { title: "You're all set", desc: 'Your team is ready. Players and parents can join with the team link.' },
]

export default function OB1SignUp(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  const [step, setStep] = useState(0)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0, flex: 1 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: i === step ? '#fff' : 'transparent' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: i === step ? G : i < step ? '#40826d' : 'rgba(255,255,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i < step ? '✓' : i + 1}</div>
                <div style={{ fontSize: 13, fontWeight: i === step ? 700 : 500, color: i === step ? INK : 'rgba(255,255,255,0.7)' }}>{s}</div>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>{STEP_BODY[step].title}</div>
            <div style={{ fontSize: 15, color: MUT }}>{STEP_BODY[step].desc}</div>
          </div>

          {[['First name', 'e.g. Sam'], ['Last name', 'e.g. Kowalski'], ['Email address', 'you@example.com']].map(([label, placeholder]) => (
            <label key={label} style={{ display: 'block' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 4 }}>{label}</div>
              <input placeholder={placeholder} style={{ width: '100%', boxSizing: 'border-box', height: 48, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 14px', fontSize: 16, color: INK, background: '#fff', fontFamily: 'inherit' }} />
            </label>
          ))}

          <label style={{ display: 'block' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 4 }}>Password</div>
            <input type="password" placeholder="At least 8 characters" style={{ width: '100%', boxSizing: 'border-box', height: 48, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 14px', fontSize: 16, color: INK, background: '#fff', fontFamily: 'inherit' }} />
          </label>
        </div>

        <div style={{ width: 340, background: '#fff', borderLeft: `1px solid ${LN}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#7a4b5b', marginBottom: 10 }}>Working with children check</div>
            <div style={{ fontSize: 15, lineHeight: '22px', color: INK, marginBottom: 12 }}>Australian law requires coaches working with under-18s to hold a valid check.</div>
            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginTop: 3, accentColor: G, width: 18, height: 18 }} />
              <span style={{ fontSize: 14, lineHeight: '20px' }}>I have a current Working with Children Check (or state equivalent)</span>
            </label>
          </div>
          <div style={{ background: PALE, borderRadius: 10, padding: '12px 14px', fontSize: 13, lineHeight: '19px', color: MUT }}>
            Wattle Creek FC may ask you to supply your check number separately.
          </div>
        </div>
      </div>

      <div style={{ flex: 'none', height: 68, background: '#fff', borderTop: `1px solid ${LN}`, padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: step === 0 ? '#c5c8c4' : INK, cursor: step === 0 ? 'default' : 'pointer' }}>Back</button>
        {step < STEPS.length - 1
          ? <button onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))} style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{step === STEPS.length - 2 ? 'Finish' : 'Next →'}</button>
          : <button onClick={() => st('Taking you to your Home.')} style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Go to Home</button>}
      </div>
      {toast && <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
