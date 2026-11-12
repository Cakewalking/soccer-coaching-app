const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', G = '#2f6252'

export default function ACP4eParentFeesEmpty(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>Tall Timber · Kai</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Fees</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#7a9a90', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>TO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '28px 20px', textAlign: 'center' as const, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#f0f9f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>Nothing to pay</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>Term 2 is paid in full. Term 3 fees show here from 22 June.</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Receipts</div>
          <div style={{ fontSize: 13, color: MUT }}>For your records or a rebate</div>
          {[null, null].map((_, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: `1px solid ${LN}`, marginTop: 8 }}>
              <div>
                <div style={{ height: 10, background: '#e8e9e7', borderRadius: 6, width: 120, marginBottom: 4 }} />
                <div style={{ height: 8, background: '#e8e9e7', borderRadius: 6, width: 80 }} />
              </div>
              <div style={{ height: 28, width: 70, background: '#e8e9e7', borderRadius: 8 }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: `1px solid ${LN}`, background: '#fff' }}>
        {[{ label: 'Home', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' }, { label: 'Progress', icon: 'M18 20V10M12 20V4M6 20v-6' }, { label: 'Book', icon: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 014 17V5a2 2 0 012-2h12a2 2 0 012 2v13a2 2 0 01-2 2H6.5' }, { label: 'Fees', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' }].map((item, i) => (
          <div key={item.label} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={i === 3 ? G : MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}/></svg>
            <span style={{ fontSize: 11, fontWeight: i === 3 ? 700 : 500, color: i === 3 ? G : MUT }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
