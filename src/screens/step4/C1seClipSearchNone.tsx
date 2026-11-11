import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
export default function C1seClipSearchNone({onBack,onSearch}:{onBack?:()=>void,onSearch?:(q:string)=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  const SUGGESTIONS=['Mia pressing','Mia first touch','Goals we scored','Press triggers','Defensive shape']
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,padding:0,marginBottom:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Clips
          </button>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>No clips found</div>
          <div style={{fontSize:14,color:MUT}}>Player: Mia Tran · Moment: heading</div>
        </div>
      </div>
      <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:10,height:40,display:'flex',alignItems:'center',padding:'0 14px',gap:10,marginBottom:32}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span style={{fontSize:14,color:MUT}}>Mia heading</span>
      </div>
      <div style={{maxWidth:520}}>
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'28px 32px',marginBottom:20,textAlign:'center' as const}}>
          <div style={{width:48,height:48,borderRadius:'50%',background:PALE,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
          </div>
          <div style={{fontSize:17,fontWeight:700,color:INK,marginBottom:8}}>No clips of Mia heading</div>
          <div style={{fontSize:14,color:MUT,lineHeight:1.6}}>Players under 12 don't head the ball in matches, so none have been tagged. The footage is there for other moments.</div>
        </div>
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px'}}>
          <div style={{fontSize:13,fontWeight:700,color:MUT,marginBottom:12,letterSpacing:'0.06em',textTransform:'uppercase' as const}}>Searches that have results</div>
          {SUGGESTIONS.map(s=>(
            <button key={s} onClick={()=>{if(onSearch)onSearch(s);else t(`Searching: ${s}`)}} style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',padding:'10px 0',borderTop:`1px solid ${LN}`,background:'none',border:'none',borderBottom:`1px solid ${LN}`,cursor:'pointer',fontFamily:'inherit'}}>
              <span style={{fontSize:14,color:GD,fontWeight:500}}>{s}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          ))}
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
