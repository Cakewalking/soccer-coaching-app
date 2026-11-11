import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
export default function SE2PlayerSummary({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,padding:0,marginBottom:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Season summaries
          </button>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Mia Tran</div>
          <div style={{fontSize:14,color:MUT}}>U12 Sam · 2026</div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,overflow:'hidden',marginBottom:16}}>
            <div style={{padding:'12px 16px',borderBottom:`1px solid ${LN}`}}>
              <div style={{fontSize:14,fontWeight:700,color:INK}}>The year in numbers</div>
            </div>
            {[
              {label:'Games',value:'16 of 18',ok:true},
              {label:'Minutes',value:'58%',ok:true},
              {label:'Season goals',value:'2 of 3 met',ok:true},
              {label:'Training',value:'31 of 34',ok:true},
            ].map(s=>(
              <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 16px',borderTop:`1px solid ${LN}`}}>
                <span style={{fontSize:14,color:INK}}>{s.label}</span>
                <span style={{fontSize:14,fontWeight:600,color:GD}}>{s.value}</span>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:8}}>Coach note</div>
            <div style={{fontSize:14,color:INK,lineHeight:1.7}}>"Mia worked really hard on her first touch this season and you can see the improvement in games. She asks good questions in training and brings energy to the group. Looking forward to seeing her build on this next year."</div>
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:10}}>Her 3 goals</div>
            {[
              {goal:'First touch going forward',status:'Met',note:'Clear improvement from round 6'},
              {goal:'Tracking back after losing the ball',status:'In progress',note:'Better in the second half of the season'},
              {goal:'Take 3 shots from outside the area',status:'Not yet',note:'Only took 1 this season'},
            ].map(g=>(
              <div key={g.goal} style={{padding:'10px 0',borderTop:`1px solid ${LN}`}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                  <span style={{fontSize:14,fontWeight:600,color:INK}}>{g.goal}</span>
                  <span style={{fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:6,background:g.status==='Met'?PALE:g.status==='In progress'?'#fff9e6':'#f5f6f4',color:g.status==='Met'?GD:g.status==='In progress'?'#b7850a':MUT}}>{g.status}</span>
                </div>
                <div style={{fontSize:12,color:MUT}}>{g.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,color:MUT,marginBottom:12,letterSpacing:'0.06em',textTransform:'uppercase' as const}}>Three clips she chose</div>
            {[
              {time:'Round 4 · 34:12','label':'Goal — first touch, then finish'},
              {time:'Round 9 · 18:44','label':'Won the ball back in midfield'},
              {time:'Round 15 · 51:09','label':'Led the press from the front'},
            ].map(c=>(
              <div key={c.time} style={{display:'flex',gap:12,padding:'10px 0',borderTop:`1px solid ${LN}`,alignItems:'center'}}>
                <div style={{width:40,height:30,borderRadius:6,background:PALE,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={G} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:INK}}>{c.label}</div>
                  <div style={{fontSize:11,color:MUT}}>{c.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:'#f5f6f4',borderRadius:12,padding:'12px 14px'}}>
            <div style={{fontSize:12,fontWeight:600,color:MUT,marginBottom:4}}>Left out on purpose</div>
            <div style={{fontSize:12,color:MUT,lineHeight:1.5}}>Specific game events, comparisons to other players, and anything from wellness check-ins.</div>
          </div>
          <button onClick={()=>t('Opening message to family')} style={{marginTop:12,width:'100%',height:40,borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:GD,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Send to family</button>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
