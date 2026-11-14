import { useState } from 'react'
const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', G = '#2f6252', ROSE = '#c39797'
const SUBNAV = ['Today', 'Run a session', 'Trial player', 'One-on-one', 'Record', 'Suggested']

export default function ACC9AcademyRecordDrill(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const rows = [
    { label: 'Players', value: '20 · three groups' },
    { label: 'Area', value: 'Penalty box, with three stations' },
    { label: 'Rounds', value: '3 rounds of 5 minutes' },
    { label: 'Rule', value: 'Weaker foot only at station 2' },
    { label: 'Camera', value: 'Behind the goal, with all three stations in view' },
    { label: 'Sensors', value: 'Boots on 19' },
  ]
  const measures = [
    { label: 'Weaker-foot shots on target', sub: 'Share that hit the target', source: 'Camera' },
    { label: 'Shots per player', sub: 'So everyone gets enough goes', source: 'Camera' },
    { label: 'Weaker-foot touches', sub: 'Share of touches on the weaker foot', source: 'Boot sensors' },
  ]
  return (
    <div style={{ width: 1180, minHeight: 820, background: '#f7f8f7', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <header style={{ flex: 'none', background: GD }}>
        <div style={{ height: 60, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>Clean Sheet</span>
          <nav style={{ display: 'flex', flexGrow: 1, height: 60 }}>
            {['Today', 'Training', 'Players', 'Game day', 'Record'].map(n => (
              <button key={n} style={{ height: 60, padding: '0 16px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 15, fontWeight: n === 'Today' ? 700 : 500, color: n === 'Today' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', borderBottom: n === 'Today' ? '3px solid #fff' : '3px solid transparent', boxSizing: 'border-box' as const }}>{n}</button>
            ))}
          </nav>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>Tall Timber Academy</span>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: ROSE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RW</div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, background: 'rgba(0,0,0,0.15)' }}>
          {SUBNAV.map(n => <button key={n} style={{ height: 44, padding: '0 4px', background: 'none', border: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: n === 'Record' ? 700 : 500, color: n === 'Record' ? '#fff' : 'rgba(255,255,255,0.6)', borderBottom: n === 'Record' ? '2px solid #fff' : '2px solid transparent', cursor: 'pointer' }}>{n}</button>)}
          <div style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Academy coach</div>
        </div>
      </header>
      <div style={{ padding: '20px 28px 0' }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Record a drill</div>
        <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>Finishing circuit · Advanced, 12 to 14 · third on tonight's plan</div>
      </div>
      <main style={{ flexGrow: 1, padding: '16px 28px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => st('Opening drill picker.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Pick another drill</button>
            <button onClick={() => st('Starting recording.')} style={{ height: 44, padding: '0 24px', borderRadius: 10, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Start recording</button>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, fontSize: 13, fontWeight: 700, color: INK }}>The set-up · Same as last time</div>
            {rows.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '11px 16px', borderBottom: `1px solid ${LN}` }}>
                <span style={{ fontSize: 13, color: MUT, width: 100, flexShrink: 0 }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: INK, flexGrow: 1 }}>{r.value}</span>
                <button onClick={() => st(`Changing ${r.label}.`)} style={{ height: 44, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: G, cursor: 'pointer' }}>{r.label === 'Camera' ? 'Check view' : 'Change'}</button>
              </div>
            ))}
            <div style={{ padding: '10px 16px', background: PALE }}>
              <div style={{ fontSize: 12, color: MUT }}>This set-up is saved with the drill, so the next run is a fair comparison.</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, fontSize: 13, fontWeight: 700, color: INK }}>What we'll measure</div>
            {measures.map((m, i) => (
              <div key={i} style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{m.label}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: G, background: PALE, padding: '2px 8px', borderRadius: 999, flexShrink: 0 }}>{m.source}</span>
                </div>
                <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{m.sub}</div>
              </div>
            ))}
            <button onClick={() => st('Opening hand count setup.')} style={{ width: '100%', height: 44, background: '#f7f8f7', border: 'none', borderTop: `1px solid ${LN}`, fontSize: 13, fontWeight: 600, color: G, cursor: 'pointer', textAlign: 'left' as const, padding: '0 16px', fontFamily: 'inherit' }}>+ Count something by hand</button>
          </div>
          <div style={{ background: PALE, borderRadius: 14, padding: '12px 16px', fontSize: 13, color: MUT }}>Last run: Thu 21 May, run 2. <strong style={{ color: INK }}>Six players</strong> have this as their term goal.</div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
