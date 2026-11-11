const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const CASES = [
  { ini: 'RC', name: 'Ruby Chen', day: 12, days: 21, pct: 57, noSymptoms: 'No symptoms since 25 May', steps: [true, true, true, false, false] },
  { ini: 'NA', name: 'Noah Ali', day: 5, days: 21, pct: 24, noSymptoms: 'Still has headaches', steps: [true, true, false, false, false] },
]
const STEP_LABELS = ['Rest', 'Walk', 'Jog', 'Train', 'Play']

export default function FC1Concussion(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <span style={{ padding: '2px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>CLUB</span>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · Fitness coach</div>
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Concussion protocol</h1>
        <span style={{ fontSize: 14, color: MUT }}>2 active · 4 returned this season</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          {CASES.map((c, ci) => (
            <div key={ci} style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ width: 36, height: 36, borderRadius: '50%', background: PALE, color: G, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.ini}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: MUT }}>Day {c.day} of {c.days} · {c.noSymptoms}</div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: c.pct > 50 ? G : '#c06000' }}>{c.pct}%</div>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: '#e8edeb', overflow: 'hidden', marginBottom: 12 }}>
                <div style={{ width: `${c.pct}%`, height: '100%', background: c.pct > 50 ? G : '#c06000', borderRadius: 99 }} />
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {STEP_LABELS.map((l, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center' as const }}>
                    <div style={{ height: 8, borderRadius: 4, background: c.steps[i] ? G : '#e8edeb', marginBottom: 4 }} />
                    <span style={{ fontSize: 11, color: c.steps[i] ? G : MUT, fontWeight: c.steps[i] ? 700 : 400 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ background: '#fce9e9', border: '1px solid #f0a0a0', borderRadius: 14, padding: '12px 16px', fontSize: 14, lineHeight: '20px' }}>
            <strong>No symptom-free clearance = no next step.</strong> A player must be symptom-free for 24 hours before moving to the next stage. Any symptom return = back to Rest.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Concussion officer</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: PALE, color: G, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>MB</span>
              <span><strong style={{ fontSize: 14 }}>Marco Bellini</strong><br /><span style={{ fontSize: 12, color: MUT }}>Club physio</span></span>
            </div>
            <button style={{ height: 40, borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Contact Marco</button>
          </div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>This season</div>
            {[['Head knocks','6'],['Returned to play','4'],['Avg days','24'],['Returned too soon','0 ✓']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${LN}`, paddingTop: 6, fontSize: 14 }}>
                <span style={{ color: MUT }}>{k}</span><strong>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
