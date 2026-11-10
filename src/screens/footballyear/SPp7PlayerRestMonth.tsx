const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SPp7PlayerRestMonth(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative', margin: '0 auto' }}>
      <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>9:41</div>
      </div>

      <div style={{ padding: '12px 20px 32px' }}>
        {/* Player header */}
        <div style={{ background: G, borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Hi Mia</div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 4 }}>Rest month!</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>No training or games until February</div>
        </div>

        {/* Rest card */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>What rest actually does</div>
          {[
            { title: 'Your body catches up',    body: 'Growing and recovering happens during the quiet weeks, not the busy ones.' },
            { title: 'Your brain resets',       body: 'Coming back wanting to play is better than coming back tired.' },
            { title: 'You come back stronger',  body: 'Most players who take a real break run faster in February than they did in August.' },
          ].map(item => (
            <div key={item.title} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: MUT }}>{item.body}</div>
            </div>
          ))}
        </div>

        {/* Football on holiday */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Football on holiday</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5, marginBottom: 10 }}>Kicking around at the park or on the beach? That's fine — it doesn't count as organised training. Just no holiday clinics or rep sessions this month.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999, background: PALE, color: G }}>Park kickaround ✓</span>
            <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999, background: '#fff5f5', color: '#8b3a3a' }}>Holiday clinic ✗</span>
          </div>
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 2 }}>See you in February!</div>
          <div style={{ fontSize: 13, color: MUT }}>Pre-season starts 15 February. Sam will send a message in January.</div>
        </div>
      </div>

    </div>
  )
}
