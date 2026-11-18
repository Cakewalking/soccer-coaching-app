// Football at home (parent phone): GSp9 the library, GSp10 one film.
// Default is "Just a ball". No film needs kit beyond a ball unless it is tagged.
// No streaks, counts or tables: "We did it" sends the coach one tick for that child and film, nothing else.

import { useState } from 'react'
import { Phone } from '../connected/CnPhone'
import { Ico, tile, G, INK, MUT, LINE, PALE } from '../capture/marks'
import { playClips } from '../clips/clipSheet'
import { TEAMS, type Theme, type TeamKey } from './sessionEngine'
import { useSession, setSession, sessionFor } from './sessionStore'

type Film = { id: string; name: string; kind: string; mins: number; tags: string[]; themes: Theme[]; len: string; steps: [string, string][]; need: string }
export const FILTERS = ['Just a ball', 'Small space', '5 minutes', 'With a parent', 'Indoors']
export const FILMS: Film[] = [
  { id: 'wall', name: 'First touch off a wall', kind: 'Skill', mins: 4, tags: ['Just a ball'], themes: ['firstTouch', 'playOut', 'beatPress'], len: '1:10', steps: [['Pass against the wall', '10 times'], ['Touch it to the side as it comes back', '10 each side'], ['Look over your shoulder first', '10 times']], need: 'a ball and a wall or a fence. No wall? A parent can pass it back.' },
  { id: 'look', name: 'Look, then touch', kind: 'Game for two', mins: 5, tags: ['With a parent'], themes: ['firstTouch', 'movingToHelp', 'findSpace', 'playOut'], len: '1:20', steps: [['Your partner holds up a hand as they pass', '10 times'], ['Call left or right before the ball arrives', '10 times'], ['Touch it the way they pointed', '10 times']], need: 'a ball and one other person.' },
  { id: 'taps', name: 'Toe taps and rolls', kind: 'Warm-up', mins: 3, tags: ['Just a ball', 'Indoors'], themes: [], len: '0:45', steps: [['Tap the top of the ball, one foot then the other', '30 seconds'], ['Roll it side to side under your foot', '30 seconds'], ['Do both without looking down', '30 seconds']], need: 'a ball. Works on carpet.' },
  { id: 'stepover', name: 'The step-over', kind: 'Trick', mins: 4, tags: ['Just a ball', 'Small space'], themes: ['brave', 'oneVone'], len: '1:00', steps: [['Step round the ball without touching it', '10 times'], ['Push it away with the other foot', '10 times'], ['Do it at walking pace, then faster', '10 times']], need: 'a ball and a little room.' },
  { id: 'chase', name: 'Chase your own pass', kind: 'Game', mins: 5, tags: ['Just a ball', 'Small space'], themes: ['winBack', 'setPieces'], len: '1:05', steps: [['Pass it against the wall, a bit too hard', '10 times'], ['Sprint to win it before it stops', '10 times'], ['Turn and go the other way', '5 each side']], need: 'a ball and a wall or a fence.' },
  { id: 'gates', name: 'Two-cone gates', kind: 'Skill', mins: 4, tags: ['Just a ball', 'Small space'], themes: ['running', 'brave', 'oneVone'], len: '0:55', steps: [['Run the ball through a gate of two shoes', '10 times'], ['Go faster, keep it close', '10 times'], ['Try your other foot', '10 times']], need: 'a ball and two shoes for a gate.' },
]
const WHY: Partial<Record<Theme, string>> = {
  firstTouch: 'On Saturday the team gave the ball away when someone ran at them. A good first touch takes it away from trouble.', movingToHelp: 'On Saturday the players without the ball stood still. Looking first is how you find the free player.',
  findSpace: 'On Saturday everyone chased the ball together. Looking up first is how you find a friend in space.', brave: 'The team is learning to take a player on. A trick you trust makes that easier.',
  winBack: 'On Saturday the team was slow to win the ball back. Chasing your own pass is the same habit.', playOut: 'The team is learning to play out from the back. A calm first touch is where it starts.',
  running: 'The team is working on running with the ball. Close touches at home make it easier on the pitch.', oneVone: 'The team is learning to take a player on. A trick you trust makes that easier.',
  setPieces: 'The team is working on being first to the ball. Chasing your own pass is the same habit.', beatPress: 'The team is learning to play through a press. A calm first touch is where it starts.',
}
type Who = { team?: TeamKey; child?: string; ini?: string; home?: string; onNav?: (s: string) => void }
let openFilm = 'wall'   // the film tapped in the library
// U11 Luke's family is the one drawn; the demo parent (Mia, U12 Sam) has her own copies of the two screens.
const LIB = (team: TeamKey) => team === 'u11' ? 'GSp9-HomeLibrary' : 'GSp9m-HomeLibraryMia', VID = (team: TeamKey) => team === 'u11' ? 'GSp10-HomeVideo' : 'GSp10m-HomeVideoMia'

export function GSp9HomeLibrary({ team = 'u11', child = 'Ari', ini = 'DB', home = 'STO17-HomeStoryParent', onNav = () => {} }: Who) {
  const s = useSession(), t = TEAMS[team], themes = sessionFor(s, team, { bye: false }).themes
  const [toast, setToast] = useState<string | null>(null), [warm, setWarm] = useState(false), [all, setAll] = useState(false)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(x => x === m ? null : x), 3000) }
  const on = s.home.filters, matches = (f: Film) => f.themes.some(x => themes.includes(x))
  const ok = (f: Film) => !on.length || matches(f) || on.some(x => x === '5 minutes' ? f.mins <= 5 : f.tags.includes(x))   // any filter that fits, and this week's two always
  const list = FILMS.filter(f => warm ? f.kind === 'Warm-up' : all || ok(f)).sort((a, b) => Number(matches(b)) - Number(matches(a))).slice(0, all || warm ? 99 : 4)
  const two = FILMS.filter(matches).length
  return (
    <Phone id="GSp9-HomeLibrary" over={`${t.label} · for ${child}`} title="Football at home" ini={ini} home={home} onNav={onNav} toast={toast}
      intro={[`FROM ${t.coach.toUpperCase()} THIS WEEK`, `${two >= 2 ? 'Two' : 'One'} to try before Tuesday. ${two >= 2 ? 'Both match' : 'It matches'} what the team is working on.`, 'Five minutes each. A ball and a wall is enough.']}
      left={{ t: warm ? 'All kinds' : 'Warm-ups', on: () => { setWarm(w => !w); setAll(false); say(warm ? 'Skills, tricks, games and warm-ups.' : '12 warm-ups, all with just a ball.') } }}
      right={{ t: all ? 'With my filters' : 'All 64 films', on: () => { setAll(a => !a); setWarm(false); say(all ? 'Back to your filters.' : 'All 64 films, with your filters kept.') } }}>
      <section style={{ ...tile, padding: '12px 14px 14px', gap: 10 }}>
        <strong style={{ fontSize: 15 }}>Show me</strong>
        <div role="group" aria-label="Show me" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{FILTERS.map(f => { const sel = on.includes(f); return <button key={f} role="checkbox" aria-checked={sel} onClick={() => { setSession(x => ({ home: { ...x.home, filters: sel ? x.home.filters.filter(y => y !== f) : [...x.home.filters, f] } })); setAll(false); setWarm(false); say(`${f}: ${sel ? 'taken off' : 'picked'}.`) }} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${sel ? G : LINE}`, background: sel ? G : '#fff', color: sel ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{f}</button> })}</div>
      </section>
      {list.map(f => (
        <button key={f.id} data-film={f.id} onClick={() => { openFilm = f.id; onNav(VID(team)) }} style={{ ...tile, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, textAlign: 'left', fontFamily: 'inherit', color: INK, cursor: 'pointer' }}>
          <span style={{ flex: 'none', width: 76, height: 60, borderRadius: 10, background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d="M8 5l11 7-11 7z" size={16} /></span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>{f.name}{s.home.done.includes(`${child}:${f.id}`) ? ' · done' : ''}</strong><span style={{ fontSize: 13, color: MUT }}>{f.kind} · {f.mins} min</span>
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{[f.tags[0], ...(matches(f) ? ['Matches Tuesday'] : f.tags.slice(1, 2))].map(x => <span key={x} style={{ height: 20, padding: '0 8px', borderRadius: 999, background: PALE, fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>{x}</span>)}</span>
          </span>
        </button>
      ))}
      {!list.length && <span style={{ fontSize: 14, color: MUT, padding: '8px 4px' }}>No films match those filters. Take one off, or see all 64.</span>}
    </Phone>
  )
}

export function GSp10HomeVideo({ team = 'u11', child = 'Ari', ini = 'DB', onNav = () => {} }: Who) {
  const s = useSession(), t = TEAMS[team], f = FILMS.find(x => x.id === openFilm) ?? FILMS[0], themes = sessionFor(s, team, { bye: false }).themes
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(x => x === m ? null : x), 3200) }
  const th = f.themes.find(x => themes.includes(x)), key = `${child}:${f.id}`, done = s.home.done.includes(key)
  const [m, sec] = f.len.split(':').map(Number)
  return (
    <Phone id="GSp10-HomeVideo" over={`Football at home · ${f.kind.toLowerCase()}`} title={f.name} ini={ini} home={LIB(team)} onNav={onNav} toast={toast}
      foot={`Nothing is counted and nobody is told. If ${child} wants to tell ${t.coach}, there is a button.`}
      left={{ t: 'Another one', on: () => onNav(LIB(team)) }}
      right={{ t: done ? 'Done. Tell Luke again'.replace('Luke', t.coach) : 'We did it', on: () => { setSession(x => ({ home: { ...x.home, done: [...new Set([...x.home.done, key])] } })); say(`Nice. ${t.coach} sees a tick beside this film for ${child}, and nothing else.`) } }}>
      <button onClick={() => { playClips([{ title: f.name, sub: `${f.kind}. ${f.mins} minutes to do.`, len: Math.min(20, m * 60 + sec) }], 'Football at home'); say(`The film plays: ${m ? `${m} minute${m > 1 ? 's' : ''} ` : ''}${sec}.`) }} aria-label={`Watch it first · ${f.len}`} style={{ minHeight: 190, borderRadius: 16, border: 0, background: G, color: '#fff', fontFamily: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={{ width: 56, height: 56, borderRadius: 999, background: '#fff', color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d="M8 5l11 7-11 7z" size={20} /></span><strong style={{ fontSize: 14 }}>Watch it first · {f.len}</strong>
      </button>
      <section style={{ ...tile, padding: '12px 14px 14px', gap: 6 }}><strong style={{ fontSize: 15 }}>Why {child}’s team is doing this</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>{(th && WHY[th]) ?? 'A little and often with a ball makes every game easier. This one is not tied to Tuesday.'}</span></section>
      <section style={{ ...tile, padding: '12px 14px 14px', gap: 0 }}>
        <strong style={{ fontSize: 15, paddingBottom: 6 }}>Have a go</strong>
        {f.steps.map(([a, b], i) => <div key={a} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 44, borderTop: `1px solid ${LINE}`, fontSize: 14 }}><span>{i + 1} · {a}</span><strong style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>{b}</strong></div>)}
        <span style={{ fontSize: 13, lineHeight: '18px', color: MUT, paddingTop: 8 }}>You need: {f.need}</span>
      </section>
    </Phone>
  )
}
