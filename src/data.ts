export type Role = 'head' | 'fitness' | 'defence' | 'gk'
export type IconStyle = 'green' | 'rose' | 'stone'

export interface Drill {
  name: string
  how: string
  tag: string
  mins: number
  startTime?: string
  why?: string
  format?: string[]
  playerNote?: string
}

export interface Action {
  title: string
  sub: string
  iconPath: string
  iconStyle: IconStyle
  href: string
}

export interface Player {
  ini: string
  name: string
  flag: string
  todo: string
}

export interface FocusCard {
  title: string
  reason: string
  clipTime: string
  clipText: string
  clipCount: number
  source: string
  metric: string
  aLabel: string
  aVal: string
  bLabel: string
  bVal: string
  max: number
  clips: number
}

export interface Example {
  clip: boolean
  data: boolean
  t: string
  s: string
}

export interface Worked {
  focus: string
  big: string
  line: string
  sub: string
  examples: Example[]
  keep: string
}

export interface RoleData {
  roleName: string
  heroTitle: string
  heroSub: string
  sessionTitle: string
  sessionSub: string
  start: string
  end: string
  drills: Drill[]
  actions: Action[]
  actionsCount: number
  playersSub: string
  players: Player[]
  talkLabel: string
  talkSub: string
  talkCues: string[]
  talkButton: string
  talkHref: string
  focus: FocusCard[]
  worked: Worked
}

export const COLOR_MAP: Record<string, string> = {
  'Warm-up':  '#cbbeb5',
  'Focus 1':  '#40826d',
  'Focus 2':  '#2f6252',
  'Focus 3':  '#9d7c80',
  'Recovery': '#738678',
}

const SCREEN = 'M5 4h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM8 20h8M12 16v4'
const REMIND = 'M20 12a8 8 0 11-3-6.2M20 4v5h-5'
const SHIRT  = 'M8 4l-5 3 2 4 3-1v10h8V10l3 1 2-4-5-3a4 4 0 01-8 0z'
const CONE   = 'M12 3l6 17H6zM4 20h16M9 12h6'
const GAUGE  = 'M5 18l4-4 3 3 7-7M15 10h4v4'
const CHAT   = 'M4 5h16v11H8l-4 4z'

function ac(title: string, sub: string, iconPath: string, iconStyle: IconStyle, href = '#'): Action {
  return { title, sub, iconPath, iconStyle, href }
}
function pl(ini: string, name: string, flag: string, todo: string): Player {
  return { ini, name, flag, todo }
}
function fc(
  title: string, reason: string,
  clipTime: string, clipText: string, clipCount: number,
  source: string, metric: string,
  aLabel: string, aVal: string, bLabel: string, bVal: string,
  max: number, clips: number
): FocusCard {
  return { title, reason, clipTime, clipText, clipCount, source, metric, aLabel, aVal, bLabel, bVal, max, clips }
}
function ex(kind: 'clip' | 'data', t: string, s: string): Example {
  return { clip: kind === 'clip', data: kind === 'data', t, s }
}

export const DATA: Record<Role, RoleData> = {
  head: {
    roleName: 'Head Coach',
    heroTitle: 'Training, today at 5:45 pm',
    heroSub: 'Training day · Thu 5 Jun · 2 days to Harbour Rovers',
    sessionTitle: "Tonight's session",
    sessionSub: '90 minutes · 4 drills',
    start: '5:45 pm', end: '7:15 pm',
    drills: [
      { name: 'Warm-up rondo, 5 v 2',    how: 'Sharp passing and quick reactions',    tag: 'Warm-up',  mins: 10,
        startTime: '6:00', why: 'Gets passing sharp and starts the pressing habit early.', format: ['7 per group', '10 × 10 m', 'Bibs, 1 ball'] },
      { name: 'Win it back in 6 seconds', how: 'Lose the ball, then hunt it together', tag: 'Focus 1',  mins: 25,
        startTime: '6:10', why: 'We took 7 seconds on Saturday. This rewards a fast team press.', format: ['8 v 8', '40 × 30 m', 'Bibs, cones, stopwatch'], playerNote: 'Noah and Zoe: 3 sprints max' },
      { name: 'Small game, tight shape',  how: 'Keep the back and middle lines close', tag: 'Focus 2',  mins: 30,
        startTime: '6:35', why: 'The gap between our lines let in 6 of their 8 chances.', format: ['7 v 7 + keepers', 'Half pitch, 3 zones', 'Goals, cones'], playerNote: 'Mia: first 15 minutes only' },
      { name: 'Cool-down and stretch',    how: 'Light jog, then a short chat',         tag: 'Recovery', mins: 10,
        startTime: '7:05', why: 'Legs faded late on Saturday. Recover well for this week.', format: ['Whole squad', 'Centre circle', 'No kit'] },
    ],
    actions: [
      ac('Show the team talk',           '3 focus points with clips · about 3 minutes', SCREEN, 'green', '#teamtalk'),
      ac('Remind 5 players to check in', '11 of 16 have said how they feel',            REMIND, 'rose'),
      ac('Hand out the vests',           '3 vests missing · check the kit bag',         SHIRT,  'stone'),
    ],
    actionsCount: 3,
    playersSub: '4 players, and what to do with each',
    players: [
      pl('MT', 'Mia Tran',   'High load this week',     'First 15 min of the small game only'),
      pl('NO', 'Noah Okafor','Growth spurt',             'Skip sprints, 3 max'),
      pl('EB', 'Ella Brandt','Low wellness score',       'Quick chat before warm-up'),
      pl('JP', 'Jai Patel',  'Played 30% more minutes', 'Normal, watch the second half'),
    ],
    talkLabel: 'Team talk',
    talkSub: 'Tap one to see the clip and the numbers',
    talkCues: [
      'Win the ball back faster',
      'Keep defence and midfield closer',
      'Stay strong in the last 15 minutes',
    ],
    talkButton: 'Show the team',
    talkHref: '#teamtalk',
    focus: [
      fc('Win the ball back faster',
        'We took 7 seconds to win it back. Our usual is 4.',
        'Min 16', 'Lost it on halfway. 9 seconds to win it back.', 4,
        'Match camera', 'seconds to win it back',
        'Saturday', '7 s', 'Our usual', '4 s', 8, 4),
      fc('Keep defence and midfield closer',
        'A 25 m gap before 6 of their 8 chances.',
        'Min 29', 'A 28 m gap before their shot.', 6,
        'Match camera', 'gap between the lines',
        'Saturday', '26 m', 'Aim for', '18 m', 30, 6),
      fc('Stay strong in the last 15 minutes',
        'Sprints dropped 22% after minute 45.',
        'Min 52', 'Slow to close down. Legs gone.', 3,
        'GPS vests', 'sprints per player',
        'Before min 45', '18', 'After min 45', '14', 20, 3),
    ],
    worked: {
      focus: 'press higher up the pitch',
      big: '+18%', line: 'more wins of the ball in their half',
      sub: '13 on Saturday, 11 the game before',
      examples: [
        ex('clip', 'Min 14 · Mia and Jai closed down together', 'Won it back in 3 seconds'),
        ex('data', 'Boot sensors · closing-down runs', '9 players ran at the ball in the first 5 seconds, up from 6'),
      ],
      keep: "Tonight's small game still rewards a high press.",
    },
  },

  fitness: {
    roleName: 'Fitness Coach',
    heroTitle: 'Training, today at 5:45 pm',
    heroSub: 'Training day · Thu 5 Nov · 2 days to Harbour Rovers',
    sessionTitle: 'Your part of tonight',
    sessionSub: '45 minutes · 4 drills · lighter night',
    start: '5:45 pm', end: '6:30 pm',
    drills: [
      { name: 'Dynamic warm-up',           how: 'Build up slowly: hips, hamstrings', tag: 'Warm-up',  mins: 15 },
      { name: 'Capped sprint block',        how: '6 short sprints each. Noah and Zoe do 3.', tag: 'Focus 2', mins: 10 },
      { name: 'Late-game legs: repeat runs', how: 'Hard 20 m runs, short rests', tag: 'Focus 1', mins: 10 },
      { name: 'Cool-down and stretch',     how: 'Calves, hips and hamstrings',       tag: 'Recovery', mins: 10 },
    ],
    actions: [
      ac('Send the wellness reminder',         '5 players still to check in',            REMIND, 'rose'),
      ac('Set sprint limits for Noah and Zoe', 'Both in a growth spurt · 3 sprints max', GAUGE,  'green'),
      ac('Charge and hand out the vests',      '3 vests missing · needed for load tracking', SHIRT, 'stone'),
    ],
    actionsCount: 3,
    playersSub: '4 players to manage on load',
    players: [
      pl('NO', 'Noah Okafor', 'Growth spurt',        '3 sprints max, no jumping work'),
      pl('ZH', 'Zoe Hartley', 'Growth spurt',        '3 sprints max, extra stretching after'),
      pl('MT', 'Mia Tran',    'High load this week', 'Warm-up, then light passing only'),
      pl('EB', 'Ella Brandt', 'Low wellness score',  'Ask about sleep and soreness first'),
    ],
    talkLabel: 'Fitness talk',
    talkSub: 'Tap one to see the data',
    talkCues: [
      'Fix the late-game fade',
      'Cap sprints for growing players',
      'Add a lighter day after game week',
    ],
    talkButton: 'Show the players',
    talkHref: '#teamtalk',
    focus: [
      fc('Fix the late-game fade',
        'Five players ran a quarter less in the last 15 minutes.',
        'Min 62', 'Two players walk back as Ironbark break.', 3,
        'GPS vests', 'distance per player (km)',
        'First 15 min', '2.1', 'Last 15 min', '1.6', 2.5, 3),
      fc('Cap sprints for growing players',
        'Noah and Zoe did 30% more sprints than their safe weekly limit.',
        'Min 35', "Noah's fifth long sprint of the half.", 2,
        'Boot sensors', "Noah's sprints this week",
        'This week', '26', 'Safe limit', '20', 30, 2),
      fc('Add a lighter day after game week',
        'Team load ran 18% above plan two weeks running.',
        'Tue training', 'Hard small games straight after a game day.', 2,
        'GPS vests', 'team load vs plan (%)',
        'Last 2 weeks', '118', 'Plan', '100', 130, 2),
    ],
    worked: {
      focus: 'lighter Tuesday sessions',
      big: '+14%', line: 'higher wellness scores this week',
      sub: 'Average 4.1 out of 5, up from 3.6',
      examples: [
        ex('data', 'Wellness check-ins', '11 players said they felt fresh, up from 7'),
        ex('data', 'GPS vests · Tuesday load', 'Kept to plan for the first time in 3 weeks'),
      ],
      keep: 'Keep Tuesdays light and add the repeat runs tonight.',
    },
  },

  defence: {
    roleName: 'Defensive Coach',
    heroTitle: 'Training, today at 6:10 pm',
    heroSub: 'Training day · Thu 5 Nov · 2 days to Harbour Rovers',
    sessionTitle: 'Your group tonight',
    sessionSub: '40 minutes · 4 drills · back four + midfield',
    start: '6:10 pm', end: '6:50 pm',
    drills: [
      { name: 'Shape walk-through',   how: 'Walk the back line up and down',      tag: 'Focus 3', mins: 10 },
      { name: 'Close the gap, 6 v 4', how: 'Midfield and defence stay within 18 m', tag: 'Focus 1', mins: 15 },
      { name: 'Back-post defending',  how: 'Crosses from both sides',             tag: 'Focus 2', mins: 10 },
      { name: 'Step up on the call',  how: 'Grace calls, everyone steps together', tag: 'Focus 3', mins: 5  },
    ],
    actions: [
      ac('Show your group the clips', '3 focus points · 15 clips from Saturday', SCREEN, 'green', '#teamtalk'),
      ac('Set out the 6 v 4 area',    '30 m by 40 m, two mini goals',            CONE,   'stone'),
      ac('Brief the holding mids',    'Stay within 18 m of the back line',       CHAT,   'rose'),
    ],
    actionsCount: 3,
    playersSub: '4 players to watch',
    players: [
      pl('LM', 'Leo Marsh',   'Lost the back-post runner twice', 'Work on checking his shoulder'),
      pl('GO', 'Grace Owusu', 'Out of line 3 times',             'Let her lead the step-up call'),
      pl('EB', 'Ella Brandt', 'Low wellness score',              'Have a quick chat first'),
      pl('JP', 'Jai Patel',   'Played 30% more minutes',        'Shorter reps tonight'),
    ],
    talkLabel: 'Defence talk',
    talkSub: 'Tap one to see the clip',
    talkCues: [
      'Close the gap between lines',
      'Stop the back-post run',
      'Step up together',
    ],
    talkButton: 'Show your group',
    talkHref: '#teamtalk',
    focus: [
      fc('Close the gap between lines',
        'The gap was over 25 m before 6 of their 8 chances.',
        'Min 41', 'A 28 m gap before their shot.', 6,
        'Match camera', 'gap between the lines',
        'Saturday', '26 m', 'Aim for', '18 m', 30, 6),
      fc('Stop the back-post run',
        'Four of their shots came from a run we lost at the back post.',
        'Min 33', 'Their winger arrives unmarked at the back post.', 4,
        'Match camera', 'shots from back-post runs',
        'Saturday', '4', 'Our usual', '1', 5, 4),
      fc('Step up together',
        'Our back line stepped up out of sync 5 times in the second half.',
        'Min 57', 'Left back holds while the rest step up.', 5,
        'Match camera', 'times out of line',
        'Second half', '5', 'First half', '1', 6, 5),
    ],
    worked: {
      focus: 'defend crosses as a three',
      big: '+20%', line: 'more crosses cleared first time',
      sub: '6 of 10 cleared, up from 5 of 10',
      examples: [
        ex('clip', 'Min 27 · Leo heads clear under pressure', 'Three defenders in the box, all in position'),
        ex('data', 'Match camera · crosses cleared', '6 of 10 cleared first time, up from 5'),
      ],
      keep: 'Keep three in the box during the back-post drill.',
    },
  },

  gk: {
    roleName: 'GK Coach',
    heroTitle: 'Training, today at 6:00 pm',
    heroSub: 'Training day · Thu 5 Nov · 2 days to Harbour Rovers',
    sessionTitle: 'Keepers tonight',
    sessionSub: '45 minutes · 4 drills · then join the small game',
    start: '6:00 pm', end: '6:45 pm',
    drills: [
      { name: 'Handling warm-up',       how: 'Catches, then low dives both sides',    tag: 'Warm-up',  mins: 10 },
      { name: 'Start higher, then sweep', how: 'Start 4 m higher and attack through balls', tag: 'Focus 1', mins: 15 },
      { name: 'Quick restarts',         how: 'Throw or roll it out in under 6 seconds', tag: 'Focus 2', mins: 10 },
      { name: 'Crosses and calling',    how: 'Call early, come and claim',             tag: 'Focus 3', mins: 10 },
    ],
    actions: [
      ac('Show Ava and Tom their clips', '9 clips from Saturday · about 5 minutes', SCREEN, 'green', '#teamtalk'),
      ac('Set up the sweeping area',     'Cones 4 m and 8 m off the line',          CONE,   'stone'),
      ac('Check gloves and kit',         "Tom's wrist strapping in the first-aid bag", CHAT, 'rose'),
    ],
    actionsCount: 3,
    playersSub: 'Your 2 keepers tonight',
    players: [
      pl('AL', 'Ava Lindqvist', 'Started deep on through balls', 'Start 4 m higher in every drill'),
      pl('TR', 'Tom Reyes',     'Back from a sore wrist',         'Catching only, no diving to the left'),
    ],
    talkLabel: 'Keeper talk',
    talkSub: 'Tap one to see the clip',
    talkCues: [
      'Come off the line earlier',
      'Start restarts quicker',
      'Call for the cross',
    ],
    talkButton: 'Show the keepers',
    talkHref: '#teamtalk',
    focus: [
      fc('Come off the line earlier',
        'Three through balls ran in behind. Ava started 4 m deeper than usual.',
        'Min 18', "Through ball runs past the keeper's starting spot.", 3,
        'Match camera', 'starting spot from goal',
        'Saturday', '8 m', 'Our usual', '12 m', 14, 3),
      fc('Start restarts quicker',
        'Restarts took 9 seconds on average.',
        'Min 44', '12 seconds to restart after a catch.', 4,
        'Match camera', 'seconds to restart',
        'Saturday', '9 s', 'Aim for', '6 s', 10, 4),
      fc('Call for the cross',
        'Two crosses dropped between keeper and defender.',
        'Min 51', 'A cross lands between Ava and Leo.', 2,
        'Match camera', 'crosses claimed',
        'Claimed', '3', 'Faced', '5', 5, 2),
    ],
    worked: {
      focus: 'quick roll-outs to the full-backs',
      big: '+25%', line: 'more restarts under 6 seconds',
      sub: '5 on Saturday, up from 4',
      examples: [
        ex('clip', "Min 9 · Ava's quick roll starts our first goal", '4 seconds from catch to pass'),
        ex('data', 'Match camera · restart time', '5 restarts under 6 seconds, up from 4'),
      ],
      keep: "Keep the quick roll-out in tonight's restart drill.",
    },
  },
}

export const ROLES: Array<{ id: Role; label: string }> = [
  { id: 'head',    label: 'Coach' },
  { id: 'fitness', label: 'Fitness' },
]

// ── Home screen data ──────────────────────────────────────────────────────────

export interface InboxItem {
  iconPath: string
  iconBg: 'green' | 'rose' | 'stone'
  category: string
  time: string
  unread: boolean
  title: string
}

export const INBOX: InboxItem[] = [
  { iconPath: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z', iconBg: 'rose',  category: 'Wellness check-ins',       time: '7:30 am',   unread: true,  title: 'Ella has felt low two days running' },
  { iconPath: 'M20 12a8 8 0 11-3-6.2M20 4v5h-5',                                                                                                           iconBg: 'stone', category: 'Data',                     time: '7:12 am',   unread: true,  title: "3 GPS vests didn't sync" },
  { iconPath: 'M4 5h16v11H8l-4 4z',                                                                                                                         iconBg: 'green', category: 'Priya Shah · Fitness Coach', time: 'Yesterday', unread: true,  title: 'Sprint caps set for Noah and Zoe' },
  { iconPath: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 8v4l3 3',                                                                                           iconBg: 'green', category: 'Clean Sheet',               time: 'Mon',       unread: false, title: 'Player goals: 3 need work' },
  { iconPath: 'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3',                                                                                      iconBg: 'green', category: 'Clean Sheet',               time: 'Sun',       unread: false, title: "Last week's plan worked" },
  { iconPath: 'M4 19V9M10 19V5M16 19v-7M22 19H2',                                                                                                           iconBg: 'green', category: 'Clean Sheet',               time: 'Sun',       unread: false, title: 'Match review ready: Ironbark United, won 3–1' },
]

export interface Metric {
  label: string
  value: string
  status: string
  statusType: 'bad' | 'good' | 'neutral'
  sparkData: number[]
}

export const METRICS: Metric[] = [
  { label: 'Winning the ball back',     value: '7 s',  status: 'Needs work',    statusType: 'bad',     sparkData: [4, 4, 5, 5.5, 6, 6.5, 7] },
  { label: 'Pressing wins in their half', value: '13', status: 'Getting better', statusType: 'good',   sparkData: [8, 9, 10, 10, 11, 12, 13] },
  { label: 'Gap between the lines',    value: '26 m', status: 'Needs work',    statusType: 'bad',     sparkData: [18, 20, 21, 22, 23, 25, 26] },
  { label: 'Goal difference',          value: '+5',   status: 'Steady',        statusType: 'neutral', sparkData: [4, 5, 5, 4, 5, 5, 5] },
]

export const WEEK_SCHEDULE = [
  { day: 'Mon', date: 1, type: 'rest',   label: 'Rest',                  icon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' },
  { day: 'Tue', date: 2, type: 'done',   label: 'Training · done',       icon: 'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3' },
  { day: 'Wed', date: 3, type: 'rest',   label: 'Rest',                  icon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' },
  { day: 'Thu', date: 4, type: 'today',  label: 'Training 5:45 pm',      icon: 'M12 3l6 17H6zM4 20h16M9 12h6' },
  { day: 'Fri', date: 5, type: 'rest',   label: 'Rest',                  icon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' },
  { day: 'Sat', date: 6, type: 'game',   label: 'Harbour Rovers · 9:30', icon: 'M12 22a10 10 0 100-20 10 10 0 000 20zM8 12h8M12 8v8' },
  { day: 'Sun', date: 7, type: 'review', label: "Review, once it's in",  icon: 'M4 19V9M10 19V5M16 19v-7M22 19H2' },
]

export const RESULTS = {
  position: '3rd of 10',
  games: ['W', 'W', 'D', 'L', 'W'] as Array<'W' | 'D' | 'L'>,
  next: 'Sat 9:30 vs Harbour Rovers',
  nextDetail: 'Home · 12 in, 2 out, 3 to answer',
}

export const SQUAD = { total: 17, ready: 12, manage: 4, checkIn: 1 }

// ── Match day data ────────────────────────────────────────────────────────────

export interface MatchCheck {
  title: string
  sub: string
  status: 'done' | 'warning' | 'info'
  action?: string
}

export interface GamePlanCue {
  line: string
  why: string
  practised: string
  clipMin: number
}

export interface RunSheetItem {
  time: string
  activity: string
  highlight?: boolean
}

export interface MinutesPlayer {
  ini: string
  name: string
  mins: number
  halfMins: number  // half-time (35)
  total: number     // full game (70)
  check: boolean    // "Check" instead of number
}

export const MATCHDAY = {
  doneCount: 3,
  totalChecks: 5,
  checks: [
    { title: 'Camera charged',  sub: 'Battery full',                       status: 'done'    } as MatchCheck,
    { title: 'Camera set up',   sub: 'Halfway line, facing the pitch',     status: 'warning', action: 'Set up'  } as MatchCheck,
    { title: 'Boot sensors',    sub: 'All 16 synced',                      status: 'done'    } as MatchCheck,
    { title: 'GPS vests',       sub: '3 to hand out',                      status: 'warning', action: 'See who' } as MatchCheck,
    { title: 'Check-ins',       sub: '14 of 16 done',                      status: 'info'    } as MatchCheck,
  ],
  runSheet: [
    { time: '8:45',   activity: 'Arrive and hand out vests' },
    { time: '8:55',   activity: 'Warm-up' },
    { time: '9:20',   activity: 'Team talk' },
    { time: '9:30',   activity: 'Kick-off', highlight: true },
    { time: '10:05',  activity: 'Half-time' },
    { time: '10:50',  activity: 'Full time' },
    { time: '~12:50', activity: 'Match review ready' },
  ] as RunSheetItem[],
  gamePlan: [
    { line: 'Lose it? Win it back in 6 seconds.', why: 'Last game we took 7 seconds. Our usual is 4.', practised: 'Win it back in 6 seconds', clipMin: 23 },
    { line: 'Keep our lines close.',              why: 'The gap was over 25 m before 6 of their 8 chances.', practised: 'Small game, tight shape', clipMin: 41 },
    { line: 'Keep running to the final whistle.', why: 'Our sprints dropped 22% after minute 50.', practised: 'Fresh legs from the bench at 50 minutes.', clipMin: 58 },
  ] as GamePlanCue[],
  minutesPlan: [
    { ini: 'MT', name: 'Mia Tran',    mins: 35, halfMins: 35, total: 70, check: false },
    { ini: 'NO', name: 'Noah Okafor', mins: 50, halfMins: 35, total: 70, check: false },
    { ini: 'EB', name: 'Ella Brandt', mins: 70, halfMins: 35, total: 70, check: true  },
    { ini: 'JP', name: 'Jai Patel',   mins: 30, halfMins: 35, total: 70, check: false },
  ] as MinutesPlayer[],
  // legacy - kept for backward compat
  cues: ['Lose it? Win it back in 6 seconds.', 'Keep our lines close.', 'Keep running to the final whistle.'],
  players: [
    { ini: 'MT', name: 'Mia Tran',    flag: 'High load',    value: '35 min', valueType: 'mins'  as const },
    { ini: 'NO', name: 'Noah Okafor', flag: 'Growth spurt', value: '50 min', valueType: 'mins'  as const },
    { ini: 'EB', name: 'Ella Brandt', flag: 'Low wellness', value: 'Check',  valueType: 'check' as const },
    { ini: 'JP', name: 'Jai Patel',   flag: 'Extra minutes',value: '30 min', valueType: 'mins'  as const },
  ],
}

// ── Squad screen ──────────────────────────────────────────────────────────────

export type PosGroup   = 'keepers' | 'defenders' | 'midfielders' | 'forwards'
export type PlayerStatus = 'ready' | 'manage' | 'checkin' | 'missing'

export interface SquadPlayer {
  ini: string; name: string; fullName: string; pos: string
  posGroup: PosGroup; wellness: number | null; status: PlayerStatus; note: string
  devGoal: string; devGoalStatus: 'on-track' | 'needs-work'
  load: number; minutes: number; minutesUsed: number
  games: number; goals: number; assists: number; avgRating: number
  foot: 'right' | 'left'; season: string; checkInNote?: string
}

export const SQUAD_PLAYERS: SquadPlayer[] = [
  { ini:'AL', name:'Ava L.',   fullName:'Ava Lindqvist', pos:'Goalkeeper',       posGroup:'keepers',    wellness:3.3, status:'manage',  note:'Short on sleep',  devGoal:'Come off the line faster',   devGoalStatus:'on-track',   load:88,  minutes:350, minutesUsed:320, games:8, goals:0, assists:1, avgRating:7.4, foot:'right', season:'third season' },
  { ini:'TR', name:'Tom R.',   fullName:'Tom Reyes',     pos:'Goalkeeper',       posGroup:'keepers',    wellness:4.0, status:'ready',   note:'Wrist check',     devGoal:'Start restarts quicker',     devGoalStatus:'needs-work', load:95,  minutes:350, minutesUsed:210, games:8, goals:0, assists:0, avgRating:6.9, foot:'right', season:'first season' },
  { ini:'LM', name:'Leo M.',   fullName:'Leo Marsh',     pos:'Centre back',      posGroup:'defenders',  wellness:4.3, status:'ready',   note:'Back-post run',   devGoal:'Win headers in the air',     devGoalStatus:'on-track',   load:102, minutes:560, minutesUsed:490, games:8, goals:1, assists:2, avgRating:7.1, foot:'right', season:'second season' },
  { ini:'GO', name:'Grace O.', fullName:'Grace Owusu',   pos:'Centre back',      posGroup:'defenders',  wellness:4.0, status:'ready',   note:'Leads the call',  devGoal:'Step up together',           devGoalStatus:'on-track',   load:98,  minutes:560, minutesUsed:530, games:8, goals:0, assists:3, avgRating:7.6, foot:'left',  season:'third season' },
  { ini:'KR', name:'Kai R.',   fullName:'Kai Rahman',    pos:'Right back',       posGroup:'defenders',  wellness:3.8, status:'ready',   note:'Ready',           devGoal:'Drive forward with the ball',devGoalStatus:'on-track',   load:100, minutes:560, minutesUsed:490, games:8, goals:0, assists:4, avgRating:7.3, foot:'right', season:'second season' },
  { ini:'SD', name:'Sam D.',   fullName:'Sam Diallo',    pos:'Left back',        posGroup:'defenders',  wellness:null,status:'missing', note:'No check-in',     devGoal:'Cross first time',           devGoalStatus:'needs-work', load:95,  minutes:560, minutesUsed:420, games:8, goals:0, assists:1, avgRating:6.8, foot:'right', season:'first season' },
  { ini:'RC', name:'Ruby C.',  fullName:'Ruby Chen',     pos:'Right back',       posGroup:'defenders',  wellness:4.3, status:'ready',   note:'Ready',           devGoal:'Take on players wide',       devGoalStatus:'needs-work', load:90,  minutes:560, minutesUsed:350, games:8, goals:1, assists:2, avgRating:7.0, foot:'right', season:'second season' },
  { ini:'MT', name:'Mia T.',   fullName:'Mia Tran',      pos:'Central midfield', posGroup:'midfielders',wellness:3.3, status:'manage',  note:'High load',       devGoal:'Pass with her left foot',    devGoalStatus:'on-track',   load:125, minutes:560, minutesUsed:560, games:8, goals:2, assists:3, avgRating:7.1, foot:'right', season:'second season', checkInNote:'heavy legs' },
  { ini:'JP', name:'Jai P.',   fullName:'Jai Patel',     pos:'Central midfield', posGroup:'midfielders',wellness:3.8, status:'manage',  note:'Extra minutes',   devGoal:'Shoot from outside the box', devGoalStatus:'needs-work', load:118, minutes:560, minutesUsed:560, games:8, goals:3, assists:8, avgRating:7.9, foot:'right', season:'third season' },
  { ini:'EB', name:'Ella B.',  fullName:'Ella Brandt',   pos:'Holding midfield', posGroup:'midfielders',wellness:2.3, status:'checkin', note:'Low wellness',    devGoal:'Drive forward with the ball',devGoalStatus:'on-track',   load:92,  minutes:560, minutesUsed:350, games:8, goals:2, assists:3, avgRating:7.1, foot:'right', season:'second season' },
  { ini:'IM', name:'Isla M.',  fullName:'Isla Moore',    pos:'Attacking mid',    posGroup:'midfielders',wellness:4.5, status:'ready',   note:'Ready',           devGoal:'Score from midfield runs',   devGoalStatus:'on-track',   load:95,  minutes:560, minutesUsed:420, games:8, goals:4, assists:5, avgRating:7.5, foot:'left',  season:'second season' },
  { ini:'OB', name:'Oscar B.', fullName:'Oscar Bell',    pos:'Attacking mid',    posGroup:'midfielders',wellness:4.0, status:'ready',   note:'Set a goal',      devGoal:'Score from midfield runs',   devGoalStatus:'needs-work', load:88,  minutes:560, minutesUsed:490, games:8, goals:2, assists:2, avgRating:6.9, foot:'right', season:'first season' },
  { ini:'NO', name:'Noah O.',  fullName:'Noah Okafor',   pos:'Centre forward',   posGroup:'forwards',   wellness:3.8, status:'manage',  note:'Growth spurt',    devGoal:'Head from crosses',          devGoalStatus:'needs-work', load:108, minutes:560, minutesUsed:490, games:8, goals:5, assists:2, avgRating:7.4, foot:'right', season:'second season' },
  { ini:'ZH', name:'Zoe H.',   fullName:'Zoe Hartley',   pos:'Right wing',       posGroup:'forwards',   wellness:null,status:'missing', note:'Growth spurt',    devGoal:'Win it wide and cross',      devGoalStatus:'on-track',   load:102, minutes:560, minutesUsed:490, games:8, goals:3, assists:4, avgRating:7.6, foot:'right', season:'third season' },
  { ini:'FW', name:'Finn W.',  fullName:'Finn Walsh',    pos:'Left wing',        posGroup:'forwards',   wellness:4.3, status:'ready',   note:'Ready',           devGoal:'Score from the left',        devGoalStatus:'on-track',   load:95,  minutes:560, minutesUsed:420, games:8, goals:4, assists:3, avgRating:7.2, foot:'left',  season:'second season' },
  { ini:'LN', name:'Lily N.',  fullName:'Lily Nguyen',   pos:'Centre forward',   posGroup:'forwards',   wellness:4.0, status:'ready',   note:'Set a goal',      devGoal:'Score from inside the box',  devGoalStatus:'needs-work', load:90,  minutes:560, minutesUsed:350, games:8, goals:6, assists:1, avgRating:7.3, foot:'right', season:'first season' },
]

export const SENIORS_SQUAD_PLAYERS: SquadPlayer[] = [
  { ini:'BK', name:'Ben K.',    fullName:'Ben Kowalski',     pos:'Goalkeeper',       posGroup:'keepers',    wellness:4.1, status:'ready',   note:'Ready',           devGoal:'Distribute with right foot',  devGoalStatus:'on-track',   load:92,  minutes:720, minutesUsed:720, games:10, goals:0, assists:0, avgRating:7.2, foot:'left',  season:'fourth season' },
  { ini:'DV', name:'Dean V.',   fullName:'Dean Vukovic',     pos:'Goalkeeper',       posGroup:'keepers',    wellness:3.8, status:'ready',   note:'Yellow watch',    devGoal:'Come off the line faster',    devGoalStatus:'on-track',   load:88,  minutes:720, minutesUsed:360, games:10, goals:0, assists:0, avgRating:6.8, foot:'right', season:'second season' },
  { ini:'LF', name:'Luca F.',   fullName:'Luca Ferraro',     pos:'Centre back',      posGroup:'defenders',  wellness:4.2, status:'ready',   note:'Reg closes 30 Jun',devGoal:'Step up earlier',            devGoalStatus:'on-track',   load:98,  minutes:720, minutesUsed:680, games:10, goals:1, assists:2, avgRating:7.4, foot:'right', season:'third season' },
  { ini:'JB', name:'Josh B.',   fullName:'Josh Barker',      pos:'Centre back',      posGroup:'defenders',  wellness:4.5, status:'ready',   note:'Ready',           devGoal:'Win second balls',            devGoalStatus:'on-track',   load:101, minutes:720, minutesUsed:700, games:10, goals:2, assists:1, avgRating:7.6, foot:'right', season:'fifth season' },
  { ini:'MG', name:'Marco G.',  fullName:'Marco Gentile',    pos:'Right back',       posGroup:'defenders',  wellness:3.5, status:'manage',  note:'High load',       devGoal:'Hold the line under pressure',devGoalStatus:'needs-work', load:112, minutes:720, minutesUsed:720, games:10, goals:0, assists:3, avgRating:7.0, foot:'right', season:'second season' },
  { ini:'PW', name:'Pete W.',   fullName:'Pete Walsh',       pos:'Left back',        posGroup:'defenders',  wellness:4.0, status:'ready',   note:'Ready',           devGoal:'Cross early from deep',       devGoalStatus:'needs-work', load:95,  minutes:720, minutesUsed:650, games:10, goals:0, assists:4, avgRating:7.1, foot:'left',  season:'third season' },
  { ini:'SR', name:'Sam R.',    fullName:'Sam Russo',        pos:'Centre back',      posGroup:'defenders',  wellness:null,status:'missing', note:'No check-in',     devGoal:'Communicate earlier',         devGoalStatus:'needs-work', load:88,  minutes:720, minutesUsed:540, games:10, goals:1, assists:1, avgRating:6.9, foot:'right', season:'first season' },
  { ini:'DC', name:'Dan C.',    fullName:'Daniel Costa',     pos:'Central midfield', posGroup:'midfielders',wellness:3.9, status:'manage',  note:'Every minute × 4',devGoal:'Share the ball earlier',      devGoalStatus:'on-track',   load:118, minutes:720, minutesUsed:720, games:10, goals:1, assists:5, avgRating:7.5, foot:'right', season:'fourth season' },
  { ini:'TN', name:'Tom N.',    fullName:'Tom Nguyen',       pos:'Central midfield', posGroup:'midfielders',wellness:4.3, status:'ready',   note:'Ready',           devGoal:'Win the ball higher',         devGoalStatus:'on-track',   load:99,  minutes:720, minutesUsed:650, games:10, goals:3, assists:4, avgRating:7.8, foot:'right', season:'third season' },
  { ini:'AP', name:'Alex P.',   fullName:'Alex Park',        pos:'Holding midfield', posGroup:'midfielders',wellness:4.0, status:'ready',   note:'Ready',           devGoal:'Screen the defence better',   devGoalStatus:'on-track',   load:96,  minutes:720, minutesUsed:680, games:10, goals:0, assists:2, avgRating:7.3, foot:'right', season:'second season' },
  { ini:'RV', name:'Rico V.',   fullName:'Rico Vargas',      pos:'Attacking mid',    posGroup:'midfielders',wellness:3.6, status:'manage',  note:'Tight hamstring', devGoal:'Shoot on first touch',        devGoalStatus:'needs-work', load:106, minutes:720, minutesUsed:580, games:10, goals:5, assists:6, avgRating:7.9, foot:'left',  season:'fifth season' },
  { ini:'CB', name:'Chris B.',  fullName:'Chris Brennan',    pos:'Right wing',       posGroup:'forwards',   wellness:4.2, status:'ready',   note:'Ready',           devGoal:'Beat the first man wide',     devGoalStatus:'on-track',   load:93,  minutes:720, minutesUsed:600, games:10, goals:4, assists:5, avgRating:7.4, foot:'right', season:'third season' },
  { ini:'MA', name:'Mo A.',     fullName:'Mohammed Al-Amin', pos:'Left wing',        posGroup:'forwards',   wellness:4.5, status:'ready',   note:'Ready',           devGoal:'Stay wide and time the run',  devGoalStatus:'on-track',   load:90,  minutes:720, minutesUsed:580, games:10, goals:6, assists:4, avgRating:7.6, foot:'left',  season:'second season' },
  { ini:'HK', name:'Harry K.',  fullName:'Harry Kim',        pos:'Centre forward',   posGroup:'forwards',   wellness:4.1, status:'ready',   note:'Set a goal',      devGoal:'Hold up play longer',         devGoalStatus:'needs-work', load:97,  minutes:720, minutesUsed:650, games:10, goals:9, assists:3, avgRating:7.7, foot:'right', season:'fourth season' },
]

export const YOUTH_SQUAD_PLAYERS: SquadPlayer[] = [
  { ini:'OG', name:'Oscar G.',  fullName:'Oscar Gale',       pos:'Goalkeeper',       posGroup:'keepers',    wellness:4.0, status:'ready',   note:'Ready',           devGoal:'Come off the line faster',    devGoalStatus:'on-track',   load:88,  minutes:560, minutesUsed:560, games:8, goals:0, assists:0, avgRating:7.0, foot:'right', season:'second season' },
  { ini:'RP', name:'Ryan P.',   fullName:'Ryan Petersen',    pos:'Centre back',      posGroup:'defenders',  wellness:3.8, status:'checkin', note:'Suspended Sat',   devGoal:'Step up earlier',             devGoalStatus:'on-track',   load:95,  minutes:560, minutesUsed:530, games:8, goals:0, assists:1, avgRating:7.2, foot:'right', season:'third season' },
  { ini:'JL', name:'Jake L.',   fullName:'Jake Liu',         pos:'Centre back',      posGroup:'defenders',  wellness:4.3, status:'ready',   note:'Ready',           devGoal:'Win headers in the air',      devGoalStatus:'on-track',   load:100, minutes:560, minutesUsed:490, games:8, goals:1, assists:2, avgRating:7.3, foot:'right', season:'second season' },
  { ini:'EM', name:'Ella M.',   fullName:'Ella Moran',       pos:'Right back',       posGroup:'defenders',  wellness:4.1, status:'ready',   note:'Ready',           devGoal:'Drive forward with the ball', devGoalStatus:'needs-work', load:93,  minutes:560, minutesUsed:490, games:8, goals:0, assists:3, avgRating:7.0, foot:'right', season:'first season' },
  { ini:'NF', name:'Nick F.',   fullName:'Nick Fabian',      pos:'Left back',        posGroup:'defenders',  wellness:null,status:'missing', note:'No check-in',     devGoal:'Cross early from deep',       devGoalStatus:'needs-work', load:88,  minutes:560, minutesUsed:420, games:8, goals:0, assists:1, avgRating:6.8, foot:'left',  season:'second season' },
  { ini:'TO', name:'Theo O.',   fullName:'Theo Ortiz',       pos:'Central midfield', posGroup:'midfielders',wellness:4.5, status:'ready',   note:'Ready',           devGoal:'Shoot from outside the box',  devGoalStatus:'on-track',   load:98,  minutes:560, minutesUsed:490, games:8, goals:3, assists:4, avgRating:7.6, foot:'right', season:'third season' },
  { ini:'CW', name:'Cal W.',    fullName:'Cal West',         pos:'Central midfield', posGroup:'midfielders',wellness:4.0, status:'manage',  note:'Exam Friday',     devGoal:'Win the ball higher',         devGoalStatus:'on-track',   load:102, minutes:560, minutesUsed:490, games:8, goals:1, assists:3, avgRating:7.2, foot:'right', season:'second season' },
  { ini:'IR', name:'Ivan R.',   fullName:'Ivan Reeve',       pos:'Holding midfield', posGroup:'midfielders',wellness:3.9, status:'ready',   note:'Ready',           devGoal:'Screen the back four',        devGoalStatus:'needs-work', load:95,  minutes:560, minutesUsed:420, games:8, goals:0, assists:2, avgRating:7.0, foot:'right', season:'first season' },
  { ini:'PH', name:'Phil H.',   fullName:'Phil Huang',       pos:'Attacking mid',    posGroup:'midfielders',wellness:4.3, status:'ready',   note:'Set a goal',      devGoal:'Score from midfield runs',    devGoalStatus:'on-track',   load:90,  minutes:560, minutesUsed:420, games:8, goals:4, assists:5, avgRating:7.4, foot:'left',  season:'second season' },
  { ini:'AT', name:'Ari T.',    fullName:'Ari Tanaka',       pos:'Right wing',       posGroup:'forwards',   wellness:4.2, status:'ready',   note:'Ready',           devGoal:'Beat the first man wide',     devGoalStatus:'on-track',   load:92,  minutes:560, minutesUsed:490, games:8, goals:3, assists:4, avgRating:7.3, foot:'right', season:'second season' },
  { ini:'LK', name:'Leo K.',    fullName:'Leo Kowalski',     pos:'Left wing',        posGroup:'forwards',   wellness:3.5, status:'manage',  note:'High load',       devGoal:'Time the run to the near post',devGoalStatus:'needs-work', load:110, minutes:560, minutesUsed:490, games:8, goals:5, assists:2, avgRating:7.5, foot:'left',  season:'third season' },
  { ini:'SP', name:'Sam P.',    fullName:'Sam Park',         pos:'Centre forward',   posGroup:'forwards',   wellness:4.0, status:'ready',   note:'Ready',           devGoal:'Hold the ball under pressure', devGoalStatus:'needs-work', load:95,  minutes:560, minutesUsed:420, games:8, goals:6, assists:3, avgRating:7.4, foot:'right', season:'second season' },
]

export const POS_GROUP_LABELS: Record<PosGroup, string> = {
  keepers: 'Keepers', defenders: 'Defenders', midfielders: 'Midfielders', forwards: 'Forwards',
}

// ── Clips screen ──────────────────────────────────────────────────────────────

export type ClipType = 'good' | 'work'

export interface GameClip {
  id: number; game: string; gameResult: 'W' | 'L' | 'D'; gameLabel: string; gameDate: string
  min: number; duration: string; title: string; desc: string; type: ClipType
  measures: string[]; players: string[]; half: string; taggedBy?: string
  stat1Label?: string; stat1Value?: string; stat2Label?: string; stat2Value?: string
  stat3Label?: string; stat3Value?: string; stat4Label?: string; stat4Value?: string
}

export const CLIPS_GAMES = [
  { id: 'ironbark',  label: 'Ironbark 3–1',  result: 'W' as const, date: 'Sat 30 May' },
  { id: 'saltmarsh', label: 'Saltmarsh 1–2', result: 'L' as const, date: 'Sat 23 May' },
  { id: 'northgate', label: 'Northgate 1–1', result: 'D' as const, date: 'Sat 16 May' },
  { id: 'bayside',   label: 'Tealside Town 2–0',   result: 'W' as const, date: 'Sat 9 May'  },
]

export const CLIPS_MEASURES = [
  'Pressing high', 'Winning it back', 'Building out', 'Counter-attacks', 'Gap between lines', 'Goals and chances',
]

export const CLIPS: GameClip[] = [
  // Ironbark 3–1 · Sat 30 May (7 clips · 4 good)
  { id:1,  game:'ironbark',  gameResult:'W', gameLabel:'Ironbark 3–1',  gameDate:'Sat 30 May', min:9,  duration:'0:18', title:'Eight passes out from the keeper', desc:'Ella splits wide, Mia shows on the half-turn, and we play through their press.',               type:'good', measures:['Building out'],      players:['EB','MT'],       half:'First half',   taggedBy:'you', stat1Label:'8',                stat1Value:'Passes in move · Match camera', stat2Label:'0.9 s avg',    stat2Value:'Time on ball · Boot sensors',      stat3Label:'4 before receiving', stat3Value:'Mia scans · Match camera',    stat4Label:'Over halfway',  stat4Value:'Ended · Match camera' },
  { id:2,  game:'ironbark',  gameResult:'W', gameLabel:'Ironbark 3–1',  gameDate:'Sat 30 May', min:16, duration:'0:14', title:'Lost it on halfway',               desc:'One player presses, the rest watch. Nine seconds before we win it back.',                        type:'work', measures:['Winning it back'],  players:['NO','EB'],       half:'First half',                   stat1Label:'9 s',              stat1Value:'Win back · Match camera',       stat2Label:'1 of 4',       stat2Value:'Players pressing · Match camera', stat3Label:'22 km/h',           stat3Value:'Noah top speed · GPS vest',   stat4Label:'11 m',          stat4Value:'Distance to ball · Match camera' },
  { id:3,  game:'ironbark',  gameResult:'W', gameLabel:'Ironbark 3–1',  gameDate:'Sat 30 May', min:22, duration:'0:11', title:'Front three force the mistake',    desc:'Jai curves his run to cut off the centre-back. Won in their half, shot 6 seconds later.',     type:'good', measures:['Pressing high'],     players:['JP','ZH','LM'], half:'First half',                   stat1Label:'28 m from goal',   stat1Value:'Won at · Match camera',         stat2Label:'3 of 3',       stat2Value:'Players pressing · Match camera', stat3Label:'26 km/h',           stat3Value:'Jai sprint · GPS vest',       stat4Label:'6 s',           stat4Value:'Shot after · Match camera' },
  { id:4,  game:'ironbark',  gameResult:'W', gameLabel:'Ironbark 3–1',  gameDate:'Sat 30 May', min:29, duration:'0:16', title:'A 28 m gap before their shot',     desc:'Gap between lines · min 29. Lines split wide before the chance.',                              type:'work', measures:['Gap between lines'], players:['TR','GO'],       half:'First half',                   stat1Label:'28 m',             stat1Value:'Gap · Match camera',            stat2Label:'9 passes',     stat2Value:'No press · Match camera' },
  { id:5,  game:'ironbark',  gameResult:'W', gameLabel:'Ironbark 3–1',  gameDate:'Sat 30 May', min:37, duration:'0:12', title:'Win it, go, goal in 8 seconds',    desc:'Win back, Jai runs at goal, scores in 8 seconds.',                                              type:'good', measures:['Counter-attacks'],  players:['ZH','JP','MT'], half:'Second half', taggedBy:'you', stat1Label:'8 s',              stat1Value:'Win to goal · Match camera',    stat2Label:'3 passes',     stat2Value:'In the move · Match camera' },
  { id:6,  game:'ironbark',  gameResult:'W', gameLabel:'Ironbark 3–1',  gameDate:'Sat 30 May', min:47, duration:'0:09', title:"Mia's goal, 3–1",                 desc:'Scores from the edge of the box after a quick combination.',                                    type:'good', measures:['Goals and chances'], players:['MT','AL'],       half:'Second half' },
  { id:7,  game:'ironbark',  gameResult:'W', gameLabel:'Ironbark 3–1',  gameDate:'Sat 30 May', min:52, duration:'0:10', title:'Slow to close down, legs gone',    desc:'No press from midfield. They build through easily.',                                            type:'work', measures:['Pressing high'],     players:['LM','AL'],       half:'Second half' },
  // Northgate 1–1 · Sat 16 May (5 clips · 2 good)
  { id:8,  game:'northgate', gameResult:'D', gameLabel:'Northgate 1–1', gameDate:'Sat 16 May', min:19, duration:'0:11', title:'Press traps them on the touchline', desc:'Coordinated press forces a long ball out of play.',                                             type:'good', measures:['Pressing high'],     players:['ZH','LM','JP'], half:'First half' },
  { id:9,  game:'northgate', gameResult:'D', gameLabel:'Northgate 1–1', gameDate:'Sat 16 May', min:11, duration:'0:17', title:'Through the thirds, ten passes',   desc:'Patient build-up from defence through all three thirds, ten passes.',                           type:'good', measures:['Building out'],      players:['GO','AL','MT'], half:'First half' },
  { id:10, game:'northgate', gameResult:'D', gameLabel:'Northgate 1–1', gameDate:'Sat 16 May', min:34, duration:'0:13', title:'Chased but didn\'t close',         desc:'Pressed high but no one commits to the ball. Winning it back · min 34.',                        type:'work', measures:['Winning it back'],  players:['MT','NO'],       half:'First half' },
  { id:11, game:'northgate', gameResult:'D', gameLabel:'Northgate 1–1', gameDate:'Sat 16 May', min:46, duration:'0:14', title:'Lines pull wide, they go through', desc:'Gap between our lines before their counter. Mid-block split.',                                  type:'work', measures:['Gap between lines'], players:['TR','EB'],       half:'Second half' },
  { id:12, game:'northgate', gameResult:'D', gameLabel:'Northgate 1–1', gameDate:'Sat 16 May', min:55, duration:'0:12', title:'Win it, hold it—lost too long',    desc:'Won it high but held too long. Counter-attacks · min 55.',                                      type:'work', measures:['Counter-attacks'],  players:['TR','LM'],       half:'Second half' },
  // Saltmarsh 1–2 · Sat 23 May (5 clips · 1 good)
  { id:13, game:'saltmarsh', gameResult:'L', gameLabel:'Saltmarsh 1–2', gameDate:'Sat 23 May', min:14, duration:'0:12', title:'Press split, they play through',   desc:'Pressed alone, Saltmarsh played through the first line easily.',                                type:'work', measures:['Pressing high'],     players:['JP','ZH'],       half:'First half' },
  { id:14, game:'saltmarsh', gameResult:'L', gameLabel:'Saltmarsh 1–2', gameDate:'Sat 23 May', min:22, duration:'0:16', title:'Turned over in midfield',          desc:'Ball turned over before we could build. Building out · min 22.',                                type:'work', measures:['Building out'],      players:['GO','EB'],       half:'First half' },
  { id:15, game:'saltmarsh', gameResult:'L', gameLabel:'Saltmarsh 1–2', gameDate:'Sat 23 May', min:33, duration:'0:16', title:'Long ball after two passes',       desc:'Gave away possession after just two passes, went long.',                                        type:'work', measures:['Building out'],      players:['NO','AL'],       half:'First half' },
  { id:16, game:'saltmarsh', gameResult:'L', gameLabel:'Saltmarsh 1–2', gameDate:'Sat 23 May', min:41, duration:'0:13', title:'Quick press wins it back',         desc:'Winning it back · min 41. Press wins the ball inside their half.',                              type:'good', measures:['Winning it back'],  players:['MT','LM'],       half:'First half' },
  { id:17, game:'saltmarsh', gameResult:'L', gameLabel:'Saltmarsh 1–2', gameDate:'Sat 23 May', min:58, duration:'0:11', title:'Shot blocked, didn\'t follow up',  desc:'Goals and chances · min 58. Good chance, no one on the follow-up.',                             type:'work', measures:['Goals and chances'], players:['TR','JP'],       half:'Second half' },
  // Tealside Town 2–0 · Sat 9 May (5 clips · 5 good)
  { id:18, game:'bayside',   gameResult:'W', gameLabel:'Tealside Town 2–0',   gameDate:'Sat 9 May',  min:14, duration:'0:11', title:'Goal from a high turnover',        desc:'High press wins it back, shot on goal from the edge of their box.',                             type:'good', measures:['Pressing high'],     players:['AL','JP'],       half:'First half',   taggedBy:'you' },
  { id:19, game:'bayside',   gameResult:'W', gameLabel:'Tealside Town 2–0',   gameDate:'Sat 9 May',  min:22, duration:'0:09', title:'Win it, quick pass, goal',         desc:'Winning it back · min 22. Win the ball, play through, goal.',                                   type:'good', measures:['Winning it back'],  players:['EB','MT'],       half:'First half' },
  { id:20, game:'bayside',   gameResult:'W', gameLabel:'Tealside Town 2–0',   gameDate:'Sat 9 May',  min:34, duration:'0:12', title:'Win high and go',                  desc:'Won the ball in their half and went straight at goal. Winning it back · min 34.',               type:'good', measures:['Winning it back'],  players:['JP','LM'],       half:'First half' },
  { id:21, game:'bayside',   gameResult:'W', gameLabel:'Tealside Town 2–0',   gameDate:'Sat 9 May',  min:44, duration:'0:14', title:'Lines stayed tight all first half', desc:'Our lines compact, no gaps. Gap between lines · min 44.',                                       type:'good', measures:['Gap between lines'], players:['ZH','MT'],       half:'Second half' },
  { id:22, game:'bayside',   gameResult:'W', gameLabel:'Tealside Town 2–0',   gameDate:'Sat 9 May',  min:51, duration:'0:13', title:'Low cross, Mia on the finish',      desc:'Goals and chances · min 51. Great movement, great finish.',                                     type:'good', measures:['Goals and chances'], players:['MT','GO'],       half:'Second half' },
]

// ── Our style screen ──────────────────────────────────────────────────────────

export interface StyleQuestion {
  context: string; question: string; options: string[]; selected: number
}

export const STYLE_QUESTIONS: StyleQuestion[] = [
  { context: 'WHEN WE HAVE THE BALL',   question: 'How do we keep and move it?', options: ['Keep the ball', 'Build from the back', 'Get forward fast'],           selected: 1 },
  { context: 'WHEN THEY HAVE THE BALL', question: 'Where do we win it back?',    options: ['Press high', 'Hold a compact middle', 'Protect our goal'],            selected: 0 },
  { context: 'THE MOMENT WE WIN IT',    question: 'What do we do first?',        options: ['Counter-attack', 'Keep it first'],                                    selected: 0 },
  { context: 'THE MOMENT WE LOSE IT',   question: 'What do we do first?',        options: ['Win it straight back', 'Drop back into shape'],                       selected: 0 },
]

export const STYLE_CLUB_VALUES = [
  { label: 'Equal minutes',        checked: true  },
  { label: 'Everyone on the ball', checked: false },
  { label: 'Use both feet',        checked: true  },
  { label: 'Try new positions',    checked: false },
]

export const STYLE_MEASURES = [
  { label: 'Goal kicks played short',                   source: 'Match camera',  value: '70%+' },
  { label: 'Passes completed in our third',             source: 'Match camera',  value: '80%+' },
  { label: 'Wins of the ball in their half',            source: 'Match camera',  value: '12 a game' },
  { label: 'Their passes before we challenge',          source: 'Match camera',  value: 'under 10' },
  { label: 'Shots within 10 s of winning it',          source: 'Match camera',  value: '3 a game' },
  { label: 'Sprints forward after winning it',         source: 'GPS vests',     value: '20 a game' },
  { label: 'Seconds to win it back',                   source: 'Match camera',  value: 'under 4 s' },
  { label: 'Won back within 6 seconds',                source: 'Match camera',  value: '40%+' },
  { label: 'Minutes shared evenly',                    source: 'Match records', value: 'all within 20%' },
  { label: 'Weaker-foot touches',                      source: 'Boot sensors',  value: '20%+' },
]
