const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function OB5SignUp(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 32px', display: 'flex', alignItems: 'center', background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 560, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' as const }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5 9-10" />
            </svg>
          </div>

          <div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>U12 Sam is ready</div>
            <div style={{ fontSize: 16, color: MUT, lineHeight: '24px' }}>Wattle Creek FC · Division 2 · Mixed · 0 players so far</div>
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', text: 'Add your players', desc: 'Share a link with parents or import from PlayFootball.' },
              { icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z', text: 'Add your fixtures', desc: 'So Clean Sheet knows when your games are.' },
              { icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4', text: 'Plan tonight\'s training', desc: 'Clean Sheet will suggest drills as you add data.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 18px', background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, textAlign: 'left' as const }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{item.text}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, width: '100%' }}>
            <button style={{ flex: 1, height: 52, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer' }}>Add players first</button>
            <button style={{ flex: 1, height: 52, borderRadius: 12, border: 0, background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Go to your team →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
