const TEAMS = [
  { now: 'U7 Dan',       next: 'U8 Dan',        players: 7,  change: '4 a side → 7 a side',          coach: 'Coach staying',     needsCoach: false },
  { now: 'U8 Hannah',    next: 'U9 Hannah',      players: 10, change: 'No change',                    coach: 'Coach staying',     needsCoach: false },
  { now: 'U9 Mark',      next: 'U10 Mark',       players: 11, change: '7 a side → 9 a side',          coach: 'Needs a coach',     needsCoach: true  },
  { now: 'U9 Tom',       next: 'U10 Tom',        players: 10, change: '7 a side → 9 a side',          coach: 'Coach staying',     needsCoach: false },
  { now: 'U10 Nadia',    next: 'U11 Nadia',      players: 13, change: 'No change',                    coach: 'Coach staying',     needsCoach: false },
  { now: 'U11 Girls Kate', next: 'U12 Girls Kate', players: 14, change: 'Scores and divisions start', coach: 'Coach staying',     needsCoach: false },
  { now: 'U11 Luke',     next: 'U12 Luke',       players: 13, change: 'Scores and divisions start',   coach: 'Coach to confirm',  needsCoach: false },
  { now: 'U12 Sam',      next: 'U13 Sam',        players: 17, change: 'No change',                    coach: 'Coach staying',     needsCoach: false },
  { now: 'U12 Girls Ana', next: 'U13 Girls Ana', players: 15, change: 'No change',                    coach: 'Coach staying',     needsCoach: false },
  { now: 'U13 Chris',    next: 'U14 Chris',      players: 17, change: '9 a side → 11 a side',         coach: 'Coach to confirm',  needsCoach: false },
  { now: 'U13 Girls Meg', next: 'U14 Girls Meg', players: 18, change: '9 a side → 11 a side',         coach: 'Coach staying',     needsCoach: false },
  { now: 'U14 Josh',     next: 'U15 Josh',       players: 18, change: 'No change',                    coach: 'Coach staying',     needsCoach: false },
  { now: 'U15 Girls Bec', next: 'U16 Girls Bec', players: 15, change: 'No change',                    coach: 'Coach staying',     needsCoach: false },
]

const CARRIES_OVER = [
  { icon: '✓', color: '#2f6252', bg: '#eef5f2', title: "Each player's goals and history", desc: 'Follows them to the new team' },
  { icon: '✓', color: '#2f6252', bg: '#eef5f2', title: 'Club style and heading policy',   desc: 'Stay as they are' },
  { icon: '↻', color: '#4a5a57', bg: '#f0f1ef', title: 'Consent',                          desc: 'Parents are asked again each season' },
  { icon: '↻', color: '#4a5a57', bg: '#f0f1ef', title: 'Registration and fees',            desc: 'Families re-register in PlayFootball' },
  { icon: '×', color: '#c39797', bg: '#fdf5f3', title: 'Match video',                      desc: 'Deleted, apart from kept clips' },
]

export default function RolloverScreen({ onBack, empty = false }: { onBack: () => void; empty?: boolean }) {
  if (empty) {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 'none', background: '#fff', borderBottom: '1px solid #e9eae8', padding: '0 28px', height: 52, display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={onBack} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Back</button>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1f4a3e' }}>Next season · Rollover</span>
          <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: '999px', padding: '4px 12px' }}>Director of football</span>
        </div>
        <div style={{ flexGrow: 1, padding: '28px 32px' }}>
          <div style={{ maxWidth: 560 }}>
            <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Next season</h1>
            <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 20 }}>Opens in September, after the last game</div>
            <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Not time yet</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.6 }}>After the last game of the season, every team can move up a year in one go. Players keep their goals and history.</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#6f7f7b', marginBottom: 10 }}>What carries over</div>
            {[
              { symbol: '✓', label: 'Goals and history',          desc: 'Follow each player',                 color: '#2f6252' },
              { symbol: '↻', label: 'Consent and registration',   desc: 'Asked again each season',            color: '#c3a84a' },
              { symbol: '×', label: 'Match video',                 desc: 'Deleted, apart from kept clips',     color: '#c39797' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 14, padding: '12px 0', borderTop: '1px solid #e9eae8', alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: item.color + '22', color: item.color, fontSize: 16, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.symbol}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#4a5a57' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      {/* Header bar */}
      <div style={{ flex: 'none', background: '#fff', borderBottom: '1px solid #e9eae8', padding: '0 28px', height: 52, display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#1f4a3e' }}>Next season · Rollover</span>
        <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: '999px', padding: '4px 12px' }}>Director of football</span>
      </div>

      {/* Content */}
      <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '24px 28px 32px' }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Next season</h1>
            <p style={{ margin: 0, fontSize: 14, color: '#4a5a57' }}>Roll every team up a year for 2027 · nothing changes until you press the button</p>
          </div>
          <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Start 2027</button>
        </div>

        {/* 2-col layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
          {/* Teams table */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Teams</div>
            <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 12 }}>13 move up · U16 Ollie finishes juniors</div>
            <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 60px 1fr 160px', gap: 0, padding: '10px 18px', background: '#f5f6f4', borderBottom: '1px solid #e9eae8' }}>
                {['THIS SEASON', 'NEXT SEASON', 'PLAYERS', 'WHAT CHANGES', ''].map((h, i) => (
                  <div key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b', textTransform: 'uppercase', textAlign: i === 2 ? 'center' : 'left' }}>{h}</div>
                ))}
              </div>
              {TEAMS.map((t, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 60px 1fr 160px', gap: 0, padding: '12px 18px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{t.now}</span>
                  <span style={{ fontSize: 14, color: '#10211f' }}>{t.next}</span>
                  <span style={{ fontSize: 14, color: '#4a5a57', textAlign: 'center' }}>{t.players}</span>
                  <span style={{ fontSize: 13, color: '#4a5a57' }}>{t.change}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.needsCoach ? '#c39797' : t.coach === 'Coach to confirm' ? '#c39797' : '#2f6252' }}>{t.coach}</span>
                </div>
              ))}
              <div style={{ padding: '10px 18px 14px', borderTop: '1px solid #e9eae8', fontSize: 12, color: '#6f7f7b', lineHeight: '17px' }}>
                Team names follow the coach, so they update if a coach changes. U16 Ollie's 14 players are invited to the senior squads.
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>What carries over</div>
              {CARRIES_OVER.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none', alignItems: 'flex-start' }}>
                  <span style={{ flex: 'none', width: 24, height: 24, borderRadius: '999px', background: item.bg, color: item.color, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: '#6f7f7b' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fdf5f3', border: '1px solid #e8d5d0', borderRadius: 16, padding: '14px 16px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: '#10211f' }}>To sort first</div>
              <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 12 }}>1 team needs a coach</div>
              <button style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Find a coach for U10 Mark</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
