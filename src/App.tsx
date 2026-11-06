import { useState } from 'react'
import HomeScreen          from './screens/HomeScreen'
import SquadScreen         from './screens/SquadScreen'
import TrainingScreen      from './screens/TrainingScreen'
import MatchDayScreen      from './screens/MatchDayScreen'
import TeamTalkScreen      from './screens/TeamTalkScreen'
import ClipsScreen         from './screens/ClipsScreen'
import OurStyleScreen      from './screens/OurStyleScreen'
import PlayerProfileScreen from './screens/PlayerProfileScreen'
import ConsentScreen       from './screens/ConsentScreen'
import TeamStaffScreen     from './screens/TeamStaffScreen'
import InboxScreen         from './screens/InboxScreen'
import FixturesScreen      from './screens/FixturesScreen'
import DevGoalsScreen      from './screens/DevGoalsScreen'
import WellnessScreen      from './screens/WellnessScreen'
import AvailabilityScreen  from './screens/AvailabilityScreen'
import OppositionScreen    from './screens/OppositionScreen'
import ReviewScreen        from './screens/ReviewScreen'
import ThisWeekScreen      from './screens/ThisWeekScreen'
import DrillLibraryScreen  from './screens/DrillLibraryScreen'
import { type Role } from './data'
import './index.css'

export type Screen = 'home' | 'squad' | 'training' | 'matchday' | 'teamtalk' | 'clips' | 'player'

const NAV_TABS: Array<{ id: Screen; label: string; icon: string }> = [
  { id: 'home',     label: 'Home',      icon: 'M4 11l8-7 8 7v9H4z' },
  { id: 'squad',    label: 'Squad',     icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5' },
  { id: 'training', label: 'Training',  icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4' },
  { id: 'matchday', label: 'Match day', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z' },
  { id: 'clips',    label: 'Clips',     icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
]

const HOME_TABS     = ['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff']
const SQUAD_TABS    = ['Players', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy']
const TRAINING_TABS = ["Tonight's session", 'This week', 'Drill library', 'Growth and load']
const MATCHDAY_TABS = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review']
const CLIPS_TABS    = ['Browse', 'Playlists', 'Shared with players', 'To check']

function RoleBadge() {
  return (
    <span style={{
      display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px',
      borderRadius: '999px', background: '#eef5f2', color: '#2f6252',
      fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"/>
      </svg>
      Head coach
    </span>
  )
}

function TeamPicker() {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px',
      borderRadius: '999px', border: 0, background: '#ffffff',
      fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#10211f',
      flexShrink: 0,
    }}>
      U12 · Wattle Creek
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </button>
  )
}

function Avatar() {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '999px', background: '#c39797',
      color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: 15, flexShrink: 0,
    }}>SK</div>
  )
}

export default function App() {
  const [screen, setScreen]           = useState<Screen>('home')
  const [role]                        = useState<Role>('head')
  const [homeTab, setHomeTab]         = useState(0)
  const [squadTab, setSquadTab]       = useState(0)
  const [matchdayTab, setMatchdayTab] = useState(0)
  const [trainingTab, setTrainingTab] = useState(0)
  const [clipsTab, setClipsTab]       = useState(0)
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [isEmpty, setIsEmpty]         = useState(false)

  const navTo = (s: Screen) => { setScreen(s) }

  if (screen === 'teamtalk') {
    return <TeamTalkScreen role={role} onClose={() => setScreen('training')} />
  }

  const isPlayerScreen = screen === 'player'

  const contextTabs =
    screen === 'home'     ? HOME_TABS     :
    screen === 'squad'    ? SQUAD_TABS    :
    screen === 'training' ? TRAINING_TABS :
    screen === 'matchday' ? MATCHDAY_TABS :
    screen === 'clips'    ? CLIPS_TABS    : []

  const activeTab =
    screen === 'home'     ? homeTab     :
    screen === 'squad'    ? squadTab    :
    screen === 'matchday' ? matchdayTab :
    screen === 'training' ? trainingTab :
    screen === 'clips'    ? clipsTab    : 0

  function handleTabClick(i: number) {
    if (screen === 'home')     setHomeTab(i)
    if (screen === 'squad')    setSquadTab(i)
    if (screen === 'matchday') setMatchdayTab(i)
    if (screen === 'training') setTrainingTab(i)
    if (screen === 'clips')    setClipsTab(i)
  }

  return (
    <div style={{
      width: 1180, minHeight: '100vh', margin: '0 auto',
      background: 'var(--surface-100)', color: 'var(--ink)',
      fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column',
    }}>

      {/* ── Player back bar ── */}
      {isPlayerScreen && (
        <div style={{ height: 64, padding: '0 28px', background: '#ffffff', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
          <button onClick={() => navTo('squad')} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Squad
          </button>
          <div style={{ flexGrow: 1 }} />
          <TeamPicker />
          <Avatar />
        </div>
      )}

      {/* ── Two-row app bar (all non-player screens) ── */}
      {!isPlayerScreen && (
        <div style={{ flex: 'none', background: '#ffffff', borderBottom: '1px solid var(--line)' }}>

          {/* Row 1: green main nav */}
          <div style={{ height: 64, padding: '0 28px', background: '#2f6252', display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => navTo('home')} style={{ fontSize: 21, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0, flexShrink: 0 }}>
              Clean Sheet
            </button>
            <nav style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
              {NAV_TABS.map(tab => (
                <button key={tab.id} onClick={() => navTo(tab.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 7, height: 40, padding: '0 14px', borderRadius: '999px',
                  border: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  background: screen === tab.id ? '#40826d' : 'transparent', color: '#ffffff',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon}/></svg>
                  {tab.label}
                </button>
              ))}
            </nav>
            <TeamPicker />
            <Avatar />
          </div>

          {/* Row 2: white sub-tabs + role badge */}
          <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
            <nav style={{ display: 'flex', flexGrow: 1, height: 44 }}>
              {contextTabs.map((tab, i) => {
                const active = i === activeTab
                return (
                  <button key={tab} onClick={() => handleTabClick(i)} style={{
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
            <div style={{ display: 'flex', alignItems: 'center', height: 44, gap: 10 }}>
              <button onClick={() => setIsEmpty(e => !e)} style={{ height: 24, padding: '0 10px', borderRadius: '999px', border: `1px solid ${isEmpty ? '#c39797' : '#c5c8c4'}`, background: isEmpty ? '#fdf0ee' : 'transparent', color: isEmpty ? '#7a3030' : '#6f7f7b', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}>New team</button>
              <RoleBadge />
            </div>
          </div>
        </div>
      )}

      {/* ── Screen content ── */}
      {/* Home tabs */}
      {screen === 'home' && homeTab === 0 && <HomeScreen role={role} onRole={() => {}} onNav={navTo} empty={isEmpty} />}
      {screen === 'home' && homeTab === 1 && <InboxScreen empty={isEmpty} />}
      {screen === 'home' && homeTab === 2 && <HomeScreen role={role} onRole={() => {}} onNav={navTo} empty={isEmpty} />}
      {screen === 'home' && homeTab === 3 && <FixturesScreen empty={isEmpty} />}
      {screen === 'home' && homeTab === 4 && <OurStyleScreen />}
      {screen === 'home' && homeTab === 5 && <TeamStaffScreen />}
      {/* Squad tabs */}
      {screen === 'squad' && squadTab === 0 && <SquadScreen role={role} onPlayerProfile={ini => { setSelectedPlayer(ini); navTo('player') }} empty={isEmpty} />}
      {screen === 'squad' && squadTab === 1 && <DevGoalsScreen empty={isEmpty} />}
      {screen === 'squad' && squadTab === 2 && <WellnessScreen empty={isEmpty} />}
      {screen === 'squad' && squadTab === 3 && <AvailabilityScreen empty={isEmpty} />}
      {screen === 'squad' && squadTab === 4 && <ConsentScreen />}
      {/* Training tabs */}
      {screen === 'training' && trainingTab === 0 && <TrainingScreen role={role} onNav={navTo} empty={isEmpty} />}
      {screen === 'training' && trainingTab === 1 && <ThisWeekScreen empty={isEmpty} />}
      {screen === 'training' && trainingTab === 2 && <DrillLibraryScreen />}
      {screen === 'training' && trainingTab === 3 && <TrainingScreen role={role} onNav={navTo} />}
      {/* Match day tabs */}
      {screen === 'matchday' && matchdayTab === 0 && <MatchDayScreen onNav={navTo} empty={isEmpty} />}
      {screen === 'matchday' && matchdayTab === 1 && <MatchDayScreen onNav={navTo} empty={isEmpty} />}
      {screen === 'matchday' && matchdayTab === 2 && <OppositionScreen empty={isEmpty} />}
      {screen === 'matchday' && matchdayTab === 3 && <ReviewScreen empty={isEmpty} />}
      {/* Other screens */}
      {screen === 'clips'  && <ClipsScreen empty={isEmpty} activeTab={clipsTab} />}
      {screen === 'player' && <PlayerProfileScreen playerIni={selectedPlayer ?? 'MT'} />}
    </div>
  )
}
