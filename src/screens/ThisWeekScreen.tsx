import { useState } from 'react'
import { METRICS } from '../data'

function Illus() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 4, flex: 'none' }}>
      {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => (
        <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: c }} />
      ))}
    </div>
  )
}

function ThisWeekEmpty() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>This week</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>Nothing planned yet</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20 }}>
          <Illus />
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Your week at a glance</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>Once fixtures and training nights are in, each week shows what to work on, who's coming and how hard the week is.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => st('Opening training night setup.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
                Add training nights
              </button>
              <button onClick={() => st('Opening example week.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See an example</button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[70, 55, 65, 50, 60].map((w, i) => (
            <div key={i} style={{ height: 48, border: '1px dashed #c5c8c4', borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
              <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${w}%` }} />
              <div style={{ marginLeft: 'auto', width: 48, height: 10, borderRadius: 5, background: '#e9eae8', flex: 'none' }} />
            </div>
          ))}
        </div>
      </div>
      <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ fontSize: 15, fontWeight: 700 }}>How this week works</div>
        {[
          { title: 'Drills come from your games', body: 'After each recorded game, Clean Sheet picks what to fix next week.' },
          { title: "Who's doing what", body: 'Player load, sprint caps and wellness flags appear alongside drills.' },
          { title: 'Saturday prep', body: "By Friday night you'll see your predicted starting line-up and team talk cues." },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: '1px solid #f0f1ef' }}>
            <span style={{ flex: 'none', width: 8, height: 8, borderRadius: '999px', background: '#40826d', marginTop: 5 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '17px' }}>{item.body}</div>
            </div>
          </div>
        ))}
      </aside>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </main>
  )
}

const FOCUSES = [
  { n: 1, label: 'Win the ball back faster', sub: '7 s on Saturday · usual is 4' },
  { n: 2, label: 'Keep the lines close',      sub: '26 m gap · aim for 18 m' },
  { n: 3, label: 'Strong last 15 minutes',    sub: 'Sprints dropped 22% late' },
]

const DAYS = [
  {
    label: 'TUESDAY', date: '2 Jun', tag: 'Done', tagColor: '#40826d',
    items: ['Pressing and shape', 'Chase and tag · Win it back · Small game', 'Warm-up cut short by rain', '15 of 16 came · 13 rated effort, average 6', "Jess's note: Kai stopped, hamstring"],
  },
  {
    label: 'WEDNESDAY', date: '3 Jun', tag: null, tagColor: '',
    items: ['Rest', 'Wellness check-ins only', 'Ella low for the second day'],
  },
  {
    label: 'THURSDAY', date: '4 Jun', tag: 'Tonight', tagColor: '#2f6252',
    items: ['Repeat and finish', '5:45 · 11+ Kids warm-up with Priya', 'Rondo · Win it back · Small game', 'Noah and Zoe: 3 sprints · Kai: passing only', 'Mia late, about 6:10'],
  },
  {
    label: 'SATURDAY', date: '6 Jun', tag: 'Game', tagColor: '#c39797',
    items: ['vs Harbour Rovers', 'Home · meet 8:40 · kick-off 9:30', '12 in · 1 maybe · 2 out · 2 to answer', 'Team talk ready Friday night', 'Camera kit 1 booked by Rob'],
  },
  {
    label: 'NEXT TUESDAY', date: '9 Jun', tag: null, tagColor: '',
    items: ['Built after Saturday', 'Clean Sheet suggests it Sunday, once the review is in', 'Coach meeting at 7:30 pm'],
  },
]

const PLAYERS_TO_PLAN = [
  { ini: 'NO', label: 'Noah', note: 'Growing fast · 3 sprints Thursday, 8 Saturday', type: 'stone' as const },
  { ini: 'ZH', label: 'Zoe', note: 'Growing fast · same caps as Noah', type: 'stone' as const },
  { ini: 'EB', label: 'Ella', note: 'Low check-ins two days · lighter Thursday', type: 'rose' as const },
  { ini: 'KR', label: 'Kai', note: 'Tight hamstring · passing only, away Saturday', type: 'stone' as const },
]

function chipBg(t: 'rose' | 'stone') {
  return t === 'rose' ? '#fdf4f4' : '#f7f8f7'
}

export default function ThisWeekScreen({ empty, onDrillLibrary, onTonightsPlan, onGrowthLoad }: { empty?: boolean; onDrillLibrary?: () => void; onTonightsPlan?: () => void; onGrowthLoad?: () => void }) {
  if (empty) return <ThisWeekEmpty />
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ flex: 'none', padding: '14px 28px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>This week</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>Mon 2 to Sun 7 Jun · three things from Ironbark, worked on twice before Harbour Rovers</span>
          <div style={{ flexGrow: 1 }} />
          <button onClick={onDrillLibrary} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Drill library</button>
          <button onClick={onTonightsPlan} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#ffffff' }}>Tonight's plan</button>
        </div>

        {/* 3 focus banners */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, marginBottom: 14 }}>
          {FOCUSES.map(f => (
            <div key={f.n} style={{ background: '#2f6252', color: '#ffffff', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '999px', background: 'rgba(255,255,255,0.2)', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{f.n}</span>
              <span>
                <span style={{ display: 'block', fontSize: 14, fontWeight: 700, lineHeight: '19px' }}>{f.label}</span>
                <span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: '16px' }}>{f.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Day columns + right sidebar */}
      <div style={{ flexGrow: 1, minHeight: 0, padding: '0 28px 18px', display: 'flex', gap: 14, overflow: 'hidden' }}>

        {/* 5 day columns */}
        <div style={{ flexGrow: 1, minWidth: 0, display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 10, overflow: 'hidden' }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{
              background: '#ffffff', border: `1px solid ${d.tag === 'Tonight' ? '#2f6252' : '#c5c8c4'}`,
              borderRadius: 14, padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 6,
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#4a5a57', flexGrow: 1 }}>{d.label}</span>
                {d.tag && (
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: '999px', background: d.tagColor + '22', color: d.tagColor }}>{d.tag}</span>
                )}
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', color: '#10211f', marginBottom: 4 }}>{d.date}</div>
              {d.items.map((item, j) => (
                <div key={j} style={{ fontSize: 13, lineHeight: '18px', color: j === 0 ? '#10211f' : '#4a5a57', fontWeight: j === 0 ? 700 : 400 }}>{item}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Right sidebar */}
        <div style={{ flexShrink: 0, width: 230, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflowY: 'auto' }}>

          {/* How we'll know on Saturday */}
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 14, padding: '14px 14px', flex: 'none' }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' }}>How we'll know on Saturday</div>
            {METRICS.slice(0, 3).map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#10211f', lineHeight: '16px' }}>{m.label}</div>
                </div>
                <div style={{ flex: 'none', textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{m.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, padding: '1px 6px', borderRadius: '999px', background: m.statusType === 'good' ? '#40826d' : '#c39797', color: m.statusType === 'good' ? '#fff' : '#10211f', whiteSpace: 'nowrap' }}>{m.status}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Players to plan around */}
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 14, padding: '14px 14px', flex: 'none' }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' }}>Players to plan around</div>
            {PLAYERS_TO_PLAN.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none', alignItems: 'flex-start' }}>
                <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '999px', background: chipBg(p.type), fontSize: 11, fontWeight: 700, color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</span>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '16px', marginTop: 1 }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div style={{ flex: 'none', borderTop: '1px solid #e9eae8', padding: '10px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff' }}>
        <span style={{ fontSize: 13, color: '#4a5a57' }}>Load: two 90-minute sessions and a 60-minute game.</span>
        <button onClick={onGrowthLoad} style={{ border: 0, background: 'transparent', color: '#2f6252', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Growth and load →</button>
      </div>
    </div>
  )
}
