import { type RoleId } from './tours'

const PHONE_ROLES: Array<{ id: RoleId; name: string; desc: string }> = [
  { id: 'parent',       name: 'Parent',           desc: 'As Linh Tran, Mia\'s mum' },
  { id: 'manager',      name: 'Team manager',      desc: 'As Rob Owusu, U12 Sam' },
  { id: 'playeryoung',  name: 'Player under 15',   desc: 'As Mia Tran, 11' },
  { id: 'playerolder',  name: 'Player 15 and over',desc: 'As Cal West, 16' },
  { id: 'referee',      name: 'Referee',            desc: 'As Zoe Park, 16' },
  { id: 'academyparent', name: 'Academy parent',   desc: 'As Tess Okonkwo, mum of Kai, 13' },
  { id: 'academyplayer', name: 'Academy player',   desc: 'As Kai Okonkwo, 13' },
]

interface Props {
  onLook: (role: RoleId) => void
  onWhy: () => void
  onSandbox: () => void
}

export default function DemoPhone({ onLook, onWhy, onSandbox }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f4', fontFamily: 'var(--font-sans)' }}>

      {/* Top bar */}
      <div style={{ background: '#1f4a3e', padding: '0 20px', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>Demo.</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Everyone here is made up. Nothing you tap is saved.</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '24px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 24, height: 24, background: '#2f6252', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f' }}>Clean Sheet</span>
        </div>
        <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f' }}>Pick who you are</h1>
        <p style={{ margin: 0, fontSize: 14, color: '#4a5a57' }}>These are the roles that live on a phone.</p>
      </div>

      {/* Phone roles */}
      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
        {PHONE_ROLES.map(role => (
          <button key={role.id} onClick={() => onLook(role.id)} style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' as const, fontFamily: 'inherit', cursor: 'pointer', width: '100%', boxSizing: 'border-box' as const }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{role.name}</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>{role.desc}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        ))}
      </div>

      {/* Links */}
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 16 }}>
        <button onClick={onWhy} style={{ background: 'none', border: 'none', color: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Why trust it</button>
        <button onClick={onSandbox} style={{ background: 'none', border: 'none', color: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Start empty</button>
      </div>

      {/* Footer */}
      <div style={{ margin: '0 20px 32px', padding: '14px 16px', background: '#fff', border: '1px solid #c5c8c4', borderRadius: 12 }}>
        <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: 1.5 }}>Coaches and the club use a tablet or laptop. Open this address on a bigger screen for those, and for the guided tours.</div>
      </div>
    </div>
  )
}
