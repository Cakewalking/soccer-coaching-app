import { useState } from 'react'

const DRAFT = `Hi families,

What a great game today — the kids really gave it everything and it was wonderful to see them all in action.

A big thank you for bringing them along, cheering them on, and helping with the oranges!

See you next Saturday.

Tom`

export default function ThankParentsScreen({ onBack }: { onBack: () => void }) {
  const [msg, setMsg] = useState(DRAFT)
  const [askComingNext, setAskComingNext] = useState(true)
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div style={{ width: 390, minHeight: '100vh', background: '#1f4a3e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 28px', boxSizing: 'border-box', fontFamily: 'inherit' }}>
        <span style={{ fontSize: 44 }}>✓</span>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', textAlign: 'center' }}>Sent to 10 families</div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: '21px' }}>Families will get the message and the question about next week.</div>
        <button onClick={onBack} style={{ marginTop: 12, height: 48, padding: '0 32px', borderRadius: 14, border: 0, background: '#fff', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Done</button>
      </div>
    )
  }

  return (
    <div style={{ width: 390, minHeight: '100vh', background: '#f7f8f7', display: 'flex', flexDirection: 'column', fontFamily: 'inherit', boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '52px 20px 20px', flex: 'none' }}>
        <button onClick={onBack} style={{ background: 'none', border: 0, color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: 10, fontFamily: 'inherit' }}>← Back</button>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', marginBottom: 4 }}>U9 TOM · TO 10 FAMILIES</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Thank the parents</div>
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1, padding: '20px 20px 100px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', boxSizing: 'border-box' }}>

        <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '1px solid #e9eae8' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#4a5a57', letterSpacing: '0.08em', marginBottom: 10 }}>YOUR MESSAGE</div>
          <textarea
            value={msg}
            onChange={e => setMsg(e.target.value)}
            style={{ width: '100%', minHeight: 200, border: 0, outline: 0, resize: 'none', fontFamily: 'inherit', fontSize: 15, lineHeight: '22px', color: '#10211f', background: 'transparent', boxSizing: 'border-box' }}
          />
          <div style={{ fontSize: 12, color: '#4a5a57', marginTop: 4 }}>Auto-drafted by Clean Sheet. Edit before sending.</div>
        </div>

        <button style={{ width: '100%', height: 50, background: '#fff', border: '1.5px dashed #c5c8c4', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#4a5a57' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9l4-4 4 4 4-4 4 4"/><circle cx="8.5" cy="13.5" r="1.5"/></svg>
          Add a team photo
        </button>

        <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Ask who's coming next week</div>
            <div style={{ fontSize: 13, color: '#4a5a57', marginTop: 2 }}>Families can reply yes, maybe, or no.</div>
          </div>
          <button
            onClick={() => setAskComingNext(v => !v)}
            style={{
              flex: 'none', width: 48, height: 28, borderRadius: '999px', border: 0, cursor: 'pointer',
              background: askComingNext ? '#2f6252' : '#c5c8c4',
              transition: 'background 0.15s',
              position: 'relative',
            }}
          >
            <span style={{
              position: 'absolute', top: 3, left: askComingNext ? 23 : 3, width: 22, height: 22,
              borderRadius: '999px', background: '#fff', transition: 'left 0.15s',
            }} />
          </button>
        </div>

        <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '18px', textAlign: 'center' }}>
          Messages are sent by your club on behalf of U9 Tom. Replies come to your club inbox.
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'fixed', bottom: 0, width: 390, padding: '14px 20px', background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', flexDirection: 'column', gap: 10, boxSizing: 'border-box' }}>
        <button onClick={() => setSent(true)} style={{ width: '100%', height: 50, borderRadius: 14, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Send to 10 families</button>
        <button style={{ width: '100%', height: 44, borderRadius: 14, border: '1.5px solid #c5c8c4', background: 'transparent', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Edit the message</button>
      </div>
    </div>
  )
}
