import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
const CHECKLIST=[
  {label:'Share the team link',note:'11 of 12 families have opened it',done:false,action:'Remind 1'},
  {label:'Consent',note:'9 of 12 families answered',done:false,action:'See'},
  {label:'Come-and-try day',note:'Sun 12 April · 11 families confirmed',done:true},
  {label:'Pick training night',note:'Wed suits 10 of 12',done:true},
  {label:'Helper each week',note:'8 of 10 spots filled · 2 Saturdays left',done:false,action:'See'},
  {label:'Shirt sizes',note:'10 of 12 answered',done:false,action:'See'},
]
export default function SPm2MiniRoosPreSeason({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  const done=CHECKLIST.filter(c=>c.done).length
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>MiniRoos coach · U9 Tom</div>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Getting ready, Tom</div>
          <div style={{fontSize:14,color:MUT}}>Sat 4 April · pre-season · first game in 3 weeks</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={onBack} style={{height:36,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:INK,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>The football year</button>
          <button onClick={()=>t('Opening this Saturday')} style={{height:36,padding:'0 14px',borderRadius:10,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>This Saturday</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,overflow:'hidden',marginBottom:16}}>
            <div style={{padding:'12px 16px',background:G,display:'flex',alignItems:'center',gap:12}}>
              <span style={{fontSize:15,fontWeight:700,color:'#fff'}}>Before first Saturday</span>
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
                {'action' in item&&item.action&&<button onClick={()=>t(`${item.action} tapped`)} style={{height:32,padding:'0 12px',borderRadius:8,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:12,fontWeight:600,cursor:'pointer',flexShrink:0}}>{item.action}</button>}
              </div>
            ))}
          </div>
          <div style={{background:PALE,border:`1px solid #c0d8cc`,borderRadius:12,padding:'12px 16px'}}>
            <div style={{fontSize:13,fontWeight:700,color:GD,marginBottom:4}}>MiniRoos</div>
            <div style={{fontSize:13,color:G,lineHeight:1.5}}>No trials, no grading, no tests. First 4 games are ready. Parents handle everything through the team link.</div>
          </div>
        </div>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'14px 16px'}}>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:12}}>Coming up</div>
            {[
              {day:'SUN',date:'12',label:'Come-and-try day',sub:'11:00 · Wattle Creek Reserve'},
              {day:'WED',date:'15',label:'First training session',sub:'4:30 pm · 12 families notified'},
              {day:'SAT',date:'25',label:'First game of the year',sub:'10:00 am · away'},
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
