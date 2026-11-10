const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', PALE = '#eef5f2'

export default function ACK2eHomePracticeEmpty() {
  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      <div style={{ background: '#1f4a3e', padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tall Timber · Advanced</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>KO</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Practice</div>
        </div>
      </div>

      <div style={{ padding: '32px 20px', textAlign: 'center' as const }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: INK, marginBottom: 8 }}>No practice set this week</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5 }}>When coach Reece sets something to try at home, it shows here. For now, just play.</div>
      </div>
    </div>
  )
}
