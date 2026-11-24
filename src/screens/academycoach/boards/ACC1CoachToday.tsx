// ACC1-CoachToday: the coach's home, for Reece's one team (programs v2), rebuilt as pack v32 draws it (1,330 tall, it scrolls):
// Now, Progress, Development, this week from the curriculum beside who came, Sunday, and on the right the four meters,
// your families, your own coaching and one "needs you"; then the pale "Done for you this week" band.
// LAYOUT RULE (v32, every home): a tile is as tall as its content. Nothing here grows to fill the window; on a tall
// screen the page ends and the background shows.
// COUNTED from the academy's list, the curriculum and the trials: everything except the constants marked SAMPLE below.
// The layout, sizes and colours are the board's. The numbers are not typed in: the headline, the then-and-now
// bars, the dots and the four meters are counted from the academy's one list, so they move when the roll is
// taken, a step moves, a goal is set, a clip is sent or a report is drafted. Each dot opens that player.
// Hand-wired to the list: do not make it again from the board's source.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import { CAME_LOW, basics, count, missedLast, surveyOf, teamCounts, upAStep } from '../../academy/academyStore'
import { NIGHTS, PARTS, coachSwaps, dateOf, gridOf, teamSessionOf, slotMinutes, useCurriculum, weekNow } from '../../academy/curriculum'
import { filmedDates, longDate, shortDate as shortDay, useCoachStore, watchOf } from '../../academy/coachStore'
import { BALL_ROLLING_FROM_FILM } from '../../academy/notYet'
import { openTrial, useTrials } from '../../academy/trialStore'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { coachBoard, dayMonth, firstName, ini, isNew, names, openPlayer, shortDate, todayMark, tonightOf, useCoachTeam } from '../coachTeam'
import { More, Primary } from '../kit'
import { G, HAIR, INK, LINE, MAUVE_PALE, MUT, PALE, T, plain, textLink } from '../styles'
import { Chevron, StrongDot } from '../teamParts'

const WORDS = ['None', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty']
const word = (n: number) => WORDS[n] ?? String(n)
// What step 3 looks like on each core skill, said plainly.
const SAY: Record<string, string> = { 'First touch': 'take their first touch out of their feet', 'Running with the ball': 'run with the ball with their head up', 'One against one': 'pick their moment to take a player on', 'Striking the ball': 'strike a moving ball with the laces' }
const DOT = [
  { say: 'no notes in three weeks', look: { background: '#ffffff', color: MUT, border: '1.5px dashed #8a9794' } },
  { say: 'same step', look: { background: '#ffffff', color: INK, border: `1.5px solid ${LINE}` } },
  { say: 'up a step', look: { background: G, color: '#ffffff' } },
] as const
// SAMPLE, not in any list yet. Sunday's game: the result, the time to win the ball back, the clips cut from it and how many
// families have said they are coming (the same 14 as tonight's chip). The game is at Wattle Creek FC, as the Now strip says.
const SUNDAY = { us: 3, them: 'Eastbank', themGoals: 1, winBack: 8, winBackWas: 12, clips: 11, clipsHome: 4, coming: 14, at: '10:00 at Wattle Creek FC' }
// SAMPLE: one family's words from the survey (the list holds the five answers, not what a family wrote), and what Dani asked the coach to try.
const FAMILY_WORDS = '“He asks to go early now. Whatever Reece is doing, keep doing it.”'
const TO_TRY = 'shorter stops, more time in the game'
// SAMPLE: ball rolling for Monday and the target. Shown only when ball rolling counted from film is switched on (academy/notYet).
const ROLLING = { pct: 68, target: 65, night: 'Mon' }
const stat = { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 } as const
const big = { fontSize: 24, lineHeight: '28px', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' } as const
const Stat = ({ n, label, sub }: { n: string; label: string; sub: string }) => (
  <span style={stat}><strong style={big}>{n}</strong><strong style={{ fontSize: 13, lineHeight: '17px' }}>{label}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{sub}</span></span>
)
const meterRow = { ...plain, display: 'flex', flexDirection: 'column', gap: 4, minHeight: 60, justifyContent: 'center', borderTop: `1px solid ${HAIR}` } as const
/** A line with a count, its bar and one line under it. Mauve below two-thirds when `low`. */
const Meter = ({ label, n, of, under, low = false }: { label: string; n: number; of: number; under: string; low?: boolean }) => (<>
  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
    <strong style={{ fontSize: 14, lineHeight: '18px' }}>{label}</strong>
    <strong style={{ ...T.num, fontSize: 15, whiteSpace: 'nowrap' }}>{n} of {of}</strong>
  </span>
  <span role="img" aria-label={`${n} of ${of}`} style={{ display: 'block', height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
    <span style={{ display: 'block', height: '100%', width: `${Math.round(100 * n / (of || 1))}%`, background: low ? '#a86b78' : G }} />
  </span>
  <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{under}</span>
</>)
const Tick = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}><path d="M5 12l5 5 9-10" /></svg>
const chip = { ...plain, height: 44, padding: '0 14px', borderRadius: 12, background: PALE, display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', whiteSpace: 'nowrap' } as const
const face = (bg: string) => ({ flex: 'none', width: 34, height: 34, borderRadius: 999, background: bg, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }) as const

export default function ACC1CoachToday({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g, ps } = useCoachTeam()
  const n = ps.length, tc = teamCounts(a, g)
  const start = g.when.split(' · ')[1]?.split(' to ')[0] ?? ''
  // Trial players with this team, from the one list of trials: still to assess tonight, or already sent to Dani.
  const trials = useTrials().filter(x => x.team === g.id && (x.col === 'coach' || (x.col === 'call' && x.came === 'today')))
  const onTrial = trials.filter(x => x.col === 'coach').length, trial = trials.find(x => x.col === 'coach') ?? trials[0]
  // Tonight's roll, once it is taken (ACC2). Before that, the families' answers: sample, not in the list.
  const marks = ps.map(p => todayMark(a, g, p)), here = marks.filter(m => m === true).length, away = marks.filter(m => m === false).length
  // The headline: the core skill where the most players have reached step 3 since week 1.
  const lead = [...tc.skills].sort((x, y) => (y.now - y.then) - (x.now - x.then))[0]
  // Each player against their own start of term: up a step, on the same step, or no notes in three weeks. In name order.
  const status = (p: typeof ps[number]) => upAStep(p) ? 2 : p.notes_in_last_3_weeks ? 1 : 0
  const tally = [0, 1, 2].map(k => ps.filter(p => status(p) === k).length)
  const clipFor = ps.find(p => upAStep(p) && p.clips_sent_this_term === 0), noGoal = ps.filter(p => !p.goal), noNotes = ps.filter(p => !p.notes_in_last_3_weeks)
  const openThen = (id: number, board: string) => { openPlayer(id); go(board) }
  const meters = basics(ps)
  const gap = (k: number) => meters[k].of - meters[k].n
  const under = [
    gap(0) ? `${gap(0)} ${gap(0) === 1 ? 'player' : 'players'} to catch up on` : 'Every player has notes',
    gap(1) ? `${gap(1)} to go` : 'Every player has a goal',
    gap(2) ? `${gap(2)} ${gap(2) === 1 ? 'family has' : 'families have'} seen nothing yet` : 'Every family has seen a clip',
    'Due to Dani in week 9',
  ]
  const opens = ['ADC11-AfterSession', 'ADC10-SetGoal', 'ADC3-SessionFilm', 'ACC6-ReportDraft']
  // This week's four nights, from the academy's curriculum for this age. A night before today shows how it ran: who came is
  // counted from the roll, a swap is read from the curriculum's list of coach swaps, filmed from the coach's filmed sessions.
  const cur = useCurriculum(); useCoachStore()
  const wk = weekNow(a), week = gridOf(a, cur, g.age).weeks[wk - 1], filmed = filmedDates(g), mins = slotMinutes(g)
  const nights = (week?.nights ?? []).filter(x => (NIGHTS as readonly string[]).includes(x.night)).map(x => {
    const date = dateOf(a, wk, x.night), i = g.dates.indexOf(date), done = date < a.today, tonight = date === a.today
    const came = i < 0 ? 0 : ps.filter(p => p.roll[i] === true).length, swaps = coachSwaps(g, wk, x.night), wasFilmed = filmed.includes(shortDay(date))
    const s = teamSessionOf(a, cur, g, wk, x.night), parts = s.drills.length ? `${s.drills.length} drills` : `${PARTS.length} parts`
    const ran = [swaps.length ? `You swapped the ${swaps[0].part.toLowerCase()}` : 'Ran as planned', `${came} came`, ...(BALL_ROLLING_FROM_FILM && x.night === ROLLING.night ? [`ball rolling ${ROLLING.pct}%`] : wasFilmed ? ['filmed'] : [])].join(' · ')
    return { night: x.night, title: x.session.split(' · ')[0], sub: done ? ran : `${mins} minutes · ${parts} · ${swaps.length ? `you swapped the ${swaps.map(v => v.part.toLowerCase()).join(' and the ')}` : 'plan ready'}`, done, tonight, to: tonight || !done ? 'ACT3-AcademySessionPlan' : wasFilmed ? 'ADC3-SessionFilm' : 'ADC15-MySession' }
  })
  const missed = ps.filter(p => missedLast(p)), c = count(ps), survey = surveyOf(a, ps), watch = watchOf(g)
  const drafts = meters[3].n

  return (
    <div data-board="ACC1-CoachToday" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      {!inApp && <CoachNav active="today" sub="Today" go={go} />}
      <main style={{ ...T.main, flexGrow: 0, flex: 'none', padding: '14px 28px 20px' }}>
        <section aria-label="Now" style={{ flex: 'none', borderRadius: 16, background: '#ffffff', border: `1px solid ${LINE}`, padding: '8px 10px 8px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <strong style={{ fontSize: 15, whiteSpace: 'nowrap' }}>Today · {shortDate(a.today)}</strong>
          <button onClick={() => go('ACT3-AcademySessionPlan')} style={chip}>
            <strong style={{ fontSize: 13, lineHeight: '16px' }}>{start} {g.name}</strong>
            <span style={{ fontSize: 12, lineHeight: '15px', color: '#33443f' }}>{here + away ? `${here} here · ${away} away` : `${tonightOf(a, g, ps).coming.length} coming`} · {onTrial ? `${onTrial} on trial` : 'plan ready'}</span>
          </button>
          {/* One-on-ones are on Friday afternoon and Saturday morning now, so tonight's second chip is the trial player, when there is one. */}
          {trial && <button data-trial={trial.id} onClick={() => { openTrial(trial.id); go('ACC3-TrialAssess') }} style={chip}>
            <strong style={{ fontSize: 13, lineHeight: '16px' }}>{trial.col === 'coach' ? 'Trial tonight' : 'Trial · sent to Dani'}</strong>
            <span style={{ fontSize: 12, lineHeight: '15px', color: '#33443f' }}>{trial.name}, {trial.age}</span>
          </button>}
          <button onClick={() => go('ACC7-AcademyGameDay')} style={chip}>
            <strong style={{ fontSize: 13, lineHeight: '16px' }}>Sun 10:00 game</strong>
            <span style={{ fontSize: 12, lineHeight: '15px', color: '#33443f' }}>{g.name} at Wattle Creek</span>
          </button>
          <span style={{ flexGrow: 1 }} />
          {/* The swap itself is on the session plan now (pack v33): each part there has its own Swap, and a swap shows in "This week" below. The board's link is to ACT2. */}
          <More onClick={() => go('ACT3-AcademySessionPlan')}>Swap a drill</More>
          <Primary onClick={() => go('ACC2-RunSession')}>Start the {start}</Primary>
        </section>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="Progress" style={{ flex: 'none', borderRadius: 18, background: '#1c3a33', color: '#ffffff', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#f4c95d' }}>PROGRESS · {g.name.toUpperCase()} · THIS TERM</span>
                  <strong data-headline="" style={{ fontSize: 25, lineHeight: '31px', letterSpacing: '-0.01em' }}>{word(lead.now)} of your {n} now {SAY[lead.skill] ?? `are on step 3 or higher on ${lead.skill.toLowerCase()}`}. In week 1, {word(lead.then).toLowerCase()}.</strong>
                  <span style={{ fontSize: 14, lineHeight: '20px', color: '#cfe6dc' }}>Players on step 3 or higher, on each of the four core skills. The white line is week 1, “then”.</span>
                </span>
                <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch' }}>
                  <button onClick={() => demoToast('Then and now for four players, from the drill you filmed in weeks 3 and 7.')} style={{ ...plain, height: 44, padding: '0 16px', borderRadius: 999, background: '#f4c95d', color: INK, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
                    Play 45 seconds
                  </button>
                  <button onClick={() => go('ADC2-Group')} style={{ ...plain, height: 44, padding: '0 16px', borderRadius: 999, border: '1px solid #ffffff', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }}>By player</button>
                </span>
              </div>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end', marginTop: 4 }}>
                {tc.skills.map(s => (
                  <span key={s.skill} data-bar={s.skill} data-then={s.then} data-now={s.now} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 12, lineHeight: '16px', color: '#cfe6dc', whiteSpace: 'nowrap' }}>{s.skill}</span>
                    <span role="img" aria-label={`${s.skill}: ${s.then} then, ${s.now} now, of ${n}`} style={{ display: 'block', position: 'relative', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.16)' }}>
                      <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.round(100 * s.now / n)}%`, borderRadius: 5, background: '#f4c95d' }} />
                      <span style={{ position: 'absolute', left: `${Math.round(100 * s.then / n)}%`, top: -3, width: 2, height: 16, background: '#ffffff' }} />
                    </span>
                    <span style={{ fontSize: 13, color: '#ffffff' }}><strong style={T.num}>{s.now}</strong> now · {s.then} then</span>
                  </span>
                ))}
              </div>
            </section>

            <section aria-label="Development" style={{ ...T.tile, gap: 8 }}>
              <div style={T.between}><h2 style={T.h2}>Development · every player, this term</h2><button onClick={() => go('ADC2-Group')} style={textLink}>My team</button></div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'nowrap' }}>
                {ps.map(p => (
                  <button key={p.id} data-dot={p.id} data-status={status(p)} aria-label={`${p.name}: ${DOT[status(p)].say}`} onClick={() => go(coachBoard(p))} style={{ ...plain, margin: '-7px 0', flex: 'none', width: 30, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ width: 30, height: 30, borderRadius: 999, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, ...DOT[status(p)].look }}>{ini(p)}</span>
                  </button>
                ))}
              </div>
              <div data-legend="" style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                {[2, 1, 0].map(k => (
                  <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#33443f' }}>
                    <span style={{ width: 14, height: 14, borderRadius: 999, boxSizing: 'border-box', ...DOT[k].look }} />
                    {tally[k]} {['with no notes in 3 weeks', 'on the same step', 'up a step'][k]}
                  </span>
                ))}
              </div>
              {clipFor && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: `1px solid ${HAIR}` }}>
                  <span style={face(PALE)}>{ini(clipFor)}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{firstName(clipFor)} is up a step on {a.skills[clipFor.skills_now.findIndex((s, k) => s > clipFor.skills_then[k])].toLowerCase()}</span>
                    <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>No clip has gone home this term. Tonight’s film has one that shows it</span>
                  </span>
                  <Primary onClick={() => openThen(clipFor.id, 'ADC3-SessionFilm')}>Send to {firstName(clipFor)}’s family</Primary>
                </div>
              )}
              {noGoal.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: `1px solid ${HAIR}` }}>
                  <span style={face(MAUVE_PALE)}>{noGoal.length === 1 ? ini(noGoal[0]) : String(noGoal.length)}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{names(noGoal)} {noGoal.length === 1 ? 'has' : 'have'} no goal yet</span>
                    <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>{noGoal.length === 1 ? (isNew(noGoal[0], g) ? `Joined on ${dayMonth(noGoal[0].joined)}` : 'One goal at a time') : `One goal at a time, starting with ${firstName(noGoal[0])}`}</span>
                  </span>
                  <More onClick={() => openThen(noGoal[0].id, 'ADC10-SetGoal')}>Set one</More>
                </div>
              )}
              {noNotes.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: `1px solid ${HAIR}` }}>
                  <span style={face(MAUVE_PALE)}>{noNotes.length === 1 ? ini(noNotes[0]) : String(noNotes.length)}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{names(noNotes)} {noNotes.length === 1 ? 'has' : 'have'} no notes</span>
                    <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>Two taps each after tonight’s session</span>
                  </span>
                  <More onClick={() => go('ADC11-AfterSession')}>Add notes</More>
                </div>
              )}
              {!clipFor && !noGoal.length && !noNotes.length && <span style={{ fontSize: 15, lineHeight: '21px', paddingTop: 8, borderTop: `1px solid ${HAIR}` }}>Every player has a goal and notes, and every player who is up a step has a clip at home.</span>}
              <span style={{ ...T.cap, paddingTop: 6 }}>Steps come from your own notes after each session. Film backs them for the players you’ve filmed.</span>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 12, alignItems: 'start' }}>
              <section aria-label="This week" style={{ ...T.tile, gap: 0 }}>
                <div style={{ ...T.between, paddingBottom: 4 }}><h2 style={T.h2}>This week, from the curriculum</h2><button onClick={() => go('ACT1-AcademyWeek')} style={textLink}>The term</button></div>
                <span style={T.sub}>Week {wk}{nights[0] ? ` · ${week.nights[0].session}` : ''}</span>
                {nights.map(x => (
                  <button key={x.night} data-night={x.night} data-state={x.tonight ? 'tonight' : x.done ? 'done' : 'to come'} onClick={() => go(x.to)} style={{ ...plain, display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: `1px solid ${HAIR}`, ...(x.tonight ? { background: PALE, margin: '0 -8px', padding: '0 8px', borderRadius: 8 } : null) }}>
                    <strong style={{ flex: 'none', width: 38, fontSize: 13 }}>{x.night}</strong>
                    <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: 14, lineHeight: '18px' }}>{x.title}</strong>
                      <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{x.sub}</span>
                    </span>
                    {x.tonight ? <span style={{ flex: 'none', height: 28, padding: '0 10px', borderRadius: 999, background: G, color: '#ffffff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center' }}>Tonight</span> : x.done ? <Tick /> : null}
                  </button>
                ))}
                {!nights.length && <span style={{ ...T.cap, paddingTop: 8, borderTop: `1px solid ${HAIR}` }}>No nights are written for this week yet.</span>}
              </section>
              <section aria-label="Who came" style={{ ...T.tile, gap: 6 }}>
                <div style={T.between}><h2 style={T.h2}>Who came</h2><StrongDot /></div>
                {/* One bar a week, counted from the roll. Mauve below 85%, the same line the team page uses. */}
                <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 130 }}>
                  {tc.weeks.map(w => (
                    <span key={w.week} data-week={w.week} data-pct={w.pct} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
                      <strong style={{ ...T.num, fontSize: 12 }}>{w.pct}%</strong>
                      <span style={{ width: '100%', height: Math.max(8, Math.round((w.pct - 60) * 2.4)), borderRadius: '6px 6px 0 0', background: w.pct < 100 * CAME_LOW ? '#a86b78' : G }} />
                      <span style={{ fontSize: 11, color: MUT }}>Wk {w.week}</span>
                    </span>
                  ))}
                </div>
                <span data-came-term="" style={T.cap}>{tc.att}% this term, from the roll.{missed.length ? ` ${names(missed)} ${missed.length === 1 ? 'has' : 'have'} missed the last three.` : ''}</span>
              </section>
            </div>

            <section aria-label="Sunday" style={{ ...T.tile, gap: 10 }}>
              <div style={T.between}><h2 style={T.h2}>Sunday · {g.name} {SUNDAY.us}, {SUNDAY.them} {SUNDAY.themGoals}</h2><button onClick={() => go('ADC7-GameReview')} style={textLink}>Game review</button></div>
              <div style={{ display: 'flex', gap: 16 }}>
                <Stat n={`${n} of ${n}`} label="Played half a game or more" sub="The club’s rule, kept" />
                <Stat n={`${SUNDAY.winBack} sec`} label="To win the ball back" sub={`In round 3 it took ${SUNDAY.winBackWas}`} />
                <Stat n={String(SUNDAY.clips)} label="Clips cut for you" sub={`${SUNDAY.clipsHome} already sent home`} />
                <Stat n={`${Math.min(SUNDAY.coming, n)} of ${n}`} label="Coming this Sunday" sub={SUNDAY.at} />
              </div>
            </section>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="Oversight" style={{ ...T.tile, padding: '12px 14px' }}>
              <div style={T.between}><h2 style={T.h2}>Has anything slipped?</h2><StrongDot /></div>
              <span style={T.sub}>{g.name} · counted from what you’ve done in Clean Sheet</span>
              {meters.map((m, k) => (
                <button key={m.label} data-meter={m.label} data-n={m.n} data-of={m.of} onClick={() => go(opens[k])} style={meterRow}>
                  <Meter label={m.label} n={m.n} of={m.of} under={under[k]} low={m.low} />
                </button>
              ))}
              <span style={{ ...T.cap, paddingTop: 4 }}>Dani sees these same four numbers for every coach.</span>
            </section>
            <section aria-label="Your families" style={{ ...T.tile, padding: '12px 14px' }}>
              <h2 style={T.h2}>Your families</h2>
              <button data-families="staying" data-n={c.staying} onClick={() => go('ACC13-AcademyChat')} style={meterRow}>
                <Meter label="Staying for Term 3" n={c.staying} of={n} under={[c.notSaid ? `${c.notSaid} ${c.notSaid === 1 ? 'hasn’t' : 'haven’t'} said` : '', c.leaving ? `${c.leaving} leaving` : ''].filter(Boolean).join(' · ') || 'Every family has said yes'} />
              </button>
              <button data-families="survey" data-n={survey.n} onClick={() => go('ACC13-AcademyChat')} style={meterRow}>
                <Meter label="Answered the family survey" n={survey.n} of={n} under="Too few for a score, so you see their words" />
              </button>
              {/* No score for one team: a team has too few answers to read as a number. One family's words instead (sample). */}
              <span style={{ fontSize: 14, lineHeight: '20px', paddingTop: 6 }}>{FAMILY_WORDS}</span>
              <span style={T.cap}>A {g.name} parent</span>
            </section>
            <section aria-label="Your coaching" style={{ ...T.tile, gap: 4, padding: '12px 14px' }}>
              <div style={T.between}><h2 style={T.h2}>Your own coaching</h2><button onClick={() => go('ADC15-MySession')} style={textLink}>My sessions</button></div>
              <span data-watched="" style={{ fontSize: 14, lineHeight: '20px' }}>{watch.watched ? `${watch.by === 'You' || !watch.by ? 'Dani' : watch.by.split(' ')[0]} watched you on ${longDate(watch.watched)}. One thing to try: ${TO_TRY}.` : 'Nobody has watched one of your sessions yet this term.'}</span>
              <span style={{ display: 'flex', gap: 16, paddingTop: 4 }}>
                {BALL_ROLLING_FROM_FILM && <Stat n={`${ROLLING.pct}%`} label="Ball rolling" sub={`Monday. The target is ${ROLLING.target}%`} />}
                <Stat n={String(watch.filmed)} label="Sessions filmed" sub="This term" />
              </span>
              <span style={{ display: 'flex', paddingTop: 6 }}><More onClick={() => go('ADC18-Learn')}>Something to learn this week</More></span>
            </section>
            <button aria-label="One thing needs you" onClick={() => go('ACC13-AcademyChat')} style={{ ...plain, ...T.tile, flex: 'none', flexDirection: 'row', alignItems: 'center', gap: 12, padding: '12px 14px', borderTop: '4px solid #c39797' }}>
              <span style={{ ...face(MAUVE_PALE), width: 36, height: 36 }}>1</span>
              <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15 }}>One thing needs you</strong>
                <span style={T.sub}>Dani asked: can you cover U13 Gold on Thu 11 June?</span>
              </span>
              <Chevron size={16} />
            </button>
          </div>
        </div>

        <section aria-label="Done for you this week" style={{ flex: 'none', borderRadius: 16, background: PALE, border: '1px solid #cfe3da', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', width: 170 }}>
            <strong style={{ fontSize: 15, lineHeight: '19px' }}>Done for you this week</strong>
            <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>So your time goes on the pitch</span>
          </span>
          <Stat n={String(nights.length)} label="Session plans" sub="Written from the curriculum" />
          <Stat n={String(SUNDAY.clips)} label="Clips cut" sub="From this week’s film and Sunday" />
          <Stat n={String(drafts)} label="Report drafts" sub="From your two taps a player" />
          <Stat n={String(n)} label="Families told" sub="Times, changes and Sunday, without a text" />
        </section>
      </main>
    </div>
  )
}
