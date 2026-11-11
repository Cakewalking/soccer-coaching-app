import { useState } from 'react'
import type { Drill } from './data'
import { G, G2, GD, INK, MUT, LN } from './data'
import PitchDiagram from './PitchDiagram'

function Tag({ label }: { label: string }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, height:22, padding:'0 9px', borderRadius:999, background:'#eef5f2', color:G, fontSize:11, fontWeight:700, whiteSpace:'nowrap' }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:G2, flexShrink:0 }}/>
      {label}
    </span>
  )
}

function MetaBox({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background:'#f7faf8', borderRadius:8, padding:'10px 12px' }}>
      <div style={{ fontSize:10, color:MUT, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:13, fontWeight:600, color:INK }}>{value}</div>
    </div>
  )
}

function AddToSessionModal({ drill, onClose }: { drill: Drill; onClose: () => void }) {
  const [slot, setSlot] = useState(0)
  const options = [
    { label: 'Swap for "Warm-up rondo, 5 v 2" (10 min)', time: '80 min' },
    { label: 'Swap for "Win it back in 6 seconds" (25 min)', time: '65 min' },
    { label: 'Swap for "Small game, tight shape" (30 min)', time: '60 min' },
    { label: 'Add it before the cool-down', time: '90 min' },
  ]
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.35)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
      <div style={{ background:'#fff', borderRadius:16, padding:28, width:500, boxShadow:'0 20px 60px rgba(0,0,0,.2)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <div style={{ fontSize:17, fontWeight:700, color:INK }}>Add to a session</div>
          <button onClick={onClose} style={{ width:28, height:28, border:`1px solid ${LN}`, borderRadius:999, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div style={{ fontSize:15, fontWeight:700, color:INK, marginBottom:14 }}>{drill.name} · {drill.time} min</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:20 }}>
          {[{ title:'Tonight · Thu 6:00 pm', sub:'4 drills · 75 min planned', sel:true }, { title:'Tue 9 Jun · 6:00 pm', sub:'Not planned yet', sel:false }].map((s,i) => (
            <div key={i} style={{ padding:14, borderRadius:10, border:`2px solid ${s.sel?G2:LN}`, background:s.sel?'#f0f8f4':'#fff' }}>
              <div style={{ fontSize:14, fontWeight:700, color:INK }}>{s.title}</div>
              <div style={{ fontSize:12, color:MUT, marginTop:3 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:14, fontWeight:600, color:INK, marginBottom:12 }}>Where should it go?</div>
        {options.map((o, i) => (
          <div key={i} onClick={() => setSlot(i)} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 0', borderBottom:i<3?`1px solid ${LN}`:'none', cursor:'pointer' }}>
            <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${slot===i?G2:LN}`, background:slot===i?G2:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {slot===i && <div style={{ width:6, height:6, borderRadius:'50%', background:'#fff' }}/>}
            </div>
            <div style={{ flex:1, fontSize:14, color:INK }}>{o.label}</div>
            <div style={{ fontSize:13, color:MUT, fontWeight:600 }}>{o.time}</div>
          </div>
        ))}
        <div style={{ marginTop:16, padding:12, background:'#f7faf8', borderRadius:8, marginBottom:8 }}>
          <div style={{ fontSize:12, color:MUT, marginBottom:8 }}>Tonight's plan with this drill <strong style={{ color:INK }}>80 min (was 75)</strong></div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {['4 v 4 + 3 keep-ball','Win it back in 6 seconds','Small game, tight shape','Cool-down and stretch'].map((s, i) => (
              <div key={i} style={{ padding:'4px 10px', background:i===0?G:LN, color:i===0?'#fff':MUT, borderRadius:6, fontSize:12, fontWeight:i===0?700:400 }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ fontSize:12, color:MUT, marginBottom:20 }}>Player load stays within plan. Fitness can see the change.</div>
        <div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={{ height: 44, padding:'0 20px', border:`1px solid ${LN}`, borderRadius:999, background:'#fff', color:INK, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
          <button style={{ height: 44, padding:'0 24px', border:'none', borderRadius:999, background:G, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Add to tonight</button>
        </div>
      </div>
    </div>
  )
}

export default function DrillDetail({ drill, onBack }: { drill: Drill; onBack: () => void }) {
  const [showSession, setShowSession] = useState(false)

  return (
    <div style={{ flex:1, overflowY:'auto', padding:'16px 28px 32px', position:'relative' }}>
      <button onClick={onBack} style={{ display:'flex', alignItems:'center', gap:6, border:'none', background:'none', cursor:'pointer', color:MUT, fontSize:13, fontFamily:'inherit', padding:'0 0 14px' }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Drill library
      </button>

      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
        <h1 style={{ margin:0, fontSize:26, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>{drill.name}</h1>
        <Tag label={drill.category}/>
        <div style={{ flexGrow:1 }}/>
        <button style={{ height: 44, padding:'0 16px', border:`1px solid ${LN}`, borderRadius:999, background:'#fff', color:INK, fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>Save</button>
        <button onClick={() => setShowSession(true)} style={{ height: 44, padding:'0 16px', border:'none', borderRadius:999, background:G, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:8 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Add to a session
        </button>
      </div>

      <div style={{ display:'flex', gap:32 }}>
        {/* Left column */}
        <div style={{ width:280, flexShrink:0 }}>
          <PitchDiagram id={drill.id} w={280} h={180}/>
          <div style={{ marginTop:10, display:'flex', gap:12, flexWrap:'wrap', fontSize:12, color:MUT }}>
            {[['g','Us'],['r','Them'],['p','Plays for both']].map(([t,label]) => (
              <span key={t} style={{ display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ width:9, height:9, borderRadius:'50%', background:t==='g'?G:t==='r'?'#c39797':'#888', display:'inline-block' }}/>
                {label}
              </span>
            ))}
            <span>— Pass</span>
            <span>··· Run</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:16 }}>
            <MetaBox label="Players" value={drill.players}/>
            <MetaBox label="Area"    value={drill.area || '—'}/>
            <MetaBox label="Time"    value={`${drill.time} min`}/>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:8 }}>
            <MetaBox label="Intensity"     value={drill.intensity || '—'}/>
            <MetaBox label="Work and rest" value={drill.workRest || '—'}/>
            <MetaBox label="Kit"           value={drill.kitStr || '—'}/>
          </div>
          <div style={{ marginTop:16, background:GD, borderRadius:10, padding:'12px 14px', display:'flex', gap:12, alignItems:'center' }}>
            <div style={{ width:36, height:36, borderRadius:999, background:'rgba(255,255,255,.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>Show the team before you start</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,.6)', marginTop:2 }}>Opens the diagram and a clip of us doing it well against Ironbark.</div>
            </div>
            <button style={{ height: 44, padding:'0 12px', border:'1px solid rgba(255,255,255,.3)', borderRadius:999, background:'transparent', color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', flexShrink:0 }}>Show</button>
          </div>
        </div>

        {/* Right column */}
        <div style={{ flex:1 }}>
          {drill.whySuggested && (
            <div style={{ background:'#f0f8f4', borderRadius:10, padding:16, marginBottom:16 }}>
              <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:G2, marginBottom:6 }}>Why it's suggested</div>
              <div style={{ fontSize:14, color:INK, lineHeight:1.6 }}>{drill.whySuggested}</div>
            </div>
          )}
          {drill.ages && (
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
              <span style={{ fontSize:12, fontWeight:600, color:MUT, padding:'4px 10px', borderRadius:6, border:`1px solid ${LN}`, background:'#f7faf8' }}>{drill.ages}</span>
              {drill.tags?.map(t => <span key={t} style={{ fontSize:12, fontWeight:600, color:MUT, padding:'4px 10px', borderRadius:6, border:`1px solid ${LN}`, background:'#f7faf8' }}>{t}</span>)}
              <span style={{ fontSize:12, fontWeight:600, color:MUT, padding:'4px 10px', borderRadius:6, border:`1px solid ${LN}`, background:'#f7faf8' }}>Session part: mini-game</span>
            </div>
          )}
          {drill.aim && (
            <div style={{ marginBottom:16 }}>
              <span style={{ fontSize:14, fontWeight:700, color:INK }}>Aim: </span>
              <span style={{ fontSize:14, color:INK }}>{drill.aim}</span>
            </div>
          )}
          {drill.howItWorks && (
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:15, fontWeight:700, color:INK, marginBottom:12 }}>How it works</div>
              {drill.howItWorks.map((step, i) => (
                <div key={i} style={{ display:'flex', gap:12, marginBottom:10 }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:G, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0, marginTop:1 }}>{i+1}</div>
                  <div style={{ fontSize:14, color:INK, lineHeight:1.6 }}>{step}</div>
                </div>
              ))}
            </div>
          )}
          {drill.coachingPoints && (
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:15, fontWeight:700, color:INK, marginBottom:12 }}>Coaching points</div>
              {drill.coachingPoints.map((p, i) => (
                <div key={i} style={{ display:'flex', gap:10, marginBottom:8, fontSize:14, color:INK }}>
                  <span style={{ color:G2, fontWeight:700 }}>•</span>{p}
                </div>
              ))}
            </div>
          )}
          {(drill.keyWords || drill.askPlayers) && (
            <div style={{ display:'flex', gap:32, marginBottom:18 }}>
              {drill.keyWords && (
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:INK, marginBottom:8 }}>Key words</div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {drill.keyWords.map(kw => (
                      <span key={kw} style={{ padding:'4px 12px', background:G, color:'#fff', borderRadius:999, fontSize:13, fontWeight:600 }}>{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              {drill.askPlayers && (
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:INK, marginBottom:8 }}>Ask the players</div>
                  <div style={{ fontSize:14, color:MUT, fontStyle:'italic' }}>{drill.askPlayers}</div>
                </div>
              )}
            </div>
          )}
          {(drill.makeEasier || drill.makeHarder) && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:16 }}>
              {[['Make it easier', drill.makeEasier], ['Make it harder', drill.makeHarder]].map(([k,v]) => v ? (
                <div key={k}>
                  <div style={{ fontSize:12, fontWeight:600, color:MUT, marginBottom:6 }}>{k}</div>
                  <div style={{ fontSize:13, color:INK }}>{v}</div>
                </div>
              ) : null)}
            </div>
          )}
          {drill.checksNote && <div style={{ borderTop:`1px solid ${LN}`, paddingTop:14, fontSize:13, color:MUT, lineHeight:1.6, marginBottom:8 }}>{drill.checksNote}</div>}
          {drill.basedOn && <div style={{ fontSize:12, color:MUT }}>{drill.basedOn}</div>}
        </div>
      </div>

      {showSession && <AddToSessionModal drill={drill} onClose={() => setShowSession(false)}/>}
    </div>
  )
}
