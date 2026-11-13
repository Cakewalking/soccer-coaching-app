import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PXp1ParentDown() {
  const [step, setStep] = useState<'letter' | 'confirm' | 'done'>('letter')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      {/* Phone status bar */}
      <div style={{ background: GD, padding: '14px 20px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', flex: 1 }}>Clean Sheet</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 0 100px' }}>
        {step === 'letter' && (
          <>
            <div style={{ padding: '24px 20px 0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.08em', marginBottom: 8 }}>FROM WATTLE CREEK FC · RACHEL MOORE</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: INK, lineHeight: 1.3, marginBottom: 16 }}>An idea for Eli</div>
              <div style={{ fontSize: 15, color: GD, fontWeight: 700, background: PALE, borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
                One training night a week with an under 13 group.
              </div>
              <div style={{ fontSize: 14, color: INK, lineHeight: 1.7, marginBottom: 16 }}>
                Eli is a terrific player. He is also growing a little later than most of the boys in his under 14 group, which means the physical side of games is harder for him right now than it was six months ago.
              </div>
              <div style={{ fontSize: 14, color: INK, lineHeight: 1.7, marginBottom: 16 }}>
                This is completely normal and temporary. Many great players have been exactly where Eli is.
              </div>
              <div style={{ fontSize: 14, color: INK, lineHeight: 1.7, marginBottom: 16 }}>
                Our idea is one training night a week with the under 13 group, where the physical side is more matched. He stays an under 14 and plays all his games for under 14. We just want to give him one night where the game feels like his game.
              </div>
              <div style={{ fontSize: 14, color: INK, lineHeight: 1.7, marginBottom: 24 }}>
                We would only do this if Eli and you are both happy with the idea. No pressure either way.
              </div>
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 8 }}>What this means</div>
                {[
                  'He stays in under 14. That does not change.',
                  'One extra training night — not instead of under 14.',
                  'No change to fixtures or final season record.',
                  'He tries it once first. If he does not like it, it stops.',
                ].map((pt, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: i < 3 ? `1px solid ${LN}` : 'none' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ fontSize: 13, color: INK, lineHeight: 1.4 }}>{pt}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '20px 20px 0' }}>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 16, textAlign: 'center' }}>Does this sound like something you would like to talk about further?</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setStep('confirm')} style={{ flex: 1, height: 48, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Yes, tell us more</button>
                <button onClick={() => st('Your reply has been sent to Rachel. Thank you.')} style={{ flex: 1, height: 48, borderRadius: 999, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Not for us, thanks</button>
              </div>
            </div>
          </>
        )}

        {step === 'confirm' && (
          <div style={{ padding: '24px 20px 0' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>Thanks — Rachel will call</div>
            <div style={{ background: PALE, borderRadius: 12, padding: '16px', marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: G, fontWeight: 700, marginBottom: 6 }}>What happens next</div>
              <div style={{ fontSize: 13, color: INK, lineHeight: 1.6 }}>Rachel will call you in the next day or two. Nothing changes for Eli until you have both talked and are happy to try it.</div>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px', marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 6 }}>Anything to tell us first?</div>
              <textarea placeholder="Optional — anything that would help us plan" style={{ width: '100%', height: 100, border: `1.5px solid ${LN}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, fontFamily: 'inherit', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button onClick={() => setStep('done')} style={{ width: '100%', height: 48, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
          </div>
        )}

        {step === 'done' && (
          <div style={{ padding: '60px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>All done</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, maxWidth: 300 }}>Rachel will call you soon. Nothing changes for Eli until you are both happy.</div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: 390, background: '#fff', borderTop: `1px solid ${LN}`, padding: '10px 0 20px', display: 'flex', justifyContent: 'space-around' }}>
        {[
          { icon: '⚽', label: 'Team', active: false },
          { icon: '📅', label: 'Fixtures', active: false },
          { icon: '📁', label: 'Files', active: false },
          { icon: '💬', label: 'Messages', active: true },
        ].map(n => (
          <button key={n.label} onClick={() => st(`Going to ${n.label}.`)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            <span style={{ fontSize: 20 }}>{n.icon}</span>
            <span style={{ fontSize: 11, color: n.active ? G : MUT, fontWeight: n.active ? 700 : 400 }}>{n.label}</span>
          </button>
        ))}
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
