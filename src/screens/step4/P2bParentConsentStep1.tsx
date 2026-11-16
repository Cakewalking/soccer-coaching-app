import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const PERMS = [
  { key: 'filming', label: 'Filming in games and training', sub: 'Coaches use clips to show what worked. If no: Harper is blurred.' },
  { key: 'sensors', label: 'Boot sensors and a GPS vest', sub: 'Records running, sprints and touches. If no: Harper doesn\'t wear the kit.' },
  { key: 'checkins', label: 'Quick wellness check-ins', sub: '3 questions: sleep, body, mood. If no: Harper isn\'t asked.' },
  { key: 'growth', label: 'Growth checks', sub: 'Height once a month, for safe sprint limits.' },
  { key: 'clips', label: 'Sending Harper her own clips', sub: 'If no: Clips stay with coaches.' },
  { key: 'socials', label: 'Club highlights and social media', sub: 'If no: Never used in club highlights or posts.' },
  { key: 'firstaid', label: 'First-aid notes for the team manager', sub: 'If no: Only coaches see notes.' },
]

export default function P2bParentConsentStep1() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({})
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const allAnswered = PERMS.every(p => answers[p.key] !== undefined)

  if (done) return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: GD, marginBottom: 4 }}>Thanks, Kate.</div>
      <div style={{ fontSize: 14, color: MUT, marginBottom: 20 }}>Sam can see your choices now.</div>
      {PERMS.map(p => (
        <div key={p.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 13, color: INK }}>{p.label}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: answers[p.key] ? G : MUT }}>{answers[p.key] ? 'Yes' : 'No'}</div>
        </div>
      ))}
      <button style={{ width: '100%', height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 20 }} onClick={() => st('Done. Check your email.')}>Done · we've emailed you a copy</button>
    </div>
  )

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      {/* Top bar, as drawn: back, name, how many are answered */}
      <div style={{ background: G, height: 56, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, position: 'sticky', top: 0, zIndex: 5 }}>
        <button aria-label="Back" onClick={() => st('Your answers so far are kept.')} style={{ width: 44, height: 44, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', flexGrow: 1 }}>Clean Sheet</span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{allAnswered ? 'All answered' : `${PERMS.filter(q => answers[q.key] !== undefined).length} of ${PERMS.length} answered`}</span>
      </div>
      <div style={{ padding: '18px 20px 0' }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: INK, letterSpacing: '-0.01em' }}>What can we record?</h1>
        <div style={{ fontSize: 14, color: MUT, marginTop: 6, lineHeight: 1.45 }}>Each one is separate. Say yes to some and no to others.</div>
      </div>
      <div style={{ padding: '14px 20px 120px' }}>
        {PERMS.map(p => (
          <div key={p.key} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>{p.label}</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>{p.sub}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[true, false].map(val => (
                <button key={String(val)} onClick={() => setAnswers(prev => ({ ...prev, [p.key]: val }))} style={{
                  flex: 1, height: 44, borderRadius: 10,
                  border: `1.5px solid ${answers[p.key] === val ? G : '#c5c8c4'}`,
                  background: answers[p.key] === val ? G : '#fff',
                  color: answers[p.key] === val ? '#fff' : INK,
                  fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                }}>
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: 0, width: 390, boxSizing: 'border-box', background: '#fff', borderTop: `1px solid ${LN}`, padding: '12px 16px 14px', zIndex: 6 }}>
          <button onClick={() => { if (allAnswered) setDone(true); else st('Answer yes or no to each one first.') }} style={{ width: '100%', height: 52, borderRadius: 14, border: 0, background: allAnswered ? G : LN, color: allAnswered ? '#fff' : MUT, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>Save my choices</button>
          <div style={{ fontSize: 12, color: MUT, textAlign: 'center', marginTop: 8 }}>You can change these any time.</div>
        </div>
      {toast && <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
