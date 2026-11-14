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
// Step 4 screens — New (DSet1, DSet4, ACC1)
import DSet1ClubSettings          from '../step4/DSet1ClubSettings'
import DSet4ClubRules             from '../step4/DSet4ClubRules'
import ACC1CoachToday             from '../step4/ACC1CoachToday'
import ACC1eCoachTodayEmpty       from '../step4/ACC1eCoachTodayEmpty'
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
import { D7U9Blue, D7U9Green, D7U10Mixed, D7U12Girls, D7U13Boys, D7U13Girls, D7U16Boys } from '../step4/D7ExtraTeams'
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
import TM7HeadKnock               from '../step4/TM7HeadKnock'
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
import StartPage             from '../start/StartPage'
import { HomeStoryTablet }   from '../story/HomeStory'
import { TABLET_CONFIGS }     from '../story/configs'
import DemoWhy               from './DemoWhy'
import DemoTourShell         from './DemoTourShell'
import DemoPhone             from './DemoPhone'
import DemoShell, { type DemoPhase } from './DemoShell'
import DemoShellPhone        from './DemoShellPhone'
import DemoShellSandbox      from './DemoShellSandbox'
import { TOURS, type RoleId } from './tours'
import { readStore, writeStore, clearStore, storeHasData, sampleStore, type SandboxStore } from '../sandbox/sandboxStore'
import { SandboxContext } from '../sandbox/SandboxContext'
import { AskPhoneOpen } from '../AskCleanSheet'
import { MessagesRules, CoachNewMessage, CoachMessages, CoachMessagesPersonCard, DirectorMessages, ParentMessages, ParentMessagesEmpty, ParentNewMessage, RefereeMessages } from '../MessagesScreens'
import { AcademyTrainingWeek, AcademyTrainingSuggested, AcademySessionPlan, AcademyWhoComing, AcademyTrainingWeekEmpty } from '../AcademyTraining'
import { RecordHub, RecordSaved, RecordHubEmpty } from '../RecordHub'
import { SquadLineups, SquadLineupsEmpty } from '../SquadLineups'
import PAR0SameTools from '../PAR0SameTools'
import C2ClipsByGame                     from '../step4/C2ClipsByGame'
import { C3ClipsByPlayer, CL1Playlists, TC1ToCheck, TC1bToCheckDone, TC1eToCheckEmpty } from '../step4/ClipsSubScreens'
import { GT1Growth, GT1eGrowthEmpty }    from '../step4/GT1Growth'
import { WK1ThisWeek, CF1Fixtures, AV1Availability, MS1TeamSheet, R1MatchReview, SE1SeasonSummaries, SE1eSeasonSummariesEmpty, AV1eAvailabilityEmpty } from '../step4/CoachSubScreens'
import { DSet5ClubPlan, DRo1Rollover, DRo1eRolloverEmpty } from '../step4/DirScreens2'
import { B1CoachAndFitness, PO1OlderHome, CH8ChatInfo, PS1ParentSettings, PS2ParentNotifications, PS3ParentData, PS4PlayerMe } from '../step4/MiscScreens'
import {
  D2eTeamsEmpty, D3eCoachesEmpty, D4ePlayersEmpty, D5eSafeguardingEmpty, D6eBoardReportEmpty,
  DB2eSeasonReviewEmpty, DB3eLeagueReturnsEmpty, DB4eGrantsEmpty, DC1eCalendarEmpty, DCo1eCoordinatorHomeEmpty,
  DK1eKitEmpty, DSet3eClubConnectionsEmpty, DSet4eClubRulesEmpty, DM1eCoachMeetingEmpty, DP1eFairGameTimeEmpty,
  DR1eRegistrationsEmpty, DS1eConcernsEmpty, DS2eDataRequestsEmpty, DT1eCoursesEmpty, DW1eWelfareCasesEmpty,
  DX1eCompareTeamsEmpty,
  HM1eHomeMiniRoosEmpty, HM6eSeasonNotesEmpty, HM7eInboxMiniRoosEmpty, HM8eCalendarMiniRoosEmpty,
  HM9eFixturesMiniRoosEmpty, HM10eStaffMiniRoosEmpty, HM11eComingMiniRoosEmpty, HM12eConsentMiniRoosEmpty,
  AC3eTrialsEmpty, AC4eAcademyPlayersEmpty, AC5eFeesEmpty, AC6eAcademyCoachesEmpty, AC7eReportsEmpty,
  AC8eAcademyRecordEmpty, AC9eHolidayClinicEmpty, AC10eAcademySafetyEmpty, AC11ePartnerClubEmpty, AC12eAcademyBroadcastEmpty,
  ACC2eRunSessionEmpty, ACC3eTrialAssessEmpty, ACC4ePlayerPlanEmpty, ACC5eOneOnOneEmpty, ACC6eReportDraftEmpty,
  ACC7eAcademyGameDayEmpty, ACC8eAcademyRecordEmpty, ACC12eAcademySuggestedEmpty, ACC13eAcademyChatEmpty,
  CH1eTeamChatEmpty, CH2eAnnouncementsEmpty, CH5ePollResultsEmpty, CH6eMediaEmpty,
  CHm1TeamChatMiniRoos, CHm1eTeamChatMiniRoosEmpty,
  PM1eParentChatsEmpty, PM2eParentTeamChatEmpty, PM9eParentPrivateChatEmpty, AV2eParentAvailabilityEmpty,
  FC1eConcussionEmpty, FK1eGoalkeepersEmpty, MS1eTeamSheetEmpty,
  PO1eOlderHomeEmpty, PO2eOlderClipsEmpty, PO4eOlderBodyEmpty,
} from '../step4/EmptyScreenBatch'

// Step 4 — Item 7 missing screens (Nov 2026)
import RC1eRecordStartEmpty            from '../step4/RC1eRecordStartEmpty'
import RC4eRecordingNoCameraEmpty      from '../step4/RC4eRecordingNoCameraEmpty'
import RC5eRecordResultsFirstEmpty     from '../step4/RC5eRecordResultsFirstEmpty'
import RC6eRunHistoryEmpty             from '../step4/RC6eRunHistoryEmpty'
import RC7eRecordedEmpty               from '../step4/RC7eRecordedEmpty'
import RCm2eClipsEmpty                 from '../step4/RCm2eClipsEmpty'
import TM1eManagerHomeEmpty            from '../step4/TM1eManagerHomeEmpty'
import TM2eManagerGameDayEmpty         from '../step4/TM2eManagerGameDayEmpty'
import TM4eDutyRosterEmpty             from '../step4/TM4eDutyRosterEmpty'
import TM5eManagerMessagesEmpty        from '../step4/TM5eManagerMessagesEmpty'
import FM1eMovesEmpty                  from '../step4/FM1eMovesEmpty'
import FW1eGirlsWomenEmpty             from '../step4/FW1eGirlsWomenEmpty'
import FS1eSidelineEmpty               from '../step4/FS1eSidelineEmpty'
import FY1eSeasonPlanEmpty             from '../step4/FY1eSeasonPlanEmpty'
import FD3eDispensationsEmpty          from '../step4/FD3eDispensationsEmpty'
import FG1eGradingEmpty                from '../step4/FG1eGradingEmpty'
import FT1eFitnessHomeEmpty            from '../step4/FT1eFitnessHomeEmpty'
import F3eFitnessTrainingEmpty         from '../step4/F3eFitnessTrainingEmpty'
import HG2eKeeperSessionEmpty          from '../step4/HG2eKeeperSessionEmpty'
import TS1FitnessLevel                 from '../step4/TS1FitnessLevel'
import SG5eWhatWorkedEmpty             from '../step4/SG5eWhatWorkedEmpty'
import X16OppositionEmpty              from '../step4/X16OppositionEmpty'
import SGm1SuggestedMiniRoos           from '../step4/SGm1SuggestedMiniRoos'
import SGm1eSuggestedMiniRoosEmpty     from '../step4/SGm1eSuggestedMiniRoosEmpty'
import PP2eSeasonSummaryEmpty          from '../step4/PP2eSeasonSummaryEmpty'
import ACP4eParentFeesEmpty            from '../step4/ACP4eParentFeesEmpty'
import RF2eRefGamesEmpty               from '../step4/RF2eRefGamesEmpty'
import X10DrillsEmpty                  from '../step4/X10DrillsEmpty'
import ACC9AcademyRecordDrill          from '../step4/ACC9AcademyRecordDrill'
import ACC11AcademyRecording           from '../step4/ACC11AcademyRecording'
import ACC10AcademyRecordResults       from '../step4/ACC10AcademyRecordResults'
import ACC10eAcademyRecordResultsEmpty from '../step4/ACC10eAcademyRecordResultsEmpty'
import DF1DrillDetail                  from '../step4/DF1DrillDetail'
import DF2AddSheet                     from '../step4/DF2AddSheet'
import DF3OwnBasics                    from '../step4/DF3OwnBasics'
import DF4OwnDraw                      from '../step4/DF4OwnDraw'
import DF5OwnFixes                     from '../step4/DF5OwnFixes'
import DF6OwnCoaching                  from '../step4/DF6OwnCoaching'
import DF7OwnSaved                     from '../step4/DF7OwnSaved'
import RF1RefAsked                     from '../step4/RF1RefAsked'
import PK1YoungNews                    from '../step4/PK1YoungNews'
import PE1EffortRating                 from '../step4/PE1EffortRating'
import SPp5TrialOutcome                from '../step4/SPp5TrialOutcome'
import EX1HowWorkedOut                 from '../step4/EX1HowWorkedOut'
import EX1eHowWorkedOutEmpty           from '../step4/EX1eHowWorkedOutEmpty'
import L1bLiveGameSub                  from '../step4/L1bLiveGameSub'
import I1bInboxElla                    from '../step4/I1bInboxElla'
import SPa1AcademyYear                 from '../step4/SPa1AcademyYear'

// Step 4 — Features & Billing (PRM)
import PRM1FeaturesByTeam             from '../step4/PRM1FeaturesByTeam'
import PRM1eFeaturesEmpty             from '../step4/PRM1eFeaturesEmpty'
import PRM2TurnOn                     from '../step4/PRM2TurnOn'
import PRM3Bill                       from '../step4/PRM3Bill'
import PRM4CoachOff                   from '../step4/PRM4CoachOff'
import PRM5CoachAsk                   from '../step4/PRM5CoachAsk'
import PRM6Usage                      from '../step4/PRM6Usage'
// Step 4 — Files (FIL)
import FIL1Files                      from '../step4/FIL1Files'
import FIL1eFilesEmpty                from '../step4/FIL1eFilesEmpty'
import FIL2Sheet                      from '../step4/FIL2Sheet'
import FIL2bSheetLineup               from '../step4/FIL2bSheetLineup'
import FIL3Doc                        from '../step4/FIL3Doc'
import FIL3bDocParent                 from '../step4/FIL3bDocParent'
import FIL4Share                      from '../step4/FIL4Share'
import FIL5ClubFiles                  from '../step4/FIL5ClubFiles'
import FIL6SignUp                     from '../step4/FIL6SignUp'
import FIL7Form                       from '../step4/FIL7Form'
import FILp1ParentFiles               from '../step4/FILp1ParentFiles'
import FILp2ParentSignUp              from '../step4/FILp2ParentSignUp'
import FILp3ParentForm                from '../step4/FILp3ParentForm'
// Step 4 — Playing Up (PU)
import PU1PlayingUp                   from '../step4/PU1PlayingUp'
import PU1ePlayingUpEmpty             from '../step4/PU1ePlayingUpEmpty'
import PU2PlayerReadiness             from '../step4/PU2PlayerReadiness'
import PU3TrialPlan                   from '../step4/PU3TrialPlan'
import PU4Compare                     from '../step4/PU4Compare'
import PU5Settings                    from '../step4/PU5Settings'
import PU6Review                      from '../step4/PU6Review'
import PU7CoachView                   from '../step4/PU7CoachView'
import PUp1ParentAsk                  from '../step4/PUp1ParentAsk'
import PUp2PlayerAsk                  from '../step4/PUp2PlayerAsk'
// Step 4 — Playing Down / Across (PX)
import PX1PlayingDown                 from '../step4/PX1PlayingDown'
import PX2LateDeveloper               from '../step4/PX2LateDeveloper'
import PX3BandedNight                 from '../step4/PX3BandedNight'
import PXp1ParentDown                 from '../step4/PXp1ParentDown'
// Step 4 — Learn (EDU)
import EDU1Learn                      from '../step4/EDU1Learn'
import EDU1eLearnEmpty                from '../step4/EDU1eLearnEmpty'
import EDU2Lesson                     from '../step4/EDU2Lesson'
import EDU3MakeLesson                 from '../step4/EDU3MakeLesson'
import EDU4ClubLibrary                from '../step4/EDU4ClubLibrary'
import EDU5CoachCorner                from '../step4/EDU5CoachCorner'
import EDU6CoachPaths                 from '../step4/EDU6CoachPaths'
import EDUp1PlayerLearn               from '../step4/EDUp1PlayerLearn'
import ASKd1HomeRest                  from '../step4/ASKd1HomeRest'
import ASKd2HomeFocus                 from '../step4/ASKd2HomeFocus'
import ASKd3AnyScreen                 from '../step4/ASKd3AnyScreen'
import ASKd4PanelFirst                from '../step4/ASKd4PanelFirst'
import ASKd5PanelAnswer               from '../step4/ASKd5PanelAnswer'
import ASKd6States                    from '../step4/ASKd6States'
import ASKd7OtherRole                 from '../step4/ASKd7OtherRole'
import ASKd8PhoneHome                 from '../step4/ASKd8PhoneHome'
import ASKd9PhoneScreen               from '../step4/ASKd9PhoneScreen'
import ASKp2PhoneAskOpen              from '../step4/ASKp2PhoneAskOpen'
// Step 4 — Same Tools screens (item 12)
import STPh1HomeJuniors               from '../step4/STPh1HomeJuniors'
import STPh2HomeYouth                 from '../step4/STPh2HomeYouth'
import STPh3HomeSeniors               from '../step4/STPh3HomeSeniors'
import STPh4HomeAssistant             from '../step4/STPh4HomeAssistant'
import STPh4eHomeAssistantEmpty       from '../step4/STPh4eHomeAssistantEmpty'
import STWa1WhereWeAt                 from '../step4/STWa1WhereWeAt'
import STWa1eWhereWeAtEmpty           from '../step4/STWa1eWhereWeAtEmpty'
import STWa2WhereWeAtYouth            from '../step4/STWa2WhereWeAtYouth'
import STWa3WhereWeAtSeniors          from '../step4/STWa3WhereWeAtSeniors'
import STMs1MiniRoosStyle             from '../step4/STMs1MiniRoosStyle'
import STMs1eMiniRoosStyleEmpty       from '../step4/STMs1eMiniRoosStyleEmpty'
import STMs2MiniRoosWhereWeAt         from '../step4/STMs2MiniRoosWhereWeAt'
import STMs2eMiniRoosWhereWeAtEmpty   from '../step4/STMs2eMiniRoosWhereWeAtEmpty'
import STMs3MiniRoosReview            from '../step4/STMs3MiniRoosReview'
import STMs3eMiniRoosReviewEmpty      from '../step4/STMs3eMiniRoosReviewEmpty'
import STMs4MiniRoosChild             from '../step4/STMs4MiniRoosChild'
import STMs4eMiniRoosChildEmpty       from '../step4/STMs4eMiniRoosChildEmpty'
import STMs5HomeMiniRoos              from '../step4/STMs5HomeMiniRoos'

type DemoView = 'signin' | 'start' | 'why' | 'tour' | 'lookaround' | 'sandbox' | 'sandboxlook' | 'nosandbox' | 'notfound' | 'noaccess' | 'screendirect'

const SANDBOX_KEY = 'cs_demo_sandbox_v1'

function getSandbox(): { createdAt: number } | null {
  try {
    const v = localStorage.getItem(SANDBOX_KEY)
    return v ? JSON.parse(v) as { createdAt: number } : null
  } catch { return null }
}

function createSandbox() {
  localStorage.setItem(SANDBOX_KEY, JSON.stringify({ createdAt: Date.now() }))
  clearStore()  // always start fresh — wipes any previous Fill
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

function MatchDayScreenNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <MatchDayScreen onNav={(s) => setInner(s)} empty={false} />
}

function MessagesRulesNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <MessagesRules onNav={(s) => setInner(s)} />
}
function CoachNewMessageNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <CoachNewMessage onNav={(s) => setInner(s)} />
}
function CoachMessagesNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <CoachMessages onNav={(s) => setInner(s)} />
}
function CoachMessagesPersonCardNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <CoachMessagesPersonCard onNav={(s) => setInner(s)} />
}
function RecordHubNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <RecordHub onNav={(s) => setInner(s)} />
}
function AcademyTrainingWeekNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <AcademyTrainingWeek onNav={(s) => setInner(s)} />
}
function SquadLineupsNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <SquadLineups onNav={(s) => setInner(s)} />
}
function RecordSavedNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <RecordSaved onNav={(s) => setInner(s)} />
}
function AcademySessionPlanNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <AcademySessionPlan onNav={(s) => setInner(s)} />
}
function AcademyWhoComingNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <AcademyWhoComing onNav={(s) => setInner(s)} />
}
function AcademyTrainingWeekEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <AcademyTrainingWeekEmpty onNav={(s) => setInner(s)} />
}
function SP2HomePreSeasonNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <SP2HomePreSeason onNav={(s) => setInner(s)} />
}
function SP10HomePostSeasonNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <SP10HomePostSeason onNav={(s) => setInner(s)} />
}
function ClubAdminScreenNav({ role, initials, initialTab, empty }: { role?: 'chair'|'dof'|'welfare'; initials?: string; initialTab?: string; empty?: boolean }) {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <ClubAdminScreen role={role} initials={initials} initialTab={initialTab as Parameters<typeof ClubAdminScreen>[0]['initialTab']} empty={empty} onNav={(s) => setInner(s)} />
}

function PU1PlayingUpNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PU1PlayingUp onNav={(s) => setInner(s)} />
}
function PU1ePlayingUpEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PU1ePlayingUpEmpty onNav={(s) => setInner(s)} />
}
function PU2PlayerReadinessNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PU2PlayerReadiness onNav={(s) => setInner(s)} />
}
function PU3TrialPlanNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PU3TrialPlan onNav={(s) => setInner(s)} />
}
function PU4CompareNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PU4Compare onNav={(s) => setInner(s)} />
}
function PU5SettingsNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PU5Settings onNav={(s) => setInner(s)} />
}
function PU6ReviewNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PU6Review onNav={(s) => setInner(s)} />
}
function PU7CoachViewNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PU7CoachView onNav={(s) => setInner(s)} />
}
function PUp1ParentAskNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PUp1ParentAsk onNav={(s) => setInner(s)} /></div>
}
function PUp2PlayerAskNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PUp2PlayerAsk onNav={(s) => setInner(s)} /></div>
}
function PX1PlayingDownNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PX1PlayingDown onNav={(s) => setInner(s)} />
}
function PX2LateDeveloperNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PX2LateDeveloper onNav={(s) => setInner(s)} />
}
function PX3BandedNightNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PX3BandedNight onNav={(s) => setInner(s)} />
}
function PXp1ParentDownNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PXp1ParentDown onNav={(s) => setInner(s)} /></div>
}
function PRM1FeaturesByTeamNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PRM1FeaturesByTeam onNav={(s) => setInner(s)} />
}
function PRM1eFeaturesEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PRM1eFeaturesEmpty onNav={(s) => setInner(s)} />
}
function PRM2TurnOnWithBg() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return (
    <div style={{ position: 'relative' }}>
      <PRM1FeaturesByTeam onNav={(s) => setInner(s)} />
      <PRM2TurnOn onNav={(s) => setInner(s)} />
    </div>
  )
}
function PRM3BillNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PRM3Bill onNav={(s) => setInner(s)} />
}
function PRM4CoachOffNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PRM4CoachOff onNav={(s) => setInner(s)} />
}
function PRM5CoachAskNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PRM5CoachAsk onNav={(s) => setInner(s)} />
}
function PRM6UsageNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <PRM6Usage onNav={(s) => setInner(s)} />
}

function FIL1FilesNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <FIL1Files onOpenSheet={() => setInner('FIL2-Sheet')} onOpenDoc={() => setInner('FIL3-Doc')} onNav={(s) => setInner(s)} />
}

// Checking-only wrapper for the /__screen/STA* route. Each control fires a
// status line so the acceptance check sees the page change. In the real app
// (view 'signin') StartPage is wired to the actual navigation handlers.
function HomeStoryNav({ id }: { id: string }) {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  const cfg = TABLET_CONFIGS[id]
  if (!cfg) return <div style={{ padding: 48 }}>Home story "{id}" not yet built.</div>
  return <HomeStoryTablet cfg={cfg} onNav={(s) => setInner(s)} />
}

function StartPageNav({ phone }: { phone?: boolean }) {
  const [fired, setFired] = useState<string | null>(null)
  const go = (dest: string) => () => setFired(dest)
  if (fired) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f3', fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f' }}>Opening {fired}…</div>
    </div>
  )
  return <StartPage phone={phone} onDemo={go('Demo mode')} onStory={go('Tour')} onSandbox={go('Sandbox')} onOpenSandbox={go('Sandbox')} onWhy={go('Why trust it')} />
}
function FIL2SheetNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <FIL2Sheet onBack={() => setInner('FIL1-Files')} onShare={() => setInner('FIL4-Share')} onNav={(s) => setInner(s)} />
}
function FIL4ShareWithFIL2Bg() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return (
    <div style={{ position: 'relative' }}>
      <FIL2Sheet onBack={() => setInner('FIL1-Files')} onShare={() => setInner('FIL4-Share')} onNav={(s) => setInner(s)} />
      <FIL4Share onClose={() => setInner('FIL2-Sheet')} />
    </div>
  )
}
function FIL3DocNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <FIL3Doc onBack={() => setInner('FIL1-Files')} onShare={() => setInner('FIL4-Share')} onNav={(s) => setInner(s)} />
}
function FIL2bSheetLineupNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <FIL2bSheetLineup onBack={() => setInner('FIL1-Files')} onShare={() => setInner('FIL4-Share')} onNav={(s) => setInner(s)} />
}
function FIL6SignUpNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <FIL6SignUp onBack={() => setInner('FIL1-Files')} onShare={() => setInner('FIL4-Share')} onNav={(s) => setInner(s)} />
}
function FIL7FormNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <FIL7Form onBack={() => setInner('FIL1-Files')} onShare={() => setInner('FIL4-Share')} onAnswersSheet={() => setInner('FIL2-Sheet')} onNav={(s) => setInner(s)} />
}
function FIL5ClubFilesNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <FIL5ClubFiles onNav={(s) => setInner(s)} />
}
function FIL1eFilesEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <FIL1eFilesEmpty onNav={(s) => setInner(s)} onOpenSheet={() => setInner('FIL2-Sheet')} />
}
function FIL3bDocParentNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <FIL3bDocParent onNav={(s) => setInner(s)} />
    </div>
  )
}
function FILp1ParentFilesNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <FILp1ParentFiles onBack={() => setInner('FIL1-Files')} onNav={(s) => setInner(s)} />
    </div>
  )
}
function FILp2ParentSignUpNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <FILp2ParentSignUp onBack={() => setInner('FILp1-ParentFiles')} onNav={(s) => setInner(s)} />
    </div>
  )
}
function FILp3ParentFormNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <FILp3ParentForm onBack={() => setInner('FILp1-ParentFiles')} onNav={(s) => setInner(s)} />
    </div>
  )
}
function EDU1LearnNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <EDU1Learn onNav={(s) => setInner(s)} />
}
function EDU1eLearnEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <EDU1eLearnEmpty onNav={(s) => setInner(s)} />
}
function EDU2LessonNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <EDU2Lesson onNav={(s) => setInner(s)} />
}
function EDU3MakeLessonNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <EDU3MakeLesson onNav={(s) => setInner(s)} />
}
function EDU4ClubLibraryNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <EDU4ClubLibrary onNav={(s) => setInner(s)} />
}
function EDU5CoachCornerNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <EDU5CoachCorner onNav={(s) => setInner(s)} />
}
function EDU6CoachPathsNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <EDU6CoachPaths onNav={(s) => setInner(s)} />
}
function EDUp1PlayerLearnNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <EDUp1PlayerLearn onNav={(s) => setInner(s)} />
    </div>
  )
}

function ASKd1HomeRestNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <ASKd1HomeRest onNav={(s) => setInner(s)} />
}
function ASKd2HomeFocusNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <ASKd2HomeFocus onNav={(s) => setInner(s)} />
}
function ASKd3AnyScreenNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <ASKd3AnyScreen onNav={(s) => setInner(s)} />
}
function ASKd4PanelFirstNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <ASKd4PanelFirst onNav={(s) => setInner(s)} />
}
function ASKd5PanelAnswerNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <ASKd5PanelAnswer onNav={(s) => setInner(s)} />
}
function ASKd6StatesNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <ASKd6States onNav={(s) => setInner(s)} />
}
function ASKd7OtherRoleNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <ASKd7OtherRole onNav={(s) => setInner(s)} />
}
function ASKd8PhoneHomeNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <ASKd8PhoneHome onNav={(s) => setInner(s)} />
    </div>
  )
}
function ASKd9PhoneScreenNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <ASKd9PhoneScreen onNav={(s) => setInner(s)} />
    </div>
  )
}
function ASKp2PhoneAskOpenNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <ASKp2PhoneAskOpen onNav={(s) => setInner(s)} />
    </div>
  )
}

function STPh1HomeJuniorsNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STPh1HomeJuniors onNav={(s) => setInner(s)} />
}
function STPh2HomeYouthNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STPh2HomeYouth onNav={(s) => setInner(s)} />
}
function STPh3HomeSeniorsNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STPh3HomeSeniors onNav={(s) => setInner(s)} />
}
function STPh4HomeAssistantNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STPh4HomeAssistant onNav={(s) => setInner(s)} />
}
function STPh4eHomeAssistantEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STPh4eHomeAssistantEmpty onNav={(s) => setInner(s)} />
}
function STWa1WhereWeAtNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STWa1WhereWeAt onNav={(s) => setInner(s)} />
}
function STWa1eWhereWeAtEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STWa1eWhereWeAtEmpty onNav={(s) => setInner(s)} />
}
function STWa2WhereWeAtYouthNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STWa2WhereWeAtYouth onNav={(s) => setInner(s)} />
}
function STWa3WhereWeAtSeniorsNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STWa3WhereWeAtSeniors onNav={(s) => setInner(s)} />
}
function STMs1MiniRoosStyleNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STMs1MiniRoosStyle onNav={(s) => setInner(s)} />
}
function STMs1eMiniRoosStyleEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STMs1eMiniRoosStyleEmpty onNav={(s) => setInner(s)} />
}
function STMs2MiniRoosWhereWeAtNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STMs2MiniRoosWhereWeAt onNav={(s) => setInner(s)} />
}
function STMs2eMiniRoosWhereWeAtEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STMs2eMiniRoosWhereWeAtEmpty onNav={(s) => setInner(s)} />
}
function STMs3MiniRoosReviewNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STMs3MiniRoosReview onNav={(s) => setInner(s)} />
}
function STMs3eMiniRoosReviewEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STMs3eMiniRoosReviewEmpty onNav={(s) => setInner(s)} />
}
function STMs4MiniRoosChildNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STMs4MiniRoosChild onNav={(s) => setInner(s)} />
}
function STMs4eMiniRoosChildEmptyNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STMs4eMiniRoosChildEmpty onNav={(s) => setInner(s)} />
}
function STMs5HomeMiniRoosNav() {
  const [inner, setInner] = useState<string | null>(null)
  if (inner) return <>{renderScreen(inner)}</>
  return <STMs5HomeMiniRoos onNav={(s) => setInner(s)} />
}

function renderScreenInner(key: string): ReactNode {
  switch (key) {
    case 'juniorcoach':
      return <JuniorCoachApp />
    case 'home':
      return <HomeScreen role="head" onRole={noop} onNav={noop} onCalendar={noop} empty={false} />
    case 'training':
      return <TrainingScreen role="head" onNav={noop} empty={false} />
    case 'matchday':
      return <MatchDayScreenNav />
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
      return <ClubAdminScreenNav empty={false} role="dof" initials="RM" />
    case 'chair-home':
      return <ClubAdminScreenNav empty={false} role="chair" initials="GL" />
    case 'welfare-home':
      return <ClubAdminScreenNav empty={false} role="welfare" initials="HP" initialTab="welfare" />
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
    case 'playerapp-clip':
      return <PlayerAppScreen empty={false} initialView="clip" />
    case 'playerapp-goals':
      return <PlayerAppScreen empty={false} initialView="goals" />
    case 'playerapp-concern':
      return <PlayerAppScreen empty={false} initialView="tell-someone" />
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
    case 'ACP3-AcademyParentHome':  return <AcademyParentApp onBack={noop} empty={false} initialModal="none" />
    case 'ACP11-AcademyParentChat': return <AcademyParentApp onBack={noop} empty={false} initialModal="chat" />
    case 'ACP5-ProgressReport':     return <AcademyParentApp onBack={noop} empty={false} initialNav="progress" initialModal="none" />
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
    case 'homepreseason':       return <SP2HomePreSeasonNav />
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
    case 'homepostseason':      return <SP10HomePostSeasonNav />
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
    case 'SPy2-YouthPreSeason':   return <SPy2YouthPreSeason onBack={noop} />
    case 'SPs2-SeniorPreSeason':  return <SPs2SeniorPreSeason onBack={noop} />
    case 'SPc2-CoCoachPreSeason': return <SPc2CoCoachPreSeason onBack={noop} />
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
    case 'PO3-OlderAvailability':  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><AV2ParentAvailability /></div>
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
    case 'ds1-concerns':      return <ER5NoAccess />
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
    case 'TM7-HeadKnock':             return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM7HeadKnock /></div>
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
    case 'C1-ClipsTab':               return <JuniorCoachApp initialScreen="clips" />
    case 'FN1-Seniors':               return <SeniorsYouthCoachApp teamType="seniors" onBack={noop} empty={true} />
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
    case 'D5-Safeguarding':            return <D5Safeguarding />
    case 'D5-Safeguarding-concerns':   return <D5Safeguarding initialTab="concerns" />
    case 'DS1-Concerns':              return <ER5NoAccess />
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
    case 'FN2-SeniorSquad':           return <FN2SeniorSquad mode="registration" />
    case 'FN2b-SeniorSquad':          return <FN2SeniorSquad />
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
    case 'JN9-Join':                  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="player-age" /></div>
    case 'JN9a-Join':                 return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><JoinFlow initialStep="player-18" /></div>
    // Design ID aliases — parent consent (phone)
    case 'P2b-ParentConsent':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><P2bParentConsentStep1 /></div>
    case 'P2c-ParentConsent':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><P2cParentConsentStep2 /></div>

    // Design IDs — Fitness coach screens (GT2, F3, F4, FT*, TL2, IL1, FC1)
    case 'GT2-MeasureSession':        return <GT2MeasureSession />
    case 'F3-FitnessTraining':        return <F3FitnessTraining />
    case 'F3b-FitnessTraining':       return <F3FitnessTraining mode='yourpart' />
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
    case 'FS1b-Sideline':             return <FS1Sideline />
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
    case 'AC2b-Programs':             return <AC2Programs />
    case 'AC3-Trials':                return <AC3Trials />
    case 'AC4-AcademyPlayers':        return <AC4AcademyPlayers />
    case 'AC5-Fees':                  return <AC5Fees />
    case 'AC6-AcademyCoaches':        return <AC6AcademyCoaches />
    case 'AC7-ReportsOut':            return <AC7ReportsOut />
    case 'AC9-HolidayClinic':         return <AC9HolidayClinic />
    case 'AC11-PartnerClub':          return <AC11PartnerClub />
    case 'AC10-AcademySafety':        return <AcademyOwnerApp onBack={noop} empty={false} initialScreen="safety" />
    case 'AC12-AcademyBroadcast':     return <AC12AcademyBroadcast />
    // Design IDs — Academy coach screens (tablet)
    case 'ACC2-RunSession':           return <ACC2RunSession />
    case 'ACC3-TrialAssess':          return <ACC3TrialAssess />
    case 'ACC4-PlayerPlan':           return <ACC4PlayerPlan mode='new' />
    case 'ACC4b-PlayerPlan':          return <ACC4PlayerPlan />
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
    case 'CPh1e-CoachPhoneHomeEmpty':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh1eCoachPhoneHomeEmpty /></div>
    case 'CPh2e-CoachPhoneComingEmpty':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh2eCoachPhoneComingEmpty /></div>
    case 'CPh3e-CoachPhoneMessagesEmpty': return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh3eCoachPhoneMessagesEmpty /></div>
    case 'CPh4e-CoachPhoneGameEmpty':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><CPh4eCoachPhoneGameEmpty /></div>
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
    case 'PA-PlayerApp':               return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PlayerAppScreen empty={false} /></div>

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
      return <ClubAdminScreenNav empty={true} role="dof" initials="RM" />
    case 'chair-e':
      return <ClubAdminScreenNav empty={true} role="chair" initials="GL" />
    case 'coordinator-e':
      return <CoordinatorPortal onBack={noop} empty={true} />
    case 'welfare-e':
      return <ClubAdminScreen empty={true} role="welfare" initials="HP" initialTab="welfare" />
    case 'academyowner-e':
      return <AcademyOwnerApp onBack={noop} empty={true} />
    case 'academycoach-e':
      return <AcademyCoachApp onBack={noop} empty={true} />
    case 'academyparent-e':
      return <AcademyParentApp onBack={noop} empty={true} initialModal="none" />
    case 'academyplayer-e':
      return <AcademyPlayerApp onBack={noop} empty={true} />
    case 'referee-e':
      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><RefereesPhoneScreen empty={true} /></div>

    // Director settings (DSet1, DSet4)
    case 'dset1-club':          case 'DSet1-ClubSettings':  return <DSet1ClubSettings />
    case 'dset4-rules':         case 'DSet4-ClubRules':     return <DSet4ClubRules />
    // Academy coach today (ACC1)
    case 'acc1-today':          case 'ACC1-CoachToday':     return <ACC1CoachToday />
    case 'acc1-today-e':        case 'ACC1e-CoachTodayEmpty': return <ACC1eCoachTodayEmpty />
    // Design ID aliases — D7 extra teams
    case 'd7-u9blue':    case 'D7-U9Blue':    return <D7U9Blue />
    case 'd7-u9green':   case 'D7-U9Green':   return <D7U9Green />
    case 'd7-u10':       case 'D7-U10Mixed':  return <D7U10Mixed />
    case 'd7-u12girls':  case 'D7-U12Girls':  return <D7U12Girls />
    case 'd7-u13':       case 'D7-U13Boys':   return <D7U13Boys />
    case 'd7-u13girls':  case 'D7-U13Girls':  return <D7U13Girls />
    case 'd7-u16':       case 'D7-U16Boys':   return <D7U16Boys />
    // Design ID aliases — D7 existing teams
    case 'D7-U7Mixed':   return <D7U7Mixed />
    case 'D7-U8Mixed':   return <D7U8Mixed />
    case 'D7-U11Girls':  return <D7U11Girls />
    case 'D7-U11Mixed':  return <D7U11Mixed />
    case 'D7-U14Mixed':  return <D7U14Mixed />
    case 'D7-U15Girls':  return <D7U15Girls />
    // Design ID aliases — Settings (open on specific tab)
    case 'SET1-Account':       return <SettingsScreen onDone={noop} initialTab="account" />
    case 'SET2-Team':          return <SettingsScreen onDone={noop} initialTab="team" />
    case 'SET3-Notifications': return <SettingsScreen onDone={noop} initialTab="notifications" />
    case 'SET4-Devices':       return <SettingsScreen onDone={noop} initialTab="devices" />
    case 'SET5-Privacy':       return <SettingsScreen onDone={noop} initialTab="privacy" />
    case 'SET7-Help':          return <SettingsScreen onDone={noop} initialTab="help" />
    // Design ID aliases — Football year (SP* tablet, pre-season and season)
    case 'SP1-FootballYear':           return <SP1FootballYear onBack={noop} />
    case 'SP1e-FootballYearEmpty':     return <SP1eFootballYearEmpty onBack={noop} />
    case 'SP2-HomePreSeason':          return <SP2HomePreSeasonNav />
    case 'SP3-ProvisionalSquad':       return <SP3ProvisionalSquad onBack={noop} />
    case 'SP3e-ProvisionalSquadEmpty': return <SP3eProvisionalSquadEmpty onBack={noop} />
    case 'SP4-CoachTrial':             return <SP4CoachTrial onBack={noop} />
    case 'SP5-Baseline':               return <SP5Baseline onBack={noop} />
    case 'SP5e-BaselineEmpty':         return <SP5eBaselineEmpty onBack={noop} />
    case 'SP6-LoadBuild':              return <SP6LoadBuild onBack={noop} />
    case 'SP7-Friendlies':             return <SP7Friendlies onBack={noop} />
    case 'SP7e-FriendliesEmpty':       return <SP7eFriendliesEmpty onBack={noop} />
    case 'SP8-GradingInput':           return <SP8GradingInput onBack={noop} />
    case 'SP9-MidSeasonReview':        return <SP9MidSeasonReview onBack={noop} />
    case 'SP10-HomePostSeason':        return <SP10HomePostSeasonNav />
    case 'SP11-TournamentSetup':       return <SP11TournamentSetup onBack={noop} />
    case 'SP11e-TournamentEmpty':      return <SP11eTournamentEmpty onBack={noop} />
    case 'SP12-TournamentDay':         return <SP12TournamentDay onBack={noop} />
    case 'SP13-TournamentReview':      return <SP13TournamentReview onBack={noop} />
    case 'SP14-IndoorTeam':            return <SP14IndoorTeam onBack={noop} />
    case 'SP14e-IndoorTeamEmpty':      return <SP14eIndoorTeamEmpty onBack={noop} />
    case 'SP18-ClubPhases':            return <SP18ClubPhases onBack={noop} />
    case 'SP18e-ClubPhasesEmpty':      return <SP18eClubPhasesEmpty onBack={noop} />
    case 'SP19-TrialWindow':           return <SP19TrialWindow onBack={noop} />
    case 'SP20e-StandInEmpty':         return <SP20eStandInEmpty onBack={noop} />
    // Design ID aliases — misc already-built screens with different case names
    case 'P2-ParentConsent':           return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><P2ParentConsent /></div>
    case 'ACK2e-HomePracticeEmpty':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACK2eHomePracticeEmpty /></div>
    case 'PAe-ClipsEmpty':             return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PAeClipsEmpty /></div>
    case 'PAe-GoalsEmpty':             return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PAeGoalsEmpty /></div>
    case 'RF4e-RefFeedbackEmpty':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><RF4eRefFeedbackEmpty /></div>
    case 'SG3e-AskCleanSheetEmpty':    return <SG3eAskCleanSheetEmpty />
    case 'X11-LineupEmpty':            return <X11LineupEmpty />
    case 'X6-ClipsEmpty':              return <X6ClipsEmpty />
    case 'X7-InboxEmpty':              return <X7InboxEmpty />
    case 'DL2e-TermPlannerEmpty':      return <DL2eTermPlannerEmpty />
    case 'DSet6e-PartnerAcademyEmpty': return <DSet6ePartnerAcademyEmpty />
    case 'DN1e-NominationsEmpty':      return <DN1eNominationsEmpty />
    case 'IL1e-InjuriesEmpty':         return <IL1eInjuryLogEmpty />
    case 'TL3e-TestResultsEmpty':      return <TL3eSprintResultsEmpty />
    case 'CC1e-CoachHomeSharedEmpty':  return <CC1eCoachHomeEmpty />
    case 'I1-Inbox':                   return <I1Inbox />

    // Coach sub-screens (new)
    case 'wk1': case 'WK1-ThisWeek':           return <WK1ThisWeek />
    case 'cf1': case 'CF1-Fixtures':           return <CF1Fixtures />
    case 'av1': case 'AV1-Availability':       return <AV1Availability />
    case 'ms1': case 'MS1-TeamSheet':          return <MS1TeamSheet />
    case 'r1':  case 'R1-MatchReview':         return <R1MatchReview />
    case 'se1': case 'SE1-SeasonSummaries':    return <SE1SeasonSummaries />
    case 'se1e': case 'SE1e-SeasonSummariesEmpty': return <SE1eSeasonSummariesEmpty />
    case 'av1e': case 'AV1e-AvailabilityEmpty':    return <AV1eAvailabilityEmpty />
    case 'ms1e': case 'MS1e-TeamSheetEmpty':       return <MS1eTeamSheetEmpty />
    case 'b1':  case 'B1-CoachAndFitness':     return <B1CoachAndFitness />
    // Clips sub-screens (new)
    case 'c2': case 'C2-ClipsByGame':          return <C2ClipsByGame />
    case 'c3': case 'C3-ClipsByPlayer':        return <C3ClipsByPlayer />
    case 'cl1': case 'CL1-Playlists':          return <CL1Playlists />
    case 'tc1': case 'TC1-ToCheck':            return <TC1ToCheck />
    case 'tc1b': case 'TC1b-ToCheckDone':      return <TC1bToCheckDone />
    case 'tc1e': case 'TC1e-ToCheckEmpty':     return <TC1eToCheckEmpty />
    // Fitness/growth (new)
    case 'gt1': case 'GT1-Growth':             return <GT1Growth />
    case 'gt1e': case 'GT1e-GrowthEmpty':      return <GT1eGrowthEmpty />
    case 'fc1e': case 'FC1e-ConcussionEmpty':  return <FC1eConcussionEmpty />
    case 'fk1e': case 'FK1e-GoalkeepersEmpty': return <FK1eGoalkeepersEmpty />
    // Director new screens
    case 'dset5': case 'DSet5-ClubPlan':       return <DSet5ClubPlan />
    case 'dro1':  case 'DRo1-Rollover':        return <DRo1Rollover />
    case 'dro1e': case 'DRo1e-RolloverEmpty':  return <DRo1eRolloverEmpty />
    // Director empties
    case 'D2e-TeamsEmpty':                     return <D2eTeamsEmpty />
    case 'D3e-CoachesEmpty':                   return <D3eCoachesEmpty />
    case 'D4e-PlayersEmpty':                   return <D4ePlayersEmpty />
    case 'D5e-SafeguardingEmpty':              return <D5eSafeguardingEmpty />
    case 'D6e-BoardReportEmpty':               return <D6eBoardReportEmpty />
    case 'DB2e-SeasonReviewEmpty':             return <DB2eSeasonReviewEmpty />
    case 'DB3e-LeagueReturnsEmpty':            return <DB3eLeagueReturnsEmpty />
    case 'DB4e-GrantsEmpty':                   return <DB4eGrantsEmpty />
    case 'DC1e-CalendarEmpty':                 return <DC1eCalendarEmpty />
    case 'DCo1e-CoordinatorHomeEmpty':         return <DCo1eCoordinatorHomeEmpty />
    case 'DK1e-KitEmpty':                      return <DK1eKitEmpty />
    case 'DSet3e-ClubConnectionsEmpty':        return <DSet3eClubConnectionsEmpty />
    case 'DSet4e-ClubRulesEmpty':              return <DSet4eClubRulesEmpty />
    case 'DM1e-CoachMeetingEmpty':             return <DM1eCoachMeetingEmpty />
    case 'DP1e-FairGameTimeEmpty':             return <DP1eFairGameTimeEmpty />
    case 'DR1e-RegistrationsEmpty':            return <DR1eRegistrationsEmpty />
    case 'DS1e-ConcernsEmpty':                 return <DS1eConcernsEmpty />
    case 'DS2e-DataRequestsEmpty':             return <DS2eDataRequestsEmpty />
    case 'DT1e-CoursesEmpty':                  return <DT1eCoursesEmpty />
    case 'DW1e-WelfareCasesEmpty':             return <DW1eWelfareCasesEmpty />
    case 'DX1e-CompareTeamsEmpty':             return <DX1eCompareTeamsEmpty />
    // MiniRoos empties
    case 'HM1e-HomeMiniRoosEmpty':             return <HM1eHomeMiniRoosEmpty />
    case 'HM6e-SeasonNotesEmpty':              return <HM6eSeasonNotesEmpty />
    case 'HM7e-InboxMiniRoosEmpty':            return <HM7eInboxMiniRoosEmpty />
    case 'HM8e-CalendarMiniRoosEmpty':         return <HM8eCalendarMiniRoosEmpty />
    case 'HM9e-FixturesMiniRoosEmpty':         return <HM9eFixturesMiniRoosEmpty />
    case 'HM10e-StaffMiniRoosEmpty':           return <HM10eStaffMiniRoosEmpty />
    case 'HM11e-ComingMiniRoosEmpty':          return <HM11eComingMiniRoosEmpty />
    case 'HM12e-ConsentMiniRoosEmpty':         return <HM12eConsentMiniRoosEmpty />
    // Academy owner empties
    case 'AC3e-TrialsEmpty':                   return <AC3eTrialsEmpty />
    case 'AC4e-AcademyPlayersEmpty':           return <AC4eAcademyPlayersEmpty />
    case 'AC5e-FeesEmpty':                     return <AC5eFeesEmpty />
    case 'AC6e-AcademyCoachesEmpty':           return <AC6eAcademyCoachesEmpty />
    case 'AC7e-ReportsEmpty':                  return <AC7eReportsEmpty />
    case 'AC8e-AcademyRecordEmpty':            return <AC8eAcademyRecordEmpty />
    case 'AC9e-HolidayClinicEmpty':            return <AC9eHolidayClinicEmpty />
    case 'AC10e-AcademySafetyEmpty':           return <AC10eAcademySafetyEmpty />
    case 'AC11e-PartnerClubEmpty':             return <AC11ePartnerClubEmpty />
    case 'AC12e-AcademyBroadcastEmpty':        return <AC12eAcademyBroadcastEmpty />
    // Academy coach empties
    case 'ACC2e-RunSessionEmpty':              return <ACC2eRunSessionEmpty />
    case 'ACC3e-TrialAssessEmpty':             return <ACC3eTrialAssessEmpty />
    case 'ACC4e-PlayerPlanEmpty':              return <ACC4ePlayerPlanEmpty />
    case 'ACC5e-OneOnOneEmpty':                return <ACC5eOneOnOneEmpty />
    case 'ACC6e-ReportDraftEmpty':             return <ACC6eReportDraftEmpty />
    case 'ACC7e-AcademyGameDayEmpty':          return <ACC7eAcademyGameDayEmpty />
    case 'ACC8e-AcademyRecordEmpty':           return <ACC8eAcademyRecordEmpty />
    case 'ACC12e-AcademySuggestedEmpty':       return <ACC12eAcademySuggestedEmpty />
    case 'ACC13e-AcademyChatEmpty':            return <ACC13eAcademyChatEmpty />
    // Chat screens (new)
    case 'ch8': case 'CH8-ChatInfo':           return <CH8ChatInfo />
    // Chat empties
    case 'CH1e-TeamChatEmpty':                 return <CH1eTeamChatEmpty />
    case 'CH2e-AnnouncementsEmpty':            return <CH2eAnnouncementsEmpty />
    case 'CH5e-PollResultsEmpty':              return <CH5ePollResultsEmpty />
    case 'CH6e-MediaEmpty':                    return <CH6eMediaEmpty />
    // MiniRoos chat
    case 'chm1': case 'CHm1-TeamChatMiniRoos':      return <CHm1TeamChatMiniRoos />
    case 'chm1e': case 'CHm1e-TeamChatMiniRoosEmpty': return <CHm1eTeamChatMiniRoosEmpty />
    // Player/parent empties
    case 'PM1e-ParentChatsEmpty':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM1eParentChatsEmpty /></div>
    case 'PM2e-ParentTeamChatEmpty':           return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM2eParentTeamChatEmpty /></div>
    case 'PM9e-ParentPrivateChatEmpty':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PM9eParentPrivateChatEmpty /></div>
    case 'AV2e-ParentAvailabilityEmpty':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><AV2eParentAvailabilityEmpty /></div>
    // Older player screens (new)
    case 'po1':                                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PO1OlderHome /></div>
    case 'PO1e-OlderHomeEmpty':                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PO1eOlderHomeEmpty /></div>
    case 'PO2e-OlderClipsEmpty':               return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PO2eOlderClipsEmpty /></div>
    case 'PO4e-OlderBodyEmpty':                return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PO4eOlderBodyEmpty /></div>
    // Parent settings (new)
    case 'ps1': case 'PS1-ParentSettings':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PS1ParentSettings /></div>
    case 'ps2': case 'PS2-ParentNotifications': return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PS2ParentNotifications /></div>
    case 'ps3': case 'PS3-ParentData':         return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PS3ParentData /></div>
    case 'ps4': case 'PS4-PlayerMe':           return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PS4PlayerMe /></div>
    // Ask phone sheet (still stands per spec)
    case 'ASKp2-PhoneAskOpen': return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}><AskPhoneOpen onBack={noop} /></div>

    // Messages (sections 14–15)
    case 'MSG0-WhoCanMessage':         return <MessagesRulesNav />
    case 'MSG1-NewMessage':            return <CoachNewMessageNav />
    case 'MSG2-DirectChat':            return <CoachMessagesNav />
    case 'MSG3-PersonCard':            return <CoachMessagesPersonCardNav />
    case 'MSG4-DirectorMessages':      return <DirectorMessages onBack={noop} />
    case 'MSGp1-ParentMessages':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}><ParentMessages onBack={noop} /></div>
    case 'MSGp1e-ParentMessagesEmpty': return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}><ParentMessagesEmpty onBack={noop} /></div>
    case 'MSGp2-ParentNewMessage':     return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}><ParentNewMessage onBack={noop} /></div>
    case 'MSGp3-RefereeMessages':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}><RefereeMessages onBack={noop} /></div>

    // Academy Training (section 16)
    case 'ACT1-AcademyWeek':           return <AcademyTrainingWeekNav />
    case 'ACT2-AcademySuggested':      return <AcademyTrainingSuggested onBack={noop} />
    case 'ACT3-AcademySessionPlan':    return <AcademySessionPlanNav />
    case 'ACT4-AcademyComing':         return <AcademyWhoComingNav />
    case 'ACT1e-AcademyWeekEmpty':     return <AcademyTrainingWeekEmptyNav />

    // Record hub (section 17)
    case 'REC1-RecordHub':             return <RecordHubNav />
    case 'REC2-RecordSaved':           return <RecordSavedNav />
    case 'REC1e-RecordHubEmpty':       return <RecordHubEmpty onBack={noop} />

    // Squad line-ups (section 18)
    case 'SQ1-BestLineups':            return <SquadLineupsNav />
    case 'SQ1e-BestLineupsEmpty':      return <SquadLineupsEmpty onBack={noop} />

    // Where we're at (item 12)
    case 'WA1-WhereWeAt':              return <STWa1WhereWeAtNav />
    case 'WA1e-WhereWeAtEmpty':        return <STWa1eWhereWeAtEmptyNav />
    case 'WA2-WhereWeAtYouth':         return <STWa2WhereWeAtYouthNav />
    case 'WA3-WhereWeAtSeniors':       return <STWa3WhereWeAtSeniorsNav />

    // MiniRoos style + where we're at (item 12)
    case 'MS1-MiniRoosStyle':          return <STMs1MiniRoosStyleNav />
    case 'MS1e-MiniRoosStyleEmpty':    return <STMs1eMiniRoosStyleEmptyNav />
    case 'MS2-MiniRoosWhereWeAt':      return <STMs2MiniRoosWhereWeAtNav />
    case 'MS2e-MiniRoosWhereWeAtEmpty': return <STMs2eMiniRoosWhereWeAtEmptyNav />
    case 'MS3-MiniRoosReview':         return <STMs3MiniRoosReviewNav />
    case 'MS3e-MiniRoosReviewEmpty':   return <STMs3eMiniRoosReviewEmptyNav />
    case 'MS4-MiniRoosChild':          return <STMs4MiniRoosChildNav />
    case 'MS4e-MiniRoosChildEmpty':    return <STMs4eMiniRoosChildEmptyNav />

    // Same tools + home aliases (item 12)
    case 'PAR0-SameTools':             return <PAR0SameTools />
    case 'PH1-HomeJuniorsSame':        return <STPh1HomeJuniorsNav />
    case 'PH2-HomeYouthSame':          return <STPh2HomeYouthNav />
    case 'PH3-HomeSeniorsSame':        return <STPh3HomeSeniorsNav />
    case 'PH4-HomeAssistantSame':      return <STPh4HomeAssistantNav />
    case 'PH4e-HomeAssistantEmpty':    return <STPh4eHomeAssistantEmptyNav />
    case 'MS5-HomeMiniRoosSame':       return <STMs5HomeMiniRoosNav />

    // Item 7 — RC empty screens (tablet)
    case 'RC1e-RecordStartEmpty':          return <RC1eRecordStartEmpty />
    case 'RC4e-RecordingNoCameraEmpty':    return <RC4eRecordingNoCameraEmpty />
    case 'RC5e-RecordResultsFirstEmpty':   return <RC5eRecordResultsFirstEmpty />
    case 'RC6e-RunHistoryEmpty':           return <RC6eRunHistoryEmpty />
    case 'RC7e-RecordedEmpty':             return <RC7eRecordedEmpty />
    case 'RCm2e-ClipsEmpty':               return <RCm2eClipsEmpty />
    // TM empty screens (phone)
    case 'TM1e-ManagerHomeEmpty':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM1eManagerHomeEmpty /></div>
    case 'TM2e-ManagerGameDayEmpty':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM2eManagerGameDayEmpty /></div>
    case 'TM4e-DutyRosterEmpty':           return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM4eDutyRosterEmpty /></div>
    case 'TM5e-ManagerMessagesEmpty':      return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><TM5eManagerMessagesEmpty /></div>
    // Director empty screens (tablet)
    case 'FM1e-MovesEmpty':                return <FM1eMovesEmpty />
    case 'FW1e-GirlsWomenEmpty':           return <FW1eGirlsWomenEmpty />
    case 'FS1e-SidelineEmpty':             return <FS1eSidelineEmpty />
    case 'FY1e-SeasonPlanEmpty':           return <FY1eSeasonPlanEmpty />
    case 'FD3e-DispensationsEmpty':        return <FD3eDispensationsEmpty />
    case 'FG1e-GradingEmpty':              return <FG1eGradingEmpty />
    // Fitness/keeper empty screens (tablet)
    case 'FT1e-FitnessHomeEmpty':          return <FT1eFitnessHomeEmpty />
    case 'F3e-FitnessTrainingEmpty':       return <F3eFitnessTrainingEmpty />
    case 'HG2e-KeeperSessionEmpty':        return <HG2eKeeperSessionEmpty />
    case 'TS1-FitnessLevel':               return <TS1FitnessLevel />
    // Suggestions / opposition empty (tablet)
    case 'SG5e-WhatWorkedEmpty':           return <SG5eWhatWorkedEmpty />
    case 'X16-OppositionEmpty':            return <X16OppositionEmpty />
    // MiniRoos suggested (tablet)
    case 'SGm1-SuggestedMiniRoos':         return <SGm1SuggestedMiniRoos />
    case 'SGm1e-SuggestedMiniRoosEmpty':   return <SGm1eSuggestedMiniRoosEmpty />
    // Player/parent phone screens
    case 'PP2e-SeasonSummaryEmpty':        return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PP2eSeasonSummaryEmpty /></div>
    case 'ACP4e-ParentFeesEmpty':          return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><ACP4eParentFeesEmpty /></div>
    case 'RF2e-RefGamesEmpty':             return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><RF2eRefGamesEmpty /></div>
    case 'RF1-RefAsked':                   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><RF1RefAsked /></div>
    case 'PK1-YoungNews':                  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PK1YoungNews /></div>
    case 'PE1-EffortRating':               return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><PE1EffortRating /></div>
    case 'SPp5-TrialOutcome':              return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp5TrialOutcome /></div>
    // Drill library empty + drill create flow (tablet)
    case 'X10-DrillsEmpty':                return <X10DrillsEmpty />
    case 'DF1-DrillDetail':                return <DF1DrillDetail />
    case 'DF2-AddSheet':                   return <DF2AddSheet />
    case 'DF3-OwnBasics':                  return <DF3OwnBasics />
    case 'DF4-OwnDraw':                    return <DF4OwnDraw />
    case 'DF5-OwnFixes':                   return <DF5OwnFixes />
    case 'DF6-OwnCoaching':                return <DF6OwnCoaching />
    case 'DF7-OwnSaved':                   return <DF7OwnSaved />
    // Academy coach record flow (tablet)
    case 'ACC9-AcademyRecordDrill':          return <ACC9AcademyRecordDrill />
    case 'ACC11-AcademyRecording':           return <ACC11AcademyRecording />
    case 'ACC10-AcademyRecordResults':       return <ACC10AcademyRecordResults />
    case 'ACC10e-AcademyRecordResultsEmpty': return <ACC10eAcademyRecordResultsEmpty />
    // Match analysis (tablet)
    case 'EX1-HowWorkedOut':               return <EX1HowWorkedOut />
    case 'EX1e-HowWorkedOutEmpty':         return <EX1eHowWorkedOutEmpty />
    case 'L1b-LiveGameSub':                return <L1bLiveGameSub />
    case 'I1b-InboxElla':                  return <I1bInboxElla />
    // Academy owner football year (tablet)
    case 'SPa1-AcademyYear':               return <SPa1AcademyYear />

    // Features & Billing (PRM)
    case 'PRM1-FeaturesByTeam':   return <PRM1FeaturesByTeamNav />
    case 'PRM1e-FeaturesEmpty':   return <PRM1eFeaturesEmptyNav />
    case 'PRM2-TurnOn':           return <PRM2TurnOnWithBg />
    case 'PRM3-Bill':             return <PRM3BillNav />
    case 'PRM4-CoachOff':         return <PRM4CoachOffNav />
    case 'PRM5-CoachAsk':         return <PRM5CoachAskNav />
    case 'PRM6-Usage':            return <PRM6UsageNav />
    // Files (FIL)
    case 'FIL1-Files':            return <FIL1FilesNav />
    case 'FIL1e-FilesEmpty':      return <FIL1eFilesEmptyNav />
    case 'FIL2-Sheet':            return <FIL2SheetNav />
    case 'FIL2b-SheetLineup':     return <FIL2bSheetLineupNav />
    case 'FIL3-Doc':              return <FIL3DocNav />
    case 'FIL3b-DocParent':       return <FIL3bDocParentNav />
    case 'FIL4-Share':            return <FIL4ShareWithFIL2Bg />
    case 'FIL5-ClubFiles':        return <FIL5ClubFilesNav />
    case 'FIL6-SignUp':           return <FIL6SignUpNav />
    case 'FIL7-Form':             return <FIL7FormNav />
    case 'FILp1-ParentFiles':     return <FILp1ParentFilesNav />
    case 'FILp2-ParentSignUp':    return <FILp2ParentSignUpNav />
    case 'FILp3-ParentForm':      return <FILp3ParentFormNav />
    // Playing Up (PU)
    case 'PU1-PlayingUp':         return <PU1PlayingUpNav />
    case 'PU1e-PlayingUpEmpty':   return <PU1ePlayingUpEmptyNav />
    case 'PU2-PlayerReadiness':   return <PU2PlayerReadinessNav />
    case 'PU3-TrialPlan':         return <PU3TrialPlanNav />
    case 'PU4-Compare':           return <PU4CompareNav />
    case 'PU5-Settings':          return <PU5SettingsNav />
    case 'PU6-Review':            return <PU6ReviewNav />
    case 'PU7-CoachView':         return <PU7CoachViewNav />
    case 'PUp1-ParentAsk':        return <PUp1ParentAskNav />
    case 'PUp2-PlayerAsk':        return <PUp2PlayerAskNav />
    // Playing Down / Across (PX)
    case 'PX1-PlayingDown':       return <PX1PlayingDownNav />
    case 'PX2-LateDeveloper':     return <PX2LateDeveloperNav />
    case 'PX3-BandedNight':       return <PX3BandedNightNav />
    case 'PXp1-ParentDown':       return <PXp1ParentDownNav />
    // Learn (EDU)
    case 'EDU1-Learn':            return <EDU1LearnNav />
    case 'EDU1e-LearnEmpty':      return <EDU1eLearnEmptyNav />
    case 'EDU2-Lesson':           return <EDU2LessonNav />
    case 'EDU3-MakeLesson':       return <EDU3MakeLessonNav />
    case 'EDU4-ClubLibrary':      return <EDU4ClubLibraryNav />
    case 'EDU5-CoachCorner':      return <EDU5CoachCornerNav />
    case 'EDU6-CoachPaths':       return <EDU6CoachPathsNav />
    case 'EDUp1-PlayerLearn':     return <EDUp1PlayerLearnNav />
    // Ask Clean Sheet (ASK)
    case 'ASKd1-HomeRest':        return <ASKd1HomeRestNav />
    case 'ASKd2-HomeFocus':       return <ASKd2HomeFocusNav />
    case 'ASKd3-AnyScreen':       return <ASKd3AnyScreenNav />
    case 'ASKd4-PanelFirst':      return <ASKd4PanelFirstNav />
    case 'ASKd5-PanelAnswer':     return <ASKd5PanelAnswerNav />
    case 'ASKd6-States':          return <ASKd6StatesNav />
    case 'ASKd7-OtherRole':       return <ASKd7OtherRoleNav />
    case 'ASKd8-PhoneHome':       return <ASKd8PhoneHomeNav />
    case 'ASKd9-PhoneScreen':     return <ASKd9PhoneScreenNav />
    case 'ASKp2-PhoneAskOpen':    return <ASKp2PhoneAskOpenNav />
    // Start page (STA)
    case 'STA1-StartPage':        return <StartPageNav />
    case 'STA2-StartPagePhone':   return <StartPageNav phone />
    // Home that tells a story (STO)
    case 'STO1-HomeStoryMiniRoos':
    case 'STO2-HomeStoryMiniRoosTraining':
    case 'STO3-HomeStoryMiniRoosNoFilm':
    case 'STO4-HomeStorySeniors':
    case 'STO5-HomeStoryJuniors':
    case 'STO6-HomeStoryYouth':
    case 'STO7-HomeStoryAssistant':
    case 'STO10-HomeStoryDirector':
    case 'STO11-HomeStoryChair':
    case 'STO12-HomeStoryCoordinator':
    case 'STO13-HomeStoryWelfare':
    case 'STO8-HomeStoryFitness':
    case 'STO9-HomeStoryKeepers':
    case 'STO14-HomeStoryAcademyOwner':
    case 'STO15-HomeStoryAcademyCoach':
      return <HomeStoryNav id={key} />

    default:
      return (
        <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div style={{ fontSize: 15, color: '#6f7f7b' }}>Screen "{key}" not yet built.</div>
        </div>
      )
  }
}

export function renderScreen(key: string): ReactNode {
  return <div data-screen={key}>{renderScreenInner(key)}</div>
}

function viewToPath(view: DemoView, role: RoleId, screen?: string): string {
  if (view === 'screendirect') return screen ? `/__screen/${screen}` : '/__screen'
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
        coach:        new Set(['home', 'squad', 'training', 'matchday', 'clips', 'record']),
        ccoach:       new Set(['home', 'squad', 'training', 'matchday', 'clips', 'record']),
        youth:        new Set(['home', 'squad', 'training', 'matchday', 'clips', 'record']),
        seniors:      new Set(['home', 'squad', 'training', 'matchday', 'clips', 'record']),
        miniroos:     new Set(['home', 'squad', 'training', 'gameday']),
        goalkeeper:   new Set(['home', 'keepers', 'training', 'clips']),
        fitness:      new Set(['home', 'squad', 'training', 'matchday']),
        academyowner: new Set(['home', 'programs', 'players', 'coaches', 'money']),
        academycoach: new Set(['today', 'training', 'players', 'gameday', 'record']),
      }
      if (lookScreen in TOURS) return { view: 'noaccess', role: lookRole }
      if (!LOOK_SCREENS[lookRole]?.has(lookScreen)) return { view: 'notfound', role: lookRole }
    }
    return { view: 'lookaround', role: lookRole, screen: lookScreen }
  }
  const m2 = path.match(/^\/tour\/([a-z0-9]+)(?:\/(\d+))?$/)
  if (m2) return m2[1] in TOURS ? { view: 'tour', role: m2[1] as RoleId, screen: m2[2] } : { view: 'notfound', role: 'coach' }
  const m3 = path.match(/^\/sandbox\/([a-z0-9]+)(?:\/(.+))?$/)
  if (m3) return m3[1] in TOURS ? { view: 'sandboxlook', role: m3[1] as RoleId, screen: m3[2] } : { view: 'notfound', role: 'coach' }
  const m4 = path.match(/^\/__screen\/([A-Za-z0-9_-]+)$/)
  if (m4) return { view: 'screendirect', role: 'coach', screen: m4[1] }
  return { view: 'notfound', role: 'coach' }
}

export default function DemoApp() {
  const init = pathToState(window.location.pathname)
  const [view, setView] = useState<DemoView>(init.view)
  const [role, setRole] = useState<RoleId>(init.role)
  const [screen, setScreen] = useState<string | undefined>(init.screen)
  const [phase, setPhase] = useState<DemoPhase>('season')
  const [sbStore, setSbStore] = useState<SandboxStore>(() => readStore())
  const sbFilled = storeHasData(sbStore)
  const [isPhone, setIsPhone] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsPhone(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (view === 'notfound') return
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
      <StartPage
        phone={isPhone}
        onDemo={() => setView('start')}
        onStory={() => startTour('story')}
        onSandbox={() => { createSandbox(); setSbStore(readStore()); setView('sandbox') }}
        onOpenSandbox={() => { getSandbox() ? setView('sandbox') : setView('nosandbox') }}
        onWhy={() => setView('why')}
      />
    )
  }

  if (view === 'nosandbox') {
    return (
      <SB3NoSandbox
        onStartSandbox={() => { createSandbox(); setSbStore(readStore()); setView('sandbox') }}
        onDemo={() => setView('start')}
      />
    )
  }

  if (view === 'screendirect' && screen) {
    return <>{renderScreen(screen)}</>
  }

  if (view === 'notfound') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f9f7' }}>
        <ER4NotFound />
      </div>
    )
  }

  if (view === 'noaccess') {
    const isPhoneRole = TOURS[role].device === 'phone'
    const noAccessContent = (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, padding: '48px 32px', gap: 12 }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c39797" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', textAlign: 'center' }}>This page is for a different role.</div>
        <div style={{ fontSize: 14, color: '#4a5a57', textAlign: 'center', maxWidth: 320, lineHeight: 1.5 }}>Switch roles using the bar above to see it.</div>
      </div>
    )
    if (isPhoneRole) {
      return (
        <DemoShellPhone roleId={role} onBack={() => setView('start')} onStartTour={() => setView('tour')}>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px', width: '100%' }}>
            <div style={{ width: 390, background: '#fff', borderRadius: 20 }}>{noAccessContent}</div>
          </div>
        </DemoShellPhone>
      )
    }
    return (
      <DemoShell roleId={role} onBack={() => setView('start')} onStartTour={() => setView('tour')}>
        {noAccessContent}
      </DemoShell>
    )
  }

  if (view === 'sandbox') {
    const sbState = checkSandboxExpiry()
    if (sbState === 'ended') {
      return <SB2SandboxEnded onStartSandbox={() => { createSandbox(); setSbStore(readStore()); setView('sandbox') }} onDemo={() => setView('start')} />
    }
    if (sbState === 'ending') {
      return <SB1SandboxEnding onSwitchToDemo={() => setView('start')} />
    }
    return (
      <DemoStartEmpty
        onRole={(roleId) => { setRole(roleId); setView('sandboxlook') }}
        onSwitchToDemo={() => setView('start')}
        expiryDate={sandboxExpiryLabel()}
        onFill={() => {
          const filled = sampleStore()
          writeStore(filled)
          setSbStore(filled)
        }}
        onReset={() => {
          if (window.confirm("Remove everything you've added and start again?")) {
            clearStore()
            const empty = readStore()
            setSbStore(empty)
          }
        }}
        onKeepGoing={() => {}}
      />
    )
  }

  if (view === 'sandboxlook') {
    const sbEmpty = !sbFilled
    let sbApp: ReactNode
    if (role === 'coach') {
      sbApp = <JuniorCoachApp empty={sbEmpty} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'ccoach') {
      sbApp = <JuniorCoachApp empty={sbEmpty} coachRole="ccoach" coachLabel="U12 Sam · Co-coach" coachInitials="JM" initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'youth') {
      sbApp = <SeniorsYouthCoachApp teamType="youth" onBack={noop} empty={sbEmpty} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'seniors') {
      sbApp = <SeniorsYouthCoachApp teamType="seniors" onBack={noop} empty={sbEmpty} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'miniroos') {
      sbApp = <div style={{ width: 1180, background: 'var(--surface-100)' }}><MiniRoosApp onBack={noop} empty={sbEmpty} initialScreen={screen} onNavChange={setScreen} /></div>
    } else if (role === 'goalkeeper') {
      sbApp = <GoalkeeperCoachApp onBack={noop} empty={sbEmpty} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'fitness') {
      sbApp = <FitnessCoachScreen empty={sbEmpty} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'academycoach') {
      sbApp = <AcademyCoachApp onBack={noop} empty={sbEmpty} initialScreen={screen} onNavChange={setScreen} />
    } else if (role === 'academyowner') {
      sbApp = <AcademyOwnerApp onBack={noop} empty={sbEmpty} initialScreen={screen} onNavChange={setScreen} />
    } else {
      const homeKey = sbFilled
        ? (TOURS[role].home ?? TOURS[role].sandboxHome)
        : (TOURS[role].sandboxHome ?? TOURS[role].home)
      sbApp = homeKey ? renderScreen(homeKey) : (
        <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div style={{ fontSize: 15, color: '#6f7f7b' }}>{TOURS[role].roleLabel} — no screen preview available.</div>
        </div>
      )
    }
    return (
      <DemoShellSandbox
        roleId={role}
        onSwitchRole={() => setView('sandbox')}
        onSwitchToDemo={() => setView('start')}
        phase={PHASE_ROLES.has(role) ? phase : undefined}
        onPhaseChange={PHASE_ROLES.has(role) ? setPhase : undefined}
        expiryShort={sandboxExpiryShort()}
        filled={sbFilled}
        onFill={() => {
          const filled = sampleStore()
          writeStore(filled)
          setSbStore(filled)
        }}
        onReset={() => {
          if (window.confirm("Remove everything you've added and start again?")) {
            clearStore()
            const empty = readStore()
            setSbStore(empty)
          }
        }}
      >
        <SandboxContext.Provider value={{
          store: sbStore,
          update: (s) => { writeStore(s); setSbStore(s) },
          active: true,
        }}>
          {sbApp}
        </SandboxContext.Provider>
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
        onWhy={() => setView('why')}
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
        lookContent = <CoachPhoneApp phase={phase} />
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
      else if (phase === 'restmonth')  lookContent = <SPp7PlayerRestMonth />
      else                             lookContent = <PlayerAppScreen empty={false} />
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
    const isPhoneRole = TOURS[role].device === 'phone' || (role === 'coach' && window.innerWidth <= 640)
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
        onSandbox={() => { createSandbox(); setSbStore(readStore()); setView('sandbox') }}
      />
    )
  }

  return (
    <DemoStart
      onTour={startTour}
      onLook={startLook}
      onStory={() => startTour('story')}
      onWhy={() => setView('why')}
      onSandbox={() => { createSandbox(); setSbStore(readStore()); setView('sandbox') }}
    />
  )
}
