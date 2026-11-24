// AD8-SessionQuality: Academy owner: for each coach this week, whether the plan was followed, notes written, how much of the session the ball was rolling, and players up a step.
// A template over the store (programs v2, 24 Nov): one row for each team's coach, in team order, never ranked.
// COUNTED from the list of players: "Notes written" (every session when four in five of the team have notes in the last 3 weeks, else one short), and the sessions this week, which is each team’s training days (four, Monday to Thursday, in pack v29) and "Players up a step".
// STILL SAMPLE (the handover's "Not done"): "Followed the plan" and "Ball rolling" are typed-in values for each coach. They are not in
// `academy-data.json` yet; add them to the store when sessions are filmed.
import { S } from './adStyles'
import Tap from './Tap'
import { BALL_ROLLING_FROM_FILM } from './notYet'
import { count, playersIn, useAcademy } from './academyStore'
import { Cap, Head, Kpi, Kpis, LOW_INK, MAIN, Num, Proof, Row, SAND, Th, Tile, Who } from './kit'

const COLS = '1.5fr 0.6fr 0.9fr 0.9fr 1.2fr 0.9fr'
const TARGET = 65, WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']
/** Sample values, by team: sessions this week that did NOT follow the plan are 2 minus `plan` (the first sample had two sessions a week), and ball rolling with how sure it is (no entry is "Not filmed"). */
const SAMPLE: Record<string, { plan: number; rolling?: [number, 'Strong' | 'Estimate'] }> = {
  U6Timber: { plan: 2 }, U7Timber: { plan: 1 }, U7Gold: { plan: 2, rolling: [59, 'Strong'] }, U8Timber: { plan: 1, rolling: [69, 'Strong'] }, U8Gold: { plan: 2, rolling: [70, 'Strong'] },
  U9Timber: { plan: 2 }, U9Gold: { plan: 2, rolling: [71, 'Strong'] }, U10Timber: { plan: 2, rolling: [70, 'Strong'] }, U10Gold: { plan: 1, rolling: [62, 'Strong'] }, U11Timber: { plan: 2, rolling: [62, 'Strong'] }, U11Gold: { plan: 2, rolling: [64, 'Strong'] },
  U12Timber: { plan: 2, rolling: [63, 'Strong'] }, U12Gold: { plan: 2, rolling: [64, 'Estimate'] }, U13Timber: { plan: 1, rolling: [64, 'Strong'] }, U13Gold: { plan: 2, rolling: [58, 'Estimate'] }, U14Timber: { plan: 2, rolling: [63, 'Estimate'] }, U14Gold: { plan: 2, rolling: [60, 'Estimate'] },
}

// One coach's ball rolling. Counting it from film is not built yet, so until the switch is on every coach reads "Not filmed".
function Rolling({ v }: { v?: [number, 'Strong' | 'Estimate'] }) {
  if (!BALL_ROLLING_FROM_FILM || !v) return <span style={{ color: '#4a5a57' }}>Not filmed</span>
  return <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><strong style={{ ...S.num, ...(v[0] < TARGET ? { color: LOW_INK } : null) }}>{v[0]}%</strong><Proof kind={v[1]} /></span>
}

export default function AD8SessionQuality() {
  const a = useAcademy(), all = count(a.players), running = a.groups.filter(g => g.dates.length)
  // Sessions this week: each team's training days. "Four for each team" is said only when every team has the same.
  const week = running.reduce((t, g) => t + g.days.length, 0), per = new Set(running.map(g => g.days.length)), each = per.size === 1 ? WORDS[[...per][0]] ?? '' : ''
  return (
    <main style={MAIN}>
      <Head title="Session quality" sub={`This week · ${week} team sessions${each ? `, ${each.toLowerCase()} for each team` : ""} · tap a coach to watch a session`}>
        <Tap to="AD7-HowWeCoach" style={S.more}>How we measure</Tap>
        <Tap to="AD10-WatchCoach" style={S.primary}>Watch a coach</Tap>
      </Head>
      <Kpis n={BALL_ROLLING_FROM_FILM ? 3 : 2}>
        {BALL_ROLLING_FROM_FILM && <Kpi label="Your target" value={`${TARGET}%`} sub="of each session with the ball rolling" />}
        <Kpi label="Sessions this week" value={week} sub={each ? `${each} for each team` : "Each team’s training days"} />
        <Kpi label="Notes written" value={`${all.notes} of ${all.n}`} sub="players, last 3 weeks" />
      </Kpis>
      <Tile title="By coach" right={<Cap>In team order, never ranked</Cap>}>
        <Th cols={COLS} heads={['Coach', 'Sessions', 'Followed the plan', 'Notes written', 'Ball rolling', 'Players up a step']} />
        {a.groups.map(g => { const s = count(playersIn(a, g.id)), k = g.dates.length ? g.days.length : 0, x = SAMPLE[g.id]; return (
          <Row key={g.id} cols={COLS} to="AD10-WatchCoach" h={50}>
            <Who ini={g.ci} name={g.coach} sub={g.name} bg={SAND} />
            <Num>{k}</Num>
            <Num>{x && k ? `${Math.max(0, k - (2 - x.plan))} of ${k}` : 'Not yet'}</Num>
            <Num>{k ? `${s.notes * 10 >= s.n * 8 ? k : k - 1} of ${k}` : 'Not yet'}</Num>
            <Rolling v={x?.rolling} />
            <Num>{s.up} of {s.n}</Num>
          </Row>
        ) })}
        <Cap style={{ paddingTop: 6 }}>{BALL_ROLLING_FROM_FILM ? 'Strong means every session was filmed and counted. Estimate means some were, so the number may move. Ball rolling is the share of the session where players are on the ball or in a game, counted from film. ' : 'Ball rolling is the share of the session where players are on the ball or in a game. It is counted from film, and counting it is not turned on yet. '}Players up a step is this term, from the coach’s own notes.</Cap>
      </Tile>
    </main>
  )
}
