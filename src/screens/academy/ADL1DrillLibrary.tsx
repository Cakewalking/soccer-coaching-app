// ADL1-DrillLibrary: Academy owner: the drill library the curriculum is built from (pack v31, section G).
// The totals are the curriculum file's counts (248 drills over the four core skills and game training). The cards are the 24
// drills the file names, all for striking the ball. Every filter works on those 24. "Used this term" is counted in `curriculum.ts`
// from the nights each team has had; most used first.
// STILL SAMPLE: which drills are filmed and whose they are, and the library's "your own" and "filmed" totals (see `curriculum.ts`).
import { useState } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { Head, MAIN, MUTED, Sources } from './kit'
import { Chip, ChipRow, Open, Thumb } from './curriculumKit'
import { useAcademy } from './academyStore'
import { DRILLS, DRILL_COUNTS, LIBRARY_TOTAL, LIBRARY_SAMPLE, PHASES, PARTS, SAMPLE_SKILL, useCurriculum, openLibrary, openDrill, timesUsed, needsNoGoals, fitsPhase, lower, type PartKey } from './curriculum'

type Also = '' | 'filmed' | 'own' | 'unused' | 'nogoals'
const ALSO: [Also, string][] = [['', 'Any'], ['filmed', 'Filmed'], ['own', 'Our own'], ['unused', 'Not used this term'], ['nogoals', 'Needs no goals']]
const LINE2 = { fontSize: 12, lineHeight: '16px', color: '#33443f' } as const
const times = (n: number) => n === 0 ? 'Not used this term' : n === 1 ? 'Used once this term' : `Used ${n} times this term`

export default function ADL1DrillLibrary() {
  const a = useAcademy(), c = useCurriculum(), skill = DRILL_COUNTS.some(([s]) => s === c.libSkill) ? c.libSkill : ''
  const [phase, setPhase] = useState(-1), [part, setPart] = useState<PartKey | ''>(''), [also, setAlso] = useState<Also>('')
  const inLibrary = skill ? DRILL_COUNTS.find(([s]) => s === skill)?.[1] ?? 0 : LIBRARY_TOTAL
  const named = DRILLS.filter(d => !skill || d.skill === skill).map(d => ({ d, use: timesUsed(a, c, d) }))
  const list = named.filter(({ d, use }) => (phase < 0 || fitsPhase(d, PHASES[phase])) && (!part || d.part === part)
    && (also === '' || (also === 'filmed' ? d.filmed : also === 'own' ? !!d.by : also === 'unused' ? use.times === 0 : needsNoGoals(d))))
    .sort((x, y) => y.use.times - x.use.times || x.d.i - y.d.i)
  const narrowed = phase >= 0 || part !== '' || also !== '', label = skill || 'All drills'
  const clear = () => { setPhase(-1); setPart(''); setAlso('') }

  return (
    <main style={MAIN}>
      <Head title="Drill library" sub={`${LIBRARY_TOTAL} drills · ${LIBRARY_TOTAL - LIBRARY_SAMPLE.own} came with Clean Sheet, ${LIBRARY_SAMPLE.own} are your own coaches’ · ${LIBRARY_SAMPLE.filmed} have film of your coaches running them`}>
        <Tap to="AD6-YearPlan" style={S.more}>The curriculum</Tap>
        <Tap say="Name it, draw the set-up with your finger, say which skill and step it trains. Or film it." style={S.primary}>+ Add a drill</Tap>
      </Head>

      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ChipRow label="Core skill" width={92}>
          <Chip on={!skill} onPick={() => openLibrary('')}>All {LIBRARY_TOTAL}</Chip>
          {DRILL_COUNTS.map(([s, n]) => <Chip key={s} on={s === skill} onPick={() => openLibrary(s)}>{s} · {n}</Chip>)}
        </ChipRow>
        <ChipRow label="Phase" width={92}>
          <Chip on={phase < 0} onPick={() => setPhase(-1)}>Any</Chip>
          {PHASES.map((p, i) => <Chip key={p.name} on={i === phase} onPick={() => setPhase(i)}>{p.name}</Chip>)}
        </ChipRow>
        <ChipRow label="Part of session" width={92}>
          <Chip on={!part} onPick={() => setPart('')}>Any</Chip>
          {PARTS.map(p => <Chip key={p} on={p === part} onPick={() => setPart(p)}>{p}</Chip>)}
        </ChipRow>
        <ChipRow label="Also" width={92}>
          {ALSO.map(([k, words]) => <Chip key={k} on={k === also} onPick={() => setAlso(k)}>{words}</Chip>)}
        </ChipRow>
      </div>

      <div style={{ flex: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <h2 style={S.h2} aria-live="polite">{narrowed ? `${label} · ${list.length} of the ${named.length} named drills fit` : `${label} · showing ${list.length} of ${inLibrary}`}</h2>
        <span style={S.cap}>Most used first. Each one says which step of the skill it trains</span>
      </div>

      {list.length > 0 ? (
        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          {list.map(({ d, use }) => (
            <Open key={d.name} to="ADL2-Drill" before={() => openDrill(d.name)} style={{ ...S.tile, gap: 4, padding: '10px 12px' }}>
              <Thumb d={d} />
              <strong style={{ fontSize: 14, lineHeight: '18px', minHeight: 36 }}>{d.name}</strong>
              <span style={LINE2}>{d.part} · {d.minutes} min · ages {d.ages}</span>
              <span style={LINE2}>{d.players} players · trains step {d.step}</span>
              <span style={{ ...LINE2, color: MUTED }}>{times(use.times)}{d.filmed ? ' · filmed' : ''}{d.by ? ' · your own' : ''}</span>
            </Open>
          ))}
        </div>
      ) : (
        <section aria-label="No drills to show" style={{ ...S.tile, flex: 'none', gap: 10, padding: '18px 16px', alignItems: 'flex-start' }}>
          <strong style={{ fontSize: 15, lineHeight: '21px' }}>{named.length ? 'None of the named drills fits all of that.' : `The ${inLibrary} ${lower(skill)} drills are counted, not named.`}</strong>
          <span style={{ fontSize: 14, lineHeight: '20px', color: MUTED }}>{named.length
            ? `${named.length} drills are named for ${skill ? lower(skill) : 'the library'}. Take a filter off to see them.`
            : `The sample names ${DRILLS.length} drills, all for ${lower(SAMPLE_SKILL)}. The other skills have their counts and no cards yet.`}</span>
          {named.length ? <button type="button" onClick={clear} style={{ ...S.more, fontFamily: 'inherit', cursor: 'pointer' }}>Take the filters off</button>
            : <button type="button" onClick={() => openLibrary(SAMPLE_SKILL)} style={{ ...S.more, fontFamily: 'inherit', cursor: 'pointer' }}>Show {lower(SAMPLE_SKILL)}</button>}
        </section>
      )}

      {!narrowed && list.length > 0 && list.length < inLibrary && (
        <span style={{ flex: 'none', display: 'flex', justifyContent: 'center' }}>
          <Tap say={`The sample names ${list.length} of the ${inLibrary}${skill ? ` ${lower(skill)}` : ''} drills. The next ${Math.min(24, inLibrary - list.length)} load here.`} style={S.more}>Show the next {Math.min(24, inLibrary - list.length)}</Tap>
        </span>
      )}
      <Sources items={[['Where a drill is used', 'AD6-YearPlan'], ['What coaches see', 'ACT2-AcademySuggested'], ['Coaches film drills here', 'ACC9-AcademyRecordDrill']]} />
    </main>
  )
}
