import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const DISPS = [
  { player: 'Tess Nolan', age: 'U14', request: 'Playing down to U13', status: 'Approved', date: '14 Apr', reason: 'Family relocation — only U13 team near new address' },
  { player: 'Aiden Yu', age: 'U12', request: 'Playing in MiniRoos (U11)', status: 'Waiting FV', date: '28 May', reason: 'Developmental delay — coach recommends lower age group' },
  { player: 'Sara Haddad', age: 'U13 Girls', request: 'Playing down to U12 Girls', status: 'Approved', date: '1 May', reason: 'Injury return — phased back-in plan from physio' },
  { player: 'Leo Park', age: 'U13', request: 'Playing up to U14', status: 'Not needed', date: '—', reason: 'Under-14 is same age band — no dispensation required' },
]
const RULES = [
  'Player is two or more age groups outside their own',
  'Player has a medical or developmental reason confirmed in writing',
  'Playing up into an older grade with no same-age opportunity at the club',
  'Club submits before the Round 6 deadline each season',
]
export default function FD3Dispensations(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  function statusStyle(s: string) {
    if (s === 'Approved') return { background: PALE, color: G }
    if (s === 'Waiting FV') return { background: '#fff8f0', color: '#f57c00' }
    return { background: '#f5f5f5', color: MUT }
  }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Players' ? 700 : 500, color: tab === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Dispensations</div>
              <div style={{ fontSize: 13, color: MUT }}>4 this season · 1 awaiting FV approval</div>
            </div>
            <button onClick={() => t('Opening dispensation request form…')} style={{ height: 36, padding: '0 16px', borderRadius: 9, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ New request</button>
          </div>
          {DISPS.map(d => (
            <div key={d.player} style={{ background: '#fff', border: `1px solid ${d.status === 'Waiting FV' ? '#ffe0b2' : LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK, display: 'flex', gap: 10, alignItems: 'center' }}>
                    {d.player}
                    <span style={{ fontSize: 11, fontWeight: 600, color: MUT, background: PALE, padding: '2px 7px', borderRadius: 20 }}>{d.age}</span>
                  </div>
                  <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{d.request}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, ...statusStyle(d.status) }}>{d.status}</div>
              </div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>{d.reason}</div>
              {d.status === 'Waiting FV' && (
                <button onClick={() => t('Chasing FV for Aiden Yu…')} style={{ marginTop: 10, height: 30, padding: '0 12px', borderRadius: 7, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Chase FV</button>
              )}
            </div>
          ))}
        </div>
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>When FV must say yes</div>
            {RULES.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: INK, lineHeight: 1.4 }}>
                <span style={{ color: G, flexShrink: 0, fontWeight: 700 }}>{i + 1}.</span>
                <span>{r}</span>
              </div>
            ))}
          </div>
          <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginTop: 14 }}>
            <div style={{ fontSize: 13, color: GD }}>FV typically takes 5–10 business days to respond. Submit early.</div>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
