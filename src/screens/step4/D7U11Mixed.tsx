const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function D7U11Mixed(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Teams' ? 700 : 500, color: t === 'Teams' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>U11 Luke</div>
          <div style={{ fontSize: 12, fontWeight: 700, background: PALE, color: G, padding: '3px 10px', borderRadius: 20 }}>Wallabies · MiniRoos</div>
        </div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>coach Luke Fraser · 13 players · read-only</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Coming Saturday', val: '11 of 13', sub: 'Parents answer in the app', warn: false },
                { label: 'Had a turn in goal', val: '8 of 13', sub: 'This term · everyone gets a go', warn: false },
                { label: 'Training turnout', val: '79%', sub: 'Last 2 weeks · club 87%', warn: true },
                { label: 'Game leader', val: 'Booked', sub: 'No scores under U12', warn: false },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: s.warn ? '#c05' : GD }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: MUT, marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Needs attention · 2 things</div>
              {[
                { text: '3 players under half a game', sub: 'Fewest minutes is 28%. Club policy is equal time up to U13. Talk to Luke.' },
                { text: "Luke's check ends in 12 days", sub: 'Reminded once on 31 May.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fef2f2', border: '2px solid #c05', flex: 'none', marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{item.text}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Working on · Skill Acquisition phase</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>One core skill a fortnight. Now: first touch.</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: MUT }}>
                <span>Sessions planned in Clean Sheet</span>
                <span style={{ fontWeight: 700, color: INK }}>12 of 12</span>
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Staff</div>
              {[
                { name: 'Luke Fraser', role: 'Coach', check: 'Ends in 12 days', warn: true },
                { name: 'Pete Nash', role: 'Team manager', check: 'Valid · May 2027', warn: false },
              ].map(s => (
                <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: MUT }}>{s.role}</div>
                  </div>
                  <div style={{ fontSize: 11, color: s.warn ? '#c05' : G }}>{s.check}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Next game · Sat 6 Jun</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>vs Kingfisher United</div>
              <div style={{ fontSize: 12, color: MUT }}>10:30 · Away · Kingfisher Reserve · Training Mon and Wed 5:30</div>
            </div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Players</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, color: MUT }}>Fewest minutes</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#c05' }}>28% · 3 under half</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                <div style={{ fontSize: 12, color: MUT }}>Consent done</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: G }}>13 of 13</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
