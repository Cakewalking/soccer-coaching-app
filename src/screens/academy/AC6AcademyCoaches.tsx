// AC6-AcademyCoaches: Academy owner: every coach, each with their team and whether they are doing the basics.
// A template over the store (programs v2, 24 Nov): notes, goals, clips and steps are counted from each team's players.
// In team order, never ranked. Mauve is below two-thirds. Each row opens that coach's own page (CoachPage, pack v31), not the team.
// The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'
import { BASIC_LOW, count, playersIn, share, useAcademy, type Adult } from './academyStore'
import { coachBoard } from './coachStore'
import { Cap, Head, Kpi, Kpis, MAIN, MAUVE, Num, Of, Pill, Proof, Row, SAND, Sources, Th, Tile, Who } from './kit'

const COLS = '1.5fr 0.9fr 1fr 1fr 1fr 0.8fr 1fr'
/** The children check as one pill: a check that is running out first, then a link still to make, then Current. */
export const CheckPill = ({ x }: { x?: Adult }) => !x ? <Pill kind="mauve">To add</Pill> : x.check !== 'Current' ? <Pill kind="warn">{x.check}</Pill> : !x.linked ? <Pill kind="mauve">To link</Pill> : <Pill kind="good">Current</Pill>

export default function AC6AcademyCoaches() {
  const a = useAcademy(), all = count(a.players), noTeam = a.adults.filter(x => x.added && !a.groups.some(g => g.coach === x.name))
  return (
    <main style={MAIN}>
      <Head title="Coaches" sub={`${a.groups.length} coaches · one for each team · Term 2`}>
        <Tap to="AD10-WatchCoach" style={S.more}>Watch a coach</Tap>
        <Tap to="AD23-AddCoach" style={S.primary}>+ Add a coach</Tap>
      </Head>
      <Kpis n={4}>
        <Kpi label="Notes in the last 3 weeks" value={`${all.notes} of ${all.n}`} sub="players" />
        <Kpi label="A goal set" value={`${all.goal} of ${all.n}`} sub="players" />
        <Kpi label="Families sent a clip" value={`${all.clip} of ${all.n}`} sub="this term" />
        <Kpi label="Term reports drafted" value={`${all.report} of ${all.n}`} sub="Due in week 9" />
      </Kpis>
      <Tile title="Is every coach doing the basics?" right={<Proof kind="Strong" />}>
        <Th cols={COLS} heads={['Coach', 'Team', 'Notes written', 'Goals set', 'Clips to families', 'Up a step', 'Children check']} />
        {a.groups.map(g => { const s = count(playersIn(a, g.id)), n = s.n, low = (v: number) => n > 0 && share(v, n) < BASIC_LOW; return (
          <Row key={g.id} cols={COLS} to={coachBoard(a, g)} h={50}>
            <Who ini={g.ci} name={g.coach} sub={g.prog} bg={low(s.notes) || low(s.clip) ? MAUVE : SAND} />
            <span>{g.name} · {n}</span>
            <Of n={s.notes} of={n} low={low(s.notes)} />
            <Of n={s.goal} of={n} low={low(s.goal)} />
            <Of n={s.clip} of={n} low={low(s.clip)} />
            <Num>{s.up} of {n}</Num>
            <CheckPill x={a.adults.find(x => x.name === g.coach)} />
          </Row>
        ) })}
        <Cap style={{ paddingTop: 6 }}>In team order, never ranked. Mauve is below two-thirds. Each row opens that coach: their agreement, pay, details and team.{noTeam.length ? ` ${noTeam.map(x => x.name).join(', ')} ${noTeam.length === 1 ? 'has' : 'have'} been added and ${noTeam.length === 1 ? 'has' : 'have'} no team yet.` : ''}</Cap>
      </Tile>
      <Sources items={[['Notes after a session', 'ADC11-AfterSession'], ['Goals', 'ADC10-SetGoal'], ['Clips sent', 'ADC3-SessionFilm'], ['Children checks', 'AD17-Checks']]} />
    </main>
  )
}
