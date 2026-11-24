// The dashboards by id, for /__screen/<id>. Each opens in its role's frame, in the state drawn.
// The three ids the dashboards replace open what replaces them.

import type { ReactNode } from 'react'
import JuniorCoachApp from '../JuniorCoachApp'
import ClubAdminScreen from '../ClubAdminScreen'
import CoachTabletFrame from '../CoachTabletFrame'
import CoachPhoneApp, { CPh4eCoachPhoneGameEmpty } from '../coachphone/CoachPhoneApp'
import { openScreen } from '../openThing'
import { ADC7GameReview, ADC7eGameReviewEmpty } from './ADC7GameReview'
import { MINI_BOARD } from './data'
import DashEmpty from './DashEmpty'
import RD3MiniRoosReview from './RD3MiniRoosReview'

/** Old id to the dashboard that replaced it. */
export const DASH_REPLACES: Record<string, string> = { 'R1-MatchReview': 'RD1-GameReview', 'GS7-SeasonLookBack': 'RD2-SeasonSoFar', 'MS3-MiniRoosReview': 'RD3-MiniRoosReview' }

// RD3 as its board draws it: U8 Wombats' menu, with four items under Match day.
const MINI_NAV = [
  { id: 'T1-TabletTraining', label: 'Home', icon: 'M4 11l8-7 8 7v9H4z' },
  { id: 'T4-SquadTab', label: 'Squad', icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5' },
  { id: 'T3-TrainingTab', label: 'Training', icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4' },
  { id: 'T2-TabletMatch', label: 'Match day', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z' },
  { id: 'C1-ClipsTab', label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
  { id: 'REC1-RecordHub', label: 'Record', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z' },
]
const MINI_SUBS: Array<[string, string]> = [['Turns', 'HM4-GameDayMiniRoos'], ['Review', 'RD3-MiniRoosReview'], ['What we saw', 'HM5-WhatWeSaw'], ['Thank the parents', 'HM5b-ThankParents']]

function RD3Board({ onNav, empty = false }: { onNav?: (id: string) => void; empty?: boolean }) {
  const go = (id: string) => { if (id === 'RD3-MiniRoosReview' || id === 'home') return; if (onNav) onNav(id); else openScreen(id) }
  return (
    <CoachTabletFrame navTabs={MINI_NAV} activeNav="T2-TabletMatch" onNav={go} subTabs={MINI_SUBS.map(s => s[0])} activeSubTabIndex={1} onSubTab={i => go(MINI_SUBS[i][1])}
      roleChip="Head coach" teamLabel="U8 Wombats" onTeam={() => go('VS1-SwitchView')} avatarLetters="SK" showAsk={false}>
      {empty ? <DashEmpty id="RD3e-MiniRoosReviewEmpty" go={go} /> : <RD3MiniRoosReview review={MINI_BOARD} go={go} />}
    </CoachTabletFrame>
  )
}

/** The screen for a dashboard id (or an id a dashboard replaced), or null when the id is not one of these. */
export function renderDashboardScreen(key: string): ReactNode | null {
  const id = DASH_REPLACES[key] ?? key
  switch (id) {
    case 'RD1-GameReview': case 'RD2-SeasonSoFar': return <JuniorCoachApp key={id} initialScreen={id} />
    case 'RD3-MiniRoosReview': return <RD3Board />
    case 'RD4-ClubWeekend': return <ClubAdminScreen role="dof" initials="RM" initialTab="teams" initialTeamsView="weekend" />
    case 'RD5-CoachPhoneReview': return <div style={{ display: 'flex', justifyContent: 'center' }}><CoachPhoneApp initialTab="game" initialReview /></div>
    case 'RD2e-SeasonSoFarEmpty': return <JuniorCoachApp key={id} empty initialScreen="RD2-SeasonSoFar" />
    case 'RD3e-MiniRoosReviewEmpty': return <RD3Board empty />
    case 'RD4e-ClubWeekendEmpty': return <ClubAdminScreen empty role="dof" initials="RM" initialTab="teams" initialTeamsView="weekend" />
    case 'RD5e-CoachPhoneReviewEmpty': return <div style={{ display: 'flex', justifyContent: 'center' }}><CPh4eCoachPhoneGameEmpty initialReview /></div>
    case 'ADC7-GameReview': return <ADC7GameReview />
    case 'ADC7e-GameReviewEmpty': return <ADC7eGameReviewEmpty />
  }
  return null
}
