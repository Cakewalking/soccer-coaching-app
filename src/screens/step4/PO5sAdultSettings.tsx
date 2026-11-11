import { useState } from 'react'
const G='#2f6252',INK='#10211f',MUT='#4a5a57',LN='#e8edeb'
export default function PO5sAdultSettings({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  const PERMISSIONS=[
    {label:'Minutes and attendance',note:'Always on — required for fair minutes',locked:true,on:true},
    {label:'Load and fitness tests',note:'Marko sees test scores and load data',locked:false,on:true},
    {label:'Wellness check-ins',note:'What you log each day',locked:false,on:false},
    {label:'Filmed in games',note:'Marko can include you in clips',locked:false,on:true},
    {label:'Reminders and messages',note:'For training, games and updates',locked:false,on:true},
  ]
  const [perms,setPerms]=useState(PERMISSIONS.map(p=>p.on))
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,padding:0,marginBottom:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Josh Bell
          </button>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Settings</div>
          <div style={{fontSize:14,color:MUT}}>Men's 1sts · what Marko can see</div>
        </div>
      </div>
      <div style={{maxWidth:580}}>
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,overflow:'hidden',marginBottom:24}}>
          {PERMISSIONS.map((p,i)=>(
            <div key={p.label} style={{display:'flex',alignItems:'center',gap:16,padding:'14px 16px',borderTop:i>0?`1px solid ${LN}`:'none'}}>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:INK}}>{p.label}</div>
                <div style={{fontSize:12,color:MUT}}>{p.note}</div>
              </div>
              <button
                onClick={()=>{if(!p.locked){const n=[...perms];n[i]=!n[i];setPerms(n)}}}
                style={{width:44,height:24,borderRadius:12,border:'none',background:perms[i]?G:'#d0d4d2',cursor:p.locked?'default':'pointer',position:'relative',transition:'background 0.2s',flex:'none',opacity:p.locked?0.6:1}}
              >
                <div style={{position:'absolute',top:3,left:perms[i]?22:3,width:18,height:18,borderRadius:'50%',background:'#fff',transition:'left 0.2s'}}/>
              </button>
            </div>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column' as const,gap:8}}>
          <button onClick={()=>t('Opening data download')} style={{height:44,borderRadius:12,border:`1px solid ${LN}`,background:'#fff',color:INK,fontFamily:'inherit',fontSize:14,fontWeight:600,cursor:'pointer'}}>Get a copy of my data</button>
          <button onClick={()=>t('Opening leave squad')} style={{height:44,borderRadius:12,border:`1px solid ${LN}`,background:'#fff',color:'#c0392b',fontFamily:'inherit',fontSize:14,fontWeight:600,cursor:'pointer'}}>Leave the squad</button>
          <button onClick={()=>t('Signing out')} style={{height:44,borderRadius:12,border:`1px solid ${LN}`,background:'#fff',color:MUT,fontFamily:'inherit',fontSize:14,fontWeight:400,cursor:'pointer'}}>Sign out</button>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
