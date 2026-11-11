import { useState } from 'react'
const G='#2f6252',INK='#10211f',MUT='#4a5a57',LN='#e8edeb'
type Tab='home'|'gameday'|'messages'|'roster'
const CHECKLIST=[
  {label:'Kit back',note:'Bibs and 2 vests still out',done:false,action:'See'},
  {label:'Presentation day',note:'Done — everyone came',done:true},
  {label:'Summer Cup registrations',note:'12 players picked · 10 paid $55',done:false,action:'See'},
  {label:'Thank volunteers',note:'212 hours across the year',done:false,action:'Send'},
  {label:'Indoor Mondays',note:'Tell families who\'s in',done:false,action:'See'},
]
export default function SPp11ManagerPostSeason(){
  const [tab,setTab]=useState<Tab>('home')
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  const done=CHECKLIST.filter(c=>c.done).length
  return(
    <div style={{width:390,minHeight:812,background:'#fff',borderRadius:28,overflow:'hidden',boxShadow:'0 8px 40px rgba(0,0,0,0.14)',display:'flex',flexDirection:'column',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{background:G,padding:'52px 20px 20px'}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.7)',marginBottom:4}}>Team manager · Rob</div>
        <div style={{fontSize:22,fontWeight:800,color:'#fff',letterSpacing:'-0.02em',marginBottom:4}}>Finishing 2026</div>
        <div style={{background:'rgba(255,255,255,0.15)',borderRadius:8,padding:'6px 10px',display:'inline-block'}}>
          <span style={{fontSize:12,fontWeight:700,color:'#fff'}}>{done} of {CHECKLIST.length} done</span>
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto' as const,padding:'16px 20px 100px'}}>
        {tab==='home'&&CHECKLIST.map(item=>(
          <div key={item.label} style={{display:'flex',gap:12,padding:'12px 0',borderBottom:`1px solid ${LN}`,alignItems:'center'}}>
            <div style={{width:24,height:24,borderRadius:'50%',background:item.done?G:'#f0f1ef',border:item.done?'none':`1.5px solid ${LN}`,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
              {item.done&&<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:item.done?400:600,color:item.done?MUT:INK,textDecoration:item.done?'line-through':'none'}}>{item.label}</div>
              <div style={{fontSize:12,color:MUT}}>{item.note}</div>
            </div>
            {'action' in item&&item.action&&<button onClick={()=>t(`${item.action}`)} style={{height: 44,padding:'0 10px',borderRadius:8,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:12,fontWeight:600,cursor:'pointer'}}>{item.action}</button>}
          </div>
        ))}
        {tab!=='home'&&<div style={{padding:'40px 0',textAlign:'center' as const,color:MUT,fontSize:14}}>{tab.charAt(0).toUpperCase()+tab.slice(1)} tab</div>}
      </div>
      <div style={{position:'absolute',bottom:0,left:0,right:0,background:'#fff',borderTop:`1px solid ${LN}`,display:'flex',padding:'0 0 20px'}}>
        {(['home','gameday','messages','roster'] as Tab[]).map(tb=>(
          <button key={tb} onClick={()=>setTab(tb)} style={{flex:1,height:52,background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4}}>
            <div style={{width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab===tb?G:MUT} strokeWidth={tab===tb?2.5:1.8} strokeLinecap="round" strokeLinejoin="round">
                {tb==='home'&&<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
                {tb==='gameday'&&<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>}
                {tb==='messages'&&<><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>}
                {tb==='roster'&&<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>}
              </svg>
            </div>
            <span style={{fontSize:10,fontWeight:tab===tb?700:400,color:tab===tb?G:MUT}}>{tb==='gameday'?'Game day':tb.charAt(0).toUpperCase()+tb.slice(1)}</span>
          </button>
        ))}
      </div>
      {toast&&<div style={{position:'absolute',bottom:80,left:16,right:16,background:INK,color:'#fff',padding:'10px 16px',borderRadius:12,fontSize:13,fontWeight:600,textAlign:'center' as const}}>{toast}</div>}
    </div>
  )
}
