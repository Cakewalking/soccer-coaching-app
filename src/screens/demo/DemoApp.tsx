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
import SetOurStyleWizard     from '../SetOurStyleWizard'
import PACheckScreen         from '../PACheckScreen'
import CoachFitnessScreen    from '../CoachFitnessScreen'
import SettingsScreen        from '../SettingsScreen'
import LiveGameScreen        from '../LiveGameScreen'
import LiveGame11Screen      from '../LiveGame11Screen'
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
// Step 4 screens — Director/Chair dedicated screens (agent 1)
import D0ClubEmpty                from '../step4/D0ClubEmpty'
import D1ClubOverview             from '../step4/D1ClubOverview'
import D2Teams                    from '../step4/D2Teams'
import D3Coaches                  from '../step4/D3Coaches'
import D4Players                  from '../step4/D4Players'
import DC1Calendar                from '../step4/DC1Calendar'
import DM1CoachMeeting            from '../step4/DM1CoachMeeting'
import DT1Courses                 from '../step4/DT1Courses'
import DX1CompareTeams            from '../step4/DX1CompareTeams'
import DP1FairGameTime            from '../step4/DP1FairGameTime'
import FM1Moves                   from '../step4/FM1Moves'
import FH1HeadingPolicy           from '../step4/FH1HeadingPolicy'
import FY1SeasonPlan              from '../step4/FY1SeasonPlan'
import D6BoardReport              from '../step4/D6BoardReport'
import DB2SeasonReview            from '../step4/DB2SeasonReview'
import DB3LeagueReturns           from '../step4/DB3LeagueReturns'
import FD3Dispensations           from '../step4/FD3Dispensations'
import FG1Grading                 from '../step4/FG1Grading'
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
// Step 4 screens — MiniRoos screens
import HM1HomeMiniRoos            from '../step4/HM1HomeMiniRoos'
import HM2SquadMiniRoos           from '../step4/HM2SquadMiniRoos'
import HM3TrainingMiniRoos        from '../step4/HM3TrainingMiniRoos'
import HM4GameDayMiniRoos         from '../step4/HM4GameDayMiniRoos'
import HM5WhatWeSaw               from '../step4/HM5WhatWeSaw'
import HM5bThankParents           from '../step4/HM5bThankParents'
import HM6SeasonNotes             from '../step4/HM6SeasonNotes'
import HM7InboxMiniRoos           from '../step4/HM7InboxMiniRoos'
import HM8CalendarMiniRoos        from '../step4/HM8CalendarMiniRoos'
import HM9FixturesMiniRoos        from '../step4/HM9FixturesMiniRoos'
import HM10StaffMiniRoos          from '../step4/HM10StaffMiniRoos'
import HM12ConsentMiniRoos        from '../step4/HM12ConsentMiniRoos'
// Step 4 screens — Team Manager additional
import TM1ManagerHome             from '../step4/TM1ManagerHome'
import TM2ManagerGameDay          from '../step4/TM2ManagerGameDay'
import TM3ManagerChange           from '../step4/TM3ManagerChange'
import TM4DutyRoster              from '../step4/TM4DutyRoster'
import TM5ManagerMessages         from '../step4/TM5ManagerMessages'
import TM8SidelineReport          from '../step4/TM8SidelineReport'
import TM9SignOff                  from '../step4/TM9SignOff'
import TM10Heat                   from '../step4/TM10Heat'
import TM11GameDayPapers          from '../step4/TM11GameDayPapers'
import TM12ManagerSetUpChat       from '../step4/TM12ManagerSetUpChat'
import TM13ManagerPoll            from '../step4/TM13ManagerPoll'
import TM14ManagerTeamChat        from '../step4/TM14ManagerTeamChat'
// Step 4 screens — Team chat
import CH1TeamChat                from '../step4/CH1TeamChat'
import CH2Announcements           from '../step4/CH2Announcements'
import CH3NewChat                  from '../step4/CH3NewChat'
import CH4NewPoll                  from '../step4/CH4NewPoll'
import CH5PollResults              from '../step4/CH5PollResults'
import CH6Media                    from '../step4/CH6Media'
import CH7PhotoCheck               from '../step4/CH7PhotoCheck'
import CH9MessageActions           from '../step4/CH9MessageActions'

// Step 4 — Fitness coach screens (agent 2)
import GT2MeasureSession         from '../step4/GT2MeasureSession'
import F3FitnessTraining         from '../step4/F3FitnessTraining'
import F4FitnessMatch            from '../step4/F4FitnessMatch'
import FT2FitnessHomeU14         from '../step4/FT2FitnessHomeU14'
import FT3FitnessHomeU13G        from '../step4/FT3FitnessHomeU13G'
import FT4FitnessHomeU16         from '../step4/FT4FitnessHomeU16'
import TL2TestMode               from '../step4/TL2TestMode'
import IL1Injuries               from '../step4/IL1Injuries'
import FC1Concussion             from '../step4/FC1Concussion'
// Step 4 — Coordinator screens (agent 2)
import DCo1CoordinatorHome       from '../step4/DCo1CoordinatorHome'
import DR1Registrations          from '../step4/DR1Registrations'
import FF1LeagueSync             from '../step4/FF1LeagueSync'
import FR1Referees               from '../step4/FR1Referees'
import FD1Cards                  from '../step4/FD1Cards'
// Step 4 — Welfare / goalkeeper (agent 2)
import DW1WelfareCases           from '../step4/DW1WelfareCases'
import FS1Sideline               from '../step4/FS1Sideline'
import FK1Goalkeepers            from '../step4/FK1Goalkeepers'
import HG1HomeKeeperCoach        from '../step4/HG1HomeKeeperCoach'
import HG2KeeperSession          from '../step4/HG2KeeperSession'
// Step 4 — Referee phone screens (agent 2)
import RF2RefGames               from '../step4/RF2RefGames'
import RF3RefReport              from '../step4/RF3RefReport'
import RF4RefFeedback            from '../step4/RF4RefFeedback'
// Step 4 — Parent phone welfare (agent 2)
import PC2bTellHelen             from '../step4/PC2bTellHelen'
// Step 4 — Record screens (agent 3)
import RC1RecordStart            from '../step4/RC1RecordStart'
import RC2RecordFriendly         from '../step4/RC2RecordFriendly'
import RC3RecordDrill            from '../step4/RC3RecordDrill'
import RC4Recording              from '../step4/RC4Recording'
import RC5RecordResults          from '../step4/RC5RecordResults'
import RC6RunHistory             from '../step4/RC6RunHistory'
import RC7Recorded               from '../step4/RC7Recorded'
import RC8HowWeMeasure           from '../step4/RC8HowWeMeasure'
// Step 4 — Pitchside / offline (agent 3)
import TR1bPitchSideDrill        from '../step4/TR1bPitchSideDrill'
import TR1cPitchSideWrap         from '../step4/TR1cPitchSideWrap'
import FO1Offline                from '../step4/FO1Offline'
// Step 4 — Home state variations (agent 3)
import T1sHomeSunday             from '../step4/T1sHomeSunday'
import T1gHomeGameDay            from '../step4/T1gHomeGameDay'
// Step 4 — Suggestions screens (agent 3)
import SG1Suggested              from '../step4/SG1Suggested'
import SG2WhySuggested           from '../step4/SG2WhySuggested'
import SG3AskCleanSheet          from '../step4/SG3AskCleanSheet'
import SG4WhatItUses             from '../step4/SG4WhatItUses'
import SG5WhatWorked             from '../step4/SG5WhatWorked'
// Step 4 — Sign-up screens (agent 3)
import OBSignUp                  from '../step4/OBSignUp'
import OB1SignUp                 from '../step4/OB1SignUp'
import OB3SignUp                 from '../step4/OB3SignUp'
import OB4SignUp                 from '../step4/OB4SignUp'
import OB5SignUp                 from '../step4/OB5SignUp'
// Step 4 — Training / squad / live game screens (agent 3)
import T3TrainingTab             from '../step4/T3TrainingTab'
import T4SquadTab                from '../step4/T4SquadTab'
import T5PlayerProfile           from '../step4/T5PlayerProfile'
import L11LiveGame11             from '../step4/L11LiveGame11'
// Step 4 — Parent phone screens (agent 4)
import PM1ParentChats            from '../step4/PM1ParentChats'
import PM2ParentTeamChat         from '../step4/PM2ParentTeamChat'
import PM3ParentAnnouncements    from '../step4/PM3ParentAnnouncements'
import PM4ParentPoll             from '../step4/PM4ParentPoll'
import PM5ParentAttach           from '../step4/PM5ParentAttach'
import PM6ParentChatSettings     from '../step4/PM6ParentChatSettings'
import PM7ParentReport           from '../step4/PM7ParentReport'
import PM8ParentReadOnly         from '../step4/PM8ParentReadOnly'
import PM9ParentPrivateChat      from '../step4/PM9ParentPrivateChat'
import PM10ParentPhotoCheck      from '../step4/PM10ParentPhotoCheck'
import PC1RaiseConcern           from '../step4/PC1RaiseConcern'
import PC1bConcernSent           from '../step4/PC1bConcernSent'
import PP1TwoChildren            from '../step4/PP1TwoChildren'
import PP2SeasonSummary          from '../step4/PP2SeasonSummary'
import PAParent                  from '../step4/PAParent'
import JN3Join                   from '../step4/JN3Join'
// Step 4 — Academy owner screens (agent 4)
import AC1eAcademyHomeEmpty      from '../step4/AC1eAcademyHomeEmpty'
import AC2Programs               from '../step4/AC2Programs'
import AC3Trials                 from '../step4/AC3Trials'
import AC4AcademyPlayers         from '../step4/AC4AcademyPlayers'
import AC5Fees                   from '../step4/AC5Fees'
import AC6AcademyCoaches         from '../step4/AC6AcademyCoaches'
import AC7ReportsOut             from '../step4/AC7ReportsOut'
import AC9HolidayClinic          from '../step4/AC9HolidayClinic'
import AC11PartnerClub           from '../step4/AC11PartnerClub'
// Step 4 — Academy owner screens (agent 4 extra)
import AC12AcademyBroadcast      from '../step4/AC12AcademyBroadcast'
// Step 4 — Academy coach screens (agent 4)
import ACC2RunSession            from '../step4/ACC2RunSession'
import ACC3TrialAssess           from '../step4/ACC3TrialAssess'
import ACC5OneOnOne              from '../step4/ACC5OneOnOne'
import ACC6ReportDraft           from '../step4/ACC6ReportDraft'
import ACC7AcademyGameDay        from '../step4/ACC7AcademyGameDay'
import ACC12AcademySuggested     from '../step4/ACC12AcademySuggested'
import ACC13AcademyChat          from '../step4/ACC13AcademyChat'
// Step 4 — Invite flow screens (agent 4)
import IVInvite                  from '../step4/IVInvite'
import IV1                       from '../step4/IV1'
import IV2                       from '../step4/IV2'
import IV3                       from '../step4/IV3'

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
import OB2SignUp              from '../step4/OB2SignUp'
import ACC4PlayerPlan         from '../step4/ACC4PlayerPlan'
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

type DemoView = 'signin' | 'start' | 'why' | 'tour' | 'lookaround' | 'sandbox' | 'sandboxlook' | 'nosandbox' | 'notfound'

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

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
function sandboxExpiryLabel(): string {
  const sb = getSandbox()
  if (!sb) return ''
  const exp = new Date(sb.createdAt + 14 * 86400000)
  return `${DAYS[exp.getDay()]} ${exp.getDate()} ${MONTHS[exp.getMonth()]}`
}
function sandboxExpiryShort(): string {
  const sb = getSandbox()
  if (!sb) return ''
  const exp = new Date(sb.createdAt + 14 * 86400000)
  return `${DAYS[exp.getDay()].slice(0,3)} ${exp.getDate()} ${MONTHS[exp.getMonth()]}`
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
      return <ClubAdminScreen empty={false} role="dof" initials="RM" />
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
    case 'playerapp-checkin':
      return <PlayerAppScreen empty={false} initialView="checkin" />
    case 'playerapp-done':
      return <PlayerAppScreen empty={false} initialView="checkin-sent" />
    case 'olderplayer':
      return <OlderPlayerApp empty={false} />
    case 'refereephone':
      return <RefereesPhoneScreen empty={false} />
    case 'academyowner':
      return <AcademyOwnerApp onBack={noop} empty={false} />
    case 'academycoach':
      return <AcademyCoachApp onBack={noop} empty={false} />
    case 'academyparent':
      return <AcademyParentApp onBack={noop} empty={false} initialModal="none" />
    case 'academyparent-trial':
      return <AcademyParentApp onBack={noop} empty={false} initialModal="trial" />
    case 'academyparent-trialbooked':
      return <AcademyParentApp onBack={noop} empty={false} initialModal="trialBooked" />
    case 'academyparent-chat':
      return <AcademyParentApp onBack={noop} empty={false} initialModal="chat" />
    case 'academyparent-fees':
      return <AcademyParentApp onBack={noop} empty={false} initialNav="fees" initialModal="none" />
    case 'academyparent-progress':
      return <AcademyParentApp onBack={noop} empty={false} initialNav="progress" initialModal="none" />
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
    case 'sf0': case 'SF0-Intro':       return <SetOurStyleWizard onClose={noop} initialStep="intro" />
    case 'sf1': case 'SF1-WithBall':    return <SetOurStyleWizard onClose={noop} initialStep={1} />
    case 'sf2': case 'SF2-WithoutBall': return <SetOurStyleWizard onClose={noop} initialStep={2} />
    case 'sf3': case 'SF3-WinIt':       return <SetOurStyleWizard onClose={noop} initialStep={3} />
    case 'sf4': case 'SF4-LoseIt':      return <SetOurStyleWizard onClose={noop} initialStep={4} />
    case 'sf5': case 'SF5-Values':      return <SetOurStyleWizard onClose={noop} initialStep={5} />
    case 'sf6': case 'SF6-Review':      return <SetOurStyleWizard onClose={noop} initialStep="review" />
    case 'sf7': case 'SF7-Saved':       return <SetOurStyleWizard onClose={noop} initialStep="saved" />
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
    case 'gi0': case 'GI0-Recording':  return <AddGameScreen onClose={noop} initialStep={1} />
    case 'gi1': case 'GI1-Wearables':  return <AddGameScreen onClose={noop} initialStep={2} />
    case 'gi2': case 'GI2-WhosWho':    return <AddGameScreen onClose={noop} initialStep={3} />
    case 'gi3': case 'GI3-Analysing':  return <AddGameScreen onClose={noop} initialStep={4} />
    case 'gi4': case 'GI4-Ready':      return <AddGameScreen onClose={noop} initialStep={5} />
    case 'pa-check': return <PACheckScreen />
    case 'coachfitness':
      return <CoachFitnessScreen />
    case 'settings':
      return <SettingsScreen onDone={noop} />

    case 'JuniorCoachApp':      return <JuniorCoachApp />
    case 'livegame':            return <LiveGameScreen onClose={noop} />
    case 'livegame11':          return <LiveGame11Screen onClose={noop} />

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
    case 'ack1-home':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK1AcademyPlayerHome /></div>
    case 'ack1-home-empty':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK1eAcademyPlayerHomeEmpty /></div>
    case 'ack2-practice':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK2HomePractice /></div>
    case 'ack2-practice-e':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK2eHomePracticeEmpty /></div>
    // Design ID aliases — Academy player (Design-ID format)
    case 'ACK1-AcademyPlayerHome':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK1AcademyPlayerHome /></div>
    case 'ACK1e-AcademyPlayerHomeEmpty': return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK1eAcademyPlayerHomeEmpty /></div>
    case 'ACK2-HomePractice':           return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK2HomePractice /></div>
    // Design IDs — Older player phone screens (PO*)
    case 'PO1-OlderHome':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OlderPlayerApp empty={false} initialView="home" /></div>
    case 'PO2-OlderMessage':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OlderPlayerApp empty={false} initialView="messages" initialChat="private" /></div>
    case 'PO3-OlderAvailability':  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OlderPlayerApp empty={false} initialView="home" /></div>
    case 'PO4-OlderLoad':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OlderPlayerApp empty={false} initialView="body" /></div>
    case 'PO6-OlderChats':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OlderPlayerApp empty={false} initialView="messages" initialChat="list" /></div>
    case 'PO7-OlderGroup':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OlderPlayerApp empty={false} initialView="messages" initialChat="group" /></div>
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

    // Design IDs — MiniRoos screens (HM)
    case 'HM1-HomeMiniRoos':          return <HM1HomeMiniRoos />
    case 'HM2-SquadMiniRoos':         return <HM2SquadMiniRoos />
    case 'HM3-TrainingMiniRoos':      return <HM3TrainingMiniRoos />
    case 'HM4-GameDayMiniRoos':       return <HM4GameDayMiniRoos />
    case 'HM5-WhatWeSaw':             return <HM5WhatWeSaw />
    case 'HM5b-ThankParents':         return <HM5bThankParents />
    case 'HM6-SeasonNotes':           return <HM6SeasonNotes />
    case 'HM7-InboxMiniRoos':         return <HM7InboxMiniRoos />
    case 'HM8-CalendarMiniRoos':      return <HM8CalendarMiniRoos />
    case 'HM9-FixturesMiniRoos':      return <HM9FixturesMiniRoos />
    case 'HM10-StaffMiniRoos':        return <HM10StaffMiniRoos />
    case 'HM11-ComingMiniRoos':       return <HM11ComingMiniRoos />
    case 'HM12-ConsentMiniRoos':      return <HM12ConsentMiniRoos />
    case 'HM3e-TrainingMiniRoosEmpty': return <HM3eTrainingMiniRoosEmpty />
    case 'HM2e-SquadMiniRoosEmpty':   return <MiniRoosApp onBack={noop} empty={true} />
    case 'HM2c-PlayerCard':           return <HM2cPlayerCardMiniRoos onBack={noop} />
    case 'HM6n-SeasonNote':           return <HM6nSeasonNoteOne onBack={noop} />
    case 'HM1n-QuickNotes':           return <HM1nQuickNotes onBack={noop} />
    case 'HM4e-GameDayMiniRoosEmpty': return <HM4eGameDayMiniRoosEmpty />
    // Design IDs — Team Manager screens (TM phone)
    case 'TM1-ManagerHome':           return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM1ManagerHome /></div>
    case 'TM2-ManagerGameDay':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM2ManagerGameDay /></div>
    case 'TM3-ManagerChange':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM3ManagerChange /></div>
    case 'TM4-DutyRoster':            return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM4DutyRoster /></div>
    case 'TM5-ManagerMessages':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM5ManagerMessages /></div>
    case 'TM6-ManagerWhosComing':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM6WhoComing /></div>
    case 'TM7-HeadKnock':             return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM8SidelineReport /></div>
    case 'TM8-SidelineReport':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM8SidelineReport /></div>
    case 'TM9-SignOff':               return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM9SignOff /></div>
    case 'TM10-Heat':                 return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM10Heat /></div>
    case 'TM11-GameDayPapers':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM11GameDayPapers /></div>
    case 'TM12-ManagerSetUpChat':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM12ManagerSetUpChat /></div>
    case 'TM13-ManagerPoll':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM13ManagerPoll /></div>
    case 'TM14-ManagerTeamChat':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM14ManagerTeamChat /></div>
    // Design IDs — Team chat sub-screens (CH tablet)
    case 'CH1-TeamChat':              return <CH1TeamChat />
    case 'CH2-Announcements':         return <CH2Announcements />
    case 'CH3-NewChat':               return <CH3NewChat />
    case 'CH4-NewPoll':               return <CH4NewPoll />
    case 'CH5-PollResults':           return <CH5PollResults />
    case 'CH6-Media':                 return <CH6Media />
    case 'CH7-PhotoCheck':            return <CH7PhotoCheck />
    case 'CH9-MessageActions':        return <CH9MessageActions />
    // Design ID aliases — existing tablet coach screens
    case 'T1-TabletTraining':         return <T1TabletTraining />
    case 'C1-ClipsTab':               return <ClipsScreen empty={false} />
    case 'HS1-HomeSeniors':           return <SeniorsYouthCoachApp teamType="seniors" onBack={noop} />
    case 'signup':                    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OBSignUp /></div>
    case 'P1-Consent':                return <P1Consent />
    case 'AV2-ParentAvailability':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><AV2ParentAvailability /></div>
    case 'RCm1-RecordMiniRoos':       return <RCm1RecordChoice />
    case 'RCm2-MiniRoosClips':        return <RCm2ClipPicker />
    // Design ID aliases — Director screens (D* tablet)
    case 'D0-ClubEmpty':              return <D0ClubEmpty />
    case 'D1-ClubOverview':           return <D1ClubOverview />
    case 'D2-Teams':                  return <D2Teams />
    case 'D3-Coaches':                return <D3Coaches />
    case 'D4-Players':                return <D4Players />
    case 'DC1-Calendar':              return <DC1Calendar />
    case 'DM1-CoachMeeting':          return <DM1CoachMeeting />
    case 'DT1-Courses':               return <DT1Courses />
    case 'DX1-CompareTeams':          return <DX1CompareTeams />
    case 'DP1-FairGameTime':          return <DP1FairGameTime />
    case 'FM1-Moves':                 return <FM1Moves />
    case 'FH1-HeadingPolicy':         return <FH1HeadingPolicy />
    case 'FY1-SeasonPlan':            return <FY1SeasonPlan />
    case 'D5-Safeguarding':           return <D5Safeguarding />
    case 'DS1-Concerns':              return <DS1Concerns />
    case 'DS2-DataRequests':          return <DS2DataRequests />
    case 'DB4-Grants':                return <DB4Grants />
    case 'DK1-Kit':                   return <DK1Kit />
    case 'DN1-Nominations':           return <DN1Nominations />
    case 'D0c-ChairWelcome':          return <D0cChairWelcome />
    case 'D1b-ClubChair':             return <ClubAdminScreen empty={false} role="chair" initials="GL" initialTab="club" />
    case 'D6-BoardReport':            return <D6BoardReport />
    case 'DB2-SeasonReview':          return <DB2SeasonReview />
    case 'DB3-LeagueReturns':         return <DB3LeagueReturns />
    case 'FD3-Dispensations':         return <FD3Dispensations />
    case 'FG1-Grading':               return <FG1Grading />

    // Design ID aliases — Fitness/coordinator
    case 'TL1-Tests':                 return <TL1TestLibrary />
    case 'TL3-TestResults':           return <TL3SprintResults />
    // Design ID aliases — Season features
    case 'FN2-SeniorSquad':           return <FN2SeniorSquad />
    case 'FN3-SeniorTeam':            return <FN3SeniorTeam onBack={noop} />
    case 'FP1-PlayFootball':          return <FP1PlayFootball />
    case 'FT1-Trials':                return <FT1Trials />
    case 'FV1-FeesVolunteers':        return <FV1FeesVolunteers />
    case 'FW1-GirlsWomen':            return <FW1GirlsWomen />
    // Design ID aliases — Invite screens (phone)
    case 'IV3c-Invite':               return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><IV3cCoCoachInvite /></div>
    case 'IV3f-Invite':               return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><IV3fFitnessInvite /></div>
    case 'IV4-Invite':                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><IV4ManagerDone /></div>
    // Design ID aliases — JN join flow (phone)
    case 'JN-Join':                   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="landing" /></div>
    case 'JN1-Join':                  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="parent-create" /></div>
    case 'JN2-Join':                  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="parent-child" /></div>
    case 'JN4-Join':                  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="parent-setup" /></div>
    case 'JN5-Join':                  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="parent-done" /></div>
    case 'JN6-Join':                  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="player-age" /></div>
    case 'JN7-Join':                  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="player-code" /></div>
    case 'JN8-Join':                  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="parent-firstaid" /></div>
    case 'JN9a-Join':                 return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="player-18" /></div>
    // Design ID aliases — parent consent (phone)
    case 'P2b-ParentConsent':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><P2bParentConsentStep1 /></div>
    case 'P2c-ParentConsent':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><P2cParentConsentStep2 /></div>

    // Design IDs — Fitness coach screens (GT2, F3, F4, FT*, TL2, IL1, FC1)
    case 'GT2-MeasureSession':        return <GT2MeasureSession />
    case 'F3-FitnessTraining':        return <F3FitnessTraining />
    case 'F4-FitnessMatch':           return <F4FitnessMatch />
    case 'FT2-FitnessHomeU14':        return <FT2FitnessHomeU14 />
    case 'FT3-FitnessHomeU13G':       return <FT3FitnessHomeU13G />
    case 'FT4-FitnessHomeU16':        return <FT4FitnessHomeU16 />
    case 'TL2-TestMode':              return <TL2TestMode />
    case 'IL1-Injuries':              return <IL1Injuries />
    case 'FC1-Concussion':            return <FC1Concussion />
    // Design IDs — Coordinator screens
    case 'DCo1-CoordinatorHome':      return <DCo1CoordinatorHome />
    case 'DR1-Registrations':         return <DR1Registrations />
    case 'FF1-LeagueSync':            return <FF1LeagueSync />
    case 'FR1-Referees':              return <FR1Referees />
    case 'FD1-Cards':                 return <FD1Cards />
    // Design IDs — Welfare / goalkeeper screens
    case 'DW1-WelfareCases':          return <DW1WelfareCases />
    case 'FS1-Sideline':              return <FS1Sideline />
    case 'FK1-Goalkeepers':           return <FK1Goalkeepers />
    case 'HG1-HomeKeeperCoach':       return <HG1HomeKeeperCoach />
    case 'HG2-KeeperSession':         return <HG2KeeperSession />
    // Design IDs — Referee phone screens
    case 'RF2-RefGames':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><RF2RefGames /></div>
    case 'RF3-RefReport':             return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><RF3RefReport /></div>
    case 'RF4-RefFeedback':           return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><RF4RefFeedback /></div>
    // Design IDs — Parent phone welfare
    case 'PC2b-TellHelen':            return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PC2bTellHelen /></div>
    // Design IDs — Record screens (tablet)
    case 'RC1-RecordStart':           return <RC1RecordStart />
    case 'RC2-RecordFriendly':        return <RC2RecordFriendly />
    case 'RC3-RecordDrill':           return <RC3RecordDrill />
    case 'RC4-Recording':             return <RC4Recording />
    case 'RC5-RecordResults':         return <RC5RecordResults />
    case 'RC6-RunHistory':            return <RC6RunHistory />
    case 'RC7-Recorded':              return <RC7Recorded />
    case 'RC8-HowWeMeasure':          return <RC8HowWeMeasure />
    // Design IDs — Pitchside / offline (tablet)
    case 'TR1b-PitchSideDrill':       return <TR1bPitchSideDrill />
    case 'TR1c-PitchSideWrap':        return <TR1cPitchSideWrap />
    case 'FO1-Offline':               return <FO1Offline />
    // Design IDs — Home state variations (tablet)
    case 'T1s-HomeSunday':            return <T1sHomeSunday />
    case 'T1g-HomeGameDay':           return <T1gHomeGameDay />
    // Design IDs — Suggestions screens (tablet)
    case 'SG1-Suggested':             return <SG1Suggested />
    case 'SG2-WhySuggested':          return <SG2WhySuggested />
    case 'SG3-AskCleanSheet':         return <SG3AskCleanSheet />
    case 'SG4-WhatItUses':            return <SG4WhatItUses />
    case 'SG5-WhatWorked':            return <SG5WhatWorked />
    // Design IDs — Sign-up / onboarding screens (phone)
    case 'OB-SignUp':                 return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OBSignUp /></div>
    case 'OB1-SignUp':                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OB1SignUp /></div>
    case 'OB3-SignUp':                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OB3SignUp /></div>
    case 'OB4-SignUp':                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OB4SignUp /></div>
    case 'OB2-SignUp':                return <OB2SignUp />
    case 'OB5-SignUp':                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OB5SignUp /></div>
    // Design IDs — Training tab / squad / live game (tablet)
    case 'T3-TrainingTab':            return <T3TrainingTab />
    case 'T4-SquadTab':               return <T4SquadTab />
    case 'T5-PlayerProfile':          return <T5PlayerProfile />
    case 'L11-LiveGame11':            return <L11LiveGame11 />
    // Design IDs — Parent phone chat screens
    case 'PM1-ParentChats':           return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM1ParentChats /></div>
    case 'PM2-ParentTeamChat':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM2ParentTeamChat /></div>
    case 'PM3-ParentAnnouncements':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM3ParentAnnouncements /></div>
    case 'PM4-ParentPoll':            return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM4ParentPoll /></div>
    case 'PM5-ParentAttach':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM5ParentAttach /></div>
    case 'PM6-ParentChatSettings':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM6ParentChatSettings /></div>
    case 'PM7-ParentReport':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM7ParentReport /></div>
    case 'PM8-ParentReadOnly':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM8ParentReadOnly /></div>
    case 'PM9-ParentPrivateChat':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM9ParentPrivateChat /></div>
    case 'PM10-ParentPhotoCheck':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM10ParentPhotoCheck /></div>
    case 'PC1-RaiseConcern':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PC1RaiseConcern /></div>
    case 'PC1b-ConcernSent':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PC1bConcernSent /></div>
    case 'PP1-TwoChildren':           return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PP1TwoChildren /></div>
    case 'PP2-SeasonSummary':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PP2SeasonSummary /></div>
    case 'PA-Parent':                 return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PAParent /></div>
    case 'JN3-Join':                  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JN3Join /></div>
    // Design IDs — Academy owner screens (tablet)
    case 'AC1e-AcademyHomeEmpty':     return <AcademyOwnerApp onBack={noop} empty={true} />
    case 'AC1-AcademyHome':           return <AcademyOwnerApp onBack={noop} empty={false} />
    case 'AC2e-ProgramsEmpty':        return <AC1eAcademyHomeEmpty />
    case 'AC2-Programs':              return <AC2Programs />
    case 'AC3-Trials':                return <AC3Trials />
    case 'AC4-AcademyPlayers':        return <AC4AcademyPlayers />
    case 'AC5-Fees':                  return <AC5Fees />
    case 'AC6-AcademyCoaches':        return <AC6AcademyCoaches />
    case 'AC7-ReportsOut':            return <AC7ReportsOut />
    case 'AC9-HolidayClinic':         return <AC9HolidayClinic />
    case 'AC11-PartnerClub':          return <AC11PartnerClub />
    case 'AC10-AcademySafety':        return <AcademyOwnerApp onBack={noop} empty={false} />
    case 'AC12-AcademyBroadcast':     return <AC12AcademyBroadcast />
    // Design IDs — Academy coach screens (tablet)
    case 'ACC2-RunSession':           return <ACC2RunSession />
    case 'ACC3-TrialAssess':          return <ACC3TrialAssess />
    case 'ACC4-PlayerPlan':           return <ACC4PlayerPlan />
    case 'ACC5-OneOnOne':             return <ACC5OneOnOne />
    case 'ACC6-ReportDraft':          return <ACC6ReportDraft />
    case 'ACC7-AcademyGameDay':       return <ACC7AcademyGameDay />
    case 'ACC12-AcademySuggested':    return <ACC12AcademySuggested />
    case 'ACC13-AcademyChat':         return <ACC13AcademyChat />
    // Design IDs — Invite flow (phone)
    case 'IV-Invite':                 return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><IVInvite /></div>
    case 'IV1-Invite':                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><IV1 /></div>
    case 'IV2-Invite':                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><IV2 /></div>
    case 'IV3-Invite':                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><IV3 /></div>

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

    // Design ID aliases — Football year (SP* tablet screens)
    case 'SP15-ComingBack':           return <SP15ComingBack onBack={noop} />
    case 'SP16-RestMonth':            return <SP16RestMonth onBack={noop} />
    case 'SP20-StandIn':              return <SP20StandIn onBack={noop} />
    case 'SP21-StandInHome':          return <SP21StandInHome onBack={noop} />
    case 'SPy10-YouthPostSeason':     return <SPy10YouthPostSeason onBack={noop} />
    case 'SPy16-YouthRestMonth':      return <SPy16YouthRestMonth onBack={noop} />
    case 'SPs10-SeniorPostSeason':    return <SPs10SeniorPostSeason onBack={noop} />
    case 'SPs16-SeniorOffSeason':     return <SPs16SeniorOffSeason onBack={noop} />
    case 'SPm2-MiniRoosPreSeason':    return <SPm2MiniRoosPreSeason onBack={noop} />
    case 'SPm10-MiniRoosPostSeason':  return <SPm10MiniRoosPostSeason onBack={noop} />
    case 'SPm16-MiniRoosRest':        return <SPm16MiniRoosRest onBack={noop} />
    // Design ID aliases — Football year (SPp* phone screens)
    case 'SPp1-ParentPreSeason':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp1ParentPreSeason onBack={noop} /></div>
    case 'SPp2-ParentComingBack':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp2ParentComingBack onBack={noop} /></div>
    case 'SPp3-ParentTournament':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp3ParentTournament onBack={noop} /></div>
    case 'SPp4-ParentRestMonth':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp4ParentRestMonth onBack={noop} /></div>
    case 'SPp6-ManagerTournament':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp6ManagerTournament onBack={noop} /></div>
    case 'SPp7-PlayerRestMonth':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp7PlayerRestMonth onBack={noop} /></div>
    case 'SPp8-StandInAsked':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp8StandInAsked onBack={noop} /></div>
    case 'SPp10-ManagerPreSeason':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp10ManagerPreSeason /></div>
    case 'SPp11-ManagerPostSeason':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp11ManagerPostSeason /></div>
    case 'SPp12-ManagerRestMonth':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp12ManagerRestMonth /></div>
    case 'SPp13-PlayerPreSeason':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp13PlayerPreSeason /></div>
    case 'SPp14-PlayerPostSeason':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp14PlayerPostSeason /></div>
    case 'SPp15-OlderPreSeason':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp15OlderPreSeason /></div>
    case 'SPp16-OlderPostSeason':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp16OlderPostSeason /></div>
    case 'SPp17-OlderRestMonth':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp17OlderRestMonth /></div>
    // Design ID aliases — Coach phone (CPh* phone screens)
    case 'CPh1-CoachPhoneHome':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh1CoachPhoneHome /></div>
    case 'CPh2-CoachPhoneComing':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh2CoachPhoneComing /></div>
    case 'CPh3-CoachPhoneMessages':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh3CoachPhoneMessages /></div>
    case 'CPh4-CoachPhoneGame':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh4CoachPhoneGame /></div>
    case 'CPh5-CoachPhonePlan':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh5CoachPhonePlan /></div>
    case 'CPh1e-CoachPhoneHomeEmpty':  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh1eCoachPhoneHomeEmpty /></div>
    case 'CPh4e-CoachPhoneGameEmpty':  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh4eCoachPhoneGameEmpty /></div>
    // Design ID aliases — Sign-in / demo screens
    case 'SI5-TooManyTries':           return <SignInFlow initialState="toomany" />
    case 'DEMO-Why':                   return <DemoWhy onBack={noop} />
    // Design ID aliases — Settings, fitness, staff, misc
    case 'DSet2-ClubRoles':            return <DSet2Roles />
    case 'DSet3-ClubConnections':      return <DSet3Connections />
    case 'DSet6-PartnerAcademy':       return <DSet6PartnerAcademy />
    case 'SET4e-DevicesEmpty':         return <SET4eDevicesEmpty />
    case 'SET6-Display':               return <SET6Display />
    case 'IL1e-InjuriesEmpty':         return <IL1eInjuryLogEmpty />
    case 'TL3e-TestResultsEmpty':      return <TL3eSprintResultsEmpty />
    case 'CC1e-CoachHomeSharedEmpty':  return <CC1eCoachHomeEmpty />
    case 'TM6e-WhosComingEmpty':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM6eWhoComingEmpty /></div>
    case 'I1e-InboxVests':             return <I1eInboxVests />
    case 'ACP7-ShareWithClub':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP7ShareWithClub /></div>
    case 'ACP9-JoinGameTeam':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP9JoinGameTeam /></div>
    case 'HM1r-NotesBack':             return <HM1rNotesBack onBack={noop} />
    case 'HM2c-PlayerCardMiniRoos':    return <HM2cPlayerCardMiniRoos onBack={noop} />
    case 'HM6n-SeasonNoteOne':         return <HM6nSeasonNoteOne onBack={noop} />
    case 'SE2-PlayerSummary':          return <SE2PlayerSummary onBack={noop} />
    case 'PO5s-AdultSettings':         return <PO5sAdultSettings onBack={noop} />
    case 'C1s-ClipSearch':             return <C1sClipSearch onBack={noop} />
    case 'ACC8p-PairCamera':           return <ACC8pPairCamera onBack={noop} />
    case 'PA-Check':                   return <PACheckScreen />
    case 'PA-PlayerApp':               return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PAParent /></div>

    // Sandbox empty-state homes
    case 'home-e':
      return <JuniorCoachApp empty={true} />
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
    case 'youth-e':
      return <SeniorsYouthCoachApp teamType="youth" onBack={noop} empty={true} />
    case 'seniors-e':
      return <SeniorsYouthCoachApp teamType="seniors" onBack={noop} empty={true} />
    case 'goalkeeper-e':
      return <GoalkeeperCoachApp onBack={noop} empty={true} />
    case 'parent-e':
      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TwoChildrenApp onBack={noop} empty={true} /></div>
    case 'playeryoung-e':
      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PlayerAppScreen empty={true} /></div>
    case 'playerolder-e':
      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><OlderPlayerApp empty={true} /></div>
    case 'director-e':
      return <D0ClubEmpty />
    case 'chair-e':
      return <ClubAdminScreen empty={true} role="chair" initials="GL" />
    case 'coordinator-e':
      return <CoordinatorPortal onBack={noop} empty={true} />
    case 'welfare-e':
      return <ClubAdminScreen empty={true} role="welfare" initials="HP" initialTab="welfare" />
    case 'academyowner-e':
      return <AcademyOwnerApp onBack={noop} empty={true} />
    case 'academycoach-e':
      return <AcademyCoachApp onBack={noop} empty={true} />
    case 'academyparent-e':
      return <AcademyParentApp onBack={noop} empty={true} />
    case 'academyplayer-e':
      return <AcademyPlayerApp onBack={noop} empty={true} />
    case 'referee-e':
      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><RefereesPhoneScreen empty={true} /></div>

    default:
      return (
        <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div style={{ fontSize: 15, color: '#6f7f7b' }}>Screen "{key}" not yet built.</div>
        </div>
      )
  }
}

function viewToPath(view: DemoView, role: RoleId, screen?: string): string {
  if (view === 'lookaround')  return screen ? `/look/${role}/${screen}` : `/look/${role}`
  if (view === 'tour')        return screen ? `/tour/${role}/${screen}` : `/tour/${role}`
  if (view === 'sandboxlook') return screen ? `/sandbox/${role}/${screen}` : `/sandbox/${role}`
  if (view === 'start')       return '/start'
  if (view === 'sandbox')     return '/sandbox'
  if (view === 'nosandbox')   return '/nosandbox'
  if (view === 'why')         return '/why'
  return '/'
}

function pathToState(path: string): { view: DemoView; role: RoleId; screen?: string } {
  if (path === '/' || path === '')  return { view: 'signin',   role: 'coach' }
  if (path === '/start')            return { view: 'start',    role: 'coach' }
  if (path === '/why')              return { view: 'why',      role: 'coach' }
  if (path === '/sandbox')          return { view: 'sandbox',  role: 'coach' }
  if (path === '/nosandbox')        return { view: 'nosandbox', role: 'coach' }
  const m1 = path.match(/^\/look\/([a-z0-9]+)(?:\/(.+))?$/)
  if (m1) {
    if (!(m1[1] in TOURS)) return { view: 'notfound', role: 'coach' }
    const lookRole = m1[1] as RoleId
    const lookScreen = m1[2]
    if (lookScreen !== undefined) {
      const LOOK_SCREENS: Partial<Record<RoleId, Set<string>>> = {
        coach:        new Set(['home', 'squad', 'training', 'matchday', 'clips']),
        ccoach:       new Set(['home', 'squad', 'training', 'matchday', 'clips']),
        youth:        new Set(['home', 'squad', 'training', 'matchday', 'clips']),
        seniors:      new Set(['home', 'squad', 'training', 'matchday', 'clips']),
        miniroos:     new Set(['home', 'squad', 'training', 'gameday']),
        goalkeeper:   new Set(['home', 'keepers', 'training', 'clips']),
        fitness:      new Set(['home', 'squad', 'training', 'matchday']),
        academyowner: new Set(['home', 'programs', 'players', 'coaches', 'money']),
        academycoach: new Set(['today', 'players', 'gameday', 'library']),
      }
      if (!LOOK_SCREENS[lookRole]?.has(lookScreen)) return { view: 'notfound', role: 'coach' }
    }
    return { view: 'lookaround', role: lookRole, screen: lookScreen }
  }
  const m2 = path.match(/^\/tour\/([a-z0-9]+)(?:\/(\d+))?$/)
  if (m2) return m2[1] in TOURS ? { view: 'tour', role: m2[1] as RoleId, screen: m2[2] } : { view: 'notfound', role: 'coach' }
  const m3 = path.match(/^\/sandbox\/([a-z0-9]+)(?:\/(.+))?$/)
  if (m3) return m3[1] in TOURS ? { view: 'sandboxlook', role: m3[1] as RoleId, screen: m3[2] } : { view: 'notfound', role: 'coach' }
  return { view: 'notfound', role: 'coach' }
}

export default function DemoApp() {
  const init = pathToState(window.location.pathname)
  const [view, setView] = useState<DemoView>(init.view)
  const [role, setRole] = useState<RoleId>(init.role)
  const [screen, setScreen] = useState<string | undefined>(init.screen)
  const [phase, setPhase] = useState<DemoPhase>('season')
  const [filled, setFilled] = useState(() => localStorage.getItem('cs_demo_sandbox_filled') === '1')
  const [isPhone, setIsPhone] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsPhone(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const path = viewToPath(view, role, screen)
    if (window.location.pathname !== path)
      window.history.pushState(null, '', path)
  }, [view, role, screen])

  useEffect(() => {
    const onPop = () => {
      const { view: v, role: r, screen: s } = pathToState(window.location.pathname)
      setView(v)
      setRole(r)
      setScreen(s)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function startTour(roleId: RoleId) {
    setRole(roleId)
    setScreen(undefined)
    setView('tour')
  }

  function startLook(roleId: RoleId) {
    setRole(roleId)
    setScreen(undefined)
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

  if (view === 'notfound') {
    return <ER4NotFound />
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
        expiryDate={sandboxExpiryLabel()}
        onFill={() => {
          localStorage.setItem('cs_demo_sandbox_filled', '1')
          setFilled(true)
          alert('Sample data loaded. 18 players, 3 games and recordings, marked as samples.')
        }}
        onReset={() => {
          if (window.confirm("Remove everything you've added and start again?")) {
            localStorage.removeItem('cs_demo_sandbox_filled')
            deleteSandbox()
            createSandbox()
            setFilled(false)
          }
        }}
      />
    )
  }

  if (view === 'sandboxlook') {
    const tour = TOURS[role]
    const homeKey = filled ? tour.home : (tour.sandboxHome ?? tour.home)
    return (
      <DemoShellSandbox
        roleId={role}
        onSwitchRole={() => setView('sandbox')}
        onSwitchToDemo={() => setView('start')}
        phase={PHASE_ROLES.has(role) ? phase : undefined}
        onPhaseChange={PHASE_ROLES.has(role) ? setPhase : undefined}
        expiryShort={sandboxExpiryShort()}
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
    const initStep = screen !== undefined ? parseInt(screen, 10) : 0
    return (
      <DemoTourShell
        roleId={role}
        onBack={() => setView('start')}
        renderScreen={renderScreen}
        initialStep={isNaN(initStep) ? 0 : initStep}
        onStepChange={n => setScreen(String(n))}
      />
    )
  }

  if (view === 'lookaround') {
    const homeKey = TOURS[role].home
    let lookContent: ReactNode
    if (role === 'coach') {
      if (window.innerWidth <= 640) {
        lookContent = <CoachPhoneApp />
      } else {
        const pc = phase === 'preseason' ? <SP2HomePreSeason onBack={noop} />
                 : phase === 'postseason' ? <SP10HomePostSeason onBack={noop} />
                 : phase === 'restmonth' ? <SP16RestMonth onBack={noop} />
                 : undefined
        lookContent = <JuniorCoachApp phaseContent={pc} initialScreen={screen} onNavChange={setScreen} />
      }
    } else if (role === 'ccoach') {
      const pc = phase === 'preseason' ? <SPc2CoCoachPreSeason onBack={noop} />
               : phase === 'postseason' ? <SP10HomePostSeason onBack={noop} />
               : phase === 'restmonth' ? <SP16RestMonth onBack={noop} />
               : undefined
      lookContent = <JuniorCoachApp phaseContent={pc} coachLabel="U12 Sam · Co-coach" coachInitials="JM" initialScreen={screen} onNavChange={setScreen} coachRole="ccoach" />
    } else if (role === 'youth') {
      const pc = phase === 'preseason' ? <SPy2YouthPreSeason onBack={noop} />
               : phase === 'postseason' ? <SPy10YouthPostSeason onBack={noop} />
               : phase === 'restmonth' ? <SPy16YouthRestMonth onBack={noop} />
               : undefined
      lookContent = <SeniorsYouthCoachApp teamType="youth" onBack={noop} phaseContent={pc} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'seniors') {
      const pc = phase === 'preseason' ? <SPs2SeniorPreSeason onBack={noop} />
               : phase === 'postseason' ? <SPs10SeniorPostSeason onBack={noop} />
               : phase === 'restmonth' ? <SPs16SeniorOffSeason onBack={noop} />
               : undefined
      lookContent = <SeniorsYouthCoachApp teamType="seniors" onBack={noop} phaseContent={pc} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'miniroos') {
      const pc = phase === 'preseason' ? <SPm2MiniRoosPreSeason onBack={noop} />
               : phase === 'postseason' ? <SPm10MiniRoosPostSeason onBack={noop} />
               : phase === 'restmonth' ? <SPm16MiniRoosRest onBack={noop} />
               : undefined
      lookContent = <div style={{ width: 1180, background: 'var(--surface-100)' }}><MiniRoosApp onBack={() => setRole('coach')} empty={false} phaseContent={pc} initialScreen={screen} onNavChange={setScreen} /></div>
    } else if (role === 'goalkeeper') {
      lookContent = <GoalkeeperCoachApp onBack={() => setRole('coach')} empty={false} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'fitness') {
      lookContent = <FitnessCoachScreen empty={false} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'academyowner') {
      lookContent = <AcademyOwnerApp onBack={() => setRole('academycoach')} empty={false} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'academycoach') {
      lookContent = <AcademyCoachApp onBack={() => setRole('coach')} empty={false} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'academyparent') {
      lookContent = <AcademyParentApp onBack={() => setView('start')} empty={false} />
    } else if (role === 'academyplayer') {
      lookContent = <AcademyPlayerApp onBack={() => setView('start')} empty={false} />
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
