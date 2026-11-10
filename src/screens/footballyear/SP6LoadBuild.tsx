import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const WEEKS = [30,40,50,55,60,70,80,85,95,100]

export default function SP6LoadBuild({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Building up to round 1</div>
          <div style={{ fontSize: 14, color: MUT }}>Thu 12 March · pre-season · 4 weeks to round 1</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Back to Home</button>
          <button onClick={() => t('Opening sessions')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>This week's sessions</button>
        </div>
      </div>

      {/* Load bar chart */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Ten weeks, a bit more each week</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: G }}>Week 6 · on track</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80, marginBottom: 10 }}>
          {WEEKS.map((pct, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: i === 5 ? G : i < 5 ? G + '99' : '#e5e6e4', height: `${pct * 0.7}px` }} />
              <div style={{ fontSize: 10, color: i === 5 ? G : MUT, fontWeight: i === 5 ? 700 : 400 }}>Wk {i+1}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Each bar is the week's running and sprinting as a share of a normal mid-season week. No week jumps more than 10 points on the one before.</div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Priya, your fitness coach, set this plan. Sessions and suggestions follow it.</div>
      </div>

      {/* This week */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 6 }}>This week</div>
        <div style={{ fontSize: 14, color: INK, marginBottom: 4 }}>Two sessions of 60 minutes, and a friendly on Saturday.</div>
        <div style={{ fontSize: 13, color: MUT }}>Sprints capped at 12 a session. Lots of ball, short games.</div>
      </div>

      {/* Coming back slower */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>Coming back slower</div>
        {[
          { initials: 'NO', name: 'Noah Okafor',  note: 'Grew 3 cm over summer · one round less',   flag: 'growth' },
          { initials: 'ZH', name: 'Zoe Hartley',  note: 'Played indoor all summer · no rest month', flag: 'watch' },
          { initials: 'GO', name: 'Grace Owusu',  note: '10 weeks off · two weeks behind the plan',  flag: '' },
        ].map(p => (
          <div key={p.name} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 11, fontWeight: 700, color: G }}>{p.initials}</div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</span>
              <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
            </div>
            {p.flag === 'watch' && <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: '#fff3d6', color: '#7a5a1a' }}>Watch</span>}
          </div>
        ))}
      </div>

      {/* Why build up */}
      <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 2 }}>Why build up</div>
          <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Most early-season injuries come from doing too much in the first weeks back.</div>
        </div>
        <button onClick={() => t('Message started to Priya, your fitness coach.')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flex: 'none' }}>Ask Priya to change it</button>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
