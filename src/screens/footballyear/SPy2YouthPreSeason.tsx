import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
const CHECKLIST=[
  {label:'Set how we play',note:'Done 2 March · play out, press on a trigger',done:true},
  {label:'Confirm the squad',note:'13 confirmed · 3 trialling',done:false,action:'Open'},
  {label:'Players\' own accounts',note:'11 of 14 have signed in themselves · a parent is copied in',done:false,action:'Remind 3'},
  {label:'Baseline tests',note:'3 of 4 done · repeat sprints on Monday',done:false,action:'Open'},
  {label:'Each player picks a goal',note:'9 of 14 picked · they choose, you agree it',done:false,action:'See'},
  {label:'Heading policy',note:'Read and agreed by you and Matt',done:true},
  {label:'Score players for grading',note:'The club asks the league for a division on 13 March',done:false,action:'Open'},
]
export default function SPy2YouthPreSeason({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  const done=CHECKLIST.filter(c=>c.done).length
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>Head coach</div>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Pre-season, Ollie</div>
          <div style={{fontSize:14,color:MUT}}>Thu 12 March · pre-season · 4 weeks to round 1</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={onBack} style={{height: 44,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:INK,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>The football year</button>
          <button onClick={()=>t('Opening tonight\'s session')} style={{height: 44,padding:'0 14px',borderRadius:10,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Tonight's session</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,overflow:'hidden',marginBottom:16}}>
            <div style={{padding:'12px 16px',background:G,display:'flex',alignItems:'center',gap:12}}>
              <span style={{fontSize:15,fontWeight:700,color:'#fff'}}>Ready for round 1</span>
              <span style={{fontSize:13,color:'rgba(255,255,255,0.7)'}}>{done} of {CHECKLIST.length} done</span>
              <div style={{flex:1}}/>
              <div style={{height:6,width:120,borderRadius:3,background:'rgba(255,255,255,0.3)',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${(done/CHECKLIST.length)*100}%`,background:'#fff',borderRadius:3}}/>
              </div>
            </div>
            {CHECKLIST.map((item,_i)=>(
              <div key={item.label} style={{display:'grid',gridTemplateColumns:'28px minmax(0,1fr) auto',gap:12,padding:'12px 16px',alignItems:'center',borderTop:`1px solid ${LN}`}}>
                <div style={{width:24,height:24,borderRadius:'50%',background:item.done?G:'#f0f1ef',border:item.done?'none':`1.5px solid ${LN}`,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
                  {item.done&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:item.done?400:600,color:item.done?MUT:INK,textDecoration:item.done?'line-through':'none'}}>{item.label}</div>
                  <div style={{fontSize:12,color:MUT}}>{item.note}</div>
                </div>
                {'action' in item&&item.action&&<button onClick={()=>t(`${item.action} tapped`)} style={{height: 44,padding:'0 12px',borderRadius:8,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:12,fontWeight:600,cursor:'pointer',flexShrink:0}}>{item.action}</button>}
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
              <div style={{fontSize:15,fontWeight:700,color:INK}}>Building up · week 6 of 10</div>
              <button onClick={()=>t('Opening load plan')} style={{height: 44,padding:'0 12px',borderRadius:8,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:12,fontWeight:600,cursor:'pointer'}}>See the plan</button>
            </div>
            <div style={{fontSize:13,color:MUT}}>Two sessions and a friendly this week, about 75% of a mid-season week.</div>
            <div style={{fontSize:12,color:MUT,marginTop:4}}>Theo and Ryan are in a growth spurt and do one sprint round less. Priya set this.</div>
          </div>
          <div style={{background:PALE,border:`1px solid #c0d8cc`,borderRadius:12,padding:'12px 16px'}}>
            <div style={{fontSize:13,fontWeight:700,color:GD,marginBottom:4}}>At this age</div>
            <div style={{fontSize:13,color:G,lineHeight:1.5}}>Players 15 and over answer for themselves: availability, consent and goals. A parent is copied in until they turn 18.</div>
          </div>
        </div>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:12}}>Coming up</div>
            {[
              {day:'SAT',date:'14',label:'Friendly at Harbour Rovers',sub:"3:30 · doesn't count towards season numbers"},
              {day:'SUN',date:'22',label:'Trial morning for 3 players',sub:'11:00 at Wattle Creek Reserve'},
            ].map(ev=>(
              <div key={ev.label} style={{display:'flex',gap:12,padding:'10px 0',borderTop:`1px solid ${LN}`}}>
                <div style={{width:36,textAlign:'center' as const,flex:'none'}}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT}}>{ev.day}</div>
                  <div style={{fontSize:22,fontWeight:800,color:GD,lineHeight:1}}>{ev.date}</div>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:INK,marginBottom:2}}>{ev.label}</div>
                  <div style={{fontSize:12,color:MUT}}>{ev.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
