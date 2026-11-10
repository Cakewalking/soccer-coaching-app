import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SP5eBaselineEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Baseline tests</div>
          <div style={{ fontSize: 14, color: MUT }}>None planned for pre-season</div>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '32px 36px', maxWidth: 560, marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>Measure the start, so you can see the change</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>Four short tests in the first weeks back. They run again mid-season and at the end, and each player is only compared with themselves.</div>
        <button onClick={() => t('Four tests added across your next four sessions.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Plan the four tests</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[
          { n: '1', title: '10 m sprint',                body: 'Speed off the mark' },
          { n: '2', title: 'Change of direction',        body: 'Agility' },
          { n: '3', title: 'Ball mastery and repeat sprints', body: 'Skill and stamina' },
        ].map(item => (
          <div key={item.n} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 14, fontWeight: 700, color: G }}>{item.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: MUT }}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
