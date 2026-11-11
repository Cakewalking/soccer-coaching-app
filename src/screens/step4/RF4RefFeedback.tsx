const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const QUOTES = [
  { from: 'U12 Sam coach', q: 'Zoe was calm and clear the whole game. The players respected her decisions.' },
  { from: 'U9 Mark coach', q: 'Great positioning, especially in the second half. Really controlled the tempo.' },
  { from: 'U7 Dan coach', q: 'The kids love having a young ref. Really patient with the little ones.' },
]

const NavItem = ({ icon, label, active }: { icon: string; label: string; active?: boolean }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 56, fontSize: 11, fontWeight: 700, color: active ? G : MUT, cursor: 'pointer' }}>
    <span style={{ fontSize: 20 }}>{icon}</span>
    {label}
  </div>
)

export default function RF4RefFeedback(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 390, height: 844, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>
      <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · game leader, Level 4</span>
          <span style={{ display: 'block', fontSize: 19, fontWeight: 700 }}>Your feedback</span>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 140, height: 140, borderRadius: 20, background: G, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 44, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>19</span>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>of 21</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>great or good</span>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Kind words from coaches</div>
          {QUOTES.map((q, i) => (
            <div key={i} style={{ borderTop: `1px solid ${LN}`, paddingTop: 10, paddingBottom: 2 }}>
              <div style={{ fontSize: 14, lineHeight: '20px', fontStyle: 'italic', color: INK }}>"{q.q}"</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>{q.from}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>One thing to try</div>
          <div style={{ fontSize: 14, lineHeight: '20px' }}>From Ruth: "Stand a bit wider at goal kicks — it'll give you a better angle to follow the ball."</div>
        </div>
        <span style={{ fontSize: 13, color: MUT, padding: '0 2px', lineHeight: '18px' }}>Only kind feedback is shown here. Coaching tips come from Ruth directly.</span>
      </div>
      <nav style={{ flex: 'none', display: 'flex', borderTop: '1px solid #c5c8c4', background: '#fff' }}>
        <NavItem icon="📅" label="My games" />
        <NavItem icon="📋" label="Report" />
        <NavItem icon="💬" label="Feedback" active />
        <NavItem icon="👤" label="Me" />
      </nav>
    </div>
  )
}
