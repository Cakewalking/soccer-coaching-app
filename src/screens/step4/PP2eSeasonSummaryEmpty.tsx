const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PP2eSeasonSummaryEmpty(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>Wattle Creek U12 · season 2026</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Mia's season</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#c9b8d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>LT</div>
      </div>
      <div style={{ flexGrow: 1, padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '32px 20px', textAlign: 'center' as const, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>Ready at the end of the season</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>In September, Sam writes a short note for every player, with her goals and a favourite moment.</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Fills in like this</div>
          {[null, null, null].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 48, height: 48, borderRadius: 8, background: '#e8e9e7', flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
                <div style={{ height: 10, background: '#e8e9e7', borderRadius: 6, width: '70%' }} />
                <div style={{ height: 8, background: '#e8e9e7', borderRadius: 6, width: '50%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
