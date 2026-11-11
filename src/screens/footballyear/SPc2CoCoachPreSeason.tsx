import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
const CHECKLIST=[
  {owner:'Sam',label:'Set how we play',note:'Done 2 March',done:true,you:false},
  {owner:'Sam',label:'Confirm the squad',note:'Sam decides · Jess adds notes',done:false,action:'Add a note',you:true},
  {owner:'Both',label:'Consent',note:'12 of 17 families answered',done:false,action:'See',you:false},
  {owner:'Jess',label:'Baseline tests',note:'2 of 4 done · Jess running last 2',done:false,action:'See results',you:true},
  {owner:'Both',label:'Each player picks a goal',note:'Sam confirms · Jess can suggest',done:false,action:'See',you:false},
  {owner:'Jess',label:'Friendly on 14 March',note:'Jess leading · 10:00 am · away',done:false,action:'See lineup',you:true},
  {owner:'Sam',label:'Scores for grading',note:'Sam scores · asks Jess\'s view on 4',done:false,action:'Give view',you:true},
]
export default function SPc2CoCoachPreSeason({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>Co-coach · U12 Sam with Jess</div>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Pre-season, Jess</div>
          <div style={{fontSize:14,color:MUT}}>Thu 12 March · pre-season · 4 weeks to round 1</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={onBack} style={{height:36,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:INK,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>The football year</button>
          <button onClick={()=>t('Opening tonight\'s session')} style={{height:36,padding:'0 14px',borderRadius:10,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Tonight's session</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,overflow:'hidden',marginBottom:16}}>
            <div style={{padding:'12px 16px',background:G,display:'flex',alignItems:'center',gap:12}}>
              <span style={{fontSize:15,fontWeight:700,color:'#fff'}}>Ready for round 1</span>
              <span style={{fontSize:13,color:'rgba(255,255,255,0.7)'}}>Yours highlighted</span>
            </div>
            {CHECKLIST.map(item=>(
              <div key={item.label} style={{display:'grid',gridTemplateColumns:'28px minmax(0,1fr) auto',gap:12,padding:'12px 16px',alignItems:'center',borderTop:`1px solid ${LN}`,background:item.you?PALE:'#fff'}}>
                <div style={{width:24,height:24,borderRadius:'50%',background:item.done?G:'#f0f1ef',border:item.done?'none':`1.5px solid ${LN}`,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
                  {item.done&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
                    <span style={{fontSize:14,fontWeight:item.done?400:600,color:item.done?MUT:INK,textDecoration:item.done?'line-through':'none'}}>{item.label}</span>
                    <span style={{fontSize:11,fontWeight:700,color:item.owner==='Jess'?GD:MUT,background:item.owner==='Jess'?PALE:'#f0f1ef',padding:'1px 6px',borderRadius:4}}>{item.owner}</span>
                  </div>
                  <div style={{fontSize:12,color:MUT}}>{item.note}</div>
                </div>
                {'action' in item&&item.action&&<button onClick={()=>t(`${item.action} tapped`)} style={{height:32,padding:'0 12px',borderRadius:8,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:12,fontWeight:600,cursor:'pointer',flexShrink:0}}>{item.action}</button>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:8}}>What's yours</div>
            {['Training sessions','Lineup on match day','Warm-ups','Messages to families'].map(item=>(
              <div key={item} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0',borderTop:`1px solid ${LN}`}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{fontSize:14,color:INK}}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px'}}>
            <div style={{fontSize:13,fontWeight:700,color:INK,marginBottom:6}}>Hand-over from Sam</div>
            <div style={{fontSize:13,color:MUT,lineHeight:1.5}}>"Jess, please run last two baseline tests Tuesday and push results to me. I'll review before Friday."</div>
          </div>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
