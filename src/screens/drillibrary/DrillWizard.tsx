import { useState } from 'react'
import { G, G2, GD, INK, MUT, LN } from './data'
import PitchDiagram from './PitchDiagram'

function Stepper({ value, min=1, max=99, onChange, suffix='' }: { value:number; min?:number; max?:number; onChange:(v:number)=>void; suffix?:string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', border:`1px solid ${LN}`, borderRadius:10, overflow:'hidden', height:44 }}>
      <button onClick={() => onChange(Math.max(min, value-1))} style={{ width:44, height:'100%', border:'none', background:'#f7faf8', cursor:'pointer', fontSize:20, color:MUT, fontFamily:'inherit' }}>−</button>
      <div style={{ flex:1, textAlign:'center', fontSize:15, fontWeight:600, color:INK }}>{value}{suffix}</div>
      <button onClick={() => onChange(Math.min(max, value+1))} style={{ width:44, height:'100%', border:'none', background:'#f7faf8', cursor:'pointer', fontSize:20, color:MUT, fontFamily:'inherit' }}>+</button>
    </div>
  )
}

function Chips({ options, value, onChange, multi=false }: { options:string[]; value:string|string[]; onChange:(v:string|string[])=>void; multi?:boolean }) {
  const active = Array.isArray(value) ? value : [value]
  const toggle = (opt: string) => {
    if (multi) {
      const arr = active.includes(opt) ? active.filter(a => a !== opt) : [...active, opt]
      onChange(arr)
    } else {
      onChange(opt)
    }
  }
  return (
    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
      {options.map(o => {
        const on = active.includes(o)
        return (
          <button key={o} onClick={() => toggle(o)} style={{ height: 44, padding:'0 14px', borderRadius:999, border:`1px solid ${on?G2:LN}`, background:on?G:'#fff', color:on?'#fff':MUT, fontSize:13, fontWeight:on?600:400, cursor:'pointer', fontFamily:'inherit' }}>
            {o}
          </button>
        )
      })}
    </div>
  )
}

function WizStep1({ name, onName, players, onPlayers, time, onTime, area, onArea, ages, onAges, kit, onKit }: {
  name:string; onName:(v:string)=>void; players:number; onPlayers:(v:number)=>void
  time:number; onTime:(v:number)=>void; area:string; onArea:(v:string|string[])=>void
  ages:string[]; onAges:(v:string|string[])=>void; kit:string[]; onKit:(v:string|string[])=>void
}) {
  return (
    <div style={{ display:'flex', gap:48, padding:'40px 60px' }}>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, fontWeight:700, color:G2, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>Step 1 of 4 · The basics</div>
        <h2 style={{ margin:'0 0 28px', fontSize:28, fontWeight:700, color:INK }}>What's your drill called?</h2>
        <div style={{ marginBottom:22 }}>
          <label style={{ display:'block', fontSize:13, fontWeight:600, color:MUT, marginBottom:8 }}>Name</label>
          <input value={name} onChange={e => onName(e.target.value)} placeholder="Gate passing"
            style={{ width:'100%', height:46, padding:'0 16px', border:`1px solid ${LN}`, borderRadius:10, fontSize:16, fontFamily:'inherit', outline:'none', color:INK, boxSizing:'border-box' }}/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:22 }}>
          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:MUT, marginBottom:8 }}>Players</label>
            <Stepper value={players} onChange={onPlayers}/>
          </div>
          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:MUT, marginBottom:8 }}>Time</label>
            <Stepper value={time} min={5} max={120} onChange={onTime} suffix=" min"/>
          </div>
        </div>
        <div style={{ marginBottom:18 }}>
          <label style={{ display:'block', fontSize:13, fontWeight:600, color:MUT, marginBottom:8 }}>Area</label>
          <Chips options={['10 × 10 m','20 × 20 m','30 × 25 m','Half pitch']} value={area} onChange={onArea}/>
        </div>
        <div style={{ marginBottom:18 }}>
          <label style={{ display:'block', fontSize:13, fontWeight:600, color:MUT, marginBottom:4 }}>Ages <span style={{ fontWeight:400 }}>pick any</span></label>
          <Chips options={['U8 to U10','U11 to U13','U14+']} value={ages} onChange={onAges} multi/>
        </div>
        <div>
          <label style={{ display:'block', fontSize:13, fontWeight:600, color:MUT, marginBottom:4 }}>Kit <span style={{ fontWeight:400 }}>pick any</span></label>
          <Chips options={['Balls','Bibs','Cones','Mini goals','Big goals']} value={kit} onChange={onKit} multi/>
        </div>
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ fontSize:12, fontWeight:600, color:MUT, marginBottom:12, textAlign:'center' }}>How it shows in the library</div>
        <div style={{ border:`1px solid ${LN}`, borderRadius:10, overflow:'hidden' }}>
          <PitchDiagram id="new" w={220} h={138}/>
          <div style={{ padding:'12px 14px' }}>
            <div style={{ fontSize:14, fontWeight:700, color:INK, marginBottom:4 }}>{name || 'Gate passing'}</div>
            <div style={{ fontSize:12, color:MUT, marginBottom:8 }}>{time} min · {players} players · {area}</div>
            <span style={{ display:'inline-flex', alignItems:'center', gap:4, height:20, padding:'0 8px', borderRadius:999, background:'#eef5f2', color:G, fontSize:11, fontWeight:700 }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:G2 }}/>Our drill
            </span>
          </div>
        </div>
        <div style={{ fontSize:12, color:MUT, textAlign:'center', marginTop:12, lineHeight:1.6 }}>You'll draw it in the next step. Only the name is needed to save.</div>
      </div>
    </div>
  )
}

function WizStep2() {
  const [activeTool, setActiveTool] = useState('Our player')
  const tools = ['Our player','Opponent','Cone','Ball','— Pass','-- Run']
  return (
    <div style={{ padding:'40px 60px' }}>
      <div style={{ fontSize:12, fontWeight:700, color:G2, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>Step 2 of 4 · Show it</div>
      <h2 style={{ margin:'0 0 20px', fontSize:28, fontWeight:700, color:INK }}>Show the players how it works</h2>
      <div style={{ display:'flex', gap:10, marginBottom:20 }}>
        {['Draw it','From our clips','Upload a video','Photo of a whiteboard'].map((t, i) => (
          <button key={t} style={{ display:'flex', alignItems:'center', gap:6, height: 44, padding:'0 16px', border:`1px solid ${i===0?G2:LN}`, borderRadius:999, background:i===0?'#f0f8f4':'#fff', color:i===0?G:MUT, fontSize:13, fontWeight:i===0?600:400, cursor:'pointer', fontFamily:'inherit' }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ display:'flex', gap:16 }}>
        <div style={{ width:130, flexShrink:0 }}>
          {tools.map(t => {
            const on = activeTool === t
            const dotColor = t==='Our player'?G : t==='Opponent'?'#c39797' : t==='Ball'?'#1a1a1a' : '#aaa'
            return (
              <button key={t} onClick={() => setActiveTool(t)} style={{ width:'100%', height: 44, border:`1px solid ${on?G2:LN}`, borderRadius:8, background:on?G:'#fff', color:on?'#fff':INK, fontSize:13, fontWeight:on?600:400, cursor:'pointer', fontFamily:'inherit', marginBottom:6, display:'flex', alignItems:'center', gap:10, padding:'0 12px', boxSizing:'border-box' }}>
                <span style={{ width:10, height:10, borderRadius:'50%', background:on?'#fff':dotColor, flexShrink:0 }}/>
                {t}
              </button>
            )
          })}
          <div style={{ display:'flex', gap:6, marginTop:4 }}>
            <button style={{ flex:1, height: 44, border:`1px solid ${LN}`, borderRadius:8, background:'#fff', color:MUT, fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>Undo</button>
            <button style={{ flex:1, height: 44, border:`1px solid ${LN}`, borderRadius:8, background:'#fff', color:MUT, fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>Clear</button>
          </div>
        </div>
        <div style={{ flex:1, minHeight:300, background:'#f0f4f2', borderRadius:12, border:`2px dashed #c5d4cd`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
          <PitchDiagram id="1" w={500} h={280}/>
          <div style={{ position:'absolute', bottom:12, fontSize:12, color:MUT }}>Tap the pitch to add: {activeTool.toLowerCase()}. Hold anything to move or delete it.</div>
        </div>
      </div>
    </div>
  )
}

function WizStep3() {
  const [category, setCategory] = useState('With the ball')
  const [checked, setChecked] = useState(['Giving the ball away in our half'])
  const cats = ['With the ball','Without the ball','When we win it','When we lose it','Skills']
  const problems = [
    { label:'Giving the ball away in our half', desc:'Measured by ball losses in our half · Match camera', stat:'Last game: 21' },
    { label:'Not playing out from the back', desc:'Measured by goal kicks played short · Match camera', stat:'' },
    { label:'Not enough shots', desc:'Measured by shots on target · Match camera', stat:'' },
  ]
  return (
    <div style={{ display:'flex', gap:40, padding:'40px 60px' }}>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, fontWeight:700, color:G2, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>Step 3 of 4 · What it fixes</div>
        <h2 style={{ margin:'0 0 8px', fontSize:28, fontWeight:700, color:INK }}>When should Clean Sheet suggest it?</h2>
        <p style={{ margin:'0 0 24px', fontSize:14, color:MUT }}>Pick the moment it trains, then the problems it helps fix.</p>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
          {cats.map(c => {
            const on = category === c
            return (
              <button key={c} onClick={() => setCategory(c)} style={{ display:'flex', alignItems:'center', gap:6, height: 44, padding:'0 14px', borderRadius:999, border:`1px solid ${on?G2:LN}`, background:on?G:'#fff', color:on?'#fff':MUT, fontSize:13, fontWeight:on?600:400, cursor:'pointer', fontFamily:'inherit' }}>
                {on && <span style={{ width:8, height:8, borderRadius:'50%', background:'#fff', flexShrink:0 }}/>}
                {c}
              </button>
            )
          })}
        </div>
        {problems.map(p => {
          const on = checked.includes(p.label)
          return (
            <div key={p.label} onClick={() => setChecked(c => on ? c.filter(x => x !== p.label) : [...c, p.label])} style={{ display:'flex', alignItems:'flex-start', gap:14, padding:16, border:`1px solid ${on?G2:LN}`, borderRadius:10, background:on?'#f0f8f4':'#fff', cursor:'pointer', marginBottom:10 }}>
              <div style={{ width:20, height:20, borderRadius:4, border:`2px solid ${on?G2:'#c5c8c4'}`, background:on?G2:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                {on && <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:INK }}>{p.label}</div>
                <div style={{ fontSize:12, color:MUT, marginTop:3 }}>{p.desc}</div>
              </div>
              {p.stat && <span style={{ fontSize:12, color:MUT, background:'#f0f4f2', padding:'3px 8px', borderRadius:6, flexShrink:0 }}>{p.stat}</span>}
            </div>
          )
        })}
      </div>
      <div style={{ width:240, flexShrink:0 }}>
        <div style={{ background:GD, borderRadius:10, padding:16, color:'#fff' }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', opacity:.7, marginBottom:12 }}>Clean Sheet will suggest it when</div>
          {checked.length === 0
            ? <div style={{ fontSize:13, opacity:.6 }}>Nothing selected yet.</div>
            : checked.map(c => (
              <div key={c} style={{ display:'flex', gap:8, fontSize:13, marginBottom:8 }}>
                <span style={{ color:'#7bd4b4', flexShrink:0 }}>•</span>
                <span>We give the ball away more than 12 times in our half.</span>
              </div>
            ))
          }
          <div style={{ marginTop:12, fontSize:12, opacity:.6, lineHeight:1.6 }}>Thresholds come from your targets in Home › Our style.</div>
        </div>
      </div>
    </div>
  )
}

function WizStep4() {
  const [sharing, setSharing] = useState<'me'|'all'>('all')
  return (
    <div style={{ display:'flex', gap:40, padding:'40px 60px' }}>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, fontWeight:700, color:G2, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>Step 4 of 4 · Coaching points</div>
        <h2 style={{ margin:'0 0 24px', fontSize:28, fontWeight:700, color:INK }}>How do you run it?</h2>
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:600, color:INK, marginBottom:12 }}>How it works <span style={{ fontWeight:400, color:MUT }}>up to 3 steps</span></div>
          {['Four players keep the ball around the square.','Pass through a cone gate for a point. Can\'t use the same gate twice.','One defender in the middle tries to block the gates.'].map((ph, i) => (
            <div key={i} style={{ display:'flex', gap:12, marginBottom:10, alignItems:'center' }}>
              <div style={{ width:26, height:26, borderRadius:'50%', background:G, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, flexShrink:0 }}>{i+1}</div>
              <input style={{ flex:1, height:44, padding:'0 14px', border:`1px solid ${LN}`, borderRadius:10, fontSize:14, fontFamily:'inherit', outline:'none', color:INK }} placeholder={ph}/>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:14, fontWeight:600, color:INK, marginBottom:12 }}>Coaching points <span style={{ fontWeight:400, color:MUT }}>what you'll shout from the side</span></div>
          {['Look up before you receive','Pass firm through the gate'].map((ph, i) => (
            <input key={i} style={{ display:'block', width:'100%', height:44, padding:'0 14px', border:`1px solid ${LN}`, borderRadius:10, fontSize:14, fontFamily:'inherit', outline:'none', color:INK, marginBottom:10, boxSizing:'border-box' }} placeholder={ph}/>
          ))}
        </div>
      </div>
      <div style={{ width:260, flexShrink:0 }}>
        <div style={{ marginBottom:18 }}>
          <label style={{ display:'block', fontSize:13, fontWeight:600, color:MUT, marginBottom:8 }}>Make it easier</label>
          <input style={{ width:'100%', height:44, padding:'0 14px', border:`1px solid ${LN}`, borderRadius:10, fontSize:14, fontFamily:'inherit', outline:'none', color:INK, boxSizing:'border-box' }} placeholder="No defender"/>
        </div>
        <div style={{ marginBottom:24 }}>
          <label style={{ display:'block', fontSize:13, fontWeight:600, color:MUT, marginBottom:8 }}>Make it harder</label>
          <input style={{ width:'100%', height:44, padding:'0 14px', border:`1px solid ${LN}`, borderRadius:10, fontSize:14, fontFamily:'inherit', outline:'none', color:INK, boxSizing:'border-box' }} placeholder="Two defenders, two touches max"/>
        </div>
        <div style={{ fontSize:14, fontWeight:600, color:INK, marginBottom:12 }}>Who can use it?</div>
        {(['me','all'] as const).map(v => {
          const label = v==='me' ? 'Just me' : 'All Wattle Creek coaches'
          const desc  = v==='me' ? 'Only you see it in Our drills' : '6 coaches across U9 to U14'
          return (
            <div key={v} onClick={() => setSharing(v)} style={{ display:'flex', gap:14, padding:14, border:`2px solid ${sharing===v?G2:LN}`, borderRadius:10, background:sharing===v?'#f0f8f4':'#fff', cursor:'pointer', marginBottom:10 }}>
              <div style={{ width:20, height:20, borderRadius:'50%', border:`2px solid ${sharing===v?G2:'#c5c8c4'}`, background:sharing===v?G2:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                {sharing===v && <div style={{ width:6, height:6, borderRadius:'50%', background:'#fff' }}/>}
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:INK }}>{label}</div>
                <div style={{ fontSize:12, color:MUT, marginTop:2 }}>{desc}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WizDone({ name, onAddToSession, onBackToLibrary }: { name:string; onAddToSession:()=>void; onBackToLibrary:()=>void }) {
  const displayName = name || 'Gate passing'
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'calc(100vh - 116px)', padding:40 }}>
      <div style={{ width:64, height:64, borderRadius:'50%', background:G, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24 }}>
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <h2 style={{ margin:'0 0 12px', fontSize:28, fontWeight:700, color:INK, textAlign:'center' }}>{displayName} is in Our drills</h2>
      <p style={{ margin:'0 0 32px', fontSize:15, color:MUT, textAlign:'center', lineHeight:1.6, maxWidth:420 }}>Every coach at Wattle Creek can use it now. Clean Sheet will suggest it after a game when the problem shows up.</p>
      <div style={{ display:'flex', gap:12, marginBottom:40 }}>
        <button onClick={onAddToSession} style={{ height:44, padding:'0 24px', border:'none', borderRadius:999, background:G, color:'#fff', fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Add to a session</button>
        <button onClick={onBackToLibrary} style={{ height:44, padding:'0 24px', border:`1px solid ${LN}`, borderRadius:999, background:'#fff', color:INK, fontSize:15, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>Back to library</button>
      </div>
      <div style={{ background:'#f0f8f4', borderRadius:10, padding:14, maxWidth:360, textAlign:'center' }}>
        <div style={{ fontSize:12, fontWeight:700, color:G2, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Saved to Our drills</div>
        <div style={{ fontSize:13, color:INK }}>{displayName} · 15 min · 8 players</div>
      </div>
    </div>
  )
}

interface WizShellProps {
  step:number; done:boolean
  name:string; onName:(v:string)=>void
  players:number; onPlayers:(v:number)=>void
  time:number; onTime:(v:number)=>void
  area:string; onArea:(v:string|string[])=>void
  ages:string[]; onAges:(v:string|string[])=>void
  kit:string[]; onKit:(v:string|string[])=>void
  onNext:()=>void; onBack:()=>void; onCancel:()=>void
  onAddToSession:()=>void; onBackToLibrary:()=>void
}

export default function DrillWizard(p: WizShellProps) {
  const footerNote = p.step===1?'Everything else is optional.':p.step===2?'Players see this on the tablet before the drill starts.':p.step===3?'You can skip this. The drill still saves.':'Saved drills can be edited any time.'
  return (
    <div style={{ position:'fixed', inset:0, background:'#fff', display:'flex', flexDirection:'column', zIndex:500, fontFamily:'inherit' }}>
      <div style={{ height:56, background:GD, display:'flex', alignItems:'center', padding:'0 28px', gap:12, flexShrink:0 }}>
        <span style={{ fontSize:19, fontWeight:700, color:'#fff' }}>Clean Sheet</span>
        {!p.done && (
          <>
            <span style={{ color:'rgba(255,255,255,.4)', fontSize:16 }}>|</span>
            <span style={{ fontSize:14, color:'rgba(255,255,255,.8)', fontWeight:500 }}>Add your own drill</span>
            <div style={{ marginLeft:16, flex:1, maxWidth:200 }}>
              <div style={{ height:4, borderRadius:999, background:'rgba(255,255,255,.2)' }}>
                <div style={{ height:'100%', borderRadius:999, background:'rgba(255,255,255,.85)', width:`${(p.step/4)*100}%`, transition:'width .3s' }}/>
              </div>
            </div>
          </>
        )}
        <div style={{ marginLeft:'auto' }}>
          <button onClick={p.onCancel} style={{ display:'flex', alignItems:'center', gap:6, height: 44, padding:'0 14px', border:'1px solid rgba(255,255,255,.3)', borderRadius:999, background:'transparent', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            {p.done ? 'Close' : 'Cancel'}
          </button>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto' }}>
        {p.done  ? <WizDone name={p.name} onAddToSession={p.onAddToSession} onBackToLibrary={p.onBackToLibrary}/> :
         p.step===1 ? <WizStep1 name={p.name} onName={p.onName} players={p.players} onPlayers={p.onPlayers} time={p.time} onTime={p.onTime} area={p.area} onArea={p.onArea} ages={p.ages} onAges={p.onAges} kit={p.kit} onKit={p.onKit}/> :
         p.step===2 ? <WizStep2/> :
         p.step===3 ? <WizStep3/> :
                      <WizStep4/>}
      </div>
      {!p.done && (
        <div style={{ height:60, borderTop:`1px solid ${LN}`, display:'flex', alignItems:'center', padding:'0 28px', gap:12, flexShrink:0 }}>
          <button onClick={p.onBack} style={{ display:'flex', alignItems:'center', gap:8, height: 44, padding:'0 18px', border:`1px solid ${LN}`, borderRadius:999, background:'#fff', color:INK, fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <span style={{ fontSize:13, color:MUT }}>{footerNote}</span>
          <div style={{ flexGrow:1 }}/>
          <button onClick={p.onNext} style={{ display:'flex', alignItems:'center', gap:8, height: 44, padding:'0 20px', border:'none', borderRadius:999, background:G, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            {p.step===4 ? 'Save drill' : 'Next'}
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}
    </div>
  )
}
