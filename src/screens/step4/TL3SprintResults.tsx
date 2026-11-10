const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const RESULTS = [
  { label: 'Feb 2', time: 4.12 },
  { label: 'Mar 10', time: 4.01 },
  { label: 'Apr 7', time: 3.95 },
  { label: 'May 5', time: 3.84 },
]
const MAX_T = 4.3
const MIN_T = 3.6
const RANGE = MAX_T - MIN_T

function barH(t: number) { return Math.max(4, ((MAX_T - t) / RANGE) * 160) }

export default function TL3SprintResults(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Squad', 'Fitness tests', 'Injury log', 'Load'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Fitness tests' ? 700 : 500, color: t === 'Fitness tests' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Fitness coach</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
          <div style={{ fontSize: 13, color: MUT, cursor: 'pointer' }}>← 30m sprint</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Jai Patel</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>U12 Sam · 30m sprint results over time</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px 24px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 16 }}>30m sprint time (seconds)</div>

            {/* Chart */}
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', height: 200, padding: '10px 0 0' }}>
              {RESULTS.map((r, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 4, flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: i === RESULTS.length - 1 ? GD : INK }}>{r.time}s</div>
                  <div style={{ width: '100%', maxWidth: 60, background: i === RESULTS.length - 1 ? GD : PALE, borderRadius: '6px 6px 0 0', height: barH(r.time), minHeight: 8, border: `1px solid ${LN}`, transition: 'height 0.3s' }} />
                  <div style={{ fontSize: 11, color: MUT }}>{r.label}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, padding: '12px 16px', background: PALE, borderRadius: 10, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, color: MUT }}>Personal best</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: GD }}>3.84s</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: MUT }}>First result</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>4.12s</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: MUT }}>Improvement</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: G }}>−0.28s</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>All results</div>
              {RESULTS.map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                  <div style={{ fontSize: 13, color: MUT }}>{r.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: i === RESULTS.length - 1 ? GD : INK }}>{r.time}s {i === RESULTS.length - 1 ? '⬦ PB' : ''}</div>
                </div>
              ))}
            </div>
            <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px' }}>
              <div style={{ fontSize: 13, color: GD }}>Results shown to Jai only on the player app. Scores never shown between players.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
