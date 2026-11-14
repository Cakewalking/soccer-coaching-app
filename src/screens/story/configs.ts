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

// Director/chair club frame (top tabs + Overview sub-nav).
const CLUB_TOPNAV = [
  { label: 'Club', active: true }, { label: 'Teams' }, { label: 'Coaches' },
  { label: 'Players' }, { label: 'Safeguarding' }, { label: 'Reports' },
]
const CLUB_SUBNAV = [
  { label: 'Overview', active: true }, { label: 'Messages', target: 'MSG4-DirectorMessages' },
  { label: 'Calendar' }, { label: 'Season plan' }, { label: 'Playing style' },
  { label: 'Files', target: 'FIL5-ClubFiles' }, { label: 'Features and billing', target: 'PRM1-FeaturesByTeam' },
]
const CLUB_TEAM_FACES = (ls: string[]): { ini: string; has: boolean }[] => ls.map((ini, i) => ({ ini, has: i % 3 !== 1 }))

export const STO10: HomeCfg = {
  id: 'STO10-HomeStoryDirector', role: 'Director of football', team: 'Whole club', avatar: 'RM',
  topNav: CLUB_TOPNAV, subNav: CLUB_SUBNAV,
  ask: 'Ask about Wattle Creek FC… Which teams are outside fair game time?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'WATTLE CREEK FC · 14 TEAMS · ROUND 8',
    headline: 'You asked every team to play the club way. In April, half of their games looked like it. This week, two in three.',
    second: 'Biggest movers: U12 Sam and U16 Ollie. U9 Mark and U13 Chris need a hand.',
    bars: [{ n: '51', when: 'Round 2' }, { n: '58', when: 'Round 5' }, { n: '67', when: 'Round 8', amber: true }],
    unit: '% of games played our way',
    reel: { duration: '2:00', chips: ['U9', 'U12', 'U16', '1sts', '+7'], caption: 'One clip from each team that recorded a game. Ready for Tuesday’s coach meeting.' },
    mainBtn: 'Play 2 minutes', outlineBtn: 'By team',
  },
  ready: {
    when: 'TUE 9 JUNE · 7:00 pm · CLUBROOMS', title: 'The coach meeting is ready',
    text: 'Agenda drafted from this week: pressing as a club, recording every game, cover for U9 Mark.',
    chips: ['45 minutes', '3 items', '11 clips'], pale: 'Three coaches are due a learning step. It is on the agenda.',
    btn1: 'Open the agenda', btn2: 'Send to coaches',
  },
  moments: {
    title: 'A highlight from every team', link: 'All teams', faces: CLUB_TEAM_FACES(['U9', 'U9', 'U11', 'U12', 'U13', 'U13', 'U14', 'U15', 'U16', '+5']),
    rows: [
      { ini: 'U12', title: 'U12 Sam · 13 wins of the ball in their half', sub: 'Best in the club this round', action: 'Share' },
      { ini: 'U11', title: 'U11 Luke · every child has been captain', sub: 'First team to get there this season', action: 'Share' },
    ],
    foot: '11 of 14 teams recorded a game this fortnight. U9 Mark, U13 Chris and U15 Girls Bec did not.',
  },
  done: { title: 'Done for you', lines: ['Board report drafted for Greg', 'Four children checks chased', 'Fair game time checked: 12 of 14', 'Fixtures synced with the league'], next: 'Next: coach meeting, Tue 9 June' },
  needs: { count: 5, title: 'Five things need you', sub: 'U9 Mark has no coach on Saturday', target: 'MSG4-DirectorMessages' },
}

export const STO11: HomeCfg = {
  id: 'STO11-HomeStoryChair', role: 'Chair', team: 'Whole club', avatar: 'GL',
  topNav: CLUB_TOPNAV, subNav: CLUB_SUBNAV,
  ask: 'Ask about Wattle Creek FC… How many players did we keep from last year?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'WATTLE CREEK FC · BOARD MEETING IN 6 DAYS',
    headline: 'The club promised every child fair game time. Twelve of fourteen teams now keep it. In round 1, seven did.',
    second: '192 players, up 14 on last year. 31 of 31 coaches hold a current children check.',
    bars: [{ n: '7', when: 'Round 1' }, { n: '10', when: 'Round 4' }, { n: '12', when: 'Round 8', amber: true }],
    unit: 'teams inside the fair game time rule',
    status: [
      { label: 'Players · kept from last year', value: '192 · up 14' },
      { label: 'Coaches cleared', value: '88% · 31 of 31' },
      { label: 'Open concerns', value: '2 · on track' },
    ],
    statusCaption: 'Counts only. Names and details stay with the welfare officer.',
    mainBtn: 'Read the board report', outlineBtn: 'The two teams',
  },
  ready: {
    when: 'WED 10 JUNE · 7:30 pm · CLUBROOMS', title: 'The board report is ready',
    text: 'One page, drafted from this month’s numbers. Rachel has checked the football; you add the money.',
    chips: ['1 page', '6 numbers', '2 decisions'], pale: 'The council grant report uses the same numbers. It is drafted too.',
    btn1: 'Open the report', btn2: 'Send to committee',
  },
  moments: {
    title: 'What members will ask', link: 'All reports', faces: [],
    rows: [
      { ini: '192', title: 'Registrations · up 14 on last year', sub: 'Girls and women up from 41 to 58', action: 'Open', target: 'PRM3-Bill' },
      { ini: '$', title: 'This month’s bill · $384, 2 add-ons on 6 teams', sub: 'Used on 5 of the 6 teams paying for them', action: 'Open', target: 'PRM3-Bill' },
    ],
    foot: 'Nothing here names a child. Coaches see their own team; the committee sees counts.',
  },
  done: { title: 'Done for you', lines: ['Grant report drafted', 'Committee papers collated', 'Volunteer hours totalled: 412', 'Pilot review booked with Clean Sheet'], next: 'Next: board, Wed 10 June' },
  needs: { count: 1, title: 'One thing needs you', sub: 'Approve the U9 Mark coach cover', target: 'MSG4-DirectorMessages' },
}

export const STO12: HomeCfg = {
  id: 'STO12-HomeStoryCoordinator', role: 'Club coordinator', team: 'Whole club', avatar: 'BR',
  topNav: CLUB_TOPNAV,
  subNav: [{ label: 'This week', active: true }, { label: 'Registrations' }, { label: 'Fixtures' }, { label: 'Referees' }, { label: 'Kit' }, { label: 'Fees and volunteers' }],
  ask: 'Ask about this week… Which games still need a game leader?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'SATURDAY 6 JUNE · 14 GAMES · 3 GROUNDS',
    headline: 'Saturday is nearly covered. On Monday 31 families hadn’t answered. Today it’s five.',
    second: '13 of 14 games have a game leader. Every pitch is booked. Canteen needs one more.',
    bars: [{ n: '31', when: 'Monday' }, { n: '12', when: 'Wednesday' }, { n: '5', when: 'Today', amber: true }],
    unit: 'families still to answer',
    status: [
      { label: 'Game leaders', value: '13 of 14' },
      { label: 'Pitches booked', value: '14 of 14' },
      { label: 'Canteen', value: '5 of 6 shifts' },
      { label: 'Kit', value: '2 bibs sets short' },
    ],
    statusCaption: 'Each line opens the list behind it.',
    mainBtn: 'Saturday run sheet', outlineBtn: 'Remind the five',
  },
  ready: {
    when: 'SAT 6 JUNE · FIRST GAME 8:30 am', title: 'The run sheet is ready',
    text: 'Fourteen games by ground and time, with who opens up, who referees and who locks up.',
    chips: ['3 grounds', '14 games', '26 volunteers'], pale: 'Built from fixtures, the roster and what families answered.',
    btn1: 'Open the run sheet', btn2: 'Send to managers',
  },
  moments: {
    title: 'Gaps to fill', link: 'Everything', faces: [],
    rows: [
      { ini: 'U9', title: 'U9 Mark · needs a game leader', sub: 'Four parents asked · none yet', action: 'Ask again' },
      { ini: 'C', title: 'Canteen 10 to 11 · one more needed', sub: 'Posted on the volunteer board', action: 'Ask' },
    ],
    foot: 'Two gaps left for Saturday. On Monday there were nine.',
  },
  done: { title: 'Done for you', lines: ['Fixtures synced with the league', 'Reminders sent to 31 families', 'Pitch 2 moved for line marking', 'Referee fees totalled'], next: 'Next: Sat 6 June, 8:30 am' },
  needs: { count: 2, title: 'Two things need you', sub: 'A dispensation · a late registration', target: 'MSG4-DirectorMessages' },
}

export const STO13: HomeCfg = {
  id: 'STO13-HomeStoryWelfare', role: 'Welfare officer', team: 'Whole club', avatar: 'HP',
  topNav: [{ label: 'Welfare', active: true }],
  subNav: [{ label: 'Overview', active: true }, { label: 'Concerns' }, { label: 'Children checks' }, { label: 'Messages' }],
  ask: 'Ask about safeguarding… Whose children check runs out next?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'SAFEGUARDING · WEEK OF 1 JUNE',
    headline: 'Two concerns are open and both are on track. This year a concern has taken eight days to close, down from 21.',
    second: 'One new concern arrived this morning. Only you can read it.',
    bars: [{ n: '21', when: '2024' }, { n: '12', when: '2025' }, { n: '8', when: 'This year', amber: true }],
    unit: 'days to close a concern, on average',
    status: [
      { label: 'Open concerns', value: '2 · on track' },
      { label: 'Closed this year', value: '6 of 6 in time' },
      { label: 'Coaches cleared', value: '31 of 31' },
      { label: 'Course done', value: '28 of 31' },
    ],
    statusCaption: 'The committee sees these counts. Never names or details.',
    mainBtn: 'Read the new concern', outlineBtn: 'Log one yourself',
  },
  ready: {
    when: 'THU 4 JUNE · 4:00 pm · PHONE', title: 'Thursday’s check-in is ready',
    text: 'Your call with a parent from U13 Girls Meg: what was agreed last time and what to ask.',
    chips: ['15 minutes', 'Private notes', '2 agreed steps'], pale: 'Notes stay with you. Nothing is shared without your say.',
    btn1: 'Open my notes', btn2: 'Move it',
  },
  moments: {
    title: 'People to check on', link: 'All concerns', faces: [],
    rows: [
      { ini: '?', title: 'A player, U13 Girls Meg · check-in due Friday', sub: 'On track · two steps agreed', action: 'Open' },
      { ini: '?', title: 'Away spectator, U14 Josh · club replied', sub: 'On track · waiting on the other club', action: 'Open' },
    ],
    foot: 'Names show only when you open a concern, and never on a shared screen.',
  },
  done: { title: 'Done for you', lines: ['Four expiring checks chased', 'Course reminder sent to three coaches', 'Committee counts drafted', 'Report line checked: answered in 1 day'], next: 'Kids Helpline 1800 55 1800 is on every child’s screen' },
  needs: { count: 1, title: 'One thing needs you', sub: 'A new concern to read' },
}

export const STO8: HomeCfg = {
  id: 'STO8-HomeStoryFitness', role: 'Fitness coach', team: 'Four teams', avatar: 'PS',
  topNav: [{ label: 'Home', active: true }, { label: 'Squad' }, { label: 'Training' }, { label: 'Match day' }],
  subNav: [{ label: 'Overview', active: true }, { label: 'Messages' }, { label: 'Calendar' }],
  ask: 'Ask about your four teams… Who is growing fast?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'FOUR TEAMS · WEEK OF 1 JUNE',
    headline: 'You capped sprints for the U16s two weeks ago. Sore legs are down from six players to two, and they finished Saturday strong.',
    second: 'Last-15-minute sprints dropped by 18%, not 30%. Ollie kept the full squad available.',
    bars: [{ n: '6', when: '18 May' }, { n: '4', when: '25 May' }, { n: '2', when: 'This week', amber: true }],
    unit: 'U16 players reporting sore legs',
    status: [
      { label: 'U12 Sam', value: 'Steady' }, { label: 'U13 Girls Meg', value: 'Steady' },
      { label: 'U14 Josh', value: '2 growing fast' }, { label: 'U16 Ollie', value: 'Load easing' },
    ],
    statusCaption: 'Nobody is ranked. Each player is compared with their own last month.',
    mainBtn: 'See the load', outlineBtn: 'Who is growing',
  },
  ready: {
    when: 'TONIGHT · 5:45 pm · U12 SAM', title: 'Tonight’s block is ready',
    text: 'Fifteen minutes inside Sam’s session: short sprints with a ball, capped for Noah and Zoe.',
    chips: ['15 minutes', '16 players', '2 capped'], pale: 'Built from last week’s sprint counts and Monday’s check-ins.',
    btn1: 'Open my part', btn2: 'Tell Sam',
  },
  moments: {
    title: 'A real change for every player', link: 'All players', faces: FACES10(['ZH', 'JP', 'RC', 'IM', 'MT', 'LM', 'CR', 'TW', 'DL', '+54']),
    rows: [
      { ini: 'CR', title: 'Cal · U16 · 6% faster than last month', sub: 'Bigger than the noise in the vests', action: 'Send' },
      { ini: 'ZH', title: 'Zoe Hartley · U12 · grew 8 cm this year', sub: 'Sprints capped. Her coach and parent know', action: 'Open' },
    ],
    foot: '9 real changes this month across 63 players. Small moves are shown as “about the same”.',
  },
  done: { title: 'Done for you', lines: ['Measuring session planned: Thu 11 June', 'Growth flags sent to three coaches', 'Sprint caps applied to four plans', 'Test results filed against last term'], next: 'Next: U14 Josh tests, Tue 9 June' },
  needs: { count: 2, title: 'Two things need you', sub: 'Noah’s sore knee · measuring due' },
}

export const STO9: HomeCfg = {
  id: 'STO9-HomeStoryKeepers', role: 'Goalkeeper coach', team: 'All keepers', avatar: 'NW',
  topNav: [{ label: 'Home', active: true }, { label: 'Keepers' }, { label: 'Training' }, { label: 'Clips' }],
  subNav: [{ label: 'Overview', active: true }, { label: 'Messages' }, { label: 'Calendar' }],
  ask: 'Ask about your keepers… How is each keeper’s distribution?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'ELEVEN KEEPERS · LAST WEEKEND',
    headline: 'You worked on starting higher. On Saturday Grace swept up five balls behind her defence. A month ago, one.',
    second: 'Across all eleven keepers, sweeps are up from 9 to 21 a weekend.',
    bars: [{ n: '9', when: '2 May' }, { n: '15', when: '16 May' }, { n: '21', when: 'Last weekend', amber: true }],
    unit: 'balls swept up behind the defence',
    reel: { duration: '1:00', chips: ['Grace', 'Ava', 'Tom', 'Bao', '+2'], caption: 'Six sweeps from five keepers, and one that started a goal.' },
    mainBtn: 'Play 60 seconds', outlineBtn: 'By keeper',
  },
  ready: {
    when: 'TUE 9 JUNE · 6:00 pm · PITCH 2', title: 'Tuesday is ready',
    text: 'Quick restarts: catch, look, roll. Three keepers held the ball over six seconds on Saturday.',
    chips: ['40 minutes', '3 drills', '11 keepers'], pale: 'Built from every keeper’s clips this fortnight.',
    btn1: 'Open the session', btn2: 'Send the plan',
  },
  moments: {
    title: 'A clip for every keeper', link: 'All keepers', faces: FACES10(['GO', 'AL', 'TR', 'BT', 'KR', 'IM', 'OB', 'SD', 'FW', '+2']),
    rows: [
      { ini: 'GO', title: 'Grace Owusu · quick roll started a goal', sub: 'Saturday · 11 seconds of film', action: 'Send' },
      { ini: 'AL', title: 'Ava Lindqvist · first clean catch from a corner', sub: 'Saturday · 7 seconds of film', action: 'Send' },
    ],
    foot: '9 of 11 have had a clip this month. Oscar and Sam D are next.',
  },
  done: { title: 'Done for you', lines: ['Plan sent to 11 keepers', 'Keeper clips cut from 7 games', 'Glove sizes sent to Bianca', 'U9 turns in goal checked: 7 of 10'], next: 'Next: Tue 9 June, 6:00 pm' },
  needs: { count: 1, title: 'One thing needs you', sub: 'Tom asked for a keeper game for U9s' },
}

export const STO14: HomeCfg = {
  id: 'STO14-HomeStoryAcademyOwner', role: 'Academy owner', team: 'Tall Timber Academy', avatar: 'DO',
  topNav: [{ label: 'Home', active: true }, { label: 'Programs' }, { label: 'Players' }, { label: 'Coaches' }, { label: 'Money' }],
  subNav: [{ label: 'Overview', active: true }, { label: 'Trials' }, { label: 'Reports' }, { label: 'Child safety' }, { label: 'Partner club' }],
  ask: 'Ask about Tall Timber… Who is behind on their term goal?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'TALL TIMBER ACADEMY · TERM 2, WEEK 7 OF 10',
    headline: 'Families pay for progress. 71 of your 80 players have moved up a step on a skill this term, and every family has seen it.',
    second: 'In week 2 it was 38. Nine have not moved yet: six have a one-on-one booked.',
    bars: [{ n: '38', when: 'Week 2' }, { n: '56', when: 'Week 4' }, { n: '71', when: 'Week 7', amber: true }],
    unit: 'players up a step on a skill',
    reel: { duration: '1:30', chips: ['Kai', 'Ana', 'Leo', 'Mei', '+2'], caption: 'Before and after for six players. Cleared by their families for your trial page.' },
    mainBtn: 'Play term 2 so far', outlineBtn: 'By program',
  },
  ready: {
    when: 'FRI 26 JUNE · TERM REPORTS GO OUT', title: 'Five reports are ready',
    text: 'Drafted by Reece from each player’s plan, clips and attendance. They wait for your yes.',
    chips: ['5 drafted', '75 to come', '2 minutes each'], pale: 'Families who get a report with clips re-enrol more often.',
    btn1: 'Approve 5 and send', btn2: 'Read one',
  },
  moments: {
    title: 'A step for every player', link: 'All players', faces: FACES10(['KO', 'AM', 'LS', 'MC', 'JT', 'RB', 'SN', 'EV', 'DP', '+71']),
    rows: [
      { ini: 'KO', title: 'Kai Okonkwo · weak-foot pass is now Strong', sub: 'Advanced · 15 seconds, before and after', action: 'Send' },
      { ini: 'AM', title: 'Ana Moreno · first touch is now Getting There', sub: 'Development · 12 seconds', action: 'Send' },
    ],
    foot: '71 of 80 have moved a step. Nine have not: Reece has six one-on-ones booked.',
  },
  done: { title: 'Done for you', lines: ['Three trial offers sent', 'Two late fees chased', 'July clinic: 19 of 24 booked', 'Partner club sent Saturday’s team sheet'], next: 'Next: trials, Sat 13 June' },
  needs: { count: 2, title: 'Two things need you', sub: 'A make-up request · a coach check' },
}

export const STO15: HomeCfg = {
  id: 'STO15-HomeStoryAcademyCoach', role: 'Academy coach', team: 'Tall Timber Academy', avatar: 'RW',
  topNav: [{ label: 'Today', active: true }, { label: 'Players' }, { label: 'Game day' }, { label: 'Library' }],
  subNav: [{ label: 'Today', active: true }, { label: 'Run a session' }, { label: 'Trial player' }, { label: 'One-on-one' }, { label: 'Record' }, { label: 'Suggested' }],
  ask: 'Ask about your groups… Who is making the most progress?', askTarget: 'ASKd2-HomeFocus',
  proof: {
    label: 'ADVANCED · 12 TO 14 · LAST FOUR WEEKS',
    headline: 'You worked on receiving on the half-turn. Fourteen of your twenty now do it under pressure. Four weeks ago, six.',
    second: 'Kai went from Getting There to Strong. Six are still at Starting Out.',
    bars: [{ n: '6', when: 'Week 3' }, { n: '10', when: 'Week 5' }, { n: '14', when: 'Week 7', amber: true }],
    unit: 'players who turn under pressure',
    reel: { duration: '0:45', chips: ['Kai', 'Mei', 'Leo', 'Jo'], caption: 'Before and after for four players, from the drill you filmed in weeks 3 and 7.' },
    mainBtn: 'Play 45 seconds', outlineBtn: 'By player',
  },
  ready: {
    when: 'TODAY · 4:30 pm · MESSMATE PRIMARY', title: 'Today’s three sessions are ready',
    text: 'Development at 4:30, Advanced at 5:30, Kai’s one-on-one at 6:45. Each is built from last week’s notes.',
    chips: ['14 coming', '20 coming', '45 minutes'], pale: 'The six at Starting Out get an easier first step tonight.',
    btn1: 'Start the 4:30', btn2: 'Swap a drill',
  },
  moments: {
    title: 'A step for every player', link: 'All players', faces: FACES10(['KO', 'MC', 'LS', 'JT', 'RB', 'SN', 'EV', 'DP', 'AW', '+11']),
    rows: [
      { ini: 'KO', title: 'Kai Okonkwo · half-turn is now Strong', sub: 'Week 7 · 15 seconds, before and after', action: 'Send' },
      { ini: 'SN', title: 'Sam Ng · still at Starting Out', sub: 'Missed two weeks. A one-on-one would help', action: 'Offer' },
    ],
    foot: '14 of 20 have moved a step. Dani sees the same list.',
  },
  done: { title: 'Done for you', lines: ['Four report drafts started', 'Attendance marked from check-in', 'Make-up session offered to two', 'Saturday’s team sheet sent'], next: 'Next: Sat 6 June, U13 Timber' },
  needs: { count: 1, title: 'One thing needs you', sub: 'Dani asked: can you take Friday?' },
}

// STO2 (training day) and STO3 (no film) reuse the MiniRoos frame + moments/
// right column; their proof and ready cards are rendered bespoke. The `proof`
// here is a placeholder (ignored by the bespoke renderers).
const PLACEHOLDER_PROOF: HomeCfg['proof'] = { label: '', headline: '', second: '', mainBtn: '' }

export const STO2: HomeCfg = {
  id: 'STO2-HomeStoryMiniRoosTraining', role: 'Coach · MiniRoos', team: 'U9 Tom · Wattle Creek', avatar: 'TA',
  topNav: MINIROOS_TOPNAV, subNav: MINIROOS_SUBNAV,
  ask: 'Ask about U9 Tom… What if only seven come tonight?', askTarget: 'ASKd2-HomeFocus',
  proof: PLACEHOLDER_PROOF,
  ready: { when: '', title: '', text: '', btn1: '' },
  moments: {
    title: 'A moment for every child', link: 'All moments', faces: MINIROOS_FACES,
    rows: [
      { ini: 'IV', title: 'Ivy · none yet this term', sub: 'She is in goal on Saturday. Watch for one tonight', action: 'Watch for' },
      { ini: 'MX', title: 'Max · none yet this term', sub: 'Loves Treasure island. Watch for one tonight', action: 'Watch for' },
    ],
    foot: '7 of 10 have had one. Three sent on Sunday: all three families replied.',
  },
  done: { title: 'Done for you', lines: ['Reminder goes to 2 families at 3:00 pm', 'Kit list sent to Rob', 'Game leader found: Dan Kovac', 'Heat checked: 24°, play as normal'], next: 'Next: Sat 13 June, 8:30 at home' },
  needs: { count: 1, title: 'One thing needs you', sub: 'A message from Omar’s dad' },
}

export const STO3: HomeCfg = {
  id: 'STO3-HomeStoryMiniRoosNoFilm', role: 'Coach · MiniRoos', team: 'U9 Tom · Wattle Creek', avatar: 'TA',
  topNav: MINIROOS_TOPNAV, subNav: MINIROOS_SUBNAV,
  ask: 'Ask about U9 Tom… Who hasn’t been in goal yet?', askTarget: 'ASKd2-HomeFocus',
  proof: PLACEHOLDER_PROOF,
  ready: {
    when: 'TUE 9 JUNE · 5:00 pm · WATTLE CREEK RESERVE', title: 'Tuesday is ready',
    text: 'Four games built from your three taps. Next is finding a friend in space.',
    chips: ['45 minutes', 'A ball each', 'No laps, no lines'], pale: 'Three taps after the game is all it took.',
    btn1: 'Open the games', btn2: 'Swap one',
  },
  moments: {
    title: 'A moment for every child', link: 'All moments', faces: MINIROOS_FACES,
    rows: [
      { ini: 'AK', title: 'Arlo · first go in goal', sub: 'Your note on Saturday', action: 'Send' },
      { ini: 'PD', title: 'Poppy · took a player on', sub: 'Your note · Rob’s photo', action: 'Send' },
    ],
    foot: '7 of 10 have had one this term, from your notes and photos. Ivy, Max and Sami are next.',
  },
  done: { title: 'Done for you', lines: ['Reminder sent to 2 families', 'Saturday’s turns lined up'], next: 'Next: Sat 13 June, 8:30 at home' },
  needs: { count: 2, title: 'Two things need you' },
}

export const TABLET_CONFIGS: Record<string, HomeCfg> = {
  'STO1-HomeStoryMiniRoos': STO1,
  'STO2-HomeStoryMiniRoosTraining': STO2,
  'STO3-HomeStoryMiniRoosNoFilm': STO3,
  'STO8-HomeStoryFitness': STO8,
  'STO9-HomeStoryKeepers': STO9,
  'STO14-HomeStoryAcademyOwner': STO14,
  'STO15-HomeStoryAcademyCoach': STO15,
  'STO4-HomeStorySeniors': STO4,
  'STO5-HomeStoryJuniors': STO5,
  'STO6-HomeStoryYouth': STO6,
  'STO7-HomeStoryAssistant': STO7,
  'STO10-HomeStoryDirector': STO10,
  'STO11-HomeStoryChair': STO11,
  'STO12-HomeStoryCoordinator': STO12,
  'STO13-HomeStoryWelfare': STO13,
}
