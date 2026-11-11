import { useState } from 'react'

const ON_SHEET = [
  { ini: 'SD', name: 'Sam Delaney',   satOut: 1 },
  { ini: 'TR', name: 'Tom Reyes',     satOut: 1 },
  { ini: 'EB', name: 'Ella Brandt',   satOut: 1 },
  { ini: 'GO', name: 'Grace Owusu',   satOut: 2 },
  { ini: 'MT', name: 'Mia Tran',      satOut: 1 },
  { ini: 'JP', name: 'Jai Patel',     satOut: 2 },
  { ini: 'ZH', name: 'Zoe Hartley',   satOut: 1 },
  { ini: 'NO', name: 'Noah Okafor',   satOut: 2 },
  { ini: 'AL', name: 'Ava Lindqvist', satOut: 1 },
  { ini: 'LM', name: 'Leo Marsh',     satOut: 2 },
  { ini: 'IM', name: 'Isla Morgan',   satOut: 2 },
  { ini: 'FW', name: 'Finn Walsh',    satOut: 1 },
  { ini: 'OB', name: 'Oscar Brennan', satOut: 2 },
  { ini: 'HQ', name: 'Harper Quinn',  satOut: 0, label: 'New · first game' },
]

const SITTING_OUT = [
  { ini: 'RC', name: 'Ruby Chen',   reason: 'Her turn · sat out 0 of 8 so far', badge: 'Suggested', badgeBg: '#cbbeb5', badgeColor: '#10211f', canSwap: true },
  { ini: 'KR', name: 'Kai Russo',   reason: 'Away · family trip',               badge: 'Away',      badgeBg: '#e9eae8', badgeColor: '#10211f', canSwap: false },
  { ini: 'LN', name: 'Lily Nguyen', reason: 'Sick · told Rob on Thursday',      badge: 'Sick',      badgeBg: '#e9eae8', badgeColor: '#10211f', canSwap: false },
]

type Props = { empty?: boolean }

export default function TeamSheetScreen({ empty }: Props) {
  const [toast, setToast] = useState('')
  const [sent, setSent] = useState(false)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3200)
  }

  if (empty) {
    return (
      <main style={{ flexGrow: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f' }}>No game set for this week</div>
        <div style={{ fontSize: 14, color: '#4a5a57', maxWidth: 320, lineHeight: '20px' }}>Add a game to build a team sheet and pick who sits out.</div>
      </main>
    )
  }

  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 330px', boxSizing: 'border-box', position: 'relative' }}>

      {/* Left: team sheet */}
      <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px 10px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>On the sheet · 14</h2>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>No one is suspended · no letters needed</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px', marginTop: 6 }}>
          {ON_SHEET.map(p => (
            <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: '1px solid #e9eae8' }}>
              <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '999px', background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{p.ini}</span>
              <span style={{ flexGrow: 1, fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
              <span style={{ fontSize: 12, color: '#4a5a57', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                {p.label ?? `Sat out ${p.satOut}`}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Sitting out · 3</h2>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>Tap to swap</span>
        </div>
        {SITTING_OUT.map(p => (
          <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: '1px solid #e9eae8' }}>
            <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{p.ini}</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{p.name}</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{p.reason}</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: p.badgeBg, color: p.badgeColor }}>{p.badge}</span>
            {p.canSwap && (
              <button onClick={() => showToast('Pick who swaps with Ruby.')} style={{ display: 'inline-flex', alignItems: 'center', height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 8 }}>Swap</button>
            )}
          </div>
        ))}
      </section>

      {/* Right: sidebar */}
      <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>How the turn is picked</h2>
        {[
          { n: '1', title: 'Away, sick or suspended', sub: 'They come off first' },
          { n: '2', title: 'Then whoever has sat out least', sub: 'So it evens out over the season' },
          { n: '3', title: 'You decide', sub: 'Swap anyone before you send it' },
        ].map(r => (
          <div key={r.n} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8' }}>
            <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.n}</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{r.title}</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{r.sub}</span>
            </span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 12, background: '#eef5f2', fontSize: 13, lineHeight: '19px', marginTop: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true"><path d="M12 8v5M12 16h.01M12 3a9 9 0 100 18 9 9 0 000-18z"/></svg>
          <span>Football Victoria allows 14 players on an U12 team sheet. With 17 in the squad, three sit out each week.</span>
        </div>
        <span style={{ fontSize: 14, color: '#4a5a57', marginTop: 'auto', paddingTop: 12 }}>Never picked on ability. Parents see "Ruby's turn to rest this week" and when she's next in.</span>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button onClick={() => { setSent(true); showToast("Team sheet sent to Dribl. Three families told it's their turn to rest.") }} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${sent ? '#2f6252' : '#2f6252'}`, background: sent ? '#e4f2eb' : '#2f6252', color: sent ? '#2f6252' : '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {sent ? 'Sent to Dribl ✓' : 'Send to Dribl'}
          </button>
        </div>
      </aside>

      {/* Toast */}
      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 620, zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 20px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </main>
  )
}
