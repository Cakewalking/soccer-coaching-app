import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SET4eDevicesEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports', 'Settings'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Settings' ? 700 : 500, color: tab === 'Settings' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Coach · U12 Sam</div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44 }}>
        {['Notifications', 'Display', 'Devices'].map(tab => (
          <div key={tab} style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: tab === 'Devices' ? 700 : 500, color: tab === 'Devices' ? GD : MUT, borderBottom: tab === 'Devices' ? `2px solid ${GD}` : '2px solid transparent', cursor: 'pointer' }}>{tab}</div>
        ))}
      </div>

      <div style={{ padding: 48, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Devices and cameras</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 32 }}>Pair a Smart Camera and your video goes straight to the bench</div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '32px 28px', textAlign: 'center' as const, marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: PALE, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="6" width="20" height="14" rx="3"/><path d="M16 2l4 4M8 2L4 6"/><circle cx="12" cy="13" r="3"/></svg>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>No devices paired</div>
            <div style={{ fontSize: 13, color: MUT, maxWidth: 320, margin: '0 auto 20px' }}>Pair a Smart Camera and your video goes straight to the bench. No USB, no waiting.</div>
            <button onClick={() => t('Pairing mode started. Hold the button on your camera for 3 seconds.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Pair a camera</button>
          </div>
        </div>

        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Why pair a camera?</div>
            {[
              ['Clips on the bench', 'Video appears as you film it'],
              ['Share with one tap', 'Send to a family in seconds'],
              ['Automatic highlights', 'Goals and near-misses sorted by player'],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: '7px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{k}</div>
                <div style={{ fontSize: 12, color: MUT }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px' }}>
            <div style={{ fontSize: 13, color: GD }}>This tablet pairs with one camera at a time. Other coaches can pair their own tablets separately.</div>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
