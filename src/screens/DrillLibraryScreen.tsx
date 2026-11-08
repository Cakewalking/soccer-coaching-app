import { useState } from 'react'
import type { Drill } from './drillibrary/data'
import DrillLibraryMain from './drillibrary/DrillLibraryMain'
import DrillDetail from './drillibrary/DrillDetail'
import SessionPlans from './drillibrary/SessionPlans'
import TermPlanner from './drillibrary/TermPlanner'
import DrillWizard from './drillibrary/DrillWizard'

type View = 'library' | 'detail' | 'wizard' | 'done' | 'session-plans' | 'term-planner'

export default function DrillLibraryScreen() {
  const [view, setView]       = useState<View>('library')
  const [drill, setDrill]     = useState<Drill | null>(null)
  const [filterTab, setFTab]  = useState(0)
  const [agePhase, setAge]    = useState('Skill Acquisition 9–12')
  const [chipFilter, setChip] = useState('Everything')
  const [wizStep, setWStep]   = useState(1)
  const [wizName, setWName]   = useState('')
  const [wizPlayers, setWP]   = useState(8)
  const [wizTime, setWT]      = useState(15)
  const [wizArea, setWA]      = useState('30 × 25 m')
  const [wizAges, setWAges]   = useState<string[]>([])
  const [wizKit, setWKit]     = useState<string[]>(['Balls'])

  const openDrill = (d: Drill) => { setDrill(d); setView('detail') }
  const openWiz   = () => { setView('wizard'); setWStep(1) }
  const closeWiz  = () => { setView('library'); setWStep(1) }

  if (view === 'wizard' || view === 'done') {
    return (
      <DrillWizard
        step={wizStep} done={view === 'done'}
        name={wizName}    onName={setWName}
        players={wizPlayers} onPlayers={setWP}
        time={wizTime}    onTime={setWT}
        area={wizArea}    onArea={v => setWA(Array.isArray(v) ? v[0] : v)}
        ages={wizAges}    onAges={v => setWAges(Array.isArray(v) ? v : [v])}
        kit={wizKit}      onKit={v => setWKit(Array.isArray(v) ? v : [v])}
        onNext={() => { if (wizStep < 4) setWStep(s => s + 1); else setView('done') }}
        onBack={() => { if (wizStep > 1) setWStep(s => s - 1); else closeWiz() }}
        onCancel={closeWiz}
        onAddToSession={closeWiz}
        onBackToLibrary={closeWiz}
      />
    )
  }

  if (view === 'detail' && drill) {
    return <DrillDetail drill={drill} onBack={() => setView('library')}/>
  }
  if (view === 'session-plans') {
    return <SessionPlans onBack={() => setView('library')}/>
  }
  if (view === 'term-planner') {
    return <TermPlanner onBack={() => setView('library')}/>
  }

  return (
    <DrillLibraryMain
      filterTab={filterTab} setFilterTab={setFTab}
      agePhase={agePhase}   setAgePhase={setAge}
      chipFilter={chipFilter} setChipFilter={setChip}
      onDrillClick={openDrill}
      onSessionPlans={() => setView('session-plans')}
      onTermPlanner={() => setView('term-planner')}
      onAddDrill={openWiz}
    />
  )
}
