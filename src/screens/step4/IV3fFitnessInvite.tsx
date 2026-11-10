const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57'

const ACCESS_ROWS = [
  { label: 'Growth, load and tests',      detail: 'Every player on this team',                          yes: true  },
  { label: 'Wellness and pain',           detail: 'Daily check-ins',                                    yes: true  },
  { label: 'First-aid card',             detail: 'Only what parents choose to share',                   yes: true  },
  { label: 'Training plans',             detail: 'To add warm-ups and limits',                          yes: true  },
  { label: 'Messages to families',        detail: 'The team manager handles these',                     yes: false },
  { label: 'Other teams',                detail: 'Unless they invite you too',                          yes: false },
  { label: 'See the whole team\'s staff', detail: 'Looks right',                                        yes: true  },
]

export default function IV3fFitnessInvite() {
  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '52px 24px 24px', flexShrink: 0 }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>U12 Sam · Wattle Creek FC</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 2 }}>Join as fitness coach</div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)' }}>What you'll see</div>
      </div>

      {/* Context note */}
      <div style={{ background: '#fff', padding: '12px 24px', borderBottom: '1px solid #e9eae8', flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>
          Set by Wattle Creek FC for every fitness coach. Only for U12 Sam.
        </div>
      </div>

      {/* Access list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {ACCESS_ROWS.map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 24px', borderBottom: '1px solid #f0f1f0' }}>
            <div style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '999px', background: row.yes ? '#eef5f2' : '#fdf4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
              {row.yes
                ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c39797" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
              }
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 2 }}>{row.label}</div>
              <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>{row.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note + CTA */}
      <div style={{ padding: '16px 24px 40px', flexShrink: 0, background: '#fff', borderTop: '1px solid #e9eae8' }}>
        <div style={{ fontSize: 12, color: MUT, marginBottom: 16, lineHeight: 1.5 }}>
          The club can change these for every fitness coach.
        </div>
        <button style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          Looks right
        </button>
      </div>
    </div>
  )
}
