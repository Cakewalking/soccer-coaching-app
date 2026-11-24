// The academy owner's menu (academy handover, 24 Nov): six main items, each with the screens under it, in order.
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
    { label: 'Year plan', id: 'AD6-YearPlan' }, { label: 'How we coach', id: 'AD7-HowWeCoach' }, { label: 'Session quality', id: 'AD8-SessionQuality' },
  ] },
  { key: 'coaches', label: 'Coaches', icon: 'M12 3l9 4-9 4-9-4zM7 9v5c0 2 2.5 3.5 5 3.5s5-1.5 5-3.5V9', sub: [
    { label: 'Coaches and checks', id: 'AC6-AcademyCoaches' }, { label: 'Roster and pay', id: 'AD9-RosterPay' }, { label: 'Watching a coach', id: 'AD10-WatchCoach' },
  ] },
  { key: 'money', label: 'Money', icon: 'M12 3v18M16 7H10a3 3 0 000 6h4a3 3 0 010 6H7', sub: [
    { label: 'Fees', id: 'AC5-Fees' }, { label: 'What each program earns', id: 'AD11-ProgramMoney' }, { label: 'Credits and pauses', id: 'AD12-Credits' }, { label: 'Connections', id: 'AD13-Connections' },
  ] },
]

// Screens that sit under a main item without a place in its sub-menu: the older home, the message to
// families, the football year, and the empty states of the older boards.
const UNDER: Record<string, OwnerMain> = {
  'AC1-AcademyHome': 'home', 'AC1e-AcademyHomeEmpty': 'home', 'AC12-AcademyBroadcast': 'home', 'SPa1-AcademyYear': 'home', 'STO14-HomeStoryAcademyOwner': 'home',
}

/** The main item a screen sits under. */
export function ownerMainOf(id: string): OwnerMain {
  return OWNER_MENU.find(g => g.sub.some(s => s.id === id))?.key ?? UNDER[id] ?? 'home'
}
/** How a control on an owner screen opens another screen. The owner app swaps its own page; anywhere else the screen opens over the top. */
export const OwnerGo = createContext<(id: string) => void>(id => openScreen(id))
