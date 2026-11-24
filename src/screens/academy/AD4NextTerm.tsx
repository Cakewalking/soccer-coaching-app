// AD4-NextTerm: Academy owner: re-enrolment for next term: who is staying, who hasn't said and who is leaving, team by team.
// A template over the store (programs v2, 24 Nov): every count is of the Term 3 answer each family gives in the family app (ADP3).
import { S } from './adStyles'
import Tap from './Tap'
import { WAITING, count, playersIn, teamBoard, useAcademy } from './academyStore'
import { Cap, Head, Kpi, Kpis, MAIN, MAUVE, Num, Of, PALE, Proof, Row, Sources, Th, Tile } from './kit'

const COLS = '1.4fr 1fr 0.8fr 1.3fr 0.8fr 0.8fr'

export default function AD4NextTerm() {
  const a = useAcademy(), all = count(a.players)
  return (
    <main style={MAIN}>
      <Head title="Term 3" sub="13 July to 18 September · 10 weeks · the second instalment of the season · families could keep their place from Monday 1 June">
        <Tap to="AD20-NewProgram" style={S.more}>Set Term 3 prices</Tap>
        <Tap say={`Reminder sent to ${all.notSaid} families. Each can answer with one tap.`} style={S.primary}>Remind {all.notSaid} families</Tap>
      </Head>
      <Kpis n={4}>
        <Kpi label="Staying" value={`${all.staying} of ${all.n}`} sub="One tap in the family app" bg={PALE} />
        <Kpi label="Not yet said" value={all.notSaid} sub="Reminded once on Wednesday" bg={MAUVE} />
        <Kpi label="Leaving" value={all.leaving} sub="Most told you why" />
        {/* The waiting list is a sample value: it is not in the list of players. */}
        <Kpi label="Waiting for a place" value={WAITING.Advanced} sub="All for Advanced" />
      </Kpis>
      <Tile title="Team by team" right={<Proof kind="Strong" />}>
        <Th cols={COLS} heads={['Team', 'Coach', 'This term', 'Staying', 'Not said', 'Leaving']} />
        {a.groups.map(g => { const s = count(playersIn(a, g.id)); return (
          <Row key={g.id} cols={COLS} to={teamBoard(g)}>
            <strong>{g.name}</strong>
            <span>{g.coach}</span>
            <Num>{s.n}</Num>
            <Of n={s.staying} of={s.n} />
            <Num low={s.notSaid * 3 > s.n}>{s.notSaid}</Num>
            <Num>{s.leaving}</Num>
          </Row>
        ) })}
        <Cap style={{ paddingTop: 6 }}>Places not kept by Friday 19 June go to the waiting list.</Cap>
      </Tile>
      <Sources items={[['Families answer here', 'ADP3-KeepPlace'], ['Waiting list', 'ADP14-WaitingList'], ['Moves between teams', 'AD5-GroupMoves']]} />
    </main>
  )
}
