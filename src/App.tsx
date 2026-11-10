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
import GrowthLoadScreen    from './screens/GrowthLoadScreen'
import PitchSideScreen     from './screens/PitchSideScreen'
import AddGameScreen       from './screens/AddGameScreen'
import SetOurStyleWizard   from './screens/SetOurStyleWizard'
import LiveGameScreen      from './screens/LiveGameScreen'
import TeamSheetScreen     from './screens/TeamSheetScreen'
import MetricDetailScreen  from './screens/MetricDetailScreen'
import TeamManagerScreen   from './screens/TeamManagerScreen'
import SignupScreen        from './screens/SignupScreen'
import PlayerAppScreen     from './screens/PlayerAppScreen'
import FitnessCoachScreen  from './screens/FitnessCoachScreen'
import ClubAdminScreen     from './screens/ClubAdminScreen'
import MiniRoosApp               from './screens/miniroos/MiniRoosApp'
import OlderAvailabilityScreen   from './screens/playerapp/OlderAvailabilityScreen'
import OlderPlayerApp            from './screens/playerapp/OlderPlayerApp'
import RefereesPhoneScreen       from './screens/playerapp/RefereesPhoneScreen'
import TwoChildrenApp            from './screens/playerapp/TwoChildrenApp'
import PlayerMeScreen            from './screens/playerapp/PlayerMeScreen'
import SettingsScreen            from './screens/SettingsScreen'
import GoalkeeperCoachApp        from './screens/GoalkeeperCoachApp'
import CoordinatorPortal         from './screens/CoordinatorPortal'
import RolloverScreen            from './screens/RolloverScreen'
import SeniorsYouthCoachApp        from './screens/SeniorsYouthCoachApp'
import SeasonSummariesScreen       from './screens/SeasonSummariesScreen'
import CoachFitnessScreen          from './screens/CoachFitnessScreen'
import LiveGame11Screen            from './screens/LiveGame11Screen'
import DemoApp                     from './screens/demo/DemoApp'
import TeamChatScreen               from './screens/TeamChatScreen'
import { type Role } from './data'
import './index.css'

export type Screen = 'home' | 'squad' | 'training' | 'matchday' | 'teamtalk' | 'clips' | 'player' | 'pitchside' | 'addgame' | 'setstyle' | 'livegame' | 'livegame11' | 'metric' | 'teammanager' | 'signup' | 'playerapp' | 'fitnesscoach' | 'clubadmin' | 'settings' | 'olderavail' | 'olderplayer' | 'refereephone' | 'miniroos' | 'goalkeeper' | 'coordinator' | 'rollover' | 'seniors' | 'youth' | 'twochildren' | 'playerme' | 'coachfitness' | 'demo'

const NAV_TABS: Array<{ id: Screen; label: string; icon: string }> = [
  { id: 'home',     label: 'Home',      icon: 'M4 11l8-7 8 7v9H4z' },
  { id: 'squad',    label: 'Squad',     icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5' },
  { id: 'training', label: 'Training',  icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4' },
  { id: 'matchday', label: 'Match day', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z' },
  { id: 'clips',    label: 'Clips',     icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
]

const HOME_TABS     = ['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff', 'Chats']
const SQUAD_TABS    = ['Players', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy', 'Season summaries']
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

function TeamPicker({ onMetric, onNav }: { onMetric?: () => void; onNav?: (s: Screen) => void }) {
  const [open, setOpen] = useState(false)
  const go = (s: Screen) => { setOpen(false); onNav?.(s) }
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px',
        borderRadius: '999px', border: 0, background: open ? '#40826d' : 'rgba(255,255,255,0.15)',
        fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#ffffff',
        flexShrink: 0,
      }}>
        U12 · Wattle Creek
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 49 }} />
          <div style={{ position: 'absolute', top: 52, right: 0, zIndex: 50, background: '#ffffff', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', minWidth: 280, overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b' }}>Your teams</div>
            <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10, background: '#f0f8f4' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>U12 Sam</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>Head coach</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#40826d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <button onClick={() => go('miniroos')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>U9 Tom · MiniRoos</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Coach · MiniRoos view</div>
            </button>
            <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', borderTop: '1px solid #f0f1f0' }}>Club</div>
            <button onClick={() => setOpen(false)} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Club drill library</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Shared by every coach</div>
            </button>
            <button onClick={() => go('clubadmin')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Club admin portal</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Chair / Director of Football view</div>
            </button>
            <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', borderTop: '1px solid #f0f1f0' }}>Coach portals</div>
            <button onClick={() => go('seniors')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Seniors coach home</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Men's 1sts · Mo's view</div>
            </button>
            <button onClick={() => go('youth')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Youth coach home</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>U16 Ollie · Ollie's view</div>
            </button>
            <button onClick={() => go('goalkeeper')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Goalkeeper coach portal</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Nick's view · 14 keepers across 9 teams</div>
            </button>
            <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', borderTop: '1px solid #f0f1f0' }}>Club portals</div>
            <button onClick={() => go('coordinator')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Club coordinator portal</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Bianca's view · registrations, refs, kit</div>
            </button>
            <button onClick={() => go('rollover')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Season rollover</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Roll every team up a year for 2027</div>
            </button>
            <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', borderTop: '1px solid #f0f1f0' }}>Other portals</div>
            <button onClick={() => { setOpen(false); onMetric?.() }} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Metric detail</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>How is this worked out?</div>
            </button>
            <button onClick={() => go('teammanager')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Team manager app</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Rob's phone view</div>
            </button>
            <button onClick={() => go('twochildren')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Parent app · two children</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Linh's view · Mia and Bao</div>
            </button>
            <button onClick={() => go('playerapp')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Player app · younger</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Harper / Mia's view</div>
            </button>
            <button onClick={() => go('olderplayer')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Player app · older</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Cal (U16) and Josh (Men's 1sts)</div>
            </button>
            <button onClick={() => go('playerme')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Player Me settings</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Mia's settings screen</div>
            </button>
            <button onClick={() => go('fitnesscoach')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Fitness coach portal</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Jamie's view</div>
            </button>
            <button onClick={() => go('signup')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Sign-up / onboarding</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Coach, parent, player, staff</div>
            </button>
            <button onClick={() => go('coachfitness')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Coach and fitness combined home</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Sam doing both roles · U12 Sam</div>
            </button>
            <button onClick={() => go('livegame11')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Live game · 11 a side</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Youth/seniors format · U16 Ollie</div>
            </button>
            <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', borderTop: '1px solid #f0f1f0' }}>Demo mode</div>
            <button onClick={() => go('demo')} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Hosted demo</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Role picker, guided tours, look-around mode</div>
            </button>
            <div style={{ padding: '10px 16px', borderTop: '1px solid #f0f1f0', fontSize: 12, color: '#6f7f7b', background: '#fafafa' }}>
              Previewing all app portals
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Avatar({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{
      width: 44, height: 44, borderRadius: '999px', background: '#c39797',
      color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: 15, flexShrink: 0, cursor: onClick ? 'pointer' : undefined,
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
  const [isEmpty]                      = useState(false)

  const navTo = (s: Screen) => { setScreen(s) }

  if (screen === 'settings') {
    return <SettingsScreen onDone={() => navTo('home')} />
  }

  if (screen === 'teamtalk') {
    return <TeamTalkScreen role={role} onClose={() => setScreen('training')} />
  }
  if (screen === 'pitchside') {
    return <PitchSideScreen onClose={() => setScreen('training')} />
  }
  if (screen === 'addgame') {
    return <AddGameScreen onClose={() => setScreen('training')} />
  }
  if (screen === 'setstyle') {
    return <SetOurStyleWizard onClose={() => setScreen('home')} />
  }
  if (screen === 'livegame') {
    return <LiveGameScreen onClose={() => setScreen('matchday')} />
  }
  if (screen === 'livegame11') {
    return <LiveGame11Screen onClose={() => setScreen('matchday')} />
  }
  if (screen === 'coachfitness') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 'none', background: '#fff', borderBottom: '1px solid #e9eae8', padding: '0 28px', display: 'flex', alignItems: 'center', height: 52 }}>
          <button onClick={() => setScreen('home')} style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Coach view</button>
          <span style={{ marginLeft: 16, fontSize: 14, fontWeight: 700, color: '#1f4a3e' }}>Coach and fitness · U12 Sam</span>
          <span style={{ marginLeft: 12, fontSize: 13, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: '999px', padding: '3px 10px' }}>Coach and fitness</span>
        </div>
        <CoachFitnessScreen />
      </div>
    )
  }
  if (screen === 'metric') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
        <MetricDetailScreen onClose={() => setScreen('home')} />
      </div>
    )
  }
  if (screen === 'teammanager') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: '#f0f1f0', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: 390, marginBottom: 12 }}>
          <button onClick={() => setScreen('home')} style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Back to coach view</button>
        </div>
        <TeamManagerScreen empty={isEmpty} />
      </div>
    )
  }
  if (screen === 'signup') {
    return <SignupScreen onDone={() => setScreen('home')} />
  }
  if (screen === 'playerapp') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: '#f0f1f0', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: 390, marginBottom: 12 }}>
          <button onClick={() => setScreen('home')} style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Back to coach view</button>
        </div>
        <PlayerAppScreen empty={isEmpty} />
      </div>
    )
  }
  if (screen === 'miniroos') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
        <MiniRoosApp onBack={() => setScreen('home')} empty={isEmpty} />
      </div>
    )
  }
  if (screen === 'olderavail') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: '#f0f1f0', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: 390, marginBottom: 12 }}>
          <button onClick={() => navTo('playerapp')} style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Player app</button>
        </div>
        <OlderAvailabilityScreen />
      </div>
    )
  }
  if (screen === 'olderplayer') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: '#f0f1f0', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: 390, marginBottom: 12 }}>
          <button onClick={() => setScreen('home')} style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Back to coach view</button>
        </div>
        <OlderPlayerApp />
      </div>
    )
  }
  if (screen === 'refereephone') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: '#f0f1f0', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: 390, marginBottom: 12 }}>
          <button onClick={() => navTo('home')} style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Coach view</button>
        </div>
        <RefereesPhoneScreen />
      </div>
    )
  }
  if (screen === 'fitnesscoach') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 'none', background: '#fff', borderBottom: '1px solid #e9eae8', padding: '0 28px', display: 'flex', alignItems: 'center', height: 52 }}>
          <button onClick={() => setScreen('home')} style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Coach view</button>
          <span style={{ marginLeft: 16, fontSize: 14, fontWeight: 700, color: '#1f4a3e' }}>Fitness coach portal</span>
        </div>
        <FitnessCoachScreen empty={isEmpty} />
      </div>
    )
  }
  if (screen === 'clubadmin') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 'none', background: '#fff', borderBottom: '1px solid #e9eae8', padding: '0 28px', display: 'flex', alignItems: 'center', height: 52 }}>
          <button onClick={() => setScreen('home')} style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Coach view</button>
          <span style={{ marginLeft: 16, fontSize: 14, fontWeight: 700, color: '#1f4a3e' }}>Club admin portal</span>
        </div>
        <ClubAdminScreen empty={isEmpty} />
      </div>
    )
  }
  if (screen === 'goalkeeper') {
    return <GoalkeeperCoachApp onBack={() => setScreen('home')} />
  }
  if (screen === 'coordinator') {
    return <CoordinatorPortal onBack={() => setScreen('home')} />
  }
  if (screen === 'rollover') {
    return <RolloverScreen onBack={() => setScreen('home')} />
  }
  if (screen === 'seniors') {
    return <SeniorsYouthCoachApp teamType="seniors" onBack={() => setScreen('home')} />
  }
  if (screen === 'youth') {
    return <SeniorsYouthCoachApp teamType="youth" onBack={() => setScreen('home')} />
  }
  if (screen === 'twochildren') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: '#f0f1f0', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: 390, marginBottom: 12 }}>
          <button onClick={() => setScreen('home')} style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Coach view</button>
        </div>
        <TwoChildrenApp onBack={() => setScreen('home')} />
      </div>
    )
  }
  if (screen === 'demo') {
    return <DemoApp />
  }

  if (screen === 'playerme') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: '#f0f1f0', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: 390, marginBottom: 12 }}>
          <button onClick={() => setScreen('home')} style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Coach view</button>
        </div>
        <PlayerMeScreen onBack={() => setScreen('home')} />
      </div>
    )
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
          <TeamPicker onMetric={() => navTo('metric')} onNav={navTo} />
          <Avatar onClick={() => navTo('settings')} />
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
            <TeamPicker onMetric={() => navTo('metric')} onNav={navTo} />
            <Avatar onClick={() => navTo('settings')} />
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
            <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
              <RoleBadge />
            </div>
          </div>
        </div>
      )}

      {/* ── Screen content ── */}
      {/* Home tabs */}
      {screen === 'home' && homeTab === 0 && <HomeScreen role={role} onRole={() => {}} onNav={navTo} onCalendar={() => setHomeTab(2)} empty={isEmpty} />}
      {screen === 'home' && homeTab === 1 && <InboxScreen empty={isEmpty} />}
      {screen === 'home' && homeTab === 2 && <HomeScreen role={role} onRole={() => {}} onNav={navTo} onCalendar={() => setHomeTab(2)} empty={isEmpty} />}
      {screen === 'home' && homeTab === 3 && <FixturesScreen empty={isEmpty} />}
      {screen === 'home' && homeTab === 4 && <OurStyleScreen />}
      {screen === 'home' && homeTab === 5 && <TeamStaffScreen />}
      {screen === 'home' && homeTab === 6 && <TeamChatScreen empty={isEmpty} />}
      {/* Squad tabs */}
      {screen === 'squad' && squadTab === 0 && <SquadScreen role={role} onPlayerProfile={ini => { setSelectedPlayer(ini); navTo('player') }} empty={isEmpty} />}
      {screen === 'squad' && squadTab === 1 && <DevGoalsScreen empty={isEmpty} />}
      {screen === 'squad' && squadTab === 2 && <WellnessScreen empty={isEmpty} />}
      {screen === 'squad' && squadTab === 3 && <AvailabilityScreen empty={isEmpty} />}
      {screen === 'squad' && squadTab === 4 && <ConsentScreen />}
      {screen === 'squad' && squadTab === 5 && <SeasonSummariesScreen />}
      {/* Training tabs */}
      {screen === 'training' && trainingTab === 0 && <TrainingScreen role={role} onNav={navTo} empty={isEmpty} />}
      {screen === 'training' && trainingTab === 1 && <ThisWeekScreen empty={isEmpty} onDrillLibrary={() => setTrainingTab(2)} onTonightsPlan={() => setTrainingTab(0)} onGrowthLoad={() => setTrainingTab(3)} />}
      {screen === 'training' && trainingTab === 2 && <DrillLibraryScreen />}
      {screen === 'training' && trainingTab === 3 && <GrowthLoadScreen empty={isEmpty} />}
      {/* Match day tabs */}
      {screen === 'matchday' && matchdayTab === 0 && <MatchDayScreen onNav={navTo} empty={isEmpty} />}
      {screen === 'matchday' && matchdayTab === 1 && <TeamSheetScreen empty={isEmpty} />}
      {screen === 'matchday' && matchdayTab === 2 && <OppositionScreen empty={isEmpty} />}
      {screen === 'matchday' && matchdayTab === 3 && <ReviewScreen empty={isEmpty} />}
      {/* Other screens */}
      {screen === 'clips'  && <ClipsScreen empty={isEmpty} activeTab={clipsTab} />}
      {screen === 'player' && <PlayerProfileScreen playerIni={selectedPlayer ?? 'MT'} />}
    </div>
  )
}
