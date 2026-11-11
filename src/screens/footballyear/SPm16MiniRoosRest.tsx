import { useState } from 'react'
const G='#2f6252',INK='#10211f',MUT='#4a5a57',LN='#e8edeb'
export default function SPm16MiniRoosRest({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>MiniRoos coach · U9 Tom</div>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Nothing to do until March</div>
          <div style={{fontSize:14,color:MUT}}>Mon 1 December · rest · pre-season starts March</div>
        </div>
        <button onClick={onBack} style={{height: 44,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:INK,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>The football year</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'28px 24px',textAlign:'center' as const,marginBottom:16}}>
            <div style={{fontSize:18,fontWeight:700,color:INK,marginBottom:8}}>Nothing needs you</div>
            <div style={{fontSize:14,color:MUT,lineHeight:1.6}}>Families don't get messages in December and January. See you in March.</div>
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px'}}>
            <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:8}}>One thing to do</div>
            <div style={{fontSize:13,color:MUT,marginBottom:12}}>Tell Bianca (club coordinator) if you're coaching next year. She's planning the U10 program now.</div>
            <button onClick={()=>t('Opening message to Bianca')} style={{height: 44,padding:'0 14px',borderRadius:10,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Message Bianca</button>
          </div>
        </div>
        <div>
          <div style={{background:G,borderRadius:16,padding:'20px 20px',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.7)',marginBottom:4}}>Pre-season starts</div>
            <div style={{fontSize:28,fontWeight:800,color:'#fff',letterSpacing:'-0.02em'}}>March 2027</div>
            <div style={{fontSize:14,color:'rgba(255,255,255,0.7)',marginTop:4}}>U10 · 7-a-side next year</div>
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px'}}>
            <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:4}}>What stays</div>
            <div style={{fontSize:13,color:MUT,lineHeight:1.6}}>The team link, photos consent, and first-aid notes stay until you archive the team.</div>
            <button onClick={()=>t('Opening archive')} style={{marginTop:12,height: 44,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Archive team</button>
          </div>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
