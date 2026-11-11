import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
const CHECKLIST=[
  {label:'Registration and clearances',note:'19 registered · 2 clearances pending',done:false,action:'Open'},
  {label:'Squad of 22',note:'19 signed · 3 on trial from the Reserves',done:false,action:'Open'},
  {label:'Consent',note:'17 of 19 · adults give their own',done:false,action:'Remind 2'},
  {label:'Fitness baseline',note:'12 of 19 tested · the rest on Tuesday',done:false,action:'Open'},
  {label:'Captain and leadership group',note:'Josh Bell, with three others',done:true},
  {label:'Set how we play',note:'Done 24 February',done:true},
  {label:'Friendlies',note:'3 booked · film all three',done:false,action:'Find one'},
]
export default function SPs2SeniorPreSeason({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  const done=CHECKLIST.filter(c=>c.done).length
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>Head coach</div>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Pre-season, Marko</div>
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
            {CHECKLIST.map((item)=>(
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
            <div style={{fontSize:13,color:MUT}}>Three sessions this week, about 80% of a mid-season week.</div>
            <div style={{fontSize:12,color:MUT,marginTop:4}}>4 players came back late from summer and do one round less.</div>
          </div>
          <div style={{background:PALE,border:`1px solid #c0d8cc`,borderRadius:12,padding:'12px 16px'}}>
            <div style={{fontSize:13,fontWeight:700,color:GD,marginBottom:4}}>Adults</div>
            <div style={{fontSize:13,color:G,lineHeight:1.5}}>No parent steps. Players see their own data and choose what you see beyond minutes and attendance.</div>
          </div>
        </div>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:12}}>Coming up</div>
            {[
              {day:'SAT',date:'14',label:'Friendly v Tealside Town',sub:'3:00 · home · pitch 1'},
              {day:'TUE',date:'17',label:'Two from U16 train with you',sub:'Cal West and Ryan Petersen'},
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
