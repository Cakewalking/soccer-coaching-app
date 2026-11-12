import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const FOCUS_POINTS = [
  { n: 1, title: 'Win the ball back faster', reason: '7 s on Saturday · usual is 4 s', drills: '1 drill tonight', color: '#40826d' },
  { n: 2, title: 'Keep defence and midfield closer', reason: '25 m gap before 6 of 8 chances', drills: '1 drill tonight', color: '#2f6252' },
  { n: 3, title: 'Strong last 15 minutes', reason: 'Sprints dropped 22% after min 45', drills: 'Fixed with subs', color: '#1f4a3e' },
]

const DRILLS = [
  { start: '5:45', mins: 10, tag: 'Warm-up', name: 'Warm-up rondo, 5 v 2', why: 'Gets passing sharp and starts the pressing habit early.', setup: ['7 per group', '10 × 10 m', 'Bibs, 1 ball'], color: '#cbbeb5' },
  { start: '6:00', mins: 25, tag: 'Focus 1', name: 'Win it back in 6 seconds', why: 'We took 7 seconds to win the ball back on Saturday; our usual is 4.', setup: ['8 v 8', '40 × 30 m', 'Bibs, cones'], color: '#40826d', textColor: '#fff', adjust: 'Noah and Zoe: 3 sprints max' },
  { start: '6:25', mins: 30, tag: 'Focus 2', name: 'Small game, tight shape', why: 'The gap between our lines was over 25 m before 6 of their 8 chances.', setup: ['7 v 7 + GKs', 'Half pitch, 3 zones', 'Goals, cones'], color: '#2f6252', textColor: '#fff', adjust: 'Mia: first 15 minutes only' },
  { start: '6:55', mins: 10, tag: 'Recovery', name: 'Cool-down and stretch', why: 'Good recovery after a hard night keeps legs fresh for Saturday.', setup: ['Whole squad', 'Centre circle', 'No kit'], color: '#e9eae8' },
]

export default function T3TrainingTab(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button onClick={() => st('Opening team selector.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === "Tonight's session" ? INK : MUT, borderBottom: `3px solid ${n === "Tonight's session" ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
        </div>
      </div>

      <div style={{ flex: 'none', padding: '12px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Training tonight · 5:45–7:05 pm</div>
          <div style={{ fontSize: 14, color: MUT }}>Wattle Creek Reserve · 16 players · 80 minutes · 2 days to Harbour Rovers</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => st('Opening team talk.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>Team talk</button>
          <button onClick={() => st('Opening plan editor.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>Edit plan</button>
          <button onClick={() => st('Starting session.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>▶ Start session</button>
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '300px minmax(0,1fr)', gap: 18 }}>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: '#40826d', color: '#fff', padding: '10px 14px' }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Why this plan</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>3 fixes from Saturday vs Ironbark</div>
            </div>
            {FOCUS_POINTS.map(f => (
              <div key={f.n} style={{ display: 'flex', gap: 10, padding: '10px 14px', borderTop: `1px solid ${LN}`, cursor: 'pointer' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: f.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flex: 'none' }}>{f.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{f.reason}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: G }}>{f.drills}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '10px 14px', flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Adjust tonight</div>
            {[['MT', 'Mia', 'first 15 min of small game only'], ['NO', 'Noah', 'skip sprint drills, 3 max'], ['EB', 'Ella', 'quick chat before warm-up']].map(([ini, name, todo]) => (
              <div key={ini} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 32 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#c39797', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flex: 'none' }}>{ini}</div>
                <div style={{ fontSize: 13 }}><strong>{name}</strong> · {todo}</div>
              </div>
            ))}
          </div>
        </aside>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {DRILLS.map(d => (
            <div key={d.name} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '10px 14px', display: 'flex', gap: 14, alignItems: 'center', flex: 1 }}>
              <div style={{ flex: 'none', width: 60 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{d.start}</div>
                <div style={{ fontSize: 12, color: MUT }}>{d.mins} min</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, background: d.color, color: d.textColor || INK, borderRadius: 999, padding: '1px 8px' }}>{d.tag}</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{d.name}</div>
                </div>
                <div style={{ fontSize: 13, color: MUT }}><strong style={{ color: G }}>Why:</strong> {d.why}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' as const }}>
                  {d.setup.map(s => <div key={s} style={{ fontSize: 12, background: '#f7f8f7', border: `1px solid ${LN}`, borderRadius: 6, padding: '1px 8px', color: MUT }}>{s}</div>)}
                  {(d as any).adjust && <div style={{ fontSize: 12, background: '#c39797', borderRadius: 6, padding: '1px 8px', fontWeight: 600 }}>{(d as any).adjust}</div>}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
