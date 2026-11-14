import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const TEAMS: Record<string, { coach: string; players: number; last5: number[]; level: string; playingPct: number; turnout: number; recorded: number; fewestMin: number; training: string }> = {
  'U7 Dan': { coach: 'Dan Walsh', players: 11, last5: [1,0,1,1,0], level: 'MiniRoos', playingPct: 72, turnout: 88, recorded: 0, fewestMin: 0, training: 'Mon' },
  'U8 Hannah': { coach: 'Hannah Lee', players: 12, last5: [1,1,1,0,1], level: 'MiniRoos', playingPct: 81, turnout: 92, recorded: 0, fewestMin: 0, training: 'Wed' },
  'U9 Mark': { coach: 'Mark Davis', players: 13, last5: [0,1,0,1,0], level: 'MiniRoos', playingPct: 55, turnout: 68, recorded: 0, fewestMin: 0, training: 'Tue' },
  'U10 Nadia': { coach: 'Nadia Chen', players: 14, last5: [1,1,0,1,1], level: 'MiniRoos', playingPct: 79, turnout: 90, recorded: 0, fewestMin: 0, training: 'Wed' },
  'U11 Girls Kate': { coach: 'Kate Morris', players: 12, last5: [1,1,0,1,1], level: 'MiniRoos', playingPct: 71, turnout: 91, recorded: 4, fewestMin: 25, training: 'Tue' },
  'U12 Sam': { coach: 'Sam Nguyen', players: 16, last5: [1,0,1,1,0], level: 'Div 3', playingPct: 65, turnout: 84, recorded: 7, fewestMin: 28, training: 'Mon' },
  'U12 Girls Ana': { coach: 'Ana Bell', players: 14, last5: [0,1,1,0,1], level: 'Div 2', playingPct: 69, turnout: 87, recorded: 6, fewestMin: 32, training: 'Thu' },
  'U13 Chris': { coach: 'Chris Pham', players: 16, last5: [1,0,0,0,1], level: 'Div 2', playingPct: 45, turnout: 72, recorded: 8, fewestMin: 18, training: 'Wed' },
  'U13 Girls Meg': { coach: 'Meg Torres', players: 15, last5: [1,1,1,0,1], level: 'Div 1', playingPct: 74, turnout: 89, recorded: 9, fewestMin: 30, training: 'Tue' },
  'U14 Josh': { coach: 'Josh Reid', players: 17, last5: [0,1,0,1,0], level: 'Div 3', playingPct: 55, turnout: 76, recorded: 10, fewestMin: 22, training: 'Mon' },
  'U15 Girls Bec': { coach: 'Bec Walsh', players: 15, last5: [1,1,0,1,1], level: 'State League', playingPct: 82, turnout: 93, recorded: 12, fewestMin: 35, training: 'Wed' },
  'U16 Ollie': { coach: 'Ollie Park', players: 16, last5: [1,0,1,0,0], level: 'Div 1', playingPct: 61, turnout: 80, recorded: 11, fewestMin: 27, training: 'Thu' },
}
const TEAM_NAMES = Object.keys(TEAMS)
export default function DX1CompareTeams(_: { onBack?: () => void }) {
  const [a, setA] = useState('U13 Chris')
  const [b, setB] = useState('U13 Girls Meg')
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  const ta = TEAMS[a], tb = TEAMS[b]
  const rows: Array<{ label: string; va: string | number; vb: string | number }> = [
    { label: 'Coach', va: ta.coach, vb: tb.coach },
    { label: 'Players', va: ta.players, vb: tb.players },
    { label: 'Level', va: ta.level, vb: tb.level },
    { label: 'Playing our way', va: `${ta.playingPct}%`, vb: `${tb.playingPct}%` },
    { label: 'Turnout', va: `${ta.turnout}%`, vb: `${tb.turnout}%` },
    { label: 'Games recorded', va: ta.recorded, vb: tb.recorded },
    { label: 'Fewest minutes', va: ta.fewestMin ? `${ta.fewestMin} min` : '—', vb: tb.fewestMin ? `${tb.fewestMin} min` : '—' },
    { label: 'Training', va: ta.training, vb: tb.training },
  ]
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Teams' ? 700 : 500, color: tab === 'Teams' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 20 }}>Compare teams</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 260px', gap: 20 }}>
          <div>
            <select value={a} onChange={e => setA(e.target.value)} style={{ width: '100%', height: 40, borderRadius: 10, border: `1px solid ${LN}`, padding: '0 10px', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: INK, marginBottom: 14 }}>
              {TEAM_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 4, padding: '8px 14px', marginBottom: 2 }}>{ta.last5.map((w, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: w ? G : '#e0e0e0' }} />)}</div>
              {rows.map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 13 }}>
                  <span style={{ color: MUT }}>{r.label}</span>
                  <span style={{ fontWeight: 700, color: INK }}>{r.va}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <select value={b} onChange={e => setB(e.target.value)} style={{ width: '100%', height: 40, borderRadius: 10, border: `1px solid ${LN}`, padding: '0 10px', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: INK, marginBottom: 14 }}>
              {TEAM_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 4, padding: '8px 14px', marginBottom: 2 }}>{tb.last5.map((w, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: w ? G : '#e0e0e0' }} />)}</div>
              {rows.map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 13 }}>
                  <span style={{ color: MUT }}>{r.label}</span>
                  <span style={{ fontWeight: 700, color: INK }}>{r.vb}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>What stands out</div>
            <div style={{ background: PALE, borderRadius: 12, padding: '14px 14px', fontSize: 13, color: GD, lineHeight: 1.6 }}>
              {ta.playingPct < tb.playingPct ? `${a} is 29 percentage points behind ${b} on playing our way. Consider reviewing session plans with ${ta.coach}.` : `${a} leads ${b} on playing our way. ${ta.coach} may have useful session ideas to share.`}
            </div>
            <button onClick={() => t('Suggestion sent to both coaches.')} style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginTop: 12 }}>Suggest a conversation</button>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
