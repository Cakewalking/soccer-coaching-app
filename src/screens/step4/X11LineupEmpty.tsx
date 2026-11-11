const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const POSITIONS = ['GK', 'LB', 'CB', 'RB', 'CM', 'CM', 'LW', 'ST', 'RW']

export default function X11LineupEmpty(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U12 Sam · Wattle Creek</div>
        {['Team talk', 'Line-up and minutes', 'Opposition', 'Review'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Line-up and minutes' ? 700 : 500, color: t === 'Line-up and minutes' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Head coach</div>
      </div>

      <div style={{ padding: 32, display: 'flex', gap: 32 }}>
        {/* Pitch */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 4 }}>Line-up and minutes</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Sat 6 Jun vs Harbour Rovers · no players yet</div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Add players</button>
            <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Start live game</button>
          </div>

          {/* Pitch */}
          <div style={{ background: '#2d7a4f', borderRadius: 16, padding: 20, position: 'relative' as const, minHeight: 400 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, padding: '20px 10px' }}>
              {POSITIONS.map((pos, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '2px dashed rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' as const }}>{pos}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' as const, padding: '10px 0', fontSize: 13, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>Add players first, then drag them onto the pitch</div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: 300 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Fair minutes, done for you</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>During the game, Clean Sheet times everyone and suggests subs so every player gets a fair share. It warns you when a growing player hits their sprint limit.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
