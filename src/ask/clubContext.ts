// What the demo knows for the club's roles, written as plain lines for Ask Clean Sheet.
// Each role gets only what that role can see. Nobody's lines hold a wellness answer, a welfare concern or a fee:
// a player's wellness score, check-in note and the status that comes from them are left out here on purpose.

import { RESULTS, SENIORS_SQUAD_PLAYERS, SQUAD_PLAYERS, WEEK_SCHEDULE, YOUTH_SQUAD_PLAYERS, type SquadPlayer } from '../data'
import { COACHES_DATA, FAIR_TIME, JUNIORS, MINIROOS } from '../screens/clubadmin/data'

// A squad note that came from a wellness check-in stays out; a football note ("Suspended Sat", "Exam Friday", "High load") stays in.
const FROM_WELLNESS = /sleep|wellness|check-?in|mood|feeling/i
const playerLine = (p: SquadPlayer) => `- ${p.fullName}, ${p.pos.toLowerCase()}: goal "${p.devGoal}" (${p.devGoalStatus === 'on-track' ? 'on track' : 'needs work'}); load ${p.load}% of usual; ${p.minutesUsed} minutes in ${p.games} games${p.note && p.note !== 'Ready' && !FROM_WELLNESS.test(p.note) ? `; note: ${p.note}` : ''}`
const squadLines = (squad: SquadPlayer[]) => [...squad].sort((a, b) => a.fullName.localeCompare(b.fullName)).map(playerLine)

const SQUADS = { juniors: SQUAD_PLAYERS, youth: YOUTH_SQUAD_PLAYERS, seniors: SENIORS_SQUAD_PLAYERS }

/** A club coach's own team: the team, the next game, this week, and the squad in name order. No fees, no wellness answers. */
export function teamContext(kind: keyof typeof SQUADS, team: string, coach: string, lines: string[]) {
  const squad = SQUADS[kind]
  return [
    `Club: Wattle Creek FC, a community club. Team: ${team}, head coach ${coach}. ${squad.length} players.`,
    ...lines,
    'Squad, in name order (never ranked). Load is this week against each player’s own usual week:',
    ...squadLines(squad),
  ].join('\n')
}

/** The lines for U12 Sam that are not the squad: where they sit, the next game, this week. */
export const U12_LINES = [
  `Ladder: ${RESULTS.position}. Last five games: ${RESULTS.games.join(' ')}.`,
  `Next game: ${RESULTS.next}. ${RESULTS.nextDetail}.`,
  `This week: ${WEEK_SCHEDULE.map(d => `${d.day} ${d.label}`).join('; ')}.`,
  'Assistant coach: Jess Marsh. Fitness coach: Priya Shah. Team manager: Rob Owusu.',
]

const FAIR = { ok: 'inside the rule', close: 'close to the line', under3: '3 players under', under4: '4 players under' }

/** The whole club for the director and the chair: one line a team in list order, fair game time, and each coach's sessions and checks. Totals only, no child. */
export function clubContext() {
  const fair = (team: string) => { const f = FAIR_TIME.find(x => x.team === team); return f ? `; fair game time: fewest minutes ${f.pct}% of the game, ${FAIR[f.status]}` : '' }
  return [
    `Club: Wattle Creek FC, a community club. ${MINIROOS.length} MiniRoos teams and ${JUNIORS.length} junior and youth teams in this list.`,
    'Teams, in list order (never ranked). Turnout is the share of players at training, as the club page shows it:',
    ...MINIROOS.map(t => `- ${t.name} (MiniRoos, ${t.level}, coach ${t.coach || 'none yet'}): ${t.players} players; turnout ${t.turnout}%${t.alert ? `; flag: ${t.alert}` : ''}${fair(t.name)}`),
    ...JUNIORS.map(t => `- ${t.name} (${t.div}, coach ${t.coach}): ${t.players} players; turnout ${t.turnout}%; last five ${t.lastFive.join(' ')}${t.alert ? `; flag: ${t.alert}` : ''}${fair(t.name)}`),
    'Coaches, in list order (never ranked):',
    ...COACHES_DATA.map(c => `- ${c.name} (${c.team}): training ${c.training}; children check ${c.check}; sessions run ${c.sessions}; games recorded ${c.recorded}`),
  ].join('\n')
}
