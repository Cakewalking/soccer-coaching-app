import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const HIGHLIGHTS = [
  { icon: '🏆', text: 'U15 Girls Bec won the state league mid-season cup — first title in 7 years' },
  { icon: '📈', text: 'Playing our way up from 51% to 67% over the season — biggest jump in the club\'s history' },
  { icon: '👥', text: 'Registrations up 16 on last year · strongest MiniRoos intake ever' },
  { icon: '✅', text: 'All 31 coaches hold current children\'s checks for the first time' },
]
const TO_FIX = [
  { text: 'Chris Pham\'s children\'s check expires before season end', urgent: true },
  { text: '5 player registrations outstanding with Football Victoria', urgent: false },
  { text: 'U13 Chris fair game time below the 50% policy line', urgent: false },
]
export default function DB2SeasonReview(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
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
      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Season review 2026</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Wattle Creek FC · Round 9 of 18</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
          {[
            { label: 'Registered players', val: '192', sub: '+16 on last year' },
            { label: 'Goals met', val: '61%', sub: 'of player goals' },
            { label: 'Playing our way', val: '67%', sub: 'up from 51%' },
            { label: 'Best result', val: '16W', sub: 'U15 Girls state cup' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: GD }}>{s.val}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Season highlights</div>
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px', marginBottom: 8, display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{h.icon}</span>
                <span style={{ fontSize: 13, color: INK, lineHeight: 1.5 }}>{h.text}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>To fix by season end</div>
            {TO_FIX.map((f, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${f.urgent ? '#ffd0d0' : LN}`, borderRadius: 12, padding: '12px 16px', marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.urgent ? '#c00' : '#f57c00', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: INK }}>{f.text}</span>
              </div>
            ))}
            <button onClick={() => t('Exporting season report…')} style={{ width: '100%', height: 40, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>Export season report</button>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
