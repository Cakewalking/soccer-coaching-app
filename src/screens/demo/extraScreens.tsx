import LearnPhone from '../learn/LearnPhone'
import EducationPhone from '../learn/EducationPhone'
import FamilyApp, { FamilyClubPage } from '../family/FamilyApp'
import { isEduId } from '../learn/library'
import { useState, type ReactNode } from 'react'
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
import CaptureFlow, { isCaptureId } from '../capture/CaptureFlow'
import QCp1BeforeKickOffPhone from '../capture/QCp1BeforeKickOffPhone'
import ChancesFlow, { isChanceId } from '../chances/ChancesFlow'
import XGp1ChancesParent, { miaU12 } from '../chances/XGp1ChancesParent'
import TrialPackPhone from '../trial/TrialPackPhone'
import SessionFramed from '../session/SessionFramed'
import { KC2FiveClubs, KCSession, KC8Report, KCParent, isSessionBoard } from '../clubadmin/ClubColourBoards'
import { CNp1PlayerSelfReview, CNp3SessionFeedback, CNp5PlayerGoal, CNp9SeasonReportParent, CNp10BookCatchUp, CNp11FamilyView, CNp12PulseSurvey, CNp14PlayerPassport, CNp16WeekElsewhere, CNp18IncidentLog, CNp19SidelineRating } from '../connected/CnPhone'
import { TEAM } from '../trial/trialStore'

// Design ids from the master handover that had no address of their own.
// Either the screen existed under an older key (ALIAS), or it is a state of a
// screen that takes `empty` (renderExtraScreen). /__screen/<id> works for both.

const noop = () => {}

const LIVE_COACH_TAB = new Set([
  'CN9-SeasonReport', 'CN10-CatchUps', 'CN13-Handover', 'CN4-SessionsLanded', 'CN8-WhatWorked', 'CN17-SetPieces',   // the connected club: coach tabs
  'CF1-Fixtures', 'S1-PlayingStyle', 'ST1-TeamStaff', 'FB1-Formation', 'DG1-Goals', 'WL1-Wellness', 'AV1-Availability', 'P1-Consent',
  'WK1-ThisWeek', 'SG1-Suggested', 'DF0-Library', 'GT1-Growth', 'MS1-TeamSheet', 'OP1-Opposition', 'R1-MatchReview',
  'C2-ClipsByGame', 'C3-ClipsByPlayer', 'CL1-Playlists',
])

export const SCREEN_ALIAS: Record<string, string> = {
  // sign-in, sandbox and fault screens were registered by short code only
  'SI1-SignIn': 'SI1', 'SI2-Code': 'SI2', 'SI3-CodeWrong': 'SI3', 'SI4-CodeExpired': 'SI4', 'SI6-NewDevice': 'SI6', 'SI7-SignedOut': 'SI7',
  'SB1-SandboxEnding': 'SB1', 'SB2-SandboxEnded': 'SB2', 'SB3-NoSandbox': 'SB3', 'SB4-KeepGoing': 'SB4',
  'PLT1-PlanEnding': 'PLT1', 'PLT2-PaymentFailed': 'PLT2', 'PLT3-CancelPlan': 'PLT3', 'PLT4-PlanEnded': 'PLT4', 'PLT5-LostAccess': 'PLT5', 'PLT6-ConsentChanged': 'PLT6',
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

const page = (node: ReactNode) => <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'var(--frame-h, 100vh)', background: '#faf5ec', fontFamily: 'var(--font-sans)' }}>{node}</div>
const phone = (node: ReactNode) => <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>{node}</div>

// A measure sheet opened by its own address has no page behind it, so Close and Back go to the player's readiness page and the next-measure link opens that sheet here.
function MeasurePage({ id, onNav }: { id: string; onNav?: (s: string) => void }) {
  const [cur, setCur] = useState(id)
  const cfg = MEASURE(cur)
  return cfg ? page(<MeasureSheet cfg={cfg} onClose={() => onNav?.('PU2-PlayerReadiness')} onOpen={setCur} onNav={onNav} />) : null
}

export function renderExtraScreen(key: string): ReactNode | undefined {
  if (key.startsWith('PU8')) {
    const cfg = MEASURE(key)
    return cfg ? <MeasurePage id={key} /> : undefined
  }
  // These ids used to open an older standalone copy with few working controls. The
  // coach app's own tab is the built screen, so the id opens that tab, in its frame.
  if (LIVE_COACH_TAB.has(key) && coachDeepTab(key)) return <JuniorCoachApp initialScreen={key} />
  if (key === 'T5-PlayerProfile') return <JuniorCoachApp initialScreen={key} />              // Mia's profile, inside Squad
  if (key === 'FY1-SeasonPlan') return <ClubAdminScreen role="dof" initials="RM" initialTab="club" initialSub="seasonplan" />   // the director's Club › Season plan
  // Capture quality (17 Nov): the set-up steps, the report and How we measure, in the coach frame.
  if (isCaptureId(key)) return <CaptureFlow framed start={key} kitless={key === 'QC1e-CapturePlanNoKit'} />
  // Chances and points (17 Nov, v2): the coach screens in their frame; MiniRoos ids open the under-9 team.
  if (isChanceId(key)) return <ChancesFlow framed start={key} team={key.startsWith('XGm') ? 'u9' : 'u12'} />
  // The connected club (17 Nov): phone screens, and tablet screens in the frame they live in.
  const cnPhone: Record<string, ReactNode> = {
    'CNp1-PlayerSelfReview': <CNp1PlayerSelfReview />, 'CNp3-SessionFeedback': <CNp3SessionFeedback />, 'CNp5-PlayerGoal': <CNp5PlayerGoal />, 'CNp9-SeasonReportParent': <CNp9SeasonReportParent />,
    'CNp10-BookCatchUp': <CNp10BookCatchUp />, 'CNp11-FamilyView': <CNp11FamilyView />, 'CNp12-PulseSurvey': <CNp12PulseSurvey />, 'CNp14-PlayerPassport': <CNp14PlayerPassport />, 'CNp14o-PlayerPassportOwn': <CNp14PlayerPassport own />,
    'CNp16-WeekElsewhere': <CNp16WeekElsewhere />, 'CNp18-IncidentLog': <CNp18IncidentLog />, 'CNp19-SidelineRating': <CNp19SidelineRating />,
  }
  if (key in cnPhone) return <div style={{ display: 'flex', justifyContent: 'center' }}>{cnPhone[key]}</div>
  // The justified session (18 Nov): coach screens in U11 Luke's frame, as drawn; the director's sources; the parent's films.
  if (/^GS(1|2|3|4|5|6|7|8)-/.test(key) || (/^LN(\d|L\d)/.test(key) && !key.startsWith('LN9'))) return <SessionFramed start={key} />
  // Club colours: the setting screen in its four states, and the boards that show the theme at other clubs.
  if (/^KC(1|1c|1e|3|4)-/.test(key)) return <ClubAdminScreen role="dof" initials="RM" initialTab="club" initialSub={key} />
  if (key === 'LN9-ClubCoachLearning') return <ClubAdminScreen role="dof" initials="RM" initialTab="coaches" initialSub="learning" />
  if (key === 'LNp1-LessonPhone' || key === 'LNp2-HowItWentPhone') return <LearnPhone start={key} />
  // The Education centre (20 Nov): the coach's pages in U9 Tom's frame, as drawn; the director's page; the phones.
  if (isEduId(key)) return <div style={{ width: 1180, margin: '0 auto', background: 'var(--surface-100)' }}><MiniRoosApp onBack={noop} initialScreen={key} /></div>
  if (key === 'EC10-DirectorLibrary') return <ClubAdminScreen role="dof" initials="RM" initialTab="coaches" initialSub="education" />
  if (/^ECp[123]-/.test(key)) return <EducationPhone start={key} />
  // Clean Sheet Family (20 Nov): a parent's own filming, paid for with credits, whether or not the club has joined.
  if (key === 'FAMc1-ClubInterest') return <FamilyClubPage />
  if (/^FAM(\d|t\d|k\d|i\d)/.test(key)) return <FamilyApp key={key} start={key} />
  if (key === 'KC2-FiveClubs') return <KC2FiveClubs />
  if (isSessionBoard(key)) return <KCSession id={key} />
  if (key === 'KC8-ReportClubColours') return <KC8Report />
  if (/^KCp[123]-/.test(key)) return <KCParent start={key} />
  if (key === 'SG1-Suggested') return <JuniorCoachApp initialScreen="GS1-ProposedSession" />   // Suggested is folded into Tuesday’s session
  if (key === 'GS11-DrillSources') return <ClubAdminScreen role="dof" initials="RM" initialTab="coaches" initialSub="sources" />
  // Football at home is now the family's side of the Education centre (ECp1 and ECp2 replace GSp9 and GSp10).
  if (key === 'GSp9-HomeLibrary' || key === 'GSp10-HomeVideo') return <EducationPhone start={key === 'GSp9-HomeLibrary' ? 'ECp1-FamilyLibrary' : 'ECp2-FamilyItem'} team="u11" child="Ari" />
  if (key === 'GSp9m-HomeLibraryMia' || key === 'GSp10m-HomeVideoMia') return <EducationPhone start={key === 'GSp9m-HomeLibraryMia' ? 'ECp1-FamilyLibrary' : 'ECp2-FamilyItem'} team="u12" child="Mia" ini="LT" />
  if (key === 'CN2-SelfVsCoach') return <JuniorCoachApp initialScreen={key} />
  if (key === 'CN15-PositionHistory') return <div style={{ width: 1180, margin: '0 auto', background: 'var(--surface-100)' }}><MiniRoosApp onBack={noop} empty={false} initialScreen="positions" /></div>
  if (key === 'CN6-Observation' || key === 'CN7-CoachLoad') return <ClubAdminScreen role="dof" initials="RM" initialTab="coaches" initialSub={key === 'CN6-Observation' ? 'observations' : 'coachload'} />
  if (['CN12-ClubClimate', 'CN20-Sponsors', 'CN21-Pitches', 'CN22-LanguageAccess', 'CN23-AskLimits'].includes(key)) return <ClubAdminScreen role="dof" initials="RM" initialTab="club" initialSub={key} />
  switch (key) {
    case 'XG5-ClubChances': return <ClubAdminScreen role="dof" initials="RM" initialTab="teams" initialTeamsView="chances" />
    // Trial pack on the family's phone: Mia's parent, and Cal (under 16) on his own phone
    case 'TPp1-TrialPackParent': return <div style={{ display: 'flex', justifyContent: 'center' }}><TrialPackPhone as="parent" team="u12" player={TEAM.u12.squad.find(p => p.ini === 'MT')!} home="STO17-HomeStoryParent" /></div>
    case 'TPp1-TrialPackPlayer': return <div style={{ display: 'flex', justifyContent: 'center' }}><TrialPackPhone as="player" team="u16" player={TEAM.u16.squad.find(p => p.ini === 'CW')!} home="STO19-HomeStoryPlayerOlder" /></div>
    case 'XGp1-ChancesParentMia': return <div style={{ display: 'flex', justifyContent: 'center' }}><XGp1ChancesParent data={miaU12()} initials="LT" /></div>
    case 'XGp1-ChancesParent': return <div style={{ display: 'flex', justifyContent: 'center' }}><XGp1ChancesParent /></div>
    case 'QC11-ClubCaptureRules': return <ClubAdminScreen role="dof" initials="RM" initialTab="features" initialFeature="QC11-ClubCaptureRules" />
    case 'QCp1-BeforeKickOffPhone': return <div style={{ display: 'flex', justifyContent: 'center' }}><QCp1BeforeKickOffPhone /></div>
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
    // Learn is on every parent account and every player account from 15 up
    case 'LEARN-Parent':         return phone(<EDUp1PlayerLearn embedded audience="parent" />)
    case 'LEARN-AcademyParent':  return phone(<EDUp1PlayerLearn embedded audience="academyparent" />)
    case 'LEARN-PlayerAdult':    return phone(<EDUp1PlayerLearn embedded audience="adult" />)
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
