import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
export default function SP21eStandInHomeEmpty({onBack}:{onBack?:()=>void}){
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{display:'flex',flexDirection:'column',minHeight:'100%',background:'#f7f8f7',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{flex:'none',background:'#fff',borderBottom:`1px solid ${LN}`,padding:'0 24px',display:'flex',alignItems:'center',gap:0,height:48}}>
        <button onClick={onBack} style={{height:48,padding:'0 0 0 0',marginRight:16,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,display:'flex',alignItems:'center',gap:6}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          U12 Sam
        </button>
        {['Home','Training','Match day'].map(tb=>(
          <button key={tb} style={{height:48,padding:'0 14px',border:0,borderBottom:'2px solid transparent',background:'none',color:MUT,fontFamily:'inherit',fontSize:14,fontWeight:500,cursor:'default'}}>
            {tb}
          </button>
        ))}
        <div style={{flex:1}}/>
        <div style={{fontSize:12,color:MUT}}>Stand-in from Sat 26 Sep</div>
      </div>
      <div style={{padding:'60px 28px',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center' as const}}>
        <div style={{width:60,height:60,borderRadius:'50%',background:PALE,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20}}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div style={{fontSize:22,fontWeight:800,color:INK,marginBottom:8,letterSpacing:'-0.02em'}}>Nothing to do until Saturday 26 September</div>
        <div style={{fontSize:15,color:MUT,lineHeight:1.6,maxWidth:480,marginBottom:32}}>Your dates as stand-in haven't started yet. Access opens automatically on 26 Sep.</div>
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'20px 24px',width:'100%',maxWidth:480,textAlign:'left' as const}}>
          <div style={{fontSize:14,fontWeight:700,color:INK,marginBottom:12}}>Before then</div>
          {[
            {label:'Working with Children Check',note:'Confirmed by Sam',done:true},
            {label:'Watch the 2-minute intro video',note:'4 minutes · sent to your email',done:false,action:'Watch'},
            {label:'Say hello to Rob (team manager)',note:'Rob will help on match day',done:false,action:'Message'},
          ].map(item=>(
            <div key={item.label} style={{display:'grid',gridTemplateColumns:'28px minmax(0,1fr) auto',gap:12,padding:'10px 0',borderTop:`1px solid ${LN}`,alignItems:'center'}}>
              <div style={{width:22,height:22,borderRadius:'50%',background:item.done?G:'#f0f1ef',border:item.done?'none':`1.5px solid ${LN}`,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
                {item.done&&<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:item.done?400:600,color:item.done?MUT:INK,textDecoration:item.done?'line-through':'none'}}>{item.label}</div>
                <div style={{fontSize:12,color:MUT}}>{item.note}</div>
              </div>
              {'action' in item&&item.action&&<button onClick={()=>t(`${item.action} tapped`)} style={{height: 44,padding:'0 12px',borderRadius:8,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:12,fontWeight:600,cursor:'pointer',flexShrink:0}}>{item.action}</button>}
            </div>
          ))}
        </div>
        <div style={{marginTop:16}}>
          <div style={{fontSize:13,color:MUT}}>Questions? Message Sam directly.</div>
          <button onClick={()=>t('Opening message to Sam')} style={{marginTop:8,height: 44,padding:'0 16px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:GD,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Message Sam</button>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
