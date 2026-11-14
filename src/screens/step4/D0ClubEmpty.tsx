import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const STEPS = [
  { id: 'teams', n: 1, label: 'Import your teams', done: false },
  { id: 'coaches', n: 2, label: 'Invite coaches', done: false },
  { id: 'welfare', n: 3, label: 'Set your welfare officer', done: false },
  { id: 'rules', n: 4, label: 'Add club rules', done: false },
  { id: 'style', n: 5, label: 'Choose a playing style', done: true },
  { id: 'kit', n: 6, label: 'Upload kit colours', done: false },
]
export default function D0ClubEmpty(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Club' ? 700 : 500, color: tab === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Welcome to Wattle Creek FC</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>6 steps to get the club set up — takes about 10 minutes</div>
          {STEPS.map(s => (
            <div key={s.id} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 20px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.done ? G : PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: s.done ? '#fff' : MUT, flexShrink: 0 }}>{s.done ? '✓' : s.n}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: s.done ? MUT : INK, textDecoration: s.done ? 'line-through' : 'none' }}>{s.label}</div>
              {!s.done && <button onClick={() => setSheet(s.id)} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Set up</button>}
            </div>
          ))}
          <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px', marginTop: 8 }}>
            <div style={{ fontSize: 13, color: GD }}>Need help? <span onClick={() => t('Booking link sent to your email.')} style={{ fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Book a free setup call</span> with the Clean Sheet team.</div>
          </div>
        </div>
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Season preview</div>
            {['Playing our way', 'Training turnout', 'Fair game time', 'Coaches cleared'].map(label => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${LN}`, fontSize: 13 }}>
                <span style={{ color: MUT }}>{label}</span>
                <span style={{ fontWeight: 700, color: LN }}>—</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Who does what</div>
            {[{ role: 'Director of football', desc: 'That\'s you — coaches, players, the whole programme' }, { role: 'Chair', desc: 'Board reports and league admin' }, { role: 'Welfare officer', desc: 'Safeguarding concerns only' }].map(r => (
              <div key={r.role} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: G }}>{r.role}</div>
                <div style={{ fontSize: 12, color: MUT }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {sheet && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, width: 420 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 4 }}>
              {sheet === 'kit' ? 'Upload kit colours' : sheet === 'rules' ? 'Add club rules' : sheet === 'invite' || sheet === 'coaches' ? 'Invite coaches' : sheet === 'welfare' ? 'Set welfare officer' : 'Import teams'}
            </div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Wattle Creek FC</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setSheet(null)} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setSheet(null); t('Saved.') }} style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Save</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
