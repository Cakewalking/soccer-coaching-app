import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function AC5Fees(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const lateRows = [
    { family: 'Chen family · Lola', amount: '$290', weeks: '3 weeks', action: 'Offer a plan', toastMsg: 'Payment plan sent to Chen family.', primary: true },
    { family: 'Morris family · Finn', amount: '$290', weeks: '2 weeks', action: 'Offer a plan', toastMsg: 'Payment plan sent to Morris family.', primary: true },
    { family: 'Patel family · Priya', amount: '$290', weeks: '2 weeks', action: 'Offer a plan', toastMsg: 'Payment plan sent to Patel family.', primary: true },
    { family: 'Lew family · Hamish', amount: '$290', weeks: '1 week', action: 'Send reminder', toastMsg: 'Reminder sent.', primary: false },
  ]

  const payMethods = [
    { label: 'Card saved in app', count: '61 families', badgeBg: '#e3f0ea', badgeColor: GD },
    { label: 'Direct debit', count: '12 families', badgeBg: '#ebebeb', badgeColor: MUT },
    { label: 'Invoice', count: '5 families', badgeBg: '#ebebeb', badgeColor: MUT },
    { label: 'Scholarship', count: '2 families', badgeBg: '#ebebeb', badgeColor: MUT },
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
            <button key={label} style={{ background: label === 'Money' ? GD : 'transparent', color: '#fff', border: 'none', borderRadius: 8, padding: '0 14px', height: 40, fontSize: 14, fontWeight: label === 'Money' ? 700 : 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
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
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>Fees</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>Term 2 · week 7 of 10</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => t('Exporting statement...')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Export</button>
          <button onClick={() => t('Message sent to 4 families.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Message late payers</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>

        {/* 4 stat tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            { label: 'Collected', value: '$21,180', sub: 'this term', color: INK },
            { label: 'Late', value: '$1,160', sub: '4 families', color: '#b93333' },
            { label: 'On a plan', value: '$680', sub: '2 families', color: INK },
            { label: 'One-on-ones', value: '$7,740', sub: 'paid in advance', color: INK },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>{s.label}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: s.color, lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: MUT }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Bottom two-col */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 14, flex: 1, alignItems: 'start' }}>

          {/* Late payers tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px 10px' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>Late payers</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 100px 110px 1fr', padding: '8px 18px', borderTop: `1px solid ${LN}`, borderBottom: `1px solid ${LN}`, background: '#fafafa' }}>
              {['Family', 'Amount', 'Weeks late', 'Action'].map(h => (
                <div key={h} style={{ fontSize: 12, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: 0.4 }}>{h}</div>
              ))}
            </div>
            {lateRows.map(r => (
              <div key={r.family} style={{ display: 'grid', gridTemplateColumns: '2fr 100px 110px 1fr', padding: '0 18px', minHeight: 56, alignItems: 'center', borderTop: `1px solid #f0f0ef` }}>
                <div style={{ fontSize: 14, color: INK, fontWeight: 500 }}>{r.family}</div>
                <div style={{ fontSize: 14, color: INK, fontWeight: 600 }}>{r.amount}</div>
                <div style={{ fontSize: 13, color: '#b93333' }}>{r.weeks}</div>
                <div>
                  <button onClick={() => t(r.toastMsg)} style={{ height: 36, padding: '0 14px', borderRadius: 8, background: r.primary ? G : '#fff', color: r.primary ? '#fff' : INK, border: r.primary ? 'none' : '1px solid #c5c8c4', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{r.action}</button>
                </div>
              </div>
            ))}
          </div>

          {/* How families pay tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: INK, marginBottom: 12 }}>How families pay</div>
            {payMethods.map((m, i) => (
              <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: i === 0 ? 0 : 12, paddingBottom: 12, borderBottom: i < payMethods.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ fontSize: 14, color: INK }}>{m.label}</div>
                <span style={{ background: m.badgeBg, color: m.badgeColor, fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{m.count}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, fontSize: 12, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 10 }}>Scholarships are not shown in the totals above.</div>
          </div>

        </div>
      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
