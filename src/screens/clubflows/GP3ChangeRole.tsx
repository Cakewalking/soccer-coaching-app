// GP3-ChangeRole: the director changes someone's role. A role with children cannot start until a
// children check is on record. The person and the team's head coach are told, and the change is logged.

import { Btn, Field, FlowPage, Note, Pills, Steps, Tile, say } from './ui'
import { roleSubject, saveRoleChange, useKept, useRoleChanges, type RoleSubject } from './flowStore'

const ROLES = ['Team manager', 'Assistant coach', 'Head coach', 'Coaching director', 'Committee'] as const
type Role = typeof ROLES[number]
const WHEN = ['Now', 'Start of next season'] as const
const GREG: RoleSubject = { name: 'Greg Lawson', now: 'team manager, U11 Luke', his: 'his' }
const DRAWN = { role: 'Assistant coach' as Role, team: 'U11 Luke', when: 'Now' as typeof WHEN[number] }

// What each role sees. Committee is the only role here with no children in it.
const SEES: Record<Role, (team: string) => [string, string]> = {
  'Team manager': t => [`the team sheet, who is coming, messages and fixtures for ${t}.`, 'player notes, other teams, fees, welfare cases.'],
  'Assistant coach': t => [`session plans, clips, game reviews and player notes for ${t}.`, 'other teams, fees, welfare cases.'],
  'Head coach': t => [`session plans, clips, game reviews, player notes and season reports for ${t}.`, 'other teams, fees, welfare cases.'],
  'Coaching director': () => ['session plans, clips and game reviews for every team.', 'fees, welfare cases.'],
  'Committee': () => ['the monthly board report.', 'players, teams, clips, welfare cases.'],
}
const withChildren = (r: Role) => r !== 'Committee'
const a = (r: string) => `${/^[aeiou]/i.test(r) ? 'An' : 'A'} ${r.toLowerCase()}`

export default function GP3ChangeRole({ go }: { go: (id: string) => void }) {
  const who = roleSubject() ?? GREG
  const [s, set, reset] = useKept(`gp3:${who.name}`, DRAWN)
  const changes = useRoleChanges()
  const first = who.name.split(' ')[0], team = s.team.trim() || 'the team', coach = s.team.trim().split(/\s+/).pop() || 'The head coach'
  const [sees, not] = SEES[s.role](team)
  const His = who.his[0].toUpperCase() + who.his.slice(1)
  function change() {
    if (withChildren(s.role) && s.role !== 'Coaching director' && !s.team.trim()) { say('Type the team first.'); return }
    const waiting = withChildren(s.role)
    saveRoleChange({ name: who.name, role: s.role, team: s.role === 'Committee' || s.role === 'Coaching director' ? '' : s.team.trim(), when: s.when, waiting }, changes)
    say(waiting ? `Saved. ${first} starts as ${s.role.toLowerCase()} once ${who.his} children check is on record. ${first} and ${coach} are told.` : `Saved. ${first} is on the committee ${s.when === 'Now' ? 'from now' : 'from the start of next season'}. ${first} is told.`)
    reset()
    go('DSet2-ClubRoles')
  }
  return (
    <FlowPage id="GP3-ChangeRole" title="Change a role" sub={`${who.name} · now: ${who.now}`}
      actions={<><Btn onClick={() => go('DSet2-ClubRoles')}>Cancel</Btn><Btn primary onClick={change}>Change the role</Btn></>}>
      <Tile title="New role" footLine="Opens from any person on Club roles.">
        <Pills label="Role" options={ROLES} value={s.role} onChange={v => set({ role: v })} />
        <Field label="Teams" value={s.team} onChange={v => set({ team: v })} />
        <Pills label="From when" options={WHEN} value={s.when} onChange={v => set({ when: v })} />
        <Note><strong>Will now see:</strong> {sees}<br /><strong>Still won’t see:</strong> {not}</Note>
      </Tile>
      <Steps title="What happens" steps={[
        [`${first} is told`, 'With what has changed'],
        [`${His} check is looked at`, withChildren(s.role) ? `${a(s.role)} needs a children check on record` : 'A committee role has no children in it, so none is needed'],
        ['It is logged', 'Who changed it and when'],
        [`${coach} is told`, 'As head coach of that team'],
      ]} footLine="A role with children can’t start until the check is on record." />
    </FlowPage>
  )
}
