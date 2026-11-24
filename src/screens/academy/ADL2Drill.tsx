// ADL2-Drill: Academy owner: one drill (pack v31, section G). One template for any of the drills the curriculum file names:
// the library says which (`openDrill`), and with nothing said it is the board's drill, Weak-foot gates.
// COUNTED in `curriculum.ts`: the step it trains and that step's line, easier and harder (the step below and the step above), how
// often it has been used and by how many coaches, where it is in the plan, and "does it work?" from the roll and the steps.
// STILL SAMPLE: the set-up drawing, how it runs and what to say are written for Weak-foot gates only (the board's words); film and
// who wrote it are the pack's. Every other drill shows a sketch and says so.
import { useContext } from 'react'
import { S, INK } from './adStyles'
import Tap from './Tap'
import { demoToast } from '../demoToast'
import { OwnerGo } from './ownerMenu'
import { Head, MAIN, MUTED, Proof, chevron } from './kit'
import { Open, Dot, Pair, PAIR, BigSketch, GatesPicture } from './curriculumKit'
import { useAcademy } from './academyStore'
import {
  DRILLS, PHASES, NIGHTS, NIGHT_NAME, PART_IN_SESSION, WRITTEN_DRILL, FILM_SAMPLE, FOUR,
  useCurriculum, drillNamed, openLibrary, openNight, putDrill, sessionOf, gridOf, weekNow, timesUsed, inPlan, worksOf, stepLine, lower, under, fitsAge, type Drill, type NightKey,
} from './curriculum'

const CLIP = { flex: 1, height: 84, borderRadius: 10, background: 'linear-gradient(135deg,#1c3a33,#40826d)', display: 'flex', alignItems: 'flex-end', padding: '6px 8px', color: '#ffffff', fontSize: 12, fontWeight: 700, textDecoration: 'none', boxSizing: 'border-box' } as const

export default function ADL2Drill() {
  const a = useAcademy(), c = useCurriculum(), go = useContext(OwnerGo)
  const d: Drill | undefined = drillNamed(c.drill) ?? DRILLS[0]
  if (!d) return <main style={MAIN}><Head title="Drill" sub="No drill is named in the sample." /></main>
  const written = WRITTEN_DRILL[d.name], use = timesUsed(a, c, d), plan = inPlan(a, c, d), works = worksOf(a, c, d), clips = FILM_SAMPLE[d.name]
  const skill = lower(d.skill), line = (n: number) => lower(stepLine(a, d.skill, n))

  /** Puts the drill in a night: the one that is open if it fits, or the next night on this skill for an age it fits. */
  function add() {
    const tries: [number, number, NightKey][] = [[c.at.age, c.at.week, c.at.night]]
    const ages = [c.at.age, ...PHASES.flatMap(p => Array.from({ length: p.hi - p.lo + 1 }, (_, i) => p.lo + i))].filter(x => fitsAge(d!, x))
    for (const age of ages) { const weeks = gridOf(a, c, age).weeks
      for (const w of weeks) if (w.week >= weekNow(a)) for (const n of NIGHTS) { const s = sessionOf(a, c, age, w.week, n, weeks); if (s.core && s.focus === d!.skill && s.date >= a.today) tries.push([age, w.week, n]) } }
    for (const [age, week, night] of tries) if (putDrill(a, age, week, night, d!)) {
      openNight(age, week, night); go('ADQ1-Session')
      demoToast(`${d!.name} is the ${PART_IN_SESSION[d!.part].toLowerCase()} for the ${under(age)}s in week ${week}, ${NIGHT_NAME[night]}.`); return
    }
    demoToast(`No night left this term is on ${skill} for ages ${d!.ages}.`)
  }

  return (
    <main style={{ ...MAIN, paddingBottom: 16 }}>
      <Head title={d.name} sub={`${d.skill} · ${PART_IN_SESSION[d.part].toLowerCase()} · ${d.minutes} minutes · ages ${d.ages} · ${d.players} players · trains step ${d.step}`}>
        <Open to="ADL1-DrillLibrary" before={() => openLibrary(d.skill)} style={S.more}>Drill library</Open>
        <Tap say="Change the words, the set-up drawing or the step it trains." style={S.more}>Change it</Tap>
        <button type="button" onClick={add} style={{ ...S.primary, fontFamily: 'inherit', cursor: 'pointer' }}>Add to a session</button>
      </Head>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <section aria-label="Set-up" style={{ ...S.tile, gap: 8, padding: '12px 16px' }}>
            {written ? <GatesPicture /> : <BigSketch d={d} />}
            <span style={S.cap}>{written?.picture ?? 'A sketch only. The set-up for this drill is not drawn in the sample.'}</span>
          </section>
          <section aria-label="How it runs" style={{ ...S.tile, gap: 6, padding: '12px 16px', flexGrow: 1 }}>
            <h2 style={S.h2}>How it runs</h2>
            {written ? written.runs.map(r => <Dot key={r}>{r}</Dot>) : <>
              <Dot>{d.setup ? `${d.setup}.` : `${PART_IN_SESSION[d.part]} for ${d.players} players, ${d.minutes} minutes.`}</Dot>
              <Dot>It trains step {d.step} of {skill}: {line(d.step)}.</Dot>
            </>}
            {(written?.say ?? d.say) && <Dot><strong>Say:</strong> {written?.say ?? d.say}</Dot>}
            <Dot>
              {written ? <><strong>Easier:</strong> {written.easier} <strong>Harder:</strong> {written.harder}</> : <>
                {d.step > 1 && <><strong>Easier:</strong> ask for step {d.step - 1}, {line(d.step - 1)}. </>}
                {d.step < 5 && <><strong>Harder:</strong> ask for step {d.step + 1}, {line(d.step + 1)}.</>}
              </>}
            </Dot>
            {!written && <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>The sample writes out one drill in full, Weak-foot gates. This one shows what the library holds about it. Easier and harder are the step below and the step above.</span>}
          </section>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <section aria-label="Where it sits" style={{ ...S.tile, gap: 0, padding: '12px 14px' }}>
            <h2 style={{ ...S.h2, paddingBottom: 4 }}>Where it sits</h2>
            <Pair name="Core skill">{d.skill}</Pair>
            <Pair name="Trains">Step {d.step}: {line(d.step)}</Pair>
            <Tap to="AD6-YearPlan" style={{ ...PAIR, color: INK }}>
              <span style={{ color: '#33443f' }}>Used this term</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, textAlign: 'right' }}>{use.times ? `${use.times === 1 ? 'Once' : `${use.times} times`}, by ${use.coaches} ${use.coaches === 1 ? 'coach' : 'coaches'}` : 'Not yet'}{chevron}</span>
            </Tap>
            <Pair name="In the plan">{plan || 'Not in this term’s plan'}</Pair>
            <Pair name="Written by">{d.by ?? 'Came with Clean Sheet'}</Pair>
          </section>
          <section aria-label="Film of your coaches running it" style={{ ...S.tile, gap: 6, padding: '12px 14px' }}>
            <h2 style={S.h2}>Film of your coaches running it</h2>
            {d.filmed ? (
              <span style={{ display: 'flex', gap: 8 }}>
                {(clips ?? [['One clip', '']]).map(([who, len]) => <Tap key={who} say="The clip plays." aria-label={`Play clip, ${who}${len ? ` · ${len}` : ''}`} style={CLIP}>{who}{len ? ` · ${len}` : ''}</Tap>)}
              </span>
            ) : (
              <span style={{ fontSize: 14, lineHeight: '20px', color: MUTED }}>No film yet. <Tap to="ACC9-AcademyRecordDrill" style={{ fontWeight: 700, padding: '13px 0' }}>Coaches film drills here</Tap></span>
            )}
          </section>
          <section aria-label="Does it work?" style={{ ...S.tile, gap: 6, padding: '12px 14px', flexGrow: 1 }}>
            <h2 style={S.h2}>Does it work?</h2>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>{works.four
              ? `Of the ${works.four} players who did it ${['', 'once', 'twice', 'three times', 'four times'][FOUR] ?? `${FOUR} times`} or more this term, ${works.fourUp} are up a step on ${skill}.`
              : works.any ? `No player has done it four times yet this term. Of the ${works.any} who have done it at least once, ${works.anyUp} are up a step on ${skill}.`
              : 'No team has had it on a night this term, so there is nothing to count yet.'}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 'auto' }}>
              <Proof kind="Estimate" />
              <span style={S.cap}>Players did other drills too, so this is a hint and not proof.</span>
            </span>
          </section>
        </div>
      </div>
    </main>
  )
}
