import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function PRM3Bill({ onFeatures, onUsage, onOpen }: { onFeatures?: () => void; onUsage?: () => void; onOpen?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [downloaded, setDownloaded] = useState(false)
  const [added, setAdded] = useState(false)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const lines = [
    { item: 'Club plan', sub: 'Record and review, Ask Clean Sheet, Files, Messages', teams: '14 teams', each: '$20', total: '$280' },
    { item: 'Live game help', sub: 'U13 Chris, U15 Girls Bec, U16 Ollie, Men\'s 1sts', teams: '4 teams', each: '$15', total: '$60' },
    { item: 'Vests and load', sub: 'U12 Sam, U13 Chris, U15 Girls Bec, U16 Ollie', teams: '4 teams', each: '$10', total: '$40' },
    { item: 'Extra space', sub: 'U16 Ollie', teams: '1 team', each: '$4', total: '$4' },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Club' ? 700 : 500, color: t === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['Overview', 'Messages', 'Calendar', 'Season plan', 'Playing style', 'Files', 'Features and billing'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Features and billing' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Features and billing' ? 700 : 500, color: t === 'Features and billing' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Main */}
        <div style={{ flex: 1, padding: '24px 24px 24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>This month's bill</div>
            <div style={{ fontSize: 13, color: MUT }}>June 2026 · next payment 1 July · card ending 4821</div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
              <button onClick={() => onUsage?.()} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Is it being used?</button>
              <button onClick={() => onFeatures?.()} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${G}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Features by team</button>
              <button onClick={() => setDownloaded(true)} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: downloaded ? '#5a8a7a' : G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{downloaded ? 'Downloaded ✓' : 'Download'}</button>
            </div>
          </div>

          {/* Bill table */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px 80px', padding: '10px 20px', borderBottom: `1px solid ${LN}`, background: '#f7f8f7' }}>
              {['Item', 'Teams', 'Each', 'Total'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>{h}</div>
              ))}
            </div>
            {lines.map((l, i) => (
              <div key={l.item} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px 80px', padding: '14px 20px', borderBottom: i < lines.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{l.item}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{l.sub}</div>
                </div>
                <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>{l.teams}</div>
                <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>{l.each}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK, alignSelf: 'center' }}>{l.total}</div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px 80px', padding: '16px 20px', borderTop: `2px solid ${LN}`, background: '#f7f8f7' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Total for June</div>
              <div /><div />
              <div style={{ fontSize: 18, fontWeight: 800, color: INK }}>$384</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: MUT }}>All prices are placeholders, before GST. Changes during a month are charged by the day.</div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Who can change the bill</div>
            {[
              { initials: 'RM', name: 'Rachel Moore', role: 'Billing owner', bg: '#c0a070' },
              { initials: 'DF', name: 'Dana Fox, treasurer', role: 'Can turn features on and off', bg: '#8fa09b' },
            ].map(p => (
              <div key={p.name} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.initials}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{p.role}</div>
                </div>
              </div>
            ))}
            {added && <div style={{ marginTop: 8, fontSize: 12, color: G, fontWeight: 600 }}>Person added ✓</div>}
            <button onClick={() => setAdded(true)} style={{ marginTop: 8, width: '100%', height: 34, borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add someone</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Changes this month</div>
            {[
              { text: 'Extra space on for U16 Ollie', by: 'Rachel · 3 June', sign: '+' },
              { text: "Vests off for Men's 1sts", by: 'Dana · 1 June', sign: '−' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.sign === '+' ? '#dcfce7' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: c.sign === '+' ? '#166534' : '#c05', flexShrink: 0 }}>{c.sign}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{c.text}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{c.by}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Asked for by coaches</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>SK</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Sam: Live game help, U12 Sam</div>
                <div style={{ fontSize: 11, color: MUT }}>"A tight run of games."</div>
              </div>
              <button onClick={() => onOpen?.()} style={{ height: 28, padding: '0 12px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Open</button>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
