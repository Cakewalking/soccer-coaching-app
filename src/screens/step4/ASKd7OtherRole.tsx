import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

const DIR_NAV = ['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'] as const
const DIR_SUB = ['Overview', 'Messages', 'Calendar', 'Season plan', 'Playing style', 'Heading policy', 'Kit and cameras'] as const

const SUGGESTIONS = [
  'Which teams are outside fair game time?',
  'Who can cover U9 Mark on Saturday?',
  'Which teams have recorded the fewest games?',
] as const

const TEAMS = [
  { name: 'U9 Wren', coach: 'Wren T', inside: true },
  { name: 'U10 Alice', coach: 'Alice M', inside: true },
  { name: 'U11 Jo', coach: 'Jo H', inside: false },
  { name: 'U12 Sam', coach: 'Sam K', inside: true },
  { name: 'U13 Chris', coach: 'Chris D', inside: true },
]

export default function ASKd7OtherRole({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  return (
    <div data-screen="ASKd7-OtherRole" data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 4, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginRight: 12 }}>Clean Sheet</div>
        {DIR_NAV.map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, padding: '0 10px', fontSize: 13, fontWeight: t === 'Club' ? 700 : 500, color: t === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
        ))}
        <button onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Clean Sheet</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => tool('Whole club')} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', background: 'none', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>Whole club<ChevronDown /></button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      {/* Sub-nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 24px', display: 'flex', gap: 2, height: 44, alignItems: 'center' }}>
        {DIR_SUB.map(t => (
          <button key={t} onClick={() => t === 'Messages' ? onNav?.('MSG4-DirectorMessages') : tool(t)} style={{ height: 44, padding: '0 10px', background: 'none', border: 'none', borderBottom: t === 'Overview' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Overview' ? 700 : 500, color: t === 'Overview' ? G : MUT, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>{t}</button>
        ))}
      </div>

      {/* Body: main + panel */}
      <div style={{ flex: 1, display: 'flex', overflowY: 'auto' }}>
        {/* Main content */}
        <div style={{ flex: 1, padding: '20px 20px 20px 24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK, flex: 1 }}>Teams</div>
            <button onClick={() => tool('All 14 teams.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>All 14 teams</button>
            <button onClick={() => tool('Add a team: name, age group, coach.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 8 }}>+ Add a team</button>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>Fair game time</div>
            <div style={{ fontSize: 13, color: INK, marginBottom: 2 }}>12 of 14 teams are inside the club rule.</div>
            <div style={{ fontSize: 12, color: MUT }}>2 teams are outside. Last checked Saturday.</div>
          </div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Tap a team to open it read-only, the way its coach sees it.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, overflow: 'hidden' }}>
            {TEAMS.map((team, i) => (
              <div key={team.name} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: i < TEAMS.length - 1 ? `1px solid ${LN}` : 'none', background: '#fff' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{team.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{team.coach}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, color: team.inside ? G : '#c05', background: team.inside ? '#eef5f2' : '#fff0f0' }}>
                  {team.inside ? 'Inside rule' : 'Outside rule'}
                </div>
              </div>
            ))}
            <div style={{ padding: '10px 16px', fontSize: 12, color: MUT, borderTop: `1px solid ${LN}` }}>Showing 5 of 14 teams · tap All 14 teams to see everyone</div>
          </div>
        </div>

        {/* Ask panel */}
        <div style={{ width: 340, flexShrink: 0, background: '#fff', borderLeft: `1px solid ${LN}`, display: 'flex', flexDirection: 'column', padding: '16px 20px', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: INK, flex: 1 }}>Ask Clean Sheet</div>
            <button onClick={() => onNav?.('ASKd3-AnyScreen')} style={{ height: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', fontSize: 16, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, background: '#f7f8f7', borderRadius: 8, padding: '8px 10px' }}>Uses only what you can see as director of football. Never sends anything by itself.</div>
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>By team, not by child. Welfare concerns are never used.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {SUGGESTIONS.map(q => (
              <button key={q} onClick={() => onNav?.('ASKd5-PanelAnswer')} style={{ height: 44, textAlign: 'left', padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#f7f8f7', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>{q}</button>
            ))}
          </div>
          <button onClick={() => tool('Now asking about the whole team, not only this screen.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask about everything instead</button>
          <button onClick={() => tool('Past questions')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Past questions</button>
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <div style={{ flex: 1, height: 44, borderRadius: 10, background: '#f7f8f7', border: `1.5px solid ${LN}`, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 12, color: MUT }}>Type a question…</div>
            <button onClick={() => onNav?.('ASKd5-PanelAnswer')} style={{ height: 44, minWidth: 44, padding: '0 16px', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
