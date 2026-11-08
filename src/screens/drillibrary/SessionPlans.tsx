import { useState } from 'react'
import { G, G2, INK, MUT, LN } from './data'

const PHASES = [
  { id:'discovery',   label:'Discovery 5–9' },
  { id:'skill',       label:'Skill Acquisition 9–12' },
  { id:'game',        label:'Game Training 12–16' },
  { id:'performance', label:'Performance 16+' },
]

const BLOCKS = [
  { slot:'Warm-up',         min:10, color:'#2f6252', desc:'A fun, fast start with a ball. Twice a week, use the FIFA 11+ Kids warm-up instead.',       drills:['Ball mastery square','FIFA 11+ Kids warm-up'] },
  { slot:'Recognition game',min:10, color:'#40826d', desc:'A real game. Watch for today\'s skill, then add a scoring rule that rewards it.',          drills:['Recognition game: 4 v 4 + 2'] },
  { slot:'Skill breakdown', min:10, color:'#1f4a3e', desc:'Short teach: I do, we do, you do. Use the key words and ask questions.',                   drills:['First touch away from pressure','Through the gates'] },
  { slot:'Mini-games',      min:20, color:'#c3a84a', desc:'Small games where the skill wins points. Everyone plays, no queues.',                       drills:['Receive and turn, 3 v 1 lanes','1 v 1 to gates'] },
  { slot:'Free game',       min:20, color:'#c39797', desc:'Normal rules, no stopping. The skill show up? Set a home skill to finish.',                  drills:['Free game 9 v 9'] },
]

export default function SessionPlans({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState('skill')

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'16px 28px 12px', flexShrink:0 }}>
        <button onClick={onBack} style={{ display:'flex', alignItems:'center', gap:4, border:0, background:'none', cursor:'pointer', color:MUT, fontFamily:'inherit', fontSize:13, marginBottom:12, padding:0 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Drill library
        </button>
        <div style={{ display:'flex', alignItems:'baseline', gap:16, marginBottom:4 }}>
          <div style={{ fontSize:28, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>Session plans</div>
          <div style={{ fontSize:14, color:MUT }}>The shape of a session for each phase of the national curriculum</div>
        </div>
      </div>

      {/* Phase tabs */}
      <div style={{ display:'flex', gap:8, padding:'0 28px 12px', flexShrink:0, borderBottom:`1px solid ${LN}` }}>
        {PHASES.map(p => (
          <button key={p.id} onClick={() => setPhase(p.id)} style={{ height:36, padding:'0 16px', borderRadius:999, border:`1.5px solid ${phase===p.id?G2:LN}`, background:phase===p.id?'#fff':LN+22, color:phase===p.id?G2:MUT, fontFamily:'inherit', fontSize:13, fontWeight:phase===p.id?700:500, cursor:'pointer' }}>{p.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:'auto', padding:'20px 28px 32px' }}>
        {/* Phase header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <div>
            <div style={{ fontSize:20, fontWeight:700, color:INK }}>Skill Acquisition: game, teach, game</div>
            <div style={{ fontSize:13, color:MUT, marginTop:2 }}>70 minutes · 9 to 12, one core skill per session</div>
          </div>
          <span style={{ background:G2, color:'#fff', fontSize:12, fontWeight:700, borderRadius:999, padding:'4px 12px' }}>U12 Sam's phase</span>
        </div>

        {/* Timeline blocks */}
        <div style={{ display:'flex', gap:0, marginBottom:24, borderRadius:10, overflow:'hidden', border:`1px solid ${LN}` }}>
          {BLOCKS.map((b, i) => (
            <div key={i} style={{ flex:1, padding:'10px 12px', background:b.color, borderRight:i<4?'1px solid rgba(255,255,255,.15)':undefined }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>{b.slot}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.7)', marginTop:2 }}>{b.min} min</div>
            </div>
          ))}
        </div>

        {/* Detail columns */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:16, marginBottom:24 }}>
          {BLOCKS.map((b, i) => (
            <div key={i}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:b.color, flexShrink:0 }}/>
                <span style={{ fontSize:13, fontWeight:700, color:INK }}>{b.slot}</span>
              </div>
              <div style={{ fontSize:12, color:MUT, lineHeight:1.6, marginBottom:12 }}>{b.desc}</div>
              <div style={{ fontSize:11, fontWeight:700, color:MUT, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>From the library</div>
              {b.drills.map(d => (
                <div key={d} style={{ fontSize:12, color:G2, fontWeight:600, marginBottom:4 }}>{d}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer bar */}
        <div style={{ background:'#f7faf8', borderRadius:10, padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', border:`1px solid ${LN}` }}>
          <div style={{ fontSize:13, color:MUT, maxWidth:580, lineHeight:1.6 }}>
            Follows the curriculum's game, teach, game structure for the Skill Acquisition Phase: one core skill and one main moment per session, planned in two-week blocks.
          </div>
          <button style={{ flexShrink:0, height:40, padding:'0 20px', border:'none', borderRadius:999, background:G, color:'#fff', fontFamily:'inherit', fontSize:14, fontWeight:600, cursor:'pointer', marginLeft:20 }}>Use for Tuesday</button>
        </div>
      </div>
    </div>
  )
}
