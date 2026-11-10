import { useState } from 'react'

const GD = '#1f4a3e', G = '#2f6252', INK = '#10211f', MUT = '#4a5a57'

type JoinStep =
  | 'landing'           // JN  — who's joining?
  | 'parent-create'     // JN1 — create parent account
  | 'parent-child'      // JN2 — confirm child
  | 'parent-firstaid'   // JN8 — first-aid card
  | 'parent-setup'      // JN4 — set up Mia's app
  | 'parent-done'       // JN5 — you're in
  | 'player-age'        // JN6 — player age check
  | 'player-code'       // JN7 — enter code
  | 'player-18'         // JN9a — 18+ own account

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.65)', fontFamily: 'inherit', fontSize: 14, padding: '0 0 16px' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      Back
    </button>
  )
}

function FieldRow({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: INK, marginBottom: 5 }}>{label}</label>
      <input readOnly placeholder={placeholder} style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #d4d7d4', padding: '0 14px', fontFamily: 'inherit', fontSize: 15, color: INK, boxSizing: 'border-box', background: '#fff' }} />
    </div>
  )
}

export default function JoinFlow({ initialStep = 'landing' }: { initialStep?: JoinStep; onDone?: () => void }) {
  const [step, setStep] = useState<JoinStep>(initialStep)
  const [playerAge, setPlayerAge] = useState<number | null>(null)
  const [codeDigits, setCodeDigits] = useState(['4', '8', '2', '9', '1', '3'])
  const [firstAidChecks, setFirstAidChecks] = useState<string[]>([])
  const [consent18, setConsent18] = useState({ film: true, boots: true, clips: true, checkin: true, club: false, firstaid: true })

  /* ── JN: Landing ── */
  if (step === 'landing') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: GD, minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ padding: '52px 24px 24px', flexGrow: 1 }}>
          <div style={{ width: 48, height: 48, borderRadius: '999px', background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#c3e6d4' }}>WC</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>
            Sam K invited you to U12 Sam
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 32, lineHeight: 1.5 }}>
            Wattle Creek FC · one of 2 U12 teams · Mixed · 9 a side · training Tue and Thu
          </div>

          <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginBottom: 14 }}>Who's joining?</div>

          <button onClick={() => setStep('parent-create')} style={{ width: '100%', textAlign: 'left', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14, padding: '16px 18px', cursor: 'pointer', marginBottom: 10, fontFamily: 'inherit' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>I'm a parent or carer</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Add your child, give consent, see their progress</div>
          </button>

          <button onClick={() => setStep('player-age')} style={{ width: '100%', textAlign: 'left', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14, padding: '16px 18px', cursor: 'pointer', marginBottom: 24, fontFamily: 'inherit' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>I'm a player</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Check in, see your goals and your clips</div>
          </button>

          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 20 }}>
            Players under 15 join through a parent. Coaches never message a player without their parent copied in.
          </div>

          <button style={{ border: 0, background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)', padding: 0 }}>
            Invited as a coach, team manager or fitness coach? Open your staff invite
          </button>
        </div>
      </div>
    )
  }

  /* ── JN1: Create parent account ── */
  if (step === 'parent-create') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: GD, padding: '52px 24px 20px', flexShrink: 0 }}>
          <BackButton onBack={() => setStep('landing')} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Join as a parent</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Create your parent account</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 6, lineHeight: 1.5 }}>
            You'll see your child's goals, clips and game days, and answer "can they make it?".
          </div>
        </div>
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <button style={{ width: '100%', height: 50, borderRadius: '999px', border: '1.5px solid #d4d7d4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>
            Continue with Apple
          </button>
          <button style={{ width: '100%', height: 50, borderRadius: '999px', border: '1.5px solid #d4d7d4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22a10 10 0 100-20 10 10 0 000 20z"/><path d="M15 9h-3v3h3V9zM9 9h3v9H9z"/></svg>
            Continue with Google
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: '#e9eae8' }} />
            <span style={{ fontSize: 13, color: MUT }}>or with email</span>
            <div style={{ flex: 1, height: 1, background: '#e9eae8' }} />
          </div>
          <FieldRow label="Your name" />
          <FieldRow label="Email" />
          <FieldRow label="Mobile" />
          <FieldRow label="Password" />
          <button onClick={() => setStep('parent-child')} style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8, marginBottom: 12 }}>
            Create account
          </button>
          <div style={{ fontSize: 12, color: MUT, textAlign: 'center', lineHeight: 1.5 }}>
            By joining you agree to Wattle Creek FC's privacy policy.
          </div>
        </div>
      </div>
    )
  }

  /* ── JN2: Who's your child? ── */
  if (step === 'parent-child') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: GD, padding: '52px 24px 20px', flexShrink: 0 }}>
          <BackButton onBack={() => setStep('parent-create')} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Join as a parent</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Who's your child?</div>
        </div>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>We found a match on Sam's squad list.</div>

          {/* Match card */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '2px solid #2f6252', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: '999px', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: INK }}>MT</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>Mia Tran</div>
                <div style={{ fontSize: 13, color: MUT }}>U12 Sam · #8 · central midfield</div>
              </div>
            </div>
            <FieldRow label="Mia's date of birth" placeholder="DD / MM / YYYY" />
            <div style={{ fontSize: 12, color: MUT, marginBottom: 14, lineHeight: 1.5 }}>
              Used to put Mia in the right age group. Only coaches see it.
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Your relationship to Mia</label>
              {(['Mum', 'Dad', 'Carer'] as const).map(rel => (
                <button key={rel} style={{ marginRight: 8, height: 36, padding: '0 16px', borderRadius: 20, border: rel === 'Mum' ? '2px solid #2f6252' : '1.5px solid #d4d7d4', background: rel === 'Mum' ? '#eef5f2' : '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: rel === 'Mum' ? 700 : 400, color: rel === 'Mum' ? G : INK, cursor: 'pointer' }}>{rel}</button>
              ))}
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, padding: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
              + Another child in this club
            </button>
          </div>

          <div style={{ fontSize: 13, color: MUT, marginBottom: 20, lineHeight: 1.5 }}>
            Not Mia? Add your child yourself and Sam will confirm.
          </div>

          <button onClick={() => setStep('parent-firstaid')} style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>
            Yes, that's Mia
          </button>
          <div style={{ fontSize: 12, color: MUT, textAlign: 'center' }}>
            Only you and Mia's coaches see her details.
          </div>
        </div>
      </div>
    )
  }

  /* ── JN8: First-aid card ── */
  if (step === 'parent-firstaid') {
    const CONDITIONS = ['Asthma', 'Allergy', 'Epilepsy', 'Diabetes', 'Other']
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: GD, padding: '52px 24px 20px', flexShrink: 0 }}>
          <BackButton onBack={() => setStep('parent-child')} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Join as a parent</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Mia's first-aid card</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 6, lineHeight: 1.5 }}>
            For games and training. Rob, the team manager, sees only this card. Leave out anything you'd rather not share.
          </div>
        </div>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Anything we should know?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {CONDITIONS.map(c => {
              const checked = firstAidChecks.includes(c)
              return (
                <button key={c} onClick={() => setFirstAidChecks(p => checked ? p.filter(x => x !== c) : [...p, c])}
                  style={{ height: 36, padding: '0 14px', borderRadius: 20, border: checked ? '2px solid #2f6252' : '1.5px solid #d4d7d4', background: checked ? '#eef5f2' : '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: checked ? 700 : 400, color: checked ? G : INK, cursor: 'pointer' }}>
                  {c}
                </button>
              )
            })}
            <button style={{ height: 36, padding: '0 14px', borderRadius: 20, border: '1.5px solid #d4d7d4', background: '#fff', fontFamily: 'inherit', fontSize: 14, color: MUT, cursor: 'pointer' }}>
              Nothing to add
            </button>
          </div>
          {firstAidChecks.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: INK, marginBottom: 5 }}>What should we do?</label>
              <textarea rows={3} style={{ width: '100%', borderRadius: 12, border: '1px solid #d4d7d4', padding: '12px 14px', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box', resize: 'none', color: INK }} />
            </div>
          )}
          <FieldRow label="Linh Tran · Mum" placeholder="0412 345 678 · first to call" />
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, padding: '0 0 20px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            Second contact
          </button>
          <button onClick={() => setStep('parent-setup')} style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 12 }}>
            Save card
          </button>
          <div style={{ fontSize: 12, color: MUT, textAlign: 'center', lineHeight: 1.5 }}>
            Only Mia's coaches and Rob see this card. You can change it any time.
          </div>
        </div>
      </div>
    )
  }

  /* ── JN4: Set up Mia's app ── */
  if (step === 'parent-setup') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: GD, padding: '52px 24px 20px', flexShrink: 0 }}>
          <BackButton onBack={() => setStep('parent-firstaid')} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Join as a parent</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Set up Mia's app</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 6, lineHeight: 1.5 }}>
            Mia is under 15, so her account sits inside yours. You see what she sees, except a private note to the club's welfare officer.
          </div>
        </div>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '2px solid #2f6252' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 2 }}>Mia has her own phone or tablet</div>
              <div style={{ fontSize: 13, color: MUT }}>She signs in with a code from you</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1.5px solid #e9eae8' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 2 }}>She'll use my phone</div>
              <div style={{ fontSize: 13, color: MUT }}>Switch to Mia's view from your menu</div>
            </div>
          </div>

          {/* Code */}
          <div style={{ background: GD, borderRadius: 16, padding: '16px 18px', marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>On Mia's phone, get Clean Sheet and tap I'm a player. Then enter:</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
              {codeDigits.map((d, i) => (
                <div key={i} style={{ width: 40, height: 48, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff' }}>{d}</div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              <span>Works for 24 hours</span>
              <button onClick={() => setCodeDigits(['7', '3', '1', '5', '8', '2'])} style={{ border: 0, background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: '#c3e6d4' }}>New code</button>
            </div>
          </div>

          {/* Can/Can't */}
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', marginBottom: 20, border: '1px solid #e9eae8' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9aada9', marginBottom: 8 }}>Mia can</div>
                {['Do her check-in', 'See her goals', 'Watch clips Sam shares with her'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 4 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: 12, color: INK, lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9aada9', marginBottom: 8 }}>Mia can't</div>
                {["Message anyone", "See other players' numbers", "Post or comment"].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 4 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c39797" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    <span style={{ fontSize: 12, color: MUT, lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => setStep('parent-done')} style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>
            Done
          </button>
          <button onClick={() => setStep('parent-done')} style={{ width: '100%', height: 44, borderRadius: '999px', border: 0, background: 'transparent', color: MUT, fontFamily: 'inherit', fontSize: 14, cursor: 'pointer' }}>
            You can set this up later from your menu.
          </button>
        </div>
      </div>
    )
  }

  /* ── JN5: Parent all set ── */
  if (step === 'parent-done') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: GD, padding: '52px 24px 24px', flexShrink: 0 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Join as a parent</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 4 }}>You're in, Linh</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
            Mia is on U12 Sam. Sam can see you've given consent.
          </div>
        </div>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {/* Message preview */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              From Rob, team manager
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>
              Can Mia make it Saturday vs Harbour Rovers?
            </div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>
              Home, pitch 2 · meet 8:40 · kick-off 9:30
            </div>
            <button style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Answer now
            </button>
          </div>

          {/* Checklist */}
          {[
            { label: 'Consent given', done: true },
            { label: 'First-aid card done', done: true },
            { label: "Mia's app set up", done: false },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f0f1f0' }}>
              <div style={{ width: 20, height: 20, borderRadius: '999px', background: item.done ? '#eef5f2' : '#f5f6f4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <span style={{ fontSize: 14, color: item.done ? INK : MUT, fontWeight: item.done ? 600 : 400 }}>{item.label}</span>
            </div>
          ))}

          <button style={{ marginTop: 20, width: '100%', height: 44, borderRadius: '999px', border: '1.5px solid #d4d7d4', background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 10 }}>
            Turn on game-day reminders
          </button>
          <button style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Go to Mia's week
          </button>
          <div style={{ fontSize: 12, color: MUT, textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
            Answer game-day questions any time from your home screen.
          </div>
        </div>
      </div>
    )
  }

  /* ── JN6: Player age check ── */
  if (step === 'player-age') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: GD, padding: '52px 24px 20px', flexShrink: 0 }}>
          <BackButton onBack={() => setStep('landing')} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Join as a player</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Hi! How old are you?</div>
        </div>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
            {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(age => (
              <button key={age} onClick={() => setPlayerAge(age)}
                style={{ height: 52, borderRadius: 12, border: playerAge === age ? '2px solid #2f6252' : '1.5px solid #d4d7d4', background: playerAge === age ? '#eef5f2' : '#fff', fontFamily: 'inherit', fontSize: 18, fontWeight: 700, color: playerAge === age ? G : INK, cursor: 'pointer' }}>
                {age === 18 ? '18+' : age}
              </button>
            ))}
          </div>

          {playerAge !== null && playerAge < 15 && (
            <div style={{ background: '#fff', borderRadius: 16, padding: '20px', border: '1px solid #e9eae8', marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>A parent sets you up first</div>
              <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5, marginBottom: 16 }}>
                Ask a parent or carer to open Sam's invite. They'll give you a 6-digit code to type in here.
              </div>
              <button style={{ width: '100%', height: 44, borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>
                Send the invite to my parent
              </button>
              <button onClick={() => setStep('player-code')} style={{ width: '100%', height: 44, borderRadius: '999px', border: '1.5px solid #d4d7d4', background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                I've got a code
              </button>
            </div>
          )}

          {playerAge !== null && playerAge >= 15 && playerAge < 18 && (
            <button onClick={() => setStep('player-code')} style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              Enter my code →
            </button>
          )}

          {playerAge !== null && playerAge >= 18 && (
            <button onClick={() => setStep('player-18')} style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              Create my own account →
            </button>
          )}
        </div>
      </div>
    )
  }

  /* ── JN7: Player code ── */
  if (step === 'player-code') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: GD, padding: '52px 24px 20px', flexShrink: 0 }}>
          <BackButton onBack={() => setStep('player-age')} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Join as a player</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Type your code</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>
            It's on your parent's phone, under "Set up Mia's app".
          </div>
        </div>
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {/* Code input */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
            {codeDigits.map((d, i) => (
              <div key={i} style={{ width: 44, height: 56, borderRadius: 12, border: '2px solid #2f6252', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: GD }}>{d}</div>
            ))}
          </div>

          {/* Confirmed identity */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '2px solid #2f6252', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '999px', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: INK }}>MT</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>That's you, Mia!</div>
                <div style={{ fontSize: 13, color: MUT }}>U12 Sam · #8 · set up by Linh</div>
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Pick your kit colour</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['#c39797', '#9797c3', '#97c397', '#c3c397', '#97b8c3'].map((col, i) => (
                <button key={i} style={{ width: 36, height: 36, borderRadius: '999px', background: col, border: i === 0 ? '3px solid #1f4a3e' : 'none', cursor: 'pointer' }} />
              ))}
            </div>
          </div>

          <button style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>
            Let's go
          </button>
          <div style={{ fontSize: 12, color: MUT, textAlign: 'center' }}>
            Your parent can see what you see.
          </div>
        </div>
      </div>
    )
  }

  /* ── JN9a: Player 18+ own account ── */
  if (step === 'player-18') {
    type ConsentKey = keyof typeof consent18
    const TOGGLES: { key: ConsentKey; label: string }[] = [
      { key: 'film',     label: 'Film me in games and training' },
      { key: 'boots',    label: 'Boot sensors and GPS vest' },
      { key: 'clips',    label: 'Send me my clips' },
      { key: 'checkin',  label: 'Check-ins and growth checks' },
      { key: 'club',     label: 'Club highlights and socials' },
      { key: 'firstaid', label: 'First-aid card for the team manager' },
    ]
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: GD, padding: '52px 24px 20px', flexShrink: 0 }}>
          <BackButton onBack={() => setStep('player-age')} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Join as a player</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Create your player account</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 6, lineHeight: 1.5 }}>
            You're 18 or over, so you decide what's collected. Change it any time.
          </div>
        </div>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <FieldRow label="Your name" />
          <FieldRow label="Mobile" />
          <FieldRow label="Date of birth" />

          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', marginBottom: 20, overflow: 'hidden' }}>
            {TOGGLES.map((item, i) => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < TOGGLES.length - 1 ? '1px solid #f0f1f0' : 'none' }}>
                <span style={{ flex: 1, fontSize: 14, color: INK }}>{item.label}</span>
                <button onClick={() => setConsent18(c => ({ ...c, [item.key]: !c[item.key] }))}
                  style={{ width: 44, height: 26, borderRadius: 13, border: 0, background: consent18[item.key] ? '#7cc4ab' : '#d4d7d4', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '999px', background: '#fff', position: 'absolute', top: 4, left: consent18[item.key] ? 22 : 4, transition: 'left 0.15s' }} />
                </button>
              </div>
            ))}
          </div>

          <button style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 12 }}>
            Create account
          </button>
          <div style={{ fontSize: 12, color: MUT, textAlign: 'center' }}>
            By joining you agree to the club's privacy policy.
          </div>
        </div>
      </div>
    )
  }

  return null
}
