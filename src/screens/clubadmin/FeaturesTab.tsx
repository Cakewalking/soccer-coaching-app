const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FeaturesTab({ onNav }: { onNav?: (s: string) => void }) {
  return (
    <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 400 }}>
      <div style={{ width: 480, background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 8 }}>Features and billing</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6, marginBottom: 24 }}>
          Wattle Creek FC · you are the billing owner. Turn add-ons on team by team and see your bill.
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Features by team', nav: 'PRM1-FeaturesByTeam' },
            { label: "This month's bill", nav: 'PRM3-Bill' },
            { label: 'Is it being used?', nav: 'PRM6-Usage' },
          ].map(btn => (
            <button key={btn.label} onClick={() => onNav?.(btn.nav)}
              style={{ height: 44, padding: '0 18px', borderRadius: 8, border: `1.5px solid ${G}`, background: PALE, color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {btn.label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          {[
            { n: '1', title: 'You decide, not the coach', desc: 'Coaches can ask. Only you and people you name can turn things on' },
            { n: '2', title: 'By team or by age group', desc: 'For example, live help from under 13 up' },
            { n: '3', title: 'Charged by the day', desc: 'Off today means not charged tomorrow' },
          ].map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, textAlign: 'left' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{item.title}</div>
                <div style={{ fontSize: 12, color: MUT }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
