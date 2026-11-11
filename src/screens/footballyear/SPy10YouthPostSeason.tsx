import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
const CHECKLIST=[
  {label:'End-of-season summary to each player',note:'14 of 14 sent',done:true},
  {label:'Chat with each player',note:'6 of 14 done',done:false,action:'See'},
  {label:'Are you coming back?',note:'9 yes · 3 not sure · 2 no',done:false,action:'See'},
  {label:'Moving up to seniors',note:'Cal and Ryan — Marko has been told',done:false,action:'See'},
  {label:'Kit back',note:'3 vests still out',done:false,action:'See'},
]
export default function SPy10YouthPostSeason({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  const done=CHECKLIST.filter(c=>c.done).length
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>Head coach · U16 Ollie</div>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Post-season wrap-up</div>
          <div style={{fontSize:14,color:MUT}}>Tue 7 October · post-season · rest month starts 1 December</div>
        </div>
        <button onClick={onBack} style={{height: 44,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:INK,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>The football year</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,overflow:'hidden',marginBottom:16}}>
            <div style={{padding:'12px 16px',background:G,display:'flex',alignItems:'center',gap:12}}>
              <span style={{fontSize:15,fontWeight:700,color:'#fff'}}>Wrapping up</span>
              <span style={{fontSize:13,color:'rgba(255,255,255,0.7)'}}>{done} of {CHECKLIST.length} done</span>
            </div>
            {CHECKLIST.map(item=>(
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
            <div style={{fontSize:15,fontWeight:700,color:INK,marginBottom:6}}>Training now</div>
            <div style={{fontSize:13,color:MUT}}>One optional session per week. No tests, no grading. Just keep moving.</div>
          </div>
        </div>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:12}}>What's next</div>
            <div style={{display:'flex',gap:12,padding:'10px 0',borderTop:`1px solid ${LN}`}}>
              <div style={{width:36,textAlign:'center' as const,flex:'none'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT}}>DEC</div>
                <div style={{fontSize:22,fontWeight:800,color:GD,lineHeight:1}}>1</div>
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:INK,marginBottom:2}}>Rest month starts</div>
                <div style={{fontSize:12,color:MUT}}>Players set their own break</div>
              </div>
            </div>
            <div style={{display:'flex',gap:12,padding:'10px 0',borderTop:`1px solid ${LN}`}}>
              <div style={{width:36,textAlign:'center' as const,flex:'none'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT}}>JAN</div>
                <div style={{fontSize:22,fontWeight:800,color:GD,lineHeight:1}}>11</div>
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:INK,marginBottom:2}}>Back Monday</div>
                <div style={{fontSize:12,color:MUT}}>Pre-season for next year begins</div>
              </div>
            </div>
          </div>
          <div style={{background:PALE,border:`1px solid #c0d8cc`,borderRadius:12,padding:'12px 16px'}}>
            <div style={{fontSize:13,fontWeight:700,color:GD,marginBottom:4}}>At this age</div>
            <div style={{fontSize:13,color:G,lineHeight:1.5}}>Players 15 and over choose when they take their break. You see the break tracker, not the reason.</div>
          </div>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
