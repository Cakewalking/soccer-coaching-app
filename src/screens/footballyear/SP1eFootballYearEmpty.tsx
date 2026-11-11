import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SP1eFootballYearEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>The football year</div>
          <div style={{ fontSize: 14, color: MUT }}>U12 Sam · no dates yet</div>
        </div>
      </div>

      {/* Empty CTA */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '32px 36px', maxWidth: 600, marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>Tell Clean Sheet when your season runs</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 24 }}>With the dates in, Home, suggestions and reminders change for pre-season, the season, post-season and a rest month. Your club can set them for every team at once.</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => t('Dates added: pre-season from 2 February, round 1 on 11 April.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Use Football Victoria's 2026 dates</button>
          <button onClick={() => setSheet('spdates')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Set my own</button>
        </div>
      </div>

      {/* Four parts */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>The four parts</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { n: '1', title: 'Pre-season',               body: 'Squad, trials, friendlies, build-up' },
          { n: '2', title: 'Season and post-season',    body: 'League, then tournaments and indoor' },
          { n: '3', title: 'Rest month',                body: 'No football' },
        ].map(item => (
          <div key={item.n} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 14, fontWeight: 700, color: G }}>{item.n}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Dates sheet inline */}
      {sheet === 'spdates' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 500, marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Dates for the football year</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>U12 Sam · the club's dates are filled in</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[
              { label: 'Pre-season starts', val: '2 February' },
              { label: 'Round 1',           val: '11 April' },
              { label: 'Last game',         val: '30 August' },
              { label: 'Rest month',        val: 'December' },
            ].map(r => (
              <div key={r.label} style={{ padding: '10px 14px', borderRadius: 10, background: '#f7f8f7', border: `1px solid #e5e6e4` }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.val}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { t('Dates saved. Home changes on each date.'); setSheet(null) }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Save dates</button>
            <button onClick={() => setSheet(null)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
