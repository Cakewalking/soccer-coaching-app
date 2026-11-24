import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Answer = 'yes' | 'maybe' | 'no' | null

// Design-id AV2 is Bao's availability (parent Linh answering for her younger child, in team U8 Hannah).
// `self` renders the older-player reuse (PO3) where the player answers for themselves.
export default function AV2ParentAvailability({ child = 'Bao', teamLabel = 'U8', coach = 'Hannah', self = false }: { child?: string; teamLabel?: string; coach?: string; self?: boolean } = {}) {
  const SESSIONS = [
    { id: 'thu', day: 'THU 4', label: 'Training', sub: 'Tonight · 5:45 to 7:15 pm · Wattle Creek Reserve' },
    { id: 'sat', day: 'SUN 7', label: self ? 'Sunday game' : 'Sunday game · first go in goal', sub: 'Home · be there 8:40 for 9:30' },
    { id: 'tue', day: 'TUE 9', label: 'Training', sub: '5:45 to 7:15 pm · Wattle Creek Reserve' },
  ]
  const [answers, setAnswers] = useState<Record<string, Answer>>({ thu: 'yes', sat: 'yes', tue: null })
  // Maybe and No ask why, so the coach is not left guessing. One tap, or a few words.
  const [reasons, setReasons] = useState<Record<string, string>>({})
  const [other, setOther] = useState<Record<string, string>>({})
  const REASONS = self ? ['Away', 'Sick', 'Injured', 'Work or study'] : ['Away', 'Sick', 'Injured', 'Family thing']
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const who = self ? 'You' : child
  function answer(id: string, val: Answer) {
    setAnswers(prev => ({ ...prev, [id]: val }))
    if (val === 'yes') setReasons(r => { const n = { ...r }; delete n[id]; return n })
    if (val === 'yes') t(`${who === 'You' ? "You're" : who + "'s"} in. Thanks!`)
    else t(val === 'maybe' ? 'Got it. What is it waiting on?' : 'No worries. What is the reason?')
  }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#faf5ec', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', position: 'relative' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Wattle Creek {teamLabel} · {self ? 'player' : 'parent'}</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>{self ? 'Can you make it?' : `Can ${child} make it?`}</div>
      </div>

      <div style={{ padding: '16px 20px 32px' }}>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 16, lineHeight: 1.45 }}>You are asked once for every game and session, five days before. {coach} sees your answer straight away. Change it any time before the day.</div>

        {SESSIONS.map(s => (
          <div key={s.id} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#7a4b5b' }}>{s.day}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{s.label}</div>
            </div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>{s.sub}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['yes', 'maybe', 'no'] as const).map(opt => (
                <button key={opt} onClick={() => answer(s.id, opt)} style={{
                  flex: 1, height: 44, borderRadius: 10, border: `1.5px solid ${answers[s.id] === opt ? G : LN}`,
                  background: answers[s.id] === opt ? PALE : '#fff',
                  color: answers[s.id] === opt ? GD : MUT,
                  fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  textTransform: 'capitalize' as const,
                }}>
                  {opt === 'yes' ? 'Yes' : opt === 'maybe' ? 'Maybe' : 'No'}
                </button>
              ))}
            </div>
            {(answers[s.id] === 'maybe' || answers[s.id] === 'no') && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${LN}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>{answers[s.id] === 'no' ? 'Why not?' : 'What is it waiting on?'} <span style={{ fontWeight: 400, color: MUT }}>Only {coach} and the team manager see this.</span></div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {REASONS.map(r => (
                    <button key={r} aria-pressed={reasons[s.id] === r} onClick={() => { setReasons(x => ({ ...x, [s.id]: r })); t(`Saved: ${r.toLowerCase()}. ${coach} can see it.`) }} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${reasons[s.id] === r ? G : LN}`, background: reasons[s.id] === r ? PALE : '#fff', color: reasons[s.id] === r ? GD : INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{r}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <input value={other[s.id] ?? ''} onChange={e => setOther(x => ({ ...x, [s.id]: e.target.value }))} placeholder="Or a few words" aria-label="Reason in your own words" style={{ flex: 1, minWidth: 0, height: 44, borderRadius: 10, border: `1px solid ${LN}`, padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: INK, outline: 'none' }} />
                  <button onClick={() => { const v = (other[s.id] ?? '').trim(); if (!v) { t('Write a few words, or tap a reason.'); return } setReasons(x => ({ ...x, [s.id]: v })); t(`Saved. ${coach} can see it.`) }} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save</button>
                </div>
                {reasons[s.id] && <div style={{ fontSize: 13, color: G, fontWeight: 600, marginTop: 8 }}>{coach} sees: {answers[s.id] === 'no' ? 'Can’t make it' : 'Maybe'} · {reasons[s.id]}</div>}
              </div>
            )}
          </div>
        ))}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
