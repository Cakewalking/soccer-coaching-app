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
import SP1FootballYear        from '../footballyear/SP1FootballYear'
import SP1eFootballYearEmpty  from '../footballyear/SP1eFootballYearEmpty'
import SP18ClubPhases         from '../footballyear/SP18ClubPhases'
import SP18eClubPhasesEmpty   from '../footballyear/SP18eClubPhasesEmpty'
import SP19TrialWindow        from '../footballyear/SP19TrialWindow'
import SP2HomePreSeason       from '../footballyear/SP2HomePreSeason'
import SP3ProvisionalSquad    from '../footballyear/SP3ProvisionalSquad'
import SP3eProvisionalSquadEmpty from '../footballyear/SP3eProvisionalSquadEmpty'
import SP4CoachTrial          from '../footballyear/SP4CoachTrial'
import SP5Baseline            from '../footballyear/SP5Baseline'
import SP5eBaselineEmpty      from '../footballyear/SP5eBaselineEmpty'
import SP6LoadBuild           from '../footballyear/SP6LoadBuild'
import SP7Friendlies          from '../footballyear/SP7Friendlies'
import SP7eFriendliesEmpty    from '../footballyear/SP7eFriendliesEmpty'
import SP8GradingInput        from '../footballyear/SP8GradingInput'
import SP9MidSeasonReview     from '../footballyear/SP9MidSeasonReview'
import SP10HomePostSeason     from '../footballyear/SP10HomePostSeason'
import SP11TournamentSetup    from '../footballyear/SP11TournamentSetup'
import SP11eTournamentEmpty   from '../footballyear/SP11eTournamentEmpty'
import SP12TournamentDay      from '../footballyear/SP12TournamentDay'
import SP13TournamentReview   from '../footballyear/SP13TournamentReview'
import SP14IndoorTeam         from '../footballyear/SP14IndoorTeam'
import SP14eIndoorTeamEmpty   from '../footballyear/SP14eIndoorTeamEmpty'
import SP15ComingBack         from '../footballyear/SP15ComingBack'
import SP16RestMonth          from '../footballyear/SP16RestMonth'
import SP20StandIn            from '../footballyear/SP20StandIn'
import SP20eStandInEmpty      from '../footballyear/SP20eStandInEmpty'
import SPp1ParentPreSeason    from '../footballyear/SPp1ParentPreSeason'
import SPp2ParentComingBack   from '../footballyear/SPp2ParentComingBack'
import SPp3ParentTournament   from '../footballyear/SPp3ParentTournament'
import SPp4ParentRestMonth    from '../footballyear/SPp4ParentRestMonth'
import SPp6ManagerTournament  from '../footballyear/SPp6ManagerTournament'
import SPp7PlayerRestMonth    from '../footballyear/SPp7PlayerRestMonth'
import SPp8StandInAsked       from '../footballyear/SPp8StandInAsked'
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

    // Football year SP screens
    case 'footballyear':        return <SP1FootballYear onBack={noop} />
    case 'footballyear-empty':  return <SP1eFootballYearEmpty onBack={noop} />
    case 'clubphases':          return <SP18ClubPhases onBack={noop} />
    case 'clubphases-empty':    return <SP18eClubPhasesEmpty onBack={noop} />
    case 'trialwindow':         return <SP19TrialWindow onBack={noop} />
    case 'homepreseason':       return <SP2HomePreSeason onBack={noop} />
    case 'provisionalsquad':    return <SP3ProvisionalSquad onBack={noop} />
    case 'provisionalsquad-e':  return <SP3eProvisionalSquadEmpty onBack={noop} />
    case 'coachtrial':          return <SP4CoachTrial onBack={noop} />
    case 'baseline':            return <SP5Baseline onBack={noop} />
    case 'baseline-empty':      return <SP5eBaselineEmpty onBack={noop} />
    case 'loadbuild':           return <SP6LoadBuild onBack={noop} />
    case 'friendlies':          return <SP7Friendlies onBack={noop} />
    case 'friendlies-empty':    return <SP7eFriendliesEmpty onBack={noop} />
    case 'gradinginput':        return <SP8GradingInput onBack={noop} />
    case 'midseasonreview':     return <SP9MidSeasonReview onBack={noop} />
    case 'homepostseason':      return <SP10HomePostSeason onBack={noop} />
    case 'tournamentsetup':     return <SP11TournamentSetup onBack={noop} />
    case 'tournament-empty':    return <SP11eTournamentEmpty onBack={noop} />
    case 'tournamentday':       return <SP12TournamentDay onBack={noop} />
    case 'tournamentreview':    return <SP13TournamentReview onBack={noop} />
    case 'indoorteam':          return <SP14IndoorTeam onBack={noop} />
    case 'indoorteam-empty':    return <SP14eIndoorTeamEmpty onBack={noop} />
    case 'comingback':          return <SP15ComingBack onBack={noop} />
    case 'restmonth':           return <SP16RestMonth onBack={noop} />
    case 'standin':             return <SP20StandIn onBack={noop} />
    case 'standin-empty':       return <SP20eStandInEmpty onBack={noop} />
    case 'parent-preseason':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp1ParentPreSeason onBack={noop} /></div>
    case 'parent-comingback':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp2ParentComingBack onBack={noop} /></div>
    case 'parent-tournament':   return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp3ParentTournament onBack={noop} /></div>
    case 'parent-restmonth':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp4ParentRestMonth onBack={noop} /></div>
    case 'manager-tournament':  return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp6ManagerTournament onBack={noop} /></div>
    case 'player-restmonth':    return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp7PlayerRestMonth onBack={noop} /></div>
    case 'standin-asked':       return <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}><SPp8StandInAsked onBack={noop} /></div>

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
