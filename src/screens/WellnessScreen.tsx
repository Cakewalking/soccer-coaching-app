import { useState } from 'react'

function Illus() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 4, flex: 'none' }}>
      {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => (
        <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: c }} />
      ))}
    </div>
  )
}

function Skel({ rows = 7 }: { rows?: number }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 8 }}>Fills in like this</div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} style={{ height: 44, border: '1px dashed #c5c8c4', borderRadius: 10, marginBottom: 6, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
          <div style={{ display: 'flex', gap: 4, flex: 'none' }}>
            {[0,1,2,3,4,5,6].map(j => <div key={j} style={{ width: 24, height: 14, borderRadius: 4, background: '#e9eae8' }} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

function WellnessEmpty() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Wellness</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>Check-ins are off</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20 }}>
          <Illus />
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Know how they're feeling</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>Players answer sleep, soreness, mood and energy on their phone before training and games. It takes 20 seconds.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => st('Turning on check-ins.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>
                Turn on check-ins
              </button>
              <button onClick={() => st('Opening example check-in.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See an example</button>
            </div>
          </div>
        </div>
        <Skel rows={7} />
      </div>
      <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>What you'll see</div>
        {[
          { icon: 'M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9zM13 2v7h7', title: "Who's low two days running", body: 'With a suggested next step' },
          { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8', title: "Parents see under 13s' answers", body: 'Coaches see the team' },
          { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Parents choose', body: 'Each family turns it on in consent' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg>
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.body}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 'auto', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>Under 13s answer with three picture questions, not four.</div>
      </aside>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </main>
  )
}

const DAYS = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU']

type Level = 'great' | 'good' | 'ok' | 'low' | 'none'

const PLAYERS: Array<{ ini: string; name: string; days: Level[]; note?: string }> = [
  { ini: 'EB', name: 'Ella Brandt',   days: ['good','good','ok','ok','low','low','low'],  note: 'Sleep and mood low' },
  { ini: 'MT', name: 'Mia Tran',      days: ['good','good','good','ok','ok','ok','ok'],   note: 'Legs heavy' },
  { ini: 'AL', name: 'Ava Lindqvist', days: ['good','good','good','ok','good','ok','ok'], note: 'Short on sleep' },
  { ini: 'NO', name: 'Noah Okafor',   days: ['good','good','good','good','ok','good','good'], note: 'Sore knee' },
  { ini: 'JP', name: 'Jai Patel',     days: ['good','good','good','good','good','good','good'] },
  { ini: 'LM', name: 'Leo Marsh',     days: ['good','good','good','great','good','good','good'] },
  { ini: 'GO', name: 'Grace Owusu',   days: ['good','good','good','good','good','good','good'] },
  { ini: 'KR', name: 'Kai Russo',     days: ['good','good','good','good','good','good','good'] },
  { ini: 'IM', name: 'Isla Morgan',   days: ['good','great','good','great','good','great','great'] },
  { ini: 'RC', name: 'Ruby Chen',     days: ['good','good','great','good','good','good','good'] },
  { ini: 'FW', name: 'Finn Walsh',    days: ['good','good','good','good','great','good','good'] },
  { ini: 'LN', name: 'Lily Nguyen',   days: ['good','good','good','good','good','good','good'] },
  { ini: 'OB', name: 'Oscar Brennan', days: ['good','good','good','good','good','good','good'] },
  { ini: 'TR', name: 'Tom Reyes',     days: ['ok','ok','good','good','good','good','good'] },
  { ini: 'SD', name: 'Sam Delaney',   days: ['good','good','good','good','good','none','none'], note: 'No check-in 2 days' },
  { ini: 'ZH', name: 'Zoe Hartley',  days: ['good','good','ok','ok','ok','none','none'],  note: 'No check-in 2 days' },
]

function levelColor(l: Level): string {
  if (l === 'great') return '#2f6252'
  if (l === 'good')  return '#7fb09d'
  if (l === 'ok')    return '#cbbeb5'
  if (l === 'low')   return '#c39797'
  return '#ffffff'
}

function levelBorder(l: Level): string {
  return l === 'none' ? '1.5px dashed #c5c8c4' : 'none'
}

function noteChipStyle(note: string) {
  if (note.includes('low') || note.includes('Low')) return { bg: '#c39797', color: '#10211f' }
  if (note.includes('No check')) return { bg: '#e9eae8', color: '#10211f' }
  return { bg: '#cbbeb5', color: '#10211f' }
}

export default function WellnessScreen({ empty }: { empty?: boolean }) {
  if (empty) return <WellnessEmpty />
  const [selIdx, setSelIdx] = useState(0)
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const sel = PLAYERS[selIdx]

  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 14, overflow: 'hidden' }}>

      {/* Left: heatmap */}
      <section style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 0, minHeight: 0, overflow: 'auto' }} aria-label="Wellness heatmap">

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Wellness</h1>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>14 of 16 checked in today · 4 quick questions before training and games</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => st('Opening what players answer.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>What players answer</button>
            <button onClick={() => st('Reminder sent to Sam and Zoe.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#ffffff' }}>Remind Sam and Zoe</button>
          </div>
        </div>

        {/* Table */}
        <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(7, 34px) minmax(0,1fr)', gap: 6, alignItems: 'center', height: 28, paddingBottom: 4, borderBottom: '1px solid #e9eae8' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Player · out of 5</span>
          {DAYS.map(d => <span key={d} style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57', textAlign: 'center' }}>{d}</span>)}
          <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57', paddingLeft: 8 }}>Note</span>
        </div>

        {PLAYERS.map((p, ri) => (
          <div key={ri} onClick={() => setSelIdx(ri)} style={{
            display: 'grid', gridTemplateColumns: '180px repeat(7, 34px) minmax(0,1fr)',
            gap: 6, alignItems: 'center', minHeight: 32,
            background: ri === selIdx ? '#eef5f2' : 'transparent',
            borderRadius: ri === selIdx ? 8 : 0,
            padding: ri === selIdx ? '0 8px' : '0',
            margin: ri === selIdx ? '2px -8px' : '0',
            cursor: 'pointer',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 24, height: 24, borderRadius: '999px', background: '#c39797', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</span>
              {p.name}
            </span>
            {p.days.map((d, di) => (
              <span key={di} style={{ height: 20, borderRadius: 5, background: levelColor(d), border: levelBorder(d), display: 'block', boxSizing: 'border-box' }} />
            ))}
            <span style={{ paddingLeft: 8 }}>
              {p.note && (() => { const c = noteChipStyle(p.note!); return (
                <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: c.bg, color: c.color, whiteSpace: 'nowrap' }}>{p.note}</span>
              )})()}
            </span>
          </div>
        ))}

        {/* Legend */}
        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#4a5a57', alignItems: 'center', marginTop: 'auto', paddingTop: 8 }}>
          {[['Great','#2f6252'],['Good','#7fb09d'],['OK','#cbbeb5'],['Low','#c39797']].map(([l,c]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 14, height: 14, borderRadius: 4, background: c, display: 'block' }} />{l}
            </span>
          ))}
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, background: '#ffffff', border: '1.5px dashed #c5c8c4', display: 'block', boxSizing: 'border-box' }} />No check-in
          </span>
        </div>
      </section>

      {/* Right: selected player */}
      <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'auto' }} aria-label={sel.name}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ flex: 'none', width: 46, height: 46, borderRadius: '999px', background: '#c39797', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>{sel.ini}</span>
          <span>
            <span style={{ display: 'block', fontSize: 19, fontWeight: 700, lineHeight: '25px' }}>{sel.name}</span>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>Low two days running</span>
          </span>
        </div>

        {[
          { label: 'Sleep',    score: 2, filled: 2 },
          { label: 'Soreness', score: 3, filled: 3 },
          { label: 'Mood',     score: 2, filled: 2 },
          { label: 'Energy',   score: 2, filled: 2 },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 38, borderTop: '1px solid #e9eae8' }}>
            <span style={{ flexGrow: 1, fontSize: 14 }}>{item.label}</span>
            <span style={{ display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ width: 16, height: 16, borderRadius: 4, background: i <= item.filled ? '#c39797' : '#e9eae8', display: 'block' }} />
              ))}
            </span>
            <span style={{ width: 24, textAlign: 'right', fontWeight: 700, fontSize: 14 }}>{item.score}</span>
          </div>
        ))}

        <div style={{ background: '#f6e9e9', borderRadius: 12, padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
          She wrote: "Not sleeping well this week." A quick chat before warm-up, and keep it light if she wants.
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => st('Opening message to her parent.')} style={{ height: 44, borderRadius: 12, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Message her parent
          </button>
          <span style={{ fontSize: 12, color: '#4a5a57', textAlign: 'center' }}>Answers are seen by her coaches and her parent. The club sees counts only.</span>
        </div>
      </aside>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </main>
  )
}
