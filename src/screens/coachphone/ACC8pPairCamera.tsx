import { useState } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb',PALE='#eef5f2'
type Step=1|2|3
export default function ACC8pPairCamera({onBack,onDone}:{onBack?:()=>void,onDone?:()=>void}){
  const [step,setStep]=useState<Step>(1)
  const [selected,setSelected]=useState<string|null>(null)
  const [toast,setToast]=useState<string|null>(null)
  function t(m:string){setToast(m);setTimeout(()=>setToast(null),3200)}
  return(
    <div style={{padding:'20px 28px 40px',background:'#f7f8f7',minHeight:'100%',boxSizing:'border-box',fontFamily:'var(--font-sans)',position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:MUT,fontFamily:'inherit',fontSize:13,fontWeight:500,padding:0,marginBottom:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Recording
          </button>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',color:INK,marginBottom:2}}>Pair a camera</div>
          <div style={{fontSize:14,color:MUT}}>3 steps · takes about 30 seconds</div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 300px',gap:16}}>
        <div>
          {[1,2,3].map(n=>(
            <div key={n} style={{background:'#fff',border:`1.5px solid ${step===n?G:LN}`,borderRadius:14,padding:'18px 20px',marginBottom:12,opacity:step<n?0.5:1}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:step===n?12:0}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:step>n?G:step===n?PALE:'#f0f1ef',border:step===n?`1.5px solid ${G}`:'none',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
                  {step>n?(
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ):(
                    <span style={{fontSize:13,fontWeight:700,color:step===n?GD:MUT}}>{n}</span>
                  )}
                </div>
                <div style={{fontSize:15,fontWeight:700,color:step===n?INK:MUT}}>
                  {n===1&&'Turn the camera on'}
                  {n===2&&'Pick from the list'}
                  {n===3&&'Check the picture'}
                </div>
              </div>
              {step===1&&n===1&&(
                <>
                  <div style={{fontSize:13,color:MUT,marginBottom:16,marginLeft:40}}>Hold the button on the side of the camera for 3 seconds until the light is blue.</div>
                  <div style={{marginLeft:40}}>
                    <button onClick={()=>setStep(2)} style={{height: 44,padding:'0 20px',borderRadius:10,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:700,cursor:'pointer'}}>Light is blue</button>
                  </div>
                </>
              )}
              {step===2&&n===2&&(
                <>
                  <div style={{fontSize:13,color:MUT,marginBottom:12,marginLeft:40}}>Found nearby:</div>
                  {['Match camera 2','Match camera 1','Training cam A'].map(cam=>(
                    <div key={cam} style={{marginLeft:40,marginBottom:8}}>
                      <button onClick={()=>setSelected(cam)} style={{display:'flex',alignItems:'center',gap:12,width:'100%',padding:'10px 14px',borderRadius:10,border:`1.5px solid ${selected===cam?G:LN}`,background:'#fff',cursor:'pointer',fontFamily:'inherit',textAlign:'left' as const}}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={selected===cam?G:MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
                        <span style={{fontSize:14,fontWeight:selected===cam?700:400,color:selected===cam?GD:INK}}>{cam}</span>
                      </button>
                    </div>
                  ))}
                  {selected&&<div style={{marginLeft:40,marginTop:12}}><button onClick={()=>setStep(3)} style={{height: 44,padding:'0 20px',borderRadius:10,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:700,cursor:'pointer'}}>Connect to {selected}</button></div>}
                </>
              )}
              {step===3&&n===3&&(
                <>
                  <div style={{marginLeft:40}}>
                    <div style={{width:240,height:135,background:PALE,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12}}>
                      <div style={{textAlign:'center' as const}}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
                        <div style={{fontSize:12,color:G,marginTop:6}}>Live · 5-second test</div>
                      </div>
                    </div>
                    <div style={{fontSize:13,color:MUT,marginBottom:12}}>Can you see the pitch? Adjust the camera angle if needed.</div>
                    <div style={{display:'flex',gap:8}}>
                      <button onClick={onDone ?? (() => t('Camera paired'))} style={{height: 44,padding:'0 20px',borderRadius:10,border:0,background:G,color:'#fff',fontFamily:'inherit',fontSize:13,fontWeight:700,cursor:'pointer'}}>Looks good</button>
                      <button onClick={()=>setStep(2)} style={{height: 44,padding:'0 14px',borderRadius:10,border:`1px solid ${LN}`,background:'#fff',color:MUT,fontFamily:'inherit',fontSize:13,cursor:'pointer'}}>Try another camera</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div>
          <div style={{background:'#fff',border:`1px solid ${LN}`,borderRadius:14,padding:'14px 16px'}}>
            <div style={{fontSize:13,fontWeight:700,color:MUT,marginBottom:12,letterSpacing:'0.06em',textTransform:'uppercase' as const}}>Good to know</div>
            {[
              {label:'Belongs to',value:'Academy'},
              {label:'Battery',value:'82% · 3 hours left'},
              {label:'One coach at a time',value:'Disconnects the last user'},
              {label:'Film consent',value:'Children without consent are blurred automatically'},
            ].map(item=>(
              <div key={item.label} style={{padding:'8px 0',borderTop:`1px solid ${LN}`}}>
                <div style={{fontSize:12,fontWeight:600,color:MUT,marginBottom:2}}>{item.label}</div>
                <div style={{fontSize:13,color:INK}}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:INK,color:'#fff',padding:'10px 20px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:1000,whiteSpace:'nowrap' as const}}>{toast}</div>}
    </div>
  )
}
