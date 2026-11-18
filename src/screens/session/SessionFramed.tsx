// The session screens opened by their own address, in the frame they were drawn in: U11 Luke's.
// In the live apps the same screens sit under each coach's own Training tab.

import { useState } from 'react'
import CoachTabletFrame from '../CoachTabletFrame'
import SessionTab from './SessionTab'

const NAV = [
  { id: 'home', label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', to: 'MS5-HomeMiniRoosSame' }, { id: 'squad', label: 'Squad', icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5', to: 'HM2-SquadMiniRoos' },
  { id: 'training', label: 'Training', icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4', to: 'GS1-ProposedSession' }, { id: 'matchday', label: 'Match day', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z', to: 'HM4-GameDayMiniRoos' },
  { id: 'clips', label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', to: 'RCm2-MiniRoosClips' }, { id: 'record', label: 'Record', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z', to: 'RCm1-RecordMiniRoos' },
]
const TABS: [string, string][] = [['Tuesday’s session', 'GS1-ProposedSession'], ['Run sheet', 'GS3-RunSheet'], ['Who’s coming', 'GS4-ResizeAttendance'], ['Season so far', 'GS7-SeasonLookBack'], ['Game library', 'DF0-Library'], ['Learn to coach', 'GS8-WelcomeCourse']]
const UNDER: Record<string, number> = { 'GS1-ProposedSession': 0, 'GS2-DrillWhy': 0, 'GS5-CoachLevel': 0, 'GS6-NothingToGoOn': 0, 'GS3-RunSheet': 1, 'GS4-ResizeAttendance': 2, 'GS7-SeasonLookBack': 3, 'GS8-WelcomeCourse': 5 }

export default function SessionFramed({ start, onNav }: { start: string; onNav?: (s: string) => void }) {
  const [id, setId] = useState(start)
  const go = (t: string) => { if (t in UNDER) setId(t); else onNav?.(t) }
  return (
    <div style={{ width: 1180, margin: '0 auto', background: 'var(--surface-100)' }}>
      <CoachTabletFrame navTabs={NAV} activeNav="training" onNav={n => go(NAV.find(x => x.id === n)?.to ?? 'GS1-ProposedSession')} subTabs={TABS.map(t => t[0])} activeSubTabIndex={UNDER[id] ?? 0} onSubTab={i => go(TABS[i][1])}
        roleChip="Coach · MiniRoos" teamLabel="U11 Luke · Wattle Creek" onTeam={() => onNav?.('VS1-SwitchView')} avatarLetters="LF" showAsk={false}>
        <SessionTab id={id} team="u11" onNav={go} />
      </CoachTabletFrame>
    </div>
  )
}
