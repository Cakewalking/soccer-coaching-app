const STORE_KEY = 'cs_demo_sandbox_v2'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SbTeam    { id: string; name: string; ageGroup: string; ground?: string; trainingNights?: { day: string; time: string }[] }
export interface SbPlayer  { id: string; teamId: string; name: string; position: string; parent?: string; contact?: string }
export interface SbFixture { id: string; teamId: string; opponent: string; date: string; home: boolean; time?: string }
export interface SbStaff   { id: string; name: string; role: string }
export interface SbNote    { id: string; text: string; about: string; at: number }
export interface SbTalkPoint { title: string; say: string }
export interface SbSettings { checkins?: boolean; camera?: boolean; sensors?: boolean }
export type SbAnswer = { a: 'in' | 'maybe' | 'cant'; reason?: string; by: 'parent' | 'coach' }
export interface SbSession { id: string; teamId: string; date: string; focus: string }
export interface SbMessage { id: string; from: string; text: string; timestamp: number }

export interface SandboxStore {
  teams:    SbTeam[]
  players:  SbPlayer[]
  fixtures: SbFixture[]
  sessions: SbSession[]
  messages: SbMessage[]
  staff?:    SbStaff[]
  settings?: SbSettings
  /** One answer per game per player, keyed `${fixtureId}:${playerId}`. */
  availability?: Record<string, SbAnswer>
  notes?: SbNote[]
  talk?: SbTalkPoint[]
}

// ─── Persistence ──────────────────────────────────────────────────────────────

function emptyStore(): SandboxStore {
  return { teams: [], players: [], fixtures: [], sessions: [], messages: [] }
}

export function readStore(): SandboxStore {
  try {
    const v = localStorage.getItem(STORE_KEY)
    return v ? (JSON.parse(v) as SandboxStore) : emptyStore()
  } catch { return emptyStore() }
}

export function writeStore(s: SandboxStore): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(s))
}

export function clearStore(): void {
  localStorage.removeItem(STORE_KEY)
  // keep META_KEY (expiry) intact; only wipe data
}

/** True once "Fill with sample data" has loaded the sample club. Screens that are not
 *  yet driven by the sandbox's own data show the demo club only then; a club the
 *  visitor is building themselves never gets another club's players mixed in. */
export function storeIsSample(s: SandboxStore): boolean {
  return s.teams.some(t => t.id === 'wc-u12')
}

export function storeHasData(s: SandboxStore): boolean {
  return s.teams.length > 0 || s.players.length > 0 || s.fixtures.length > 0
}

// ─── Sample club (Wattle Creek FC) ───────────────────────────────────────────
// Fictional data only — Wattle Creek FC, all names made up.

export function sampleStore(): SandboxStore {
  const teamId = 'wc-u12'
  return {
    teams: [
      { id: teamId,      name: 'U12 Sam', ageGroup: 'U12' },
      { id: 'wc-u16',   name: 'U16 Ollie', ageGroup: 'U16' },
      { id: 'wc-mens1', name: "Men's 1sts", ageGroup: 'Seniors' },
    ],
    players: [
      { id: 'p1',  teamId, name: 'Mia Tran',      position: 'Midfielder' },
      { id: 'p2',  teamId, name: 'Josh Barker',    position: 'Striker' },
      { id: 'p3',  teamId, name: 'Linh Nguyen',    position: 'Defender' },
      { id: 'p4',  teamId, name: 'Ben Okafor',     position: 'Goalkeeper' },
      { id: 'p5',  teamId, name: 'Rosa Chen',      position: 'Midfielder' },
      { id: 'p6',  teamId, name: 'Callum Walsh',   position: 'Defender' },
      { id: 'p7',  teamId, name: 'Priya Mehta',    position: 'Midfielder' },
      { id: 'p8',  teamId, name: 'Sam Torres',     position: 'Striker' },
      { id: 'p9',  teamId, name: 'Ali Hassan',     position: 'Defender' },
      { id: 'p10', teamId, name: 'Grace Kim',      position: 'Midfielder' },
      { id: 'p11', teamId, name: 'Daniel Costa',   position: 'Striker' },
      { id: 'p12', teamId, name: 'Isla Park',      position: 'Goalkeeper' },
    ],
    fixtures: [
      { id: 'f1', teamId, opponent: 'Harbour Rovers',    date: '2026-06-06', home: false },
      { id: 'f2', teamId, opponent: 'Banksia Park SC',   date: '2026-06-13', home: true  },
      { id: 'f3', teamId, opponent: 'Glenview Park',     date: '2026-06-20', home: false },
      { id: 'f4', teamId, opponent: 'Kingfisher United', date: '2026-06-27', home: true  },
    ],
    sessions: [
      { id: 's1', teamId, date: '2026-06-04', focus: 'Pressing and transitions' },
      { id: 's2', teamId, date: '2026-05-28', focus: 'Set pieces from corners' },
    ],
    messages: [
      { id: 'm1', from: 'Rob Okafor',   text: "Can Mia miss Thursday? She has a school event.", timestamp: Date.now() - 7200000 },
      { id: 'm2', from: 'Priya Shah',   text: "Load data for Daniel is uploaded.",              timestamp: Date.now() - 3600000 },
      { id: 'm3', from: 'Helen Parker', text: "Sideline incident report filed for Sunday.",   timestamp: Date.now() - 1800000 },
    ],
  }
}

// ─── Single-team add helpers ──────────────────────────────────────────────────

export function addTeam(s: SandboxStore, team: Omit<SbTeam, 'id'>): SandboxStore {
  const id = 'team-' + Date.now()
  return { ...s, teams: [...s.teams, { id, ...team }] }
}

export function addPlayer(s: SandboxStore, player: Omit<SbPlayer, 'id'>): SandboxStore {
  const id = 'player-' + Date.now()
  return { ...s, players: [...s.players, { id, ...player }] }
}

export function addFixture(s: SandboxStore, fixture: Omit<SbFixture, 'id'>): SandboxStore {
  const id = 'fixture-' + Date.now()
  return { ...s, fixtures: [...s.fixtures, { id, ...fixture }] }
}

// ─── Set-up helpers (everything a coach does in Team set-up) ──────────────────

let seq = 0
const newId = (p: string) => `${p}-${Date.now()}-${seq++}`

export function updateTeam(s: SandboxStore, patch: Partial<Omit<SbTeam, 'id'>>): SandboxStore {
  if (!s.teams.length) return { ...s, teams: [{ id: newId('team'), name: patch.name ?? 'My team', ageGroup: patch.ageGroup ?? '', ...patch }] }
  return { ...s, teams: s.teams.map((t, i) => i === 0 ? { ...t, ...patch } : t) }
}
export function addPlayers(s: SandboxStore, list: Omit<SbPlayer, 'id' | 'teamId'>[]): SandboxStore {
  const teamId = s.teams[0]?.id ?? 'sandbox-team'
  return { ...s, players: [...s.players, ...list.map(p => ({ id: newId('player'), teamId, ...p }))] }
}
export function removePlayer(s: SandboxStore, id: string): SandboxStore {
  const availability = Object.fromEntries(Object.entries(s.availability ?? {}).filter(([k]) => !k.endsWith(`:${id}`)))
  return { ...s, players: s.players.filter(p => p.id !== id), availability }
}
export function removeFixture(s: SandboxStore, id: string): SandboxStore {
  const availability = Object.fromEntries(Object.entries(s.availability ?? {}).filter(([k]) => !k.startsWith(`${id}:`)))
  return { ...s, fixtures: s.fixtures.filter(f => f.id !== id), availability }
}
export function addFixtureFull(s: SandboxStore, f: Omit<SbFixture, 'id' | 'teamId'>): SandboxStore {
  return { ...s, fixtures: [...s.fixtures, { id: newId('fixture'), teamId: s.teams[0]?.id ?? 'sandbox-team', ...f }].sort((a, b) => a.date.localeCompare(b.date)) }
}
export function addStaff(s: SandboxStore, m: Omit<SbStaff, 'id'>): SandboxStore { return { ...s, staff: [...(s.staff ?? []), { id: newId('staff'), ...m }] } }
export function removeStaff(s: SandboxStore, id: string): SandboxStore { return { ...s, staff: (s.staff ?? []).filter(m => m.id !== id) } }
export function setSettings(s: SandboxStore, patch: SbSettings): SandboxStore { return { ...s, settings: { ...(s.settings ?? {}), ...patch } } }
export function setAnswer(s: SandboxStore, fixtureId: string, playerId: string, answer: SbAnswer | null): SandboxStore {
  const availability = { ...(s.availability ?? {}) }
  if (answer) availability[`${fixtureId}:${playerId}`] = answer; else delete availability[`${fixtureId}:${playerId}`]
  return { ...s, availability }
}
/** The next game on or after today, else the first one listed. */
export function nextFixture(s: SandboxStore): SbFixture | undefined {
  const today = new Date().toISOString().slice(0, 10)
  const sorted = [...s.fixtures].sort((a, b) => a.date.localeCompare(b.date))
  return sorted.find(f => f.date >= today) ?? sorted[0]
}
export function niceDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })
}
export function addNote(s: SandboxStore, n: Omit<SbNote, 'id' | 'at'>): SandboxStore { return { ...s, notes: [{ id: newId('note'), at: Date.now(), ...n }, ...(s.notes ?? [])] } }
export function removeNote(s: SandboxStore, id: string): SandboxStore { return { ...s, notes: (s.notes ?? []).filter(n => n.id !== id) } }
export function setTalk(s: SandboxStore, talk: SbTalkPoint[]): SandboxStore { return { ...s, talk } }
