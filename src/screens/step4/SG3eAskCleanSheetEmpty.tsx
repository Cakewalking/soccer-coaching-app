const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SG3eAskCleanSheetEmpty(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U12 Sam · Wattle Creek</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Training' ? 700 : 500, color: t === 'Training' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Head coach</div>
      </div>

      <div style={{ display: 'flex', flex: 1, alignItems: 'flex-start', padding: '48px 48px 32px', gap: 48 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>Ask Clean Sheet</div>
          <div style={{ fontSize: 15, color: MUT, marginBottom: 24 }}>Describe a problem in your own words</div>

          <div style={{ background: '#fff', border: `2px solid ${LN}`, borderRadius: 16, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 15, color: MUT, marginBottom: 12 }}>What are you seeing? Type or say it the way you'd tell another coach.</div>
            <div style={{ height: 80, display: 'flex', alignItems: 'center' }}>
              <div style={{ fontSize: 14, color: '#ccc', fontStyle: 'italic' }}>Ask a question...</div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: MUT, marginBottom: 20 }}>You get what your games show, and three drills that fit your numbers and the week's load.</div>
        </div>

        <div style={{ width: 320 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Coaches ask things like</div>
            {[
              { n: '1', q: 'Why do we concede late?', hint: 'It checks your last games' },
              { n: '2', q: 'What should Mia work on?', hint: 'It checks her own clips and goal' },
              { n: '3', q: 'A warm-up for 9 and no goals', hint: 'It checks the library' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flex: 'none' }}>{item.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{item.q}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{item.hint}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
