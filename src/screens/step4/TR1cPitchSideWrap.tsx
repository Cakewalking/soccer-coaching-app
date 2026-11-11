const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const STEPS = ['Attendance', 'Drill', 'Wrap up']

export default function TR1cPitchSideWrap(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, background: INK }}>
        <button style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>←</button>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', flex: 1 }}>Training · Thu 4 Jun</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>7:14</div>
      </div>

      <div style={{ flex: 'none', padding: '10px 28px', background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', gap: 24 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: i === 2 ? 700 : 500, color: i === 2 ? INK : G, borderBottom: `3px solid ${i === 2 ? '#40826d' : 'transparent'}`, paddingBottom: 6 }}>
            {i < 2 && <span style={{ color: G }}>✓</span>}{s}
          </div>
        ))}
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>Wrap up tonight</div>
            <div style={{ fontSize: 14, color: MUT }}>3 quick questions. Takes 1 minute. Saved to the drill record.</div>
          </div>

          {[
            { q: 'How did the pressing feel overall?', opts: ['Much better', 'A bit better', 'About the same', 'Worse'] },
            { q: 'Which drill worked best tonight?', opts: ['Win it back · 6 seconds', 'Warm-up rondo', 'Small game · tight shape', 'Cool-down'] },
          ].map((item, qi) => (
            <div key={qi} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{item.q}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {item.opts.map((o, i) => (
                  <button key={o} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1px solid ${i === 0 && qi === 0 ? G : LN}`, background: i === 0 && qi === 0 ? PALE : '#fff', color: i === 0 && qi === 0 ? G : INK, fontSize: 14, fontWeight: i === 0 && qi === 0 ? 700 : 500, cursor: 'pointer' }}>{o}</button>
                ))}
              </div>
            </div>
          ))}

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Any notes for the record?</div>
            <textarea placeholder="e.g. Noah was great at leading the press. Ella looked tired in the last drill." rows={3} style={{ width: '100%', boxSizing: 'border-box', border: `1px solid ${LN}`, borderRadius: 10, padding: '10px 12px', fontSize: 15, lineHeight: '22px', color: INK, resize: 'none' as const, fontFamily: 'inherit' }} />
          </div>

          <button style={{ height: 52, borderRadius: 12, border: 0, background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Save and finish →</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Tonight's stats</div>
            {[['Drills run', '4'], ['Players', '14 of 16'], ['Moments tagged', '5'], ['Duration', '75 min']].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: `1px solid ${LN}`, fontSize: 14 }}>
                <span style={{ color: MUT }}>{label}</span>
                <span style={{ fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Will sync when you're back in signal</div>
            <div style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>4 items waiting · all saved locally</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
              {['Drill record', 'Boot sensor data', '5 moment tags', 'Coach notes'].map(item => (
                <div key={item} style={{ fontSize: 12, background: '#f7f8f7', border: `1px solid ${LN}`, borderRadius: 999, padding: '2px 8px', color: MUT }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
