const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PAeClipsEmpty() {
  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      <div style={{ background: '#1f4a3e', padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek U12</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>My clips</div>
      </div>

      <div style={{ padding: '32px 20px', textAlign: 'center' as const }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: INK, marginBottom: 8 }}>No clips yet</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5 }}>After a game, Sam can send you your best moments. They show up here.</div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 390, background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-around', padding: '10px 0 20px' }}>
        {['Home', 'Clips', 'Goals', 'Me'].map(t => (
          <div key={t} style={{ fontSize: 12, fontWeight: t === 'Clips' ? 700 : 500, color: t === 'Clips' ? G : MUT, cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
      </div>
    </div>
  )
}
