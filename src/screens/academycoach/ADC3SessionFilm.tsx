// ADC3-SessionFilm: tonight's film, grouped by player and tagged with a core skill.
// A clip goes to that child's own family only. Other children in it are blurred unless their
// family has agreed. From 13 it also shows in the player's own app.

import { demoToast } from '../demoToast'
import { playClips } from '../clips/clipSheet'
import { markDone } from '../doneStore'
import { Film, Head, Initials, More, Page, Primary, TileHead, Two } from './kit'
import { G, HAIR, INK, MAUVE, MUT, PALE, cap, foot, listTile, plain, tile } from './styles'

// In the order the film found them: most moments first. This is a count of clips, not a level.
const PLAYERS = [
  { ini: 'KO', name: 'Kai Okonkwo', what: 'Left-foot finish · one against one', n: 5 },
  { ini: 'LN', name: 'Lola Nguyen', what: 'First touch away from pressure',     n: 4 },
  { ini: 'ZA', name: 'Zane Abbas',  what: 'Runs with it, head up',              n: 4 },
  { ini: 'IT', name: 'Isla Tran',   what: 'Takes her player on',                n: 3 },
  { ini: 'FB', name: 'Finn Byrne',  what: 'First touch on the move',            n: 2 },
]
const SHOWN = 'Kai Okonkwo'   // the one moment the board draws

const tag = { display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' } as const

export default function ADC3SessionFilm({ go }: { go: (id: string) => void }) {
  return (
    <Page columns="380px minmax(0,1fr)" head={
      <Head title="Tonight’s film" sub="Advanced · Thursday 4 June · 70 minutes on the tablet · 38 moments found">
        <More onClick={() => go('C1-ClipsTab')}>All 38 moments</More>
        <Primary onClick={() => { markDone('adc3:best-to-reports'); demoToast('One moment per player is added to their draft report. You can swap any of them.') }}>Add the best to term reports</Primary>
      </Head>
    }>
      <section aria-label="By player" style={listTile}>
        <TileHead title="By player" right="Most first" />
        {PLAYERS.map(p => {
          const on = p.name === SHOWN
          return (
            <button key={p.ini} aria-current={on} onClick={() => demoToast(`${p.name}: their moments open.`)}
              style={{ ...plain, display: 'flex', alignItems: 'center', gap: 10, minHeight: 64, ...(on ? { background: PALE, borderRadius: 10, padding: '0 8px' } : { borderTop: `1px solid ${HAIR}` }) }}>
              <Initials>{p.ini}</Initials>
              <span style={{ flexGrow: 1, minWidth: 0 }}><Two a={p.name} b={p.what} /></span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: MUT, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{p.n} moments</span>
            </button>
          )
        })}
        <span style={foot}>Showing 5 of 20. Two players have no moments tonight: both were in goal.</span>
      </section>

      <section aria-label="Kai’s moment" style={{ ...tile, gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em' }}>Kai · left-foot finish</h2>
          <span style={cap}>48th minute · skill game</span>
        </div>
        <Film title="Kai, left foot, far corner" len="0:09" height={390}
          onPlay={() => { playClips([{ title: 'Kai, left foot, far corner', sub: '48th minute, skill game. Two children are blurred.', len: 9 }], 'Tonight’s film'); demoToast('The clip plays.') }} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ ...tag, background: G, color: '#ffffff' }}>Striking the ball</span>
          <span style={{ ...tag, background: MAUVE, color: INK }}>His goal this term</span>
          <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>2 children in this clip have no filming consent and are blurred.</span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 'auto' }}>
          <More onClick={() => demoToast('Hold to talk. Up to 30 seconds. You hear it back before it is saved.')}>Add a spoken note</More>
          <More onClick={() => { markDone('adc3:kai-far-corner:saved', 'Striking the ball'); demoToast('Saved to Kai’s file under Striking the ball.') }}>Save to his file</More>
          {/* To Kai's own family only: his mum, and his own app because he is 13. */}
          <Primary onClick={() => { markDone('adc3:kai-far-corner:sent', 'Kai’s family'); demoToast('Sent to Kai’s mum. Kai is 13, so it also shows in his own app.') }}>Send to Kai’s family</Primary>
        </div>
        <span style={cap}>A clip goes to the child’s own family only. Team-mates in it stay blurred unless their family has agreed.</span>
      </section>
    </Page>
  )
}
