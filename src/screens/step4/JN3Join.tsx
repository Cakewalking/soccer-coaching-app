import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', PALE = '#eef5f2'

export default function JN3Join(_: { onBack?: () => void }) {
  const [photos, setPhotos] = useState(true)
  const [video, setVideo] = useState(true)
  const [tagged, setTagged] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 44,
          height: 26,
          borderRadius: 13,
          background: value ? G : '#c5cec9',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: 3,
          left: value ? 21 : 3,
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </button>
    )
  }

  const cards = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="6" width="18" height="13" rx="2" stroke={G} strokeWidth="1.5" fill="none" />
          <circle cx="11" cy="12.5" r="3" stroke={G} strokeWidth="1.5" fill="none" />
          <path d="M8 6V5a1 1 0 011-1h4a1 1 0 011 1v1" stroke={G} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      ),
      title: 'Photos at training and games',
      sub: 'Shared with the team and your family only',
      value: photos,
      onChange: setPhotos,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="6" width="13" height="10" rx="2" stroke={G} strokeWidth="1.5" fill="none" />
          <path d="M15 9l5-3v10l-5-3V9z" stroke={G} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      title: 'Video of drills and skills',
      sub: 'Used in the app by Sam K, never publicly',
      value: video,
      onChange: setVideo,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M2 11s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke={G} strokeWidth="1.5" fill="none" />
          <circle cx="11" cy="11" r="2.5" stroke={G} strokeWidth="1.5" fill="none" />
          <path d="M3 3l16 16" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Tagged in team photos',
      sub: 'Your name shown when you tap a photo',
      value: tagged,
      onChange: setTagged,
    },
  ]

  return (
    <div style={{ width: 390, minHeight: 844, fontFamily: 'var(--font-sans)', background: '#f7f8f7', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '12px 16px 14px', paddingTop: 'env(safe-area-inset-top, 12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Step 3 of 4</div>
        </div>
        {/* Step dots */}
        <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={{ height: 3, flex: 1, borderRadius: 2, background: n <= 3 ? '#fff' : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 16px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Heading */}
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: INK, marginBottom: 6 }}>What's OK to record?</div>
          <div style={{ fontSize: 15, color: MUT }}>These can be changed any time in settings.</div>
        </div>

        {/* Consent cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cards.map((c, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {c.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 2 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{c.sub}</div>
              </div>
              <Toggle value={c.value} onChange={c.onChange} />
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <rect x="3" y="8" width="12" height="8" rx="2" fill={G} />
            <path d="M6 8V6a3 3 0 016 0v2" stroke={G} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="9" cy="12" r="1.2" fill="#fff" />
          </svg>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>
            These choices stay with Mia's record. Sam K can see what's agreed so they know what to film.
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={() => t('Preferences saved.')}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: 14,
            border: 'none',
            background: G,
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Continue
        </button>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>
          {toast}
        </div>
      )}
    </div>
  )
}
