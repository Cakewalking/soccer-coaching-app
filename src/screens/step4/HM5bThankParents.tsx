const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function HM5bThankParents(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Phone frame centred on the tablet canvas */}
      <div style={{ width: 390, background: '#f7f8f7', borderRadius: 32, overflow: 'hidden', boxShadow: '0 8px 32px rgba(16,33,31,0.18)', display: 'flex', flexDirection: 'column', minHeight: 700 }}>
        <div style={{ background: G, color: '#fff', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: -8 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>U9 Tom · to 10 families</div>
            <div style={{ fontSize: 21, lineHeight: '27px', fontWeight: 700 }}>Thank the parents</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 999, background: '#cbbeb5', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>TA</div>
        </div>

        <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Your message</div>
            <div style={{ fontSize: 16, lineHeight: '24px' }}>
              Thanks for coming this morning! The kids were so brave on the ball, and I loved how often they passed to a friend. Arlo was a great first-time captain.<br /><br />
              Training is Tuesday 5:00. Next Saturday we're at home, 9:00.<br /><br />
              Tom
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '4px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44 }}>
              <div style={{ flex: 1, fontSize: 14 }}>Add a team photo</div>
              <div style={{ fontSize: 13, color: MUT }}>2 families said no photos</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${LN}` }}>
              <div style={{ flex: 1, fontSize: 14 }}>Ask who's coming next week</div>
              <div style={{ width: 44, height: 28, borderRadius: 999, background: G, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 3, boxSizing: 'border-box' as const }}>
                <div style={{ width: 22, height: 22, borderRadius: 999, background: '#fff' }} />
              </div>
            </div>
          </div>

          <div style={{ fontSize: 13, lineHeight: '18px', color: MUT, padding: '0 2px' }}>Written from what you tapped. Change any of it. One child is named, and only for something good.</div>
        </div>

        <div style={{ padding: '10px 14px 24px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button style={{ height: 50, borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Send to 10 families</button>
          <button style={{ height: 44, borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Edit the message</button>
        </div>
      </div>
    </div>
  )
}
