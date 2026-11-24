// ADC6-HomePractice, rebuilt as packs v35 and v36 draw it (1,606 tall, it scrolls; a tile is as tall as its content).
// One loop, picked → sent → done → sent back → kept, for the coach's own team this week.
// COUNTED from the shared practice store (academy/practice.ts) and the academy's list: the loop strip, this week's practice,
// the videos waiting, every row of the team table, "Does it show?" (steps from the list), week by week, and what families
// say (the list's `survey`). SAMPLE, each marked: what is known about a waiting video, and what Sunday showed.
// House rules: name order, nobody ranked, no streaks, a missed week is never shown to the player or other families.
// A reply to a child under 13 goes to the parent's app; from 13, to the player and a parent. The owner can hear every reply.

import { useRef, useState, type CSSProperties } from 'react'
import { demoToast } from '../demoToast'
import { STRONG_FROM, surveyOf } from '../academy/academyStore'
import { gridOf, useCurriculum, weekNow } from '../academy/curriculum'
import { replyToVideo, setThis, usePractice, type PracticePlayer } from '../academy/practice'
import { GAME, coachBoard, openPlayer, useCoachTeam } from './coachTeam'
import { Estimate, More, Primary } from './kit'
import { VIDEO_SAMPLE, byWeek, doesItShow, nextState, openFlow, showLine, thisWeek, timesWord, weeksOf } from './practiceCoach'
import { G, HAIR, INK, LINE, MAUVE, MAUVE_PALE, MUT, PALE, PLUM_LABEL, T, plain, textLink, th } from './styles'
import { Chevron, Hd, StrongDot } from './teamParts'

/** The survey question this page reads, by its words in the academy's list. */
const QUESTION = 'I know what to practise at home'
const COLS = '34px 148px 104px 104px minmax(0,1fr) 132px'
const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty']
const pair: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14, width: '100%' }
const film: CSSProperties = { ...plain, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: 'linear-gradient(135deg,#1c3a33,#40826d)', color: '#ffffff', flex: 'none' }
const Play = ({ size = 36 }: { size?: number }) => <span style={{ width: size, height: size, borderRadius: 999, background: '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg></span>
const ini = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

/** Hold to talk: press and hold records, letting go sends. With a keyboard, hold Space or Enter. A tap is too short to be a reply and sends nothing. */
function HoldToTalk({ name, onSent }: { name: string; onSent: (seconds: number) => void }) {
  const [rec, setRec] = useState(false), t0 = useRef(0)
  const start = () => { if (rec) return; t0.current = Date.now(); setRec(true) }
  const stop = (send: boolean) => {
    if (!rec) return
    setRec(false)
    const held = Date.now() - t0.current
    if (!send) { demoToast('Stopped. Nothing was sent.'); return }
    if (held < 400) { demoToast('Hold the button while you talk, then let go to send.'); return }
    onSent(Math.max(1, Math.round(held / 1000)))
  }
  return (
    <button data-hold={name} aria-pressed={rec} aria-label={`Hold to talk to ${name}. Press and hold, then let go to send`}
      onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); start() }} onPointerUp={() => stop(true)} onPointerCancel={() => stop(false)}
      onKeyDown={e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start() } }} onKeyUp={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); stop(true) } }} onBlur={() => stop(false)}
      style={{ ...plain, touchAction: 'none', userSelect: 'none', height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: rec ? '#ffffff' : G, color: rec ? INK : '#ffffff', fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
      {rec ? 'Recording · let go to send' : 'Hold to talk'}
    </button>
  )
}
/** A square for each week of the term: dark all the goes, light one or two, outlined none, grey before joining. One label for the strip. */
function Weeks({ pl, times, says }: { pl: PracticePlayer; times: number; says: string }) {
  return (
    <span role="img" aria-label={`${pl.name}, week by week: ${says}`} style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {pl.goes_by_week.map((v, k) => <span key={k} style={{ flex: 1, maxWidth: 24, height: 16, borderRadius: 3, boxSizing: 'border-box', ...(v === null ? { background: '#eceeed' } : v >= times ? { background: G } : v > 0 ? { background: '#9cc5b6' } : { background: '#ffffff', border: `1.5px solid ${MUT}` }) }} />)}
    </span>
  )
}

export default function ADC6HomePractice({ go }: { go: (id: string) => void }) {
  const { a, g, ps } = useCoachTeam(), p = usePractice(), c = useCurriculum()
  const n = p.players.length, w = p.this_week, wk = thisWeek(p), weeks = byWeek(p), show = doesItShow(p, ps)
  const block = gridOf(a, c, g.age).weeks[weekNow(a) - 1]?.nights[0]?.session.split(' · ')[0] ?? ''
  const mine = surveyOf(a, ps), all = surveyOf(a, a.players), qi = a.survey_questions.indexOf(QUESTION)
  const [editing, setEditing] = useState(false), [line, setLine] = useState(w.coach_line)
  const file = (name: string) => { const q = ps.find(x => x.name === name); if (q) { openPlayer(q.id); go(coachBoard(q)) } }
  const flow = (on: 'team' | 'one') => { openFlow(on); go('ADC19-SetPractice') }
  const loop: [string, string, boolean][] = [
    ['Picked', w.set_by === 'curriculum' ? `The curriculum matched it to week ${p.week}.${w.kept_by_coach ? ' You kept it.' : ''}` : `Set by you for week ${p.week}.`, true],
    ['Sent', `${w.sent}, to ${n} families.`, true],
    ['Done', `${wk.did} of ${n} so far. ${wk.goes} goes of a possible ${wk.possible}.`, true],
    ['Sent back', `${wk.videos} ${wk.videos === 1 ? 'video' : 'videos'}. ${wk.waiting.length ? `${wk.waiting.length} ${wk.waiting.length === 1 ? 'is' : 'are'} waiting for you.` : wk.videos ? 'You have answered them all.' : ''}`, wk.videos > 0 && !wk.waiting.length],
    ['Kept', 'In each player’s file and the term report.', false],
  ]
  const top = Math.max(1, ...weeks.map(x => x.n))

  return (
    <div data-board="ADC6-HomePractice" style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)" }}>
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <Hd title="Practice at home" sub={`${p.team} · week ${p.week} of 10 · ${w.set_by === 'curriculum' ? `picked by the curriculum${w.kept_by_coach ? ', kept by you on Monday' : ''}` : 'set by you'}`}>
          <More onClick={() => flow('one')}>One for a single player</More>
          <Primary onClick={() => flow('team')}>Set next week’s</Primary>
        </Hd>

        <section aria-label="The loop this week" style={{ flex: 'none', borderRadius: 16, background: '#ffffff', border: `1px solid ${LINE}`, padding: '12px 16px', display: 'flex', gap: 14 }}>
          {loop.map(([name, text, done], k) => (
            <span key={name} data-loop={name} style={{ flex: 1, minWidth: 0, display: 'flex', gap: 10 }}>
              <span style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, ...(done ? { background: G, color: '#ffffff' } : { background: PALE, color: INK }) }}>{k + 1}</span>
              <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{name}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{text}</span></span>
            </span>
          ))}
        </section>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: '330px minmax(0,1fr)', gap: 12, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="This week" style={{ ...T.tile, gap: 6, padding: '12px 14px' }}>
              <div style={T.between}><h2 style={T.h2}>This week</h2><button onClick={() => { setLine(w.coach_line); setEditing(e => !e) }} style={textLink}>Change it</button></div>
              <button aria-label={`Play the clip: ${w.name}`} onClick={() => demoToast(`The clip plays: ${w.name}, 0:40. Reece shows it.`)} style={{ ...film, height: 128, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between', padding: '8px 10px', boxSizing: 'border-box', width: '100%' }}>
                <span style={{ alignSelf: 'center', marginTop: 22 }}><Play /></span>
                <span style={{ fontSize: 12, fontWeight: 700, lineHeight: '15px' }}>{w.name}<br /><span style={{ fontWeight: 400 }}>0:40 · Reece shows it</span></span>
              </button>
              <strong style={{ fontSize: 16, lineHeight: '21px', paddingTop: 2 }}>{w.name}</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{w.minutes} minutes, {timesWord(w.times)} before next Thursday. {w.needs}. Each player sees their own weaker foot.</span>
              {w.steps.map(([head, sub], k) => (
                <span key={head} style={{ display: 'flex', gap: 12, alignItems: 'baseline', minHeight: 48, borderTop: `1px solid ${HAIR}`, paddingTop: 6, boxSizing: 'border-box' }}>
                  <strong style={{ flex: 'none', width: 16, fontSize: 14 }}>{k + 1}</strong>
                  <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{head}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: '#33443f' }}>{sub}</span></span>
                </span>
              ))}
              {editing ? (
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, borderRadius: 10, background: PALE, padding: '8px 10px' }}>
                  <strong style={{ fontSize: 13 }}>Your line</strong>
                  <input data-line-edit="" value={line} onChange={e => setLine(e.target.value)} style={{ font: 'inherit', fontSize: 14, color: INK, height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LINE}`, background: '#ffffff', boxSizing: 'border-box', width: '100%' }} />
                  <span style={{ display: 'flex', gap: 8 }}>
                    <Primary onClick={() => { setThis({ coach_line: line.trim() }); setEditing(false); demoToast(`Your line is changed for the ${n} families. Nothing is sent again.`) }}>Save the line</Primary>
                    <More onClick={() => setEditing(false)}>Cancel</More>
                  </span>
                </label>
              ) : (
                <span data-line="" style={{ borderRadius: 10, background: PALE, padding: '8px 10px', fontSize: 13, lineHeight: '18px' }}><strong>Your line:</strong> {w.coach_line ? `“${w.coach_line}”` : 'None yet. Families read it first, so one sentence helps.'}</span>
              )}
              <span style={{ display: 'flex', gap: 14, paddingTop: 2 }}>
                <button onClick={() => go('ACK2-HomePractice')} style={{ ...textLink, margin: 0 }}>See it as a player</button>
                <button onClick={() => go('ADP5-Practice')} style={{ ...textLink, margin: 0 }}>As a parent</button>
              </span>
            </section>

            <section aria-label="Why this one" style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
              <h2 style={{ ...T.h2, paddingBottom: 4 }}>Why this one</h2>
              {([['The plan', `Week ${p.week} · ${block}`, 'ACT1-AcademyWeek'], ['From Sunday', `${GAME.last.weak} of ${GAME.last.chances} chances, weaker foot`, 'ADC7-GameReview'], ['Tonight', 'The session ends on it', 'ACT3-AcademySessionPlan']] as const).map(([name, value, to]) => (
                <button key={name} data-why={name} onClick={() => go(to)} style={{ ...plain, ...pair }}><span style={{ flex: 'none', color: '#33443f' }}>{name}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong style={{ textAlign: 'right' }}>{value}</strong><Chevron /></span></button>
              ))}
              <button data-why="Next week" onClick={() => flow('team')} style={{ ...plain, ...pair }}><span style={{ flex: 'none', color: '#33443f' }}>Next week</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}><strong style={{ textAlign: 'right' }}>{p.next_week.name}</strong><span data-next-state="" style={{ fontSize: 12, lineHeight: '16px', color: MUT, textAlign: 'right' }}>{nextState(p.next_week)}</span></span><Chevron /></span></button>
              <span style={{ ...T.cap, paddingTop: 6 }}>Dani wrote one for each week of the block. You can keep it, swap it for a drill from the library, or film your own.</span>
            </section>

            <section aria-label="Just for one player" style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
              <div style={{ ...T.between, paddingBottom: 4 }}><h2 style={T.h2}>Just for one player</h2><button onClick={() => flow('one')} style={textLink}>Add</button></div>
              {p.single.map(x => (
                <button key={x.player} data-single={x.player} onClick={() => file(x.player)} style={{ ...plain, ...pair }}><span style={{ flex: 'none', color: '#33443f' }}>{x.player}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong style={{ textAlign: 'right' }}>{x.name}</strong><Chevron /></span></button>
              ))}
              {!p.single.length && <span style={{ ...pair, color: MUT }}>None set yet</span>}
              <span style={{ ...T.cap, paddingTop: 6 }}>Set from each player’s own goal. It sits under the team’s practice, never in place of it.</span>
            </section>

            <section aria-label="What families say" style={{ ...T.tile, gap: 4, padding: '12px 14px' }}>
              {/* The academy's rule: Strong at 50 answers or more, Estimate below. One team's answers are always an estimate. */}
              <div style={T.between}><h2 style={T.h2}>What families say</h2>{mine.n >= STRONG_FROM ? <StrongDot /> : <Estimate />}</div>
              {qi >= 0 && mine.n > 0
                ? <span data-survey="" style={{ fontSize: 14, lineHeight: '20px' }}>“{QUESTION}”: <strong>{mine.q[qi].avg.toFixed(1)} of 5</strong> from {mine.n} of your {mine.of} families. The academy is at {all.q[qi].avg.toFixed(1)}, from {all.n}.</span>
                : <span style={{ fontSize: 14, lineHeight: '20px' }}>No family in this team has answered the survey yet.</span>}
              <span style={T.cap}>From the Term 2 family survey. {mine.n} answers is too few to lean on.</span>
            </section>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            {wk.waiting.length > 0 && (
              <section data-waiting={wk.waiting.length} aria-label="Videos waiting for you" style={{ flex: 'none', borderRadius: 16, background: MAUVE_PALE, border: '1px solid #c39797', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8, color: INK }}>
                <div style={T.between}><h2 style={T.h2}>{wk.waiting.length} {wk.waiting.length === 1 ? 'video is' : 'videos are'} waiting for you</h2><span style={{ fontSize: 12, color: '#33443f' }}>About a minute each</span></div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {wk.waiting.map(x => (
                    <div key={x.name} style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', gap: 10, alignItems: 'center' }}>
                      <button aria-label={`Play ${x.name}’s video`} onClick={() => demoToast(`${x.name.split(' ')[0]}’s video plays.`)} style={{ ...film, width: 92, height: 64 }}><Play size={30} /></button>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                        <strong style={{ fontSize: 14, lineHeight: '18px' }}>{x.name}</strong>
                        <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{VIDEO_SAMPLE[x.name] ?? 'Sent this week'}</span>
                        <HoldToTalk name={x.name} onSent={secs => { replyToVideo(x.name); demoToast(`Sent. Your ${secs} second reply goes back over ${x.name.split(' ')[0]}’s video, to ${x.goes_to === 'parent' ? 'the parent’s app' : `${x.name.split(' ')[0]} and a parent`}. Dani can hear it.`) }} />
                      </span>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 12, lineHeight: '17px', color: '#33443f' }}>Press and hold to talk, let go to send. Your voice goes back on top of their video. Under 13, it goes to the parent’s app. From 13, to the player and a parent. Dani can hear every reply.</span>
              </section>
            )}

            <section aria-label="The team" style={{ ...T.tile, gap: 0 }}>
              <div style={T.between}><h2 style={T.h2}>The team</h2><span style={T.cap}>Each square is a week. Dark is all {timesWord(w.times) === 'three times' ? 'three' : w.times} goes, light is one or two, outlined is none</span></div>
              <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 10, padding: '4px 0' }}>
                <span /><span style={th}>Player</span><span style={th}>This week</span><span style={th}>Sent back</span><span style={th}>This term · {p.week} weeks</span><span style={th}>What it shows</span>
              </div>
              {p.players.map(x => { const goes = x.goes_by_week[x.goes_by_week.length - 1] ?? 0, s = showLine(x), wo = weeksOf(x)
                const back = x.this_week_video === 'waiting for coach' ? 'waiting' : x.this_week_video === 'coach replied' ? 'replied' : goes > 0 ? 'tick' : 'none'
                return (
                  <button key={x.name} data-row={x.name} data-goes={goes} data-back={back} data-shows={s.text} onClick={() => file(x.name)} style={{ ...plain, display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'center', minHeight: 50, borderTop: `1px solid ${HAIR}`, width: '100%' }}>
                    <span style={{ width: 30, height: 30, borderRadius: 999, background: MAUVE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{ini(x.name)}</span>
                    <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{x.name}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>Age {x.age} · {x.goes_to === 'parent' ? 'parent’s app' : 'own app'}</span></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span role="img" aria-label={`${goes} of ${w.times} goes this week`} style={{ display: 'inline-flex', gap: 3 }}>{Array.from({ length: w.times }, (_, k) => <span key={k} style={{ width: 14, height: 14, borderRadius: 999, boxSizing: 'border-box', ...(k < goes ? { background: G } : { background: '#ffffff', border: `1.5px solid ${LINE}` }) }} />)}</span>
                      <span style={{ ...T.num, fontSize: 13 }}>{goes} of {w.times}</span>
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {back === 'waiting' ? <><span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 9px', borderRadius: 999, background: '#c39797', fontSize: 12, fontWeight: 700 }}>Video</span><span style={{ fontSize: 12, lineHeight: '15px', color: MUT }}>Waiting for you</span></>
                        : back === 'replied' ? <><strong style={{ fontSize: 13, lineHeight: '17px' }}>Video</strong><span style={{ fontSize: 12, lineHeight: '15px', color: MUT }}>You replied</span></>
                        : <span style={{ fontSize: 13, color: back === 'tick' ? INK : MUT }}>{back === 'tick' ? 'Tick only' : 'Nothing yet'}</span>}
                    </span>
                    <Weeks pl={x} times={w.times} says={`${wo.did} of ${wo.of} weeks with at least one go`} />
                    <span style={{ fontSize: 13, lineHeight: '17px', ...(s.strong ? { fontWeight: 700, color: PLUM_LABEL } : null) }}>{s.text}</span>
                  </button>
                ) })}
              <span style={{ ...T.cap, paddingTop: 8, borderTop: `1px solid ${HAIR}` }}>A player taps “Done it”, or a parent does. Nobody is ranked, there is no streak, and a missed week is never shown to the player or other families. One reminder goes on Wednesday, then none.</span>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 12, alignItems: 'start' }}>
              <section aria-label="Does it show?" style={{ ...T.tile, gap: 6, padding: '12px 14px' }}>
                <div style={T.between}><h2 style={T.h2}>Does it show?</h2><Estimate /></div>
                <span data-shows-up="" style={{ fontSize: 14, lineHeight: '20px' }}>Of the {show.often} who practised two weeks in three, <strong>{show.oftenUp} {show.oftenUp === 1 ? 'is' : 'are'} up a step</strong> this term. Of the {show.less} who did less, {show.lessUp}.</span>
                <span style={T.cap}>{WORDS[n] ?? n} players is too few to prove it, and keen players do both. Use it to encourage, not to judge.</span>
              </section>
              <section aria-label="Week by week" style={{ ...T.tile, gap: 6, padding: '12px 14px' }}>
                <h2 style={T.h2}>Week by week</h2>
                <div role="img" aria-label={`Players who did it at least once: ${weeks.map(x => `week ${x.week}, ${x.n}`).join('; ')}`} style={{ display: 'flex', gap: 5, alignItems: 'flex-end', height: 76 }}>
                  {weeks.map(x => (
                    <span key={x.week} data-week={x.week} data-n={x.n} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '100%', justifyContent: 'flex-end' }}>
                      <span style={{ ...T.num, fontSize: 11 }}>{x.n}</span>
                      <span style={{ width: '100%', height: Math.max(6, Math.round(34 * x.n / top)), borderRadius: 3, background: x.week === p.week ? G : '#9cc5b6' }} />
                      <span style={{ fontSize: 11, color: MUT }}>{x.week}</span>
                    </span>
                  ))}
                </div>
                <span style={T.cap}>Players who did it at least once, by week. Week {p.week} has until Thursday.</span>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
