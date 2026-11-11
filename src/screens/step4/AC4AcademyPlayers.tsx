import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function Badge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap' as const }}>{label}</span>
}

export default function AC4AcademyPlayers(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const players = [
    { name: 'Kai Okonkwo', age: 13, program: 'Advanced', came: '5 of 6', club: 'U13 Timber', reportLabel: 'With coach', reportBg: '#ebebeb', reportColor: MUT, feeLabel: 'Paid', feeBg: '#e3f0ea', feeColor: GD },
    { name: 'Ana Costa', age: 13, program: 'Advanced', came: '4 of 6', club: 'U13 Timber', reportLabel: 'Drafted', reportBg: PALE, reportColor: G, feeLabel: 'Paid', feeBg: '#e3f0ea', feeColor: GD },
    { name: 'Jonah Marsh', age: 12, program: 'Advanced', came: '5 of 6', club: 'U13 Timber', reportLabel: 'Waiting for you', reportBg: '#f5ede0', reportColor: '#7a5c2e', feeLabel: 'Paid', feeBg: '#e3f0ea', feeColor: GD },
    { name: 'Lola Ferris', age: 11, program: 'Development', came: '6 of 6', club: '—', reportLabel: 'Not started', reportBg: '#ebebeb', reportColor: MUT, feeLabel: '3 weeks late', feeBg: '#fce8e8', feeColor: '#b93333' },
    { name: 'Zane Abbas', age: 13, program: 'Advanced', came: '4 of 6', club: 'U13 Timber', reportLabel: 'With coach', reportBg: '#ebebeb', reportColor: MUT, feeLabel: 'Paid', feeBg: '#e3f0ea', feeColor: GD },
    { name: 'Mila Wójcik', age: 12, program: 'Advanced', came: '5 of 6', club: 'U13 Timber', reportLabel: 'With coach', reportBg: '#ebebeb', reportColor: MUT, feeLabel: 'On a plan', feeBg: PALE, feeColor: MUT },
    { name: 'Finn Byrne', age: 11, program: 'Development', came: '5 of 6', club: '—', reportLabel: 'Not started', reportBg: '#ebebeb', reportColor: MUT, feeLabel: 'Paid', feeBg: '#e3f0ea', feeColor: GD },
    { name: 'Arjun Mehta', age: 10, program: 'Development', came: '1 of 1', club: '—', reportLabel: 'Too new', reportBg: '#ebebeb', reportColor: MUT, feeLabel: 'Paid', feeBg: '#e3f0ea', feeColor: GD },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>

      {/* TOP NAV */}
      <div style={{ background: G, height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 0, flexShrink: 0 }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 20, letterSpacing: -0.5, marginRight: 36 }}>Clean Sheet</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {[
            { label: 'Home', icon: '⌂' },
            { label: 'Programs', icon: '☰' },
            { label: 'Players', icon: '👤' },
            { label: 'Coaches', icon: '🎓' },
            { label: 'Money', icon: '$' },
          ].map(({ label, icon }) => (
            <button key={label} style={{ background: label === 'Players' ? GD : 'transparent', color: '#fff', border: 'none', borderRadius: 8, padding: '0 14px', height: 40, fontSize: 14, fontWeight: label === 'Players' ? 700 : 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 15 }}>{icon}</span>{label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: '#fff', color: INK, border: 'none', borderRadius: 20, padding: '0 14px', height: 32, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Tall Timber Academy ▾</button>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>DO</div>
        </div>
      </div>

      {/* PAGE HEADER */}
      <div style={{ padding: '14px 28px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>Players</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>80 players · Term 2</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => t('Exporting CSV...')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Export</button>
          <button onClick={() => t('New message to 80 families.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Message all families</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '12px 28px 18px' }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 10px' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>All players</div>
          </div>
          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 60px 130px 80px 130px 150px 120px', padding: '8px 18px', borderTop: `1px solid ${LN}`, borderBottom: `1px solid ${LN}`, background: '#fafafa' }}>
            {['Player', 'Age', 'Program', 'Came', 'Club team', 'Term report', 'Fees'].map(h => (
              <div key={h} style={{ fontSize: 12, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: 0.4 }}>{h}</div>
            ))}
          </div>
          {players.map((p) => (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '2fr 60px 130px 80px 130px 150px 120px', padding: '0 18px', minHeight: 44, alignItems: 'center', borderTop: `1px solid #f0f0ef`, fontSize: 14 }}>
              <button onClick={() => t(`Opening ${p.name}...`)} style={{ background: 'none', border: 'none', textAlign: 'left' as const, fontWeight: 600, fontSize: 14, color: G, cursor: 'pointer', padding: 0 }}>{p.name}</button>
              <div style={{ color: INK }}>{p.age}</div>
              <div style={{ color: MUT }}>{p.program}</div>
              <div style={{ color: p.came === '1 of 1' ? MUT : INK }}>{p.came}</div>
              <div style={{ color: MUT }}>{p.club}</div>
              <div><Badge label={p.reportLabel} bg={p.reportBg} color={p.reportColor} /></div>
              <div><Badge label={p.feeLabel} bg={p.feeBg} color={p.feeColor} /></div>
            </div>
          ))}
          <div style={{ padding: '10px 18px 14px', borderTop: `1px solid ${LN}` }}>
            <div style={{ color: MUT, fontSize: 13 }}>80 players shown. Click a name to open their plan.</div>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
