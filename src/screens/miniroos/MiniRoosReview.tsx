const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

const TAPS = [
  { label: 'Brave with the ball', status: 'Keep',    note: '24 dribbles. Poppy tried her first three, and beat a player with one.', clips: 5 },
  { label: 'Winning it back',     status: 'Keep',    note: 'Back in 8 seconds. When three chased, it took 4.',                       clips: 4 },
  { label: 'Finding a friend',    status: 'Tuesday', note: '6 children were within 5 metres of the ball. Nobody free to pass to.',   clips: 3 },
]

const DRILLS = [
  { n: '1', title: 'Treasure island', desc: 'Spread out to collect' },
  { n: '2', title: 'Gates galore',    desc: 'A pass through a gate scores' },
]

function statusColor(s: string) {
  if (s === 'Keep') return { color: G2, bg: PALE }
  if (s === 'Tuesday') return { color: '#d97706', bg: '#fffbeb' }
  return { color: MUT, bg: '#f5f6f4' }
}

export function MS3MiniRoosReview() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', gap: 20, fontFamily: 'var(--font-sans)' }}>

      {/* Left: review */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Saturday at Northgate City</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>U9 Tom · 4 short games · no score kept</div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14, marginBottom: 20 }}>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>A best moment each</button>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Build Tuesday from this</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {TAPS.map(t => {
            const sc = statusColor(t.status)
            return (
              <div key={t.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{t.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: MUT }}>{t.clips} clips</span>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: sc.bg, color: sc.color }}>{t.status}</span>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: MUT }}>{t.note}</div>
              </div>
            )
          })}
        </div>

        {/* Turns */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Did everyone get a turn?</div>
          </div>
          {[
            { label: 'GAME TIME',         value: 'Equal',           note: '30 minutes each' },
            { label: 'IN GOAL',           value: '4',               note: 'Ivy, Max, Arlo, Bea' },
            { label: 'CAPTAIN',           value: 'Jude',            note: 'Sami is next' },
            { label: '10 TOUCHES OR MORE', value: '10 of 10',        note: 'Every child' },
          ].map((r, i) => (
            <div key={r.label} style={{ padding: '10px 16px', borderTop: i > 0 ? `1px solid ${LN}` : 'none', display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, alignItems: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>{r.label}</div>
              <div>
                <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>{r.value}</span>
                <span style={{ fontSize: 13, color: MUT, marginLeft: 8 }}>{r.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Your taps */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Your taps</div>
            <button style={{ fontSize: 13, color: G, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Change</button>
          </div>
          <div style={{ fontSize: 13, color: MUT }}>You tapped "Brave dribbling" and "Bunching round the ball". The film agrees with both.</div>
        </div>

        {/* Not in this review */}
        <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '12px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>Not in this review</div>
          <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>The score, who scored most, or any child compared with another. Two children have no film consent and are blurred.</div>
        </div>
      </div>

      {/* Right: for Tuesday */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>For Tuesday</div>
        <div style={{ background: PALE, borderRadius: 14, padding: '12px 14px', marginBottom: 10 }}>
          <button style={{ fontSize: 13, fontWeight: 700, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Open</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {DRILLS.map(d => (
            <div key={d.n} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{d.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{d.title}</div>
                <div style={{ fontSize: 13, color: G2 }}>{d.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MS3eMiniRoosReviewEmpty() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', fontFamily: 'var(--font-sans)' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Review</div>
        <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>U9 Tom · no game recorded yet this week</div>
      </div>

      <div style={{ background: PALE, borderRadius: 16, padding: '32px 24px', maxWidth: 480, marginBottom: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>Film Saturday to get this</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>After a filmed game Clean Sheet shows your three things, the turns check and suggests games for Tuesday. No score kept.</div>
        <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Go to Record</button>
      </div>

      {[
        { n: '1', title: 'Three things you wanted to see', body: 'Each with a clip reel and a trend' },
        { n: '2', title: 'Did everyone get a turn?',      body: 'Game time, in goal and captain — in one look' },
        { n: '3', title: "Tuesday's games ready",         body: 'Built from what the film found' },
      ].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: LN, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
            <div style={{ fontSize: 13, color: MUT }}>{s.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
