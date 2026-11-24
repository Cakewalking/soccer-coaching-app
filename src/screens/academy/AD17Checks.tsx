// AD17-Checks: Academy owner: the children check, the link to the academy and the child safety course for every adult who works with children.
// A template over the store (programs v2, 24 Nov): one row for the owner and for each team's coach, in team order, and for any adult added in AD23.
// The checks themselves are typed in by the owner (AD23): Clean Sheet reminds; it does not check with the state.
import { S } from './adStyles'
import Tap from './Tap'
import { useAcademy } from './academyStore'
import { Cap, Head, Kpi, Kpis, MAIN, MAUVE, PALE, Pill, Row, Th, Tile, Who } from './kit'

const COLS = '1.5fr 1fr 1.2fr 1fr 1fr'
const WORD = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
const word = (n: number) => WORD[n] ?? String(n)

export default function AD17Checks() {
  const a = useAcademy(), all = a.adults, n = all.length
  const current = all.filter(x => x.checkOk), ending = current.filter(x => x.check !== 'Current'), linked = all.filter(x => x.linked), course = all.filter(x => x.course)
  const toChase = all.filter(x => !x.checkOk || x.check !== 'Current' || !x.linked), first = (l: typeof all) => l.map(x => x.name.split(' ')[0])
  const list = (l: string[]) => l.length > 1 ? `${l.slice(0, -1).join(', ')} and ${l[l.length - 1]}` : l[0]
  return (
    <main style={MAIN}>
      <Head title="Children checks" sub={`${n} adults work with children here: ${n - 1} coaches and you`}>
        {toChase.length > 0 && <Tap say={`Reminder sent to ${list(first(toChase))}.`} style={S.more}>Remind the {word(toChase.length).toLowerCase()}</Tap>}
        <Tap to="AD23-AddCoach" style={S.primary}>+ Add a coach</Tap>
      </Head>
      <Kpis n={3}>
        <Kpi label="A current check" value={`${current.length} of ${n}`} sub={ending.length ? `${word(ending.length)} ${ending.length === 1 ? 'runs' : 'run'} out ${ending[0].check.replace(/^Runs out /, 'on ')}` : current.length < n ? `${word(n - current.length)} still to look up` : 'None running out'} bg={current.length < n ? MAUVE : '#ffffff'} />
        <Kpi label="Linked to the academy" value={`${linked.length} of ${n}`} sub={linked.length < n ? `${word(n - linked.length)} new ${n - linked.length === 1 ? 'coach' : 'coaches'} to link this week` : 'Everyone is linked'} bg={linked.length < n ? MAUVE : PALE} />
        <Kpi label="Child safety course" value={`${course.length} of ${n}`} sub={course.length < n ? `${word(n - course.length)} still to do it` : 'Everyone has done it'} />
      </Kpis>
      <Tile title="Everyone" right={<Cap>You typed each number in. Clean Sheet reminds; it does not check with the state.</Cap>}>
        <Th cols={COLS} heads={['Adult', 'Role', 'Children check', 'Linked to the academy', 'Child safety course']} />
        {all.map(x => (
          <Row key={x.name} cols={COLS} to="AD23-AddCoach">
            <Who ini={x.ci} name={x.name} />
            <span>{x.role}</span>
            {!x.checkOk ? <Pill kind="mauve">To look up</Pill> : x.check !== 'Current' ? <Pill kind="warn">{x.check}</Pill> : <Pill kind="good">Current</Pill>}
            {x.linked ? <Pill kind="good">Linked</Pill> : <Pill kind="mauve">To link this week</Pill>}
            {x.course ? <Pill kind="good">Done</Pill> : <Pill kind="mauve">Due</Pill>}
          </Row>
        ))}
        <Cap style={{ paddingTop: 6 }}>In Victoria a check has to be linked to the organisation within 7 days of starting paid work, or 21 for a volunteer.</Cap>
      </Tile>
    </main>
  )
}
