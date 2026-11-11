import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const TODAY_COL = 5 // June = index 5 (0-based)
const ROWS = [
  { label: 'MiniRoos U6–U11', color: '#1565c0', spans: [{ s: 2, e: 10 }] },
  { label: 'Juniors U12–U18', color: G, spans: [{ s: 2, e: 10 }] },
  { label: 'Seniors & NPL', color: '#7b1fa2', spans: [{ s: 1, e: 11 }] },
  { label: 'Fitness tests', color: '#f57c00', spans: [{ s: 2, e: 3 }, { s: 7, e: 8 }] },
  { label: 'Coach courses', color: '#c62828', spans: [{ s: 1, e: 2 }, { s: 5, e: 6 }, { s: 9, e: 10 }] },
  { label: 'Registrations', color: '#00838f', spans: [{ s: 0, e: 1 }, { s: 10, e: 11 }] },
]
export default function FY1SeasonPlan(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  const COL_W = 74
  const LEFT_W = 140
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Club' ? 700 : 500, color: tab === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Season plan 2026</div>
            <div style={{ fontSize: 13, color: MUT }}>Thu 4 Jun · Round 9 of 18</div>
          </div>
          <button onClick={() => t('Opening grading planner…')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Plan grading days</button>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', padding: '20px 20px' }}>
          <div style={{ display: 'flex', marginBottom: 8 }}>
            <div style={{ width: LEFT_W, flexShrink: 0 }} />
            {MONTHS.map((m, i) => (
              <div key={m} style={{ width: COL_W, flexShrink: 0, fontSize: 11, fontWeight: i === TODAY_COL ? 800 : 600, color: i === TODAY_COL ? GD : MUT, textAlign: 'center' as const }}>{m}</div>
            ))}
          </div>
          <div style={{ position: 'relative' as const }}>
            <div style={{ position: 'absolute' as const, left: LEFT_W + TODAY_COL * COL_W + COL_W / 2, top: 0, bottom: 0, width: 2, background: '#e53935', zIndex: 2 }} />
            {ROWS.map((row) => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, position: 'relative' as const }}>
                <div style={{ width: LEFT_W, flexShrink: 0, fontSize: 12, fontWeight: 600, color: MUT, paddingRight: 10 }}>{row.label}</div>
                <div style={{ position: 'relative' as const, height: 28, flex: 1 }}>
                  {row.spans.map((sp, si) => (
                    <div key={si} style={{ position: 'absolute' as const, left: sp.s * COL_W, width: (sp.e - sp.s) * COL_W, height: 28, background: row.color, borderRadius: 8, opacity: 0.85 }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
            <div style={{ width: 2, height: 16, background: '#e53935' }} />
            <div style={{ fontSize: 12, color: MUT }}>Today · Thu 4 Jun</div>
          </div>
        </div>
        <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px', marginTop: 16 }}>
          <div style={{ fontSize: 13, color: GD }}>MiniRoos season ends Round 18 (Oct). Registrations for 2027 open in November — set a reminder below.</div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
