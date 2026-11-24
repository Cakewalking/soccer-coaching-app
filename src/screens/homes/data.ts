import type { Act, Block, DotState, Frame, Home, Meter, NavItem } from './types'

// The thirteen tablet homes (STO1 to STO13), word for word from the boards in the Homes v1 pack
// (homes/boards/STO*.dc.html). Juniors, youth and MiniRoos play on Sunday; seniors on Saturday.

const to = (id: string): Act => ({ to: id })
const say = (line: string): Act => ({ say: line })
/** "EB+ IS= FW-": squad order, never sorted. + moved toward their goal, = about the same, - nothing lately. */
const dots = (s: string): [string, DotState][] => s.split(' ').map(d => [d.slice(0, -1), d.endsWith('+') ? 'up' : d.endsWith('=') ? 'same' : 'none'])

// ── Frames ───────────────────────────────────────────────────────────────────
const coachFrame = (overview: string, team: string, avatar: string, role: string, who?: string): Frame => ({
  team, avatar, role, who,
  nav: [
    { label: 'Home', to: 'T1-TabletTraining', on: true, icon: 'home' }, { label: 'Squad', to: 'T4-SquadTab', icon: 'people' },
    { label: 'Training', to: 'T3-TrainingTab', icon: 'calendar' }, { label: 'Match day', to: 'T2-TabletMatch', icon: 'ball' },
    { label: 'Clips', to: 'C1-ClipsTab', icon: 'play' }, { label: 'Record', to: 'REC1-RecordHub', icon: 'record' },
  ],
  sub: [
    { label: 'Overview', to: overview, on: true }, { label: 'Messages', to: 'I1-Inbox' }, { label: 'Calendar', to: 'CF1-Fixtures' },
    { label: 'Fixtures and results', to: 'CF1-Fixtures' }, { label: 'Our style', to: 'S1-PlayingStyle' },
    { label: 'Where we’re at', to: 'WA1-WhereWeAt' }, { label: 'Team staff', to: 'ST1-TeamStaff' },
  ],
})
const MINI_FRAME: Frame = {
  team: 'U9 Tom', avatar: 'TA', role: 'Coach · MiniRoos',
  nav: [
    { label: 'Home', to: 'MS5-HomeMiniRoosSame', on: true, icon: 'home' }, { label: 'Squad', to: 'HM2-SquadMiniRoos', icon: 'people' },
    { label: 'Training', to: 'HM3-TrainingMiniRoos', icon: 'calendar' }, { label: 'Game day', to: 'HM4-GameDayMiniRoos', icon: 'ball' },
    { label: 'Clips', to: 'RCm2-MiniRoosClips', icon: 'play' }, { label: 'Record', to: 'RCm1-RecordMiniRoos', icon: 'record' },
  ],
  sub: [
    { label: 'Overview', to: 'MS5-HomeMiniRoosSame', on: true }, { label: 'Messages', to: 'HM7-InboxMiniRoos' }, { label: 'Calendar', to: 'HM8-CalendarMiniRoos' },
    { label: 'Fixtures', to: 'HM9-FixturesMiniRoos' }, { label: 'Our style', to: 'MS1-MiniRoosStyle' },
    { label: 'Where we’re at', to: 'MS2-MiniRoosWhereWeAt' }, { label: 'Team staff', to: 'HM10-StaffMiniRoos' },
  ],
}
const CLUB_NAV: NavItem[] = [
  { label: 'Club', to: 'D1-ClubOverview', on: true, icon: 'home' }, { label: 'Teams', to: 'D2-Teams', icon: 'ball' },
  { label: 'Coaches', to: 'D3-Coaches', icon: 'cap' }, { label: 'Players', to: 'D4-Players', icon: 'people' },
  { label: 'Safeguarding', to: 'D5-Safeguarding', icon: 'shield' }, { label: 'Reports', to: 'D6-BoardReport', icon: 'doc' },
]
const CLUB_SUB: NavItem[] = [
  { label: 'Overview', to: 'D1-ClubOverview', on: true }, { label: 'Messages', to: 'MSG4-DirectorMessages' }, { label: 'Calendar', to: 'DC1-Calendar' },
  { label: 'Season plan', to: 'FY1-SeasonPlan' }, { label: 'Playing style', to: 'S1-PlayingStyle' }, { label: 'Files', to: 'FIL5-ClubFiles' },
  { label: 'Features and billing', to: 'PRM1-FeaturesByTeam' },
]

// ── MiniRoos (STO1 the day after a game, STO2 training day, STO3 no camera) ──
const MINI_DOTS = dots('AK+ PD+ IV- MX- OH+ EB+ JP+ SH- LH+ NO+')
const miniDots = (rows: Extract<Block, { kind: 'dots' }>['rows'], foot: string): Block => ({
  kind: 'dots', title: 'Development · a moment for every child', link: { label: 'All moments', act: say('Every moment this term, by child, A to Z.') },
  dots: MINI_DOTS, dotTo: 'GP7-MiniGoal', dotOpens: 'Opens each child’s small goal.',
  says: { up: 'a moment this term', same: 'about the same', none: 'no moment yet' },
  legend: [['up', '7 have had a moment this term'], ['none', '3 still to have one']],
  rows, foot,
})
const MINI_METERS: Meter[] = [
  { label: 'Played in both halves on Sunday', n: 10, of: 10, note: 'Everyone, for the fourth week running', to: 'MS3-MiniRoosReview' },
  { label: 'A turn in goal this term', n: 8, of: 10, note: 'Ivy and Sami are next', to: 'HM3-TrainingMiniRoos' },
  { label: 'A moment sent home this term', n: 7, of: 10, note: 'Ivy, Max and Sami have had none', to: 'RCm2-MiniRoosClips' },
  { label: 'Been captain', n: 6, of: 10, note: 'Four to go before the end of term', to: 'MS3-MiniRoosReview' },
]
const miniFair = (mark: 'strong' | 'tapped', sub: string): Block => ({
  kind: 'meters', name: 'Oversight', title: 'Is it fair for every child?', mark, sub, meters: MINI_METERS,
  foot: 'Rosa sees these same four numbers for every MiniRoos team. No scores. No child is ranked.',
})
const MINI_FIGS: Home['progress']['figs'] = [
  { kind: 'bar', label: 'Took a player on', now: 7, then: 3, of: 10 },
  { kind: 'bar', label: 'Had a shot', now: 6, then: 4, of: 10 },
  { kind: 'bar', label: 'Passed to a friend in space', now: 4, then: 2, of: 10 },
  { kind: 'bar', label: 'Had a turn in goal', now: 8, then: 5, of: 10 },
]
const MINI_AFTER_NOW: Home['now'] = {
  day: 'Mon 1 June',
  chips: [
    { title: 'Thu 5:00 Training', sub: '4 games · ready', to: 'HM3-TrainingMiniRoos' },
    { title: 'Sun 8:30 at home', sub: '8 coming · 2 to answer', to: 'HM3-TrainingMiniRoos' },
  ],
  other: { label: 'Swap a game', act: to('SGm1-SuggestedMiniRoos') },
  main: { label: 'Open Thursday', act: to('HM3-TrainingMiniRoos') },
}

export const STO1: Home = {
  id: 'STO1-HomeStoryMiniRoos', frame: MINI_FRAME, now: MINI_AFTER_NOW,
  progress: {
    label: 'PROGRESS · U9 TOM · THIS TERM',
    headline: 'On Sunday, seven of your ten took a player on. A month ago, three.',
    sub: 'Children who did each thing at least once in a game. The white line is 3 May, “then”. No score is kept.',
    film: { label: 'Play 40 seconds', say: 'Seven moments, one from each child who took a player on. From Sunday’s film.' },
    btns: [{ label: 'What we saw', act: to('RD3-MiniRoosReview') }],
    figs: MINI_FIGS,
  },
  left: [miniDots([
    { badge: 'AK', tone: 'green', title: 'Arlo had his first go in goal', sub: 'Sunday · 12 seconds of film', action: 'Send to his dad', primary: true, act: say('Sent to Arlo’s dad with your note. He can reply with a thank you.') },
    { badge: 'IV', tone: 'mauve', title: 'Ivy has had no moment this term', sub: 'She is in goal on Sunday', action: 'Watch for one', act: say('Ivy is pinned. One tap during the session saves a moment for her.') },
    { badge: '3', tone: 'mauve', title: 'Ivy, Max and Sami have no small goal', sub: 'One line each, in words a child would use', action: 'Set one', act: to('GP7-MiniGoal') },
  ], 'A moment is a clip, a photo or your own note. Families see only their own child.')],
  right: [
    miniFair('strong', 'U9 Tom · counted from your turns sheet and what you sent'),
    { kind: 'needs', count: '2', title: 'Two things need you', sub: 'A game leader for Sunday · one message', to: 'HM7-InboxMiniRoos' },
  ],
}

export const STO2: Home = {
  id: 'STO2-HomeStoryMiniRoosTraining', frame: MINI_FRAME,
  now: {
    day: 'Today · Thu 4 June',
    chips: [
      { title: '5:00 Training', sub: '4 games · 8 coming', to: 'HM3-TrainingMiniRoos' },
      { title: 'Tonight is about', sub: 'Finding a friend in space', to: 'SGm1-SuggestedMiniRoos' },
    ],
    other: { label: 'Swap a game', act: to('SGm1-SuggestedMiniRoos') },
    main: { label: 'Start tonight', act: to('HM3-TrainingMiniRoos') },
  },
  progress: {
    label: 'PROGRESS · U9 TOM · THIS TERM',
    headline: 'On Sunday, seven of your ten took a player on. A month ago, three.',
    sub: 'Tonight is built from the one that hasn’t moved much: passing to a friend in space.',
    film: { label: 'Play 25 seconds', say: 'Why tonight: 25 seconds of Sunday’s bunching, to watch before you go.' },
    btns: [{ label: 'What we saw', act: to('RD3-MiniRoosReview') }],
    figs: MINI_FIGS,
  },
  left: [miniDots([
    { badge: 'IV', tone: 'mauve', title: 'Ivy has had no moment this term', sub: 'She loves Treasure island. Watch for one tonight', action: 'Watch for one', primary: true, act: say('Ivy is pinned for tonight.') },
    { badge: 'MX', tone: 'mauve', title: 'Max has had no moment this term', sub: 'One tap during the session saves it', action: 'Watch for one', act: say('Max is pinned for tonight.') },
    { badge: 'PD', tone: 'green', title: 'Poppy took a player on', sub: 'Sunday · her small goal for this term', action: 'Send to her mum', act: say('Sent to Poppy’s mum with your note.') },
  ], 'Three sent on Monday. All three families replied.')],
  right: [
    miniFair('strong', 'U9 Tom · counted from your turns sheet and what you sent'),
    { kind: 'needs', count: '1', title: 'One thing needs you', sub: 'A message from Omar’s dad', to: 'HM7-InboxMiniRoos' },
  ],
}

export const STO3: Home = {
  id: 'STO3-HomeStoryMiniRoosNoFilm', frame: MINI_FRAME, now: MINI_AFTER_NOW,
  progress: {
    label: 'PROGRESS · U9 TOM · FROM YOUR THREE TAPS',
    headline: 'You worked on being brave with the ball. On Sunday you saw lots of them take a player on.',
    sub: 'That is three Sundays running you have tapped it. Film one game on any phone and these become counts of children.',
    // no camera, so no film behind the claim: no amber button
    btns: [{ label: 'What you tapped', act: to('MS3-MiniRoosReview') }, { label: 'Film one game', act: to('RCm1-RecordMiniRoos') }],
    figs: [
      { kind: 'num', label: 'Brave with the ball', value: 'Lots', then: 'A few on 3 May' },
      { kind: 'num', label: 'Different children shooting', value: 'Lots', then: 'Some on 3 May' },
      { kind: 'num', label: 'Finding a friend in space', value: 'A few', then: 'A few on 3 May' },
    ],
  },
  left: [miniDots([
    { badge: 'AK', tone: 'green', title: 'Arlo had his first go in goal', sub: 'Your note on Sunday', action: 'Send to his dad', primary: true, act: say('Sent to Arlo’s dad with your note.') },
    { badge: 'PD', tone: 'green', title: 'Poppy took a player on', sub: 'Your note · a photo from Rob', action: 'Send to her mum', act: say('Sent to Poppy’s mum with the photo and your note.') },
    { badge: 'IV', tone: 'mauve', title: 'Ivy has had no moment this term', sub: 'She is in goal on Sunday', action: 'Watch for one', act: say('Ivy is pinned for Sunday.') },
  ], 'From your notes and two parents’ photos, checked against consent.')],
  right: [
    miniFair('tapped', 'U9 Tom · from your turns sheet and your own notes'),
    { kind: 'needs', count: '2', title: 'Two things need you', sub: 'A game leader for Sunday · one message', to: 'HM7-InboxMiniRoos' },
  ],
}

// ── Coaches of one squad (STO4 seniors, STO5 juniors, STO6 youth, STO7 assistant) ──
const COACH_SAYS: Record<DotState, string> = { up: 'up on their goal', same: 'about the same', none: 'no clip this month' }
const squadDots = (d: string, legend: [DotState, string][], rows: Extract<Block, { kind: 'dots' }>['rows'], foot: string): Block => ({
  kind: 'dots', title: 'Development · every player, this season', link: { label: 'Squad', act: to('T4-SquadTab') },
  dots: dots(d), dotTo: 'T4-SquadTab', dotOpens: 'Opens the squad.', says: COACH_SAYS, legend, rows, foot,
})
const U12_DOTS = 'EB+ MT+ JP+ NO+ ZH+ AW+ GR+ KP+ TD+ HB+ IS= OC= FW- LN- SD- RC-'
const U12_LEGEND: [DotState, string][] = [['up', '10 closer to their goal'], ['same', '2 about the same'], ['none', '4 with no clip this month']]

export const STO4: Home = {
  id: 'STO4-HomeStorySeniors', frame: coachFrame('PH3-HomeSeniorsSame', 'Men’s 1sts', 'MP', 'Head coach'),
  now: {
    day: 'Today · Thu 4 June',
    chips: [
      { title: '7:30 Training', sub: '75 minutes · plan ready', to: 'T3-TrainingTab' },
      { title: 'Sat 3:00 away', sub: 'Banksia Park · scouted', to: 'T2-TabletMatch' },
    ],
    other: { label: 'Saturday’s review', act: to('RD1-GameReview') },
    main: { label: 'Open tonight’s plan', act: to('T3-TrainingTab') },
  },
  progress: {
    label: 'PROGRESS · MEN’S 1STS · THIS SEASON',
    headline: 'You worked on a compact middle. Glenview had 9 shots on Saturday. In round 4, teams were getting 16.',
    sub: 'Seven of the nine were from outside the area. Corners to the back post are still the gap: that is tonight.',
    film: { label: 'Play 90 seconds', say: 'Six clips: the middle closing four times, and both goals.' },
    btns: [{ label: 'Season so far', act: to('RD2-SeasonSoFar') }],
    figs: [
      { kind: 'num', label: 'Shots against', value: '9', unit: 'a game', then: '16 in round 4' },
      { kind: 'num', label: 'From outside the area', value: '78%', then: '50% in round 4' },
      { kind: 'num', label: 'Winning the ball back', value: '8', unit: 'seconds', then: '10 in round 4' },
      { kind: 'num', label: 'Goals against from corners', value: '2', unit: 'in 5 games', then: '2 in the 5 before' },
    ],
  },
  left: [squadDots(
    'CD+ DC+ JB+ LH+ NO- RP+ TV- AM+ BW- EK+ FS+ GT= HM+ IP+ KR+ MA= OD+ PL+ SQ- UW+ YB+',
    [['up', '15 with a clip and a note this month'], ['same', '2 about the same'], ['none', '4 with no clip this month']],
    [
      { badge: 'LH', tone: 'green', title: 'Liam made 4 chances on Saturday', sub: '3 clips, 34 seconds', action: 'Send to Liam', primary: true, act: say('Sent to Liam with your note. Only he sees it.') },
      { badge: 'CD', tone: 'green', title: 'Cal won it back 9 times', sub: '4 clips, 41 seconds', action: 'Send to Cal', act: say('Sent to Cal with your note.') },
      { badge: '4', tone: 'mauve', title: 'Nico, Theo, Ben and Sol have no clip this month', sub: 'Worth a word tonight', action: 'Watch for one', act: say('All four are pinned for Saturday.') },
    ],
    'Each player is compared with their own last month. Nobody is ranked.',
  )],
  right: [
    {
      kind: 'meters', name: 'Oversight', title: 'Has anything slipped?', mark: 'strong', sub: 'Men’s 1sts · counted from what you’ve done in Clean Sheet',
      meters: [
        { label: 'Answered for Saturday', n: 18, of: 21, note: '3 still to answer', to: 'AV1-Availability' },
        { label: 'A clip this month', n: 17, of: 21, note: 'Four to go', to: 'C1-ClipsTab' },
        { label: 'Their own goal set', n: 16, of: 21, note: 'Optional for adults. 5 have not', to: 'T4-SquadTab' },
        { label: 'Load in a safe range', n: 19, of: 21, note: 'Sprints capped for Theo and Dev', to: 'WL1-Wellness' },
      ],
      foot: 'Rosa sees these same four numbers for every team.',
    },
    { kind: 'needs', count: '2', title: 'Two things need you', sub: 'Ryan’s suspension · 2 clearances pending', to: 'I1-Inbox' },
  ],
}

export const STO5: Home = {
  id: 'STO5-HomeStoryJuniors', frame: coachFrame('PH1-HomeJuniorsSame', 'U12 Sam', 'SK', 'Head coach'),
  now: {
    day: 'Today · Thu 4 June',
    chips: [
      { title: '5:45 Training', sub: '90 minutes · plan ready', to: 'T3-TrainingTab' },
      { title: 'Sun 9:30 away', sub: 'Harbour Rovers · 14 coming', to: 'T2-TabletMatch' },
    ],
    other: { label: 'Sunday’s review', act: to('RD1-GameReview') },
    main: { label: 'Open tonight’s plan', act: to('T3-TrainingTab') },
  },
  progress: {
    label: 'PROGRESS · U12 SAM · THIS SEASON',
    headline: 'You worked on winning it back fast. On Sunday it took 7 seconds. In round 3, eleven.',
    sub: 'Your four style measures, now against round 3. The gap between the lines has not closed, so tonight has two drills on it.',
    film: { label: 'Play 60 seconds', say: 'Five clips from Sunday: four wins of the ball and the goal that came from one.' },
    btns: [{ label: 'Season so far', act: to('RD2-SeasonSoFar') }],
    figs: [
      { kind: 'num', label: 'Winning the ball back', value: '7', unit: 'seconds', then: '11 in round 3' },
      { kind: 'num', label: 'Pressing wins in their half', value: '13', unit: 'a game', then: '8 in round 3' },
      { kind: 'num', label: 'Goal kicks played short', value: '72%', then: '55% in round 3' },
      // the one that has not improved is shown too
      { kind: 'num', label: 'Gap between the lines', value: '26', unit: 'metres', then: '24 in round 3' },
    ],
  },
  left: [squadDots(U12_DOTS, U12_LEGEND, [
    { badge: 'MT', tone: 'green', title: 'Mia won it back four times on Sunday', sub: 'Her goal this term. There’s a 12-second clip', action: 'Send to her family', primary: true, act: say('Sent to Mia and her mum with your note.') },
    { badge: 'FW', tone: 'mauve', title: 'Finn has had no clip this month', sub: 'He starts on Sunday. One tap saves a moment', action: 'Watch for one', act: say('Finn is pinned for Sunday.') },
    { badge: 'RC', tone: 'mauve', title: 'Ruby has no goal yet', sub: 'She joined in round 6', action: 'Set one', act: to('T4-SquadTab') },
  ], 'Each player is compared with their own last month. Nobody is ranked.')],
  right: [
    {
      kind: 'meters', name: 'Oversight', title: 'Has anything slipped?', mark: 'strong', sub: 'U12 Sam · counted from what you’ve done in Clean Sheet',
      meters: [
        { label: 'Over half of every game', n: 14, of: 16, note: 'Finn and Isla were under on Sunday', to: 'WA1-WhereWeAt' },
        { label: 'A clip this month', n: 12, of: 16, note: 'Finn, Lily, Sam and Ruby are next', to: 'C1-ClipsTab' },
        { label: 'A goal set', n: 15, of: 16, note: 'Only Ruby to go', to: 'T4-SquadTab' },
        { label: 'Check-ins answered this week', n: 14, of: 16, note: 'Ella has felt low two days running', to: 'WL1-Wellness' },
      ],
      foot: 'Rosa sees these same four numbers for every team.',
    },
    { kind: 'needs', count: '3', title: 'Three things need you', sub: 'Ella low two days running · 3 vests didn’t sync', to: 'I1-Inbox' },
  ],
}

export const STO6: Home = {
  id: 'STO6-HomeStoryYouth', frame: coachFrame('PH2-HomeYouthSame', 'U16 Ollie', 'OG', 'Head coach'),
  now: {
    day: 'Today · Thu 4 June',
    chips: [
      { title: '6:30 Training', sub: '75 minutes · shorter, load is high', to: 'T3-TrainingTab' },
      { title: 'Sun 11:00 at home', sub: 'Tealside Town · 15 fit', to: 'T2-TabletMatch' },
    ],
    other: { label: 'Sunday’s review', act: to('RD1-GameReview') },
    main: { label: 'Open tonight’s plan', act: to('T3-TrainingTab') },
  },
  progress: {
    label: 'PROGRESS · U16 OLLIE · THIS SEASON',
    headline: 'You worked on building out under pressure. On Sunday you reached halfway 68% of the time. In round 3, 58%.',
    sub: 'The cost is counter-attacks against: six a game, up from four. Tonight covers the two players behind the ball.',
    film: { label: 'Play 90 seconds', say: 'Six clips: four clean build-outs and the two counters that cost goals.' },
    btns: [{ label: 'Season so far', act: to('RD2-SeasonSoFar') }],
    figs: [
      { kind: 'num', label: 'Build-outs reaching halfway', value: '68%', then: '58% in round 3' },
      { kind: 'num', label: 'Passes forward', value: '41%', then: '33% in round 3' },
      { kind: 'num', label: 'Counters against', value: '6', unit: 'a game', then: '4 in round 3' },
      { kind: 'num', label: 'Sprints in the last 15', value: '−18%', then: '−30% in round 3' },
    ],
  },
  left: [squadDots(
    'AK+ BT+ CR+ DL= HS+ LM+ TW+ JO- MV- EP+ NF+ RS= WB+ ZT- GC+ IK-',
    [['up', '10 closer to their goal'], ['same', '2 about the same'], ['none', '4 with no clip this month']],
    [
      { badge: 'CR', tone: 'green', title: 'Cal is 6% faster than last month', sub: 'A real change, bigger than the noise in the vests', action: 'Send to Cal', primary: true, act: say('Sent to Cal with your note. Only he sees it.') },
      { badge: 'HS', tone: 'green', title: 'Hugo made 3 chances on Sunday', sub: '3 clips, 28 seconds', action: 'Send to Hugo', act: say('Sent to Hugo with your note.') },
      { badge: '4', tone: 'mauve', title: 'Jo, Mav, Zane and Isak have no clip this month', sub: 'Two of them were away for exams', action: 'Watch for one', act: say('All four are pinned for Sunday.') },
    ],
    'Players 15 and over see their own numbers and choose who else does.',
  )],
  right: [
    {
      kind: 'meters', name: 'Oversight', title: 'Has anything slipped?', mark: 'strong', sub: 'U16 Ollie · counted from what you’ve done in Clean Sheet',
      meters: [
        { label: 'Over half of every game', n: 15, of: 16, note: 'Only Isak was under on Sunday', to: 'WA1-WhereWeAt' },
        { label: 'A clip this month', n: 12, of: 16, note: 'Four to go', to: 'C1-ClipsTab' },
        { label: 'A goal set', n: 16, of: 16, note: 'Everyone', to: 'T4-SquadTab' },
        { label: 'Load in a safe range', n: 10, of: 16, note: 'Up 30% two weeks running. Priya has capped sprints', to: 'WL1-Wellness' },
      ],
      foot: 'Rosa sees these same four numbers for every team.',
    },
    { kind: 'needs', count: '2', title: 'Two things need you', sub: 'Tane’s playing-up view · one message', to: 'I1-Inbox' },
  ],
}

export const STO7: Home = {
  id: 'STO7-HomeStoryAssistant', frame: coachFrame('PH4-HomeAssistantSame', 'U12 Sam', 'JM', 'Assistant coach', 'Jess Marsh · assistant coach, U12 Sam'),
  now: {
    day: 'Today · Thu 4 June',
    chips: [
      { title: '5:45 Training', sub: 'Sam leads · 90 minutes', to: 'T3-TrainingTab' },
      { title: '6:00 Your part', sub: 'Warm-up rondo, 5 v 2', to: 'T3-TrainingTab' },
    ],
    other: { label: 'Sunday’s warm-up', act: say('Your warm-up for Sunday, 12 minutes.') },
    main: { label: 'Open my part', act: to('T3-TrainingTab') },
  },
  progress: {
    label: 'PROGRESS · U12 SAM · YOUR PART',
    headline: 'You ran the subs on Sunday. All 16 played over half the game. In round 3, twelve did.',
    sub: 'And the team still won it back in 7 seconds. Sam’s note: “Subs were spot on.”',
    film: { label: 'Play 60 seconds', say: 'Five clips from Sunday. Sam has put them in tonight’s team talk.' },
    btns: [{ label: 'Reply to Sam', act: say('Reply sent to Sam.') }],
    figs: [
      { kind: 'bar', label: 'Over half a game', now: 16, then: 12, of: 16 },
      { kind: 'num', label: 'Winning the ball back', value: '7', unit: 'seconds', then: '11 in round 3' },
      { kind: 'num', label: 'Pressing wins in their half', value: '13', unit: 'a game', then: '8 in round 3' },
    ],
  },
  left: [squadDots(U12_DOTS, U12_LEGEND, [
    { badge: 'MT', tone: 'green', title: 'Mia won it back four times on Sunday', sub: 'Sam sends the clip. You can add a note', action: 'Add a note', primary: true, act: say('Your note is added. Sam sends it.') },
    { badge: 'FW', tone: 'mauve', title: 'Finn has had no clip this month', sub: 'He starts on Sunday. Watch for one', action: 'Watch for one', act: say('Finn is pinned for Sunday.') },
    { badge: 'IS', tone: 'rose', title: 'Isla was under half a game on Sunday', sub: 'She starts this week in your sub plan', action: 'Open sub plan', act: to('T2-TabletMatch') },
  ], 'You and Sam see the same list.')],
  right: [{
    kind: 'jobs', title: 'Your jobs this week', sub: 'What Sam has handed to you',
    jobs: [
      { done: true, title: 'Sub plan for Sunday', note: 'Drafted · all 16 over half a game', to: 'T2-TabletMatch' },
      { done: true, title: 'Sunday’s warm-up', note: '12 minutes · cones list sent to Rob', to: 'T3-TrainingTab' },
      { done: true, title: 'Notes after Tuesday', note: 'Two taps each, 16 of 16', to: 'GP1-AfterTraining' },
      { done: false, title: 'Sam asked: can you lead on Tue 9 June?', note: 'Not answered yet', to: 'I1-Inbox' },
    ],
    foot: 'Your children check is current to March 2027.',
  }],
}

// ── Across squads (STO8 fitness, STO9 keepers) ───────────────────────────────
export const STO8: Home = {
  id: 'STO8-HomeStoryFitness',
  frame: {
    team: 'Four teams', avatar: 'PS', role: 'Fitness coach', who: 'Priya Shah · fitness coach, Wattle Creek FC',
    nav: [
      { label: 'Home', to: 'T1-TabletTraining', on: true, icon: 'home' }, { label: 'Squad', to: 'T4-SquadTab', icon: 'people' },
      { label: 'Training', to: 'T3-TrainingTab', icon: 'calendar' }, { label: 'Match day', to: 'T2-TabletMatch', icon: 'ball' },
    ],
    sub: [{ label: 'Overview', to: 'FT1-FitnessHomeU12', on: true }, { label: 'Messages', to: 'I1-Inbox' }, { label: 'Calendar', to: 'CF1-Fixtures' }],
  },
  now: {
    day: 'Today · Thu 4 June',
    chips: [
      { title: '5:45 U12 Sam', sub: 'Your 15 minutes · 2 capped', to: 'F3-FitnessTraining' },
      { title: 'Thu 11 June', sub: 'Measuring session · 12 due', to: 'GT2-MeasureSession' },
    ],
    other: { label: 'Tell Sam', act: say('Sam has your part of tonight’s plan.') },
    main: { label: 'Open my part', act: to('F3-FitnessTraining') },
  },
  progress: {
    label: 'PROGRESS · FOUR TEAMS · LAST FOUR WEEKS',
    headline: 'Fifty-seven of your 63 players are training in a safe range. Four weeks ago, fifty.',
    sub: 'You capped sprints for the U16s two weeks ago. Sore legs there are down from six players to two.',
    // vests and check-ins, not film: no amber button
    btns: [{ label: 'See the load', act: to('FT4-FitnessHomeU16') }, { label: 'By player', act: to('T4-SquadTab') }],
    figs: [
      { kind: 'bar', label: 'U12 Sam', now: 16, then: 15, of: 16 },
      { kind: 'bar', label: 'U13 Girls Meg', now: 14, then: 13, of: 15 },
      { kind: 'bar', label: 'U14 Josh', now: 13, then: 12, of: 16 },
      { kind: 'bar', label: 'U16 Ollie', now: 14, then: 10, of: 16 },
    ],
  },
  left: [
    { kind: 'tiles', tiles: [
      { n: '9', label: 'Real changes this month', note: 'Bigger than the noise in the vests', act: to('FT1-FitnessHomeU12') },
      { n: '3', label: 'Growing fast', note: 'Sprints capped. Coach and parent know', act: to('GT1-Growth') },
      { n: '12', label: 'Due a measure', note: 'Thursday 11 June', act: to('GT2-MeasureSession') },
      { n: '2', label: 'Sore two days running', note: 'Noah and one U16', act: to('WL1-Wellness') },
    ] },
    {
      kind: 'table', title: 'Oversight · team by team', link: { label: 'Growth', act: to('GT1-Growth') },
      cols: ['Team', 'Check-ins answered', 'Vests synced Sunday', 'Measured this term'], grid: '1.2fr 1fr 1fr 1fr',
      rows: [
        { team: 'U12 Sam', note: '16 players', cells: [[14, 16], [13, 16], [16, 16]], to: 'FT1-FitnessHomeU12' },
        { team: 'U13 Girls Meg', note: '15 players', cells: [[13, 15], [15, 15], [12, 15]], to: 'FT3-FitnessHomeU13G' },
        { team: 'U14 Josh', note: '16 players', cells: [[10, 16], [14, 16], [11, 16]], to: 'FT2-FitnessHomeU14' },
        { team: 'U16 Ollie', note: '16 players', cells: [[13, 16], [15, 16], [12, 16]], to: 'FT4-FitnessHomeU16' },
      ],
    },
  ],
  right: [
    {
      kind: 'meters', name: 'Oversight', title: 'Has anything slipped?', mark: 'strong', sub: 'All four teams · counted from vests and check-ins', grow: false,
      meters: [
        { label: 'Check-ins answered this week', n: 50, of: 63, note: 'U14 Josh is the low one', to: 'WL1-Wellness' },
        { label: 'Vests synced on Sunday', n: 57, of: 63, note: '3 of U12 Sam’s didn’t sync', to: 'FT1-FitnessHomeU12' },
        { label: 'Measured this term', n: 51, of: 63, note: '12 due on Thursday 11 June', to: 'GT2-MeasureSession' },
        { label: 'Coaches told about caps', n: 4, of: 4, note: 'Applied to four plans', to: 'I1-Inbox' },
      ],
      foot: 'Nobody is ranked. Small moves are shown as “about the same”.',
    },
    { kind: 'needs', count: '2', title: 'Two things need you', sub: 'Noah’s sore knee · measuring due', to: 'I1-Inbox' },
  ],
}

export const STO9: Home = {
  id: 'STO9-HomeStoryKeepers',
  frame: {
    team: 'All keepers', avatar: 'NW', role: 'Goalkeeper coach', who: 'Nick Ward · goalkeeper coach, Wattle Creek FC',
    nav: [
      { label: 'Home', to: 'HG1-HomeKeeperCoach', on: true, icon: 'home' }, { label: 'Keepers', to: 'FK1-Goalkeepers', icon: 'people' },
      { label: 'Training', to: 'HG2-KeeperSession', icon: 'calendar' }, { label: 'Clips', to: 'C1-ClipsTab', icon: 'play' },
    ],
    sub: [{ label: 'Overview', to: 'HG1-HomeKeeperCoach', on: true }, { label: 'Messages', to: 'I1-Inbox' }, { label: 'Calendar', to: 'CF1-Fixtures' }],
  },
  now: {
    day: 'Today · Thu 4 June',
    chips: [
      { title: 'Tue 6:00 Keepers', sub: '40 minutes · 3 drills · ready', to: 'HG2-KeeperSession' },
      { title: '9 coming', sub: '2 still to answer', to: 'HG2-KeeperSession' },
    ],
    other: { label: 'Send the plan', act: say('Session plan sent to all 11 keepers and their coaches.') },
    main: { label: 'Open Tuesday', act: to('HG2-KeeperSession') },
  },
  progress: {
    label: 'PROGRESS · ELEVEN KEEPERS · THIS SEASON',
    headline: 'You worked on starting higher. Last weekend your keepers swept up 21 balls behind the defence. A month ago, nine.',
    sub: 'Grace swept up five on her own. Tuesday is quick restarts: three keepers held the ball over six seconds.',
    film: { label: 'Play 60 seconds', say: 'Six sweeps from five keepers, and one that started a goal.' },
    btns: [{ label: 'By keeper', act: to('FK1-Goalkeepers') }],
    figs: [
      { kind: 'num', label: 'Balls swept up', value: '21', unit: 'a weekend', then: '9 on 3 May' },
      { kind: 'bar', label: 'Restart inside 6 seconds', now: 8, then: 5, of: 11 },
      { kind: 'num', label: 'Goal kicks played short', value: '64%', then: '51% on 3 May' },
    ],
  },
  left: [{
    kind: 'dots', title: 'Development · every keeper, this season', link: { label: 'Keepers', act: to('FK1-Goalkeepers') },
    dots: dots('GO+ AL+ TR+ BT+ KR+ IM+ OB= SD- FW- NV+ EC='), dotTo: 'FK1-Goalkeepers', dotOpens: 'Opens the keepers.',
    says: { up: 'up on their goal', same: 'about the same', none: 'no clip this fortnight' },
    legend: [['up', '7 closer to their goal'], ['same', '2 about the same'], ['none', '2 with no clip this fortnight']],
    rows: [
      { badge: 'GO', tone: 'green', title: 'Grace’s quick roll started a goal', sub: 'Sunday · 9 seconds of film', action: 'Send to Grace', primary: true, act: say('Sent to Grace and her coach with your note.') },
      { badge: 'SD', tone: 'mauve', title: 'Sami has had no clip this fortnight', sub: 'Her team didn’t record. Watch for one on Tuesday', action: 'Watch for one', act: say('Sami is pinned for Tuesday.') },
      { badge: 'EC', tone: 'mauve', title: 'Evie has no goal yet', sub: 'She moved into goal in round 6', action: 'Set one', act: to('FK1-Goalkeepers') },
    ],
    foot: 'Each keeper is compared with their own last month. Nobody is ranked.',
  }],
  right: [
    {
      kind: 'meters', name: 'Oversight', title: 'Has anything slipped?', mark: 'strong', sub: 'All keepers · counted from what you’ve done in Clean Sheet',
      meters: [
        { label: 'A clip this fortnight', n: 9, of: 11, note: 'Sami and Finn to go', to: 'C1-ClipsTab' },
        { label: 'A goal set', n: 10, of: 11, note: 'Only Evie to go', to: 'FK1-Goalkeepers' },
        { label: 'Coming on Tuesday', n: 9, of: 11, note: '2 still to answer', to: 'HG2-KeeperSession' },
        { label: 'Team coaches sent your notes', n: 5, of: 7, note: 'U9 Mark and U13 Chris have had none', to: 'I1-Inbox' },
      ],
      foot: 'Rosa sees these same four numbers.',
    },
    { kind: 'needs', count: '1', title: 'One thing needs you', sub: 'U13 Chris asked for help with his keeper', to: 'I1-Inbox' },
  ],
}

// ── The club (STO10 director, STO11 chair, STO12 coordinator, STO13 welfare officer) ──
export const STO10: Home = {
  id: 'STO10-HomeStoryDirector',
  frame: { team: 'Whole club', avatar: 'RM', role: 'Director of football', nav: CLUB_NAV, sub: CLUB_SUB },
  now: {
    day: 'Hi Rosa · Thu 4 June · Round 8',
    chips: [
      { title: 'This weekend', sub: '14 games · 3 grounds', to: 'RD4-ClubWeekend' },
      { title: 'Tue 9 June 7:00', sub: 'Coach meeting · agenda ready', to: 'DM1-CoachMeeting' },
    ],
    other: { label: 'Last weekend', act: to('RD4-ClubWeekend') },
    main: { label: 'Open the agenda', act: to('DM1-CoachMeeting') },
  },
  progress: {
    label: 'PROGRESS · WATTLE CREEK FC · THIS SEASON',
    headline: 'You asked every team to play the club way. In round 2, half of their games looked like it. This round, two in three.',
    sub: 'Share of recorded games that matched the club’s playing style. 11 of 14 teams recorded one this fortnight.',
    film: { label: 'The round in 2 minutes', say: 'One clip from each team that recorded a game. Ready for Tuesday’s coach meeting.' },
    btns: [{ label: 'By team', act: to('D2-Teams') }],
    figs: [
      { kind: 'num', label: 'MiniRoos · 5 teams', value: '71%', then: '60% in round 2' },
      { kind: 'num', label: 'Juniors · 5 teams', value: '68%', then: '52% in round 2' },
      { kind: 'num', label: 'Youth · 2 teams', value: '64%', then: '49% in round 2' },
      { kind: 'num', label: 'Seniors · 2 teams', value: '62%', then: '44% in round 2' },
    ],
  },
  left: [
    { kind: 'tiles', tiles: [
      { n: '3', label: 'Ready to play up', note: 'Mia, Leo and Tane', act: to('PU1-PlayingUp') },
      { n: '14', label: 'Players with no goal', note: '9 of them in two teams', act: to('D4-Players') },
      { n: '3', label: 'Coaches due a learning step', note: 'It’s on Tuesday’s agenda', act: to('DT1-Courses') },
      { n: '2', label: 'Coaches worth a visit', note: 'U9 Mark and U13 Chris', act: to('D3-Coaches') },
    ] },
    {
      // the two teams that need a hand and the biggest mover: nobody is ranked
      kind: 'table', title: 'Oversight · is every team doing the basics?', link: { label: 'All 14 teams', act: to('D2-Teams') },
      cols: ['Team', 'Fair game time', 'A clip this month', 'Goals set', 'Recorded'], grid: '1.3fr 1fr 1fr 1fr 0.8fr',
      rows: [
        { team: 'U9 Mark', note: 'No coach on Sunday', cells: [[6, 10], [3, 10], [4, 10], 'No'], to: 'D2-Teams' },
        { team: 'U13 Chris', note: 'New coach this year', cells: [[9, 15], [5, 15], [12, 15], 'No'], to: 'D2-Teams' },
        { team: 'U12 Sam', note: 'Biggest mover', cells: [[14, 16], [12, 16], [15, 16], 'Yes'], to: 'D2-Teams' },
      ],
      foot: 'The other 11 teams are above two-thirds on all three.',
    },
  ],
  right: [
    {
      kind: 'meters', name: 'Are players staying?', title: 'Are players staying?', grow: false,
      meters: [
        { label: 'Back from last year', n: 157, of: 178, note: '88%. The year before, 81%', to: 'DR1-Registrations' },
        { label: 'Players sent a clip this month', n: 131, of: 192, note: 'Players who see their progress tend to stay', to: 'C1-ClipsTab' },
      ],
    },
    {
      kind: 'needsList', title: 'Needs you', count: '5 things',
      items: [
        { label: 'U9 Mark has no coach on Sunday', to: 'D2-Teams' },
        { label: '4 children checks run out this month', to: 'DCK1-ClubChecks' },
        { label: '2 teams are outside fair game time', to: 'DP1-FairGameTime' },
        { label: 'A request for Mia to play up', to: 'PU1-PlayingUp' },
        { label: 'Tuesday’s coach meeting agenda to send', to: 'DM1-CoachMeeting' },
      ],
      foot: 'Only what Clean Sheet couldn’t settle for you.',
    },
  ],
}

export const STO11: Home = {
  id: 'STO11-HomeStoryChair',
  frame: { team: 'Whole club', avatar: 'GL', role: 'Chair', nav: CLUB_NAV, sub: CLUB_SUB },
  now: {
    day: 'Hi Greg · Thu 4 June',
    chips: [
      { title: 'Wed 10 June 7:30', sub: 'Board meeting · report ready', to: 'D6-BoardReport' },
      { title: 'This month’s bill', sub: '$384 · 6 teams', to: 'PRM1-FeaturesByTeam' },
    ],
    other: { label: 'Send to committee', act: say('Report sent to the committee.') },
    main: { label: 'Open the report', act: to('D6-BoardReport') },
  },
  progress: {
    label: 'PROGRESS · WATTLE CREEK FC · THIS SEASON',
    headline: 'Twelve of fourteen teams now keep the club’s fair game time promise. In round 1, seven did.',
    sub: 'And the club is growing: 192 players, up 14 on last year. Counts only. Nothing here names a child.',
    // counts, not film: no amber button
    btns: [{ label: 'The two teams', act: to('DP1-FairGameTime') }, { label: 'Season review', act: to('DB2-SeasonReview') }],
    figs: [
      { kind: 'bar', label: 'Teams keeping fair game time', now: 12, then: 7, of: 14 },
      { kind: 'num', label: 'Players', value: '192', then: '178 last year' },
      { kind: 'num', label: 'Back from last year', value: '88%', then: '81% the year before' },
      { kind: 'num', label: 'Girls and women', value: '58', then: '41 last year' },
    ],
  },
  left: [
    { kind: 'tiles', tiles: [
      { n: '412', label: 'Volunteer hours', note: 'Totalled for the council grant', act: to('FV1-FeesVolunteers') },
      { n: '2', label: 'Grant reports drafted', note: 'From the same numbers', act: to('DB4-Grants') },
      { n: '5 of 6', label: 'Paid teams using it', note: 'Two add-ons on six teams', act: to('PRM1-FeaturesByTeam') },
      { n: '2', label: 'Decisions for the board', note: 'Coach cover · a second camera', act: to('D6-BoardReport') },
    ] },
    {
      kind: 'rows', name: 'What members will ask', title: 'What members will ask', link: { label: 'Board report', act: to('D6-BoardReport') }, tight: true,
      rows: [
        { badge: '192', tone: 'green', title: 'Registrations are up 14 on last year', sub: 'Girls and women up from 41 to 58', action: 'Open', act: to('DR1-Registrations') },
        { badge: '$', tone: 'green', title: 'Fees: 171 of 192 paid', sub: '21 on a payment plan or still to pay', action: 'Open', act: to('FV1-FeesVolunteers') },
        { badge: '31', tone: 'green', title: 'Every coach holds a current children check', sub: 'Four run out this month and have been chased', action: 'Open', act: to('DCK1-ClubChecks') },
      ],
    },
  ],
  right: [
    {
      // the chair gets counts only
      kind: 'meters', name: 'Oversight', title: 'Is the club safe and fair?', mark: 'strong', sub: 'Counts only · names stay with the welfare officer',
      meters: [
        { label: 'Coaches with a current children check', n: 31, of: 31, note: 'Four run out this month', to: 'DCK1-ClubChecks' },
        { label: 'Coaches who’ve done the child safety course', n: 28, of: 31, note: 'Three reminded this week', to: 'DT1-Courses' },
        { label: 'Teams keeping fair game time', n: 12, of: 14, note: 'U9 Mark and U13 Chris', to: 'DP1-FairGameTime' },
        { label: 'Concerns closed in time this year', n: 6, of: 6, note: '2 open, both on track', to: 'D5-Safeguarding' },
      ],
      foot: 'These four go in the board report as they are.',
    },
    { kind: 'needs', count: '1', title: 'One thing needs you', sub: 'Approve the U9 Mark coach cover', to: 'MSG4-DirectorMessages' },
  ],
}

export const STO12: Home = {
  id: 'STO12-HomeStoryCoordinator',
  frame: {
    team: 'Whole club', avatar: 'BR', role: 'Club coordinator', who: 'Bianca Rossi · club coordinator, Wattle Creek FC', nav: CLUB_NAV,
    sub: [
      { label: 'This week', to: 'STO12-HomeStoryCoordinator', on: true }, { label: 'Registrations', to: 'DR1-Registrations' }, { label: 'Fixtures', to: 'CF1-Fixtures' },
      { label: 'Referees', to: 'FR1-Referees' }, { label: 'Kit', to: 'DK1-Kit' }, { label: 'Fees and volunteers', to: 'FV1-FeesVolunteers' },
    ],
  },
  now: {
    day: 'Hi Bianca · Thu 4 June',
    // both days: seniors on Saturday, juniors on Sunday
    chips: [
      { title: 'Sat 6 June', sub: '2 senior games', to: 'CF1-Fixtures' },
      { title: 'Sun 7 June', sub: '12 junior games · first at 8:30', to: 'CF1-Fixtures' },
    ],
    other: { label: 'Remind the five', act: say('Reminder sent to 5 families.') },
    main: { label: 'Open the run sheet', act: say('Run sheet opens: 14 games, by ground and time.') },
  },
  progress: {
    label: 'PROGRESS · THIS WEEKEND · 14 GAMES, 3 GROUNDS',
    headline: 'The weekend is nearly covered. On Monday 31 families hadn’t answered. Today it’s five.',
    sub: 'Now against Monday. The white line is Monday. Each one opens the list behind it.',
    // answers and rosters, not film: no amber button
    btns: [{ label: 'Send to managers', act: say('Run sheet sent to 14 team managers.') }, { label: 'Fixtures', act: to('CF1-Fixtures') }],
    figs: [
      { kind: 'bar', label: 'Games with a game leader', now: 13, then: 9, of: 14 },
      { kind: 'bar', label: 'Pitches booked', now: 14, then: 12, of: 14 },
      { kind: 'bar', label: 'Canteen shifts filled', now: 5, then: 2, of: 6 },
      { kind: 'bar', label: 'Referees appointed', now: 13, then: 10, of: 14 },
    ],
  },
  left: [
    { kind: 'tiles', tiles: [
      { n: '2', label: 'Gaps left to fill', note: 'On Monday there were nine', act: say('Everything for the weekend.') },
      { n: '26', label: 'Volunteers rostered', note: '412 hours this season', act: to('FV1-FeesVolunteers') },
      { n: '4', label: 'Registrations to check', note: 'One is late', act: to('DR1-Registrations') },
      { n: '2', label: 'Bib sets short', note: 'Ordered · due Friday', act: to('DK1-Kit') },
    ] },
    {
      kind: 'rows', name: 'Gaps to fill', title: 'Gaps to fill', link: { label: 'Volunteers', act: to('FV1-FeesVolunteers') },
      rows: [
        { badge: 'U9', tone: 'mauve', title: 'U9 Mark needs a game leader', sub: 'Four parents asked · none yet', action: 'Ask again', primary: true, act: say('Asked again. First to say yes gets it.') },
        { badge: 'C', tone: 'mauve', title: 'Canteen, Sunday 10 to 11', sub: 'One more needed', action: 'Ask', act: say('Asked the 12 families at the ground at that time.') },
        { badge: 'R', tone: 'rose', title: 'U11 Luke has no referee yet', sub: 'Zoe has been asked', action: 'Open', act: to('FR1-Referees') },
      ],
      foot: 'Built from fixtures, the roster and what families answered.',
    },
  ],
  right: [
    {
      kind: 'meters', name: 'Oversight', title: 'Has anything slipped?', mark: 'strong', sub: 'The whole club · counted from what’s been done',
      meters: [
        { label: 'Players answered for', n: 187, of: 192, note: '5 families still to answer', to: 'AV1-Availability' },
        { label: 'Registrations complete', n: 188, of: 192, note: '4 to check', to: 'DR1-Registrations' },
        { label: 'Fees paid', n: 171, of: 192, note: '21 on a plan or still to pay', to: 'FV1-FeesVolunteers' },
        { label: 'Managers sent the run sheet', n: 14, of: 14, note: 'Sent this morning', to: 'CF1-Fixtures' },
      ],
      foot: 'Rosa and Greg see these same four numbers.',
    },
    { kind: 'needs', count: '2', title: 'Two things need you', sub: 'A dispensation · a late registration', to: 'MSG4-DirectorMessages' },
  ],
}

// The welfare officer's home has no names: rows say "A player, U13 Girls Meg".
export const STO13: Home = {
  id: 'STO13-HomeStoryWelfare',
  frame: {
    team: 'Whole club', avatar: 'HP', role: 'Welfare officer', who: 'Helen Park · welfare officer, Wattle Creek FC',
    nav: [{ label: 'Welfare', to: 'DS1-Concerns', on: true, icon: 'shield' }],
    sub: [{ label: 'Overview', to: 'DS1-Concerns', on: true }, { label: 'Concerns', to: 'DS1-Concerns' }, { label: 'Children checks', to: 'D5-Safeguarding' }, { label: 'Messages', to: 'I1-Inbox' }],
  },
  now: {
    day: 'Thu 4 June',
    chips: [
      { title: '4:00 pm · phone', sub: 'A call with a parent · notes ready', to: 'DS1-Concerns' },
      { title: 'Kids Helpline', sub: '1800 55 1800 · on every child’s screen', to: 'D5-Safeguarding' },
    ],
    other: { label: 'Log a concern', act: say('A blank concern, private to you.') },
    main: { label: 'Open my notes', act: to('DS1-Concerns') },
  },
  progress: {
    label: 'PROGRESS · SAFEGUARDING · THIS YEAR',
    headline: 'Every adult who works with children here has a current check. In February, 26 of 31 did.',
    sub: 'And a concern now takes eight days to close, down from 21 in 2024. The committee sees these counts, never names.',
    // records, not film: no amber button
    btns: [{ label: 'Children checks', act: to('DCK1-ClubChecks') }, { label: 'All concerns', act: to('DS1-Concerns') }],
    figs: [
      { kind: 'bar', label: 'Current children check', now: 31, then: 26, of: 31 },
      { kind: 'bar', label: 'Child safety course done', now: 28, then: 19, of: 31 },
      { kind: 'num', label: 'Days to close a concern', value: '8', unit: 'days', then: '21 in 2024' },
      { kind: 'num', label: 'Closed in time', value: '6 of 6', then: '5 of 7 last year' },
    ],
  },
  left: [{
    kind: 'rows', name: 'People to check on', title: 'People to check on', link: { label: 'All concerns', act: to('DS1-Concerns') },
    rows: [
      { badge: '1', tone: 'mauve', title: 'A new concern arrived this morning', sub: 'Only you can read it', action: 'Read it', primary: true, act: to('DS1-Concerns') },
      { badge: '?', tone: 'green', title: 'A player, U13 Girls Meg', sub: 'Check-in due Friday · on track, two steps agreed', action: 'Open', act: to('DW1-WelfareCases') },
      { badge: '?', tone: 'green', title: 'Away spectator, U14 Josh', sub: 'The club replied · waiting on the other club', action: 'Open', act: to('DW1-WelfareCases') },
      { badge: '3', tone: 'rose', title: 'Three coaches still to do the course', sub: 'Reminded this week', action: 'Remind', act: say('Reminder sent to three coaches.') },
    ],
    foot: 'Names show only when you open a concern, and never on a shared screen.',
  }],
  right: [
    {
      kind: 'meters', name: 'Oversight', title: 'Has anything slipped?', mark: 'strong', sub: 'Counted from the club’s records',
      meters: [
        { label: 'Coaches with a current check', n: 31, of: 31, note: 'Four run out this month. All chased', to: 'DCK1-ClubChecks' },
        { label: 'Checks linked to the club', n: 29, of: 31, note: 'Two new coaches to link this week', to: 'DCK1-ClubChecks' },
        { label: 'Child safety course done', n: 28, of: 31, note: 'Three reminded', to: 'DT1-Courses' },
        { label: 'Open concerns on track', n: 2, of: 2, note: 'Next step due Friday', to: 'DS1-Concerns' },
      ],
      foot: 'Nothing is shared without your say.',
    },
    { kind: 'needs', count: '1', title: 'One thing needs you', sub: 'A new concern to read', to: 'DS1-Concerns' },
  ],
}

/** Every tablet home with the four parts, by its screen id. */
export const TABLET_HOMES: Record<string, Home> = Object.fromEntries(
  [STO1, STO2, STO3, STO4, STO5, STO6, STO7, STO8, STO9, STO10, STO11, STO12, STO13].map(h => [h.id, h]),
)
