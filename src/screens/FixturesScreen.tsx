const RESULTS = [
  { date: 'Sat 31 Oct', opp: 'Ironbark United', ha: 'A', score: '3–1', result: 'W' },
  { date: 'Sat 24 Oct', opp: 'Saltmarsh',       ha: 'A', score: '1–2', result: 'L' },
  { date: 'Sat 17 Oct', opp: 'Northcote',        ha: 'H', score: '1–1', result: 'D' },
  { date: 'Sat 10 Oct', opp: 'Bayside',          ha: 'A', score: '2–0', result: 'W' },
  { date: 'Sat 3 Oct',  opp: 'Kestrel Park',     ha: 'H', score: '3–1', result: 'W' },
  { date: 'Sat 26 Sep', opp: 'Lyndhurst SC',     ha: 'A', score: '2–1', result: 'W' },
  { date: 'Sat 19 Sep', opp: 'Riverside',        ha: 'A', score: '0–2', result: 'L' },
  { date: 'Sat 12 Sep', opp: 'Banksia FC',       ha: 'H', score: '4–2', result: 'W' },
]

const COMING_UP = [
  { date: 'SAT\n7',  venue: 'vs Harbour Rovers',   sub: '9:30 · meet 8:40 · away kit', note: 'Rob booked camera' },
  { date: 'SAT\n14', venue: 'at Kestrel Park',      sub: '9:00 · their ground',          note: '' },
  { date: 'SAT\n21', venue: 'at Banksia FC',         sub: '9:00',                          note: '' },
  { date: 'SAT\n28', venue: 'vs Riverside',          sub: '9:30',                          note: '' },
]

const LADDER = [
  { pos: 1, name: 'Saltmarsh',       played: 8, pts: 20 },
  { pos: 2, name: 'Riverside',       played: 8, pts: 19 },
  { pos: 3, name: 'Wattle Creek',    played: 8, pts: 16, us: true },
  { pos: 4, name: 'Ironbark United', played: 8, pts: 14 },
  { pos: 5, name: 'Kestrel Park',    played: 8, pts: 12 },
  { pos: 6, name: 'Harbour Rovers',  played: 8, pts: 11 },
]

function resultDot(r: string) {
  if (r === 'W') return { bg: '#2f6252', color: '#ffffff' }
  if (r === 'L') return { bg: '#c39797', color: '#10211f' }
  return { bg: '#cbbeb5', color: '#10211f' }
}

export default function FixturesScreen() {
  return (
    <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>

      {/* Left: results table */}
      <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Fixtures and results</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>U12 Mixed · 3rd of 10 · 16 points from 8 games · 2 × 25 minutes, 9 a side</span>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Sync to my calendar</button>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#ffffff' }}>+ Add a fixture</button>
        </div>

        <div style={{ flex: '0 1 auto', minHeight: 0, overflow: 'auto', background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '110px minmax(0,1fr) 36px minmax(0,80px) 48px', gap: 12, alignItems: 'center', height: 44, borderBottom: '1px solid #e9eae8', position: 'sticky', top: 0, background: '#ffffff', zIndex: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>Date</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>Opponent</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57', textAlign: 'center' }}>H/A</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>Score</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57', textAlign: 'center' }}>Result</span>
          </div>
          {RESULTS.map((r, i) => {
            const c = resultDot(r.result)
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px minmax(0,1fr) 36px minmax(0,80px) 48px', gap: 12, alignItems: 'center', minHeight: 48, borderTop: '1px solid #f0f1ef', cursor: 'pointer' }}>
                <span style={{ fontSize: 13, color: '#4a5a57' }}>{r.date}</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{r.opp}</span>
                <span style={{ fontSize: 13, color: '#6f7f7b', textAlign: 'center' }}>{r.ha}</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{r.score}</span>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ width: 32, height: 32, borderRadius: '999px', background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>{r.result}</span>
                </span>
              </div>
            )
          })}
          <div style={{ padding: '12px 0', fontSize: 12, color: '#4a5a57', borderTop: '1px solid #e9eae8' }}>5 wins, 1 draw, 2 losses · 16 goals for, 10 against · every game recorded</div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>

        {/* Coming up */}
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>Coming up</span>
          {COMING_UP.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef', alignItems: 'flex-start' }}>
              <div style={{ flex: 'none', width: 44, height: 44, borderRadius: 10, background: '#eef5f2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {f.date.split('\n').map((l, li) => (
                  <span key={li} style={{ fontSize: li === 0 ? 10 : 18, fontWeight: li === 0 ? 700 : 800, letterSpacing: li === 0 ? '0.06em' : '-0.01em', color: '#2f6252', lineHeight: li === 0 ? '13px' : '21px' }}>{l}</span>
                ))}
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: '20px' }}>{f.venue}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{f.sub}</div>
                {f.note && <div style={{ fontSize: 12, color: '#40826d', fontWeight: 600, marginTop: 2 }}>{f.note}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Ladder */}
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Ladder</span>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>Top 6 of 10 · U12 is the first age with a ladder</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '24px minmax(0,1fr) 36px 36px', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>#</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57' }}>Team</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57', textAlign: 'center' }}>P</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4a5a57', textAlign: 'center' }}>Pts</span>
          </div>
          {LADDER.map((l, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px minmax(0,1fr) 36px 36px', gap: 8, alignItems: 'center', minHeight: 36, background: l.us ? '#eef5f2' : 'transparent', borderRadius: l.us ? 8 : 0, padding: l.us ? '0 6px' : '0' }}>
              <span style={{ fontSize: 14, fontWeight: l.us ? 700 : 400, color: l.us ? '#2f6252' : '#4a5a57' }}>{l.pos}</span>
              <span style={{ fontSize: 15, fontWeight: l.us ? 700 : 400, color: l.us ? '#2f6252' : '#10211f' }}>{l.name}</span>
              <span style={{ fontSize: 14, textAlign: 'center', color: '#4a5a57' }}>{l.played}</span>
              <span style={{ fontSize: 15, fontWeight: 700, textAlign: 'center', color: l.us ? '#2f6252' : '#10211f' }}>{l.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
