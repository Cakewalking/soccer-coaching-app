// U9 Tom's squad. One list, used by Players, the player profile, Skills and Fair turns.

export type Avail = 'yes' | 'maybe' | 'away' | 'noreply'

export interface Player {
  ini: string; name: string; note: string; avail: Avail
  hadGoal: boolean; hadCaptain: boolean; helpNote: string
  history: { label: string; value: string }[]
}

export const PLAYERS: Player[] = [
  { ini: 'IC', name: 'Ivy Chen',    note: 'Loves to dribble',   avail: 'yes',     hadGoal: true,  hadCaptain: true,
    helpNote: 'Loves to dribble. Keep her wide so she gets space to run.',
    history: [{ label: 'Turn in goal', value: 'Sat 16 May' }, { label: 'Captain', value: 'Sat 2 May' }] },
  { ini: 'MB', name: 'Max Bailey',  note: 'Asks to go in goal', avail: 'yes',     hadGoal: false, hadCaptain: false,
    helpNote: 'Keen and loud. Wants to try every position. Remind him to listen first.',
    history: [{ label: 'Turn in goal', value: 'Due this week' }, { label: 'Started', value: 'All 5 games' }] },
  { ini: 'AK', name: 'Arlo Kaur',   note: 'New this term',      avail: 'yes',     hadGoal: false, hadCaptain: false,
    helpNote: 'New this term. Show him each game before it starts. Pair with Ivy.',
    history: [{ label: 'First game', value: 'Sat 30 May' }, { label: 'Started', value: '2 of 2' }] },
  { ini: 'ZM', name: 'Zara Moore',  note: 'Passes early',       avail: 'yes',     hadGoal: true,  hadCaptain: true,
    helpNote: 'Natural passer. Put her in the middle so she can link the team.',
    history: [{ label: 'Turn in goal', value: 'Sat 23 May' }, { label: 'Captain', value: 'Sat 16 May' }] },
  { ini: 'LW', name: 'Leo Wright',  note: 'Quiet, likes a job', avail: 'yes',     hadGoal: false, hadCaptain: false,
    helpNote: 'Quiet but reliable. Give him a specific job each game — he loves it.',
    history: [{ label: 'Turn in goal', value: 'Due this week' }, { label: 'Captain', value: 'Due this term' }] },
  { ini: 'EN', name: 'Evie Nolan',  note: 'Left footer',        avail: 'yes',     hadGoal: false, hadCaptain: false,
    helpNote: 'Dominant left foot. Encourage right side touches in games.',
    history: [{ label: 'Turn in goal', value: 'Sat 9 May' }, { label: 'Started', value: 'All 5 games' }] },
  { ini: 'TS', name: 'Theo Santos', note: 'Runs all day',        avail: 'yes',     hadGoal: true,  hadCaptain: false,
    helpNote: 'Endless energy. Keep him involved but remind him to look for a friend.',
    history: [{ label: 'Turn in goal', value: 'Sat 30 May' }, { label: 'Captain', value: 'Due this term' }] },
  { ini: 'PD', name: 'Poppy Dunn',  note: 'Shy with the ball',  avail: 'maybe',   hadGoal: true,  hadCaptain: true,
    helpNote: "She's shy with the ball. Pair her with Zara in the first game and give her the first kick-off.",
    history: [{ label: 'Turn in goal', value: 'Sat 16 May' }, { label: 'Captain', value: 'Sat 23 May' }, { label: 'Saturday', value: "7 — parent says maybe · school concert" }, { label: 'First-aid card', value: 'Nothing to know' }] },
  { ini: 'OH', name: 'Omar Haddad', note: 'Away next week',     avail: 'away',    hadGoal: false, hadCaptain: false,
    helpNote: 'Away this week. Back from Mon 9 Jun.',
    history: [{ label: 'Last game', value: 'Sat 23 May' }, { label: 'Turn in goal', value: 'Due this week' }] },
  { ini: 'JL', name: 'Jude Lim',    note: 'Plays futsal too',   avail: 'noreply', hadGoal: false, hadCaptain: false,
    helpNote: 'Plays futsal on Fridays. Check he is not too tired.',
    history: [{ label: 'Turn in goal', value: 'Due this week' }, { label: 'No reply yet', value: 'for Saturday' }] },
]
