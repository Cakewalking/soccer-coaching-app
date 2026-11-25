// ADC2-Group: the coach's own team, all of it, counted from the academy's one list (programs v2).
// Steps now against the start of term, what each player came to, and their goal. Rows open that player's file.
// Coach-only: players and families never see a table of the team. The rows are in name order and nothing else;
// there is no way to order them by level. A coach sees no fees here.

import { count, upAStep, worthACall } from '../academy/academyStore'
import { cameLine, coachBoard, ini, isNew, names, trainingDays, useCoachTeam } from './coachTeam'
import { More, Primary } from './kit'
import { G, HAIR, INK, MAUVE, MAUVE_PALE, MUT, T, label, plain, th } from './styles'
import { Hd, Pill } from './teamParts'

const COLS = '1.5fr 1.6fr 0.7fr 1.6fr'

export default function ADC2Group({ go }: { go: (id: string) => void }) {
  const { a, g, ps } = useCoachTeam()
  const c = count(ps), n = ps.length
  const noGoal = ps.filter(p => !p.goal), noNotes = ps.filter(p => !p.notes_in_last_3_weeks)
  // What the team needs next: the core skill the fewest players are on step 3 or higher in (the first of them when level).
  const on3 = a.skills.map((_, k) => ps.filter(p => p.skills_now[k] >= 3).length), low = on3.indexOf(Math.min(...on3))
  const tiles = [
    { label: 'Up a step this term', big: `${ps.filter(upAStep).length} of ${n}`, sub: 'On at least one core skill' },
    { label: 'A goal set', big: `${c.goal} of ${n}`, sub: noGoal.length ? `${names(noGoal)} to go` : 'Everyone has one' },
    { label: 'Notes in the last 3 weeks', big: `${c.notes} of ${n}`, sub: noNotes.length ? `${names(noNotes)} to catch up` : 'Everyone is up to date' },
    { label: 'What the team needs next', big: a.skills[low], sub: `${n - on3[low]} of ${n} are on step 2 or below` },
  ]
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)" }}>
      <main style={T.main}>
        <Hd title={g.name} sub={`${g.ages} · ${n} players · ${trainingDays(g)}, ${g.when.split(' · ')[1]} · games on Sunday at Wattle Creek FC`}>
          <More onClick={() => go('ADC4-SkillsCheck')}>Run the skills check</More>
          <Primary onClick={() => go('ACT2-AcademySuggested')}>Plan from this</Primary>
        </Hd>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          {tiles.map(t => (
            <div key={t.label} style={T.tile}>
              <span style={label}>{t.label}</span>
              <strong style={{ ...T.num, fontSize: 30, lineHeight: '36px', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{t.big}</strong>
              <span style={T.sub}>{t.sub}</span>
            </div>
          ))}
        </div>

        <section aria-label="The team" style={{ ...T.tile, flex: 'none' }}>
          <div style={T.between}><h2 style={T.h2}>The team</h2><span style={T.cap}>In name order. Each skill is a step from 1 to 5. Green with a plus is up this term.</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            {/* One heading for each of the four step columns, so each number says which skill it is (pack v41). */}
            <span style={th}>Player</span>
            <span style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4, alignItems: 'end' }}>{a.skills.map(t => <span key={t} style={{ ...th, minWidth: 0 }}>{t}</span>)}</span>
            <span style={th}>Came</span>
            <span style={th}>Goal this term</span>
          </div>
          {ps.map(p => (
            <button key={p.id} data-player={p.id} onClick={() => go(coachBoard(p))} style={{ ...plain, display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'center', minHeight: 46, borderTop: `1px solid ${HAIR}`, fontSize: 14, lineHeight: '19px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: worthACall(p) ? MAUVE_PALE : MAUVE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{ini(p)}</span>
                <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <strong style={{ fontSize: 14, lineHeight: '18px', whiteSpace: 'nowrap' }}>{p.name}</strong>
                  <span style={{ fontSize: 12, color: MUT }}>Age {p.age}{isNew(p, g) ? ' · new this term' : ''}</span>
                </span>
              </span>
              <span style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4 }}>
                {p.skills_now.map((s, k) => {
                  const up = s - p.skills_then[k]   // against this player's own start of term, and nobody else
                  return up > 0
                    ? <span key={k} aria-label={`${a.skills[k]}: step ${s}, up ${up}`} style={{ ...T.num, fontSize: 14, fontWeight: 700, color: G }}>{s} <span style={{ fontSize: 11 }}>+{up}</span></span>
                    : <span key={k} aria-label={`${a.skills[k]}: step ${s}`} style={{ ...T.num, fontSize: 14, color: '#33443f' }}>{s}</span>
                })}
              </span>
              <span data-came="" style={T.num}>{cameLine(p)}</span>
              {p.goal ? <span data-goal="" style={{ fontSize: 13 }}>{p.goal}</span> : <Pill kind="mauve">Not set yet</Pill>}
            </button>
          ))}
          <span style={{ ...T.cap, paddingTop: 6 }}>Steps are yours, from two taps per player after a session. This screen is for coaches only. Players and families never see a table of the team.</span>
        </section>
      </main>
    </div>
  )
}
