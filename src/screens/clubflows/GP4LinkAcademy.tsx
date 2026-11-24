// GP4-LinkAcademy: the director asks an academy to link. Nothing is shared until the academy's
// owner confirms and each family agrees, one child at a time. Only shared players, never the rest.

import { Btn, Field, FlowPage, Pills, Steps, Tile, say } from './ui'
import { useKept } from './flowStore'

const SHARE = ['Nothing', 'Training load', 'Load and game film'] as const
const MINUTES = ['Same as every club team', 'At least half a game', 'The coach decides'] as const
const DRAWN = { academy: 'Tall Timber Academy', share: 'Load and game film' as typeof SHARE[number], minutes: 'Same as every club team' as typeof MINUTES[number], contact: 'Rachel M, director of football', asked: '' }

export default function GP4LinkAcademy({ go }: { go: (id: string) => void }) {
  const [s, set] = useKept('gp4', DRAWN)
  const name = s.academy.trim(), tall = /^tall timber/i.test(name)
  function ask() {
    if (!name) { say('Type the academy’s name first.'); return }
    if (!s.contact.trim()) { say('Say who talks to the academy first.'); return }
    if (s.asked === name) { say(`Already sent. Waiting on ${tall ? 'Dani Okafor' : 'the owner'} to confirm.`); return }
    set({ asked: name })
    say(tall ? 'Sent to Dani Okafor at Tall Timber Academy. Nothing is shared until she confirms and each family agrees.' : `Sent to the owner of ${name}. Nothing is shared until they confirm and each family agrees.`)
  }
  return (
    <FlowPage id="GP4-LinkAcademy" title="Link an academy" sub="For players who train at an academy and play for you"
      actions={<><Btn onClick={() => go('DSet6-PartnerAcademy')}>Cancel</Btn><Btn primary onClick={ask}>Ask the academy</Btn></>}>
      <Tile title="The academy, and what you share" footLine={tall ? '16 of your players train at Tall Timber. Their families haven’t been asked yet.' : 'Families are asked only after the academy confirms.'}>
        <Field label="Academy" value={s.academy} onChange={v => set({ academy: v })} hint={tall ? 'Its owner, Dani Okafor, has to confirm.' : 'Its owner has to confirm.'} />
        <Pills label="What you share, for shared players only" options={SHARE} value={s.share} onChange={v => set({ share: v })} />
        <Pills label="Minutes for the academy’s game team" options={MINUTES} value={s.minutes} onChange={v => set({ minutes: v })} />
        <Field label="Who talks to the academy" value={s.contact} onChange={v => set({ contact: v })} />
      </Tile>
      <Steps title="Before anything is shared" steps={[
        ['The academy confirms', 'Its owner accepts the link'],
        ['Each family is asked', 'One child at a time, and they can say no'],
        ['Only shared players', 'Never the rest of your squads'],
        ['Either side can end it', 'Sharing stops the same day'],
      ]} footLine="A family can change their answer at any time in their app." />
    </FlowPage>
  )
}
