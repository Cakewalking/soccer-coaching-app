// GP5-AddSponsor: the director adds a sponsor. A sponsor's logo can never show on a child's clip
// or reel (that box cannot be ticked), no gambling or alcohol sponsors for junior teams, and
// sponsors get no data.

import { Btn, Field, FlowPage, Steps, Tile, Tick, Two, say } from './ui'
import { saveSponsor, useKept, useSponsors } from './flowStore'

const PLACES = ['Club home, for coaches and committee', 'The printed team sheet', 'The foot of the family app’s Club tab'] as const
const DRAWN = { name: 'Ironbark Hardware', logo: 'ironbark.png · square, looks good', shows: [...PLACES] as string[], renews: '1 February 2027', worth: '$2,500 a year' }
// Wattle Creek has junior teams, so these are refused by name.
const BARRED = /\b(bet|bets|betting|bookmaker|bookie|casino|gambl\w*|wager\w*|lotto|lotter\w+|pokies?|tab|brewer\w*|brewing|beer|wines?|winery|liquor|bottle ?shop|bottle-?o|vodka|whisky|whiskey|gin|rum|spirits|distiller\w*|pub|tavern|cellars?)\b/i

export default function GP5AddSponsor({ go }: { go: (id: string) => void }) {
  const [s, set, reset] = useKept('gp5', DRAWN)
  const all = useSponsors()
  function add() {
    const name = s.name.trim()
    if (!name) { say('Type the sponsor’s name first.'); return }
    if (BARRED.test(name)) { say('No gambling or alcohol sponsors for junior teams. This one can’t be added.'); return }
    saveSponsor({ name, shows: s.shows, renews: s.renews.trim(), worth: s.worth.trim() }, all)
    say(`${name} added. You’re reminded a month before it renews.`)
    reset()
    go('CN20-Sponsors')
  }
  return (
    <FlowPage id="GP5-AddSponsor" title="Add a sponsor" sub="Wattle Creek FC"
      actions={<><Btn onClick={() => go('CN20-Sponsors')}>Cancel</Btn><Btn primary onClick={add}>Add sponsor</Btn></>}>
      <Tile title="Who, and where it shows">
        <Two>
          <Field label="Name" value={s.name} onChange={v => set({ name: v })} />
          <Field label="Logo" value={s.logo} onChange={v => set({ logo: v })} />
        </Two>
        <div role="group" aria-label="Where the logo may show" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Where the logo may show</span>
          {PLACES.map(p => <Tick key={p} label={p} on={s.shows.includes(p)} onChange={v => set({ shows: v ? [...s.shows, p] : s.shows.filter(x => x !== p) })} />)}
          <Tick label="On clips and reels of children" on={false} locked="A sponsor’s logo never shows on a child’s clip or reel. This box can’t be ticked." />
        </div>
        <Two>
          <Field label="Renews on" value={s.renews} onChange={v => set({ renews: v })} />
          <Field label="Worth, for your records" value={s.worth} onChange={v => set({ worth: v })} hint="Only the committee sees this." />
        </Two>
      </Tile>
      <Steps title="Rules that don’t bend" steps={[
        ['Never on a child’s clip', 'That box can’t be ticked'],
        ['No tracking', 'A sponsor gets no data about families'],
        ['No gambling or alcohol', 'For any junior team'],
        ['You’re reminded', 'A month before it renews'],
      ]} footLine="Sponsors are the club’s. Clean Sheet takes no share." />
    </FlowPage>
  )
}
