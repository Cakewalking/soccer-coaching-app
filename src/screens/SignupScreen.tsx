import { useState } from 'react'

type Flow = 'welcome' | 'coach' | 'parent' | 'player' | 'staff'
type CoachStep = 1 | 2 | 3 | 4 | 5
type ParentStep = 1 | 2 | 3 | 4 | 5
type PlayerStep = 1 | 2 | 3 | 4
type StaffStep = 1 | 2 | 3 | 4

interface Props { onDone: () => void }

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? '#2f6252' : '#e9eae8' }} />
      ))}
    </div>
  )
}

function OptionCard({ selected, onClick, label, sub }: { selected: boolean; onClick: () => void; label: string; sub?: string }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '14px 16px', borderRadius: 12, border: `2px solid ${selected ? '#2f6252' : '#e9eae8'}`,
      background: selected ? '#f0f8f4' : '#fff', textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
    }}>
      <div style={{ width: 20, height: 20, borderRadius: '999px', border: `2px solid ${selected ? '#2f6252' : '#c5c8c4'}`, background: selected ? '#2f6252' : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {selected && <div style={{ width: 8, height: 8, borderRadius: '999px', background: '#fff' }} />}
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#10211f' }}>{label}</div>
        {sub && <div style={{ fontSize: 13, color: '#6f7f7b', marginTop: 2 }}>{sub}</div>}
      </div>
    </button>
  )
}

function TextField({ label, placeholder, type = 'text' }: { label: string; placeholder?: string; type?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 13, fontWeight: 700, color: '#10211f', display: 'block', marginBottom: 6 }}>{label}</label>
      <input type={type} placeholder={placeholder} style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #e9eae8', padding: '0 14px', fontFamily: 'inherit', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
    </div>
  )
}

function NavRow({ step, total, onBack, onNext, nextLabel = 'Continue' }: { step: number; total: number; onBack: () => void; onNext: () => void; nextLabel?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32 }}>
      <button onClick={onBack} style={{ height: 44, padding: '0 20px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>
        {step === 1 ? 'Back' : 'Back'}
      </button>
      <div style={{ fontSize: 13, color: '#6f7f7b' }}>{step} of {total}</div>
      <button onClick={onNext} style={{ height: 44, padding: '0 24px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
        {nextLabel}
      </button>
    </div>
  )
}

function CoachSignup({ onDone, onBack }: { onDone: () => void; onBack: () => void }) {
  const [step, setStep] = useState<CoachStep>(1)
  const [role, setRole] = useState('')

  const next = () => {
    if (step < 5) setStep((s) => (s + 1) as CoachStep)
    else onDone()
  }
  const back = () => {
    if (step === 1) onBack()
    else setStep((s) => (s - 1) as CoachStep)
  }

  return (
    <div style={{ padding: '32px 24px' }}>
      <ProgressBar step={step} total={5} />

      {step === 1 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>About you</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>Quick, then you're in.</p>
          <TextField label="First name" placeholder="Nat" />
          <TextField label="Last name" placeholder="Russo" />
          <TextField label="Email" placeholder="nat@email.com" type="email" />
          <TextField label="Phone" placeholder="04xx xxx xxx" type="tel" />
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Your role</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>What do you coach?</p>
          {['Head coach', 'Assistant coach', 'Fitness coach', 'Goalkeeping coach'].map(r => (
            <OptionCard key={r} selected={role === r} onClick={() => setRole(r)} label={r} />
          ))}
        </>
      )}

      {step === 3 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Your club</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>Which club are you with?</p>
          <TextField label="Club name" placeholder="Wattle Creek FC" />
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#10211f', display: 'block', marginBottom: 6 }}>State</label>
            <select style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #e9eae8', padding: '0 14px', fontFamily: 'inherit', fontSize: 15, background: '#fff', boxSizing: 'border-box' }}>
              <option>Victoria</option>
              <option>New South Wales</option>
              <option>Queensland</option>
              <option>Western Australia</option>
              <option>South Australia</option>
            </select>
          </div>
          <TextField label="Association" placeholder="FV, FNSW …" />
        </>
      )}

      {step === 4 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Your team</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>Set up your first team.</p>
          <TextField label="Team name" placeholder="U14 Girls" />
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#10211f', display: 'block', marginBottom: 6 }}>Age group</label>
            <select style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #e9eae8', padding: '0 14px', fontFamily: 'inherit', fontSize: 15, background: '#fff', boxSizing: 'border-box' }}>
              {['U7','U8','U9','U10','U11','U12','U13','U14','U15','U16','U17','U18','Senior'].map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#10211f', display: 'block', marginBottom: 6 }}>Gender</label>
            <select style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #e9eae8', padding: '0 14px', fontFamily: 'inherit', fontSize: 15, background: '#fff', boxSizing: 'border-box' }}>
              <option>Girls / women</option>
              <option>Boys / men</option>
              <option>Mixed</option>
            </select>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Almost there</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>Create your password.</p>
          <TextField label="Password" placeholder="8 characters or more" type="password" />
          <TextField label="Confirm password" placeholder="Same again" type="password" />
          <div style={{ background: '#f7f9f7', borderRadius: 12, padding: '14px 16px', marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>By joining you agree to</div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '19px' }}>
              Our <span style={{ color: '#2f6252', cursor: 'pointer' }}>terms of service</span> and <span style={{ color: '#2f6252', cursor: 'pointer' }}>privacy policy</span>. Player data is stored securely and never sold.
            </div>
          </div>
        </>
      )}

      <NavRow step={step} total={5} onBack={back} onNext={next} nextLabel={step === 5 ? 'Create account' : 'Continue'} />
    </div>
  )
}

function ParentJoin({ onDone, onBack }: { onDone: () => void; onBack: () => void }) {
  const [step, setStep] = useState<ParentStep>(1)
  const [relationship, setRelationship] = useState('')

  const next = () => {
    if (step < 5) setStep((s) => (s + 1) as ParentStep)
    else onDone()
  }
  const back = () => {
    if (step === 1) onBack()
    else setStep((s) => (s - 1) as ParentStep)
  }

  return (
    <div style={{ padding: '32px 24px' }}>
      <ProgressBar step={step} total={5} />

      {step === 1 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>About you</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>You're joining as a parent or carer.</p>
          <TextField label="First name" placeholder="Linh" />
          <TextField label="Last name" placeholder="Tran" />
          <TextField label="Email" placeholder="linh@email.com" type="email" />
          <TextField label="Phone" placeholder="04xx xxx xxx" type="tel" />
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>About your child</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>Their details so the club can find their account.</p>
          <TextField label="Child's first name" placeholder="Mia" />
          <TextField label="Child's last name" placeholder="Tran" />
          <TextField label="Date of birth" placeholder="DD/MM/YYYY" />
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Relationship</div>
            {['Parent', 'Guardian', 'Carer', 'Other'].map(r => (
              <OptionCard key={r} selected={relationship === r} onClick={() => setRelationship(r)} label={r} />
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Consents</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>Review and accept for Mia.</p>
          {[
            { title: 'Video and photos', sub: 'Match and training footage used for coaching analysis. Not shared publicly.' },
            { title: 'GPS and fitness data', sub: 'Used to protect Mia from overtraining. You can see it at any time.' },
            { title: 'Wellness check-ins', sub: 'Mia gets a quick how-are-you question before each session.' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
              <input type="checkbox" defaultChecked style={{ marginTop: 3, accentColor: '#2f6252', width: 16, height: 16, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#10211f' }}>{c.title}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b', marginTop: 2 }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </>
      )}

      {step === 4 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Medical</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>So the club can keep Mia safe.</p>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#10211f', display: 'block', marginBottom: 6 }}>Medical conditions (if any)</label>
            <textarea placeholder="Asthma, allergies, injuries to be careful with…" style={{ width: '100%', height: 80, borderRadius: 10, border: '1px solid #e9eae8', padding: '10px 14px', fontFamily: 'inherit', fontSize: 14, resize: 'none', boxSizing: 'border-box' }} />
          </div>
          <TextField label="Emergency contact name" placeholder="Linh Tran" />
          <TextField label="Emergency contact phone" placeholder="04xx xxx xxx" type="tel" />
        </>
      )}

      {step === 5 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>All done</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>Create a password to sign in.</p>
          <TextField label="Password" placeholder="8 characters or more" type="password" />
          <TextField label="Confirm password" placeholder="Same again" type="password" />
          <div style={{ background: '#e4f2eb', borderRadius: 12, padding: '14px 16px', marginTop: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>Mia's invite is now linked</div>
            <div style={{ fontSize: 13, color: '#4a5a57' }}>Once you create your account, you'll see her schedule, messages, and updates here.</div>
          </div>
        </>
      )}

      <NavRow step={step} total={5} onBack={back} onNext={next} nextLabel={step === 5 ? 'Create account' : 'Continue'} />
    </div>
  )
}

function PlayerSignup({ onDone, onBack, isUnder18 }: { onDone: () => void; onBack: () => void; isUnder18: boolean }) {
  const [step, setStep] = useState<PlayerStep>(1)

  const next = () => {
    if (step < 4) setStep((s) => (s + 1) as PlayerStep)
    else onDone()
  }
  const back = () => {
    if (step === 1) onBack()
    else setStep((s) => (s - 1) as PlayerStep)
  }

  return (
    <div style={{ padding: '32px 24px' }}>
      <ProgressBar step={step} total={4} />

      {step === 1 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>About you</h2>
          {isUnder18 ? (
            <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>You're joining as a young player (13–17).</p>
          ) : (
            <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>You're joining as a player (18+).</p>
          )}
          <TextField label="First name" placeholder="Harper" />
          <TextField label="Last name" placeholder="Day" />
          <TextField label="Date of birth" placeholder="DD/MM/YYYY" />
          <TextField label="Email" placeholder="harper@email.com" type="email" />
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Your position</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>Where do you like to play?</p>
          {['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Happy anywhere'].map(p => (
            <OptionCard key={p} selected={false} onClick={() => {}} label={p} />
          ))}
        </>
      )}

      {step === 3 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Your goals</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>What do you want to get better at?</p>
          {[
            { label: 'Shooting and finishing', sub: 'More goals from open play' },
            { label: '1v1 defending', sub: 'Win more individual battles' },
            { label: 'Passing under pressure', sub: 'Stay calm and play out' },
            { label: 'Stamina and fitness', sub: 'Last the full game at top speed' },
          ].map(g => (
            <OptionCard key={g.label} selected={false} onClick={() => {}} label={g.label} sub={g.sub} />
          ))}
        </>
      )}

      {step === 4 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Set a password</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>Almost there!</p>
          <TextField label="Password" placeholder="8 characters or more" type="password" />
          <TextField label="Confirm password" placeholder="Same again" type="password" />
          {isUnder18 && (
            <div style={{ background: '#fdf8f4', border: '1px solid #f0dcc8', borderRadius: 12, padding: '14px 16px', marginTop: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f', marginBottom: 4 }}>Parent or carer consent needed</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>We'll send an email to your parent or carer to confirm before your account is activated.</div>
            </div>
          )}
        </>
      )}

      <NavRow step={step} total={4} onBack={back} onNext={next} nextLabel={step === 4 ? 'Create account' : 'Continue'} />
    </div>
  )
}

function StaffInvite({ onDone, onBack }: { onDone: () => void; onBack: () => void }) {
  const [step, setStep] = useState<StaffStep>(1)
  const [staffType, setStaffType] = useState('')

  const next = () => {
    if (step < 4) setStep((s) => (s + 1) as StaffStep)
    else onDone()
  }
  const back = () => {
    if (step === 1) onBack()
    else setStep((s) => (s - 1) as StaffStep)
  }

  return (
    <div style={{ padding: '32px 24px' }}>
      <ProgressBar step={step} total={4} />

      {step === 1 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Invite staff</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>What kind of staff member?</p>
          {[
            { label: 'Team manager', sub: 'Duties, messages, and game-day logistics' },
            { label: 'Assistant coach', sub: 'Full access to training and match data' },
            { label: 'Fitness coach', sub: 'Growth, load, and fitness tab access' },
            { label: 'Admin staff', sub: 'Club admin portal only' },
          ].map(s => (
            <OptionCard key={s.label} selected={staffType === s.label} onClick={() => setStaffType(s.label)} label={s.label} sub={s.sub} />
          ))}
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Their details</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>We'll send them an invite email.</p>
          <TextField label="First name" placeholder="Rob" />
          <TextField label="Last name" placeholder="Owen" />
          <TextField label="Email" placeholder="rob@email.com" type="email" />
        </>
      )}

      {step === 3 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Their access</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>What can Rob see?</p>
          {[
            { title: 'Player names and positions', checked: true },
            { title: 'GPS and load data', checked: true },
            { title: 'Wellness and medical notes', checked: false },
            { title: 'Video and clips', checked: true },
            { title: 'Parent messages', checked: false },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
              <input type="checkbox" defaultChecked={a.checked} style={{ accentColor: '#2f6252', width: 16, height: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600, color: '#10211f' }}>{a.title}</span>
            </div>
          ))}
        </>
      )}

      {step === 4 && (
        <>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>Invite sent</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, gap: 16, textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '999px', background: '#e4f2eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 13.5V7l-8-4-8 4v6a8 8 0 008 8 8 8 0 006.4-3.2"/><path d="M9 10l2 2 4-4"/></svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#10211f' }}>Invite sent to Rob</div>
            <div style={{ fontSize: 15, color: '#6f7f7b', maxWidth: 280 }}>They'll get an email with a link to set up their account. You can resend or cancel any time.</div>
            <button onClick={onDone} style={{ marginTop: 8, height: 48, padding: '0 32px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Done</button>
          </div>
        </>
      )}

      {step < 4 && <NavRow step={step} total={4} onBack={back} onNext={next} nextLabel={step === 3 ? 'Send invite' : 'Continue'} />}
    </div>
  )
}

export default function SignupScreen({ onDone }: Props) {
  const [flow, setFlow] = useState<Flow>('welcome')
  const [playerAge, setPlayerAge] = useState<'under18' | '18plus' | null>(null)

  if (flow === 'coach') return (
    <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      <div style={{ background: '#1f4a3e', padding: '48px 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7cc4ab" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Clean Sheet</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 20 }}>Coach sign-up</div>
      </div>
      <CoachSignup onDone={onDone} onBack={() => setFlow('welcome')} />
    </div>
  )

  if (flow === 'parent') return (
    <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      <div style={{ background: '#1f4a3e', padding: '48px 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7cc4ab" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Clean Sheet</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 20 }}>Parent join</div>
      </div>
      <ParentJoin onDone={onDone} onBack={() => setFlow('welcome')} />
    </div>
  )

  if (flow === 'player') {
    if (playerAge === null) return (
      <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: '#1f4a3e', padding: '48px 24px 24px' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Player sign-up</div>
        </div>
        <div style={{ padding: '32px 24px' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#10211f' }}>How old are you?</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6f7f7b' }}>This sets up the right account for you.</p>
          <OptionCard selected={playerAge === 'under18'} onClick={() => setPlayerAge('under18')} label="13–17 years" sub="Parent or carer consent needed" />
          <OptionCard selected={playerAge === '18plus'} onClick={() => setPlayerAge('18plus')} label="18 or over" sub="Full account, no consent needed" />
          <button onClick={() => setFlow('welcome')} style={{ marginTop: 24, height: 44, padding: '0 20px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>Back</button>
        </div>
      </div>
    )
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: '#1f4a3e', padding: '48px 24px 24px' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Player sign-up</div>
        </div>
        <PlayerSignup onDone={onDone} onBack={() => setPlayerAge(null)} isUnder18={playerAge === 'under18'} />
      </div>
    )
  }

  if (flow === 'staff') return (
    <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      <div style={{ background: '#1f4a3e', padding: '48px 24px 24px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Staff invite</div>
      </div>
      <StaffInvite onDone={onDone} onBack={() => setFlow('welcome')} />
    </div>
  )

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', background: '#1f4a3e', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      {/* Logo */}
      <div style={{ padding: '64px 32px 40px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7cc4ab" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M5 10h4l2-4 3 8 2-4h3"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>For every person in your team</div>
        </div>
      </div>

      {/* Tagline */}
      <div style={{ padding: '0 32px 48px', flexGrow: 1 }}>
        <h1 style={{ margin: '0 0 16px', fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: '40px' }}>Better coaching, safer players, happier families</h1>
        <p style={{ margin: 0, fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: '24px' }}>
          Clean Sheet connects your club's coaches, players, parents, and admin — all working from the same information.
        </p>
      </div>

      {/* Join options */}
      <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '32px 24px 48px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 16 }}>I am a…</div>
        {([
          { id: 'coach' as Flow,  label: 'Coach',          sub: 'Set up my team and start coaching smarter', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4' },
          { id: 'parent' as Flow, label: 'Parent / carer',  sub: "Stay connected with my child's team",       iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
          { id: 'player' as Flow, label: 'Player',           sub: 'See my clips, goals, and schedule',         iconPath: 'M12 2l2.4 7.4H22l-6.5 4.7 2.5 7.6L12 17l-6 4.7 2.5-7.6L3 9.4h7.6z' },
          { id: 'staff' as Flow,  label: 'Club staff',       sub: 'Admin, registrations, and safeguarding',    iconPath: 'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2' },
        ] as const).map(o => (
          <button key={o.id} onClick={() => setFlow(o.id)} style={{
            width: '100%', padding: '14px 16px', borderRadius: 14, border: '1px solid #e9eae8',
            background: '#fff', textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10,
          }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={o.iconPath}/></svg>
            </span>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>{o.label}</div>
              <div style={{ fontSize: 13, color: '#6f7f7b', marginTop: 2 }}>{o.sub}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        ))}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <span style={{ fontSize: 14, color: '#6f7f7b' }}>Already have an account? </span>
          <button onClick={onDone} style={{ fontSize: 14, fontWeight: 700, color: '#2f6252', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>Sign in</button>
        </div>
      </div>
    </div>
  )
}
