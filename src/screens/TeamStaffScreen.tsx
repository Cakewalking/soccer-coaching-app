const STAFF = [
  { ini: 'SK', name: 'Sam Kelly',    role: 'Head coach',       since: '2023', phone: '0412 xxx xxx' },
  { ini: 'JW', name: 'Jamie Walsh',  role: 'Assistant coach',  since: '2024', phone: '0423 xxx xxx' },
  { ini: 'PR', name: 'Paula Reyes',  role: 'Fitness coach',    since: '2024', phone: '0434 xxx xxx' },
  { ini: 'TN', name: 'Tom Nguyen',   role: 'Team manager',     since: '2023', phone: '0445 xxx xxx' },
  { ini: 'GC', name: 'Grace Chen',   role: 'First aid officer', since: '2024', phone: '0456 xxx xxx' },
]

export default function TeamStaffScreen() {
  return (
    <main style={{ flexGrow: 1, padding: '24px 28px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Team staff</h1>
        <span style={{ fontSize: 14, color: '#4a5a57' }}>{STAFF.length} people</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {STAFF.map(s => (
          <div key={s.ini} style={{
            background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16,
            padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '999px', background: '#cbbeb5',
              color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 15, flex: 'none',
            }}>{s.ini}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 700, lineHeight: '23px' }}>{s.name}</div>
              <div style={{ fontSize: 14, color: '#2f6252', fontWeight: 600, lineHeight: '20px' }}>{s.role}</div>
              <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px', marginTop: 2 }}>Since {s.since} · {s.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
