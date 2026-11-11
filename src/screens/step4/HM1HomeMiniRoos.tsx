const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const WEEK = [
  { day: 'Mon 1', event: null },
  { day: 'Tue 2', event: 'Training 5:00 pm', active: true },
  { day: 'Wed 3', event: null },
  { day: 'Thu 4', event: null },
  { day: 'Fri 5', event: null },
  { day: 'Sat 6', event: 'Northgate City 8:30', game: true },
  { day: 'Sun 7', event: null },
]

export default function HM1HomeMiniRoos(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 64 }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: t === 'Home' ? '#40826d' : 'transparent', color: t === 'Home' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>U9 Tom · Wattle Creek</div>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: INK }}>TA</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {['Overview', 'Inbox', 'Calendar', 'Team staff'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: t === 'Overview' ? INK : MUT, borderBottom: t === 'Overview' ? `3px solid #40826d` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer' }}>{t}</div>
        ))}
      </div>

      <div style={{ flex: 1, padding: '18px 28px 22px', display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 18 }}>
        {/* Left column */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: GD, color: '#fff', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 17, fontWeight: 700 }}>Needs you</div>
              <div style={{ background: '#fff', color: GD, borderRadius: 999, padding: '2px 10px', fontSize: 13, fontWeight: 700 }}>2 new</div>
            </div>
            {[
              { icon: 'SA', label: 'Saturday', when: 'Today', msg: '2 families haven\'t said if they\'re coming' },
              { icon: 'RF', label: 'Referees', when: 'Yesterday', msg: 'Saturday still needs a game leader' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, minHeight: 72, padding: '10px 18px', borderTop: `1px solid ${LN}`, cursor: 'pointer' }}>
                <div style={{ width: 36, height: 36, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: MUT }}><span>{item.label}</span><span>{item.when}</span></div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginTop: 2 }}>{item.msg}</div>
                </div>
                <div style={{ width: 10, height: 10, borderRadius: 999, background: '#40826d', marginTop: 6 }} />
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 46, padding: '0 18px', borderTop: `1px solid ${LN}`, fontSize: 14, fontWeight: 600, color: G, cursor: 'pointer' }}>All messages · 2 more</div>
          </div>

          <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: INK }}>Everyone gets a turn</div>
              <div style={{ fontSize: 14, color: MUT }}>Term 2</div>
            </div>
            {[{ label: 'Had a go in goal', val: '7 of 10', pct: 70 }, { label: 'Been captain', val: '6 of 10', pct: 60 }, { label: 'Started a game', val: '10 of 10', pct: 100 }].map(item => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span>{item.label}</span><strong>{item.val}</strong></div>
                <div style={{ borderRadius: 4, overflow: 'hidden' }}><div style={{ height: '100%', width: `${item.pct}%`, background: '#40826d' }} /></div>
              </div>
            ))}
            <div style={{ marginTop: 'auto', fontSize: 14, color: MUT }}>Next in goal: Ivy, Max and Arlo. Clean Sheet lines up Saturday's turns for you.</div>
          </div>
        </div>

        {/* Middle column */}
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ background: '#40826d', color: '#fff', borderRadius: 18, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ background: '#fff', color: G, borderRadius: 999, padding: '2px 10px', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>TODAY</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>5:00 pm · Wattle Creek Reserve</div>
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Training tonight</div>
              <div style={{ fontSize: 15 }}>45 minutes · 4 games · a ball each, no laps, no lines</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
              {['This fortnight: running with the ball', 'Find a friend in space'].map(t => (
                <div key={t} style={{ background: G, borderRadius: 999, padding: '4px 12px', fontSize: 14, fontWeight: 600 }}>{t}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid #fff`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Open tonight's games</button>
              <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #fff`, background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Swap a game</button>
            </div>
          </div>

          <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: INK }}>Last Saturday</div>
              <div style={{ fontSize: 14, color: MUT }}>Sat 30 May · home</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', color: INK }}>Glenview Park</div>
                <div style={{ fontSize: 14, color: MUT }}>All 10 played · 22 to 26 minutes each</div>
              </div>
              <div style={{ background: LN, borderRadius: 999, padding: '4px 10px', fontSize: 13, fontWeight: 700, color: INK }}>No score kept</div>
            </div>
            {[
              { text: 'Brave dribbling. Lots of kids took a player on', label: 'Keep', done: true },
              { text: 'Six different kids had a shot', label: 'Keep', done: true },
              { text: 'Bunching round the ball. Next: find a friend in space', label: 'Tonight', done: false },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 38, borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 24, height: 24, borderRadius: 999, background: item.done ? G : '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={item.done ? '#fff' : INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d={item.done ? 'M5 12l5 5 9-10' : 'M5 12h14M13 6l6 6-6 6'}/></svg>
                </div>
                <div style={{ flex: 1, fontSize: 15, color: INK }}>{item.text}</div>
                <div style={{ fontSize: 13, color: MUT, flexShrink: 0 }}>{item.label}</div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>What we saw</button>
              <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Thank the parents</button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: INK }}>This week</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: G, cursor: 'pointer' }}>Calendar</div>
            </div>
            {WEEK.map(w => (
              <div key={w.day} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 32, padding: '0 8px', borderRadius: 8, background: w.active ? '#40826d' : w.game ? '#cbbeb5' : 'transparent', color: w.active ? '#fff' : w.game ? INK : MUT, fontWeight: w.active || w.game ? 600 : 400 }}>
                <span style={{ width: 52, fontSize: 14, fontWeight: 700 }}>{w.day}</span>
                <span style={{ fontSize: 14 }}>{w.event || 'Rest'}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: INK }}>Saturday</div>
              <div style={{ fontSize: 14, color: MUT }}>7 a side</div>
            </div>
            <div style={{ background: '#cbbeb5', borderRadius: 10, padding: '6px 10px', fontSize: 14, lineHeight: '20px' }}><strong>8:30 vs Northgate City</strong><br />Away, Redgum Reserve · 7 coming, 1 away, 2 to answer</div>
          </div>

          <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: INK }}>Why no scores here</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>Under 12s play MiniRoos. Football Victoria keeps no results or ladders, so Clean Sheet doesn't either. You can film for clips at any age.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
