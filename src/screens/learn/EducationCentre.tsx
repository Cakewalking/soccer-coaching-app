// Education centre (education-centre-v1): a library to browse, led by the same player as Learn to coach.
// EC1 for players · EC1e nothing sent yet · EC2 the players' catalogue · EC3 one clip · EC4 this term, in order ·
// EC5 make one from a clip · EC6 for coaches · EC7 the coaches' catalogue · EC8 a read · EC9 search · EC11 what works.
// The catalogue is data (catalogue.json). The words on each page are the boards', unchanged.

import { useEffect, useState, type ReactNode } from 'react'
import { Btn, Note, Ico, tile, h2, cap, label, G, INK, MUT, LINE, PALE } from '../capture/marks'
import { Page, col } from '../capture/CaptureScreens'
import LearnPlayer, { Thumb, chaptersFor, type Chapter, type Frame } from './LearnPlayer'
import { useBackState } from '../../backState'
import { sessionFor, type SessionState } from '../session/sessionStore'
import { TEAMS, type TeamKey } from '../session/sessionEngine'
import { ctxFor, nextLesson, setCoach, useCoach } from './course'
import { C_FILTERS, C_ITEMS, COACH_SHELVES, EVERY, P_FILTERS, P_ITEMS, PLAYER_SHELVES, agesWord, bandOf, byTitle, coachAgeGroup, goesTo, item, matchC, matchP, maySend, search, setLib, shortAnswer, shown, takeEduWanted, teamAge, useClub, useEduWanted, useLib, type CItem, type Filters, type Item, type PItem } from './library'

type Props = { s: SessionState; k: TeamKey; go: (id: string) => void; say: (m: string) => void; start?: string; isNew?: boolean }
const HAIR = '#e9eae8', PLAY = 'minmax(0,1.79fr) minmax(0,1fr)'
const lower = (t: string) => t.charAt(0).toLowerCase() + t.slice(1)
const link: React.CSSProperties = { minHeight: 44, border: 0, background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: G, textDecoration: 'underline', cursor: 'pointer', whiteSpace: 'nowrap' }
const pill = (on: boolean): React.CSSProperties => ({ minHeight: 44, padding: '0 14px', borderRadius: 999, border: on ? 0 : `1px solid ${LINE}`, background: on ? G : '#fff', color: on ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' })
const chipS = (dark = true): React.CSSProperties => ({ display: 'inline-flex', alignItems: 'center', minHeight: 24, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', fontSize: 12, fontWeight: 700, background: dark ? G : HAIR, color: dark ? '#fff' : INK, whiteSpace: 'nowrap' })
const pinned: React.CSSProperties = { borderRadius: 16, background: '#fff', border: `2.5px solid ${INK}`, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }
const Src = ({ n, onOpen }: { n: number; onOpen: () => void }) => <span style={{ position: 'relative', display: 'inline-block', margin: '0 3px', whiteSpace: 'nowrap' }}><span aria-hidden="true" style={{ display: 'inline-block', minWidth: 20, padding: '0 6px', boxSizing: 'border-box', borderRadius: 999, background: PALE, color: INK, fontSize: 11, lineHeight: '18px', fontWeight: 700, textAlign: 'center' }}>{n}</span><button onClick={onOpen} aria-label={`Source ${n}`} style={{ position: 'absolute', left: '50%', top: '50%', width: 44, height: 44, transform: 'translate(-50%,-50%)', padding: 0, border: 0, borderRadius: 8, background: 'none', cursor: 'pointer' }} /></span>
const Tick = ({ ok = true }: { ok?: boolean }) => <span style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, boxSizing: 'border-box', background: ok ? G : '#fff', border: ok ? 0 : `1.5px solid ${INK}`, color: ok ? '#fff' : INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={ok ? 'M5 12l5 5 9-10' : 'M7 7l10 10M17 7L7 17'} size={13} sw={3} /></span>
const Line = ({ ok = true, a, b }: { ok?: boolean; a: string; b: string }) => <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderTop: `1px solid ${LINE}` }}><Tick ok={ok} /><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>{a}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{b}</span></span></div>

/** What is drawn for an item until it is filmed: the coach's own team, the practice square, or a library clip. */
const frameOf = (i: Item): Frame => i.for === 'players' ? (i.club ? 'team' : 'figure') : i.kind === 'Film' && !i.lesson ? 'figure' : 'drawn'
/** The three written steps of the one home game the boards give. Every other clip's game is still to be written. */
const HOME_GAME: Record<string, { steps: string[]; need: string; cue: string }> = {
  'Eyes up while you dribble': { steps: ['Dribble towards a tree or a parent.', 'A parent holds up some fingers. Shout the number.', 'Keep the ball close enough to stop it on “freeze”.'], need: 'You need a ball and about ten steps of space.', cue: 'Watch her head, not her feet' },
}
const IVY = 'Ivy: eyes up while she dribbles', EYES = 'Eyes up while you dribble'
/** Results the boards word in their own way. */
const SUBS: Record<string, string> = { 'What offside is': 'Two minutes, with a pitch drawing', 'Rules for your age group': 'Offside, throw-ins, goal kicks and more at under {age}' }
const SLOTS = ['Fri 5 June', 'Tue 9 June', 'Fri 12 June, 4 pm', 'Tue 16 June, 4 pm', 'Fri 19 June, 4 pm', 'Tue 23 June, 4 pm']

function Seg({ mode, onMode }: { mode: 'players' | 'coaches'; onMode: (m: 'players' | 'coaches') => void }) {
  return (
    <span role="radiogroup" aria-label="Who it is for" style={{ display: 'inline-flex', borderRadius: 10, border: `1px solid ${LINE}`, overflow: 'hidden', background: '#fff', flex: 'none' }}>
      {(['players', 'coaches'] as const).map(m => <button key={m} role="radio" aria-checked={mode === m} onClick={() => onMode(m)} style={{ height: 44, padding: '0 16px', border: 0, background: mode === m ? G : '#fff', color: mode === m ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>{m === 'players' ? 'For players' : 'For coaches'}</button>)}
    </span>)
}
function Find({ value = '', onFind, wide }: { value?: string; onFind: (q: string) => void; wide?: boolean }) {
  const [q, setQ] = useState(value)
  return (
    <form role="search" onSubmit={e => { e.preventDefault(); onFind(q) }} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, width: 280, padding: '0 12px', boxSizing: 'border-box', borderRadius: 10, border: `${wide ? 1.5 : 1}px solid ${wide ? INK : LINE}`, background: '#fff', color: MUT }}>
      <button type="submit" aria-label={`Search ${EVERY.length} films, games and reads`} style={{ flex: 'none', width: 44, height: 44, margin: '0 -10px 0 -12px', padding: 0, border: 0, background: 'none', color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ico d="M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4" size={16} sw={2.2} /></button>
      <input aria-label="Search the library" placeholder={`Search ${EVERY.length} films, games and reads`} value={q} onChange={e => setQ(e.target.value)} style={{ flexGrow: 1, minWidth: 0, height: 40, border: 0, outline: 0, background: 'none', fontFamily: 'inherit', fontSize: 15, color: INK, textOverflow: 'ellipsis' }} />
    </form>)
}
/** One card on a shelf: a still with its length, the title, what it is, and a line about what has happened to it. */
function Card({ i, sub, note, strong, onOpen }: { i: Item; sub: string; note?: string; strong?: boolean; onOpen: () => void }) {
  return (
    <button onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
      <Thumb kind={frameOf(i)} len={i.length} wide />
      <strong style={{ fontSize: 15, lineHeight: '19px', marginTop: 3 }}>{i.title}</strong>
      <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{sub}</span>
      {note && <span style={{ fontSize: 12, lineHeight: '16px', fontWeight: 700, color: strong ? G : INK }}>{note}</span>}
    </button>)
}
function Shelf({ title, about, n, onAll, children, cols }: { title: string; about?: string; n: number; onAll: () => void; children: ReactNode; cols: number }) {
  return (
    <section aria-label={title} style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}><span style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', minWidth: 0 }}><h2 style={h2}>{title}</h2>{about && <span style={{ fontSize: 13, color: MUT }}>{about}</span>}</span><button onClick={onAll} aria-label={`See all ${n}, ${title}`} style={link}>See all {n}</button></div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 14 }}>{children}</div>
    </section>)
}
function Row({ i, over, sub, right, onOpen }: { i: Item | null; over: string; sub: string; right?: string; onOpen: () => void }) {
  return (
    <button onClick={onOpen} style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%', minHeight: 84, padding: '7px 0', border: 0, borderTop: `1px solid ${HAIR}`, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
      <Thumb kind={i ? frameOf(i) : 'drawn'} len={i?.length ?? ''} />
      <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: MUT }}>{over}</span><strong style={{ fontSize: 14, lineHeight: '18px' }}>{i?.title}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{sub}</span></span>
      {right && <span style={{ flex: 'none', fontSize: 13, color: MUT }}>{right}</span>}
    </button>)
}

export default function EducationCentre({ s, k, go, say, start, isNew = false }: Props) {
  const x = ctxFor(k, isNew), c = useCoach(x.who), lib = useLib(x.who), club = useClub()
  const t = TEAMS[k], age = teamAge(k), fam = t.squad.length, sample = !isNew && k === 'u9'   // the boards' own examples are U9 Tom's
  const pid = (title: string) => byTitle(title, 'players')!.id
  const first = (id?: string): string => id === 'EC1e-PlayersHomeEmpty' ? 'pe' : id === 'EC2-PlayersCatalogue' ? 'pc' : id === 'EC3-Item' ? `i:${pid(EYES)}` : id === 'EC4-Playlist' ? 'list' : id === 'EC5-MakeOne' ? 'make' : id === 'EC6-CoachesHome' ? 'c' : id === 'EC7-CoachCatalogue' ? 'cc' : id === 'EC8-Read' ? 'read' : id === 'EC9-Search' ? 'q:offside' : id === 'EC11-WhatWorks' ? 'why' : 'p'
  const [view, setView] = useBackState(() => first(start))
  const [back, setBack] = useBackState(() => start === 'EC11-WhatWorks' || start === 'EC8-Read' || start === 'EC9-Search' ? 'c' : 'p')   // where "Back" goes from a page opened from a shelf
  const [pf, setPf] = useBackState<Filters>(() => ({ Age: [bandOf(Math.min(age - 1, 13))], ...(start === 'EC2-PlayersCatalogue' ? { 'You need': ['Just a ball'] } : {}) }))
  const [cf, setCf] = useBackState<Filters>(() => ({ 'Age group': [coachAgeGroup(age)] }))
  const [wide, setWide] = useBackState<string | null>(null)   // a shelf opened with "See all"
  const [nf, setNf] = useBackState<Filters>((): Filters => start === 'EC9-Search' ? { For: ['Coaches'] } : {})   // the board is drawn with "Coaches" pressed
  const [theme, setTheme] = useBackState(0)
  const [moment, setMoment] = useBackState(0)
  const wanted = useEduWanted()
  useEffect(() => { if (wanted) { const w = takeEduWanted(); if (w) setView(first(w)) } })
  const open = (v: string, from?: string) => { if (from) setBack(from); setView(v); window.scrollTo?.(0, 0) }
  const why = () => open('why', view)
  const captions = c.captions !== false, setCaptions = (on: boolean) => setCoach(x.who, { captions: on })
  const tuesday = sessionFor(s, k), day = /^Tue/.test(t.day) ? 'Tuesday' : t.day.split(' ')[0]
  const mode = (m: 'players' | 'coaches') => open(m === 'players' ? 'p' : 'c')
  const seen = (i: Item) => shown(i, club)
  const P = P_ITEMS.filter(i => seen(i) && (sample || !i.club)), C = C_ITEMS.filter(seen)   // a club clip shows to its own team
  const head = (who: 'players' | 'coaches', q = '') => <><Find value={q} onFind={v => open(`q:${v.trim()}`, view)} /><Seg mode={who} onMode={mode} /></>
  /** Open any item from a shelf, a row or a search result. */
  const openItem = (i: Item, from = view) => {
    if (i.for === 'players') return open(`i:${i.id}`, from)
    setLib(x.who, l => l.opened.includes(i.id) ? {} : { opened: [...l.opened, i.id] })
    if (i.lesson) return go(i.lesson.screen)                       // a Learn to coach film: the lesson page. It does not move the coach's place in the course
    if (i.kind === 'Collection') return go('DF0-Library')
    if (i.page === 'EC8-Read') return open('read', from)
    if (i.page) return go(i.page)
    open(`f:${i.id}`, from)
  }
  const pSub = (i: PItem) => `${i.kind} · ${i.you_need}`
  const cSub = (i: CItem) => i.kind === 'Collection' ? 'Collection · opens Game library' : i.kind === 'Film' ? 'Film · watch' : i.kind === 'Read' ? 'Read · read' : `${i.kind} · ${lower(i.length)}`
  const pNote = (i: PItem): [string, boolean] | [] => { const n = lib.sent[i.id], w = lib.watched[i.id] ?? 0; return n === undefined ? (lib.later[i.id] ? [lib.later[i.id], false] : []) : n >= fam && !i.club ? [`Sent ${lib.when[i.id] ?? 'today'}`, false] : [`${w} of ${fam} ${families} watched`, true] }
  /** Send a clip to the families who do not have it. Two a week is the most; a 13+ clip never goes to an under-12 family. */
  const send = (i: PItem, short = false) => {
    if (!maySend(i, age)) { say(i.lo >= 13 ? 'For 13 and over. Not sent to under-12 families.' : 'Heading clips stay off under 12 at your club.'); return }
    const n = fam - (lib.sent[i.id] ?? 0), who = goesTo(age) === 'player' ? 'players' : 'families'
    if (n <= 0) { say(`All ${fam} ${who} have it.`); return }
    setLib(x.who, l => ({ sent: { ...l.sent, [i.id]: fam }, when: { ...l.when, [i.id]: 'today' }, order: l.order.includes(i.id) ? l.order : [...l.order, i.id] }))
    say(short ? `Sent to ${n} ${who}.` : `Sent to ${n} ${who}. Each gets the clip and one game to play at home.`)
  }
  const families = goesTo(age) === 'player' ? 'players' : 'families'
  const sendWord = goesTo(age) === 'parent' ? 'It goes with one game to play at home. Children under 12 have no account of their own, so it goes to a parent.' : goesTo(age) === 'both' ? 'It goes with one game to play at home. From 13 to 15 it goes to the player and a parent.' : 'It goes with one game to play at home. From 16 it goes to the player.'
  /** A player clip in the player: the clip, the same clip in slow motion, then the home game as a still. */
  const clipChapters = (i: PItem, own: boolean, cue: string): Chapter[] => { const secs = Math.max(4, i.secs); return [{ key: 'clip', frame: own ? 'team' : frameOf(i), label: own ? 'Ivy, your team' : 'The clip', short: 'Clip', secs, lines: [cue] }, { key: 'slow', frame: own ? 'team' : frameOf(i), label: 'Slow motion', short: 'Slow', secs: Math.floor(secs * 4 / 3), lines: [cue], slow: true }] }

  // ── EC11 · what works, and why ─────────────────────────────────────────────
  if (view === 'why') return <WhatWorks go={go} right={<><Seg mode="coaches" onMode={mode} /><Btn big onClick={() => open(back === 'why' ? 'c' : back)}>Back</Btn></>} />

  // ── EC9 · search ───────────────────────────────────────────────────────────
  if (view.startsWith('q:')) {
    const q = view.slice(2), all = search(q, age).filter(h => h.who === 'word' || seen(item(h.open)!))
    const kindOf = (h: typeof all[number]) => h.who === 'word' ? 'Word' : h.title === 'Rules for your age group' ? 'Rule' : h.kind === 'Read' ? 'Read' : 'Film'
    const hits = all.filter(h => (!nf.For?.length || nf.For.includes(h.who === 'players' ? 'Players' : 'Coaches')) && (!nf.Kind?.length || nf.Kind.includes(kindOf(h))))
    const ans = shortAnswer(q, k, !isNew), [lead, ...rest] = ans ? ans.text.split('. ') : ['']
    const tog = (g: string, v: string) => { const on = nf[g]?.includes(v); setNf({ ...nf, [g]: on ? nf[g].filter(o => o !== v) : [...(nf[g] ?? []), v] }); say(`${v}: ${on ? 'removed' : 'added'}. The shelves update.`) }
    return (
      <Page id="EC9-Search" title="Education centre" sub={q ? `${hits.length} ${hits.length === 1 ? 'result' : 'results'} for “${q}”` : 'Search films, reads, words and rules'} go={go} cols="minmax(0,1fr) 330px"
        right={<><Find key={q} value={q} wide onFind={v => open(`q:${v.trim()}`)} /><Btn big onClick={() => open(back.startsWith('q:') ? 'c' : back)}>Clear</Btn></>}>
        <div style={col}>
          {ans && <section aria-label="The short answer" style={{ ...pinned, gap: 6 }}>
            <span style={label}>The short answer, for {t.label}</span>
            <strong style={{ fontSize: 18, lineHeight: '24px' }}>{rest.length > 1 ? `${lead}. ${rest[0]}.` : ans.text}</strong>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>{rest.length > 1 ? `${rest.slice(1).join('. ')} ` : ''}{ans.from}</span>
            <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Btn onClick={() => say('Ask opens with this answer in view.')}>Ask a follow-up</Btn>{ans.from.includes('rules') && <Btn onClick={() => go('LN6-TheGameItself')}>Rules for your age group</Btn>}</span>
          </section>}
          <section aria-label="In the library" style={{ ...tile, gap: 0, padding: '12px 18px 6px' }}>
            <h2 style={{ ...h2, paddingBottom: 6 }}>In the library</h2>
            {!q && <span style={{ ...cap, padding: '8px 0 12px', borderTop: `1px solid ${HAIR}` }}>Type a word in the search field, then press Enter.</span>}
            {q && hits.length === 0 && <span style={{ ...cap, padding: '8px 0 12px', borderTop: `1px solid ${HAIR}` }}>Nothing in the library matches “{q}”. We do not guess a rule: ask your club’s mentor, {x.mentor}.</span>}
            {hits.map(h => { const i = h.who === 'word' ? null : item(h.open)!; return (
              <button key={h.over + h.title} onClick={() => h.who === 'word' ? go('LN6w-AllWords') : h.title === 'What offside is' && h.who === 'coaches' ? go('LN6-TheGameItself') : openItem(i!)} style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%', minHeight: 74, padding: '6px 0', border: 0, borderTop: `1px solid ${HAIR}`, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
                <Thumb kind={i ? frameOf(i) : 'drawn'} len={h.len} />
                <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: MUT }}>{h.over}</span><strong style={{ fontSize: 15, lineHeight: '19px' }}>{h.title}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{h.who === 'coaches' && SUBS[h.title] && !h.sub.startsWith('Mentions') ? SUBS[h.title].replace('{age}', String(age)) : h.sub}</span></span>
                <span style={{ flex: 'none', width: 130, fontSize: 13, color: MUT }}>{h.len && h.who !== 'word' ? `${h.kind} · ${h.len}` : h.kind}</span><span style={{ flex: 'none' }}><Ico d="M9 6l6 6-6 6" size={14} sw={2.4} /></span>
              </button>) })}
          </section>
        </div>
        <div style={col}>
          <section aria-label="Narrow it" style={{ ...tile, gap: 8 }}>
            <h2 style={h2}>Narrow it</h2>
            {([['For', ['Coaches', 'Players']], ['Kind', ['Film', 'Read', 'Word', 'Rule']]] as [string, string[]][]).map(([g, opts]) => <div key={g} style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 6, borderTop: g === 'For' ? 0 : `1px solid ${HAIR}` }}><span style={label}>{g}</span><span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{opts.map(o => <button key={o} role="checkbox" aria-checked={!!nf[g]?.includes(o)} onClick={() => tog(g, o)} style={pill(!!nf[g]?.includes(o))}>{o}</button>)}</span></div>)}
          </section>
          <Note title="Search knows your team">Answers use your age group and your competition’s rules. Change team at the top and the answer changes.</Note>
          <Note title="When we don’t know">If the library has no answer, we say so and offer your club’s mentor. We do not guess a rule.</Note>
        </div>
      </Page>)
  }

  // ── EC8 · a read ───────────────────────────────────────────────────────────
  if (view === 'read') {
    const r = byTitle('What the warm-up study found', 'coaches')!, film = byTitle('The whole warm-up, start to finish', 'players')!, saved = lib.saved.includes(r.id)
    const added = !!c.reminders['ec:warmup'], at = tuesday.parts[0]?.at ?? ''
    const para = (a: string, children: ReactNode) => <p style={{ margin: 0, fontSize: 15, lineHeight: '23px' }}><strong>{a} </strong>{children}</p>
    return (
      <Page id="EC8-Read" title={r.title} sub="2-minute read · research in plain words" go={go} cols={PLAY}
        right={<><Seg mode="coaches" onMode={mode} /><Btn big aria-pressed={saved} onClick={() => { setLib(x.who, l => ({ saved: saved ? l.saved.filter(v => v !== r.id) : [...l.saved, r.id] })); say(saved ? 'Taken off your list.' : 'Saved to your list.') }}>{saved ? 'Saved' : 'Save'}</Btn><Btn big onClick={() => open(back === 'read' ? 'c' : back)}>Back</Btn></>}>
        <section aria-label="The read" style={{ ...tile, padding: '16px 24px 18px', gap: 12 }}>
          <strong style={{ fontSize: 18, lineHeight: '24px' }}>A warm-up made for children cut injuries by about half in a large trial.</strong>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10 }}>{[['3,895', 'children aged 7 to 13, in 243 teams'], ['48%', 'fewer injuries than a normal warm-up'], ['74%', 'fewer severe injuries']].map(([n, w]) => <span key={n} style={{ borderRadius: 12, background: PALE, padding: '8px 12px', display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 24, lineHeight: '30px', letterSpacing: '-0.01em' }}>{n}</strong><span style={{ fontSize: 13, lineHeight: '17px' }}>{w}</span></span>)}</div>
          {para('What they did.', <>Clubs in four European countries were split at random. Half swapped their usual warm-up for a set one of seven exercises, for a season. The rest carried on as normal. <Src n={1} onOpen={why} /></>)}
          {para('What they found.', <>Teams using the set warm-up had about half the injuries. The more often a team did it, the fewer injuries it had.</>)}
          {para('What it does not show.', <>It was run in Europe with coaches who were shown how. Nobody has tested it in Australian community clubs, or tested the short at-home version in this library.</>)}
          {para('What to do with it.', <>Start every session with the warm-up. The film shows every part, and it gets quicker once they know it.</>)}
        </section>
        <div style={col}>
          <section aria-label="Use it" style={pinned}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}><h2 style={h2}>Use it on {day}</h2>{at && <span style={chipS()}>{at}</span>}</span>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>Swap your arrival game for the warm-up this week. The film shows every part.</span>
            <span style={{ display: 'flex' }}><Btn primary aria-pressed={added} onClick={() => { setCoach(x.who, v => ({ reminders: { ...v.reminders, 'ec:warmup': `${at} · The warm-up, first` } })); say(`The warm-up is now the first part of ${day}’s session.`) }}>Add to {day}’s run sheet</Btn></span>
          </section>
          <section style={{ ...tile, padding: '4px 16px' }}><Row i={film} over="FILM · FOR PLAYERS AND COACHES" sub={film.shelf} onOpen={() => openItem(film)} /></section>
          <section aria-label="The source" style={tile}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><h2 style={h2}>The source</h2><button onClick={why} style={link}>All sources</button></span>
            <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>Rössler and colleagues (2018). A multinational cluster randomised controlled trial to assess the efficacy of “11+ Kids”. Sports Medicine, 48(6), 1493–1504. Free to read.</span>
          </section>
          <Note title="How these reads are written">One finding, the numbers, what it does not show, and one thing to do. Checked against the paper, never a summary of a summary.</Note>
        </div>
      </Page>)
  }

  // ── A coach's film, read, checklist or template that has no page of its own yet ──
  if (view.startsWith('f:')) {
    const i = item(view.slice(2)) as CItem, saved = lib.saved.includes(i.id), film = i.kind === 'Film' && i.secs
    return (
      <Page id={i.kind === 'Read' ? 'EC8-Read' : 'EC6f-Film'} title={i.title} sub={`${i.shelf} · ${lower(i.kind)} · ${i.length}`} go={go} cols={PLAY} smallSub
        right={<><Seg mode="coaches" onMode={mode} /><Btn big aria-pressed={saved} onClick={() => { setLib(x.who, l => ({ saved: saved ? l.saved.filter(v => v !== i.id) : [...l.saved, i.id] })); say(saved ? 'Taken off your list.' : 'Saved to your list.') }}>{saved ? 'Saved' : 'Save'}</Btn><Btn big onClick={() => open(back.startsWith('f:') ? 'c' : back)}>Back</Btn></>}>
        <div style={col}>
          {film ? <LearnPlayer key={i.id} chapters={[{ key: 'film', frame: 'figure', label: 'The film', short: 'Film', secs: i.secs!, lines: [i.title] }]} chips={[i.shelf, 'Film coming']} captions={captions} onCaptions={setCaptions} say={say} ratio="716 / 352"
            tryCard={{ heading: i.title, at: '', task: i.about + '.', button: 'Save', done: saved, onAdd: () => { setLib(x.who, l => ({ saved: l.saved.includes(i.id) ? l.saved : [...l.saved, i.id] })); say('Saved to your list.') } }} />
            : <Note title="Not written yet">This {lower(i.kind)} is planned and not written yet. It will open here when it is.</Note>}
        </div>
        <div style={col}><Note title={i.shelf}>{i.about}.</Note></div>
      </Page>)
  }

  // ── EC5 · make one from a clip ─────────────────────────────────────────────
  if (view === 'make') {
    const MOMENTS: [string, string, string, string, boolean][] = [['Poppy takes a player on', '0:10', 'Sunday · 22nd minute', 'Poppy', true], ['Ella: big touches into space', '0:09', 'Sunday · 9th minute', 'Ella', true], ['Jai cuts inside', '0:10', 'Sunday · 31st minute', 'Jai', false], ['Arlo: rolling it out', '0:08', 'Sunday · 40th minute', 'Arlo', true]]
    const [title, len, when, who, canCrop] = MOMENTS[moment], secs = Number(len.split(':')[1])
    const STEPS = ['Pick a moment', 'Trim it', 'Who is in it', 'Name it', 'Club check'], at = lib.clip === 'none' ? 2 : lib.clip === 'asked' ? 3 : 4
    const check = () => { if (!canCrop) { say(`This clip cannot be sent. Max’s family has said no to film being shared, and he is too close to ${who} to crop out. Pick another moment.`); return } setLib(x.who, { clip: 'checking' }); say('Sent to Rachel Moore. Nobody else sees it until she says yes.') }
    if (isNew) return (
      <Page id="EC5-MakeOne" title="Make one from a clip" sub="From your own film" go={go} cols={PLAY} right={<><Seg mode="players" onMode={mode} /><Btn big onClick={() => open('p')}>Cancel</Btn></>}>
        <div style={col}><Note title="From your own team">No clips yet. After your first filmed game, Clean Sheet suggests moments done well. You choose, the family says yes, and your club checks it.</Note></div>
        <div style={col}><Note title="Why only things done well">Children did better, and felt more capable, after watching their own best moments than their everyday ones. <Src n={3} onOpen={why} /></Note><Note title="Nobody is shown without a yes">A child whose family has said no is never in a clip, even in the background.</Note></div>
      </Page>)
    return (
      <Page id="EC5-MakeOne" title="Make one from a clip" sub="From Sunday’s film" go={go} cols={PLAY}
        right={<><Seg mode="players" onMode={mode} /><Btn big onClick={() => open('p')}>Cancel</Btn><Btn primary big onClick={check}>Send to Rachel to check</Btn></>}>
        <ol aria-label="Steps" style={{ gridColumn: '1 / -1', listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 8 }}>{STEPS.map((st, n) => <li key={st} aria-current={n === at ? 'step' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 40, padding: '0 12px', borderRadius: 10, border: n === at ? 0 : `1px solid ${LINE}`, background: n === at ? INK : '#fff', color: n === at ? '#fff' : INK, fontSize: 14, fontWeight: 700 }}>{n < at ? <Tick /> : <span style={{ flex: 'none', width: 20, height: 20, borderRadius: 999, background: n === at ? '#fff' : PALE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{n + 1}</span>}{st}</li>)}</ol>
        <div style={col}>
          <LearnPlayer key={moment} chapters={[{ key: 'kept', frame: 'team', label: 'Kept', short: 'Kept', secs, lines: [title] }]} chips={[when.replace(' · ', ', '), 'Trimmed from 0:31']} captions={captions} onCaptions={setCaptions} say={say} ratio="716 / 352"
            tryCard={{ heading: title, at: '', task: 'Before it goes anywhere, the family is asked again and your club checks it.', button: 'Send to Rachel to check', done: lib.clip === 'checking', onAdd: check }} />
          <section aria-label="Clean Sheet found these, done well" style={{ ...tile, gap: 10 }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}><h2 style={h2}>Clean Sheet found these, done well</h2><span style={chipS()}>From film · Strong</span></span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>{MOMENTS.map(([mt, ml, mw], n) => <button key={mt} aria-pressed={n === moment} onClick={() => { setMoment(n); say(n === moment ? 'This one is picked.' : 'Swapped to this clip.') }} style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><Thumb kind="team" len={ml} wide /><strong style={{ fontSize: 14, lineHeight: '18px', marginTop: 3 }}>{mt}</strong><span style={{ fontSize: 12, color: MUT }}>{mw}</span>{n === moment && <span style={{ fontSize: 12, fontWeight: 700, color: G }}>Picked</span>}</button>)}</div>
          </section>
        </div>
        <div style={col}>
          <section aria-label="Who is in it" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
            <h2 style={{ ...h2, paddingBottom: 8 }}>Who is in it</h2>
            <Line a={who} b={`${who === 'Poppy' || who === 'Ella' ? 'Her' : 'His'} family has said yes to club examples`} />
            {canCrop ? <Line ok={false} a="Max, in the background" b="His family has said no to film being shared. We have cropped him out" /> : <Line ok={false} a={`Max, next to ${who}`} b="His family has said no to film being shared. He cannot be cropped out, so this clip cannot be used" />}
            <Line a="The other team" b="Faces are too small to recognise at this crop" />
          </section>
          <section aria-label="Before it goes anywhere" style={pinned}>
            <h2 style={h2}>Before it goes anywhere</h2>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>{who}’s family is asked again for this clip. Then Rachel checks it. Only then can your team see it, and the club only if Rachel shares it.</span>
            <span style={{ display: 'flex' }}><Btn primary disabled={!canCrop} aria-pressed={lib.clip !== 'none'} onClick={() => { setLib(x.who, { clip: 'asked' }); say('Asked. Dana gets the clip and two buttons: yes for the team, or no.') }}>Ask {who}’s family</Btn></span>
          </section>
          <Note title="Why only things done well">Children did better, and felt more capable, after watching their own best moments than their everyday ones. <Src n={3} onOpen={why} /></Note>
          <Note title="Nobody is shown without a yes">A child whose family has said no is never in a clip, even in the background.</Note>
        </div>
      </Page>)
  }

  // ── EC4 · this term, in order ──────────────────────────────────────────────
  if (view === 'list') {
    const THEMES: [string, string, string][] = [['Running with the ball', 'This fortnight', 'Running with the ball'], ['First touch', 'Next fortnight · your sessions have done it least', 'First touch'], ['Having a shot', 'Later this term', 'Striking the ball']]
    const order = lib.order.map(id => item(id) as PItem).filter(Boolean)
    const rows = theme === 0 && order.length ? order : P.filter(i => i.shelf === THEMES[theme][2]).slice(0, theme === 0 ? 4 : 3)
    const sentOf = (n: number) => (n === 0 && order.length ? order : P.filter(i => i.shelf === THEMES[n][2]).slice(0, n === 0 ? 4 : 3)).filter(i => lib.sent[i.id] !== undefined).length
    const move = (n: number, d: number) => { const o = [...lib.order], j = n + d; if (j < 0 || j >= o.length) return; [o[n], o[j]] = [o[j], o[n]]; setLib(x.who, { order: o }); say(`${item(o[j])!.title}: moved ${d < 0 ? 'up' : 'down'}.`) }
    const arrow: React.CSSProperties = { width: 44, height: 44, border: 0, background: 'none', color: MUT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }
    return (
      <Page id="EC4-Playlist" title="This term, in order" sub="A theme each fortnight for your players" go={go} cols={PLAY}
        right={<><Seg mode="players" onMode={mode} /><Btn big onClick={() => { setLib(x.who, { order: P.filter(i => i.shelf === THEMES[0][2]).slice(0, 4).map(i => i.id) }); say('Lined up from your last six sessions and the curriculum for this age. Change anything you like.') }}>Let Clean Sheet line it up</Btn><Btn primary big onClick={() => say(`Saved. ${families === 'families' ? 'Families' : 'Players'} get the next one on Friday at 4 pm.`)}>Save</Btn></>}>
        <div style={col}>
          <section aria-label="This fortnight" style={{ ...tile, gap: 0, padding: '12px 18px 14px' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingBottom: 8 }}><h2 style={h2}>{THEMES[theme][0]} · {lower(THEMES[theme][1].split(' · ')[0])}</h2>{theme === 0 && <span style={chipS(false)}>Move to reorder</span>}</span>
            {rows.map((i, n) => { const got = lib.sent[i.id]; return (
              <div key={i.id} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 70, borderTop: `1px solid ${HAIR}` }}>
                {theme === 0 && order.length > 0 && <span style={{ flex: 'none', display: 'flex' }}><button aria-label={`Move ${i.title} up`} disabled={n === 0} onClick={() => move(n, -1)} style={{ ...arrow, opacity: n === 0 ? 0.3 : 1 }}><Ico d="M6 15l6-6 6 6" size={16} sw={2.4} /></button><button aria-label={`Move ${i.title} down`} disabled={n === rows.length - 1} onClick={() => move(n, 1)} style={{ ...arrow, opacity: n === rows.length - 1 ? 0.3 : 1 }}><Ico d="M6 9l6 6 6-6" size={16} sw={2.4} /></button></span>}
                <button onClick={() => openItem(i)} style={{ flexGrow: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
                  <span style={{ flex: 'none', width: 96 }}><Thumb kind={frameOf(i)} len={i.length} wide /></span>
                  <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '19px' }}>{i.title}</strong><span style={{ fontSize: 13, color: MUT }}>{i.club ? 'Clip from your team' : i.kind} · {lower(i.you_need)}</span></span>
                </button>
                <span style={{ flex: 'none', width: 130, fontSize: 13, color: MUT }}>{theme === 0 ? (got !== undefined ? `Sent ${SLOTS[n]?.split(',')[0] ?? ''}` : SLOTS[n] ?? 'Later') : 'Not lined up yet'}</span>
                <span style={chipS(got !== undefined)}>{got !== undefined ? `Sent · ${lib.watched[i.id] ?? 0} watched` : 'Lined up'}</span>
              </div>) })}
            <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12, borderTop: `1px solid ${HAIR}` }}><Btn onClick={() => open('pc', 'list')}>Add from the library</Btn><Btn onClick={() => open('make', 'list')}>Make one from a clip</Btn></span>
          </section>
          <Note title="Two a week, at most">A family gets at most two clips a week, each with one game, and one reminder. Never more.</Note>
        </div>
        <div style={col}>
          <section aria-label="Term 2" style={{ ...tile, gap: 8 }}>
            <h2 style={h2}>Term 2</h2>
            {THEMES.map(([name, when], n) => <button key={name} aria-pressed={theme === n} onClick={() => { setTheme(n); say(`${name} opens on the right.`) }} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, padding: '8px 10px', borderRadius: 12, border: theme === n ? `2px solid ${INK}` : `1px solid ${HAIR}`, background: theme === n ? PALE : '#fff', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, border: `1px solid ${INK}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{n + 1}</span>
              <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '19px' }}>{name}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{when}</span></span>
              <span style={{ flex: 'none', fontSize: 13, color: MUT }}>{sentOf(n)} of {n === 0 ? rows.length && theme === 0 ? rows.length : 4 : 3} sent</span>
            </button>)}
          </section>
          <section aria-label="Why this order" style={tile}>
            <h2 style={h2}>Why this order</h2>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>It follows what you are coaching, so home and training say the same thing. First touch is next because your last six sessions have covered it least.</span>
            <span style={{ display: 'flex' }}><Btn onClick={() => go('GS7-SeasonLookBack')}>See your season so far</Btn></span>
          </section>
          <Note title="Play, not homework">The home part is always a game. Players who went furthest played a lot of football for fun as children. <Src n={6} onOpen={why} /></Note>
        </div>
      </Page>)
  }

  // ── EC3 · one clip for players ─────────────────────────────────────────────
  if (view.startsWith('i:')) {
    const i = item(view.slice(2)) as PItem, ivy = sample && (i.title === EYES || i.title === IVY), game = HOME_GAME[ivy ? EYES : i.title], cue = game?.cue ?? i.title
    const got = lib.sent[i.id] ?? 0, left = fam - got, may = maySend(i, age), shelf = P.filter(v => v.shelf === i.shelf), next = shelf[(shelf.findIndex(v => v.id === i.id) + 1) % shelf.length]
    const main = tuesday.parts[2] ?? tuesday.parts[tuesday.parts.length - 1], goes = sample && i.shelf === 'Running with the ball'
    return (
      <Page id="EC3-Item" title={ivy ? EYES : i.title} sub={`${i.shelf} · ${lower(i.kind)} · ${i.length} · ${lower(i.you_need)} · ${agesWord(i)}`} go={go} cols={PLAY} smallSub
        right={<><Seg mode="players" onMode={mode} /><Btn big onClick={() => open(back.startsWith('i:') ? 'p' : back)}>Back</Btn></>}>
        <div style={col}>
          <LearnPlayer key={i.id} tryLabel="Have a go" chapters={clipChapters(i, false, cue).map(ch => ivy ? { ...ch, frame: 'team' as const } : ch)} chips={[ivy ? 'Ivy, your team · v Glenview Park' : i.club ? 'From your own team' : 'From Clean Sheet’s library']} captions={captions} onCaptions={setCaptions} say={say} ratio="716 / 352"
            tryCard={{ heading: 'Have a go at home', at: '', task: game ? game.steps.join(' ') : i.title, button: left > 0 && may ? `Send to the other ${left}` : `All ${fam} have it`, done: left <= 0, onAdd: () => send(i, true) }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: 12 }}>
            <section aria-label="Have a go at home" style={{ ...tile, gap: 6 }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}><h2 style={h2}>Have a go at home</h2><button onClick={() => say(`Three other home games for ${lower(i.shelf)}. Pick one and it goes with the clip.`)} style={link}>Change the game</button></span>
              {game ? <><ol style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 14, lineHeight: '21px' }}>{game.steps.map((st, n) => <li key={st}><strong>{n + 1}.</strong> {st}</li>)}</ol><span style={{ fontSize: 12, color: MUT }}>{game.need}</span></> : <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>The home game for this one is not written yet. You need: {lower(i.you_need)}.</span>}
            </section>
            <section aria-label="Why it is made this way" style={{ ...tile, gap: 6 }}>
              <h2 style={h2}>Why it is made this way</h2>
              <span style={{ fontSize: 14, lineHeight: '20px' }}>A child their own age, not a star: children believe “I can do that” more after watching a peer. <Src n={2} onOpen={why} /></span>
              <span style={{ fontSize: 14, lineHeight: '20px' }}>Only something done well is shown. <Src n={3} onOpen={why} /></span>
              <span style={{ fontSize: 14, lineHeight: '20px' }}>The cue is about where to look, not how to move a leg. <Src n={5} onOpen={why} /></span>
            </section>
          </div>
        </div>
        <div style={col}>
          <section aria-label="Send to families" style={pinned}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}><h2 style={h2}>Send to {families}</h2>{may && <span style={chipS()}>{got} of {fam} have it</span>}</span>
            {!may ? <span style={{ fontSize: 14, lineHeight: '20px' }}>{i.lo >= 13 ? 'For 13 and over. Not sent to under-12 families.' : 'Heading clips stay off under 12 at your club.'}</span> : <>
              <span style={{ fontSize: 14, lineHeight: '20px' }}>{left > 0 ? `The other ${left} get the clip, the three steps and one reminder, no more.` : `All ${fam} have the clip, the three steps and one reminder, no more.`}</span>
              <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Btn primary disabled={left <= 0} onClick={() => send(i, true)}>{left > 0 ? `Send to the other ${left}` : `All ${fam} have it`}</Btn><Btn disabled={left <= 0} aria-pressed={!!lib.later[i.id]} onClick={() => { setLib(x.who, l => ({ later: { ...l.later, [i.id]: 'Lined up for Friday at 4 pm' } })); say('Lined up for Friday at 4 pm.') }}>Send on Friday at 4</Btn></span></>}
          </section>
          {goes && <section aria-label="Goes with" style={{ ...tile, gap: 2 }}>
            <h2 style={h2}>Goes with</h2>
            <button onClick={() => go('GS1-ProposedSession')} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>{day}’s session</strong><span style={{ fontSize: 13, color: MUT }}>Main game: {main ? lower(main.drill.name) : 'running with the ball through the gates'}</span></span><Ico d="M9 6l6 6-6 6" size={14} sw={2.4} /></button>
          </section>}
          {ivy && <section aria-label="Who is in it" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
            <h2 style={{ ...h2, paddingBottom: 8 }}>Who is in it</h2>
            <Line a="Ivy" b="Her family said yes on 2 June, for the club to see" /><Line a="Nobody else can be recognised" b="Leo and Arlo are cropped out" /><Line a="Checked by Rachel Moore" b="4 June" />
          </section>}
          {next && next.id !== i.id && <section style={{ ...tile, padding: '4px 16px' }}><Row i={next} over={`UP NEXT · ${i.shelf.toUpperCase()}`} sub={`${next.kind} · ${lower(next.you_need)}`} onOpen={() => open(`i:${next.id}`)} /></section>}
        </div>
      </Page>)
  }

  // ── EC2 and EC7 · the whole catalogue, in shelves, with filters ────────────
  if (view === 'pc' || view === 'cc') {
    const players = view === 'pc', f = players ? pf : cf, setF = players ? setPf : setCf, groups = players ? P_FILTERS : C_FILTERS
    const pool: Item[] = players ? P : C, hit = pool.filter(i => i.for === 'players' ? matchP(i, f) : matchC(i, f, lib))
    const on = Object.values(f).flat(), quoted = on.map(v => `“${v}”`), names = quoted.length > 1 ? `${quoted.slice(0, -1).join(', ')} and ${quoted[quoted.length - 1]}` : quoted[0]
    const shelves = players ? [...PLAYER_SHELVES.filter(sh => sh === 'From your own team'), ...PLAYER_SHELVES.filter(sh => sh !== 'From your own team')] : [...COACH_SHELVES.filter(sh => sh.shelf === 'From your club'), ...COACH_SHELVES.filter(sh => sh.shelf !== 'From your club')].map(sh => sh.shelf)
    const tog = (g: string, v: string) => { const has = f[g]?.includes(v); setF({ ...f, [g]: has ? f[g].filter(o => o !== v) : [...(f[g] ?? []), v] }); say(`${v}: ${has ? 'removed' : 'added'}. The shelves update.`) }
    const total = players ? P.length : C.length
    return (
      <Page id={players ? 'EC2-PlayersCatalogue' : 'EC7-CoachCatalogue'} title="Education centre" smallSub go={go} cols="252px minmax(0,1fr)"
        sub={on.length ? `${players ? 'For your players' : 'For coaches'} · ${hit.length} of ${total} match ${names}` : players ? `For your players · ${total} clips, games and explainers` : `For coaches · ${total} films, reads, checklists and templates`}
        right={head(players ? 'players' : 'coaches')}>
        <section aria-label="Show me" style={{ ...tile, gap: 0, padding: '12px 16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><h2 style={h2}>Show me</h2><button onClick={() => { setF({}); say('Filters cleared.') }} style={link}>Clear</button></span>
          {groups.map(([g, opts]) => <div key={g} role="group" aria-label={g} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 0 12px', borderTop: `1px solid ${HAIR}` }}><span style={label}>{g}</span><span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{opts.map(o => <button key={o} role="checkbox" aria-checked={!!f[g]?.includes(o)} onClick={() => tog(g, o)} style={pill(!!f[g]?.includes(o))}>{o}</button>)}</span></div>)}
          <span style={{ fontSize: 12, lineHeight: '18px', color: MUT, paddingTop: 10, borderTop: `1px solid ${HAIR}` }}>{players ? `Your team is ${x.age === 'seniors' ? 'seniors' : `under ${age}`}, so “${bandOf(Math.min(age - 1, 13))}” starts switched on. Clips marked 13 and over are never sent to under-12 families.` : `Your team is ${x.age === 'seniors' ? 'seniors' : `under ${age}`}, so that age group starts switched on. Only you see what you open.`}</span>
        </section>
        <div style={{ ...col, gap: 18 }}>
          {hit.length === 0 && <Note title="Nothing matches">No {players ? 'clip, game or explainer' : 'film, read, checklist or template'} matches all of those. Take one off, or clear them.</Note>}
          {shelves.map(sh => { const its = hit.filter(i => i.shelf === sh), all = pool.filter(i => i.shelf === sh).length; if (!its.length) return null; const about = players ? undefined : COACH_SHELVES.find(v => v.shelf === sh)!.about; return (
            <Shelf key={sh} title={sh} about={about} n={all} cols={4} onAll={() => { setWide(wide === sh ? null : sh); say(wide === sh ? `${sh}: the first four.` : `All of ${sh}.`) }}>
              {(wide === sh ? its : its.slice(0, 4)).map(i => { const [note, strong] = i.for === 'players' ? pNote(i) : lib.saved.includes(i.id) ? ['Saved', true] : []; return <Card key={i.id} i={i} sub={i.for === 'players' ? pSub(i) : cSub(i)} note={note as string | undefined} strong={!!strong} onOpen={() => openItem(i)} /> })}
            </Shelf>) })}
        </div>
      </Page>)
  }

  // ── EC6 · for coaches ──────────────────────────────────────────────────────
  if (view === 'c') {
    const clubShelf = C.filter(i => i.shelf === 'From your club'), films = clubShelf.filter(i => i.kind === 'Film' && !lib.notUseful.includes(i.id))
    const picked = !isNew, hero = (picked && sample ? films.find(i => i.title === 'Coaching playing out from the keeper') : undefined) ?? films.find(i => !lib.opened.includes(i.id)) ?? films[0] ?? C.find(i => i.kind === 'Film')!
    const board = sample && hero.title === 'Coaching playing out from the keeper', saved = lib.saved.includes(hero.id), now = nextLesson(c)
    const reason = board ? `Your team lost the ball 6 times playing out from the keeper, and ${day}’s session works on it. This film shows a coach at your club doing exactly that.` : `${tuesday.headline} ${day}’s session works on it. This film is from a coach at your club.`
    const list = lib.saved.map(id => item(id)).filter((i): i is Item => !!i && seen(i))
    const chapters: Chapter[] = hero.lesson ? chaptersFor(hero.lesson, x.hasFilm) : [{ key: 'film', frame: 'figure', label: 'The film', short: 'Film', secs: hero.secs ?? 120, lines: [board ? '“Keeper, who is free?”' : hero.title] }, ...(picked && (sample || x.hasFilm) ? [{ key: 'team', frame: 'team' as const, label: 'Your team', short: 'Your team', secs: 11, lines: [board ? 'Sunday: the ball lost playing out from the keeper.' : 'From your last game.'] }] : [])]
    return (
      <Page id="EC6-CoachesHome" title="Education centre" sub={`For coaches · ${C.length} films, reads, checklists and templates`} go={go} cols={PLAY} right={head('coaches')}>
        <div style={{ ...col, gap: 8 }}>
          <LearnPlayer key={hero.id} chapters={chapters} chips={[picked ? 'Picked for you · from your club' : 'New from your club', ...(hero.lesson ? [] : ['Film coming'])]} captions={captions} onCaptions={setCaptions} say={say} ratio="716 / 352"
            tryCard={{ heading: `Try it on ${day}`, at: '', task: picked ? reason : hero.about + '.', button: picked ? `Open ${day}’s session` : 'Save', done: false, onAdd: () => picked ? go('GS1-ProposedSession') : (setLib(x.who, l => ({ saved: l.saved.includes(hero.id) ? l.saved : [...l.saved, hero.id] })), say('Saved to your list.')) }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 19, lineHeight: '25px', letterSpacing: '-0.01em' }}>{hero.title}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{board ? 'Rachel Moore with U11 Luke · Wattle Creek · film · 3:10' : `${hero.about} · ${lower(hero.kind)} · ${hero.length}`}</span></span>
            <Btn big aria-pressed={saved} onClick={() => { setLib(x.who, l => ({ saved: saved ? l.saved.filter(v => v !== hero.id) : [...l.saved, hero.id] })); say(saved ? 'Taken off your list.' : 'Saved to your list.') }}>{saved ? 'Saved' : 'Save'}</Btn>
          </div>
        </div>
        <div style={col}>
          <section aria-label="Why this one" style={pinned}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}><h2 style={h2}>{picked ? 'Why this one' : 'New from your club'}</h2>{picked && <span style={chipS()}>From Sunday</span>}</span>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>{picked ? reason : `${hero.about}. After your first filmed game, the film here is picked from what your next session works on.`}</span>
            <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{picked && <Btn primary onClick={() => go('GS1-ProposedSession')}>Open {day}’s session</Btn>}<Btn onClick={() => { setLib(x.who, l => ({ notUseful: [...l.notUseful, hero.id] })); say('Thanks. You will see fewer like this.') }}>Not useful</Btn></span>
          </section>
          <section aria-label="Carry on" style={{ ...tile, gap: 0, padding: '10px 16px 2px' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><h2 style={h2}>Carry on</h2><button onClick={() => { setCf({ 'Your list': ['Saved'] }); open('cc', 'c') }} style={link}>Your list · {list.length}</button></span>
            {now && <button onClick={() => go(now.screen)} style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%', minHeight: 84, padding: '7px 0', border: 0, borderTop: `1px solid ${HAIR}`, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><Thumb kind="drawn" len={sample && now.id === '4.2' ? '1:12 left' : `${now.minutes} min`} /><span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: MUT }}>LEARN TO COACH · {now.id}</span><strong style={{ fontSize: 14, lineHeight: '18px' }}>{now.title}</strong><span style={{ fontSize: 12, color: MUT }}>{sample && now.id === '4.2' ? 'You were here on Sunday' : 'This week’s lesson'}</span></span></button>}
            {list.slice(0, now ? 1 : 2).map(i => <Row key={i.id} i={i} over={`SAVED · ${i.kind.toUpperCase()}`} sub={i.shelf} onOpen={() => openItem(i)} />)}
          </section>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
            <Shelf title="From your club" about="Made by coaches at Wattle Creek" n={clubShelf.length} cols={5} onAll={() => open('cc', 'c')}>{clubShelf.slice(0, 5).map(i => <Card key={i.id} i={i} sub={cSub(i)} onOpen={() => openItem(i)} />)}</Shelf>
        </div>
      </Page>)
  }

  // ── EC1 and EC1e · for players ─────────────────────────────────────────────
  const empty = view === 'pe' || !sample, themeName = sample && !empty ? 'Running with the ball' : 'First touch'
  const shelf = P.filter(i => i.shelf === themeName), hero = (empty ? shelf[0] : P.find(i => i.title === IVY)) ?? P[0], lib2 = P.find(i => i.title === EYES)
  const got = lib.sent[hero.id] ?? 0, left = fam - got, did = lib.did[hero.id] ?? 0, watched = lib.watched[hero.id] ?? 0, cue = empty ? hero.title : HOME_GAME[EYES].cue
  return (
    <Page id={empty ? 'EC1e-PlayersHomeEmpty' : 'EC1-PlayersHome'} title="Education centre" sub={empty && got === 0 ? 'For your players · your library is ready, nothing sent yet' : `For your players · ${P.length} clips, games and explainers`} go={go} cols={PLAY} right={head('players')}>
      <div style={{ ...col, gap: 8 }}>
        <LearnPlayer key={hero.id} tryLabel="Have a go" chapters={clipChapters(hero, !empty, cue)} chips={[`This fortnight · ${lower(themeName)}`]} captions={captions} onCaptions={setCaptions} say={say} ratio="716 / 352"
          tryCard={{ heading: 'Have a go at home', at: '', task: empty ? hero.title : HOME_GAME[EYES].steps.join(' '), button: left > 0 ? (got ? `Send to the other ${left}` : `Send this one to ${fam} ${families}`) : `All ${fam} have it`, done: left <= 0, onAdd: () => send(hero) }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 19, lineHeight: '25px', letterSpacing: '-0.01em' }}>{empty ? hero.title : 'Ivy keeps her eyes up while she dribbles'}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{empty ? `From Clean Sheet’s library · ${hero.kind} · ${lower(hero.you_need)} · ${agesWord(hero)}` : 'Your team, v Glenview Park · nine seconds every child can copy · her family said yes'}</span></span>
          <Btn big onClick={() => open(`i:${(empty ? hero : lib2 ?? hero).id}`, view)}>Open it</Btn>
        </div>
      </div>
      <div style={col}>
        <section aria-label="Send to families" style={pinned}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}><h2 style={h2}>{got === 0 ? 'Nothing sent yet' : `Send to ${families}`}</h2>{got > 0 && <span style={chipS()}>{got} of {fam} have it</span>}</span>
          <span style={{ fontSize: 14, lineHeight: '20px' }}>{got === 0 ? `Pick a theme for the fortnight. ${families === 'families' ? 'Families' : 'Players'} get its clips one at a time, each with one game to play at home.` : sendWord}</span>
          <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Btn primary disabled={left <= 0} onClick={() => send(hero)}>{left <= 0 ? `All ${fam} have it` : got ? `Send to the other ${left}` : `Send this one to ${fam} ${families}`}</Btn>{got === 0 ? <Btn onClick={() => open('pc', view)}>Pick another</Btn> : <Btn onClick={() => open(`i:${(lib2 ?? hero).id}`, view)}>Change the game</Btn>}</span>
        </section>
        {empty && got === 0 ? <section aria-label="From your own team" style={tile}>
          <h2 style={h2}>From your own team</h2>
          <span style={{ fontSize: 14, lineHeight: '20px' }}>No clips yet. After your first filmed game, Clean Sheet suggests moments done well. You choose, the family says yes, and your club checks it.</span>
          <span style={{ display: 'flex' }}><Btn onClick={() => open('make', view)}>How club clips work</Btn></span>
        </section> : <section aria-label="Your families this fortnight" style={{ ...tile, gap: 6 }}>
          <h2 style={h2}>Your {families} this fortnight</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{[[watched, `watched “${hero.title === IVY ? 'Eyes up' : hero.title}”`], [did, 'played the game at home']].map(([n, w]) => <span key={String(w)} style={{ display: 'flex', flexDirection: 'column' }}><span><strong style={{ fontSize: 26, lineHeight: '30px', letterSpacing: '-0.02em' }}>{n}</strong> <span style={{ fontSize: 14 }}>of {fam}</span></span><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{w}</span></span>)}</div>
          <span style={{ fontSize: 12, color: MUT }}>Counts only. Nobody is ranked, and no family sees another’s.</span>
        </section>}
        <button onClick={() => open('list', view)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '6px 14px', borderRadius: 12, border: 0, background: PALE, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14 }}>This term, in order</strong><span style={{ fontSize: 13, color: MUT }}>{themeName} · {lib.order.filter(id => lib.sent[id] !== undefined).length} of {Math.max(4, lib.order.length)} sent</span></span><Ico d="M9 6l6 6-6 6" size={14} sw={2.4} /></button>
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <Shelf title={themeName} n={shelf.length} cols={5} onAll={() => { setPf({ Skill: [themeName] }); open('pc', view) }}>{shelf.slice(0, 5).map(i => { const [note, strong] = pNote(i); return <Card key={i.id} i={i} sub={pSub(i)} note={note} strong={!!strong} onOpen={() => openItem(i)} /> })}</Shelf>
      </div>
    </Page>)
}

// ── EC11 · the research behind the library, and where it stops ───────────────
const WORKS: [string, string, string, string][] = [
  ['A warm-up shelf for ages 7 to 13, and the warm-up first in every session.', 'In a randomised trial with 3,895 children in 243 teams, a set warm-up cut injuries by 48% and severe injuries by 74% over a season. Teams that did it more often had fewer injuries.', 'Run in four European countries with coaches who were shown how. Not tested in Australian community clubs, or as a short at-home version.', 'Rössler, Junge, Bizzini, Verhagen, Chomiak, aus der Fünten, Meyer, Dvorak, Lichtenstein, Beaudouin & Faude (2018). Sports Medicine, 48(6), 1493–1504.'],
  ['Clips show children the viewer’s own age, including their own team-mates.', 'Children who watched another child learn a skill ended up more confident and more skilled than children who watched a teacher. A child seen improving step by step helped most.', 'School maths lessons in the 1980s, not sport.', 'Schunk & Hanson (1985). Journal of Educational Psychology, 77(3), 313–322. Schunk, Hanson & Cox (1987). Journal of Educational Psychology, 79(1), 54–61.'],
  ['Club examples are only ever something done well.', 'Children shown their own best performance swam better and felt more capable than children shown their ordinary performance. A wider review finds watching a model helps people learn movement skills.', 'The swimming study had 33 children. Most studies in the review are short and lab-based.', 'Clark & Ste-Marie (2007). Journal of Sports Sciences, 25(5), 577–586. Ste-Marie and colleagues (2012). International Review of Sport and Exercise Psychology, 5(2), 145–176.'],
  ['Player clips are seconds long, coach films under about three minutes, filmed on real pitches.', 'Across 6.9 million viewing sessions, shorter videos held attention far better, with a sharp drop after six minutes. Informal films did as well as studio ones or better.', 'Adults taking online university courses, not children or coaches.', 'Guo, Kim & Rubin (2014). Proceedings of the First ACM Conference on Learning at Scale, 41–50.'],
  ['The words on each clip point at the ball, the space or a target, not at a body part.', 'Reviews and a meta-analysis find people learn movement skills better when told to focus on the effect of the movement than on their own body, at any age and level.', 'Many small studies. Few are of young children playing team sport.', 'Wulf (2013). International Review of Sport and Exercise Psychology, 6(1), 77–104. Chua, Jimenez-Diaz, Lewthwaite, Kim & Wulf (2021). Psychological Bulletin, 147(6), 618–645.'],
  ['The home part is always a game, never a drill, and there are no streaks.', 'Among elite English youth players, those who went on to turn professional had spent more hours a year playing football for fun between 6 and 12. Coached practice did not separate them.', 'Players recalling their childhoods. Elite boys, not community players. A link, not proof of cause.', 'Ford, Ward, Hodges & Williams (2009). High Ability Studies, 20(1), 65–75.'],
  ['Shelves follow the four core skills and the age phases your federation uses.', 'First touch, running with the ball, 1 v 1 and striking the ball are the core skills for under 10 to 13.', 'A curriculum, not a research finding.', 'Football Federation Australia. The National Football Curriculum.'],
]
function WhatWorks({ go, right }: { go: (id: string) => void; right: ReactNode }) {
  return (
    <Page id="EC11-WhatWorks" title="What works, and why" sub="The research behind the Education centre, and where it stops" go={go} cols="minmax(0,1fr) 348px" right={right} smallSub>
      <div style={col}>
        <h2 style={h2}>What we lean on</h2>
        {WORKS.map(([does, found, limit, ref], n) => <section key={ref} id={`ec-source-${n + 1}`} style={{ ...tile, padding: '12px 16px', gap: 6 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}><span style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{n + 1}</span><span><span style={label}>What the course does</span><strong style={{ display: 'block', fontSize: 15, lineHeight: '21px' }}>{does}</strong></span></div>
          <span style={{ fontSize: 14, lineHeight: '20px' }}>{found}</span>
          <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}><strong style={{ color: INK }}>Limit: </strong>{limit}</span>
          <span style={{ fontSize: 12, lineHeight: '17px', color: MUT }}>{ref}</span>
        </section>)}
      </div>
      <div style={col}>
        <Note title="What is ours, not research">A theme each fortnight, two clips a week at most, the shelf names, counts without names, and a club check on every club clip are our choices.</Note>
        <Note title="What we don’t know yet">Whether families use it, and whether children who do improve faster. We will measure both in the first clubs and publish it here.</Note>
        <Note title="Health topics">“Looking after yourself” is written with a sports doctor and follows national guidance. It does not give medical advice.</Note>
      </div>
    </Page>)
}
