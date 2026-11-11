import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SP14eIndoorTeamEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Summer and indoor teams</div>
          <div style={{ fontSize: 14, color: MUT }}>None this post-season</div>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '32px 36px', maxWidth: 580, marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>Playing indoor or summer football?</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>Set up a short-season team with its own fixtures and rules. It can borrow players from any team at the club, and their load still counts towards the rest month.</div>
        <button onClick={() => setSheet('spindoor')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Set up a summer team</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[
          { n: '1', title: 'Indoor fives or futsal',   body: 'Small ball, rolling subs' },
          { n: '2', title: 'Summer sevens',             body: 'Outdoor, short season' },
          { n: '3', title: 'School or rep team',        body: 'Just to count the load' },
        ].map(item => (
          <div key={item.n} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 14, fontWeight: 700, color: G }}>{item.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: MUT }}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>

      {sheet === 'spindoor' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 480, marginTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>Summer or indoor team</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 14 }}>A short-season team with its own fixtures.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { t('Saved. Families are told about Monday.'); setSheet(null) }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Save</button>
            <button onClick={() => setSheet(null)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
