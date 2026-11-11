import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function ProgBar({ pct }: { pct: number }) {
  return (
    <div style={{ height: 6, borderRadius: 3, background: LN, overflow: 'hidden', width: 120 }}>
      <div style={{ height: '100%', width: `${pct}%`, background: G, borderRadius: 3 }} />
    </div>
  )
}

export default function AC7ReportsOut(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const programs = [
    { name: 'Advanced', pct: 36, waiting: '4 waiting for you', waitBg: '#f5ede0', waitColor: '#7a5c2e' },
    { name: 'Development', pct: 10, waiting: '1 waiting for you', waitBg: '#f5ede0', waitColor: '#7a5c2e' },
    { name: 'Foundation', pct: 4, waiting: 'None waiting', waitBg: '#ebebeb', waitColor: MUT },
  ]

  const reportItems = [
    { n: 1, bold: 'Five skills, then and now', gray: "From the coach's session notes" },
    { n: 2, bold: 'What they came to', gray: 'Sessions attended this term' },
    { n: 3, bold: 'One goal for next term', gray: 'Chosen by the coach' },
    { n: 4, bold: 'A clip', gray: 'Only where the parent agreed' },
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
            <button key={label} style={{ background: label === 'Home' ? GD : 'transparent', color: '#fff', border: 'none', borderRadius: 8, padding: '0 14px', height: 40, fontSize: 14, fontWeight: label === 'Home' ? 700 : 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 15 }}>{icon}</span>{label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: '#fff', color: INK, border: 'none', borderRadius: 20, padding: '0 14px', height: 32, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Tall Timber Academy ▾</button>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>DO</div>
        </div>
      </div>

      {/* SUB NAV */}
      <div style={{ background: '#fff', height: 44, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 0, borderBottom: `1px solid ${LN}`, flexShrink: 0 }}>
        {['Overview', 'Trials', 'Reports', 'Child safety', 'Partner club'].map(tab => (
          <button key={tab} style={{ background: 'none', border: 'none', borderBottom: tab === 'Reports' ? `2px solid ${G}` : '2px solid transparent', color: tab === 'Reports' ? G : MUT, fontWeight: tab === 'Reports' ? 700 : 500, fontSize: 14, padding: '0 16px', height: 44, cursor: 'pointer' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* PAGE HEADER */}
      <div style={{ padding: '14px 28px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>Term reports</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>Term 2 · due to families in week 9</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => t('Opening sample report...')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>See a finished report</button>
          <button onClick={() => t('5 reports sent to families.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Approve 5 and send</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, alignItems: 'start' }}>

        {/* Left 7 cols */}
        <div style={{ gridColumn: 'span 7', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 8px', display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>By program</div>
            <div style={{ fontSize: 13, color: MUT }}>12 of 80 drafted</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 170px 100px', padding: '8px 18px', borderTop: `1px solid ${LN}`, borderBottom: `1px solid ${LN}`, background: '#fafafa' }}>
            {['', 'Progress', 'Waiting', 'Action'].map((h, i) => (
              <div key={i} style={{ fontSize: 12, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: 0.4 }}>{h}</div>
            ))}
          </div>
          {programs.map(p => (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 170px 100px', padding: '0 18px', minHeight: 60, alignItems: 'center', borderTop: `1px solid #f0f0ef` }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: INK }}>{p.name}</div>
              <ProgBar pct={p.pct} />
              <div>
                <span style={{ background: p.waitBg, color: p.waitColor, fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{p.waiting}</span>
              </div>
              <div>
                <button onClick={() => t(`Opening ${p.name} reports...`)} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Open</button>
              </div>
            </div>
          ))}
          <div style={{ padding: '12px 18px 14px', borderTop: `1px solid ${LN}` }}>
            <div style={{ color: MUT, fontSize: 13 }}>{"A coach checks each draft, then you approve it. Nothing reaches a parent that a person hasn't read."}</div>
          </div>
        </div>

        {/* Right 5 cols */}
        <div style={{ gridColumn: 'span 5', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: INK, marginBottom: 8 }}>What a report holds</div>
          {reportItems.map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: item.n === 1 ? 0 : 12, borderTop: item.n === 1 ? 'none' : `1px solid ${LN}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: G, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{item.n}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{item.bold}</div>
                <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{item.gray}</div>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 12, marginTop: 8 }}>No rankings and no comparing children. Each report is the child against their own last term.</div>
        </div>

      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
