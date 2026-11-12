import { useState } from 'react'
const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', G = '#2f6252', ROSE = '#c39797'
const SUBNAV = ['Today', 'Run a session', 'Trial player', 'One-on-one', 'Record', 'Suggested']

export default function ACC10eAcademyRecordResultsEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, minHeight: 820, background: '#f7f8f7', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <header style={{ flex: 'none', background: GD }}>
        <div style={{ height: 60, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>Clean Sheet</span>
          <nav style={{ display: 'flex', flexGrow: 1, height: 60 }}>
            {['Today', 'Training', 'Players', 'Game day', 'Record'].map(n => <button key={n} style={{ height: 60, padding: '0 16px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 15, fontWeight: n === 'Today' ? 700 : 500, color: n === 'Today' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', borderBottom: n === 'Today' ? '3px solid #fff' : '3px solid transparent', boxSizing: 'border-box' as const }}>{n}</button>)}
          </nav>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>Tall Timber Academy</span>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: ROSE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RW</div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, background: 'rgba(0,0,0,0.15)' }}>
          {SUBNAV.map(n => <button key={n} style={{ height: 44, padding: '0 4px', background: 'none', border: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: n === 'Record' ? 700 : 500, color: n === 'Record' ? '#fff' : 'rgba(255,255,255,0.6)', borderBottom: n === 'Record' ? '2px solid #fff' : '2px solid transparent', cursor: 'pointer' }}>{n}</button>)}
          <div style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Academy coach</div>
        </div>
      </header>
      <div style={{ padding: '20px 28px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Finishing circuit · run 1</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>Tonight · Advanced · your starting point</div>
        </div>
        <button onClick={() => st('Scheduling next run.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Run it again next week</button>
      </div>
      <main style={{ flexGrow: 1, padding: '16px 28px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24 }}>
        <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 16, padding: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' as const, gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>This is the group's starting point</div>
          <div style={{ background: PALE, borderRadius: 12, padding: '16px 20px', maxWidth: 460 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: G, marginBottom: 4 }}>41%</div>
            <div style={{ fontSize: 14, color: INK, fontWeight: 600 }}>of weaker-foot shots on target</div>
            <div style={{ fontSize: 13, color: MUT, marginTop: 6 }}>Tonight. Run it again with the same set-up to see what changes.</div>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 14 }}>It still counts tonight</div>
          {[{ n: '1', label: 'Session notes', sub: 'Written for you from what was filmed' }, { n: '2', label: "Each player's plan", sub: 'A first mark on the skill' }, { n: '3', label: 'Clips', sub: 'Saved for the term report' }].map(r => (
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
