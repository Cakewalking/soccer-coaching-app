import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACP9JoinGameTeam() {
  const [joined, setJoined] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', position: 'relative' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tall Timber Academy</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 2 }}>Play games too?</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Advanced group plays as a registered team</div>
      </div>

      <div style={{ padding: '16px 20px 100px' }}>
        {/* Team info */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>U13 Timber · Wattle Creek FC</div>
          {[
            ['Competition', 'Metro Junior League'],
            ['Games', 'Saturdays, home and away'],
            ['Season', 'Apr – Sep'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, color: MUT }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Combined bill */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Combined fees</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 13, color: MUT }}>Academy (7 weeks)</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>$224</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 13, color: MUT }}>Game team registration</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>$165</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 0' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Total</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: G }}>$389</div>
          </div>
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: GD }}>Team sheets, minutes and cards link. Not fees or his report — those stay private.</div>
        </div>

        {!joined ? (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <button onClick={() => { setJoined(true); t('Kai added to U13 Timber.') }} style={{ height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Join U13 Timber</button>
            <button onClick={() => t('No worries — academy only.')} style={{ height: 48, borderRadius: 14, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Academy only</button>
          </div>
        ) : (
          <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>Kai's on the team</div>
            <div style={{ fontSize: 13, color: G, marginTop: 4 }}>U13 Timber · Wattle Creek FC</div>
          </div>
        )}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
