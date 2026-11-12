import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const TOP_NAV = ['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports']
const ACTIVE_TOP = 'Players'
const SUB_NAV = ['Overview', 'Goals', 'Growth and load', 'Fair game time', 'Registrations', 'Moves', 'Trials', 'Girls and women']

export default function FW1eGirlsWomenEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, minHeight: 820, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {TOP_NAV.map(t => <div key={t} style={{ fontSize: 13, fontWeight: t === ACTIVE_TOP ? 700 : 500, color: t === ACTIVE_TOP ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>)}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#8c6e5a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>RM</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center', flexShrink: 0 }}>
        {SUB_NAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: n === 'Girls and women' ? 700 : 500, color: n === 'Girls and women' ? INK : MUT, borderBottom: `2px solid ${n === 'Girls and women' ? G : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
      </div>
      <div style={{ padding: '24px 32px 0', flexShrink: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Girls and women</div>
      </div>
      <main style={{ flexGrow: 1, padding: '16px 32px 32px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 12, textAlign: 'center' as const }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>Nothing here yet</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: MUT }}>No girls' teams yet</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, maxWidth: 400 }}>Add a girls' team, or import your players, to see the pathway from MiniRoos to seniors and where the gaps are.</div>
          <button onClick={() => st('Opening PlayFootball import.')} style={{ height: 48, padding: '0 28px', borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>Import from PlayFootball</button>
          <div style={{ fontSize: 13, color: MUT, marginTop: 4 }}>This page fills in on its own once there's something to show.</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 14 }}>What you'll see</div>
          {[{ n: '1', label: 'Pathway by age', sub: 'And the gaps' }, { n: '2', label: 'Who came back', sub: 'Against last year' }].map(r => (
            <div key={r.n} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: G }}>{r.n}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
