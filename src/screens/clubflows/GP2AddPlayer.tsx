// GP2-AddPlayer: Squad › add a player by hand, for a family who has not used the team link.
// The coach is never asked for medical details or consent: the parent is, in their own app.
// A player added here shows in the squad as "waiting on parent" and is not filmed until consent is given.

import { markDone, useDone } from '../doneStore'
import { LINEUP } from '../capture/captureStore'
import { Btn, Field, FlowPage, Note, Pills, Steps, Tile, Two, say } from './ui'
import { ADDED_KEY, useKept } from './flowStore'

const DRAWN = { name: 'Ava Singh', dob: '4 August 2014', parent: 'Priya Singh', mobile: '04•• ••• 771', shirt: '13', league: 'Not yet' as 'Yes' | 'Not yet' | 'Don’t know' }
const first = (s: string, or: string) => s.trim().split(/\s+/)[0] || or

export default function GP2AddPlayer({ go, team = 'U12 Sam' }: { go: (id: string) => void; team?: string }) {
  const [s, set, reset] = useKept('gp2', DRAWN)
  const added: string[] = JSON.parse(useDone(ADDED_KEY) ?? '[]')
  const drawn = s.name === DRAWN.name && s.parent === DRAWN.parent
  const player = first(s.name, 'The player'), parent = first(s.parent, 'The parent')
  const she = drawn ? 'she' : 'they', her = drawn ? 'her' : 'their'
  const shirt = s.shirt.trim(), taken = LINEUP.some(p => String(p.shirt) === shirt)
  function add() {
    const missing = !s.name.trim() ? 'the player’s name' : !s.parent.trim() ? 'a parent or carer' : !s.mobile.trim() ? 'the parent’s mobile' : ''
    if (missing) { say(`Add ${missing} first.`); return }
    if (!added.includes(s.name.trim())) markDone(ADDED_KEY, JSON.stringify([...added, s.name.trim()]))
    say(`${player} is in the squad, waiting on parent. ${parent} gets a text with a link to the family app.`)
    reset()
    go('T4-SquadTab')
  }
  return (
    <FlowPage id="GP2-AddPlayer" title="Add a player" sub={`${team} · quicker if the family uses the team link, but this works too`}
      actions={<><Btn onClick={() => say('Team link copied. A parent fills this in themselves.')}>Share the team link</Btn><Btn primary onClick={add}>Add and invite</Btn></>}>
      <Tile title="The basics" footLine="Opens from “Add a player” on Squad and on the empty squad page.">
        <Two>
          <Field label="Player’s name" value={s.name} onChange={v => set({ name: v })} />
          <Field label="Date of birth" value={s.dob} onChange={v => set({ dob: v })} hint={`Sets the age group and what ${she} can see.`} />
        </Two>
        <Two>
          <Field label="Parent or carer" value={s.parent} onChange={v => set({ parent: v })} />
          <Field label="Parent’s mobile" value={s.mobile} onChange={v => set({ mobile: v })} inputMode="tel" />
        </Two>
        <Two>
          <Field label="Shirt number" value={s.shirt} onChange={v => set({ shirt: v })} inputMode="numeric" hint={!shirt ? 'Leave it empty and pick one later.' : taken ? `${shirt} is taken.` : `${shirt} is free.`} />
          <Pills label="Registered with the league?" options={['Yes', 'Not yet', 'Don’t know'] as const} value={s.league} onChange={v => set({ league: v })} />
        </Two>
        <Note>You are not asked for medical details or consent. {parent} is, in {her} own app, before {player} can be filmed or shown in a clip.</Note>
      </Tile>
      <Steps title="What happens next" steps={[
        [`${parent} gets a text`, 'With a link to the family app'],
        [`${she[0].toUpperCase()}${she.slice(1)} ${drawn ? 'adds' : 'add'} the rest`, 'Medical notes, emergency contact, consent'],
        [`${player} shows in the squad`, 'Marked “waiting on parent”'],
        ['No filming yet', 'Until consent is given'],
      ]} footLine="A player under 13 never has their own sign-in. From 13 they can, if the parent agrees." />
    </FlowPage>
  )
}
