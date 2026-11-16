// After-the-game ratings — demo data model.
//
// Privacy is modelled here, by construction, so the screens can only ever
// surface what a given viewer is allowed to see (HANDOVER rules 1–9):
//  - A coach's ratings/notes live in COACH_* and are only ever read by coach
//    screens (YT1/YT3/YT4). They are never passed to parent or Ask surfaces.
//  - A parent's ratings live in PARENT_RATINGS, keyed by parent. A parent
//    screen (YTp1) reads only its own entry; the head coach reads the set.
//  - A parent's rating of their OWN child is stored (ownChildId) but
//    excluded from every average and award (see parentAverage / awards).
//  - parentAverage returns null below three raters, so screens show a dash.
//  - No function here is wired into Ask Clean Sheet answers.

export type Rating = 1 | 2 | 3 | 4 | 5

export type YTPlayer = {
  id: string; ini: string; name: string; bg: string; number: number; spot: string
  minutes: number        // minutes in the last game
  clipNote?: string      // what the film found (offered as a note suggestion)
}

export const YT_TEAM = { id: 'u12sam', label: 'U12 Sam', coach: 'Sam K', families: 17 }

// The 16-player squad. First seven match the drawn boards; the rest fill the team.
export const YT_PLAYERS: YTPlayer[] = [
  { id: 'mia',   ini: 'MT', name: 'Mia Tran',    bg: '#7a9e7e', number: 7,  spot: 'Mid', minutes: 55, clipNote: 'won it back 4 times' },
  { id: 'jai',   ini: 'JP', name: 'Jai Patel',   bg: '#c0a070', number: 11, spot: 'Fwd', minutes: 50, clipNote: 'led the press' },
  { id: 'zoe',   ini: 'ZH', name: 'Zoe Hartley', bg: '#8fa09b', number: 3,  spot: 'Def', minutes: 40, clipNote: 'quiet after the knock' },
  { id: 'noah',  ini: 'NO', name: 'Noah Okafor', bg: '#c39797', number: 6,  spot: 'Mid', minutes: 45, clipNote: 'first assist' },
  { id: 'grace', ini: 'GO', name: 'Grace Owusu',  bg: '#6b9eab', number: 5,  spot: 'Def', minutes: 60, clipNote: 'calm at the back' },
  { id: 'finn',  ini: 'FW', name: 'Finn Walsh',  bg: '#a09080', number: 9,  spot: 'Fwd', minutes: 35, clipNote: '3 forward passes under pressure' },
  { id: 'ruby',  ini: 'RC', name: 'Ruby Chen',   bg: '#9a8fb0', number: 1,  spot: 'GK',  minutes: 60 },
  { id: 'ella',  ini: 'EB', name: 'Ella Brandt', bg: '#7a9e7e', number: 4,  spot: 'Def', minutes: 50 },
  { id: 'kai',   ini: 'KD', name: 'Kai Doyle',   bg: '#c0a070', number: 8,  spot: 'Mid', minutes: 45 },
  { id: 'leo',   ini: 'LW', name: 'Leo Wright',  bg: '#8fa09b', number: 10, spot: 'Fwd', minutes: 40 },
  { id: 'sam',   ini: 'SR', name: 'Sam Rivera',  bg: '#c39797', number: 2,  spot: 'Def', minutes: 35 },
  { id: 'arlo',  ini: 'AK', name: 'Arlo Kaur',   bg: '#6b9eab', number: 12, spot: 'Mid', minutes: 30 },
  { id: 'remi',  ini: 'RB', name: 'Remi Blake',  bg: '#a09080', number: 14, spot: 'Fwd', minutes: 30 },
  { id: 'theo',  ini: 'TO', name: 'Theo Oni',    bg: '#9a8fb0', number: 15, spot: 'Def', minutes: 25 },
  { id: 'nina',  ini: 'NP', name: 'Nina Park',   bg: '#7a9e7e', number: 16, spot: 'Mid', minutes: 25 },
  { id: 'omar',  ini: 'OH', name: 'Omar Haddad', bg: '#c0a070', number: 13, spot: 'Fwd', minutes: 20 },
]

export const PLAYER = (id: string) => YT_PLAYERS.find(p => p.id === id)!

// The coach's own take on the last game (coach-only).
export const COACH_GAME = {
  fixture: 'Sat 30 May · Won 3-1 at Ironbark United',
  round: 'Round 8 · away · Redgum Reserve',
  howWePlayed: 4 as Rating,
  planWorked: 'partly' as 'yes' | 'partly' | 'no',
  wentWell: ['Winning it back', 'Finishing'],
  workNext: ['Legs late on'],
  note: 'Pressed well for 40 minutes. Legs went after half time and we dropped off. Jai and Mia hunted as a pair, which is what we trained.',
}

// Coach ratings + notes for the last game (coach-only). Nine rated, four noted.
export const COACH_GAME_RATINGS: Record<string, Rating> = {
  mia: 5, jai: 5, zoe: 2, noah: 3, grace: 4, ruby: 4, ella: 4, kai: 3, leo: 4,
}
export const COACH_NOTES: Record<string, string> = {
  mia: 'Pressed as a pair all game. Best yet.',
  jai: 'Led the press. Talks more now.',
  zoe: 'Quiet after the knock. Check in Thursday.',
  grace: 'Calm at the back.',
}

// A parent's rating set for the last game. Each parent sees only their own.
export type ParentRatingSet = { parentId: string; parentName: string; ownChildId: string; ratings: Record<string, Rating> }
export const PARENT_RATINGS: ParentRatingSet[] = [
  { parentId: 'p-tran',    parentName: "Mia's parent",   ownChildId: 'mia',   ratings: { mia: 4, grace: 5, jai: 4, ruby: 4 } },
  { parentId: 'p-patel',   parentName: "Jai's parent",   ownChildId: 'jai',   ratings: { jai: 5, mia: 5, noah: 4, grace: 4 } },
  { parentId: 'p-reid',    parentName: "Grace's parent", ownChildId: 'grace', ratings: { grace: 5, mia: 5, jai: 4, zoe: 3 } },
  { parentId: 'p-okafor',  parentName: "Noah's parent",  ownChildId: 'noah',  ratings: { noah: 4, mia: 4, grace: 4, finn: 4 } },
  { parentId: 'p-lane',    parentName: "Ruby's parent",  ownChildId: 'ruby',  ratings: { ruby: 5, mia: 5, grace: 5, jai: 4 } },
  { parentId: 'p-noble',   parentName: "Finn's parent",  ownChildId: 'finn',  ratings: { finn: 4, mia: 4, zoe: 4, noah: 3 } },
  { parentId: 'p-hartley', parentName: "Zoe's parent",   ownChildId: 'zoe',   ratings: { zoe: 3, mia: 5, grace: 4, jai: 5 } },
  { parentId: 'p-brandt',  parentName: "Ella's parent",  ownChildId: 'ella',  ratings: { ella: 4, mia: 4, grace: 5, jai: 4, noah: 4, zoe: 3, finn: 3, ruby: 4 } },
  { parentId: 'p-wright',  parentName: "Leo's parent",   ownChildId: 'leo',   ratings: { leo: 4, mia: 5, grace: 4, jai: 4, ruby: 4, finn: 4, noah: 4 } },
  { parentId: 'p-doyle',   parentName: "Kai's parent",   ownChildId: 'kai',   ratings: { kai: 4, mia: 4, grace: 5, ruby: 4, finn: 4, zoe: 3 } },
  { parentId: 'p-kaur',    parentName: "Arlo's parent",  ownChildId: 'arlo',  ratings: { arlo: 4, mia: 4, grace: 4 } },
]

// Season aggregates per player (top of the table). Pre-computed for the demo.
export type SeasonRow = { id: string; you: number; parents: number; ratings: number; games: number }
export const SEASON: SeasonRow[] = [
  { id: 'mia',   you: 4.5, parents: 4.6, ratings: 71, games: 8 },
  { id: 'grace', you: 4.3, parents: 4.5, ratings: 68, games: 8 },
  { id: 'jai',   you: 4.4, parents: 4.2, ratings: 64, games: 7 },
  { id: 'ruby',  you: 3.9, parents: 4.1, ratings: 70, games: 8 },
  { id: 'noah',  you: 3.6, parents: 3.9, ratings: 52, games: 6 },
]

// ---- privacy-respecting computations ----

// Mean of parents' ratings for a player for the last game, EXCLUDING any
// parent rating their own child (rule 5). Returns null below three raters
// (so the screen shows a dash), per "Where the numbers come from".
export function parentAverage(playerId: string): number | null {
  const vals = PARENT_RATINGS
    .filter(set => set.ownChildId !== playerId)        // exclude own-child rating
    .map(set => set.ratings[playerId])
    .filter((r): r is Rating => r != null)
  if (vals.length < 3) return null
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
}

// Families who have sent at least one rating for the last game.
export function familiesRated(): number {
  return PARENT_RATINGS.filter(s => Object.keys(s.ratings).length > 0).length
}

// Awards so far, under the rules. Coach's pick = highest coach season average;
// Parents' pick = highest parents' season average; Most improved comes from a
// development goal, not ratings; Coach's award is chosen by hand. Players with
// fewer than three rated games are flagged and not put forward automatically.
export function awards() {
  const eligible = SEASON.filter(r => r.games >= 3)
  const coachPick = [...eligible].sort((a, b) => b.you - a.you)[0]
  const parentsPick = [...eligible].sort((a, b) => b.parents - a.parents)[0]
  return {
    coachPick:   { id: coachPick.id,   value: coachPick.you },
    parentsPick: { id: parentsPick.id, value: parentsPick.parents },
    mostImproved:{ id: 'finn', detail: 'From his goal: +40%' },   // from development goal, not ratings
    coachAward:  { id: null as string | null, detail: 'Yours to choose · Your notes are here' },
  }
}
