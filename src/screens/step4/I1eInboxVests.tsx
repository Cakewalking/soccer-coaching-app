const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function I1eInboxVests(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U12 Sam · Wattle Creek</div>
        {['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Inbox' ? 700 : 500, color: t === 'Inbox' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Head coach</div>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ width: 380, background: '#fff', borderRight: `1px solid ${LN}` }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Inbox</div>
          </div>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, background: PALE }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c05', marginTop: 5, flex: 'none' }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>3 GPS vests didn't sync</div>
                <div style={{ fontSize: 12, color: MUT }}>Ruby, Isla and Finn after Tuesday training.</div>
                <div style={{ fontSize: 11, fontWeight: 700, background: '#fef2f2', color: '#c05', padding: '2px 8px', borderRadius: 20, display: 'inline-block', marginTop: 4 }}>Fix before Saturday</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>3 GPS vests didn't sync</div>
          </div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Data alert · 7:12 am</div>
          <div style={{ fontSize: 15, color: INK, lineHeight: 1.7, marginBottom: 24 }}>
            Ruby, Isla and Finn's vests didn't sync after Tuesday training. Their running data for that session is missing. This needs fixing before Saturday's game, or their vest data won't be recorded.
          </div>
          <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 6 }}>What to do</div>
            <div style={{ fontSize: 13, color: G }}>→ Make sure all 3 vests are on the charger and within range of the base station before Thursday</div>
          </div>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Mark as done</button>
        </div>
      </div>
    </div>
  )
}
