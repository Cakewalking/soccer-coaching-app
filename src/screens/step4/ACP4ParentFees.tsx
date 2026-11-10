const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACP4ParentFees() {
  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tall Timber Academy · Fees</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>Kai Okonkwo</div>
      </div>

      <div style={{ padding: '16px 20px 32px' }}>
        {/* Due */}
        <div style={{ background: G, borderRadius: 14, padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Payment 3 of 3 · due 15 June</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>$129.67</div>
        </div>

        {/* History */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>All payments</div>
          {[
            { label: 'Payment 1 of 3', date: '15 Apr', amount: '$129.67', done: true },
            { label: 'Payment 2 of 3', date: '15 May', amount: '$129.67', done: true },
            { label: 'Payment 3 of 3', date: '15 Jun', amount: '$129.67', done: false },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: p.done ? G : LN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{p.date}</div>
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: p.done ? MUT : INK }}>{p.amount}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Total</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>$389.01</div>
          </div>
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: GD }}>For your records or a rebate — download a receipt from each payment row.</div>
        </div>

        <div style={{ fontSize: 13, color: MUT }}>Re-enrol for next term by <strong>19 June</strong> to hold Kai's place.</div>
      </div>
    </div>
  )
}
