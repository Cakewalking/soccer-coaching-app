import { useState } from 'react'
const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', G = '#2f6252', ROSE = '#c39797'
const SUBNAV = ['Today', 'Run a session', 'Trial player', 'One-on-one', 'Record', 'Suggested']

export default function ACC10AcademyRecordResults(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const stats = [
    { label: 'Weaker-foot shots on target', value: '64%', prev: 'was 52%', verdict: 'Real change', up: true },
    { label: 'Shots per player', value: '9', prev: 'was 8', verdict: 'About the same', up: null },
    { label: 'Weaker-foot touches', value: '31%', prev: 'was 24%', verdict: 'Real change', up: true },
  ]
  const players = [
    { ini: 'AC', name: 'Ana Costa', note: 'Too new to compare. This is her starting point', tag: 'Starting point', tagColor: MUT },
    { ini: 'JM', name: 'Jonah Marsh', note: 'Same as last run', tag: 'Same', tagColor: MUT },
    { ini: 'KO', name: 'Kai Okonkwo', note: 'Left foot on target 5 of 8, up from 3 of 8', tag: 'Better', tagColor: G },
    { ini: 'LF', name: 'Lola Ferris', note: 'Make-up session, so no last run with this group', tag: 'Not compared', tagColor: MUT },
    { ini: 'MW', name: 'Mila Wójcik', note: 'Not filmed. Your hand count: 4 of 7', tag: 'Hand count', tagColor: '#8a7a30' },
    { ini: 'ZA', name: 'Zane Abbas', note: 'No boot sensors, so no touches', tag: 'Part missing', tagColor: '#a04040' },
  ]
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
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Finishing circuit · run 3</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>Tonight · Advanced · 20 players · same set-up as run 2</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ fontSize: 13, color: G, fontWeight: 700, background: PALE, padding: '8px 14px', borderRadius: 10 }}>Clips · 8</div>
          <button onClick={() => st('Scheduling next run.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Run it again next week</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '16px 28px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: MUT }}>{s.label}</div>
                <div style={{ textAlign: 'right' as const }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: INK }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{s.prev}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: s.up ? G : MUT, marginTop: 2 }}>{s.verdict}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>What it means</div>
            <div style={{ fontSize: 13, color: INK, lineHeight: 1.6 }}>The group is hitting the target more often with the weaker foot, and it's more than a normal up and down. One more run makes it a trend.</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 10, lineHeight: 1.5 }}>A change counts as real when it's bigger than the usual wobble between runs.</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 2 }}>Each player, against their own last run · Compared with 21 May</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            {players.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: p.tagColor, background: '#f0f0ee', padding: '3px 8px', borderRadius: 999, flexShrink: 0 }}>{p.tag}</div>
              </div>
            ))}
            <div style={{ padding: '10px 14px', fontSize: 12, color: MUT }}>In name order, never ranked. Showing 6 of 20.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Where it goes</div>
            {[{ n: '1', label: 'Session notes, written for you', sub: 'For all 20. Check them in two taps', action: 'Check' }, { n: '2', label: "Kai's plan", sub: 'Finishing could move up a step. You decide', action: 'Open' }, { n: '3', label: 'Term reports', sub: 'A clip is saved for 6 players', action: null }].map(r => (
              <div key={r.n} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: G }}>{r.n}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{r.sub}</div>
                </div>
                {r.action && <button onClick={() => st(`Opening ${r.label}.`)} style={{ height: 36, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 700, color: G, cursor: 'pointer' }}>{r.action}</button>}
              </div>
            ))}
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
