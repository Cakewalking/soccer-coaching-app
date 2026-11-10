const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACP5eProgressReportEmpty() {
  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tall Timber Academy</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>Kai's progress</div>
      </div>

      <div style={{ padding: '32px 20px', textAlign: 'center' as const }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: INK, marginBottom: 8 }}>His first report comes in week 9</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5, marginBottom: 20 }}>Until then, coach notes appear here after each session.</div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', textAlign: 'left' as const }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>What the report covers</div>
          {['Ball skills and control', 'Decision-making in games', 'Effort and coachability', 'Goal progress'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: G, flex: 'none' }} />
              <div style={{ fontSize: 13, color: INK }}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
