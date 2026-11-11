import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
export default function HM6nSeasonNoteOne({onBack}:{onBack?:()=>void}){
  const [saved,setSaved]=useState(false)
  const [loved,setLoved]=useState("She loved scoring her first goal in a real game and playing with her friends every Saturday.")
  const [better,setBetter]=useState("Her dribbling got really good — she started running at players with confidence.")
  const [home,setHome]=useState("Try kicking with your left foot when you're at the park. Even just a few times.")
  const [preview,setPreview]=useState(false)
  function save(){setSaved(true);setTimeout(()=>setSaved(false),3000)}
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,padding:0,marginBottom:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Season notes
          </button>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Poppy's note</div>
          <div style={{fontSize:14,color:MUT}}>9 of 12 written · no scores or comparisons</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>setPreview(!preview)} style={{height:36,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:INK,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>{preview?'Edit':'Preview'}</button>
          <button onClick={save} style={{height:36,padding:'0 14px',borderRadius:10,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>{saved?'Saved':'Save'}</button>
        </div>
      </div>
      {!preview?(
        <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:16}}>
          <div>
            {[
              {label:'What she loved',value:loved,set:setLoved},
              {label:'What she got better at',value:better,set:setBetter},
              {label:'Something to try at home',value:home,set:setHome},
            ].map(section=>(
              <div key={section.label} style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px',marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,color:GD,marginBottom:8}}>{section.label}</div>
                <textarea value={section.value} onChange={e=>section.set(e.target.value)} style={{width:'100%',minHeight:80,border:`1px solid ${LN}`,borderRadius:8,padding:'10px 12px',fontFamily:'inherit',fontSize:14,color:INK,resize:'vertical' as const,outline:'none',boxSizing:'border-box' as const}}/>
              </div>
            ))}
            <div style={{background:PALE,border:`1px solid #c0d8cc`,borderRadius:12,padding:'12px 14px',display:'flex',gap:10,alignItems:'flex-start'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flex:'none',marginTop:2}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div style={{fontSize:13,color:G}}>No scores or comparisons. This note goes to Poppy's family. It's about her, not the team.</div>
            </div>
          </div>
          <div>
            <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px'}}>
              <div style={{fontSize:13,fontWeight:700,color:MUT,marginBottom:8,letterSpacing:'0.06em',textTransform:'uppercase' as const}}>What the family sees</div>
              <div style={{fontSize:13,color:MUT,marginBottom:12}}>A short note, your name, and 3 clips you choose.</div>
              <button onClick={()=>alert('Change clips')} style={{height:36,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:G,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Change the 3 clips</button>
            </div>
          </div>
        </div>
      ):(
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:16,padding:'28px 32px',maxWidth:580}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,color:MUT,marginBottom:4}}>From your U9 Sam coach</div>
          <div style={{fontSize:22,fontWeight:800,color:INK,marginBottom:20,letterSpacing:'-0.02em'}}>Poppy's 2026 season</div>
          {[{q:'What she loved',a:loved},{q:'What she got better at',a:better},{q:'Something to try at home',a:home}].map(s=>(
            <div key={s.q} style={{marginBottom:20}}>
              <div style={{fontSize:13,fontWeight:700,color:MUT,marginBottom:4}}>{s.q}</div>
              <div style={{fontSize:15,color:INK,lineHeight:1.6}}>{s.a}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
