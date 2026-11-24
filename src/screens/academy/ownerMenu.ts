// The academy owner's menu (academy handover, 24 Nov, v2): six main items, each with the screens under it, in order.
// One list, used by the owner app and by every older owner board, so they cannot drift apart.
import { createContext } from 'react'
import { openScreen } from '../openThing'

export type OwnerMain = 'home' | 'programs' | 'players' | 'curriculum' | 'coaches' | 'money'
export type OwnerItem = { label: string; id: string }
export type OwnerGroup = { key: OwnerMain; label: string; icon: string; sub: OwnerItem[] }

export const OWNER_MENU: OwnerGroup[] = [
  { key: 'home', label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', sub: [
    { label: 'Overview', id: 'AD1-AcademyHome' }, { label: 'Health', id: 'AD2-Health' }, { label: 'Trials', id: 'AC3-Trials' }, { label: 'Reports', id: 'AC7-ReportsOut' },
    { label: 'Families', id: 'AD15-Families' }, { label: 'Child safety', id: 'AC10-AcademySafety' }, { label: 'Partner club', id: 'AC11-PartnerClub' },
  ] },
  { key: 'programs', label: 'Programs', icon: 'M4 6h16M4 12h16M4 18h10', sub: [
    { label: 'Term programs', id: 'AC2-Programs' }, { label: 'Timetable', id: 'AD3-Timetable' }, { label: 'Next term', id: 'AD4-NextTerm' }, { label: 'Group moves', id: 'AD5-GroupMoves' }, { label: 'Holiday clinic', id: 'AC9-HolidayClinic' },
  ] },
  { key: 'players', label: 'Players', icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5', sub: [
    { label: 'All players', id: 'AC4-AcademyPlayers' }, { label: 'Where they go next', id: 'AD14-Pathway' },
  ] },
  { key: 'curriculum', label: 'Curriculum', icon: 'M4 5h16v14H4zM4 10h16M10 5v14', sub: [
    { label: 'Year plan', id: 'AD6-YearPlan' }, { label: 'How we coach', id: 'AD7-HowWeCoach' }, { label: 'Our style', id: 'AD18-AcademyStyle' }, { label: 'Session quality', id: 'AD8-SessionQuality' },
  ] },
  { key: 'coaches', label: 'Coaches', icon: 'M12 3l9 4-9 4-9-4zM7 9v5c0 2 2.5 3.5 5 3.5s5-1.5 5-3.5V9', sub: [
    { label: 'Coaches', id: 'AC6-AcademyCoaches' }, { label: 'Children checks', id: 'AD17-Checks' }, { label: 'Roster and pay', id: 'AD9-RosterPay' }, { label: 'Watching a coach', id: 'AD10-WatchCoach' },
  ] },
  { key: 'money', label: 'Money', icon: 'M12 3v18M16 7H10a3 3 0 000 6h4a3 3 0 010 6H7', sub: [
    { label: 'Fees', id: 'AC5-Fees' }, { label: 'What each program earns', id: 'AD11-ProgramMoney' }, { label: 'Credits and pauses', id: 'AD12-Credits' }, { label: 'Connections', id: 'AD13-Connections' },
  ] },
]

/** A board's number without its name, and without the "e" of its empty state: "AD3e-TimetableEmpty" and "AD3-Timetable" are both "AD3". */
export const ownerStem = (id: string) => id.split('-')[0].replace(/(\d)e$/, '$1')

// A screen with no place of its own in a sub-menu sits under the item it is opened from: the older home under
// Overview, and each form (AD19 to AD25) under its page.
const UNDER_ITEM: Record<string, string> = {
  AC1: 'AD1-AcademyHome', AD19: 'AD12-Credits', AD20: 'AC2-Programs', AD21: 'AD9-RosterPay', AD22: 'AD6-YearPlan',
  AD23: 'AD17-Checks', AD24: 'AD13-Connections', AD25: 'AD14-Pathway',
}
// These sit under Home with no sub-menu item lit: set-up (which is Home until its seven steps are done), the
// message to families and the football year.
const UNDER: Record<string, OwnerMain> = { AD16: 'home', AC12: 'home', SPa1: 'home', STO14: 'home' }

/** The sub-menu item a screen is shown under, or '' when none is lit. An empty state sits under its board's item. */
export function ownerItemOf(id: string): string {
  const stem = ownerStem(id)
  return OWNER_MENU.flatMap(g => g.sub).find(s => ownerStem(s.id) === stem)?.id ?? UNDER_ITEM[stem] ?? ''
}
/** The main item a screen sits under. */
export function ownerMainOf(id: string): OwnerMain {
  const item = ownerItemOf(id)
  return OWNER_MENU.find(g => g.sub.some(s => s.id === item))?.key ?? UNDER[ownerStem(id)] ?? 'home'
}

/** How a control on an owner screen opens another screen. The owner app swaps its own page; anywhere else the screen opens over the top. */
export const OwnerGo = createContext<(id: string) => void>(id => openScreen(id))
