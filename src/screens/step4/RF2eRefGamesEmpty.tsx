const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', G = '#2f6252'

export default function RF2eRefGamesEmpty(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>Wattle Creek FC · game leader</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Welcome, Zoe</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#8c6e5a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>ZP</div>
      </div>
      <div style={{ flexGrow: 1, padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '32px 20px', textAlign: 'center' as const, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>No games yet</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>When Ruth needs a game leader or referee, you'll get a message. Say yes and it shows here.</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Fills in like this</div>
          {[null, null].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: '#e8e9e7', flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
                <div style={{ height: 10, background: '#e8e9e7', borderRadius: 6, width: '75%' }} />
                <div style={{ height: 8, background: '#e8e9e7', borderRadius: 6, width: '50%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: `1px solid ${LN}`, background: '#fff' }}>
        {[{ label: 'My games', icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z' }, { label: 'Report', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }, { label: 'Feedback', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' }, { label: 'Me', icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' }].map((item, i) => (
          <div key={item.label} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? G : MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}/></svg>
            <span style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? G : MUT }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
