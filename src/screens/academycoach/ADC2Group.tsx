// ADC2-Group: the coach's own group on the four core skills. Coach-only: players and families
// never see a table of the group. The rows are sorted by name and by nothing else; there is no
// way to order them by level.

import { useSteps } from './steps'
import { Dots, Head, Initials, More, Page, Primary, TileHead, Two } from './kit'
import { HAIR, INK, MAUVE_PALE, MUT, foot, listTile, plain, th, tile } from './styles'

// Steps in the order of the four core skills: first touch, running with the ball, one against one, striking the ball.
const GROUP: Array<{ ini: string; name: string; steps: [number, number, number, number]; up: string; goal: string | null }> = [
  { ini: 'KO', name: 'Kai Okonkwo', steps: [3, 4, 4, 2], up: '+1',  goal: 'Score with his left foot' },
  { ini: 'AC', name: 'Ana Costa',   steps: [3, 3, 2, 3], up: 'New', goal: null },
  { ini: 'JM', name: 'Jonah Marsh', steps: [4, 3, 3, 4], up: '0',   goal: 'Play off fewer touches' },
  { ini: 'FB', name: 'Finn Byrne',  steps: [2, 3, 3, 2], up: '+2',  goal: 'First touch on the move' },
  { ini: 'LN', name: 'Lola Nguyen', steps: [4, 4, 3, 2], up: '+1',  goal: 'Shoot earlier' },
  { ini: 'ZA', name: 'Zane Abbas',  steps: [3, 4, 4, 3], up: '+1',  goal: 'Use the weaker foot' },
  { ini: 'IT', name: 'Isla Tran',   steps: [3, 2, 3, 3], up: '+2',  goal: 'Run at the defender' },
  { ini: 'NP', name: 'Noah Petrov', steps: [2, 3, 2, 2], up: '0',   goal: 'Check his shoulder' },
]
const BY_NAME = [...GROUP].sort((a, b) => a.name.localeCompare(b.name))
const STRIKING = 3   // the place of striking the ball in a player's steps

const COLS = '1.4fr 0.8fr 0.8fr 0.8fr 0.8fr 0.6fr 1.5fr'

export default function ADC2Group({ go }: { go: (id: string) => void }) {
  const { striking } = useSteps()   // moved by the taps after a session (ADC11)
  return (
    <Page columns="minmax(0,1fr) 300px" head={
      <Head title="Advanced" sub="Ages 12 to 14 · 22 players · showing 8">
        <More onClick={() => go('ADC4-SkillsCheck')}>Run the skills check</More>
        <Primary onClick={() => go('ACT2-AcademySuggested')}>Plan from this</Primary>
      </Head>
    }>
      <section aria-label="The group" style={listTile}>
        <TileHead title="The group" right="Sorted by name" />
        <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'end', paddingBottom: 6 }}>
          {['Player', 'First touch', 'Running with it', 'One against one', 'Striking', 'Steps up', 'Goal this term'].map(h => <span key={h} style={th}>{h}</span>)}
        </div>
        {BY_NAME.map(p => (
          <button key={p.ini} onClick={() => go('ADC1-PlayerFile')} style={{ ...plain, display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'center', minHeight: 56, borderTop: `1px solid ${HAIR}`, fontSize: 14, lineHeight: '19px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}><Initials size={32}>{p.ini}</Initials>{p.name}</span>
            {p.steps.map((s, i) => <Dots key={i} step={i === STRIKING ? striking[p.name] ?? s : s} size={10} />)}
            <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{p.up}</span>
            <span style={{ color: p.goal ? INK : MUT }}>{p.goal ?? 'Not set yet'}</span>
          </button>
        ))}
        <span style={foot}>Steps are yours, from two taps per player after a session. This screen is for coaches only. Players and families never see a table of the group.</span>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
        <section aria-label="What the group needs" style={{ ...tile, gap: 6 }}>
          <TileHead title="What the group needs" flat />
          <Two a="Striking the ball" b="14 of 22 are on step 2 or below" />
          <Two a="Next block, weeks 6 to 10" b="Finishing with the weaker foot · already in your year plan" />
          <More onClick={() => go('ACT2-AcademySuggested')} style={{ alignSelf: 'flex-start' }}>See suggested sessions</More>
        </section>

        <section aria-label="Needs you" style={{ ...tile, gap: 2, flexGrow: 1, borderTop: '4px solid #c39797' }}>
          <TileHead title="Needs you" flat />
          {[
            { n: '1', a: 'Ana has no goal yet', b: 'She joined 3 weeks ago', does: 'Set one', opens: 'ADC10-SetGoal' },
            { n: '3', a: '3 players have no note in 3 weeks', b: 'Noah, Jonah and Mila', does: 'Add', opens: 'ADC11-AfterSession' },
          ].map(r => (
            <div key={r.n} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 58, borderTop: `1px solid ${HAIR}` }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: MAUVE_PALE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.n}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{r.a}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>{r.b}</span>
              </span>
              <More onClick={() => go(r.opens)}>{r.does}</More>
            </div>
          ))}
          <span style={foot}>A term report can’t be drafted without notes.</span>
        </section>
      </div>
    </Page>
  )
}
