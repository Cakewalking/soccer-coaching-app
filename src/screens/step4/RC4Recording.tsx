const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function RC4Recording(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: GD, color: '#ffffff', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#c39797', animation: 'pulse 1.5s infinite' }} />
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Recording</div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Win it back in 6 seconds</div>
        <div style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#cbbeb5' }} />
          Offline · will sync when you're back in signal
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 18 }}>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)' }}>Round</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3].map(r => (
                <div key={r} style={{ width: 36, height: 36, borderRadius: '50%', background: r === 2 ? '#40826d' : r < 2 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, border: r === 2 ? '2px solid #fff' : '2px solid transparent' }}>{r}</div>
              ))}
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>3 × 6 minutes</div>
          </div>

          <div style={{ textAlign: 'center' as const }}>
            <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>3:48</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>of 6:00 · Round 2</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>Coaching cue</div>
            <div style={{ fontSize: 16, lineHeight: '23px' }}>Nearest player presses immediately. Everyone else closes the passing lanes.</div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ flex: 1, height: 52, borderRadius: 12, border: '2px solid rgba(255,255,255,0.4)', background: 'transparent', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Next round →</button>
            <button style={{ height: 52, padding: '0 20px', borderRadius: 12, border: '2px solid rgba(255,255,255,0.4)', background: 'transparent', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Mark a moment</button>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ flex: 1, height: 48, borderRadius: 12, border: '2px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>⏸ Pause</button>
            <button style={{ flex: 1, height: 48, borderRadius: 12, border: '2px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Stop and save</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', color: INK }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Capturing</div>
            {[['Match camera', '✓ Recording'], ['Boot sensors', '✓ 8 of 8'], ['GPS vests', '✗ Not connected']].map(([label, status]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: `1px solid ${LN}`, fontSize: 14 }}>
                <span style={{ color: MUT }}>{label}</span>
                <span style={{ fontWeight: 700, color: (status as string).startsWith('✓') ? G : '#c05' }}>{status as string}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', color: INK }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>So far tonight</div>
            {[['Presses attempted', '14'], ['Won in 6 s', '9 (64%)'], ['Moments marked', '3']].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: `1px solid ${LN}`, fontSize: 14 }}>
                <span style={{ color: MUT }}>{label}</span>
                <span style={{ fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
