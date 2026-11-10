const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function D7U14Mixed(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Teams' ? 700 : 500, color: tab === 'Teams' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>U14 Josh</div>
          <div style={{ fontSize: 12, fontWeight: 700, background: PALE, color: G, padding: '3px 10px', borderRadius: 20 }}>Division 1 · Juniors</div>
        </div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>coach Josh Kerr · 18 players · read-only</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Last 5', val: 'D L W D W', sub: '2 W · 2 D · 1 L' },
                { label: 'Playing our way', val: '61%', sub: 'Club average 67%' },
                { label: 'Training turnout', val: '83%', sub: 'Last 2 weeks · club 87%' },
                { label: 'Games recorded', val: '5 of 6', sub: 'Of the last 6' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: GD }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: MUT, marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: G, marginBottom: 4 }}>Needs attention · 0 things</div>
              <div style={{ fontSize: 13, color: MUT }}>Nothing needs you. Checks valid, everyone getting a fair go, games recorded.</div>
            </div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Working on · Game Training phase</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>One team task a session. Now: playing out against a press.</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: MUT }}>
                <span>Sessions planned in Clean Sheet</span>
                <span style={{ fontWeight: 700, color: INK }}>10 of 12</span>
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Staff</div>
              {[
                { name: 'Josh Kerr', role: 'Coach', check: 'Valid · Mar 2027', warn: false },
                { name: 'Ivy Chen', role: 'Team manager', check: 'Valid · Nov 2027', warn: false },
                { name: 'Priya Shah', role: 'Fitness (club)', check: 'Ends in 29 days', warn: true },
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
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>vs Ironbark United</div>
              <div style={{ fontSize: 12, color: MUT }}>1:30 · Away · Ironbark Park · Training Tue and Thu 6:30</div>
            </div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Players</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, color: MUT }}>Fewest minutes</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: G }}>40% · everyone over a third</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                <div style={{ fontSize: 12, color: MUT }}>Consent done</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: G }}>18 of 18</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
