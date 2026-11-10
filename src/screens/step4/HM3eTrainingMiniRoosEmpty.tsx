const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function HM3eTrainingMiniRoosEmpty(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U9 Tom · Wattle Creek</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Training' ? 700 : 500, color: t === 'Training' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Coach · MiniRoos</div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: 32, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 480, textAlign: 'center' as const }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>No session set for tonight</div>
          <div style={{ fontSize: 15, color: MUT, lineHeight: 1.6, marginBottom: 24 }}>Tell us your training night and Clean Sheet lines up four fun games for under 9s, with a new skill each fortnight.</div>

          <button style={{ height: 48, padding: '0 28px', borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 32 }}>Add your training night</button>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', textAlign: 'left' as const }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>What you'll see</div>
            {[
              'Four games, ready each week',
              'A new skill each fortnight',
              'No laps, no lines, no lectures',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: 8, padding: '5px 0' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: G, marginTop: 6, flex: 'none' }} />
                <div style={{ fontSize: 13, color: MUT }}>{item}</div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, marginTop: 8, fontStyle: 'italic' }}>At this age: a ball each. From the national curriculum's Discovery phase.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
