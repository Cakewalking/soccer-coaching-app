import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM1eFeaturesEmpty({ onAddTeam }: { onAddTeam?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['Club plan', 'Features', 'Bill', 'Usage'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Features' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Features' ? 700 : 500, color: t === 'Features' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>No teams yet</div>
        <div style={{ fontSize: 14, color: MUT, maxWidth: 440, textAlign: 'center', lineHeight: 1.6, marginBottom: 32 }}>
          Add your teams and you can choose which features each one uses. You only pay for the add-ons you turn on.
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
          {[
            { title: 'Record', body: 'GPS and automatic stats. Free for all teams.' },
            { title: 'Live game help', body: 'Suggested swaps and shape nudges. $10 per team.' },
            { title: 'Vest sensors', body: 'Detailed load data. $5 per team.' },
            { title: 'Extra storage', body: 'More clip and file space. $2 per team.' },
          ].map((f, i) => (
            <div key={i} style={{ width: 160, background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>{f.body}</div>
            </div>
          ))}
        </div>
        <button onClick={onAddTeam || (() => st('Opening team setup.'))} style={{ height: 44, padding: '0 32px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add first team</button>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
