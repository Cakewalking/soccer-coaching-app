// ADC21-LiveGame, as pack v38 draws it: the live game for the academy coach's own team.
// The dark score band with a clock that really runs while the screen is open, the next change counted down, the eleven on now,
// one-tap events, the list of what was tapped (each can be undone), who is off the pitch, and the week's three things as running counts.
// WORKED OUT, from the plan and the live game in ../gameDay: the score and scorers (from the taps), every player's minutes so far and
// who is on (from the clock and the changes made), the countdown, "at least N minutes", who is on next, and the three counters.
// "Make it now" makes the next changes at the clock's second, so the pitch, the minutes and the off-the-pitch list follow; Undo puts them back.
// SAMPLE (in ../gameDay): it opens as the board draws it (second half, 34:12, 1–1, five taps); the taps made before those five; the fixture.
// A coach's taps are a rough count, marked "You tapped" and never Strong: the film counts everything again afterwards.
// LINE OF TEXT ONLY: the buzz a minute before a change, the head-knock check, and marking the film.
// A tile is as tall as its content. Hand-built: do not make it again from the board's source.

import { useContext, useEffect, useState, type CSSProperties } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { firstName, ini, names, useCoachTeam } from '../coachTeam'
import { EARLIER_TAPS, GAME, GAME_MINS, leastOf, liveDo, madeAt, madeOrPlanned, minutesIn, nextChanges, playOut, spotOf, sundayOf, useLive, usePlan, type Tap, type TapKind } from '../gameDay'
import { More, Primary } from '../kit'
import { G, HAIR, INK, LINE, MAUVE, MAUVE_PALE, T, plain } from '../styles'
import { Pill } from '../teamParts'

const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']
const word = (n: number) => WORDS[n] ?? String(n)
const cap1 = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`
const DARK = 'radial-gradient(120% 120% at 80% 0%,#2f6b5a 0%,#1c3a33 55%,#10211f 100%)'
const line = { position: 'absolute', border: '2px solid rgba(255,255,255,0.4)' } as const
const round: CSSProperties = { height: 44, padding: '0 16px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', boxSizing: 'border-box' }
const roundOn: CSSProperties = { ...round, background: '#ffffff', color: INK, border: '1.5px solid #ffffff' }, roundOff: CSSProperties = { ...round, background: 'transparent', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.75)' }
/** The eight things a coach can tap: the words on the button, and what is said when no player is picked yet. */
const TAPS: { kind: TapKind; label: string; sub: string; big?: boolean; ask: string }[] = [
  { kind: 'goalUs', label: 'Goal for us', sub: 'Then tap who scored', big: true, ask: 'Goal. Tap the scorer on the pitch.' },
  { kind: 'goalThem', label: 'Goal for them', sub: 'Marks the film', big: true, ask: '' },
  { kind: 'chance', label: 'Chance', sub: 'Ours or theirs', ask: 'Chance marked. Tap who, or leave it.' },
  { kind: 'weak', label: 'Weaker foot', sub: 'This week’s focus', ask: 'Marked. Tap who used it.' },
  { kind: 'won', label: 'Won it back', sub: 'Inside six seconds', ask: '' },
  { kind: 'good', label: 'Good moment', sub: 'For a family’s clip', ask: 'Marked. Tap the player and it goes in their clips tonight.' },
  { kind: 'knock', label: 'Knock or injury', sub: 'Starts the check', ask: 'Tap the player. The head-knock check opens if it was a head knock.' },
  { kind: 'card', label: 'Card', sub: 'Yellow or red', ask: 'Tap the player and the colour.' },
]
const YouTapped = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>
    <span style={{ width: 9, height: 9, borderRadius: 999, boxSizing: 'border-box', border: '1.5px dashed #4a5a57' }} />You tapped
  </span>
)

export default function ADC21LiveGame({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { g, ps } = useCoachTeam()
  const plan = usePlan(), live = useLive()
  const [picked, setPicked] = useState<number | null>(null)     // a player tapped first: the next tap is theirs
  const [pending, setPending] = useState<number | null>(null)   // a tap still waiting for its player (or a card for its colour)
  const [ending, setEnding] = useState(false)
  useEffect(() => { const t = setInterval(() => liveDo.tick(), 1000); return () => clearInterval(t) }, [])   // the clock: one second at a time, while this screen is open

  const can = sundayOf(ps).can, canIds = can.map(p => p.id), byId = new Map(ps.map(p => [p.id, p]))
  const nameOf = (id?: number) => { const p = id === undefined ? undefined : byId.get(id); return p ? firstName(p) : '' }
  const half = GAME.half, clock = mmss(live.sec), over = live.sec >= GAME_MINS * 60
  const soFar = playOut(plan, live.sec / 60, madeAt(live)), onNow = soFar.on
  const mins = (id: number) => Math.floor(minutesIn(soFar.stints.get(id)))
  const ahead = playOut(plan, GAME_MINS, madeOrPlanned(live)), least = Math.floor(leastOf(ahead, canIds).min)
  const next = live.ended ? null : nextChanges(plan, live), left = next ? next.minute * 60 - live.sec : 0
  const off = can.filter(p => !onNow.includes(p.id))
  const us = live.taps.filter(t => t.kind === 'goalUs').length, them = live.taps.filter(t => t.kind === 'goalThem').length
  const goals = live.taps.filter(t => t.kind === 'goalUs' || t.kind === 'goalThem').sort((x, y) => x.sec - y.sec)
  const waiting = live.taps.find(t => t.id === pending)
  // The three things, as running counts: the taps before the list as drawn (sample), and every tap in the list.
  const weakTaps = live.taps.filter(t => t.kind === 'weak' || t.weak)
  const weakBy = (id: number) => (EARLIER_TAPS.weak[id] ?? 0) + weakTaps.filter(t => t.who === id).length
  const weak = Object.values(EARLIER_TAPS.weak).reduce((n, k) => n + k, 0) + weakTaps.length, weakNoName = weakTaps.filter(t => t.who === undefined).length
  const won = EARLIER_TAPS.won + live.taps.filter(t => t.kind === 'won').length
  const at30 = can.filter(p => mins(p.id) >= half).length, all30 = least >= half

  function tap(kind: TapKind) {
    if (live.ended) { demoToast('The game has ended. The film counts everything again now.'); return }
    const def = TAPS.find(x => x.kind === kind)!
    if (kind === 'goalThem') { liveDo.tap(kind, { note: 'Marked on the film' }); demoToast(`Their goal is marked at ${clock}.`); return }
    const who = picked ?? undefined, id = liveDo.tap(kind, { who })
    setPicked(null)
    if (who !== undefined && kind !== 'card' && kind !== 'knock') { setPending(null); demoToast(`${def.label}: ${nameOf(who)}, marked at ${clock}.`); return }
    setPending(id)
    demoToast(who !== undefined ? (kind === 'card' ? `Card for ${nameOf(who)}. Tap the colour.` : `Marked for ${nameOf(who)}. The head-knock check opens if it was a head knock.`) : def.ask || `Marked at ${clock}.`)
  }
  function tapPlayer(id: number) {
    if (waiting) {
      liveDo.set(waiting.id, { who: id })
      if (waiting.kind !== 'knock' && (waiting.kind !== 'card' || waiting.card)) setPending(null)
      demoToast(waiting.kind === 'goalUs' ? `Goal for ${nameOf(id)}, at ${Math.floor(waiting.sec / 60)} minutes.` : `${nameOf(id)}: marked.`)
      return
    }
    setPicked(picked === id ? null : id)
  }
  const title = (t: Tap) => { const n = nameOf(t.who), k = t.changes?.length ?? 0
    return t.kind === 'changes' ? (t.sec === half * 60 ? `Half-time · ${word(k)} ${k === 1 ? 'change' : 'changes'} made` : `${cap1(word(k))} ${k === 1 ? 'change' : 'changes'} made`)
      : t.kind === 'goalUs' ? (n ? `Goal · ${n}` : `Goal for ${g.name}`) : t.kind === 'goalThem' ? `Goal for ${GAME.opponent}`
      : t.kind === 'card' ? `${t.card ? `${t.card} card` : 'Card'}${n ? ` · ${n}` : ''}` : `${TAPS.find(x => x.kind === t.kind)!.label}${n ? ` · ${n}` : ''}` }
  const noteOf = (t: Tap) => {
    if (t.kind === 'changes') { const cs = plan.changes.filter(c => t.changes?.includes(c.id)); return `${names(cs.flatMap(c => byId.get(c.on) ?? []))} on for ${names(cs.flatMap(c => byId.get(c.off) ?? []))}` }
    if (t.note) return t.note
    return t.kind === 'goalUs' ? (t.who === undefined ? 'Tap who scored, or leave it' : 'Marked on the film') : t.kind === 'weak' ? 'This week’s focus' : t.kind === 'won' ? 'The film will time it'
      : t.kind === 'good' ? (t.who === undefined ? 'For a family’s clip' : 'Goes in their clips tonight') : t.kind === 'knock' ? (t.headKnock ? 'Head knock. The check is open' : 'Marked on the film') : 'Marked on the film'
  }
  const label = `${live.ended || over ? 'FULL TIME' : !live.running ? 'CLOCK PAUSED' : live.sec < half * 60 ? 'FIRST HALF' : 'SECOND HALF'} · ${live.ended ? 'FILM SAVED' : 'FILMING'} · ${Math.floor(live.film / 60)} MINUTES OF GOOD FILM`
  const tapBtn = (t: typeof TAPS[number]): CSSProperties => ({ flex: 1, minWidth: 0, minHeight: t.big ? 76 : 60, boxSizing: 'border-box', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, textAlign: 'center', padding: '4px 8px', fontFamily: 'inherit', cursor: 'pointer',
    ...(t.big ? { background: G, color: '#ffffff', border: `1px solid ${G}` } : { background: '#ffffff', color: INK, border: `1px solid ${LINE}` }) })
  const small: CSSProperties = { height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LINE}`, background: '#ffffff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }
  const card: CSSProperties = { ...plain, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 12px', borderRadius: 12, border: '1px solid #d9dcd8' }

  return (
    <div data-board="ADC21-LiveGame" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      {!inApp && <CoachNav active="gameday" sub="Live game" go={go} />}
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <section aria-label="Score and clock" style={{ flex: 'none', borderRadius: 18, background: 'radial-gradient(120% 160% at 85% 0%,#2f6b5a 0%,#1c3a33 55%,#10211f 100%)', color: '#ffffff', padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span data-half="" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#f4c95d' }}>{label}</span>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <strong style={{ fontSize: 24, lineHeight: '30px' }}>{g.name}</strong>
              <strong data-score={`${us}-${them}`} aria-label={`${us} to ${them}`} style={{ ...T.num, fontSize: 54, lineHeight: '58px', letterSpacing: '-0.02em' }}>{us} – {them}</strong>
              <strong style={{ fontSize: 24, lineHeight: '30px' }}>{GAME.opponent}</strong>
            </span>
            <span data-scorers="" style={{ fontSize: 13, lineHeight: '18px', color: '#cfe6dc' }}>{[...goals.map(t => `${t.kind === 'goalUs' ? nameOf(t.who) || g.name : GAME.opponent} ${Math.floor(t.sec / 60)}′`), `${GAME.home ? 'home' : 'away'}, ${GAME.pitch}`, `round ${GAME.round}`].join(' · ')}</span>
          </div>
          <div role="timer" aria-label={`The clock: ${clock} of ${GAME_MINS}:00`} style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <strong data-clock={live.sec} style={{ ...T.num, fontSize: 44, lineHeight: '48px' }}>{clock}</strong><span style={{ fontSize: 12, color: '#cfe6dc' }}>of {GAME_MINS}:00</span>
          </div>
          <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {live.ended ? <>
              <button onClick={() => go('ADC7-GameReview')} style={roundOn}>See the review</button>
              <button onClick={() => { liveDo.reset(); setPicked(null); setPending(null); demoToast('Back to the game as the demo starts it: second half, 34:12.') }} style={roundOff}>Start the demo again</button>
            </> : ending ? <>
              <button onClick={() => { liveDo.end(); setEnding(false); setPending(null); setPicked(null); demoToast('The game has ended. The review comes back about 25 minutes later.') }} style={roundOn}>Yes, end it at {clock}</button>
              <button onClick={() => setEnding(false)} style={roundOff}>Keep playing</button>
            </> : <>
              {over ? <button onClick={() => demoToast('The 60 minutes are up. End the game when the whistle goes.')} style={roundOn}>The clock has stopped</button>
                : live.running ? <button onClick={() => { liveDo.run(false); demoToast('Clock paused. The film keeps going.') }} style={roundOn}>Pause the clock</button>
                : <button onClick={() => { liveDo.run(true); demoToast('The clock is running again.') }} style={roundOn}>Start the clock</button>}
              <button onClick={() => { if (over) { liveDo.end(); demoToast('The game has ended. The review comes back about 25 minutes later.') } else { setEnding(true); demoToast('Only at the final whistle. The review comes back about 25 minutes later.') } }} style={roundOff}>End the game</button>
            </>}
          </div>
        </section>

        {next ? (
          <section data-next={next.minute} aria-label="The next change" style={{ ...T.tile, flex: 'none', flexDirection: 'row', alignItems: 'center', gap: 16, background: MAUVE_PALE, borderColor: '#c39797' }}>
            <strong data-countdown={left} style={{ ...T.num, flex: 'none', fontSize: 28, lineHeight: '32px' }}>{left > 0 ? mmss(left) : 'Now'}</strong>
            <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 16, lineHeight: '21px' }}>{left > 0 ? `Next change ${next.minute === half ? 'at half-time' : `on ${next.minute} minutes`}` : `${next.changes.length === 1 ? 'A change is' : 'Changes are'} due now`}: {next.changes.map(c => `${nameOf(c.on)} on for ${nameOf(c.off)}`).join(', ')}</strong>
              <span data-least={least} style={{ fontSize: 13, lineHeight: '18px' }}>After it, everyone will have played at least {least} minutes{all30 ? '' : `, less than half a game for ${names(can.filter(p => minutesIn(ahead.stints.get(p.id)) < half))}`}.{left > 60 ? ' You’ll get a buzz one minute before.' : ''}</span>
            </span>
            <More onClick={() => go('ADC20-TeamSheet')}>Change who</More>
            <Primary onClick={() => { const n = liveDo.makeNext(); if (n) demoToast(`Done. ${names(n.changes.flatMap(c => byId.get(c.on) ?? []))} ${n.changes.length === 1 ? 'is' : 'are'} on. Minutes are worked out again.`) }}>Make it now</Primary>
          </section>
        ) : (
          <section data-next="none" aria-label="The changes" style={{ ...T.tile, flex: 'none', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 16, lineHeight: '21px' }}>{live.ended ? 'The game has ended' : 'Every planned change is made'}</strong>
              <span data-least={least} style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{live.ended ? `Everyone played at least ${Math.min(...canIds.map(mins))} minutes. The film counts everything again, and the review comes back about 25 minutes later.` : `Everyone will have played at least ${least} minutes by full time.`}</span>
            </span>
            <More onClick={() => go('ADC20-TeamSheet')}>Team sheet</More>
          </section>
        )}

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: '440px minmax(0,1fr)', gap: 12, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="On the pitch now" style={{ borderRadius: 18, background: DARK, color: '#ffffff', padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={T.between}><strong style={{ fontSize: 18 }}>On now</strong><span aria-live="polite" style={{ fontSize: 12, color: '#cfe6dc' }}>{waiting ? (waiting.who === undefined ? `Tap who: ${title(waiting)}` : 'Finish the tap beside the pitch') : picked !== null ? `${nameOf(picked)} picked. Now tap what happened` : 'Tap a player to log something for them'}</span></div>
              <div data-pitch="" role="group" aria-label="The eleven on the pitch now, with minutes played so far" style={{ position: 'relative', height: 500, borderRadius: 14, border: '2px solid rgba(255,255,255,0.6)', background: 'repeating-linear-gradient(180deg,rgba(255,255,255,0.05) 0 50px,rgba(255,255,255,0) 50px 100px)', overflow: 'hidden' }}>
                <span aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: '40%', borderTop: '2px solid rgba(255,255,255,0.4)' }} />
                <span aria-hidden style={{ ...line, left: '50%', top: '40%', width: 96, height: 96, borderRadius: 999, transform: 'translate(-50%,-50%)' }} />
                <span aria-hidden style={{ ...line, left: '24%', right: '24%', bottom: 0, height: '16%', borderBottom: 'none' }} />
                <span aria-hidden style={{ ...line, left: '24%', right: '24%', top: 0, height: '8%', borderTop: 'none' }} />
                {onNow.map((id, place) => { const p = byId.get(id); if (!p) return null
                  const s = spotOf(plan, place), on = picked === id
                  return (
                    <button key={id} data-player={id} data-mins={mins(id)} aria-pressed={on} aria-label={`${p.name}, ${s.pos.toLowerCase()}, ${mins(id)} minutes so far. ${waiting ? 'Tap to put this to them.' : 'Tap, then tap what happened.'}`} onClick={() => tapPlayer(id)}
                      style={{ ...plain, position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: 80, textAlign: 'center', color: '#ffffff', borderRadius: 12, outlineOffset: 2, ...(on ? { outline: '3px solid #ffffff' } : waiting && waiting.who === undefined ? { outline: '1.5px dashed rgba(255,255,255,0.5)' } : null) }}>
                      <span style={{ width: 36, height: 36, borderRadius: 999, background: on ? MAUVE_PALE : '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{ini(p)}</span>
                      <strong style={{ fontSize: 12, lineHeight: '14px', color: '#ffffff' }}>{firstName(p)}</strong>
                      <span style={{ ...T.num, fontSize: 11, lineHeight: '13px', color: '#cfe6dc' }}>{mins(id)} min</span>
                    </button>
                  ) })}
              </div>
            </section>

            <section aria-label="Off the pitch" style={{ ...T.tile, flex: 'none' }}>
              <div style={T.between}><h2 style={T.h2}>Off the pitch</h2><span style={T.cap}>Minutes so far</span></div>
              {off.map(p => { const m = mins(p.id), isNext = next?.changes.some(c => c.on === p.id), later = !live.ended && plan.changes.find(c => live.made[c.id] === undefined && c.on === p.id)
                const when = later ? (later.minute * 60 <= live.sec ? 'now' : later.minute === half ? 'at half-time' : `at ${later.minute}`) : ''
                return (
                  <span key={p.id} data-off={p.id} data-mins={m} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: `1px solid ${HAIR}` }}>
                    <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: MAUVE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{ini(p)}</span>
                    <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: 14, lineHeight: '18px' }}>{p.name}</strong>
                      <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Played {m} · {later ? `${m ? 'back on' : 'on'} ${when}` : live.ended ? 'the game has ended' : m ? 'not on again in the plan' : 'no minutes in the plan yet'}</span>
                    </span>
                    <Pill kind={!later && !m && !live.ended ? 'mauve' : 'soft'}>{isNext ? 'On next' : later ? 'On later' : m || live.ended ? 'Done' : 'Not on yet'}</Pill>
                  </span>
                ) })}
              {!off.length && <span style={{ ...T.cap, borderTop: `1px solid ${HAIR}`, paddingTop: 10 }}>Everyone who can play is on.</span>}
            </section>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="One tap" style={{ ...T.tile, gap: 8 }}>
              <div style={T.between}><h2 style={T.h2}>One tap</h2><span style={T.cap}>Each tap marks the film, so the clip is found for you</span></div>
              {[TAPS.slice(0, 2), TAPS.slice(2, 5), TAPS.slice(5)].map((rowOf, k) => (
                <div key={k} style={{ display: 'flex', gap: 8 }}>
                  {rowOf.map(t => (
                    <button key={t.kind} data-tap={t.kind} onClick={() => tap(t.kind)} style={tapBtn(t)}>
                      <strong style={{ fontSize: t.big ? 17 : 15, lineHeight: '21px' }}>{t.label}</strong><span style={{ fontSize: 12, lineHeight: '15px', color: t.big ? '#e4f1eb' : '#33443f' }}>{t.sub}</span>
                    </button>
                  ))}
                </div>
              ))}
              {waiting && (
                <div data-waiting={waiting.kind} role="group" aria-label="Finish this tap" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', padding: '8px 10px', borderRadius: 12, background: '#eef5f2' }}>
                  <span style={{ flexGrow: 1, minWidth: 180, fontSize: 13, lineHeight: '18px' }}><strong>{title(waiting)}, {Math.floor(waiting.sec / 60)}′.</strong> {waiting.who === undefined ? 'Tap the player on the pitch.' : waiting.kind === 'card' ? 'Now the colour.' : 'Was it a head knock?'}</span>
                  {waiting.kind === 'card' && (['Yellow', 'Red'] as const).map(c => (
                    <button key={c} data-card={c} aria-pressed={waiting.card === c} onClick={() => { liveDo.set(waiting.id, { card: c }); if (waiting.who !== undefined) setPending(null); demoToast(`${c} card${waiting.who !== undefined ? ` for ${nameOf(waiting.who)}` : '. Tap the player'}.`) }} style={{ ...small, ...(waiting.card === c ? { background: G, color: '#ffffff', borderColor: G } : null) }}>{c}</button>
                  ))}
                  {waiting.kind === 'knock' && <button data-head="" aria-pressed={!!waiting.headKnock} onClick={() => { liveDo.set(waiting.id, { headKnock: true }); demoToast(`The head-knock check opens${waiting.who !== undefined ? ` for ${nameOf(waiting.who)}` : ''}. They stay off until it is done.`) }} style={{ ...small, ...(waiting.headKnock ? { background: G, color: '#ffffff', borderColor: G } : null) }}>It was a head knock</button>}
                  <button data-leave="" onClick={() => setPending(null)} style={small}>{waiting.who === undefined ? 'Leave it without a name' : 'Done'}</button>
                </div>
              )}
            </section>

            <section aria-label="What you’ve tapped" style={{ ...T.tile, flex: 'none' }}>
              <div style={T.between}><h2 style={T.h2}>What you’ve tapped</h2><YouTapped /></div>
              {live.taps.map(t => (
                <span key={t.id} data-tap-row={t.id} data-kind={t.kind} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: `1px solid ${HAIR}` }}>
                  <strong style={{ ...T.num, flex: 'none', width: 36, fontSize: 14 }}>{Math.floor(t.sec / 60)}′</strong>
                  <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: 14, lineHeight: '18px' }}>{title(t)}</strong>
                    <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{noteOf(t)}</span>
                  </span>
                  <button aria-label={`Undo: ${title(t)}, ${Math.floor(t.sec / 60)} minutes`} onClick={() => { liveDo.undo(t.id); if (pending === t.id) setPending(null); demoToast(t.kind === 'changes' ? 'Undone. The players are back where they were, and the minutes with them.' : 'Undone.') }}
                    style={{ ...plain, color: G, fontSize: 13, fontWeight: 700, minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', textDecoration: 'underline' }}>Undo</button>
                </span>
              ))}
              {!live.taps.length && <span style={{ ...T.cap, borderTop: `1px solid ${HAIR}`, paddingTop: 10 }}>Nothing in the list. Tap something above and it goes here.</span>}
              <span style={{ ...T.cap, paddingTop: 6 }}>Your taps are a rough count. The film counts everything again after the game and marks which numbers are strong.</span>
            </section>

            <section aria-label="The three things from this week" style={{ ...T.tile, gap: 8 }}>
              <div style={T.between}><h2 style={T.h2}>The three things from this week</h2><YouTapped /></div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button data-three="weak" data-n={weak} onClick={() => go('ADC8-TeamStyle')} style={card}>
                  <strong style={{ fontSize: 14, lineHeight: '18px' }}>Weaker-foot moments</strong><strong style={{ ...T.num, fontSize: 24, lineHeight: '28px' }}>{weak}</strong>
                  <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{weak ? [...ps.filter(p => weakBy(p.id)).map(p => `${firstName(p)} ${weakBy(p.id)}`), ...(weakNoName ? [`${weakNoName} with no name`] : [])].join(', ') : 'None yet'}</span>
                </button>
                <button data-three="won" data-n={won} onClick={() => go('ADC8-TeamStyle')} style={card}>
                  <strong style={{ fontSize: 14, lineHeight: '18px' }}>Won it back fast</strong><strong style={{ ...T.num, fontSize: 24, lineHeight: '28px' }}>{won}</strong>
                  <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>The film will time each one</span>
                </button>
                <button data-three="mins" data-n={at30} onClick={() => go('ADC20-TeamSheet')} style={card}>
                  <strong style={{ fontSize: 14, lineHeight: '18px' }}>At {half} minutes or more</strong><strong style={{ ...T.num, fontSize: 24, lineHeight: '28px' }}>{at30} of {can.length}</strong>
                  <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{at30 === can.length ? 'Everyone has had half a game' : all30 ? (next ? `All ${can.length} after the next change` : `All ${can.length} by full time`) : `${can.filter(p => minutesIn(ahead.stints.get(p.id)) >= half).length} of ${can.length} by full time, as it stands`}</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
