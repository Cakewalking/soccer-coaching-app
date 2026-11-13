import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU3TrialPlan({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const steps = [
    { n: 1, label: 'Sam asks Mia', done: true, detail: "Coach's view answered. Sam: \"She plays up in her mind already.\"", date: '1 June' },
    { n: 2, label: 'Ask the family', done: true, detail: 'Message sent to Mia and her parents. Both said yes.', date: '3 June' },
    { n: 3, label: 'Mia says yes', done: true, detail: 'Mia: "I know three of them. I\'d like to try."', date: '4 June' },
    { n: 4, label: 'Trial starts', done: false, detail: '4 weeks training with U13 Girls Meg, still playing U12 Sam.', date: '10 June' },
    { n: 5, label: 'Check-in after each session', done: false, detail: 'One question to Mia after each session. Sam and Meg see the answers.', date: 'During trial' },
    { n: 6, label: 'Review · 8 July', done: false, detail: 'Mia\'s words first, then numbers with the older group, then both coaches.', date: '8 July' },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Players' ? 700 : 500, color: t === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={onBack} style={{ fontSize: 13, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Mia Tran</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Trial plan</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button onClick={() => st('Opening the family message.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Family message</button>
          <button onClick={() => st('Starting trial. Sam and Meg will be told.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Start trial</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px 32px', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Trial plan · Mia Tran</div>
            <div style={{ fontSize: 13, color: MUT }}>U12 Sam → U13 Girls Meg · 4 weeks training · starting 10 June</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px', marginBottom: 20 }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: i < steps.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: s.done ? G : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {s.done
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      : <span style={{ fontSize: 13, fontWeight: 700, color: MUT }}>{s.n}</span>
                    }
                  </div>
                  {i < steps.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 20, background: s.done ? G : LN, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: s.done ? INK : MUT }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{s.date}</div>
                    {s.done && <div style={{ fontSize: 11, fontWeight: 700, color: G, background: PALE, borderRadius: 999, padding: '2px 8px' }}>Done</div>}
                  </div>
                  <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: G, marginBottom: 6 }}>After the trial, three choices</div>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Do both · play for both teams', 'Move up · play only for U13 Meg', 'Back to own age · with a completed trial, not a failure'].map((c, i) => (
                <div key={i} style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '12px 14px', fontSize: 13, color: INK }}>{c}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={{ width: 240, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Rules during the trial</div>
            {[
              'Mia is in both squads',
              'Fair-game-time counts both teams',
              'Load counts both teams — no extra',
              'League eligibility checked for every game',
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ color: G, fontSize: 14, flexShrink: 0 }}>·</div>
                <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>{r}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginTop: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>If the family says no</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>The trial ends quietly. No message goes to anyone except you and Sam. Nothing is recorded as a rejection.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
