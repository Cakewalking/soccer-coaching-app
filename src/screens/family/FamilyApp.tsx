// Clean Sheet Family (family-app-v2), on a phone. A parent films a game; credits pay for finding their own child's
// moments. It works whether or not the club uses Clean Sheet, and a parent's own filming is private to the family
// for ever: no control here sends a game, a clip or a count to a club, a coach or another family.
// A demo of the flows on sample data. Nothing analyses real film; the purchase and the share sheet are stubs.

import { useEffect, useState, type ReactNode } from 'react'
import { useBackState } from '../../backState'
import { openScreen } from '../openThing'
import { G, INK, MUT, LINE, PALE } from '../capture/marks'
import LearnPlayer, { Thumb } from '../learn/LearnPlayer'
import EducationPhone from '../learn/EducationPhone'
import { FILMS, OFFER_AT, PACKS, RATES, SHOW_COUNT_AT, aboutGames, ageOf, film, finish, freshFamily, preset, quote, readable, setFamily, showsCounts, spend, useFamily, type Game } from './familyStore'

const HAIR = '#e9eae8'
const phone: React.CSSProperties = { width: 390, minHeight: 844, margin: '0 auto', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column', position: 'relative' }
const card: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }
const round: React.CSSProperties = { flex: 'none', width: 44, height: 44, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, boxSizing: 'border-box' }
const btn = (primary: boolean, off = false): React.CSSProperties => ({ flex: 1, minHeight: 50, padding: '0 12px', borderRadius: 12, border: primary ? 0 : `1px solid ${LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: off ? 'not-allowed' : 'pointer', opacity: off ? 0.5 : 1 })
const link: React.CSSProperties = { minHeight: 44, border: 0, background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: G, cursor: 'pointer', whiteSpace: 'nowrap' }
const svg = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
const I = ({ d, size = 20 }: { d: string; size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" {...svg}><path d={d} /></svg>
const TICK = 'M5 12l5 5 9-10', CHEV = 'M9 6l6 6-6 6', SHIELD = 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', LOCK = 'M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z'
const TABS: [string, string, string][] = [['Home', 'M4 11l8-7 8 7v9H4z', 'home'], ['Games', 'M3 7h12v10H3zM15 10l6-3v10l-6-3', 'games'], ['Learn', 'M5 4h14v16H5zM9 4v16', 'learn'], ['Club', SHIELD, 'club']]
const Dot = ({ ok = true }: { ok?: boolean }) => <span style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, boxSizing: 'border-box', background: ok ? G : '#fff', border: ok ? 0 : `1.5px solid ${INK}`, color: ok ? '#fff' : INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="13" height="13" viewBox="0 0 24 24" {...svg} strokeWidth={3}><path d={ok ? TICK : 'M7 7l10 10M17 7L7 17'} /></svg></span>
const Line = ({ a, b, ok = true, top = true }: { a: string; b?: string; ok?: boolean; top?: boolean }) => <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '9px 0', borderTop: top ? `1px solid ${LINE}` : 0 }}><Dot ok={ok} /><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{a}</strong>{b && <span style={{ fontSize: 14, lineHeight: '19px', color: MUT }}>{b}</span>}</span></div>
const secs = (len: string) => { const [m, s] = len.split(':').map(Number); return m * 60 + s }
const COLOURS = ['Red', 'Blue', 'Green', 'Yellow', 'White', 'Black'], HEX: Record<string, string> = { Red: '#c0392b', Blue: '#2f5d9b', Green: '#2f6252', Yellow: '#e2c044', White: '#ffffff', Black: '#10211f' }
const LIBRARY: Record<string, [string, string, string][]> = {
  'Free: play at home': [['2:00', 'Wall ball to 20', 'Game · ball and wall'], ['0:08', 'The drag-back', 'Clip · just a ball'], ['2:00', 'Bin goal', 'Game']],
  'While you wait: play at home': [['2:00', 'Look, then touch', 'Game · with a partner'], ['0:09', 'Inside of the foot', 'Clip · ball and wall'], ['2:00', 'Wall ball to 20', 'Game']],
}
const who = (g: Game, name: string) => g.label ?? `${name} v ${g.opponent}`

export default function FamilyApp({ start, onNav }: { start?: string; onNav?: (s: string) => void }) {
  useState(() => { if (start) setFamily(preset(start)); return 0 })   // a board opens in the state it is drawn in
  const f = useFamily(), c = f.child, name = c.name
  const first = () => start ?? (!f.started ? 'FAM1-Welcome' : 'FAM3-Home')
  const [view, setView] = useBackState<string>(first)
  const [item, setItem] = useBackState('Wall ball to 20')
  const [toast, setToast] = useState<string | null>(null)
  const [captions, setCaptions] = useState(true)
  const [sheet, setSheet] = useState<'delete' | 'close' | null>(null)
  const [all, setAll] = useState(false), [editing, setEditing] = useState(false), [adding, setAdding] = useState(false), [newName, setNewName] = useState('')
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(t => t === m ? null : t), 3600) }
  const count = f.families >= SHOW_COUNT_AT, age = ageOf(c.year), he = c.he ? 'he' : 'she'
  const game = f.games.find(g => g.id === f.open) ?? f.games[0]
  /** Where an id leads. Home, Games and the results page depend on what the family has. */
  const go = (id: string) => {
    let to = id
    if (to === 'FAM3-Home' || to === 'FAM3e-HomeEmpty' || to === 'FAM14-HomeWithClub') to = !f.started ? 'FAM1-Welcome' : f.joined ? (f.toldJoined ? 'FAM14-HomeWithClub' : 'FAM13-ClubJoined') : f.games.length ? 'FAM3-Home' : 'FAM3e-HomeEmpty'
    if (to === 'FAM8-Results' || to === 'FAM8b-Results13') { if (!f.games.length) { say('No games yet. Add one from Home.'); return } to = showsCounts(c.year) ? 'FAM8b-Results13' : 'FAM8-Results' }
    if (to === 'FAM11-Locked' && f.joined) to = 'FAM13-ClubJoined'
    if (to === 'FAM5-Check') { if (!f.tips) { setView('FAM4-BeforeYouFilm'); say('Read this once before your first film.'); return } const fm = film(f.film); to = f.joined && fm.clubFilmed ? 'FAM5c-ClubFilmedThis' : readable(fm) ? 'FAM5-Check' : 'FAM5x-CantRead' }
    if (to === 'STA3-PickRole') { if (onNav) onNav(to); else openScreen(to); return }
    setView(to); window.scrollTo?.(0, 0)
  }
  const openGame = (g: Game) => { setFamily({ open: g.id, clip: 0 }); go('FAM8-Results') }
  const lib = (title: string) => { setItem(title); setView('ECp2-FamilyItem'); window.scrollTo?.(0, 0) }

  // the work takes "about 20 minutes": in the demo it finishes a few seconds after the page opens
  useEffect(() => {
    if (view !== 'FAM7-Working' || !f.working || start === 'FAM7-Working') return
    const id = setTimeout(() => { const r = finish(); if (r.ok) { setView(showsCounts(c.year) ? 'FAM8b-Results13' : 'FAM8-Results'); say(`${name}’s moments are ready.`) } else { setView('FAM3-Home'); go('FAM3-Home'); say(`We could not make three clips, so your ${r.back} credits are back.`) } }, 5000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one timer per piece of work: a re-render must not start it again
  }, [view, f.working?.film])

  // ── Learn: the Education centre's library for families, Clean Sheet's own items only ──
  if (view === 'ECp1-FamilyLibrary' || view === 'ECp2-FamilyItem') return <EducationPhone key={view + item} start={view} show={view === 'ECp2-FamilyItem' ? item : undefined} child={name} own={{ age, home: 'FAM3-Home' }} onNav={go} />

  // ── the pieces every page shares ──
  const head = (over: string, title: string, back?: string) => (
    <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
      {back && <button aria-label="Back" onClick={() => go(back)} style={{ ...round, border: 0, background: 'transparent', color: '#fff', marginLeft: -10, cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" {...svg} strokeWidth={2.4}><path d="M15 6l-6 6 6 6" /></svg></button>}
      <span style={{ flexGrow: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 13, color: '#cfe6dc' }}>{over}</span><strong style={{ fontSize: 22, lineHeight: '27px', letterSpacing: '-0.01em' }}>{title}</strong></span>
      <button aria-label="Settings: how we handle your film" onClick={() => go('FAM16-Privacy')} style={{ ...round, border: 0, background: '#cbbeb5', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>DB</button>
    </div>)
  const tabs = (on: string) => (
    <nav aria-label="Family" style={{ flex: 'none', position: 'sticky', bottom: 0, display: 'flex', background: '#fff', borderTop: `1px solid ${LINE}`, padding: '4px 0 8px' }}>
      {TABS.map(([t, d, k]) => <button key={t} aria-current={on === k ? 'page' : undefined} onClick={() => go(k === 'home' ? 'FAM3-Home' : k === 'games' ? 'FAM8-Results' : k === 'learn' ? 'ECp1-FamilyLibrary' : 'FAM11-Locked')} style={{ flex: 1, minHeight: 52, border: 0, background: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, color: on === k ? G : INK, fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><I d={d} />{t}</button>)}
    </nav>)
  const actions = (...b: ReactNode[]) => <div style={{ flex: 'none', position: 'sticky', bottom: 60, display: 'flex', gap: 10, padding: '10px 14px', background: '#f7f8f7', borderTop: `1px solid ${LINE}` }}>{b}</div>
  const shell = (id: string, top: ReactNode, body: ReactNode, tab: string | null, foot?: ReactNode) => (
    <div data-screen={id} style={phone}>
      {top}
      <div style={{ flexGrow: 1, padding: '12px 14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>{body}</div>
      {foot}{tab && tabs(tab)}
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 132, transform: 'translateX(-50%)', width: 'max-content', maxWidth: 350, zIndex: 60, boxSizing: 'border-box', padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
      {sheet && <div role="dialog" aria-label={sheet === 'delete' ? 'Delete everything' : 'Close my account'} style={{ position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(16,33,31,0.45)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <div style={{ width: 390, boxSizing: 'border-box', background: '#fff', borderRadius: '18px 18px 0 0', padding: '18px 16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <strong style={{ fontSize: 18, lineHeight: '24px' }}>{sheet === 'delete' ? `Delete all games, clips and ${name}’s details? This cannot be undone.` : 'Unused credits are refunded when you close your account.'}</strong>
          <div style={{ display: 'flex', gap: 10 }}><button onClick={() => setSheet(null)} style={btn(false)}>Keep it</button><button onClick={() => { const b = f.balance, was = sheet; setSheet(null); setFamily(freshFamily()); setView('FAM1-Welcome'); say(was === 'delete' ? 'Everything is deleted.' : `Account closed. ${b} unused credits are refunded.`) }} style={btn(true)}>{sheet === 'delete' ? 'Delete everything' : 'Close my account'}</button></div>
        </div>
      </div>}
    </div>)
  const creditsStrip = (
    <button onClick={() => go('FAM6-Credits')} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 60, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
      <span style={{ flex: 'none', minWidth: 44, height: 30, padding: '0 10px', boxSizing: 'border-box', borderRadius: 999, background: INK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700 }}>{f.balance}</span>
      <span style={{ flexGrow: 1, fontSize: 15 }}><strong>credits</strong> · {f.balance ? `about ${aboutGames(f.balance, f.joined)} games` : 'none yet'}</span><span style={{ ...link, minHeight: 0 }}>Get more</span>
    </button>)
  const clubStrip = (
    <button onClick={() => go('FAM11-Locked')} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, padding: '8px 14px', borderRadius: 14, border: 0, background: PALE, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
      <I d={SHIELD} /><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{count ? `${f.families} families at ${c.club} use this` : 'Tell us if your club joins'}</strong><span style={{ fontSize: 13, color: MUT }}>If the club joins, there is more</span></span><I d={CHEV} size={16} />
    </button>)
  const shelf = (title: string) => (
    <section aria-label={title} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><strong style={{ fontSize: 16 }}>{title}</strong><button aria-label={`See all, ${title}`} onClick={() => { setAll(!all); say(`All of ${title}.`) }} style={{ ...link, fontSize: 13, textDecoration: 'underline' }}>See all</button></div>
      <div style={{ display: 'flex', gap: 10, flexWrap: all ? 'wrap' : 'nowrap', overflowX: all ? undefined : 'auto', paddingBottom: 4 }}>{LIBRARY[title].map(([len, t, sub]) => <button key={t} onClick={() => lib(t)} style={{ flex: 'none', width: 150, display: 'flex', flexDirection: 'column', gap: 3, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><Thumb kind="figure" len={len} wide /><strong style={{ fontSize: 14, lineHeight: '18px', marginTop: 2 }}>{t}</strong><span style={{ fontSize: 12, color: MUT }}>{sub}</span></button>)}</div>
    </section>)
  const gameRow = (g: Game, sub: string, top = true) => (
    <button key={g.id} onClick={() => openGame(g)} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 70, padding: '6px 0', border: 0, borderTop: top ? `1px solid ${HAIR}` : 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
      <span style={{ flex: 'none', width: 96 }}><Thumb kind="team" len={g.reel} wide /></span>
      <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{g.label ?? `v ${g.opponent}`} · {g.clips.length} moments</strong><span style={{ fontSize: 13, color: MUT }}>{sub}</span></span>
    </button>)
  const reel = (g: Game, chip: string) => <LearnPlayer key={g.id} phone noTry ratio="362 / 200" chips={[chip]} captions={captions} onCaptions={setCaptions} say={say}
    chapters={[{ key: 'reel', frame: 'team', label: 'Reel', short: 'Reel', secs: secs(g.reel), lines: ['Other players are blurred'] }, { key: 'best', frame: 'team', label: 'Best', short: 'Best', secs: secs(g.clips[0].len), lines: [g.clips[0].title] }]}
    tryCard={{ heading: '', at: '', task: '', button: '', done: false, onAdd: () => {} }} />

  // ── FAM1 · welcome ──
  if (view === 'FAM1-Welcome') return shell('FAM1-Welcome', head('Clean Sheet Family', 'Your child’s moments'), <>
    <section style={{ borderRadius: 16, background: '#1c3a33', color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>FILM THE GAME ON YOUR PHONE</span>
      <strong style={{ fontSize: 20, lineHeight: '26px' }}>We find your child’s best moments and cut them into clips.</strong>
      <span style={{ fontSize: 14, lineHeight: '20px', color: '#cfe6dc' }}>Works with any club, whether or not it uses Clean Sheet.</span>
    </section>
    <section style={{ ...card, gap: 0, padding: '4px 14px' }}>
      <Line top={false} a="Highlights of your own child" b="A short reel and the moments they did well" /><Line a="Private to your family" b="Other children are blurred. Nothing is public" />
      <Line a="Pay with credits, only when it works" b="A free check tells you the cost first" /><Line a="Free skills and games to play at home" b="No credits needed" />
    </section>
    <section style={{ borderRadius: 14, background: PALE, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 14 }}>What it is not</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>It does not rate your child, compare them with team-mates or tell a coach what to do. Under 12, there are no stats at all.</span></section>
  </>, null, <div style={{ flex: 'none', display: 'flex', gap: 10, padding: '10px 14px 18px' }}><button onClick={() => say('Sign-in opens.')} style={btn(false)}>I have an account</button><button onClick={() => go('FAM2-AddChild')} style={btn(true)}>Get started</button></div>)

  // ── FAM2 · about your child ──
  if (view === 'FAM2-AddChild') {
    const field = (l: string, value: string, hint: string, set: (v: string) => void, mode: 'text' | 'numeric' = 'text') => <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontSize: 14 }}>{l}</strong><input value={value} inputMode={mode} onChange={e => set(e.target.value)} style={{ height: 48, padding: '0 12px', borderRadius: 10, border: `1px solid ${LINE}`, background: '#fff', fontFamily: 'inherit', fontSize: 16, color: INK }} />{hint && <span style={{ fontSize: 13, color: MUT }}>{hint}</span>}</label>
    const kid = (p: Partial<typeof c>) => setFamily({ child: { ...c, ...p } }), year = Number(c.year)
    const ok = c.name.trim().length > 0 && year >= SEASON_MIN && year <= SEASON_MAX
    return shell('FAM2-AddChild', head('Step 1 of 2', 'About your child', 'FAM1-Welcome'), <>
      {field('First name', c.name, 'First name only. We never ask for a surname', v => kid({ name: v.split(' ')[0] }))}
      {field('Year they were born', String(c.year || ''), !year ? 'Sets what we show' : showsCounts(year) ? 'Sets what we show. 13 and over: clips, and three counts marked Estimate' : 'Sets what we show. Under 12: clips, no stats', v => kid({ year: Number(v.replace(/\D/g, '').slice(0, 4)) }), 'numeric')}
      {field('Their club', c.club, 'So we can tell you if it joins. We don’t contact the club', v => kid({ club: v }))}
      <div role="radiogroup" aria-label="Shirt colour" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><strong style={{ fontSize: 14 }}>Shirt colour</strong><span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{COLOURS.map(col => { const on = c.colour === col; return <button key={col} role="radio" aria-checked={on} onClick={() => { kid({ colour: on ? '' : col }); say(`${col}: ${on ? 'taken off' : 'picked'}.`) }} style={{ minHeight: 44, padding: '0 12px', borderRadius: 999, border: on ? `2px solid ${INK}` : `1px solid ${LINE}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer' }}><span style={{ width: 16, height: 16, borderRadius: 999, background: HEX[col], border: `1px solid ${LINE}` }} />{col}</button> })}</span></div>
      {field('Shirt number, if they have one', c.number, '', v => kid({ number: v.replace(/\D/g, '').slice(0, 2) }), 'numeric')}
      <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>You are the parent or guardian of this child. You can delete all of this at any time.</span>
    </>, null, <div style={{ flex: 'none', display: 'flex', gap: 10, padding: '10px 14px 18px' }}><button onClick={() => go('FAM1-Welcome')} style={btn(false)}>Back</button><button onClick={() => { if (!ok) { say('Add a first name and the year they were born.'); return } setFamily({ started: true }); setView('FAM4-BeforeYouFilm') }} style={btn(true)}>Next</button></div>)
  }

  // ── FAM4 · before you film ──
  if (view === 'FAM4-BeforeYouFilm') {
    const done = () => { setFamily({ tips: true, started: true }); setView(f.joined ? 'FAM14-HomeWithClub' : f.games.length ? 'FAM3-Home' : 'FAM3e-HomeEmpty') }
    return shell('FAM4-BeforeYouFilm', head(f.tips ? 'Filming tips' : 'Step 2 of 2', 'Before you film', f.tips ? 'FAM3-Home' : 'FAM2-AddChild'), <>
      <section style={{ ...card, border: `2.5px solid ${INK}` }}><strong style={{ fontSize: 16 }}>Check you are allowed to</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>Many clubs and grounds have rules about filming children. Ask your club if you are not sure. If someone asks you to stop, stop.</span></section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>For film we can read</strong>
        <Line a="Phone sideways, near halfway" b="As high as you safely can" /><Line a="Keep it still" b="Lean on a fence or use a small stand" /><Line a="Film the play, not just your child" b="We find them for you" /><Line a="One long take per half" b="Don’t stop and start" /></section>
      <section style={{ borderRadius: 14, background: PALE, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 14 }}>Other people’s children</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>They will be in your film. We blur everyone except your child before anything is saved, and we never try to work out who they are.</span><button onClick={() => go('FAM16-Privacy')} style={{ ...link, alignSelf: 'flex-start', textDecoration: 'underline' }}>How we handle your film</button></section>
    </>, null, <div style={{ flex: 'none', display: 'flex', gap: 10, padding: '10px 14px 18px' }}><button onClick={() => { if (!f.tips) { setFamily({ started: true }); setView(f.games.length ? 'FAM3-Home' : 'FAM3e-HomeEmpty'); say('We will show this again before your first film.') } else done() }} style={btn(false)}>Show me again later</button><button onClick={done} style={btn(true)}>Got it</button></div>)
  }

  // ── FAM16 · how we handle your film ──
  if (view === 'FAM16-Privacy') return shell('FAM16-Privacy', head('Settings', 'How we handle your film', 'FAM3-Home'), <>
    <section style={{ ...card, gap: 0, padding: '4px 14px' }}>
      <Line top={false} a="We blur everyone except your child" b="Before anything is saved. The unblurred film is deleted" /><Line a="We never work out who anyone is" b="No face recognition. We follow a shirt you point to" />
      <Line a="Only your family can watch" b="No public pages, no club access" /><Line a="We keep a first name and birth year" b="Nothing else about your child" /><Line a="Stored in Australia" />
    </section>
    <button onClick={() => say('A copy of everything we hold is emailed to you within a day.')} style={{ ...btn(false), flex: 'none' }}>Get a copy of everything</button>
    <button onClick={() => { setSheet('delete'); say(`Sheet opens: delete all games, clips and your child’s details? This cannot be undone.`) }} style={{ ...btn(false), flex: 'none' }}>Delete everything</button>
    <button onClick={() => { setSheet('close'); say('Sheet opens: unused credits are refunded when you close your account.') }} style={{ ...btn(false), flex: 'none' }}>Close my account</button>
    <section style={{ borderRadius: 14, background: PALE, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 14 }}>Someone else’s child in your film?</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>Their parent can ask us to remove any clip. We do it the same day.</span></section>
  </>, 'home')

  // ── FAM6 · credits ──
  if (view === 'FAM6-Credits') {
    const p = PACKS[f.pack], rows: [string, string][] = [[`A ${RATES.usualMinutes}-minute game`, `${quote(RATES.usualMinutes)} credits`], ['A 90-minute game', `${quote(90)} credits`], ['A second child in the same film', `+${RATES.secondChild} credits`], ['The check, and “look again”', 'Free']]
    return shell('FAM6-Credits', head(`You have ${f.balance}`, 'Credits', f.held ? 'FAM5-Check' : 'FAM3-Home'), <>
      <div role="radiogroup" aria-label="Packs" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{PACKS.map((k, n) => <button key={k.credits} role="radio" aria-checked={f.pack === n} onClick={() => { setFamily({ pack: n }); say(`${k.credits} credits picked.`) }} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 64, border: f.pack === n ? `2.5px solid ${INK}` : `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
        <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>{k.credits} credits</strong><span style={{ fontSize: 13, color: MUT }}>About {aboutGames(k.credits)} games{k.extra ? ` · ${k.extra} extra` : ''}</span></span><strong style={{ fontSize: 18 }}>${k.price}</strong></button>)}</div>
      <section style={{ ...card, gap: 0, padding: '12px 14px 8px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What a game uses</strong>
        {rows.map(([a, b]) => <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '8px 0', borderTop: `1px solid ${HAIR}`, fontSize: 14 }}><span>{a}</span><strong style={{ flex: 'none' }}>{b}</strong></div>)}
        <span style={{ fontSize: 13, lineHeight: '19px', color: MUT, paddingTop: 6, borderTop: `1px solid ${HAIR}` }}>Longer film uses more. You see the number before you spend, and it never changes after.</span></section>
      <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>{f.joined ? `${c.club} has joined: games the club films are free, and your own filming uses half the credits.` : `If ${c.club} joins: games the club films are free, and your own filming uses half the credits.`} Credits come back if we can’t make three clips. They don’t run out.</span>
    </>, 'home', actions(<button key="b" onClick={() => { setFamily({ balance: f.balance + p.credits }); say(`Paid through your app store. ${p.credits} credits added.`); if (f.held) setTimeout(() => setView('FAM5-Check'), 1400) }} style={btn(true)}>Buy {p.credits} for ${p.price}</button>))
  }

  // ── FAM5, FAM5x, FAM5c · the free check ──
  if (view === 'FAM5-Check' || view === 'FAM5x-CantRead' || view === 'FAM5c-ClubFilmedThis') {
    const fm = film(f.film), price = f.held?.film === fm.id ? f.held.credits : quote(fm.minutes, 1, f.joined), enough = f.balance >= price
    const pick = <section aria-label="Demo: choose a sample film" style={{ borderRadius: 14, border: `1px dashed ${MUT}`, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>DEMO · CHOOSE A SAMPLE FILM</span><div role="radiogroup" aria-label="Sample film" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{FILMS.filter(x => f.joined || !x.clubFilmed).map(x => <button key={x.id} role="radio" aria-checked={x.id === fm.id} onClick={() => { setFamily({ film: x.id, held: null }); setView(f.joined && x.clubFilmed ? 'FAM5c-ClubFilmedThis' : readable(x) ? 'FAM5-Check' : 'FAM5x-CantRead') }} style={{ minHeight: 44, padding: '0 12px', borderRadius: 10, border: x.id === fm.id ? `2px solid ${INK}` : `1px solid ${LINE}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: INK, textAlign: 'left', cursor: 'pointer' }}>{x.label}</button>)}</div></section>
    const another = () => { setFamily({ film: 'f50', held: null }); setView('FAM5-Check'); window.scrollTo?.(0, 0) }
    if (view === 'FAM5c-ClubFilmedThis') return shell('FAM5c-ClubFilmedThis', head('Add a game', 'Your club filmed this one', 'FAM14-HomeWithClub'), <>
      <section style={{ borderRadius: 16, background: '#1c3a33', color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>{fm.date.toUpperCase()} · V {fm.opponent.toUpperCase()}</span><strong style={{ fontSize: 20, lineHeight: '26px' }}>It is already in your app, free.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#cfe6dc' }}>{c.club}’s camera covered the whole pitch, so {name}’s moments are better from that film.</span></section>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="No credits needed" b={`Your ${f.balance} credits are untouched`} /><Line a="Your own film is not uploaded" b="It stays on your phone" /></section>
      <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>Use your own filming for games the club doesn’t film: friendlies, tournaments, futsal, the park.</span>{pick}
    </>, 'games', actions(<button key="a" onClick={another} style={btn(false)}>Add a different game</button>, <button key="b" onClick={() => go('FAM14-HomeWithClub')} style={btn(true)}>See {name}’s moments</button>))
    if (view === 'FAM5x-CantRead') return shell('FAM5x-CantRead', head('Add a game · free check', 'We can’t read this one', 'FAM3-Home'), <>
      <section style={{ ...card, border: `2.5px solid ${INK}` }}><strong style={{ fontSize: 17 }}>No credits used.</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>We could follow the play for only {fm.readable} of {fm.minutes} minutes, which is not enough to find {name}’s moments.</span></section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What got in the way</strong>{(fm.fail ?? []).map(([a, b, ok]) => <Line key={a} ok={ok} a={a} b={b || undefined} />)}</section>
      <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>Have another film of this game, or want to try next week’s? The check is always free. Your film from this try has been deleted.</span>{pick}
    </>, 'games', actions(<button key="a" onClick={() => setView('FAM4-BeforeYouFilm')} style={btn(false)}>Filming tips</button>, <button key="b" onClick={another} style={btn(true)}>Try another film</button>))
    return shell('FAM5-Check', head('Add a game · free check', 'We can read this one', 'FAM3-Home'), <>
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '362 / 150', background: '#3d7a5f' }}><Thumb kind="team" len="" wide />
        <button onClick={() => say(`Tap the player who is ${name}. We follow that shirt for the whole game.`)} style={{ position: 'absolute', left: 10, bottom: 10, minHeight: 44, padding: '0 14px', borderRadius: 999, border: 0, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>That’s {name}{c.colour ? `, ${c.colour.toLowerCase()}` : ''}{c.number ? ` ${c.number}` : ''} · change</button></div>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}>
        <Line top={false} a={`We can follow the play for ${fm.readable} of ${fm.minutes} minutes`} b="The rest is too far away or blocked" />
        <Line a={`${name} is in shot for about ${fm.inShot} minutes`} b={`When the camera follows the ball, ${he} is sometimes out of frame`} />
        <Line a={`Enough for about ${Math.max(fm.moments, RATES.minClips)} moments`} b="We will tell you if it turns out fewer" /></section>
      <section style={card}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><strong style={{ fontSize: 16 }}>This game</strong><strong style={{ fontSize: 20 }}>{price} credits</strong></div>
        <span style={{ fontSize: 14, lineHeight: '20px' }}>{fm.minutes} minutes of film, one child{f.joined ? ', at half the credits because your club has joined' : ''}. You have {f.balance}. This is the price: it won’t go up while we work, and it comes back if we can’t make three clips.</span></section>
      <span style={{ fontSize: 13, lineHeight: '19px', color: MUT, textAlign: 'center' }}>Ready in about 20 minutes. Everyone except {name} is blurred before anything is saved.</span>{pick}
    </>, 'games', actions(<button key="a" onClick={() => { setFamily({ held: null }); go('FAM3-Home') }} style={btn(false)}>Not now</button>,
      enough ? <button key="b" onClick={() => { spend(fm.id, price); setView('FAM7-Working'); window.scrollTo?.(0, 0) }} style={btn(true)}>Use {price} credits</button>
        : <button key="b" onClick={() => { setFamily({ held: { film: fm.id, credits: price } }); setView('FAM6-Credits'); say(`You need ${price - f.balance} more. This quote holds for ${RATES.quoteHoldsHours} hours.`) }} style={btn(true)}>Get more credits</button>))
  }

  // ── FAM7 · working on it ──
  if (view === 'FAM7-Working') { const fm = film(f.working?.film ?? f.film); return shell('FAM7-Working', head(`${fm.date} · v ${fm.opponent}`, `Finding ${name}’s moments`, 'FAM3-Home'), <>
    <section style={{ borderRadius: 16, background: '#1c3a33', color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>ABOUT 20 MINUTES</span><strong style={{ fontSize: 18, lineHeight: '24px' }}>You can close the app. We’ll let you know.</strong></section>
    <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="Film received" b={`${fm.minutes} minutes`} /><Line a={`Everyone except ${name} blurred`} b="Done before anything is saved" /><Line ok={false} a="Finding the moments" b="Working on it now" /><Line ok={false} a="Cutting the reel" b="Next" /></section>
    {shelf('While you wait: play at home')}
  </>, 'games') }

  // ── FAM10 · share with family ──
  if (view === 'FAM10-ShareFamily' && game) { const on = f.people.filter(p => p.on), back = () => go('FAM8-Results')
    return shell('FAM10-ShareFamily', head(`${name}’s reel · ${game.date}`, 'Share with family', 'FAM8-Results'), <>
      <section style={{ ...card, gap: 0, padding: '12px 14px 8px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>Who can watch</strong>
        {f.people.map(p => <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, borderTop: `1px solid ${HAIR}` }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{p.name}</strong><span style={{ fontSize: 13, color: MUT }}>{p.how}</span></span>
          <button role="switch" aria-checked={p.on} aria-label={`${p.name} · ${p.how}`} onClick={() => { setFamily({ people: f.people.map(q => q.name === p.name ? { ...q, on: !q.on } : q) }); say(`${p.name}: ${p.on ? 'removed' : 'invited'}.`) }} style={{ flex: 'none', width: 56, height: 44, padding: 0, border: 0, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 44, height: 26, borderRadius: 999, boxSizing: 'border-box', background: p.on ? G : '#fff', border: `1.5px solid ${p.on ? G : MUT}`, position: 'relative', display: 'block' }}><span style={{ position: 'absolute', top: 2.5, left: p.on ? 21 : 3, width: 18, height: 18, borderRadius: 999, background: p.on ? '#fff' : MUT }} /></span></button></div>)}
        {adding && <form onSubmit={e => { e.preventDefault(); const n = newName.trim(); if (!n) return; if (f.people.length >= 6) { say('Six is the most. Take someone off first.'); return } setFamily({ people: [...f.people, { name: n, how: 'Watch by a private link', on: true }] }); setNewName(''); setAdding(false); say(`${n}: invited.`) }} style={{ display: 'flex', gap: 8, padding: '8px 0', borderTop: `1px solid ${HAIR}` }}><input aria-label="Their name" placeholder="Their name" value={newName} onChange={e => setNewName(e.target.value)} style={{ flexGrow: 1, minWidth: 0, height: 44, padding: '0 12px', borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 15 }} /><button type="submit" style={{ ...btn(true), flex: 'none', minHeight: 44 }}>Add</button></form>}
        <button onClick={() => { if (f.people.length >= 6) { say('Six is the most. Take someone off first.'); return } setAdding(true); say('Type a name and a mobile number or email. They get a private link.') }} style={{ ...link, alignSelf: 'flex-start', textDecoration: 'underline' }}>Add a family member</button></section>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="Up to six people you name" b="Each link works for that person only" /><Line a="Other children stay blurred" b="In the app and in any saved film" /><Line a="No public link, no social posting" b="There is no button for it" /><Line a="Not shared with the club or coach" b="Now, or if the club joins" /></section>
    </>, 'games', actions(<button key="a" onClick={back} style={btn(false)}>Cancel</button>, <button key="b" onClick={() => on.length ? say(`Shared with ${on.map((p, n) => n ? `with ${p.name}` : p.name).join(' and ')}.`) : say('Nobody is switched on yet.')} style={btn(true, !on.length)}>Share with {on.length}</button>)) }

  // ── FAM9 · one clip ──
  if (view === 'FAM9-Clip' && game) { const n = Math.min(f.clip, game.clips.length - 1), cl = game.clips[n]
    const drop = (line: string) => { const left = game.clips.filter((_, k) => k !== n); setFamily({ games: f.games.map(g => g.id === game.id ? { ...g, clips: left } : g), clip: 0 }); say(line); if (!left.length) go('FAM3-Home') }
    return shell('FAM9-Clip', head(`${who(game, name)} · ${cl.minute}`, cl.short ?? cl.title, 'FAM8-Results'), <>
      <LearnPlayer key={game.id + n} phone noTry ratio="362 / 215" chips={[`Clip ${n + 1} of ${game.clips.length}`]} captions={captions} onCaptions={setCaptions} say={say}
        chapters={[{ key: 'clip', frame: 'team', label: 'Clip', short: 'Clip', secs: secs(cl.len), lines: ['Other players are blurred'] }, { key: 'slow', frame: 'team', label: 'Slow', short: 'Slow', secs: Math.floor(secs(cl.len) * 4 / 3), lines: ['Other players are blurred'], slow: true }]} tryCard={{ heading: '', at: '', task: '', button: '', done: false, onAdd: () => {} }} />
      {cl.notice && <section style={{ ...card, border: `2.5px solid ${INK}` }}><strong style={{ fontSize: 16 }}>What to notice</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>{cl.notice.replace('{name}', name).replace(' He ', c.he ? ' He ' : ' She ')}</span></section>}
      <div style={{ display: 'flex', gap: 10 }}><button onClick={() => drop(`Thanks. This clip is removed and we look again for ${name}. No extra credits.`)} style={btn(false)}>That’s not {name}</button><button onClick={() => drop('Clip deleted from your account.')} style={btn(false)}>Delete this clip</button></div>
    </>, 'games', actions(<button key="a" onClick={() => { setFamily({ clip: (n + 1) % game.clips.length }); window.scrollTo?.(0, 0) }} style={btn(false)}>Next clip</button>, <button key="b" onClick={() => setView('FAM10-ShareFamily')} style={btn(true)}>Share with family</button>)) }

  // ── FAM8 and FAM8b · results ──
  if ((view === 'FAM8-Results' || view === 'FAM8b-Results13') && game) { const nums = showsCounts(c.year) && game.counts, shown = nums ? 2 : 3, more = game.clips.length - shown
    const clipRow = (k: number) => { const cl = game.clips[k]; return <button key={k} onClick={() => { setFamily({ clip: k }); setView('FAM9-Clip'); window.scrollTo?.(0, 0) }} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, padding: '6px 0', border: 0, borderTop: `1px solid ${HAIR}`, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><span style={{ flex: 'none', width: 84 }}><Thumb kind="team" len={cl.len} wide /></span><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '19px' }}>{cl.title}</strong><span style={{ fontSize: 13, color: MUT }}>{cl.minute}</span></span></button> }
    return shell(nums ? 'FAM8b-Results13' : 'FAM8-Results', head(game.label ? game.date : `${game.date} · v ${game.opponent}`, nums ? `${name}’s game` : `${name}’s moments`, 'FAM3-Home'), <>
      {reel(game, `${name}’s reel · ${game.clips.length} moments`)}
      {nums && <><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 8 }}>{([[String(nums.onBall), 'times on the ball'], [`${nums.passes[0]} of ${nums.passes[1]}`, 'passes reached a team-mate'], [String(nums.shots), 'shots']] as [string, string][]).map(([v, w]) => <span key={w} style={{ ...card, padding: '10px 10px', gap: 3 }}><strong style={{ fontSize: 20, lineHeight: '24px' }}>{v}</strong><span style={{ fontSize: 12, lineHeight: '16px' }}>{w}</span><span style={{ alignSelf: 'flex-start', fontSize: 11, fontWeight: 700, color: INK, background: '#e9eae8', borderRadius: 999, padding: '1px 8px' }}>Estimate</span></span>)}</div>
        <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>Counted from the {nums.inShot} of {nums.minutes} minutes {name} was in shot. One phone on the sideline misses things, so these are estimates and will read low.</span></>}
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>Things {name} did well</strong>
        {game.clips.slice(0, shown).map((_, k) => clipRow(k))}
        {more > 0 && <button onClick={() => { setFamily({ clip: shown }); setView('FAM9-Clip'); window.scrollTo?.(0, 0) }} style={{ ...link, alignSelf: 'flex-start', textDecoration: 'underline' }}>{more} more</button>}
        {nums && <span style={{ fontSize: 13, color: MUT, padding: '8px 0', borderTop: `1px solid ${HAIR}` }}>No ratings, and no comparison with team-mates.</span>}</section>
      {!nums && <><section style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 10 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>Try this at home</strong><span style={{ fontSize: 14, color: MUT }}>Look, then touch · a game for two</span></span><button onClick={() => lib('Look, then touch')} style={{ ...btn(false), flex: 'none', minHeight: 44 }}>Open</button></section>
        <span style={{ fontSize: 13, lineHeight: '19px', color: MUT, textAlign: 'center' }}>{name} is under {age < 12 ? 12 : 13}, so there are no numbers here. Just the good bits.</span></>}
    </>, 'games', actions(<button key="a" onClick={() => setView('FAM10-ShareFamily')} style={btn(false)}>Share with family</button>, <button key="b" onClick={() => say('Saved to your phone. Other players stay blurred in the saved film.')} style={btn(true)}>Save the reel</button>)) }

  // ── FAM12 · tell my club ──
  if (view === 'FAM12-TellClub') { const msg = f.message ?? `Hi, I’ve been using Clean Sheet to get ${name}’s highlights from games. It also does a lot for coaches and clubs: session plans, fair turns, clips for every family. ${count ? `A few of us at ${c.club.replace(/ FC$/, '')} already use it. ` : ''}There’s a page for clubs here if it’s of interest. No pressure at all. ${f.parent}`
    return shell('FAM12-TellClub', head(c.club, 'Tell my club', 'FAM11-Locked'), <>
      <section style={{ ...card, border: `2.5px solid ${INK}` }}><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>YOU SEND THIS YOURSELF, TO WHOEVER YOU CHOOSE</span>
        {editing ? <textarea aria-label="Your message" value={msg} onChange={e => setFamily({ message: e.target.value })} rows={8} style={{ padding: 10, borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 15, lineHeight: '21px', color: INK, resize: 'vertical' }} /> : <span style={{ fontSize: 15, lineHeight: '22px', whiteSpace: 'pre-wrap' }}>{msg}</span>}
        <button onClick={() => { setEditing(true); say('Edit the message. It stays yours.') }} style={{ ...link, alignSelf: 'flex-start', textDecoration: 'underline' }}>Change the wording</button></section>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="It goes from you, not from us" b="By text, email or however you like" /><Line a="We never contact your club" b="Unless the club comes to us" /><Line a="Your name is not on our club page" b="It shows a number only" /></section>
      <span style={{ fontSize: 13, lineHeight: '19px', color: MUT, textAlign: 'center' }}>One message is plenty. Volunteers run your club.</span>
    </>, 'club', actions(<button key="a" onClick={() => go('FAM11-Locked')} style={btn(false)}>Not now</button>, <button key="b" onClick={() => say('Your phone’s share sheet opens with the message and the link.')} style={btn(true)}>Send it myself</button>)) }

  // ── FAM13 · your club has joined ──
  if (view === 'FAM13-ClubJoined') { const seen = () => { setFamily({ toldJoined: true }); setView('FAM14-HomeWithClub') }
    return shell('FAM13-ClubJoined', head(c.club, 'Your club has joined'), <>
      <section style={{ borderRadius: 16, background: '#1c3a33', color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>FROM TODAY</span><strong style={{ fontSize: 19, lineHeight: '25px' }}>Games {c.club} films are free for you.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#cfe6dc' }}>{name}’s coach, Luke, can now send goals, clips and messages here.</span></section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What changes</strong>
        {([['Games the club films', 'Free'], ['Your own filming', 'Half the credits'], [`Your ${f.balance} credits`, `Now about ${aboutGames(f.balance, true)} games`]] as [string, string][]).map(([a, b]) => <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '9px 0', borderTop: `1px solid ${HAIR}`, fontSize: 15 }}><span>{a}</span><strong style={{ flex: 'none' }}>{b}</strong></div>)}</section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What stays yours</strong><Line a={`Your ${f.games.length} games and their clips`} b="Private to your family, as before" /><Line a="The club and coach can’t see them" b="There is no way to send them" /><Line a="You can delete them any time" /></section>
      <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>The club asks each family what it may film and share. You’ll see those questions next.</span>
    </>, null, <div style={{ flex: 'none', display: 'flex', gap: 10, padding: '10px 14px 18px' }}><button onClick={seen} style={btn(false)}>{f.toldJoined ? 'Home' : 'Later'}</button><button onClick={() => say(`Three questions from ${c.club} about film and sharing.`)} style={btn(true)}>Answer the club’s questions</button></div>) }

  // ── FAM11 · with your club, there is more ──
  if (view === 'FAM11-Locked') return shell('FAM11-Locked', head(c.club, 'With your club, there is more', 'FAM3-Home'), <>
    <section style={{ borderRadius: 16, background: '#1c3a33', color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>{count ? `${f.families} FAMILIES AT ${c.club.toUpperCase()} USE THIS` : 'TELL US IF YOUR CLUB JOINS'}</span><strong style={{ fontSize: 19, lineHeight: '25px' }}>If the club joins, its games are free for every family.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#cfe6dc' }}>And your own filming uses half the credits.</span></section>
    <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}><I d={LOCK} size={16} />Only with the club</strong>
      {([['The whole game, from the club’s camera', `Every minute ${name} plays`], ['From the coach', `${name}’s goal, and a clip to try at home`], ['Team moments', 'With team-mates whose families said yes'], ['Messages and the season report', 'Straight from the coach']] as [string, string][]).map(([a, b]) => <div key={a} style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', borderTop: `1px solid ${HAIR}` }}><strong style={{ fontSize: 15 }}>{a}</strong><span style={{ fontSize: 14, color: MUT }}>{b}</span></div>)}</section>
    <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>Clubs decide for themselves. We only ever show them how many families use this, never who.</span>
    <section aria-label="Demo: the club" style={{ borderRadius: 14, border: `1px dashed ${MUT}`, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>DEMO · THE SAMPLE CLUB</span>
      <div style={{ display: 'flex', gap: 8 }}><button onClick={() => { setFamily({ joined: true, toldJoined: false }); setView('FAM13-ClubJoined'); window.scrollTo?.(0, 0) }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>{c.club} joins</button><button onClick={() => { const few = f.families >= SHOW_COUNT_AT; setFamily({ families: few ? 3 : 14 }); say(few ? 'Three families use it: the number is hidden below five.' : 'Fourteen families use it.') }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>{count ? 'Only 3 families' : '14 families'}</button></div></section>
  </>, 'club', actions(<button key="a" onClick={() => setView('FAMc1-ClubInterest')} style={btn(false)}>What the club sees</button>, <button key="b" onClick={() => setView('FAM12-TellClub')} style={btn(true)}>Tell my club</button>))

  // ── FAMc1, opened from the phone: the page a club sees ──
  if (view === 'FAMc1-ClubInterest') return <div><div style={{ maxWidth: 1180, margin: '0 auto', padding: '8px 16px' }}><button onClick={() => setView('FAM11-Locked')} style={{ ...link, textDecoration: 'underline' }}>Back to the family app</button></div><FamilyClubPage onNav={onNav} /></div>

  // ── FAM14 · home after the club joins ──
  if (view === 'FAM14-HomeWithClub') return shell('FAM14-HomeWithClub', head(`U11 Luke · ${c.club.replace(/ FC$/, '')}`, `Hi ${f.parent}`), <>
    <section style={card}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT }}>FROM YOUR CLUB · FREE</span><strong style={{ fontSize: 18, lineHeight: '24px' }}>Saturday 9:30 v Ridgeway, home</strong><span style={{ fontSize: 14, color: MUT }}>Luke: two things to try before Tuesday</span>
      <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}><button aria-pressed={f.coming} onClick={() => { setFamily({ coming: true }); say(`Luke can see ${name} is coming.`) }} style={btn(true)}>{name} is coming</button><button onClick={() => go('ECp1-FamilyLibrary')} style={btn(false)}>From Luke</button></div></section>
    <section aria-label="Your own filming" style={{ borderRadius: 16, border: `2px dashed ${MUT}`, padding: '10px 14px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 4 }}><I d={LOCK} size={16} /><strong style={{ flexGrow: 1, fontSize: 16 }}>Your own filming</strong><span style={{ fontSize: 13, fontWeight: 700, color: MUT }}>Private to your family</span></div>
      {f.games.slice(0, 2).map((g, n) => gameRow(g, `${g.date} · ${g.note ?? 'before the club joined'}`, n > 0))}
      <button onClick={() => go('FAM5-Check')} style={{ ...btn(false), flex: 'none', marginTop: 6 }}>Add a game · half the credits</button></section>
    {creditsStrip}
    <span style={{ fontSize: 13, lineHeight: '19px', color: MUT, textAlign: 'center' }}>Luke and the club can’t see anything in the dashed box.</span>
  </>, 'home')

  // ── FAM3 and FAM3e · home ──
  const latest = f.games[0]
  if (!latest || view === 'FAM3e-HomeEmpty') return shell('FAM3e-HomeEmpty', head('Clean Sheet Family', `Hi ${f.parent}`), <>
    <section style={{ borderRadius: 16, background: '#1c3a33', color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>FOR {name.toUpperCase()} · UNDER {age}</span><strong style={{ fontSize: 19, lineHeight: '25px' }}>Film Saturday’s game and we’ll find {name}’s moments.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#cfe6dc' }}>We check your film for free. You only use credits if we can make clips from it.</span></section>
    <button onClick={() => go('FAM5-Check')} style={{ ...btn(true), flex: 'none' }}>Add a game</button>
    {creditsStrip}{shelf('Free: play at home')}{clubStrip}
  </>, 'home')
  return shell('FAM3-Home', head('Clean Sheet Family', `Hi ${f.parent}`), <>
    {reel(latest, `${latest.day} · ${name}’s reel`)}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17, lineHeight: '22px' }}>{who(latest, name)} · {latest.clips.length} moments</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{latest.date} · {secs(latest.reel)} seconds · private to your family</span></span><button onClick={() => openGame(latest)} style={{ ...btn(false), flex: 'none', minHeight: 44 }}>Open</button></div>
    <button onClick={() => go('FAM5-Check')} style={{ ...btn(true), flex: 'none' }}>Add a game</button>
    {creditsStrip}
    {f.games.length > 1 && <section style={{ ...card, gap: 0, padding: '10px 14px 4px' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><strong style={{ fontSize: 16 }}>Earlier games</strong><button onClick={() => { setAll(!all); if (!all) say(`All ${f.games.length} games.`) }} aria-label={`All ${f.games.length}, earlier games`} style={{ ...link, fontSize: 13, textDecoration: 'underline' }}>All {f.games.length}</button></div>{f.games.slice(1, all ? undefined : 3).map(g => gameRow(g, g.date))}</section>}
    {clubStrip}
  </>, 'home')
}
const SEASON_MIN = 2005, SEASON_MAX = 2021

// ── FAMc1 · the public page a club sees: a number, never names ──
export function FamilyClubPage({ onNav }: { onNav?: (s: string) => void }) {
  const f = useFamily(), club = f.child.club, count = f.families >= SHOW_COUNT_AT
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(t => t === m ? null : t), 3600) }
  const look = () => onNav ? onNav('STA3-PickRole') : openScreen('STA3-PickRole')
  const tile: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' }
  const big = (primary: boolean): React.CSSProperties => ({ minHeight: 50, padding: '0 22px', borderRadius: 12, border: primary ? 0 : `1px solid ${LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' })
  return (
    <div data-screen="FAMc1-ClubInterest" style={{ maxWidth: 1180, minHeight: 820, margin: '0 auto', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <header style={{ height: 64, padding: '0 32px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 16 }}><strong style={{ flexGrow: 1, fontSize: 22, letterSpacing: '-0.02em' }}>Clean Sheet</strong><button onClick={look} style={{ minHeight: 44, border: 0, background: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>Look around</button><button onClick={() => say('A short form: your name, your role at the club, and a time to talk.')} style={{ minHeight: 44, padding: '0 18px', borderRadius: 10, border: 0, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Talk to us</button></header>
      <main style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: MUT }}>FOR THE COMMITTEE AT {club.toUpperCase()}</span>
          <h1 style={{ margin: 0, fontSize: 42, lineHeight: '48px', letterSpacing: '-0.03em' }}>{count ? `${f.families} families at your club already use Clean Sheet.` : 'Families at your club already use Clean Sheet.'}</h1>
          <span style={{ fontSize: 18, lineHeight: '27px' }}>They film games on their phones and pay with credits for their own child’s highlights. With the club on board, every family gets that from one camera, and your coaches get a lot more.</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10 }}>{[['For coaches', 'A session proposed from the last game, with the reason for every part'], ['For families', 'Their child’s moments from every club game, with no credits'], ['For the club', 'Fair turns, consent and welfare in one place']].map(([a, b]) => <span key={a} style={{ borderRadius: 12, background: PALE, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 12, color: MUT }}>{a}</strong><span style={{ fontSize: 14, lineHeight: '19px' }}>{b}</span></span>)}</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><button onClick={look} style={big(true)}>See what coaches get</button><button onClick={() => say('The price list for clubs opens.')} style={big(false)}>Prices for clubs</button></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <section style={{ ...tile, gap: 0, paddingBottom: 6 }}><strong style={{ fontSize: 18, paddingBottom: 6 }}>What this page is, and is not</strong>
            <Line a="A count, not a list" b="We don’t tell you which families. They can if they wish" /><Line a="Nobody at your club asked us to send this" b="A parent shared the link, or you found it" /><Line a="We won’t chase you" b="This page is the whole pitch" /><Line a="Families’ own film stays private" b="Joining gives the club no access to it" /></section>
          <section style={{ ...tile, gap: 0, paddingBottom: 6 }}><strong style={{ fontSize: 18, paddingBottom: 6 }}>If you join this season</strong>
            {([['Families already using it', 'Shown as a number only', count ? String(f.families) : 'Fewer than 5'], ...(f.families >= OFFER_AT ? [['First term', `Because ${OFFER_AT} or more of your families already use it`, 'No charge']] : []), ['Their credits', 'Club games become free for them', 'Still theirs']] as [string, string, string][]).map(([a, b, v]) => <div key={a} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderTop: `1px solid ${LINE}` }}><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{a}</strong><span style={{ fontSize: 13, color: MUT }}>{b}</span></span><strong style={{ flex: 'none', fontSize: 15 }}>{v}</strong></div>)}</section>
          <section style={{ borderRadius: 14, background: PALE, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 14 }}>About filming at your club</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>If your club or association has a rule on filming juniors, tell us and we show it to every family before they film.</span></section>
        </div>
      </main>
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 560, zIndex: 60, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600 }}>{toast}</div>}
    </div>)
}
