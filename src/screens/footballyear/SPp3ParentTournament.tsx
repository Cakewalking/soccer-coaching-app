import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SPp3ParentTournament(_: { onBack?: () => void }) {
  const [accepted, setAccepted] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative', margin: '0 auto' }}>
      <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>9:41</div>
      </div>

      <div style={{ padding: '12px 20px 32px' }}>
        {/* Header card */}
        <div style={{ background: G, borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Tournament invite</div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 4 }}>Kingfisher Summer Cup</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>Sat 21 November · Kingfisher Reserve</div>
        </div>

        {/* Details */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            {[
              { label: 'Format',   val: 'Up to 5 games in one day' },
              { label: 'Fee',      val: '$55 per player' },
              { label: 'Arrive',   val: '8:30 am for warm-up' },
              { label: 'Finish',   val: 'By 4 pm depending on results' },
            ].map(r => (
              <div key={r.label} style={{ padding: '8px 10px', background: '#f7f8f7', borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 2 }}>{r.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.val}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>This is a post-season tournament. It doesn't count towards the season, development scores or minutes tracking — just for fun.</div>
        </div>

        {!accepted ? (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <button onClick={() => { setAccepted(true); t('Great! Mia is in. Fee due by 15 November.') }} style={{ height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Mia is in!</button>
            <button onClick={() => t("No problem — Sam has been told Mia can't make it.")} style={{ height: 48, borderRadius: 14, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>She can't make it</button>
          </div>
        ) : (
          <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 4 }}>Mia is in!</div>
            <div style={{ fontSize: 13, color: G }}>Payment due by 15 November · $55 via the app or bank transfer</div>
          </div>
        )}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
