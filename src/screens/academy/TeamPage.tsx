// ADG01-Team to ADG17-Team (and any team the owner adds): ONE page for a team, drawn like the boards and counted from the store.
// Places, attendance week by week, progress by skill, what the team earns, the coach's four basics, what needs the owner, every player.
// Nothing here is typed in. When the roll, a goal, a fee or a rate changes in the store, this page changes with it.
import { useContext } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { OwnerGo } from './ownerMenu'
import { changeTeam } from './ownerFocus'
import { CAME_LOW, basics, cameOf, isNew, money, needs, playerBoard, playersIn, teamCounts, upsBySkill, useAcademy, groupOf, worthACall, SESSIONS_A_TERM } from './academyStore'
import { Cap, FeePill, G, Head, Kpi, Kpis, LINE, LOW, Lines, Link, MAIN, MAUVE, Met, Num, PALE, Pill, PlayerName, Proof, Row, SOURCES, Sources, Steps, Term3Pill, Th } from './kit'

const COLS = '1.55fr 0.6fr 1.5fr 1.7fr 0.5fr 0.8fr 0.9fr'
const BASIC_SUB = ['Two taps a player after a session', 'One goal a player, a term', 'Families who see progress tend to stay', 'Due to you in week 9']
const BASIC_TO = ['ADC11-AfterSession', 'ADC10-SetGoal', 'ADC3-SessionFilm', 'AC7-ReportsOut']

export default function TeamPage({ id }: { id: string }) {
  const a = useAcademy(), g = groupOf(a, id), go = useContext(OwnerGo)
  if (!g) return <main style={MAIN}><Head title="Team not found" sub="This team is not in the academy’s list."><Tap to="AC2-Programs" style={S.more}>All programs</Tap></Head></main>
  const ps = playersIn(a, g.id), s = teamCounts(a, g), n = s.n, ups = upsBySkill(a, ps), four = basics(ps), need = needs(a, g)
  const row = (label: string, value: string, bold = false) => (
    <span style={{ display: 'flex', justifyContent: 'space-between', gap: 10, minHeight: 30, alignItems: 'center', borderTop: `1px solid ${LINE}`, fontSize: 14, fontWeight: bold ? 700 : undefined, boxSizing: 'content-box' }}><span>{label}</span><span style={S.num}>{value}</span></span>
  )
  return (
    <main style={MAIN}>
      <Head title={g.name} sub={`${g.ages} · ${g.when} · ${g.where} · Coach: ${g.coach} · Game team: ${g.team}`}>
        <Tap to="AC2-Programs" style={S.more}>All programs</Tap>
        <a href="/__screen/AD20-NewProgram" onClick={e => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); changeTeam(g.id); go('AD20-NewProgram') }} style={S.more}>Change this team</a>
        <Tap to="AC12-AcademyBroadcast" style={S.primary}>Message these families</Tap>
      </Head>
      <Kpis n={5}>
        <Kpi label="Places" value={`${n} of ${g.cap}`} sub={s.open > 0 ? `${s.open} open` : 'Full'} bg={s.open > 0 ? '#ffffff' : PALE} />
        <Kpi label="Came to sessions" value={`${s.att}%`} sub={`${s.came} of ${s.of} turn-ups over ${g.dates.length} sessions`} />
        <Kpi label="Up a step this term" value={`${s.up} of ${n}`} sub="On at least one core skill" />
        <Kpi label="Staying for Term 3" value={`${s.staying} of ${n}`} sub={`${s.notSaid} not said · ${s.leaving} leaving`} bg={s.notSaid * 3 > n ? MAUVE : '#ffffff'} />
        <Kpi label="Fees collected" value={money(s.collected)} sub={`of ${money(s.billed)} billed${s.owed ? ` · ${money(s.owed)} owed` : ' · all paid'}`} />
      </Kpis>
      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', gap: 12 }}>
        <section style={{ ...S.tile, gap: 6, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>Who came, week by week</h2><Proof kind="Strong" /></div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 120 }}>
            {s.weeks.map(w => (
              <span key={w.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <strong style={{ ...S.num, fontSize: 13 }}>{w.pct}%</strong>
                <span style={{ width: '100%', height: Math.max(6, Math.round((w.pct - 60) * 1.6)), borderRadius: '6px 6px 0 0', background: w.pct >= CAME_LOW * 100 ? G : LOW }} />
                <span style={{ fontSize: 12, color: '#4a5a57' }}>Wk {w.week}</span>
              </span>
            ))}
            {s.weeks.length === 0 && <Cap>No sessions yet.</Cap>}
          </div>
          <Cap>From the roll at each session. Below 85% shows in mauve.</Cap>
        </section>
        <section style={{ ...S.tile, gap: 2, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>Where the progress is</h2><Proof kind="Estimate" /></div>
          {ups.slice(0, 3).map(u => <Met key={u.skill} title={u.skill} n={u.n} of={n} sub="players up a step" to="ADC11-AfterSession" />)}
          <Cap>{ups[3].skill}: {ups[3].n} of {n}. Steps are the coach’s own judgement.</Cap>
        </section>
        <section style={{ ...S.tile, gap: 0, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}><h2 style={S.h2}>What this group earns</h2><Link to="AD11-ProgramMoney">All programs</Link></div>
          {row(`Fees this term · ${n} players at ${money(g.price)} each`, money(s.billed))}
          {row(`Coaching · ${SESSIONS_A_TERM} sessions`, `−${money(s.coachCost)}`)}
          {row('Pitch hire', `−${money(s.pitch)}`)}
          {row('Left over this term', money(s.left), true)}
          <Cap style={{ marginTop: 6 }}>{s.open > 0 ? `Each open place is ${money(g.price)} a term. ${s.open} open is ${money(s.open * g.price)}.` : 'No open places. Before your own pay, insurance, kit and the trip.'}</Cap>
        </section>
      </div>
      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <section aria-label="Oversight" style={{ ...S.tile, gap: 2, padding: '12px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>Is the coach doing the basics?</h2><Proof kind="Strong" /></div>
          <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{g.coach} · counted from what was done in Clean Sheet</span>
          {/* Mauve below two-thirds, for the three the coach does week to week. Reports are not due until week 9, so they are never mauve here. */}
          {four.map((b, i) => <Met key={b.label} title={b.label} n={b.n} of={b.of} sub={BASIC_SUB[i]} to={BASIC_TO[i]} low={i < 3 && b.low} />)}
          <Cap style={{ marginTop: 'auto' }}>The coach sees these same four numbers on their own home.</Cap>
        </section>
        <section aria-label="Needs you" style={{ ...S.tile, gap: 0, padding: '12px 14px', flexGrow: 1, borderTop: '4px solid #c39797' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}><h2 style={S.h2}>Needs you</h2><Cap>{need.length === 1 ? '1 thing' : `${need.length} things`}</Cap></div>
          <Lines items={need} />
          <Cap style={{ marginTop: 'auto' }}>{need.length ? 'Each line opens the place to deal with it.' : 'Nothing needs you for this team.'}</Cap>
        </section>
      </div>
      <section style={{ ...S.tile, flex: 'none', gap: 2, padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>Every player · {n}</h2><Cap>In name order, never ranked. Steps are 1 to 5: first touch, running with the ball, one against one, striking.</Cap></div>
        <Th cols={COLS} heads={['Player', 'Came', 'Steps now', 'Goal this term', 'Clips', 'Term 3', 'Fees']} />
        {ps.map(p => { const c = cameOf(p); return (
          <Row key={p.id} cols={COLS} to={playerBoard(p)}>
            <PlayerName p={p} isNew={isNew(a, p)} />
            <Num low={worthACall(p)}>{c.came} of {c.of}</Num>
            <Steps p={p} />
            {p.goal ? <span style={{ fontSize: 13 }}>{p.goal}</span> : <Pill kind="mauve">Not set</Pill>}
            <Num>{p.clips_sent_this_term}</Num>
            <Term3Pill p={p} />
            <FeePill p={p} />
          </Row>
        ) })}
        {n === 0 && <Cap style={{ padding: '10px 0' }}>No players yet. Places fill as families accept an offer.</Cap>}
      </section>
      <Sources items={SOURCES} />
    </main>
  )
}
