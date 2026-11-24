// AD9-RosterPay: Academy owner: sessions each coach ran this fortnight and what they are owed, ready for payroll.
// A template over the store (programs v2, 24 Nov): one row for each team's coach, in team order, paid at the one rate set in AD21.
// Change the rate in AD21 and every figure here moves.
import { S } from './adStyles'
import Tap from './Tap'
import { money, useAcademy, type Group } from './academyStore'
import { ONE_ON_ONES as ONES, ONE_RATE, coachBoard, fortnightSessions as teamSessions } from './coachStore'
import { Cap, Head, Kpi, Kpis, MAIN, Proof, Row, SAND, Sources, Th, Tile, Who } from './kit'

const COLS = '1.5fr 1.1fr 1.2fr 1.1fr 0.8fr'
// A fortnight's sessions, one-on-ones and their rate are in coachStore, so this table and each coach's own page (pack v31) cannot disagree. Each row opens that coach.
// Sample values, not in the list of players: who ran one-on-ones this fortnight and at what rate, the owner's own, and the one session covered.
const ONE_ON_ONES: Record<string, number> = Object.fromEntries(Object.entries(ONES).map(([n, v]) => [n, v.fortnight])), OWNER_ONES = 8, COVER = { n: 1, line: 'Sam ran Ollie’s Thursday' }

export default function AD9RosterPay() {
  const a = useAcademy(), rate = a.coach_rate_a_session
  const pay = (g: Group) => teamSessions(g) * g.rate + (ONE_ON_ONES[g.coach] ?? 0) * ONE_RATE
  const team = a.groups.reduce((t, g) => t + teamSessions(g), 0), ones = Object.values(ONE_ON_ONES).reduce((t, v) => t + v, 0) + OWNER_ONES, run = team + ones
  return (
    <main style={MAIN}>
      <Head title="Roster and pay" sub={`Fortnight · 25 May to 7 June · ${run} sessions · a team session pays ${money(rate)}`}>
        <Tap to="AD21-RatesCosts" style={S.more}>Change a rate</Tap>
        <Tap say={`A payroll file for ${a.groups.length} coaches is on its way to your email.`} style={S.primary}>Download for payroll</Tap>
      </Head>
      <Kpis n={4}>
        <Kpi label="Sessions run" value={run} sub={`${team} team sessions · ${ones} one-on-ones`} />
        <Kpi label="All closed on the tablet" value={`${run} of ${run}`} sub="Nothing left open" />
        <Kpi label="Owed this fortnight" value={money(a.groups.reduce((t, g) => t + pay(g), 0))} sub={`${a.groups.length} coaches · ${money(rate)} a team session`} />
        <Kpi label="Cover" value={COVER.n} sub={COVER.line} />
      </Kpis>
      <Tile title="This fortnight" right={<Proof kind="Strong" />}>
        <Th cols={COLS} heads={['Coach', 'Team', 'Team sessions', 'One-on-ones', 'Total']} />
        {a.groups.map(g => { const k = teamSessions(g), o = ONE_ON_ONES[g.coach] ?? 0; return (
          <Row key={g.id} cols={COLS} to={coachBoard(a, g)} h={50}>
            <Who ini={g.ci} name={g.coach} bg={SAND} />
            <span>{g.name}</span>
            <span>{k ? `${k} at ${money(g.rate)} · ${money(k * g.rate)}` : 'None yet'}</span>
            <span>{o ? `${o} at ${money(ONE_RATE)} · ${money(o * ONE_RATE)}` : 'None'}</span>
            <strong style={S.num}>{money(pay(g))}</strong>
          </Row>
        ) })}
        <Row cols={COLS} h={50}>
          <Who ini="DO" name="You" bg={SAND} />
          <span>One-on-ones</span>
          <span>None</span>
          <span>{OWNER_ONES}, not paid here</span>
          <strong style={S.num}>$0</strong>
        </Row>
        <Cap style={{ paddingTop: 6 }}>Counted from sessions that were opened and closed on the tablet. A session a coach covered is paid to the coach who ran it.</Cap>
      </Tile>
      <Sources items={[['Sessions run', 'ACC2-RunSession'], ['Rates', 'AD21-RatesCosts'], ['Timetable', 'AD3-Timetable']]} />
    </main>
  )
}
