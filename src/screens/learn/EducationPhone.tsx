// Education centre on a phone. ECp1 · a family's library ("Football at home") · ECp2 · one clip, with the game to play ·
// ECp3 · a player of 16 and over: their own clips first, then shelves.
// A child under 12 has no account, so ECp1 and ECp2 are the parent's. Nothing is counted or ranked for the family:
// "We did it" sends the coach one tick for that child and clip, and nothing else.

import { useState } from 'react'
import { useBackState } from '../../backState'
import { openScreen } from '../openThing'
import { demoToast } from '../demoToast'
import { G, INK, MUT, LINE } from '../capture/marks'
import { TEAMS, type TeamKey } from '../session/sessionEngine'
import LearnPlayer, { Thumb, type Chapter, type Frame } from './LearnPlayer'
import { P_ITEMS, byTitle, familyDid, item, maySend, shown, teamAge, useClub, type PItem } from './library'

const SPARK = 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'
const round: React.CSSProperties = { flex: 'none', width: 44, height: 44, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer', boxSizing: 'border-box' }
const card: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }
const phone: React.CSSProperties = { width: 390, minHeight: 844, margin: '0 auto', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column' }
const wideBtn = (primary: boolean): React.CSSProperties => ({ flex: 1, minHeight: 48, borderRadius: 12, border: primary ? 0 : `1px solid ${LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' })
const lower = (t: string) => t.charAt(0).toLowerCase() + t.slice(1)
/** The four chips on a family's library, and what each asks of a clip. */
const CHIPS: [string, (i: PItem) => boolean][] = [['Just a ball', i => i.you_need === 'Just a ball'], ['Indoors', i => i.you_need === 'No ball' || i.you_need === 'Just a ball'], ['5 minutes', i => i.secs <= 300], ['With a parent', i => i.you_need === 'With a partner']]
/** A clip that is the player's own, from their games. The titles are the board's. */
type Own = { title: string; len: string; own: true }
const OWN: Own[] = [{ title: 'Turned out of trouble, 34th minute', len: '0:11', own: true }, { title: 'Switch of play, 51st minute', len: '0:09', own: true }, { title: 'Pressed and won it', len: '0:08', own: true }]
type Open = PItem | Own
const secsOf = (len: string) => { const [m, s] = len.split(':').map(Number); return m * 60 + s }
const chapters = (frame: Frame, secs: number, cue: string, first: string): Chapter[] => [{ key: 'clip', frame, label: first, short: first, secs: Math.max(4, secs), lines: [cue] }, { key: 'slow', frame, label: 'Slow', short: 'Slow', secs: Math.floor(Math.max(4, secs) * 4 / 3), lines: [cue], slow: true }]

export default function EducationPhone({ start = 'ECp1-FamilyLibrary', team, child, ini, onNav, own, show: first }: { start?: string; team?: TeamKey; child?: string; ini?: string; onNav?: (s: string) => void; /** Clean Sheet Family: no coach and no club, so the library is Clean Sheet's own items for a child of this age */ own?: { age: number; home: string }; /** the title of the item to open on */ show?: string }) {
  const player = start === 'ECp3-PlayerLibrary'
  const k: TeamKey = team ?? (player ? 'u16' : 'u9'), t = TEAMS[k], age = own?.age ?? teamAge(k), kid = child ?? (player ? 'Mateo' : 'Ivy'), sample = !own && k === 'u9' && kid === 'Ivy', fam = own?.home   // Clean Sheet Family: where its Learn tab is
  const club = useClub()
  const [id, setId] = useBackState(start)
  const [open, setOpen] = useBackState<string>(() => byTitle(first ?? 'Eyes up while you dribble', 'players')!.id)   // the clip ECp2 shows: an item id, or "own:n"
  const [on, setOn] = useBackState<string[]>(['Just a ball'])
  const [all, setAll] = useBackState<string | null>(null)
  const [captions, setCaptions] = useState(true)
  const [done, setDone] = useState<string[]>([])
  const home = player ? 'ECp3-PlayerLibrary' : 'ECp1-FamilyLibrary'
  const go = (s: string) => s.startsWith('ECp') ? setId(s) : onNav ? onNav(s) : openScreen(s)
  const show = (o: string) => { setOpen(o); setId('ECp2-FamilyItem'); window.scrollTo?.(0, 0) }
  // What this family or player may see: nothing for an older age, nothing the club has switched off.
  const mine = P_ITEMS.filter(i => !i.club && shown(i, club) && maySend(i, age) && i.lo <= age)
  const picked = (i: PItem) => CHIPS.filter(c => on.includes(c[0])).every(c => c[1](i)) || on.length === 0
  const head = (over: string, title: string, back: string, who: string) => (
    <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
      <button aria-label="Back" onClick={() => go(back)} style={{ ...round, border: 0, background: 'transparent', color: '#fff', marginLeft: -10 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg></button>
      <span style={{ flexGrow: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 12, color: '#cfe6dc' }}>{over}</span><strong style={{ fontSize: 20, lineHeight: '25px' }}>{title}</strong></span>
      <button aria-label="Ask Clean Sheet" onClick={() => go('ASKp2-PhoneAskOpen')} style={{ ...round, border: '1.5px solid #a9cfc0', background: 'transparent', color: '#fff' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={SPARK} /></svg></button>
      <span style={{ ...round, cursor: 'default', background: '#cbbeb5', color: INK, fontSize: 14, fontWeight: 700 }}>{who}</span>
    </div>)
  const tile = (key: string, frame: Frame, len: string, title: string, sub: string, o: string) => (
    <button key={key} onClick={() => show(o)} style={{ flex: 'none', width: 150, display: 'flex', flexDirection: 'column', gap: 3, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
      <Thumb kind={frame} len={len} wide /><strong style={{ fontSize: 14, lineHeight: '18px', marginTop: 2 }}>{title}</strong><span style={{ fontSize: 12, color: MUT }}>{sub}</span>
    </button>)
  const shelf = (name: string, tiles: React.ReactNode[], total: number) => (
    <section aria-label={name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><strong style={{ fontSize: 16 }}>{name}</strong>{total >= 3 && <button onClick={() => { setAll(all === name ? null : name); demoToast(`All of ${name}.`) }} aria-label={`See all, ${name}`} style={{ minHeight: 44, border: 0, background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: G, textDecoration: 'underline', cursor: 'pointer' }}>See all</button>}</div>
      {tiles.length ? <div style={{ display: 'flex', gap: 10, overflowX: all === name ? undefined : 'auto', flexWrap: all === name ? 'wrap' : 'nowrap', paddingBottom: 4 }}>{all === name ? tiles : tiles.slice(0, 3)}</div> : <span style={{ fontSize: 13, color: MUT }}>Nothing here fits those. Take one off.</span>}
    </section>)
  const bar = (a: [string, () => void], b: [string, () => void]) => <div style={{ flex: 'none', position: 'sticky', bottom: 0, display: 'flex', gap: 10, padding: '10px 14px 14px', background: '#f7f8f7', borderTop: `1px solid ${LINE}` }}><button onClick={a[1]} style={wideBtn(false)}>{a[0]}</button><button onClick={b[1]} style={wideBtn(true)}>{b[0]}</button></div>

  // ── ECp2 · one clip, why the team is doing it, and the game to play at home ──
  if (id === 'ECp2-FamilyItem') {
    const own = open.startsWith('own:') ? OWN[Number(open.slice(4))] : null, i: Open = own ?? (item(open) as PItem), eyes = !own && sample && i.title === 'Eyes up while you dribble'
    const secs = own ? secsOf(own.len) : (i as PItem).secs, frame: Frame = own || eyes ? 'team' : 'figure', was = done.includes(open)
    return (
      <div data-screen="ECp2-FamilyItem" style={phone}>
        {head(player ? 'Learn · your clip' : `Football at home · ${own ? 'clip' : lower((i as PItem).kind)}`, i.title, start === 'ECp2-FamilyItem' && fam ? fam : home, ini ?? (player ? 'MR' : 'DB'))}
        <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <LearnPlayer key={open} phone tryLabel="Try" chapters={chapters(frame, secs, eyes ? 'Watch her head' : i.title, own ? 'You' : 'Clip')} ratio="362 / 215" chips={[eyes ? 'Ivy · last Saturday' : own ? 'You · Saturday' : 'From Clean Sheet’s library']} captions={captions} onCaptions={setCaptions} say={demoToast}
            tryCard={{ heading: eyes ? 'Have a go: the numbers game' : 'Have a go', at: '', task: eyes ? 'Dribble towards a grown-up. They hold up fingers. Shout the number. Stop the ball on “freeze”.' : i.title, button: '', done: false, onAdd: () => {} }} />
          {eyes && <section style={card}><strong style={{ fontSize: 15 }}>Why {t.coach}’s team is doing this</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>They are learning to run with the ball and still see what is around them.</span></section>}
          <section style={{ ...card, border: `2.5px solid ${INK}` }}>
            <strong style={{ fontSize: 16 }}>{eyes ? 'Have a go: the numbers game' : 'Have a go'}</strong>
            {eyes ? <>
              {[['1 · Dribble towards a grown-up', 'Ten steps'], ['2 · They hold up fingers. Shout the number', 'Five goes'], ['3 · Stop the ball on “freeze”', 'Five goes']].map(([a, b]) => <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '7px 0', borderTop: `1px solid ${LINE}`, fontSize: 14, lineHeight: '19px' }}><span>{a}</span><strong style={{ flex: 'none' }}>{b}</strong></div>)}
              <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>You need a ball and a bit of space. Indoors works with a soft ball.</span>
            </> : <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>{own ? 'Watch it once, then once in slow motion.' : `The game for this one is not written yet. You need: ${lower((i as PItem).you_need)}.`}</span>}
            {!player && <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{own || fam ? 'Nothing is counted and nobody is ranked.' : `Nothing is counted and nobody is ranked. If ${kid} wants ${t.coach} to know, there is a button.`}</span>}
          </section>
        </div>
        {own || fam ? <div style={{ flex: 'none', position: 'sticky', bottom: 0, display: 'flex', padding: '10px 14px 14px', background: '#f7f8f7', borderTop: `1px solid ${LINE}` }}><button onClick={() => go(start === 'ECp2-FamilyItem' && fam ? fam : home)} style={wideBtn(true)}>Another one</button></div> : bar(['Another one', () => go(home)], [was ? 'Done' : 'We did it', () => { if (was) { demoToast(`${t.coach} already has the tick for this clip.`); return } setDone([...done, open]); if (!own) familyDid(k, open); demoToast(player ? `Nice. ${t.coach} sees a tick for you on this clip, and nothing else.` : `Nice. ${t.coach} sees a tick for ${kid} on this clip, and nothing else.`) }])}
      </div>)
  }

  // ── ECp3 · a player of 16 and over ─────────────────────────────────────────
  if (player) {
    const row = (name: string, titles: string[]) => { const its = mine.filter(i => i.shelf === name), order = [...titles.map(tt => its.find(i => i.title === tt)).filter((i): i is PItem => !!i), ...its.filter(i => !titles.includes(i.title))]; return shelf(name, order.map(i => tile(i.id, 'figure', i.length, i.title, i.kind, i.id)), order.length) }
    return (
      <div data-screen="ECp3-PlayerLibrary" style={phone}>
        {head(`${t.label} · ${kid}`, 'Learn', 'PU1-PlayerHome', ini ?? 'MR')}
        <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <LearnPlayer phone tryLabel="Try" chapters={chapters('team', 11, 'Your first touch', 'You')} ratio="362 / 215" chips={['Your clip · Saturday']} captions={captions} onCaptions={setCaptions} say={demoToast}
            tryCard={{ heading: 'Your first touch under pressure', at: '', task: `Picked by ${t.coach} · goes with your goal for this term`, button: '', done: false, onAdd: () => {} }} />
          <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17, lineHeight: '22px' }}>Your first touch under pressure</strong><span style={{ fontSize: 13, color: MUT }}>Picked by {t.coach} · goes with your goal for this term</span></span>
          {shelf('From your own games', OWN.map((o, n) => tile(o.title, 'team', o.len, o.title, 'Your clip', `own:${n}`)), OWN.length)}
          {row('Understanding the game', ['What pressing means', 'How to watch a game', 'Reading your own clips'])}
          {row('Looking after yourself', ['Coming back after time off', 'The night before a game', 'Cooling down in three minutes'])}
        </div>
        {bar(['Search', () => demoToast('Search opens.')], ['Saved · 3', () => demoToast('Your saved list opens.')])}
      </div>)
  }

  // ── ECp1 · a family's library ──────────────────────────────────────────────
  const eyes = byTitle('Eyes up while you dribble', 'players') as PItem, week = sample ? eyes : mine.find(i => i.shelf === 'First touch') ?? mine[0]
  const row = (name: string, titles: string[]) => { const its = mine.filter(i => i.shelf === name && picked(i) && i.id !== week.id), order = [...titles.map(tt => its.find(i => i.title === tt)).filter((i): i is PItem => !!i), ...its.filter(i => !titles.includes(i.title))]; return shelf(name, order.map(i => tile(i.id, 'figure', i.length, i.title, `${i.kind} · ${lower(i.you_need)}`, i.id)), order.length) }
  return (
    <div data-screen="ECp1-FamilyLibrary" style={phone}>
      {head(own ? `Free · for ${kid}` : `${t.label} · for ${kid}`, 'Football at home', own?.home ?? 'STO17-HomeStoryParent', ini ?? 'DB')}
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <LearnPlayer phone tryLabel="Try" chapters={chapters(sample ? 'team' : 'figure', week.secs, sample ? 'Watch her head' : week.title, 'Clip')} ratio="362 / 215" chips={[own ? 'From Clean Sheet’s library' : `From ${t.coach} this week`]} captions={captions} onCaptions={setCaptions} say={demoToast}
          tryCard={{ heading: 'Have a go', at: '', task: week.title, button: '', done: false, onAdd: () => {} }} />
        <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17, lineHeight: '22px' }}>{week.title}</strong><span style={{ fontSize: 13, color: MUT }}>{sample ? 'That’s Ivy, last Saturday · 9 seconds · just a ball' : `${week.kind} · ${week.length} · ${lower(week.you_need)}`}</span></span>
        <div role="group" aria-label="Show me" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{CHIPS.map(([c]) => { const is = on.includes(c); return <button key={c} role="checkbox" aria-checked={is} onClick={() => { setOn(is ? on.filter(v => v !== c) : [...on, c]); demoToast(`${c}: ${is ? 'removed' : 'added'}.`) }} style={{ minHeight: 44, padding: '0 13px', borderRadius: 999, border: is ? 0 : `1px solid ${LINE}`, background: is ? G : '#fff', color: is ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{c}</button> })}</div>
        {row(week.shelf, ['Big touches into space', 'Traffic lights', 'Stop and go'])}
        {row('Play at home', ['Toe taps and rolls', 'Bin goal', 'Hallway dribble'])}
      </div>
      {bar(['Search', () => demoToast('Search opens.')], ['Play the game', () => show(week.id)])}
    </div>)
}
