import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', BG = '#f5f6f4'

export default function ACC1eCoachTodayEmpty() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 28, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Today', 'Players', 'Game day', 'Library'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Today' ? 700 : 500, color: t === 'Today' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Tall Timber Academy</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>RW</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: 'calc(820px - 52px)' }}>
        <div style={{ background: '#fff', borderRight: `1px solid ${LN}`, padding: '12px 0' }}>
          {['Today', 'Run a session', 'Trial player', 'One-on-one', 'Record', 'Suggested'].map(item => (
            <div key={item} style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: item === 'Today' ? 700 : 500,
              color: item === 'Today' ? G : MUT,
              background: item === 'Today' ? '#eef5f2' : 'transparent',
              borderLeft: item === 'Today' ? `3px solid ${G}` : '3px solid transparent',
              cursor: 'pointer',
            }}>{item}</div>
          ))}
          <div style={{ marginTop: 'auto', padding: '12px 20px', borderTop: `1px solid ${LN}`, fontSize: 11, color: MUT }}>Academy coach</div>
        </div>

        <div style={{ overflowY: 'auto', padding: 28 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK, marginBottom: 2 }}>Hi Reece</div>
            <div style={{ fontSize: 13, color: MUT }}>Friday 5 June · no sessions today</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '32px 24px', textAlign: 'center' as const, marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>Nothing on today</div>
            <div style={{ fontSize: 14, color: MUT, marginBottom: 16 }}>Your next session is Development on Tuesday at 4:30. Now is a good time to check your report drafts.</div>
            <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }} onClick={() => st('Opening report drafts.')}>Check report drafts</button>
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Coming up</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { n: 1, time: 'Tue 4:30', label: 'Development · 9 to 11' },
              { n: 2, time: 'Tue 5:30', label: 'Advanced · 12 to 14' },
              { n: 3, time: 'Thu 6:45', label: 'One-on-one · Kai' },
            ].map(s => (
              <div key={s.n} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: G, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: MUT }}>{s.time}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
