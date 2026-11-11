import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const BAR_DATA = [
  { month: 'Feb', pct: 54 }, { month: 'Mar', pct: 61 }, { month: 'Apr', pct: 65 },
  { month: 'May', pct: 67 }, { month: 'Jun', pct: 70 },
]
const TOGGLES = ['Headline numbers', 'Results by team', 'Safeguarding summary', 'Kit and spending', 'Player names']
export default function D6BoardReport(_: { onBack?: () => void }) {
  const [enabled, setEnabled] = useState(new Set(['Headline numbers', 'Safeguarding summary']))
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  function toggle(item: string) { setEnabled(prev => { const s = new Set(prev); s.has(item) ? s.delete(item) : s.add(item); return s }) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Reports' ? 700 : 500, color: tab === 'Reports' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff' }}>GL</div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Chair</div>
        </div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Board report</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>June 2026 · Wattle Creek FC</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 14 }}>The club is in good shape heading into the second half of the season.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
              {[{ n: '204', label: 'Players' }, { n: '61%', label: 'Goals met' }, { n: '67%', label: 'Playing our way' }, { n: '31/31', label: 'Checks clear' }].map(s => (
                <div key={s.label} style={{ background: PALE, borderRadius: 10, padding: '12px 10px', textAlign: 'center' as const }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: GD }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: MUT, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 6 }}>What went well</div>
            <div style={{ fontSize: 13, color: INK, lineHeight: 1.6, marginBottom: 14 }}>Training turnout has stayed above 85% all season. The new club course format received strong coach feedback. U15 Girls Bec won the state league mid-season cup.</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 6 }}>What needs committee attention</div>
            <div style={{ fontSize: 13, color: INK, lineHeight: 1.6, marginBottom: 14 }}>Chris Pham's children's check expires in 9 days — the board should be aware. Five player registrations with FV are outstanding.</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 8 }}>Playing our way — by month</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 60 }}>
              {BAR_DATA.map(d => (
                <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', background: G, borderRadius: '4px 4px 0 0', height: d.pct * 0.6 }} />
                  <div style={{ fontSize: 10, color: MUT }}>{d.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Include in report</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
            {TOGGLES.map(item => (
              <div key={item} onClick={() => toggle(item)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${LN}`, cursor: 'pointer' }}>
                <div style={{ fontSize: 13, color: INK }}>{item}</div>
                <div style={{ width: 36, height: 20, borderRadius: 10, background: enabled.has(item) ? G : LN, position: 'relative' as const, transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute' as const, top: 2, left: enabled.has(item) ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => t('PDF downloaded.')} style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: GD, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Download PDF</button>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
