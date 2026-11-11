import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

type Nav    = 'home' | 'progress' | 'book' | 'fees'
type Modal  = 'none' | 'trial' | 'trialBooked' | 'offer' | 'cantcome' | 'share' | 'concern' | 'chat' | 'bookClinic' | 'joinTeam'

// ─── Shared phone components ──────────────────────────────────────────────────

function PhoneNav({ active, onChange }: { active: Nav; onChange: (n: Nav) => void }) {
  const tabs: Array<{ id: Nav; label: string; icon: string }> = [
    { id: 'home',     label: 'Home',     icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { id: 'progress', label: 'Progress', icon: 'M18 20V10M12 20V4M6 20v-6' },
    { id: 'book',     label: 'Book',     icon: 'M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'fees',     label: 'Fees',     icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ]
  return (
    <nav style={{ flex: 'none', height: 64, background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'stretch' }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: 0, fontFamily: 'inherit' }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={active === t.id ? G : MUT} strokeWidth={active === t.id ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round"><path d={t.icon}/></svg>
          <span style={{ fontSize: 11, fontWeight: active === t.id ? 700 : 500, color: active === t.id ? G : MUT }}>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}

function PHeader({ title, back, right }: { title: string; back?: () => void; right?: React.ReactNode }) {
  return (
    <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
      {back && (
        <button onClick={back} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: LN, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
      )}
      <div style={{ flex: 1, fontSize: 20, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{title}</div>
      {right}
    </div>
  )
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', ...style }}>{children}</div>
}

function Row({ label, value, sub, btn }: { label: string; value?: string; sub?: string; btn?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderBottom: `1px solid ${LN}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{label}</div>
        {value && <div style={{ fontSize: 12, color: MUT }}>{value}</div>}
        {sub && <div style={{ fontSize: 12, color: G2 }}>{sub}</div>}
      </div>
      {btn}
    </div>
  )
}

function PBtn({ label, primary, small, block, onClick }: { label: string; primary?: boolean; small?: boolean; block?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ height: small ? 36 : 48, padding: `0 ${small ? 14 : 20}px`, borderRadius: 999, border: primary ? 'none' : `1px solid ${LN}`, background: primary ? G : '#fff', color: primary ? '#fff' : MUT, fontSize: small ? 13 : 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, width: block ? '100%' : undefined }}>{label}</button>
  )
}

function SkillBar({ label, then: then_, now }: { label: string; then: number; now: number }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>{label}</span>
        <span style={{ fontSize: 12, color: G2, fontWeight: 700 }}>{then_} → {now}</span>
      </div>
      <div style={{ height: 6, background: LN, borderRadius: 3, position: 'relative' as const }}>
        <div style={{ height: 6, background: LN + '00', borderRadius: 3, position: 'absolute', left: 0, right: 0 }}/>
        <div style={{ height: 6, background: G2 + '44', borderRadius: 3, position: 'absolute', left: 0, width: `${then_ / 5 * 100}%` }}/>
        <div style={{ height: 6, background: G, borderRadius: 3, position: 'absolute', left: 0, width: `${now / 5 * 100}%` }}/>
      </div>
    </div>
  )
}

// ─── ACP1 — Book a trial ─────────────────────────────────────────────────────

function BookTrialView({ onBooked }: { onBooked: () => void }) {
  const [step, setStep] = useState<'form' | 'choose'>('form')

  if (step === 'form') return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Book a free trial"/>
      <Card>
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Child's name</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: INK, padding: '10px 12px', background: '#f5f8f7', borderRadius: 10, border: `1px solid ${LN}` }}>Billie Nguyen</div>
        </div>
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Date of birth</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: INK, padding: '10px 12px', background: '#f5f8f7', borderRadius: 10, border: `1px solid ${LN}` }}>12 May 2016 · 9 years</div>
        </div>
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Your club team, if any</div>
          <div style={{ fontSize: 15, color: MUT, padding: '10px 12px', background: '#f5f8f7', borderRadius: 10, border: `1px solid ${LN}` }}>Not in a club yet</div>
        </div>
      </Card>
      <div style={{ background: PALE, borderRadius: 14, padding: '12px 14px', fontSize: 13, color: G, lineHeight: 1.5 }}>Billie is 9, so Clean Sheet suggests the Development group: Tue and Thu 4:30 to 5:25. You can pick a different session below.</div>
      <PBtn label="Choose a session" primary block onClick={() => setStep('choose')}/>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Choose a session" back={() => setStep('form')}/>
      <div style={{ fontSize: 13, color: MUT }}>Billie · Development · Tue and Thu 4:30</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { date: 'Tue 3 Jun · 4:30 pm', note: '2 trial spots open', best: false },
          { date: 'Thu 5 Jun · 4:30 pm', note: '2 trial spots open', best: false },
          { date: 'Tue 10 Jun · 4:30 pm', note: '1 trial spot open', best: false },
          { date: 'Thu 12 Jun · 4:30 pm', note: '2 trial spots open', best: true },
        ].map(s => (
          <button key={s.date} onClick={onBooked} style={{ padding: '14px 16px', borderRadius: 14, border: `1px solid ${s.best ? G : LN}`, background: s.best ? PALE : '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{s.date}</div>
            <div style={{ fontSize: 12, color: G2 }}>{s.note}</div>
            {s.best && <div style={{ fontSize: 11, fontWeight: 700, color: G, marginTop: 4 }}>Suggested</div>}
          </button>
        ))}
      </div>
    </div>
  )
}

// ACP1b — Trial booked
function TrialBookedView({ onDone }: { onDone: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.8} strokeLinecap="round"><path d="M5 12l5 5 9-10"/></svg>
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: INK, textAlign: 'center' }}>Trial booked</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: GD, textAlign: 'center' }}>Thu 12 Jun · 4:30 pm</div>
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', fontSize: 14, color: G, lineHeight: 1.5, textAlign: 'center', width: '100%' }}>
        Messmate Primary School, Pitch 1. Reece is the coach. No kit needed — whatever Billie runs in is fine.
      </div>
      {[{ l: 'Your name', v: 'Parent or carer comes along' }, { l: 'The trial', v: 'About an hour, in with the group' }, { l: 'After the trial', v: 'Reece sends a note, Dani follows up' }].map(r => (
        <div key={r.l} style={{ width: '100%', display: 'flex', gap: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.l}</div>
            <div style={{ fontSize: 13, color: MUT }}>{r.v}</div>
          </div>
        </div>
      ))}
      <PBtn label="Done" primary block onClick={onDone}/>
    </div>
  )
}

// ─── ACP2 — Offer ─────────────────────────────────────────────────────────────

function OfferView({ onDone }: { onDone: () => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Your offer"/>
      <Card>
        <div style={{ padding: 16, background: GD, color: '#fff' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Development group</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>Ages 9 to 11 · Tue and Thu 4:30 to 5:25</div>
        </div>
        <Row label="Coach" value="Reece Whitlam · C licence"/>
        <Row label="Term" value="Term 2 · 20 April to 26 June"/>
        <Row label="Weeks left" value="4 of 10 · starting 10 June"/>
        <Row label="Price for the rest" value="$116" sub="$290 ÷ 10 × 4"/>
        <div style={{ padding: 14, fontSize: 13, color: G, lineHeight: 1.5, background: PALE }}>If Billie misses a week, she can book a make-up session in another group. That's also how she gets a first look at the other groups.</div>
      </Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: MUT, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Pay by card</div>
        <div style={{ padding: '12px 14px', background: '#f5f8f7', borderRadius: 12, border: `1px solid ${LN}`, fontSize: 15, color: MUT }}>Visa ···· 4204</div>
        <PBtn label="Accept and pay $116" primary block onClick={onDone}/>
        <PBtn label="Decline this offer" block onClick={onDone}/>
      </div>
      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, textAlign: 'center' }}>Paid when you tap above. Full refund if you cancel more than 7 days before Billie's first session.</div>
    </div>
  )
}

// ─── ACP3 — Parent home ───────────────────────────────────────────────────────

function ParentHome({ empty, onCantCome, onShare, onConcern, onChat }: {
  empty: boolean; onCantCome: () => void; onShare: () => void; onConcern: () => void; onChat: () => void
}) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PHeader title="Hi"/>
      <Card>
        <div style={{ padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Kai's first session is on Tuesday</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Messmate Primary School, Pitch 1. Reece is the coach. No extra kit needed.</div>
          <PBtn label="See what to bring" primary/>
        </div>
      </Card>
      {[{ l: 'Session notes', d: 'What Kai worked on, after each session' }, { l: 'The report', d: 'Five skills, end of term' }, { l: 'Fees', d: 'What you paid, one receipt' }].map(r => (
        <div key={r.l} style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>+</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.l}</div><div style={{ fontSize: 12, color: MUT }}>{r.d}</div></div>
        </div>
      ))}
    </div>
  )

  const week = [
    { day: 'Mon', note: 'Rest' },
    { day: 'Tue', note: 'Academy 4:30', hi: true },
    { day: 'Wed', note: 'Club training' },
    { day: 'Thu', note: 'Academy 4:30', hi: true },
    { day: 'Fri', note: 'Rest' },
    { day: 'Sat', note: 'Club game' },
    { day: 'Sun', note: 'Rest' },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Hi, Mia" right={<button onClick={onChat} style={{ padding: '0 12px', height: 44, borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 700, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>Group chat</button>}/>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Kai's week · Term 2 week 7</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {week.map(d => (
            <div key={d.day} style={{ flex: 1, background: d.hi ? GD : '#fff', border: `1px solid ${d.hi ? GD : LN}`, borderRadius: 10, padding: '8px 4px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: d.hi ? 'rgba(255,255,255,0.7)' : MUT }}>{d.day}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: d.hi ? '#fff' : INK, marginTop: 2, lineHeight: 1.3 }}>{d.note}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: G2, marginTop: 6 }}>3 sessions this week · within what's recommended</div>
      </div>

      <Card>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>This term</div>
        <Row label="Term goal" value="Kai: sharper with the left foot in tight spaces"/>
        <Row label="Came to" value="5 of 6 sessions so far"/>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>From Reece after Tuesday's session</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Good sharp movement in the grid work. The left-foot pass is coming — he's starting to look for it rather than defaulting to his right.</div>
        </div>
      </Card>

      <div style={{ background: '#fffaf8', border: `1px solid ${ROSE}22`, borderRadius: 14, padding: '12px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: ROSE, marginBottom: 2 }}>Load note</div>
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>3 sessions this week is at the top of what's recommended for Kai's age. If he's tired after Thursday, that's why.</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PBtn label="Kai can't make it" block onClick={onCantCome}/>
        <PBtn label="Share data with Kai's club" block onClick={onShare}/>
        <PBtn label="Raise a concern privately" block onClick={onConcern}/>
      </div>
    </div>
  )
}

// ─── ACP4 — Fees ─────────────────────────────────────────────────────────────

function FeesView({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PHeader title="Fees"/>
      <Card><div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Nothing to pay yet</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Once Kai joins a program you'll see your bill and receipts here.</div>
      </div></Card>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Fees"/>

      <Card>
        <div style={{ padding: '10px 14px', background: GD }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>$290</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Term 2 · Development · Paid in a plan</div>
        </div>
        <Row label="Part 1" value="$97 · paid 20 Apr" sub="Receipt sent"/>
        <Row label="Part 2" value="$97 · paid 10 May" sub="Receipt sent"/>
        <Row
          label="Part 3"
          value="$96 · due 7 Jun"
          sub="In 3 days"
          btn={<PBtn label="Pay now" small primary/>}
        />
        <div style={{ padding: '10px 14px', background: PALE, fontSize: 13, color: G, lineHeight: 1.5 }}>Paying in 3 parts costs the same as paying in one. No fee.</div>
      </Card>

      <Card>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Receipts</div>
        {[{ d: 'Term 2 part 1', a: '$97', t: '20 Apr 9:04 am' }, { d: 'Term 2 part 2', a: '$97', t: '10 May 9:00 am' }].map(r => (
          <div key={r.d} style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderBottom: `1px solid ${LN}`, gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.a}</div>
              <div style={{ fontSize: 12, color: MUT }}>{r.d} · {r.t}</div>
            </div>
            <button style={{ fontSize: 13, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>Download</button>
          </div>
        ))}
        <div style={{ padding: '10px 14px', fontSize: 12, color: MUT }}>For something unexpected on your statement: <span style={{ color: G2, fontWeight: 700 }}>Contact Dani</span></div>
      </Card>
    </div>
  )
}

// ─── ACP5 — Progress ─────────────────────────────────────────────────────────

function ProgressView({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PHeader title="Progress"/>
      <Card><div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Kai's report comes in week 9</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Five skills, then and now. Dani sends it after you approve.</div>
      </div></Card>
      {[{ l: 'Session by session', d: "What Kai worked on, from Reece's notes" }, { l: 'The end-of-term report', d: 'Five skills, compared to last term' }, { l: 'No rankings', d: 'Kai against his own last term only' }].map(r => (
        <div key={r.l} style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>+</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.l}</div><div style={{ fontSize: 12, color: MUT }}>{r.d}</div></div>
        </div>
      ))}
    </div>
  )

  const skills = [
    { label: 'First touch', then: 2, now: 3 },
    { label: 'Left foot', then: 1, now: 2 },
    { label: 'Turning in tight spaces', then: 2, now: 3 },
    { label: 'Decision-making', then: 3, now: 3 },
    { label: 'Effort and coachability', then: 4, now: 4 },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Kai's report" right={<span style={{ fontSize: 12, fontWeight: 700, color: G, background: PALE, padding: '4px 10px', borderRadius: 999 }}>Term 2 Draft</span>}/>

      <Card>
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Five skills · then and now · 1 to 5</div>
          {skills.map(s => <SkillBar key={s.label} {...s}/>)}
        </div>
        <div style={{ padding: '12px 16px', background: PALE, borderTop: `1px solid ${LN}`, fontSize: 13, color: G, lineHeight: 1.5 }}>
          "Kai has made a real jump this term. The left foot work has clicked. If he keeps coming to both sessions, he'll be ready for the Advanced group next term."
          <div style={{ fontSize: 12, color: G2, marginTop: 6 }}>— Reece Whitlam</div>
        </div>
      </Card>

      <Card>
        <Row label="Came to" value="9 of 10 sessions"/>
        <Row label="Term goal" value="Sharper with the left foot in tight spaces"/>
        <Row label="Goal for next term" value="Start reading space earlier"/>
        <div style={{ padding: '12px 14px', display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Coach clip</div>
            <div style={{ fontSize: 12, color: MUT }}>23 Apr · 48 seconds · Kai approved to share clips</div>
          </div>
          <button style={{ padding: '0 14px', height: 44, borderRadius: 999, border: `1px solid ${G}`, background: 'transparent', color: G, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Play</button>
        </div>
      </Card>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>This report is Kai against his own last term. No rankings and no comparisons with other players.</div>
    </div>
  )
}

// ─── ACP6 — Can't come ───────────────────────────────────────────────────────

function CantComeView({ onBack }: { onBack: () => void }) {
  const [chosen, setChosen] = useState<number | null>(null)

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Kai can't make it" back={onBack}/>
      <div style={{ fontSize: 13, color: MUT }}>Mark a session, and book a make-up in a different group.</div>

      <Card>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Upcoming</div>
        {[{ d: 'Tue 10 Jun · 4:30 pm', label: 'Development', i: 0 }, { d: 'Thu 12 Jun · 4:30 pm', label: 'Development', i: 1 }, { d: 'Tue 17 Jun · 4:30 pm', label: 'Development', i: 2 }].map(s => (
          <button key={s.i} onClick={() => setChosen(s.i)} style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderBottom: `1px solid ${LN}`, width: '100%', textAlign: 'left', border: 'none', background: chosen === s.i ? PALE : '#fff', cursor: 'pointer', fontFamily: 'inherit', borderTop: s.i > 0 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.d}</div>
              <div style={{ fontSize: 12, color: MUT }}>{s.label}</div>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${chosen === s.i ? G : LN}`, background: chosen === s.i ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {chosen === s.i && <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round"><path d="M5 12l5 5 9-10"/></svg>}
            </div>
          </button>
        ))}
      </Card>

      {chosen !== null && (
        <>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginTop: 4 }}>Book a make-up</div>
          {[
            { d: 'Mon 9 Jun · Foundation · 4:30 pm', note: 'Different coach, different age group' },
            { d: 'Wed 11 Jun · Advanced · 5:30 pm', note: 'A stretch · will be harder than usual' },
          ].map(m => (
            <button key={m.d} style={{ padding: '12px 14px', borderRadius: 14, border: `1px solid ${LN}`, background: '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{m.d}</div>
              <div style={{ fontSize: 12, color: MUT }}>{m.note}</div>
            </button>
          ))}
        </>
      )}
      {chosen !== null && <PBtn label="Done" primary block onClick={onBack}/>}
    </div>
  )
}

// ─── ACP7 — Share with club ───────────────────────────────────────────────────

function ShareView({ onBack }: { onBack: () => void }) {
  const [sharing, setSharing] = useState({ session: true, goal: true, load: true, clip: false })

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Share with Kai's club" back={onBack}/>
      <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Banksia Park U11 — Kai's club coach can see the data you share here.</div>

      <Card>
        {([
          { key: 'session' as const, label: 'Session attendance', note: "Whether Kai came, not what he worked on" },
          { key: 'goal' as const, label: 'Term goal', note: 'The one skill Reece chose for this term' },
          { key: 'load' as const, label: 'Weekly load', note: 'Total sessions so the club can manage the week' },
          { key: 'clip' as const, label: 'Clips', note: "Only if Kai's clip approval is on" },
        ] as const).map((item, i) => (
          <button key={item.key} onClick={() => setSharing(p => ({ ...p, [item.key]: !p[item.key] }))} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 14px', borderBottom: i < 3 ? `1px solid ${LN}` : 'none', width: '100%', textAlign: 'left', border: 'none', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', borderTop: i > 0 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{item.note}</div>
            </div>
            <div style={{ width: 48, height: 28, borderRadius: 999, background: sharing[item.key] ? G : LN, position: 'relative', flexShrink: 0, marginTop: 2, transition: 'background 0.15s' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 4, left: sharing[item.key] ? 24 : 4, transition: 'left 0.15s' }}/>
            </div>
          </button>
        ))}
        <div style={{ padding: '10px 14px', background: PALE, fontSize: 13, color: G, lineHeight: 1.5 }}>Scores, ranked results and what other children did are never shared — not to any club, ever.</div>
      </Card>

      <PBtn label="Save" primary block onClick={onBack}/>
    </div>
  )
}

// ─── ACP8 — Book clinic ───────────────────────────────────────────────────────

function BookClinicView({ empty, onBack }: { empty: boolean; onBack: () => void }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Holiday clinic" back={onBack}/>
      <Card><div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>No clinic open to book yet</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Tall Timber runs clinics in the school holidays. You'll get a message when the July one opens.</div>
      </div></Card>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="July holiday clinic" back={onBack}/>
      <Card>
        <div style={{ padding: 14, background: GD, color: '#fff' }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Mon 6 to Wed 8 July</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>9:00 to 12:00 · Messmate Primary School</div>
        </div>
        <Row label="Age group" value="9 to 12 years"/>
        <Row label="Places left" value="7 of 24"/>
        <Row label="Price" value="$180 · paid now" sub="Full refund up to 7 days before"/>
      </Card>
      <div style={{ background: PALE, borderRadius: 14, padding: '12px 14px', fontSize: 13, color: G, lineHeight: 1.5 }}>Kai is an academy family, so you're in the early-access window. It opens to everyone on Friday.</div>
      <PBtn label="Book for Kai · $180" primary block/>
      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, textAlign: 'center' }}>Drop-off and pick-up: a named adult must sign Kai in and out each day.</div>
    </div>
  )
}

// ─── ACP9 — Join game team ────────────────────────────────────────────────────

function JoinTeamView({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Join U13 Timber" back={onBack}/>
      <Card>
        <div style={{ padding: 14, background: GD, color: '#fff' }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>U13 Timber · Saturday league</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · 11 a side</div>
        </div>
        <Row label="Coach" value="Reece Whitlam · the same coach as academy"/>
        <Row label="Games" value="Starting Sat 7 Jun · 15 games"/>
        <Row label="Kit" value="Included in the combined bill"/>
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Combined bill</div>
          {[{ l: 'Academy term 2', v: '$290', note: 'Already paid, nothing extra' }, { l: 'Club registration', v: '$85', note: 'Football Victoria' }, { l: 'Kit', v: '$45', note: 'Jersey and shorts' }].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.l}</div>
                <div style={{ fontSize: 12, color: MUT }}>{r.note}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{r.v}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>To pay now</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: GD }}>$130</div>
          </div>
        </div>
      </Card>
      <div style={{ background: PALE, borderRadius: 14, padding: '12px 14px', fontSize: 13, color: G, lineHeight: 1.5 }}>On game day: Wattle Creek's rules apply. The welfare officer is Helen Park, not Dani. Families are told this when they join.</div>
      <PBtn label="Join and pay $130" primary block onClick={onBack}/>
    </div>
  )
}

// ─── ACP10 — Raise concern ────────────────────────────────────────────────────

function ConcernView({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Raise a concern" back={onBack}/>
      <Card>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>How it works</div>
        {[
          { n: '1', t: 'You write it here', d: 'No other parent sees it' },
          { n: '2', t: 'Dani sees it privately', d: 'Dani is the named person for Tall Timber' },
          { n: '3', t: 'If the concern is about Dani', d: "Skip straight to the regulator below — it doesn't go to Dani first" },
        ].map((s, i) => (
          <div key={s.n} style={{ display: 'flex', gap: 10, padding: '12px 14px', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
            <div><div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
          </div>
        ))}
      </Card>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Your concern</div>
        <div style={{ padding: '12px 14px', background: '#f5f8f7', borderRadius: 12, border: `1px solid ${LN}`, fontSize: 15, color: MUT, minHeight: 100, lineHeight: 1.5 }}>Describe what happened and when…</div>
      </div>
      <PBtn label="Send to Dani" primary block onClick={onBack}/>
      <div style={{ background: '#fffaf8', border: `1px solid ${ROSE}22`, borderRadius: 14, padding: '12px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: ROSE, marginBottom: 4 }}>Victoria's Social Services Regulator</div>
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginBottom: 8 }}>If your concern is about the owner or you're not comfortable raising it here, contact the regulator directly.</div>
        <button style={{ fontSize: 13, fontWeight: 700, color: ROSE, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>How to contact the regulator →</button>
      </div>
    </div>
  )
}

// ─── ACP11 — Parent chat ─────────────────────────────────────────────────────

function ParentChatView({ empty, onBack }: { empty: boolean; onBack: () => void }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Group chat" back={onBack}/>
      <Card><div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Nobody else is here yet</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Once Dani sends a welcome message, all families in the Development group will be in here with you.</div>
      </div></Card>
    </div>
  )

  const msgs = [
    { name: 'Dani', ini: 'DO', bg: GD, text: "Hi everyone — just a note that Thursday this week we'll finish at 5:20 instead of 5:25.", time: 'Mon 2:30 pm' },
    { name: 'Priya', ini: 'PR', bg: '#c5bbd0', text: 'Thanks Dani. Quick question — is there parking at the school on Thursdays?', time: 'Mon 2:38 pm' },
    { name: 'Dani', ini: 'DO', bg: GD, text: 'Yes — the main gate off Church Street is open from 4pm.', time: 'Mon 2:41 pm' },
    { name: 'You', ini: 'MI', bg: ROSE, text: 'Thanks! See you Thursday 🙌', time: 'Mon 2:50 pm', me: true },
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${LN}`, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: LN, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>Development families</div>
          <div style={{ fontSize: 12, color: MUT }}>30 families · only Dani posts announcements</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {msgs.map(m => (
          <div key={m.time} style={{ display: 'flex', gap: 8, flexDirection: (m as typeof msgs[0] & { me?: boolean }).me ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: m.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{m.ini}</div>
            <div style={{ maxWidth: '70%' }}>
              {!(m as typeof msgs[0] & { me?: boolean }).me && <div style={{ fontSize: 11, color: MUT, marginBottom: 2, fontWeight: 700 }}>{m.name}</div>}
              <div style={{ background: (m as typeof msgs[0] & { me?: boolean }).me ? GD : '#f0f1ef', color: (m as typeof msgs[0] & { me?: boolean }).me ? '#fff' : INK, padding: '10px 12px', borderRadius: (m as typeof msgs[0] & { me?: boolean }).me ? '14px 14px 4px 14px' : '14px 14px 14px 4px', fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
              <div style={{ fontSize: 10, color: MUT, marginTop: 3, textAlign: (m as typeof msgs[0] & { me?: boolean }).me ? 'right' : 'left' }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 12px', borderTop: `1px solid ${LN}`, display: 'flex', gap: 8, flexShrink: 0, background: '#fff' }}>
        <div style={{ flex: 1, background: '#f5f8f7', borderRadius: 999, border: `1px solid ${LN}`, padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 14, color: MUT, minHeight: 42 }}>Write a message</div>
        <button style={{ width: 42, height: 42, borderRadius: '50%', border: 'none', background: G, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  )
}

// ─── Book tab ─────────────────────────────────────────────────────────────────

function BookTab({ onClinic, onTeam }: { onClinic: () => void; onTeam: () => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PHeader title="Book"/>
      <button onClick={onClinic} style={{ padding: 16, borderRadius: 16, border: `1px solid ${LN}`, background: '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>July holiday clinic</div>
        <div style={{ fontSize: 13, color: MUT }}>Mon 6 to Wed 8 July · $180 · 7 spots left</div>
        <div style={{ fontSize: 12, color: G2, fontWeight: 700, marginTop: 6 }}>Book →</div>
      </button>
      <button onClick={onTeam} style={{ padding: 16, borderRadius: 16, border: `1px solid ${LN}`, background: '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>U13 Timber · game team</div>
        <div style={{ fontSize: 13, color: MUT }}>Saturday league · Wattle Creek FC · $130 extra</div>
        <div style={{ fontSize: 12, color: G2, fontWeight: 700, marginTop: 6 }}>Join →</div>
      </button>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AcademyParentApp({ onBack, empty = false, initialModal = 'trial', initialNav = 'home' }: { onBack: () => void; empty?: boolean; initialModal?: Modal; initialNav?: Nav }) {
  const [nav, setNav]     = useState<Nav>(initialNav)
  const [modal, setModal] = useState<Modal>(initialModal)

  const handleNav = (n: Nav) => { setNav(n); setModal('none') }

  const wrap = (content: React.ReactNode) => (
    <div style={{ width: 390, margin: '0 auto', background: '#fafafa', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{ background: GD, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Kai's family</span>
        <button onClick={onBack} style={{ height: 44, padding: '0 10px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
      </div>
      {content}
    </div>
  )

  if (modal === 'trial')       return wrap(<><BookTrialView onBooked={() => setModal('trialBooked')}/></>)
  if (modal === 'trialBooked') return wrap(<><TrialBookedView onDone={() => { setNav('home'); setModal('none') }}/></>)
  if (modal === 'offer')       return wrap(<><OfferView onDone={() => setModal('none')}/></>)
  if (modal === 'cantcome')    return wrap(<><CantComeView onBack={() => setModal('none')}/></>)
  if (modal === 'share')       return wrap(<><ShareView onBack={() => setModal('none')}/></>)
  if (modal === 'concern')     return wrap(<><ConcernView onBack={() => setModal('none')}/></>)
  if (modal === 'chat')        return wrap(<><ParentChatView empty={empty} onBack={() => setModal('none')}/></>)
  if (modal === 'bookClinic')  return wrap(<><BookClinicView empty={empty} onBack={() => setModal('none')}/></>)
  if (modal === 'joinTeam')    return wrap(<><JoinTeamView onBack={() => setModal('none')}/></>)

  return wrap(
    <>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {nav === 'home'     && <ParentHome empty={empty} onCantCome={() => setModal('cantcome')} onShare={() => setModal('share')} onConcern={() => setModal('concern')} onChat={() => setModal('chat')}/>}
        {nav === 'progress' && <ProgressView empty={empty}/>}
        {nav === 'book'     && <BookTab onClinic={() => setModal('bookClinic')} onTeam={() => setModal('joinTeam')}/>}
        {nav === 'fees'     && <FeesView empty={empty}/>}
      </div>
      <PhoneNav active={nav} onChange={handleNav}/>
    </>
  )
}
