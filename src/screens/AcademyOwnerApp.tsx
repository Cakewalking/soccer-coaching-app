import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

type OwnerNav = 'home' | 'programs' | 'players' | 'coaches' | 'money'
type HomeTab  = 'overview' | 'trials' | 'reports' | 'safety' | 'partner'
type ProgramsTab = 'term' | 'clinic'

// ─── Shared ──────────────────────────────────────────────────────────────────

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', ...style }}>{children}</div>
}

function Stat({ label, value, sub, warn }: { label: string; value: string; sub?: string; warn?: boolean }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: warn ? ROSE : GD, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

function Badge({ label, color = G, bg = PALE }: { label: string; color?: string; bg?: string }) {
  return <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 999 }}>{label}</span>
}

function Btn({ label, primary, small, onClick }: { label: string; primary?: boolean; small?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ height: 44, padding: `0 ${small ? 12 : 18}px`, borderRadius: 999, border: primary ? 'none' : `1px solid ${LN}`, background: primary ? G : '#fff', color: primary ? '#fff' : MUT, fontSize: small ? 12 : 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>{label}</button>
  )
}

function Ini({ ini, color = G }: { ini: string; color?: string }) {
  return <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{ini}</div>
}

function PageHead({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div style={{ padding: '20px 28px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{title}</div>
        {sub && <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{sub}</div>}
      </div>
      {right && <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>{right}</div>}
    </div>
  )
}

// ─── AC1 — Overview ──────────────────────────────────────────────────────────

function Overview({ empty, onBroadcast, onTrials, onFees, onReports, onFootballYear }: {
  empty: boolean; onBroadcast: () => void; onTrials: () => void; onFees: () => void; onReports: () => void; onFootballYear: () => void
}) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Welcome, Dani" sub="Tall Timber Football Academy · nothing set up yet"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Start with your first program</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Add a group, the days it trains and the price. You get a link families can use to book a free trial.</div>
        <Btn label="Add a program" primary/>
      </div></Card>
      {[{ n: '1', t: 'Add a program', d: 'Ages, days, places and price' }, { n: '2', t: 'Add your coaches', d: 'Each needs a children check' }, { n: '3', t: 'Share your trial link', d: 'Families book themselves in' }].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
        </div>
      ))}
    </div>
  )

  const stats = [
    { label: 'Players this term', value: '80', sub: 'Of 88 places filled across 3 programs' },
    { label: 'Trials this month', value: '9', sub: '4 joined · 3 waiting on an offer' },
    { label: 'Fees collected', value: '$21,180', sub: 'Of $23,020 billed · $1,160 late', warn: true },
    { label: 'Came to training', value: '91%', sub: 'Last 2 weeks · 6 make-ups booked' },
  ]

  const needs = [
    { n: '1', title: '3 trial families are waiting on an offer', note: 'They came last week. Offers sent within 2 days are taken up most often', cta: 'Send offers', onClick: onTrials },
    { n: '2', title: '4 families are behind on term fees', note: '$1,160 in total · the oldest is 3 weeks late', cta: 'See who', onClick: onFees },
    { n: '3', title: "Ben's children check runs out on 30 June", note: "He can't coach after that until it's renewed", cta: 'Remind Ben', onClick: () => showToast('Reminder sent to Ben.') },
  ]

  const today = [
    { time: '4:30', title: 'Development · 9 to 11', note: 'Reece · pitch 1 · 14 coming, 1 trial' },
    { time: '5:30', title: 'Advanced · 12 to 14', note: 'Reece and Sofia · pitch 1 · 20 coming, 2 make-ups' },
    { time: '6:45', title: 'One-on-one · Kai Okonkwo', note: 'Reece · pitch 2, in open view' },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Hi Dani" sub="Thursday 4 June · Term 2, week 7 of 10"
        right={<><Btn label="Message families" small onClick={onBroadcast}/><Btn label="Share the trial link" small onClick={() => showToast('Trial link copied. Anyone with it can book a free trial.')}/><Btn label="+ New program" small primary onClick={() => showToast('Opening the new program form.')}/></>}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {stats.map(s => <Stat key={s.label} {...s}/>)}
      </div>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Needs you · 3 things</span>
          <span style={{ fontSize: 12, color: MUT }}>Clean Sheet chases fees and trial families for you. You only see what it couldn't settle.</span>
        </div>
        {needs.map(n => (
          <div key={n.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{n.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{n.title}</div>
              <div style={{ fontSize: 12, color: MUT }}>{n.note}</div>
            </div>
            <button onClick={n.onClick} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>{n.cta}</button>
          </div>
        ))}
      </Card>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Today · Messmate Primary School</div>
        <Card>
          {today.map((s, i) => (
            <div key={s.time} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < today.length - 1 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 48, height: 48, background: GD, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{s.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
                <div style={{ fontSize: 12, color: MUT }}>{s.note}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 13, color: G }}>Term reports are due in week 9. 12 of 80 are drafted.</div>
        <button onClick={onReports} style={{ fontSize: 13, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>See reports →</button>
      </div>

      <button onClick={onFootballYear} style={{ alignSelf: 'flex-start', fontSize: 13, fontWeight: 600, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>The football year →</button>
      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}

// ─── AC3 — Trials ────────────────────────────────────────────────────────────

function TrialsView({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Trials" sub="Nobody has booked yet"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Share your trial link</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Put it on your website and socials. Families pick a session, and you see them here.</div>
        <Btn label="Copy the trial link" primary/>
      </div></Card>
      {[{ n: '1', t: 'They book', d: "A session that fits the child's age" }, { n: '2', t: 'The coach assesses', d: 'Four skills, under a minute' }, { n: '3', t: 'You send an offer', d: 'With the price for the weeks left' }].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Trials" sub="June so far · 9 booked · 4 joined" right={<Btn label="Share the trial link" small primary/>}/>

      {[
        { heading: 'Booked · 2', items: [{ name: 'Ivy Barlow, 7', note: 'Mon 8 Jun · Foundation · Reminder goes Sunday' }, { name: 'Nate Greco, 10', note: 'Tue 9 Jun · Development · Reminder goes Monday' }], cta: null },
        { heading: 'Came, to assess · 1', items: [{ name: 'Arjun Mehta, 10', note: "Today 4:30 · Development · Reece assesses today" }], note: 'The coach rates four skills in under a minute.', cta: null },
        { heading: 'Offer to send · 3', items: [{ name: 'Lola Ferris, 12', note: 'Fits Advanced · came 28 May' }, { name: 'Sam Petrakis, 8', note: 'Fits Foundation · came 27 May' }, { name: 'Billie Nguyen, 9', note: 'Fits Development · came 26 May' }], note: "Clean Sheet works out the price for the weeks left.", cta: 'Send offer' },
        { heading: 'Joined · 4', items: [{ name: 'Kai Okonkwo, 13', note: 'Advanced · joined 13 May' }, { name: 'Maya Rossi, 6', note: 'Foundation · joined 14 May' }, { name: 'Theo Lindqvist, 11', note: 'Development · joined 19 May' }, { name: 'Ana Costa, 12', note: 'Advanced · joined 2 Jun' }], note: '4 of the last 6 offers were taken up.', cta: null },
      ].map(section => (
        <div key={section.heading}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>{section.heading}</div>
          <Card>
            {section.items.map((item, i) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < section.items.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{item.note}</div>
                </div>
                {section.cta && <button style={{ height: 44, padding: '0 12px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{section.cta}</button>}
              </div>
            ))}
            {section.note && <div style={{ padding: '10px 14px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>{section.note}</div>}
          </Card>
        </div>
      ))}
    </div>
  )
}

// ─── AC7 — Reports ───────────────────────────────────────────────────────────

function ReportsView({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Term reports" sub="Nothing to report on yet"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Reports build up from session notes</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>After each session the coach taps two things per player. By week 8 there's enough for a first draft.</div>
        <Btn label="See an example report" primary/>
      </div></Card>
      {[{ n: '1', t: 'Coaches note', d: 'Two taps per player, per session' }, { n: '2', t: 'Clean Sheet drafts', d: 'From the notes, in week 8' }, { n: '3', t: 'You approve', d: 'Then it goes to the family' }].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
        </div>
      ))}
    </div>
  )

  const groups = [
    { label: 'Advanced', drafted: 8, total: 22, waiting: 4 },
    { label: 'Development', drafted: 3, total: 30, waiting: 1 },
    { label: 'Foundation', drafted: 1, total: 28, waiting: 0 },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Term reports" sub="Term 2 · due to families in week 9"
        right={<><Btn label="See a finished report" small/><Btn label="Approve 5 and send" small primary/></>}/>

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>By program · 12 of 80 drafted</div>
      <Card>
        {groups.map((g, i) => (
          <div key={g.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < groups.length - 1 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{g.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{g.drafted} of {g.total} drafted · {g.waiting > 0 ? `${g.waiting} waiting for you` : 'None waiting'}</div>
              <div style={{ marginTop: 6, height: 4, background: LN, borderRadius: 2, width: '100%' }}>
                <div style={{ height: 4, background: G, borderRadius: 2, width: `${g.drafted / g.total * 100}%` }}/>
              </div>
            </div>
            <Btn label="Open" small primary/>
          </div>
        ))}
      </Card>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>What a report holds</div>
        {[{ n: '1', t: 'Five skills, then and now', d: "From the coach's session notes" }, { n: '2', t: 'What they came to', d: 'Sessions attended this term' }, { n: '3', t: 'One goal for next term', d: 'Chosen by the coach' }, { n: '4', t: 'A clip', d: "Only where the parent agreed" }].map((s, i) => (
          <div key={s.n} style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: i < 3 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
            <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>No rankings and no comparing children. Each report is the child against their own last term.</div>
      </Card>
    </div>
  )
}

// ─── AC10 — Child safety ─────────────────────────────────────────────────────

function SafetyView({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Child safety" sub="Nothing set up yet · six things, about ten minutes"/>
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', fontSize: 13, color: G, lineHeight: 1.5 }}>Three are rules Clean Sheet keeps for you. Three need you: your children check, a person for concerns and your policy.</div>
      <Btn label="Start" primary/>
      {[{ n: '1', t: 'One-on-ones in open view', d: 'The parent is told where' }, { n: '2', t: 'No messaging a child alone', d: 'A parent is always copied in' }, { n: '3', t: 'Filming needs a yes', d: 'From the parent, at any age' }].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>✓</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
        </div>
      ))}
    </div>
  )

  const checks = [
    { label: 'Every coach has a children check', note: '3 valid · 1 runs out 30 June', status: 'Needs you', ok: false },
    { label: 'One-on-ones are in open view', note: 'On a pitch others can see, and the parent is told where', status: 'In place', ok: true },
    { label: 'Coaches never message a child alone', note: 'Under 18s: a parent is always copied in', status: 'In place', ok: true },
    { label: 'A named person for concerns', note: 'Dani Okafor · families can also go straight to the regulator', status: 'In place', ok: true },
    { label: "Filming only with a parent's yes", note: "At any age. Under 12 it's clips only: no scores or numbers", status: 'In place', ok: true },
    { label: "Child-safe policy families can read", note: 'Not uploaded yet', status: 'Needs you', ok: false },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Child safety" sub="An academy isn't covered by a club's welfare officer, so this sits with you"/>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>What's in place · 4 of 6</span>
        </div>
        {checks.map((c, i) => (
          <div key={c.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderBottom: i < checks.length - 1 ? `1px solid ${LN}` : 'none', background: !c.ok ? '#fffaf8' : '#fff' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: c.ok ? G : ROSE + '33', color: c.ok ? '#fff' : ROSE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{c.ok ? '✓' : '!'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{c.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{c.note}</div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <Badge label={c.ok ? (c.label.includes('view') || c.label.includes('alone') ? 'Rule' : 'Rule') : 'Needs you'} color={c.ok ? G : ROSE} bg={c.ok ? PALE : '#fdf4f4'}/>
              {!c.ok && <Btn label="Open" small/>}
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, fontSize: 13, fontWeight: 700, color: INK }}>Concerns · 0 open</div>
        <div style={{ padding: '12px 16px', fontSize: 13, color: MUT, lineHeight: 1.5 }}>A parent or child can raise one privately from their app.</div>
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${LN}`, background: PALE, fontSize: 13, color: G, lineHeight: 1.5 }}>
          <strong>If a concern is about the owner:</strong> The family is shown how to go straight to Victoria's Social Services Regulator. It doesn't come to you first.
        </div>
      </Card>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Victoria's Child Safe Standards apply to businesses that coach children, including private academies.</div>
    </div>
  )
}

// ─── AC11 — Partner club ──────────────────────────────────────────────────────

function PartnerClubView({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Partner club" sub="Not linked to a club"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Do your players play games through a club?</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Link the club and your game team gets fixtures, team sheets and match reviews, with no double entry.</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}><Btn label="Invite a club to link" primary/><Btn label="We only train"/></div>
      </div></Card>
      {[{ n: '1', t: 'Game day in the same app', d: 'Fixtures, team sheet, live game' }, { n: '2', t: 'One bill for families', d: 'Club registration and your fee' }, { n: '3', t: 'The whole week', d: 'Training and games, without asking parents' }].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
        </div>
      ))}
    </div>
  )

  const how = [
    { n: '1', t: 'Who coaches on game day', v: "The academy's coach · Reece Whitlam", cta: 'Change' },
    { n: '2', t: 'Game time', v: 'Set by Wattle Creek: every player gets at least half a game', cta: 'Set by the club' },
    { n: '3', t: 'Registration', v: '14 of 16 are registered with Football Victoria through the club', cta: 'Chase 2' },
    { n: '4', t: 'Concerns', v: "At a game: Helen Park, the club's welfare officer. At training: you", cta: 'How it works' },
    { n: '5', t: 'Money', v: 'Club registration goes straight to the club. Term fees come to you', cta: 'Open fees' },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Partner club" sub="Your game team plays as part of Wattle Creek FC"
        right={<><Btn label="Message the club" small/><Btn label="+ Add a game team" small primary/></>}/>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>How the partnership runs</div>
        {how.map((h, i) => (
          <div key={h.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderBottom: i < how.length - 1 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{h.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{h.t}</div>
              <div style={{ fontSize: 12, color: MUT }}>{h.v}</div>
            </div>
            <button style={{ fontSize: 12, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>{h.cta}</button>
          </div>
        ))}
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT, lineHeight: 1.5 }}>You train the players and run the team. The club holds the registrations and the place in the league, so its rules apply on game day.</div>
      </Card>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 48, height: 48, background: GD, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>U13</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>U13 Timber</div>
            <div style={{ fontSize: 12, color: MUT }}>16 players from Advanced · Saturday league, 11 a side · entered by Wattle Creek FC</div>
          </div>
          <Btn label="See Saturday" small/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ background: PALE, borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 4 }}>THE CLUB SEES</div>
            <div style={{ fontSize: 12, color: G }}>Team sheets, cards, minutes and coach checks</div>
          </div>
          <div style={{ background: '#fafafa', borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 4 }}>ONLY YOU SEE</div>
            <div style={{ fontSize: 12, color: G }}>Term fees, trials and term reports</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 10 }}>Families are told this when they join the game team.</div>
      </div>
    </div>
  )
}

// ─── AC2 — Programs ──────────────────────────────────────────────────────────

function ProgramsView({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Programs" sub="No programs yet"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Add your first group</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Choose the ages, the days and the number of places. Set a price per term, or per session for one-on-ones.</div>
        <Btn label="Add a program" primary/>
      </div></Card>
      {[{ n: '1', t: 'Term groups', d: 'By age or by level' }, { n: '2', t: 'One-on-ones', d: 'Booked and paid per session' }, { n: '3', t: 'Holiday clinics', d: 'A few days, booked on their own' }].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
        </div>
      ))}
    </div>
  )

  const programs = [
    { name: 'Foundation', ages: 'Ages 5 to 8', when: 'Mon and Wed · 4:30 to 5:20', coach: 'Sofia Marin', places: '28 of 32', price: '$260 a term', open: true },
    { name: 'Development', ages: 'Ages 9 to 11', when: 'Tue and Thu · 4:30 to 5:25', coach: 'Reece Whitlam', places: '30 of 32', price: '$290 a term', open: true },
    { name: 'Advanced', ages: 'Ages 12 to 14', when: 'Tue and Thu · 5:30 to 6:40', coach: 'Reece and Sofia', places: '22 of 24', price: '$320 a term', open: true },
    { name: 'One-on-one', ages: 'Any age', when: 'By booking · 45 minutes', coach: 'Dani, Reece', places: '6 of 8', price: '$90 a session', open: true },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Programs" sub="Term 2 · 20 April to 26 June · 10 weeks"
        right={<><Btn label="Copy to Term 3" small/><Btn label="+ New program" small primary/></>}/>

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>This term · 80 of 88 group places</div>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 60px', padding: '8px 16px', background: GD }}>
          {['PROGRAM', 'WHEN', 'COACH', 'PLACES', 'PRICE', ''].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)' }}>{h}</div>
          ))}
        </div>
        {programs.map((p, i) => (
          <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 60px', padding: '12px 16px', borderBottom: i < programs.length - 1 ? `1px solid ${LN}` : 'none', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
              <div style={{ fontSize: 12, color: MUT }}>{p.ages}</div>
            </div>
            <div style={{ fontSize: 13, color: MUT }}>{p.when}</div>
            <div style={{ fontSize: 13, color: MUT }}>{p.coach}</div>
            <div style={{ fontSize: 13, color: INK, fontWeight: 600 }}>{p.places}</div>
            <div style={{ fontSize: 13, color: MUT }}>{p.price}</div>
            <Badge label="Open" color={G} bg={PALE}/>
          </div>
        ))}
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>Families who join mid-term pay only for the weeks left. Brothers and sisters get 10% off.</div>
      </Card>

      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: GD }}>Waiting list · 5 · Advanced</div>
          <div style={{ fontSize: 12, color: G }}>2 places open. Offer them?</div>
        </div>
        <Btn label="Offer" small primary/>
      </div>
    </div>
  )
}

// ─── AC9 — Holiday clinic ─────────────────────────────────────────────────────

function ClinicView({ empty }: { empty: boolean }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Holiday clinics" sub="None planned"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Plan a holiday clinic</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Pick the days, ages, places and price. You get a booking link that anyone can use, not only your own families.</div>
        <Btn label="Plan a clinic" primary/>
      </div></Card>
      {[{ n: '1', t: 'Next school holidays', d: 'Sat 27 June to Sun 12 July' }, { n: '2', t: 'Paid on booking', d: 'So no chasing afterwards' }, { n: '3', t: 'A way in', d: 'Clinic families get a trial invite' }].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="July holiday clinic" sub="Mon 6 to Wed 8 July · $180 · open to anyone"
        right={<><Btn label="Copy the booking link" small/><Btn label="Message booked families" small primary/></>}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        <Stat label="Total bookings" value="31" sub="Of 40 places"/>
        <Stat label="New to the academy" value="12" sub="12 of the 31 · invite to a trial"/>
        <Stat label="Taken so far" value="$5,580" sub="31 places at $180"/>
      </div>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Bookings</div>
        {[{ age: 'Ages 6 to 8', n: 14, total: 16 }, { age: 'Ages 9 to 12', n: 17, total: 24 }].map((g, i) => (
          <div key={g.age} style={{ padding: '14px 16px', borderBottom: i < 1 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{g.age}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: G }}>{g.n} of {g.total}</span>
            </div>
            <div style={{ height: 4, background: LN, borderRadius: 2 }}>
              <div style={{ height: 4, background: G, borderRadius: 2, width: `${g.n / g.total * 100}%` }}/>
            </div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Mon to Wed · 9:00 to 12:00</div>
          </div>
        ))}
      </Card>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Each day</div>
        {[{ l: 'Sign in and out', d: 'A named adult collects each child' }, { l: 'Hot day plan', d: 'Follows the heat rule, with shade breaks' }, { l: 'First-aid cards', d: 'Allergies and who to call' }].map((r, i) => (
          <div key={r.l} style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓</div>
            <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.l}</div><div style={{ fontSize: 12, color: MUT }}>{r.d}</div></div>
          </div>
        ))}
      </Card>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Clinic families pay when they book. A place can be cancelled for a full refund up to 7 days before.</div>
      <button onClick={() => showToast('Opening the trial invite form.')} style={{ alignSelf: 'flex-start', fontSize: 13, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Invite new families to a trial →</button>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── AC4 — Players ───────────────────────────────────────────────────────────

function PlayersView({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Players" sub="Nobody enrolled yet"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Players appear when families enrol</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Already have a list? Bring it in from a spreadsheet.</div>
        <Btn label="Import a spreadsheet" primary/>
      </div></Card>
      {[{ n: '1', t: 'Their program', d: 'And how often they come' }, { n: '2', t: 'Their club team', d: 'If the parent shares it' }, { n: '3', t: 'Report and fees', d: "What's done and what's due" }].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
        </div>
      ))}
    </div>
  )

  const players = [
    { ini: 'KO', name: 'Kai Okonkwo',    age: 13, program: 'Advanced',     came: '5 of 6',   club: 'U13 Timber · your game team', report: 'Drafted', fees: 'Paid', feeColor: G },
    { ini: 'AC', name: 'Ana Costa',      age: 12, program: 'Advanced',     came: '2 of 2',   club: 'Harbour Rovers U12',          report: 'Too new',  fees: 'Paid', feeColor: G },
    { ini: 'JM', name: 'Jonah Marsh',    age: 14, program: 'Advanced',     came: '6 of 10',  club: 'No club',                     report: 'To write', fees: '3 weeks late', feeColor: ROSE },
    { ini: 'TL', name: 'Theo Lindqvist', age: 11, program: 'Development',  came: '5 of 5',   club: 'Banksia Park U11',            report: 'To write', fees: 'On a plan', feeColor: G2 },
    { ini: 'RS', name: 'Ruby Sandhu',    age: 10, program: 'Development',  came: '10 of 10', club: 'Wattle Creek U10',            report: 'Drafted',  fees: 'Paid', feeColor: G },
    { ini: 'EB', name: 'Eli Brandt',     age: 9,  program: 'Development',  came: '7 of 10',  club: 'Kestrel Park U9',             report: 'To write', fees: '1 week late', feeColor: ROSE },
    { ini: 'MR', name: 'Maya Rossi',     age: 6,  program: 'Foundation',   came: '5 of 6',   club: 'No club',                     report: 'To write', fees: 'Paid', feeColor: G },
    { ini: 'HP', name: 'Hugo Pereira',   age: 7,  program: 'Foundation',   came: '9 of 10',  club: 'Wattle Creek U7',             report: 'Drafted',  fees: 'Paid', feeColor: G },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Players" sub="80 this term · showing 8"
        right={<><Btn label="Export" small/><Btn label="Message all families" small primary/></>}/>

      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr 2fr 1.5fr 1fr', padding: '8px 16px', background: GD }}>
          {['PLAYER', 'AGE', 'PROGRAM', 'CAME', 'CLUB TEAM', 'TERM REPORT', 'FEES'].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)' }}>{h}</div>
          ))}
        </div>
        {players.map((p, i) => (
          <div key={p.ini} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr 2fr 1.5fr 1fr', padding: '12px 16px', borderBottom: i < players.length - 1 ? `1px solid ${LN}` : 'none', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Ini ini={p.ini}/>
              <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</span>
            </div>
            <div style={{ fontSize: 13, color: MUT }}>{p.age}</div>
            <div style={{ fontSize: 13, color: MUT }}>{p.program}</div>
            <div style={{ fontSize: 13, color: MUT }}>{p.came}</div>
            <div style={{ fontSize: 12, color: MUT }}>{p.club}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: p.report === 'Drafted' ? G : p.report === 'Too new' ? MUT : INK }}>{p.report}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: p.feeColor }}>{p.fees}</div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>16 players are in U13 Timber, your game team at Wattle Creek FC. For players at other clubs, the parent chooses what is shared.</div>
      </Card>
    </div>
  )
}

// ─── AC6 — Coaches ───────────────────────────────────────────────────────────

function CoachesView({ empty }: { empty: boolean }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Coaches" sub="Just you so far"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Invite your coaches</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Each coach adds their children check before they can see a player. You choose which groups they run.</div>
        <Btn label="Invite a coach" primary/>
      </div></Card>
      {[{ n: '1', t: 'Their sessions', d: "Today's groups and the plan" }, { n: '2', t: 'Their players', d: 'One goal each, and notes' }, { n: '3', t: 'Nothing about money', d: 'Fees stay with you' }].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
        </div>
      ))}
    </div>
  )

  const coaches = [
    { ini: 'DO', name: 'Dani Okafor', role: 'Owner and head coach', lic: 'B licence', groups: 'One-on-ones · 4 this week', check: 'Valid to Mar 2029', ok: true },
    { ini: 'RW', name: 'Reece Whitlam', role: 'Coach', lic: 'C licence', groups: 'Development, Advanced · 5 sessions', check: 'Valid to Nov 2027', ok: true },
    { ini: 'SM', name: 'Sofia Marin', role: 'Coach', lic: 'C licence', groups: 'Foundation, Advanced · 4 sessions', check: 'Valid to Aug 2028', ok: true },
    { ini: 'BC', name: 'Ben Castellano', role: 'Assistant coach', lic: 'studying', groups: 'Foundation · 2 sessions', check: 'Runs out 30 Jun', ok: false },
  ]

  const notes = [
    { ini: 'RW', name: 'Reece', done: '5 of 5 sessions', status: 'All done', ok: true },
    { ini: 'SM', name: 'Sofia', done: '3 of 4 sessions', status: '1 to do', ok: false },
    { ini: 'BC', name: 'Ben', done: '2 of 2 sessions', status: 'All done', ok: true },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Coaches" sub="4 coaches · 15 sessions this week" right={<Btn label="+ Invite a coach" small primary/>}/>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Coaches and checks · Working with Children Check</div>
        {coaches.map((c, i) => (
          <div key={c.ini} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < coaches.length - 1 ? `1px solid ${LN}` : 'none', background: !c.ok ? '#fffaf8' : '#fff' }}>
            <Ini ini={c.ini} color={c.ok ? G : ROSE}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{c.name} · {c.role} · {c.lic}</div>
              <div style={{ fontSize: 12, color: MUT }}>{c.groups}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.ok ? G2 : ROSE }}>{c.check}</div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${LN}`, fontSize: 12, color: ROSE }}>A coach with no valid children check can't open a session or see a player. Ben has been reminded.</div>
      </Card>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Session notes written</div>
        {notes.map((n, i) => (
          <div key={n.ini} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < notes.length - 1 ? `1px solid ${LN}` : 'none' }}>
            <Ini ini={n.ini}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{n.name}</div>
              <div style={{ fontSize: 12, color: MUT }}>{n.done}</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: n.ok ? G : ROSE }}>{n.status}</span>
          </div>
        ))}
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT, lineHeight: 1.5 }}>Each note is two taps per player. At the end of term they become the progress report, so nobody writes 80 reports from memory.</div>
      </Card>

      <button onClick={() => showToast('Opening term reports.')} style={{ alignSelf: 'flex-start', fontSize: 13, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>See term reports →</button>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── AC5 — Fees ──────────────────────────────────────────────────────────────

function FeesView({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Fees" sub="Nothing billed yet"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Connect your bank to take payments</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Families pay by card when they enrol, and the money reaches your account each Friday. Set-up takes about ten minutes.</div>
        <Btn label="Connect a bank account" primary/>
      </div></Card>
      {[{ n: '1', t: 'Bills each family', d: "For the weeks they'll attend" }, { n: '2', t: 'Sends reminders', d: 'At 3, 7 and 14 days' }, { n: '3', t: 'Offers a plan', d: 'In 3 parts, when you agree' }].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
        </div>
      ))}
    </div>
  )

  const late = [
    { ini: 'JM', name: 'Marsh family · Jonah', note: 'Advanced · $320 · 3 weeks late · Reminded twice' },
    { ini: 'EB', name: 'Brandt family · Eli', note: 'Development · $290 · 1 week late · Reminded once' },
    { ini: 'SV', name: 'Vella family · Sienna', note: 'Foundation · $260 · 1 week late · Reminded once' },
    { ini: 'DK', name: 'Kovac family · Dario', note: 'Development · $290 · 4 days late · Reminder goes tomorrow' },
  ]

  const how = [
    { l: 'Card, in the app', d: '61 families · paid on enrolment' },
    { l: 'Payment plan', d: '9 families · 3 parts, no extra cost' },
    { l: 'Sibling discount', d: '8 families · 10% off' },
    { l: 'Club registration', d: "16 game-team players · goes straight to Wattle Creek FC" },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Fees" sub="Term 2 · $23,020 billed" right={<Btn label="Download for your accountant" small/>}/>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        <Stat label="Collected" value="$21,180" sub="92% of the term"/>
        <Stat label="Late" value="$1,160" sub="4 families" warn/>
        <Stat label="Still to come on plans" value="$680" sub="9 families pay in parts"/>
        <Stat label="One-on-ones and clinic" value="$7,740" sub="24 sessions · 31 clinic places"/>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Late · Oldest first</div>
        <Card>
          {late.map((f, i) => (
            <div key={f.ini} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < late.length - 1 ? `1px solid ${LN}` : 'none' }}>
              <Ini ini={f.ini} color={ROSE}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{f.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{f.note}</div>
              </div>
              <Btn label="Offer a plan" small/>
            </div>
          ))}
          <div style={{ padding: '10px 14px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT, lineHeight: 1.5 }}>Reminders go by themselves at 3, 7 and 14 days. After that it comes to you, and the child keeps training unless you decide otherwise.</div>
        </Card>
      </div>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>How families pay</div>
        {how.map((h, i) => (
          <div key={h.l} style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: i < how.length - 1 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{h.l}</div><div style={{ fontSize: 12, color: MUT }}>{h.d}</div></div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>Clean Sheet never shows a child or another parent that a family is behind.</div>
      </Card>
    </div>
  )
}

// ─── AC12 — Broadcast ─────────────────────────────────────────────────────────

function BroadcastView({ empty, onBack }: { empty: boolean; onBack: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  const sent = [
    { title: 'July clinic bookings are open', to: 'All families', time: 'Mon 9:00 am', seen: '61 of 80 seen' },
    { title: 'Thursday is indoors: wet weather', to: 'Advanced and Development', time: 'Wed 2:15 pm', seen: '52 of 52 seen' },
    { title: 'Term 3 dates and prices', to: 'All families', time: '28 May', seen: '80 of 80 seen' },
  ]

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Message families</div>
      </div>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Nothing sent yet</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Use this for term dates, clinic bookings and wet-weather calls. Pick all families or one program, and see who has seen it.</div>
        <Btn label="Write your first message" primary/>
      </div></Card>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Message families</div>
          <div style={{ fontSize: 13, color: MUT }}>Tall Timber news · only you post here</div>
        </div>
        <Btn label="Send to 80 families" small primary/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>
        <Card>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Who gets it</div>
          {['All families · 80', 'Foundation · 28', 'Development · 30', 'Advanced · 22', 'U13 Timber game team', 'Coaches · 3'].map((g, i) => (
            <div key={g} style={{ padding: '8px 14px', borderBottom: i < 5 ? `1px solid ${LN}` : 'none', fontSize: 14, color: i === 0 ? INK : MUT, fontWeight: i === 0 ? 700 : 400, background: i === 0 ? PALE : '#fff', cursor: 'pointer' }}>{g}</div>
          ))}
        </Card>

        <Card style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Headline</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>July holiday clinic: bookings are open</div>
          </div>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Message</div>
            <div style={{ fontSize: 14, color: INK, lineHeight: 1.6 }}>Mon 6 to Wed 8 July at Messmate Primary School. Current families can book before it opens to everyone on Friday.</div>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', gap: 8, borderBottom: `1px solid ${LN}` }}>
            {['Photo', 'Video', 'File', 'Poll', 'Booking link'].map(a => (
              <button key={a} style={{ height: 44, padding: '0 10px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>{a}</button>
            ))}
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
            {[
              { l: 'Also send by email', d: "For families who haven't opened the app this week" },
              { l: 'Ask families to tap Got it', d: "You see who has and hasn't" },
              { l: 'Let families reply', d: 'Replies come to you privately, never to everyone' },
            ].map(opt => (
              <div key={opt.l} style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${G}`, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round"><path d="M5 12l5 5 9-10"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{opt.l}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{opt.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Sent this term</div>
        <Card>
          {sent.map((s, i) => (
            <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < sent.length - 1 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
                <div style={{ fontSize: 12, color: MUT }}>{s.to} · {s.time}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: G2 }}>{s.seen}</div>
            </div>
          ))}
        </Card>
        <div style={{ fontSize: 12, color: ROSE, marginTop: 8 }}>19 families haven't seen the clinic news. <button onClick={() => showToast("Nudge sent to 19 families who haven't seen the clinic news.")} style={{ fontSize: 12, fontWeight: 700, color: ROSE, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>Nudge them</button></div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── SPa1 — Academy year ─────────────────────────────────────────────────────

function AcademyYearView({ onBack }: { onBack: () => void }) {
  const terms = [
    { term: 'Term 1', when: 'Feb to Apr', clubs: 'Club pre-season', what: 'Academy leads on skill. Club load is building, so academy sprints are capped' },
    { term: 'Term 2', when: 'Apr to Jun', clubs: 'Club season', what: 'Two academy sessions and a club game. One-on-ones kept short' },
    { term: 'Term 3', when: 'Jul to Sep', clubs: 'Club season and finals', what: 'Lighter weeks around finals' },
    { term: 'Term 4', when: 'Oct to Dec', clubs: 'Club post-season', what: 'Trials for clubs. The academy writes a short note if a family asks' },
    { term: 'Holidays', when: 'Dec and Jan', clubs: 'Rest month', what: 'Clinics are optional, and count as football' },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>The football year</div>
          <div style={{ fontSize: 13, color: MUT }}>Tall Timber · your terms beside the clubs' year</div>
        </div>
        <Btn label="Change term dates" small/>
      </div>

      <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: ROSE }}>6 players have had no month off</div>
        <div style={{ fontSize: 12, color: ROSE }}>The December clinic is flagged as optional for them.</div>
      </div>

      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr 2fr', padding: '8px 16px', background: GD }}>
          {['TERM', 'WHEN', 'AT THEIR CLUBS', 'WHAT THE ACADEMY DOES'].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)' }}>{h}</div>
          ))}
        </div>
        {terms.map((t, i) => (
          <div key={t.term} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr 2fr', padding: '14px 16px', borderBottom: i < terms.length - 1 ? `1px solid ${LN}` : 'none', background: i % 2 === 0 ? '#fff' : '#fafafa', alignItems: 'start' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{t.term}</div>
            <div style={{ fontSize: 13, color: MUT }}>{t.when}</div>
            <div style={{ fontSize: 13, color: G2 }}>{t.clubs}</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>{t.what}</div>
          </div>
        ))}
      </Card>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>In trial season</div>
        {[{ n: '1', t: 'A note for a trial', d: 'Only if the family asks for one' }, { n: '2', t: "You don't pick clubs", d: "Or pass on a player's scores" }, { n: '3', t: 'Your own trials', d: 'Free, any time of year' }].map((s, i) => (
          <div key={s.n} style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
            <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div><div style={{ fontSize: 12, color: MUT }}>{s.d}</div></div>
          </div>
        ))}
      </Card>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Most of your players also play for a club. Where a family shares their week, both coaches see the whole load.</div>
      <div style={{ fontSize: 12, color: MUT }}>U13 Timber plays under Wattle Creek FC, so it follows the club's dates.</div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AcademyOwnerApp({ onBack, empty = false, initialScreen, onNavChange }: { onBack: () => void; empty?: boolean; initialScreen?: string; onNavChange?: (screen: string) => void }) {
  const [nav, setNav]             = useState<OwnerNav>((initialScreen as OwnerNav) ?? 'home')
  const [homeTab, setHomeTab]     = useState<HomeTab>('overview')
  const [programsTab, setProgramsTab] = useState<ProgramsTab>('term')
  const [showBroadcast, setShowBroadcast] = useState(false)
  const [showFootballYear, setShowFootballYear] = useState(false)

  const HOME_TABS: Array<{ id: HomeTab; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'trials',   label: 'Trials' },
    { id: 'reports',  label: 'Reports' },
    { id: 'safety',   label: 'Child safety' },
    { id: 'partner',  label: 'Partner club' },
  ]

  const PROGRAMS_TABS: Array<{ id: ProgramsTab; label: string }> = [
    { id: 'term',   label: 'Term programs' },
    { id: 'clinic', label: 'Holiday clinic' },
  ]

  const contextTabs =
    nav === 'home'     ? HOME_TABS.map(t => t.label) :
    nav === 'programs' ? PROGRAMS_TABS.map(t => t.label) : []
  const activeTabIndex =
    nav === 'home'     ? HOME_TABS.findIndex(t => t.id === homeTab) :
    nav === 'programs' ? PROGRAMS_TABS.findIndex(t => t.id === programsTab) : 0

  if (showBroadcast) return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <BroadcastView empty={empty} onBack={() => setShowBroadcast(false)}/>
    </div>
  )

  if (showFootballYear) return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <AcademyYearView onBack={() => setShowFootballYear(false)}/>
    </div>
  )

  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ flex: 'none', background: GD, color: '#fff' }}>
        <div style={{ height: 60, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', flexShrink: 0 }}>Clean Sheet</span>
          <nav style={{ display: 'flex', flexGrow: 1, height: 60 }}>
            {(['home', 'programs', 'players', 'coaches', 'money'] as OwnerNav[]).map(id => (
              <button key={id} onClick={() => { setNav(id); onNavChange?.(id) }} style={{ height: 60, padding: '0 16px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 15, fontWeight: nav === id ? 700 : 500, color: nav === id ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', borderBottom: nav === id ? '3px solid #fff' : '3px solid transparent', textTransform: 'capitalize', boxSizing: 'border-box' as const }}>
                {id === 'money' ? 'Money' : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>Tall Timber Academy</span>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: ROSE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>DO</div>
            <button onClick={onBack} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>← Coach view</button>
          </div>
        </div>
        {contextTabs.length > 0 && (
          <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', background: '#fff', borderBottom: `1px solid ${LN}` }}>
            <nav style={{ display: 'flex', flexGrow: 1, height: 44 }}>
              {contextTabs.map((tab, i) => {
                const active = i === activeTabIndex
                return (
                  <button key={tab} onClick={() => {
                    if (nav === 'home') setHomeTab(HOME_TABS[i].id)
                    if (nav === 'programs') setProgramsTab(PROGRAMS_TABS[i].id)
                  }} style={{ height: 44, padding: '0 16px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: active ? 600 : 400, color: active ? INK : MUT, cursor: 'pointer', borderBottom: active ? `3px solid ${G2}` : '3px solid transparent', boxSizing: 'border-box', whiteSpace: 'nowrap' }}>{tab}</button>
                )
              })}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: G, background: PALE, borderRadius: 999, padding: '3px 10px' }}>Academy owner</span>
            </div>
          </div>
        )}
      </header>

      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {nav === 'home' && homeTab === 'overview' && <Overview empty={empty} onBroadcast={() => setShowBroadcast(true)} onTrials={() => setHomeTab('trials')} onFees={() => setNav('money')} onReports={() => setHomeTab('reports')} onFootballYear={() => setShowFootballYear(true)}/>}
        {nav === 'home' && homeTab === 'trials'   && <TrialsView empty={empty}/>}
        {nav === 'home' && homeTab === 'reports'  && <ReportsView empty={empty}/>}
        {nav === 'home' && homeTab === 'safety'   && <SafetyView empty={empty}/>}
        {nav === 'home' && homeTab === 'partner'  && <PartnerClubView empty={empty}/>}
        {nav === 'programs' && programsTab === 'term'   && <ProgramsView empty={empty}/>}
        {nav === 'programs' && programsTab === 'clinic' && <ClinicView empty={empty}/>}
        {nav === 'players'  && <PlayersView empty={empty}/>}
        {nav === 'coaches'  && <CoachesView empty={empty}/>}
        {nav === 'money'    && <FeesView empty={empty}/>}
      </div>
    </div>
  )
}
