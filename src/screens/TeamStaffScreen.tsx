import { useState } from 'react'

const G   = '#2f6252'
const GD  = '#1f4a3e'
const INK = '#10211f'
const MUT = '#4a5a57'
const LN  = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'
const WARN = '#c3a84a'

const STAFF = [
  {
    ini: 'SK', name: 'Sam Kelly',   role: 'Head coach',      color: GD,
    looks: 'Plans, line-ups, clips, player goals',
    wwc: { status: 'valid' as const, label: 'Valid · Mar 2028' },
    parent: false,
  },
  {
    ini: 'JM', name: 'Jess Marsh',  role: 'Co-coach',        color: G,
    looks: "Same as Sam · Leo's mum",
    wwc: { status: 'valid' as const, label: 'Valid · Jun 2027' },
    parent: true,
  },
  {
    ini: 'RO', name: 'Rob Owusu',   role: 'Team manager',    color: '#40826d',
    looks: 'Availability, messages, roster, first-aid card · Grace\'s dad',
    wwc: { status: 'valid' as const, label: 'Valid · Feb 2028' },
    parent: true,
  },
  {
    ini: 'PS', name: 'Priya Shah',  role: 'Fitness (club)',  color: WARN,
    looks: 'Growth, load and tests for 4 teams',
    wwc: { status: 'warn' as const, label: 'Ends in 29 days' },
    parent: false,
  },
]

const ROLE_MATRIX = [
  { label: 'Training plans and drills',  coach: true,  coCo: true,  mgr: false, fit: false },
  { label: 'Clips and match numbers',    coach: true,  coCo: true,  mgr: false, fit: false },
  { label: 'Wellness, growth, pain',     coach: true,  coCo: true,  mgr: false, fit: true  },
  { label: 'First-aid card',             coach: true,  coCo: true,  mgr: true,  fit: false },
  { label: 'Availability and fixtures',  coach: true,  coCo: true,  mgr: true,  fit: false },
  { label: 'Messages to parents',        coach: true,  coCo: true,  mgr: false, fit: false },
  { label: 'Duty roster and kit',        coach: 'View',coCo: 'View',mgr: true,  fit: false },
]

const PLAY_LEVELS = [
  { level: 'Play',          ages: 'U6 to U12',          roles: ['Coach', 'Co-coach', 'Team manager'] },
  { level: 'Grow',          ages: 'U13 to U16',          roles: ['Coach', 'Co-coach', 'Team manager', 'Club fitness lead'] },
  { level: 'Perform · Pro', ages: 'NPL, academy',        roles: ['Head coach', 'Assistants', 'GK coach', 'S&C', 'Physio', 'Analyst', 'Team manager'] },
]

function Check({ yes }: { yes: boolean | string }) {
  if (yes === false) return <span style={{ fontSize: 13, color: LN, fontWeight: 700 }}>—</span>
  if (yes === 'View') return <span style={{ fontSize: 11, fontWeight: 700, color: MUT, background: '#f0f1f0', borderRadius: 999, padding: '1px 7px' }}>View</span>
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="yes"><polyline points="20 6 9 17 4 12"/></svg>
}

export default function TeamStaffScreen() {
  const [inviteOpen, setInviteOpen] = useState(false)

  return (
    <main style={{ flexGrow: 1, padding: '24px 28px', boxSizing: 'border-box' as const, display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Team staff</h1>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>U12 Sam · Play level · a usual community team: two coaches and a team manager</div>
        </div>
        <button onClick={() => setInviteOpen(true)} style={{ height: 40, padding: '0 18px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Invite</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 20, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Staff table */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 180px 150px', padding: '8px 16px', borderBottom: `1px solid ${LN}`, gap: 8 }}>
              {['', 'PERSON', 'LOOKS AFTER', 'CHILDREN CHECK'].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>{h}</span>
              ))}
            </div>
            {STAFF.map((s, i) => (
              <div key={s.ini} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 180px 150px', padding: '12px 16px', borderBottom: i < STAFF.length - 1 ? `1px solid ${LN}` : 'none', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.color, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.ini}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: G, fontWeight: 600 }}>{s.role}</div>
                </div>
                <div style={{ fontSize: 12, color: MUT, lineHeight: 1.4 }}>{s.looks}</div>
                <div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, borderRadius: 999, padding: '2px 9px',
                    color: s.wwc.status === 'valid' ? G : ROSE,
                    background: s.wwc.status === 'valid' ? PALE : '#fdf4f4',
                  }}>{s.wwc.label}</span>
                  {s.wwc.status === 'warn' && (
                    <div style={{ fontSize: 11, color: WARN, marginTop: 3 }}>Renew before it expires</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Who sees what */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>WHO SEES WHAT</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px 80px', padding: '8px 16px', borderBottom: `1px solid ${LN}` }}>
              {['', 'COACH', 'CO-COACH', 'MANAGER', 'FITNESS'].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT, textAlign: h ? 'center' : 'left' as const }}>{h}</span>
              ))}
            </div>
            {ROLE_MATRIX.map((row, i) => (
              <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px 80px', padding: '10px 16px', borderBottom: i < ROLE_MATRIX.length - 1 ? `1px solid ${LN}` : 'none', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: INK }}>{row.label}</span>
                {[row.coach, row.coCo, row.mgr, row.fit].map((v, ci) => (
                  <div key={ci} style={{ display: 'flex', justifyContent: 'center' }}><Check yes={v} /></div>
                ))}
              </div>
            ))}
            <div style={{ padding: '10px 16px', background: PALE, borderTop: `1px solid ${LN}` }}>
              <div style={{ fontSize: 12, color: G, lineHeight: 1.5 }}>
                Club rule: the manager sees only the first-aid card — asthma, allergies, emergency contacts — and only if parents tick it in consent. The director can change this for the club.
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Play levels */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>WHO A TEAM USUALLY HAS, BY LEVEL</div>
            {PLAY_LEVELS.map((pl, i) => (
              <div key={pl.level} style={{ padding: '12px 16px', borderBottom: i < PLAY_LEVELS.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{pl.level}</span>
                  <span style={{ fontSize: 12, color: MUT }}>{pl.ages}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
                  {pl.roles.map(r => (
                    <span key={r} style={{ fontSize: 11, fontWeight: 600, color: G, background: PALE, borderRadius: 999, padding: '2px 8px' }}>{r}</span>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ padding: '10px 16px', background: '#fafafa', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>
              NPL and academy roles appear when the director sets a team to Perform or Pro.
            </div>
          </div>

          {/* Priya WWC warning card */}
          <div style={{ background: '#fdf8ed', border: `1px solid #e8d8a0`, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={WARN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true"><path d="M12 8v5M12 16h.01M12 3a9 9 0 100 18 9 9 0 000-18z"/></svg>
              <div style={{ fontSize: 13, color: '#7a6218', lineHeight: 1.5 }}>
                <strong>Priya Shah's check expires in 29 days.</strong> If it lapses, she can't be shown player data until it's renewed.
              </div>
            </div>
            <button style={{ marginTop: 10, height: 32, padding: '0 14px', borderRadius: 999, border: 'none', background: WARN, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Email Priya a reminder</button>
          </div>

          {/* Quick invite */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>Invite someone to the team</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10, lineHeight: 1.5 }}>They get a link by email. They accept and join immediately.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setInviteOpen(true)} style={{ flex: 1, height: 36, borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Invite</button>
            </div>
          </div>
        </div>
      </div>

      {/* Invite overlay */}
      {inviteOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(16,33,31,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '24px', width: 400, fontFamily: 'inherit' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 16 }}>Invite to U12 Sam</div>
            {[{ label: 'Name', placeholder: 'e.g. Alex Brown' }, { label: 'Email', placeholder: 'alex.brown@example.com' }].map(f => (
              <div key={f.label} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 6 }}>{f.label.toUpperCase()}</div>
                <input placeholder={f.placeholder} style={{ width: '100%', height: 44, borderRadius: 10, border: `1px solid ${LN}`, padding: '0 12px', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' as const }} />
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 6 }}>ROLE</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {['Co-coach', 'Team manager', 'Fitness (club)', 'Other'].map(r => (
                  <button key={r} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#f7f9f7', color: MUT, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>{r}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setInviteOpen(false)} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={() => setInviteOpen(false)} style={{ flex: 1, height: 44, borderRadius: 10, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send invite</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
