import { G, G2, INK, MUT, LN } from './data'

const WEEK_BLOCKS = [
  { wk:'Weeks 9–10 · 1 to 14 Jun', skill:'First touch', theme:'Attacking: keep the ball', isNow:true },
  { wk:'Weeks 11–12 · 15 to 28 Jun', skill:'Striking the ball', theme:'Attacking: create and score', isNow:false },
  { wk:'Weeks 13–14 · 29 Jun to 12 Jul', skill:'1 v 1', theme:'Defending: win it back', isNow:false },
  { wk:'Weeks 15–16 · 13 to 26 Jul', skill:'Running with the ball', theme:'Attacking: when we win it', isNow:false },
  { wk:'Weeks 17–18 · 27 Jul to 9 Aug', skill:'Review', theme:'All four skills, led by the data', isNow:false },
]

const TUE_SESSION = [
  { slot:'Warm-up',         drill:'FIFA 11+ Kids warm-up',     min:20 },
  { slot:'Recognition game',drill:'Recognition game: 4 v 4 + 2', min:10 },
  { slot:'Skill breakdown', drill:'First touch away from pressure', min:10 },
  { slot:'Mini-games',      drill:'4 v 4 + 3 keep-ball',       min:15 },
  { slot:'Free game',       drill:'Free game 9 v 9',            min:20 },
]

const THU_SESSION = [
  { slot:'Warm-up',    drill:'Rondo, 5 v 2',                min:10 },
  { slot:'Mini-games', drill:'Win it back in 6 seconds',    min:25 },
  { slot:'Free game',  drill:'Small game, tight shape',     min:30 },
  { slot:'Warm-down',  drill:'Cool-down and stretch',       min:10 },
]

export default function TermPlanner({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'16px 28px 12px', flexShrink:0 }}>
        <button onClick={onBack} style={{ display:'flex', alignItems:'center', gap:4, border:0, background:'none', cursor:'pointer', color:MUT, fontFamily:'inherit', fontSize:13, marginBottom:12, padding:0 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Drill library
        </button>
        <div style={{ display:'flex', alignItems:'baseline', gap:16 }}>
          <div style={{ fontSize:28, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>Term planner</div>
          <div style={{ fontSize:14, color:MUT }}>U12 Sam · Skill Acquisition Phase · weeks 9 to 18</div>
          <div style={{ marginLeft:'auto', fontSize:12, fontWeight:600, color:MUT }}>Two weeks per core skill</div>
        </div>
      </div>

      {/* Week blocks */}
      <div style={{ padding:'0 28px 12px', flexShrink:0, borderBottom:`1px solid ${LN}` }}>
        <div style={{ display:'flex', gap:8 }}>
          {WEEK_BLOCKS.map((wb, i) => (
            <div key={i} style={{ flex:1, padding:'12px 14px', borderRadius:10, border:`1.5px solid ${wb.isNow?G2:LN}`, background:wb.isNow?'#f0f8f4':'#fff' }}>
              <div style={{ fontSize:11, fontWeight:600, color:wb.isNow?G2:MUT, marginBottom:4 }}>{wb.wk}</div>
              <div style={{ display:'inline-block', background:G, color:'#fff', fontSize:12, fontWeight:700, borderRadius:6, padding:'2px 8px', marginBottom:4 }}>{wb.skill}</div>
              <div style={{ fontSize:11, color:MUT }}>{wb.theme}</div>
              {wb.isNow && <div style={{ marginTop:6, display:'inline-block', background:G2, color:'#fff', fontSize:10, fontWeight:700, borderRadius:999, padding:'2px 8px' }}>This week</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex:1, overflowY:'auto', padding:'20px 28px 32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 300px', gap:20 }}>
          {/* Tuesday column */}
          <div>
            <div style={{ fontSize:16, fontWeight:700, color:INK, marginBottom:4 }}>Tue 2 Jun</div>
            <span style={{ fontSize:11, fontWeight:700, color:'#40826d', background:'#e4f2eb', borderRadius:999, padding:'2px 8px', display:'inline-block', marginBottom:16 }}>Done</span>
            {TUE_SESSION.map((s, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'10px 0', borderTop:i>0?`1px solid ${LN}`:'none' }}>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, color:MUT, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{s.slot}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:INK }}>{s.drill}</div>
                </div>
                <div style={{ fontSize:12, color:MUT, flexShrink:0, marginLeft:8 }}>{s.min} min</div>
              </div>
            ))}
          </div>

          {/* Thursday column */}
          <div>
            <div style={{ fontSize:16, fontWeight:700, color:INK, marginBottom:4 }}>Thu 4 Jun</div>
            <span style={{ fontSize:11, fontWeight:700, color:G2, background:'#e4f2eb', borderRadius:999, padding:'2px 8px', display:'inline-block', marginBottom:16 }}>Tonight</span>
            {THU_SESSION.map((s, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'10px 0', borderTop:i>0?`1px solid ${LN}`:'none' }}>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, color:MUT, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{s.slot}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:INK }}>{s.drill}</div>
                </div>
                <div style={{ fontSize:12, color:MUT, flexShrink:0, marginLeft:8 }}>{s.min} min</div>
              </div>
            ))}
          </div>

          {/* Right explanation panel */}
          <div>
            <div style={{ background:'#f7faf8', borderRadius:12, padding:'16px', border:`1px solid ${LN}`, marginBottom:12 }}>
              <div style={{ fontSize:14, fontWeight:700, color:INK, marginBottom:12 }}>How Clean Sheet fits in</div>
              <div style={{ fontSize:13, color:MUT, lineHeight:1.7, marginBottom:12 }}>The core skill stays for the whole block. When Saturday's game shows a problem, the moment changes, not the skill.</div>
              <div style={{ background:'#fff', borderRadius:8, padding:12, border:`1px solid ${LN}`, fontSize:13, color:INK, lineHeight:1.6, marginBottom:12 }}>
                Saturday we gave the ball away 21 times in our half, so this block's games reward a first touch away from pressure.
              </div>
              <div style={{ fontSize:13, color:MUT, lineHeight:1.6 }}>FIFA 11+ Kids warm-up planned at least once every week, as its trial did.</div>
            </div>
            <div style={{ fontSize:12, color:MUT, lineHeight:1.7 }}>Two-week blocks per core skill follow the curriculum's term planner for the Skill Acquisition Phase.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
