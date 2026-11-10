import { useState } from 'react'

const FIXTURES = [
  { date: 'Sat 2 May', opp: 'Banksia Park', where: 'Home', time: 'Played', note: 'All 10 had a go', past: true },
  { date: 'Sat 9 May', opp: 'Kestrel Park', where: 'Away', time: 'Played', note: '9 played', past: true },
  { date: 'Sat 16 May', opp: 'Northgate City', where: 'Home', time: 'Played', note: 'All 10 had a go', past: true },
  { date: 'Sat 23 May', opp: 'Kingfisher United', where: 'Away', time: 'Played', note: '8 played', past: true },
  { date: 'Sat 30 May', opp: 'Glenview Park', where: 'Home', time: 'Played', note: 'All 10 had a go', past: true },
  { date: 'Sat 6 Jun', opp: 'Northgate City', where: 'Away · Redgum Reserve', time: '8:30 am', note: 'Needs a game leader', current: true },
  { date: 'Sat 13 Jun', opp: 'Kestrel Park', where: 'Home · Pitch 4', time: '9:00 am', note: 'Zoe Park is game leader' },
  { date: 'Sat 20 Jun', opp: 'Banksia Park', where: 'Away · Banksia Reserve', time: '8:30 am', note: 'Photo day after' },
]

export default function FixturesMiniRoos() {
  const [toast, setToast] = useState('')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3200) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Fixtures</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>U9 Tom · Term 2 · 7 a side, 2 × 20 minutes</span>
        </div>
        <button onClick={() => showToast('Fixtures link copied.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Share with families</button>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 300px' }}>

        <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px 8px', display: 'flex', flexDirection: 'column' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1.2fr 1.3fr 90px 1.3fr', gap: 10, paddingBottom: 8 }}>
            {['Date', 'Against', 'Where', 'Time', 'Note'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>{h}</span>
            ))}
          </div>

          {FIXTURES.map((f, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1.2fr 1.3fr 90px 1.3fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: f.past ? '#4a5a57' : '#10211f', background: f.current ? '#eef5f2' : 'transparent', margin: f.current ? '0 -10px' : 0, padding: f.current ? '0 10px' : 0, borderRadius: f.current ? 10 : 0 }}>
              <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{f.date}</strong>
              <strong>{f.opp}</strong>
              <span>{f.where}</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{f.time}</span>
              <span>{f.note}</span>
            </div>
          ))}

          <span style={{ fontSize: 14, color: '#4a5a57', marginTop: 'auto', paddingTop: 8 }}>Fixtures come from the league each night. If a ground changes, families are told.</span>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section style={{ flexShrink: 0, background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>No scores, no ladder</h2>
            <span style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>MiniRoos keep no results, so there's nothing to enter after a game. Clean Sheet remembers who played and who had a turn.</span>
          </section>

          <section style={{ flexGrow: 1, background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <h2 style={{ margin: '0 0 0', fontSize: 17, fontWeight: 700 }}>This Saturday</h2>
            {[
              { circle: '✓', bg: '#eef5f2', title: 'Meet 8:10', sub: 'Sent to families Thursday' },
              { circle: '!', bg: '#cbbeb5', title: 'Game leader', sub: 'Still needed' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: '1px solid #e9eae8' }}>
                <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '999px', background: item.bg, color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{item.circle}</span>
                <span style={{ flexGrow: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{item.title}</span>
                  <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{item.sub}</span>
                </span>
              </div>
            ))}
            <button onClick={() => showToast('Opening Saturday\'s turns')} style={{ marginTop: 'auto', height: 44, padding: '0 18px', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Open Saturday's turns</button>
          </section>
        </div>
      </main>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
