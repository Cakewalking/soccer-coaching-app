import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PC1RaiseConcern(_: { onBack?: () => void }) {
  const [about, setAbout] = useState('mychild')
  const [help, setHelp] = useState('callme')
  const [toast, setToast] = useState<string | null>(null)

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const aboutChips = [
    { id: 'mychild', label: 'My child' },
    { id: 'anotherchild', label: 'Another child' },
    { id: 'coach', label: 'Coach' },
    { id: 'anotherparent', label: 'Another parent' },
    { id: 'other', label: 'Something else' },
  ]

  const helpChips = [
    { id: 'callme', label: 'Call me' },
    { id: 'messageme', label: 'Message me' },
    { id: 'fyi', label: 'Just letting you know' },
  ]

  return (
    <div style={{ width: 390, minHeight: 844, fontFamily: 'var(--font-sans)', background: '#f7f8f7', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '12px 16px 14px', paddingTop: 'env(safe-area-inset-top, 12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={_.onBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 17l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Raise a concern</div>
        </div>
      </div>

      <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Warning card */}
        <div style={{ background: '#fff', border: '2px solid #c00', borderRadius: 14, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
            <path d="M14 3L26 24H2L14 3z" fill="#c00" stroke="#c00" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M14 11v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="19.5" r="1.2" fill="#fff" />
          </svg>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 4 }}>If someone is in danger right now</div>
            <div style={{ fontSize: 14, color: MUT }}>Call 000. Then come back here.</div>
          </div>
        </div>

        {/* About section */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>About</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {aboutChips.map(c => (
              <button
                key={c.id}
                onClick={() => setAbout(c.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 20,
                  border: about === c.id ? 'none' : `1.5px solid ${LN}`,
                  background: about === c.id ? G : '#fff',
                  color: about === c.id ? '#fff' : INK,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8 }}>What happened?</div>
          <textarea
            defaultValue="Mia mentioned that another child at training has been saying unkind things to her for the past few weeks. I'm worried it's getting worse."
            style={{
              width: '100%',
              minHeight: 110,
              borderRadius: 12,
              border: `1.5px solid ${LN}`,
              padding: '12px',
              fontSize: 14,
              color: INK,
              fontFamily: 'var(--font-sans)',
              resize: 'none',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </div>

        {/* What would help */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>What would help?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {helpChips.map(c => (
              <button
                key={c.id}
                onClick={() => setHelp(c.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 20,
                  border: help === c.id ? 'none' : `1.5px solid ${LN}`,
                  background: help === c.id ? G : '#fff',
                  color: help === c.id ? '#fff' : INK,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Helen Park card */}
        <div style={{ background: PALE, borderRadius: 12, padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#c8a97e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            HP
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: INK }}>Helen Park</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 4 }}>Welfare officer · Wattle Creek FC</div>
            <div style={{ fontSize: 13, color: MUT }}>Helen will read your concern privately.</div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={() => t('Sent to Helen. She\'ll be in touch soon.')}
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
            Send to Helen Park
          </button>
          <button
            onClick={() => t('Sent to the club chair.')}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: 14,
              border: `2px solid ${LN}`,
              background: '#fff',
              color: INK,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Send to the chair instead
          </button>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>
          {toast}
        </div>
      )}
    </div>
  )
}
