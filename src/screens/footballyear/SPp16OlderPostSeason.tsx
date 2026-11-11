import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
type Tab='home'|'clips'|'body'|'messages'
export default function SPp16OlderPostSeason(){
  const [tab,setTab]=useState<Tab>('home')
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{width:390,minHeight:812,background:'#fff',borderRadius:28,overflow:'hidden',boxShadow:'0 8px 40px rgba(0,0,0,0.14)',display:'flex',flexDirection:'column',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{background:G,padding:'52px 20px 20px'}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.7)',marginBottom:4}}>Player · Cal (15+)</div>
        <div style={{fontSize:22,fontWeight:800,color:'#fff',letterSpacing:'-0.02em',marginBottom:2}}>Post-season</div>
        <div style={{fontSize:13,color:'rgba(255,255,255,0.7)'}}>U16 · 2026</div>
      </div>
      <div style={{flex:1,overflowY:'auto' as const,padding:'16px 20px 100px'}}>
        {tab==='home'&&(
          <>
            <div style={{background:PALE,borderRadius:14,padding:'14px',marginBottom:16}}>
              <div style={{fontSize:12,fontWeight:700,color:MUT,marginBottom:6,letterSpacing:'0.06em',textTransform:'uppercase' as const}}>From Ollie</div>
              <div style={{fontSize:14,color:INK,lineHeight:1.6}}>"Cal has had a great season. The improvement in his defensive work rate was noticeable from round 6 onwards."</div>
            </div>
            <button onClick={()=>t('Opening season summary')} style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',padding:'14px',borderRadius:12,border:`1px solid ${LN}`,background:'#fff',fontFamily:'inherit',cursor:'pointer',marginBottom:10}}>
              <span style={{fontSize:14,fontWeight:600,color:INK}}>See my season</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button onClick={()=>t('Opening coming back survey')} style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',padding:'14px',borderRadius:12,border:`1.5px solid ${G}`,background:'#fff',fontFamily:'inherit',cursor:'pointer',marginBottom:16}}>
              <div style={{textAlign:'left' as const}}>
                <div style={{fontSize:14,fontWeight:700,color:GD}}>Are you coming back?</div>
                <div style={{fontSize:12,color:MUT}}>You answer yourself · parent gets a copy</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div style={{background:'#f5f6f4',borderRadius:12,padding:'12px 14px',marginBottom:10}}>
              <div style={{fontSize:13,fontWeight:600,color:INK,marginBottom:4}}>Marko asked about you</div>
              <div style={{fontSize:13,color:MUT}}>Men's 1sts coach Marko invited you to train with his squad. Talk to Ollie first.</div>
              <button onClick={()=>t('Opening Marko invite')} style={{marginTop:8,height:32,padding:'0 12px',borderRadius:8,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:12,fontWeight:600,cursor:'pointer'}}>See invite</button>
            </div>
            <div style={{background:'#f5f6f4',borderRadius:12,padding:'12px 14px'}}>
              <div style={{fontSize:12,fontWeight:600,color:MUT}}>Exams until 20 Nov — Ollie knows</div>
            </div>
          </>
        )}
        {tab!=='home'&&<div style={{padding:'40px 0',textAlign:'center' as const,color:MUT,fontSize:14}}>{tab.charAt(0).toUpperCase()+tab.slice(1)} tab</div>}
      </div>
      <div style={{position:'absolute',bottom:0,left:0,right:0,background:'#fff',borderTop:`1px solid ${LN}`,display:'flex',padding:'0 0 20px'}}>
        {(['home','clips','body','messages'] as Tab[]).map(tb=>(
          <button key={tb} onClick={()=>setTab(tb)} style={{flex:1,height:52,background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4}}>
            <div style={{width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab===tb?G:MUT} strokeWidth={tab===tb?2.5:1.8} strokeLinecap="round" strokeLinejoin="round">
                {tb==='home'&&<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
                {tb==='clips'&&<><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>}
                {tb==='body'&&<><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>}
                {tb==='messages'&&<><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>}
              </svg>
            </div>
            <span style={{fontSize:10,fontWeight:tab===tb?700:400,color:tab===tb?G:MUT}}>{tb.charAt(0).toUpperCase()+tb.slice(1)}</span>
          </button>
        ))}
      </div>
      {toast&&<div style={{position:'absolute',bottom:80,left:16,right:16,background:INK,color:'#fff',padding:'10px 16px',borderRadius:12,fontSize:13,fontWeight:600,textAlign:'center' as const}}>{toast}</div>}
    </div>
  )
}
