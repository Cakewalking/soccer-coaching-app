import { useState } from 'react'
import type { Drill } from './data'
import { G, G2, GD, INK, MUT, LN, DRILLS, FIX_ITEMS, PHASE_LABEL_TO_ID } from './data'
import PitchDiagram from './PitchDiagram'

const SHORT_PHASES = ['5–9', '9–12', '12–16', '16+', 'All ages']
const TEAM_PHASE   = '9–12'

const PHASE_DESC: Record<string, string> = {
  '5–9':      'Discovery phase · play, explore and have fun',
  '9–12':     'Skill Acquisition phase · the four core skills, in small games',
  '12–16':    'Game Training phase · put the skills together',
  '16+':      'Performance phase · peak physical and technical',
  'All ages': 'All age phases',
}

const PHASE_AGES: Record<string, string> = {
  '5–9':      'ages 5 to 9',
  '9–12':     'ages 9 to 12',
  '12–16':    'ages 12 to 16',
  '16+':      'ages 16 and over',
  'All ages': 'all ages',
}

const TAG_COLORS: Record<string, string> = {
  'Curriculum':       G2,
  'Research-backed':  '#c3a84a',
  'Tested in trials': G2,
}

function SuggestedCard({ drill, onClick }: { drill: Drill; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 12px', border:`1px solid ${LN}`, borderRadius:10, background:'#fff', cursor:'pointer', textAlign:'left', fontFamily:'inherit', width:'100%' }}>
      <div style={{ flexShrink:0 }}>
        <PitchDiagram id={drill.id} w={72} h={46}/>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color:INK, marginBottom:2, lineHeight:1.3 }}>{drill.name}</div>
        {drill.whySuggested && <div style={{ fontSize:11, color:MUT, lineHeight:1.4, marginBottom:3 }}>Checks: {drill.whySuggested.substring(0, 55)}{drill.whySuggested.length > 55 ? '…' : ''}</div>}
        <div style={{ fontSize:11, color:MUT }}>{drill.time} min · {drill.players}</div>
      </div>
    </button>
  )
}

function DrillRow({ drill, onClick }: { drill: Drill; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', border:`1px solid ${LN}`, borderRadius:10, background:'#fff', cursor:'pointer', textAlign:'left', fontFamily:'inherit', width:'100%' }}>
      <div style={{ flexShrink:0 }}>
        <PitchDiagram id={drill.id} w={56} h={36}/>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color:INK, marginBottom:2, lineHeight:1.3 }}>{drill.name}</div>
        <div style={{ fontSize:11, color:MUT, marginBottom:drill.tags?.[0] ? 3 : 0 }}>{drill.category} · {drill.time} min · {drill.players}</div>
        {drill.tags?.[0] && (
          <span style={{ display:'inline-flex', alignItems:'center', gap:3, fontSize:11, fontWeight:600, color: TAG_COLORS[drill.tags[0]] ?? G2 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background: TAG_COLORS[drill.tags[0]] ?? G2, flexShrink:0 }}/>
            {drill.tags[0]}
          </span>
        )}
      </div>
    </button>
  )
}

interface Props {
  filterTab: number
  setFilterTab: (n: number) => void
  agePhase: string
  setAgePhase: (s: string) => void
  onDrillClick: (d: Drill) => void
  onSessionPlans: () => void
  onTermPlanner: () => void
  onAddDrill: () => void
}

export default function DrillLibraryMain({ filterTab, setFilterTab, agePhase, setAgePhase, onDrillClick, onSessionPlans, onTermPlanner, onAddDrill }: Props) {
  const [activeSugg, setActiveSugg] = useState(0)

  const phaseId    = PHASE_LABEL_TO_ID[agePhase]
  const featured   = DRILLS.filter(d => d.featured && (phaseId === null || d.phases.includes(phaseId)))
  const allCount   = DRILLS.filter(d => phaseId === null || d.phases.includes(phaseId)).length
  const ourCount   = DRILLS.filter(d => d.isOurs && (phaseId === null || d.phases.includes(phaseId))).length
  const totalOurs  = DRILLS.filter(d => d.isOurs).length
  const filtered   = DRILLS.filter(d =>
    (phaseId === null || d.phases.includes(phaseId)) &&
    (filterTab === 1 ? d.isOurs : filterTab === 2 ? false : true)
  )
  const mainDrills = filtered.filter(d => !d.featured)
  const activeFix  = FIX_ITEMS[activeSugg]

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'20px 28px 0', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
        <div>
          <div style={{ fontSize:24, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>Drill library</div>
          <div style={{ fontSize:13, color:MUT, marginTop:2 }}>{DRILLS.length} drills{totalOurs > 0 ? ` · ${totalOurs} of ours` : ''}</div>
        </div>
        <div style={{ flexGrow:1 }}/>
        <button onClick={onSessionPlans} style={{ height: 44, padding:'0 14px', borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Session plans</button>
        <button onClick={onTermPlanner} style={{ height: 44, padding:'0 14px', borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Term planner</button>
        <div style={{ position:'relative' }}>
          <svg style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><circle cx={11} cy={11} r={8}/><path d="M21 21l-4.3-4.3"/></svg>
          <input placeholder="Search drills" style={{ height:36, paddingLeft:32, paddingRight:14, borderRadius:999, border:`1px solid ${LN}`, fontSize:13, fontFamily:'inherit', outline:'none', width:180, color:INK }}/>
        </div>
        <button onClick={onAddDrill} style={{ height: 44, padding:'0 16px', borderRadius:999, border:'none', background:G, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:8 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Add a drill
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex:1, overflowY:'auto', padding:'16px 28px 32px', display:'flex', flexDirection:'column', gap:14 }}>

        {/* Row 1: Age pills + All/Ours/Saved */}
        <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
          {SHORT_PHASES.map(ph => {
            const on     = agePhase === ph
            const isTeam = ph === TEAM_PHASE
            return (
              <button key={ph} onClick={() => setAgePhase(ph)} style={{ height: isTeam ? 44 : 34, padding: isTeam ? '0 16px' : '0 14px', borderRadius:999, border:`1px solid ${on ? G : LN}`, background: on ? G : '#fff', color: on ? '#fff' : MUT, fontSize:13, fontWeight: on ? 700 : 400, cursor:'pointer', fontFamily:'inherit', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', lineHeight:1.2 }}>
                <span>{ph}</span>
                {isTeam && <span style={{ fontSize:10, opacity: on ? 0.75 : 0.55, fontWeight:600 }}>Your team</span>}
              </button>
            )
          })}
          <div style={{ marginLeft:'auto', display:'flex', gap:4 }}>
            {([`All ${allCount}`, `Ours ${ourCount}`, 'Saved 3'] as const).map((label, i) => (
              <button key={i} onClick={() => setFilterTab(i)} style={{ height: 44, padding:'0 12px', borderRadius:999, border:`1px solid ${filterTab === i ? G : LN}`, background: filterTab === i ? G : '#fff', color: filterTab === i ? '#fff' : MUT, fontSize:12, fontWeight: filterTab === i ? 700 : 400, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Phase description */}
        <div style={{ fontSize:12, color:MUT, marginTop:-6 }}>{PHASE_DESC[agePhase] ?? ''}</div>

        {/* Row 3: Filter dropdowns + drill count */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {(['Skill', 'Players', 'Time', 'Goals'] as const).map(f => (
            <button key={f} style={{ height: 44, padding:'0 12px', borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:13, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:4, whiteSpace:'nowrap' }}>
              {f} <span style={{ color:'#9cb5ae' }}>Any</span>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
          ))}
          <span style={{ marginLeft:'auto', fontSize:12, color:MUT }}>{allCount} drills for {PHASE_AGES[agePhase] ?? 'all ages'}</span>
        </div>

        {/* Row 4: Suggestion strip */}
        <div style={{ background:GD, borderRadius:10, padding:'10px 14px', display:'flex', alignItems:'center', gap:8, overflowX:'auto' }}>
          <span style={{ fontSize:12, color:'rgba(255,255,255,0.45)', fontWeight:600, whiteSpace:'nowrap', flexShrink:0 }}>From Saturday vs Ironbark</span>
          {FIX_ITEMS.map((f, i) => (
            <button key={i} onClick={() => setActiveSugg(i)} style={{ height: 44, padding:'0 12px', borderRadius:999, border:'none', background: activeSugg === i ? G2 : 'rgba(255,255,255,0.12)', color:'#fff', fontSize:12, fontWeight: activeSugg === i ? 700 : 500, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap', flexShrink:0 }}>
              {f.label}
            </button>
          ))}
          <button style={{ marginLeft:'auto', height: 44, padding:'0 12px', borderRadius:999, border:'1px solid rgba(255,255,255,0.25)', background:'transparent', color:'rgba(255,255,255,0.7)', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap', flexShrink:0, display:'flex', alignItems:'center', gap:4 }}>
            All suggestions
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        {/* Row 5: Suggested section */}
        {featured.length > 0 && (
          <div style={{ border:`2px solid ${G}`, borderRadius:12, padding:'14px 16px', display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:G, marginBottom:3 }}>Suggested · {activeFix.stat}</div>
                <div style={{ fontSize:12, color:MUT, lineHeight:1.5, maxWidth:520 }}>Most were short passes under pressure from their front three. Keep-ball games build calm first touches and scanning.</div>
              </div>
              <button style={{ height: 44, padding:'0 13px', borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap', flexShrink:0, marginLeft:16 }}>Watch 6 clips</button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
              {featured.map(d => <SuggestedCard key={d.id} drill={d} onClick={() => onDrillClick(d)}/>)}
            </div>
          </div>
        )}

        {/* Row 6: Section header */}
        <div style={{ fontSize:14, fontWeight:700, color:INK, marginTop:4 }}>
          {filterTab === 1 ? 'Our drills' : filterTab === 2 ? 'Saved drills' : `All drills for ${PHASE_AGES[agePhase] ?? 'all ages'}`}
        </div>

        {/* Row 7: 3-column compact drill list */}
        {mainDrills.length > 0 ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
            {mainDrills.map(d => <DrillRow key={d.id} drill={d} onClick={() => onDrillClick(d)}/>)}
          </div>
        ) : (
          <div style={{ padding:'24px 0', fontSize:14, color:MUT, textAlign:'center' }}>No drills in this filter</div>
        )}
      </div>
    </div>
  )
}
