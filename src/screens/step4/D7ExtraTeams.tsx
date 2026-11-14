const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function Nav() {
  return (
    <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
      {(['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'] as const).map(t => (
        <div key={t} style={{ fontSize: 13, fontWeight: t === 'Teams' ? 700 : 500, color: t === 'Teams' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
      ))}
      <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
    </div>
  )
}

type Stat = { label: string; val: string; sub: string; warn?: boolean }

function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
      {stats.map(s => (
        <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{s.label}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: s.warn ? '#c05' : GD }}>{s.val}</div>
          <div style={{ fontSize: 11, color: MUT, marginTop: 2 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  )
}

type Attention = { text: string; sub: string; action?: string }

function NeedsAttention({ items }: { items: Attention[] }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  if (items.length === 0) {
    return (
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: G, marginBottom: 4 }}>Needs attention · 0 things</div>
        <div style={{ fontSize: 13, color: MUT }}>Nothing needs you</div>
      </div>
    )
  }
  return (
    <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Needs attention · {items.length} {items.length === 1 ? 'thing' : 'things'}</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < items.length - 1 ? `1px solid ${LN}` : 'none' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fef2f2', border: '2px solid #c05', flex: 'none', marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{item.text}</div>
            <div style={{ fontSize: 12, color: MUT }}>{item.sub}</div>
            {item.action && <button onClick={() => st('Opening action.')} style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: G, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{item.action}</button>}
          </div>
        </div>
      ))}
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}

type StaffMember = { initials: string; name: string; role: string; check: string; warn?: boolean }

function StaffCard({ staff, fitness }: { staff: StaffMember[]; fitness?: string }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Staff</div>
      {staff.map(s => (
        <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{s.name}</div>
            <div style={{ fontSize: 11, color: MUT }}>{s.role}</div>
          </div>
          <div style={{ fontSize: 11, color: s.warn ? '#c05' : G }}>{s.check}</div>
        </div>
      ))}
      {fitness && <div style={{ fontSize: 11, color: MUT, marginTop: 8 }}>Fitness: {fitness}</div>}
    </div>
  )
}

function NextGame({ date, opp, time, loc, note }: { date: string; opp: string; time: string; loc: string; note?: string }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Next game · {date}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>vs {opp}</div>
      <div style={{ fontSize: 12, color: MUT }}>{time} · {loc}</div>
      {note && <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{note}</div>}
    </div>
  )
}

function Players({ fewest, fewestSub, consent, consentTotal, warn }: { fewest: string; fewestSub: string; consent: number; consentTotal: number; warn?: boolean }) {
  const consentWarn = consent < consentTotal
  return (
    <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Players</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
        <div style={{ fontSize: 12, color: MUT }}>Fewest minutes</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: warn ? '#c05' : G }}>{fewest}</div>
      </div>
      <div style={{ fontSize: 11, color: MUT, padding: '2px 0 6px' }}>{fewestSub}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
        <div style={{ fontSize: 12, color: MUT }}>Consent done</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: consentWarn ? '#c05' : G }}>{consent} of {consentTotal}</div>
      </div>
      <div style={{ fontSize: 11, color: MUT }}>Wellness and growth stay with the coaches. You see counts, not names.</div>
    </div>
  )
}

function WorkingOn({ phase, desc, planned, total }: { phase: string; desc: string; planned: number; total: number }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Working on · {phase}</div>
      <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>{desc}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: MUT }}>
        <span>Sessions planned in Clean Sheet</span>
        <span style={{ fontWeight: 700, color: INK }}>{planned} of {total}</span>
      </div>
      <div style={{ fontSize: 11, color: MUT, marginTop: 4 }}>Plans follow the national curriculum for this age. The coach picks the drills.</div>
    </div>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <Nav />
      <div style={{ padding: 32 }}>{children}</div>
    </div>
  )
}

function PageHeader({ name, badge, sub }: { name: string; badge: string; sub: string }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>{name}</div>
        <div style={{ fontSize: 12, fontWeight: 700, background: PALE, color: G, padding: '3px 10px', borderRadius: 20 }}>{badge}</div>
      </div>
      <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>{sub}</div>
    </>
  )
}

function TwoCols({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}

import React, { useState } from 'react'

export function D7U9Blue() {
  return (
    <Shell>
      <PageHeader name="U9 Mark" badge="Kangaroos · MiniRoos" sub="coach Mark Ellis (away Sat) · 11 players · read-only, the way its coaches see it" />
      <TwoCols
        left={<>
          <StatGrid stats={[
            { label: 'Coming Saturday', val: '9 of 11', sub: 'Parents answer in the app' },
            { label: 'Had a turn in goal', val: '7 of 11', sub: 'This term · everyone gets a go' },
            { label: 'Training turnout', val: '84%', sub: 'Last 2 weeks · club 87%', warn: true },
            { label: 'Game leader', val: 'Booked', sub: 'Saturday · no scores or ladder under 12' },
          ]} />
          <NeedsAttention items={[
            { text: 'No coach on Saturday', sub: 'Mark is away. Tom Albers can cover if U9 Tom kicks off 30 minutes earlier.', action: 'Ask Tom' },
          ]} />
          <WorkingOn phase="Discovery phase" desc="Fun games with a ball each. This fortnight: running with the ball." planned={10} total={12} />
        </>}
        right={<>
          <StaffCard
            staff={[
              { initials: 'ME', name: 'Mark Ellis', role: 'Coach · away Sat', check: 'Valid · Oct 2027' },
              { initials: 'KS', name: 'Kerry Shaw', role: 'Team manager', check: 'Valid · Mar 2027' },
            ]}
            fitness="Coach runs the 11+ Kids warm-up."
          />
          <NextGame date="Sat 6 Jun" opp="Glenview Park" time="9:00 · Home · pitch 4" loc="" note="Clips only · no scores under U12&#10;Training Tue 5:00" />
          <Players fewest="54% of a game" fewestSub="Everyone over half a game" consent={10} consentTotal={11} />
        </>}
      />
    </Shell>
  )
}

export function D7U9Green() {
  return (
    <Shell>
      <PageHeader name="U9 Tom" badge="Joeys · MiniRoos" sub="coach Tom Albers · 10 players · read-only, the way its coaches see it" />
      <TwoCols
        left={<>
          <StatGrid stats={[
            { label: 'Coming Saturday', val: '9 of 10', sub: 'Parents answer in the app' },
            { label: 'Had a turn in goal', val: '4 of 10', sub: 'This term · everyone gets a go', warn: true },
            { label: 'Training turnout', val: '93%', sub: 'Last 2 weeks · club 87%' },
            { label: 'Game leader', val: 'Booked', sub: 'Saturday · no scores or ladder under 12' },
          ]} />
          <NeedsAttention items={[
            { text: 'Club course due', sub: "Tom hasn't done the club course yet. Next one is Sat 20 Jun.", action: 'Book Tom' },
          ]} />
          <WorkingOn phase="Discovery phase" desc="Fun games with a ball each. This fortnight: running with the ball." planned={9} total={12} />
        </>}
        right={<>
          <StaffCard
            staff={[
              { initials: 'TA', name: 'Tom Albers', role: 'Coach', check: 'Valid · Aug 2027' },
              { initials: 'AR', name: 'Amy Reid', role: 'Team manager', check: 'Valid · Jun 2027' },
            ]}
            fitness="Coach runs the 11+ Kids warm-up."
          />
          <NextGame date="Sat 6 Jun" opp="Ironbark United" time="8:30 · Away · Ironbark Park" loc="" note="Clips only · no scores under U12&#10;Training Wed 5:00" />
          <Players fewest="60% of a game" fewestSub="Everyone over half a game" consent={10} consentTotal={10} />
        </>}
      />
    </Shell>
  )
}

export function D7U10Mixed() {
  return (
    <Shell>
      <PageHeader name="U10 Nadia" badge="Wallabies · MiniRoos" sub="coach Nadia Rahman · 13 players · read-only, the way its coaches see it" />
      <TwoCols
        left={<>
          <StatGrid stats={[
            { label: 'Coming Saturday', val: '11 of 13', sub: 'Parents answer in the app' },
            { label: 'Had a turn in goal', val: '8 of 13', sub: 'This term · everyone gets a go' },
            { label: 'Training turnout', val: '86%', sub: 'Last 2 weeks · club 87%' },
            { label: 'Game leader', val: 'Booked', sub: 'Saturday · no scores or ladder under 12' },
          ]} />
          <NeedsAttention items={[
            { text: "1 family hasn't done consent", sub: "Their child can't be in team photos yet.", action: 'Remind' },
          ]} />
          <WorkingOn phase="Skill Acquisition phase" desc="One core skill a fortnight, in small games. Now: first touch." planned={12} total={12} />
        </>}
        right={<>
          <StaffCard
            staff={[
              { initials: 'NR', name: 'Nadia Rahman', role: 'Coach', check: 'Valid · Feb 2028' },
              { initials: 'BC', name: 'Ben Cole', role: 'Co-coach', check: 'Valid · Jun 2027' },
              { initials: 'AF', name: 'Amy Fox', role: 'Team manager', check: 'Valid · Aug 2027' },
            ]}
            fitness="Coach runs the 11+ Kids warm-up."
          />
          <NextGame date="Sat 6 Jun" opp="Tealside Town" time="9:30 · Away · Elderberry Park" loc="" note="Clips only · no scores under U12&#10;Training Mon and Wed 5:30" />
          <Players fewest="52% of a game" fewestSub="Everyone over half a game" consent={12} consentTotal={13} />
        </>}
      />
    </Shell>
  )
}

export function D7U12Girls() {
  return (
    <Shell>
      <PageHeader name="U12 Girls Ana" badge="Division 1 · Juniors" sub="coach Ana Silva · 15 players · read-only, the way its coaches see it" />
      <TwoCols
        left={<>
          <StatGrid stats={[
            { label: 'Last 5', val: 'W D W W W', sub: '4 W · 1 D · 0 L' },
            { label: 'Playing our way', val: '74%', sub: 'Club average 67%' },
            { label: 'Training turnout', val: '94%', sub: 'Last 2 weeks · club 87%' },
            { label: 'Games recorded', val: '6 of 6', sub: 'Of the last 6' },
          ]} />
          <NeedsAttention items={[]} />
          <WorkingOn phase="Skill Acquisition phase" desc="One core skill a fortnight, in small games. Now: first touch." planned={7} total={12} />
        </>}
        right={<>
          <StaffCard
            staff={[
              { initials: 'AS', name: 'Ana Silva', role: 'Coach', check: 'Valid · Aug 2027' },
              { initials: 'DM', name: 'Dee Moss', role: 'Co-coach', check: 'Valid · Feb 2027' },
              { initials: 'TW', name: 'Tina Wu', role: 'Team manager', check: 'Valid · Oct 2027' },
            ]}
            fitness="Coach runs the 11+ Kids warm-up."
          />
          <NextGame date="Sat 6 Jun" opp="Tealside Town" time="11:00 · Home · pitch 2" loc="" note="Camera: Kit 3&#10;Training Tue and Thu 5:45" />
          <Players fewest="60% of a game" fewestSub="Everyone over half a game" consent={15} consentTotal={15} />
        </>}
      />
    </Shell>
  )
}

export function D7U13Boys() {
  return (
    <Shell>
      <PageHeader name="U13 Chris" badge="Division 2 · Juniors" sub="coach Chris Pham · 17 players · read-only, the way its coaches see it" />
      <TwoCols
        left={<>
          <StatGrid stats={[
            { label: 'Last 5', val: 'L W L L D', sub: '1 W · 1 D · 3 L', warn: true },
            { label: 'Playing our way', val: '58%', sub: 'Club average 67%', warn: true },
            { label: 'Training turnout', val: '81%', sub: 'Last 2 weeks · club 87%', warn: true },
            { label: 'Games recorded', val: '3 of 6', sub: 'Of the last 6', warn: true },
          ]} />
          <NeedsAttention items={[
            { text: "Chris's check ends in 9 days", sub: "He can't coach from 14 Jun without it.", action: 'Send link' },
            { text: 'Only 3 of 6 games recorded', sub: 'No camera free on Saturdays while Kit 2 is at repair.', action: 'See kit' },
            { text: "2 families haven't done consent", sub: "Their clips are blurred and sensor data isn't kept.", action: 'Remind' },
          ]} />
          <WorkingOn phase="Skill Acquisition phase" desc="One core skill a fortnight, in small games. Now: first touch." planned={9} total={12} />
        </>}
        right={<>
          <StaffCard
            staff={[
              { initials: 'CP', name: 'Chris Pham', role: 'Coach', check: 'Ends in 9 days', warn: true },
              { initials: 'VL', name: 'Vic Lowe', role: 'Team manager', check: 'Valid · Sep 2027' },
            ]}
            fitness="No fitness lead · coach runs warm-ups."
          />
          <NextGame date="Sat 6 Jun" opp="Glenview Park" time="12:30 · Away · Glenview Reserve" loc="" note="No camera booked&#10;Training Mon and Wed 6:30" />
          <Players fewest="51% of a game" fewestSub="Everyone over half a game" consent={15} consentTotal={17} warn={true} />
        </>}
      />
    </Shell>
  )
}

export function D7U13Girls() {
  return (
    <Shell>
      <PageHeader name="U13 Girls Meg" badge="Division 1 · Juniors" sub="coach Meg Doyle · 18 players · read-only, the way its coaches see it" />
      <TwoCols
        left={<>
          <StatGrid stats={[
            { label: 'Last 5', val: 'W W D W L', sub: '3 W · 1 D · 1 L' },
            { label: 'Playing our way', val: '69%', sub: 'Club average 67%' },
            { label: 'Training turnout', val: '89%', sub: 'Last 2 weeks · club 87%' },
            { label: 'Games recorded', val: '6 of 6', sub: 'Of the last 6' },
          ]} />
          <NeedsAttention items={[]} />
          <WorkingOn phase="Skill Acquisition phase" desc="One core skill a fortnight, in small games. Now: first touch." planned={10} total={12} />
        </>}
        right={<>
          <StaffCard
            staff={[
              { initials: 'MD', name: 'Meg Doyle', role: 'Coach', check: 'Valid · Jul 2027' },
              { initials: 'SR', name: 'Sian Ross', role: 'Co-coach', check: 'Valid · Jan 2028' },
              { initials: 'PS', name: 'Priya Shah', role: 'Fitness (club)', check: 'Ends in 29 days', warn: true },
            ]}
            fitness="Priya Shah, club fitness lead."
          />
          <NextGame date="Sat 6 Jun" opp="Tallwood City" time="12:00 · Home · pitch 1" loc="" note="Camera: Kit 4&#10;Training Tue and Thu 6:30" />
          <Players fewest="53% of a game" fewestSub="Everyone over half a game" consent={18} consentTotal={18} />
        </>}
      />
    </Shell>
  )
}

export function D7U16Boys() {
  return (
    <Shell>
      <PageHeader name="U16 Ollie" badge="Division 1 · Juniors" sub="coach Ollie Grant · 14 players · read-only, the way its coaches see it" />
      <TwoCols
        left={<>
          <StatGrid stats={[
            { label: 'Last 5', val: 'L D L W L', sub: '1 W · 1 D · 3 L', warn: true },
            { label: 'Playing our way', val: '55%', sub: 'Club average 67%', warn: true },
            { label: 'Training turnout', val: '76%', sub: 'Last 2 weeks · club 87%', warn: true },
            { label: 'Games recorded', val: '5 of 6', sub: 'Of the last 6' },
          ]} />
          <NeedsAttention items={[
            { text: 'Heavy legs two weeks running', sub: 'Load up 30% on their usual. Priya has cut Monday to a light session.', action: 'Message Priya' },
            { text: '4 players under a third of a game', sub: 'Club target from U14 is a third. Ollie knows.', action: 'Talk to Ollie' },
          ]} />
          <WorkingOn phase="Game Training phase" desc="One team task a session. Now: playing out against a press." planned={6} total={12} />
        </>}
        right={<>
          <StaffCard
            staff={[
              { initials: 'OG', name: 'Ollie Grant', role: 'Coach', check: 'Valid · Jun 2027' },
              { initials: 'MK', name: 'Matt Kerr', role: 'Assistant', check: 'Valid · Apr 2028' },
              { initials: 'PS', name: 'Priya Shah', role: 'Fitness (club)', check: 'Ends in 29 days', warn: true },
            ]}
            fitness="Priya Shah, club fitness lead."
          />
          <NextGame date="Sat 6 Jun" opp="Harbour Rovers" time="3:30 · Away · Rovers Park" loc="" note="No camera booked&#10;Training Mon and Wed 7:00" />
          <Players fewest="22% of a game" fewestSub="4 players under a third" consent={14} consentTotal={14} warn={true} />
        </>}
      />
    </Shell>
  )
}
