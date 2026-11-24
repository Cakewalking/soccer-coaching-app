// ADC4-SkillsCheck: four stations, weeks 1 and 8, one per core skill.
// Each child is compared with their own earlier number only. Nobody sees a ranking.
//
// The board draws two stations as counted from film, with the Strong chip. That is not validated,
// so it sits behind FILM_COUNTS_SKILLS_CHECK: while it is off, all four are the coach's taps.

import { demoToast } from '../demoToast'
import { FILM_COUNTS_SKILLS_CHECK, type CoreSkill } from './skills'
import { Head, More, Page, Primary, Strong, TileHead, YouCounted } from './kit'
import { G, HAIR, INK, LINE, MUT, PALE, foot, note, plain, th, tile } from './styles'

const PLAYERS = ['Kai', 'Ana', 'Jonah', 'Finn', 'Lola', 'Zane', '17 more']

// `film`: a station film would count once the switch is on. The other two are always the coach's taps.
const STATIONS: Array<{ skill: CoreSkill; counted: string; week1: string; week8: string; change: string; film: boolean }> = [
  { skill: 'First touch',           counted: 'Wall passes in 30 seconds, both feet',                     week1: '24',  week8: '29',  change: 'Up 5',                 film: true },
  { skill: 'Running with the ball', counted: '20 metres through 6 cones, seconds',                       week1: '7.9', week8: '7.4', change: 'Half a second faster', film: true },
  { skill: 'One against one',       counted: 'Gets past a defender, out of 6 goes',                      week1: '3',   week8: '4',   change: 'Up 1',                 film: false },
  { skill: 'Striking the ball',     counted: 'Hits the target from 12 metres, weaker foot, out of 10',   week1: '3',   week8: '5',   change: 'Up 2',                 film: false },
]

const HOW = FILM_COUNTS_SKILLS_CHECK
  ? [
      { a: 'Same four stations each time', b: 'Weeks 1 and 8 of every term' },
      { a: 'Film counts two of them',      b: 'Wall passes and the cone run' },
      { a: 'You tap the other two',        b: 'One tap per go' },
      { a: 'It lands in the player’s file', b: 'And in the term report' },
    ]
  : [
      { a: 'Same four stations each time', b: 'Weeks 1 and 8 of every term' },
      { a: 'You count all four',           b: 'One tap per go, and the time for the cone run' },
      { a: 'It lands in the player’s file', b: 'And in the term report' },
    ]

const COLS = '1.1fr 1.7fr 0.6fr 0.6fr 0.9fr'

export default function ADC4SkillsCheck({ go }: { go: (id: string) => void }) {
  return (
    <Page columns="minmax(0,1fr) 300px" head={
      <Head title="Skills check" sub="Advanced · week 8 against week 1 · four stations, 25 minutes">
        <More onClick={() => demoToast('Four cards open to print or show on the tablet: set-up, distance and what to count.')}>Station cards</More>
        <Primary onClick={() => demoToast(FILM_COUNTS_SKILLS_CHECK ? 'Station 1 opens. Tap a player, then their count. Film counts where it can.' : 'Station 1 opens. Tap a player, then their count.')}>Start the check</Primary>
      </Head>
    }>
      <section aria-label="Kai’s check" style={{ ...tile, padding: '14px 18px' }}>
        <div role="radiogroup" aria-label="Player" style={{ display: 'flex', gap: 8, overflow: 'hidden' }}>
          {PLAYERS.map((p, i) => (
            <button key={p} role="radio" aria-checked={i === 0} onClick={() => demoToast(`${p}: their check opens.`)}
              style={{ flex: 'none', height: 44, padding: '0 14px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', ...(i === 0 ? { background: G, color: '#ffffff', border: `1px solid ${G}` } : { background: '#ffffff', color: INK, border: `1px solid ${LINE}` }) }}>
              {p}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'end', paddingBottom: 6 }}>
          {['Skill', 'What is counted', 'Week 1', 'Week 8', 'Change'].map(h => <span key={h} style={th}>{h}</span>)}
        </div>
        {STATIONS.map(s => (
          <div key={s.skill} style={{ display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'center', minHeight: 92, borderTop: `1px solid ${HAIR}`, fontSize: 14, lineHeight: '19px', color: INK }}>
            <strong style={{ fontSize: 15 }}>{s.skill}</strong>
            <span style={{ color: MUT }}>{s.counted}</span>
            <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{s.week1}</span>
            <strong style={{ fontSize: 17, fontVariantNumeric: 'tabular-nums' }}>{s.week8}</strong>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' }}>
              <strong style={{ fontSize: 14 }}>{s.change}</strong>
              {s.film && FILM_COUNTS_SKILLS_CHECK ? <Strong /> : <YouCounted />}
            </span>
          </div>
        ))}
        <div style={note}>
          Kai’s goal is his left foot. Weaker-foot hits went from 3 to 5.{' '}
          <button onClick={() => go('ACC6-ReportDraft')} style={{ ...plain, display: 'inline-flex', alignItems: 'center', minHeight: 44, margin: '-12px 0', color: G, font: 'inherit', textDecoration: 'underline' }}>Add to his term report</button>
        </div>
        <span style={foot}>Each child sees their own before and after. Nobody sees a ranking, and you don’t either: the group view shows steps, not places.</span>
      </section>

      <aside aria-label="How it works" style={{ ...tile, gap: 2 }}>
        <TileHead title="How it works" flat />
        {HOW.map((h, i) => (
          <div key={h.a} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: `1px solid ${HAIR}` }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: PALE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{h.a}</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>{h.b}</span>
            </span>
          </div>
        ))}
        <div style={note}>
          {FILM_COUNTS_SKILLS_CHECK ? <><Strong /> was counted from film. The others are your count on the night.</> : 'Every number here is your count on the night.'}
        </div>
        <span style={foot}>A test shows a skill on its own. The game shows whether it is used. The file keeps both.</span>
      </aside>
    </Page>
  )
}
