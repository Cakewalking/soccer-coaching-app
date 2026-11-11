import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function AC1eAcademyHomeEmpty(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

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
            <button key={label} style={{ background: label === 'Home' ? GD : 'transparent', color: '#fff', border: 'none', borderRadius: 8, padding: '0 14px', height: 40, fontSize: 14, fontWeight: label === 'Home' ? 700 : 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 15 }}>{icon}</span>{label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: '#fff', color: INK, border: 'none', borderRadius: 20, padding: '0 14px', height: 32, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Tall Timber Academy ▾
          </button>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>DO</div>
        </div>
      </div>

      {/* SUB NAV */}
      <div style={{ background: '#fff', height: 44, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 0, borderBottom: `1px solid ${LN}`, flexShrink: 0 }}>
        {['Overview', 'Trials', 'Reports', 'Child safety', 'Partner club'].map(tab => (
          <button key={tab} style={{ background: 'none', border: 'none', borderBottom: tab === 'Overview' ? `2px solid ${G}` : '2px solid transparent', color: tab === 'Overview' ? G : MUT, fontWeight: tab === 'Overview' ? 700 : 500, fontSize: 14, padding: '0 16px', height: 44, cursor: 'pointer' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* PAGE HEADER */}
      <div style={{ padding: '14px 28px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>Overview</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>Tall Timber Academy · no programs yet</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>

        {/* Left 8 cols: empty state tile */}
        <div style={{ gridColumn: 'span 8', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 16, maxWidth: 400, textAlign: 'center' as const, margin: 'auto' }}>
            <div style={{ width: 60, height: 60, borderRadius: 30, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📋</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: INK, marginBottom: 8 }}>Add your first program</div>
              <div style={{ fontSize: 15, color: MUT, lineHeight: 1.5 }}>A program is a group that trains together — Foundation, Development, or one-on-one sessions.</div>
            </div>
            <button onClick={() => t('New program setup...')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
              Add a program
            </button>
          </div>
        </div>

        {/* Right 4 cols: steps tile */}
        <div style={{ gridColumn: 'span 4', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: INK, marginBottom: 4 }}>Three steps to open</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16, flex: 1 }}>
            {[
              { n: 1, bold: 'Add a program', gray: 'Set the age group, days and times' },
              { n: 2, bold: 'Add your coaches', gray: 'They get their own login' },
              { n: 3, bold: 'Share the trial link', gray: 'Families book their first session' },
            ].map(({ n, bold, gray }) => (
              <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: G, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{n}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{bold}</div>
                  <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{gray}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ color: MUT, fontSize: 13, borderTop: `1px solid ${LN}`, paddingTop: 10, marginTop: 4 }}>Takes about 10 minutes.</div>
        </div>

      </div>

      {/* TOAST */}
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
