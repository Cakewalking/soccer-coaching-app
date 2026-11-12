import { useState } from 'react'
const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', PALE = '#eef5f2'

const WHAT = ['Yellow card','Red card','Injury','Spectator behaviour','Other']
const WHY = ['Late tackle','Handball','Foul language','Violent conduct','Simulation','Dissent']
const TEAMS = ['Wattle Creek FC','Northgate City']

const Chip = ({ label, active, onToggle }: { label: string; active?: boolean; onToggle?: () => void }) => (
  <button onClick={onToggle} style={{ height: 36, padding: '0 14px', borderRadius: 99, border: `2px solid ${active ? G : '#c5c8c4'}`, background: active ? PALE : '#fff', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: active ? 700 : 500, color: active ? G : INK, cursor: 'pointer', whiteSpace: 'nowrap' as const, fontFamily: 'inherit' }}>{label}</button>
)

const NavItem = ({ icon, label, active }: { icon: string; label: string; active?: boolean }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 56, fontSize: 11, fontWeight: 700, color: active ? G : MUT, cursor: 'pointer' }}>
    <span style={{ fontSize: 20 }}>{icon}</span>
    {label}
  </div>
)

export default function RF3RefReport(_: { onBack?: () => void }) {
  const [activeWhat, setActiveWhat] = useState('Yellow card')
  const [activeTeam, setActiveTeam] = useState('Northgate City')
  const [activeWhy, setActiveWhy] = useState('Late tackle')
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

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
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>{WHAT.map(w => <Chip key={w} label={w} active={w === activeWhat} onToggle={() => setActiveWhat(w)} />)}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Team</div>
          <div style={{ display: 'flex', gap: 8 }}>{TEAMS.map(t => <Chip key={t} label={t} active={t === activeTeam} onToggle={() => setActiveTeam(t)} />)}</div>
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
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>{WHY.map(w => <Chip key={w} label={w} active={w === activeWhy} onToggle={() => setActiveWhy(w)} />)}</div>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          <button onClick={() => showToast('Report sent to Ruth.')} style={{ width: '100%', height: 50, borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Send to Ruth</button>
        </div>
      </div>
      <nav style={{ flex: 'none', display: 'flex', borderTop: '1px solid #c5c8c4', background: '#fff' }}>
        <NavItem icon="📅" label="My games" />
        <NavItem icon="📋" label="Report" active />
        <NavItem icon="💬" label="Feedback" />
        <NavItem icon="👤" label="Me" />
      </nav>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
