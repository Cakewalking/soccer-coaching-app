const GOALS = [
  { ini: 'MT', name: 'Mia Tran',      pos: 'Central midfield', goal: 'Win the ball back within 5 seconds', status: 'on-track',   games: [true,true,true,true,true] },
  { ini: 'EB', name: 'Ella Brandt',   pos: 'Holding midfield', goal: 'Drive forward with the ball',        status: 'on-track',   games: [true,true,true,true,true] },
  { ini: 'KR', name: 'Kai Russo',     pos: 'Right back',       goal: "Defend 1 v 1 on his weak side",      status: 'on-track',   games: [true,true,true,false,true] },
  { ini: 'JP', name: 'Jai Patel',     pos: 'Striker',          goal: 'Look up before receiving',           status: 'on-track',   games: [true,true,true,true,true] },
  { ini: 'NO', name: 'Noah Okafor',   pos: 'Left winger',      goal: 'Shoot early, low and to the corners',status: 'on-track',   games: [true,true,false,true,true] },
  { ini: 'ZH', name: 'Zoe Hartley',  pos: 'Centre back',      goal: 'Use her left foot to cross',         status: 'on-track',   games: [true,true,true,true,false] },
  { ini: 'GO', name: 'Grace Owusu',  pos: 'Centre back',      goal: "Lead the back line's step-up call",  status: 'on-track',   games: [false,true,true,true,true] },
  { ini: 'IM', name: 'Isla Morgan',   pos: 'Left back',        goal: 'Turn and face forward',              status: 'on-track',   games: [true,true,true,true,true] },
  { ini: 'RC', name: 'Ruby Chen',     pos: 'Right winger',     goal: 'Pass out from the back under pressure',status:'on-track',  games: [true,false,true,true,true] },
  { ini: 'AL', name: 'Ava Lindqvist', pos: 'Striker',          goal: 'Start 4 m higher off her line',      status: 'on-track',   games: [true,true,true,false,true] },
  { ini: 'FW', name: 'Finn Walsh',    pos: 'Goalkeeper',       goal: 'Press the keeper on goal kicks',     status: 'on-track',   games: [true,true,true,true,false] },
  { ini: 'LM', name: 'Leo Marsh',     pos: 'Centre back',      goal: 'Check his shoulder before a cross',  status: 'needs-work', games: [false,false,true,false,false] },
  { ini: 'SD', name: 'Sam Delaney',   pos: 'Right back',       goal: 'Overlap the winger',                 status: 'needs-work', games: [false,false,true,false,true] },
  { ini: 'TR', name: 'Tom Reyes',     pos: 'Centre midfield',  goal: 'Catch rather than punch',            status: 'needs-work', games: [false,true,false,false,false] },
  { ini: 'OB', name: 'Oscar Brennan', pos: 'Left winger',      goal: 'No goal yet · suggestions ready',    status: 'to-set',     games: [] },
  { ini: 'LN', name: 'Lily Nguyen',   pos: 'Right winger',     goal: 'No goal yet · suggestions ready',    status: 'to-set',     games: [] },
]

const SEL_PLAYER = GOALS[11] // Leo Marsh
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
  const ws = [55, 45, 65, 40, 55, 50, 48]
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 8 }}>Fills in like this</div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} style={{ height: 44, border: '1px dashed #c5c8c4', borderRadius: 10, marginBottom: 6, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
          <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${ws[i % ws.length]}%` }} />
          <div style={{ marginLeft: 'auto', width: 48, height: 10, borderRadius: 5, background: '#e9eae8', flex: 'none' }} />
        </div>
      ))}
    </div>
  )
}

function DevGoalsEmpty() {
  return (
    <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Development goals</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>No goals set yet</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20 }}>
          <Illus />
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>One goal per player</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>After the first recorded game, Clean Sheet suggests a goal for each player from what the video and sensors show. You pick or change it.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add players first</button>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See an example</button>
            </div>
          </div>
        </div>
        <Skel rows={7} />
      </div>
      <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>How goals work</div>
        {[
          { icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', title: 'Checked after every game', body: 'Ticks for each of the last 5 games' },
          { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8', title: 'Shared with the player', body: 'Players and parents see their own goal' },
          { icon: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z', title: 'Yours to change', body: 'Swap a suggested goal any time' },
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
        <div style={{ marginTop: 'auto', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>Keep goals small and about the game, like "check your shoulder before a cross".</div>
      </aside>
    </main>
  )
}

const GAME_LABELS = ['IRO', 'SAL', 'NOR', 'BAY', 'KES']

function statusChip(s: string) {
  if (s === 'on-track')   return { bg: '#eef5f2', color: '#2f6252', label: 'On track' }
  if (s === 'needs-work') return { bg: '#fdf0ee', color: '#7a3030', label: 'Needs work' }
  return { bg: '#f0f1ef', color: '#4a5a57', label: 'To set' }
}

function GameTick({ v }: { v: boolean }) {
  return (
    <span style={{
      width: 20, height: 20, borderRadius: 5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: v ? '#2f6252' : '#e9eae8',
    }}>
      {v && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>}
    </span>
  )
}

export default function DevGoalsScreen({ empty }: { empty?: boolean }) {
  if (empty) return <DevGoalsEmpty />
  return (
    <div style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>

      {/* Left: list */}
      <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Development goals</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>11 of 16 on track · 3 need work · 2 to set · checked after every game</span>
        </div>

        <div style={{ flex: '0 1 auto', minHeight: 0, overflow: 'auto', background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16 }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr) 120px 80px', gap: 12, padding: '10px 16px', borderBottom: '1px solid #e9eae8', position: 'sticky', top: 0, background: '#ffffff', zIndex: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>Player</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>Goal</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57', textAlign: 'center' }}>Last 5 games</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57', textAlign: 'right' }}>Status</span>
          </div>
          {GOALS.map((g, i) => {
            const c = statusChip(g.status)
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr) 120px 80px',
                gap: 12, padding: '10px 16px', alignItems: 'center',
                borderTop: '1px solid #f0f1ef',
                background: g.ini === SEL_PLAYER.ini ? '#eef5f2' : 'transparent',
                cursor: 'pointer',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '999px', background: '#c39797', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>{g.ini}</span>
                  <span>
                    <span style={{ display: 'block', fontSize: 14, fontWeight: 600, lineHeight: '19px' }}>{g.name}</span>
                    <span style={{ display: 'block', fontSize: 12, color: '#4a5a57', lineHeight: '16px' }}>{g.pos}</span>
                  </span>
                </span>
                <span style={{ fontSize: 14, lineHeight: '20px', color: g.status === 'to-set' ? '#6f7f7b' : '#10211f' }}>{g.goal}</span>
                <span style={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
                  {g.games.length > 0 ? g.games.map((v, j) => <GameTick key={j} v={v} />) : <span style={{ fontSize: 12, color: '#6f7f7b' }}>—</span>}
                </span>
                <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 9px', borderRadius: '999px', background: c.bg, color: c.color }}>{c.label}</span>
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right: selected player panel */}
      <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ flex: 'none', width: 44, height: 44, borderRadius: '999px', background: '#c39797', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>{SEL_PLAYER.ini}</span>
          <span>
            <span style={{ display: 'block', fontSize: 18, fontWeight: 700, lineHeight: '24px' }}>{SEL_PLAYER.name}</span>
            <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{SEL_PLAYER.pos} · goal set 22 Sep</span>
          </span>
        </div>

        <div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57' }}>His goal</span>
          <div style={{ marginTop: 6, fontSize: 17, fontWeight: 700, lineHeight: '23px' }}>{SEL_PLAYER.goal}</div>
        </div>

        <div style={{ background: '#fdf0ee', borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#7a3030', marginBottom: 6 }}>Needs work</div>
          <div style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Met 1 of the last 5 games. Against Ironbark he lost the back-post runner twice.</div>
        </div>

        {/* Related clip */}
        <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 'none', width: 48, height: 36, borderRadius: 8, background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          </div>
          <span style={{ flexGrow: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 13, fontWeight: 700, lineHeight: '18px' }}>Min 24 · runner lost at the back post</span>
            <span style={{ display: 'block', fontSize: 12, color: '#4a5a57', lineHeight: '16px' }}>2 clips from Ironbark</span>
          </span>
        </div>

        <div style={{ background: '#eef5f2', borderRadius: 12, padding: '12px 14px', fontSize: 13, lineHeight: '19px', color: '#2d3d3a' }}>
          <strong>To help him:</strong> Back-post defending is in Thursday's plan. Ask him to say "shoulder" out loud before every cross.
        </div>

        <div style={{ display: 'flex', gap: 5, marginTop: 4 }}>
          {GAME_LABELS.map((g, i) => (
            <span key={i} style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: 10, color: '#4a5a57', marginBottom: 3 }}>{g}</span>
              <GameTick v={SEL_PLAYER.games[i] ?? false} />
            </span>
          ))}
        </div>

        <div style={{ marginTop: 'auto' }}>
          <button style={{ width: '100%', height: 44, borderRadius: 12, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Open Leo's profile
          </button>
          <div style={{ marginTop: 8, fontSize: 12, color: '#4a5a57', lineHeight: '17px', textAlign: 'center' }}>
            Leo and his parents see the goal and his ticks in the player app.
          </div>
        </div>
      </aside>
    </div>
  )
}
