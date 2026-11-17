import { type RoleId } from './tours'
import { Chevron, DeviceIcon, ROLE_COUNT, INK, MUT, BORDER, LN, PALE, BG, GD } from './rolePicker'

// STA3p-PickRolePhone: the roles made for a phone, one tap each. No switch here:
// guided tours need a bigger screen, so every row opens that role's home.

const GROUPS: { title: string; roles: { id: RoleId; name: string; desc: string }[] }[] = [
  { title: 'At a club', roles: [
    { id: 'parent',       name: 'Parent',             desc: 'as Linh Tran, Mia’s mum' },
    { id: 'manager',      name: 'Team manager',       desc: 'as Rob Owusu, U12 Sam' },
    { id: 'playeryoung',  name: 'Player under 15',    desc: 'as Mia Tran, 11' },
    { id: 'playerolder',  name: 'Player 15 and over', desc: 'as Cal West, 16' },
    { id: 'referee',      name: 'Referee',            desc: 'as Zoe Park, 16' },
    // Not in the drawn picker, but the coach's phone view is built, so it stays reachable.
    { id: 'coach',        name: 'Junior coach, pitch-side', desc: 'as Sam K, U12 Sam' },
  ] },
  { title: 'At a private academy', roles: [
    { id: 'academyparent', name: 'Academy parent', desc: 'as Tess Okonkwo, mum of Kai, 13' },
    { id: 'academyplayer', name: 'Academy player', desc: 'as Kai Okonkwo, 13' },
  ] },
]
const COUNT = GROUPS.reduce((n, g) => n + g.roles.length, 0)

interface Props {
  onLook: (role: RoleId) => void
  onWhy: () => void
  onSandbox: () => void
  /** Shown on a big screen that opened the phone start: a way back to every role. */
  onAllRoles?: () => void
}

export default function DemoPhone({ onLook, onWhy, onSandbox, onAllRoles }: Props) {
  const btn: React.CSSProperties = { flex: 1, height: 48, borderRadius: 12, border: `1px solid ${BORDER}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }
  return (
    <div data-screen="STA3p-PickRolePhone" style={{ minHeight: '100dvh', background: BG, fontFamily: 'var(--font-sans)', color: INK, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: INK, padding: '10px 16px', fontSize: 14, color: '#fff', lineHeight: 1.35 }}><strong>Demo.</strong> Everyone here is made up. Nothing you tap is saved.</div>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '14px 16px 16px' }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em' }}>Pick who you are</h1>
        <p style={{ margin: '4px 0 0', fontSize: 15, color: MUT, lineHeight: 1.35 }}>The {COUNT} roles made for a phone. One tap opens their home.</p>
        {GROUPS.map(g => (
          <section key={g.title} aria-label={g.title}>
            <h2 style={{ margin: '12px 2px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{g.title}</h2>
            <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
              {g.roles.map((r, i) => (
                <button key={r.id} onClick={() => onLook(r.id)} aria-label={`${r.name}, ${r.desc}. Opens their home screen.`} style={{ width: '100%', minHeight: 54, display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', border: 0, borderTop: i ? `1px solid ${LN}` : 0, background: '#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', boxSizing: 'border-box' }}>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 16, fontWeight: 700, lineHeight: 1.25 }}>{r.name}</span>
                    <span style={{ display: 'block', fontSize: 13, color: MUT, lineHeight: 1.3 }}>{r.desc}</span>
                  </span>
                  <Chevron />
                </button>
              ))}
            </div>
          </section>
        ))}
        <div style={{ flexGrow: 1, minHeight: 12 }} />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: PALE, borderRadius: 14, padding: '10px 14px', fontSize: 13, color: GD, lineHeight: 1.4, marginBottom: 10 }}>
          <span style={{ flex: 'none' }}><DeviceIcon phone={false} color={GD} /></span>
          <span><strong>{ROLE_COUNT - COUNT} more roles on a bigger screen.</strong> Coaches, the club and the guided tours need a tablet or laptop. Open this address there.</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {onAllRoles ? <button style={btn} onClick={onAllRoles}>All {ROLE_COUNT} roles</button> : <button style={btn} onClick={onWhy}>Why trust it</button>}
          <button style={btn} onClick={onSandbox}>Start empty</button>
        </div>
      </div>
    </div>
  )
}
