// The words and wiring of each phone home, taken from the boards in the homes handover (v26, 24 Nov).
// One entry per board: what each control says or opens is the board's own href or line. The layout is PhoneHome.tsx.
import type { PhoneHomeCfg } from './PhoneHome'

// Team manager. No film behind the claim, so the progress button is outlined.
export const STO16: PhoneHomeCfg = {
  id: 'STO16-HomeStoryManager', roleLine: 'U12 Sam · Team manager', greeting: 'Hi Rob', avatar: 'RO', me: 'ME-manager',
  now: { title: 'Sun 7 June · 9:30 away', sub: 'Meet 8:45 at Redgum Reserve · papers ready', btn: 'Open papers', to: 'TM11-GameDayPapers' },
  progress: {
    label: 'PROGRESS · THIS WEEK',
    headline: 'Sunday is sorted. 14 are coming and every job is taken. On Monday, six families hadn’t answered.',
    figures: [{ label: 'Families who’ve answered', then: '10', now: '14 of 16' }, { label: 'Jobs taken', then: '2', now: '4 of 4' }, { label: 'Lifts sorted', then: '0', now: '1 of 1' }],
    btn: { label: 'Nudge the two', film: false, say: 'Nudge sent to the 2 families who haven’t answered.' },
  },
  dev: { title: 'Every family doing their bit · 13 of 16', rows: [
    { chip: '3', chipBg: '#f4e6e6', title: 'Three families haven’t had a job yet', sub: 'They’re first on the roster for June', to: 'TM4-DutyRoster' },
    { chip: 'P', chipBg: '#eef5f2', title: 'The Patels have oranges, Linh has the hi-vis', sub: 'This Sunday', to: 'TM4-DutyRoster' },
  ] },
  over: { name: 'Oversight', title: 'Has anything slipped?', rows: [
    { label: 'Medical details on file', value: '16 of 16', to: 'TM6-ManagerWhosComing' },
    { label: 'Last game signed off', value: 'Done', to: 'TM9-SignOff' },
    { label: 'A parent asked about kit sizes', value: 'Reply', warn: true, to: 'TM5-ManagerMessages' },
  ] },
  tabs: [
    { label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', to: 'TM1-ManagerHome' },
    { label: 'Game day', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z', to: 'TM2-ManagerGameDay' },
    { label: 'Messages', icon: 'M4 5h16v11H8l-4 4z', to: 'TM5-ManagerMessages' },
    { label: 'Roster', icon: 'M5 6h14v14H5zM5 10h14M9 3v4M15 3v4', to: 'TM4-DutyRoster' },
  ],
}

// Parent. "Is the club looking after them?" is the parent's oversight.
export const STO17: PhoneHomeCfg = {
  id: 'STO17-HomeStoryParent', roleLine: 'Wattle Creek FC · parent', greeting: 'Mia and Bao', avatar: 'LT', me: 'PS1-ParentSettings',
  now: { title: 'Sun 7 June · Bao, 8:30 at home', sub: 'Hannah needs an answer by Friday', btn: 'Answer', to: 'AV2-ParentAvailability' },
  progress: {
    label: 'PROGRESS · MIA · U12 SAM',
    headline: 'Mia won the ball back four times on Sunday. A month ago, once a game.',
    figures: [{ label: 'Winning the ball back', then: '1', now: '4 a game' }, { label: 'Passes forward', then: '6', now: '9 a game' }],
    btn: { label: 'Watch Mia’s 12 seconds', film: true, to: 'PA-Clip' },
  },
  dev: { title: 'What they’re working on', rows: [
    { chip: 'MT', chipBg: '#eef5f2', title: 'Mia · pressing as a pair with Jai', sub: 'Her goal this term · Sam’s note from Thursday', to: 'PA-Parent' },
    { chip: 'BT', chipBg: '#eef5f2', title: 'Bao · first go in goal on Sunday', sub: 'U8 Hannah sent a photo', to: 'PA-Clip' },
  ] },
  over: { name: 'Oversight', title: 'Is the club looking after them?', rows: [
    { label: 'Mia played over half of every game', value: '8 of 8', to: 'PA-Parent' },
    { label: 'Their coaches hold a children check', value: '4 of 4', to: 'PS3-ParentData' },
    { label: 'Fees', value: 'Paid', to: 'PS1-ParentSettings' },
  ] },
  tabs: [
    { label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', to: 'FAM14-HomeWithClub' },
    { label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', to: 'PA-Clip' },
    { label: 'Messages', icon: 'M4 5h16v11H8l-4 4z', to: 'PM1-ParentChats' },
    { label: 'Me', icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0', to: 'PS1-ParentSettings' },
  ],
}

// Player under 15. "My week", never "Oversight"; a parent sees everything and the home says so.
export const STO18: PhoneHomeCfg = {
  id: 'STO18-HomeStoryPlayerYoung', roleLine: 'U12 Sam', greeting: 'Hi Mia', avatar: 'MT', me: 'PS4-PlayerMe',
  now: { title: 'Tonight · 5:45 pm training', sub: 'Your one thing: press as a pair with Jai', btn: 'My goal', to: 'PA-Goals' },
  progress: {
    label: 'MY PROGRESS · THIS SEASON',
    headline: 'You won the ball back four times on Sunday. That’s your best yet. In May it was once.',
    figures: [{ label: 'Winning the ball back', then: '1', now: '4 a game' }, { label: 'Passes forward', then: '6', now: '9 a game' }],
    btn: { label: 'Watch my clip', film: true, to: 'PA-Clip' },
  },
  dev: { title: 'What I’m working on', rows: [
    { chip: '1', chipBg: '#eef5f2', title: 'Press as a pair with Jai', sub: 'When he goes, you go · step 2 of 3', to: 'PA-Goals' },
    { chip: 'S', chipBg: '#e8cfcf', title: 'From Sam', sub: '“Great pressing. Watch how you and Jai close together.”', to: 'PA-Clip' },
  ] },
  over: { name: 'My week', title: 'My week', rows: [
    { label: 'How I slept and feel', value: 'Done today', to: 'PA-Check' },
    { label: 'Sunday 9:30 away', value: 'Mum said yes', to: 'PA-PlayerApp' },
    { label: 'Mum can see everything here too', value: 'Always', to: 'PS4-PlayerMe' },
  ] },
  tabs: [
    { label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', to: 'PA-PlayerApp' },
    { label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', to: 'PA-Clip' },
    { label: 'Goals', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z', to: 'PA-Goals' },
    { label: 'Me', icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0', to: 'PS4-PlayerMe' },
  ],
}

// Player 15 and over. "My week". The board marks the Load row as a warning; the layout never draws a warning on a child's home.
export const STO19: PhoneHomeCfg = {
  id: 'STO19-HomeStoryPlayerOlder', roleLine: 'U16 Ollie', greeting: 'Hi Cal', avatar: 'CW', me: 'ME-playerolder',
  now: { title: 'Tonight · 6:30 pm training', sub: '75 minutes · your sprints are capped', btn: 'I’m in', say: 'You’re in for tonight.' },
  progress: {
    label: 'MY PROGRESS · THIS SEASON',
    headline: 'Your top speed is 6% up on last month. Ollie says that’s a real change.',
    figures: [{ label: 'Top speed, km/h', then: '27.1', now: '28.8' }, { label: 'Winning the ball back', then: '6', now: '8 a game' }],
    btn: { label: 'Watch my three clips', film: true, to: 'PA-Clip' },
  },
  dev: { title: 'What I’m working on', rows: [
    { chip: '1', chipBg: '#eef5f2', title: 'Two touches or fewer in midfield', sub: 'Your goal · 61% on Sunday, up from 48%', to: 'PA-Goals' },
    { chip: 'O', chipBg: '#e8cfcf', title: 'From Ollie', sub: '“Look at clip two. That’s the pass.”', to: 'PO2-OlderMessage' },
  ] },
  over: { name: 'My week', title: 'My week', rows: [
    { label: 'Check-ins this week', value: '4 of 4', to: 'PO4-OlderLoad' },
    { label: 'Load', value: 'High · capped', warn: true, to: 'PO4-OlderLoad' },
    { label: 'Who sees my numbers', value: 'You choose', to: 'PO5s-AdultSettings' },
  ] },
  tabs: [
    { label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', to: 'PO1-OlderHome' },
    { label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', to: 'PA-Clip' },
    { label: 'Body', icon: 'M4 19V9M10 19V5M16 19v-7M22 19H2', to: 'PO4-OlderLoad' },
    { label: 'Messages', icon: 'M4 5h16v11H8l-4 4z', to: 'PO2-OlderMessage' },
  ],
}

// Referee. No film behind the claim, so the progress button is outlined.
export const STO20: PhoneHomeCfg = {
  id: 'STO20-HomeStoryReferee', roleLine: 'Wattle Creek FC · referees', greeting: 'Hi Zoe', avatar: 'ZP', me: 'ME-referee',
  now: { title: 'Sun 7 June · 8:30 · Pitch 6', sub: 'U9 Tom v Northgate City · can you do it?', btn: 'Answer', to: 'RF1-RefAsked' },
  progress: {
    label: 'MY PROGRESS · THIS SEASON',
    headline: 'You’ve led six games since April. Four coaches said thanks afterwards.',
    figures: [{ label: 'Games led', then: '1', now: '6' }, { label: 'Thanks from coaches', then: '0', now: '4' }],
    btn: { label: 'See the kind words', film: false, to: 'RF4-RefFeedback' },
  },
  dev: { title: 'My next step', rows: [
    { chip: '9', chipBg: '#eef5f2', title: 'Nine-a-side games', sub: 'Ruth has put you forward · two more 7-a-side first', to: 'RF2-RefGames' },
    { chip: 'R', chipBg: '#e8cfcf', title: 'From Ruth, after your last game', sub: 'Two tips: your position at corners, a louder whistle', to: 'RF4-RefFeedback' },
  ] },
  over: { name: 'Oversight', title: 'Is everything in order?', rows: [
    { label: 'Reports sent', value: '6 of 6', to: 'RF3-RefReport' },
    { label: 'Paid', value: '5 of 6 · May is with Bianca', to: 'RF2-RefGames' },
    { label: 'Ruth is at the ground all morning', value: 'Sunday', to: 'RF2-RefGames' },
  ] },
  tabs: [
    { label: 'My games', icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4', to: 'RF2-RefGames' },
    { label: 'Report', icon: 'M7 3h10v18H7z', to: 'RF3-RefReport' },
    { label: 'Feedback', icon: 'M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z', to: 'RF4-RefFeedback' },
    { label: 'Me', icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0', say: 'Your details, level and children check.' },
  ],
}

// Coach on a phone: the junior coach's home with three figures, two meters and Needs you.
export const CPH1: PhoneHomeCfg = {
  id: 'CPh1-CoachPhoneHome', roleLine: 'U12 Sam · Thu 4 June', greeting: 'Hi Sam', avatar: 'SK',
  now: { title: 'Tonight · 5:45 pm training', sub: '90 minutes · plan ready · 14 coming', btn: 'Open plan', to: 'CPh5-CoachPhonePlan' },
  progress: {
    label: 'PROGRESS · U12 SAM · THIS SEASON',
    headline: 'You worked on winning it back fast. On Sunday it took 7 seconds. In round 3, eleven.',
    figures: [{ label: 'Winning the ball back', then: '11', now: '7 seconds' }, { label: 'Pressing wins in their half', then: '8', now: '13 a game' }, { label: 'Gap between the lines', then: '24', now: '26 metres' }],
    btn: { label: 'Play 60 seconds', film: true, to: 'RD5-CoachPhoneReview' },
  },
  dev: { title: 'Development · 10 of 16 closer to their goal', rows: [
    { chip: 'MT', chipBg: '#eef5f2', title: 'Mia won it back four times', sub: 'A 12-second clip · send to her family', say: 'Sent to Mia and her mum with your note.' },
    { chip: 'FW', chipBg: '#f4e6e6', title: 'Finn has had no clip this month', sub: 'Watch for one on Sunday', say: 'Finn is pinned for Sunday.' },
  ] },
  over: { name: 'Oversight', title: 'Has anything slipped?', rows: [
    { label: 'Over half of every game', value: '14 of 16', to: 'RD5-CoachPhoneReview' },
    { label: 'A clip this month', value: '12 of 16', to: 'RD5-CoachPhoneReview' },
    { label: 'Three things need you', value: 'Open', warn: true, to: 'CPh3-CoachPhoneMessages' },
  ] },
  tabs: [
    { label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', to: 'CPh1-CoachPhoneHome' },
    { label: 'Coming', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', to: 'CPh2-CoachPhoneComing' },
    { label: 'Messages', icon: 'M4 5h16v11H8l-4 4z', to: 'CPh3-CoachPhoneMessages' },
    { label: 'Game', icon: 'M5 21V4h11l-2 4 2 4H5', to: 'CPh4-CoachPhoneGame' },
  ],
  // Not on the board: the two ways in the old home had that nothing else on the coach's phone leads to.
  links: [{ label: 'Before kick-off', to: 'QCp1-BeforeKickOffPhone' }, { label: 'Log an incident', to: 'CNp18-IncidentLog' }],
}

// Academy player. "My week".
export const ACK1: PhoneHomeCfg = {
  id: 'ACK1-AcademyPlayerHome', roleLine: 'Tall Timber · Advanced', greeting: 'Hi Kai', avatar: 'KO', me: 'ME-academyplayer',
  now: { title: 'Tonight · 10 minutes at home', sub: 'Left-foot wall strikes · 2 of 3 done', btn: 'Start', to: 'ACK2-HomePractice' },
  progress: {
    label: 'MY PROGRESS · SINCE I JOINED',
    headline: 'Your first touch is up a step. In week 4 you were on step 2.',
    figures: [{ label: 'First touch', then: 'Step 2', now: 'Step 3 of 5' }, { label: 'Striking the ball', then: 'Step 2', now: 'Step 2 of 5' }],
    btn: { label: 'Watch then and now', film: true, to: 'ACK2-HomePractice' },
  },
  dev: { title: 'What I’m working on', rows: [
    { chip: '1', chipBg: '#eef5f2', title: 'Score with your left foot in a game', sub: 'My goal this term · 3 in training so far', to: 'ACK2-HomePractice' },
    { chip: 'R', chipBg: '#e8cfcf', title: 'From Reece: your left-foot finish', sub: '“Look how your hips open here.”', to: 'ACK2-HomePractice' },
  ] },
  over: { name: 'My week', title: 'My week', rows: [
    { label: 'Practice at home', value: '2 of 3', to: 'ACK2-HomePractice' },
    { label: 'Thu 5:30 Advanced · 6:45 one-on-one', value: 'Tonight', to: 'ACK1-AcademyPlayerHome' },
    { label: 'Only you, your mum and your coaches see this', value: 'Always', to: 'ACK1-AcademyPlayerHome' },
  ] },
  tabs: [
    { label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', to: 'ACK1-AcademyPlayerHome' },
    { label: 'Practice', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z', to: 'ACK2-HomePractice' },
  ],
  // Not on the board: the academy handover says ADK1, ADK2 and ADK4 are reached from here, so each has a plain link.
  links: [{ label: 'How am I going?', to: 'ADK1-MySkills' }, { label: 'My six clips', to: 'ADK2-MyClips' }, { label: 'Today’s check-in', to: 'ADK4-CheckIn' }],
}

/** Every phone home by its full id. */
export const PHONE_HOMES: Record<string, PhoneHomeCfg> = {
  'STO16-HomeStoryManager': STO16,
  'STO17-HomeStoryParent': STO17,
  'STO18-HomeStoryPlayerYoung': STO18,
  'STO19-HomeStoryPlayerOlder': STO19,
  'STO20-HomeStoryReferee': STO20,
  'CPh1-CoachPhoneHome': CPH1,
  'ACK1-AcademyPlayerHome': ACK1,
}
