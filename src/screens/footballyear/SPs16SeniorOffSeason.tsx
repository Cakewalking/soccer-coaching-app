import { useState } from 'react'
const G='#2f6252',INK='#10211f',MUT='#4a5a57',LN='#e8edeb'
export default function SPs16SeniorOffSeason({onBack}:{onBack?:()=>void}){
  const [open,setOpen]=useState<string|null>(null)
  const PANEL:Record<string,string>={
    summer:'Priya has drafted six individual summer blocks — strength, running and a return-to-play plan each. Players run them at their own pace and check in weekly.',
    plan:'Next season\'s outline: pre-season 11 Jan, trial games late Jan, first fixture 14 Feb. Edit the phases once the fixture list lands.',
    standin:'Pick an assistant to lead while you\'re away. They get the plan and match-day picks, nothing else.',
  }
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>Head coach · Men's 1sts Marko</div>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Off-season</div>
          <div style={{fontSize:14,color:MUT}}>Mon 1 December · off-season · back 11 January</div>
        </div>
        <button onClick={onBack} style={{height: 44,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:INK,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>The football year</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'28px 24px',textAlign:'center' as const,marginBottom:16}}>
            <div style={{fontSize:18,fontWeight:700,color:INK,marginBottom:8}}>Nothing needs you this month</div>
            <div style={{fontSize:14,color:MUT,lineHeight:1.6}}>Adults choose their own break. No list, no reminders.</div>
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:12}}>
            <div style={{fontSize:15,fontWeight:700,color:INK,marginBottom:6}}>Summer programmes</div>
            <div style={{fontSize:13,color:MUT,marginBottom:12}}>6 players asked Priya for a summer programme. She'll set those up with them directly.</div>
            <button onClick={()=>setOpen(o=>o==='summer'?null:'summer')} style={{height: 44,padding:'0 14px',borderRadius:10,border:`1px solid ${open==='summer'?G:LN}`,background:open==='summer'?'#eef5f2':'#fff',color:G,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>See what Priya has planned</button>
            {open==='summer'&&<div style={{fontSize:13,color:MUT,marginTop:10,lineHeight:1.6}}>{PANEL.summer}</div>}
          </div>
        </div>
        <div>
          <div style={{background:G,borderRadius:16,padding:'20px 20px',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.7)',marginBottom:4}}>Back on the pitch</div>
            <div style={{fontSize:28,fontWeight:800,color:'#fff',letterSpacing:'-0.02em'}}>Mon 11 January</div>
            <div style={{fontSize:14,color:'rgba(255,255,255,0.7)',marginTop:4}}>Pre-season starts</div>
          </div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px'}}>
            <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:8}}>While you wait</div>
            <button onClick={()=>setOpen(o=>o==='plan'?null:'plan')} style={{width:'100%',height: 44,borderRadius:10,border:`1px solid ${open==='plan'?G:LN}`,background:open==='plan'?'#eef5f2':'#fff',color:G,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer',marginBottom:8}}>Plan next year</button>
            <button onClick={()=>setOpen(o=>o==='standin'?null:'standin')} style={{width:'100%',height: 44,borderRadius:10,border:`1px solid ${open==='standin'?G:LN}`,background:open==='standin'?'#eef5f2':'#fff',color:G,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Set a stand-in</button>
            {(open==='plan'||open==='standin')&&<div style={{fontSize:13,color:MUT,marginTop:10,lineHeight:1.6}}>{PANEL[open]}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
