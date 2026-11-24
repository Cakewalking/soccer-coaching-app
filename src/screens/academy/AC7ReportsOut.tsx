// AC7-ReportsOut: Academy owner: term reports drafted and waiting for approval, team by team.
// A template over the store (programs v2, 24 Nov): "Drafted" is counted from each player's term report, which the coach drafts in ACC6.
// A report holds the four core skills (the older board said five; the academy has four). The menus above it are the owner app's own.
import { S } from './adStyles'
import Tap from './Tap'
import { count, playersIn, teamBoard, useAcademy } from './academyStore'
import { Cap, Head, Kpi, Kpis, MAIN, Num, Of, Proof, Row, Sources, Th, Tile } from './kit'

const COLS = '1.3fr 1.2fr 1.3fr 1fr 80px'
// "Waiting for you" is the drafts a coach has checked and passed on. Passing a draft on is not in the list of players yet,
// so the designer's stand-in is used: half of a team's drafts, rounded down. It moves when a draft is written, but it is not a count.
const waiting = (drafted: number) => Math.floor(drafted / 2)

export default function AC7ReportsOut() {
  const a = useAcademy(), all = count(a.players), rows = a.groups.map(g => ({ g, s: count(playersIn(a, g.id)) }))
  const wait = rows.reduce((t, r) => t + waiting(r.s.report), 0), tooNew = a.players.filter(p => p.term_report === 'Too new').length
  return (
    <main style={MAIN}>
      <Head title="Term reports" sub="Term 2 · due to families in week 9">
        <Tap to="ADP2-TermReport" style={S.more}>See a finished report</Tap>
        <Tap say={`${wait} reports approved and sent to families.`} style={S.primary}>Approve {wait} and send</Tap>
      </Head>
      <Kpis n={3}>
        <Kpi label="Drafted" value={`${all.report} of ${all.n}`} sub="By the coaches" />
        <Kpi label="Waiting for you" value={wait} sub="Read, then approve" />
        <Kpi label="Too new for a report" value={tooNew} sub="Joined in the last 4 weeks" />
      </Kpis>
      <Tile title="Team by team" right={<Proof kind="Strong" />}>
        <Th cols={COLS} heads={['Team', 'Coach', 'Drafted', 'Waiting for you', '']} />
        {rows.map(({ g, s }) => (
          <Row key={g.id} cols={COLS} h={50}>
            <strong>{g.name}</strong>
            <span>{g.coach}</span>
            <Of n={s.report} of={s.n} />
            <Num>{waiting(s.report) || 'None'}</Num>
            <Tap to={teamBoard(g)} style={S.more} aria-label={`Open ${g.name}`}>Open</Tap>
          </Row>
        ))}
        <Cap style={{ paddingTop: 6 }}>A coach checks each draft, then you approve it. Nothing reaches a parent that a person hasn’t read. A report holds the four core skills then and now, what they came to, one goal for next term, and a clip where the parent agreed. No rankings.</Cap>
      </Tile>
      <Sources items={[['Coaches draft here', 'ACC6-ReportDraft'], ['What a family sees', 'ADP2-TermReport']]} />
    </main>
  )
}
