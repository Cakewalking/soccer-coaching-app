// ACC7-AcademyGameDay, rebuilt as pack v36 draws it (1,690 tall, it scrolls; a tile is as tall as its content):
// the event (the hero), the reason for it (the week was for this), and what comes back (after).
// COUNTED: days to go from the list's today; the four nights from the curriculum (the same team session the home uses);
// the eleven, who comes on and who cannot play, from the team's real players; "N of 16 can play"; the hour by hour from the kick-off.
// SAMPLE, in ../gameDay (`GAME`, shared with the team sheet ADC20, the live game ADC21, the home, the week and the session plan) and marked below: the fixture, results,
// who is registered with the club, Sunday's answers, the three things to look for, what the film shows of the opposition.
// Sunday's answers are their own sample. They are not tonight's answers (ACT4): a family can say yes to one and not the other.
// The hero is drawn, not a photo. Amber is the one film button. Hand-built: do not make it again from the board's source.

import { useContext, type CSSProperties, type ReactNode } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { NIGHTS, dateOf, gridOf, useCurriculum, weekNow } from '../../academy/curriculum'
import { coachBoard, firstName, ini, names, openPlayer, useCoachTeam } from '../coachTeam'
import { GAME, gameClock, sundayOf } from '../gameDay'
import { Estimate, More } from '../kit'
import { G, HAIR, INK, LINE, MAUVE_PALE, MUT, PALE, T, plain, textLink } from '../styles'
import { Chevron } from '../teamParts'

// SAMPLE (the v36 board): three things to look for on Sunday, each with last game's number and its aim. They come from last
// Sunday's review and the team's style; after the game the film counts them again.
const LOOK = [
  { name: 'Weaker-foot touches', n: '18%', aim: 'aim 20%+', why: 'Four nights on the weaker foot. This is where it should show.', to: 'ADC8-TeamStyle' },
  { name: 'Seconds to win it back', n: '7 s', aim: 'your usual is 4 s', why: 'Wednesday was for this. One pressed, the rest watched.', to: 'ADC7-GameReview' },
]
// SAMPLE: who films, and what the film of the last meeting shows.
const FILMER = 'Tom, Zane’s dad, is filming from the halfway line. The tablet stand is in the kit bag.'
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const hero: CSSProperties = { ...plain, height: 44, padding: '0 16px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', boxSizing: 'border-box' }
const small = { fontSize: 12, lineHeight: '16px', color: '#33443f' } as const
const big = { fontSize: 24, lineHeight: '28px', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' } as const

const After = ({ when, title, text, link, to, go }: { when: string; title: string; text: string; link: string; to: string; go: (id: string) => void }) => (
  <section aria-label={title} style={{ ...T.tile, gap: 4, padding: '12px 14px' }}>
    <strong style={{ ...big, fontSize: 22 }}>{when}</strong><strong style={{ fontSize: 15, lineHeight: '20px' }}>{title}</strong>
    <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{text}</span>
    <span style={{ display: 'flex' }}><button onClick={() => go(to)} style={{ ...textLink, margin: 0 }}>{link}</button></span>
  </section>
)
const Tile = ({ label, children }: { label: string; children: ReactNode }) => <section aria-label={label} style={T.tile}>{children}</section>

export default function ACC7AcademyGameDay({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g, ps } = useCoachTeam(), c = useCurriculum()
  const n = ps.length, sun = sundayOf(ps), d = new Date(`${GAME.date}T00:00:00Z`)
  const days = Math.round((d.getTime() - Date.parse(`${a.today}T00:00:00Z`)) / 864e5)
  const toGo = days > 1 ? `${days} days to go` : days === 1 ? 'tomorrow' : days === 0 ? 'today' : 'played'
  const wk = weekNow(a), nights = (gridOf(a, c, g.age).weeks[wk - 1]?.nights ?? []).filter(x => (NIGHTS as readonly string[]).includes(x.night))
  const game = 2 * GAME.half, breakMins = 10
  const openThen = (id: number, board: string) => { openPlayer(id); go(board) }
  // Ready for Sunday: six rows. The team sheet is not done while anyone cannot play; the rest are done, four of them by the app.
  const ready: { name: string; text: string; done: boolean; app: boolean; button: string; act: () => void }[] = [
    { name: 'Team sheet', done: sun.cannot.length === 0, app: false, button: 'Open', act: () => go('ADC20-TeamSheet'),
      text: `${sun.can.length} of ${n} can play.${sun.cannot.length ? ` ${names(sun.cannot)} still ${sun.cannot.length === 1 ? 'has' : 'have'} to register with ${GAME.club}.` : ''} The sheet goes to the league on Saturday at 6 pm.` },
    { name: 'Who’s coming', done: true, app: true, button: 'See', act: () => go('ACT4-AcademyComing'),
      text: `${sun.yes.length} families said yes for Sunday in the family app.${sun.none.length ? ` ${names(sun.none)} ${sun.none.length === 1 ? 'hasn’t' : 'haven’t'} answered and ${sun.none.length === 1 ? 'is' : 'are'} asked again on Friday.` : ''} “See” shows tonight’s answers and the roll.` },
    { name: 'Minutes', done: true, app: true, button: 'See plan', act: () => go('ADC20-TeamSheet'), text: `A plan is drawn up so everyone gets at least half a game. ${sun.on.length ? `${sun.on.length === 1 ? 'One change' : `${sun.on.length} changes`} at half-time, more on ${GAME.half + 15} minutes.` : 'Nobody is waiting to come on.'}` },
    { name: 'Team talk', done: true, app: true, button: 'Open', act: () => go('E-TeamTalk'), text: 'Three slides made from tonight’s session: one clip, one picture, one question. Two minutes, no more.' },
    { name: 'Filming', done: true, app: false, button: 'How to film', act: () => go('ACC8-AcademyRecord'), text: FILMER },
    { name: 'Cards and bans', done: true, app: true, button: 'See', act: () => demoToast(`Nobody in ${g.name} has a card this season.`), text: 'Nobody is suspended. Checked against the club’s record this morning.' },
  ]
  const hours: [number, string, string][] = [[-45, 'Arrive', 'Parents get the time and a map on Friday.'], [-35, 'Warm-up', 'Tonight’s arrival game. They already know it.'], [-10, 'Team talk', 'Three slides on the tablet. Two minutes.'], [0, 'Kick-off', 'Tap “Start the game”. Changes are prompted for you.'], [GAME.half, 'Half-time', 'One question, the same one as tonight.'], [game + breakMins, 'Final whistle', 'Each player taps how it felt on the way out.']]

  return (
    <div data-board="ACC7-AcademyGameDay" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      {!inApp && <CoachNav active="gameday" sub="This Sunday" go={go} />}
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <section aria-label="Sunday’s game" style={{ flex: 'none', borderRadius: 18, background: 'radial-gradient(120% 150% at 85% 0%,#2f6b5a 0%,#1c3a33 55%,#10211f 100%)', color: '#ffffff', padding: '22px 24px', display: 'flex', gap: 24, alignItems: 'stretch' }}>
          <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span data-round="" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#cfe6dc', textTransform: 'uppercase' }}>Round {GAME.round} · {DAY[d.getUTCDay()]} {d.getUTCDate()} {MONTH[d.getUTCMonth()]} · {toGo}</span>
            <h1 style={{ margin: 0, fontSize: 44, lineHeight: '48px', letterSpacing: '-0.025em' }}>{g.name}<br /><span style={{ fontSize: 22, lineHeight: '30px', fontWeight: 400, color: '#cfe6dc' }}>against</span> {GAME.opponent}</h1>
            <span style={{ fontSize: 15, lineHeight: '21px', color: '#cfe6dc' }}>Kick-off {GAME.kickoff} · {GAME.home ? 'home' : 'away'}, {GAME.pitch} at {GAME.ground} · two halves of {GAME.half} minutes, {GAME.aSide} a side. You play as {GAME.club}.</span>
            <div style={{ display: 'flex', gap: 22, paddingTop: 4, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#cfe6dc' }}>YOUR LAST FIVE</span>
                <span role="img" aria-label={`Your last five, oldest first: ${GAME.lastFive.map(r => r === 'W' ? 'won' : r === 'D' ? 'drew' : 'lost').join(', ')}`} style={{ display: 'flex', gap: 5 }}>
                  {GAME.lastFive.map((r, k) => <span key={k} style={{ width: 24, height: 24, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, boxSizing: 'border-box', ...(r === 'W' ? { background: '#ffffff', color: INK } : r === 'D' ? { background: 'rgba(255,255,255,0.28)', color: '#ffffff' } : { border: '1.5px solid rgba(255,255,255,0.7)', color: '#ffffff' }) }}>{r}</span>)}
                </span>
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#cfe6dc' }}>LAST TIME YOU MET</span><strong style={{ fontSize: 15, lineHeight: '24px' }}>{GAME.lastMet}</strong></span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#cfe6dc' }}>LAST SUNDAY</span><strong style={{ fontSize: 15, lineHeight: '24px' }}>Won {GAME.last.us}–{GAME.last.themGoals} at {GAME.last.them}</strong></span>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 12 }}>
              {/* Amber: the one film button on the page. */}
              <button data-film="" onClick={() => demoToast(`The film plays: four moments from the ${GAME.lastMetScore} in ${GAME.lastMetMonth}, picked for what you worked on this week.`)} style={{ ...hero, background: '#f4c95d', color: INK }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>Play the film · last time you met · 1:48
              </button>
              <button onClick={() => go('ADC21-LiveGame')} style={{ ...hero, background: '#ffffff', color: INK }}>Start the game</button>
              <button onClick={() => go('ACC13-AcademyChat')} style={{ ...hero, border: '1.5px solid rgba(255,255,255,0.75)', color: '#ffffff' }}>Message the team</button>
            </div>
          </div>
          <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div role="img" aria-label={`The starting eleven, drawn on a pitch: ${sun.starts.map(s => firstName(s.p)).join(', ')}`} data-eleven={sun.starts.length} style={{ position: 'relative', width: 300, height: 292, flex: 'none', borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.55)', background: 'repeating-linear-gradient(180deg,rgba(255,255,255,0.05) 0 36px,rgba(255,255,255,0) 36px 73px)', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', left: 0, right: 0, top: '36%', borderTop: '1.5px solid rgba(255,255,255,0.4)' }} />
              <span style={{ position: 'absolute', left: '50%', top: '36%', width: 64, height: 64, borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.4)', transform: 'translate(-50%,-50%)' }} />
              <span style={{ position: 'absolute', left: '25%', right: '25%', bottom: 0, height: '17%', border: '1.5px solid rgba(255,255,255,0.4)', borderBottom: 'none' }} />
              <span style={{ position: 'absolute', left: '25%', right: '25%', top: 0, height: '9%', border: '1.5px solid rgba(255,255,255,0.4)', borderTop: 'none' }} />
              {sun.starts.map(s => (
                <span key={s.p.id} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 999, background: '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{ini(s.p)}</span>
                  <span style={{ fontSize: 10, lineHeight: '12px', color: '#ffffff', fontWeight: 700 }}>{firstName(s.p)}</span>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, width: 300 }}>
              <span data-come-on="" style={{ fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>Starts · {sun.on.length ? `${names(sun.on)} come${sun.on.length === 1 ? 's' : ''} on` : 'nobody on the bench'}</span>
              <button onClick={() => go('ADC20-TeamSheet')} style={{ ...plain, minHeight: 44, color: '#ffffff', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>Team sheet</button>
            </div>
          </div>
        </section>

        <Tile label="The week was for this">
          <div style={{ ...T.between, paddingBottom: 6 }}><h2 style={T.h2}>The week was for this</h2><button onClick={() => go('ACT1-AcademyWeek')} style={textLink}>This week</button></div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${nights.length + 1},minmax(0,1fr))`, gap: 8 }}>
            {nights.map(x => { const tonight = dateOf(a, wk, x.night) === a.today
              return (
                <span key={x.night} data-night={x.night} style={{ borderRadius: 10, background: PALE, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{x.night}{tonight ? ' · tonight' : ''}</span>
                  <strong style={{ fontSize: 13, lineHeight: '17px' }}>{x.focus}</strong><span style={small}>{x.session}</span>
                </span>
              ) })}
            <span style={{ borderRadius: 10, background: G, color: '#ffffff', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>SUN · THE GAME</span>
              <strong style={{ fontSize: 13, lineHeight: '17px' }}>See it happen</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#e9f3ee' }}>The same three things, counted from the film</span>
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8, paddingTop: 8 }}>
            {LOOK.map(x => (
              <button key={x.name} data-look={x.name} onClick={() => go(x.to)} style={{ ...plain, borderRadius: 12, border: `1px solid ${LINE}`, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <strong style={{ fontSize: 14, lineHeight: '18px' }}>{x.name}</strong>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><strong style={big}>{x.n}</strong><span style={small}>last game · {x.aim}</span></span>
                <span style={small}>{x.why}</span>
              </button>
            ))}
            <button data-look="Minutes shared" onClick={() => go('ADC20-TeamSheet')} style={{ ...plain, borderRadius: 12, border: `1px solid ${LINE}`, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Minutes shared</strong>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><strong style={big}>{n - 1} of {n}</strong><span style={small}>last game · aim all {sun.can.length} on Sunday</span></span>
              <span style={small}>Everyone who can play gets at least {GAME.half} of the {game} minutes.</span>
            </button>
          </div>
          <span style={{ ...T.cap, paddingTop: 8 }}>These three come from last Sunday’s review and your team’s style. After the game the film counts them again, so you can see whether the week worked.</span>
        </Tile>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 12, alignItems: 'start' }}>
          <section aria-label="Ready for Sunday" style={{ ...T.tile, gap: 0 }}>
            <div style={T.between}><h2 style={T.h2}>Ready for Sunday</h2><span data-ready="" style={T.cap}>{ready.filter(r => r.done).length} of {ready.length} done · the app did {['none', 'one', 'two', 'three', 'four', 'five', 'six'][ready.filter(r => r.done && r.app).length]} of them</span></div>
            {ready.map(r => (
              <div key={r.name} data-ready-row={r.name} data-done={r.done} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: `1px solid ${HAIR}`, padding: '6px 0', boxSizing: 'border-box' }}>
                {/* Only a row that is not done is mauve. */}
                <span aria-hidden="true" style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, ...(r.done ? { background: PALE, color: G } : { background: '#c39797', color: INK }) }}>
                  {r.done ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg> : '!'}
                </span>
                <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{r.name}{r.done ? '' : ' · to do'}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{r.text}</span></span>
                <More onClick={r.act}>{r.button}</More>
              </div>
            ))}
            <span style={{ ...T.cap, paddingTop: 8, borderTop: `1px solid ${HAIR}` }}>{g.name} plays its games as part of {GAME.club}, so the club’s and the league’s rules apply on the day.</span>
          </section>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            {sun.cannot.length > 0 && (
              <section data-cannot={sun.cannot.length} aria-label="Can’t play yet" style={{ flex: 'none', borderRadius: 16, background: MAUVE_PALE, border: '1px solid #c39797', padding: '12px 14px', display: 'flex', flexDirection: 'column', color: INK }}>
                <h2 style={T.h2}>Can’t play yet</h2>
                <span style={{ fontSize: 13, lineHeight: '18px', paddingBottom: 6 }}>The league only lets registered club players take the field. {sun.cannot.length === 1 ? `${firstName(sun.cannot[0])} can` : sun.cannot.length === 2 ? 'Both can' : 'They can'} still train.</span>
                {sun.cannot.map(p => (
                  <button key={p.id} data-cannot-row={p.id} onClick={() => openThen(p.id, coachBoard(p))} style={{ ...plain, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: '1px solid #e2c9c9', fontSize: 14 }}><span style={{ color: '#33443f' }}>{p.name}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong>{GAME.cannotPlay[p.id]}</strong><Chevron /></span></button>
                ))}
                <span style={{ fontSize: 12, lineHeight: '17px', color: '#33443f', paddingTop: 6 }}>Their parents were reminded today with a link that takes two minutes. Dani sees this too.</span>
              </section>
            )}
            <section aria-label={GAME.opponent} style={{ ...T.tile, gap: 6, padding: '12px 14px' }}>
              <div style={T.between}><h2 style={T.h2}>{GAME.opponent}</h2><Estimate /></div>
              <span style={{ fontSize: 14, lineHeight: '20px' }}>From the film of the {GAME.lastMetScore} in {GAME.lastMetMonth}: <strong>both their goals came down your left</strong>, and they went long from 9 of 11 goal kicks.</span>
              <span style={T.cap}>One game is not much to go on. Their team may have changed since.</span>
              {/* A link, not a second film button. */}
              <span style={{ display: 'flex' }}><button onClick={() => demoToast('Both goals play, back to back.')} style={{ ...textLink, margin: 0, textDecoration: 'none' }}>Watch both goals · 0:42</button></span>
            </section>
          </div>
        </div>

        <Tile label="Sunday, hour by hour">
          <h2 style={{ ...T.h2, paddingBottom: 8 }}>Sunday, hour by hour</h2>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${hours.length},minmax(0,1fr))`, gap: 10 }}>
            {hours.map(([plus, name, text]) => (
              <span key={name} data-hour={name} style={{ borderTop: `3px solid ${plus === 0 ? G : LINE}`, paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <strong style={{ ...T.num, fontSize: 17, lineHeight: '22px' }}>{gameClock(plus)}</strong><strong style={{ fontSize: 13, lineHeight: '17px' }}>{name}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{text}</span>
              </span>
            ))}
          </div>
        </Tile>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12, alignItems: 'start' }}>
          <After go={go} when={gameClock(game + breakMins + 25)} title="Your review is back" text="About 25 minutes after the film goes up: the score, eight measures against your aims, and three things to work on." link="See last week’s" to="ADC7-GameReview" />
          <After go={go} when="6 pm" title="Each family gets their child’s moments" text="Two or three short clips for each player, with one line from you. Only their own child is named." link="See it as a parent" to="ADP1-AcademyHome" />
          <After go={go} when="Monday" title="Next week plans itself" text="What the review finds goes into Monday’s session, the home practice and each player’s goal. You change what you don’t agree with." link="This week’s plan" to="ACT3-AcademySessionPlan" />
        </div>
      </main>
    </div>
  )
}
