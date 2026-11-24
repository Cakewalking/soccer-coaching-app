// The academy's older boards, made from the designs (handover v24), by id.
// Coach boards are shown inside the academy coach app; a parent or player board is a phone screen in the middle of the page.

import type { ComponentType, ReactNode } from 'react'
import ACC1CoachToday from './ACC1CoachToday'
import ACC10AcademyRecordResults from './ACC10AcademyRecordResults'
import ACC10eAcademyRecordResultsEmpty from './ACC10eAcademyRecordResultsEmpty'
import ACC11AcademyRecording from './ACC11AcademyRecording'
import ACC12AcademySuggested from './ACC12AcademySuggested'
import ACC12eAcademySuggestedEmpty from './ACC12eAcademySuggestedEmpty'
import ACC13AcademyChat from './ACC13AcademyChat'
import ACC13eAcademyChatEmpty from './ACC13eAcademyChatEmpty'
import ACC1eCoachTodayEmpty from './ACC1eCoachTodayEmpty'
import ACC2RunSession from './ACC2RunSession'
import ACC2eRunSessionEmpty from './ACC2eRunSessionEmpty'
import ACC3TrialAssess from './ACC3TrialAssess'
import ADC19SetPractice from './ADC19SetPractice'
import ACC3eTrialAssessEmpty from './ACC3eTrialAssessEmpty'
import ACC4PlayerPlan from './ACC4PlayerPlan'
import ACC4ePlayerPlanEmpty from './ACC4ePlayerPlanEmpty'
import ACC5OneOnOne from './ACC5OneOnOne'
import ACC5eOneOnOneEmpty from './ACC5eOneOnOneEmpty'
import ACC6ReportDraft from './ACC6ReportDraft'
import ACC6eReportDraftEmpty from './ACC6eReportDraftEmpty'
import ACC7AcademyGameDay from './ACC7AcademyGameDay'
import ACC7eAcademyGameDayEmpty from './ACC7eAcademyGameDayEmpty'
import ACC8AcademyRecord from './ACC8AcademyRecord'
import ACC8eAcademyRecordEmpty from './ACC8eAcademyRecordEmpty'
import ACC8pPairCamera from './ACC8pPairCamera'
import ACC9AcademyRecordDrill from './ACC9AcademyRecordDrill'
import ACK1AcademyPlayerHome from './ACK1AcademyPlayerHome'
import ACK1eAcademyPlayerHomeEmpty from './ACK1eAcademyPlayerHomeEmpty'
import ACK2HomePractice from './ACK2HomePractice'
import ACK2eHomePracticeEmpty from './ACK2eHomePracticeEmpty'
import ACP1BookTrial from './ACP1BookTrial'
import ACP10AcademyConcern from './ACP10AcademyConcern'
import ACP11AcademyParentChat from './ACP11AcademyParentChat'
import ACP11eAcademyParentChatEmpty from './ACP11eAcademyParentChatEmpty'
import ACP1bTrialBooked from './ACP1bTrialBooked'
import ACP2Offer from './ACP2Offer'
import ACP3AcademyParentHome from './ACP3AcademyParentHome'
import ACP3eAcademyParentHomeEmpty from './ACP3eAcademyParentHomeEmpty'
import ACP4ParentFees from './ACP4ParentFees'
import ACP4eParentFeesEmpty from './ACP4eParentFeesEmpty'
import ACP5ProgressReport from './ACP5ProgressReport'
import ACP5eProgressReportEmpty from './ACP5eProgressReportEmpty'
import ACP6MakeUp from './ACP6MakeUp'
import ACP7ShareWithClub from './ACP7ShareWithClub'
import ACP8BookClinic from './ACP8BookClinic'
import ACP8eBookClinicEmpty from './ACP8eBookClinicEmpty'
import ACP9JoinGameTeam from './ACP9JoinGameTeam'
import ACT1AcademyWeek from './ACT1AcademyWeek'
import ACT1eAcademyWeekEmpty from './ACT1eAcademyWeekEmpty'
import ACT2AcademySuggested from './ACT2AcademySuggested'
import ACT3AcademySessionPlan from './ACT3AcademySessionPlan'
import ACT4AcademyComing from './ACT4AcademyComing'
import ADC8eTeamStyleEmpty from './ADC8eTeamStyleEmpty'
import ADC10SetGoal from './ADC10SetGoal'
import ADC11AfterSession from './ADC11AfterSession'
import ADC12WholePlayer from './ADC12WholePlayer'
import ADC13CheckEntry from './ADC13CheckEntry'
import ADC14SuggestMove from './ADC14SuggestMove'
import ADC15MySession from './ADC15MySession'
import ADK3EnjoyedToday from './ADK3EnjoyedToday'
import ADK4CheckIn from './ADK4CheckIn'
import ADC11eAfterSessionEmpty from './ADC11eAfterSessionEmpty'
import ADC13eCheckEntryEmpty from './ADC13eCheckEntryEmpty'
import ADC16Chances from './ADC16Chances'
import ADC17YourTake from './ADC17YourTake'
import ADC18Learn from './ADC18Learn'
import ADC20TeamSheet from './ADC20TeamSheet'
import ADC21LiveGame from './ADC21LiveGame'
import ADK1MySkills from '../../academyplayer/ADK1MySkills'
import ADK2MyClips from '../../academyplayer/ADK2MyClips'

type Board = ComponentType<{ onNav?: (id: string) => void }>

/** The academy coach's boards made from the designs, for the coach app to show under its menu. */
export const COACH_BOARDS: Record<string, Board> = {
  'ADC16-Chances': ADC16Chances,
  'ADC17-YourTake': ADC17YourTake,
  'ADC18-Learn': ADC18Learn,
  'ADC20-TeamSheet': ADC20TeamSheet,
  'ADC21-LiveGame': ADC21LiveGame,
  'ADC19-SetPractice': ADC19SetPractice,
  'ADC11e-AfterSessionEmpty': ADC11eAfterSessionEmpty,
  'ADC13e-CheckEntryEmpty': ADC13eCheckEntryEmpty,
  'ADC8e-TeamStyleEmpty': ADC8eTeamStyleEmpty,
  'ADC10-SetGoal': ADC10SetGoal,
  'ADC11-AfterSession': ADC11AfterSession,
  'ADC12-WholePlayer': ADC12WholePlayer,
  'ADC13-CheckEntry': ADC13CheckEntry,
  'ADC14-SuggestMove': ADC14SuggestMove,
  'ADC15-MySession': ADC15MySession,
  'ACC1-CoachToday': ACC1CoachToday,
  'ACC10-AcademyRecordResults': ACC10AcademyRecordResults,
  'ACC10e-AcademyRecordResultsEmpty': ACC10eAcademyRecordResultsEmpty,
  'ACC11-AcademyRecording': ACC11AcademyRecording,
  'ACC12-AcademySuggested': ACC12AcademySuggested,
  'ACC12e-AcademySuggestedEmpty': ACC12eAcademySuggestedEmpty,
  'ACC13-AcademyChat': ACC13AcademyChat,
  'ACC13e-AcademyChatEmpty': ACC13eAcademyChatEmpty,
  'ACC1e-CoachTodayEmpty': ACC1eCoachTodayEmpty,
  'ACC2-RunSession': ACC2RunSession,
  'ACC2e-RunSessionEmpty': ACC2eRunSessionEmpty,
  'ACC3-TrialAssess': ACC3TrialAssess,
  'ACC3e-TrialAssessEmpty': ACC3eTrialAssessEmpty,
  'ACC4-PlayerPlan': ACC4PlayerPlan,
  'ACC4e-PlayerPlanEmpty': ACC4ePlayerPlanEmpty,
  'ACC5-OneOnOne': ACC5OneOnOne,
  'ACC5e-OneOnOneEmpty': ACC5eOneOnOneEmpty,
  'ACC6-ReportDraft': ACC6ReportDraft,
  'ACC6e-ReportDraftEmpty': ACC6eReportDraftEmpty,
  'ACC7-AcademyGameDay': ACC7AcademyGameDay,
  'ACC7e-AcademyGameDayEmpty': ACC7eAcademyGameDayEmpty,
  'ACC8-AcademyRecord': ACC8AcademyRecord,
  'ACC8e-AcademyRecordEmpty': ACC8eAcademyRecordEmpty,
  'ACC8p-PairCamera': ACC8pPairCamera,
  'ACC9-AcademyRecordDrill': ACC9AcademyRecordDrill,
  'ACT1-AcademyWeek': ACT1AcademyWeek,
  'ACT1e-AcademyWeekEmpty': ACT1eAcademyWeekEmpty,
  'ACT2-AcademySuggested': ACT2AcademySuggested,
  'ACT3-AcademySessionPlan': ACT3AcademySessionPlan,
  'ACT4-AcademyComing': ACT4AcademyComing,
}

const PHONE: Record<string, Board> = {
  'ADK1-MySkills': ADK1MySkills,
  'ADK2-MyClips': ADK2MyClips,
  'ADK3-EnjoyedToday': ADK3EnjoyedToday,
  'ADK4-CheckIn': ADK4CheckIn,
  'ACK1-AcademyPlayerHome': ACK1AcademyPlayerHome,
  'ACK1e-AcademyPlayerHomeEmpty': ACK1eAcademyPlayerHomeEmpty,
  'ACK2-HomePractice': ACK2HomePractice,
  'ACK2e-HomePracticeEmpty': ACK2eHomePracticeEmpty,
  'ACP1-BookTrial': ACP1BookTrial,
  'ACP10-AcademyConcern': ACP10AcademyConcern,
  'ACP11-AcademyParentChat': ACP11AcademyParentChat,
  'ACP11e-AcademyParentChatEmpty': ACP11eAcademyParentChatEmpty,
  'ACP1b-TrialBooked': ACP1bTrialBooked,
  'ACP2-Offer': ACP2Offer,
  'ACP3-AcademyParentHome': ACP3AcademyParentHome,
  'ACP3e-AcademyParentHomeEmpty': ACP3eAcademyParentHomeEmpty,
  'ACP4-ParentFees': ACP4ParentFees,
  'ACP4e-ParentFeesEmpty': ACP4eParentFeesEmpty,
  'ACP5-ProgressReport': ACP5ProgressReport,
  'ACP5e-ProgressReportEmpty': ACP5eProgressReportEmpty,
  'ACP6-MakeUp': ACP6MakeUp,
  'ACP7-ShareWithClub': ACP7ShareWithClub,
  'ACP8-BookClinic': ACP8BookClinic,
  'ACP8e-BookClinicEmpty': ACP8eBookClinicEmpty,
  'ACP9-JoinGameTeam': ACP9JoinGameTeam,
}

/** The phone screen for an academy parent or player board id, or null when the id is not one of these. */
export function renderAcademyPhone(id: string): ReactNode | null {
  const P = PHONE[id]
  return P ? <div style={{ display: 'flex', justifyContent: 'center' }}><P /></div> : null
}
