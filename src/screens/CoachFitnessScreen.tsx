import { useState } from 'react'

const ALERTS = [
  { ini: 'WC', sender: 'Wellness check-ins', time: '7:30 am', text: 'Ella has felt low two days running', dot: true },
  { ini: 'DT', sender: 'Data', time: '7:12 am', text: '3 GPS vests didn\'t sync', dot: true },
  { ini: 'CS', sender: 'Clean Sheet · Growth', time: 'Yesterday', text: 'Noah and Zoe are growing fast: sprint caps suggested', dot: false },
]

const METRICS = [
  { label: 'Winning the ball back', value: '7 s', note: 'Needs work', warn: true },
  { label: 'Pressing wins in their half', value: '13', note: 'Getting better', warn: false },
  { label: 'Passes per sequence', value: '4.2', note: 'On target', warn: false },
  { label: 'Chances created', value: '8', note: 'Getting better', warn: false },
]

const WEEK = [
  { day: 'Mon 1', label: 'Rest' },
  { day: 'Tue 2', label: 'Training · done' },
  { day: 'Wed 3', label: 'Rest' },
  { day: 'Thu 4', label: 'Training 5:45 pm', active: true },
  { day: 'Fri 5', label: 'Rest' },
  { day: 'Sat 6', label: 'Harbour Rovers 9:30' },
  { day: 'Sun 7', label: 'Review, once it\'s in' },
]

const RESULTS = ['W', 'W', 'D', 'L', 'W']

export default function CoachFitnessScreen() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, padding: '16px 28px 20px', boxSizing: 'border-box', overflow: 'hidden' }}>

      {/* Left column */}
      <div style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Needs you */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e9eae8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Needs you</span>
              <span style={{ background: '#c39797', color: '#10211f', borderRadius: '999px', padding: '0 8px', fontSize: 12, fontWeight: 700, lineHeight: '20px' }}>3 new</span>
            </div>
          </div>
          {ALERTS.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderTop: i === 0 ? 'none' : '1px solid #e9eae8', cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: '999px', background: i === 0 ? '#c39797' : i === 1 ? '#cbbeb5' : '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10211f', flex: 'none' }}>{a.ini}</div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{a.sender}</span>
                  <span style={{ fontSize: 12, color: '#6f7f7b' }}>{a.time}</span>
                  {a.dot && <span style={{ width: 7, height: 7, borderRadius: '999px', background: '#c39797', flex: 'none' }} />}
                </div>
                <span style={{ fontSize: 14, color: '#4a5a57' }}>{a.text}</span>
              </div>
            </div>
          ))}
          <div style={{ padding: '10px 16px', borderTop: '1px solid #e9eae8' }}>
            <button onClick={() => st('Opening all messages.')} style={{ border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#2f6252', cursor: 'pointer', padding: 0 }}>All messages · 3 more</button>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Where we're at, on the ball and growing</span>
            <span style={{ fontSize: 13, color: '#6f7f7b' }}>All 4</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {METRICS.map((m, i) => (
              <div key={i} style={{ background: '#f5f6f4', borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 4 }}>{m.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' as const }}>
                  <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: m.warn ? '#7a3838' : '#10211f' }}>{m.value}</span>
                  {m.warn
                    ? <span style={{ display: 'inline-block', background: '#c39797', color: '#10211f', borderRadius: 999, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>{m.note}</span>
                    : <span style={{ fontSize: 13, fontWeight: 600, color: '#2f6252' }}>{m.note}</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training tonight */}
        <div style={{ background: '#1f4a3e', borderRadius: 16, padding: '16px 18px', color: '#fff' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>TODAY · 5:45 pm · Wattle Creek Reserve</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Training tonight</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 10 }}>90 minutes · warm-up, 4 drills and sprint caps built in</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            {['Win the ball back faster', 'Cap sprints for growing players', 'Strong last 15 minutes'].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '999px', background: 'rgba(255,255,255,0.5)', flex: 'none' }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => st('Opening training plan.')} style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: '#40826d', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Open training plan</button>
            <button onClick={() => st('Opening team talk.')} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Team talk</button>
          </div>
        </div>

        {/* Last game */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 6 }}>Last game · Sat 30 May · away</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#2f6252', flex: 'none' }}>W</span>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Ironbark United <span style={{ fontWeight: 400, color: '#4a5a57' }}>3–1</span></div>
              <div style={{ fontSize: 13, color: '#4a5a57' }}>Mia, Jai and Zoe scored</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { text: 'Pressing high worked: 13 wins in their half', label: 'Keep' },
              { text: '7 seconds to win the ball back, usually 4', label: 'Tonight' },
              { text: '26 m gap between defence and midfield', label: 'Tonight' },
            ].map((n, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: '999px', background: n.label === 'Keep' ? '#eef5f2' : '#fff9f5', color: n.label === 'Keep' ? '#2f6252' : '#c39797', flex: 'none' }}>{n.label}</span>
                <span style={{ fontSize: 14, color: '#4a5a57' }}>{n.text}</span>
              </div>
            ))}
          </div>
          <button onClick={() => st('Opening the review.')} style={{ marginTop: 12, height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Open the review</button>
          <span style={{ marginLeft: 12, fontSize: 13, color: '#6f7f7b' }}>Clips · 7</span>
        </div>
      </div>

      {/* Right column */}
      <div style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* This week */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>This week</div>
          {WEEK.map((w, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, borderTop: i === 0 ? 'none' : '1px solid #f5f5f4', background: w.active ? '#f0f8f4' : 'transparent', borderRadius: w.active ? 8 : 0, margin: w.active ? '0 -6px' : 0, padding: w.active ? '6px 6px' : '6px 0' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#6f7f7b', width: 44, flex: 'none' }}>{w.day}</span>
              <span style={{ fontSize: 13, color: w.active ? '#10211f' : '#4a5a57', fontWeight: w.active ? 600 : 400 }}>{w.label}</span>
            </div>
          ))}
        </div>

        {/* Last 5 */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Last 5</span>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>3rd of 10</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            {RESULTS.map((r, i) => (
              <span key={i} style={{ width: 32, height: 32, borderRadius: 8, background: r === 'W' ? '#eef5f2' : r === 'L' ? '#fdf5f0' : '#f5f5f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: r === 'W' ? '#2f6252' : r === 'L' ? '#c39797' : '#6f7f7b' }}>{r}</span>
            ))}
          </div>
          <div style={{ fontSize: 13, color: '#4a5a57' }}>Next: Sat 9:30 vs Harbour Rovers</div>
        </div>

        {/* Squad */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Squad</span>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>Home · 12 in, 2 out, 3 to answer</span>
          </div>
          {[
            { label: '17 players', sub: '', color: '#10211f' },
            { label: '12 ready', sub: 'availability answered', color: '#2f6252' },
            { label: '4 manage', sub: 'load cap or return plan', color: '#c39797' },
            { label: '1 check in', sub: 'wellness concern', color: '#9d7c80' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: i === 0 ? 'none' : '1px solid #f5f5f4' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: s.color, minWidth: 72 }}>{s.label}</span>
              {s.sub && <span style={{ fontSize: 13, color: '#6f7f7b' }}>{s.sub}</span>}
            </div>
          ))}
        </div>

        {/* Growth note */}
        <div style={{ background: '#eef5f2', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1f4a3e', marginBottom: 6 }}>Sprint caps active</div>
          <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '1.5', marginBottom: 10 }}>Noah and Zoe are in a growth spurt. Sprint load is capped automatically tonight. The cap lifts when growth slows.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ ini: 'NO', name: 'Noah Okafor' }, { ini: 'ZH', name: 'Zoe Hartley' }].map(p => (
              <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', borderRadius: 8, padding: '6px 10px' }}>
                <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{p.ini}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
