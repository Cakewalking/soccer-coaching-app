import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

function CapBar({ filled, total, pct }: { filled: number; total: number; pct: number }) {
  const full = pct >= 100
  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
      <div style={{ height: 6, borderRadius: 3, background: LN, overflow: 'hidden', width: 100 }}>
        <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: full ? G : '#8bb8ac', borderRadius: 3 }} />
      </div>
      <div style={{ fontSize: 12, color: full ? G : MUT, fontWeight: full ? 700 : 400 }}>{filled}/{total}</div>
    </div>
  )
}

export default function AC2Programs(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const programs = [
    { name: 'Foundation', filled: 1, total: 28, pct: 4, waiting: null },
    { name: 'Development', filled: 25, total: 30, pct: 83, waiting: null },
    { name: 'Advanced', filled: 22, total: 22, pct: 100, waiting: '5 waiting' },
    { name: 'One-on-one', filled: 6, total: 8, pct: 75, waiting: null },
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
            <button key={label} style={{ background: label === 'Programs' ? GD : 'transparent', color: '#fff', border: 'none', borderRadius: 8, padding: '0 14px', height: 44, fontSize: 14, fontWeight: label === 'Programs' ? 700 : 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 15 }}>{icon}</span>{label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: '#fff', color: INK, border: 'none', borderRadius: 20, padding: '0 14px', height: 44, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Tall Timber Academy ▾</button>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>DO</div>
        </div>
      </div>

      {/* SUB NAV */}
      <div style={{ background: '#fff', height: 44, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 0, borderBottom: `1px solid ${LN}`, flexShrink: 0 }}>
        {['Term programs', 'Holiday clinic'].map(tab => (
          <button key={tab} style={{ background: 'none', border: 'none', borderBottom: tab === 'Term programs' ? `2px solid ${G}` : '2px solid transparent', color: tab === 'Term programs' ? G : MUT, fontWeight: tab === 'Term programs' ? 700 : 500, fontSize: 14, padding: '0 16px', height: 44, cursor: 'pointer' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* PAGE HEADER */}
      <div style={{ padding: '14px 28px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>Programs</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>Term 2 · 80 players across 3 programs</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => t('Link copied.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Copy enrolment link</button>
          <button onClick={() => t('New program setup...')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>+ New program</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, alignItems: 'start' }}>

        {/* Left 8 cols */}
        <div style={{ gridColumn: 'span 8', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: 0, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 10px' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>Term programs</div>
          </div>
          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 130px 1fr', padding: '8px 18px', borderTop: `1px solid ${LN}`, borderBottom: `1px solid ${LN}` }}>
            {['Program', 'Capacity', 'Waiting', 'Actions'].map(h => (
              <div key={h} style={{ fontSize: 12, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>{h}</div>
            ))}
          </div>
          {programs.map((p) => (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 130px 1fr', padding: '0 18px', minHeight: 66, alignItems: 'center', borderTop: `1px solid #e9eae8` }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: INK }}>{p.name}</div>
              <CapBar filled={p.filled} total={p.total} pct={p.pct} />
              <div>
                {p.waiting
                  ? <span style={{ background: '#f5ede0', color: '#7a5c2e', fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{p.waiting}</span>
                  : <span style={{ color: MUT, fontSize: 13 }}>None</span>
                }
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                <button onClick={() => t(`Opening ${p.name}...`)} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Open</button>
                {p.name === 'Development' && (
                  <button onClick={() => t('Copying to term 3...')} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Copy to term 3</button>
                )}
                {p.name === 'Advanced' && (
                  <button onClick={() => t('Offer link copied.')} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Offer link</button>
                )}
              </div>
            </div>
          ))}
          <div style={{ padding: '10px 18px 14px', borderTop: `1px solid ${LN}` }}>
            <div style={{ color: MUT, fontSize: 13 }}>Full programs keep taking sign-ups for the waiting list.</div>
          </div>
        </div>

        {/* Right 4 cols */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {/* Waiting list tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK }}>Waiting list</div>
            <div style={{ fontSize: 14, color: MUT }}>Advanced has 5 waiting</div>
            <button onClick={() => t('Offer sent to 2 families.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>Offer 2 places</button>
          </div>
          {/* Holiday clinic tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK }}>Holiday clinic</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: INK }}>31 <span style={{ fontSize: 14, fontWeight: 500, color: MUT }}>of 40 booked</span></div>
            <div style={{ fontSize: 13, color: MUT }}>July 6–8</div>
            <button onClick={() => t('Opening holiday clinic...')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>Open holiday clinic</button>
          </div>
        </div>

      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
