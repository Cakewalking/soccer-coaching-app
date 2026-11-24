// Every academy owner board drawn in the academy handover (24 Nov, v2), by board id: the new screens AD1 to AD18 the forms AD19 to AD25, the academy's switch of view (ADS1),
// the earlier ones AC1 to AC11 as redrawn, and the empty state of each (the ids ending in e).
// AC12 (message families) has sheets and is built by hand in step4/AC12AcademyBroadcast.
import type { ComponentType } from 'react'
import AC1AcademyHome from './AC1AcademyHome'
import AC1eAcademyHomeEmpty from './AC1eAcademyHomeEmpty'
import AC2Programs from './AC2Programs'
import AC2eProgramsEmpty from './AC2eProgramsEmpty'
import AC3Trials from './AC3Trials'
import AC3eTrialsEmpty from './AC3eTrialsEmpty'
import AC4AcademyPlayers from './AC4AcademyPlayers'
import AC4eAcademyPlayersEmpty from './AC4eAcademyPlayersEmpty'
import AC5Fees from './AC5Fees'
import AC5eFeesEmpty from './AC5eFeesEmpty'
import AC6AcademyCoaches from './AC6AcademyCoaches'
import AC6eAcademyCoachesEmpty from './AC6eAcademyCoachesEmpty'
import AC7ReportsOut from './AC7ReportsOut'
import AC7eReportsOutEmpty from './AC7eReportsOutEmpty'
import AC9HolidayClinic from './AC9HolidayClinic'
import AC9eHolidayClinicEmpty from './AC9eHolidayClinicEmpty'
import AC10AcademySafety from './AC10AcademySafety'
import AC10eAcademySafetyEmpty from './AC10eAcademySafetyEmpty'
import AC11PartnerClub from './AC11PartnerClub'
import AC11ePartnerClubEmpty from './AC11ePartnerClubEmpty'
import AC12eAcademyBroadcastEmpty from './AC12eAcademyBroadcastEmpty'
import AD1AcademyHome from './AD1AcademyHome'
import AD1eAcademyHomeEmpty from './AD1eAcademyHomeEmpty'
import AD2Health from './AD2Health'
import AD2eHealthEmpty from './AD2eHealthEmpty'
import AD3Timetable from './AD3Timetable'
import AD3eTimetableEmpty from './AD3eTimetableEmpty'
import AD4NextTerm from './AD4NextTerm'
import AD4eNextTermEmpty from './AD4eNextTermEmpty'
import AD5GroupMoves from './AD5GroupMoves'
import AD5eGroupMovesEmpty from './AD5eGroupMovesEmpty'
import AD6YearPlan from './AD6YearPlan'
import AD6eYearPlanEmpty from './AD6eYearPlanEmpty'
import AD7HowWeCoach from './AD7HowWeCoach'
import AD7eHowWeCoachEmpty from './AD7eHowWeCoachEmpty'
import AD8SessionQuality from './AD8SessionQuality'
import AD8eSessionQualityEmpty from './AD8eSessionQualityEmpty'
import AD9RosterPay from './AD9RosterPay'
import AD9eRosterPayEmpty from './AD9eRosterPayEmpty'
import AD10WatchCoach from './AD10WatchCoach'
import AD10eWatchCoachEmpty from './AD10eWatchCoachEmpty'
import AD11ProgramMoney from './AD11ProgramMoney'
import AD11eProgramMoneyEmpty from './AD11eProgramMoneyEmpty'
import AD12Credits from './AD12Credits'
import AD12eCreditsEmpty from './AD12eCreditsEmpty'
import AD13Connections from './AD13Connections'
import AD13eConnectionsEmpty from './AD13eConnectionsEmpty'
import AD14Pathway from './AD14Pathway'
import AD14ePathwayEmpty from './AD14ePathwayEmpty'
import AD15Families from './AD15Families'
import AD15eFamiliesEmpty from './AD15eFamiliesEmpty'
import AD16SetUp from './AD16SetUp'
import AD17Checks from './AD17Checks'
import AD17eChecksEmpty from './AD17eChecksEmpty'
import AD18AcademyStyle from './AD18AcademyStyle'
import AD18eAcademyStyleEmpty from './AD18eAcademyStyleEmpty'
import AD19SupportedPlace from './AD19SupportedPlace'
import AD20NewProgram from './AD20NewProgram'
import AD21RatesCosts from './AD21RatesCosts'
import AD22ChangeBlock from './AD22ChangeBlock'
import AD23AddCoach from './AD23AddCoach'
import AD24BringIn from './AD24BringIn'
import AD25Reference from './AD25Reference'
import ADS1SwitchView from './ADS1SwitchView'

export const OWNER_BOARDS: Record<string, ComponentType> = {
  'AC1-AcademyHome': AC1AcademyHome,
  'AC1e-AcademyHomeEmpty': AC1eAcademyHomeEmpty,
  'AC2-Programs': AC2Programs,
  'AC2e-ProgramsEmpty': AC2eProgramsEmpty,
  'AC3-Trials': AC3Trials,
  'AC3e-TrialsEmpty': AC3eTrialsEmpty,
  'AC4-AcademyPlayers': AC4AcademyPlayers,
  'AC4e-AcademyPlayersEmpty': AC4eAcademyPlayersEmpty,
  'AC5-Fees': AC5Fees,
  'AC5e-FeesEmpty': AC5eFeesEmpty,
  'AC6-AcademyCoaches': AC6AcademyCoaches,
  'AC6e-AcademyCoachesEmpty': AC6eAcademyCoachesEmpty,
  'AC7-ReportsOut': AC7ReportsOut,
  'AC7e-ReportsOutEmpty': AC7eReportsOutEmpty,
  'AC9-HolidayClinic': AC9HolidayClinic,
  'AC9e-HolidayClinicEmpty': AC9eHolidayClinicEmpty,
  'AC10-AcademySafety': AC10AcademySafety,
  'AC10e-AcademySafetyEmpty': AC10eAcademySafetyEmpty,
  'AC11-PartnerClub': AC11PartnerClub,
  'AC11e-PartnerClubEmpty': AC11ePartnerClubEmpty,
  'AC12e-AcademyBroadcastEmpty': AC12eAcademyBroadcastEmpty,
  'AD1-AcademyHome': AD1AcademyHome,
  'AD1e-AcademyHomeEmpty': AD1eAcademyHomeEmpty,
  'AD2-Health': AD2Health,
  'AD2e-HealthEmpty': AD2eHealthEmpty,
  'AD3-Timetable': AD3Timetable,
  'AD3e-TimetableEmpty': AD3eTimetableEmpty,
  'AD4-NextTerm': AD4NextTerm,
  'AD4e-NextTermEmpty': AD4eNextTermEmpty,
  'AD5-GroupMoves': AD5GroupMoves,
  'AD5e-GroupMovesEmpty': AD5eGroupMovesEmpty,
  'AD6-YearPlan': AD6YearPlan,
  'AD6e-YearPlanEmpty': AD6eYearPlanEmpty,
  'AD7-HowWeCoach': AD7HowWeCoach,
  'AD7e-HowWeCoachEmpty': AD7eHowWeCoachEmpty,
  'AD8-SessionQuality': AD8SessionQuality,
  'AD8e-SessionQualityEmpty': AD8eSessionQualityEmpty,
  'AD9-RosterPay': AD9RosterPay,
  'AD9e-RosterPayEmpty': AD9eRosterPayEmpty,
  'AD10-WatchCoach': AD10WatchCoach,
  'AD10e-WatchCoachEmpty': AD10eWatchCoachEmpty,
  'AD11-ProgramMoney': AD11ProgramMoney,
  'AD11e-ProgramMoneyEmpty': AD11eProgramMoneyEmpty,
  'AD12-Credits': AD12Credits,
  'AD12e-CreditsEmpty': AD12eCreditsEmpty,
  'AD13-Connections': AD13Connections,
  'AD13e-ConnectionsEmpty': AD13eConnectionsEmpty,
  'AD14-Pathway': AD14Pathway,
  'AD14e-PathwayEmpty': AD14ePathwayEmpty,
  'AD15-Families': AD15Families,
  'AD15e-FamiliesEmpty': AD15eFamiliesEmpty,
  'AD16-SetUp': AD16SetUp,
  'AD17-Checks': AD17Checks,
  'AD17e-ChecksEmpty': AD17eChecksEmpty,
  'AD18-AcademyStyle': AD18AcademyStyle,
  'AD18e-AcademyStyleEmpty': AD18eAcademyStyleEmpty,
  'AD19-SupportedPlace': AD19SupportedPlace,
  'AD20-NewProgram': AD20NewProgram,
  'AD21-RatesCosts': AD21RatesCosts,
  'AD22-ChangeBlock': AD22ChangeBlock,
  'AD23-AddCoach': AD23AddCoach,
  'AD24-BringIn': AD24BringIn,
  'AD25-Reference': AD25Reference,
  'ADS1-SwitchView': ADS1SwitchView,
}

/** True for a board the owner app shows in its own frame, by its full id. */
export const isOwnerBoard = (id: string) => id in OWNER_BOARDS || id === 'AC12-AcademyBroadcast'
