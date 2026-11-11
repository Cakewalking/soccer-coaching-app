import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
type Tab='home'|'clips'|'goals'|'me'
export default function SPp13PlayerPreSeason(){
  const [tab,setTab]=useState<Tab>('home')
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{width:390,minHeight:812,background:'#fff',borderRadius:28,overflow:'hidden',boxShadow:'0 8px 40px rgba(0,0,0,0.14)',display:'flex',flexDirection:'column',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{background:G,padding:'52px 20px 20px'}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.7)',marginBottom:4}}>Player · Mia</div>
        <div style={{fontSize:22,fontWeight:800,color:'#fff',letterSpacing:'-0.02em',marginBottom:2}}>You're in U12 Sam</div>
        <div style={{fontSize:13,color:'rgba(255,255,255,0.7)'}}>Training Tue/Thu · 5:45 pm</div>
      </div>
      <div style={{flex:1,overflowY:'auto' as const,padding:'16px 20px 100px'}}>
        {tab==='home'&&(
          <>
            <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:12}}>This month</div>
            {[
              {item:'Four quick fitness tests',note:'Coach Sam will run them this week'},
              {item:'Friendly on Saturday',note:'10:00 am at Wattle Creek Reserve'},
              {item:'Two new trial players',note:'Might join your team'},
            ].map(ev=>(
              <div key={ev.item} style={{display:'flex',gap:12,padding:'10px 0',borderBottom:`1px solid ${LN}`,alignItems:'flex-start'}}>
                <div style={{width:7,height:7,borderRadius:'50%',background:G,flex:'none',marginTop:6}}/>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:INK}}>{ev.item}</div>
                  <div style={{fontSize:12,color:MUT}}>{ev.note}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:20,background:PALE,borderRadius:14,padding:'16px'}}>
              <div style={{fontSize:14,fontWeight:700,color:GD,marginBottom:8}}>Pick one thing to get better at</div>
              <div style={{fontSize:13,color:MUT,marginBottom:12}}>Choose what you want to work on this season. Sam will check in with you.</div>
              {['First touch going forward','Winning the ball back','Finding space to receive'].map(opt=>(
                <button key={opt} onClick={()=>t('Goal picked: '+opt)} style={{display:'block',width:'100%',padding:'12px 14px',borderRadius:10,border:`1.5px solid #c0d8cc`,background:'#fff',textAlign:'left' as const,fontFamily:'inherit',fontSize:14,fontWeight:600,color:GD,marginBottom:8,cursor:'pointer'}}>{opt}</button>
              ))}
            </div>
          </>
        )}
        {tab!=='home'&&<div style={{padding:'40px 0',textAlign:'center' as const,color:MUT,fontSize:14}}>{tab.charAt(0).toUpperCase()+tab.slice(1)} tab</div>}
      </div>
      <div style={{position:'absolute',bottom:0,left:0,right:0,background:'#fff',borderTop:`1px solid ${LN}`,display:'flex',padding:'0 0 20px'}}>
        {(['home','clips','goals','me'] as Tab[]).map(tb=>(
          <button key={tb} onClick={()=>setTab(tb)} style={{flex:1,height:52,background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4}}>
            <div style={{width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab===tb?G:MUT} strokeWidth={tab===tb?2.5:1.8} strokeLinecap="round" strokeLinejoin="round">
                {tb==='home'&&<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
                {tb==='clips'&&<><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>}
                {tb==='goals'&&<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>}
                {tb==='me'&&<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
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
