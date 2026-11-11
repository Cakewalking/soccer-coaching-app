const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57'

const WEEKS = [
  { date: 'Sat 6 Jun', games: [{ t: '8:30', name: 'U7 Dan v Ironbark United', role: 'Game leader · pitch 5 · festival', tag: 'Yours', tagG: true }] },
  { date: 'Sat 13 Jun', games: [
    { t: '9:00', name: 'U9 Mark v Tealside Town', role: 'Game leader · pitch 4', tag: 'Yours', tagG: true },
    { t: '10:30', name: 'U11 Luke v Glenview Park', role: 'Game leader · pitch 3', tag: 'Asked', tagG: false },
  ]},
]

const NavItem = ({ icon, label, active }: { icon: string; label: string; active?: boolean }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 56, fontSize: 11, fontWeight: 700, color: active ? G : MUT, cursor: 'pointer' }}>
    <span style={{ fontSize: 20 }}>{icon}</span>
    {label}
  </div>
)

export default function RF2RefGames(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 390, height: 844, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>
      <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · game leader, Level 4</span>
          <span style={{ display: 'block', fontSize: 21, fontWeight: 700 }}>Hi Zoe</span>
        </div>
        <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>ZP</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
        <div style={{ background: '#cbbeb5', border: '1px solid #cbbeb5', borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Ruth asked: can you do 12:00 Saturday?</div>
            <div style={{ fontSize: 13 }}>Assistant referee · U13 Girls Meg</div>
          </div>
          <span style={{ fontSize: 18 }}>›</span>
        </div>
        {WEEKS.map((w, wi) => (
          <div key={wi} style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '8px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, padding: '4px 0' }}>{w.date}</div>
            {w.games.map((g, gi) => (
              <div key={gi} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8' }}>
                <strong style={{ width: 48, fontSize: 15, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{g.t}</strong>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, lineHeight: '20px' }}>{g.name}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{g.role}</div>
                </div>
                <span style={{ padding: '2px 9px', borderRadius: 99, fontSize: 12, fontWeight: 700, background: g.tagG ? G : '#cbbeb5', color: g.tagG ? '#fff' : INK, whiteSpace: 'nowrap' as const }}>{g.tag}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 14px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>This season</div>
          {[['Games','21'],['Feedback','19 great or good']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 38, borderTop: '1px solid #e9eae8', fontSize: 14 }}>
              <span>{k}</span><strong>{v}</strong>
            </div>
          ))}
        </div>
        <span style={{ fontSize: 13, color: MUT, padding: '0 2px' }}>You see your games and nothing about the players.</span>
      </div>
      <nav style={{ flex: 'none', display: 'flex', borderTop: '1px solid #c5c8c4', background: '#fff' }}>
        <NavItem icon="📅" label="My games" active />
        <NavItem icon="📋" label="Report" />
        <NavItem icon="💬" label="Feedback" />
        <NavItem icon="👤" label="Me" />
      </nav>
    </div>
  )
}
