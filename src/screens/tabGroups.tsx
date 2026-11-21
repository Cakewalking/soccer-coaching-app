// Long rows of sub-tabs, made short without losing a screen.
// A row of more than six sub-tabs is folded into a few groups. The group you are in shows its screens
// as a row of switches just under the tabs, so every screen is still one or two clicks away and the
// apps keep addressing their screens exactly as before.

const G = '#2f6252', INK = '#10211f', LINE = '#c5c8c4', PALE = '#eef5f2'

type Set = [group: string, screens: string[]][]
const SETS: Set[] = [
  // coach: Home
  [['Calendar', ['Calendar', 'Fixtures and results', 'Fixtures']], ['Team', ['Our style', "Where we're at", 'Team staff']]],
  // coach: Squad
  [['Players', ['Players', 'Positions', 'Development goals', 'Skills', 'Wellness', 'Availability', 'Fair turns', "Who's coming"]], ['Formation', ['Formation', 'Line-ups that worked', 'Line-ups']], ['Reports', ['Season reports', 'Catch-ups', 'Handover']], ['Consent and privacy', ['Consent and privacy']], ['Consent', ['Consent']], ['Season notes', ['Season notes']]],
  // coach: Training
  [['Session', ['Tuesday’s session', 'Run sheet', 'Who’s coming']], ['Plan', ['This week', 'Season so far', 'Growth and load']], ['Drills', ['Drill library', 'Worked elsewhere']]],
  // coach: Match day
  [['Before', ['Team talk', 'Line-up and minutes', 'Opposition', 'Set pieces']], ['After', ['Review', 'Chances', 'Your take']]],
  // coach: Record. Recording, the clips cut from it, what needs a look, and the kit and rules behind it
  [['Record', ['Record', 'Recorded lately']], ['Clips', ['Clips by measure', 'Clips by game', 'Clips by player', 'Playlists']], ['To check', ['To check']], ['Setup', ['Devices', 'How we measure']]],
  // director: Club
  [['Overview', ['Overview']], ['Messages', ['Messages']], ['Calendar', ['Calendar', 'Season plan']], ['Our football', ['Playing style', 'Heading policy', 'Club climate']], ['Running the club', ['Sponsors', 'Pitches', 'Kit and cameras', 'Files', 'Language and access', 'How often we ask']], ['Settings', ['Features and billing', 'Club colours']]],
  // director and coordinator: Teams
  [['Teams', ['All teams', 'Seniors', 'Girls']], ['Fixtures', ['Fixtures', 'League sync', 'Referees', 'Cards']], ['Results', ['Chances and points', 'Grading']]],
  // director and coordinator: Coaches
  [['Coaches', ['All coaches', 'Coach load', 'Goalkeepers']], ['Development', ['Observations', 'Training and courses', 'Coach meetings', 'Coach learning']], ['Drills', ['Suggestion sources', 'Club drill library']]],
  // director and coordinator: Players
  [['Development', ['Goals', 'Growth and load', 'Fair game time', 'Girls and women']], ['Joining and moving', ['Registrations', 'Playing across', 'Moves', 'Trials']]],
]

export type TabGroup = { label: string; /** positions in the app's own list of sub-tabs */ members: number[] }

/** Fold a long row into groups. Six or fewer tabs are left exactly as they are. */
export function groupTabs(labels: string[]): TabGroup[] {
  const flat = labels.map((label, i) => ({ label, members: [i] }))
  if (labels.length <= 6) return flat
  const hits = (s: Set) => s.reduce((n, [, screens]) => n + screens.filter(x => labels.includes(x)).length, 0)
  const set = SETS.map(s => [s, hits(s)] as const).sort((a, b) => b[1] - a[1])[0]
  if (!set || set[1] < 4) return flat
  const out: TabGroup[] = [], placed = new Set<number>()
  labels.forEach((label, i) => {
    if (placed.has(i)) return
    const g = set[0].find(([, screens]) => screens.includes(label))
    const members = g ? g[1].map(x => labels.indexOf(x)).filter(n => n >= 0) : [i]
    if (members.length < 2) { out.push({ label, members: [i] }); placed.add(i); return }   // a group of one keeps its own name
    members.forEach(n => placed.add(n)); out.push({ label: g![0], members })
  })
  // when the set names every tab, it also sets the order
  const at = (g: TabGroup) => set[0].findIndex(([name, screens]) => name === g.label && screens.includes(labels[g.members[0]]))
  return out.every(g => at(g) >= 0) ? [...out].sort((a, b) => at(a) - at(b)) : out
}

// Going back to a group returns to the screen you last had open in it.
const last = new Map<string, number>()
export const remember = (g: TabGroup, i: number) => { if (g.members.length > 1) last.set(g.label + g.members.join(), i) }
export const landing = (g: TabGroup) => { const n = last.get(g.label + g.members.join()); return n !== undefined && g.members.includes(n) ? n : g.members[0] }

/** The switches for the group you are in. Nothing for a group of one. */
export function TabSwitches({ group, labels, active, onPick, pad = '0 28px' }: { group: TabGroup | undefined; labels: string[]; active: number; onPick: (i: number) => void; pad?: string }) {
  if (!group || group.members.length < 2) return null
  // "Clips by game" under Clips reads "By game": the group's name is not said twice
  const short = (l: string) => l.startsWith(group.label + ' ') ? l[group.label.length + 1].toUpperCase() + l.slice(group.label.length + 2) : l
  return (
    <div role="tablist" aria-label={group.label} style={{ display: 'flex', gap: 6, padding: pad, background: '#fff', borderTop: '1px solid #e9eae8', overflowX: 'auto', scrollbarWidth: 'none' }}>
      {group.members.map(i => <button key={i} role="tab" aria-selected={i === active} aria-label={labels[i]} onClick={() => onPick(i)} style={{ flex: 'none', height: 44, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <span style={{ height: 32, padding: '0 14px', borderRadius: 999, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: i === active ? 700 : 500, whiteSpace: 'nowrap', background: i === active ? PALE : '#fff', color: i === active ? G : INK, border: `1px solid ${i === active ? G : LINE}` }}>{short(labels[i])}</span>
      </button>)}
    </div>
  )
}
