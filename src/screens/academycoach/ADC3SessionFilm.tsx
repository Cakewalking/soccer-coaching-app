// ADC3-SessionFilm, rebuilt as pack v38 draws it and renamed Film. One place for all of the coach's film: there is no clips page.
// Look by recording, player, what we're working on, or playlist; pick one and everything below follows: what the app did and what is
// left for the coach, each player's state in name order (nobody is ranked), the picked clip with its strip of moments, why it was
// picked (from the player's goal in the academy's list), and what the coach does with it.
// COUNTED from the academy's list: the players, each goal, clips sent home this term. "Send to the family" writes there (`sendClip`),
// so the player's file, the coach home's clip meter and the owner's team page move, as before.
// COUNTED from the film store as it stands: the four numbers in the band, every row's state, every card's moments and how many wait.
// SAMPLE (filmStore): the recordings and their moments, the team numbers under the clip, and who has no filming consent.
// A clip goes to the child's own family only. Team-mates stay blurred unless their family has agreed. A trial player's film is kept
// for the assessment only. Under 12 it is clips only. A tile is as tall as its content. Hand-built.

import type { CSSProperties, ReactNode } from 'react'
import { sendClip, type Player } from '../academy/academyStore'
import { openTrial, useTrials } from '../academy/trialStore'
import { demoToast } from '../demoToast'
import { playClips } from '../clips/clipSheet'
import { coachBoard, firstName, ini, names, openPlayer, shortDate, tonightOf, useCoachTeam } from './coachTeam'
import { PlayMark, Still } from './filmParts'
import {
  KIT, PLAYLISTS, RECORDINGS_THIS_TERM, addToReport, filmNow, he, him, his, isPicked, look, markSent, pickMoment, recordingsOf, rowState, tally, toggleNote, turnDown, useFilm, waitingIn,
  type Moment, type RecId, type View,
} from './filmStore'
import { More, Primary } from './kit'
import { G, HAIR, INK, LINE, MUT, PALE, T, plain, textLink } from './styles'
import { StrongDot } from './teamParts'

const WORDS = ['None', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']
const word = (n: number) => WORDS[n] ?? String(n)
const mmss = (s: number) => `0:${String(s).padStart(2, '0')}`
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`
const VIEWS: [View, string][] = [['recording', 'Recording'], ['player', 'Player'], ['working', 'What we’re working on'], ['playlists', `Playlists · ${PLAYLISTS.length}`]]
const card = (on: boolean): CSSProperties => ({ ...plain, flex: 1, minWidth: 0, minHeight: 64, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 4, padding: 8, borderRadius: 14, ...(on ? { background: PALE, border: `2px solid ${G}` } : { background: '#ffffff', border: `1px solid ${LINE}` }) })
const pill = (kind: string): CSSProperties => ({ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', ...(kind === 'check' ? { background: '#c39797', color: INK } : kind === 'sent' ? { background: G, color: '#ffffff' } : { background: '#e9eae8', color: INK }) })
const Big = ({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) => (
  <span data-band={id} data-n={n} style={{ flex: 1, minWidth: 0, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
    <strong style={{ ...T.num, flex: 'none', fontSize: 26, lineHeight: '30px', minWidth: 38 }}>{n}</strong>
    <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{title}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{children}</span></span>
  </span>
)

export default function ADC3SessionFilm({ go }: { go: (id: string) => void }) {
  const { a, g, ps, player: p } = useCoachTeam()
  const { moments, sel } = useFilm()
  const recs = recordingsOf(a), rec = recs.find(r => r.id === sel.rec) ?? recs[0], list = PLAYLISTS.find(x => x.id === sel.list) ?? PLAYLISTS[0]
  const t = tonightOf(a, g, ps), trial = useTrials().find(x => x.team === g.id && x.col === 'coach'), guest = trial?.name.split(' ')[0]
  const f = firstName(p), noFilm = (x: Player) => KIT.noFilm.includes(x.name)
  const awayTonight = [...t.away, ...t.none].map(r => r.p)
  const awayIn = (id: RecId, x: Player) => id === 'tonight' ? awayTonight.includes(x) : (recs.find(r => r.id === id)?.away.includes(x.name) ?? false)

  // What is being looked through: one recording, everything, one skill, or one playlist.
  const inScope = (m: Moment) => sel.view === 'recording' ? m.rec === rec.id : sel.view === 'working' ? m.skill === sel.skill : sel.view === 'playlists' ? list.has(m) : true
  const scope = moments.filter(inScope), all = tally(scope)
  const rows = sel.view === 'recording' && rec.only ? ps.filter(x => x.name === rec.only) : ps
  // The Player view opens one of the player's recordings: the one picked, or the first with something to check, or the newest.
  const theirs = recs.map(r => ({ r, ms: moments.filter(m => m.rec === r.id && m.player === p.id) })).filter(x => x.ms.length)
  const playerRec = sel.view !== 'player' ? null : (theirs.find(x => x.r.id === sel.playerRec) ?? theirs.find(x => x.ms.some(m => m.state === 'wait')) ?? theirs[0])?.r ?? null
  const mine = scope.filter(m => m.player === p.id && (!playerRec || m.rec === playerRec.id))
  const cur = mine.find(m => m.id === sel.at) ?? mine.find(m => m.state === 'wait') ?? mine.find(isPicked) ?? mine[0] ?? null
  const curRec = recs.find(r => r.id === (cur?.rec ?? playerRec?.id ?? rec.id)) ?? rec
  const picks = mine.filter(isPicked)
  const band = sel.view === 'player' ? tally(scope.filter(m => m.player === p.id)) : all
  const waitingNow = sel.view === 'player' ? band.waiting : all.waiting
  const walkScope = (m: Moment) => inScope(m) && (sel.view !== 'player' || m.player === p.id)

  const pickPlayer = (x: Player) => { openPlayer(x.id); look({ at: null, playerRec: null, walk: false }) }
  /** Walk on to the next clip waiting for a yes, after `from`. Stops when nothing is left. */
  function next(from: Moment | null) {
    const q = waitingIn(filmNow().moments.filter(walkScope), ps), key = (m: Moment) => ps.findIndex(x => x.id === m.player) * 1000 + recs.findIndex(r => r.id === m.rec) * 100 + m.k
    if (!q.length) { look({ walk: false }); demoToast('That’s all of them. Nothing is waiting for your yes.'); return }
    const to = (from && q.find(m => m.id !== from.id && key(m) > key(from))) ?? q[0]
    openPlayer(to.player); look({ at: to.id, walk: true, ...(sel.view === 'player' ? { playerRec: to.rec } : null) })
  }
  function send(m: Moment) {
    sendClip(p.id)   // to this child's own family only: the academy's list counts it
    markSent(m.id)
    demoToast(`Sent to ${p.parent}, ${f}’s ${p.parent_is}. Only ${f} is named.${p.age >= 13 ? ` ${f} is ${p.age}, so it also shows in ${f}’s own app.` : ''}`)
    if (sel.walk) next(m)
  }
  function notThis(m: Moment) {
    const other = turnDown(m.id)
    demoToast(other ? 'Taken off the list. The next best is offered in its place.' : `Taken off the list. Nothing else of ${f}’s is offered from this recording.`)
    if (other) look({ at: other }); else if (sel.walk) next(m)
  }
  const play = (m: Moment) => { playClips([{ title: `${f}, ${m.label.toLowerCase()}`, sub: `${curRec.name}, minute ${m.minute}.${m.blurTeam || (m.blurTrial && guest) ? ' One child in it is blurred.' : ''}`, len: m.len }], curRec.name); demoToast('The clip plays.') }

  // Why this one: the player's own goal from the list, then what the moment shows, then who is blurred in it.
  function why(m: Moment) {
    const onGoal = !!p.goal && p.goal_skill === m.skill
    const first = p.goal ? `${f}’s goal this term is “${p.goal}”.` : `${f} has no goal set yet.`
    const second = m.why ?? (!isPicked(m) && m.state !== 'no' ? `This one was not picked${onGoal ? ', though it is on the same skill' : `: it shows ${m.skill.toLowerCase()}, not ${his(p)} goal`}. You can pick it yourself.`
      : onGoal ? `This moment is on ${m.skill.toLowerCase()}, the skill that goal works on, and it is the clearest one of ${him(p)} in ${curRec.inLine}.`
      : p.goal ? `Nothing in ${curRec.inLine} showed that goal clearly, so this is ${his(p)} clearest moment: ${m.skill.toLowerCase()}.` : `So this is ${his(p)} clearest moment in ${curRec.inLine}: ${m.skill.toLowerCase()}.`)
    const blur = m.blurTrial && guest ? `${guest}, who is on trial, is in the clip and is blurred.` : m.blurTeam ? `${names(ps.filter(noFilm))} is in the clip and is blurred: no filming consent.` : 'Nobody else in the clip needs blurring.'
    return `${first} ${second} ${blur}`
  }
  const clipsOnly = curRec.only ? (ps.find(x => x.name === curRec.only)?.age ?? g.age) < 12 : g.age < 12   // under 12 it is clips only
  const title = sel.view === 'recording' ? rec.name : sel.view === 'player' ? `${p.name}, in these recordings` : sel.view === 'working' ? sel.skill : list.name
  const onSkill = (skill: string) => ps.filter(x => x.goal_skill === skill).length

  return (
    <div data-board="ADC3-SessionFilm" data-view={sel.view} style={{ flexGrow: 1, minHeight: 0, boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', letterSpacing: '-0.02em' }}>Film</h1>
            <span style={T.cap}>Everything you’ve recorded. Pick a recording, check what was picked for each player, and send it on.</span>
          </div>
          <More onClick={() => go('ACC8-AcademyRecord')}>Record</More>
          {waitingNow
            ? <Primary onClick={() => { next(null); demoToast(`The first one opens. Yes or no on each. ${plural(waitingNow, 'clip')} to check.`) }}><span data-check={waitingNow}>Check the {waitingNow} waiting</span></Primary>
            : <span data-check="0" style={{ display: 'inline-flex', alignItems: 'center', height: 44, padding: '0 18px', borderRadius: 10, background: '#e9eae8', color: INK, fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap' }}>Nothing waiting</span>}
        </div>

        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ ...T.cap, width: 64 }}>Look by</span>
          <span role="group" aria-label="How to look through your film" style={{ display: 'flex', gap: 6 }}>
            {VIEWS.map(([id, name]) => (
              <button key={id} aria-pressed={sel.view === id} data-look-by={id} onClick={() => look({ view: id, at: null, walk: false })} style={{ ...plain, flex: 'none', minHeight: 44, boxSizing: 'border-box', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 12px', fontSize: 13, lineHeight: '16px', fontWeight: 700, ...(sel.view === id ? { background: G, color: '#ffffff', border: `1px solid ${G}` } : { background: '#ffffff', color: INK, border: `1px solid ${LINE}` }) }}>{name}</button>
            ))}
          </span>
          <span style={{ ...T.cap, marginLeft: 'auto', textAlign: 'right' }}>Sessions, games and one-on-ones are all here. There is no separate clips page.</span>
        </div>

        {/* What to look through. Picking one changes everything below. */}
        <div role="radiogroup" aria-label={sel.view === 'recording' ? 'Recordings' : sel.view === 'player' ? `${f}’s recordings` : sel.view === 'working' ? 'Skills' : 'Playlists'} style={{ flex: 'none', display: 'flex', gap: 10, alignItems: 'stretch' }}>
          {sel.view === 'recording' && recs.map((r, k) => { const c = tally(moments.filter(m => m.rec === r.id))
            return (
              <button key={r.id} role="radio" aria-checked={r.id === rec.id} data-rec={r.id} data-moments={c.found} data-waiting={c.waiting} onClick={() => look({ rec: r.id, at: null, walk: false })} style={card(r.id === rec.id)}>
                <Still height={64} angle={130 + 18 * k} />
                <strong style={{ fontSize: 13, lineHeight: '17px' }}>{r.name}</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{shortDate(r.date)} · {r.minutes} minutes</span>
                <span style={{ fontSize: 12, lineHeight: '16px', fontWeight: 700 }}>{c.found} moments · {c.waiting ? `${c.waiting} to check` : 'all done'}</span>
              </button>
            ) })}
          {sel.view === 'recording' && (
            <button data-rec="all" onClick={() => { look({ view: 'player', at: null, walk: false }); demoToast(`Four of the ${RECORDINGS_THIS_TERM} recordings this term are in this sample. Pick a player to see every one they are in.`) }} style={{ ...plain, flex: 'none', width: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, borderRadius: 14, border: '1px dashed #8a9794', textAlign: 'center' }}>
              <strong style={{ ...T.num, fontSize: 22 }}>{RECORDINGS_THIS_TERM}</strong><span style={{ fontSize: 13, fontWeight: 700 }}>All this term</span><span style={{ fontSize: 12, color: '#33443f' }}>Search by player</span>
            </button>
          )}
          {sel.view === 'player' && (theirs.length ? theirs.map(({ r, ms }, k) => { const c = tally(ms)
            return (
              <button key={r.id} role="radio" aria-checked={r.id === playerRec?.id} data-rec={r.id} data-moments={c.found} onClick={() => look({ playerRec: r.id, at: null, walk: false })} style={card(r.id === playerRec?.id)}>
                <Still height={64} angle={130 + 18 * k} />
                <strong style={{ fontSize: 13, lineHeight: '17px' }}>{r.name}</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{shortDate(r.date)} · {r.minutes} minutes</span>
                <span style={{ fontSize: 12, lineHeight: '16px', fontWeight: 700 }}>{plural(c.found, 'moment')} of {f} · {c.waiting ? `${c.waiting} to check` : 'all done'}</span>
              </button>
            ) }) : <span data-none="" style={{ ...T.cap, minHeight: 44, display: 'flex', alignItems: 'center' }}>There is no film of {f} in these recordings{noFilm(p) ? `: ${his(p)} parent said no to filming` : ''}. Pick another player on the left.</span>)}
          {sel.view === 'working' && a.skills.map(skill => { const c = tally(moments.filter(m => m.skill === skill))
            return (
              <button key={skill} role="radio" aria-checked={skill === sel.skill} data-skill={skill} data-moments={c.found} onClick={() => look({ skill, at: null, walk: false })} style={{ ...card(skill === sel.skill), padding: '8px 12px', justifyContent: 'center', gap: 2 }}>
                <strong style={{ fontSize: 14, lineHeight: '18px' }}>{skill}</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{plural(onSkill(skill), 'player has', 'players have')} a goal on it</span>
                <span style={{ fontSize: 12, lineHeight: '16px', fontWeight: 700 }}>{c.found} moments · {c.waiting ? `${c.waiting} to check` : 'all done'}</span>
              </button>
            ) })}
          {sel.view === 'playlists' && PLAYLISTS.map(x => { const c = tally(moments.filter(x.has))
            return (
              <button key={x.id} role="radio" aria-checked={x.id === list.id} data-list={x.id} data-moments={c.found} onClick={() => look({ list: x.id, at: null, walk: false })} style={{ ...card(x.id === list.id), padding: '8px 12px', justifyContent: 'center', gap: 2 }}>
                <strong style={{ fontSize: 14, lineHeight: '18px' }}>{x.name}</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{x.line}</span>
                <span style={{ fontSize: 12, lineHeight: '16px', fontWeight: 700 }}>{plural(c.found, 'moment')} · {plural(c.players, 'player')}</span>
              </button>
            ) })}
        </div>

        <section aria-label="What the app did, and what’s left for you" style={{ ...T.tile, flex: 'none', gap: 10, padding: '12px 16px' }}>
          <div style={T.between}>
            <h2 data-band-title="" style={T.h2}>{title}: what the app did, and what’s left for you</h2>
            <span style={T.cap}>{sel.view === 'recording' ? rec.ready : sel.view === 'player' ? `${p.clips_sent_this_term} sent home this term, from the list` : sel.view === 'working' ? `${plural(onSkill(sel.skill), 'player has', 'players have')} a goal on it` : 'From the four recordings shown'}</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Big id="found" n={band.found} title="Moments found">A touch, a pass, a shot or a move, each tied to one player and one skill.</Big>
            <Big id="picked" n={band.picked} title="Picked for families">Up to two for each player, chosen against their own goal. Nothing goes until you say.</Big>
            <Big id="waiting" n={band.waiting} title="Waiting for your yes">{band.waiting ? `${word(band.sent)} you’ve already sent. The rest need a look: about ${word(Math.max(1, Math.round(band.waiting / 6))).toLowerCase()} ${band.waiting > 8 ? 'minutes' : 'minute'}.` : `Nothing is waiting. ${word(band.sent)} sent home.`}</Big>
            <Big id="saved" n={band.saved} title="Saved to files">Done for you. Each is evidence for a goal and for the term report.</Big>
          </div>
        </section>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: '360px minmax(0,1fr)', gap: 12, alignItems: 'start' }}>
          <section aria-label="By player" style={{ ...T.tile, flex: 'none', gap: 2, padding: '12px 16px' }}>
            <div style={T.between}><h2 style={T.h2}>By player</h2><span style={T.cap}>In name order</span></div>
            {rows.map(x => { const ms = scope.filter(m => m.player === x.id), on = x.id === p.id
              const away = sel.view === 'recording' && awayIn(rec.id, x), st = rowState(ms, away, noFilm(x))
              const lbl = sel.view !== 'recording' && (st.kind === 'none' || st.kind === 'away') ? 'None' : st.label
              return (
                <button key={x.id} data-film-player={x.id} data-state={st.kind} data-moments={ms.length} aria-current={on} onClick={() => pickPlayer(x)}
                  style={{ ...plain, display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, ...(on ? { background: PALE, borderRadius: 10, outline: `2px solid ${G}`, outlineOffset: -2, padding: '0 8px', margin: '0 -8px' } : { borderTop: `1px solid ${HAIR}` }) }}>
                  <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#e8cfcf', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{ini(x)}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <strong style={{ fontSize: 14, lineHeight: '18px', whiteSpace: 'nowrap' }}>{x.name}</strong>
                    <span style={{ fontSize: 12, color: MUT }}>{ms.length ? plural(ms.length, 'moment') : 'No moments'}{sel.view === 'player' && ms.length ? ` in ${plural(new Set(ms.map(m => m.rec)).size, 'recording')}` : ''}{noFilm(x) ? ' · blurred for others' : ''}</span>
                  </span>
                  <span style={{ marginLeft: 'auto', ...pill(st.kind) }}>{lbl}</span>
                </button>
              ) })}
            <span data-foot="" style={{ ...T.cap, paddingTop: 6 }}>
              {sel.view === 'recording' && rec.only ? `A one-on-one is one player’s film. Only ${rec.only.split(' ')[0]} is in it. ` : null}
              {sel.view === 'recording' && !rec.only && (() => { const gone = ps.filter(x => awayIn(rec.id, x)); return gone.length ? `${names(gone)} ${gone.length === 1 ? 'wasn’t' : 'weren’t'} there${rec.id === 'tonight' ? ' tonight' : ''}. ` : null })()}
              {ps.filter(noFilm).map(x => `${firstName(x)} is not filmed for a clip of ${his(x)} own: ${his(x)} parent said no to filming. ${he(x) === 'she' ? 'She' : 'He'} is blurred in everyone else’s. `)}
              {trial && guest && (sel.view !== 'recording' || rec.id === 'tonight') ? <>{guest} is on trial: {trial.she ? 'her' : 'his'} film is kept for your assessment only. <button data-trial="" onClick={() => { openTrial(trial.id); go('ACC3-TrialAssess') }} style={textLink}>Open the assessment</button></> : null}
            </span>
          </section>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            {cur ? (
              <section aria-label={`${f}’s moment`} data-moment={cur.id} data-moment-state={cur.state ?? 'none'} style={{ ...T.tile, gap: 10, padding: '12px 16px' }}>
                <div style={T.between}>
                  <h2 style={T.h2}>{f} · {cur.label.charAt(0).toLowerCase()}{cur.label.slice(1)}</h2>
                  <span style={T.cap}>
                    {cur.state === 'sent' ? `Sent to ${his(p)} family` : cur.state === 'no' ? 'You said not this one' : isPicked(cur) ? `${picks.indexOf(cur) + 1} of ${picks.length} picked for ${his(p)} family` : 'Not picked'} · {curRec.id === 'tonight' ? curRec.part : `${curRec.name}, ${shortDate(curRec.date)}`}
                    {' · '}<button data-file="" onClick={() => go(coachBoard(p))} style={textLink}>{f}’s file</button>
                  </span>
                </div>
                {sel.walk && (
                  <div data-walk={waitingNow} style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 12, background: PALE, padding: '6px 6px 6px 12px' }}>
                    <strong style={{ flexGrow: 1, fontSize: 14, lineHeight: '19px' }}>Checking the waiting clips, one at a time. {plural(waitingNow, 'is', 'are')} left. Say yes or no below.</strong>
                    <More onClick={() => next(cur)}>Skip this one</More><More onClick={() => look({ walk: false })}>Stop checking</More>
                  </div>
                )}
                {/* The film button: the one place amber is used that is not a proof mark. */}
                <button data-play="" onClick={() => play(cur)} aria-label={`Play: ${f}, ${cur.label.toLowerCase()}, ${cur.len} seconds`} style={{ ...plain, flex: 'none', height: 340, borderRadius: 14, background: 'linear-gradient(160deg,#1c3a33,#2f5d50)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                  <PlayMark size={60} amber />
                  <span style={{ position: 'absolute', left: 14, bottom: 12, fontSize: 13, fontWeight: 700 }}>{f}, {cur.label.toLowerCase()} · minute {cur.minute}</span>
                  <span style={{ ...T.num, position: 'absolute', right: 14, bottom: 12, fontSize: 13 }}>{mmss(cur.len)}</span>
                </button>
                <div role="radiogroup" aria-label={`${f}’s moments`} style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 8 }}>
                  {mine.map((m, k) => (
                    <button key={m.id} role="radio" aria-checked={m === cur} data-strip={m.id} data-strip-state={m.state ?? 'none'} onClick={() => look({ at: m.id })} style={{ ...plain, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{ height: 54, borderRadius: 8, background: `linear-gradient(${120 + 22 * k}deg,#1c3a33,#40826d)`, ...(m === cur ? { outline: `3px solid ${G}`, outlineOffset: 1 } : null) }} />
                      <span style={{ fontSize: 11, lineHeight: '14px', ...(m === cur ? { fontWeight: 700 } : { color: '#33443f' }) }}>{m.label}</span>
                      <span style={{ fontSize: 11, lineHeight: '14px', color: '#33443f' }}>{m.state === 'wait' ? 'Waiting for your yes' : m.state === 'sent' ? 'Sent home' : m.state === 'no' ? 'Not this one' : m.saved ? 'In the file' : 'Not picked'}</span>
                    </button>
                  ))}
                </div>
                <div data-why="" style={{ borderRadius: 12, background: PALE, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <strong style={{ fontSize: 14, lineHeight: '19px' }}>{isPicked(cur) ? 'Why this one was picked' : cur.state === 'no' ? 'Why this one was offered' : 'Why this one was not picked'}</strong>
                  <span style={{ fontSize: 13, lineHeight: '19px' }}>{why(cur)}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  {cur.state === 'wait' && <Primary onClick={() => send(cur)}>Send to {f}’s family</Primary>}
                  {cur.state === 'sent' && <span data-sent-pill="" style={{ display: 'inline-flex', alignItems: 'center', height: 44, padding: '0 16px', borderRadius: 10, background: PALE, fontSize: 15, fontWeight: 700 }}>Sent to {f}’s family</span>}
                  {(cur.state === 'no' || !cur.state) && <More onClick={() => { pickMoment(cur.id); demoToast(`Picked for ${f}’s family. It waits for your yes like the others.`) }}>{cur.state === 'no' ? 'Offer it again' : `Pick this one for ${f}’s family`}</More>}
                  <More onClick={() => { toggleNote(cur.id); demoToast(cur.note ? 'Your spoken note is taken off the clip.' : 'Hold to talk. Your voice goes over the clip. In this demo the note is marked as added.') }}><span data-note={cur.note}>{cur.note ? 'Spoken note added · take it off' : 'Add a spoken note'}</span></More>
                  {cur.report
                    ? <More onClick={() => go('ACC6-ReportDraft')}><span data-report="true">Open {his(p)} term report</span></More>
                    : <More onClick={() => { addToReport(cur.id); demoToast(p.term_report === 'Too new' ? `${f} is too new for a report this term. The clip is kept in ${his(p)} file for the next one.` : `Added to ${f}’s term report as evidence. Tap again to open the report.`) }}><span data-report="false">Add to {his(p)} term report</span></More>}
                  {cur.state === 'wait' && <More onClick={() => notThis(cur)}>Not this one</More>}
                </div>
                <span style={T.cap}>{cur.saved ? `It is already in ${f}’s file.` : `It goes into ${f}’s file when you send it or add it to ${his(p)} report.`} A clip goes to the child’s own family only, and team-mates stay blurred unless their family has agreed. <span data-sent-now={p.clips_sent_this_term}>{p.clips_sent_this_term ? plural(p.clips_sent_this_term, 'clip') : 'No clips'} sent to {f}’s family this term.</span></span>
              </section>
            ) : (
              <section aria-label={`${f}: no moment`} data-moment="" style={{ ...T.tile, gap: 6, padding: '12px 16px' }}>
                <div style={T.between}><h2 style={T.h2}>{p.name}</h2><button data-file="" onClick={() => go(coachBoard(p))} style={textLink}>{f}’s file</button></div>
                <span style={{ fontSize: 14, lineHeight: '20px' }}>
                  {noFilm(p) ? `${f} is not filmed for a clip of ${his(p)} own: ${his(p)} parent said no to filming. ${he(p) === 'she' ? 'She' : 'He'} is blurred wherever ${he(p)} is in another player’s clip.`
                    : sel.view === 'recording' && awayIn(rec.id, p) ? `${f} wasn’t there, so ${rec.inLine} has nothing of ${him(p)}.`
                    : sel.view === 'recording' ? `The app found no moment of ${f} worth showing in ${rec.inLine}. ${he(p) === 'she' ? 'She' : 'He'} was there, and may be in other players’ clips.`
                    : sel.view === 'player' ? `There is no film of ${f} in these recordings.` : `Nothing of ${f}’s is in ${sel.view === 'working' ? `the moments on ${sel.skill.toLowerCase()}` : `“${list.name}”`} yet.`}
                </span>
                <span style={T.cap}><span data-sent-now={p.clips_sent_this_term}>{p.clips_sent_this_term ? plural(p.clips_sent_this_term, 'clip') : 'No clips'} sent to {f}’s family this term.</span></span>
              </section>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
              <section aria-label={curRec.saysTitle} data-says={curRec.id} style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
                <h2 style={{ ...T.h2, paddingBottom: 4 }}>{curRec.saysTitle}</h2>
                {clipsOnly ? <span style={{ fontSize: 14, lineHeight: '20px', paddingTop: 6, borderTop: `1px solid ${HAIR}` }}>Under 12 it is clips only. No scores or numbers for a child that age.</span> : (
                  <>
                    {curRec.says.map(([name, n]) => <span key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14 }}><span style={{ color: '#33443f' }}>{name}</span><strong style={{ ...T.num, textAlign: 'right' }}>{n}</strong></span>)}
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6 }}><span style={T.cap}>Counted from the film</span><StrongDot /></span>
                  </>
                )}
              </section>
              <section aria-label="Where it goes from here" style={{ ...T.tile, gap: 4, padding: '12px 14px' }}>
                <h2 style={T.h2}>Where it goes from here</h2>
                <span style={{ fontSize: 13, lineHeight: '19px' }}>Sent clips land in the family app tonight. Saved ones sit under the player’s goal. The team numbers feed Sunday’s “look for” and next week’s plan.</span>
                <span style={{ display: 'flex', gap: 14 }}>
                  <button onClick={() => go('ACC7-AcademyGameDay')} style={{ ...textLink, margin: 0 }}>Sunday</button>
                  <button onClick={() => go('ADP1-AcademyHome')} style={{ ...textLink, margin: 0 }}>As a parent</button>
                </span>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
