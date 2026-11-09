import type { Drill } from './data'
import { G, G2, INK, MUT, LN, DRILLS, FIX_ITEMS, PHASE_LABEL_TO_ID } from './data'
import PitchDiagram from './PitchDiagram'

const AGE_PHASES = ['Discovery 5–9','Skill Acquisition 9–12','Game Training 12–16','Performance 16+','All']
const CHIP_FILTERS = ['Everything','Warm-up','First touch','Striking the ball','Running with the ball','1 v 1','Team movements','Games','Set pieces']

const TAG_COLORS: Record<string,string> = {
  'Curriculum':       G2,
  'Research-backed':  '#c3a84a',
  'Tested in trials': G2,
}

function DrillCard({ drill, onClick }: { drill: Drill; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ textAlign:'left', padding:0, border:`1px solid ${LN}`, borderRadius:10, background:'#fff', cursor:'pointer', overflow:'hidden', fontFamily:'inherit', display:'flex', flexDirection:'column' }}>
      <PitchDiagram id={drill.id} w={150} h={90}/>
      <div style={{ padding:'10px 12px', flex:1 }}>
        <div style={{ fontSize:13, fontWeight:700, color:INK, marginBottom:4, lineHeight:1.3 }}>{drill.name}</div>
        <div style={{ fontSize:11, color:MUT, marginBottom:6 }}>{drill.category} · {drill.time} min</div>
        <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
          {drill.tags?.map(tag => (
            <span key={tag} style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, fontWeight:600, color:TAG_COLORS[tag]??G2, whiteSpace:'nowrap' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:TAG_COLORS[tag]??G2, flexShrink:0 }}/>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

function FeaturedCard({ drill, onClick }: { drill: Drill; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ flex:1, textAlign:'left', padding:0, border:`1px solid ${LN}`, borderRadius:10, background:'#fff', cursor:'pointer', overflow:'hidden', fontFamily:'inherit' }}>
      <PitchDiagram id={drill.id} w={180} h={110}/>
      <div style={{ padding:'10px 14px' }}>
        <div style={{ fontSize:13, fontWeight:700, color:INK, marginBottom:3 }}>{drill.name}</div>
        <div style={{ fontSize:12, color:MUT, marginBottom:4 }}>{drill.time} min · {drill.players}{drill.area?` · ${drill.area}`:''}</div>
        {drill.whySuggested && <div style={{ fontSize:11, color:MUT, lineHeight:1.4 }}><span style={{ fontWeight:600 }}>Checks: </span>{drill.whySuggested.substring(0,55)}{drill.whySuggested.length>55?'…':''}</div>}
      </div>
    </button>
  )
}

interface Props {
  filterTab: number
  setFilterTab: (n: number) => void
  agePhase: string
  setAgePhase: (s: string) => void
  chipFilter: string
  setChipFilter: (s: string) => void
  onDrillClick: (d: Drill) => void
  onSessionPlans: () => void
  onTermPlanner: () => void
  onAddDrill: () => void
}

export default function DrillLibraryMain({ filterTab, setFilterTab, agePhase, setAgePhase, chipFilter, setChipFilter, onDrillClick, onSessionPlans, onTermPlanner, onAddDrill }: Props) {
  const phaseId = PHASE_LABEL_TO_ID[agePhase]
  const featured = DRILLS.filter(d => d.featured && (phaseId === null || d.phases.includes(phaseId)))
  const filtered = DRILLS.filter(d =>
    (phaseId === null || d.phases.includes(phaseId)) &&
    (filterTab===0 ? true : filterTab===1 ? d.isOurs : false) &&
    (chipFilter==='Everything' ? true : d.category===chipFilter)
  )
  const ourCount = DRILLS.filter(d => d.isOurs && (phaseId === null || d.phases.includes(phaseId))).length

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'20px 28px 0', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
        <div>
          <div style={{ fontSize:24, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>Drill library</div>
          <div style={{ fontSize:13, color:MUT, marginTop:2 }}>{filtered.length} drills{ourCount > 0 ? ` · ${ourCount} of ours` : ''}</div>
        </div>
        <div style={{ flexGrow:1 }}/>
        <button onClick={onSessionPlans} style={{ height:36, padding:'0 14px', borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Session plans</button>
        <button onClick={onTermPlanner} style={{ height:36, padding:'0 14px', borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Term planner</button>
        <div style={{ position:'relative' }}>
          <svg style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><circle cx={11} cy={11} r={8}/><path d="M21 21l-4.3-4.3"/></svg>
          <input placeholder="Search drills" style={{ height:36, paddingLeft:32, paddingRight:14, borderRadius:999, border:`1px solid ${LN}`, fontSize:13, fontFamily:'inherit', outline:'none', width:180, color:INK }}/>
        </div>
        <button onClick={onAddDrill} style={{ height:36, padding:'0 16px', borderRadius:999, border:'none', background:G, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:8 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Add a drill
        </button>
      </div>

      <div style={{ flex:1, display:'flex', gap:0, overflow:'hidden', padding:'16px 28px 24px' }}>
        {/* Left: Suggested panel */}
        <div style={{ width:180, flexShrink:0, marginRight:20 }}>
          <div style={{ background:G, borderRadius:12, padding:16, color:'#fff' }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', opacity:.7, marginBottom:6 }}>Suggested for you</div>
            <div style={{ fontSize:14, fontWeight:700, lineHeight:1.4, marginBottom:16 }}>What to fix from Saturday vs Ironbark United</div>
            {FIX_ITEMS.map((f, i) => (
              <div key={i} style={{ marginBottom:i<2?14:0 }}>
                <div style={{ fontSize:12, fontWeight:600 }}>{f.label}</div>
                <div style={{ fontSize:11, opacity:.7, marginTop:2 }}>{f.stat}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Main content */}
        <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:16 }}>
          {/* Featured drills */}
          <div style={{ background:'#fff', borderRadius:12, border:`1px solid ${LN}`, padding:16 }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
              <p style={{ margin:0, fontSize:13, color:MUT, maxWidth:460, lineHeight:1.6 }}>
                Most were short passes under pressure from their front three. Keep-ball games build calm first touches and scanning.
              </p>
              <button style={{ fontSize:13, color:G2, fontWeight:600, border:'none', background:'none', cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap', flexShrink:0 }}>Watch 6 clips</button>
            </div>
            <div style={{ display:'flex', gap:12 }}>
              {featured.map(d => (
                <FeaturedCard key={d.id} drill={d} onClick={() => onDrillClick(d)}/>
              ))}
            </div>
          </div>

          {/* Age-phase filter */}
          <div style={{ display:'flex', gap:6 }}>
            {AGE_PHASES.map(ph => {
              const on = agePhase === ph
              return (
                <button key={ph} onClick={() => setAgePhase(ph)} style={{ height:32, padding:'0 14px', borderRadius:999, border:`1px solid ${on?G2:LN}`, background:on?G:'#fff', color:on?'#fff':MUT, fontSize:13, fontWeight:on?700:400, cursor:'pointer', fontFamily:'inherit' }}>
                  {ph}
                </button>
              )
            })}
          </div>

          {/* Sub-filter tabs */}
          <div style={{ display:'flex', borderBottom:`1px solid ${LN}` }}>
            {(['All drills','Our drills','Saved'] as const).map((label, i) => {
              const count = i===0
                ? DRILLS.filter(d => phaseId === null || d.phases.includes(phaseId)).length
                : i===1
                  ? ourCount
                  : 3
              return (
                <button key={i} onClick={() => setFilterTab(i)} style={{ height:38, padding:'0 16px', border:'none', background:'none', cursor:'pointer', fontFamily:'inherit', fontSize:14, fontWeight:filterTab===i?700:400, color:filterTab===i?INK:MUT, borderBottom:filterTab===i?`2px solid ${G2}`:'2px solid transparent', display:'flex', alignItems:'center', gap:6 }}>
                  {label} <span style={{ fontSize:12, color:MUT }}>{count}</span>
                </button>
              )
            })}
          </div>

          {/* Chip filter row */}
          <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
            {CHIP_FILTERS.map(c => {
              const on = chipFilter === c
              return (
                <button key={c} onClick={() => setChipFilter(c)} style={{ height:30, padding:'0 13px', borderRadius:999, border:`1px solid ${on?G2:LN}`, background:on?G:'#fff', color:on?'#fff':MUT, fontSize:13, fontWeight:on?600:400, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>
                  {c}
                </button>
              )
            })}
            <button style={{ height:30, padding:'0 13px', borderRadius:999, border:`1px solid ${LN}`, background:'#fff', color:MUT, fontSize:13, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:6, whiteSpace:'nowrap' }}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1={4} y1={6} x2={20} y2={6}/><line x1={8} y1={12} x2={16} y2={12}/><line x1={11} y1={18} x2={13} y2={18}/></svg>
              Filters
            </button>
          </div>

          {/* Drill grid — 5 columns */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12 }}>
            {filtered.map(d => (
              <DrillCard key={d.id} drill={d} onClick={() => onDrillClick(d)}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
