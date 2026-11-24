// ACT3-AcademySessionPlan, rebuilt as pack v33 draws it (1,760 tall, it scrolls; a tile is as tall as its content).
// It is the same session the owner sees in ADQ1-Session: tonight's night for this team's age, read from the academy's
// curriculum (`teamSessionOf`), with the coach's own swaps kept in the same store, so the owner sees them on ADQ1 and AD6.
// COUNTED: the night, its four drills, minutes and times, how tonight's numbers split into groups (from who is coming and
// the trial player), the step lines under "Look for", each player's goal, where the team is, equipment, who else is on site.
// The words on each drill's card live with the drill in academy/curriculum.ts (`DRILL_WORDS`, sample from the v33 board).
// SAMPLE, each marked below: what Sunday showed, filming, the open-view line. Tonight's answers are the shared sample in coachTeam.
// Hand-built: do not make it again from the board's source.

import { useContext, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { teamCounts } from '../../academy/academyStore'
import {
  DRILL_WORDS, FILM_RUN, FILM_SAMPLE, PART_IN_SESSION, WRAP_UP, WRAP_WORDS, WRITTEN_DRILL, gridOf, groupsLine, lower, nightLine, nightOfDate, putBackForTeam, sessionOf,
  sketch, slotMinutes, stepLine, swapForTeam, teamSessionOf, termNo, useCurriculum, weekNow, type Drill, type PartKey,
} from '../../academy/curriculum'
import { openTrial, useTrials } from '../../academy/trialStore'
import { GAME, clock, coachBoard, firstName, ini, longDate, names, openPlayer, tonightOf, useCoachTeam } from '../coachTeam'
import { More, Primary } from '../kit'
import { G, HAIR, INK, MAUVE_PALE, MUT, PALE, PLUM_LABEL, T, plain, textLink } from '../styles'
import { Chevron } from '../teamParts'

// SAMPLE: what Sunday's game showed. It is only said on a night whose skill is striking the ball.
const SUNDAY = { skill: 'Striking the ball', weak: GAME.last.weak, chances: GAME.last.chances }
// SAMPLE: where the tablet films from tonight, and the line about the pitch being in view.
const FILMING = 'Tablet on the stand, part 3', IN_VIEW = 'is in view of the school office'
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']
const word = (n: number) => WORDS[n] ?? String(n), Word = (n: number) => { const w = word(n); return w.charAt(0).toUpperCase() + w.slice(1) }
const up = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)
const small = { fontSize: 12, lineHeight: '16px', color: '#33443f' } as const
const face = (bg: string) => ({ flex: 'none', width: 34, height: 34, borderRadius: 999, background: bg, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }) as const
const pair: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14 }
const Play = () => <span style={{ alignSelf: 'center', marginTop: 18, width: 36, height: 36, borderRadius: 999, background: '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg></span>
const filmTile: CSSProperties = { ...plain, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 112, borderRadius: 10, background: 'linear-gradient(135deg,#1c3a33,#40826d)', padding: '8px 10px', color: '#ffffff', boxSizing: 'border-box', width: '100%' }

/** The set-up drawing: the library's sketch for the drill (five players and one pass), not the real set-up. */
function Drawing({ d }: { d: Drill }) {
  const p = sketch(d.i)
  return (
    <svg viewBox="0 0 120 70" width="100%" height="112" role="img" aria-label={`${d.name}: a sketch of the set-up`} style={{ borderRadius: 8, background: '#dcebe3' }}>
      <rect x="3" y="3" width="114" height="64" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.5" /><line x1="60" y1="3" x2="60" y2="67" stroke="#ffffff" strokeWidth="1.5" />
      {p.map((q, k) => <circle key={k} cx={q.x} cy={q.y} r="3.2" fill={q.dark ? INK : G} />)}
      <path d={`M${p[0].x} ${p[0].y} L${p[1].x} ${p[1].y}`} stroke={INK} strokeWidth="1.4" strokeDasharray="3 3" fill="none" />
    </svg>
  )
}
const Line = ({ name, children }: { name: string; children: ReactNode }) => (
  <span data-line={name} style={{ display: 'grid', gridTemplateColumns: '78px minmax(0,1fr)', gap: 8, fontSize: 13, lineHeight: '19px' }}><strong>{name}</strong><span>{children}</span></span>
)
/** The lines a coach reads on a drill: the v33 board's where it writes them, otherwise whatever the library holds. "Look for" always carries the academy's own step lines. */
function wordsOf(d: Drill, steps: (skill: string, step: number) => string) {
  const w = DRILL_WORDS[d.name], full = WRITTEN_DRILL[d.name]
  const look = [w?.look, ...[d.step, ...(w?.look ? [] : [d.step + 1])].filter(n => n >= 1 && n <= 5).map(n => `Step ${n}: ${lower(steps(d.skill, n))}.`)].filter(Boolean).join(' ')
  const lines: [string, string | undefined][] = [['Why', w?.why], ['Set-up', w?.setup ?? (d.setup ? `${d.setup}.` : undefined)], ['How it runs', w?.runs ?? full?.runs.join(' ')], ['Say', w?.say ?? full?.say ?? d.say], ['Look for', look], ['Easier', w?.easier ?? (full ? up(full.easier) : undefined)], ['Harder', w?.harder ?? (full ? up(full.harder) : undefined)]]
  return { lines: lines.filter((x): x is [string, string] => !!x[1]), missing: lines.filter(x => !x[1]).map(x => x[0]) }
}
const filmOf = (d: Drill) => d.filmed ? (FILM_RUN[d.name] ?? (FILM_SAMPLE[d.name]?.[0] ? { by: FILM_SAMPLE[d.name][0][0], len: FILM_SAMPLE[d.name][0][1] } : { by: 'one of the academy’s coaches', len: '' })) : null

export default function ACT3AcademySessionPlan({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g, ps } = useCoachTeam(), c = useCurriculum()
  const n = ps.length, wk = weekNow(a), night = nightOfDate(a.today) ?? 'Mon'
  // Tonight for this team, and the same night as the academy has it (to say where the owner changed a drill).
  const s = teamSessionOf(a, c, g, wk, night), academy = sessionOf(a, c, g.age, wk, night)
  const week = gridOf(a, c, g.age).weeks[wk - 1], block = week?.nights[0]?.session.split(' · ')[0] ?? s.title
  // Who is coming: the roll once it is taken, the families' answers before that, and the trial player while he is with the coach.
  const t = tonightOf(a, g, ps), trial = useTrials().find(x => x.team === g.id && x.col === 'coach'), guest = trial?.name.split(' ')[0]
  const coming = t.coming.length + (trial ? 1 : 0)
  const sk = teamCounts(a, g).skills.find(x => x.skill === s.skill), onThree = sk?.now ?? 0, skill = lower(s.skill)
  const slot = slotMinutes(g), times = g.when.split(' · ')[1] ?? '', [site, pitchRaw = ''] = g.where.split(' · '), pitch = pitchRaw.replace(', ', ' ').replace(' half', ''), pitchShort = pitchRaw.split(',')[0]
  const others = a.groups.filter(x => x.id !== g.id && x.when === g.when && x.where.split(' · ')[0] === site).length
  const kit = (k: 'balls' | 'cones' | 'bibs' | 'mini' | 'full') => Math.max(0, ...s.drills.map(d => d.kit[k] ?? 0))
  const need = [[kit('balls'), 'balls'], [kit('cones'), 'cones'], [kit('bibs'), 'bibs']].filter(x => x[0]).map(x => x.join(' ')).join(', ')
  const goals = [[kit('mini'), 'mini'], [kit('full'), 'full']].filter(x => x[0]).map(x => x.join(' ')).join(', ')
  // The clock: each part starts when the one before it ends.
  const mins = s.parts.map(p => p.drill?.minutes ?? 0), before = (k: number) => mins.slice(0, k).reduce((x, y) => x + y, 0)
  const cards = s.parts.map((p, k) => ({ ...p, from: before(k), owner: academy.parts[k]?.swapped ? academy.parts[k].planned : null }))
  const wrapAt = before(mins.length), wrap = WRAP_WORDS[block]
  // One thing each: the players whose goal is on tonight's skill, then those with no goal yet, then the trial player.
  const onGoal = ps.filter(p => p.goal && p.goal_skill === s.skill).slice(0, 3), noGoal = ps.filter(p => !p.goal).slice(0, 2)

  function swap(part: PartKey) {
    const next = swapForTeam(a, g, wk, night, part)
    demoToast(next ? `${PART_IN_SESSION[part]}: ${next.name}. Dani sees the swap.` : `No other ${skill} drill in the library fits this part for under ${g.age}s.`)
  }

  // ── Pitch view: one part at a time in big type, with a timer. Not on a board: built here as a working view. ──
  const steps = [...cards.filter(x => x.drill).map(x => ({ label: PART_IN_SESSION[x.part], name: x.drill!.name, minutes: x.drill!.minutes, from: x.from, groups: groupsLine(x.drill!, coming, guest), say: DRILL_WORDS[x.drill!.name]?.say ?? x.drill!.say ?? '', runs: DRILL_WORDS[x.drill!.name]?.runs ?? WRITTEN_DRILL[x.drill!.name]?.runs[0] ?? '' })),
    { label: 'Wrap-up', name: wrap ? `One question: ${wrap.question}` : 'One question about tonight', minutes: WRAP_UP, from: wrapAt, groups: 'In a circle', say: '', runs: wrap ? `Then the home practice: ${wrap.practice}. Each player taps “I enjoyed today” on the way out.` : 'Then one thing to practise at home.' }]
  const [view, setView] = useState<number | null>(null), [left, setLeft] = useState(0), [running, setRunning] = useState(false)
  const show = (k: number) => { setView(k); setLeft(steps[k].minutes * 60); setRunning(false) }
  useEffect(() => { if (!running) return; const id = setInterval(() => setLeft(v => { if (v <= 1) { setRunning(false); return 0 } return v - 1 }), 1000); return () => clearInterval(id) }, [running])
  const now = view === null ? null : steps[view]
  const big: CSSProperties = { ...plain, minHeight: 56, padding: '0 22px', borderRadius: 14, fontSize: 18, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }

  return (
    <div data-board="ACT3-AcademySessionPlan" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      {!inApp && <CoachNav active="training" sub="Session plan" go={go} />}
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', letterSpacing: '-0.02em' }}>Tonight · {g.name}</h1>
            <span style={T.cap}>{longDate(a.today)}, {times} · {site}, {lower(pitch)} · {slot} minutes · week {wk} of the Term {termNo(a)} plan</span>
          </div>
          <More onClick={() => demoToast(`Sent to ${n} families: tonight’s time, the pitch and the home practice.`)}>Send to families</More>
          <More onClick={() => show(0)}>Pitch view</More>
          <Primary onClick={() => go('ACC2-RunSession')}>Run it</Primary>
        </div>

        <section aria-label="Tonight’s one thing" style={{ flex: 'none', borderRadius: 16, background: '#1c3a33', color: '#ffffff', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#f4c95d' }}>TONIGHT’S ONE THING · {s.skill.toUpperCase()}</span>
            <strong data-one-thing="" style={{ fontSize: 21, lineHeight: '27px' }}>{nightLine(s)}</strong>
            <span data-why="" style={{ fontSize: 14, lineHeight: '20px', color: '#cfe6dc' }}>
              {s.drillSkill ? 'One core skill from the first minute to the last. ' : ''}{s.skill === SUNDAY.skill ? `On Sunday, ${SUNDAY.weak} of your ${SUNDAY.chances} chances were taken with the weaker foot. ` : ''}
              {Word(onThree)} of your {n} are on step 3 or higher for {skill}.{n - onThree > 0 ? ` Tonight is about the other ${word(n - onThree)}.` : ''}
            </span>
          </span>
          <span style={{ flex: 'none', width: 210 }}>
            <button aria-label="Watch it run: the whole session in 90 seconds" onClick={() => demoToast('Plays the whole session in 90 seconds, as Reece ran it in Term 1.')} style={filmTile}>
              <Play /><span style={{ fontSize: 12, fontWeight: 700, lineHeight: '15px' }}>The whole session in 90 seconds<br /><span style={{ fontWeight: 400 }}>Reece, Term 1</span></span>
            </button>
          </span>
        </section>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 12, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            {cards.map(p => { const d = p.drill, w = d ? wordsOf(d, (sk2, st) => stepLine(a, sk2, st)) : null, film = d ? filmOf(d) : null
              return (
                <section key={p.part} data-part={p.part} data-drill={d?.name ?? ''} aria-label={PART_IN_SESSION[p.part]} style={{ ...T.tile, flex: 'none', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', width: 64 }}>
                      <strong style={{ ...T.num, fontSize: 18, lineHeight: '22px' }}>{d ? clock(g, p.from) : ''}</strong>
                      <span style={{ fontSize: 12, color: '#33443f' }}>{d ? `${d.minutes} min` : ''}</span>
                    </span>
                    <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 11, lineHeight: '15px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: PLUM_LABEL }}>{PART_IN_SESSION[p.part]}</span>
                      <strong style={{ fontSize: 17, lineHeight: '22px' }}>{d?.name ?? 'No drill is named for this part yet'}</strong>
                      {p.swapped && <span style={small}>You swapped this in. The plan had {p.planned?.name}. Dani sees the swap.</span>}
                      {!p.swapped && p.owner && <span style={small}>Dani put this in. The plan had {p.owner.name}.</span>}
                    </span>
                    {p.swapped && <More onClick={() => { putBackForTeam(g, wk, night, p.part); demoToast(`${PART_IN_SESSION[p.part]}: back to ${p.planned?.name}.`) }}>Put back</More>}
                    {d && <button data-swap={p.part} aria-label={`Swap the ${PART_IN_SESSION[p.part].toLowerCase()}`} onClick={() => swap(p.part)} style={{ ...plain, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontSize: 15, fontWeight: 600, flex: 'none' }}>Swap</button>}
                  </div>
                  {d && w ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '170px 170px minmax(0,1fr)', gap: 12, alignItems: 'start' }}>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Drawing d={d} />
                        <span data-groups="" style={T.cap}>{groupsLine(d, coming, guest)}</span>
                      </span>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {film ? (<>
                          <button data-film="" aria-label={`Watch it run: ${d.name}${film.len ? `, ${film.len}` : ''}`} onClick={() => demoToast(`Plays ${d.name}${film.len ? `, ${film.len}` : ''}, run by ${film.by}.`)} style={filmTile}>
                            <Play /><span style={{ fontSize: 12, fontWeight: 700, lineHeight: '15px' }}>{d.name.split(',')[0]}{film.len ? ` · ${film.len}` : ''}<br /><span style={{ fontWeight: 400 }}>{film.by}</span></span>
                          </button>
                          <span style={T.cap}>Film of it being run here</span>
                        </>) : (<>
                          <button data-film="none" onClick={() => go('ACC8-AcademyRecord')} style={{ ...plain, height: 112, borderRadius: 10, border: '1.5px dashed #8a9794', background: '#faf5ec', padding: '8px 10px', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 13, lineHeight: '18px', fontWeight: 700 }}>No film yet · film it tonight</button>
                          <span style={T.cap}>The drawing only, until one of your coaches films it</span>
                        </>)}
                      </span>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {w.lines.map(([name, text]) => <Line key={name} name={name}>{text}</Line>)}
                        {w.missing.length > 0 && <span data-not-written="" style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>Not written in the library yet: {w.missing.join(', ').toLowerCase()}. The library says it suits {d.players} players for {d.minutes} minutes.</span>}
                      </span>
                    </div>
                  ) : <span style={T.cap}>The library has no {skill} drill for this part at this age. Run the part your own way tonight.</span>}
                </section>
              ) })}

            <section aria-label="Wrap-up" style={{ ...T.tile, flex: 'none', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', width: 64 }}>
                <strong style={{ ...T.num, fontSize: 18, lineHeight: '22px' }}>{clock(g, wrapAt)}</strong>
                <span style={{ fontSize: 12, color: '#33443f' }}>{WRAP_UP} min</span>
              </span>
              <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 11, lineHeight: '15px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: PLUM_LABEL }}>Wrap-up</span>
                <strong style={{ fontSize: 16, lineHeight: '21px' }}>{wrap ? `One question: ${wrap.question}` : 'One question about tonight'}</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>Then tonight’s home practice{wrap ? `: ${wrap.practice}` : ''}. Each player taps “I enjoyed today” on the way out.</span>
              </span>
              <More onClick={() => go('ADC6-HomePractice')}>Home practice</More>
            </section>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="One thing each" style={{ ...T.tile, gap: 6, padding: '12px 14px', border: `2px solid ${G}` }}>
              <div style={T.between}><h2 style={T.h2}>One thing each</h2><button onClick={() => go('ADC2-Group')} style={textLink}>All {n}</button></div>
              {onGoal.map(p => (
                <div key={p.id} data-one={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, borderTop: `1px solid ${HAIR}` }}>
                  <span style={face(PALE)}>{ini(p)}</span>
                  <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{p.name}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{p.goal}</span></span>
                  <More onClick={() => { openPlayer(p.id); go(coachBoard(p)) }}>Open</More>
                </div>
              ))}
              {noGoal.map(p => (
                <div key={p.id} data-one={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, borderTop: `1px solid ${HAIR}` }}>
                  <span style={face(MAUVE_PALE)}>{ini(p)}</span>
                  <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{p.name}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>No goal yet. Watch {firstName(p)} on {skill} tonight</span></span>
                  <More onClick={() => { openPlayer(p.id); go('ADC10-SetGoal') }}>Set one</More>
                </div>
              ))}
              {trial && (
                <div data-one="trial" style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, borderTop: `1px solid ${HAIR}` }}>
                  <span style={face('#e8cfcf')}>{trial.name.split(' ').map(x => x[0]).join('')}</span>
                  <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{trial.name} · on trial</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>You recommend a place or not, after</span></span>
                  <More onClick={() => { openTrial(trial.id); go('ACC3-TrialAssess') }}>Assess</More>
                </div>
              )}
              <span style={{ ...T.cap, paddingTop: 4 }}>From each player’s goal. Read it to them before the first game.</span>
            </section>

            <section aria-label="Why tonight looks like this" style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
              <div style={{ ...T.between, paddingBottom: 4 }}><h2 style={T.h2}>Why tonight looks like this</h2><button onClick={() => go('ACT1-AcademyWeek')} style={textLink}>The term</button></div>
              <span style={pair}><span style={{ flex: 'none', color: '#33443f' }}>The plan</span><strong style={{ textAlign: 'right' }}>Week {wk} · {block}</strong></span>
              <span style={pair}><span style={{ flex: 'none', color: '#33443f' }}>This week’s step</span><strong style={{ textAlign: 'right' }}>{week?.step ?? s.step}{s.core ? '' : ', then in a game'}</strong></span>
              {s.skill === SUNDAY.skill && <button onClick={() => go('ADC7-GameReview')} style={{ ...plain, ...pair }}><span style={{ flex: 'none', color: '#33443f' }}>From Sunday</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong style={{ textAlign: 'right' }}>{SUNDAY.weak} of {SUNDAY.chances} chances, weaker foot</strong><Chevron /></span></button>}
              <button data-team-step="" onClick={() => go('ADC2-Group')} style={{ ...plain, ...pair }}><span style={{ flex: 'none', color: '#33443f' }}>Your team</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong style={{ textAlign: 'right' }}>{onThree} of {n} on step 3 or higher for {skill.split(' ')[0]}</strong><Chevron /></span></button>
              <span style={{ ...T.cap, paddingTop: 6 }}>{s.drills.length ? `The ${word(s.drills.length)} drills are from the academy’s library. Swap any of them. Dani sees a swap, so a good one can be shared.` : 'The library names no drills for this night yet.'}</span>
            </section>

            <section aria-label="Who and what" style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
              <h2 style={{ ...T.h2, paddingBottom: 4 }}>Who and what</h2>
              <button data-coming={coming} onClick={() => go('ACT4-AcademyComing')} style={{ ...plain, ...pair }}><span style={{ flex: 'none', color: '#33443f' }}>Coming</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong style={{ textAlign: 'right' }}>{t.coming.length} of {n}{guest ? `, and ${guest}` : ''}</strong><Chevron /></span></button>
              <span data-away="" style={pair}><span style={{ flex: 'none', color: '#33443f' }}>Not coming</span><strong style={{ textAlign: 'right' }}>{t.away.length ? names(t.away.map(r => r.p)) : 'Nobody'}</strong></span>
              {t.none.length > 0 && <span style={pair}><span style={{ flex: 'none', color: '#33443f' }}>No answer</span><strong style={{ textAlign: 'right' }}>{names(t.none.map(r => r.p))}</strong></span>}
              <span style={pair}><span style={{ flex: 'none', color: '#33443f' }}>You need</span><strong style={{ textAlign: 'right' }}>{need || 'Nothing listed'}</strong></span>
              <span style={pair}><span style={{ flex: 'none', color: '#33443f' }}>Goals</span><strong style={{ textAlign: 'right' }}>{goals ? `${goals}, on ${lower(pitchShort)}` : 'None'}</strong></span>
              <button onClick={() => go('ACC8-AcademyRecord')} style={{ ...plain, ...pair }}><span style={{ flex: 'none', color: '#33443f' }}>Filming</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong style={{ textAlign: 'right' }}>{FILMING}</strong><Chevron /></span></button>
            </section>

            <section aria-label="When it’s done" style={{ ...T.tile, gap: 6, padding: '12px 14px' }}>
              <h2 style={T.h2}>When it’s done</h2>
              <span style={{ fontSize: 14, lineHeight: '20px' }}>Two taps a player: who moved a step, and one note. It takes about three minutes and writes most of the term report.</span>
              <span style={{ display: 'flex', paddingTop: 4 }}><More onClick={() => go('ADC11-AfterSession')}>After the session</More></span>
            </section>

            <section aria-label="Open view" style={{ flex: 'none', borderRadius: 16, background: PALE, border: '1px solid #cfe3da', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <strong style={{ fontSize: 14 }}>Open view</strong>
              <span style={{ fontSize: 13, lineHeight: '19px', color: '#33443f' }}>{pitchShort} {IN_VIEW}. {others ? `${Word(others)} other ${others === 1 ? 'coach is' : 'coaches are'} on site at ${clock(g)}.` : `No other team is on site at ${clock(g)}.`}</span>
            </section>
          </div>
        </div>
      </main>

      {now && view !== null && (
        <div role="dialog" aria-modal="true" aria-label="Pitch view" data-pitch={view} style={{ position: 'fixed', inset: 0, zIndex: 300, background: '#1c3a33', color: '#ffffff', display: 'flex', flexDirection: 'column', padding: '24px 32px', boxSizing: 'border-box', gap: 16, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ flexGrow: 1, fontSize: 18, fontWeight: 700, letterSpacing: '0.06em', color: '#cfe6dc', textTransform: 'uppercase' }}>Part {view + 1} of {steps.length} · {now.label} · {clock(g, now.from)}</span>
            <button onClick={() => { setView(null); setRunning(false) }} style={{ ...big, background: 'transparent', border: '2px solid #ffffff', color: '#ffffff' }}>Close pitch view</button>
          </div>
          <strong data-pitch-name="" style={{ fontSize: 52, lineHeight: '58px', letterSpacing: '-0.02em' }}>{now.name}</strong>
          <span style={{ fontSize: 28, lineHeight: '36px', color: '#cfe6dc' }}>{now.groups}</span>
          {now.say && <span style={{ fontSize: 34, lineHeight: '42px', fontWeight: 700 }}>{now.say}</span>}
          {now.runs && <span style={{ fontSize: 24, lineHeight: '32px', color: '#cfe6dc', maxWidth: 980 }}>{now.runs}</span>}
          <span style={{ flexGrow: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <strong data-timer={left} aria-live="off" style={{ fontSize: 96, lineHeight: '100px', fontVariantNumeric: 'tabular-nums', minWidth: 300 }}>{Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}</strong>
            <button data-timer-go="" onClick={() => setRunning(r => !r && left > 0)} style={{ ...big, background: '#ffffff', color: INK, minWidth: 150 }}>{running ? 'Pause' : left === 0 ? 'Time’s up' : left === now.minutes * 60 ? 'Start the timer' : 'Carry on'}</button>
            <button onClick={() => { setLeft(now.minutes * 60); setRunning(false) }} style={{ ...big, background: 'transparent', border: '2px solid #ffffff', color: '#ffffff' }}>Reset</button>
            <span style={{ flexGrow: 1 }} />
            <button disabled={view === 0} onClick={() => show(view - 1)} style={{ ...big, background: 'transparent', border: '2px solid #ffffff', color: '#ffffff', opacity: view === 0 ? 0.4 : 1 }}>Back</button>
            {view < steps.length - 1
              ? <button data-pitch-next="" onClick={() => show(view + 1)} style={{ ...big, background: '#ffffff', color: INK }}>Next: {steps[view + 1].label}</button>
              : <button data-pitch-next="" onClick={() => { setView(null); setRunning(false); go('ADC11-AfterSession') }} style={{ ...big, background: '#ffffff', color: INK }}>Done: the two taps</button>}
          </div>
        </div>
      )}
    </div>
  )
}
