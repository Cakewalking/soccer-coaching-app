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

const HOME_TABS     = ['Overview', 'Messages', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff']
const SQUAD_TABS    = ['Players', 'Line-ups', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy', 'Season summaries', 'Fitness coach']
const TRAINING_TABS = ["Tonight's session", 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Fitness coach']
const MATCHDAY_TABS = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review', 'Fitness coach']
const CLIPS_TABS    = ['Browse', 'Playlists', 'Shared with players', 'To check']

export default function JuniorCoachApp({ onBack: _onBack, phaseContent, coachLabel, coachInitials, empty = false, initialScreen, onNavChange, coachRole = 'head' }: { onBack?: () => void; phaseContent?: ReactNode; coachLabel?: string; coachInitials?: string; empty?: boolean; initialScreen?: string; onNavChange?: (screen: string) => void; coachRole?: 'head' | 'ccoach' }) {
  const { active: inSandbox, store } = useSandbox()
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
  if (sub === 'pitchside') return <PitchSideScreen onClose={() => setSub(null)} empty={empty} />
  if (sub === 'addgame')   return <AddGameScreen onClose={() => setSub(null)} />

  let content = null
  if (nav === 'home') {
    if (homeTab === 0) content = phaseContent ?? (coachRole === 'ccoach' ? <CoCoachHomeScreen empty={empty} onNav={handleNav} /> : <HomeScreen role="head" onRole={() => {}} onNav={handleNav} onCalendar={() => setHomeTab(2)} empty={empty} />)
    else if (homeTab === 1) content = <CoachMessages />
    else if (homeTab === 2) content = <AvailabilityScreen empty={empty} />
    else if (homeTab === 3) content = <FixturesScreen empty={empty} />
    else if (homeTab === 4) content = <OurStyleScreen />
    else if (homeTab === 5) content = <TeamStaffScreen empty={empty} />
  } else if (nav === 'squad') {
    if (squadTab === 0) content = <SquadScreen role="head" onPlayerProfile={() => {}} empty={empty} />
    else if (squadTab === 1) content = <SquadLineups />
    else if (squadTab === 2) content = <DevGoalsScreen empty={empty} />
    else if (squadTab === 3) content = <WellnessScreen empty={empty} />
    else if (squadTab === 4) content = <AvailabilityScreen empty={empty} />
    else if (squadTab === 5) content = <ConsentScreen empty={empty} />
    else if (squadTab === 6) content = <SeasonSummariesScreen empty={empty} />
    else if (squadTab === 7) content = <FitnessSquadTab empty={empty} />
  } else if (nav === 'training') {
    if (trainingTab === 0) content = <TrainingScreen role="head" onNav={handleNav} empty={empty} />
    else if (trainingTab === 1) content = <ThisWeekScreen empty={empty} onDrillLibrary={() => setTrainingTab(3)} onTonightsPlan={() => setTrainingTab(0)} onGrowthLoad={() => setTrainingTab(4)} />
    else if (trainingTab === 2) content = <SuggestionsScreen empty={empty} onRecord={() => goNav('record')} />
    else if (trainingTab === 3) content = <DrillLibraryScreen empty={empty} />
    else if (trainingTab === 4) content = <GrowthLoadScreen empty={empty} />
    else if (trainingTab === 5) content = <FitnessTrainingTab empty={empty} />
  } else if (nav === 'record') {
    content = <RecordHub />
  } else if (nav === 'matchday') {
    if (matchTab === 0) content = <MatchDayScreen onNav={handleNav} empty={empty} />
    else if (matchTab === 1) content = <TeamSheetScreen empty={empty} />
    else if (matchTab === 2) content = <OppositionScreen empty={empty} />
    else if (matchTab === 3) content = <ReviewScreen empty={empty} />
    else if (matchTab === 4) content = <FitnessMatchTab empty={empty} />
  } else if (nav === 'clips') {
    content = <ClipsScreen empty={empty} activeTab={clipsTab} />
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
                display: 'flex', alignItems: 'center', gap: 7, height: 44, padding: '0 14px', borderRadius: '999px',
                border: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                background: nav === t.id ? '#40826d' : 'transparent', color: '#ffffff',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon}/></svg>
                {t.label}
              </button>
            ))}
          </nav>
          <button onClick={() => setAskOpen(o => !o)} aria-label="Ask Clean Sheet" style={{ height: 36, padding: '0 14px', borderRadius: '999px', border: '1.5px solid rgba(255,255,255,0.3)', background: askOpen ? 'rgba(255,255,255,0.15)' : 'transparent', color: '#fff', display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>
            Ask
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', fontSize: 15, fontWeight: 600, color: '#fff', flexShrink: 0 }}>
            {coachLabel ?? (inSandbox ? (store.teams[0]?.name ?? 'My team') : 'U12 Sam · Wattle Creek')}
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
                  {tab === 'Messages' && !empty && !inSandbox && <span style={{ background: '#c39797', color: '#10211f', borderRadius: '999px', padding: '0 7px', fontSize: 12, lineHeight: '19px' }}>3</span>}
                  {tab === 'To check' && !empty && !inSandbox && <span style={{ background: '#c39797', color: '#10211f', borderRadius: '999px', padding: '0 7px', fontSize: 12, lineHeight: '19px' }}>3</span>}
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

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {content}
        {askOpen && (
          <aside role="dialog" aria-label="Ask Clean Sheet" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 400, background: '#fff', borderLeft: '1px solid #e8edeb', boxShadow: '-8px 0 32px rgba(16,33,31,0.12)', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e8edeb', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#10211f' }}>Ask Clean Sheet</span>
              <button onClick={() => setAskOpen(false)} aria-label="Close Ask Clean Sheet" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #e8edeb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a5a57' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 20 }}>
                {['Who needs a rest?', 'What to work on tonight?', 'Is everyone getting fair minutes?', 'Why did we concede Saturday?'].map(q => (
                  <button key={q} style={{ padding: '7px 12px', borderRadius: 100, border: '1px solid #e8edeb', background: '#eef5f2', color: '#2f6252', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{q}</button>
                ))}
              </div>
              <div style={{ background: '#eef5f2', borderRadius: 14, padding: '14px 16px', fontSize: 14, color: '#10211f', lineHeight: 1.6 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#2f6252', marginBottom: 8, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>Clean Sheet</div>
                Mia has played 58% of available minutes — 9 of the last 12 games. She was absent for one game and came off at half-time twice, both times with a note about hamstring load. She is under the equal-minutes threshold for U12.
              </div>
              <div style={{ fontSize: 11, color: '#4a5a57', marginTop: 16, lineHeight: 1.6 }}>It answers from what you can see as head coach. It never sends anything by itself. Wellness and welfare concerns are never used.</div>
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e8edeb', display: 'flex', gap: 8, flexShrink: 0 }}>
              <input placeholder="Ask about your team…" style={{ flex: 1, height: 40, padding: '0 12px', borderRadius: 8, border: '1px solid #e8edeb', fontSize: 13, fontFamily: 'inherit', outline: 'none', color: '#10211f' }} />
              <button style={{ height: 40, padding: '0 16px', borderRadius: 8, background: '#2f6252', color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Ask</button>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
