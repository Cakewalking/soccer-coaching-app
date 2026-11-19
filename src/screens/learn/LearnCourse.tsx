// Learn to coach: a first-season course built from the coach's own answers and their own team.
// LN2 the four starting questions · LN1 the course · LN3 a module · LN4 and LNL11 to LNL64 a lesson ·
// LN5 how it went · LN6 the game itself, LN6w all the words, LN6s shapes · LN7 your season · LN8 why we teach this.
// One template per kind of page; the words come from lessons.json, words.json and sources.json unchanged.

import { useEffect, useState, type ReactNode } from 'react'
import { Btn, Note, Ico, tile, h2, cap, label, G, INK, MUT, LINE, PALE, DARK } from '../capture/marks'
import { Page, col } from '../capture/CaptureScreens'
import { playClips } from '../clips/clipSheet'
import { useBackState } from '../../backState'
import { sessionFor, type SessionState } from '../session/sessionStore'
import type { TeamKey } from '../session/sessionEngine'
import { ALL, CONFIDENCE, COURSE_NAME, GLOSSARY, MODULES, MODULE_SCREEN, OWN_TEAM, RESEARCH, WORRIES, addsGame, ctxFor, effectOf, isDay, lesson, moduleOf, moduleOrder, nextLesson, paceLine, setCoach, takeWanted, tryHeading, useCoach, useWanted, type Coach, type Ctx, type Lesson, type Module } from './course'

type Props = { s: SessionState; k: TeamKey; go: (id: string) => void; say: (m: string) => void; start?: string; isNew?: boolean }
const HAIR = '#e9eae8'
/** A small numbered mark beside a claim. It opens Why we teach this. */
const Src = ({ n, onOpen }: { n: number; onOpen: () => void }) => <span style={{ position: 'relative', display: 'inline-block', margin: '0 3px', whiteSpace: 'nowrap' }}><span aria-hidden="true" style={{ display: 'inline-block', minWidth: 20, padding: '0 6px', boxSizing: 'border-box', borderRadius: 999, background: PALE, color: INK, fontSize: 11, lineHeight: '18px', fontWeight: 700, textAlign: 'center' }}>{n}</span><button onClick={onOpen} aria-label={`Source ${n}`} style={{ position: 'absolute', left: '50%', top: '50%', width: 44, height: 44, transform: 'translate(-50%,-50%)', padding: 0, border: 0, borderRadius: 8, background: 'none', cursor: 'pointer' }} /></span>
const COLS = 'minmax(0,1fr) 348px'
const lower = (t: string) => t.charAt(0).toLowerCase() + t.slice(1)
const NUM = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six']
const chip = (on: boolean): React.CSSProperties => ({ minHeight: 44, padding: '0 16px', borderRadius: 999, border: on ? 0 : `1px solid ${LINE}`, background: on ? G : '#fff', color: on ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' })
const rowBtn: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 14, width: '100%', minHeight: 58, padding: '6px 0', border: 0, borderTop: `1px solid ${LINE}`, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }
const Round = ({ done, n, here }: { done: boolean; n: number; here?: boolean }) => <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, boxSizing: 'border-box', background: done ? G : '#fff', border: done ? 0 : `${here ? 2 : 1}px solid ${here ? INK : LINE}`, color: done ? '#fff' : INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{done ? <Ico d="M5 12l5 5 9-10" size={15} sw={3} /> : n}</span>
const Chev = () => <span style={{ flex: 'none', color: INK }}><Ico d="M9 6l6 6-6 6" size={14} sw={2.4} /></span>
const Hero = ({ over, head, sub, stats }: { over: string; head: string; sub: string; stats?: [string, string, string?][] }) => (
  <section style={{ borderRadius: 18, background: DARK, color: '#fff', padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 22 }}>
    <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>{over}</span>
      <strong style={{ fontSize: 22, lineHeight: '28px', letterSpacing: '-0.01em' }}>{head}</strong>
      <span style={{ fontSize: 13, lineHeight: '19px', color: '#cfe6dc' }}>{sub}</span>
    </span>
    {stats?.map(([n, a, b]) => <span key={a} style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 22, borderLeft: '1px solid rgba(255,255,255,0.22)' }}><strong style={{ fontSize: 34, lineHeight: '38px', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{n}</strong><strong style={{ fontSize: 13, lineHeight: '17px', whiteSpace: 'nowrap' }}>{a}</strong><span style={{ fontSize: 12, lineHeight: '16px', minHeight: 16, color: '#cfe6dc', whiteSpace: 'nowrap' }}>{b}</span></span>)}
  </section>
)
const Pair = ({ a, b, v }: { a: string; b?: string; v: ReactNode }) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 46, padding: '6px 0', borderTop: `1px solid ${LINE}` }}><span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>{a}</strong>{b && <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{b}</span>}</span><strong style={{ flex: 'none', fontSize: 14, textAlign: 'right' }}>{v}</strong></div>

/** The confidence rows: round 1 in grey, now in green. The coach's own ratings, never amber, never compared. */
function Confidence({ c }: { c: Coach }) {
  const bar = (n: number, colour: string) => <span style={{ display: 'flex', gap: 3 }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ width: 17, height: 7, borderRadius: 2, background: i <= n ? colour : HAIR }} />)}</span>
  return <>{CONFIDENCE.map((name, i) => { const r = c.ratings[i]; return (
    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 30, padding: '4px 0', borderTop: `1px solid ${HAIR}` }}>
      <strong style={{ flexGrow: 1, fontSize: 13 }}>{name}</strong>
      {r ? <><span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>{bar(r[0], '#9aa5a1')}{bar(r[1], G)}</span><span style={{ flex: 'none', width: 62, fontSize: 13, color: MUT, textAlign: 'right' }}>{r[0]} then {r[1]}</span></> : <span style={{ fontSize: 13, color: MUT }}>Not rated yet</span>}
    </div>) })}</>
}

export default function LearnCourse({ s, k, go, say, start, isNew = false }: Props) {
  const x = ctxFor(k, isNew), c = useCoach(x.who)
  const first = (id?: string): string => !id || id === 'GS8-WelcomeCourse' || id === 'LN1-LearnHome' ? (c.built ? 'home' : 'start') : id === 'LN2-StartingPoint' ? 'start' : id === 'LN5-HowItWent' ? 'went:4.2' : id === 'LN6-TheGameItself' ? 'game' : id === 'LN6w-AllWords' ? 'words' : id === 'LN6s-Shapes' ? 'shapes' : id === 'LN7-YourProgress' ? 'season' : id === 'LN8-WhyWeTeachThis' ? 'why' : MODULE_SCREEN.includes(id) ? `m:${MODULE_SCREEN.indexOf(id) + 1}` : lesson(id) ? `l:${lesson(id)!.id}` : 'home'
  const [view, setView] = useBackState(() => first(start))
  const wanted = useWanted()
  useEffect(() => { if (wanted) { const w = takeWanted(); if (w) setView(first(w)) } })   // a link from elsewhere in the app
  const open = (v: string) => { setView(v); window.scrollTo?.(0, 0) }
  const source = () => open('why')
  const tuesday = sessionFor(s, k), u11 = sessionFor(s, 'u11')
  /** "5:10 · Keep-ball 4 v 2" names a part of the under-11s' session: show the same part of this coach's own. */
  const at = (l: Lesson) => { const m = l.try_at.match(/^(\d+:\d\d) · /); const i = m ? u11.parts.findIndex(p => p.at === m[1]) : -1; const p = i >= 0 ? tuesday.parts[i] : undefined; if (m && isNew) return ''; return p && k !== 'u11' ? `${p.at} · ${p.drill.name}` : l.try_at }   // a club with no session yet: no part to name
  const now = nextLesson(c), order = moduleOrder(c)
  const doneCount = ALL.filter(l => c.done[l.id]).length, tried = Object.values(c.done).filter(d => d.tried === 'Yes').length

  // ── LN2 · where you are starting ───────────────────────────────────────────
  if (view === 'start') {
    const pick = (patch: Partial<Coach>, name: string, on: boolean) => { setCoach(x.who, patch); say(`${name}: ${on ? 'picked' : 'taken off'}.`) }
    const worry = (w: string) => { const has = c.worries.includes(w); if (!has && c.worries.length >= 3) { say('Three is the most. Take one off first.'); return } pick({ worries: has ? c.worries.filter(v => v !== w) : [...c.worries, w] }, w, !has) }
    const Q = ({ n, q, children }: { n: number; q: string; children: ReactNode }) => <div style={{ display: 'flex', gap: 12, borderTop: `1px solid ${LINE}`, padding: '10px 0 12px' }}><span style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{n}</span><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><strong style={{ fontSize: 15 }}>{q}</strong><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{children}</div></div></div>
    const because: [string, string][] = [
      ...(c.played === 'Never' ? [['BECAUSE YOU NEVER PLAYED', '“The game itself” is added: rules, positions and the words players use.']] : c.worries.includes('Knowing the rules') ? [['BECAUSE THE RULES WORRY YOU', '“The game itself” is added: rules, positions and the words players use.']] : []) as [string, string][],
      ...WORRIES.filter(([w, m]) => c.worries.includes(w) && typeof m === 'number').map(([w, m]) => m === 1 ? ['BECAUSE PLANNING WORRIES YOU', `Module 1 walks through your real Tuesday session, not a sample one.`] : [`BECAUSE ${w.toUpperCase()} WORRIES YOU`, `“${MODULES[(m as number) - 1].title}” moves earlier in your course.`]) as [string, string][],
      [`BECAUSE YOU HAVE ${c.minutes.toUpperCase()}`, paceLine(c.minutes)],
      [`BECAUSE YOU COACH ${x.ages}`, `Examples are ${x.side} and use the national curriculum for this age.`],
    ]
    return (
      <Page id="LN2-StartingPoint" title="Learn to coach" sub={`${x.coach} · four questions, about a minute · only you see the answers`} go={go} cols={COLS}
        right={<><Btn big onClick={() => { setCoach(x.who, { built: true, worries: [], played: 'As a kid', minutes: '10 minutes' }); open('home') }}>Skip, give me the standard course</Btn><Btn primary big onClick={() => { setCoach(x.who, { built: true }); open('home') }}>Build my course</Btn></>}>
        <div style={col}>
          <Hero over="WELCOME, COACH" head="You don’t need to have played. Tell us where you are starting." sub="We build the course around your answers and your team, and change it as the season goes." />
          <section aria-label="Where you are starting" style={{ ...tile, gap: 0, padding: '12px 18px 4px' }}>
            <h2 style={{ ...h2, paddingBottom: 8 }}>Where you are starting</h2>
            <Q n={1} q="Did you play soccer yourself?">{['Never', 'As a kid', 'For years'].map(o => <button key={o} role="radio" aria-checked={c.played === o} onClick={() => pick({ played: o }, o, c.played !== o)} style={chip(c.played === o)}>{o}</button>)}</Q>
            <Q n={2} q="How long have you coached?">{['This is my first season', 'A season or two', 'Three or more'].map(o => <button key={o} role="radio" aria-checked={c.seasons === o} onClick={() => pick({ seasons: o }, o, c.seasons !== o)} style={chip(c.seasons === o)}>{o}</button>)}</Q>
            <Q n={3} q="What worries you most? Pick up to three">{WORRIES.map(([w]) => <button key={w} role="checkbox" aria-checked={c.worries.includes(w)} onClick={() => worry(w)} style={chip(c.worries.includes(w))}>{w}</button>)}</Q>
            <Q n={4} q="How much time do you have each week?">{['5 minutes', '10 minutes', '20 minutes'].map(o => <button key={o} role="radio" aria-checked={c.minutes === o} onClick={() => pick({ minutes: o }, o, c.minutes !== o)} style={chip(c.minutes === o)}>{o}</button>)}</Q>
          </section>
        </div>
        <div style={col}>
          <section aria-label="Your course so far" style={{ ...tile, gap: 0, padding: '14px 16px 6px' }}>
            <h2 style={{ ...h2, paddingBottom: 8 }}>Your course so far</h2>
            {because.map(([a, b]) => <div key={a} style={{ borderTop: `1px solid ${HAIR}`, padding: '9px 0 10px' }}><span style={{ ...label, display: 'block' }}>{a}</span><span style={{ fontSize: 14, lineHeight: '20px' }}>{b}</span></div>)}
          </section>
          <Note title="Why we ask">Coaches who have not played tend to feel least sure about tactics and technique. Starting there helps. <Src n={1} onOpen={source} /></Note>
          <Note title="Private">Your answers and your progress are yours. Your director sees only how many coaches have started.</Note>
        </div>
      </Page>)
  }

  // ── LN8 · why we teach this ────────────────────────────────────────────────
  if (view === 'why') {
    const card = (r: typeof RESEARCH.sources[number]) => <section key={r.n} id={`source-${r.n}`} style={{ ...tile, padding: '12px 16px', gap: 6 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}><span style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{r.n}</span><span><span style={label}>What the course does</span><strong style={{ display: 'block', fontSize: 15, lineHeight: '21px' }}>{r.does}</strong></span></div>
      <span style={{ fontSize: 14, lineHeight: '20px' }}>{r.found}</span>
      <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}><strong style={{ color: INK }}>Limit: </strong>{r.limit}</span>
      <span style={{ fontSize: 12, lineHeight: '17px', color: MUT }}>{r.ref}</span>
    </section>
    return (
      <Page id="LN8-WhyWeTeachThis" title="Why we teach this" sub="The research behind Learn to coach, and where it stops" go={go} cols={COLS} right={<Btn big onClick={() => open('home')}>Back to the course</Btn>}>
        <div style={col}>
          <h2 style={h2}>What we lean on</h2>{RESEARCH.sources.filter(r => !r.safety).map(card)}
          <h2 style={{ ...h2, marginTop: 6 }}>Safety guidance we follow</h2>{RESEARCH.sources.filter(r => r.safety).map(card)}
        </div>
        <div style={col}>{RESEARCH.tail.map(([a, b]) => <Note key={a} title={a}>{b}</Note>)}</div>
      </Page>)
  }

  // ── LN6w · all the words ───────────────────────────────────────────────────
  if (view === 'words') return (
    <Page id="LN6w-AllWords" title="Words you will hear" sub={`All ${GLOSSARY.length}, in plain language · tap any word for a 10-second clip`} go={go} cols="minmax(0,1fr)"
      right={<><Btn big onClick={() => open('game')}>Back</Btn><Btn primary big onClick={() => say('Ask opens. Try: “What is a half-space?”')}>Ask about a word</Btn></>}>
      <section aria-label="All the words" style={{ ...tile, display: 'block', columnCount: 3, columnGap: 24, padding: '8px 18px' }}>
        {GLOSSARY.map(w => <button key={w.word} onClick={() => playClips([{ title: w.word, sub: w.meaning + '.', len: 10 }], 'Words you will hear')} style={{ ...rowBtn, minHeight: 44, borderTop: 0, borderBottom: `1px solid ${HAIR}`, breakInside: 'avoid', alignItems: 'baseline', gap: 10, padding: '6px 0' }}><strong style={{ flex: 'none', width: 104, fontSize: 14 }}>{w.word}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{w.meaning}</span></button>)}
      </section>
    </Page>)

  // ── LN6s · shapes for 9 a side ─────────────────────────────────────────────
  if (view === 'shapes') {
    const SHAPES: [string, string, string][] = [['3-3-2', 'you are starting out. Every player has someone near them.', 'the two strikers standing still and waiting.'], ['3-2-3', 'you want width up front and players who like to run at defenders.', 'the two in midfield getting outnumbered.'], ['2-3-3', 'your team keeps the ball well and you want more players forward.', 'the two at the back being left alone when you lose it.']]
    const picked = c.reminders['shape'] ?? '3-3-2'
    const spots = (shape: string) => { const rows = shape.split('-').map(Number); let n = 1; const out: [number, number, number][] = [[1, 50, 90]]; rows.forEach((count, r) => { for (let i = 0; i < count; i++) out.push([++n, (100 / (count + 1)) * (i + 1), 72 - r * (56 / (rows.length - 1 || 1))]) }); return out }
    return (
      <Page id="LN6s-Shapes" title="Shapes for 9 a side" sub="Three common ways to line up · the numbers count from the back, after the keeper" go={go} cols="minmax(0,1fr)" right={<Btn big onClick={() => open('game')}>Back</Btn>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
          {SHAPES.map(([name, good, watch]) => <section key={name} aria-label={name} style={{ ...tile, gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><h2 style={{ ...h2, fontSize: 20 }}>{name}</h2>{picked === name && <span style={{ fontSize: 12, fontWeight: 700, color: G, background: PALE, borderRadius: 999, padding: '3px 10px' }}>Your team now</span>}</div>
            <svg viewBox="0 0 100 100" role="img" aria-label={`${name} on a pitch`} style={{ width: '100%', borderRadius: 12, background: '#40826d' }}>
              <rect x="4" y="4" width="92" height="92" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="0.8" /><rect x="30" y="84" width="40" height="12" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="0.8" />
              {spots(name).map(([n, px, py]) => <g key={n}><circle data-club-home="" cx={px} cy={py} r="6" fill="#fff" stroke={INK} strokeWidth="0.8" /><text data-club-on="" x={px} y={py + 2.4} textAnchor="middle" fontSize="6.5" fontWeight="700" fill={INK}>{n}</text></g>)}
            </svg>
            <span style={{ fontSize: 14, lineHeight: '20px' }}><strong>Good when: </strong>{good}</span>
            <span style={{ fontSize: 14, lineHeight: '20px' }}><strong>Watch for: </strong>{watch}</span>
            <Btn big primary={picked !== name} aria-pressed={picked === name} onClick={() => { setCoach(x.who, v => ({ reminders: { ...v.reminders, shape: name } })); say(`${name} set for Saturday. Your turns plan is redrawn to fit.`) }}>Use this on Saturday</Btn>
          </section>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <Note title="The shape matters less than you think">At this age, who plays where should change every week. A shape is a starting place, not a job for life.</Note>
          <Note title="Where this comes from">These are common coaching practice, not research findings. Your federation’s courses cover them in more depth.</Note>
        </div>
      </Page>)
  }

  // ── LN6 · the game itself ──────────────────────────────────────────────────
  if (view === 'game') {
    const RULES: [string, string][] = [['Players', '9 a side, with a keeper'], ['Time', 'Two halves of 25 minutes'], ['Ball', 'Size 4'], ['Offside', 'Not used at this age'], ['Scores', 'No ladder kept']]
    const SPOTS: [number, string, number, number][] = [[1, 'Keeper', 9, 44], [2, 'Right back', 28, 14], [3, 'Centre back', 26, 44], [4, 'Left back', 28, 70], [7, 'Right mid', 59, 14], [6, 'Centre mid', 60, 44], [8, 'Left mid', 59, 70], [9, 'Striker', 76, 28], [10, 'Striker', 76, 58]]
    const HEAR = ['Playing out', 'Showing', 'Pressing', 'Switch', 'Overlap', '1 v 1', 'Rondo']
    return (
      <Page id="LN6-TheGameItself" title="The game itself" sub={`${x.age.charAt(0).toUpperCase() + x.age.slice(1)} · for coaches who didn’t grow up with it`} go={go} cols={COLS}
        right={<><Btn big onClick={() => open('home')}>Back to the course</Btn><Btn primary big onClick={() => say(`Ask opens. Try: “What is a goal kick at ${x.age}?”`)}>Ask a question</Btn></>}>
        <div style={col}>
          <section aria-label="Your team’s game" style={tile}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><h2 style={h2}>Your team’s game</h2><Btn onClick={() => say('Your competition’s rule sheet opens.')}>All the rules</Btn></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 8 }}>{RULES.map(([a, b]) => <span key={a} style={{ background: PALE, borderRadius: 10, padding: '8px 12px', display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 12, color: MUT }}>{a}</strong><span style={{ fontSize: 14, lineHeight: '19px' }}>{x.standardRules ? b : 'Ask your club'}</span></span>)}</div>
            {x.standardRules && <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>These match the national MiniRoos rules for under 10 and 11. Your competition may differ, and your club loads its own. If a referee says otherwise on the day, the referee is right.</span>}
          </section>
          {x.nine && <section aria-label="Where they stand" style={tile}>
            <h2 style={h2}>Where they stand, and the one job each has</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '420px minmax(0,1fr)', gap: 16, alignItems: 'start' }}>
              <svg viewBox="0 0 100 72" role="img" aria-label="Nine players in their positions" style={{ width: '100%', borderRadius: 12, background: '#40826d' }}>
                <rect x="3" y="3" width="94" height="66" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="0.5" /><path d="M50 3v66" stroke="#fff" strokeOpacity="0.85" strokeWidth="0.5" /><rect x="3" y="24" width="11" height="24" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="0.5" /><rect x="86" y="24" width="11" height="24" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="0.5" />
                {SPOTS.map(([n, name, px, py]) => <g key={n}><circle data-club-home="" cx={px} cy={py * 0.72 + 6} r="3.4" fill="#fff" stroke={INK} strokeWidth="0.4" /><text data-club-on="" x={px} y={py * 0.72 + 7.2} textAnchor="middle" fontSize="3.4" fontWeight="700" fill={INK}>{n}</text><text x={px} y={py * 0.72 + 13} textAnchor="middle" fontSize="2.6" fontWeight="700" fill="#fff">{name}</text></g>)}
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, lineHeight: '20px' }}>
                {([['Keeper (1)', 'starts your attacks as well as stopping theirs.'], ['Backs (2, 3, 4)', 'get wide and open when you have the ball.'], ['Midfield (6, 7, 8)', 'link the back to the front. Always showing for a pass.'], ['Strikers (9, 10)', 'stay high so there is someone to pass to.']] as const).map(([a, b]) => <span key={a}><strong>{a} </strong>{b}</span>)}
                <span style={{ fontSize: 13, color: MUT }}>At this age everyone should play everywhere across a season, the keeper included.</span>
                <span><Btn big onClick={() => open('shapes')}>Other shapes for 9 a side</Btn></span>
              </div>
            </div>
          </section>}
        </div>
        <div style={col}>
          <section aria-label="Words you will hear" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8 }}><h2 style={h2}>Words you will hear</h2><Btn onClick={() => open('words')}>All {GLOSSARY.length}</Btn></div>
            {HEAR.map(w => <div key={w} style={{ display: 'grid', gridTemplateColumns: '116px minmax(0,1fr)', gap: 10, alignItems: 'center', minHeight: 40, padding: '3px 0', borderTop: `1px solid ${HAIR}` }}><strong style={{ fontSize: 14 }}>{w}</strong><span style={{ fontSize: 13, lineHeight: '18px' }}>{GLOSSARY.find(g => g.word === w)?.meaning}</span></div>)}
          </section>
          <Note title="Nobody knows you looked">This page is private. Lots of good community coaches never played.</Note>
        </div>
      </Page>)
  }

  // ── LN7 · your season as a coach ───────────────────────────────────────────
  if (view === 'season') return <Season x={x} c={c} go={go} say={say} open={open} tried={tried} />

  // ── LN3 · a module ─────────────────────────────────────────────────────────
  if (view.startsWith('m:')) {
    const m = MODULES[Number(view.slice(2)) - 1], done = m.lessons.filter(l => c.done[l.id]).length, nextIn = m.lessons.find(l => !c.done[l.id])
    const mins = m.lessons.reduce((a, l) => a + l.minutes, 0)
    return (
      <Page id={MODULE_SCREEN[m.number - 1]} title={m.title} sub={`Module ${m.number} of ${MODULES.length} · ${m.lessons.length} lessons, about ${mins} minutes in all`} go={go} cols={COLS}
        right={<><Btn big onClick={() => open('home')}>All modules</Btn><Btn primary big onClick={() => open(`l:${(nextIn ?? m.lessons[0]).id}`)}>{nextIn ? `Start lesson ${m.lessons.indexOf(nextIn) + 1}` : 'Watch again'}</Btn></>}>
        <div style={col}>
          <Hero over="BY THE END OF THIS MODULE" head={m.outcome} sub="Each lesson: a short film, the idea, one thing to try, then how it went." stats={[[`${done} of ${m.lessons.length}`, 'lessons'], [String(m.lessons.length), 'weeks', c.minutes.startsWith('20') ? 'two a week' : c.minutes.startsWith('5') ? 'one a fortnight' : 'one a week']]} />
          <section aria-label="The lessons" style={{ ...tile, gap: 0, padding: '12px 18px 2px' }}>
            <h2 style={{ ...h2, paddingBottom: 6 }}>The lessons</h2>
            {m.lessons.map((l, i) => { const d = c.done[l.id], here = now?.id === l.id; return (
              <button key={l.id} onClick={() => open(`l:${l.id}`)} style={rowBtn}>
                <Round done={!!d} n={i + 1} here={here} />
                <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '21px' }}>{l.title}</strong><span style={{ fontSize: 13, color: MUT }}>{l.one_line}</span></span>
                <span style={{ flex: 'none', fontSize: 12, color: MUT }}>{d?.when ? `Tried ${d.when} · ${d.feel >= 3 ? 'went well' : 'hard going'}` : here && isDay(l) ? `To try this ${l.try_when}` : ''}</span>
                <span style={{ flex: 'none', width: 44, fontSize: 13, color: MUT, textAlign: 'right' }}>{l.minutes} min</span><Chev />
              </button>) })}
          </section>
        </div>
        <div style={col}>
          <section aria-label="Why this module" style={tile}><h2 style={h2}>Why this module</h2>{m.why.map(w => <span key={w.text} style={{ fontSize: 14, lineHeight: '20px' }}>{w.text} <Src n={w.source} onOpen={source} /></span>)}</section>
          {!isNew && <section aria-label="From your own team" style={{ ...tile, gap: 0, padding: '14px 16px 6px' }}><h2 style={{ ...h2, paddingBottom: 8 }}>From your own team</h2>{OWN_TEAM[m.number - 1].map(([a, b, v]) => <Pair key={a} a={a} b={b || undefined} v={v} />)}</section>}
          <Note title="What you leave with">{m.leave_with}</Note>
        </div>
      </Page>)
  }

  // ── LN5 · how it went ──────────────────────────────────────────────────────
  if (view.startsWith('went:')) return <Went key={view} l={lesson(view.slice(5)) ?? ALL[0]} x={x} c={c} go={go} say={say} open={open} at={at} isNew={isNew} source={source} />

  // ── LN4 and LNL11 to LNL64 · a lesson ──────────────────────────────────────
  if (view.startsWith('l:')) {
    const l = lesson(view.slice(2)) ?? ALL[0], m = moduleOf(l), i = m.lessons.indexOf(l), own = c.ownWords[l.id] ?? []
    return <LessonPage key={l.id} l={l} m={m} i={i} own={own} x={x} c={c} go={go} say={say} open={open} at={at} source={source} />
  }

  // ── LN1 · the course ───────────────────────────────────────────────────────
  const hereModule = now ? moduleOf(now) : null, modulesDone = MODULES.filter(m => m.lessons.every(l => c.done[l.id])).length
  const head = !now ? 'Course finished. Your season page shows what you have tried.' : `${NUM[modulesDone]} module${modulesDone === 1 ? '' : 's'} done. Now: ${hereModule!.number === 4 ? 'how to talk to players so it sticks' : lower(hereModule!.summary)}.`
  const keepBall = tuesday.parts.some(p => /keep-ball/i.test(p.drill.name))
  return (
    <Page id="LN1-LearnHome" title="Learn to coach" sub={`${x.coach} · your first season · only you see this`} go={go} cols={COLS}
      right={<><Btn big onClick={() => open('why')}>Why we teach this</Btn>{now && <Btn primary big onClick={() => open(`l:${now.id}`)}>Carry on: {lower(now.title.split(',')[0])}</Btn>}</>}>
      <div style={col}>
        <Hero over={`${COURSE_NAME.toUpperCase()} · MODULE ${hereModule ? order.indexOf(hereModule) + 1 : MODULES.length} OF ${MODULES.length}`} head={head} sub="Every lesson is one thing to try at your next session, then two taps on how it went." stats={[[`${doneCount} of ${ALL.length}`, 'lessons'], [String(tried), 'things tried', 'at training']]} />
        <section aria-label="The course" style={{ ...tile, gap: 0, padding: '12px 18px 2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6 }}><h2 style={h2}>The course</h2><button onClick={() => open('start')} style={{ minHeight: 44, border: 0, background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: G, textDecoration: 'underline', cursor: 'pointer' }}>Built from your answers</button></div>
          {order.map((m, n) => { const done = m.lessons.every(l => c.done[l.id]), here = hereModule === m, after = hereModule ? order.indexOf(hereModule) : -1; const state = done ? 'Done' : here ? 'You are here' : n === after + 1 ? 'Next' : 'Later'; return (
            <button key={m.number} onClick={() => open(`m:${m.number}`)} style={rowBtn}>
              <Round done={done} n={n + 1} here={here} />
              <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '21px' }}>{m.title}</strong><span style={{ fontSize: 13, color: MUT }}>{m.summary}</span></span>
              <span aria-hidden="true" style={{ flex: 'none', width: 78, display: 'flex', gap: 3 }}>{m.lessons.map(l => <span key={l.id} style={{ width: 9, height: 9, borderRadius: 999, boxSizing: 'border-box', background: c.done[l.id] ? G : '#fff', border: c.done[l.id] ? 0 : `1.3px solid #9aa5a1` }} />)}</span>
              <span style={{ flex: 'none', width: 104 }}><span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, borderRadius: 999, padding: '4px 10px', background: here ? INK : done ? G : HAIR, color: here || done ? '#fff' : INK }}>{state}</span></span><Chev />
            </button>) })}
        </section>
      </div>
      <div style={col}>
        {now && <section aria-label="This week’s lesson" style={tile}>
          <h2 style={h2}>{isDay(now) ? `This week, matched to ${now.try_when}` : 'This week'}</h2>
          <button onClick={() => open(`l:${now.id}`)} style={{ display: 'flex', gap: 12, alignItems: 'center', minHeight: 60, border: 0, background: 'none', padding: 0, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
            <span style={{ flex: 'none', width: 76, height: 60, borderRadius: 10, background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d="M8 5l11 7-11 7z" size={16} /></span>
            <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{now.title}</strong><span style={{ fontSize: 13, color: MUT }}>Lesson {moduleOf(now).lessons.indexOf(now) + 1} of {moduleOf(now).lessons.length} · {now.minutes} minutes</span></span>
          </button>
          <span style={{ fontSize: 13, lineHeight: '19px' }}><strong>Why now: </strong>{c.next === now.id ? 'your last answer pointed here.' : now.id === '4.2' && keepBall ? 'Tuesday’s keep-ball game works when players find the answer themselves.' : 'it is next in your course.'}</span>
        </section>}
        <section aria-label="How confident you feel" style={{ ...tile, gap: 0, padding: '14px 16px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6 }}><h2 style={h2}>How confident you feel</h2><button onClick={() => open('season')} style={{ minHeight: 44, border: 0, background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: G, textDecoration: 'underline', cursor: 'pointer' }}>Your season</button></div>
          <Confidence c={c} />
          <span style={{ fontSize: 12, color: MUT, paddingTop: 6 }}>Your own ratings: round 1 in grey, now in green.</span>
        </section>
        <section aria-label="Stuck on something?" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 4 }}>Stuck on something?</h2>
          {([['Ask anything', '“What do I do when nobody answers?”', 'M4 5h16v11H9l-5 4z', () => say('Ask opens with your team and this week’s session already in view.')], ...(addsGame(c) ? [['The game itself', `Rules, positions and words for ${x.age}`, 'M6 4h12v16H6zM10 4v16', () => open('game')]] : []), [`Talk to ${x.mentor}`, 'Your club’s coach mentor', 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0', () => say('Message to Rachel Moore started. She sees only what you write.')]] as [string, string, string, () => void][]).map(([a, b, d, on]) => (
            <button key={a} onClick={on} style={{ ...rowBtn, minHeight: 46, borderTop: `1px solid ${HAIR}`, gap: 10 }}><span style={{ flex: 'none', width: 32, height: 32, borderRadius: 8, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={d} size={15} /></span><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>{a}</strong><span style={{ fontSize: 13, color: MUT }}>{b}</span></span><Chev /></button>))}
        </section>
      </div>
    </Page>)
}

type Sub = { x: Ctx; c: Coach; go: (id: string) => void; say: (m: string) => void; open: (v: string) => void }

// ── A lesson ─────────────────────────────────────────────────────────────────
function LessonPage({ l, m, i, own, x, c, go, say, open, at, source }: Sub & { l: Lesson; m: Module; i: number; own: string[]; at: (l: Lesson) => string; source: () => void }) {
  const [writing, setWriting] = useState(false), [mine, setMine] = useState('')
  const clip = l.own_team_clip && x.hasFilm ? l.own_team_clip : null   // only ever this coach's own players
  const reminded = !!c.reminders[l.id], heading = tryHeading(l)
  const remind = () => { setCoach(x.who, v => ({ reminders: { ...v.reminders, [l.id]: `${at(l) || l.try_when} · ${l.title}` } })); say(isDay(l) ? `Added to your run sheet for ${l.try_when}. It shows as a reminder at the right moment.` : `We’ll remind you: ${lower(l.try_when)}.`) }
  const steps = ['Watch', 'The idea', ...(clip ? ['See it in your team'] : []), heading, 'How it went']
  // each step is a button: it moves to that part of the lesson and marks it
  const [step, setStep] = useState(1)
  const ring = (name: string): React.CSSProperties => steps[step] === name ? { boxShadow: `0 0 0 2px ${G}` } : {}
  const toStep = (n: number) => {
    setStep(n); const name = steps[n]
    document.getElementById(`ln-part-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    say(name === 'Watch' ? 'The film for this lesson is not made yet. Start at “The idea”.' : `${name}.`)
  }
  const part = (name: string) => `ln-part-${steps.indexOf(name)}`
  return (
    <Page id={l.screen} title={l.title} smallSub sub={`${m.title} · lesson ${i + 1} of ${m.lessons.length} · ${l.minutes} min`} go={go} cols={COLS}
      right={<><Btn big onClick={() => open(`m:${m.number}`)}>Back</Btn><Btn primary big aria-pressed={reminded} onClick={remind}>{isDay(l) ? `Add to ${l.try_when}’s run sheet` : 'Remind me'}</Btn></>}>
      <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))`, gap: 8 }}>
        {steps.map((st, n) => { const on = n === step, last = n === steps.length - 1; const inner = <><span style={{ flex: 'none', width: 20, height: 20, borderRadius: 999, background: on ? '#fff' : PALE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{n + 1}</span><strong style={{ fontSize: 13 }}>{st}</strong></>; const st2: React.CSSProperties = { minHeight: 44, borderRadius: 10, border: on ? 0 : `1px solid ${LINE}`, background: on ? INK : '#fff', color: on ? '#fff' : INK, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', fontFamily: 'inherit' }
          return last ? <button key={st} onClick={() => open(`went:${l.id}`)} style={{ ...st2, cursor: 'pointer' }}>{inner}</button> : <button key={st} aria-current={on ? 'step' : undefined} onClick={() => toStep(n)} style={{ ...st2, cursor: 'pointer', textAlign: 'left' }}>{inner}</button> })}
      </div>
      <div style={col}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px minmax(0,1fr)', gap: 12 }}>
          {/* Films are not made yet: say so, and never show a tile that plays nothing */}
          <section id={part('Watch')} aria-label="The film" style={{ ...ring('Watch'), borderRadius: 16, background: DARK, color: '#fff', padding: 16, minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ alignSelf: 'flex-start', fontSize: 12, fontWeight: 700, background: 'rgba(255,255,255,0.16)', borderRadius: 999, padding: '3px 10px' }}>Film · about 2 minutes</span>
            <strong style={{ fontSize: 16 }}>Film coming</strong>
          </section>
          <section id={part('The idea')} aria-label="The idea" style={{ ...tile, ...ring('The idea') }}>
            <h2 style={h2}>The idea</h2>
            <span style={{ fontSize: 15, lineHeight: '22px' }}>{l.idea}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: 14, lineHeight: '20px' }}>{l.steps.map((t, n) => <span key={t}><strong>{n + 1}. </strong>{t}</span>)}</span>
          </section>
        </div>
        {(l.words_to_use.length > 0 || own.length > 0 || l.instead_of) && <section aria-label="Words you can use" style={tile}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><h2 style={h2}>{l.words_to_use.length || own.length ? 'Words you can use' : 'Leave these out'}</h2>{l.words_to_use.length > 0 && <Btn onClick={() => { setWriting(true); say('Type your own words. They are saved with this lesson and show on your run sheet.') }}>Write my own</Btn>}</div>
          {writing && <form onSubmit={e => { e.preventDefault(); const t = mine.trim(); if (!t) return; setCoach(x.who, v => ({ ownWords: { ...v.ownWords, [l.id]: [t, ...(v.ownWords[l.id] ?? [])] } })); setMine(''); setWriting(false); say('Saved. Your own words show first.') }} style={{ display: 'flex', gap: 8 }}>
            <input aria-label="Your own words" autoFocus value={mine} onChange={e => setMine(e.target.value)} placeholder="What you would say" style={{ flexGrow: 1, height: 44, padding: '0 12px', borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 15, color: INK }} /><Btn primary big>Save</Btn>
          </form>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 18px' }}>{[...own, ...l.words_to_use].map((w, n) => <span key={w + n} style={{ display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 14, lineHeight: '20px' }}><span style={{ color: G }}><Ico d="M4 5h16v11H9l-5 4z" size={13} /></span>“{w}”{n < own.length && <span style={{ fontSize: 12, color: MUT }}>yours</span>}</span>)}</div>
          {l.instead_of && <span style={{ fontSize: 13, color: MUT }}>Instead of: {l.instead_of}</span>}
        </section>}
        <section id={part(heading)} aria-label={heading} style={{ ...tile, ...ring(heading) }}>
          <h2 style={h2}>{heading}</h2>
          {at(l) && <span style={{ alignSelf: 'flex-start', fontSize: 12, fontWeight: 700, background: G, color: '#fff', borderRadius: 999, padding: '3px 10px' }}>{at(l)}</span>}
          <span style={{ fontSize: 15, lineHeight: '22px' }}>{l.try_task}</span>
        </section>
      </div>
      <div style={col}>
        {clip && <section id={part('See it in your team')} aria-label="See it in your own team" style={{ ...tile, ...ring('See it in your team') }}>
          <h2 style={h2}>See it in your own team</h2>
          <button onClick={() => { playClips([{ title: clip.example_moment, sub: clip.example_caption, len: 11 }], 'See it in your own team'); say('The clip plays.') }} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 76, borderRadius: 12, border: 0, background: '#2e3231', color: '#fff', padding: '0 14px', fontFamily: 'inherit', cursor: 'pointer' }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, border: '1.5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d="M8 5l11 7-11 7z" size={13} /></span><strong style={{ fontSize: 14 }}>{clip.example_moment}</strong>
          </button>
          <span style={{ fontSize: 14, lineHeight: '20px' }}>{clip.example_caption}</span>
        </section>}
        <section aria-label="What comes next" style={{ ...tile, gap: 0, padding: '14px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 8 }}>Afterwards, your answer picks what comes next</h2>
          {l.answers.map(a => <div key={a.answer} style={{ display: 'grid', gridTemplateColumns: '130px minmax(0,1fr)', gap: 12, alignItems: 'center', minHeight: 44, padding: '6px 0', borderTop: `1px solid ${HAIR}` }}><strong style={{ fontSize: 13 }}>{a.answer}</strong><span style={{ fontSize: 13, lineHeight: '18px' }}>{a.then}</span></div>)}
        </section>
        <Note title="Where this comes from">{l.sources.length ? <>The research and guidance behind this lesson.<span style={{ whiteSpace: 'nowrap' }}>{l.sources.map(n => <Src key={n} n={n} onOpen={source} />)}</span></> : 'This is how Clean Sheet works, or common coaching practice. No research claim is made.'}</Note>
      </div>
    </Page>)
}

// ── How it went: three quick answers, an optional note, and what the answer does next ──
function Went({ l, x, c, go, say, open, at, isNew, source }: Sub & { l: Lesson; at: (l: Lesson) => string; isNew: boolean; source: () => void }) {
  const [tried, setTried] = useState('Yes'), [ans, setAns] = useState(l.id === '4.2' ? 'Silence' : l.answers[0].answer), [feel, setFeel] = useState(3)
  const [note, setNote] = useState(l.id === '4.2' && !isNew ? 'Asked “where is the space” in square A. Nobody spoke, so I said it myself. Jun pointed after.' : '')
  const a = l.answers.find(v => v.answer === ans) ?? l.answers[0], fx = effectOf(l, a)
  const after = fx.kind === 'lesson' ? fx.to! : (() => { const rest = moduleOrder(c).flatMap(m => m.lessons).filter(v => !c.done[v.id] && v.id !== l.id); return rest[0] ?? null })()
  const part = at(l).replace(/^\d+:\d\d · /, '')
  const save = () => {
    setCoach(x.who, v => ({ done: { ...v.done, [l.id]: { tried, answer: ans, feel, note: note.trim() || undefined, when: 'this week' } }, next: fx.kind === 'lesson' ? fx.to!.id : null, did: fx.kind === 'product' ? [`${l.title}: ${a.then}`, ...v.did] : v.did }))
    say(after ? `Saved. Your next lesson is “${after.title}”.` : 'Saved. Course finished.'); open('home')
  }
  return (
    <Page id="LN5-HowItWent" title={`How did ${isDay(l) ? l.try_when : 'it'} go?`} sub={`You were going to try: ${lower(l.title.split(',')[0])}${/^\d/.test(at(l)) ? `, in ${part}` : ''}`} go={go} cols={COLS}
      right={<><Btn big onClick={() => open('home')}>Not now</Btn><Btn primary big onClick={save}>Save</Btn></>}>
      <div style={col}>
        <section aria-label="Two taps" style={tile}>
          <h2 style={h2}>Two taps</h2>
          <strong style={{ fontSize: 14 }}>Did you try it?</strong>
          <div role="radiogroup" aria-label="Did you try it?" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{['Yes', 'Sort of', 'Didn’t get to it'].map(o => <button key={o} role="radio" aria-checked={tried === o} onClick={() => { say(`${o}: ${tried === o ? 'taken off' : 'picked'}.`); setTried(o) }} style={chip(tried === o)}>{o}</button>)}</div>
          <strong style={{ fontSize: 14 }}>{l.id === '4.2' ? 'What happened when you asked?' : 'What happened?'}</strong>
          <div role="radiogroup" aria-label="What happened?" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{l.answers.map(o => <button key={o.answer} role="radio" aria-checked={ans === o.answer} onClick={() => { say(`${o.answer}: ${ans === o.answer ? 'taken off' : 'picked'}.`); setAns(o.answer) }} style={chip(ans === o.answer)}>{o.answer}</button>)}</div>
          <strong style={{ fontSize: 14 }}>How did it feel?</strong>
          <div role="radiogroup" aria-label="How did it feel?" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>{[1, 2, 3, 4, 5].map(n => <button key={n} role="radio" aria-checked={feel === n} onClick={() => { setFeel(n); say(`How did it feel? ${n} of 5.`) }} style={{ ...chip(feel === n), borderRadius: 10 }}>{n}</button>)}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: MUT }}><span>Awkward</span><span>Natural</span></div>
        </section>
        <section aria-label="Anything to remember?" style={tile}>
          <h2 style={h2}>Anything to remember? Optional</h2><span style={label}>Your note</span>
          <textarea aria-label="Your note" value={note} onChange={e => setNote(e.target.value)} rows={3} style={{ borderRadius: 10, border: `1px solid ${LINE}`, padding: '10px 12px', fontFamily: 'inherit', fontSize: 15, lineHeight: '21px', color: INK, resize: 'vertical' }} />
        </section>
        <Note title="This is for you">Nobody else reads it. It is how the course works out what to show you next.</Note>
      </div>
      <div style={col}>
        {/* fewer than five players answering: the tile is hidden */}
        {!isNew && <section aria-label="What the players said" style={{ ...tile, gap: 0, padding: '14px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 8 }}>What the players said</h2>
          <Pair a="“I knew what to do”" b="Their three taps after training" v="7 of 9" />
          {l.id === '4.2' && <Pair a="“The coach asked what I thought”" b="First time this was above 2" v="4 of 9" />}
        </section>}
        <section aria-label="What comes next, and why" style={tile}>
          <h2 style={h2}>What comes next, and why</h2>
          {l.id === '4.2' && ans === 'Silence'
            ? <span style={{ fontSize: 14, lineHeight: '20px' }}><strong>Because you got silence,</strong> next week’s lesson is <strong>“Wait for the answer”</strong>. Silence after a question is normal. It usually means they are thinking.</span>
            : <span style={{ fontSize: 14, lineHeight: '20px' }}><strong>Because you chose “{ans}”:</strong> {lower(a.then)}.{fx.kind !== 'lesson' && after && <> Your next lesson is <strong>“{after.title}”</strong>.</>}</span>}
          {after && <span><Btn big onClick={() => open(`l:${after.id}`)}>Preview the lesson</Btn></span>}
        </section>
        <Note title="Why we ask you">Coaches are poor judges of how they coach from memory alone. A quick note straight after is more accurate. <Src n={7} onOpen={source} /></Note>
      </div>
    </Page>)
}

// ── Your season as a coach: private, and not a grade ─────────────────────────
function Season({ x, c, go, say, open, tried }: Sub & { tried: number }) {
  const [rating, setRating] = useState<number[] | null>(null)
  const TRIED: [string, string, string][] = [['16 June', 'Say less: 30 seconds, then play', 'Went well'], ['9 June', 'One game, three versions', 'Went well'], ['2 June', 'Cones set once before they arrive', 'Use it every week now'], ['26 May', 'Starting with a game, not a lap', 'Went well'], ['19 May', 'A plan B for six players', 'Didn’t need it']]
  const mine = Object.entries(c.done).filter(([, d]) => d.when === 'this week').map(([id, d]) => ['This week', ALL.find(l => l.id === id)?.title ?? id, d.tried === 'Yes' ? (d.feel >= 3 ? 'Went well' : 'Hard going') : d.tried] as [string, string, string])
  const seeded = c.ratings.length > 0 && !x.who.startsWith('new:')
  return (
    <Page id="LN7-YourProgress" title="Your season as a coach" sub={`${x.coach} · only you see this`} go={go} cols={COLS}
      right={<><Btn big onClick={() => open('home')}>Back to the course</Btn><Btn primary big onClick={() => { setRating(CONFIDENCE.map((_, i) => c.ratings[i]?.[1] ?? 3)); say('Five quick ratings. About 30 seconds.') }}>{c.ratings.length ? 'Rate yourself again' : 'Rate yourself'}</Btn></>}>
      <div style={col}>
        <section aria-label="How confident you feel" style={{ ...tile, gap: 0, padding: '14px 18px 10px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>How confident you feel</h2>
          {rating ? <>
            {CONFIDENCE.map((name, i) => <div key={name} role="radiogroup" aria-label={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', borderTop: `1px solid ${HAIR}` }}><strong style={{ flexGrow: 1, fontSize: 14 }}>{name}</strong>{[1, 2, 3, 4, 5].map(n => <button key={n} role="radio" aria-checked={rating[i] === n} aria-label={`${name}: ${n} of 5`} onClick={() => setRating(r => r!.map((v, j) => j === i ? n : v))} style={{ ...chip(rating[i] === n), width: 44, padding: 0, borderRadius: 10 }}>{n}</button>)}</div>)}
            <span style={{ paddingTop: 8 }}><Btn primary big onClick={() => { setCoach(x.who, v => ({ ratings: rating.map((n, i) => [v.ratings[i]?.[0] ?? n, n]) })); setRating(null); say('Saved. Only you see these.') }}>Save my ratings</Btn></span>
          </> : <Confidence c={c} />}
          <span style={{ fontSize: 12, color: MUT, paddingTop: 6 }}>Your own ratings out of 5. Round 1 in grey, round 6 in green. We ask every six weeks.</span>
        </section>
        <section aria-label="What you have tried" style={{ ...tile, gap: 0, padding: '14px 18px 4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 6 }}><h2 style={h2}>What you have tried</h2><span style={cap}>{tried} in all</span></div>
          {[...mine, ...(seeded ? TRIED : [])].map(([d, a, b]) => <div key={d + a} style={{ display: 'grid', gridTemplateColumns: '84px minmax(0,1fr) auto', gap: 12, alignItems: 'center', minHeight: 40, borderTop: `1px solid ${HAIR}`, fontSize: 14 }}><span style={{ color: MUT }}>{d}</span><strong>{a}</strong><span style={{ color: MUT }}>{b}</span></div>)}
          {!mine.length && !seeded && <span style={{ ...cap, padding: '8px 0' }}>Nothing yet. Each lesson ends in one thing to try.</span>}
        </section>
      </div>
      <div style={col}>
        {seeded && <section aria-label="What your players say" style={{ ...tile, gap: 0, padding: '14px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 8 }}>What your players say</h2>
          <Pair a="“I knew what to do”" b="Round 1, then last week" v="5 then 7 of 9" /><Pair a="“I had fun”" v="8 then 9 of 9" /><Pair a="Came to training" b="Average" v="9 of 13 then 11 of 13" />
        </section>}
        <section aria-label="Next steps outside the app" style={{ ...tile, gap: 0, padding: '14px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 4 }}>Next steps outside the app</h2>
          <button onClick={() => go('DT1-Courses')} style={{ ...rowBtn, borderTop: `1px solid ${HAIR}`, minHeight: 52 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>Federation course near you</strong><span style={{ fontSize: 13, color: MUT }}>Sat 8 August · Wattle Creek Reserve · 3 hours</span></span><Chev /></button>
          <button onClick={() => go('CN6-Observation')} style={{ ...rowBtn, borderTop: `1px solid ${HAIR}`, minHeight: 52 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>Ask {x.mentor} to watch a session</strong><span style={{ fontSize: 13, color: MUT }}>A friendly visit. Two things that went well, one idea</span></span><Chev /></button>
          <button role="switch" aria-checked={c.share} onClick={() => { setCoach(x.who, { share: !c.share }); say(`Share this page with my mentor: ${c.share ? 'left out' : 'added'}.`) }} style={{ ...rowBtn, borderTop: `1px solid ${HAIR}`, minHeight: 52 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>Share this page with my mentor</strong><span style={{ fontSize: 13, color: MUT }}>{c.share ? `On. ${x.mentor} can see this page` : `Off. ${x.mentor} sees nothing unless you turn this on`}</span></span><span style={{ flex: 'none', width: 46, height: 28, borderRadius: 999, background: c.share ? G : LINE, display: 'flex', alignItems: 'center', justifyContent: c.share ? 'flex-end' : 'flex-start', padding: 3, boxSizing: 'border-box' }}><span style={{ width: 22, height: 22, borderRadius: 999, background: '#fff' }} /></span></button>
        </section>
        <Note title="Not a grade">These are your own ratings and your players’ taps. Nobody ranks coaches, and this does not replace a federation course.</Note>
      </div>
    </Page>)
}
