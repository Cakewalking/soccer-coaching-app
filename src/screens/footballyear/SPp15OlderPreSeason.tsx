import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
type Tab='home'|'clips'|'body'|'messages'
const CHECKLIST=[
  {label:'Consent',note:'You answered',done:true},
  {label:'Baseline tests',note:'3 of 4 done · 1 to go',done:false,action:'See'},
  {label:'Pick your goal',note:'Choose what you work on this season',done:false,action:'Pick'},
]
export default function SPp15OlderPreSeason(){
  const [tab,setTab]=useState<Tab>('home')
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{width:390,minHeight:812,background:'#fff',borderRadius:28,overflow:'hidden',boxShadow:'0 8px 40px rgba(0,0,0,0.14)',display:'flex',flexDirection:'column',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{background:G,padding:'52px 20px 20px'}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.7)',marginBottom:4}}>Player · Cal (15+)</div>
        <div style={{fontSize:22,fontWeight:800,color:'#fff',letterSpacing:'-0.02em',marginBottom:2}}>You're in U16</div>
        <div style={{fontSize:13,color:'rgba(255,255,255,0.7)'}}>Training Mon/Wed · 7:00 pm</div>
      </div>
      <div style={{flex:1,overflowY:'auto' as const,padding:'16px 20px 100px'}}>
        {tab==='home'&&(
          <>
            <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:12}}>Yours to do</div>
            {CHECKLIST.map(item=>(
              <div key={item.label} style={{display:'flex',gap:12,padding:'12px 0',borderBottom:`1px solid ${LN}`,alignItems:'center'}}>
                <div style={{width:24,height:24,borderRadius:'50%',background:item.done?G:'#f0f1ef',border:item.done?'none':`1.5px solid ${LN}`,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
                  {item.done&&<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:item.done?400:600,color:item.done?MUT:INK,textDecoration:item.done?'line-through':'none'}}>{item.label}</div>
                  <div style={{fontSize:12,color:MUT}}>{item.note}</div>
                </div>
                {'action' in item&&item.action&&<button onClick={()=>t(`${item.action}`)} style={{height:30,padding:'0 10px',borderRadius:8,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:12,fontWeight:600,cursor:'pointer'}}>{item.action}</button>}
              </div>
            ))}
            <div style={{marginTop:16,background:PALE,borderRadius:14,padding:'14px'}}>
              <div style={{fontSize:13,fontWeight:700,color:GD,marginBottom:4}}>Load build · week 6 of 10</div>
              <div style={{fontSize:13,color:G,lineHeight:1.5}}>Stepped up to 2 sessions plus a friendly this week. About 75% of a full season week. Load levels off after round 1.</div>
            </div>
            <div style={{marginTop:12,background:'#f5f6f4',borderRadius:14,padding:'14px'}}>
              <div style={{fontSize:13,fontWeight:600,color:INK,marginBottom:4}}>At your age</div>
              <div style={{fontSize:13,color:MUT,lineHeight:1.5}}>You answer your own consent and pick your own goals. Your parent gets a copy of anything you send to Ollie.</div>
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
