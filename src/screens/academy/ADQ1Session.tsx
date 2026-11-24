// ADQ1-Session: Academy owner: one night's session for an age group (pack v31, section G). Arrival game, skill introduction,
// skill training, skill game, wrap-up: each part a drill from the library with its set-up and what to say, and a Swap button.
// One template for any night of the term: the year plan says which (`openNight`), and with nothing said it is the board's night,
// under 13s, week 8, Monday. Which drill, the minutes, the equipment, the step lines and who is on them are counted in `curriculum.ts`.
// A swap is kept while the app is open and shows as a swap here and in the year plan's grid.
// NOT SHOWN: the board's "Ball rolling when Reece ran it last term: 68%". Ball rolling from film is switched off (`notYet.ts`), and it is a rate with no count.
import { S, INK } from './adStyles'
import Tap from './Tap'
import { demoToast } from '../demoToast'
import { Head, MAIN, LINE, MUTED, chevron } from './kit'
import { Open, Dot, PAIR } from './curriculumKit'
import { useAcademy } from './academyStore'
import {
  DRILLS, DRILL_COUNTS, NIGHT_NAME, PART_IN_SESSION, WRAP_UP, SAMPLE_SKILL,
  useCurriculum, sessionOf, swapPart, putBack, openDrill, openLibrary, pickAge, termNo, dayLine, kitLine, stepFor, stepLine, lower, under,
  teamsAt, coachSwaps, coachDrill, coachFirst, slotMinutes, type PartKey,
} from './curriculum'

const ROW = { display: 'grid', gridTemplateColumns: '64px 150px minmax(0,1fr) auto', gap: 12, alignItems: 'center', minHeight: 84, borderTop: `1px solid ${LINE}` } as const
const SMALL = { fontSize: 12, lineHeight: '16px', color: '#33443f' } as const
/** STILL SAMPLE: the wrap-up the session board writes for the weaker-foot block. Every other night gets the plain one. */
const WRAP: Record<string, { line: string; say: string }> = { 'Finishing, weaker foot': { line: 'In a circle. Ten wall strikes a night with the weaker foot', say: '“What made it go where you wanted?”' } }

export default function ADQ1Session() {
  const a = useAcademy(), c = useCurriculum(), { age, week, night } = c.at
  const s = sessionOf(a, c, age, week, night), teams = teamsAt(a, age), term = termNo(a), slot = slotMinutes(teams[0])
  const skill = lower(s.skill), swapped = s.parts.filter(p => p.swapped), wrap = WRAP[s.title.split(' · ')[0]]
  const t = stepFor(a, age, s.skill), look = [t.step - 1, t.step, t.step + 1].filter(n => n >= 1 && n <= 5)
  const inLibrary = DRILL_COUNTS.find(([x]) => x === s.focus)?.[1]
  const past = s.date < a.today
  const names = teams.map(g => g.name), who = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0] ?? 'Nobody yet'

  function swap(part: PartKey) {
    const next = swapPart(a, age, week, night, part)
    demoToast(next ? `${PART_IN_SESSION[part]}: ${next.name}.` : `No other ${skill} drill for this part fits ${under(age)}s among the ${DRILLS.length} named drills.`)
  }

  return (
    <main style={{ ...MAIN, paddingBottom: 16 }}>
      <Head title={s.title} sub={`${under(age).replace('u', 'U')}s · Term ${term}, week ${week}, ${NIGHT_NAME[s.night]} · ${s.drills.length === s.parts.length ? `${s.minutes} minutes${slot && slot !== s.minutes ? ` in a ${slot} minute slot` : ''}` : `${slot} minutes`} · ${s.core ? `one core skill from start to finish: ${skill}` : `${lower(s.focus)}, on this block’s skill: ${skill}`}`}>
        <Open to="AD6-YearPlan" before={() => pickAge(age)} style={S.more}>Back to the term</Open>
        <Tap to="ACT3-AcademySessionPlan" style={S.more}>What the coach sees</Tap>
        <Tap say={past ? `Saved for the next time this night comes round. ${dayLine(a, week, s.night)} has been run.` : `Saved. ${who} ${names.length === 1 ? 'gets' : 'get'} it on ${dayLine(a, week, s.night)}.`} style={S.primary}>Save as the plan</Tap>
      </Head>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12 }}>
        <section aria-label="The session" style={{ ...S.tile, gap: 0, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}>
            <h2 style={S.h2}>The session</h2>
            <span style={S.cap}>{s.drills.length ? `${s.drills.length} ${s.drills.length === 1 ? 'drill' : 'drills'} from the library, then the wrap-up` : 'Four parts and the wrap-up'}</span>
          </div>
          {s.parts.map(p => { const d = p.drill, theirs = teams.filter(g => coachSwaps(g, week, s.night).some(x => x.part === p.part))
            return (
              <div key={p.part} style={ROW}>
                <strong style={{ ...S.num, fontSize: 18 }}>{d ? `${d.minutes}′` : ''}</strong>
                <span style={S.label}>{PART_IN_SESSION[p.part]}</span>
                {d ? (
                  <Open to="ADL2-Drill" before={() => openDrill(d.name)} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '6px 0' }}>
                    <strong style={{ fontSize: 15, lineHeight: '19px' }}>{d.name}</strong>
                    <span style={SMALL}>{d.setup ?? `${d.players} players · trains step ${d.step}: ${lower(stepLine(a, d.skill, d.step))}`}</span>
                    {d.say && <span style={SMALL}>Say: {d.say}</span>}
                    {p.swapped && <span style={{ ...SMALL, fontWeight: 700, color: INK }}>You swapped this. The plan had {p.planned?.name}.</span>}
                    {theirs.map(g => <span key={g.id} style={{ ...SMALL, fontWeight: 700, color: INK }}>{g.name} · {coachFirst(g)} swapped this part for that team{coachDrill(c, g, week, s.night, p.part) ? `: ${coachDrill(c, g, week, s.night, p.part)?.name}` : ''}.</span>)}
                  </Open>
                ) : (
                  <span style={{ fontSize: 13, lineHeight: '18px', color: MUTED }}>{s.core && s.focus === SAMPLE_SKILL
                    ? `None of the ${DRILLS.length} named drills is a ${skill} ${PART_IN_SESSION[p.part].toLowerCase()} for ${under(age)}s.`
                    : `No drill is named for ${lower(s.focus)} in the sample.${inLibrary ? ` ${inLibrary} are counted in the library.` : ''}`}</span>
                )}
                <span style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                  {p.swapped && <button type="button" onClick={() => { putBack(age, week, night, p.part); demoToast(`${PART_IN_SESSION[p.part]}: back to ${p.planned?.name}.`) }} style={{ ...S.more, fontFamily: 'inherit', cursor: 'pointer' }}>Put back</button>}
                  {d && <button type="button" aria-label={`Swap the ${PART_IN_SESSION[p.part].toLowerCase()}`} onClick={() => swap(p.part)} style={{ ...S.more, fontFamily: 'inherit', cursor: 'pointer' }}>Swap</button>}
                </span>
              </div>
            ) })}
          <div style={ROW}>
            <strong style={{ ...S.num, fontSize: 18 }}>{WRAP_UP}′</strong>
            <span style={S.label}>Wrap-up</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <strong style={{ fontSize: 15, lineHeight: '19px' }}>One question, one home practice</strong>
              <span style={SMALL}>{wrap?.line ?? 'In a circle. One question about tonight, one thing to practise at home'}</span>
              {wrap && <span style={SMALL}>Say: {wrap.say}</span>}
            </span>
            <span style={{ ...SMALL, color: MUTED, maxWidth: 150, textAlign: 'right' }}>The same close every night. Not a drill</span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>{swapped.length
            ? `You have swapped ${swapped.length === 1 ? 'one drill' : `${swapped.length} drills`} on this night. It is kept while the app is open, and is marked in the term.`
            : s.drills.length ? 'Swap puts in the next library drill for the same part, the same skill and this age.' : <>Open a night on {lower(SAMPLE_SKILL)} to see its drills, or <Open to="ADL1-DrillLibrary" before={() => openLibrary(inLibrary ? s.focus : '')} style={{ color: '#2f6252', fontWeight: 700, padding: '13px 0' }}>open the library</Open>.</>}</span>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <section aria-label="What to look for" style={{ ...S.tile, gap: 6, padding: '12px 14px' }}>
            <h2 style={S.h2}>What to look for</h2>
            {!s.core && <span style={S.cap}>{s.focus} has no step lines of its own. These are for this block’s skill, {skill}.</span>}
            {look.map(n => <Dot key={n}><strong>Step {n}:</strong> {lower(stepLine(a, s.skill, n))}.{n === t.step ? ` Most ${under(age)}s should reach this by week 10. ${t.on} of ${t.of} are there now.` : ''}</Dot>)}
            <span style={S.cap}>The two taps after the session use these same lines.</span>
          </section>
          <section aria-label="Who runs it" style={{ ...S.tile, gap: 0, padding: '12px 14px' }}>
            <h2 style={{ ...S.h2, paddingBottom: 4 }}>Who runs it</h2>
            {teams.map(g => { const theirs = coachSwaps(g, week, s.night), i = g.dates.indexOf(s.date), ps = a.players.filter(p => p.group === g.id)
              const state = theirs.length ? `Swapped the ${theirs.map(x => PART_IN_SESSION[x.part].toLowerCase()).join(' and the ')}` : i >= 0 ? `Ran it · ${ps.filter(p => p.roll[i] === true).length} of ${ps.filter(p => p.roll[i] != null).length} came` : 'As planned'
              return (
                <Tap key={g.id} to={g.board} style={{ ...PAIR, color: INK }}>
                  <span style={{ color: '#33443f' }}>{g.name} · {coachFirst(g)}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, textAlign: 'right' }}>{state}{chevron}</span>
                </Tap>
              ) })}
            {!teams.length && <span style={{ ...PAIR, color: MUTED }}>No team at this age yet.</span>}
          </section>
          <section aria-label="Equipment" style={{ ...S.tile, gap: 4, padding: '12px 14px', flexGrow: 1 }}>
            <h2 style={S.h2}>Equipment</h2>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>{kitLine(s.drills) || 'Nothing to add up: no drill is named for this night.'}</span>
            <span style={{ ...S.cap, marginTop: 'auto' }}>{s.drills.length ? `Added up from the ${s.drills.length} ${s.drills.length === 1 ? 'drill' : 'drills'}: the most any one part needs.` : 'Equipment is added up from the drills.'}</span>
          </section>
        </div>
      </div>
    </main>
  )
}
