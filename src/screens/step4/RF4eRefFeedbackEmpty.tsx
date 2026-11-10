const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function RF4eRefFeedbackEmpty() {
  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      <div style={{ background: '#1f4a3e', padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek FC</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>ZP</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Your feedback</div>
        </div>
      </div>

      <div style={{ padding: '32px 20px', textAlign: 'center' as const }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: INK, marginBottom: 8 }}>Kind words show here</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5 }}>After each game, the team manager can say how you went. You'll only ever see the good bits here.</div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 390, background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-around', padding: '10px 0 20px' }}>
        {['My games', 'Report', 'Feedback', 'Me'].map(t => (
          <div key={t} style={{ fontSize: 12, fontWeight: t === 'Feedback' ? 700 : 500, color: t === 'Feedback' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
      </div>
    </div>
  )
}
