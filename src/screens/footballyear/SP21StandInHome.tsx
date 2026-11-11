import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
type Tab='home'|'training'|'matchday'
export default function SP21StandInHome({onBack}:{onBack?:()=>void}){
  const [tab,setTab]=useState<Tab>('home')
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  const SCHEDULE=[
    {date:'Tue 29 Sep',what:'First session · Linh leading'},
    {date:'Thu 1 Oct',what:'Session · from Sam\'s plan'},
    {date:'Sat 3 Oct',what:'Game · select lineup'},
    {date:'Tue 6 Oct',what:'Session'},
    {date:'Thu 8 Oct',what:'Session'},
    {date:'Sat 10 Oct',what:'Game · select lineup'},
    {date:'Sun 11 Oct',what:'Hand back to Sam'},
  ]
  return(
    <div style={{display:'flex',flexDirection:'column',minHeight:'100%',background:'#f7f8f7',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{flex:'none',background:'#fff',borderBottom:`1px solid ${LN}`,padding:'0 24px',display:'flex',alignItems:'center',gap:0}}>
        <button onClick={onBack} style={{height:48,padding:'0 0 0 0',marginRight:16,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,display:'flex',alignItems:'center',gap:6}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          U12 Sam
        </button>
        {(['home','training','matchday'] as Tab[]).map(tb=>(
          <button key={tb} onClick={()=>setTab(tb)} style={{height:48,padding:'0 14px',border:0,borderBottom:tab===tb?`2px solid ${G}`:'2px solid transparent',background:'none',color:tab===tb?G:MUT,fontFamily:'inherit',fontSize:14,fontWeight:tab===tb?700:500,cursor:'pointer',textTransform:'capitalize' as const}}>
            {tb==='matchday'?'Match day':tb.charAt(0).toUpperCase()+tb.slice(1)}
          </button>
        ))}
        <div style={{flex:1}}/>
        <div style={{fontSize:12,color:MUT}}>Standing in for Sam · Tue 29 Sep – Sun 11 Oct</div>
      </div>
      {tab==='home'&&(
        <div style={{padding:'20px 28px 40px'}}>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>Stand-in lead</div>
            <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Hi Linh</div>
            <div style={{fontSize:14,color:MUT}}>You're leading U12 Sam · Tue 29 Sep – Sun 11 Oct</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
            <div>
              <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
                <div style={{fontSize:15,fontWeight:700,color:INK,marginBottom:10}}>What you can do</div>
                {['Run sessions from Sam\'s plan','Pick who starts on match day','Message families as "Linh, leading U12 Sam"'].map(item=>(
                  <div key={item} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'8px 0',borderTop:`1px solid ${LN}`}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flex:'none',marginTop:2}}><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{fontSize:14,color:INK}}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
                <div style={{fontSize:15,fontWeight:700,color:INK,marginBottom:10}}>Stays with Sam</div>
                {['Squad and trials','How the team plays','Players\' goals'].map(item=>(
                  <div key={item} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'8px 0',borderTop:`1px solid ${LN}`}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flex:'none',marginTop:2}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span style={{fontSize:14,color:MUT}}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{background:PALE,border:`1px solid #c0d8cc`,borderRadius:14,padding:'14px 16px'}}>
                <div style={{fontSize:13,fontWeight:700,color:GD,marginBottom:8}}>Go easy on</div>
                {[
                  {name:'Ella Brooks',note:'Back from an injury. Keep it light in contact drills.'},
                  {name:'Noah Singh',note:'Had a tough week. Keep him involved but don\'t push.'},
                ].map(p=>(
                  <div key={p.name} style={{padding:'8px 0',borderTop:`1px solid #c0d8cc`}}>
                    <div style={{fontSize:14,fontWeight:600,color:GD}}>{p.name}</div>
                    <div style={{fontSize:13,color:G}}>{p.note}</div>
                  </div>
                ))}
                <div style={{fontSize:12,color:MUT,marginTop:8}}>From Priya, fitness coach. No wellness detail.</div>
              </div>
            </div>
            <div>
              <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'14px 16px',marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:8}}>Fortnight</div>
                {SCHEDULE.map(ev=>(
                  <div key={ev.date} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderTop:`1px solid ${LN}`}}>
                    <div style={{fontSize:12,fontWeight:600,color:GD,width:72,flex:'none'}}>{ev.date}</div>
                    <div style={{fontSize:13,color:INK}}>{ev.what}</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>t('Hand back early modal')} style={{width:'100%',height:40,borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Hand back early</button>
            </div>
          </div>
        </div>
      )}
      {tab==='training'&&<div style={{padding:'40px 28px',textAlign:'center' as const,color:MUT,fontSize:15}}>Tonight's session plan. Tap a drill to tick it off.</div>}
      {tab==='matchday'&&<div style={{padding:'40px 28px',textAlign:'center' as const,color:MUT,fontSize:15}}>Pick your starting lineup for Saturday.</div>}
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
