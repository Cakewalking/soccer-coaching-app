// The academy coach's menu as data: six items, the same shape as a club coach, each with its
// sub-menu. Every item names the screen it opens; the screen that hosts the menu decides how to get there.

import { createContext } from 'react'
import { openScreen } from '../openThing'

export type CoachMain = 'today' | 'players' | 'training' | 'gameday' | 'record' | 'learn'
type Item = { label: string; opens: string }

/** The six main items in order, the screen each opens, and its sub-menu. */
export const COACH_MENU: Array<{ id: CoachMain; label: string; opens: string; subs: Item[] }> = [
  { id: 'today', label: 'Today', opens: 'ACC1-CoachToday', subs: [
    { label: 'Today', opens: 'ACC1-CoachToday' }, { label: 'Run a session', opens: 'ACC2-RunSession' }, { label: 'Trial player', opens: 'ACC3-TrialAssess' },
    { label: 'One-on-one', opens: 'ACC5-OneOnOne' },   // Record and Suggested are main items; chats open from Today's own button
  ] },
  { id: 'players', label: 'Players', opens: 'ADC2-Group', subs: [
    { label: 'My group', opens: 'ADC2-Group' }, { label: 'Player file', opens: 'ADC1-PlayerFile' }, { label: 'Skills check', opens: 'ADC4-SkillsCheck' },
    { label: 'Review chats', opens: 'ADC5-ReviewChats' }, { label: 'Term report', opens: 'ACC6-ReportDraft' },
  ] },
  { id: 'training', label: 'Training', opens: 'ACT1-AcademyWeek', subs: [
    { label: 'This week', opens: 'ACT1-AcademyWeek' }, { label: 'Suggested', opens: 'ACT2-AcademySuggested' }, { label: 'Session plan', opens: 'ACT3-AcademySessionPlan' },
    { label: 'Who’s coming', opens: 'ACT4-AcademyComing' }, { label: 'Practice at home', opens: 'ADC6-HomePractice' },
  ] },
  { id: 'gameday', label: 'Game day', opens: 'ACC7-AcademyGameDay', subs: [
    { label: 'This Sunday', opens: 'ACC7-AcademyGameDay' }, { label: 'Team sheet', opens: 'MS1-TeamSheet' }, { label: 'Live game', opens: 'L11-LiveGame11' }, { label: 'Review', opens: 'ADC7-GameReview' }, { label: 'Our style', opens: 'ADC8-TeamStyle' },
  ] },
  { id: 'record', label: 'Record', opens: 'ACC8-AcademyRecord', subs: [
    { label: 'Record', opens: 'ACC8-AcademyRecord' }, { label: 'Tonight’s film', opens: 'ADC3-SessionFilm' },
  ] },
  { id: 'learn', label: 'Learn', opens: 'ADC18-Learn', subs: [] },   // the academy's own Learn
]

export const SWITCH_VIEW = 'VS1-SwitchView'
/** The message button in the top bar (pack v30): where it goes, and how many chats need a reply.
 * Sample: the two chats on ACC13 that carry an unread badge (the team's families, and Dani). Chats are not in the academy's list yet. */
export const COACH_CHATS = 'ACC13-AcademyChat'
export const CHATS_TO_ANSWER = 2
/** Where the role pill ("Academy coach") goes: the roles this person holds. */
export const SWITCH_ROLE = 'ADS1-SwitchView'

/** Set by the academy coach app. A screen shown inside it leaves the menu to the app. */
export const InCoachApp = createContext(false)

/** How a screen standing on its own opens another: in its place when it was given a way to, otherwise over the top with a Back bar. */
export const coachGo = (onNav?: (id: string) => void) => (id: string) => { if (onNav) onNav(id); else openScreen(id) }
