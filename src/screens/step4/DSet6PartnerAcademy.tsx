import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function DSet6PartnerAcademy(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports', 'Settings'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Settings' ? 700 : 500, color: tab === 'Settings' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44 }}>
        {['Club details', 'Roles', 'Connections', 'Partner academies', 'Kit and cameras', 'Display'].map(tab => (
          <div key={tab} style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: tab === 'Partner academies' ? 700 : 500, color: tab === 'Partner academies' ? GD : MUT, borderBottom: tab === 'Partner academies' ? `2px solid ${GD}` : '2px solid transparent', cursor: 'pointer' }}>{tab}</div>
        ))}
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Partner academies</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Academies linked to your club can share player progress and offer game-team pathways</div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Tall Timber Academy</div>
              <div style={{ fontSize: 12, color: MUT }}>Footscray · 1 player from Wattle Creek</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: G, flex: 'none' }} />
              <div style={{ fontSize: 12, fontWeight: 600, color: G }}>Linked</div>
            </div>
          </div>

          {[
            { setting: 'Academy can see player\'s goal in Clean Sheet', val: 'On' },
            { setting: 'Academy can see which Wattle Creek team player is in', val: 'On' },
            { setting: 'Academy can offer a game-team pathway', val: 'On' },
            { setting: 'Academy can share term reports with Wattle Creek coaches', val: 'Off' },
            { setting: 'Academy can message parents through Clean Sheet', val: 'Off' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div style={{ fontSize: 13, color: INK }}>{s.setting}</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: s.val === 'On' ? G : MUT }}>{s.val}</div>
                <button onClick={() => t('Setting changed.')} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Change</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px', marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: GD }}>Parents are always asked before anything from the academy is shared with coaches or put on the player's profile.</div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
