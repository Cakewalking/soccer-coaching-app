import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb'
export default function HM2cPlayerCardMiniRoos({onBack,onNote}:{onBack?:()=>void,onNote?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,padding:0,marginBottom:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Squad
          </button>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Poppy Lane</div>
          <div style={{fontSize:14,color:MUT}}>U9 Sam · 2026</div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 300px',gap:16}}>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,overflow:'hidden',marginBottom:16}}>
            <div style={{padding:'12px 16px',borderBottom:`1px solid ${LN}`}}>
              <div style={{fontSize:14,fontWeight:700,color:INK}}>This season</div>
            </div>
            {[
              {label:'Came to games',value:'9 of 10'},
              {label:'Turns in goal',value:'2'},
              {label:'Started',value:'5 of 9'},
            ].map(s=>(
              <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 16px',borderTop:`1px solid ${LN}`}}>
                <span style={{fontSize:14,color:INK}}>{s.label}</span>
                <span style={{fontSize:14,fontWeight:600,color:GD}}>{s.value}</span>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:10}}>What you've noticed</div>
            {['Loves dribbling — tries to take players on every time','Tapped 3 Saturdays running (asked about it, seemed fine)','Looks up before she passes. Getting better.'].map(note=>(
              <div key={note} style={{display:'flex',gap:10,padding:'8px 0',borderTop:`1px solid ${LN}`,alignItems:'flex-start'}}>
                <div style={{width:5,height:5,borderRadius:'50%',background:G,flex:'none',marginTop:6}}/>
                <span style={{fontSize:13,color:INK,lineHeight:1.5}}>{note}</span>
              </div>
            ))}
            <button onClick={()=>t('Adding note')} style={{marginTop:12,height:36,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>+ Add note</button>
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:4}}>Quiet on 23 May</div>
            <div style={{fontSize:13,color:MUT}}>You noted she was quiet after the game. No follow-up yet.</div>
          </div>
        </div>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,overflow:'hidden',marginBottom:16}}>
            <div style={{padding:'12px 16px',borderBottom:`1px solid ${LN}`}}>
              <div style={{fontSize:14,fontWeight:700,color:INK}}>Good to know</div>
            </div>
            {[
              {label:'Photos consent',value:'Given'},
              {label:'First aid',value:'Asthma — inhaler with Rob'},
              {label:'Pick-up',value:'Mum or Nana'},
            ].map(s=>(
              <div key={s.label} style={{padding:'10px 16px',borderTop:`1px solid ${LN}`}}>
                <div style={{fontSize:12,fontWeight:600,color:MUT,marginBottom:2}}>{s.label}</div>
                <div style={{fontSize:13,color:INK}}>{s.value}</div>
              </div>
            ))}
          </div>
          <button onClick={onNote ?? (() => t('Opening season note'))} style={{width:'100%',height:48,borderRadius:12,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:14,fontWeight:700,cursor:'pointer'}}>Write her season note</button>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
