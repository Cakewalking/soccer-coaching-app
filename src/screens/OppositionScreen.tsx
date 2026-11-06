function Illus() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 4, flex: 'none' }}>
      {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => (
        <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: c }} />
      ))}
    </div>
  )
}

function Skel({ rows = 6 }: { rows?: number }) {
  const ws = [55, 45, 65, 40, 55, 50]
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 8 }}>Fills in like this</div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} style={{ height: 48, border: '1px dashed #c5c8c4', borderRadius: 10, marginBottom: 6, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
          <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${ws[i % ws.length]}%` }} />
          <div style={{ marginLeft: 'auto', width: 48, height: 10, borderRadius: 5, background: '#e9eae8', flex: 'none' }} />
        </div>
      ))}
    </div>
  )
}

function OppositionEmpty() {
  return (
    <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Opposition</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>No game scheduled</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20 }}>
          <Illus />
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Know who you're playing</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>Add a fixture to see the other team's results. After you've played them once, you'll have your own clips of them too.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add a fixture</button>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See an example</button>
            </div>
          </div>
        </div>
        <Skel rows={6} />
      </div>
      <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>What you'll see</div>
        {[
          { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zM9 5a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 00-2-2h-2a2 2 0 00-2 2v2z', title: 'Their form and the ladder', body: 'From league results' },
          { icon: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z', title: 'Your scouting notes', body: 'Shared with your co-coach' },
          { icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', title: 'Clips from last time', body: 'Only games you recorded' },
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
        <div style={{ marginTop: 'auto', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>Clean Sheet never films or tracks other teams' players.</div>
      </aside>
    </main>
  )
}

const HOW_THEY_PLAY = [
  { label: 'Keeper rolls it short to the centre backs', note: 'Every goal kick. A good chance for our press: tonight\'s main drill is win it back in 6 seconds.', highlight: true },
  { label: 'Big, quick number 9',                       note: 'Most of their goals come from long balls in behind. Keep the lines close so there\'s less space behind.' },
  { label: 'Tire late',                                 note: 'They conceded 6 of their 11 goals in the second half.', highlight: true },
  { label: 'Small squad',                               note: 'Usually only 1 or 2 subs. Our fresh legs late in the game should matter.' },
]

const LAST_5: Array<'W'|'L'|'D'> = ['L', 'W', 'D', 'L', 'W']

const OUR_PLAN = [
  'Finn and Noah press their keeper\'s short pass',
  'Grace calls the line up after every long ball',
  'Fresh legs on at half-time: Jai and Ruby',
]

function resultBadge(r: 'W'|'L'|'D') {
  if (r === 'W') return { bg: '#2f6252', color: '#ffffff' }
  if (r === 'L') return { bg: '#c39797', color: '#10211f' }
  return { bg: '#cbbeb5', color: '#10211f' }
}

export default function OppositionScreen({ empty }: { empty?: boolean }) {
  if (empty) return <OppositionEmpty />
  return (
    <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>

      {/* Left */}
      <div style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Harbour Rovers</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>Saturday 7 Nov · home · 6th on the ladder · we haven't played them this season</span>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>How they play</span>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>From Jess's scouting on 24 Oct and the league table</span>
          </div>
          {HOW_THEY_PLAY.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef' }}>
              <span style={{ flex: 'none', width: 8, height: 8, borderRadius: '999px', background: item.highlight ? '#40826d' : '#cbbeb5', marginTop: 6 }} />
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, lineHeight: '21px', color: '#10211f' }}>{item.label}</div>
                <div style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57', marginTop: 2 }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 12, color: '#4a5a57', padding: '8px 4px', lineHeight: '17px' }}>
          Clean Sheet only has video of teams you've played, so this is your own scouting plus league results.
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>

        {/* Their last 5 */}
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Their last 5</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {LAST_5.map((r, i) => {
              const c = resultBadge(r)
              return (
                <span key={i} style={{ flex: 1, height: 36, borderRadius: 8, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>{r}</span>
              )
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[{ k: 'Points', v: '11' }, { k: 'Scored', v: '12' }, { k: 'Conceded', v: '11' }].map(s => (
              <div key={s.k} style={{ background: '#f7f8f7', borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57', marginBottom: 2 }}>{s.k}</div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our plan */}
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Our plan</span>
          {OUR_PLAN.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef' }}>
              <span style={{ flex: 'none', width: 24, height: 24, borderRadius: '999px', background: '#2f6252', color: '#ffffff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <span style={{ fontSize: 15, lineHeight: '21px', flexGrow: 1 }}>{item}</span>
            </div>
          ))}
          <div style={{ marginTop: 'auto' }}>
            <button style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>
              Add a scouting note
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
