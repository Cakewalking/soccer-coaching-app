import type { PhoneCfg } from './HomeStory'

// Phone Homes (STO16–STO22). Tabs and open-buttons carry real targets;
// answer/confirm buttons stay as change (tool).

export const STO16: PhoneCfg = {
  id: 'STO16-HomeStoryManager', roleLine: 'U12 Sam · Team manager', greeting: 'Hi Rob', avatar: 'RO',
  tabs: [{ label: 'Home', target: 'TM1-ManagerHome' }, { label: 'Game day', target: 'TM2-ManagerGameDay' }, { label: 'Messages', target: 'TM5-ManagerMessages' }, { label: 'Roster', target: 'TM4-DutyRoster' }],
  blocks: [
    { kind: 'proof', label: 'SATURDAY · 9:30 AWAY v HARBOUR ROVERS', headline: 'Saturday is sorted. 14 are coming and every job is taken.', second: 'On Monday six families hadn’t answered. Two to go.', bars: [{ n: '6', when: 'Mon' }, { n: '4', when: 'Wed' }, { n: '2', when: 'Today', amber: true }], unit: 'families still to answer', btn: 'Nudge the two' },
    { kind: 'ready', when: 'SAT 6 JUNE · MEET 8:45 am · REDGUM RESERVE', title: 'Game-day papers are ready', text: 'Team sheet, map to the ground, who has oranges and the hi-vis.', btns: [{ label: 'Open the papers', target: 'TM11-GameDayPapers' }, { label: 'Send' }] },
    { kind: 'done', title: 'Done for you', lines: ['Reminder sent to six families', 'Oranges: the Patels · Hi-vis: Linh', 'Lift found for Jai', 'Sam has the numbers for his line-up'] },
    { kind: 'needs', count: 1, title: 'A parent asked about kit sizes', target: 'TM5-ManagerMessages' },
  ],
}

export const STO17: PhoneCfg = {
  id: 'STO17-HomeStoryParent', roleLine: 'Wattle Creek FC · parent', greeting: 'Mia and Bao', avatar: 'LT',
  tabs: [{ label: 'Home', target: 'PA-ParentHome' }, { label: 'Clips', target: 'PA-Clip' }, { label: 'Messages', target: 'PM1-ParentChats' }, { label: 'Me', target: 'PS1-ParentSettings' }],
  blocks: [
    { kind: 'proof', label: 'MIA · U12 SAM · SATURDAY', headline: 'Mia won the ball back four times on Saturday. Sam sent you the clip.', second: 'Her goal this term is pressing as a pair. A month ago she did it once a game.', clip: { duration: '0:12', note: 'Only you, Mia and her coaches can see this.' }, btn: 'Watch Mia’s 12 seconds', btnTarget: 'PA-Clip' },
    { kind: 'list', label: 'THIS WEEK', title: 'Two things to be at', text: 'Thu 5:45 pm training. Sat 9:30 am away at Harbour Rovers: you said yes.' },
    { kind: 'list', title: 'Bao: answer for Saturday', text: 'Bao · U8 Hannah. First go in goal on Saturday. Hannah sent a photo', action: 'Bao: answer for Saturday', actionTarget: 'AV2-ParentAvailability' },
    { kind: 'done', title: 'Done for you', lines: ['Canteen shift Sat 10 to 11 is in your calendar'] },
  ],
}

export const STO18: PhoneCfg = {
  id: 'STO18-HomeStoryPlayerYoung', roleLine: 'U12 Sam', greeting: 'Hi Mia', avatar: 'MT',
  tabs: [{ label: 'Home', target: 'PA-PlayerApp' }, { label: 'Clips', target: 'PA-Clip' }, { label: 'Goals', target: 'PA-Goals' }, { label: 'Me', target: 'PS4-PlayerMe' }],
  blocks: [
    { kind: 'proof', label: 'SATURDAY AT IRONBARK UNITED', headline: 'You won the ball back four times. That is your goal, and it is your best yet.', second: 'Sam says: “Great pressing. Watch how you and Jai close together.”', bars: [{ n: '1', when: '9 May' }, { n: '2', when: '23 May' }, { n: '4', when: 'Saturday', amber: true }], unit: 'times you won it back', btn: 'Watch my clip', btnTarget: 'PA-Clip' },
    { kind: 'ready', when: 'THURSDAY · 5:45 pm', title: 'Your one thing for training', text: 'Press as a pair with Jai. When he goes, you go.', btns: [{ label: 'See my goal', target: 'PA-Goals' }] },
    { kind: 'list', label: 'THIS WEEK', title: 'This week', lines: ['Thu 5:45 pm · training at Wattle Creek Reserve', 'Sat 9:30 am · away at Harbour Rovers'] },
    { kind: 'note', text: 'Mum can see everything here too' },
  ],
}

export const STO19: PhoneCfg = {
  id: 'STO19-HomeStoryPlayerOlder', roleLine: 'U16 Ollie', greeting: 'Hi Cal', avatar: 'CW',
  tabs: [{ label: 'Home', target: 'PO1-OlderHome' }, { label: 'Clips', target: 'PA-Clip' }, { label: 'Body', target: 'PO4-OlderLoad' }, { label: 'Messages', target: 'PO2-OlderMessage' }],
  blocks: [
    { kind: 'proof', label: 'SAT 30 MAY · DREW 2–2 v TEALSIDE TOWN', headline: 'Your top speed is 6% up on last month. Ollie says that is a real change.', second: 'You also won the ball eight times, up from six. Three clips are ready.', bars: [{ n: '27.1', when: 'April' }, { n: '27.9', when: 'May' }, { n: '28.8', when: 'Saturday', amber: true }], unit: 'km/h top speed', btn: 'Watch my three clips', btnTarget: 'PA-Clip' },
    { kind: 'ready', when: 'THURSDAY · 6:30 pm', title: 'Thursday: sprints are capped', text: 'Your load is high, so Priya has taken out the last block. 75 minutes.', btns: [{ label: 'I’m in' }, { label: 'Can’t' }] },
    { kind: 'list', label: 'THIS WEEK', title: 'This week', lines: ['How you slept and feel: 3 taps, opens at 7:00 am', 'Sat 11:00 am · at home'] },
    { kind: 'note', text: 'You choose who else sees your numbers' },
  ],
}

export const STO20: PhoneCfg = {
  id: 'STO20-HomeStoryReferee', roleLine: 'Wattle Creek FC · referees', greeting: 'Hi Zoe', avatar: 'ZP',
  tabs: [{ label: 'My games', target: 'RF2-RefGames' }, { label: 'Report', target: 'RF3-RefReport' }, { label: 'Feedback', target: 'RF4-RefFeedback' }, { label: 'Me' }],
  blocks: [
    { kind: 'proof', label: 'SIX GAMES THIS SEASON', headline: 'Four coaches said thanks after your games. One wrote: “Calm and fair. The kids loved her.”', second: 'You have gone from one game to six since April.', bars: [{ n: '1', when: 'April' }, { n: '3', when: 'May' }, { n: '6', when: 'Now', amber: true }], unit: 'games you have led', btn: 'See the kind words', btnTarget: 'RF4-RefFeedback' },
    { kind: 'ready', when: 'SAT 6 JUNE · 8:30 am · PITCH 6', title: 'Can you do U9 Tom v Northgate City?', text: 'Seven a side, 40 minutes, no score kept. Ruth is at the ground all morning.', btns: [{ label: 'Yes, I’ll do it' }, { label: 'Can’t' }] },
    { kind: 'done', title: 'Done for you', lines: ['Last week’s sideline report is closed', 'Your fee for May is with Bianca'] },
    { kind: 'note', text: 'A hi-vis vest steps in if a parent crosses the line' },
  ],
}

export const STO21: PhoneCfg = {
  id: 'STO21-HomeStoryAcademyParent', roleLine: 'Tall Timber · Advanced', greeting: 'Kai’s week', avatar: 'TO',
  tabs: [{ label: 'Home', target: 'ACP3-AcademyParentHome' }, { label: 'Progress', target: 'ACP5-ProgressReport' }, { label: 'Book', target: 'ACP8-BookClinic' }, { label: 'Fees', target: 'ACP4-ParentFees' }],
  blocks: [
    { kind: 'proof', label: 'KAI · ADVANCED · WEEK 7 OF 10', headline: 'Kai’s weak-foot pass has moved from Getting There to Strong.', second: 'Reece filmed the same drill in week 3 and week 7. Here are both.', clip: { duration: '0:15', note: 'Before and after. Only you, Kai and his coaches can see this.' }, btn: 'Watch 15 seconds', btnTarget: 'ACP5-ProgressReport' },
    { kind: 'list', label: 'THIS WEEK', title: 'Thursday and Saturday', text: 'Thu 5:30 pm at Messmate Primary. Sat 10:00 am game with U13 Timber.', action: 'Kai can’t make one', actionTarget: 'ACP6-MakeUp' },
    { kind: 'done', title: 'Done for you', lines: ['Term report lands Fri 26 June, with clips', 'Fees are paid to the end of term', 'July clinic: a place is held until 12 June'] },
  ],
}

export const STO22: PhoneCfg = {
  id: 'STO22-HomeStoryAcademyPlayer', roleLine: 'Tall Timber · Advanced', greeting: 'Hi Kai', avatar: 'KO',
  tabs: [{ label: 'Home', target: 'ACK1-AcademyPlayerHome' }, { label: 'Practice', target: 'ACK2-HomePractice' }],
  blocks: [
    { kind: 'proof', label: 'YOUR WEAK FOOT · FOUR WEEKS', headline: 'Your weak-foot pass is now Strong. Four weeks of wall practice did that.', second: 'Reece says: “Look at your standing foot in week 7. That is the difference.”', bars: [{ n: '8', when: 'Week 3' }, { n: '14', when: 'Week 5' }, { n: '20', when: 'Week 7', amber: true }], unit: 'wall passes in 30 seconds', btn: 'Watch before and after', btnTarget: 'ACK2-HomePractice' },
    { kind: 'ready', when: 'TONIGHT · 10 MINUTES', title: 'Next: receive on the half-turn', text: 'Four steps against a wall. Film the last one if you want Reece to see it.', btns: [{ label: 'Start practice', target: 'ACK2-HomePractice' }] },
    { kind: 'list', label: 'THIS WEEK', title: 'This week', lines: ['Thu 5:30 pm · Advanced at Messmate Primary', 'Thu 6:45 pm · one-on-one with Reece', 'Sat 10:00 am · game with U13 Timber'] },
  ],
}

export const PHONE_CONFIGS: Record<string, PhoneCfg> = {
  'STO16-HomeStoryManager': STO16,
  'STO17-HomeStoryParent': STO17,
  'STO18-HomeStoryPlayerYoung': STO18,
  'STO19-HomeStoryPlayerOlder': STO19,
  'STO20-HomeStoryReferee': STO20,
  'STO21-HomeStoryAcademyParent': STO21,
  'STO22-HomeStoryAcademyPlayer': STO22,
}
