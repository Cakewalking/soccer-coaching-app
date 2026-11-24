// AD6-YearPlan: Academy owner: the curriculum for one age group, from the year down to each night's session (pack v31, section G).
// Pick a phase and an age. The grid, the balance, the step lines and who is on them are counted in `curriculum.ts` from the
// curriculum file and the academy's one list. The menus above it are the owner app's own (OwnerHeader).
// STILL SAMPLE: the year's blocks outside the written term, and "Are coaches following it?" (see `curriculum.ts`).
import { S, INK } from './adStyles'
import Tap from './Tap'
import { Head, Tile, Cap, MAIN, LINE, MUTED, G, PALE } from './kit'
import { Chip, ChipRow, Open, Dot } from './curriculumKit'
import { useAcademy, groupOf } from './academyStore'
import {
  PHASES, NIGHTS, NIGHT_NAME, SESSIONS, DRILL_COUNTS, COACH_SWAPS, FOLLOWING_SAMPLE, WEEK_STEPS,
  useCurriculum, pickAge, openNight, openLibrary, openBlock, phaseOfAge, termNo, weekNow, nightOfDate, yearOf, gridOf, balanceOf,
  stepFor, lower, ownerSwaps, coachSwaps, teamsAt, coachFirst, under, agesLine,
} from './curriculum'

const COLS = '70px 130px repeat(4, minmax(0,1fr))'
const bar = (n: number, of: number) => (
  <span role="img" aria-label={`${n} of ${of}`} style={{ display: 'block', height: 8, borderRadius: 4, background: LINE, overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${of ? Math.round(100 * n / of) : 0}%`, background: G }} /></span>
)
const MET = { display: 'flex', flexDirection: 'column', gap: 4, minHeight: 60, justifyContent: 'center', borderTop: `1px solid ${LINE}` } as const
const metHead = (title: string, n: number, of: number) => (
  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{title}</strong><strong style={{ ...S.num, fontSize: 15, whiteSpace: 'nowrap' }}>{n} of {of}</strong></span>
)

export default function AD6YearPlan() {
  const a = useAcademy(), c = useCurriculum()
  const age = c.age, pi = Math.max(0, phaseOfAge(age)), phase = PHASES[pi], term = termNo(a), now = weekNow(a), tonight = nightOfDate(a.today)
  const ages = Array.from({ length: phase.hi - phase.lo + 1 }, (_, i) => phase.lo + i), allAges = PHASES.reduce((t, p) => t + p.hi - p.lo + 1, 0)
  const year = yearOf(a, c, pi), { weeks, fromFile } = gridOf(a, c, age), balance = balanceOf(weeks), total = balance.reduce((t, b) => t + b.n, 0)
  const teams = teamsAt(a, age), follow = FOLLOWING_SAMPLE[phase.name]
  const steps = a.skills.map(s => stepFor(a, age, s)), levels = [...new Set(steps.map(s => s.step))].sort()
  // the swaps a coach has made at this phase's ages: the owner sees each one
  const seen = COACH_SWAPS.flatMap(x => { const g = groupOf(a, x.group); return g && phaseOfAge(g.age) === pi ? [{ ...x, g }] : [] })
  const mine = weeks.reduce((t, w) => t + NIGHTS.filter(n => ownerSwaps(c, age, w.week, n).length).length, 0)

  return (
    <main style={MAIN}>
      <Head title="Curriculum" sub={`${a.today.slice(0, 4)} · ${['no', 'one', 'two', 'three', 'four'][PHASES.length] ?? PHASES.length} phases, ${['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][allAges] ?? allAges} age groups, ${SESSIONS} sessions a team a term · this is week ${now} of Term ${term}`}>
        <Open to="ADL1-DrillLibrary" before={() => openLibrary('')} style={S.more}>Drill library</Open>
        <Tap say="Families see this term’s themes for their own child’s age. Not the drills." style={S.more}>Share with families</Tap>
        <Open to="AD22-ChangeBlock" before={() => openBlock(pi, term, now > 5 ? 1 : 0)} style={S.primary}>Change a block</Open>
      </Head>

      <div style={{ flex: 'none', display: 'flex', gap: '6px 14px', flexWrap: 'wrap', alignItems: 'center' }}>
        <ChipRow label="Phase">{PHASES.map((p, i) => <Chip key={p.name} on={i === pi} onPick={() => pickAge(i === pi ? age : Math.min(p.hi, p.lo + 1))}>{p.name} · under {p.lo} to {p.hi}</Chip>)}</ChipRow>
        <ChipRow label="Age">{ages.map(x => <Chip key={x} on={x === age} onPick={() => pickAge(x)}>U{x}</Chip>)}</ChipRow>
      </div>

      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 12, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
          <Tile title={`The year for ${under(age)}s`} right={<Cap>Two five-week blocks a term. Each block has one core skill at its centre</Cap>} label="The year">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 8, paddingTop: 6 }}>
              {year.map((blocks, k) => { const on = k + 1 === term
                return (
                  <div key={k} style={{ borderRadius: 12, padding: '8px 10px', border: on ? `2px solid ${G}` : '1px solid #c5c8c4', background: on ? PALE : '#ffffff' }}>
                    <span style={S.label}>Term {k + 1}{on ? ' · now' : ''}</span>
                    {blocks.map((b, i) => <div key={i}><div style={{ fontSize: 11, color: MUTED, paddingTop: 4 }}>WEEKS {i ? '6 TO 10' : '1 TO 5'}</div><strong style={{ fontSize: 14, lineHeight: '18px' }}>{b.title}</strong></div>)}
                  </div>
                ) })}
            </div>
          </Tile>

          <Tile title={`Term ${term}, night by night`} right={<Cap>Every team at this age follows it. A coach can swap a drill, or a night, and you see it</Cap>} label="The term night by night">
            <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 6, padding: '6px 0 2px' }}>
              {['Week', 'This week’s step', ...NIGHTS.map(n => NIGHT_NAME[n])].map(h => <span key={h} style={{ fontSize: 12, fontWeight: 700, color: MUTED }}>{h}</span>)}
            </div>
            {weeks.map(w => { const cur = w.week === now
              return (
                <div key={w.week} style={{ display: 'grid', gridTemplateColumns: COLS, gap: 6, alignItems: 'center', borderTop: `1px solid ${LINE}`, padding: '3px 0', ...(cur ? { background: '#faf5ec', margin: '0 -8px', padding: '3px 8px', borderRadius: 8 } : null) }}>
                  <strong style={{ ...S.num, fontSize: 15 }}>{w.week}{cur ? ' · now' : ''}</strong>
                  <span style={{ fontSize: 13, lineHeight: '16px', color: '#33443f' }}>{w.step}</span>
                  {w.nights.map(n => { const today = cur && n.night === tonight, own = ownerSwaps(c, age, w.week, n.night), theirs = teams.flatMap(g => coachSwaps(g, w.week, n.night).map(() => coachFirst(g)))
                    return (
                      <Open key={n.night} to="ADQ1-Session" before={() => openNight(age, w.week, n.night)} label={`Week ${w.week}, ${NIGHT_NAME[n.night]}: ${n.focus}, ${n.session}`}
                        style={{ display: 'flex', flexDirection: 'column', gap: 1, minHeight: 54, justifyContent: 'center', padding: '4px 8px', borderRadius: 8, boxSizing: 'border-box', background: today ? PALE : 'transparent', ...(today ? { border: `1.5px solid ${G}` } : null) }}>
                        <span style={{ fontSize: 11, lineHeight: '14px', fontWeight: 700, color: '#7a3b4a', textTransform: 'uppercase' }}>{n.focus}</span>
                        <span style={{ fontSize: 13, lineHeight: '16px', color: n.written ? INK : MUTED }}>{n.session}</span>
                        {own.length > 0 && <span style={{ fontSize: 11, lineHeight: '14px', fontWeight: 700 }}>You swapped {own.length === 1 ? 'a drill' : `${own.length} drills`}</span>}
                        {theirs.length > 0 && <span style={{ fontSize: 11, lineHeight: '14px', fontWeight: 700 }}>{theirs.join(' and ')} swapped a drill</span>}
                      </Open>
                    ) })}
                </div>
              ) })}
            <Cap style={{ paddingTop: 6 }}>Each week takes the block’s skill one step closer to the game: {WEEK_STEPS.map(s => s.toLowerCase()).join(', ')}. Tap any night to see its session and drills.</Cap>
            {!fromFile && <Cap>{pi === phaseOfAge(13)
              ? 'You have changed a block, so this term is built again by the same rule.'
              : `The sample has a written term for ${lower(PHASES[phaseOfAge(13)]?.ages ?? '')} only. This one is built from this phase’s two blocks by the same rule, and Wednesday’s topics are not written yet.`}</Cap>}
          </Tile>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <section aria-label="By the end of term" style={{ ...S.tile, gap: 6, padding: '12px 16px' }}>
            <h2 style={S.h2}>By the end of Term {term} an {under(age)} can</h2>
            {steps.map(s => <Dot key={s.skill}><strong>{s.skill}, step {s.step}:</strong> {lower(s.line)}. {s.of ? `${s.on} of ${s.of} are there now.` : ''}</Dot>)}
            <Cap>These are the step-{levels.join(' and step-')} lines the coaches mark players against: on each skill, the step that half the {under(age)}s or more are on or past.</Cap>
            <Tap to="AD7-HowWeCoach" style={{ fontSize: 14, fontWeight: 700, minHeight: 44, display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start' }}>See the five steps</Tap>
          </section>

          <section aria-label="Balance this term" style={{ ...S.tile, gap: 2, padding: '12px 16px' }}>
            <h2 style={S.h2}>Balance this term</h2>
            <span style={{ fontSize: 13, lineHeight: '18px', color: MUTED }}>Sessions on each, of {total}</span>
            {balance.map(b => { const inLibrary = DRILL_COUNTS.some(([s]) => s === b.focus)
              return (
                <Open key={b.focus} to="ADL1-DrillLibrary" before={() => openLibrary(inLibrary ? b.focus : '')} label={`${b.focus}: ${b.n} of ${total}. Opens its drills`} style={MET}>
                  {metHead(b.focus, b.n, total)}{bar(b.n, total)}
                </Open>
              ) })}
            <Cap style={{ paddingTop: 6 }}>Counted from the grid. Change a block and this moves.</Cap>
          </section>

          <section aria-label="Are coaches following it?" style={{ ...S.tile, gap: 2, padding: '12px 16px' }}>
            <h2 style={S.h2}>Are coaches following it?</h2>
            {follow ? <>
              <Tap to="AD8-SessionQuality" style={{ ...MET, color: INK, textDecoration: 'none' }}>
                {metHead('Sessions run from the plan', follow.fromPlan, follow.opened)}{bar(follow.fromPlan, follow.opened)}
                <span style={{ fontSize: 12, lineHeight: '16px', color: MUTED }}>{agesLine(ages)}, {follow.weeks}, of those opened on the tablet</span>
              </Tap>
              <Open to="ADL1-DrillLibrary" before={() => openLibrary('')} style={MET}>
                {metHead('Sessions using library drills', follow.library, follow.opened)}{bar(follow.library, follow.opened)}
                <span style={{ fontSize: 12, lineHeight: '16px', color: MUTED }}>{follow.opened - follow.library} used a coach’s own drill</span>
              </Open>
            </> : <span style={{ ...MET, fontSize: 13, lineHeight: '19px', color: MUTED }}>The sample counts this for {lower(PHASES[phaseOfAge(13)]?.ages ?? '')} only. Nothing is counted for this phase yet.</span>}
            {seen.map(x => (
              <Open key={`${x.group}${x.week}${x.night}`} to="ADQ1-Session" before={() => openNight(x.g.age, x.week, x.night)} style={{ ...MET, minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontSize: 13, lineHeight: '18px' }}>
                <span><strong>{x.g.name} · {coachFirst(x.g)}</strong> swapped the {x.part.toLowerCase()}</span><span style={{ flex: 'none', color: MUTED }}>Week {x.week}, {NIGHT_NAME[x.night]}</span>
              </Open>
            ))}
            {mine > 0 && <span style={{ fontSize: 13, lineHeight: '19px', paddingTop: 6, borderTop: `1px solid ${LINE}` }}>You have swapped a drill on {mine} {mine === 1 ? 'night' : 'nights'} for the {under(age)}s. It is marked in the grid.</span>}
            <Cap style={{ paddingTop: 6 }}>A swap is allowed. It shows here so a good one can be shared.</Cap>
          </section>

          <section aria-label="Where this comes from" style={{ ...S.tile, gap: 4, padding: '12px 16px', background: PALE }}>
            <strong style={{ fontSize: 14 }}>Where this comes from</strong>
            <span style={{ fontSize: 13, lineHeight: '19px' }}>The phases and the four core skills are Football Australia’s. One core skill runs through a whole session. The blocks, the nights and the drills are yours to change.</span>
          </section>
        </div>
      </div>
    </main>
  )
}
