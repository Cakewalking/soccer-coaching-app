import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import HomeScreen            from '../HomeScreen'
import TrainingScreen        from '../TrainingScreen'
import MatchDayScreen        from '../MatchDayScreen'
import SquadScreen           from '../SquadScreen'
import ReviewScreen          from '../ReviewScreen'
import SignupScreen          from '../SignupScreen'
import FitnessCoachScreen    from '../FitnessCoachScreen'
import ClubAdminScreen       from '../ClubAdminScreen'
import MiniRoosApp           from '../miniroos/MiniRoosApp'
import GoalkeeperCoachApp    from '../GoalkeeperCoachApp'
import CoordinatorPortal     from '../CoordinatorPortal'
import RolloverScreen        from '../RolloverScreen'
import SeniorsYouthCoachApp  from '../SeniorsYouthCoachApp'
import TeamManagerScreen     from '../TeamManagerScreen'
import TwoChildrenApp        from '../playerapp/TwoChildrenApp'
import PlayerAppScreen       from '../PlayerAppScreen'
import OlderPlayerApp        from '../playerapp/OlderPlayerApp'
import RefereesPhoneScreen   from '../playerapp/RefereesPhoneScreen'
import AcademyOwnerApp       from '../AcademyOwnerApp'
import AcademyCoachApp       from '../AcademyCoachApp'
import AcademyParentApp      from '../AcademyParentApp'
import AcademyPlayerApp      from '../AcademyPlayerApp'
import PlayerMeScreen        from '../playerapp/PlayerMeScreen'
import ClipsScreen           from '../ClipsScreen'
import TeamChatScreen        from '../TeamChatScreen'
import SuggestionsScreen     from '../SuggestionsScreen'
import ThisWeekScreen        from '../ThisWeekScreen'
import WellnessScreen        from '../WellnessScreen'
import OurStyleScreen        from '../OurStyleScreen'
import TeamTalkScreen        from '../TeamTalkScreen'
import PitchSideScreen       from '../PitchSideScreen'
import InboxScreen           from '../InboxScreen'
import RecordScreen          from '../RecordScreen'
import DevGoalsScreen        from '../DevGoalsScreen'
import AvailabilityScreen    from '../AvailabilityScreen'
import TeamSheetScreen       from '../TeamSheetScreen'
import TeamStaffScreen       from '../TeamStaffScreen'
import SeasonSummariesScreen from '../SeasonSummariesScreen'
import GrowthLoadScreen      from '../GrowthLoadScreen'
import OppositionScreen      from '../OppositionScreen'
import DrillLibraryScreen    from '../DrillLibraryScreen'
import AddGameScreen         from '../AddGameScreen'
import CoachFitnessScreen    from '../CoachFitnessScreen'
import SettingsScreen        from '../SettingsScreen'
// Step 4 screens — Academy player
import ACK1AcademyPlayerHome      from '../step4/ACK1AcademyPlayerHome'
import ACK1eAcademyPlayerHomeEmpty from '../step4/ACK1eAcademyPlayerHomeEmpty'
import ACK2HomePractice            from '../step4/ACK2HomePractice'
import ACK2eHomePracticeEmpty      from '../step4/ACK2eHomePracticeEmpty'
// Step 4 screens — Academy parent
import ACP2Offer                  from '../step4/ACP2Offer'
import ACP3eAcademyParentHomeEmpty from '../step4/ACP3eAcademyParentHomeEmpty'
import ACP4ParentFees             from '../step4/ACP4ParentFees'
import ACP5eProgressReportEmpty   from '../step4/ACP5eProgressReportEmpty'
import ACP6MakeUp                 from '../step4/ACP6MakeUp'
import ACP7ShareWithClub          from '../step4/ACP7ShareWithClub'
import ACP8eBookClinicEmpty       from '../step4/ACP8eBookClinicEmpty'
import ACP9JoinGameTeam           from '../step4/ACP9JoinGameTeam'
import ACP10AcademyConcern        from '../step4/ACP10AcademyConcern'
// Step 4 screens — Director view
import D5Safeguarding             from '../step4/D5Safeguarding'
import DS1Concerns                from '../step4/DS1Concerns'
import DS2DataRequests            from '../step4/DS2DataRequests'
import DB4Grants                  from '../step4/DB4Grants'
import DK1Kit                     from '../step4/DK1Kit'
import DN1Nominations             from '../step4/DN1Nominations'
import DN1eNominationsEmpty       from '../step4/DN1eNominationsEmpty'
import D7U7Mixed                  from '../step4/D7U7Mixed'
import D7U8Mixed                  from '../step4/D7U8Mixed'
import D7U11Girls                 from '../step4/D7U11Girls'
import D7U11Mixed                 from '../step4/D7U11Mixed'
import D7U14Mixed                 from '../step4/D7U14Mixed'
import D7U15Girls                 from '../step4/D7U15Girls'
// Step 4 screens — Tablet coach
import AV2ParentAvailability      from '../step4/AV2ParentAvailability'
import ETeamTalk                  from '../step4/ETeamTalk'
import HM11ComingMiniRoos         from '../step4/HM11ComingMiniRoos'
import HM3eTrainingMiniRoosEmpty  from '../step4/HM3eTrainingMiniRoosEmpty'
import HM4eGameDayMiniRoosEmpty   from '../step4/HM4eGameDayMiniRoosEmpty'
import I1Inbox                    from '../step4/I1Inbox'
import I1eInboxVests              from '../step4/I1eInboxVests'
import T1TabletTraining           from '../step4/T1TabletTraining'
import P1Consent                  from '../step4/P1Consent'
import P2ParentConsent            from '../step4/P2ParentConsent'
import P2bParentConsentStep1      from '../step4/P2bParentConsentStep1'
import P2cParentConsentStep2      from '../step4/P2cParentConsentStep2'
// Step 4 screens — Empty states
import DL2eTermPlannerEmpty       from '../step4/DL2eTermPlannerEmpty'
import DSet6ePartnerAcademyEmpty  from '../step4/DSet6ePartnerAcademyEmpty'
import PAeClipsEmpty              from '../step4/PAeClipsEmpty'
import PAeGoalsEmpty              from '../step4/PAeGoalsEmpty'
import RF4eRefFeedbackEmpty       from '../step4/RF4eRefFeedbackEmpty'
import SG3eAskCleanSheetEmpty     from '../step4/SG3eAskCleanSheetEmpty'
import X11LineupEmpty             from '../step4/X11LineupEmpty'
import X6ClipsEmpty               from '../step4/X6ClipsEmpty'
import X7InboxEmpty               from '../step4/X7InboxEmpty'
// Step 4 screens — Season features
import D0cChairWelcome            from '../step4/D0cChairWelcome'
import FN2SeniorSquad             from '../step4/FN2SeniorSquad'
import FP1PlayFootball            from '../step4/FP1PlayFootball'
import FT1Trials                  from '../step4/FT1Trials'
import FV1FeesVolunteers          from '../step4/FV1FeesVolunteers'
import FW1GirlsWomen              from '../step4/FW1GirlsWomen'
// Step 4 screens — Settings
import DSet2Roles                 from '../step4/DSet2Roles'
import DSet3Connections           from '../step4/DSet3Connections'
import DSet6PartnerAcademy        from '../step4/DSet6PartnerAcademy'
import SET4eDevicesEmpty          from '../step4/SET4eDevicesEmpty'
import SET6Display                from '../step4/SET6Display'
// Step 4 screens — Fitness coach
import IL1eInjuryLogEmpty         from '../step4/IL1eInjuryLogEmpty'
import TL1TestLibrary             from '../step4/TL1TestLibrary'
import TL3SprintResults           from '../step4/TL3SprintResults'
import TL3eSprintResultsEmpty     from '../step4/TL3eSprintResultsEmpty'
// Step 4 screens — Coaches / TM
import CC1eCoachHomeEmpty         from '../step4/CC1eCoachHomeEmpty'
import TM6WhoComing               from '../step4/TM6WhoComing'
import TM6eWhoComingEmpty         from '../step4/TM6eWhoComingEmpty'
// Step 4 screens — Record
import RCm1RecordChoice           from '../step4/RCm1RecordChoice'
import RCm2ClipPicker             from '../step4/RCm2ClipPicker'
// Step 4 screens — Team chat
import CH1TeamChat                from '../step4/CH1TeamChat'

import SP1FootballYear        from '../footballyear/SP1FootballYear'
import SP1eFootballYearEmpty  from '../footballyear/SP1eFootballYearEmpty'
import SP18ClubPhases         from '../footballyear/SP18ClubPhases'
import SP18eClubPhasesEmpty   from '../footballyear/SP18eClubPhasesEmpty'
import SP19TrialWindow        from '../footballyear/SP19TrialWindow'
import SP2HomePreSeason       from '../footballyear/SP2HomePreSeason'
import SP3ProvisionalSquad    from '../footballyear/SP3ProvisionalSquad'
import SP3eProvisionalSquadEmpty from '../footballyear/SP3eProvisionalSquadEmpty'
import SP4CoachTrial          from '../footballyear/SP4CoachTrial'
import SP5Baseline            from '../footballyear/SP5Baseline'
import SP5eBaselineEmpty      from '../footballyear/SP5eBaselineEmpty'
import SP6LoadBuild           from '../footballyear/SP6LoadBuild'
import SP7Friendlies          from '../footballyear/SP7Friendlies'
import SP7eFriendliesEmpty    from '../footballyear/SP7eFriendliesEmpty'
import SP8GradingInput        from '../footballyear/SP8GradingInput'
import SP9MidSeasonReview     from '../footballyear/SP9MidSeasonReview'
import SP10HomePostSeason     from '../footballyear/SP10HomePostSeason'
import SP11TournamentSetup    from '../footballyear/SP11TournamentSetup'
import SP11eTournamentEmpty   from '../footballyear/SP11eTournamentEmpty'
import SP12TournamentDay      from '../footballyear/SP12TournamentDay'
import SP13TournamentReview   from '../footballyear/SP13TournamentReview'
import SP14IndoorTeam         from '../footballyear/SP14IndoorTeam'
import SP14eIndoorTeamEmpty   from '../footballyear/SP14eIndoorTeamEmpty'
import SP15ComingBack         from '../footballyear/SP15ComingBack'
import SP16RestMonth          from '../footballyear/SP16RestMonth'
import SP20StandIn            from '../footballyear/SP20StandIn'
import SP20eStandInEmpty      from '../footballyear/SP20eStandInEmpty'
import SPy2YouthPreSeason     from '../footballyear/SPy2YouthPreSeason'
import SPy10YouthPostSeason   from '../footballyear/SPy10YouthPostSeason'
import SPy16YouthRestMonth    from '../footballyear/SPy16YouthRestMonth'
import SPs2SeniorPreSeason    from '../footballyear/SPs2SeniorPreSeason'
import SPs10SeniorPostSeason  from '../footballyear/SPs10SeniorPostSeason'
import SPs16SeniorOffSeason   from '../footballyear/SPs16SeniorOffSeason'
import SPm2MiniRoosPreSeason  from '../footballyear/SPm2MiniRoosPreSeason'
import SPm10MiniRoosPostSeason from '../footballyear/SPm10MiniRoosPostSeason'
import SPm16MiniRoosRest      from '../footballyear/SPm16MiniRoosRest'
import SPc2CoCoachPreSeason   from '../footballyear/SPc2CoCoachPreSeason'
import SP21StandInHome        from '../footballyear/SP21StandInHome'
import SP21eStandInHomeEmpty  from '../footballyear/SP21eStandInHomeEmpty'
import SPp1ParentPreSeason    from '../footballyear/SPp1ParentPreSeason'
import SPp2ParentComingBack   from '../footballyear/SPp2ParentComingBack'
import SPp3ParentTournament   from '../footballyear/SPp3ParentTournament'
import SPp4ParentRestMonth    from '../footballyear/SPp4ParentRestMonth'
import SPp6ManagerTournament  from '../footballyear/SPp6ManagerTournament'
import SPp7PlayerRestMonth    from '../footballyear/SPp7PlayerRestMonth'
import SPp8StandInAsked       from '../footballyear/SPp8StandInAsked'
import SPp10ManagerPreSeason  from '../footballyear/SPp10ManagerPreSeason'
import SPp11ManagerPostSeason from '../footballyear/SPp11ManagerPostSeason'
import SPp12ManagerRestMonth  from '../footballyear/SPp12ManagerRestMonth'
import SPp13PlayerPreSeason   from '../footballyear/SPp13PlayerPreSeason'
import SPp14PlayerPostSeason  from '../footballyear/SPp14PlayerPostSeason'
import SPp15OlderPreSeason    from '../footballyear/SPp15OlderPreSeason'
import SPp16OlderPostSeason   from '../footballyear/SPp16OlderPostSeason'
import SPp17OlderRestMonth    from '../footballyear/SPp17OlderRestMonth'
import FN3SeniorTeam          from '../step4/FN3SeniorTeam'
import HM2cPlayerCardMiniRoos from '../step4/HM2cPlayerCardMiniRoos'
import HM6nSeasonNoteOne      from '../step4/HM6nSeasonNoteOne'
import HM1nQuickNotes         from '../step4/HM1nQuickNotes'
import HM1rNotesBack          from '../step4/HM1rNotesBack'
import SE2PlayerSummary       from '../step4/SE2PlayerSummary'
import PO5sAdultSettings      from '../step4/PO5sAdultSettings'
import TM11lLetterFull        from '../teammanager/TM11lLetterFull'
import C1sClipSearch          from '../step4/C1sClipSearch'
import C1seClipSearchNone     from '../step4/C1seClipSearchNone'
import ACC8pPairCamera        from '../coachphone/ACC8pPairCamera'
import SKRoles              from '../step4/SKRoles'
import IV3cCoCoachInvite    from '../step4/IV3cCoCoachInvite'
import IV3fFitnessInvite    from '../step4/IV3fFitnessInvite'
import IV4ManagerDone       from '../step4/IV4ManagerDone'
import PAThanks             from '../step4/PAThanks'
import JoinFlow             from '../join/JoinFlow'
import JuniorCoachApp        from '../JuniorCoachApp'
import SignInFlow            from '../signin/SignInFlow'
import { SB1SandboxEnding, SB2SandboxEnded, SB3NoSandbox, SB4KeepGoing } from '../signin/SandboxScreens'
import { ER1SomethingWrong, ER2UploadFailed, ER3Loading, ER4NotFound, ER5NoAccess, ERp1SomethingWrong, ERp2NotFound } from '../signin/ErrorScreens'
import CoachPhoneApp, { CPh1CoachPhoneHome, CPh2CoachPhoneComing, CPh3CoachPhoneMessages, CPh4CoachPhoneGame, CPh5CoachPhonePlan, CPh1eCoachPhoneHomeEmpty, CPh2eCoachPhoneComingEmpty, CPh3eCoachPhoneMessagesEmpty, CPh4eCoachPhoneGameEmpty } from '../coachphone/CoachPhoneApp'
import DemoStart             from './DemoStart'
import DemoStartEmpty        from './DemoStartEmpty'
import DemoSignIn            from './DemoSignIn'
import DemoWhy               from './DemoWhy'
import DemoTourShell         from './DemoTourShell'
import DemoPhone             from './DemoPhone'
import DemoShell, { type DemoPhase } from './DemoShell'
import DemoShellPhone        from './DemoShellPhone'
import DemoShellSandbox      from './DemoShellSandbox'
import { TOURS, type RoleId } from './tours'

type DemoView = 'signin' | 'start' | 'why' | 'tour' | 'lookaround' | 'sandbox' | 'sandboxlook' | 'nosandbox'

const SANDBOX_KEY = 'cs_demo_sandbox_v1'

function getSandbox(): { createdAt: number } | null {
  try {
    const v = localStorage.getItem(SANDBOX_KEY)
    return v ? JSON.parse(v) as { createdAt: number } : null
  } catch { return null }
}

function createSandbox() {
  localStorage.setItem(SANDBOX_KEY, JSON.stringify({ createdAt: Date.now() }))
}

function deleteSandbox() {
  localStorage.removeItem(SANDBOX_KEY)
}

type SandboxState = 'none' | 'fresh' | 'ending' | 'ended'
function checkSandboxExpiry(): SandboxState {
  const sb = getSandbox()
  if (!sb) return 'none'
  const ageMs = Date.now() - sb.createdAt
  const DAY = 86400000
  if (ageMs > 14 * DAY) { deleteSandbox(); return 'ended' }
  if (ageMs > 12 * DAY) return 'ending'
  return 'fresh'
}

const PHASE_ROLES = new Set<string>(['coach', 'ccoach', 'youth', 'seniors', 'miniroos', 'parent', 'manager', 'playeryoung', 'playerolder'])

function noop() {}

function SignupWithSignIn() {
  const [showSignIn, setShowSignIn] = useState(false)
  if (showSignIn) return <SignInFlow initialState="email" onBack={() => setShowSignIn(false)} />
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px', background: '#e8e9e7', minHeight: '100%' }}>
      <SignupScreen onDone={() => setShowSignIn(true)} />
    </div>
  )
}

export function renderScreen(key: string): ReactNode {
  switch (key) {
    case 'juniorcoach':
      return <JuniorCoachApp />
    case 'home':
      return <HomeScreen role="head" onRole={noop} onNav={noop} onCalendar={noop} empty={false} />
    case 'training':
      return <TrainingScreen role="head" onNav={noop} empty={false} />
    case 'matchday':
      return <MatchDayScreen onNav={noop} empty={false} />
    case 'squad':
      return <SquadScreen role="head" onPlayerProfile={noop} empty={false} />
    case 'review':
      return <ReviewScreen empty={false} />
    case 'signup':
      return <SignupWithSignIn />
    case 'miniroos':
      return (
        <div style={{ width: 1180, background: 'var(--surface-100)' }}>
          <MiniRoosApp onBack={noop} empty={false} />
        </div>
      )
    case 'goalkeeper':
      return <GoalkeeperCoachApp onBack={noop} empty={false} />
    case 'coordinator':
      return <CoordinatorPortal onBack={noop} empty={false} />
    case 'rollover':
      return <RolloverScreen onBack={noop} empty={false} />
    case 'seniors':
      return <SeniorsYouthCoachApp teamType="seniors" onBack={noop} />
    case 'youth':
      return <SeniorsYouthCoachApp teamType="youth" onBack={noop} />
    case 'fitnesscoach':
      return <FitnessCoachScreen empty={false} />
    case 'clubadmin':
      return <ClubAdminScreen empty={false} />
    case 'chair-home':
      return <ClubAdminScreen empty={false} role="chair" initials="GL" />
    case 'welfare-home':
      return <ClubAdminScreen empty={false} role="welfare" initials="HP" initialTab="welfare" />
    case 'teammanager':
      return <TeamManagerScreen empty={false} />
    case 'twochildren':
    case 'parent-phone':
      return <TwoChildrenApp onBack={noop} empty={false} />
    case 'playerapp':
      return <PlayerAppScreen empty={false} />
    case 'olderplayer':
      return <OlderPlayerApp empty={false} />
    case 'refereephone':
      return <RefereesPhoneScreen empty={false} />
    case 'academyowner':
      return <AcademyOwnerApp onBack={noop} empty={false} />
    case 'academycoach':
      return <AcademyCoachApp onBack={noop} empty={false} />
    case 'academyparent':
      return <AcademyParentApp onBack={noop} empty={false} />
    case 'academyplayer':
      return <AcademyPlayerApp onBack={noop} empty={false} />
    case 'playerme':
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
          <PlayerMeScreen onBack={noop} />
        </div>
      )
    case 'clips':
      return <ClipsScreen empty={false} />
    case 'teamchat':
      return <TeamChatScreen empty={false} />
    case 'suggestions':
      return <SuggestionsScreen empty={false} />
    case 'thisweek':
      return <ThisWeekScreen empty={false} />
    case 'wellness':
      return <WellnessScreen empty={false} />
    case 'style':
      return <OurStyleScreen />
    case 'teamtalk':
      return <TeamTalkScreen role="head" onClose={noop} />
    case 'pitchside':
      return <PitchSideScreen onClose={noop} empty={false} />
    case 'inbox':
      return <InboxScreen empty={false} />
    case 'record':
      return <RecordScreen empty={false} />
    case 'goals':
      return <DevGoalsScreen />
    case 'availability':
      return <AvailabilityScreen />
    case 'teamsheet':
      return <TeamSheetScreen empty={false} />
    case 'teamstaff':
      return <TeamStaffScreen empty={false} />
    case 'seasons':
      return <SeasonSummariesScreen />
    case 'growth':
      return <GrowthLoadScreen />
    case 'opposition':
      return <OppositionScreen />
    case 'drills':
      return <DrillLibraryScreen empty={false} />
    case 'addgame':
      return <AddGameScreen onClose={noop} />
    case 'coachfitness':
      return <CoachFitnessScreen />
    case 'settings':
      return <SettingsScreen onDone={noop} />

    // Football year SP screens
    case 'footballyear':        return <SP1FootballYear onBack={noop} />
    case 'footballyear-empty':  return <SP1eFootballYearEmpty onBack={noop} />
    case 'clubphases':          return <SP18ClubPhases onBack={noop} />
    case 'clubphases-empty':    return <SP18eClubPhasesEmpty onBack={noop} />
    case 'trialwindow':         return <SP19TrialWindow onBack={noop} />
    case 'homepreseason':       return <SP2HomePreSeason onBack={noop} />
    case 'provisionalsquad':    return <SP3ProvisionalSquad onBack={noop} />
    case 'provisionalsquad-e':  return <SP3eProvisionalSquadEmpty onBack={noop} />
    case 'coachtrial':          return <SP4CoachTrial onBack={noop} />
    case 'baseline':            return <SP5Baseline onBack={noop} />
    case 'baseline-empty':      return <SP5eBaselineEmpty onBack={noop} />
    case 'loadbuild':           return <SP6LoadBuild onBack={noop} />
    case 'friendlies':          return <SP7Friendlies onBack={noop} />
    case 'friendlies-empty':    return <SP7eFriendliesEmpty onBack={noop} />
    case 'gradinginput':        return <SP8GradingInput onBack={noop} />
    case 'midseasonreview':     return <SP9MidSeasonReview onBack={noop} />
    case 'homepostseason':      return <SP10HomePostSeason onBack={noop} />
    case 'tournamentsetup':     return <SP11TournamentSetup onBack={noop} />
    case 'tournament-empty':    return <SP11eTournamentEmpty onBack={noop} />
    case 'tournamentday':       return <SP12TournamentDay onBack={noop} />
    case 'tournamentreview':    return <SP13TournamentReview onBack={noop} />
    case 'indoorteam':          return <SP14IndoorTeam onBack={noop} />
    case 'indoorteam-empty':    return <SP14eIndoorTeamEmpty onBack={noop} />
    case 'comingback':          return <SP15ComingBack onBack={noop} />
    case 'restmonth':           return <SP16RestMonth onBack={noop} />
    case 'standin':             return <SP20StandIn onBack={noop} />
    case 'standin-empty':       return <SP20eStandInEmpty onBack={noop} />
    case 'youth-preseason':     return <SPy2YouthPreSeason onBack={noop} />
    case 'youth-postseason':    return <SPy10YouthPostSeason onBack={noop} />
    case 'youth-restmonth':     return <SPy16YouthRestMonth onBack={noop} />
    case 'senior-preseason':    return <SPs2SeniorPreSeason onBack={noop} />
    case 'senior-postseason':   return <SPs10SeniorPostSeason onBack={noop} />
    case 'senior-offseason':    return <SPs16SeniorOffSeason onBack={noop} />
    case 'miniroos-preseason':  return <SPm2MiniRoosPreSeason onBack={noop} />
    case 'miniroos-postseason': return <SPm10MiniRoosPostSeason onBack={noop} />
    case 'miniroos-rest':       return <SPm16MiniRoosRest onBack={noop} />
    case 'ccoach-preseason':    return <SPc2CoCoachPreSeason onBack={noop} />
    case 'standin-home':        return <SP21StandInHome onBack={noop} />
    case 'standin-home-empty':  return <SP21eStandInHomeEmpty onBack={noop} />
    case 'manager-preseason':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp10ManagerPreSeason /></div>
    case 'manager-postseason':  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp11ManagerPostSeason /></div>
    case 'manager-restmonth':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp12ManagerRestMonth /></div>
    case 'player-preseason':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp13PlayerPreSeason /></div>
    case 'player-postseason':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp14PlayerPostSeason /></div>
    case 'older-preseason':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp15OlderPreSeason /></div>
    case 'older-postseason':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp16OlderPostSeason /></div>
    case 'older-restmonth':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp17OlderRestMonth /></div>
    case 'fn3-seniorteam':      return <FN3SeniorTeam onBack={noop} />
    case 'hm2c-playercard':     return <HM2cPlayerCardMiniRoos onBack={noop} />
    case 'hm6n-seasonnote':     return <HM6nSeasonNoteOne onBack={noop} />
    case 'hm1n-quicknotes':     return <HM1nQuickNotes onBack={noop} />
    case 'hm1r-notesback':      return <HM1rNotesBack onBack={noop} />
    case 'se2-playersummary':   return <SE2PlayerSummary onBack={noop} />
    case 'po5s-adultsettings':  return <PO5sAdultSettings onBack={noop} />
    case 'tm11l-letterfull':    return <TM11lLetterFull onBack={noop} />
    case 'c1s-clipsearch':      return <C1sClipSearch onBack={noop} />
    case 'c1se-clipsearchnone': return <C1seClipSearchNone onBack={noop} />
    case 'acc8p-paircamera':    return <ACC8pPairCamera onBack={noop} />
    case 'parent-preseason':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp1ParentPreSeason onBack={noop} /></div>
    case 'parent-comingback':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp2ParentComingBack onBack={noop} /></div>
    case 'parent-tournament':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp3ParentTournament onBack={noop} /></div>
    case 'parent-restmonth':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp4ParentRestMonth onBack={noop} /></div>
    case 'manager-tournament':  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp6ManagerTournament onBack={noop} /></div>
    case 'player-restmonth':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp7PlayerRestMonth onBack={noop} /></div>
    case 'standin-asked':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp8StandInAsked onBack={noop} /></div>

    // Step 4 — Academy player (phone)
    case 'ack1-home':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK1AcademyPlayerHome /></div>
    case 'ack1-home-empty':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK1eAcademyPlayerHomeEmpty /></div>
    case 'ack2-practice':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK2HomePractice /></div>
    case 'ack2-practice-e':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK2eHomePracticeEmpty /></div>
    // Step 4 — Academy parent (phone)
    case 'acp2-offer':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP2Offer /></div>
    case 'acp3-home-e':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP3eAcademyParentHomeEmpty /></div>
    case 'acp4-fees':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP4ParentFees /></div>
    case 'acp5-report-e':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP5eProgressReportEmpty /></div>
    case 'acp6-makeup':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP6MakeUp /></div>
    case 'acp7-share':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP7ShareWithClub /></div>
    case 'acp8-clinic-e':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP8eBookClinicEmpty /></div>
    case 'acp9-join':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP9JoinGameTeam /></div>
    case 'acp10-concern':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP10AcademyConcern /></div>
    // Step 4 — Director view (tablet)
    case 'd5-safeguarding':   return <D5Safeguarding />
    case 'ds1-concerns':      return <DS1Concerns />
    case 'ds2-data':          return <DS2DataRequests />
    case 'db4-grants':        return <DB4Grants />
    case 'dk1-kit':           return <DK1Kit />
    case 'dn1-noms':          return <DN1Nominations />
    case 'dn1-noms-e':        return <DN1eNominationsEmpty />
    case 'd7-u7':             return <D7U7Mixed />
    case 'd7-u8':             return <D7U8Mixed />
    case 'd7-u11girls':       return <D7U11Girls />
    case 'd7-u11':            return <D7U11Mixed />
    case 'd7-u14':            return <D7U14Mixed />
    case 'd7-u15girls':       return <D7U15Girls />
    // Step 4 — Tablet coach
    case 'av2-avail':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><AV2ParentAvailability /></div>
    case 'e-teamtalk':        return <ETeamTalk />
    case 'hm11-coming':       return <HM11ComingMiniRoos />
    case 'hm3-training-e':    return <HM3eTrainingMiniRoosEmpty />
    case 'hm4-gameday-e':     return <HM4eGameDayMiniRoosEmpty />
    case 'i1-inbox':          return <I1Inbox />
    case 'i1-inbox-vests':    return <I1eInboxVests />
    case 't1-training':       return <T1TabletTraining />
    case 'p1-consent':        return <P1Consent />
    case 'p2-consent':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><P2ParentConsent /></div>
    case 'p2b-consent':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><P2bParentConsentStep1 /></div>
    case 'p2c-consent':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><P2cParentConsentStep2 /></div>
    // Step 4 — Empty states
    case 'dl2-planner-e':     return <DL2eTermPlannerEmpty />
    case 'dset6-partner-e':   return <DSet6ePartnerAcademyEmpty />
    case 'pa-clips-e':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PAeClipsEmpty /></div>
    case 'pa-goals-e':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PAeGoalsEmpty /></div>
    case 'pa-thanks':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PAThanks /></div>
    case 'rf4-feedback-e':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><RF4eRefFeedbackEmpty /></div>
    case 'sg3-ask-e':         return <SG3eAskCleanSheetEmpty />
    case 'x11-lineup-e':      return <X11LineupEmpty />
    case 'x6-clips-e':        return <X6ClipsEmpty />
    case 'x7-inbox-e':        return <X7InboxEmpty />
    // Step 4 — Season features (tablet)
    case 'd0c-chair':         return <D0cChairWelcome />
    case 'fn2-squad':         return <FN2SeniorSquad />
    case 'fp1-playfootball':  return <FP1PlayFootball />
    case 'ft1-trials':        return <FT1Trials />
    case 'fv1-fees':          return <FV1FeesVolunteers />
    case 'fw1-girls':         return <FW1GirlsWomen />
    // Step 4 — Settings (tablet)
    case 'dset2-roles':       return <DSet2Roles />
    case 'dset3-connections': return <DSet3Connections />
    case 'dset6-partner':     return <DSet6PartnerAcademy />
    case 'set4e-devices':     return <SET4eDevicesEmpty />
    case 'set6-display':      return <SET6Display />
    // Step 4 — Fitness coach (tablet)
    case 'il1e-injury-e':     return <IL1eInjuryLogEmpty />
    case 'tl1-tests':         return <TL1TestLibrary />
    case 'tl3-sprint':        return <TL3SprintResults />
    case 'tl3e-sprint-e':     return <TL3eSprintResultsEmpty />
    // Step 4 — Coaches / TM
    case 'cc1e-coach-e':      return <CC1eCoachHomeEmpty />
    case 'tm6-coming':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM6WhoComing /></div>
    case 'tm6e-coming-e':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM6eWhoComingEmpty /></div>
    // Step 4 — Record (tablet)
    case 'rcm1-record':       return <RCm1RecordChoice />
    case 'rcm2-clips':        return <RCm2ClipPicker />
    // Step 4 — Team chat (tablet)
    case 'ch1-chat':          return <CH1TeamChat />

    // Step 4 — Invite + join screens
    case 'sk-roles':          return <SKRoles />
    case 'iv3c-coachinvite':  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><IV3cCoCoachInvite /></div>
    case 'iv3f-fitinvite':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><IV3fFitnessInvite /></div>
    case 'iv4-managerdone':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><IV4ManagerDone /></div>
    // Sign-in flow (SI screens)
    case 'si1':               return <SignInFlow initialState="email" />
    case 'si2':               return <SignInFlow initialState="code" />
    case 'si3':               return <SignInFlow initialState="wrong" />
    case 'si4':               return <SignInFlow initialState="expired" />
    case 'si5':               return <SignInFlow initialState="toomany" />
    case 'si6':               return <SignInFlow initialState="newdevice" />
    case 'si7':               return <SignInFlow initialState="signedout" />
    case 'sip1':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SignInFlow phone initialState="email" /></div>
    case 'sip2':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SignInFlow phone initialState="code" /></div>
    case 'sip3':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SignInFlow phone initialState="wrong" /></div>
    // Sandbox ending (SB screens)
    case 'sb1':               return <SB1SandboxEnding />
    case 'sb2':               return <SB2SandboxEnded />
    case 'sb3':               return <SB3NoSandbox />
    case 'sb4':               return <SB4KeepGoing />
    // Error / fault screens (ER screens)
    case 'er1':               return <ER1SomethingWrong />
    case 'er2':               return <ER2UploadFailed />
    case 'er3':               return <ER3Loading />
    case 'er4':               return <ER4NotFound />
    case 'er5':               return <ER5NoAccess />
    case 'erp1':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ERp1SomethingWrong /></div>
    case 'erp2':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ERp2NotFound /></div>
    // Coach phone (CPh screens)
    case 'cph1':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh1CoachPhoneHome /></div>
    case 'cph2':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh2CoachPhoneComing /></div>
    case 'cph3':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh3CoachPhoneMessages /></div>
    case 'cph4':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh4CoachPhoneGame /></div>
    case 'cph5':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh5CoachPhonePlan /></div>
    case 'cph1e':             return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh1eCoachPhoneHomeEmpty /></div>
    case 'cph2e':             return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh2eCoachPhoneComingEmpty /></div>
    case 'cph3e':             return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh3eCoachPhoneMessagesEmpty /></div>
    case 'cph4e':             return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh4eCoachPhoneGameEmpty /></div>
    // JN join flow (phone)
    case 'jn-landing':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="landing" /></div>
    case 'jn1-create':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="parent-create" /></div>
    case 'jn2-child':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="parent-child" /></div>
    case 'jn8-firstaid':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="parent-firstaid" /></div>
    case 'jn4-setup':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="parent-setup" /></div>
    case 'jn5-parentdone':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="parent-done" /></div>
    case 'jn6-age':           return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="player-age" /></div>
    case 'jn7-code':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="player-code" /></div>
    case 'jn9a-18plus':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="player-18" /></div>

    // Sandbox empty-state homes
    case 'home-e':
      return <HomeScreen role="head" onRole={noop} onNav={noop} onCalendar={noop} empty={true} />
    case 'miniroos-e':
      return (
        <div style={{ width: 1180, background: 'var(--surface-100)' }}>
          <MiniRoosApp onBack={noop} empty={true} />
        </div>
      )
    case 'fitnesscoach-e':
      return <FitnessCoachScreen empty={true} />
    case 'teammanager-e':
      return <TeamManagerScreen empty={true} />

    default:
      return (
        <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div style={{ fontSize: 15, color: '#6f7f7b' }}>Screen "{key}" not yet built.</div>
        </div>
      )
  }
}

function viewToPath(view: DemoView, role: RoleId): string {
  if (view === 'lookaround')  return `/look/${role}`
  if (view === 'tour')        return `/tour/${role}`
  if (view === 'sandboxlook') return `/sandbox/${role}`
  if (view === 'start')       return '/start'
  if (view === 'sandbox')     return '/sandbox'
  if (view === 'nosandbox')   return '/nosandbox'
  if (view === 'why')         return '/why'
  return '/'
}

function pathToState(path: string): { view: DemoView; role: RoleId } {
  if (path === '/start')      return { view: 'start',     role: 'coach' }
  if (path === '/why')        return { view: 'why',       role: 'coach' }
  if (path === '/sandbox')    return { view: 'sandbox',   role: 'coach' }
  if (path === '/nosandbox')  return { view: 'nosandbox', role: 'coach' }
  const m1 = path.match(/^\/look\/([a-z0-9]+)$/)
  if (m1 && m1[1] in TOURS) return { view: 'lookaround', role: m1[1] as RoleId }
  const m2 = path.match(/^\/tour\/([a-z0-9]+)$/)
  if (m2 && m2[1] in TOURS) return { view: 'tour', role: m2[1] as RoleId }
  const m3 = path.match(/^\/sandbox\/([a-z0-9]+)$/)
  if (m3 && m3[1] in TOURS) return { view: 'sandboxlook', role: m3[1] as RoleId }
  return { view: 'signin', role: 'coach' }
}

export default function DemoApp() {
  const init = pathToState(window.location.pathname)
  const [view, setView] = useState<DemoView>(init.view)
  const [role, setRole] = useState<RoleId>(init.role)
  const [phase, setPhase] = useState<DemoPhase>('season')
  const [isPhone, setIsPhone] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsPhone(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const path = viewToPath(view, role)
    if (window.location.pathname !== path)
      window.history.pushState(null, '', path)
  }, [view, role])

  useEffect(() => {
    const onPop = () => {
      const { view: v, role: r } = pathToState(window.location.pathname)
      setView(v)
      setRole(r)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function startTour(roleId: RoleId) {
    setRole(roleId)
    setView('tour')
  }

  function startLook(roleId: RoleId) {
    setRole(roleId)
    setView('lookaround')
  }

  if (view === 'signin') {
    return (
      <DemoSignIn
        onDemo={() => setView('start')}
        onSandbox={() => { createSandbox(); setView('sandbox') }}
        onOpenSandbox={() => { getSandbox() ? setView('sandbox') : setView('nosandbox') }}
        onWhy={() => setView('why')}
        hasSandbox={getSandbox() !== null}
      />
    )
  }

  if (view === 'nosandbox') {
    return (
      <SB3NoSandbox
        onStartSandbox={() => { createSandbox(); setView('sandbox') }}
        onDemo={() => setView('start')}
      />
    )
  }

  if (view === 'sandbox') {
    const sbState = checkSandboxExpiry()
    if (sbState === 'ended') {
      return <SB2SandboxEnded onStartSandbox={() => { createSandbox(); setView('sandbox') }} onDemo={() => setView('start')} />
    }
    if (sbState === 'ending') {
      return <SB1SandboxEnding />
    }
    return (
      <DemoStartEmpty
        onRole={(roleId) => { setRole(roleId); setView('sandboxlook') }}
        onSwitchToDemo={() => setView('start')}
      />
    )
  }

  if (view === 'sandboxlook') {
    const tour = TOURS[role]
    const homeKey = tour.sandboxHome ?? tour.home
    return (
      <DemoShellSandbox
        roleId={role}
        onSwitchRole={() => setView('sandbox')}
        onSwitchToDemo={() => setView('start')}
        phase={PHASE_ROLES.has(role) ? phase : undefined}
        onPhaseChange={PHASE_ROLES.has(role) ? setPhase : undefined}
      >
        {homeKey ? renderScreen(homeKey) : (
          <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <div style={{ fontSize: 15, color: '#6f7f7b' }}>{TOURS[role].roleLabel} — no screen preview available.</div>
          </div>
        )}
      </DemoShellSandbox>
    )
  }

  if (view === 'why') {
    return <DemoWhy onBack={() => setView('signin')} />
  }

  if (view === 'tour') {
    return (
      <DemoTourShell
        roleId={role}
        onBack={() => setView('start')}
        renderScreen={renderScreen}
      />
    )
  }

  if (view === 'lookaround') {
    const homeKey = TOURS[role].home
    let lookContent: ReactNode
    if (role === 'miniroos') {
      lookContent = (
        <div style={{ width: 1180, background: 'var(--surface-100)' }}>
          <MiniRoosApp onBack={() => setRole('coach')} empty={false} />
        </div>
      )
    } else if (role === 'goalkeeper') {
      lookContent = <GoalkeeperCoachApp onBack={() => setRole('coach')} empty={false} />
    } else if (role === 'academyowner') {
      lookContent = <AcademyOwnerApp onBack={() => setRole('academycoach')} empty={false} />
    } else if (role === 'academycoach') {
      lookContent = <AcademyCoachApp onBack={() => setRole('coach')} empty={false} />
    } else if (role === 'academyparent') {
      lookContent = <AcademyParentApp onBack={() => setView('start')} empty={false} />
    } else if (role === 'academyplayer') {
      lookContent = <AcademyPlayerApp onBack={() => setView('start')} empty={false} />
    } else if (role === 'coach') {
      if (window.innerWidth <= 640) {
        lookContent = <CoachPhoneApp />
      } else if (phase === 'preseason')       lookContent = <SP2HomePreSeason onBack={noop} />
      else if (phase === 'postseason') lookContent = <SP10HomePostSeason onBack={noop} />
      else if (phase === 'restmonth')  lookContent = <SP16RestMonth onBack={noop} />
      else                             lookContent = <JuniorCoachApp />
    } else if (role === 'ccoach') {
      if (phase === 'preseason')       lookContent = <SPc2CoCoachPreSeason onBack={noop} />
      else if (phase === 'postseason') lookContent = <SP10HomePostSeason onBack={noop} />
      else if (phase === 'restmonth')  lookContent = <SP16RestMonth onBack={noop} />
      else                             lookContent = <JuniorCoachApp />
    } else if (role === 'youth') {
      if (phase === 'preseason')       lookContent = <SPy2YouthPreSeason onBack={noop} />
      else if (phase === 'postseason') lookContent = <SPy10YouthPostSeason onBack={noop} />
      else if (phase === 'restmonth')  lookContent = <SPy16YouthRestMonth onBack={noop} />
      else                             lookContent = <JuniorCoachApp />
    } else if (role === 'seniors') {
      if (phase === 'preseason')       lookContent = <SPs2SeniorPreSeason onBack={noop} />
      else if (phase === 'postseason') lookContent = <SPs10SeniorPostSeason onBack={noop} />
      else if (phase === 'restmonth')  lookContent = <SPs16SeniorOffSeason onBack={noop} />
      else                             lookContent = <JuniorCoachApp />
    } else if (role === 'miniroos') {
      if (phase === 'preseason')       lookContent = <div style={{ width: 1180, background: 'var(--surface-100)' }}><SPm2MiniRoosPreSeason onBack={noop} /></div>
      else if (phase === 'postseason') lookContent = <div style={{ width: 1180, background: 'var(--surface-100)' }}><SPm10MiniRoosPostSeason onBack={noop} /></div>
      else if (phase === 'restmonth')  lookContent = <div style={{ width: 1180, background: 'var(--surface-100)' }}><SPm16MiniRoosRest onBack={noop} /></div>
      else                             lookContent = <div style={{ width: 1180, background: 'var(--surface-100)' }}><MiniRoosApp onBack={() => setRole('coach')} empty={false} /></div>
    } else if (role === 'parent') {
      if (phase === 'preseason')       lookContent = <SPp1ParentPreSeason onBack={noop} />
      else if (phase === 'postseason') lookContent = <SPp3ParentTournament onBack={noop} />
      else if (phase === 'restmonth')  lookContent = <SPp4ParentRestMonth onBack={noop} />
      else                             lookContent = <TwoChildrenApp onBack={() => setView('start')} empty={false} />
    } else if (role === 'manager') {
      if (phase === 'preseason')       lookContent = <SPp10ManagerPreSeason />
      else if (phase === 'postseason') lookContent = <SPp11ManagerPostSeason />
      else if (phase === 'restmonth')  lookContent = <SPp12ManagerRestMonth />
      else                             lookContent = <TeamManagerScreen empty={false} />
    } else if (role === 'playeryoung') {
      if (phase === 'preseason')       lookContent = <SPp13PlayerPreSeason />
      else if (phase === 'postseason') lookContent = <SPp14PlayerPostSeason />
      else                             lookContent = <TwoChildrenApp onBack={() => setView('start')} empty={false} />
    } else if (role === 'playerolder') {
      if (phase === 'preseason')       lookContent = <SPp15OlderPreSeason />
      else if (phase === 'postseason') lookContent = <SPp16OlderPostSeason />
      else if (phase === 'restmonth')  lookContent = <SPp17OlderRestMonth />
      else                             lookContent = <OlderPlayerApp empty={false} />
    } else if (homeKey) {
      lookContent = renderScreen(homeKey)
    } else {
      lookContent = (
        <div style={{ padding: 48, fontSize: 15, color: '#6f7f7b' }}>
          {TOURS[role].roleLabel} — no screen preview available.
        </div>
      )
    }
    const isPhoneRole = TOURS[role].device === 'phone'
    const showPhase = PHASE_ROLES.has(role)
    if (isPhoneRole) {
      return (
        <DemoShellPhone
          roleId={role}
          onBack={() => setView('start')}
          onStartTour={() => setView('tour')}
          phase={showPhase ? phase : undefined}
          onPhaseChange={showPhase ? setPhase : undefined}
        >
          {lookContent}
        </DemoShellPhone>
      )
    }
    return (
      <DemoShell
        roleId={role}
        onBack={() => setView('start')}
        onStartTour={() => setView('tour')}
        phase={showPhase ? phase : undefined}
        onPhaseChange={showPhase ? setPhase : undefined}
      >
        {lookContent}
      </DemoShell>
    )
  }

  if (isPhone && view === 'start') {
    return (
      <DemoPhone
        onLook={startLook}
        onWhy={() => setView('why')}
        onSandbox={() => { createSandbox(); setView('sandbox') }}
      />
    )
  }

  return (
    <DemoStart
      onTour={startTour}
      onLook={startLook}
      onStory={() => startTour('story')}
      onWhy={() => setView('why')}
      onSandbox={() => { createSandbox(); setView('sandbox') }}
    />
  )
}
