import { useState } from 'react'
const G='#2f6252',INK='#10211f',MUT='#4a5a57',LN='#e8edeb'
type Tab='home'|'gameday'|'messages'|'roster'
export default function SPp12ManagerRestMonth(){
  const [tab,setTab]=useState<Tab>('home')
  return(
    <div style={{width:390,minHeight:812,background:'#fff',borderRadius:28,overflow:'hidden',boxShadow:'0 8px 40px rgba(0,0,0,0.14)',display:'flex',flexDirection:'column',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{background:G,padding:'52px 20px 20px'}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.7)',marginBottom:4}}>Team manager · Rob</div>
        <div style={{fontSize:22,fontWeight:800,color:'#fff',letterSpacing:'-0.02em',marginBottom:2}}>Nothing until January</div>
        <div style={{fontSize:13,color:'rgba(255,255,255,0.7)'}}>Back 11 January</div>
      </div>
      <div style={{flex:1,overflowY:'auto' as const,padding:'16px 20px 100px'}}>
        {tab==='home'&&(
          <>
            <div style={{background:'#f5f6f4',borderRadius:16,padding:'20px',textAlign:'center' as const,marginBottom:20}}>
              <div style={{fontSize:16,fontWeight:700,color:INK,marginBottom:8}}>Nothing needs you until 11 January</div>
              <div style={{fontSize:13,color:MUT}}>See you next season</div>
            </div>
            {[
              {label:'18 games managed',value:'2026 season'},
              {label:'212 volunteer hours',value:'across the squad'},
              {label:'17 of 17 families',value:'did duty at least once'},
            ].map(stat=>(
              <div key={stat.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:`1px solid ${LN}`}}>
                <div style={{fontSize:15,fontWeight:600,color:INK}}>{stat.label}</div>
                <div style={{fontSize:13,color:MUT}}>{stat.value}</div>
              </div>
            ))}
          </>
        )}
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
    </div>
  )
}
