// ADC9-PickMeasure: pick a measure from the list or write your own, set an aim, and give a one-line reason.
// It takes the place of a measure that is not core; the review still holds 8 at most.
// A measure film can count is marked Strong in the review; one the coach taps is marked "You tapped".

import { useState } from 'react'
import { demoToast } from '../demoToast'
import { Head, More, Page, Primary, TileHead } from './kit'
import { HAIR, INK, LINE, MUT, PALE, foot, listTile, plain, tile } from './styles'
import { takeMeasure, useTeamStyle } from './teamStyle'

const LIST = [
  { name: 'Switches of play',               what: 'Passes that move the ball from one side to the other', film: true },
  { name: 'Passes forward',                 what: 'Share of passes that go towards their goal',           film: true },
  { name: 'Players in the box for a cross', what: 'How many of ours arrive',                              film: true },
  { name: 'Throw-ins kept',                 what: 'We still have it three seconds later',                 film: true },
  { name: 'Tackles and blocks in our third', what: 'Defending near our goal',                             film: true },
  { name: 'Keeper plays with feet',         what: 'Passes from the keeper, not kicks',                    film: true },
  { name: 'Talking',                        what: 'Players calling for it or helping a team-mate',        film: false },
]
/** The reason drawn on the board. It belongs to Switches of play, so it is cleared when another measure is picked. */
const DRAWN_WHY = 'We get stuck on one side. I want them to look across.'
const step = { width: 44, height: 44, borderRadius: 12, border: `1px solid ${LINE}`, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK, fontFamily: 'inherit', fontSize: 20, fontWeight: 700, cursor: 'pointer', padding: 0 } as const

export default function ADC9PickMeasure({ go }: { go: (id: string) => void }) {
  const { swapFor } = useTeamStyle()
  const [picked, setPicked] = useState(LIST[0].name)
  const [aim, setAim] = useState(6)
  const [why, setWhy] = useState(DRAWN_WHY)
  return (
    <Page columns="minmax(0,1fr) 340px" head={
      <Head title="Pick a measure" sub={`To swap for: ${swapFor}`}>
        <More onClick={() => go('ADC8-TeamStyle')}>Cancel</More>
        <Primary onClick={() => { takeMeasure(picked, aim, why); go('ADC8-TeamStyle') }}>Use {picked}</Primary>
      </Head>
    }>
      <section aria-label="From the list" style={{ ...listTile, alignSelf: 'start' }}>
        <TileHead title="From the list" right="Search or scroll" />
        <div role="radiogroup" aria-label="Measure" style={{ display: 'flex', flexDirection: 'column' }}>
          {LIST.map((m, i) => {
            const on = m.name === picked
            return (
              <button key={m.name} role="radio" aria-checked={on} onClick={() => { setPicked(m.name); if (why === DRAWN_WHY) setWhy(m.name === LIST[0].name ? DRAWN_WHY : ''); demoToast(`${m.name}: chosen.`) }}
                style={{ ...plain, display: 'grid', gridTemplateColumns: '30px minmax(0,1fr) 120px', gap: 10, alignItems: 'center', minHeight: 62, ...(on ? { background: PALE, borderRadius: 10, padding: '0 8px' } : i > 0 ? { borderTop: `1px solid ${HAIR}` } : {}) }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, boxSizing: 'border-box', border: on ? '7px solid #2f6252' : '2px solid #8a9794', background: '#ffffff' }} />
                <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 15, lineHeight: '20px' }}>{m.name}</strong>
                  <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{m.what}</span>
                </span>
                <span style={{ justifySelf: 'end', fontSize: 12, fontWeight: 700, color: INK }}>{m.film ? 'Film counts it' : 'You tap it'}</span>
              </button>
            )
          })}
        </div>
        <span style={foot}>Showing 7 of 31. A measure film can count is marked Strong in the review. One you tap is marked “You tapped”.</span>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, alignSelf: 'start' }}>
        <section aria-label="Write your own" style={tile}>
          <TileHead title="Or write your own" flat />
          <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Name it and say what one counts as. You tap it during the game or afterwards on the film.</span>
          <More onClick={() => demoToast('Name it, say what one counts as, and set an aim.')} style={{ alignSelf: 'flex-start' }}>Write a measure</More>
        </section>
        <section aria-label="Your aim" style={tile}>
          <TileHead title="Your aim for it" flat />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <button aria-label="Lower the aim" onClick={() => { setAim(a => Math.max(1, a - 1)); demoToast('Aim down one step.') }} style={step}>−</button>
            <strong style={{ minWidth: 74, textAlign: 'center', fontSize: 17, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{aim}+ a game</strong>
            <button aria-label="Raise the aim" onClick={() => { setAim(a => Math.min(99, a + 1)); demoToast('Aim up one step.') }} style={step}>+</button>
          </span>
          {/* The season comparison is drawn for this one measure only. */}
          {picked === 'Switches of play' && aim === 6 && <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>U13 Timber made 4 a game over the last five. Six is a stretch you could reach.</span>}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
            Why, in one line
            <textarea value={why} onChange={e => setWhy(e.target.value)} rows={2} style={{ minHeight: 48, borderRadius: 12, border: `1px solid ${LINE}`, background: '#ffffff', padding: '10px 12px', boxSizing: 'border-box', fontFamily: 'inherit', fontSize: 14, lineHeight: '19px', fontWeight: 400, color: INK, resize: 'none' }} />
          </label>
          <span style={foot}>Up to 8 measures in a review, so each stays big enough to read.</span>
        </section>
      </div>
    </Page>
  )
}
