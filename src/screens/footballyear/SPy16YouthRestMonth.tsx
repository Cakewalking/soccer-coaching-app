import { useState } from 'react'
const G='#2f6252',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
export default function SPy16YouthRestMonth({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>Head coach · U16 Ollie</div>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Rest month</div>
          <div style={{fontSize:14,color:MUT}}>Mon 1 December · rest month · back 11 January</div>
        </div>
        <button onClick={onBack} style={{height: 44,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:INK,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>The football year</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'28px 24px',textAlign:'center' as const,marginBottom:16}}>
            <div style={{fontSize:18,fontWeight:700,color:INK,marginBottom:8}}>Nothing needs you this month</div>
            <div style={{fontSize:14,color:MUT,lineHeight:1.6}}>Players set their own break. No tracking, no reminders from you.</div>
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,overflow:'hidden'}}>
            <div style={{padding:'12px 16px',borderBottom:`1px solid ${LN}`}}>
              <div style={{fontSize:14,fontWeight:700,color:INK}}>Break tracker</div>
              <div style={{fontSize:12,color:MUT}}>Players who shared their break with the team</div>
            </div>
            {[
              {name:'Cal West',weeks:'2 weeks, 2 to go',detail:'Taking 4 weeks total'},
              {name:'Ryan Petersen',weeks:'3 weeks, 1 to go',detail:'Taking 4 weeks total'},
            ].map(p=>(
              <div key={p.name} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderBottom:`1px solid ${LN}`}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:PALE,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600,color:INK}}>{p.name}</div>
                  <div style={{fontSize:12,color:MUT}}>{p.weeks} · {p.detail}</div>
                </div>
              </div>
            ))}
            <div style={{padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontSize:12,color:MUT}}>12 others haven't shared their break. That's fine.</div>
            </div>
          </div>
        </div>
        <div>
          <div style={{background:G,borderRadius:16,padding:'20px 20px',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.7)',marginBottom:4}}>Back on the pitch</div>
            <div style={{fontSize:28,fontWeight:800,color:'#fff',letterSpacing:'-0.02em'}}>Mon 11 January</div>
            <div style={{fontSize:14,color:'rgba(255,255,255,0.7)',marginTop:4}}>Pre-season starts</div>
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px'}}>
            <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:8}}>While you wait</div>
            <button onClick={()=>t('Opening next year\'s plan')} style={{width:'100%',height: 44,borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer',marginBottom:8}}>Plan next year</button>
            <button onClick={()=>t('Opening stand-in')} style={{width:'100%',height: 44,borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Set a stand-in</button>
          </div>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
