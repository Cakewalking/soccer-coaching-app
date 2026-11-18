import { useClub, Crest } from '../../clubTheme'
import { openThing } from '../openThing'
// The connected club: the coach's tablet screens.
// CN2 their take next to yours · CN4 what landed · CN8 worked elsewhere ·
// CN9 season reports · CN10 catch-ups · CN13 handover · CN15 positions · CN17 set pieces.

import { useState, type ReactNode } from 'react'
import { Mark, Btn, Note, tile, h2, cap, label, G, INK, MUT, LINE, PALE, Ico, IC } from '../capture/marks'
import { Page, col, FixRow } from '../capture/CaptureScreens'
import { useCn, setCn, addJob, enough, MIN_ANSWERS, TEAMS, type CnState } from './cnStore'

import { teamText } from '../../teamNames'
import { playClips } from '../clips/clipSheet'

export type Go = (target: string) => void
type Tm = 'u12' | 'u16' | 'seniors'
// The screens are drawn for U12 Sam. Another team gets its own players in the same places, and words that do not assume a girl or a child.
const nm = (team: Tm, text: string) => team === 'u12' ? text : teamText(team === 'u16' ? 'youth' : 'seniors', text)
function ctxFor(team: Tm) {
  const full = nm(team, 'Mia Tran'), [first, ...rest] = full.split(' '), fam = rest.join(' ') || first, girl = team === 'u12'
  return { team: TEAMS[team], full, first, fam, fams: `${fam}s`, parent: girl ? 'Linh' : 'the family', she: girl ? 'she' : 'he', She: girl ? 'She' : 'He', her: girl ? 'her' : 'his', Her: girl ? 'Her' : 'His', herO: girl ? 'her' : 'him',
    next: girl ? `${TEAMS.u13g}, Meg D` : `${TEAMS.seniors}, Marko P`, nextCoach: girl ? 'Meg D' : 'Marko P', age: team === 'u12' ? 'under-12s' : team === 'u16' ? 'under-16s' : 'a senior squad', size: team === 'u12' ? '9 v 9 and 16 players' : '11 v 11 and 16 players' }
}
export interface CnProps { s: CnState; go: Go; say: (m: string) => void; team?: 'u12' | 'u16' | 'seniors' }
const th = { fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, lineHeight: '15px' } as const
const row = (grid: string, i: number, extra?: object) => ({ display: 'grid', gridTemplateColumns: grid, alignItems: 'center', gap: 8, minHeight: 38, padding: '2px 8px', borderTop: i ? `1px solid ${LINE}` : undefined, fontSize: 14, ...extra } as const)
const Pill = ({ children, solid }: { children: ReactNode; solid?: boolean }) => <span style={{ justifySelf: 'start', height: 24, padding: '0 10px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: solid ? G : '#fff', color: solid ? '#fff' : INK, border: `1.5px solid ${solid ? G : INK}` }}>{children}</span>
const Two = ({ a, b }: { a: ReactNode; b: ReactNode }) => <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>{a}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{b}</span></span>

// ── CN2 · their take, next to yours ──────────────────────────────────────────
const Dots = ({ n, what }: { n: number; what: string }) => <span role="img" aria-label={`${what}: ${n} of 5`} style={{ display: 'inline-flex', gap: 2 }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ width: 9, height: 9, borderRadius: 999, boxSizing: 'border-box', background: i <= n ? G : '#fff', border: `1.5px solid ${G}` }} />)}</span>
const TAKES: [string, number, number, string, string, string?][] = [
  ['Mia Tran', 4, 4, 'Winning it back', 'Scanning'], ['Noah Okafor', 2, 4, 'First touch', 'Shooting early', 'Hard on himself'], ['Jai Patel', 5, 3, 'Passing forward', 'Something else', 'Sees it differently'],
  ['Zoe Hart', 3, 3, 'Staying calm', 'Weaker foot'], ['Harper Quinn', 4, 5, 'Passing forward', 'Talking'], ['Grace Reid', 2, 4, 'Talking', 'Positioning', 'Hard on herself'],
  ['Leo Marsh', 3, 4, 'Winning it back', 'Scanning'], ['Ruby Lang', 4, 4, 'Staying calm', 'Positioning'], ['Sam Diaz', 4, 3, 'First touch', 'Scanning'],
]
export function CN2SelfVsCoach({ s, go, say, team = 'u12' }: CnProps) {
  // A player who has just answered appears here, and nowhere else. In the demo that is Cal, in the under-16s.
  const mine: typeof TAKES = team === 'u16' && s.selfReview ? [['Cal West', s.selfReview.effort, 3, s.selfReview.well, s.selfReview.work, s.selfReview.effort - 3 >= 2 ? 'Sees it differently' : s.selfReview.effort - 3 <= -2 ? 'Rated lower than you' : undefined]] : []
  const theirs = team === 'u12' ? TAKES : TAKES.map(r => [nm(team, r[0]), r[1], r[2], r[3], r[4], r[5]?.startsWith('Hard') ? 'Rated lower than you' : r[5]] as typeof r).filter(r => r[0] !== 'Cal West')
  const rows = [...mine, ...theirs], answered = rows.length, left = 16 - answered
  const low = `${nm(team, 'Noah')} and ${nm(team, 'Grace')}`, high = nm(team, 'Jai')
  const grid = 'minmax(0,1.2fr) 84px 84px minmax(0,1fr) minmax(0,1fr) 150px'
  // As drawn for the squad's answers so far; a player who answers just now is added to the count.
  const wants: [string, number][] = [['Scanning', 4], ['Positioning', 2]]
  const top = wants.map(([t, n]) => [t, n + (mine[0]?.[4] === t ? 1 : 0)] as [string, number])
  return (
    <Page id="CN2-SelfVsCoach" title="Their take, next to yours" sub={`${team === 'u16' ? 'Sat 30 May · v Tealside Town' : team === 'seniors' ? 'Sat 6 June · v Banksia Park SC' : 'Sat 6 June · v Harbour Rovers'} · ${answered} of 16 players answered`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => { addJob('remind-selfreview'); say(`A reminder goes to ${left} players tomorrow morning. Only one reminder is ever sent.`) }}>Remind the other {left}</Btn><Btn primary big onClick={() => go('YT4-VotesAwards')}>Your ratings</Btn></>}>
      <section aria-label="Effort" style={{ ...tile, gap: 0, padding: '12px 8px 8px' }}>
        <h2 style={{ ...h2, padding: '0 8px 6px' }}>Effort: what they said, what you said</h2>
        <div style={{ ...row(grid, 0), ...th, minHeight: 22 }}><span>Player</span><span>They said</span><span>You said</span><span>Went well</span><span>To work on</span><span /></div>
        {rows.map((r, i) => (
          <div key={r[0]} data-player={r[0]} style={row(grid, i + 1, { background: r[5] ? PALE : undefined, borderRadius: r[5] ? 8 : 0 })}>
            <strong>{r[0]}</strong><Dots n={r[1]} what={`${r[0]} said`} /><Dots n={r[2]} what="You said" /><span>{r[3]}</span><span>{r[4]}</span>
            {r[5] ? <Pill>{r[5]}</Pill> : <span style={{ fontSize: 13, color: MUT }}>Agree</span>}
          </div>
        ))}
      </section>
      <div style={col}>
        <section aria-label="Worth a word" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Worth a word this week</h2>
          <FixRow title={`${low} rated themselves 2. You gave 4`} sub="Tell them what you saw. It lands better than praise in general"><Btn primary aria-pressed={s.jobs.includes('word-noah')} onClick={() => { addJob('word-noah'); say(`Added to Tuesday’s session notes: a word with ${low}.`) }}>{s.jobs.includes('word-noah') ? 'Added' : 'Add to Tuesday'}</Btn></FixRow>
          <FixRow title={`${high} gave himself 5. You gave 3`} sub="Ask what he was pleased with before you say anything"><Btn aria-pressed={s.jobs.includes('word-jai')} onClick={() => { addJob('word-jai'); say(`Added to Tuesday’s session notes: a word with ${high}.`) }}>{s.jobs.includes('word-jai') ? 'Added' : 'Add to Tuesday'}</Btn></FixRow>
        </section>
        <section aria-label="What the team wants to work on" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>What the team wants to work on</h2>
          {top.map(([t, n], i) => <div key={t} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 46, borderTop: `1px solid ${LINE}` }}><Two a={t} b={i === 0 ? 'Matches your own notes' : ''} /><strong style={{ fontSize: 14 }}>{n} players</strong></div>)}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 46, borderTop: `1px solid ${LINE}` }}><strong style={{ fontSize: 14 }}>Weaker foot, talking, shooting</strong><strong style={{ fontSize: 14 }}>1 each</strong></div>
        </section>
        <Note title="Who sees this">Each player sees their own answers and your rating of them, if you share it. You see everyone’s. Nobody else does{team === 'seniors' ? '' : ', including parents'}.</Note>
      </div>
    </Page>
  )
}

// ── CN4 · what landed ────────────────────────────────────────────────────────
const SESSIONS: [string, string, number, number, number, number, string?][] = [
  ['Cut-backs and finishing', 'Tue 16 June', 12, 83, 75, 92, 'Landed best'], ['Rondo 5 v 2, then a game', 'Thu 11 June', 11, 73, 82, 64], ['Pressing in threes', 'Tue 9 June', 11, 36, 27, 55, 'Too hard for 6'],
  ['Small-sided games', 'Thu 4 June', 13, 85, 77, 54], ['Playing out from the back', 'Tue 2 June', 10, 50, 60, 80], ['Shooting circuit', 'Thu 28 May', 9, 78, 44, 33, 'Too easy for 5'],
]
const BarPct = ({ v }: { v: number }) => <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flexGrow: 1, height: 6, borderRadius: 999, background: '#e9eae8', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${v}%`, borderRadius: 999, background: G }} /></span><span style={{ width: 34, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{v}%</span></span>
export function CN4SessionsLanded({ s, go, say, team = 'u12' }: CnProps) {
  const grid = 'minmax(0,1.3fr) 60px minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) 110px'
  const a = team === 'u12' ? s.sessionAnswers : [], n = a.length, show = enough(n)   // tonight's answers come from U12 Sam's players
  const share = (f: (x: typeof a[number]) => boolean) => Math.round((a.filter(f).length / Math.max(1, n)) * 100)
  const added = s.jobs.includes('thursday-pressing')
  return (
    <Page id="CN4-SessionsLanded" title="What landed" sub={`${TEAMS[team]} · last six sessions · from the players’ three taps`} go={go} cols="minmax(0,1fr) 348px" right={<Btn primary big onClick={() => go('T3-TrainingTab')}>Plan Thursday</Btn>}>
      <section aria-label="Session by session" style={{ ...tile, gap: 0, padding: '12px 8px 8px' }}>
        <h2 style={{ ...h2, padding: '0 8px 6px' }}>Session by session</h2>
        <div style={{ ...row(grid, 0), ...th, minHeight: 22 }}><span>Session</span><span>Answers</span><span>Loved it</span><span>About right</span><span>Learned something</span><span /></div>
        {n > 0 && (
          <div data-session="tonight" style={row(grid, 1, { minHeight: 46, background: PALE, borderRadius: 8 })}>
            <Two a="Tonight’s session" b="Tue 23 June · answers still coming in" /><span>{n} of 16</span>
            {show ? <><BarPct v={share(x => x.fun === 'Loved it')} /><BarPct v={share(x => x.hard === 'About right')} /><BarPct v={share(x => x.learned === 'Yes')} /><span /></>
              : <><span style={{ gridColumn: 'span 3', fontSize: 13, color: MUT }}>Shown once {MIN_ANSWERS} players have answered</span><Mark kind="needs" label="Under 5" /></>}
          </div>
        )}
        {SESSIONS.map((r, i) => (
          <button key={r[0]} onClick={() => go('T1-TabletTraining')} style={{ ...row(grid, i + 1, { minHeight: 46, background: r[6]?.startsWith('Too hard') ? PALE : 'none', borderRadius: r[6]?.startsWith('Too hard') ? 8 : 0 }), width: '100%', border: 0, borderTop: `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
            <Two a={r[0]} b={r[1]} /><span>{r[2]} of 16</span><BarPct v={r[3]} /><BarPct v={r[4]} /><BarPct v={r[5]} />{r[6] ? <Pill solid={r[6] === 'Landed best'}>{r[6]}</Pill> : <span />}
          </button>
        ))}
      </section>
      <div style={col}>
        <section aria-label="What it says" style={{ ...tile, padding: '12px 16px 14px', gap: 6 }}><h2 style={h2}>What it says</h2><span style={{ fontSize: 14, lineHeight: '20px' }}>Sessions that end in a game are loved most. <strong>Pressing in threes was too hard</strong> for more than half the team. Try it again with more space and fewer rules.</span></section>
        <section aria-label="Try on Thursday" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Try on Thursday</h2>
          <FixRow title="Pressing in threes, made easier" sub="Bigger area, one rule, finish with a game"><Btn primary aria-pressed={added} onClick={() => { addJob('thursday-pressing'); say('Added to Thursday: pressing in threes, easier version.') }}>{added ? 'Added' : 'Add'}</Btn></FixRow>
        </section>
        <Note title="Added up, never one child">You see a session’s answers once five players have replied. You never see who said what.</Note>
        <Note title="What your director sees">The same three bars for each age group, not for each coach. You see your own first.</Note>
      </div>
    </Page>
  )
}

// ── CN8 · sessions that worked for other teams ───────────────────────────────
// A session is here only when it was run at least three times, the team's number moved outside its usual swing, and the coach agreed to share.
const WORKED = [
  { id: 'cutback', from: `${TEAMS.u13.toUpperCase()} · CHRIS P`, t: 'Cut-back finishing, 3 v 2', fig: '2 to 5', what: ' chances a game from wide, over four games', used: 'Used by 3 coaches · players loved it: 81%', strong: true },
  { id: 'switch', from: `${TEAMS.u15.toUpperCase()} · BEC W`, t: 'Switch and overlap', fig: '31% to 44%', what: ' of attacks reaching the final third', used: 'Used by 2 coaches · players loved it: 72%', strong: true },
  { id: 'winback', from: `${TEAMS.u11.toUpperCase()} · LUKE F`, t: 'Win it back in five seconds', fig: '11 to 8', what: ' seconds to win the ball back', used: 'Used by 4 coaches · players loved it: 77%', strong: true },
]
export function CN8WhatWorked({ s, go, say, team = 'u12' }: CnProps) {
  const c = ctxFor(team)
  return (
    <Page id="CN8-WhatWorked" title="Worked for other teams" sub="Sessions at Wattle Creek that moved a team’s numbers · matched to your style" go={go} cols="minmax(0,1fr) 348px" right={<Btn big onClick={() => say('Pick a session to offer to other coaches.')}>Share one of yours</Btn>}>
      <section aria-label="Sessions that fit" style={{ ...tile, padding: '12px 16px 14px', gap: 10 }}>
        <h2 style={h2}>Three that fit “play out wide, then cut back”</h2>
        {WORKED.map(w => { const used = s.jobs.includes(`use-${w.id}`); return (
          <div key={w.id} style={{ border: `1px solid ${LINE}`, borderRadius: 14, padding: '12px 14px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 12, alignItems: 'center' }}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={label}>{w.from}</span><strong style={{ fontSize: 17 }}>{w.t}</strong>
              {/* amber only when the measure behind the figure is Strong (counted from film) */}
              <span style={{ fontSize: 14 }}><strong style={{ fontSize: 20, padding: '0 6px', borderRadius: 6, background: w.strong ? '#f4c95d' : 'transparent' }}>{w.fig}</strong>{w.what}</span>
              <span style={{ fontSize: 13, color: MUT }}>{w.used}</span>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Btn primary aria-pressed={used} onClick={() => { addJob(`use-${w.id}`); say(`Added to Thursday’s plan, sized for ${c.size}.`) }}>{used ? 'In Thursday’s plan' : 'Use on Thursday'}</Btn><Btn onClick={() => go('T1-TabletTraining')}>See it</Btn></span>
          </div>) })}
      </section>
      <div style={col}>
        <section aria-label="Yours, used by others" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Yours, used by others</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 50, borderTop: `1px solid ${LINE}` }}><Two a="Rondo 5 v 2, then a game" b={`${TEAMS.u13}, ${TEAMS.u14}, ${TEAMS.u11}`} /><strong style={{ fontSize: 14 }}>3 coaches</strong></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 50, borderTop: `1px solid ${LINE}` }}><Two a="Cut-backs and finishing" b="Your players loved it: 83%" /><span style={{ fontSize: 13, color: MUT }}>Offered today</span></div>
        </section>
        <Note title="How a session gets here">A coach ran it at least three times, the team’s number moved outside its usual swing, and the coach agreed to share it.</Note>
        <Note title="Sized for your team">Pitch, numbers and time are changed to fit {c.age} before it lands in your plan.</Note>
        <Note title="Only inside your club">Sessions are shared between Wattle Creek coaches. Nothing goes to other clubs.</Note>
      </div>
    </Page>
  )
}

// ── CN9 · season reports ─────────────────────────────────────────────────────
const Five = ({ n, was }: { n: number; was: number }) => <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span role="img" aria-label={`${n} of 5, was ${was}`} style={{ display: 'inline-flex', gap: 3 }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ width: 16, height: 8, borderRadius: 3, background: i <= n ? G : '#e9eae8' }} />)}</span><span style={{ fontSize: 12, color: MUT }}>was {was}</span></span>
export function CN9SeasonReport({ s, go, say, team = 'u12' }: CnProps) {
  const c = ctxFor(team), others = nm(team, 'Noah, Zoe, Jai, Harper')
  const club = useClub()   // set: the report carries the club's band and crest
  const [clips, setClips] = useState([true, true, true])
  const sent = s.reportSent ? 5 : 4
  return (
    <Page id="CN9-SeasonReport" title="Season reports" sub={`${c.team} · mid-season · 11 of 16 drafted, ${sent} sent`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => go('CNp9-SeasonReportParent')}>Preview as a parent</Btn><Btn primary big aria-pressed={s.reportSent} onClick={() => { setCn({ reportSent: true }); say(`Sent to the ${c.fam} family. They can book a catch-up from it.`) }}>{s.reportSent ? `Sent to the ${c.fams}` : `Send ${c.first}’s`}</Btn></>}>
      <div style={col}>
        <section aria-label={`${c.first}’s report`} style={{ ...tile, padding: '12px 16px 14px', gap: 8, overflow: 'hidden' }}>
          {club && <div data-club-band="" style={{ margin: '-12px -16px 4px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}><Crest size={34} /><span><strong style={{ display: 'block', fontSize: 17 }}>Wattle Creek FC</strong><span style={{ fontSize: 13 }}>Season report 2026 · {c.team}</span></span></div>}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}><h2 style={h2}>{c.full} · drafted for you</h2><span style={{ ...cap, fontSize: 13 }}>From 14 notes, 8 ratings, 3 clips</span></div>
          <span style={label}>In one line</span><strong style={{ fontSize: 18, lineHeight: '24px' }}>{c.first} is braver on the ball than {c.she} was in March.</strong>
          <span style={label}>What has changed</span><span style={{ fontSize: 14, lineHeight: '20px' }}>{c.She} asks for it under pressure now, and uses {c.her} left foot without thinking about it. {c.She} is still quiet on the pitch.</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>{([['Asking for the ball', 4, 2], ['Left foot', 3, 2], ['Talking', 3, 3]] as [string, number, number][]).map(([t, n, was]) => <span key={t} style={{ borderRadius: 10, background: PALE, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontSize: 13 }}>{t}</strong><Five n={n} was={was} /></span>)}</div>
          <span style={label}>Next</span><span style={{ fontSize: 14 }}>Look over {c.her} shoulder before the ball comes.</span>
          {club && <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: MUT }}><span>Wattle Creek FC</span><span>Made with <strong style={{ color: '#2f6252' }}>Clean Sheet</strong></span></div>}
        </section>
        <section aria-label="Clips to include" style={{ ...tile, padding: '12px 16px 14px', gap: 8 }}>
          <h2 style={h2}>Clips to include</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>{['R3 · turns away from two', 'R6 · left-foot pass', 'R8 · cut-back goal'].map((c, i) => <button key={c} aria-pressed={clips[i]} onClick={() => { setClips(x => x.map((v, n) => n === i ? !v : v)); say('The clip plays.') }} style={{ minHeight: 48, borderRadius: 10, border: `1.5px solid ${clips[i] ? G : LINE}`, background: clips[i] ? G : '#fff', color: clips[i] ? '#fff' : INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{c}</button>)}</div>
        </section>
      </div>
      <div style={col}>
        <section aria-label="The squad" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>The squad</h2>
          {([['Sent', s.reportSent ? `${others}, ${c.first}` : others, sent], ['Drafted, waiting for you', 'About two minutes each to check', s.reportSent ? 6 : 7], ['Not enough to go on', 'Fewer than 3 games or no notes', 5]] as [string, string, number][]).map(([a, b, n]) => <div key={a} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 50, borderTop: `1px solid ${LINE}` }}><Two a={a} b={b} /><strong style={{ fontSize: 18 }}>{n}</strong></div>)}
        </section>
        <Note title="You are the author">The draft is built from your own notes, ratings and clips. Nothing is sent until you have read it and pressed send.</Note>
        <Note title="What parents never get">Your private notes, other children, or any number marked “Estimate” unless your club allows it.</Note>
      </div>
    </Page>
  )
}

// ── CN10 · catch-ups ─────────────────────────────────────────────────────────
export function CN10CatchUps({ s, go, say, team = 'u12' }: CnProps) {
  const c = ctxFor(team), famRow = (full: string) => { const [f, ...l] = nm(team, full).split(' '); return `${l.join(' ') || f} · ${f}` }, mineRow = `${c.fam} · ${c.first}`
  const grid = '70px minmax(0,1fr) minmax(0,1fr) 110px'
  // Mia's family books from the report (CNp10); their slot and topic show here.
  const mia = s.catchUp ?? 'Tuesday 4:50', miaT = mia.split(' ')[1], miaTue = mia.startsWith('Tue')
  const tue: [string, string, string][] = [['4:30', famRow('Noah Okafor'), 'Position'], ['4:40', '', ''], ['4:50', '', ''], ['5:00', famRow('Zoe Hart'), 'Next season'], ['5:10', '', ''], ['5:20', '', '']]
  const thu: [string, string, string][] = [['7:00', '', ''], ['7:10', famRow('Jai Patel'), 'Game time'], ['7:20', '', '']]
  const fill = (list: [string, string, string][], on: boolean) => list.map(r => on && r[0] === miaT ? [r[0], mineRow, team === 'u12' ? s.catchTopic : 'Next season'] as [string, string, string] : r)
  const table = (t: string, list: [string, string, string][]) => (
    <section aria-label={t} style={{ ...tile, gap: 0, padding: '12px 8px 6px' }}>
      <h2 style={{ ...h2, padding: '0 8px 6px' }}>{t}</h2>
      <div style={{ ...row(grid, 0), ...th, minHeight: 22 }}><span>Time</span><span>Family</span><span>They want to cover</span><span /></div>
      {list.map((r, i) => <div key={r[0]} style={row(grid, i + 1, { background: r[1] === mineRow ? PALE : undefined, borderRadius: 8 })}><strong>{r[0]}</strong>{r[1] ? <strong>{r[1]}</strong> : <span style={{ color: MUT }}>Free</span>}<span>{r[2]}</span>{r[1] === mineRow ? <Pill solid>Next</Pill> : <span />}</div>)}
    </section>
  )
  return (
    <Page id="CN10-CatchUps" title="Catch-ups" sub={`${c.team} · mid-season · 9 of 16 families booked`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => say('Pick the times you are free.')}>Change my times</Btn><Btn primary big onClick={() => { addJob('nudge-catchups'); say('One reminder goes to 7 families. No more after that.') }}>Nudge the other 7</Btn></>}>
      <div style={col}>{table('Tuesday 23 June · clubrooms, before training', fill(tue, miaTue))}{table('Thursday 25 June · on a call', fill(thu, !miaTue))}</div>
      <div style={col}>
        <section aria-label="Next catch-up" style={{ ...tile, gap: 0, padding: '12px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Next: {c.full}, {miaT}</h2>
          {([[`${c.Her} report`, `Braver on the ball. Next: looking over ${c.her} shoulder`], [`What ${c.parent} wants to cover`, team === 'u12' ? s.catchTopic : 'Next season'], [`${c.first}’s own view`, `Rated ${c.her} effort 4. Wants to work on scanning`]] as [string, string][]).map(([a, b]) => <div key={a} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: `1px solid ${LINE}` }}><span style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={IC.tick} size={12} sw={3} /></span><Two a={a} b={b} /></div>)}
          <div style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: `1px solid ${LINE}` }}><span style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, border: `2px solid ${INK}`, boxSizing: 'border-box' }} /><Two a="One thing to raise" b={`${c.She} is quiet on the pitch. Not written yet`} /></div>
        </section>
        <Note title="Ten minutes, one page">Each catch-up opens on the {team === 'u12' ? 'child' : 'player'}’s report, so you start from the same page as the parent.</Note>
        <Note title="After">One line of what you agreed is saved to the player’s page and passed on at handover.</Note>
      </div>
    </Page>
  )
}

// ── CN13 · handover to the next coach. The family sees it first, word for word. ──
export function CN13Handover({ s, go, say, team = 'u12' }: CnProps) {
  const c = ctxFor(team)
  const [family, setFamily] = useState(false)
  const boxes: [string, string][] = [['As a player', 'Brave on the ball, reads the game early. Quiet. Plays best on the left of midfield.'], [`What works with ${c.herO}`, `Tell ${c.herO} one thing, not three. ${c.She} tries anything if you ask ${c.herO} quietly, not in front of the group.`], ['Goals this year', `Ask for the ball under pressure: met. Use ${c.her} left foot: nearly. Look over ${c.her} shoulder: just started.`], ['To watch', 'Grew 6 cm since February. Knees sore after two games in a weekend.']]
  const passed = s.handover === 'passed', withFamily = s.handover === 'family'
  const pass = () => {
    if (s.handover === 'none') { setCn({ handover: 'family' }); setFamily(true); say('The family sees this page, word for word, before it is passed on.') }
    else if (withFamily) { setCn({ handover: 'passed' }); setFamily(false); openThing(`Passed to ${c.nextCoach}. It appears on ${team === 'u12' ? 'her' : 'his'} squad page when the new season`, 'coach') }
  }
  return (
    <Page id="CN13-Handover" title="Handover" sub={`End of season · 12 of 16 written · ${c.full} moves up to ${c.next}`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big aria-pressed={family} onClick={() => { setFamily(f => !f); say('The family sees this page, word for word, before it is passed on.') }}>What the family sees</Btn><Btn primary big disabled={passed} onClick={pass}>{passed ? `Passed to ${c.nextCoach}` : withFamily ? `Family has seen it: pass to ${c.nextCoach}` : `Pass on ${c.first}’s`}</Btn></>}>
      <div style={col}>
        {(family || withFamily) && <div role="note" style={{ borderRadius: 12, background: PALE, padding: '10px 14px', fontSize: 14, lineHeight: '20px' }}><strong>{withFamily ? `With the ${c.fam} family now.` : 'This is the family’s view.'}</strong> They read every word below before {c.first}’s next coach does, and can ask for a line to be kept back.</div>}
        <section aria-label={`${c.first}’s page`} style={{ ...tile, padding: '12px 16px 14px', gap: 10 }}>
          <h2 style={h2}>{c.full} · one page for {c.her} next coach</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{boxes.map(([a, b]) => <span key={a} style={{ borderRadius: 10, background: PALE, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}><span style={label}>{a}</span><span style={{ fontSize: 14, lineHeight: '20px' }}>{b}</span></span>)}</div>
        </section>
        <section aria-label="This season in numbers" style={{ ...tile, padding: '12px 16px 14px', gap: 8 }}>
          <h2 style={h2}>This season in numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10 }}>{([['Games and minutes', '15 of 16 games, a fair share in each'], ['Positions', 'Left midfield 9, centre 4, back 2'], ['Sessions', '27 of 30'], [`${c.Her} own view`, 'Wants to work on scanning']] as [string, string][]).map(([a, b]) => <span key={a} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><span style={label}>{a}</span><span style={{ fontSize: 14, lineHeight: '19px' }}>{b}</span></span>)}</div>
        </section>
      </div>
      <div style={col}>
        <section aria-label="The squad" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>The squad</h2>
          {([['Written and passed on', 'To three coaches', passed ? 9 : 8], ['Written, waiting for you', passed ? nm(team, 'Leo, Ruby, Sam D') : `${c.first}, ${nm(team, 'Leo, Ruby, Sam D')}`, passed ? 3 : 4], ['Leaving the club', 'Offered their passport instead', 2], ['Still to write', 'Drafted from your notes when you are ready', 2]] as [string, string, number][]).map(([a, b, n]) => <div key={a} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 50, borderTop: `1px solid ${LINE}` }}><Two a={a} b={b} /><strong style={{ fontSize: 18 }}>{n}</strong></div>)}
        </section>
        <Note title="What is not passed on">Your private notes, parents’ ratings and anything the family has asked to keep back.</Note>
        <Note title="Why it matters">A new coach starts by learning what you already know. This hands it over in two minutes a player.</Note>
      </div>
    </Page>
  )
}

// ── CN15 · positions played (MiniRoos) ───────────────────────────────────────
const POS: [string, number[], number, string?][] = [
  ['Ari Bell', [0, 9, 4, 0], 13, 'Never up front'], ['Leo Tran', [2, 3, 5, 4], 14], ['Poppy Chen', [1, 2, 4, 6], 13], ['Hamza Ali', [5, 4, 2, 1], 12, 'In goal 5 times'], ['Tilly Moss', [1, 4, 4, 4], 13],
  ['Remy Costa', [0, 1, 3, 9], 13, 'Never in goal'], ['Jun Park', [2, 4, 5, 2], 13], ['Edie Flynn', [1, 5, 4, 3], 13], ['Sol Reyes', [2, 4, 3, 4], 13],
]
export function CN15PositionHistory({ s, go, say }: CnProps) {
  const grid = 'minmax(0,1.2fr) repeat(4,84px) 96px minmax(0,1fr)'
  const ari = s.jobs.includes('ari-front'), remy = s.jobs.includes('remy-goal')
  const every = POS.filter(p => p[1].every(n => n > 0)).length
  return (
    <Page id="CN15-PositionHistory" title="Positions" sub={`${TEAMS.u9} · 8 games · halves played in each position`} go={go} cols="minmax(0,1fr) 348px" right={<><Btn big onClick={() => go('HM4-GameDayMiniRoos')}>Game time</Btn><Btn primary big onClick={() => go('FB1m-FormationMiniRoos')}>Plan Saturday’s turns</Btn></>}>
      <section aria-label="Who has played where" style={{ ...tile, gap: 0, padding: '12px 8px 10px' }}>
        <h2 style={{ ...h2, padding: '0 8px 6px' }}>Who has played where</h2>
        <div style={{ ...row(grid, 0), ...th, minHeight: 22 }}><span>Player</span><span>In goal</span><span>At the back</span><span>In the middle</span><span>Up front</span><span>Halves</span><span /></div>
        {POS.map((p, i) => (
          <div key={p[0]} style={row(grid, i + 1, { minHeight: 44 })}>
            <strong>{p[0]}</strong>
            {p[1].map((n, k) => n ? <span key={k} style={{ height: 30, borderRadius: 8, background: `rgba(47,98,82,${(0.14 + (n / 9) * 0.86).toFixed(2)})`, color: n >= 5 ? '#fff' : INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{n}</span> : <span key={k} style={{ height: 30, borderRadius: 8, border: `1.5px dashed ${MUT}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: MUT }}>None</span>)}
            <span>{p[2]} of 16</span>{p[3] ? <Pill>{p[3]}</Pill> : <span />}
          </div>
        ))}
        <span style={{ ...cap, fontSize: 13, padding: '8px 8px 0' }}>Taken from your line-ups. Darker means more halves there.</span>
      </section>
      <div style={col}>
        <section aria-label="For Saturday" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>For Saturday</h2>
          <FixRow title="Give Ari a half up front" sub="Nine halves at the back, none up front"><Btn primary aria-pressed={ari} onClick={() => { addJob('ari-front'); say('Ari is up front for the first half on Saturday.') }}>{ari ? 'Added' : 'Add'}</Btn></FixRow>
          <FixRow title="Rest Hamza from goal" sub="Five halves in goal. Remy has had none"><Btn aria-pressed={remy} onClick={() => { addJob('remy-goal'); say('Remy starts in goal on Saturday. Hamza plays in the middle.') }}>{remy ? 'Swapped' : 'Swap'}</Btn></FixRow>
        </section>
        <section aria-label="Your club’s aim" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Your club’s aim</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 50, borderTop: `1px solid ${LINE}` }}><Two a="Every child in every position" b="By round 10. Set by Rachel M" /><strong style={{ fontSize: 14, whiteSpace: 'nowrap' }}>{every} of {POS.length} so far</strong></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 50, borderTop: `1px solid ${LINE}` }}><Two a="Game time" b="Every child between 12 and 14 halves" /><strong style={{ fontSize: 14 }}>Even</strong></div>
        </section>
        <Note title="Why at this age">Nobody knows at eight where a child will play at fourteen. Trying every position is how they find out.</Note>
      </div>
    </Page>
  )
}

// ── CN17 · set pieces. Counts are Strong; what the chances were worth is an Estimate. ──
const FOR: [string, string, number, number, number, number][] = [['Corner: short, then cross', 'Harper and Mia', 14, 6, 2, 0.5], ['Corner: straight to the far post', '', 17, 3, 0, 0.2], ['Free kick: wide, crossed in', '', 9, 2, 0, 0.2]]
const AGAINST: [string, string, number, number, number, number][] = [['Corners to the near post', 'Nobody on the post', 12, 8, 3, 1.3], ['Corners to the far post', '', 10, 3, 0, 0.3]]
export function CN17SetPieces({ s, go, say, team = 'u12' }: CnProps) {
  const grid = 'minmax(0,1.3fr) 70px 70px 70px 110px 30px'
  const sum = (l: typeof FOR, i: 2 | 3 | 4 | 5) => Math.round(l.reduce((a, r) => a + r[i], 0) * 10) / 10
  const cornersFor = FOR.filter(r => r[0].startsWith('Corner')), cf = sum(cornersFor, 2), ca = sum(AGAINST, 2)
  const added = s.jobs.includes('thursday-corners')
  const tileS = (head: string, v: string, mark: ReactNode, sub: string) => <div style={{ ...tile, padding: '10px 14px', gap: 2 }}><span style={label}>{head}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong style={{ fontSize: 27, lineHeight: '34px', letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{v}</strong>{mark}</span><span style={{ fontSize: 13, color: MUT }}>{sub}</span></div>
  const table = (t: string, list: typeof FOR, last: string) => (
    <section aria-label={t} style={{ ...tile, gap: 0, padding: '12px 8px 6px' }}>
      <h2 style={{ ...h2, padding: '0 8px 6px' }}>{t}</h2>
      <div style={{ ...row(grid, 0), ...th, minHeight: 22 }}><span>{t.startsWith('What you') ? 'Routine' : 'From'}</span><span>Times</span><span>Shots</span><span>Goals</span><span>{last}</span><span /></div>
      {list.map((r, i) => <button key={r[0]} onClick={() => playClips(Array.from({ length: Math.min(r[2], 5) }, (_, k) => ({ title: `${r[0]} · ${k + 1} of ${r[2]}`, sub: k < r[4] ? 'Ended in a goal.' : k < r[3] ? 'Ended in a shot.' : 'No shot.', len: 9 })), r[0])} style={{ ...row(grid, i + 1, { minHeight: 46 }), width: '100%', background: 'none', border: 0, borderTop: `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><Two a={r[0]} b={nm(team, r[1])} /><span>{r[2]}</span><span>{r[3]}</span><strong>{r[4]}</strong><span>{r[5].toFixed(1)}</span><Ico d={IC.chev} size={16} sw={2.4} /></button>)}
    </section>
  )
  return (
    <Page id="CN17-SetPieces" title="Set pieces" sub={`${TEAMS[team]} · 8 games · corners and free kicks, for and against`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => go('QC10-HowWeMeasure')}>How we measure</Btn><Btn primary big aria-pressed={added} onClick={() => { addJob('thursday-corners'); say('Added to Thursday: 15 minutes defending corners.') }}>{added ? 'In Thursday’s plan' : 'Practise on Thursday'}</Btn></>}>
      <div style={col}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10 }}>
          {tileS('Corners for', String(cf), <Mark kind="strong" />, `${sum(cornersFor, 3)} shots, ${sum(cornersFor, 4)} goals`)}
          {tileS('Corners against', String(ca), <Mark kind="strong" />, `${sum(AGAINST, 3)} shots, ${sum(AGAINST, 4)} goals`)}
          {tileS('Chances made · xG', sum(FOR, 5).toFixed(1), <Mark kind="estimate" />, 'From all set pieces')}
          {tileS('Given up · xGA', (sum(AGAINST, 5) + 0.2).toFixed(1), <Mark kind="estimate" />, 'Twice what you make')}
        </div>
        {table('What you do, and how it goes', FOR, 'Chances made')}{table('What they do to you', AGAINST, 'Chances given up')}
      </div>
      <div style={col}>
        <section aria-label="What it says" style={{ ...tile, padding: '12px 16px 14px', gap: 6 }}><h2 style={h2}>What it says</h2><span style={{ fontSize: 14, lineHeight: '20px' }}>Your short corner works: two goals from 14. <strong>Near-post corners against you are the problem</strong>: three goals, and nobody is standing on the post.</span></section>
        <Note title="Counts and chances">How many corners, shots and goals is counted from film and marked Strong. What the chances were worth is an Estimate.</Note>
        <Note title="Small numbers">Eight games is a short run for set pieces. Treat it as where to look, and watch the clips.</Note>
      </div>
    </Page>
  )
}

export { useCn }
