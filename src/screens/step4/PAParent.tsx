import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PAParent(_: { onBack?: () => void }) {
  const [tab, setTab] = useState('home')
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'chat', label: 'Chat', badge: 3 },
    { id: 'mychild', label: 'My child' },
  ]

  const navItems = [
    { id: 'home', label: 'Home', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 10.5L11 3l8 7.5V19a1 1 0 01-1 1H14v-5H8v5H4a1 1 0 01-1-1v-8.5z" fill={active ? G : 'none'} stroke={active ? G : MUT} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )},
    { id: 'chat', label: 'Chat', badge: 3, icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 4h14a1 1 0 011 1v9a1 1 0 01-1 1H8l-4 3V5a1 1 0 011-1z" fill={active ? G : 'none'} stroke={active ? G : MUT} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )},
    { id: 'mychild', label: 'My child', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="3.5" stroke={active ? G : MUT} strokeWidth="1.5" fill={active ? G : 'none'} />
        <path d="M4 19c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke={active ? G : MUT} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    )},
    { id: 'canteen', label: 'Canteen', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="4" y="8" width="14" height="10" rx="2" stroke={active ? G : MUT} strokeWidth="1.5" fill={active ? G : 'none'} />
        <path d="M8 8V6a3 3 0 016 0v2" stroke={active ? G : MUT} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    )},
  ]

  return (
    <div style={{ width: 390, minHeight: 844, fontFamily: 'var(--font-sans)', background: '#f7f8f7', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '12px 16px 0', paddingTop: 'env(safe-area-inset-top, 12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 10px' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#c8a97e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>M</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Mia</span>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0 }}>
          {tabs.map(tb => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              style={{
                padding: '8px 16px 10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                color: tab === tb.id ? '#fff' : 'rgba(255,255,255,0.6)',
                borderBottom: tab === tb.id ? '2px solid #fff' : '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                position: 'relative',
              }}
            >
              {tb.label}
              {tb.badge && tb.id !== 'home' && (
                <span style={{ background: '#e53', borderRadius: 10, padding: '1px 5px', fontSize: 11, fontWeight: 700, color: '#fff' }}>{tb.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px 16px 90px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Week heading */}
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>Mia's week</div>
          <div style={{ fontSize: 14, color: MUT, marginTop: 2 }}>5 Nov · U12 Sam</div>
        </div>

        {/* This week card */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0 }} />
                <div style={{ fontSize: 14, color: INK }}>Thursday 4:15 · Training</div>
              </div>
              <div style={{ background: G, borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 600, color: '#fff' }}>Coming</div>
            </div>
            <div style={{ height: 1, background: LN }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0 }} />
                  <div style={{ fontSize: 14, color: INK }}>Saturday 9:30 · Game</div>
                </div>
                <div style={{ fontSize: 12, color: MUT, marginTop: 2, marginLeft: 16 }}>vs Riverside FC</div>
              </div>
              <div style={{ background: G, borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 600, color: '#fff' }}>Coming</div>
            </div>
          </div>
        </div>

        {/* Availability nudge */}
        <div style={{ background: PALE, borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: INK, marginBottom: 12 }}>Can Mia make next Saturday?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Yes', "Can't", 'Not sure'].map(opt => (
              <button
                key={opt}
                onClick={() => t("Saved — Sam K can see Mia's answer.")}
                style={{
                  flex: 1,
                  padding: '9px 0',
                  borderRadius: 10,
                  border: `1.5px solid ${G}`,
                  background: '#fff',
                  color: G,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Recent from Sam K */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c8a97e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>SK</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Sam K</div>
              <div style={{ fontSize: 12, color: MUT }}>2 days ago</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: INK, marginBottom: 10 }}>Mia's left-foot work from Thursday</div>
          <div style={{ background: '#1a2b28', borderRadius: 10, height: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6 4l9 5-9 5V4z" fill="#fff" />
              </svg>
            </div>
            <div style={{ position: 'absolute', bottom: 8, right: 10, background: 'rgba(0,0,0,0.6)', borderRadius: 6, padding: '2px 7px', fontSize: 12, color: '#fff', fontWeight: 600 }}>0:21</div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: PALE, borderRadius: 20, padding: '4px 10px', fontSize: 13, color: INK }}>
              <span>🎉</span>
              <span style={{ fontWeight: 600 }}>4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: 390, background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        {navItems.map(nav => (
          <button
            key={nav.id}
            onClick={() => setTab(nav.id)}
            style={{
              flex: 1,
              padding: '10px 0 8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              position: 'relative',
            }}
          >
            {nav.icon(tab === nav.id)}
            <span style={{ fontSize: 10, fontWeight: 600, color: tab === nav.id ? G : MUT }}>{nav.label}</span>
            {nav.badge && (
              <span style={{ position: 'absolute', top: 7, right: '50%', marginRight: -18, background: '#e53', borderRadius: 10, padding: '1px 5px', fontSize: 10, fontWeight: 700, color: '#fff' }}>{nav.badge}</span>
            )}
          </button>
        ))}
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>
          {toast}
        </div>
      )}
    </div>
  )
}
