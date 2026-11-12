const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ["Tonight's session", 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

export default function RC5eRecordResultsFirstEmpty(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>SK</div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Record' ? INK : MUT, borderBottom: `3px solid ${n === 'Record' ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Head coach</div>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 2 }}>Win it back in 6 seconds · run 1</div>
            <div style={{ fontSize: 14, color: MUT }}>Tonight · 12 players · your starting point</div>
          </div>
          <div style={{ background: PALE, border: `1.5px solid ${G}`, borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: GD, marginBottom: 8 }}>This is your starting point</div>
            <div style={{ fontSize: 15, color: INK, lineHeight: 1.6 }}>Tonight: 6.1 seconds to win it back, and 35% inside 6 seconds. Run it again with the same set-up to see what changes.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px' }}>
            <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
              {[{ label: 'Team average', val: '6.1 s', sub: 'Time to win it back' }, { label: 'Inside target', val: '35%', sub: 'Target is 6 seconds' }].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: GD }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Run it again with the same set-up and the two results will line up here for comparison.</div>
          </div>
          <button style={{ height: 48, borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' as const, padding: '0 24px' }}>Add to next week</button>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>It still counts tonight</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>The clips, notes and load data are saved. Only a comparison needs two runs — everything else is ready now.</div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            {['6 clips saved', '12 players tracked', 'Session notes ready'].map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14, color: INK }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
