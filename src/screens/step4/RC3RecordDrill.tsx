const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const SETUP_ROWS = [
  { label: 'Players', value: '8 · all in tonight' },
  { label: 'Area', value: '40 × 30 m · half pitch' },
  { label: 'Rounds', value: '3 × 6 minutes' },
  { label: 'Rule', value: 'Win the ball back in 6 seconds' },
  { label: 'Camera', value: 'Tripod at halfway, 4 m high' },
  { label: 'Sensors', value: 'Boots connected · no vests tonight' },
]

const MEASURES = [
  { label: 'Time to win it back', source: 'Boot sensors', on: true },
  { label: 'Sprint count per player', source: 'Boot sensors', on: true },
  { label: 'Pressing clusters (2+ together)', source: 'Match camera', on: true },
  { label: 'Distance covered', source: 'GPS vests', on: false },
]

export default function RC3RecordDrill(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Record' ? INK : MUT, borderBottom: `3px solid ${n === 'Record' ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: G, marginBottom: 4 }}>Record · Drill</div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Win it back in 6 seconds</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, background: PALE, color: G, borderRadius: 999, padding: '4px 12px' }}>Same as last time</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '10px 18px', background: '#f7f8f7', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>The set-up</div>
            {SETUP_ROWS.map(r => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', padding: '10px 18px', borderTop: `1px solid ${LN}`, gap: 16 }}>
                <div style={{ width: 80, fontSize: 13, fontWeight: 700, color: MUT, flex: 'none' }}>{r.label}</div>
                <div style={{ flex: 1, fontSize: 15 }}>{r.value}</div>
                <button style={{ fontSize: 13, color: G, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Change</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>What we'll measure</div>
            {MEASURES.map(m => (
              <div key={m.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: m.on ? G : '#e9eae8', flex: 'none', marginTop: 4 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{m.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, background: PALE, color: G, borderRadius: 999, padding: '1px 8px', display: 'inline-block', marginTop: 2 }}>{m.source}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: m.on ? G : '#c5c8c4' }}>{m.on ? 'On' : 'Off'}</div>
              </div>
            ))}
          </div>
          <button style={{ height: 52, borderRadius: 12, border: 0, background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Start recording →</button>
          <button style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>← Change drill</button>
        </div>
      </main>
    </div>
  )
}
