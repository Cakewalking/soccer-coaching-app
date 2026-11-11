import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
export default function HM1rNotesBack({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,padding:0,marginBottom:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Home
          </button>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>What we saw</div>
          <div style={{fontSize:14,color:MUT}}>8 of 9 Saturdays noted</div>
        </div>
      </div>
      <div style={{maxWidth:680}}>
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'18px 20px',marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:8}}>Wednesday's games</div>
          <div style={{fontSize:15,color:INK,lineHeight:1.6}}>Good energy in the second half. Pressing worked better once Poppy was in the middle. Sam and Hamish linked up well on the left.</div>
        </div>
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'18px 20px',marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:8}}>Saturday in your words</div>
          <div style={{fontSize:15,color:INK,lineHeight:1.6}}>Tough first half — tired legs from Wednesday. Came back in the second. Tom scored a great one, Poppy had a cracker saved. Everyone had fun.</div>
        </div>
        <div style={{background:PALE,border:`1px solid #c0d8cc`,borderRadius:14,padding:'18px 20px',marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,color:GD,marginBottom:8}}>What happened with Zara</div>
          <div style={{fontSize:15,color:GD,lineHeight:1.6}}>Zara got upset after a collision in the second half. Seemed fine after a minute with her dad. You noted it at the time.</div>
          <div style={{fontSize:12,color:G,marginTop:8}}>Sat 1 Nov · noted by Tom</div>
        </div>
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'18px 20px'}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:8}}>So on Wednesday…</div>
          <div style={{fontSize:15,color:INK,lineHeight:1.6}}>Check in with Zara's parent at the start. Keep her involved but watch how she goes in the first contact drill.</div>
        </div>
        <div style={{marginTop:16,display:'flex',gap:8}}>
          <button onClick={()=>t('Opening this Saturday\'s notes')} style={{height:40,padding:'0 16px',borderRadius:10,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Note this Saturday</button>
          <button onClick={()=>t('Opening all notes')} style={{height:40,padding:'0 16px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:GD,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>All notes</button>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
