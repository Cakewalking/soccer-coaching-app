import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function CC1eCoachHomeEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Coach · U12 Sam</div>
      </div>

      <div style={{ padding: 48 }}>
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Hi Sam, welcome to your team</div>
        <div style={{ fontSize: 15, color: MUT, marginBottom: 32 }}>U12 · Wattle Creek FC · season 2026</div>

        {/* Co-coach not yet joined */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Jess Wu · co-coach</div>
              <div style={{ fontSize: 12, color: MUT }}>Invited · hasn't set up Clean Sheet yet</div>
            </div>
          </div>
          <button onClick={() => t('Reminder sent to Jess.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Remind Jess</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[
            { label: 'Set your playing style', sub: 'Tell the squad what you\'re building', cta: 'Add a note' },
            { label: 'Set consent defaults', sub: 'Club rules apply until you change them', cta: 'Review' },
            { label: 'Check the squad', sub: '17 players — tap each one to review', cta: 'View squad' },
            { label: 'Set up training nights', sub: 'Families get the schedule automatically', cta: 'Add nights' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{item.sub}</div>
              </div>
              <button onClick={() => t(`${item.cta} would open.`)} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', flex: 'none' }}>{item.cta}</button>
            </div>
          ))}
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px' }}>
          <div style={{ fontSize: 13, color: GD }}>The director of football set up your team. These steps finish the job before the season starts.</div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
