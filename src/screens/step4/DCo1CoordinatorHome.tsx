const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const TILES = [
  { n: '187/192', label: 'Registered', sub: '5 missing', warn: false },
  { n: '5/7', label: 'Referees', sub: '2 games need refs', warn: true },
  { n: '3/4', label: 'Cameras', sub: '1 not set up', warn: false },
  { n: '7/10', label: 'Volunteers', sub: '3 spots open', warn: false },
]
const TODO = [
  { p: 'red', text: 'Assign ref: U8 Hannah v Ironbark 8:30 am Sat' },
  { p: 'red', text: 'Assign ref: U13 Girls Meg v Northgate 12:00 pm Sat' },
  { p: 'amber', text: '5 families yet to pay fees — send reminder' },
  { p: 'amber', text: 'Camera setup for pitch 4 not confirmed' },
  { p: 'amber', text: 'Chase 3 volunteer slots for Saturday game day' },
]
const GAMES = [
  { time: '8:30', team: 'U8 Hannah', pitch: 'Pitch 1', ref: false },
  { time: '9:00', team: 'U9 Mark', pitch: 'Pitch 2', ref: true },
  { time: '10:30', team: 'U11 Luke', pitch: 'Pitch 3', ref: true },
  { time: '11:00', team: 'U12 Sam', pitch: 'Pitch 4', ref: true },
  { time: '11:30', team: 'U13 Girls Meg', pitch: 'Pitch 1', ref: false },
  { time: '12:00', team: 'U14 Josh', pitch: 'Pitch 2', ref: true },
  { time: '1:00', team: 'U16 Ollie', pitch: 'Pitch 3', ref: true },
]

export default function DCo1CoordinatorHome(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <span style={{ padding: '2px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>CLUB</span>
        <div style={{ flex: 1 }}><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', display: 'block' }}>Wattle Creek FC · Club coordinator</span></div>
        {['Home','Registrations','Fixtures','Referees','Cards'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Home' ? 700 : 500, color: '#fff', background: n === 'Home' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0' }}>
        <h1 style={{ margin: '0 0 2px', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Hi Bianca</h1>
        <span style={{ fontSize: 14, color: MUT }}>Week 9 of 18 · 14 games this Saturday</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {TILES.map(t => (
              <div key={t.n} style={{ background: '#fff', border: `1px solid ${t.warn ? '#f0a0a0' : '#c5c8c4'}`, borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: t.warn ? '#c00' : INK }}>{t.n}</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{t.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>To do</div>
            {TODO.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 44, borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 4, height: 24, borderRadius: 2, background: t.p === 'red' ? '#e02020' : '#f0a030', flexShrink: 0 }} />
                <span style={{ fontSize: 14 }}>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 2, flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Saturday at a glance</div>
            {GAMES.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 40, borderTop: `1px solid ${LN}`, fontSize: 14 }}>
                <strong style={{ width: 42, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{g.time}</strong>
                <span style={{ flex: 1 }}>{g.team}</span>
                {!g.ref && <span style={{ padding: '2px 7px', borderRadius: 99, background: '#fce9e9', color: '#c00', fontSize: 11, fontWeight: 700 }}>No ref</span>}
              </div>
            ))}
          </div>
          <div style={{ background: PALE, border: `1px solid #b8d4c8`, borderRadius: 14, padding: '12px 14px', fontSize: 13, color: G, lineHeight: '19px' }}>You look after registrations, fixtures, refs, cameras and volunteers for all 14 teams.</div>
        </div>
      </div>
    </div>
  )
}
