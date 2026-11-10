import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SP7eFriendliesEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Friendlies</div>
          <div style={{ fontSize: 14, color: MUT }}>Nobody nearby is looking yet</div>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '32px 36px', maxWidth: 580, marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>Be the first to ask</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>Say when you're free and which pitch you have. Clubs on Clean Sheet within 20 km see it, and you're told when one says yes.</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setSheet('spfree')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Say when you're free</button>
          <button onClick={() => t('Opening \'add one yourself\'')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add one yourself</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[
          { n: '1', title: 'Any club can be added',   body: "Even if they don't use Clean Sheet" },
          { n: '2', title: 'Friendlies sit apart',    body: 'From your season numbers' },
          { n: '3', title: 'Fair minutes',             body: 'Still apply' },
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

      {sheet === 'spfree' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 480, marginTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>When are you free for a friendly?</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 14 }}>Shown to Clean Sheet clubs within 20 km.</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 12 }}>
            {['Sat 14 Mar','Sat 21 Mar','Sun 22 Mar','Sat 28 Mar'].map(d => (
              <button key={d} style={{ height: 36, padding: '0 12px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{d}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { t("Posted. You'll hear when a club says yes."); setSheet(null) }} style={{ height: 36, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Post it</button>
            <button onClick={() => setSheet(null)} style={{ height: 36, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
