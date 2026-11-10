import { useState } from 'react'
import type { ReactNode } from 'react'
import HomeScreen            from '../HomeScreen'
import TrainingScreen        from '../TrainingScreen'
import MatchDayScreen        from '../MatchDayScreen'
import SquadScreen           from '../SquadScreen'
import ReviewScreen          from '../ReviewScreen'
import SignupScreen          from '../SignupScreen'
import FitnessCoachScreen    from '../FitnessCoachScreen'
import ClubAdminScreen       from '../ClubAdminScreen'
import MiniRoosApp           from '../miniroos/MiniRoosApp'
import GoalkeeperCoachApp    from '../GoalkeeperCoachApp'
import CoordinatorPortal     from '../CoordinatorPortal'
import RolloverScreen        from '../RolloverScreen'
import SeniorsYouthCoachApp  from '../SeniorsYouthCoachApp'
import TeamManagerScreen     from '../TeamManagerScreen'
import TwoChildrenApp        from '../playerapp/TwoChildrenApp'
import PlayerAppScreen       from '../PlayerAppScreen'
import OlderPlayerApp        from '../playerapp/OlderPlayerApp'
import RefereesPhoneScreen   from '../playerapp/RefereesPhoneScreen'
import AcademyOwnerApp       from '../AcademyOwnerApp'
import AcademyCoachApp       from '../AcademyCoachApp'
import AcademyParentApp      from '../AcademyParentApp'
import AcademyPlayerApp      from '../AcademyPlayerApp'
import PlayerMeScreen        from '../playerapp/PlayerMeScreen'
import ClipsScreen           from '../ClipsScreen'
import TeamChatScreen        from '../TeamChatScreen'
import SuggestionsScreen     from '../SuggestionsScreen'
import ThisWeekScreen        from '../ThisWeekScreen'
import WellnessScreen        from '../WellnessScreen'
import OurStyleScreen        from '../OurStyleScreen'
import TeamTalkScreen        from '../TeamTalkScreen'
import PitchSideScreen       from '../PitchSideScreen'
import InboxScreen           from '../InboxScreen'
import RecordScreen          from '../RecordScreen'
import DevGoalsScreen        from '../DevGoalsScreen'
import AvailabilityScreen    from '../AvailabilityScreen'
import TeamSheetScreen       from '../TeamSheetScreen'
import TeamStaffScreen       from '../TeamStaffScreen'
import SeasonSummariesScreen from '../SeasonSummariesScreen'
import GrowthLoadScreen      from '../GrowthLoadScreen'
import OppositionScreen      from '../OppositionScreen'
import DrillLibraryScreen    from '../DrillLibraryScreen'
import AddGameScreen         from '../AddGameScreen'
import CoachFitnessScreen    from '../CoachFitnessScreen'
import SettingsScreen        from '../SettingsScreen'
import DemoStart             from './DemoStart'
import DemoStartEmpty        from './DemoStartEmpty'
import DemoSignIn            from './DemoSignIn'
import DemoWhy               from './DemoWhy'
import DemoTourShell         from './DemoTourShell'
import DemoShell             from './DemoShell'
import { TOURS, type RoleId } from './tours'

type DemoView = 'signin' | 'start' | 'why' | 'tour' | 'lookaround' | 'sandbox'

function noop() {}

function renderScreen(key: string): ReactNode {
  switch (key) {
    case 'home':
      return <HomeScreen role="head" onRole={noop} onNav={noop} onCalendar={noop} empty={false} />
    case 'training':
      return <TrainingScreen role="head" onNav={noop} empty={false} />
    case 'matchday':
      return <MatchDayScreen onNav={noop} empty={false} />
    case 'squad':
      return <SquadScreen role="head" onPlayerProfile={noop} empty={false} />
    case 'review':
      return <ReviewScreen empty={false} />
    case 'signup':
      return <SignupScreen onDone={noop} />
    case 'miniroos':
      return (
        <div style={{ width: 1180, background: 'var(--surface-100)' }}>
          <MiniRoosApp onBack={noop} empty={false} />
        </div>
      )
    case 'goalkeeper':
      return <GoalkeeperCoachApp onBack={noop} empty={false} />
    case 'coordinator':
      return <CoordinatorPortal onBack={noop} empty={false} />
    case 'rollover':
      return <RolloverScreen onBack={noop} empty={false} />
    case 'seniors':
      return <SeniorsYouthCoachApp teamType="seniors" onBack={noop} />
    case 'youth':
      return <SeniorsYouthCoachApp teamType="youth" onBack={noop} />
    case 'fitnesscoach':
      return <FitnessCoachScreen empty={false} />
    case 'clubadmin':
      return <ClubAdminScreen empty={false} />
    case 'teammanager':
      return <TeamManagerScreen empty={false} />
    case 'twochildren':
    case 'parent-phone':
      return <TwoChildrenApp onBack={noop} empty={false} />
    case 'playerapp':
      return <PlayerAppScreen empty={false} />
    case 'olderplayer':
      return <OlderPlayerApp empty={false} />
    case 'refereephone':
      return <RefereesPhoneScreen empty={false} />
    case 'academyowner':
      return <AcademyOwnerApp onBack={noop} empty={false} />
    case 'academycoach':
      return <AcademyCoachApp onBack={noop} empty={false} />
    case 'academyparent':
      return <AcademyParentApp onBack={noop} empty={false} />
    case 'academyplayer':
      return <AcademyPlayerApp onBack={noop} empty={false} />
    case 'playerme':
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
          <PlayerMeScreen onBack={noop} />
        </div>
      )
    case 'clips':
      return <ClipsScreen empty={false} />
    case 'teamchat':
      return <TeamChatScreen empty={false} />
    case 'suggestions':
      return <SuggestionsScreen empty={false} />
    case 'thisweek':
      return <ThisWeekScreen empty={false} />
    case 'wellness':
      return <WellnessScreen empty={false} />
    case 'style':
      return <OurStyleScreen />
    case 'teamtalk':
      return <TeamTalkScreen role="head" onClose={noop} />
    case 'pitchside':
      return <PitchSideScreen onClose={noop} empty={false} />
    case 'inbox':
      return <InboxScreen empty={false} />
    case 'record':
      return <RecordScreen empty={false} />
    case 'goals':
      return <DevGoalsScreen />
    case 'availability':
      return <AvailabilityScreen />
    case 'teamsheet':
      return <TeamSheetScreen empty={false} />
    case 'teamstaff':
      return <TeamStaffScreen empty={false} />
    case 'seasons':
      return <SeasonSummariesScreen />
    case 'growth':
      return <GrowthLoadScreen />
    case 'opposition':
      return <OppositionScreen />
    case 'drills':
      return <DrillLibraryScreen empty={false} />
    case 'addgame':
      return <AddGameScreen onClose={noop} />
    case 'coachfitness':
      return <CoachFitnessScreen />
    case 'settings':
      return <SettingsScreen onDone={noop} />
    default:
      return (
        <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div style={{ fontSize: 15, color: '#6f7f7b' }}>Screen "{key}" not yet built.</div>
        </div>
      )
  }
}

function getStartScreen(roleId: RoleId): string | undefined {
  const tour = TOURS[roleId]
  for (const section of tour.sections) {
    for (const step of section.steps) {
      if (step.screen) return step.screen
    }
  }
  return undefined
}

export default function DemoApp() {
  const [view, setView] = useState<DemoView>('signin')
  const [role, setRole] = useState<RoleId>('coach')

  function startTour(roleId: RoleId) {
    setRole(roleId)
    setView('tour')
  }

  function startLook(roleId: RoleId) {
    setRole(roleId)
    setView('lookaround')
  }

  if (view === 'signin') {
    return (
      <DemoSignIn
        onDemo={() => setView('start')}
        onSandbox={() => setView('sandbox')}
        onWhy={() => setView('why')}
      />
    )
  }

  if (view === 'sandbox') {
    return (
      <DemoStartEmpty
        onRole={(roleId) => { setRole(roleId); setView('lookaround') }}
        onSwitchToDemo={() => setView('start')}
      />
    )
  }

  if (view === 'why') {
    return <DemoWhy onBack={() => setView('signin')} />
  }

  if (view === 'tour') {
    return (
      <DemoTourShell
        roleId={role}
        onBack={() => setView('start')}
        renderScreen={renderScreen}
      />
    )
  }

  if (view === 'lookaround') {
    const startScreenKey = getStartScreen(role)
    return (
      <DemoShell
        roleId={role}
        onBack={() => setView('start')}
        onStartTour={() => setView('tour')}
      >

        {startScreenKey ? renderScreen(startScreenKey) : (
          <div style={{ padding: 48, fontSize: 15, color: '#6f7f7b' }}>
            {TOURS[role].roleLabel} — no screen preview available.
          </div>
        )}
      </DemoShell>
    )
  }

  return (
    <DemoStart
      onTour={startTour}
      onLook={startLook}
      onStory={() => startTour('story')}
      onWhy={() => setView('why')}
    />
  )
}
