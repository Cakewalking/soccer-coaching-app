import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
const RESULTS=[
  {opp:'Northside FC',result:'W',score:'2–1'},
  {opp:'Riverside United',result:'L',score:'0–1'},
  {opp:'Tealside Town',result:'D',score:'1–1'},
  {opp:'Valley SC',result:'W',score:'3–2'},
  {opp:'Western Rovers',result:'W',score:'2–0'},
]
export default function FN3SeniorTeam({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,padding:0,marginBottom:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Seniors
          </button>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>Read only</div>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Men's Reserves</div>
          <div style={{fontSize:14,color:MUT}}>Coach: Dean Hollis · 20 players</div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:12}}>Last 5 results</div>
            {RESULTS.map(r=>(
              <div key={r.opp} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderTop:`1px solid ${LN}`}}>
                <div style={{width:28,height:28,borderRadius:6,background:r.result==='W'?PALE:r.result==='L'?'#fef2f2':'#f5f6f4',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
                  <span style={{fontSize:12,fontWeight:800,color:r.result==='W'?GD:r.result==='L'?'#c0392b':MUT}}>{r.result}</span>
                </div>
                <div style={{flex:1,fontSize:14,color:INK}}>{r.opp}</div>
                <div style={{fontSize:14,fontWeight:600,color:INK}}>{r.score}</div>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,overflow:'hidden',marginBottom:16}}>
            <div style={{padding:'12px 16px',borderBottom:`1px solid ${LN}`}}>
              <div style={{fontSize:14,fontWeight:700,color:INK}}>This season</div>
            </div>
            {[
              {label:'Registered',value:'18 of 20',ok:true},
              {label:'Training turnout',value:'71%',ok:true},
              {label:'Games recorded',value:'4 of 6',ok:true},
              {label:'Clearances pending',value:'2',ok:false},
              {label:'Check expiring',value:"Paul's check",ok:false},
            ].map(stat=>(
              <div key={stat.label} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 16px',borderTop:`1px solid ${LN}`}}>
                <span style={{fontSize:14,color:INK}}>{stat.label}</span>
                <span style={{fontSize:13,fontWeight:600,color:stat.ok?MUT:'#c0392b'}}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:12}}>Staff</div>
            {[
              {name:'Dean Hollis',role:'Head coach'},
              {name:'Vacant',role:'Assistant'},
            ].map(s=>(
              <div key={s.name} style={{display:'flex',gap:10,padding:'8px 0',borderTop:`1px solid ${LN}`,alignItems:'center'}}>
                <div style={{width:32,height:32,borderRadius:'50%',background:PALE,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:INK}}>{s.name}</div>
                  <div style={{fontSize:12,color:MUT}}>{s.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px'}}>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' as const,color:MUT,marginBottom:8}}>Next game</div>
            <div style={{fontSize:15,fontWeight:600,color:INK,marginBottom:4}}>Sat 14 · Valley SC</div>
            <div style={{fontSize:13,color:MUT}}>3:00 pm · away · Riverside Oval</div>
            <button onClick={()=>t('Opening this game')} style={{marginTop:12,height:36,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>See game details</button>
          </div>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
