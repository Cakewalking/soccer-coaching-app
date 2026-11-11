import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb'
export default function HM1nQuickNotes({onBack,onSave}:{onBack?:()=>void,onSave?:()=>void}){
  const [fun,setFun]=useState<'yes'|'some'|'tough'|null>(null)
  const [more,setMore]=useState('')
  const [quiet,setQuiet]=useState('')
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,padding:0,marginBottom:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Home
          </button>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>How was Saturday?</div>
          <div style={{fontSize:14,color:MUT}}>3 quick questions · takes 2 minutes</div>
        </div>
        <button onClick={onBack} style={{height: 44,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:600,cursor:'pointer'}}>Skip</button>
      </div>
      <div style={{maxWidth:600}}>
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'20px',marginBottom:16}}>
          <div style={{fontSize:16,fontWeight:700,color:INK,marginBottom:14}}>1. Did they have fun?</div>
          <div style={{display:'flex',gap:10}}>
            {([['yes','Yes, clearly'],['some','Some did'],['tough','Tough one']] as const).map(([v,l])=>(
              <button key={v} onClick={()=>setFun(v)} style={{flex:1,height: 44,borderRadius:10,border:`1.5px solid ${fun===v?G:'#e8edeb'}`,background:fun===v?'#eef5f2':'#fff',color:fun===v?GD:INK,fontFamily:'inherit',fontSize:13,fontWeight:fun===v?700:400,cursor:'pointer'}}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'20px',marginBottom:16}}>
          <div style={{fontSize:16,fontWeight:700,color:INK,marginBottom:10}}>2. What did you see more of?</div>
          <textarea value={more} onChange={e=>setMore(e.target.value)} placeholder="e.g. 'pressing high' or 'getting back to defend'" style={{width:'100%',minHeight:72,border:`1px solid ${LN}`,borderRadius:8,padding:'10px 12px',fontFamily:'inherit',fontSize:14,color:INK,resize:'vertical' as const,outline:'none',boxSizing:'border-box' as const}}/>
        </div>
        <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'20px',marginBottom:24}}>
          <div style={{fontSize:16,fontWeight:700,color:INK,marginBottom:10}}>3. Anyone quiet, upset or hurt?</div>
          <textarea value={quiet} onChange={e=>setQuiet(e.target.value)} placeholder="Name and what you noticed. Leave blank if none." style={{width:'100%',minHeight:72,border:`1px solid ${LN}`,borderRadius:8,padding:'10px 12px',fontFamily:'inherit',fontSize:14,color:INK,resize:'vertical' as const,outline:'none',boxSizing:'border-box' as const}}/>
        </div>
        <button onClick={onSave??onBack} style={{height:48,padding:'0 24px',borderRadius:12,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:15,fontWeight:700,cursor:'pointer'}}>Save notes</button>
      </div>
    </div>
  )
}
