import { useState } from 'react'
import type { Drill } from './drillibrary/data'
import DrillLibraryMain from './drillibrary/DrillLibraryMain'
import DrillDetail from './drillibrary/DrillDetail'
import SessionPlans from './drillibrary/SessionPlans'
import TermPlanner from './drillibrary/TermPlanner'
import DrillWizard from './drillibrary/DrillWizard'

type View = 'library' | 'detail' | 'wizard' | 'done' | 'session-plans' | 'term-planner'

const G   = '#2f6252'
const INK = '#10211f'
const MUT = '#4a5a57'
const LN  = '#e8edeb'

const STARTER_DRILLS = [
  { name: 'FIFA 11+ Kids warm-up',       cat: 'Warm-up · 20 min' },
  { name: 'Rondo, 5 v 2',                cat: 'First touch · 10 min' },
  { name: '4 v 4 + 3 keep-ball',         cat: 'First touch · 15 min' },
  { name: '1 v 1 to gates',              cat: '1 v 1 · 15 min' },
  { name: 'Shoot on sight, 3 v 3',       cat: 'Striking the ball · 15 min' },
  { name: 'Win it back in 6 seconds',    cat: 'Team moments · 25 min' },
  { name: 'Play out from the keeper, 6 v 4', cat: 'Team moments · 20 min' },
  { name: 'Free game 9 v 9',             cat: 'Games · 20 min' },
]

export default function DrillLibraryScreen({ empty }: { empty?: boolean }) {
  const [view, setView]       = useState<View>('library')
  const [drill, setDrill]     = useState<Drill | null>(null)
  const [filterTab, setFTab]  = useState(0)
  const [agePhase, setAge]    = useState('9–12')
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

  if (empty) {
    return (
      <div style={{ flexGrow: 1, padding: '24px 28px', boxSizing: 'border-box' as const, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Drill library</h1>
            <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>44 drills · none of your own yet</div>
          </div>
          <button onClick={openWiz} style={{ height: 44, padding: '0 18px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add your own drill</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px' }}>
              <div style={{ fontSize: 14, color: MUT, marginBottom: 12 }}>After your first recorded game, drills that fix what Clean Sheet saw show up first. Until then, here is a starter set for your U12s.</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Good first drills for ages 9 to 12</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {STARTER_DRILLS.map((d, i) => (
                  <div key={i} style={{ padding: '12px 0', borderTop: i > 0 ? `1px solid ${LN}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: MUT }}>{d.cat}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                ))}
              </div>
              <button style={{ marginTop: 12, height: 44, padding: '0 16px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>See all 24</button>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Our drills</div>
              <div style={{ fontSize: 14, color: MUT, marginBottom: 2 }}>No drills of your own yet</div>
              <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Draw one, pick a clip, or snap your whiteboard. Clean Sheet suggests it when it fits.</div>
              <button onClick={openWiz} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add your own drill</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { title: 'Suggested at the right time', body: 'Link a drill to a problem and it shows up after games where that problem appears.' },
              { title: 'Share with your club', body: 'Let every Wattle Creek coach use it, or keep it to yourself.' },
            ].map((card, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>{card.title}</div>
                <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>{card.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

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
      onDrillClick={openDrill}
      onSessionPlans={() => setView('session-plans')}
      onTermPlanner={() => setView('term-planner')}
      onAddDrill={openWiz}
    />
  )
}
