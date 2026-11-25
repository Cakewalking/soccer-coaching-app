// What the demo knows for the academy's two staff roles, written as plain lines for Ask Clean Sheet.
// Counted from the academy's one list (academyStore), so an answer follows a roll that was just taken or a fee just paid.
// Each role gets only what that role can see: the coach's lines have no fees, and only their own team.

import { academyNow, cameOf, count, groupOf, missedLast, money, playersIn, teamCounts, upAStep, type Academy, type Group, type Player } from '../screens/academy/academyStore'

const steps = (a: Academy, p: Player) => a.skills.map((s, k) => `${s} ${p.skills_then[k]}${p.skills_now[k] !== p.skills_then[k] ? ` to ${p.skills_now[k]}` : ''}`).join(', ')

/** The coach's own team: one line a player, in name order. No fees. */
export function coachContext(groupId: string) {
  const a = academyNow(), g = groupOf(a, groupId)
  if (!g) return ''
  const ps = playersIn(a, g.id), c = count(ps)
  return [
    `Academy: Tall Timber Academy. ${a.term}. Today is ${a.today}.`,
    `Team: ${g.name} (${g.ages}), coach ${g.coach}. Trains ${g.when} at ${g.where}. ${ps.length} of ${g.cap} places. Games on Sunday as ${g.team}.`,
    `Team totals: ${ps.filter(upAStep).length} of ${ps.length} up a step on at least one core skill this term; a goal set for ${c.goal}; notes in the last 3 weeks for ${c.notes}; families sent a clip ${c.clip}; term reports drafted ${c.report}.`,
    'Steps are 1 to 5 on four core skills, start of term then now. Players, in name order:',
    ...ps.map(p => { const cm = cameOf(p); return `- ${p.name}, ${p.age}: came ${cm.came} of ${cm.of}${missedLast(p) ? ' (missed the last three)' : ''}; ${steps(a, p)}; goal: ${p.goal || 'not set yet'}; clips sent ${p.clips_sent_this_term}; notes in last 3 weeks: ${p.notes_in_last_3_weeks ? 'yes' : 'no'}; term report: ${p.term_report}; Term 3: ${p.term3}` }),
  ].join('\n')
}

const teamLine = (a: Academy, g: Group) => {
  const ps = playersIn(a, g.id), c = count(ps), t = teamCounts(a, g), came = ps.reduce((n, p) => n + cameOf(p).came, 0), of = ps.reduce((n, p) => n + cameOf(p).of, 0)
  const owed = ps.reduce((n, p) => n + p.fees_owed, 0), late = ps.filter(p => p.fees_status === 'Late').length
  return `- ${g.name} (${g.prog}, coach ${g.coach}): ${ps.length} of ${g.cap} places; came ${came} of ${of} turn-ups; up a step ${ps.filter(upAStep).length}; notes ${c.notes}, goals ${c.goal}, clips ${c.clip}, reports ${c.report} of ${ps.length}; Term 3 staying ${ps.filter(p => p.term3 === 'Staying').length}, not said ${ps.filter(p => p.term3 === 'Not said').length}, leaving ${ps.filter(p => p.term3 === 'Leaving').length}; ${money(g.price)} a player, billed ${money(ps.length * g.price)}, owed ${money(owed)}${late ? ` (${late} late)` : ''}; left over this term ${money(t.left)}`
}

/** The whole academy for its owner: one line a team in team order, the totals, and the families behind on fees. */
export function ownerContext() {
  const a = academyNow(), ps = a.players
  const late = ps.filter(p => p.fees_status === 'Late').sort((x, y) => x.name.localeCompare(y.name))
  return [
    `Academy: Tall Timber Academy, owner Dani Okafor. ${a.term}. Today is ${a.today}.`,
    `${ps.length} players in ${a.groups.length} teams, ${a.groups.reduce((n, g) => n + g.cap, 0)} places. ${ps.filter(upAStep).length} are up a step on at least one core skill this term.`,
    `Term 3: ${ps.filter(p => p.term3 === 'Staying').length} staying, ${ps.filter(p => p.term3 === 'Not said').length} not said, ${ps.filter(p => p.term3 === 'Leaving').length} leaving.`,
    `Fees this term: billed ${money(a.groups.reduce((n, g) => n + playersIn(a, g.id).length * g.price, 0))}, still owed ${money(ps.reduce((n, p) => n + p.fees_owed, 0))}. ${late.length} families are late, ${ps.filter(p => p.fees_status === 'On a plan').length} are on a plan.`,
    `Coaches are paid ${money(a.coach_rate_a_session)} a session. Half a pitch is ${money(a.half_pitch_a_term)} a team a term.`,
    'Teams, in team order (never ranked):',
    ...a.groups.map(g => teamLine(a, g)),
    late.length ? `Families late on fees: ${late.map(p => `${p.name} (${groupOf(a, p.group)?.name}) ${money(p.fees_owed)}${p.fees_note ? `, ${p.fees_note}` : ''}`).join('; ')}.` : 'No family is late on fees.',
    'A single player\'s steps, attendance and goal are on their own page and their team page; ask with that page open.',
  ].join('\n')
}
