// FK1 / FK1e — Goalkeepers across the club
const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', ...style }}>{children}</div>
}
function Ini({ ini, color = G }: { ini: string; color?: string }) {
  return <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{ini}</div>
}
function Dot({ filled }: { filled: boolean }) {
  return <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: filled ? G : LN, border: `1.5px solid ${filled ? G2 : MUT}` }}/>
}

const KEEPER_ROWS = [
  { team: 'U10 Nadia',      keepers: 'Kai Morris, Ella Brooks', setup: 'Takes turns',    sessions: 0, sessionDots: [false,false,false,false], passes: null },
  { team: 'U11 Girls Kate', keepers: 'Sophie Tan',              setup: '1 keeper',       sessions: 2, sessionDots: [true,true,false,false],   passes: null },
  { team: 'U12 Sam',        keepers: 'Grace Owusu',             setup: '1 keeper',       sessions: 3, sessionDots: [true,true,true,false],     passes: '74%' },
  { team: 'U13 Chris',      keepers: 'Ava Lim, Max Jones',      setup: 'Shares',         sessions: 1, sessionDots: [true,false,false,false],   passes: '61%' },
  { team: 'U13 Girls Meg',  keepers: 'Holly Ng',                setup: '1 keeper',       sessions: 4, sessionDots: [true,true,true,true],      passes: '79%' },
  { team: 'U14 Josh',       keepers: 'Sami Haddad',             setup: '1 keeper',       sessions: 2, sessionDots: [true,true,false,false],    passes: '68%' },
  { team: 'U16 Ollie',      keepers: 'Jack Byrne',              setup: '1 keeper',       sessions: 1, sessionDots: [true,false,false,false],   passes: '64%' },
]

export default function GoalkeepersTab({ empty }: { empty?: boolean }) {
  if (empty) return (
    <div style={{ padding: '24px 28px', maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Goalkeepers</div>
        <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>Nothing here yet · No keepers named yet</div>
      </div>
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', fontSize: 14, color: G, lineHeight: 1.5 }}>From U12, coaches mark their keepers. Under 12s take turns, so they are not listed.</div>
      <button style={{ alignSelf: 'flex-start', height: 40, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add a keeper coach</button>
      <Card>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>What you will see</div>
        {[
          { n: '1', t: 'Keeper coaching', d: 'Who gets how much' },
          { n: '2', t: 'Keeper drills', d: 'In the club library' },
        ].map(r => (
          <div key={r.n} style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, display: 'flex', gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{r.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.t}</div>
              <div style={{ fontSize: 12, color: MUT }}>{r.d}</div>
            </div>
          </div>
        ))}
        <div style={{ padding: '10px 14px', fontSize: 12, color: MUT }}>This page fills in on its own once there is something to show.</div>
      </Card>
    </div>
  )

  return (
    <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Goalkeepers</div>
          <div style={{ fontSize: 13, color: MUT }}>Every keeper at the club, and how much keeper coaching they get</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, letterSpacing: '0.07em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Keepers by team · 7v7 and up</div>
            <Card>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 100px 180px 90px', padding: '8px 14px', borderBottom: `1px solid ${LN}` }}>
                {['TEAM', 'KEEPERS', 'SET-UP', 'KEEPER SESSIONS IN MAY', 'PASSES'].map(h => (
                  <span key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>{h}</span>
                ))}
              </div>
              {KEEPER_ROWS.map((row, i) => (
                <div key={row.team} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 100px 180px 90px', padding: '10px 14px', borderBottom: i < KEEPER_ROWS.length - 1 ? `1px solid ${LN}` : 'none', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>{row.team}</span>
                  <span style={{ fontSize: 12, color: MUT }}>{row.keepers}</span>
                  <span style={{ fontSize: 12, color: MUT }}>{row.setup}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {row.sessionDots.map((f, di) => <Dot key={di} filled={f}/>)}
                    <span style={{ fontSize: 12, color: row.sessions >= 3 ? G : MUT, fontWeight: row.sessions >= 3 ? 700 : 400, marginLeft: 4 }}>{row.sessions} of 4</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: row.passes ? (parseInt(row.passes) >= 70 ? G : MUT) : MUT }}>{row.passes ?? '—'}</span>
                </div>
              ))}
            </Card>
            <div style={{ marginTop: 8, fontSize: 12, color: MUT }}>In MiniRoos, every child should have a turn in goal. From U12, keepers get their own goals and drills.</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card>
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Keeper coaching</div>
            <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${LN}` }}>
              <Ini ini="NW" color={GD}/>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Nick Ward</div>
                <div style={{ fontSize: 12, color: MUT }}>Foundation of Goalkeeping · Tuesdays 6 pm</div>
              </div>
            </div>
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Club keeper session</div>
                <div style={{ fontSize: 12, color: MUT }}>Tue · 14 keepers</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: G, background: PALE, borderRadius: 999, padding: '2px 8px' }}>Active</span>
            </div>
            <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: MUT }}>Coaches with the keeper course</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: INK }}>2 of 31</span>
            </div>
          </Card>

          <div style={{ padding: '10px 14px', background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, fontSize: 12, color: MUT, lineHeight: 1.5 }}>
            Drills from the Foundation of Goalkeeping course are in the club library.
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ flex: 1, height: 40, borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Share the course</button>
            <button style={{ flex: 1, height: 40, borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Keeper drills</button>
          </div>
        </div>
      </div>
    </div>
  )
}
