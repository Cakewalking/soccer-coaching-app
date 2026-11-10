import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

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
      <button style={{ width: '100%', height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 20 }}>Done · we've emailed you a copy</button>
    </div>
  )

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Wattle Creek FC · U12</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 2 }}>What can we record?</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Each one is separate. Say yes to some and no to others.</div>
      </div>
      <div style={{ padding: '16px 20px 100px' }}>
        {PERMS.map(p => (
          <div key={p.key} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>{p.label}</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>{p.sub}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[true, false].map(val => (
                <button key={String(val)} onClick={() => setAnswers(prev => ({ ...prev, [p.key]: val }))} style={{
                  flex: 1, height: 36, borderRadius: 10,
                  border: `1.5px solid ${answers[p.key] === val ? G : LN}`,
                  background: answers[p.key] === val ? PALE : '#fff',
                  color: answers[p.key] === val ? GD : MUT,
                  fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button onClick={() => { if (allAnswered) setDone(true) }} style={{ width: '100%', height: 48, borderRadius: 14, border: 0, background: allAnswered ? G : LN, color: allAnswered ? '#fff' : MUT, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>Save my choices</button>
      </div>
    </div>
  )
}
