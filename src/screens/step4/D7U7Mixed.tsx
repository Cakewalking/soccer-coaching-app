import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function D7U7Mixed(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Teams' ? 700 : 500, color: t === 'Teams' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>U7 Dan</div>
          <div style={{ fontSize: 12, fontWeight: 700, background: PALE, color: G, padding: '3px 10px', borderRadius: 20 }}>Wallabies · MiniRoos</div>
        </div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>coach Dan Okafor · 7 players · read-only, the way its coaches see it</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Coming Saturday', val: '5 of 7', sub: 'Parents answer in the app' },
                { label: 'Had a turn in goal', val: '5 of 7', sub: 'This term · everyone gets a go' },
                { label: 'Training turnout', val: '91%', sub: 'Last 2 weeks · club 87%' },
                { label: 'Game leader', val: 'Booked', sub: 'No scores under U12' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: GD }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: MUT, marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Needs attention */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Needs attention · 1 thing</div>
              <div style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fef2f2', border: '2px solid #c05', flex: 'none', marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>2 families haven't done consent</div>
                  <div style={{ fontSize: 12, color: MUT }}>New this term. Their child isn't filmed.</div>
                  <button style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: G, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => st('Sending reminder.')}>Remind</button>
                </div>
              </div>
            </div>

            {/* Working on */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Working on · Discovery phase</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>Fun games with a ball each. This fortnight: running with the ball.</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: MUT }}>
                <span>Sessions planned in Clean Sheet</span>
                <span style={{ fontWeight: 700, color: INK }}>6 of 12</span>
              </div>
            </div>
          </div>

          <div>
            {/* Staff */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Staff</div>
              {[
                { name: 'Dan Okafor', role: 'Coach', check: 'Valid · Apr 2028' },
                { name: 'Mel Grey', role: 'Team manager', check: 'Valid · Jan 2027' },
              ].map(s => (
                <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: MUT }}>{s.role}</div>
                  </div>
                  <div style={{ fontSize: 11, color: G }}>{s.check}</div>
                </div>
              ))}
            </div>

            {/* Next game */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Next game · Sat 6 Jun</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>vs Ironbark United</div>
              <div style={{ fontSize: 12, color: MUT }}>8:30 · Home festival · pitch 5</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Clips only · no scores under U12</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>Training Wed 5:00</div>
            </div>

            {/* Players */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Players</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, color: MUT }}>Fewest minutes</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: G }}>60% · everyone over half</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                <div style={{ fontSize: 12, color: MUT }}>Consent done</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#c05' }}>5 of 7</div>
              </div>
            </div>
          </div>
        </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
