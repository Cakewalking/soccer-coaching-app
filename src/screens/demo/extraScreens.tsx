import type { ReactNode } from 'react'
import DemoStart from './DemoStart'
import DemoStartEmpty from './DemoStartEmpty'
import DemoPhone from './DemoPhone'

const to = (path: string) => window.location.assign(path)
import ConsentScreen from '../ConsentScreen'
import ReviewScreen from '../ReviewScreen'
import DevGoalsScreen from '../DevGoalsScreen'
import WellnessScreen from '../WellnessScreen'
import FixturesScreen from '../FixturesScreen'
import ThisWeekScreen from '../ThisWeekScreen'
import ClipsScreen from '../ClipsScreen'
import TeamStaffScreen from '../TeamStaffScreen'
import SquadScreen from '../SquadScreen'
import PitchSideScreen from '../PitchSideScreen'
import SuggestionsScreen from '../SuggestionsScreen'
import PlayerProfileScreen from '../PlayerProfileScreen'
import FitnessCoachScreen from '../FitnessCoachScreen'
import ClubAdminScreen from '../ClubAdminScreen'
import AcademyParentApp from '../AcademyParentApp'
import FootballYearScreen from '../miniroos/FootballYearScreen'
import SessionPlans from '../drillibrary/SessionPlans'
import TermPlanner from '../drillibrary/TermPlanner'
import MeasureSheet from '../measures/MeasureSheet'
import { MEASURE } from '../measures/data'
import EDUp1PlayerLearn from '../step4/EDUp1PlayerLearn'
import MiniRoosApp from '../miniroos/MiniRoosApp'
import JuniorCoachApp, { coachDeepTab } from '../JuniorCoachApp'

// Design ids from the master handover that had no address of their own.
// Either the screen existed under an older key (ALIAS), or it is a state of a
// screen that takes `empty` (renderExtraScreen). /__screen/<id> works for both.

const noop = () => {}

const LIVE_COACH_TAB = new Set([
  'CF1-Fixtures', 'S1-PlayingStyle', 'ST1-TeamStaff', 'FB1-Formation', 'DG1-Goals', 'WL1-Wellness', 'AV1-Availability', 'P1-Consent',
  'WK1-ThisWeek', 'SG1-Suggested', 'DF0-Library', 'GT1-Growth', 'MS1-TeamSheet', 'OP1-Opposition', 'R1-MatchReview',
  'C2-ClipsByGame', 'C3-ClipsByPlayer', 'CL1-Playlists',
])

export const SCREEN_ALIAS: Record<string, string> = {
  // sign-in, sandbox and fault screens were registered by short code only
  'SI1-SignIn': 'SI1', 'SI2-Code': 'SI2', 'SI3-CodeWrong': 'SI3', 'SI4-CodeExpired': 'SI4', 'SI6-NewDevice': 'SI6', 'SI7-SignedOut': 'SI7',
  'SB1-SandboxEnding': 'SB1', 'SB2-SandboxEnded': 'SB2', 'SB3-NoSandbox': 'SB3', 'SB4-KeepGoing': 'SB4',
  'ER1-SomethingWrong': 'ER1', 'ER2-UploadFailed': 'ER2', 'ER3-Loading': 'ER3', 'ER4-NotFound': 'ER4', 'ER5-NoAccess': 'ER5',
  'SIp1-SignIn': 'SIp1', 'SIp2-Code': 'SIp2', 'SIp3-CodeProblem': 'SIp3', 'ERp1-SomethingWrong': 'ERp1', 'ERp2-NotFound': 'ERp2',
  'PA-Thanks': 'pa-thanks',
  // empty states registered under lower-case keys
  'X1-HomeEmpty': 'home-e', 'XP1-PlayerEmpty': 'playeryoung-e', 'PAe-ParentEmpty': 'parent-e', 'FN1e-SeniorsEmpty': 'seniors-e',
  'HG1e-HomeKeeperCoachEmpty': 'goalkeeper-e', 'FV1e-FeesVolunteersEmpty': 'coordinator-e',
  'ACP3e-AcademyParentHomeEmpty': 'acp3-home-e', 'ACP5e-ProgressReportEmpty': 'acp5-report-e', 'ACP8e-BookClinicEmpty': 'acp8-clinic-e',
  // old homes: every role has one story home now (handover part 5a)
  'HY1-HomeYouth': 'STO6-HomeStoryYouth', 'CC1-CoachHomeShared': 'STO7-HomeStoryAssistant', 'PO5-AdultPlayerHome': 'STO19-HomeStoryPlayerOlder',
  // flows are entered at their first step
  'GameIn': 'GI0-Recording', 'StyleFlow': 'SF0-Intro',
  // the older Ask set was redrawn as ASKd*
  'ASK1-HomeWithAsk': 'ASKd1-HomeRest', 'ASK2-AskMinimised': 'ASKd3-AnyScreen', 'ASK3-AskOpen': 'ASKd5-PanelAnswer', 'ASK3e-AskOpenFirst': 'ASKd4-PanelFirst', 'ASKp1-PhoneAsk': 'ASKd8-PhoneHome',
  // states with no separate drawing in the build: show the screen they are a state of
  'FO1e-BackOnline': 'FO1-Offline', 'SP21e-StandInHomeEmpty': 'SP21-StandInHome', 'FT1e-TrialsEmpty': 'FT1-Trials',
}

const page = (node: ReactNode) => <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f7f8f7', fontFamily: 'var(--font-sans)' }}>{node}</div>
const phone = (node: ReactNode) => <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>{node}</div>

export function renderExtraScreen(key: string): ReactNode | undefined {
  if (key.startsWith('PU8')) {
    const cfg = MEASURE(key)
    return cfg ? page(<MeasureSheet cfg={cfg} onClose={noop} onOpen={noop} />) : undefined
  }
  // These ids used to open an older standalone copy with few working controls. The
  // coach app's own tab is the built screen, so the id opens that tab, in its frame.
  if (LIVE_COACH_TAB.has(key) && coachDeepTab(key)) return <JuniorCoachApp initialScreen={key} />
  switch (key) {
    // The role pickers, and the three older ids they replace.
    case 'STA3-PickRole': case 'DEMO-Start':
    case 'STA3l-PickRoleLook':
      return <DemoStart initialMode={key === 'STA3l-PickRoleLook' ? 'look' : undefined} onTour={r => to(`/tour/${r}`)} onLook={r => to(`/look/${r}`)} onStory={() => to('/tour/story')} onWhy={() => to('/why')} onSandbox={() => to('/sandbox')} />
    case 'STA3e-PickRoleEmpty': case 'DEMO-StartEmpty':
      return <DemoStartEmpty onRole={(r, scr) => to(scr ? `/sandbox/${r}/${scr}` : `/sandbox/${r}`)} onSwitchToDemo={() => to('/start')} />
    case 'STA3p-PickRolePhone': case 'DEMO-Phone':
      return <div style={{ width: 390, margin: '0 auto' }}><DemoPhone onLook={r => to(`/look/${r}`)} onWhy={() => to('/why')} onSandbox={() => to('/sandbox')} /></div>
    // The player's Learn tab, opened from the phone home (which keeps its own tab bar)
    case 'LEARN-PlayerYoung':    return phone(<EDUp1PlayerLearn embedded />)
    case 'LEARN-PlayerOlder':    return phone(<EDUp1PlayerLearn embedded older />)
    case 'EDU5-CoachCorner':     return <div style={{ width: 1180, margin: '0 auto', background: 'var(--surface-100)' }}><MiniRoosApp onBack={noop} initialScreen="learncoaches" /></div>
    case 'X2-SquadEmpty':        return page(<SquadScreen role="head" onPlayerProfile={noop} empty />)
    case 'ST1e-TeamStaffEmpty':  return page(<TeamStaffScreen empty />)
    case 'X5-ProfileEmpty':      return page(<PlayerProfileScreen playerIni="MT" empty />)
    case 'X8-ReviewEmpty':       return page(<ReviewScreen empty />)
    case 'X9-ConsentEmpty':      return page(<ConsentScreen empty />)
    case 'X12-GoalsEmpty':       return page(<DevGoalsScreen empty />)
    case 'X13-WellnessEmpty':    return page(<WellnessScreen empty />)
    case 'X14-FixturesEmpty':    return page(<FixturesScreen empty />)
    case 'X15-WeekEmpty':        return page(<ThisWeekScreen empty />)
    case 'X3-TrainingEmpty':     return page(<ThisWeekScreen empty />)
    case 'X17-PlaylistsEmpty':   return page(<ClipsScreen empty activeTab={3} />)
    case 'SG1e-SuggestedEmpty':  return page(<SuggestionsScreen empty />)
    case 'TR1e-PitchSideEmpty':  return <PitchSideScreen onClose={noop} empty />
    case 'X4-MatchEmpty':        return <FitnessCoachScreen empty initialScreen="matchday" />
    case 'F4e-FitnessMatchEmpty': return <FitnessCoachScreen empty initialScreen="matchday" />
    case 'F2-FitnessSquad':      return <FitnessCoachScreen initialScreen="squad" />
    case 'F5-FitnessReview':     return <FitnessCoachScreen initialScreen="matchday" />
    case 'FF1e-LeagueSyncEmpty': return <ClubAdminScreen empty role="dof" initials="RM" initialTab="leaguesync" />
    case 'FR1e-RefereesEmpty':   return <ClubAdminScreen empty role="dof" initials="RM" initialTab="referees" />
    case 'FD1e-CardsEmpty':      return <ClubAdminScreen empty role="dof" initials="RM" initialTab="teams" />
    case 'ACP11e-AcademyParentChatEmpty': return phone(<AcademyParentApp onBack={noop} empty initialModal="chat" />)
    case 'SPm1-MiniRoosYear':    return page(<FootballYearScreen onBack={noop} />)
    case 'DL1-SessionPlans':     return page(<SessionPlans onBack={noop} />)
    case 'DL2-TermPlanner':      return page(<TermPlanner onBack={noop} />)
  }
  return undefined
}
