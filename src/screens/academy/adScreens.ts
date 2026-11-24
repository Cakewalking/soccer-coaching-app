// The fifteen academy owner screens from the academy handover (24 Nov), by board id.
import type { ComponentType } from 'react'
import AD1AcademyHome from './AD1AcademyHome'
import AD2Health from './AD2Health'
import AD3Timetable from './AD3Timetable'
import AD4NextTerm from './AD4NextTerm'
import AD5GroupMoves from './AD5GroupMoves'
import AD6YearPlan from './AD6YearPlan'
import AD7HowWeCoach from './AD7HowWeCoach'
import AD8SessionQuality from './AD8SessionQuality'
import AD9RosterPay from './AD9RosterPay'
import AD10WatchCoach from './AD10WatchCoach'
import AD11ProgramMoney from './AD11ProgramMoney'
import AD12Credits from './AD12Credits'
import AD13Connections from './AD13Connections'
import AD14Pathway from './AD14Pathway'
import AD15Families from './AD15Families'

export const AD_SCREENS: Record<string, ComponentType> = {
  'AD1-AcademyHome': AD1AcademyHome, 'AD2-Health': AD2Health, 'AD3-Timetable': AD3Timetable, 'AD4-NextTerm': AD4NextTerm, 'AD5-GroupMoves': AD5GroupMoves,
  'AD6-YearPlan': AD6YearPlan, 'AD7-HowWeCoach': AD7HowWeCoach, 'AD8-SessionQuality': AD8SessionQuality, 'AD9-RosterPay': AD9RosterPay, 'AD10-WatchCoach': AD10WatchCoach,
  'AD11-ProgramMoney': AD11ProgramMoney, 'AD12-Credits': AD12Credits, 'AD13-Connections': AD13Connections, 'AD14-Pathway': AD14Pathway, 'AD15-Families': AD15Families,
}
