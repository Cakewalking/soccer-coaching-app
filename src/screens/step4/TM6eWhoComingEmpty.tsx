import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function TM6eWhoComingEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, position: 'relative' }}>
      <div style={{ background: GD, padding: '12px 16px 0', paddingTop: 'env(safe-area-inset-top, 12px)' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto' as const }}>
          {['Team', 'Who\'s coming', 'Training', 'Game day', 'Squad'].map(tab => (
            <div key={tab} style={{ fontSize: 13, fontWeight: tab === "Who's coming" ? 700 : 500, color: tab === "Who's coming" ? '#fff' : 'rgba(255,255,255,0.65)', padding: '8px 0', borderBottom: tab === "Who's coming" ? '2px solid #fff' : '2px solid transparent', whiteSpace: 'nowrap' as const, cursor: 'pointer' }}>{tab}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: 24, textAlign: 'center' as const }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4, textAlign: 'left' as const }}>Who's coming</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 32, textAlign: 'left' as const }}>Answers come back when parents respond to your message</div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '32px 20px', marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: PALE, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>No game this week</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Answers show up here as soon as parents reply. You'll see coming, maybe and can't side by side.</div>
          <button onClick={() => t('No fixture set yet. Contact your administrator to add a fixture.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Ask who's coming</button>
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px', textAlign: 'left' as const }}>
          <div style={{ fontSize: 13, color: GD }}>Messages go to parents, not players. Answers land here without any manual follow-up.</div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
