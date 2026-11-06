const FOCUSES = [
  { n: 1, label: 'Win the ball back faster', sub: '7 s on Saturday · usual is 4' },
  { n: 2, label: 'Keep the lines close',      sub: '26 m gap · aim for 18 m' },
  { n: 3, label: 'Strong last 15 minutes',    sub: 'Sprints dropped 22% late' },
]

const DAYS = [
  {
    label: 'TUESDAY', date: '3 Nov', tag: 'Done', tagColor: '#40826d',
    items: ['Pressing and shape', 'Chase and tag · Win it back · Small game', 'Warm-up cut short by rain', '15 of 16 came · 13 rated effort, average 6', "Jess's note: Kai stopped, hamstring"],
  },
  {
    label: 'WEDNESDAY', date: '4 Nov', tag: null,
    items: ['Rest', 'Wellness check-ins only', 'Ella low for the second day'],
  },
  {
    label: 'THURSDAY', date: '5 Nov', tag: 'Tonight', tagColor: '#2f6252',
    items: ['Repeat and finish', '5:45 · 11+ Kids warm-up with Priya', 'Rondo · Win it back · Small game', 'Noah and Zoe: 3 sprints · Kai passing only', 'Mia late, about 6:10'],
  },
  {
    label: 'SATURDAY', date: '7 Nov', tag: 'Game', tagColor: '#c39797',
    items: ['vs Harbour Rovers', 'Home · meet 8:40 · kick-off 9:30', '12 in · 1 maybe · 2 out · 2 to answer', 'Team talk ready Friday night', 'Camera kit 1 booked by Rob'],
  },
  {
    label: 'NEXT TUESDAY', date: '10 Nov', tag: null,
    items: ['Built after Saturday', 'Clean Sheet suggests it Sunday, once the review is in', 'Coach meeting at 7:30 pm'],
  },
]

export default function ThisWeekScreen() {
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ flex: 'none', padding: '14px 28px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>This week</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>Mon 2 to Sun 8 Nov · three things from Ironbark, worked on twice before Harbour Rovers</span>
          <div style={{ flexGrow: 1 }} />
          <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Drill library</button>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#ffffff' }}>Tonight's plan</button>
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

      {/* Day columns */}
      <div style={{ flexGrow: 1, minHeight: 0, padding: '0 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 10, overflow: 'hidden' }}>
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

      {/* Footer bar */}
      <div style={{ flex: 'none', borderTop: '1px solid #e9eae8', padding: '10px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff' }}>
        <span style={{ fontSize: 13, color: '#4a5a57' }}>Load this week: two 75-minute sessions and one 50-minute game. Growing players have sprints capped in both sessions.</span>
        <button style={{ border: 0, background: 'transparent', color: '#2f6252', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Growth and load →</button>
      </div>
    </div>
  )
}
