import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
const CLIPS=[
  {id:1,round:'Round 4 · 12:30',label:'Good example',note:'Wins ball, plays forward immediately',tag:'Pressing'},
  {id:2,round:'Round 7 · 44:11',label:'To work on',note:'Pressed but got turned, needs recovery',tag:'Pressing'},
  {id:3,round:'Round 9 · 8:50',label:'Good example',note:'Triggers the whole team to press',tag:'Pressing'},
  {id:4,round:'Round 11 · 31:22',label:'Good example',note:'Presses keeper into a mistake',tag:'Pressing'},
  {id:5,round:'Round 14 · 19:07',label:'To work on',note:'Pressed too early, left space behind',tag:'Pressing'},
  {id:6,round:'Round 16 · 55:40',label:'Good example',note:'Constant pressure won the ball',tag:'Pressing'},
]
export default function C1sClipSearch({onBack,onNoResults}:{onBack?:()=>void,onNoResults?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,padding:0,marginBottom:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Clips
          </button>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Search results</div>
          <div style={{fontSize:14,color:MUT}}>Player: Mia Tran · Moment: pressing · 6 clips</div>
        </div>
        <button onClick={()=>t('Making playlist')} style={{height: 44,padding:'0 14px',borderRadius:10,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Make playlist</button>
      </div>
      <div style={{display:'flex',gap:8,marginBottom:20}}>
        <div style={{flex:1,background:'#fff',border:`1px solid ${LN}`,borderRadius:10,height:40,display:'flex',alignItems:'center',padding:'0 14px',gap:10}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span style={{fontSize:14,color:MUT}}>Mia pressing</span>
        </div>
        <button onClick={onNoResults} style={{height: 44,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:MUT,fontFamily:'inherit',fontSize:13,cursor:'pointer'}}>Try: Mia heading →</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:12}}>
        {CLIPS.map(clip=>(
          <div key={clip.id} style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,overflow:'hidden',cursor:'pointer'}} onClick={()=>t(`Playing clip ${clip.id}`)}>
            <div style={{height:140,background:PALE,display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <div style={{position:'absolute',top:8,right:8,background:clip.label==='Good example'?PALE:'#fff3f3',border:`1px solid ${clip.label==='Good example'?'#c0d8cc':'#f0c0c0'}`,borderRadius:6,padding:'3px 8px',fontSize:11,fontWeight:700,color:clip.label==='Good example'?GD:'#c0392b'}}>{clip.label}</div>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontSize:13,fontWeight:600,color:INK,marginBottom:4}}>{clip.note}</div>
              <div style={{fontSize:12,color:MUT}}>{clip.round} · {clip.tag}</div>
            </div>
          </div>
        ))}
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
