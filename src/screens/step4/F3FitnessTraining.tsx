const G = '#2f6252', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const DRILLS = [
  { time: '5:30', name: 'Dynamic warm-up', dur: '10 min', note: 'Light jog + mobility' },
  { time: '5:40', name: 'Rondo 4v2', dur: '12 min', note: 'Keep load low, moderate intensity' },
  { time: '5:52', name: 'Pressing patterns', dur: '15 min', note: 'High effort — watch Ruby' },
  { time: '6:07', name: 'SSG 5v5', dur: '18 min', note: 'Monitor Kai — modified only' },
  { time: '6:25', name: 'Finishing runs', dur: '10 min', note: 'Sprint volume low, game Sat' },
]

const WATCH = [
  { ini: 'KR', name: 'Kai Russo', tag: 'Modified', note: 'No sprints, no contact' },
  { ini: 'RC', name: 'Ruby Chen', note: 'Growth spurt — reduce jump load', tag: 'Watch' },
  { ini: 'NO', name: 'Noah Okafor', tag: 'Modified', note: 'Step 1 return to play' },
]

export default function F3FitnessTraining(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: G, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek · Fitness coach</div>
        {['Home','Squad','Training','Match day','Clips'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Training' ? 700 : 500, color: '#fff', background: n === 'Training' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Tonight's training</h1>
        <span style={{ fontSize: 14, color: MUT }}>Tue 10 Jun · 5:30 – 6:35 pm · Wattle Creek Oval, Pitch 2</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Session plan</div>
            {DRILLS.map((d, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '56px 1fr 80px 200px', alignItems: 'center', minHeight: 44, borderTop: `1px solid ${LN}`, fontSize: 14, gap: 12 }}>
                <span style={{ fontWeight: 700, color: MUT }}>{d.time}</span>
                <span style={{ fontWeight: 700 }}>{d.name}</span>
                <span style={{ color: MUT }}>{d.dur}</span>
                <span style={{ color: MUT, fontSize: 13 }}>{d.note}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff5e6', border: '1px solid #f0c070', borderRadius: 16, padding: '12px 16px', fontSize: 14, lineHeight: '20px' }}>
            <strong>Game Saturday.</strong> Keep session RPE at 6-7/10. Avoid max sprints and heavy lower-body plyometrics tonight.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Needs attention tonight</div>
            {WATCH.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, borderTop: `1px solid ${LN}`, paddingTop: 8, alignItems: 'flex-start' }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.ini}</span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <strong style={{ fontSize: 14 }}>{p.name}</strong>
                    <span style={{ padding: '1px 7px', borderRadius: 99, background: p.tag === 'Modified' ? '#fff0d4' : '#eef5f2', fontSize: 11, fontWeight: 700, color: p.tag === 'Modified' ? '#c06000' : G }}>{p.tag}</span>
                  </span>
                  <span style={{ fontSize: 13, color: MUT }}>{p.note}</span>
                </span>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Session targets</div>
            {[['Total time','65 min'],['Target RPE','6–7 / 10'],['Sprints','≤ 6 per player'],['Attending','14 of 16']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${LN}`, paddingTop: 6, fontSize: 14 }}>
                <span style={{ color: MUT }}>{k}</span><strong>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
