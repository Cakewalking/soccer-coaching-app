import { useState, useEffect } from 'react'
import SandboxWaiting from './sandbox/SandboxWaiting'
import SandboxTeamTalk from './sandbox/SandboxTeamTalk'
import TeamSetup from './sandbox/TeamSetup'
import { registerSetupNav, registerAppNav, goSetup } from './sandbox/sandboxNav'
import type { ReactNode } from 'react'

// Map a Home-story deep-link design-id to this frame's semantic nav key, so a
// Home button switches the real tab (lit in the top bar) instead of a layer.
// Returns null for targets the frame can't place as a tab (caller falls back).
export const COACH_TARGET_NAV: Record<string, string> = {
  'T1-TabletTraining': 'home', 'T4-SquadTab': 'squad', 'T3-TrainingTab': 'training',
  'T2-TabletMatch': 'matchday', 'C1-ClipsTab': 'clips', 'REC1-RecordHub': 'record',
  'I1-Inbox': 'inbox', 'CF1-Fixtures': 'fixtures', 'S1-PlayingStyle': 'setstyle',
  'E-TeamTalk': 'teamtalk', 'ETeamTalk': 'teamtalk',
}
// Design id of the screen each tab shows, so `data-screen` reports what is on screen
// (master handover part 4) and a link or a test can tell tabs apart.
export const COACH_TAB_SCREEN: Record<string, string[]> = {
  home:     ['STO5-HomeStoryJuniors', 'I1-Inbox', 'CF1-Fixtures', 'CF1-Fixtures', 'S1-PlayingStyle', 'WA1-WhereWeAt', 'ST1-TeamStaff', 'FIL1-Files'],
  squad:    ['T4-SquadTab', 'FB1-Formation', 'SQ1-BestLineups', 'DG1-Goals', 'WL1-Wellness', 'AV1-Availability', 'P1-Consent', 'CN9-SeasonReport', 'CN10-CatchUps', 'CN13-Handover'],
  training: ['T3-TrainingTab', 'WK1-ThisWeek', 'SG1-Suggested', 'DF0-Library', 'GT1-Growth', 'CN4-SessionsLanded', 'CN8-WhatWorked'],
  matchday: ['T2-TabletMatch', 'MS1-TeamSheet', 'OP1-Opposition', 'R1-MatchReview', 'XG1-ChancesGame', 'XG3-LadderPPI', 'YT1-YourTake', 'CN17-SetPieces'],
  clips:    ['C1-ClipsTab', 'C2-ClipsByGame', 'C3-ClipsByPlayer', 'CL1-Playlists', 'TC1-ToCheck', 'EDU1-Learn'],
  record:   ['REC1-RecordHub'],
}
/** Where a design id lives in the coach app: which top tab and which sub-tab. */
export function coachDeepTab(id?: string): { nav: string; idx: number } | null {
  if (!id) return null
  for (const [nav, ids] of Object.entries(COACH_TAB_SCREEN)) { const idx = ids.indexOf(id); if (idx >= 0) return { nav, idx } }
  return null
}
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
import FormationBuilder from './formation/FormationBuilder'
import ScreenLayer, { isScreenId } from './ScreenLayer'
import { demoToast } from './demoToast'
import PlayerProfileScreen from './PlayerProfileScreen'
import type { FormationPreset } from './formation/lineupInsights'
import ThisWeekScreen        from './ThisWeekScreen'
import SuggestionsScreen     from './SuggestionsScreen'
import DrillLibraryScreen    from './DrillLibraryScreen'
import GrowthLoadScreen      from './GrowthLoadScreen'
import TeamSheetScreen       from './TeamSheetScreen'
import OppositionScreen      from './OppositionScreen'
import ReviewScreen          from './ReviewScreen'
import YourTakeBoards, { isYourTakeId } from './aftergame/YourTakeBoards'
import TeamTalkScreen        from './TeamTalkScreen'
import PitchSideScreen       from './PitchSideScreen'
import AddGameScreen         from './AddGameScreen'
import { FitnessTrainingTab, FitnessMatchTab } from './FitnessExtras'
import CoCoachHomeScreen from './CoCoachHomeScreen'
import RecordHub           from './RecordHub'
import CaptureFlow, { isCaptureId, captureSubTab } from './capture/CaptureFlow'
import ChancesFlow, { isChanceId } from './chances/ChancesFlow'
import CnScreen from './connected/CnScreen'
import DevicesTab from './settings/DevicesTab'
import { useCapture, allowed } from './capture/captureStore'
import { RecordSaved }     from './RecordHub'
import { CoachMessages, CoachNewMessage, CoachMessagesPersonCard } from './MessagesScreens'
import { SquadLineups }    from './SquadLineups'
import { useSandbox }      from './sandbox/SandboxContext'
import { storeIsSample }  from './sandbox/sandboxStore'
import CoachTabletFrame   from './CoachTabletFrame'
import { WhereWeAtScreen, WhereWeAtScreenEmpty } from './WhereWeAtScreen'
import FIL1Files       from './step4/FIL1Files'
import FIL2Sheet       from './step4/FIL2Sheet'
import FIL2bSheetLineup from './step4/FIL2bSheetLineup'
import FIL3Doc         from './step4/FIL3Doc'
import FIL4Share       from './step4/FIL4Share'
import FIL6SignUp      from './step4/FIL6SignUp'
import FIL7Form        from './step4/FIL7Form'

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

const HOME_TABS     = ['Overview', 'Messages', 'Calendar', 'Fixtures and results', 'Our style', "Where we're at", 'Team staff', 'Files']
const SQUAD_TABS    = ['Players', 'Formation', 'Line-ups that worked', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy', 'Season reports', 'Catch-ups', 'Handover']
const TRAINING_TABS = ["Tonight's session", 'This week', 'Suggested', 'Drill library', 'Growth and load', 'What landed', 'Worked elsewhere']
const MATCHDAY_TABS = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review', 'Chances', 'Ladder', 'Your take', 'Set pieces']   // Chances and Ladder follow the club's rules for this age band
const CLIPS_TABS    = ['By measure', 'By game', 'By player', 'Playlists', 'To check', 'Learn']

const REC_TABS = ['Record', 'Recorded lately', 'Devices', 'How we measure']

export default function JuniorCoachApp({ onBack: _onBack, phaseContent, coachLabel, coachInitials, empty = false, initialScreen, onNavChange, coachRole = 'head', registerNav }: { onBack?: () => void; phaseContent?: ReactNode; coachLabel?: string; coachInitials?: string; empty?: boolean; initialScreen?: string; onNavChange?: (screen: string) => void; coachRole?: 'head' | 'ccoach'; registerNav?: (fn: (target: string) => boolean) => void }) {
  const { active: inSandbox, store } = useSandbox()
  const sbEmpty        = inSandbox ? !storeIsSample(store)       : empty
  const sbEmptySession = inSandbox ? !storeIsSample(store)       : empty
  const sbEmptyFixture = inSandbox ? !storeIsSample(store)       : empty
  const validNav = (s?: string): NavKey => (s === 'squad' || s === 'training' || s === 'matchday' || s === 'clips' || s === 'record') ? s : 'home'
  const HOME_SUB_MAP: Record<string, number> = { messages: 1, inbox: 1, calendar: 2, fixtures: 3, ourstyle: 4, setstyle: 4, whereweat: 5, teamstaff: 6, files: 7 }
  const initHomeTab = (initialScreen ? HOME_SUB_MAP[initialScreen] : 0) ?? 0
  const deep = coachDeepTab(initialScreen)   // opened by design id, e.g. "AV1-Availability"
  const deepIdx = (n: string) => deep?.nav === n ? deep.idx : 0
  const [nav, setNav]                 = useState<NavKey>(initialScreen === 'CN2-SelfVsCoach' ? 'matchday' : initialScreen === 'T5-PlayerProfile' ? 'squad' : deep ? deep.nav as NavKey : initHomeTab ? 'home' : validNav(initialScreen))
  const [sub, setSub]                 = useState<Sub>(null)
  const [homeTab, setHomeTab]         = useState(deep?.nav === 'home' ? deep.idx : initHomeTab)
  const [squadTab, setSquadTab]       = useState(deepIdx('squad'))
  const [formationPreset, setFormationPreset] = useState<FormationPreset | null>(null)
  const [profileIni, setProfileIni] = useState<string | null>(initialScreen === 'T5-PlayerProfile' ? 'MT' : null)
  const [layer, setLayer] = useState<string | null>(null)   // a designed screen opened over the app
  const [trainingTab, setTrainingTab] = useState(deepIdx('training'))
  const [matchTab, setMatchTab]       = useState(initialScreen === 'CN2-SelfVsCoach' ? 6 : deepIdx('matchday'))
  const [clipsTab, setClipsTab]       = useState(deepIdx('clips'))

  const [askOpen, setAskOpen] = useState(false)
  const [msgsView, setMsgsView] = useState<string | null>(null)
  const [recView, setRecView] = useState<string | null>(null)
  const [xgView, setXgView] = useState('XG1-ChancesGame')
  const [take, setTake] = useState<'yours' | 'theirs'>(initialScreen === 'CN2-SelfVsCoach' ? 'theirs' : 'yours')   // Your take: the coach's own ratings, or the players' beside them
  const cnEmpty = inSandbox && sbEmpty
  const [ytView, setYtView] = useState('YT1-YourTake')
  const may = allowed(useCapture(), 'juniors')
  // Match day tabs this team may see: Chances (4) and Ladder (5) follow the club's rules. A new team has no ladder yet.
  const matchVisible = MATCHDAY_TABS.map((_, i) => i).filter(i => (i !== 4 || may.chances) && (i !== 5 || (may.ladder && !(inSandbox && sbEmpty))))
  const openChance = (id: string) => { if (id.startsWith('XG3')) setMatchTab(5); else { setMatchTab(4); setXgView(id) } }
  const [filView, setFilView] = useState<string | null>(null)
  function goNav(n: NavKey) { setNav(n); setSub(null); setAskOpen(false); onNavChange?.(n); setMsgsView(null); setRecView(null); setFilView(null) }

  function handleNav(s: string) {
    if (s === 'CN2-SelfVsCoach') { goNav('matchday'); setMatchTab(6); setTake('theirs'); return }
    if (isYourTakeId(s)) { goNav('matchday'); setMatchTab(6); setTake('yours'); setYtView(s); return }   // the four Your take boards stay inside Match day
    if (isChanceId(s)) { goNav('matchday'); openChance(s); return }   // chances and the ladder live under Match day
    if (isCaptureId(s) || s === 'REC2-RecordSaved' || s === 'SET4-Devices') { goNav('record'); setRecView(s); return }   // capture quality steps live under Record
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
    if (s === 'call')      { demoToast('Opening the booking calendar.'); return }
    const tab = coachDeepTab(s)   // one of this app's own tabs: switch to it
    if (tab) { goNav(tab.nav as NavKey); if (tab.nav === 'home') setHomeTab(tab.idx); else if (tab.nav === 'squad') setSquadTab(tab.idx); else if (tab.nav === 'training') setTrainingTab(tab.idx); else if (tab.nav === 'matchday') setMatchTab(tab.idx); else if (tab.nav === 'clips') setClipsTab(tab.idx); return }
    if (isScreenId(s))     { setLayer(s); return }
    if (s === 'addgame')   { if (inSandbox) goSetup('fixtures', ''); else setSub('addgame'); return }
  }

  // Let an embedded Home story drive this frame: a deep-link whose design-id maps
  // to a tab switches the real tab (returns true); unmapped targets return false
  // so the Home story falls back to its in-place layer.
  useEffect(() => {
    registerAppNav(t => t.startsWith('example:') ? setLayer(t) : handleNav(t))
    return () => registerAppNav(null)
  })

  // In the sandbox, empty screens send the coach to the right part of Team set-up on Home.
  useEffect(() => {
    if (!inSandbox) return
    registerSetupNav(() => { goNav('home'); setHomeTab(0) })
    return () => registerSetupNav(null)
  })

  useEffect(() => {
    registerNav?.((target: string) => {
      const key = COACH_TARGET_NAV[target]
      if (key) { handleNav(key); return true }
      // Any other id that is one of this app's tabs opens that tab, lit in the menu, not a layer.
      const d = coachDeepTab(target)
      // Not one of this app's tabs: open it over the app with a way back, so there is one heading, not two.
      if (!d) { if (isScreenId(target)) { setLayer(target); return true } return false }
      goNav(d.nav as NavKey)
      if (d.nav === 'home') setHomeTab(d.idx); else if (d.nav === 'squad') setSquadTab(d.idx); else if (d.nav === 'training') setTrainingTab(d.idx); else if (d.nav === 'matchday') setMatchTab(d.idx); else if (d.nav === 'clips') setClipsTab(d.idx)
      return true
    })
  })

  const subTabs  = nav === 'clips'    ? CLIPS_TABS
                 : nav === 'home'     ? HOME_TABS
                 : nav === 'squad'    ? SQUAD_TABS
                 : nav === 'training' ? TRAINING_TABS
                 : nav === 'record'   ? REC_TABS
                 : matchVisible.map(i => MATCHDAY_TABS[i])

  const activeIdx = nav === 'home'     ? homeTab
                  : nav === 'squad'    ? squadTab
                  : nav === 'training' ? trainingTab
                  : nav === 'matchday' ? Math.max(0, matchVisible.indexOf(matchTab))
                  : nav === 'record'   ? (recView === 'REC2-RecordSaved' ? 1 : recView === 'SET4-Devices' ? 2 : recView ? captureSubTab(recView) : 0)
                  : clipsTab

  function handleSubTab(i: number) {
    setSub(null)
    if (nav === 'home')     { setHomeTab(i); if (i !== 7) setFilView(null) }
    if (nav === 'squad')    setSquadTab(i)
    if (nav === 'training') setTrainingTab(i)
    if (nav === 'matchday') { setMatchTab(matchVisible[i]); if (matchVisible[i] === 6) { setYtView('YT1-YourTake'); setTake('yours') } }   // the Your take tab always opens on its first board
    if (nav === 'clips')    setClipsTab(i)
    if (nav === 'record')   { if (i === 2) handleNav('SET4-Devices'); else setRecView(i === 1 ? 'REC2-RecordSaved' : i === 3 ? 'QC10-HowWeMeasure' : null) }
  }

  function filNav(s: string) {
    if (s === 'FIL1-Files' || s === 'FIL2-Sheet' || s === 'FIL2b-SheetLineup' ||
        s === 'FIL3-Doc'   || s === 'FIL4-Share'  || s === 'FIL6-SignUp' || s === 'FIL7-Form') {
      setFilView(s); return
    }
    setHomeTab(0); setFilView(null)
  }

  function renderFiles() {
    const fv = filView ?? 'FIL1-Files'
    if (fv === 'FIL4-Share') return (
      <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex' }}>
        <FIL2Sheet bare onBack={() => setFilView('FIL1-Files')} onShare={() => setFilView('FIL4-Share')} onNav={filNav} />
        <FIL4Share onClose={() => setFilView('FIL2-Sheet')} />
      </div>
    )
    if (fv === 'FIL2-Sheet')       return <FIL2Sheet bare onBack={() => setFilView('FIL1-Files')} onShare={() => setFilView('FIL4-Share')} onNav={filNav} />
    if (fv === 'FIL2b-SheetLineup') return <FIL2bSheetLineup bare onBack={() => setFilView('FIL1-Files')} onShare={() => setFilView('FIL4-Share')} onNav={filNav} />
    if (fv === 'FIL3-Doc')         return <FIL3Doc bare onBack={() => setFilView('FIL1-Files')} onShare={() => setFilView('FIL4-Share')} onNav={filNav} />
    if (fv === 'FIL6-SignUp')      return <FIL6SignUp bare onBack={() => setFilView('FIL1-Files')} onShare={() => setFilView('FIL4-Share')} onNav={filNav} />
    if (fv === 'FIL7-Form')        return <FIL7Form bare onBack={() => setFilView('FIL1-Files')} onShare={() => setFilView('FIL4-Share')} onAnswersSheet={() => setFilView('FIL2-Sheet')} onNav={filNav} />
    return <FIL1Files bare onOpenSheet={() => setFilView('FIL2-Sheet')} onOpenDoc={() => setFilView('FIL3-Doc')} onNav={filNav} />
  }

  if (sub === 'teamtalk')  return inSandbox && sbEmpty ? <SandboxTeamTalk onClose={() => setSub(null)} /> : <TeamTalkScreen role="head" onClose={() => setSub(null)} />
  if (sub === 'pitchside') return <PitchSideScreen onClose={() => setSub(null)} empty={sbEmpty} />
  if (sub === 'addgame')   return <AddGameScreen onClose={() => setSub(null)} />

  let content = null
  if (nav === 'home') {
    if (homeTab === 0 && inSandbox && sbEmpty) content = <TeamSetup onNav={handleNav} />
    else if (homeTab === 0) content = phaseContent ?? (coachRole === 'ccoach' ? <CoCoachHomeScreen empty={sbEmpty} onNav={handleNav} onAsk={() => setAskOpen(true)} askQuestions={['Who needs a rest this week?', 'What should we work on tonight?', 'Is everyone getting fair minutes?']} /> : <HomeScreen role="head" onRole={() => {}} onNav={handleNav} onCalendar={() => setHomeTab(2)} empty={sbEmpty} onAsk={() => setAskOpen(true)} askQuestions={['Who needs a rest this week?', 'What should we work on tonight?', 'Is everyone getting fair minutes?']} teamName={inSandbox ? (store.teams[0]?.name ?? 'your team') : 'U12 Sam'} />)
    else if (homeTab === 1 && inSandbox && sbEmpty) content = <SandboxWaiting kind="messages" />
    else if (homeTab === 1) {
      if (msgsView === 'MSG1-NewMessage') content = <CoachNewMessage onBack={() => setMsgsView(null)} onNav={setMsgsView} />
      else if (msgsView === 'MSG3-PersonCard') content = <CoachMessagesPersonCard onBack={() => setMsgsView(null)} onNav={setMsgsView} />
      else content = <CoachMessages onNav={setMsgsView} embedded />
    }
    else if (homeTab === 2) content = <FixturesScreen empty={sbEmpty} />
    else if (homeTab === 3) content = <FixturesScreen empty={sbEmpty} />
    else if (homeTab === 4) content = <OurStyleScreen />
    else if (homeTab === 5) content = inSandbox && sbEmpty ? <WhereWeAtScreenEmpty teamType="juniors" /> : <WhereWeAtScreen teamType="juniors" />
    else if (homeTab === 6) content = <TeamStaffScreen empty={sbEmpty} />
    else if (homeTab === 7) content = renderFiles()
  } else if (nav === 'squad') {
    if (squadTab === 0) content = profileIni ? <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}><div style={{ flex: 'none', padding: '10px 28px 0' }}><button onClick={() => setProfileIni(null)} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>← All players</button></div><PlayerProfileScreen playerIni={profileIni} /></div> : <SquadScreen role="head" onPlayerProfile={setProfileIni} empty={sbEmpty} />
    else if (squadTab === 1 && inSandbox && sbEmpty) content = <SandboxWaiting kind="formation" />
    else if (squadTab === 2 && inSandbox && sbEmpty) content = <SandboxWaiting kind="lineups" />
    else if (squadTab === 1) content = <FormationBuilder key={formationPreset?.note ?? 'plain'} preset={formationPreset} team="juniors" onNav={(s) => { if (s === 'T2-TabletMatch') { goNav('matchday'); setMatchTab(1) } else if (s === 'SQ1-BestLineups') { setSquadTab(2) } else { handleNav(s) } }} />
    else if (squadTab === 2) content = <SquadLineups noFrame onNav={(s, preset) => { if (s === 'formation') { setFormationPreset(preset ?? null); setSquadTab(1) } else if (s === 'record') { goNav('record') } else if (s === 'teamsheet') { goNav('matchday'); setMatchTab(1) } }} />
    else if (squadTab === 3) content = <DevGoalsScreen empty={sbEmpty} />
    else if (squadTab === 4) content = <WellnessScreen empty={sbEmpty} onNav={handleNav} />
    else if (squadTab === 5) content = <AvailabilityScreen empty={sbEmpty} onNav={handleNav} />
    else if (squadTab === 6) content = <ConsentScreen empty={sbEmpty} />
    else if (squadTab >= 7) content = <CnScreen empty={cnEmpty} id={['CN9-SeasonReport', 'CN10-CatchUps', 'CN13-Handover'][squadTab - 7]} onNav={handleNav} />
  } else if (nav === 'training') {
    if (trainingTab === 0) content = <TrainingScreen role="head" onNav={handleNav} empty={sbEmptySession} />
    else if (trainingTab === 1) content = <ThisWeekScreen empty={sbEmptySession} onDrillLibrary={() => setTrainingTab(3)} onTonightsPlan={() => setTrainingTab(0)} onGrowthLoad={() => setTrainingTab(4)} />
    else if (trainingTab === 2) content = <SuggestionsScreen empty={sbEmptySession} onRecord={() => goNav('record')} />
    else if (trainingTab === 3) content = <DrillLibraryScreen empty={sbEmptySession} />
    else if (trainingTab === 4) content = <GrowthLoadScreen empty={sbEmptySession} />
    else if (trainingTab === 5 || trainingTab === 6) content = <CnScreen empty={cnEmpty} id={trainingTab === 5 ? 'CN4-SessionsLanded' : 'CN8-WhatWorked'} onNav={handleNav} />
    else if (trainingTab === 7) content = <FitnessTrainingTab empty={sbEmptySession} />
  } else if (nav === 'record') {
    if (recView && isCaptureId(recView)) content = <CaptureFlow step={recView} onStep={setRecView} onNav={handleNav} kitless={inSandbox && sbEmpty} team={inSandbox ? (store.teams[0]?.name ?? 'your team') : 'U12 Sam'} />
    else if (recView === 'SET4-Devices') content = <DevicesTab onToast={demoToast} inRecord />   // Devices stays inside Record: the tab is lit and the coach never leaves the app
    else if (recView === 'REC2-RecordSaved') content = <RecordSaved noFrame onBack={() => setRecView(null)} onNav={(s) => { if (s === 'EX1-HowWorkedOut') { goNav('matchday'); setMatchTab(3) } else { handleNav(s) } }} />
    else content = <RecordHub noFrame onNav={handleNav} />
  } else if (nav === 'matchday') {
    if (matchTab === 0) content = <MatchDayScreen onNav={handleNav} empty={sbEmptyFixture} />
    else if (matchTab === 1) content = <TeamSheetScreen empty={sbEmptyFixture} />
    else if (matchTab === 2) content = <OppositionScreen empty={sbEmptyFixture} />
    else if (matchTab === 3) content = <ReviewScreen empty={sbEmptyFixture} />
    else if (matchTab === 4 || matchTab === 5) content = <ChancesFlow team="u12" step={matchTab === 5 ? 'XG3-LadderPPI' : xgView} onStep={openChance} onNav={handleNav} noFilmYet={inSandbox && sbEmpty} />
    else if (matchTab === 6) content = inSandbox && sbEmpty ? <SandboxWaiting kind="yourtake" /> : take === 'theirs' ? <CnScreen id="CN2-SelfVsCoach" onNav={handleNav} /> : <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}><div style={{ flex: 'none', padding: '10px 28px 0' }}><button onClick={() => setTake('theirs')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Their take, next to yours</button></div><YourTakeBoards view={ytView} onView={setYtView} onNav={handleNav} /></div>
    else if (matchTab === 7) content = <CnScreen empty={cnEmpty} id="CN17-SetPieces" onNav={handleNav} />
    else if (matchTab === 8) content = <FitnessMatchTab empty={sbEmptyFixture} />
  } else if (nav === 'clips') {
    content = <ClipsScreen empty={sbEmpty} activeTab={clipsTab} onNav={handleNav} />
  }

  if (layer) return <ScreenLayer screenKey={layer.replace(/^example:/, '')} example={layer.startsWith('example:')} onClose={() => setLayer(null)} backLabel={layer.startsWith('example:') && inSandbox ? `Back to ${store.teams[0]?.name ?? 'your team'} · this is an example from the demo club` : 'Back to U12 Sam'} />

  return (
    <CoachTabletFrame
      navTabs={NAV_TABS}
      activeNav={nav}
      onNav={id => goNav(id as NavKey)}
      subTabs={subTabs}
      activeSubTabIndex={activeIdx}
      onSubTab={handleSubTab}
      roleChip={coachRole === 'ccoach' ? 'Assistant coach' : 'Head coach'}
      teamLabel={coachLabel ?? (inSandbox ? (store.teams[0]?.name ?? 'My team') : 'U12 Sam · Wattle Creek')}
      onTeam={inSandbox ? undefined : () => handleNav('VS1-SwitchView')}
      avatarLetters={coachInitials ?? 'SK'}
      showAsk={true}
      askOpen={askOpen}
      onAskToggle={() => setAskOpen(o => !o)}
      askQuestions={['Who needs a rest this week?', 'What should we work on tonight?', 'Is everyone getting fair minutes?']}
      askRole={coachRole === 'ccoach' ? 'assistant coach' : 'head coach'}
      showBadge={tab => !sbEmpty && !inSandbox && (tab === 'Messages' || tab === 'To check')}
    >
      <div data-screen={nav === 'record' && recView ? recView.split('#')[0] : nav === 'home' && activeIdx === 0 ? (coachRole === 'ccoach' ? 'STO7-HomeStoryAssistant' : 'STO5-HomeStoryJuniors') : COACH_TAB_SCREEN[nav]?.[nav === 'matchday' ? matchTab : activeIdx] ?? COACH_TAB_SCREEN[nav]?.[0]} style={{ display: 'contents' }}>{content}</div>
    </CoachTabletFrame>
  )
}
