import { useState } from 'react'

const G = '#2f6252'
const GD = '#1f4a3e'
const INK = '#10211f'
const MUT = '#4a5a57'
const LN = '#e8edeb'
const PALE = '#eef5f2'

type Rating = 1 | 2 | 3 | 4 | 5

const SLEEP_LABELS: Record<Rating, string>  = { 1: 'Badly', 2: 'Not great', 3: 'OK', 4: 'Good', 5: 'Great' }
const BODY_LABELS: Record<Rating, string>   = { 1: 'Sore', 2: 'A bit sore', 3: 'OK', 4: 'Good', 5: 'Fresh' }
const MOOD_LABELS: Record<Rating, string>   = { 1: 'Low', 2: 'Meh', 3: 'OK', 4: 'Good', 5: 'Great' }

const SORE_AREAS = ['Legs', 'Knees', 'Ankles or feet', 'Back', 'Somewhere else']

function RatingRow({ labels, value, onChange }: { labels: Record<Rating, string>; value: Rating | null; onChange: (v: Rating) => void }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {([1, 2, 3, 4, 5] as Rating[]).map(v => {
        const sel = value === v
        return (
          <button key={v} onClick={() => onChange(v)} style={{
            flex: 1, height: 56, borderRadius: 10, border: `2px solid ${sel ? G : LN}`,
            background: sel ? PALE : '#fff', cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
            transition: 'border-color 0.15s, background 0.15s',
          }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: sel ? G : '#c5c8c4' }}>{v}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: sel ? G : MUT, textAlign: 'center', lineHeight: '12px' }}>{labels[v]}</div>
          </button>
        )
      })}
    </div>
  )
}

export default function PACheckScreen({ onClose }: { onClose?: () => void }) {
  const [sleep, setSleep]       = useState<Rating | null>(null)
  const [body, setBody]         = useState<Rating | null>(null)
  const [soreAreas, setSore]    = useState<string[]>([])
  const [mood, setMood]         = useState<Rating | null>(null)
  const [sent, setSent]         = useState(false)

  const bodySore = body !== null && body <= 2
  const canSend = sleep !== null && body !== null && mood !== null

  function toggleArea(a: string) {
    setSore(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
  }

  function send() {
    if (!canSend) return
    setSent(true)
  }

  if (sent) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
        <div style={{ width: 390, background: '#fff', borderRadius: 20, fontFamily: 'var(--font-sans)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(16,33,31,0.08)' }}>
          <div style={{ background: GD, padding: '20px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Before training · Thu</div>
          </div>
          <div style={{ padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: INK, marginBottom: 8 }}>Sent</div>
            <div style={{ fontSize: 14, color: MUT }}>Your coach and your parent can see your answers.</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <div style={{ width: 390, background: '#fff', borderRadius: 20, fontFamily: 'var(--font-sans)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(16,33,31,0.08)' }}>
        {/* Header */}
        <div style={{ background: GD, padding: '20px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Before training · Thu</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Check-in</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff' }}>MT</div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: INK, marginBottom: 4 }}>Mia</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20, lineHeight: '18px' }}>Your coaches and your parent can see your answers. There are no wrong answers.</div>
        </div>

        <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Sleep */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>How did you sleep?</div>
            <RatingRow labels={SLEEP_LABELS} value={sleep} onChange={setSleep} />
          </div>

          {/* Body */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>How does your body feel?</div>
            <RatingRow labels={BODY_LABELS} value={body} onChange={setBody} />
          </div>

          {/* Sore areas — shown only when sore */}
          {bodySore && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 10 }}>Where?</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SORE_AREAS.map(a => {
                  const sel = soreAreas.includes(a)
                  return (
                    <button key={a} onClick={() => toggleArea(a)} style={{
                      height: 36, padding: '0 14px', borderRadius: '999px',
                      border: `1.5px solid ${sel ? G : LN}`,
                      background: sel ? PALE : '#fff', cursor: 'pointer',
                      fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                      color: sel ? G : INK,
                    }}>
                      {a}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Mood */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>How are you feeling today?</div>
            <RatingRow labels={MOOD_LABELS} value={mood} onChange={setMood} />
          </div>

          {/* Send button */}
          <button onClick={send} disabled={!canSend} style={{
            width: '100%', height: 52, borderRadius: 12, border: 0,
            background: canSend ? G : LN, color: canSend ? '#fff' : MUT,
            fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: canSend ? 'pointer' : 'default',
            transition: 'background 0.2s',
          }}>
            {canSend ? 'Send check-in' : 'Answer all 3 to send'}
          </button>

          {onClose && (
            <button onClick={onClose} style={{ width: '100%', height: 44, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
