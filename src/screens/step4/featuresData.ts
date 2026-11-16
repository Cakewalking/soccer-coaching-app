// Shared features/billing model for PRM1 (toggle), PRM3 (bill) and PRM6 (usage).
// A tiny session store so a change on one screen shows on the others: each screen
// seeds local state from getGroups() and writes back with setGroups().

export type FKey = 'record' | 'live' | 'vests' | 'space'
export const COLS: { key: FKey; label: string; sub: string; price: number; bill: string }[] = [
  { key: 'record', label: 'Record',      sub: 'In your plan', price: 0,  bill: 'Record and review' },
  { key: 'live',   label: 'Live help',   sub: '$15 a team',   price: 15, bill: 'Live game help' },
  { key: 'vests',  label: 'Vests',       sub: '$10 a team',   price: 10, bill: 'Vests and load' },
  { key: 'space',  label: 'Extra space', sub: '$4 for 20 GB', price: 4,  bill: 'Extra space' },
]

// true = on, false = off, null = not for this age
export type Team = { id: string; asked?: boolean; record: boolean | null; live: boolean | null; vests: boolean | null; space: boolean | null }
export type Group = { name: string; sub: string; teams: Team[] }

const INITIAL: Group[] = [
  { name: 'MiniRoos', sub: 'Under 6 to 11 · 5 teams', teams: [
    { id: 'U9 Mark', record: true, live: false, vests: null, space: false },
    { id: 'U11 Luke', record: true, live: false, vests: null, space: false },
  ] },
  { name: 'Juniors', sub: 'Under 12 and 13 · 4 teams', teams: [
    { id: 'U12 Sam', asked: true, record: true, live: false, vests: true, space: false },
    { id: 'U13 Chris', record: true, live: true, vests: true, space: false },
  ] },
  { name: 'Youth', sub: 'Under 14 to 18 · 4 teams', teams: [
    { id: 'U15 Girls Bec', record: true, live: true, vests: true, space: false },
    { id: 'U16 Ollie', record: true, live: true, vests: true, space: true },
  ] },
  { name: 'Seniors', sub: '1 team', teams: [
    { id: "Men's 1sts", record: true, live: true, vests: false, space: false },
  ] },
]

export const cloneGroups = (g: Group[]): Group[] => g.map(x => ({ ...x, teams: x.teams.map(t => ({ ...t })) }))

let _groups: Group[] = cloneGroups(INITIAL)
export const getGroups = () => _groups
export const setGroups = (g: Group[]) => { _groups = g }
export const resetGroups = () => { _groups = cloneGroups(INITIAL) }

export const FEATURE_LABEL: Record<FKey, string> = { record: 'record', live: 'live game help', vests: 'vests and load', space: 'space' }

// ---- derivations (pure) ----
export const PLAN_TEAMS = 14, PLAN_EACH = 20
export const planTotal = () => PLAN_TEAMS * PLAN_EACH

export const teamsOn = (groups: Group[], fk: FKey): Team[] => groups.flatMap(g => g.teams).filter(t => t[fk] === true)

export const addOnsTotal = (groups: Group[]): number =>
  COLS.filter(c => c.price > 0).reduce((s, c) => s + teamsOn(groups, c.key).length * c.price, 0)

export const grandTotal = (groups: Group[]): number => planTotal() + addOnsTotal(groups)

export type BillLine = { item: string; desc: string; teams: number; each: number; total: number }
export const billLines = (groups: Group[]): BillLine[] => [
  { item: 'Club plan', desc: 'Record and review, Ask Clean Sheet, Files, Messages', teams: PLAN_TEAMS, each: PLAN_EACH, total: planTotal() },
  ...COLS.filter(c => c.price > 0).map(c => {
    const ts = teamsOn(groups, c.key)
    return { item: c.bill, desc: ts.map(t => t.id).join(', ') || 'None on', teams: ts.length, each: c.price, total: ts.length * c.price }
  }),
]
