const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', BG = '#f5f6f4'

function CoachNav({ active }: { active: string }) {
  const tabs = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
  return (
    <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
      {tabs.map(t => (
        <div key={t} style={{ fontSize: 13, fontWeight: t === active ? 700 : 500, color: t === active ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek</div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>SK</div>
      </div>
    </div>
  )
}

function SidebarNav({ items, active }: { items: string[]; active: string }) {
  return (
    <div style={{ width: 200, background: '#fff', borderRight: `1px solid ${LN}`, flexShrink: 0, padding: '12px 0', display: 'flex', flexDirection: 'column' as const }}>
      {items.map(item => (
        <div key={item} style={{
          padding: '10px 20px', fontSize: 14,
          fontWeight: item === active ? 700 : 500,
          color: item === active ? G : MUT,
          background: item === active ? PALE : 'transparent',
          borderLeft: item === active ? `3px solid ${G}` : '3px solid transparent',
          cursor: 'pointer',
        }}>{item}</div>
      ))}
    </div>
  )
}

function Shell({ navActive, sideItems, sideActive, children }: {
  navActive: string; sideItems: string[]; sideActive: string; children: React.ReactNode
}) {
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <CoachNav active={navActive} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SidebarNav items={sideItems} active={sideActive} />
        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          {children}
        </div>
      </div>
    </div>
  )
}


// ─── WK1 This Week ───────────────────────────────────────────────────────────

export function WK1ThisWeek() {
  const trainingNav = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']
  const focuses = [
    { n: 1, title: 'Win the ball back faster', stat: '7 s on Saturday · usual is 4' },
    { n: 2, title: 'Keep the lines close', stat: '26 m gap · aim for 18 m' },
    { n: 3, title: 'Strong last 15 minutes', stat: 'Sprints dropped 22% late' },
  ]
  const days = [
    { day: 'TUESDAY', date: '2 Jun', status: 'Done', title: 'Pressing and shape', detail: 'Chase and tag · Win it back · Small game', note: 'Warm-up cut short by rain', extra: '15 of 16 came · 13 rated effort, average 6' },
    { day: 'WEDNESDAY', date: '3 Jun', status: 'Rest', title: 'Wellness check-ins only', detail: '', note: 'Ella low for the second day', extra: '' },
    { day: 'THURSDAY', date: '4 Jun', status: 'Tonight', title: 'Repeat and finish', detail: "5:45 · 11+ Kids warm-up with Priya\nRondo · Win it back · Small game", note: 'Noah and Zoe: 3 sprints · Kai: passing only', extra: 'Mia late, about 6:10' },
    { day: 'SATURDAY', date: '6 Jun', status: 'Game', title: 'vs Harbour Rovers', detail: 'Home · meet 8:40 · kick-off 9:30', note: '12 in · 1 maybe · 2 out · 2 to answer', extra: 'Team talk ready Friday night · Camera kit 1 booked by Rob' },
  ]
  const players = [
    { init: 'NO', name: 'Noah', note: 'Growing fast · 3 sprints Thursday, 8 Saturday' },
    { init: 'ZH', name: 'Zoe', note: 'Growing fast · same caps as Noah' },
    { init: 'EB', name: 'Ella', note: 'Low check-ins two days · lighter Thursday' },
    { init: 'KR', name: 'Kai', note: 'Tight hamstring · passing only, away Saturday' },
  ]
  return (
    <Shell navActive="Training" sideItems={trainingNav} sideActive="This week">
      <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>This week</div>
      <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Mon 2 to Sun 7 Jun · three things from Ironbark, worked on twice before Harbour Rovers</div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 12 }}>Drill library</div>
        {focuses.map(f => (
          <div key={f.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderTop: `1px solid ${LN}` }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{f.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{f.title}</div>
              <div style={{ fontSize: 12, color: MUT }}>{f.stat}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 24 }}>
        {days.map(d => {
          const statusColor = d.status === 'Done' ? '#16a34a' : d.status === 'Tonight' ? G : d.status === 'Game' ? '#1d4ed8' : MUT
          const statusBg = d.status === 'Done' ? '#f0fdf4' : d.status === 'Tonight' ? PALE : d.status === 'Game' ? '#eff6ff' : '#f5f5f5'
          return (
            <div key={d.day} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT }}>{d.day} {d.date}</div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: statusBg, color: statusColor }}>{d.status}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{d.title}</div>
              {d.detail && <div style={{ fontSize: 12, color: MUT, whiteSpace: 'pre-line' as const }}>{d.detail}</div>}
              {d.note && <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>{d.note}</div>}
              {d.extra && <div style={{ fontSize: 12, color: MUT }}>{d.extra}</div>}
            </div>
          )
        })}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT, marginBottom: 6 }}>NEXT TUESDAY 9 Jun</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Built after Saturday</div>
          <div style={{ fontSize: 12, color: MUT }}>Clean Sheet suggests it Sunday, once the review is in · Coach meeting at 7:30 pm</div>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>How we'll know on Saturday</div>
        {[
          { label: 'Seconds to win it back', was: '7 s', aim: '5 s' },
          { label: 'Gap between the lines', was: '26 m', aim: '20 m' },
          { label: 'Sprints after minute 45', was: 'Down 22%', aim: 'Down 10%' },
        ].map(m => (
          <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px solid ${LN}` }}>
            <div style={{ fontSize: 13, color: INK }}>{m.label}</div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
              <span style={{ color: MUT }}>Was {m.was}</span>
              <span style={{ fontWeight: 700, color: G }}>Aim {m.aim}</span>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Load: two 90-minute sessions and a 60-minute game.</div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Players to plan around</div>
        {players.map(p => (
          <div key={p.init} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderTop: `1px solid ${LN}` }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.init}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{p.name}</div>
              <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

// ─── CF1 Fixtures and Results ─────────────────────────────────────────────────

export function CF1Fixtures() {
  const homeNav = ['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff']
  const results = [
    { date: 'Sat 30 May', opp: 'Ironbark United', ha: 'A', score: '3–1', res: 'W' },
    { date: 'Sat 23 May', opp: 'Saltmarsh', ha: 'A', score: '1–2', res: 'L' },
    { date: 'Sat 16 May', opp: 'Tallwood City', ha: 'H', score: '1–1', res: 'D' },
    { date: 'Sat 9 May', opp: 'Tealside Town', ha: 'A', score: '2–0', res: 'W' },
    { date: 'Sat 2 May', opp: 'Kestrel Park', ha: 'H', score: '3–1', res: 'W' },
    { date: 'Sat 25 Apr', opp: 'Lyndhurst SC', ha: 'H', score: '2–1', res: 'W' },
    { date: 'Sat 18 Apr', opp: 'Riverside', ha: 'A', score: '0–2', res: 'L' },
    { date: 'Sat 11 Apr', opp: 'Banksia FC', ha: 'H', score: '4–2', res: 'W' },
  ]
  const upcoming = [
    { day: 'SAT', date: '6', title: 'vs Harbour Rovers', detail: '9:30 · meet 8:40 · white kit · Rob booked camera' },
    { day: 'SAT', date: '13', title: 'at Kestrel Park', detail: '9:00 · their ground' },
    { day: 'SAT', date: '20', title: 'at Banksia FC', detail: '9:00' },
    { day: 'SAT', date: '27', title: 'vs Riverside', detail: '9:30' },
  ]
  const ladder = [
    { pos: 1, name: 'Saltmarsh', played: 8, pts: 20 },
    { pos: 2, name: 'Riverside', played: 8, pts: 19 },
    { pos: 3, name: 'Wattle Creek', played: 8, pts: 16 },
    { pos: 4, name: 'Ironbark United', played: 8, pts: 14 },
    { pos: 5, name: 'Harbour Rovers', played: 8, pts: 12 },
    { pos: 6, name: 'Kestrel Park', played: 8, pts: 10 },
  ]
  const resColor = (r: string) => r === 'W' ? '#16a34a' : r === 'L' ? '#dc2626' : MUT
  const resBg = (r: string) => r === 'W' ? '#f0fdf4' : r === 'L' ? '#fef2f2' : '#f5f5f5'
  return (
    <Shell navActive="Home" sideItems={homeNav} sideActive="Fixtures and results">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 2 }}>Fixtures and results</div>
          <div style={{ fontSize: 13, color: MUT }}>U12 Sam · 3rd of 10 · 16 points from 8 games · 2 × 30 minutes, 9 a side</div>
        </div>
        <button style={{ height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Sync to my calendar</button>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Results · tap a game for its clips and review</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              {['Date', 'Opponent', 'H/A', 'Score', 'Result'].map(h => (
                <th key={h} style={{ padding: '8px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, textAlign: 'left' as const, borderTop: `1px solid ${LN}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} style={{ cursor: 'pointer', borderTop: `1px solid ${LN}` }}>
                <td style={{ padding: '12px 20px', fontSize: 13, color: MUT }}>{r.date}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, fontWeight: 600, color: INK }}>{r.opp}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, color: MUT }}>{r.ha}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, fontWeight: 700, color: INK }}>{r.score}</td>
                <td style={{ padding: '12px 20px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: resBg(r.res), color: resColor(r.res) }}>{r.res}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '12px 20px', fontSize: 12, color: MUT, borderTop: `1px solid ${LN}` }}>5 wins, 1 draw, 2 losses · 16 goals for, 10 against · every game recorded.</div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Coming up</div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          {upcoming.map((u, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
              <div style={{ width: 48, flexShrink: 0, textAlign: 'center' as const }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: MUT }}>{u.day}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: G, lineHeight: 1 }}>{u.date}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{u.title}</div>
                <div style={{ fontSize: 12, color: MUT }}>{u.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Ladder</div>
          <div style={{ fontSize: 12, color: MUT }}>Top 6 of 10 · from Dribl</div>
        </div>
        {ladder.map((l, i) => (
          <div key={l.pos} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
            <div style={{ width: 24, fontSize: 14, fontWeight: 700, color: l.name === 'Wattle Creek' ? G : MUT, textAlign: 'center' as const }}>{l.pos}</div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: l.name === 'Wattle Creek' ? 700 : 500, color: l.name === 'Wattle Creek' ? G : INK }}>{l.name}</div>
            <div style={{ fontSize: 12, color: MUT }}>{l.played} games</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, width: 32, textAlign: 'right' as const }}>{l.pts}</div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

// ─── AV1 Availability ─────────────────────────────────────────────────────────

export function AV1Availability() {
  const squadNav = ['Players', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy']
  const events = [
    {
      title: 'Sat 6 Jun · 9:30', sub: 'vs Harbour Rovers',
      ins: [
        { init: 'AL', name: 'Ava Lindqvist', note: '' },
        { init: 'TR', name: 'Tom Reyes', note: '' },
        { init: 'LM', name: 'Leo Marsh', note: '' },
        { init: 'GO', name: 'Grace Owusu', note: '' },
        { init: 'MT', name: 'Mia Tran', note: '' },
        { init: 'JP', name: 'Jai Patel', note: '' },
        { init: 'EB', name: 'Ella Brandt', note: 'Low check-ins this week' },
        { init: 'IM', name: 'Isla Morgan', note: '' },
        { init: 'OB', name: 'Oscar Brennan', note: '' },
        { init: 'NO', name: 'Noah Okafor', note: 'Sprint cap: 8' },
        { init: 'ZH', name: 'Zoe Hartley', note: '' },
        { init: 'FW', name: 'Finn Walsh', note: '' },
      ],
      maybes: [{ init: 'RC', name: 'Ruby Chen', note: "Might have a school concert" }],
      outs: [
        { init: 'KR', name: 'Kai Russo', note: 'Away: family wedding' },
        { init: 'LN', name: 'Lily Nguyen', note: 'Sick · told Rob on Thursday' },
      ],
    },
  ]
  return (
    <Shell navActive="Squad" sideItems={squadNav} sideActive="Availability">
      <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Availability</div>
      <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>17 players · answers from parents and players</div>

      {events.map((ev, ei) => (
        <div key={ei} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{ev.title}</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>{ev.sub}</div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: '#f0fdf4', color: '#16a34a' }}>In {ev.ins.length}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {ev.ins.map(p => (
                <div key={p.init} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: BG, borderRadius: 8, minWidth: 160 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.init}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{p.name}</div>
                    {p.note && <div style={{ fontSize: 11, color: MUT }}>{p.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: '#fffbeb', color: '#d97706' }}>Maybe {ev.maybes.length}</span>
            </div>
            {ev.maybes.map(p => (
              <div key={p.init} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: BG, borderRadius: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.init}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: '#fef2f2', color: '#dc2626' }}>Can't make it {ev.outs.length}</span>
            </div>
            {ev.outs.map(p => (
              <div key={p.init} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: BG, borderRadius: 8, marginBottom: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.init}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Tonight · 5:45</div>
        <div style={{ fontSize: 13, color: MUT }}>Training</div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Sat 13 Jun · 9:00</div>
        <div style={{ fontSize: 13, color: MUT }}>at Kestrel Park</div>
      </div>
    </Shell>
  )
}

// ─── MS1 Team Sheet ───────────────────────────────────────────────────────────

export function MS1TeamSheet() {
  const matchNav = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review']
  const onSheet = [
    { init: 'SD', name: 'Sam Delaney', satOut: 1 },
    { init: 'TR', name: 'Tom Reyes', satOut: 1 },
    { init: 'EB', name: 'Ella Brandt', satOut: 1 },
    { init: 'GO', name: 'Grace Owusu', satOut: 2 },
    { init: 'MT', name: 'Mia Tran', satOut: 1 },
    { init: 'JP', name: 'Jai Patel', satOut: 2 },
    { init: 'ZH', name: 'Zoe Hartley', satOut: 1 },
    { init: 'NO', name: 'Noah Okafor', satOut: 2 },
    { init: 'AL', name: 'Ava Lindqvist', satOut: 1 },
    { init: 'LM', name: 'Leo Marsh', satOut: 2 },
    { init: 'IM', name: 'Isla Morgan', satOut: 2 },
    { init: 'FW', name: 'Finn Walsh', satOut: 1 },
    { init: 'OB', name: 'Oscar Brennan', satOut: 2 },
    { init: 'HQ', name: 'Harper Quinn', satOut: 0, firstGame: true },
  ]
  const sittingOut = [
    { init: 'RC', name: 'Ruby Chen', note: "Her turn · sat out 0 of 8 so far", action: 'Suggested', warn: false },
    { init: 'KR', name: 'Kai Russo', note: 'Away · family trip', action: 'Away', warn: false },
    { init: 'LN', name: 'Lily Nguyen', note: 'Sick · told Rob on Thursday', action: 'Sick', warn: false },
  ]
  return (
    <Shell navActive="Match day" sideItems={matchNav} sideActive="Team sheet">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 2 }}>Team sheet</div>
          <div style={{ fontSize: 13, color: MUT }}>Sat 6 Jun vs Harbour Rovers · 14 of 17 · due in Dribl by 9:00</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: G, cursor: 'pointer' }}>Who's coming</button>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Send to Dribl</button>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>On the sheet · 14</div>
          <div style={{ fontSize: 12, color: MUT }}>No one is suspended · no letters needed</div>
        </div>
        {onSheet.map((p, i) => (
          <div key={p.init} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.init}</div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</span>
              {p.firstGame && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, padding: '1px 8px', borderRadius: 20, background: '#eff6ff', color: '#1d4ed8' }}>First game</span>}
            </div>
            {p.satOut > 0 && <div style={{ fontSize: 12, color: MUT }}>Sat out {p.satOut}</div>}
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Sitting out · 3</div>
          <div style={{ fontSize: 12, color: MUT }}>Tap to swap</div>
        </div>
        {sittingOut.map((p, i) => (
          <div key={p.init} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.init}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
              <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: PALE, color: G }}>{p.action}</span>
          </div>
        ))}
        <div style={{ padding: '12px 20px', borderTop: `1px solid ${LN}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 4 }}>How the turn is picked</div>
          <div style={{ fontSize: 12, color: MUT }}>1 · Away, sick or suspended — they come off first</div>
        </div>
      </div>
    </Shell>
  )
}

// ─── R1 Match Review ──────────────────────────────────────────────────────────

export function R1MatchReview() {
  const matchNav = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review']
  const styleRows = [
    { label: 'Goal kicks played short', actual: '64%', aim: '70%+', status: 'Close', dir: 'with' },
    { label: 'Wins of the ball in their half', actual: '13', aim: '12', status: 'On target', dir: 'without' },
    { label: 'Shots within 10 s of winning it', actual: '3', aim: '3', status: 'On target', dir: 'when-win' },
    { label: 'Seconds to win it back', actual: '7 s', aim: 'under 4 s', status: 'Off target', dir: 'when-lose' },
    { label: 'Gap between the lines', actual: '26 m', aim: 'under 18 m', status: 'Off target', dir: 'shape' },
    { label: 'Minutes shared fairly', actual: '15 of 16', aim: 'all within 20%', status: 'Close', dir: 'value' },
    { label: 'Weaker-foot touches', actual: '18%', aim: '20%+', status: 'Close', dir: 'value' },
  ]
  const works = [
    { clip: 'Min 16', title: 'Win the ball back faster', desc: 'One player pressed, the rest watched', stat: '7 s' },
    { clip: 'Min 29', title: 'Keep defence and midfield closer', desc: 'Gap before 6 of their 8 chances', stat: '26 m' },
    { clip: 'Min 52', title: 'Stay strong in the last 15 minutes', desc: 'Sprints dropped 22% after min 45', stat: '−22%' },
  ]
  const wents = [
    { min: 'Min 37', desc: 'Win it, go, goal in 8 seconds · Zoe to Mia to Jai' },
    { min: 'Min 9', desc: 'Eight passes out from the keeper · through their press' },
  ]
  const statusColor = (s: string) => s === 'On target' ? '#16a34a' : s === 'Off target' ? '#dc2626' : '#d97706'
  const statusBg = (s: string) => s === 'On target' ? '#f0fdf4' : s === 'Off target' ? '#fef2f2' : '#fffbeb'
  return (
    <Shell navActive="Match day" sideItems={matchNav} sideActive="Review">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: INK, marginBottom: 2 }}>3–1</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: G, marginBottom: 2 }}>Won away at Ironbark United</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 8 }}>Sat 30 May · Mia, Jai and Zoe scored · 7 key clips</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: PALE, color: G }}>Good data for 57 of 60 min</div>
          <button style={{ height: 32, padding: '0 16px', borderRadius: 20, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer' }}>Highlights · 4 min</button>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>How we played our style</div>
        </div>
        {styleRows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>Aim {r.aim}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.actual}</div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: statusBg(r.status), color: statusColor(r.status), flexShrink: 0 }}>{r.status}</span>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Work on this week</div>
          <button style={{ height: 32, padding: '0 14px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: G, cursor: 'pointer' }}>Open Thursday's plan</button>
        </div>
        {works.map((w, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
            <div style={{ width: 48, height: 44, borderRadius: 8, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flexShrink: 0 }}>{w.clip}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{w.title}</div>
              <div style={{ fontSize: 12, color: MUT }}>{w.desc}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#dc2626', flexShrink: 0 }}>{w.stat}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>What went well</div>
        {wents.map((w, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
            <div style={{ width: 48, height: 44, borderRadius: 8, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#16a34a', flexShrink: 0 }}>{w.min}</div>
            <div style={{ fontSize: 13, color: INK }}>{w.desc}</div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

// ─── SE1 Season Summaries ─────────────────────────────────────────────────────

export function SE1SeasonSummaries() {
  const squadNav = ['Players', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy']
  const players = [
    { init: 'MT', name: 'Mia Tran', status: 'Ready' },
    { init: 'NO', name: 'Noah Okafor', status: 'Ready' },
    { init: 'EB', name: 'Ella Brandt', status: 'Ready' },
    { init: 'JP', name: 'Jai Patel', status: 'Check' },
    { init: 'ZH', name: 'Zoe Hartley', status: 'Check' },
    { init: 'GO', name: 'Grace Owusu', status: 'Ready' },
    { init: 'LM', name: 'Leo Marsh', status: 'To write' },
    { init: 'HQ', name: 'Harper Quinn', status: 'To write' },
  ]
  const statusColor = (s: string) => s === 'Ready' ? '#16a34a' : s === 'Check' ? '#d97706' : MUT
  const statusBg = (s: string) => s === 'Ready' ? '#f0fdf4' : s === 'Check' ? '#fffbeb' : '#f5f5f5'
  return (
    <Shell navActive="Squad" sideItems={squadNav} sideActive="Players">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 2 }}>Season summaries</div>
          <div style={{ fontSize: 13, color: MUT }}>U12 Sam · season 2026 · 9 ready, 5 to check, 3 to write</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: G, cursor: 'pointer' }}>What parents see</button>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Send the 9 ready</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Players · 8 of 17 shown</div>
          {players.map((p, i) => (
            <div key={p.init} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderTop: i === 0 ? 'none' : `1px solid ${LN}`, cursor: 'pointer', background: p.init === 'MT' ? PALE : 'transparent' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.init === 'MT' ? G : '#d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.init}</div>
              <div style={{ flex: 1, fontSize: 13, fontWeight: p.init === 'MT' ? 700 : 500, color: INK }}>{p.name}</div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 8px', borderRadius: 20, background: statusBg(p.status), color: statusColor(p.status) }}>{p.status}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>MT</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: INK }}>Mia Tran</div>
              <div style={{ fontSize: 12, color: MUT }}>To Linh Tran, and to Mia's app</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20, background: '#f0fdf4', color: '#16a34a' }}>Ready to send</span>
          </div>

          {[
            { label: 'Games', value: '17 of 18' },
            { label: 'Minutes', value: 'Fair share' },
            { label: 'Goals met', value: '2 of 2' },
            { label: 'Check-ins', value: '9 in 10' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, color: MUT }}>{s.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{s.value}</div>
            </div>
          ))}

          <div style={{ background: BG, borderRadius: 10, padding: '14px 16px', margin: '16px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Your note · drafted for you, change anything</div>
            <div style={{ fontSize: 14, color: INK, lineHeight: 1.6 }}>Mia set out to use her left foot more, and by August she was scoring with it. She's the first to help a teammate up. Next year: keep looking before the ball comes.</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Goals this season</div>
            <div style={{ fontSize: 13, color: G, marginBottom: 4 }}>✓ Use her left foot more</div>
            <div style={{ fontSize: 13, color: G }}>✓ Look before the ball comes</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Favourite clip · picked by Mia</div>
            <div style={{ fontSize: 13, color: INK }}>Left foot, low across the keeper, v Ironbark United</div>
          </div>

          <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>Left out on purpose: running numbers, sprint counts, wellness answers and anything that compares her with teammates.</div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ height: 44, flex: 1, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: G, cursor: 'pointer' }}>Edit</button>
            <button style={{ height: 44, flex: 1, borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Send Mia's</button>
          </div>
        </div>
      </div>
    </Shell>
  )
}

// ─── Empty states for SE1e and AV1e ──────────────────────────────────────────

export function SE1eSeasonSummariesEmpty() {
  const squadNav = ['Players', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy']
  return (
    <Shell navActive="Squad" sideItems={squadNav} sideActive="Players">
      <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Season summaries</div>
      <div style={{ fontSize: 13, color: MUT, marginBottom: 32 }}>U12 Sam · season 2026</div>
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '48px 24px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>No summaries yet</div>
        <div style={{ fontSize: 14, color: MUT, marginBottom: 20 }}>Summaries are drafted from your session notes and goals as the season progresses.</div>
        <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Check a summary</button>
      </div>
    </Shell>
  )
}

export function AV1eAvailabilityEmpty() {
  const squadNav = ['Players', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy']
  return (
    <Shell navActive="Squad" sideItems={squadNav} sideActive="Availability">
      <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Availability</div>
      <div style={{ fontSize: 13, color: MUT, marginBottom: 32 }}>17 players</div>
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '48px 24px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>No availability yet</div>
        <div style={{ fontSize: 14, color: MUT, marginBottom: 20 }}>Parents and players answer availability through the app when you post upcoming sessions.</div>
        <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Post upcoming sessions</button>
      </div>
    </Shell>
  )
}
