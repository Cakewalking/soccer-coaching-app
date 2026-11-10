const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

type Status = 'in' | 'maybe' | 'out' | 'none'
const PLAYERS: { name: string; status: Status }[] = [
  { name: 'Mia', status: 'in' }, { name: 'Ruby', status: 'in' }, { name: 'Leo', status: 'in' },
  { name: 'Ava', status: 'in' }, { name: 'Grace', status: 'in' }, { name: 'Jai', status: 'in' },
  { name: 'Isla', status: 'in' }, { name: 'Ella', status: 'in' }, { name: 'Finn', status: 'in' },
  { name: 'Harper', status: 'in' }, { name: 'Noah', status: 'in' }, { name: 'Zoe', status: 'in' },
  { name: 'Luca', status: 'maybe' }, { name: 'Riley', status: 'out' }, { name: 'Sam B', status: 'out' },
  { name: 'Jordan', status: 'none' }, { name: 'Alex', status: 'none' },
]
const statusColor: Record<Status, string> = { in: G, maybe: '#b78c00', out: '#c05', none: LN }
const statusLabel: Record<Status, string> = { in: 'Coming', maybe: 'Maybe', out: "Can't", none: '—' }

export default function TM6WhoComing(_: { onBack?: () => void }) {
  const counts = PLAYERS.reduce<Record<Status, number>>((acc, p) => { acc[p.status]++; return acc }, { in: 0, maybe: 0, out: 0, none: 0 })

  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844 }}>
      <div style={{ background: GD, padding: '12px 16px 0', paddingTop: 'env(safe-area-inset-top, 12px)' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto' as const }}>
          {['Team', 'Who\'s coming', 'Training', 'Game day', 'Squad'].map(t => (
            <div key={t} style={{ fontSize: 13, fontWeight: t === "Who's coming" ? 700 : 500, color: t === "Who's coming" ? '#fff' : 'rgba(255,255,255,0.65)', padding: '8px 0', borderBottom: t === "Who's coming" ? '2px solid #fff' : '2px solid transparent', whiteSpace: 'nowrap' as const, cursor: 'pointer' }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Who's coming</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>Next game · Sat 6 Jun vs Riverside FC</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
          {([['in', 'Coming'], ['maybe', 'Maybe'], ['out', "Can't"], ['none', 'No answer']] as const).map(([k, label]) => (
            <div key={k} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '8px 10px', textAlign: 'center' as const }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: statusColor[k] }}>{counts[k]}</div>
              <div style={{ fontSize: 11, color: MUT }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {PLAYERS.map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: statusColor[p.status] }}>{statusLabel[p.status]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
