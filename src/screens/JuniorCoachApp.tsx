import { useState } from 'react'
import type { ReactNode } from 'react'
import HomeScreen            from './HomeScreen'
import SquadScreen           from './SquadScreen'
import TrainingScreen        from './TrainingScreen'
import MatchDayScreen        from './MatchDayScreen'
import ClipsScreen           from './ClipsScreen'
import TeamChatScreen        from './TeamChatScreen'
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
import RecordScreen          from './RecordScreen'
import TeamSheetScreen       from './TeamSheetScreen'
import OppositionScreen      from './OppositionScreen'
import ReviewScreen          from './ReviewScreen'
import TeamTalkScreen        from './TeamTalkScreen'
import PitchSideScreen       from './PitchSideScreen'
import AddGameScreen         from './AddGameScreen'
import { FitnessSquadTab, FitnessTrainingTab, FitnessMatchTab } from './FitnessExtras'

type NavKey = 'home' | 'squad' | 'training' | 'matchday' | 'clips'
type Sub = 'teamtalk' | 'pitchside' | 'addgame' | null

const NAV_TABS: Array<{ id: NavKey; label: string; icon: string }> = [
  { id: 'home',     label: 'Home',      icon: 'M4 11l8-7 8 7v9H4z' },
  { id: 'squad',    label: 'Squad',     icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5' },
  { id: 'training', label: 'Training',  icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4' },
  { id: 'matchday', label: 'Match day', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z' },
  { id: 'clips',    label: 'Clips',     icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
]

const HOME_TABS     = ['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff']
const SQUAD_TABS    = ['Players', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy', 'Season summaries', 'Fitness coach']
const TRAINING_TABS = ["Tonight's session", 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record', 'Fitness coach']
const MATCHDAY_TABS = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review', 'Fitness coach']
const CLIPS_TABS    = ['Browse', 'Playlists', 'Shared with players', 'To check']

export default function JuniorCoachApp({ onBack: _onBack, phaseContent, coachLabel, coachInitials }: { onBack?: () => void; phaseContent?: ReactNode; coachLabel?: string; coachInitials?: string }) {
  const [nav, setNav]                 = useState<NavKey>('home')
  const [sub, setSub]                 = useState<Sub>(null)
  const [homeTab, setHomeTab]         = useState(0)
  const [squadTab, setSquadTab]       = useState(0)
  const [trainingTab, setTrainingTab] = useState(0)
  const [matchTab, setMatchTab]       = useState(0)
  const [clipsTab, setClipsTab]       = useState(0)

  function goNav(n: NavKey) { setNav(n); setSub(null) }

  function handleNav(s: string) {
    if (s === 'training')  { goNav('training'); return }
    if (s === 'matchday')  { goNav('matchday'); return }
    if (s === 'squad')     { goNav('squad');    return }
    if (s === 'clips')     { goNav('clips');    return }
    if (s === 'home')      { goNav('home');     return }
    if (s === 'teamtalk')  { setSub('teamtalk');  return }
    if (s === 'pitchside') { setSub('pitchside'); return }
    if (s === 'addgame')   { setSub('addgame');   return }
  }

  const subTabs  = nav === 'clips' ? CLIPS_TABS
                 : nav === 'home'     ? HOME_TABS
                 : nav === 'squad'    ? SQUAD_TABS
                 : nav === 'training' ? TRAINING_TABS
                 : MATCHDAY_TABS

  const activeIdx = nav === 'home'     ? homeTab
                  : nav === 'squad'    ? squadTab
                  : nav === 'training' ? trainingTab
                  : nav === 'matchday' ? matchTab
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
  if (sub === 'pitchside') return <PitchSideScreen onClose={() => setSub(null)} empty={false} />
  if (sub === 'addgame')   return <AddGameScreen onClose={() => setSub(null)} />

  let content = null
  if (nav === 'home') {
    if (homeTab === 0) content = phaseContent ?? <HomeScreen role="head" onRole={() => {}} onNav={handleNav} onCalendar={() => setHomeTab(2)} empty={false} />
    else if (homeTab === 1) content = <TeamChatScreen empty={false} />
    else if (homeTab === 2) content = <HomeScreen role="head" onRole={() => {}} onNav={handleNav} onCalendar={() => setHomeTab(2)} empty={false} />
    else if (homeTab === 3) content = <FixturesScreen empty={false} />
    else if (homeTab === 4) content = <OurStyleScreen />
    else if (homeTab === 5) content = <TeamStaffScreen empty={false} />
  } else if (nav === 'squad') {
    if (squadTab === 0) content = <SquadScreen role="head" onPlayerProfile={() => {}} empty={false} />
    else if (squadTab === 1) content = <DevGoalsScreen empty={false} />
    else if (squadTab === 2) content = <WellnessScreen empty={false} />
    else if (squadTab === 3) content = <AvailabilityScreen empty={false} />
    else if (squadTab === 4) content = <ConsentScreen empty={false} />
    else if (squadTab === 5) content = <SeasonSummariesScreen empty={false} />
    else if (squadTab === 6) content = <FitnessSquadTab empty={false} />
  } else if (nav === 'training') {
    if (trainingTab === 0) content = <TrainingScreen role="head" onNav={handleNav} empty={false} />
    else if (trainingTab === 1) content = <ThisWeekScreen empty={false} onDrillLibrary={() => setTrainingTab(3)} onTonightsPlan={() => setTrainingTab(0)} onGrowthLoad={() => setTrainingTab(4)} />
    else if (trainingTab === 2) content = <SuggestionsScreen empty={false} onRecord={() => setTrainingTab(5)} />
    else if (trainingTab === 3) content = <DrillLibraryScreen empty={false} />
    else if (trainingTab === 4) content = <GrowthLoadScreen empty={false} />
    else if (trainingTab === 5) content = <RecordScreen empty={false} />
    else if (trainingTab === 6) content = <FitnessTrainingTab empty={false} />
  } else if (nav === 'matchday') {
    if (matchTab === 0) content = <MatchDayScreen onNav={handleNav} empty={false} />
    else if (matchTab === 1) content = <TeamSheetScreen empty={false} />
    else if (matchTab === 2) content = <OppositionScreen empty={false} />
    else if (matchTab === 3) content = <ReviewScreen empty={false} />
    else if (matchTab === 4) content = <FitnessMatchTab empty={false} />
  } else if (nav === 'clips') {
    content = <ClipsScreen empty={false} activeTab={clipsTab} />
  }

  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', color: 'var(--ink)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      <div style={{ flex: 'none', background: '#ffffff', borderBottom: '1px solid var(--line)' }}>

        {/* Green nav bar */}
        <div style={{ height: 64, padding: '0 28px', background: '#2f6252', display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => goNav('home')} style={{ fontSize: 21, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0, flexShrink: 0 }}>
            Clean Sheet
          </button>
          <nav style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
            {NAV_TABS.map(t => (
              <button key={t.id} onClick={() => goNav(t.id)} style={{
                display: 'flex', alignItems: 'center', gap: 7, height: 40, padding: '0 14px', borderRadius: '999px',
                border: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                background: nav === t.id ? '#40826d' : 'transparent', color: '#ffffff',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon}/></svg>
                {t.label}
              </button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', fontSize: 15, fontWeight: 600, color: '#fff', flexShrink: 0 }}>
            {coachLabel ?? 'U12 Sam · Wattle Creek'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{coachInitials ?? 'SK'}</div>
        </div>

        {/* Sub-tabs */}
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          <nav style={{ display: 'flex', flexGrow: 1, height: 44 }}>
            {subTabs.map((tab, i) => {
              const active = i === activeIdx
              return (
                <button key={tab} onClick={() => handleSubTab(i)} style={{
                  height: 44, padding: '0 16px', border: 0, background: 'transparent',
                  fontFamily: 'inherit', fontSize: 15, fontWeight: active ? 600 : 400,
                  color: active ? '#10211f' : '#6f7f7b', cursor: 'pointer',
                  borderBottom: active ? '3px solid #40826d' : '3px solid transparent',
                  display: 'flex', alignItems: 'center', paddingBottom: 3, gap: 6,
                  boxSizing: 'border-box',
                }}>
                  {tab}
                  {tab === 'Inbox' && <span style={{ background: '#c39797', color: '#10211f', borderRadius: '999px', padding: '0 7px', fontSize: 12, lineHeight: '19px' }}>3</span>}
                  {tab === 'To check' && <span style={{ background: '#c39797', color: '#10211f', borderRadius: '999px', padding: '0 7px', fontSize: 12, lineHeight: '19px' }}>3</span>}
                </button>
              )
            })}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: '999px', background: '#eef5f2', color: '#2f6252', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"/></svg>
              Head coach
            </span>
          </div>
        </div>
      </div>

      {content}
    </div>
  )
}
