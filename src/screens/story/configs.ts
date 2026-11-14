import type { HomeCfg } from './HomeStory'

// MiniRoos coach frame, shared by STO1–STO3.
const MINIROOS_TOPNAV = [
  { label: 'Home', target: 'MS5-HomeMiniRoosSame', active: true },
  { label: 'Squad' }, { label: 'Training' }, { label: 'Game day' }, { label: 'Clips' }, { label: 'Record' },
]
const MINIROOS_SUBNAV = [
  { label: 'Overview', target: 'MS5-HomeMiniRoosSame', active: true },
  { label: 'Messages' }, { label: 'Calendar' }, { label: 'Fixtures' },
  { label: 'Our style', target: 'MS1-MiniRoosStyle' },
  { label: "Where we're at", target: 'MS2-MiniRoosWhereWeAt' },
  { label: 'Team staff' },
]
const MINIROOS_FACES = [
  { ini: 'AK', has: true }, { ini: 'PD', has: true }, { ini: 'IV', has: false }, { ini: 'MX', has: false },
  { ini: 'OH', has: true }, { ini: 'EB', has: true }, { ini: 'JP', has: true }, { ini: 'SH', has: false },
  { ini: 'LH', has: true }, { ini: 'NO', has: true },
]

export const STO1: HomeCfg = {
  id: 'STO1-HomeStoryMiniRoos',
  role: 'Coach · MiniRoos', team: 'U9 Tom · Wattle Creek', avatar: 'TA',
  topNav: MINIROOS_TOPNAV, subNav: MINIROOS_SUBNAV,
  ask: 'Ask about U9 Tom… Who hasn’t had a moment this term?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'SATURDAY AT NORTHGATE CITY · NO SCORE KEPT',
    headline: 'You worked on being brave with the ball. On Saturday, seven of your ten took a player on.',
    second: 'A month ago it was three. Ella did it for the first time.',
    bars: [{ n: '3', when: '9 May' }, { n: '5', when: '23 May' }, { n: '7', when: 'Sat 6 June', amber: true }],
    unit: 'children who took a player on',
    reel: { duration: '0:40', chips: ['Arlo', 'Poppy', 'Ella', 'Jai', '+3'], caption: 'Seven moments, one from each child who did it. Made from Saturday’s film.' },
    mainBtn: 'Play 40 seconds',
    outlineBtn: 'What we saw', outlineTarget: 'MS3-MiniRoosReview',
  },
  ready: {
    when: 'TUE 9 JUNE · 5:00 pm · WATTLE CREEK RESERVE',
    title: 'Tuesday is ready',
    text: 'Four games built from Saturday. They bunched round the ball, so next is finding a friend in space.',
    chips: ['45 minutes', 'A ball each', 'No laps, no lines'],
    pale: 'You have not had to plan a session since round 2.',
    btn1: 'Open the games', btn2: 'Swap one',
  },
  moments: {
    title: 'A moment for every child', link: 'All moments', faces: MINIROOS_FACES,
    rows: [
      { ini: 'AK', title: 'Arlo · first go in goal', sub: 'Saturday · 12 seconds of film', action: 'Send' },
      { ini: 'PD', title: 'Poppy · took a player on', sub: 'Saturday · her goal for this term', action: 'Send' },
    ],
    foot: '7 of 10 have had one this term. Ivy, Max and Sami are next.',
  },
  done: {
    title: 'Done for you',
    lines: ['Reminder sent to 2 families', 'Saturday’s turns lined up', 'Four parents asked to be game leader', 'Thank-you to parents drafted'],
    next: 'Next: Sat 13 June, 8:30 at home',
  },
  needs: { count: 2, title: 'Two things need you', sub: 'Game leader for Saturday · one message' },
}

// Coach frame (juniors/youth/seniors/assistant), shared by STO4–STO7.
function coachFrame(overviewTarget: string) {
  return {
    topNav: [
      { label: 'Home', active: true }, { label: 'Squad' }, { label: 'Training' },
      { label: 'Match day' }, { label: 'Clips' }, { label: 'Record', target: 'REC1-RecordHub' },
    ],
    subNav: [
      { label: 'Overview', target: overviewTarget, active: true },
      { label: 'Messages' }, { label: 'Calendar' }, { label: 'Fixtures and results' },
      { label: 'Our style' }, { label: "Where we're at", target: 'WA1-WhereWeAt' }, { label: 'Team staff' },
    ],
  }
}
const FACES10 = (inis: string[]): { ini: string; has: boolean }[] => inis.map((ini, i) => ({ ini, has: i % 4 !== 2 }))

export const STO4: HomeCfg = {
  id: 'STO4-HomeStorySeniors', role: 'Head coach', team: 'Men’s 1sts', avatar: 'MP', ...coachFrame('PH3-HomeSeniorsSame'),
  ask: 'Ask about Men’s 1sts… How do Banksia Park build out?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'SAT 30 MAY · WON 2–0 v GLENVIEW PARK · 2ND OF 12',
    headline: 'You worked on a compact middle. Glenview had 9 shots. Five weeks ago, teams were getting 16.',
    second: 'Seven of the nine were from outside the area. The back four has now let in one goal in 212 minutes together.',
    bars: [{ n: '16', when: 'Round 4' }, { n: '13', when: 'Round 7' }, { n: '9', when: 'Saturday', amber: true }],
    unit: 'shots against, a game',
    reel: { duration: '1:30', chips: ['Shape', 'Shape', 'Goal', 'Goal', '+2'], caption: 'Six clips: the middle closing four times, both goals. Ready for Thursday’s team talk.' },
    mainBtn: 'Play 90 seconds', outlineBtn: 'Full review',
  },
  ready: {
    when: 'THU 4 JUNE · 7:30 pm · WATTLE CREEK RESERVE', title: 'Thursday is ready',
    text: 'Corners to the back post are the gap. Banksia Park scored two that way last week.',
    chips: ['75 minutes', '5 drills', 'Shorter: load is high'], pale: 'Banksia Park scouted from their last two games.',
    btn1: 'Open the plan', btn2: 'Team talk',
  },
  moments: {
    title: 'A clip for every player', link: 'All players', faces: FACES10(['CD', 'DC', 'JB', 'LH', 'NO', 'RP', 'TV', 'AM', 'BW', '+11']),
    rows: [
      { ini: 'LH', title: 'Liam Hart · made 4 chances', sub: 'Saturday · 3 clips, 34 seconds', action: 'Send' },
      { ini: 'CD', title: 'Cal Dunn · won it back 9 times', sub: 'Saturday · 4 clips, 41 seconds', action: 'Send' },
    ],
    foot: '17 of 21 have had a clip this month. Nico, Theo and Ben have not: worth a word on Thursday.',
  },
  done: { title: 'Done for you', lines: ['Team sheet drafted: 18 fit', 'Sprints capped for Theo and Dev', 'Saturday’s clips cut and named', 'Availability asked: 14 in so far'], next: 'Next: Sat 6 June, 3:00 pm away' },
  needs: { count: 2, title: 'Two things need you', sub: 'Ryan’s suspension · 2 clearances pending' },
}

export const STO5: HomeCfg = {
  id: 'STO5-HomeStoryJuniors', role: 'Head coach', team: 'U12 Sam', avatar: 'SK', ...coachFrame('PH1-HomeJuniorsSame'),
  ask: 'Ask about U12 Sam… Who needs a rest this week?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'SAT 30 MAY · WON 3–1 AT IRONBARK UNITED · 3RD OF 10',
    headline: 'You worked on winning it back fast. On Saturday it took 7 seconds. In April it took 11.',
    second: '13 of those wins were in their half. Mia, Jai and Zoe scored.',
    bars: [{ n: '11', when: 'Round 3' }, { n: '9', when: 'Round 6' }, { n: '7', when: 'Saturday', amber: true }],
    unit: 'seconds to win the ball back',
    reel: { duration: '1:00', chips: ['Press', 'Press', 'Win', 'Goal', '+1'], caption: 'Five clips: four wins of the ball and the goal that came from one.' },
    mainBtn: 'Play 60 seconds', outlineBtn: 'Full review',
  },
  ready: {
    when: 'THU 4 JUNE · 5:45 pm · WATTLE CREEK RESERVE', title: 'Thursday is ready',
    text: 'The gap between defence and midfield was 26 metres. Three drills close it.',
    chips: ['90 minutes', '4 drills', 'Built from film and vests'], pale: 'Sprints capped for Noah and Zoe: both are in a growth spurt.',
    btn1: 'Open the plan', btn2: 'Team talk',
  },
  moments: {
    title: 'A clip for every player', link: 'All players', faces: FACES10(['EB', 'MT', 'JP', 'NO', 'ZH', 'FW', 'LN', 'SD', 'RC', '+7']),
    rows: [
      { ini: 'MT', title: 'Mia Tran · won it back 4 times', sub: 'Saturday · her goal this term', action: 'Send' },
      { ini: 'NO', title: 'Noah Okafor · first assist', sub: 'Saturday · 9 seconds of film', action: 'Send' },
    ],
    foot: '12 of 16 have had a clip this month. Finn, Lily, Sam and Ruby are next.',
  },
  done: { title: 'Done for you', lines: ['Check-ins sent: 14 of 16 answered', 'Line-up drafted, all over half a game', 'Clips cut and named', 'Availability asked for Saturday'], next: 'Next: Sat 6 June, 9:30 away' },
  needs: { count: 3, title: 'Three things need you', sub: 'Ella low two days running · 3 vests' },
}

export const STO6: HomeCfg = {
  id: 'STO6-HomeStoryYouth', role: 'Head coach', team: 'U16 Ollie', avatar: 'OG', ...coachFrame('PH2-HomeYouthSame'),
  ask: 'Ask about U16 Ollie… Who has exams coming up?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'SAT 30 MAY · DREW 2–2 v TEALSIDE TOWN · 4TH OF 12',
    headline: 'You worked on building out under pressure. On Saturday you reached halfway 68% of the time. In April, 58%.',
    second: 'The cost is counter-attacks: six a game, four from losing it in midfield.',
    bars: [{ n: '58', when: 'Round 3' }, { n: '63', when: 'Round 6' }, { n: '68', when: 'Saturday', amber: true }],
    unit: '% of build-outs that reached halfway',
    reel: { duration: '1:30', chips: ['Build', 'Build', 'Build', 'Counter', '+2'], caption: 'Six clips: four clean build-outs and the two counters that cost goals.' },
    mainBtn: 'Play 90 seconds', outlineBtn: 'Full review',
  },
  ready: {
    when: 'THU 4 JUNE · 6:30 pm · WATTLE CREEK RESERVE', title: 'Thursday is ready',
    text: 'Covers the two players behind the ball, so a lost pass is not a chance against.',
    chips: ['75 minutes', '5 drills', 'Shorter: load is high'], pale: 'Load is up 30% two weeks running. Priya has capped sprints.',
    btn1: 'Open the plan', btn2: 'Team talk',
  },
  moments: {
    title: 'A clip for every player', link: 'All players', faces: FACES10(['AK', 'BT', 'CR', 'DL', 'HS', 'LM', 'TW', 'JO', 'MV', '+7']),
    rows: [
      { ini: 'HS', title: 'Hugo · made 3 chances', sub: 'Saturday · 3 clips, 28 seconds', action: 'Send' },
      { ini: 'CR', title: 'Cal · 6% faster, a real change', sub: 'Vests · against his own last month', action: 'Send' },
    ],
    foot: '12 of 16 have had a clip this month. Players 15 and over see their own.',
  },
  done: { title: 'Done for you', lines: ['Sprints capped for four players', 'Team sheet drafted: 15 fit', 'Clips sent to 6 players', 'Exam fortnight marked: 5 away'], next: 'Next: Sat 6 June, 11:00 at home' },
  needs: { count: 2, title: 'Two things need you', sub: 'Tane’s playing-up view · 1 message' },
}

export const STO7: HomeCfg = {
  id: 'STO7-HomeStoryAssistant', role: 'Assistant coach', team: 'U12 Sam', avatar: 'JM', ...coachFrame('PH4-HomeAssistantSame'),
  ask: 'Ask about U12 Sam… Who has had the least game time?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'SAT 30 MAY · WON 3–1 AT IRONBARK UNITED · YOU RAN THE SUBS',
    headline: 'You ran the subs on Saturday. All 16 played over half the game, and the team still won it back in 7 seconds.',
    second: 'In April, four players were under half. Sam’s note: “Subs were spot on.”',
    bars: [{ n: '12', when: 'Round 3' }, { n: '14', when: 'Round 6' }, { n: '16', when: 'Saturday', amber: true }],
    unit: 'players over half a game',
    reel: { duration: '1:00', chips: ['Press', 'Press', 'Win', 'Goal', '+1'], caption: 'Five clips from Saturday. Sam has put them in Thursday’s team talk.' },
    mainBtn: 'Play 60 seconds', outlineBtn: 'Reply to Sam',
  },
  ready: {
    when: 'THU 4 JUNE · 5:45 pm · WATTLE CREEK RESERVE', title: 'Thursday: you take the rondo',
    text: 'Sam leads the session. Your 10 minutes is the warm-up rondo, 5 v 2, Kai passing only.',
    chips: ['90 minutes', 'Your part: 6:00', 'Sam leads'], pale: 'Saturday: you run the warm-up and the subs again.',
    btn1: 'Open the plan', btn2: 'Saturday warm-up',
  },
  moments: {
    title: 'A clip for every player', link: 'All players', faces: FACES10(['EB', 'MT', 'JP', 'NO', 'ZH', 'FW', 'LN', 'SD', 'RC', '+7']),
    rows: [
      { ini: 'MT', title: 'Mia Tran · won it back 4 times', sub: 'Saturday · Sam sends, you can add a note', action: 'Add note' },
      { ini: 'FW', title: 'Finn Walsh · no clip this month', sub: 'On the bench first on Saturday. Watch for one', action: 'Watch for' },
    ],
    foot: '12 of 16 have had a clip this month. You and Sam see the same list.',
  },
  done: { title: 'Done for you', lines: ['Hand-over note from Sam saved', 'Sub plan drafted for Saturday', 'Warm-up cones list sent to Rob', 'Availability: 12 in, 2 to answer'], next: 'Next: Sat 6 June, 9:30 away' },
  needs: { count: 1, title: 'One thing needs you', sub: 'Sam asked: can you lead on Tue 9 June?' },
}

export const TABLET_CONFIGS: Record<string, HomeCfg> = {
  'STO1-HomeStoryMiniRoos': STO1,
  'STO4-HomeStorySeniors': STO4,
  'STO5-HomeStoryJuniors': STO5,
  'STO6-HomeStoryYouth': STO6,
  'STO7-HomeStoryAssistant': STO7,
}
