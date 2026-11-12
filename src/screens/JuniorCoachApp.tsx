import { useState } from 'react'
import type { ReactNode } from 'react'
import HomeScreen            from './HomeScreen'
import SquadScreen           from './SquadScreen'
import TrainingScreen        from './TrainingScreen'
import MatchDayScreen        from './MatchDayScreen'
import ClipsScreen           from './ClipsScreen'
import FixturesScreen        from './FixturesScreen'
import OurStyleScreen        from './OurStyleScreen'
import TeamStaffScreen       from './TeamStaffScreen'
import DevGoalsScreen        from './DevGoalsScreen'
import WellnessScreen        from './WellnessScreen'
import AvailabilityScreen    from './AvailabilityScreen'
import ConsentScreen         from './ConsentScreen'
import SeasonSummariesScreen from './SeasonSummariesScreen'
import ThisWeekScreen        from './ThisWeekScreen'
import SuggestionsScreen     from './SuggestionsScreen'
import DrillLibraryScreen    from './DrillLibraryScreen'
import GrowthLoadScreen      from './GrowthLoadScreen'
import TeamSheetScreen       from './TeamSheetScreen'
import OppositionScreen      from './OppositionScreen'
import ReviewScreen          from './ReviewScreen'
import TeamTalkScreen        from './TeamTalkScreen'
import PitchSideScreen       from './PitchSideScreen'
import AddGameScreen         from './AddGameScreen'
import { FitnessSquadTab, FitnessTrainingTab, FitnessMatchTab } from './FitnessExtras'
import CoCoachHomeScreen from './CoCoachHomeScreen'
import RecordHub           from './RecordHub'
import { CoachMessages }   from './MessagesScreens'
import { SquadLineups }    from './SquadLineups'
import { useSandbox }      from './sandbox/SandboxContext'
import { storeHasData }   from './sandbox/sandboxStore'
import CoachTabletFrame   from './CoachTabletFrame'
import { WhereWeAtScreen } from './WhereWeAtScreen'

type NavKey = 'home' | 'squad' | 'training' | 'matchday' | 'clips' | 'record'
type Sub = 'teamtalk' | 'pitchside' | 'addgame' | null

const NAV_TABS: Array<{ id: NavKey; label: string; icon: string }> = [
  { id: 'home',     label: 'Home',      icon: 'M4 11l8-7 8 7v9H4z' },
  { id: 'squad',    label: 'Squad',     icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5' },
  { id: 'training', label: 'Training',  icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4' },
  { id: 'matchday', label: 'Match day', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z' },
  { id: 'clips',    label: 'Clips',     icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
  { id: 'record',   label: 'Record',    icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z' },
]

const HOME_TABS     = ['Overview', 'Messages', 'Calendar', 'Fixtures and results', 'Our style', "Where we're at", 'Team staff']
const SQUAD_TABS    = ['Players', 'Line-ups', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy', 'Season summaries', 'Fitness coach']
const TRAINING_TABS = ["Tonight's session", 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Fitness coach']
const MATCHDAY_TABS = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review', 'Fitness coach']
const CLIPS_TABS    = ['Browse', 'Playlists', 'Shared with players', 'To check']

export default function JuniorCoachApp({ onBack: _onBack, phaseContent, coachLabel, coachInitials, empty = false, initialScreen, onNavChange, coachRole = 'head' }: { onBack?: () => void; phaseContent?: ReactNode; coachLabel?: string; coachInitials?: string; empty?: boolean; initialScreen?: string; onNavChange?: (screen: string) => void; coachRole?: 'head' | 'ccoach' }) {
  const { active: inSandbox, store } = useSandbox()
  const sbEmpty = inSandbox ? !storeHasData(store) : empty
  const validNav = (s?: string): NavKey => (s === 'squad' || s === 'training' || s === 'matchday' || s === 'clips' || s === 'record') ? s : 'home'
  const [nav, setNav]                 = useState<NavKey>(validNav(initialScreen))
  const [sub, setSub]                 = useState<Sub>(null)
  const [homeTab, setHomeTab]         = useState(0)
  const [squadTab, setSquadTab]       = useState(0)
  const [trainingTab, setTrainingTab] = useState(0)
  const [matchTab, setMatchTab]       = useState(0)
  const [clipsTab, setClipsTab]       = useState(0)

  const [askOpen, setAskOpen] = useState(false)
  function goNav(n: NavKey) { setNav(n); setSub(null); setAskOpen(false); onNavChange?.(n) }

  function handleNav(s: string) {
    if (s === 'training')  { goNav('training'); return }
    if (s === 'matchday')  { goNav('matchday'); return }
    if (s === 'squad')     { goNav('squad');    return }
    if (s === 'clips')     { goNav('clips');    return }
    if (s === 'record')    { goNav('record');   return }
    if (s === 'home')      { goNav('home');     return }
    if (s === 'inbox')     { goNav('home');     setHomeTab(1);  return }
    if (s === 'metric')    { goNav('squad');    setSquadTab(3); return }
    if (s === 'fixtures')  { goNav('home');     setHomeTab(3);  return }
    if (s === 'setstyle')  { goNav('home');     setHomeTab(4);  return }
    if (s === 'teamtalk')  { setSub('teamtalk');  return }
    if (s === 'pitchside') { setSub('pitchside'); return }
    if (s === 'addgame')   { setSub('addgame');   return }
    if (s === 'call')      { alert('Opening the booking calendar.'); return }
  }

  const subTabs  = nav === 'clips'    ? CLIPS_TABS
                 : nav === 'home'     ? HOME_TABS
                 : nav === 'squad'    ? SQUAD_TABS
                 : nav === 'training' ? TRAINING_TABS
                 : nav === 'record'   ? []
                 : MATCHDAY_TABS

  const activeIdx = nav === 'home'     ? homeTab
                  : nav === 'squad'    ? squadTab
                  : nav === 'training' ? trainingTab
                  : nav === 'matchday' ? matchTab
                  : nav === 'record'   ? 0
                  : clipsTab

  function handleSubTab(i: number) {
    setSub(null)
    if (nav === 'home')     setHomeTab(i)
    if (nav === 'squad')    setSquadTab(i)
    if (nav === 'training') setTrainingTab(i)
    if (nav === 'matchday') setMatchTab(i)
    if (nav === 'clips')    setClipsTab(i)
  }

  if (sub === 'teamtalk')  return <TeamTalkScreen role="head" onClose={() => setSub(null)} />
  if (sub === 'pitchside') return <PitchSideScreen onClose={() => setSub(null)} empty={sbEmpty} />
  if (sub === 'addgame')   return <AddGameScreen onClose={() => setSub(null)} />

  let content = null
  if (nav === 'home') {
    if (homeTab === 0) content = phaseContent ?? (coachRole === 'ccoach' ? <CoCoachHomeScreen empty={sbEmpty} onNav={handleNav} /> : <HomeScreen role="head" onRole={() => {}} onNav={handleNav} onCalendar={() => setHomeTab(2)} empty={sbEmpty} />)
    else if (homeTab === 1) content = <CoachMessages />
    else if (homeTab === 2) content = <AvailabilityScreen empty={sbEmpty} />
    else if (homeTab === 3) content = <FixturesScreen empty={sbEmpty} />
    else if (homeTab === 4) content = <OurStyleScreen />
    else if (homeTab === 5) content = <WhereWeAtScreen teamType="juniors" />
    else if (homeTab === 6) content = <TeamStaffScreen empty={sbEmpty} />
  } else if (nav === 'squad') {
    if (squadTab === 0) content = <SquadScreen role="head" onPlayerProfile={() => {}} empty={sbEmpty} />
    else if (squadTab === 1) content = <SquadLineups />
    else if (squadTab === 2) content = <DevGoalsScreen empty={sbEmpty} />
    else if (squadTab === 3) content = <WellnessScreen empty={sbEmpty} />
    else if (squadTab === 4) content = <AvailabilityScreen empty={sbEmpty} />
    else if (squadTab === 5) content = <ConsentScreen empty={sbEmpty} />
    else if (squadTab === 6) content = <SeasonSummariesScreen empty={sbEmpty} />
    else if (squadTab === 7) content = <FitnessSquadTab empty={sbEmpty} />
  } else if (nav === 'training') {
    if (trainingTab === 0) content = <TrainingScreen role="head" onNav={handleNav} empty={sbEmpty} />
    else if (trainingTab === 1) content = <ThisWeekScreen empty={sbEmpty} onDrillLibrary={() => setTrainingTab(3)} onTonightsPlan={() => setTrainingTab(0)} onGrowthLoad={() => setTrainingTab(4)} />
    else if (trainingTab === 2) content = <SuggestionsScreen empty={sbEmpty} onRecord={() => goNav('record')} />
    else if (trainingTab === 3) content = <DrillLibraryScreen empty={sbEmpty} />
    else if (trainingTab === 4) content = <GrowthLoadScreen empty={sbEmpty} />
    else if (trainingTab === 5) content = <FitnessTrainingTab empty={sbEmpty} />
  } else if (nav === 'record') {
    content = <RecordHub />
  } else if (nav === 'matchday') {
    if (matchTab === 0) content = <MatchDayScreen onNav={handleNav} empty={sbEmpty} />
    else if (matchTab === 1) content = <TeamSheetScreen empty={sbEmpty} />
    else if (matchTab === 2) content = <OppositionScreen empty={sbEmpty} />
    else if (matchTab === 3) content = <ReviewScreen empty={sbEmpty} />
    else if (matchTab === 4) content = <FitnessMatchTab empty={sbEmpty} />
  } else if (nav === 'clips') {
    content = <ClipsScreen empty={sbEmpty} activeTab={clipsTab} />
  }

  return (
    <CoachTabletFrame
      navTabs={NAV_TABS}
      activeNav={nav}
      onNav={id => goNav(id as NavKey)}
      subTabs={subTabs}
      activeSubTabIndex={activeIdx}
      onSubTab={handleSubTab}
      roleChip={coachRole === 'ccoach' ? 'Co-coach' : 'Head coach'}
      teamLabel={coachLabel ?? (inSandbox ? (store.teams[0]?.name ?? 'My team') : 'U12 Sam · Wattle Creek')}
      avatarLetters={coachInitials ?? 'SK'}
      showAsk={true}
      askOpen={askOpen}
      onAskToggle={() => setAskOpen(o => !o)}
      showBadge={tab => !sbEmpty && !inSandbox && (tab === 'Messages' || tab === 'To check')}
    >
      {content}
    </CoachTabletFrame>
  )
}
