export type AdminTab = 'club' | 'teams' | 'coaches' | 'players' | 'safeguarding' | 'reports'

export type MRTeam = { name: string; level: string; coach: string; players: number; turnout: number; style?: number; alert?: string }
export type JrTeam = { name: string; div: string; coach: string; players: number; turnout: number; style: number; lastFive: string[]; alert?: string }
export type CoachRow = { ini: string; name: string; team: string; training: string; check: string; checkDays: number; sessions: string; games: string; results: string; style: number; turnout: number; recorded: string; helpNote?: string }
export type FairRow = { team: string; coach: string; pct: number; status: 'ok' | 'close' | 'under3' | 'under4' }
export type GradingRow = { team: string; asked: string; gave: string; since: string; suggestion: 'Stay' | 'Ask to move down' | 'Watch' }
export type Concern = { id: string; date: string; team: string; subject: string; status: 'open' | 'resolved'; assignee: string }
export type Concussion = { ini: string; name: string; team: string; headKnock: string; day: number; total: number; status: string; stage: number; note: string; action: string }

export const MINIROOS: MRTeam[] = [
  { name: 'U7 Dan', level: 'Wallabies', coach: 'Dan Okafor', players: 12, turnout: 91 },
  { name: 'U8 Hannah', level: 'Wallabies', coach: 'Hannah Reid', players: 13, turnout: 68 },
  { name: 'U9 Mark', level: 'Kangaroos', coach: '', players: 14, turnout: 84, alert: 'No coach Sat' },
  { name: 'U9 Tom', level: 'Joeys', coach: 'Tom Albers', players: 14, turnout: 93 },
  { name: 'U10 Nadia', level: 'Wallabies', coach: 'Nadia Rahman', players: 16, turnout: 86, style: 64 },
]

export const JUNIORS: JrTeam[] = [
  { name: 'U11 Girls Kate', div: 'Kangaroos', coach: 'Kate Moretti', players: 14, turnout: 90, style: 70, lastFive: ['W','D','W','W','W'] },
  { name: 'U11 Luke', div: 'Wallabies', coach: 'Luke Fraser', players: 15, turnout: 79, style: 52, lastFive: ['W','W','D','L','L'] },
  { name: 'U12 Sam', div: 'Division 1', coach: 'Sam K', players: 17, turnout: 92, style: 78, lastFive: ['W','W','D','L','W'] },
  { name: 'U12 Girls Ana', div: 'Division 1', coach: 'Ana Silva', players: 15, turnout: 94, style: 74, lastFive: ['W','D','W','W','W'], alert: 'Video gaps' },
  { name: 'U13 Chris', div: 'Division 2', coach: 'Chris Pham', players: 17, turnout: 81, style: 58, lastFive: ['L','W','L','L','D'], alert: 'Video gaps' },
  { name: 'U13 Girls Meg', div: 'Division 2', coach: 'Meg Doyle', players: 16, turnout: 89, style: 69, lastFive: ['W','W','D','W','D'] },
  { name: 'U14 Josh', div: 'Division 2', coach: 'Josh Kerr', players: 18, turnout: 83, style: 61, lastFive: ['D','L','W','W','W'] },
  { name: 'U15 Girls Bec', div: 'Division 2', coach: 'Bec Ward', players: 15, turnout: 85, style: 66, lastFive: ['W','L','W','D','D'], alert: 'Video gaps' },
  { name: 'U16 Ollie', div: 'Division 1', coach: 'Ollie Grant', players: 14, turnout: 76, style: 55, lastFive: ['L','D','W','L','L'], alert: 'Heavy legs' },
]

export const COACHES_DATA: CoachRow[] = [
  { ini: 'SK', name: 'Sam K', team: 'U12 Sam', training: 'C Diploma', check: 'Valid Mar 2028', checkDays: 0, sessions: '12 of 12', games: '6 of 6', results: '6W · 0D · 0L', style: 78, turnout: 92, recorded: '6 of 6' },
  { ini: 'AS', name: 'Ana Silva', team: 'U12 Girls Ana', training: 'Foundation of Football', check: 'Valid Aug 2027', checkDays: 0, sessions: '12 of 12', games: '6 of 6', results: '5W · 1D · 0L', style: 74, turnout: 94, recorded: '6 of 6', helpNote: 'U12 Girls Ana press the way the club wants. Good pair for newer coaches.' },
  { ini: 'KM', name: 'Kate Moretti', team: 'U11 Girls Kate', training: 'MiniRoos course', check: 'Valid Jan 2028', checkDays: 0, sessions: '11 of 12', games: '5 of 6', results: '4W · 1D · 0L', style: 70, turnout: 90, recorded: '5 of 6' },
  { ini: 'CP', name: 'Chris Pham', team: 'U13 Chris', training: 'Foundation of Football', check: 'Ends in 9 days', checkDays: 9, sessions: '8 of 12', games: '2 of 6', results: '1W · 1D · 3L', style: 58, turnout: 81, recorded: '3 of 6', helpNote: 'Pair him with Ana Silva for two sessions. Her U12 Girls Ana press the way the club wants.' },
  { ini: 'LF', name: 'Luke Fraser', team: 'U11 Luke', training: 'Club course due', check: 'Ends in 12 days', checkDays: 12, sessions: '6 of 12', games: '3 of 6', results: '2W · 1D · 2L', style: 52, turnout: 79, recorded: '3 of 6' },
  { ini: 'BW', name: 'Bec Ward', team: 'U15 Girls Bec', training: 'C Diploma', check: 'Ends in 26 days', checkDays: 26, sessions: '10 of 12', games: '2 of 6', results: '3W · 2D · 1L', style: 66, turnout: 85, recorded: '2 of 6' },
  { ini: 'PS', name: 'Priya Shah', team: 'Fitness · 4 teams', training: 'Sports science', check: 'Ends in 29 days', checkDays: 29, sessions: '—', games: '—', results: '—', style: 0, turnout: 0, recorded: '—' },
  { ini: 'OG', name: 'Ollie Grant', team: 'U16 Ollie', training: 'Foundation of Football', check: 'Valid Jun 2027', checkDays: 0, sessions: '9 of 12', games: '4 of 6', results: '2W · 1D · 3L', style: 55, turnout: 76, recorded: '4 of 6' },
  { ini: 'TA', name: 'Tom Albers', team: 'U9 Tom', training: 'Club course due', check: 'Valid Nov 2027', checkDays: 0, sessions: '10 of 12', games: '—', results: '—', style: 0, turnout: 0, recorded: '—' },
]

export const FAIR_TIME: FairRow[] = [
  { team: 'U7 Dan', coach: 'Dan Okafor', pct: 60, status: 'ok' },
  { team: 'U8 Hannah', coach: 'Hannah Reid', pct: 58, status: 'ok' },
  { team: 'U9 Mark', coach: 'Mark Ellis', pct: 54, status: 'ok' },
  { team: 'U9 Tom', coach: 'Tom Albers', pct: 62, status: 'ok' },
  { team: 'U10 Nadia', coach: 'Nadia Rahman', pct: 52, status: 'ok' },
  { team: 'U11 Girls Kate', coach: 'Kate Moretti', pct: 57, status: 'close' },
  { team: 'U11 Luke', coach: 'Luke Fraser', pct: 28, status: 'under3' },
  { team: 'U12 Sam', coach: 'Sam K', pct: 55, status: 'ok' },
  { team: 'U12 Girls Ana', coach: 'Ana Silva', pct: 60, status: 'ok' },
  { team: 'U13 Chris', coach: 'Chris Pham', pct: 51, status: 'close' },
  { team: 'U13 Girls Meg', coach: 'Meg Doyle', pct: 53, status: 'ok' },
  { team: 'U14 Josh', coach: 'Josh Kerr', pct: 40, status: 'ok' },
  { team: 'U15 Girls Bec', coach: 'Bec Ward', pct: 38, status: 'ok' },
  { team: 'U16 Ollie', coach: 'Ollie Grant', pct: 22, status: 'under4' },
]

export const GRADING: GradingRow[] = [
  { team: 'U12 Sam', asked: 'Division 1', gave: 'Division 1', since: '6W · 1D · 2L', suggestion: 'Stay' },
  { team: 'U12 Girls Ana', asked: 'Division 1', gave: 'Division 1', since: '7W · 1D · 1L', suggestion: 'Stay' },
  { team: 'U13 Chris', asked: 'Division 2', gave: 'Division 1', since: '1W · 2D · 6L', suggestion: 'Ask to move down' },
  { team: 'U13 Girls Meg', asked: 'Division 2', gave: 'Division 2', since: '6W · 1D · 2L', suggestion: 'Stay' },
  { team: 'U14 Josh', asked: 'Division 2', gave: 'Division 1', since: '3W · 3D · 3L', suggestion: 'Stay' },
  { team: 'U15 Girls Bec', asked: 'Division 2', gave: 'Division 2', since: '4W · 3D · 2L', suggestion: 'Stay' },
  { team: 'U16 Ollie', asked: 'Division 1', gave: 'Division 1', since: '2W · 1D · 6L', suggestion: 'Watch' },
]

export const CONCERNS: Concern[] = [
  { id: 'c1', date: '28 Oct', team: 'U14 Sam', subject: 'Player wellbeing — repeat low wellness', status: 'open', assignee: 'Club DSL' },
  { id: 'c2', date: '12 Oct', team: 'U12 Sam', subject: 'Sideline language complaint', status: 'resolved', assignee: 'Sam Russo' },
]

export const CONCUSSIONS: Concussion[] = [
  { ini: 'RC', name: 'Ruby Chen', team: 'U13 Girls Meg', headKnock: 'Head knock Sat 23 May · seen by GP Mon 25 May', day: 12, total: 21, status: 'No symptoms since 25 May', stage: 2, note: 'Contact training from Mon 8 Jun (14 days with no symptoms). Earliest game Sat 13 Jun (21 days), after a doctor clears her.', action: "Doctor's note" },
  { ini: 'NA', name: 'Noah Ali', team: 'U11 Luke', headKnock: 'Head knock Sat 30 May · seen by GP Sat 30 May', day: 5, total: 21, status: 'Still has headaches', stage: 0, note: 'No dates yet. The 14-day count starts when his symptoms stop.', action: 'Update symptoms' },
]
