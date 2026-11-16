// Measure sheets — the evidence behind every number on a Playing-across page.
//
// The rule (HANDOVER): no number may be shown without a way to see where it
// came from. Each measure here carries its EVIDENCE (clips / vest readings /
// test gos / hand measurements / quotes), and the headline number is derived
// from that evidence where the method allows it — see `derivedCount`.

export type GraphKind = 'line' | 'head' | 'settling' | 'place' | 'load'
export type EvidenceKind = 'film' | 'vest' | 'test' | 'hand' | 'said' | 'settling' | 'place' | 'load'

export type Clip = { minute: string; outcome: 'Won' | 'Lost' | 'Made' | 'Key'; game: string; dur: string; saturday?: boolean }
export type VestRow = { date: string; session: string; value: string; vest: string; signal: string; out?: boolean }
export type TestRow = { date: string; timer: string; counted: string; gos: string }
export type HandRow = { date: string; by: string; value: string; change: string; readings: string }
export type Said = { ini: string; person: string; role: string; date: string; words: string; how: string; wc?: boolean }

export type CaptureBox = { label: string; lines: string }

export type MeasureCfg = {
  id: string                 // sheet id, e.g. PU8a-MeasureFilm
  area: string               // FOOTBALL / BODY / HEAD …
  source: string             // FROM FILM / FROM THE VEST / WHAT PEOPLE SAID …
  pos: number                // 1..11
  title: string
  sub: string                // what the number is + how many games/sessions/tests
  sentence: string           // number bold, where it started, the other team's middle
  lowerBetter?: boolean
  graph: {
    kind: GraphKind
    series?: number[]        // player values over time (line/vest/test)
    labels?: string[]        // x labels
    rangeLow?: number; rangeHigh?: number; mid?: number   // other team's band + middle
    axis?: [number, number, number]  // three grid numbers (top, mid, bottom)
    // head: levels per game 0=Easy 1=About right 2=Too hard
    headLevels?: number[]
    // settling: total squad + known names
    squad?: number; known?: number
    // place: each player's game-time share (unnamed), with floor
    shares?: number[]; floor?: number; mine?: number
    // load: weeks (minutes), planned flag, cap
    weeks?: { mins: number; planned?: boolean }[]; cap?: number
  }
  captures: [CaptureBox, CaptureBox, CaptureBox]
  evidence:
    | { kind: 'film'; count: number; games: number; clips: Clip[] }
    | { kind: 'vest'; rows: VestRow[] }
    | { kind: 'test'; rows: TestRow[]; note: string }
    | { kind: 'hand'; rows: HandRow[] }
    | { kind: 'said'; list: Said[] }
    | { kind: 'settling' }
    | { kind: 'place' }
    | { kind: 'load' }
  foot: string
  // true when the graph headline is counted FROM the evidence (vs kept apart)
  derivedCount: boolean
}

const LINE_LABELS = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'Sat']

export const MEASURES: MeasureCfg[] = [
  {
    id: 'PU8a-MeasureFilm', area: 'FOOTBALL', source: 'FROM FILM', pos: 1,
    title: 'Duels won', sub: 'The share of her one-on-ones that she wins · 9 recorded games',
    sentence: '71% so far: 29 of 41. After round 1 it was 58%. The under 13 girls’ middle is 52%.',
    graph: { kind: 'line', series: [58, 60, 63, 66, 68, 69, 70, 71], labels: LINE_LABELS, rangeLow: 40, rangeHigh: 66, mid: 52, axis: [80, 55, 30] },
    captures: [
      { label: 'Source', lines: 'Wide camera, 9 of 9 games' },
      { label: 'What counts', lines: 'One on one for the ball. Won if her team has it 2 seconds later' },
      { label: 'Checked', lines: 'Sam confirmed 38 of 41 and corrected 3' },
    ],
    evidence: { kind: 'film', count: 41, games: 9, clips: [
      { minute: '7’', outcome: 'Won', game: 'v Ironbark', dur: '0:06', saturday: true },
      { minute: '19’', outcome: 'Won', game: 'v Ironbark', dur: '0:05', saturday: true },
      { minute: '31’', outcome: 'Lost', game: 'v Ironbark', dur: '0:07', saturday: true },
      { minute: '47’', outcome: 'Won', game: 'v Ironbark', dur: '0:06', saturday: true },
    ] },
    foot: 'Other children are blurred. Nothing is counted that you cannot watch.',
    derivedCount: true,
  },
  {
    id: 'PU8d-MeasurePasses', area: 'FOOTBALL', source: 'FROM FILM', pos: 2,
    title: 'Forward passes under pressure', sub: 'A game, scaled to 60 minutes · 9 recorded games',
    sentence: '14 a game now, from 9 in round 1. The under 13 girls’ middle is 11.',
    graph: { kind: 'line', series: [9, 10, 11, 12, 13, 13, 14, 14], labels: LINE_LABELS, rangeLow: 7, rangeHigh: 16, mid: 11, axis: [18, 11, 4] },
    captures: [
      { label: 'Source', lines: 'Wide camera, 9 of 9 games' },
      { label: 'What counts', lines: 'A forward pass with an opponent within 2 metres' },
      { label: 'Checked', lines: 'Sam confirmed the count for all 9 games' },
    ],
    evidence: { kind: 'film', count: 126, games: 9, clips: [
      { minute: '12’', outcome: 'Made', game: 'v Ironbark', dur: '0:05', saturday: true },
      { minute: '25’', outcome: 'Made', game: 'v Ironbark', dur: '0:04', saturday: true },
      { minute: '38’', outcome: 'Made', game: 'v Ironbark', dur: '0:06', saturday: true },
      { minute: '52’', outcome: 'Made', game: 'v Ironbark', dur: '0:05', saturday: true },
    ] },
    foot: 'Other children are blurred. Nothing is counted that you cannot watch.',
    derivedCount: true,
  },
  {
    id: 'PU8e-MeasureWins', area: 'FOOTBALL', source: 'FROM FILM', pos: 3,
    title: 'Wins of the ball', sub: 'A game, scaled to 60 minutes · 9 recorded games',
    sentence: '12 a game now, from 7 in round 1. The under 13 girls’ middle is 9.',
    graph: { kind: 'line', series: [7, 8, 9, 10, 11, 11, 12, 12], labels: LINE_LABELS, rangeLow: 5, rangeHigh: 14, mid: 9, axis: [16, 9, 2] },
    captures: [
      { label: 'Source', lines: 'Wide camera, 9 of 9 games' },
      { label: 'What counts', lines: 'Tackle, interception or loose ball, and the team keeps it 2 seconds' },
      { label: 'Checked', lines: 'Sam confirmed 104 of 108 and corrected 4' },
    ],
    evidence: { kind: 'film', count: 108, games: 9, clips: [
      { minute: '4’', outcome: 'Won', game: 'v Ironbark', dur: '0:05', saturday: true },
      { minute: '22’', outcome: 'Won', game: 'v Ironbark', dur: '0:04', saturday: true },
      { minute: '40’', outcome: 'Won', game: 'v Ironbark', dur: '0:06', saturday: true },
      { minute: '55’', outcome: 'Won', game: 'v Ironbark', dur: '0:05', saturday: true },
    ] },
    foot: 'Other children are blurred. Nothing is counted that you cannot watch.',
    derivedCount: true,
  },
  {
    id: 'PU8k-MeasureGrowth', area: 'BODY', source: 'MEASURED BY HAND', pos: 4,
    title: 'Growth', sub: 'Height in cm, every 3 months · shoes off, two readings, the average',
    sentence: '154 cm now, up 4 cm this year. Steady, no growth spurt flag.',
    graph: { kind: 'line', series: [150, 150, 151, 152, 153, 153, 154, 154], labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axis: [158, 152, 146] },
    captures: [
      { label: 'Source', lines: 'Fitness coach Priya, at the clinic' },
      { label: 'How it is read', lines: 'Shoes off, two readings, the average' },
      { label: 'Kept with consent', lines: 'Mia’s parents agreed to height being kept' },
    ],
    evidence: { kind: 'hand', rows: [
      { date: '1 Jun', by: 'Priya (fitness)', value: '154.0 cm', change: '+1.0', readings: '154.1 / 153.9' },
      { date: '2 Mar', by: 'Priya (fitness)', value: '153.0 cm', change: '+1.5', readings: '153.0 / 153.0' },
      { date: '4 Dec', by: 'Priya (fitness)', value: '151.5 cm', change: '+1.5', readings: '151.6 / 151.4' },
      { date: '3 Sep', by: 'Priya (fitness)', value: '150.0 cm', change: '—', readings: '150.0 / 150.0' },
    ] },
    foot: 'Height is kept only where parents have agreed. Measured to the nearest 0.5 cm.',
    derivedCount: false,
  },
  {
    id: 'PU8b-MeasureVest', area: 'BODY', source: 'FROM THE VEST', pos: 5,
    title: 'Top speed', sub: 'The fastest full second in each session, km/h · 23 sessions since April',
    sentence: '24.1 km/h on Saturday, up from 23.2 in April. The under 13 girls’ middle is 24.6.',
    graph: { kind: 'line', series: [23.2, 23.4, 23.6, 23.8, 23.9, 23.8, 24.0, 24.1], labels: ['7 Apr', '14 Apr', '21 Apr', '5 May', '12 May', '19 May', '26 May', 'Sat'], rangeLow: 22.0, rangeHigh: 27.5, mid: 24.6, axis: [28, 24.5, 21] },
    captures: [
      { label: 'Source', lines: 'Vest 07, worn at 23 of 26 sessions' },
      { label: 'How it is read', lines: '10 readings a second. The fastest full second counts' },
      { label: 'Left out', lines: '1 reading: the signal dropped at 12 May' },
    ],
    evidence: { kind: 'vest', rows: [
      { date: '30 May', session: 'Game v Ironbark United', value: '24.1', vest: '07', signal: 'Good' },
      { date: '28 May', session: 'Training', value: '23.6', vest: '07', signal: 'Good' },
      { date: '26 May', session: 'Training', value: '23.8', vest: '07', signal: 'Good' },
      { date: '22 May', session: 'Game v Tealside Town', value: '23.9', vest: '07', signal: 'Good' },
      { date: '12 May', session: 'Training', value: '23.2', vest: '07', signal: 'Dropped', out: true },
    ] },
    foot: 'The vest’s own numbers, not rounded or smoothed. A reading left out stays listed.',
    derivedCount: true,
  },
  {
    id: 'PU8g-MeasureTest', area: 'BODY', source: 'TIMED TEST', pos: 6,
    title: '10 m sprint', sub: 'Seconds, standing start, best of 2 · lower is better · 5 tests since February',
    sentence: '2.02 s now, from 2.14 s in February. The under 13 girls’ middle is 2.05 s.',
    lowerBetter: true,
    graph: { kind: 'line', series: [2.14, 2.12, 2.09, 2.06, 2.02], labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun'], rangeLow: 1.92, rangeHigh: 2.20, mid: 2.05, axis: [2.25, 2.05, 1.9] },
    captures: [
      { label: 'Source', lines: 'Fitness coach Priya held the stopwatch' },
      { label: 'How it is read', lines: 'Tablet starts the clock, a tap stops it. Best of 2' },
      { label: 'How precise', lines: 'A hand tap, so good to about 0.03 s' },
    ],
    evidence: { kind: 'test', rows: [
      { date: '1 Jun', timer: 'Priya', counted: '2.02', gos: '2.02 / 2.05' },
      { date: '2 Mar', timer: 'Priya', counted: '2.12', gos: '2.14 / 2.12' },
      { date: '3 Feb', timer: 'Rob (filled in)', counted: '2.14', gos: '2.14 / 2.17' },
    ], note: 'A hand tap stops the clock, so each go is good to about 0.03 seconds.' },
    foot: 'The person who timed it is named on every row. Where someone filled in, it is said.',
    derivedCount: true,
  },
  {
    id: 'PU8f-MeasureDistance', area: 'BODY', source: 'FROM THE VEST', pos: 7,
    title: 'Distance', sub: 'km in a game, scaled to 60 minutes · games only · 9 games',
    sentence: '5.8 km a game, steady since April. The under 13 girls’ middle is 5.6 km.',
    graph: { kind: 'line', series: [5.4, 5.5, 5.6, 5.7, 5.7, 5.8, 5.8, 5.8], labels: LINE_LABELS, rangeLow: 4.8, rangeHigh: 6.6, mid: 5.6, axis: [7, 5.6, 4] },
    captures: [
      { label: 'Source', lines: 'Vest 07, worn in 9 of 9 games' },
      { label: 'How it is read', lines: 'Position 10 times a second, added up. Games only' },
      { label: 'Left out', lines: 'Training is not counted here' },
    ],
    evidence: { kind: 'vest', rows: [
      { date: '30 May', session: 'Game v Ironbark United', value: '5.8', vest: '07', signal: 'Good' },
      { date: '22 May', session: 'Game v Tealside Town', value: '5.8', vest: '07', signal: 'Good' },
      { date: '15 May', session: 'Game v Harbour Rovers', value: '5.7', vest: '07', signal: 'Good' },
      { date: '8 May', session: 'Game v Glenview', value: '5.7', vest: '07', signal: 'Good' },
    ] },
    foot: 'The vest’s own numbers, not rounded or smoothed. Games only.',
    derivedCount: true,
  },
  {
    id: 'PU8c-MeasureSaid', area: 'HEAD', source: 'WHAT PEOPLE SAID', pos: 8,
    title: 'Copes with mistakes, wants a harder game', sub: 'Nothing here is measured. It is who people told Clean Sheet, with who and when.',
    sentence: 'Mia has called her game “easy” after 6 of the last 8. Sam says she copes with mistakes.',
    graph: { kind: 'head', headLevels: [1, 1, 0, 1, 0, 0, 1, 0], labels: LINE_LABELS },
    captures: [
      { label: 'Mia', lines: '8 answers after games. One tap each, on her phone' },
      { label: 'Her coach', lines: 'Sam’s three taps on 1 June, agreed by you' },
      { label: 'Her parents', lines: 'Linh has not been asked yet' },
    ],
    evidence: { kind: 'said', list: [
      { ini: 'SK', person: 'Sam K', role: 'her coach', date: '1 June', words: 'Asks for the ball after a mistake. Takes feedback.', how: 'Three taps on 1 June by you. Copes with mistakes: yes. Wants more: yes. Fits in: yes' },
      { ini: 'MT', person: 'Mia', role: 'the player', date: '30 May', words: 'I want harder games.', how: 'After-game check-in on her phone. She tapped: Easy' },
      { ini: 'MT', person: 'Mia', role: 'the player', date: '16 May', words: 'Can I play against the big girls?', how: 'Goal check-in with Sam, typed by Sam as she said it' },
    ] },
    foot: 'Words are shown as given, never rewritten. Mia’s parents can ask to read all of it.',
    derivedCount: true,
  },
  {
    id: 'PU8h-MeasureSettling', area: 'SETTLING IN', source: 'PEOPLE AND CLUB RECORDS', pos: 9,
    title: 'Who she knows, and shared sessions', sub: 'Names she picked, and attendance the club recorded · 14 in the squad',
    sentence: 'Mia knows 4 of the 14, and trained with this group at the July clinic.',
    graph: { kind: 'settling', squad: 14, known: 4 },
    captures: [
      { label: 'Mia picked', lines: 'Ava, Bella, Dani and Frankie, on her phone' },
      { label: 'Shared sessions', lines: 'July clinic: attendance marked by the coach' },
      { label: 'Not told', lines: 'The girls she picked are not told' },
    ],
    evidence: { kind: 'settling' },
    foot: 'The names a player picks are shown to the director and her coach only.',
    derivedCount: true,
  },
  {
    id: 'PU8j-MeasureLoad', area: 'LOAD', source: 'MIXED', pos: 10,
    title: 'Minutes of football a week', sub: 'Attendance, vest on-time, and her own check-ins · last 8 weeks',
    sentence: '180 minutes a week now; the trial adds about 20%. The club’s cap for her age is 300.',
    graph: { kind: 'load', weeks: [{ mins: 150 }, { mins: 170 }, { mins: 160 }, { mins: 185 }, { mins: 175 }, { mins: 165 }, { mins: 200, planned: true }, { mins: 220, planned: true }], cap: 300 },
    captures: [
      { label: 'Attendance', lines: 'Marked by the coach each session' },
      { label: 'Minutes', lines: 'From the vest, or the team sheet where no vest was worn' },
      { label: 'Her check-ins', lines: 'Wellness taps on her phone, steady' },
    ],
    evidence: { kind: 'load' },
    foot: 'Darker bars are the planned trial weeks. The dashed line is the club’s cap for her age.',
    derivedCount: true,
  },
  {
    id: 'PU8i-MeasurePlace', area: 'WHERE SHE WOULD GO', source: 'CLUB RECORDS', pos: 11,
    title: 'Room in the squad, and fair game time', sub: 'Registrations, and minutes from film and team sheets · U13 Girls Meg',
    sentence: 'U13 Girls Meg has 14 registered. Every player gets at least half; Mia would too.',
    graph: { kind: 'place', shares: [52, 55, 58, 50, 61, 54, 57, 53, 60, 56, 51, 59, 55, 50], floor: 50, mine: 50 },
    captures: [
      { label: 'Squad size', lines: '14 registered. Room for one more' },
      { label: 'Fair game time', lines: 'Every player over half, every game, this season' },
      { label: 'Receiving coach', lines: 'Meg: “Yes. We are short in midfield.”' },
    ],
    evidence: { kind: 'place' },
    foot: 'No player on the older team is named. Their game time shows as unnamed bars.',
    derivedCount: true,
  },
]

export const MEASURE = (id: string) => MEASURES.find(m => m.id === id)
export const byPos = (p: number) => MEASURES.find(m => m.pos === p)!
// next in the page order, wrapping round
export const nextMeasure = (m: MeasureCfg) => byPos((m.pos % MEASURES.length) + 1)
export const prevMeasure = (m: MeasureCfg) => byPos(((m.pos - 2 + MEASURES.length) % MEASURES.length) + 1)
