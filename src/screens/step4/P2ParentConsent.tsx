import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const PERMS = [
  { key: 'filming', label: 'Filming in games and training', sub: 'Coaches use clips to show what worked. If no: Harper is blurred.' },
  { key: 'sensors', label: 'Boot sensors and a GPS vest', sub: 'Records running, sprints and touches. If no: Harper doesn\'t wear the kit.' },
  { key: 'checkins', label: 'Quick wellness check-ins', sub: '3 questions before games: sleep, body, mood. If no: Harper isn\'t asked.' },
  { key: 'growth', label: 'Growth checks', sub: 'Height once a month, for safe sprint limits. If no: Harper isn\'t measured.' },
  { key: 'clips', label: 'Sending Harper her own clips', sub: 'Coaches can send clips to Harper\'s app. If no: Clips stay with coaches.' },
  { key: 'socials', label: 'Club highlights and social media', sub: 'Harper could appear in club reels. If no: Never used.' },
  { key: 'firstaid', label: 'First-aid notes for the team manager', sub: 'Asthma, allergies, emergency contacts. If no: Only coaches see notes.' },
]

export default function P2ParentConsent() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({})
  const [step, setStep] = useState(0)
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  const allAnswered = PERMS.every(p => answers[p.key] !== undefined)

  if (step === 2) return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: GD, marginBottom: 4 }}>Thanks, Kate.</div>
      <div style={{ fontSize: 14, color: MUT, marginBottom: 20 }}>Sam can see your choices now.</div>
      {PERMS.map(p => (
        <div key={p.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 13, color: INK }}>{p.label}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: answers[p.key] ? G : MUT }}>{answers[p.key] ? 'Yes' : 'No'}</div>
        </div>
      ))}
      <div style={{ fontSize: 12, color: MUT, marginTop: 16, lineHeight: 1.5 }}>Change any of these whenever you like. You can also download everything we hold about Harper, or ask us to delete it.</div>
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button onClick={() => st("Downloading Harper's data.")} style={{ flex: 1, height: 44, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Download Harper's data</button>
        <button onClick={() => st('Done. All set.')} style={{ flex: 1, height: 44, borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Done</button>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )

  if (step === 1) return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Wattle Creek FC · U12</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>What can we record?</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Each one is separate. Say yes to some and no to others.</div>
      </div>
      <div style={{ padding: '16px 20px 100px' }}>
        {PERMS.map(p => (
          <div key={p.key} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>{p.label}</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>{p.sub}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[true, false].map(val => (
                <button key={String(val)} onClick={() => setAnswers(prev => ({ ...prev, [p.key]: val }))} style={{
                  flex: 1, height: 44, borderRadius: 10,
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
        <button onClick={() => { if (allAnswered) setStep(2) }} style={{ width: '100%', height: 48, borderRadius: 14, border: 0, background: allAnswered ? G : LN, color: allAnswered ? '#fff' : MUT, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>Save my choices</button>
      </div>
    </div>
  )

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ background: GD, borderRadius: 16, padding: '20px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>Wattle Creek FC · U12</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>You choose what's recorded for Harper</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>Sam K, Harper's coach, invited you.</div>
      </div>
      <div style={{ fontSize: 14, color: INK, lineHeight: 1.6, marginBottom: 20 }}>The team uses Clean Sheet to film games and track training, so coaches can plan better sessions and help each player improve.</div>
      {[
        'Only coaches see it, unless you say Harper can be sent her own clips.',
        'Every part is your choice. Say yes to some things and no to others.',
        'Full match video is deleted after 90 days. Stored in Australia and never sold.',
      ].map(line => (
        <div key={line} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: G, marginTop: 6, flex: 'none' }} />
          <div style={{ fontSize: 13, color: MUT }}>{line}</div>
        </div>
      ))}
      <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px', margin: '16px 0 20px' }}>
        <div style={{ fontSize: 13, color: GD }}>Until you answer, Harper is blurred in any video and nothing is recorded.</div>
      </div>
      <button onClick={() => setStep(1)} style={{ width: '100%', height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Choose what's recorded · takes about 2 minutes</button>
    </div>
  )
}
