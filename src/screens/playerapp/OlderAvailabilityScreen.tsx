import { useState } from 'react'

type Ans = 'yes' | 'maybe' | 'no' | null

const EVENTS = [
  { dayLabel: 'SAT', dayNum: '6', title: 'at Harbour Rovers', sub: 'Meet 2:40 at Rovers Park · kick-off 3:30' },
  { dayLabel: 'MON', dayNum: '8', title: 'Training', sub: '7:00 pm · Wattle Creek Oval' },
  { dayLabel: 'SAT', dayNum: '13', title: 'vs Kingfisher United', sub: 'Home · 3:30' },
]

function AnswerBtn({ label, active, color, onClick }: { label: string; active: boolean; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ flex: 1, height: 44, borderRadius: 10, border: `2px solid ${active ? color : '#c5c8c4'}`, background: active ? color : '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, color: active ? '#fff' : '#10211f', cursor: 'pointer', transition: 'all 0.15s' }}>
      {label}
    </button>
  )
}

export default function OlderAvailabilityScreen() {
  const [answers, setAnswers] = useState<Record<number, Ans>>({})
  const [toast, setToast] = useState('')
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(''), 2800) }

  function setAns(i: number, v: Ans) {
    setAnswers(a => ({ ...a, [i]: v }))
    showToast(v === 'yes' ? "You're in." : v === 'maybe' ? 'Set to maybe.' : "You're out.")
  }

  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f5f6f4', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '48px 20px 20px' }}>
        <div style={{ fontSize: 12, color: '#cfe6dc', fontWeight: 500 }}>Wattle Creek U16</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginTop: 2 }}>Are you in?</div>
        <div style={{ width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, marginTop: 10 }}>CW</div>
      </div>

      {/* Events */}
      <div style={{ flexGrow: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {EVENTS.map((e, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: '#eef5f2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: '#2f6252', lineHeight: '14px', textTransform: 'uppercase' as const }}>{e.dayLabel}</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#2f6252', lineHeight: '24px' }}>{e.dayNum}</span>
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{e.title}</div>
                <div style={{ fontSize: 14, color: '#4a5a57' }}>{e.sub}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <AnswerBtn label="Yes" active={answers[i] === 'yes'}   color="#2f6252" onClick={() => setAns(i, 'yes')} />
              <AnswerBtn label="Maybe" active={answers[i] === 'maybe'} color="#cbbeb5" onClick={() => setAns(i, 'maybe')} />
              <AnswerBtn label="No"  active={answers[i] === 'no'}    color="#c39797" onClick={() => setAns(i, 'no')} />
            </div>
          </div>
        ))}

        {/* Lift request */}
        <div style={{ background: '#eef5f2', borderRadius: 14, padding: '12px 14px', fontSize: 14, color: '#2f6252', lineHeight: '20px' }}>
          Need a lift on Saturday? Tell Ollie and the team manager can pair you with another family.
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', height: 56 }}>
        {[
          { label: 'Home',    icon: 'M4 11l8-7 8 7v9H4z' },
          { label: 'Clips',   icon: 'M15 10l4.553-2.069A1 1 0 0121 8.869v6.262a1 1 0 01-1.447.894L15 14M3 8h12v9H3z' },
          { label: 'Body',    icon: 'M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 0116 0' },
          { label: 'Messages', icon: 'M4 5h16v11H8l-4 4z' },
        ].map(tab => (
          <button key={tab.label} style={{ flex: 1, border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, fontFamily: 'inherit', fontSize: 10, fontWeight: 600, color: '#4a5a57', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon}/></svg>
            {tab.label}
          </button>
        ))}
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)', background: '#10211f', color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 50, whiteSpace: 'nowrap' as const, pointerEvents: 'none' }}>{toast}</div>
      )}
    </div>
  )
}
