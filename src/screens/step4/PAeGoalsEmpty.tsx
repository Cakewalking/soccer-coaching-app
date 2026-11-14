const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PAeGoalsEmpty() {
  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      <div style={{ background: '#1f4a3e', padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek U12</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>MT</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>My goals</div>
        </div>
      </div>

      <div style={{ padding: '32px 20px', textAlign: 'center' as const }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: INK, marginBottom: 8 }}>You'll pick a goal with Sam</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5 }}>One thing to get better at, like using your other foot. You'll see how it's going after each game.</div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 390, background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-around', padding: '10px 0 20px' }}>
        {['Home', 'Clips', 'Goals', 'Me'].map(t => (
          <div key={t} style={{ fontSize: 12, fontWeight: t === 'Goals' ? 700 : 500, color: t === 'Goals' ? G : MUT, cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
      </div>
    </div>
  )
}
