// GP7-MiniGoal: a MiniRoos coach picks one small goal with a child, in the child's words.
// No numbers at this age: a goal with a number in it is not saved. The parent sees the goal first.

import { Btn, Field, FlowPage, Note, Pills, Steps, Tile, say } from './ui'
import { childSubject, saveMiniGoal, useKept, type ChildSubject } from './flowStore'

const THINGS = ['Be brave with the ball', 'Find a friend', 'Have a shot'] as const
const HOW = ['I’ll tick it when I see it', 'A parent tells me'] as const
const POPPY: ChildSubject = { name: 'Poppy Lane', age: 7, her: 'her', she: 'she', parent: 'mum' }
const DRAWN = { thing: 'Have a shot' as typeof THINGS[number], words: 'Kick it really hard at the goal', how: 'I’ll tick it when I see it' as typeof HOW[number] }
const NUMBER = /\d|\b(one|two|three|four|five|six|seven|eight|nine|ten|twice|per cent|percent)\b/i

export default function GP7MiniGoal({ go }: { go: (id: string) => void }) {
  const kid = childSubject() ?? POPPY
  const first = kid.name.split(' ')[0]
  const [s, set, reset] = useKept(`gp7:${first}`, kid === POPPY ? DRAWN : { ...DRAWN, words: '' })
  function save() {
    const goal = s.words.trim() || s.thing
    if (NUMBER.test(s.words)) { say(`No numbers at this age. Say it in ${first}’s words, without a count.`); return }
    saveMiniGoal(first, { goal, how: s.how })
    say(`Saved. ${first}’s ${kid.parent} sees it first, in ${kid.parent === 'mum' ? 'her' : kid.parent === 'dad' ? 'his' : 'their'} app.`)
    reset()
    go('HM2-SquadMiniRoos')
  }
  return (
    <FlowPage id="GP7-MiniGoal" title={`A goal with ${first}`} sub={`${kid.name}${kid.age ? `, ${kid.age}` : ''} · one small thing, in ${kid.her} words`}
      actions={<><Btn onClick={() => go('HM2-SquadMiniRoos')}>Cancel</Btn><Btn primary onClick={save}>Save</Btn></>}>
      <Tile title="Pick one" footLine="Opens from a child’s card on Squad.">
        <Pills label="From our three things" options={THINGS} value={s.thing} onChange={v => set({ thing: v })} />
        <Field label={`Or in ${first}’s words`} value={s.words} onChange={v => set({ words: v })} />
        <Pills label="How you’ll know" options={HOW} value={s.how} onChange={v => set({ how: v })} />
        <Note>No numbers at this age. A goal is something {kid.she} tries, not something {kid.she} is measured on.</Note>
      </Tile>
      <Steps title="Who sees it" steps={[
        [`${first}’s ${kid.parent}`, `First, in ${kid.parent === 'mum' ? 'her' : kid.parent === 'dad' ? 'his' : 'their'} app`],
        [first, 'On a sticker card you can print'],
        ['You', 'On Squad, with a tick box'],
        ['Nobody else', 'Other families see nothing'],
      ]} footLine={`When you tick it, ${first} and ${kid.her} ${kid.parent} get a well done and you pick the next one together.`} />
    </FlowPage>
  )
}
