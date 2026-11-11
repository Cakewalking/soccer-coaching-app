const STORE_KEY = 'cs_demo_sandbox_v2'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SbTeam    { id: string; name: string; ageGroup: string }
export interface SbPlayer  { id: string; teamId: string; name: string; position: string }
export interface SbFixture { id: string; teamId: string; opponent: string; date: string; home: boolean }
export interface SbSession { id: string; teamId: string; date: string; focus: string }
export interface SbMessage { id: string; from: string; text: string; timestamp: number }

export interface SandboxStore {
  teams:    SbTeam[]
  players:  SbPlayer[]
  fixtures: SbFixture[]
  sessions: SbSession[]
  messages: SbMessage[]
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
      { id: 'm3', from: 'Helen Parker', text: "Sideline incident report filed for Saturday.",   timestamp: Date.now() - 1800000 },
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
