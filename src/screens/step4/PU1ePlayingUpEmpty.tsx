import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU1ePlayingUpEmpty() {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Players' ? 700 : 500, color: t === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['All players', 'Pathway', 'Playing across', 'Fair game time'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Playing across' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Playing across' ? 700 : 500, color: t === 'Playing across' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>Not enough data yet</div>
        <div style={{ fontSize: 14, color: MUT, maxWidth: 500, textAlign: 'center', lineHeight: 1.6, marginBottom: 32 }}>
          Playing across needs at least 5 recorded games per player to identify players who might be ready to try a year group up. Keep recording and check back after a few more rounds.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, width: 600, marginBottom: 40 }}>
          {[
            { label: 'Teams recording', val: '8 of 11' },
            { label: 'Players with 5+ games', val: '34 of 192' },
            { label: 'Weeks until ready', val: '~3 weeks' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: INK, marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: MUT }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => st('Opening record page.')} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Record a game</button>
          <button onClick={() => st('Opening settings.')} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>What it looks at</button>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
