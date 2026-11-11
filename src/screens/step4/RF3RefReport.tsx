const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const WHAT = ['Yellow card','Red card','Injury','Spectator behaviour','Other']
const WHY = ['Late tackle','Handball','Foul language','Violent conduct','Simulation','Dissent']
const TEAMS = ['Wattle Creek FC','Northgate City']

const Chip = ({ label, active }: { label: string; active?: boolean }) => (
  <div style={{ height: 36, padding: '0 14px', borderRadius: 99, border: `2px solid ${active ? G : '#c5c8c4'}`, background: active ? PALE : '#fff', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: active ? 700 : 500, color: active ? G : INK, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>{label}</div>
)

const NavItem = ({ icon, label, active }: { icon: string; label: string; active?: boolean }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 56, fontSize: 11, fontWeight: 700, color: active ? G : MUT, cursor: 'pointer' }}>
    <span style={{ fontSize: 20 }}>{icon}</span>
    {label}
  </div>
)

export default function RF3RefReport(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 390, height: 844, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>
      <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>U13 Girls Meg v Northgate City</span>
          <span style={{ display: 'block', fontSize: 19, fontWeight: 700 }}>Report something</span>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>What happened</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>{WHAT.map(w => <Chip key={w} label={w} active={w === 'Yellow card'} />)}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Team</div>
          <div style={{ display: 'flex', gap: 8 }}>{TEAMS.map(t => <Chip key={t} label={t} active={t === 'Northgate City'} />)}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Shirt number</div>
            <div style={{ height: 44, borderRadius: 10, border: '2px solid #c5c8c4', background: '#fff', display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 20, fontWeight: 700 }}>14</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Minute</div>
            <div style={{ height: 44, borderRadius: 10, border: '2px solid #c5c8c4', background: '#fff', display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 20, fontWeight: 700 }}>38</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Why</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>{WHY.map(w => <Chip key={w} label={w} active={w === 'Late tackle'} />)}</div>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          <button style={{ width: '100%', height: 50, borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Send to Ruth</button>
        </div>
      </div>
      <nav style={{ flex: 'none', display: 'flex', borderTop: '1px solid #c5c8c4', background: '#fff' }}>
        <NavItem icon="📅" label="My games" />
        <NavItem icon="📋" label="Report" active />
        <NavItem icon="💬" label="Feedback" />
        <NavItem icon="👤" label="Me" />
      </nav>
    </div>
  )
}
