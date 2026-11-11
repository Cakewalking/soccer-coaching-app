import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function AC6AcademyCoaches(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const coaches = [
    {
      name: 'Reece Whitlam', initials: 'RW', avatarBg: '#d4b89a',
      wwcLabel: 'Valid · 2027', wwcBg: '#e3f0ea', wwcColor: GD,
      groups: 'Advanced · U13 Timber',
      notes: '14 of 18 sessions', notesBg: '#e3f0ea', notesColor: GD,
    },
    {
      name: 'Sofia Mendez', initials: 'SM', avatarBg: '#b8c4d4',
      wwcLabel: 'Runs out in 60 days', wwcBg: '#fef3cd', wwcColor: '#7a5c0a',
      groups: 'Development',
      notes: '12 of 18', notesBg: '#e3f0ea', notesColor: GD,
    },
    {
      name: 'Jin Park', initials: 'JP', avatarBg: '#c4d4b8',
      wwcLabel: 'Valid · 2026', wwcBg: '#e3f0ea', wwcColor: GD,
      groups: 'Foundation',
      notes: '8 of 18 sessions', notesBg: '#ebebeb', notesColor: MUT,
    },
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
            <button key={label} style={{ background: label === 'Coaches' ? GD : 'transparent', color: '#fff', border: 'none', borderRadius: 8, padding: '0 14px', height: 40, fontSize: 14, fontWeight: label === 'Coaches' ? 700 : 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
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
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>Coaches</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>3 coaches · Tall Timber Academy</div>
        </div>
        <div>
          <button onClick={() => t('Coach invite link copied.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Invite a coach</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, alignItems: 'start' }}>

        {/* Left 8 cols */}
        <div style={{ gridColumn: 'span 8', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 10px' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>Coaches</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 180px 180px 180px', padding: '8px 18px', borderTop: `1px solid ${LN}`, borderBottom: `1px solid ${LN}`, background: '#fafafa' }}>
            {['Coach', 'WWC', 'Groups', 'Notes this term'].map(h => (
              <div key={h} style={{ fontSize: 12, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: 0.4 }}>{h}</div>
            ))}
          </div>
          {coaches.map(c => (
            <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '2fr 180px 180px 180px', padding: '0 18px', minHeight: 68, alignItems: 'center', borderTop: `1px solid #f0f0ef` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: c.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.initials}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: INK }}>{c.name}</div>
              </div>
              <div>
                <span style={{ background: c.wwcBg, color: c.wwcColor, fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{c.wwcLabel}</span>
              </div>
              <div style={{ fontSize: 13, color: MUT }}>{c.groups}</div>
              <div>
                <span style={{ background: c.notesBg, color: c.notesColor, fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{c.notes}</span>
              </div>
            </div>
          ))}
          <div style={{ padding: '10px 18px 14px', borderTop: `1px solid ${LN}` }}>
            <div style={{ color: MUT, fontSize: 13 }}>{"Sofia's WWC expires soon. She's been reminded."}</div>
          </div>
        </div>

        {/* Right 4 cols */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {/* Session notes tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK }}>Session notes</div>
            {[
              { name: 'Reece', count: '14 notes' },
              { name: 'Sofia', count: '12 notes' },
              { name: 'Jin', count: '8 notes' },
            ].map(r => (
              <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6 }}>
                <div style={{ fontSize: 14, color: INK, fontWeight: 500 }}>{r.name}</div>
                <span style={{ background: PALE, color: G, fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{r.count}</span>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 10, marginTop: 2 }}>{"Notes become each player's term report."}</div>
          </div>

          {/* Why notes matter tile */}
          <div style={{ background: PALE, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: GD }}>Why notes matter</div>
            <div style={{ fontSize: 14, color: GD, lineHeight: 1.5 }}>A note after each session means every player's report writes itself. Coaches who note more give families more.</div>
          </div>
        </div>

      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
