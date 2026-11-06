import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const ROSE = '#c39797'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'

interface Drill {
  id: string; name: string; category: string; time: number; players: string
  area?: string; ages?: string; isOurs?: boolean; featured?: boolean
  whySuggested?: string; howItWorks?: string[]; coachingPoints?: string[]
  makeEasier?: string; makeHarder?: string; checksNote?: string; basedOn?: string
}

const DRILLS: Drill[] = [
  { id:'1', name:'4 v 4 + 3 keep-ball', category:'With the ball', time:15, players:'11 players', area:'30 × 25 m', ages:'U11+', featured:true,
    whySuggested:'Saturday vs Ironbark United: gave the ball away in our half, 21 times. We aim for under 12.',
    howItWorks:['Two teams of 4 inside the square. 3 neutral players, one at each end and one in the middle, always play for the team with the ball. That makes it 7 v 4.','Make 6 passes in a row for a point.','Lose it and the other team is straight on the ball.'],
    coachingPoints:['Open your body so you can see both ends','Check your shoulder before the ball arrives','Pass to the free player, not the nearest one'],
    makeEasier:'Bigger square, as many touches as you like', makeHarder:'Two touches inside, one touch for neutrals',
    checksNote:'Clean Sheet checks: ball losses in our half and moves of 6+ passes, from the match camera',
    basedOn:'Based on: the positional rondo (4 v 4 + 3) used widely in youth academies' },
  { id:'2',  name:'Rondo, 5 v 2',                  category:'With the ball',    time:10, players:'7 players' },
  { id:'3',  name:'Play out from keeper, 6 v 4',   category:'With the ball',    time:20, players:'10 players', area:'30 × 25 m', ages:'U10+', featured:true,
    whySuggested:'Checks: goal kicks played short and ball losses in our half and moves of 5+ passes.' },
  { id:'4',  name:'First touch away from pressure', category:'Skills',           time:15, players:'Groups of 3', ages:'U8+', featured:true,
    whySuggested:'Checks: first touches under pressure.' },
  { id:'5',  name:'1 v 1 to gates',                category:'Skills',           time:15, players:'8–12 players' },
  { id:'6',  name:'Win it back in 6 seconds',       category:'Without the ball', time:25, players:'12 players' },
  { id:'7',  name:'Three-zone press',               category:'Without the ball', time:20, players:'14 players' },
  { id:'8',  name:'Small game, tight shape',        category:'Without the ball', time:30, players:'10 players' },
  { id:'9',  name:'Win it and go, 3 v 2',           category:'Win it',           time:15, players:'8 players' },
  { id:'10', name:'Recovery race',                  category:'Lose it',          time:10, players:'10 players' },
  { id:'11', name:'Finishing, 2 v 1 to goal',       category:'Skills',           time:15, players:'10 players' },
  { id:'12', name:'Switch the play, 5 v 3',         category:'Win it',           time:15, players:'12 players' },
]

const FIX_ITEMS = [
  { label:'Gave the ball away in our half', stat:'21 times · aim under 12' },
  { label:'Slow to win it back',            stat:'7 seconds · aim under 4' },
  { label:'Gap between defence and midfield', stat:'26m · aim under 18m' },
]

type Dot = [number, number, string]
const LAYOUTS: Record<string, Dot[]> = {
  '1':  [[.2,.2,'g'],[.5,.15,'g'],[.8,.2,'g'],[.2,.8,'g'],[.5,.85,'g'],[.8,.8,'g'],[.35,.5,'r'],[.65,.5,'r'],[.5,.3,'r'],[.5,.65,'k']],
  '2':  [[.2,.5,'g'],[.4,.2,'g'],[.4,.8,'g'],[.6,.35,'g'],[.6,.65,'g'],[.5,.5,'r'],[.72,.5,'r']],
  '3':  [[.12,.5,'g'],[.3,.3,'g'],[.3,.7,'g'],[.5,.2,'g'],[.5,.5,'g'],[.5,.8,'g'],[.7,.35,'r'],[.7,.65,'r'],[.82,.25,'r'],[.82,.75,'r']],
  '4':  [[.3,.5,'g'],[.6,.3,'g'],[.6,.7,'g']],
  '5':  [[.3,.5,'g'],[.65,.5,'r']],
  '6':  [[.2,.3,'r'],[.2,.5,'r'],[.2,.7,'r'],[.5,.4,'g'],[.5,.6,'g'],[.72,.5,'g']],
  '7':  [[.15,.5,'g'],[.3,.3,'g'],[.3,.7,'g'],[.5,.4,'g'],[.5,.6,'g'],[.65,.35,'r'],[.65,.65,'r'],[.8,.5,'r']],
  '8':  [[.2,.3,'g'],[.2,.7,'g'],[.5,.2,'g'],[.5,.5,'g'],[.5,.8,'g'],[.72,.35,'r'],[.72,.65,'r']],
  '9':  [[.25,.5,'g'],[.45,.35,'g'],[.45,.65,'g'],[.65,.35,'r'],[.78,.5,'r']],
  '10': [[.3,.5,'g'],[.55,.3,'g'],[.55,.7,'g'],[.78,.5,'r']],
  '11': [[.25,.5,'g'],[.45,.3,'g'],[.62,.5,'r'],[.82,.5,'k']],
  '12': [[.15,.3,'g'],[.15,.7,'g'],[.4,.2,'g'],[.4,.5,'g'],[.4,.8,'g'],[.6,.35,'r'],[.6,.65,'r'],[.78,.5,'r']],
}
const PASS_LINES: Record<string, [number,number,number,number][]> = {
  '1': [[.2,.2,.35,.5],[.35,.5,.5,.3]],
  '3': [[.12,.5,.3,.3],[.3,.3,.5,.2]],
  '4': [[.3,.5,.6,.3]],
  '9': [[.25,.5,.45,.35],[.45,.35,.65,.35]],
}

function PitchDiagram({ id, w = 110, h = 72 }: { id: string; w?: number; h?: number }) {
  const pts = LAYOUTS[id] ?? [[.3,.4,'g'],[.6,.4,'r'],[.5,.65,'g']]
  const lines = PASS_LINES[id] ?? []
  const r = Math.min(w, h) * 0.072
  return (
    <svg width={w} height={h} style={{ display:'block', background:'#eef4f1', borderRadius:5 }}>
      <rect x={w*.08} y={h*.1} width={w*.84} height={h*.8} rx={2} fill="none" stroke="#c5d4cd" strokeWidth={1} strokeDasharray="3 2"/>
      {lines.map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={w*x1} y1={h*y1} x2={w*x2} y2={h*y2} stroke={G} strokeWidth={1.2} strokeDasharray="4 2" opacity={.6}/>
      ))}
      {pts.map(([x,y,t], i) => (
        <circle key={i} cx={w*x} cy={h*y} r={r}
          fill={t==='g'?G : t==='r'?ROSE : t==='k'?'#1a1a1a' : '#888'}
          stroke="#fff" strokeWidth={.8}/>
      ))}
    </svg>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, height:20, padding:'0 8px', borderRadius:999, background:'#eef5f2', color:G, fontSize:11, fontWeight:700, whiteSpace:'nowrap' }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:G2, flexShrink:0 }}/>
      {label}
    </span>
  )
}

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
          <button key={o} onClick={() => toggle(o)} style={{ height:32, padding:'0 14px', borderRadius:999, border:`1px solid ${on?G2:LN}`, background:on?G:'#fff', color:on?'#fff':MUT, fontSize:13, fontWeight:on?600:400, cursor:'pointer', fontFamily:'inherit' }}>
            {o}
          </button>
        )
      })}
    </div>
  )
}

// ── Wizard steps ───────────────────────────────────────────────────────────

function WizStep1({ name, onName, players, onPlayers, time, onTime, area, onArea, ages, onAges, kit, onKit }: {
  name:string; onName:(v:string)=>void; players:number; onPlayers:(v:number)=>void
  time:number; onTime:(v:number)=>void; area:string; onArea:(v:string|string[])=>void
  ages:string[]; onAges:(v:string|string[])=>void; kit:string[]; onKit:(v:string|string[])=>void
}) {
  return (
    <div style={{ display:'flex', gap:48, padding:'40px 60px' }}>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, fontWeight:700, color:G2, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>Step 1 of 4 · The basics</div>
        <h2 style={{ margin:'0 0 28px', fontSize:28, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>What's your drill called?</h2>
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
            <Tag label="Our drill"/>
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
      <h2 style={{ margin:'0 0 20px', fontSize:28, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>Show the players how it works</h2>
      <div style={{ display:'flex', gap:10, marginBottom:20 }}>
        {['Draw it','From our clips','Upload a video','Photo of a whiteboard'].map((t, i) => (
          <button key={t} style={{ display:'flex', alignItems:'center', gap:6, height:36, padding:'0 16px', border:`1px solid ${i===0?G2:LN}`, borderRadius:999, background:i===0?'#f0f8f4':'#fff', color:i===0?G:MUT, fontSize:13, fontWeight:i===0?600:400, cursor:'pointer', fontFamily:'inherit' }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ display:'flex', gap:16 }}>
        <div style={{ width:130, flexShrink:0 }}>
          {tools.map(t => {
            const on = activeTool === t
            const dotColor = t==='Our player'?G : t==='Opponent'?ROSE : t==='Ball'?'#1a1a1a' : '#aaa'
            return (
              <button key={t} onClick={() => setActiveTool(t)} style={{ width:'100%', height:40, border:`1px solid ${on?G2:LN}`, borderRadius:8, background:on?G:'#fff', color:on?'#fff':INK, fontSize:13, fontWeight:on?600:400, cursor:'pointer', fontFamily:'inherit', marginBottom:6, display:'flex', alignItems:'center', gap:10, padding:'0 12px', boxSizing:'border-box' }}>
                <span style={{ width:10, height:10, borderRadius:'50%', background:on?'#fff':dotColor, flexShrink:0 }}/>
                {t}
              </button>
            )
          })}
          <div style={{ display:'flex', gap:6, marginTop:4 }}>
            <button style={{ flex:1, height:34, border:`1px solid ${LN}`, borderRadius:8, background:'#fff', color:MUT, fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>Undo</button>
            <button style={{ flex:1, height:34, border:`1px solid ${LN}`, borderRadius:8, background:'#fff', color:MUT, fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>Clear</button>
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
    { label:'Not playing out from the back',    desc:'Measured by goal kicks played short · Match camera', stat:'' },
    { label:'Not enough shots',                 desc:'Measured by shots on target · Match camera', stat:'' },
  ]
  return (
    <div style={{ display:'flex', gap:40, padding:'40px 60px' }}>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, fontWeight:700, color:G2, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>Step 3 of 4 · What it fixes</div>
        <h2 style={{ margin:'0 0 8px', fontSize:28, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>When should Clean Sheet suggest it?</h2>
        <p style={{ margin:'0 0 24px', fontSize:14, color:MUT }}>Pick the moment it trains, then the problems it helps fix.</p>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
          {cats.map(c => {
            const on = category === c
            return (
              <button key={c} onClick={() => setCategory(c)} style={{ display:'flex', alignItems:'center', gap:6, height:32, padding:'0 14px', borderRadius:999, border:`1px solid ${on?G2:LN}`, background:on?G:'#fff', color:on?'#fff':MUT, fontSize:13, fontWeight:on?600:400, cursor:'pointer', fontFamily:'inherit' }}>
                {on && <span style={{ width:8, height:8, borderRadius:'50%', background:'#fff', flexShrink:0 }}/>}
                {c}
              </button>
            )
          })}
        </div>
        {problems.map(p => {
          const on = checked.includes(p.label)
          return (
            <div key={p.label} onClick={() => setChecked(c => on ? c.filter(x => x !== p.label) : [...c, p.label])}
              style={{ display:'flex', alignItems:'flex-start', gap:14, padding:16, border:`1px solid ${on?G2:LN}`, borderRadius:10, background:on?'#f0f8f4':'#fff', cursor:'pointer', marginBottom:10 }}>
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
        <h2 style={{ margin:'0 0 24px', fontSize:28, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>How do you run it?</h2>
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:600, color:INK, marginBottom:12 }}>How it works <span style={{ fontWeight:400, color:MUT }}>up to 3 steps</span></div>
          {[
            'Four players keep the ball around the square.',
            "Pass through a cone gate for a point. Can't use the same gate twice.",
            'One defender in the middle tries to block the gates.',
          ].map((ph, i) => (
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
        {([['me','Just me','Only you see it in Our drills'],['all','All Wattle Creek coaches','6 coaches across U9 to U14']] as const).map(([v,label,desc]) => (
          <div key={v} onClick={() => setSharing(v)} style={{ display:'flex', gap:14, padding:14, border:`2px solid ${sharing===v?G2:LN}`, borderRadius:10, background:sharing===v?'#f0f8f4':'#fff', cursor:'pointer', marginBottom:10 }}>
            <div style={{ width:20, height:20, borderRadius:'50%', border:`2px solid ${sharing===v?G2:'#c5c8c4'}`, background:sharing===v?G2:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
              {sharing===v && <div style={{ width:6, height:6, borderRadius:'50%', background:'#fff' }}/>}
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:INK }}>{label}</div>
              <div style={{ fontSize:12, color:MUT, marginTop:2 }}>{desc}</div>
            </div>
          </div>
        ))}
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
      <h2 style={{ margin:'0 0 12px', fontSize:28, fontWeight:700, color:INK, letterSpacing:'-0.02em', textAlign:'center' }}>{displayName} is in Our drills</h2>
      <p style={{ margin:'0 0 32px', fontSize:15, color:MUT, textAlign:'center', lineHeight:1.6, maxWidth:420 }}>Every coach at Wattle Creek can use it now. Clean Sheet will suggest it after a game when the problem shows up.</p>
      <div style={{ display:'flex', gap:12, marginBottom:40 }}>
        <button onClick={onAddToSession} style={{ height:44, padding:'0 24px', border:'none', borderRadius:999, background:G, color:'#fff', fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Add to a session</button>
        <button onClick={onBackToLibrary} style={{ height:44, padding:'0 24px', border:`1px solid ${LN}`, borderRadius:999, background:'#fff', color:INK, fontSize:15, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>Back to library</button>
      </div>
      <div style={{ border:`1px solid ${LN}`, borderRadius:12, overflow:'hidden', width:280, background:'#fff' }}>
        <PitchDiagram id="1" w={280} h={160}/>
        <div style={{ padding:'14px 16px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
            <div style={{ fontSize:16, fontWeight:700, color:INK }}>{displayName}</div>
            <Tag label="Our drill"/>
          </div>
          <div style={{ fontSize:13, color:MUT, marginBottom:10 }}>15 min · 8 players · 30 × 25 m</div>
          <div style={{ background:'#f0f8f4', borderRadius:8, padding:12 }}>
            <div style={{ fontSize:11, fontWeight:700, color:G2, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Suggested when</div>
            <div style={{ fontSize:13, color:INK }}>We give the ball away more than 12 times in our half.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Wizard shell ───────────────────────────────────────────────────────────
interface WizProps {
  step: number; done: boolean
  name:string; onName:(v:string)=>void
  players:number; onPlayers:(v:number)=>void
  time:number; onTime:(v:number)=>void
  area:string; onArea:(v:string|string[])=>void
  ages:string[]; onAges:(v:string|string[])=>void
  kit:string[]; onKit:(v:string|string[])=>void
  onNext:()=>void; onBack:()=>void; onCancel:()=>void
  onAddToSession:()=>void; onBackToLibrary:()=>void
}

function WizardShell(p: WizProps) {
  const footerNote = p.step===1?'Everything else is optional.':p.step===2?'Players see this on the tablet before the drill starts.':p.step===3?'You can skip this. The drill still saves.':'Saved drills can be edited any time.'
  return (
    <div style={{ position:'fixed', inset:0, background:'#fff', display:'flex', flexDirection:'column', zIndex:500, fontFamily:'inherit' }}>
      {/* Header */}
      <div style={{ height:56, background:GD, display:'flex', alignItems:'center', padding:'0 28px', gap:12, flexShrink:0 }}>
        <span style={{ fontSize:19, fontWeight:700, color:'#fff', letterSpacing:'-0.02em' }}>Clean Sheet</span>
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
          <button onClick={p.onCancel} style={{ display:'flex', alignItems:'center', gap:6, height:32, padding:'0 14px', border:'1px solid rgba(255,255,255,.3)', borderRadius:999, background:'transparent', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            {p.done ? 'Close' : 'Cancel'}
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex:1, overflowY:'auto' }}>
        {p.done  ? <WizDone name={p.name} onAddToSession={p.onAddToSession} onBackToLibrary={p.onBackToLibrary}/> :
         p.step===1 ? <WizStep1 name={p.name} onName={p.onName} players={p.players} onPlayers={p.onPlayers} time={p.time} onTime={p.onTime} area={p.area} onArea={p.onArea} ages={p.ages} onAges={p.onAges} kit={p.kit} onKit={p.onKit}/> :
         p.step===2 ? <WizStep2/> :
         p.step===3 ? <WizStep3/> :
                      <WizStep4/>}
      </div>

      {/* Footer */}
      {!p.done && (
        <div style={{ height:60, borderTop:`1px solid ${LN}`, display:'flex', alignItems:'center', padding:'0 28px', gap:12, flexShrink:0 }}>
          <button onClick={p.onBack} style={{ display:'flex', alignItems:'center', gap:8, height:38, padding:'0 18px', border:`1px solid ${LN}`, borderRadius:999, background:'#fff', color:INK, fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <span style={{ fontSize:13, color:MUT }}>{footerNote}</span>
          <div style={{ flexGrow:1 }}/>
          <button onClick={p.onNext} style={{ display:'flex', alignItems:'center', gap:8, height:38, padding:'0 20px', border:'none', borderRadius:999, background:G, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            {p.step===4 ? 'Save drill' : 'Next'}
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}
    </div>
  )
}

// ── Drill detail ───────────────────────────────────────────────────────────
function DrillDetail({ drill, onBack }: { drill: Drill; onBack: ()=>void }) {
  const [showSession, setShowSession] = useState(false)
  const [sessionSlot, setSessionSlot] = useState(0)

  return (
    <div style={{ flex:1, overflowY:'auto', padding:'20px 28px', position:'relative' }}>
      <button onClick={onBack} style={{ display:'flex', alignItems:'center', gap:6, border:'none', background:'none', cursor:'pointer', color:MUT, fontSize:13, fontFamily:'inherit', padding:'0 0 14px' }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Drill library
      </button>

      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
        <h1 style={{ margin:0, fontSize:26, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>{drill.name}</h1>
        <Tag label={drill.category}/>
        <div style={{ flexGrow:1 }}/>
        <button style={{ height:36, padding:'0 16px', border:`1px solid ${LN}`, borderRadius:999, background:'#fff', color:INK, fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>
          Save
        </button>
        <button onClick={() => setShowSession(true)} style={{ height:36, padding:'0 16px', border:'none', borderRadius:999, background:G, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:8 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Add to a session
        </button>
      </div>

      <div style={{ display:'flex', gap:32 }}>
        {/* Left */}
        <div style={{ width:280, flexShrink:0 }}>
          <PitchDiagram id={drill.id} w={280} h={180}/>
          <div style={{ marginTop:12, display:'flex', gap:14, flexWrap:'wrap', fontSize:12, color:MUT }}>
            {[['g','Us'],['r','Them'],['k','Ball']].map(([t,label]) => (
              <span key={t} style={{ display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ width:10, height:10, borderRadius:'50%', background:t==='g'?G:t==='r'?ROSE:'#1a1a1a', display:'inline-block' }}/>
                {label}
              </span>
            ))}
            <span>— Pass</span>
            <span>-- Run</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:16 }}>
            {[['Players',drill.players],['Area',drill.area||'—'],['Time',`${drill.time} min`],['Ages',drill.ages||'—']].map(([k,v]) => (
              <div key={k} style={{ background:'#f7faf8', borderRadius:8, padding:'10px 12px' }}>
                <div style={{ fontSize:11, color:MUT, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:2 }}>{k}</div>
                <div style={{ fontSize:14, fontWeight:600, color:INK }}>{v}</div>
              </div>
            ))}
          </div>
          {drill.id==='1' && (
            <div style={{ marginTop:16, background:'#f7faf8', borderRadius:8, padding:14, display:'flex', gap:12, alignItems:'center' }}>
              <div style={{ width:36, height:36, borderRadius:999, background:GD, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:INK }}>Show the team before you start</div>
                <div style={{ fontSize:12, color:MUT }}>Opens the diagram and a clip of us doing it well against Ironbark.</div>
              </div>
              <button style={{ height:28, padding:'0 12px', border:`1px solid ${LN}`, borderRadius:999, background:'#fff', color:INK, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', flexShrink:0 }}>Show</button>
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ flex:1 }}>
          {drill.whySuggested && (
            <div style={{ background:'#f0f8f4', borderRadius:10, padding:16, marginBottom:20 }}>
              <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:G2, marginBottom:6 }}>Why it's suggested</div>
              <div style={{ fontSize:14, color:INK, lineHeight:1.6 }}>{drill.whySuggested}</div>
            </div>
          )}
          {drill.howItWorks && (
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:16, fontWeight:700, color:INK, marginBottom:12 }}>How it works</div>
              {drill.howItWorks.map((step, i) => (
                <div key={i} style={{ display:'flex', gap:12, marginBottom:10 }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:G, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0, marginTop:1 }}>{i+1}</div>
                  <div style={{ fontSize:14, color:INK, lineHeight:1.6 }}>{step}</div>
                </div>
              ))}
            </div>
          )}
          {drill.coachingPoints && (
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:16, fontWeight:700, color:INK, marginBottom:12 }}>Coaching points</div>
              {drill.coachingPoints.map((p, i) => (
                <div key={i} style={{ display:'flex', gap:10, marginBottom:8, fontSize:14, color:INK }}>
                  <span style={{ color:G2, fontWeight:700 }}>•</span>{p}
                </div>
              ))}
            </div>
          )}
          {(drill.makeEasier || drill.makeHarder) && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
              {[['Make it easier',drill.makeEasier],['Make it harder',drill.makeHarder]].map(([k,v]) => v ? (
                <div key={k}>
                  <div style={{ fontSize:12, fontWeight:600, color:MUT, marginBottom:4 }}>{k}</div>
                  <div style={{ fontSize:13, color:INK }}>{v}</div>
                </div>
              ) : null)}
            </div>
          )}
          {drill.checksNote && <div style={{ borderTop:`1px solid ${LN}`, paddingTop:14, fontSize:13, color:MUT, lineHeight:1.6, marginBottom:8 }}>{drill.checksNote}</div>}
          {drill.basedOn && <div style={{ fontSize:12, color:MUT }}>{drill.basedOn}</div>}
        </div>
      </div>

      {/* Add to session modal */}
      {showSession && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.35)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
          <div style={{ background:'#fff', borderRadius:14, padding:28, width:480, boxShadow:'0 20px 60px rgba(0,0,0,.2)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <div style={{ fontSize:17, fontWeight:700, color:INK }}>{drill.name} · {drill.time} min</div>
              <button onClick={() => setShowSession(false)} style={{ width:28, height:28, border:`1px solid ${LN}`, borderRadius:999, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:20 }}>
              {[['Tonight · Thu 6:00 pm','4 drills · 75 min planned'],['Tue 10 Nov · 6:00 pm','Not planned yet']].map(([title,sub], i) => (
                <div key={i} style={{ padding:14, borderRadius:10, border:`2px solid ${i===0?G2:LN}`, background:i===0?'#f0f8f4':'#fff' }}>
                  <div style={{ fontSize:14, fontWeight:700, color:INK }}>{title}</div>
                  <div style={{ fontSize:12, color:MUT, marginTop:3 }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:14, fontWeight:600, color:INK, marginBottom:12 }}>Where should it go?</div>
            {[
              'Swap for "Warm-up rondo, 5 v 2" (10 min)',
              'Swap for "Win it back in 6 seconds" (25 min)',
              'Swap for "Small game, tight shape" (30 min)',
              'Add it before the cool-down',
            ].map((label, i) => {
              const times = ['80 min','65 min','60 min','90 min']
              return (
                <div key={i} onClick={() => setSessionSlot(i)} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 0', borderBottom:i<3?`1px solid ${LN}`:'none', cursor:'pointer' }}>
                  <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${sessionSlot===i?G2:LN}`, background:sessionSlot===i?G2:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {sessionSlot===i && <div style={{ width:6, height:6, borderRadius:'50%', background:'#fff' }}/>}
                  </div>
                  <div style={{ flex:1, fontSize:14, color:INK }}>{label}</div>
                  <div style={{ fontSize:13, color:MUT, fontWeight:600 }}>{times[i]}</div>
                </div>
              )
            })}
            <div style={{ marginTop:16, padding:12, background:'#f7faf8', borderRadius:8, marginBottom:12 }}>
              <div style={{ fontSize:12, color:MUT, marginBottom:8 }}>Tonight's plan with this drill <strong style={{ color:INK }}>80 min (was 75)</strong></div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {['4 v 4 + 3 keep-ball','Win it back in 6 seconds','Small game, tight shape','Cool-down and stretch'].map((s, i) => (
                  <div key={i} style={{ padding:'4px 10px', background:i===0?G:LN, color:i===0?'#fff':MUT, borderRadius:6, fontSize:12, fontWeight:i===0?700:400 }}>{s}</div>
                ))}
              </div>
            </div>
            <div style={{ fontSize:12, color:MUT, marginBottom:20 }}>Player load stays within plan. Fitness can see the change.</div>
            <div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>
              <button onClick={() => setShowSession(false)} style={{ height:40, padding:'0 20px', border:`1px solid ${LN}`, borderRadius:999, background:'#fff', color:INK, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
              <button style={{ height:40, padding:'0 24px', border:'none', borderRadius:999, background:G, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Add to tonight</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main screen ────────────────────────────────────────────────────────────
export default function DrillLibraryScreen() {
  const [view, setView]     = useState<'library'|'detail'|'wizard'|'done'>('library')
  const [drill, setDrill]   = useState<Drill|null>(null)
  const [filterTab, setFTab] = useState(0)
  const [category, setCat]  = useState('All')
  const [wizStep, setWStep] = useState(1)
  const [wizName, setWName] = useState('')
  const [wizPlayers, setWP] = useState(8)
  const [wizTime, setWT]    = useState(15)
  const [wizArea, setWA]    = useState('30 × 25 m')
  const [wizAges, setWAges] = useState<string[]>([])
  const [wizKit, setWKit]   = useState<string[]>(['Balls'])

  const openDrill = (d: Drill) => { setDrill(d); setView('detail') }
  const openWiz   = () => { setView('wizard'); setWStep(1) }
  const closeWiz  = () => { setView('library'); setWStep(1) }

  if (view === 'wizard' || view === 'done') {
    return (
      <WizardShell
        step={wizStep} done={view==='done'}
        name={wizName} onName={setWName}
        players={wizPlayers} onPlayers={setWP}
        time={wizTime} onTime={setWT}
        area={wizArea} onArea={v => setWA(Array.isArray(v)?v[0]:v)}
        ages={wizAges} onAges={v => setWAges(Array.isArray(v)?v:[v])}
        kit={wizKit}   onKit={v => setWKit(Array.isArray(v)?v:[v])}
        onNext={() => { if(wizStep<4) setWStep(s=>s+1); else setView('done') }}
        onBack={() => { if(wizStep>1) setWStep(s=>s-1); else closeWiz() }}
        onCancel={closeWiz}
        onAddToSession={closeWiz}
        onBackToLibrary={closeWiz}
      />
    )
  }

  if (view === 'detail' && drill) {
    return <DrillDetail drill={drill} onBack={() => setView('library')}/>
  }

  const filtered = DRILLS.filter(d =>
    (filterTab===0 ? true : filterTab===1 ? d.isOurs : false) &&
    (category==='All' ? true : d.category===category)
  )
  const featured = DRILLS.filter(d => d.featured)

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Header bar */}
      <div style={{ padding:'20px 28px 0', display:'flex', alignItems:'center', gap:16, flexShrink:0 }}>
        <div>
          <div style={{ fontSize:24, fontWeight:700, color:INK, letterSpacing:'-0.02em' }}>Drill library</div>
          <div style={{ fontSize:13, color:MUT, marginTop:2 }}>12 drills · 2 of ours</div>
        </div>
        <div style={{ flexGrow:1 }}/>
        <div style={{ position:'relative' }}>
          <svg style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><circle cx={11} cy={11} r={8}/><path d="M21 21l-4.3-4.3"/></svg>
          <input placeholder="Search drills" style={{ height:36, paddingLeft:32, paddingRight:14, borderRadius:999, border:`1px solid ${LN}`, fontSize:14, fontFamily:'inherit', outline:'none', width:200, color:INK }}/>
        </div>
        <button onClick={openWiz} style={{ height:36, padding:'0 16px', borderRadius:999, border:'none', background:G, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:8 }}>
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Add your own drill
        </button>
      </div>

      <div style={{ flex:1, display:'flex', gap:0, overflow:'hidden', padding:'16px 28px 24px' }}>
        {/* Suggested panel */}
        <div style={{ width:168, flexShrink:0, marginRight:20 }}>
          <div style={{ background:G, borderRadius:10, padding:14, color:'#fff' }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', opacity:.7, marginBottom:8 }}>Suggested for you</div>
            <div style={{ fontSize:13, fontWeight:600, lineHeight:1.4, marginBottom:14 }}>What to fix from Saturday vs Ironbark United</div>
            {FIX_ITEMS.map((f, i) => (
              <div key={i} style={{ marginBottom:i<2?12:0 }}>
                <div style={{ fontSize:12, fontWeight:600 }}>{f.label}</div>
                <div style={{ fontSize:11, opacity:.7, marginTop:2 }}>{f.stat}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:16 }}>
          {/* Featured drills */}
          <div style={{ background:'#fff', borderRadius:10, border:`1px solid ${LN}`, padding:16 }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
              <p style={{ margin:0, fontSize:13, color:MUT, maxWidth:460, lineHeight:1.5 }}>
                Most were short passes under pressure from their front three. Keep-ball games build calm first touches and scanning.
              </p>
              <button style={{ fontSize:13, color:G2, fontWeight:600, border:'none', background:'none', cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap', flexShrink:0 }}>Watch 6 clips</button>
            </div>
            <div style={{ display:'flex', gap:12 }}>
              {featured.map(d => (
                <button key={d.id} onClick={() => openDrill(d)} style={{ flex:1, textAlign:'left', padding:0, border:`1px solid ${LN}`, borderRadius:8, background:'#fff', cursor:'pointer', overflow:'hidden', fontFamily:'inherit' }}>
                  <PitchDiagram id={d.id} w={160} h={100}/>
                  <div style={{ padding:'10px 12px' }}>
                    <div style={{ fontSize:13, fontWeight:600, color:INK, marginBottom:4 }}>{d.name}</div>
                    <div style={{ fontSize:12, color:MUT, marginBottom:4 }}>{d.time} min · {d.players}{d.area?` · ${d.area}`:''}</div>
                    {d.whySuggested && <div style={{ fontSize:11, color:MUT }}>{d.whySuggested.substring(0,50)}…</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{ display:'flex', borderBottom:`1px solid ${LN}` }}>
            {[['All drills','14'],['Our drills','2'],['Saved','3']].map(([label,count], i) => (
              <button key={i} onClick={() => setFTab(i)} style={{ height:40, padding:'0 16px', border:'none', background:'none', cursor:'pointer', fontFamily:'inherit', fontSize:14, fontWeight:filterTab===i?600:400, color:filterTab===i?INK:MUT, borderBottom:filterTab===i?`2px solid ${G2}`:'2px solid transparent', display:'flex', alignItems:'center', gap:6 }}>
                {label} <span style={{ fontSize:12, color:MUT }}>{count}</span>
              </button>
            ))}
          </div>

          {/* Category chips */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {['All','With the ball','Without the ball','Win it','Lose it','Skills'].map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ height:32, padding:'0 14px', borderRadius:999, border:`1px solid ${category===c?G2:LN}`, background:category===c?G:'#fff', color:category===c?'#fff':MUT, fontSize:13, fontWeight:category===c?600:400, cursor:'pointer', fontFamily:'inherit' }}>
                {c}
              </button>
            ))}
          </div>

          {/* Drill grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
            {filtered.map(d => (
              <button key={d.id} onClick={() => openDrill(d)} style={{ textAlign:'left', padding:0, border:`1px solid ${LN}`, borderRadius:8, background:'#fff', cursor:'pointer', overflow:'hidden', fontFamily:'inherit' }}>
                <PitchDiagram id={d.id} w={150} h={90}/>
                <div style={{ padding:'10px 12px' }}>
                  <div style={{ fontSize:13, fontWeight:600, color:INK, marginBottom:5 }}>{d.name}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                    {d.isOurs && <Tag label="Our drill"/>}
                    <span style={{ fontSize:12, color:MUT }}>{d.category}</span>
                    <span style={{ fontSize:12, color:MUT }}>· {d.time} min</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
