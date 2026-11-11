import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const AGENDA = [
  { n: 1, title: 'Children\'s checks — Chris Pham expires in 9 days', tag: 'Action' },
  { n: 2, title: 'Fair game time — U13 Chris below the line', tag: 'Review' },
  { n: 3, title: 'Playing our way — season snapshot', tag: 'Update' },
  { n: 4, title: 'Cameras — which games are we recording?', tag: 'Discuss' },
  { n: 5, title: 'Club course Sat 20 Jun — 9 spots left', tag: 'Info' },
]
const LAST_NOTES = [
  'All coaches reviewed last season\'s game time data',
  'Agreed to trial 3-minute rotations in MiniRoos',
  'Helen Park confirmed as welfare officer for 2026',
  'Club course — 7 coaches enrolled so far',
]
export default function DM1CoachMeeting(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Coaches' ? 700 : 500, color: tab === 'Coaches' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Coach meeting</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Tue 9 Jun · 7:30 pm · Wattle Creek Clubrooms</div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Agenda</div>
          {AGENDA.map(a => (
            <div key={a.n} onClick={() => t(`Opening: ${a.title}`)} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 18px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: G, flexShrink: 0 }}>{a.n}</div>
              <div style={{ flex: 1, fontSize: 14, color: INK }}>{a.title}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: a.tag === 'Action' ? '#c00' : a.tag === 'Review' ? '#f57c00' : MUT, background: a.tag === 'Action' ? '#fff0f0' : a.tag === 'Review' ? '#fff8f0' : PALE, padding: '2px 8px', borderRadius: 20 }}>{a.tag}</div>
              <div style={{ fontSize: 16, color: MUT }}>›</div>
            </div>
          ))}
          <button onClick={() => t('Agenda sent to all coaches.')} style={{ marginTop: 12, height: 40, padding: '0 20px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Send agenda to coaches</button>
        </div>
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>RSVP so far</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center' as const }}>
              {[{ n: 19, label: 'Coming' }, { n: 5, label: 'Online' }, { n: 7, label: 'No answer' }].map(s => (
                <div key={s.label} style={{ background: PALE, borderRadius: 10, padding: '12px 8px' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: GD }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: MUT, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Last meeting · Tue 13 May</div>
            {LAST_NOTES.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: INK }}>
                <span style={{ color: G, flexShrink: 0 }}>✓</span>
                <span>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
