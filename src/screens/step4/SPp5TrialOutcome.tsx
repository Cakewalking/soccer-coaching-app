import { useState } from 'react'
const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', G = '#2f6252'

export default function SPp5TrialOutcome(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>Wattle Creek FC · from Rachel</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Billie's trial</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#7a9a90', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>KN</div>
      </div>
      <div style={{ flexGrow: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 16, padding: '20px 16px', textAlign: 'center' as const }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: G, marginBottom: 6 }}>A place for 2026</div>
          <div style={{ fontSize: 15, color: INK, marginBottom: 12 }}>We'd love Billie to join U12 Sam</div>
          <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', textAlign: 'left' as const }}>
            <div style={{ fontSize: 14, color: INK, fontStyle: 'italic', lineHeight: 1.5 }}>"Billie reads the game well and never stopped working. She'll fit straight in."</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 6 }}>Sam, coach</div>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>What happens next</div>
          {[{ label: 'Say yes by Friday 27 March', sub: 'Her place is held until then' }, { label: 'Register in PlayFootball', sub: 'About 10 minutes · $100 junior fee' }, { label: 'What\'s OK to record', sub: 'Six questions' }].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Other answers a family can get</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Another look: come to one more session. Another team: a place in a team that suits better. Waitlist: first to hear when a place opens.</div>
          <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Scores from a trial are never shared, with you or with Billie.</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
          <button onClick={() => st('Not proceeding.')} style={{ height: 44, borderRadius: 12, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Not for us</button>
          <button onClick={() => st("Billie's in! Opening registration.")} style={{ height: 52, borderRadius: 14, background: GD, color: '#fff', border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Yes, she's in</button>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
