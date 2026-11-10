const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACP3eAcademyParentHomeEmpty() {
  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tall Timber Academy</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>Welcome, Tess</div>
      </div>

      <div style={{ padding: '16px 20px 32px' }}>
        {/* First session banner */}
        <div style={{ background: G, borderRadius: 14, padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Kai starts on Thursday</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 2 }}>Thu 14 May · 5:30 pm</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Messmate Primary School</div>
        </div>

        {/* Empty state */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '28px 20px', textAlign: 'center' as const, marginBottom: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Fills in after sessions start</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Goals, practice notes, attendance and reports will appear here as Kai trains.</div>
        </div>

        <div style={{ fontSize: 12, color: MUT }}>Bring boots, a water bottle and a ball.</div>
      </div>
    </div>
  )
}
