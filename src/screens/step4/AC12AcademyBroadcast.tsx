import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function AC12AcademyBroadcast(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const audiences = [
    { label: 'All families · 80', selected: true },
    { label: 'Foundation · 28', selected: false },
    { label: 'Development · 30', selected: false },
    { label: 'Advanced · 22', selected: false },
    { label: 'U13 Timber game team', selected: false },
    { label: 'Coaches · 3', selected: false },
  ]

  const sentMessages = [
    { text: 'July clinic bookings are open', sub: 'All families · Mon 9:00 am', seen: '61 of 80 seen', seenBg: PALE, seenColor: G },
    { text: 'Thursday is indoors: wet weather', sub: 'Advanced and Development · Wed', seen: '52 of 52 seen', seenBg: '#e3f0ea', seenColor: GD },
    { text: 'Term 3 dates and prices', sub: 'All families · 28 May', seen: '80 of 80 seen', seenBg: '#e3f0ea', seenColor: GD },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>

      {/* TOP NAV */}
      <div style={{ background: G, height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 0, flexShrink: 0 }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 20, letterSpacing: -0.5, marginRight: 36 }}>Clean Sheet</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {[
            { label: 'Home', icon: '⌂' },
            { label: 'Programs', icon: '☰' },
            { label: 'Players', icon: '👤' },
            { label: 'Coaches', icon: '🎓' },
            { label: 'Money', icon: '$' },
          ].map(({ label, icon }) => (
            <button key={label} style={{ background: label === 'Home' ? GD : 'transparent', color: '#fff', border: 'none', borderRadius: 8, padding: '0 14px', height: 40, fontSize: 14, fontWeight: label === 'Home' ? 700 : 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 15 }}>{icon}</span>{label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: '#fff', color: INK, border: 'none', borderRadius: 20, padding: '0 14px', height: 32, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Tall Timber Academy ▾</button>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>DO</div>
        </div>
      </div>

      {/* PAGE HEADER */}
      <div style={{ padding: '14px 28px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>Message families</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>Tall Timber news · only you post here</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => t('Back.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Back to overview</button>
          <button onClick={() => t('Sent to 80 families in the app and by email.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Send to 80 families</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 16, alignItems: 'start' }}>

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14 }}>

          {/* Who gets it tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK }}>Who gets it</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {audiences.map(a => (
                <button key={a.label} onClick={() => t(a.label)} style={{ height: 34, padding: '0 14px', borderRadius: 17, border: a.selected ? 'none' : '1px solid #c5c8c4', background: a.selected ? G : '#fff', color: a.selected ? '#fff' : INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {a.selected && <span>✓</span>}{a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Your message tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 12, flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK }}>Your message</div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: MUT }}>Headline</label>
              <input defaultValue="July holiday clinic: bookings are open" style={{ height: 40, borderRadius: 8, border: `1px solid #c5c8c4`, padding: '0 12px', fontSize: 14, color: INK, background: '#fff', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: MUT }}>Message</label>
              <textarea defaultValue="Mon 6 to Wed 8 July at Messmate Primary School. Current families can book before it opens to everyone on Friday." style={{ height: 90, borderRadius: 8, border: `1px solid #c5c8c4`, padding: '10px 12px', fontSize: 14, color: INK, background: '#fff', outline: 'none', resize: 'none' as const, fontFamily: 'inherit', lineHeight: 1.5 }} />
            </div>

            {/* Attach row */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, paddingTop: 4 }}>
              <button onClick={() => t('Photo added.')} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>📷 Photo</button>
              <button onClick={() => setSheet('cvideo')} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>🎥 Video</button>
              <button onClick={() => setSheet('cfile')} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>📎 File</button>
              <button onClick={() => setSheet('cacadpoll')} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>📊 Poll</button>
              <button onClick={() => t('Booking link added.')} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>🔗 Booking link</button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14 }}>

          {/* How it goes out tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 12 }}>How it goes out</div>
            {[
              'Also send by email',
              'Ask families to tap Got it',
              'Let families reply',
            ].map((label, i) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: i === 0 ? 0 : 12, paddingBottom: 12, borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ fontSize: 14, color: INK }}>{label}</div>
                {/* Static green toggle ON */}
                <div style={{ width: 42, height: 24, borderRadius: 12, background: G, position: 'relative' as const, flexShrink: 0 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute' as const, right: 2, top: 2 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Sent this term tile */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0, flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 10 }}>Sent this term</div>
            {sentMessages.map((m, i) => (
              <div key={i} style={{ paddingTop: i === 0 ? 0 : 12, paddingBottom: 12, borderBottom: i < sentMessages.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>📢</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{m.text}</div>
                    <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{m.sub}</div>
                  </div>
                  <span style={{ background: m.seenBg, color: m.seenColor, fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, flexShrink: 0 }}>{m.seen}</span>
                </div>
              </div>
            ))}
            <div style={{ paddingTop: 12, display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, color: MUT, flex: 1 }}>19 families haven't seen the clinic news.</div>
              <button onClick={() => t('Nudge sent to 19 families.')} style={{ height: 34, padding: '0 12px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Nudge them</button>
            </div>
          </div>
        </div>

      </div>

      {/* Sheet: cvideo */}
      {sheet === 'cvideo' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', width: 540, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: INK }}>Add a video</div>
            {['Take now', 'Pick from device', 'Clip from game'].map(opt => (
              <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: `1px solid ${LN}`, cursor: 'pointer' }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎥</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: INK }}>{opt}</div>
              </div>
            ))}
            <div style={{ background: PALE, borderRadius: 10, padding: '10px 14px', fontSize: 13, color: GD }}>Videos are only visible to the families in this message, not the public.</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setSheet(null)} style={{ height: 40, padding: '0 16px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setSheet(null); t('Video added.') }} style={{ height: 40, padding: '0 16px', borderRadius: 8, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add video</button>
            </div>
          </div>
        </div>
      )}

      {/* Sheet: cfile */}
      {sheet === 'cfile' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', width: 540, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: INK }}>Add a file</div>
            {['U12 fixtures PDF', 'Canteen roster PDF', 'Pick another'].map(opt => (
              <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: `1px solid ${LN}`, cursor: 'pointer' }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📄</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: INK }}>{opt}</div>
              </div>
            ))}
            <div style={{ background: PALE, borderRadius: 10, padding: '10px 14px', fontSize: 13, color: GD }}>PDFs and images are supported. Max 20 MB.</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setSheet(null)} style={{ height: 40, padding: '0 16px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setSheet(null); t('File attached.') }} style={{ height: 40, padding: '0 16px', borderRadius: 8, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Attach</button>
            </div>
          </div>
        </div>
      )}

      {/* Sheet: cacadpoll */}
      {sheet === 'cacadpoll' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', width: 540, display: 'flex', flexDirection: 'column' as const, gap: 14, maxHeight: 740, overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: INK }}>New poll</div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MUT }}>Start from</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {['Make-up times', 'Kit preference', 'Camp interest', 'Blank poll'].map((chip, i) => (
                  <button key={chip} style={{ height: 32, padding: '0 12px', borderRadius: 16, border: i === 0 ? 'none' : `1px solid #c5c8c4`, background: i === 0 ? G : '#fff', color: i === 0 ? '#fff' : INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{chip}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: MUT }}>Question</label>
              <input defaultValue="Which make-up times work for your family?" style={{ height: 40, borderRadius: 8, border: `1px solid #c5c8c4`, padding: '0 12px', fontSize: 14, color: INK, background: '#fff', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: MUT }}>Answers (one per line)</label>
              <textarea defaultValue={"Saturday morning\nSaturday afternoon\nSunday morning\nNone of these work"} style={{ height: 90, borderRadius: 8, border: `1px solid #c5c8c4`, padding: '10px 12px', fontSize: 14, color: INK, background: '#fff', outline: 'none', resize: 'none' as const, fontFamily: 'inherit', lineHeight: 1.5 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MUT }}>Answers do</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Show totals only', 'Show who answered', 'Stay private'].map((chip, i) => (
                  <button key={chip} style={{ height: 32, padding: '0 12px', borderRadius: 16, border: i === 0 ? 'none' : `1px solid #c5c8c4`, background: i === 0 ? G : '#fff', color: i === 0 ? '#fff' : INK, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{chip}</button>
                ))}
              </div>
            </div>

            <div style={{ background: PALE, borderRadius: 10, padding: '10px 14px', fontSize: 13, color: GD }}>Families answer in the app. You see results as they come in.</div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setSheet(null)} style={{ height: 40, padding: '0 16px', borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setSheet(null); t('Poll sent.') }} style={{ height: 40, padding: '0 16px', borderRadius: 8, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send poll</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
