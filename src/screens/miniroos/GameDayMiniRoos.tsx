import { useState } from 'react'

type Turn = 'on' | 'goal' | 'rest'

interface PlayerRow { ini: string; name: string; turns: Turn[] }

const PLAYERS: PlayerRow[] = [
  { ini: 'IC', name: 'Ivy Chen',    turns: ['on',   'on',   'goal', 'on'  ] },
  { ini: 'MB', name: 'Max Bailey',  turns: ['on',   'goal', 'on',   'on'  ] },
  { ini: 'AK', name: 'Arlo Kaur',   turns: ['on',   'on',   'on',   'rest'] },
  { ini: 'ZM', name: 'Zara Moore',  turns: ['on',   'rest', 'on',   'on'  ] },
  { ini: 'LW', name: 'Leo Wright',  turns: ['goal', 'on',   'on',   'on'  ] },
  { ini: 'EN', name: 'Evie Nolan',  turns: ['on',   'on',   'rest', 'on'  ] },
  { ini: 'TS', name: 'Theo Santos', turns: ['rest', 'on',   'on',   'on'  ] },
  { ini: 'PD', name: 'Poppy Dunn',  turns: ['on',   'on',   'on',   'goal'] },
  { ini: 'OH', name: 'Omar Haddad', turns: ['on',   'on',   'on',   'rest'] },
]

const PERIODS = ['0 – 10', '10 – 20', '20 – 30', '30 – 40']

const BEFORE = [
  { done: true,  text: 'Make sure every child gets a kick' },
  { done: true,  text: 'Share the turns plan before kick-off' },
  { done: false, text: 'Pick a captain and tell them their job' },
  { done: false, text: 'Remind parents: cheer everyone, no coaching' },
  { done: false, text: 'Set up the half-time oranges' },
]

const AFTER = [
  'Ask every child: "What did you enjoy?"',
  'Tell three children something specific they did well',
  'Save notes — tap "What we saw" below',
  'Send a thank-you to families after the game',
]

function turnStyle(t: Turn) {
  if (t === 'on')   return { bg: '#40826d', color: '#fff',    label: 'On'      }
  if (t === 'goal') return { bg: '#1f4a3e', color: '#fff',    label: 'In goal' }
  return                   { bg: '#f0f1ef', color: '#6f7f7b', label: 'Rest'    }
}

export default function GameDayMiniRoos({ onWhatWeSaw, empty }: { onWhatWeSaw: () => void; empty?: boolean }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  if (empty) {
    return (
      <div style={{ flexGrow: 1, padding: '28px 32px', overflowY: 'auto', fontFamily: 'var(--font-sans)' }}>
        <div style={{ maxWidth: 500 }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Game day</h1>
          <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 20 }}>No game scheduled yet</div>
          <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 16, padding: 24, marginBottom: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Turns appear once a game is added</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.6, marginBottom: 16 }}>Clean Sheet generates an equal-time turns plan for every player. Each child gets a turn in goal and as captain across the season.</div>
            <button onClick={() => showToast('Opening the add game screen.')} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Add a game</button>
          </div>
        </div>
        {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Game day</h1>
        <span style={{ fontSize: 14, color: '#4a5a57' }}>Saturday 6 Jun · vs Harbour Rovers · Home · 9 playing</span>
        <div style={{ flexGrow: 1 }} />
        <button onClick={() => showToast('Turns sheet sent to the printer.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Print turns</button>
      </div>

      {/* Main grid + sidebar */}
      <div style={{ flexGrow: 1, minHeight: 0, padding: '0 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20, overflow: 'hidden' }}>

        {/* Turns grid */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <div style={{ flex: 'none', fontSize: 12, color: '#4a5a57', marginBottom: 10 }}>Each child gets equal time on the pitch and a turn in goal this season</div>
          <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'inherit' }}>
              <thead>
                <tr>
                  <th style={{ width: 140, padding: '8px 12px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#4a5a57', borderBottom: '2px solid #e9eae8' }}>Player</th>
                  {PERIODS.map((p, i) => (
                    <th key={i} style={{ padding: '8px 10px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#4a5a57', borderBottom: '2px solid #e9eae8' }}>{p}</th>
                  ))}
                  <th style={{ padding: '8px 10px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#4a5a57', borderBottom: '2px solid #e9eae8' }}>Mins</th>
                </tr>
              </thead>
              <tbody>
                {PLAYERS.map((pl, ri) => {
                  const onCount = pl.turns.filter(t => t !== 'rest').length
                  return (
                    <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#f9faf9' }}>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #e9eae8' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{pl.ini}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{pl.name}</span>
                        </div>
                      </td>
                      {pl.turns.map((t, ti) => {
                        const s = turnStyle(t)
                        return (
                          <td key={ti} style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #e9eae8' }}>
                            <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: s.bg, color: s.color }}>{s.label}</span>
                          </td>
                        )
                      })}
                      <td style={{ padding: '10px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#10211f', borderBottom: '1px solid #e9eae8' }}>{onCount * 10} min</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, overflowY: 'auto', paddingBottom: 56 }}>

          {/* Before the game */}
          <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Before the game</div>
            {BEFORE.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
                <span style={{
                  flex: 'none', width: 20, height: 20, borderRadius: 6, border: `2px solid ${b.done ? '#40826d' : '#c5c8c4'}`,
                  background: b.done ? '#40826d' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {b.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>}
                </span>
                <span style={{ fontSize: 13, color: b.done ? '#4a5a57' : '#10211f', textDecoration: b.done ? 'line-through' : 'none', lineHeight: '18px' }}>{b.text}</span>
              </div>
            ))}
          </div>

          {/* After the game */}
          <div style={{ background: '#eef5f2', border: '1px solid #c5d9d0', borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1f4a3e', marginBottom: 10 }}>After the game</div>
            {AFTER.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderTop: i > 0 ? '1px solid #c5d9d0' : 'none' }}>
                <span style={{ flex: 'none', width: 6, height: 6, borderRadius: '999px', background: '#2f6252', marginTop: 6 }} />
                <span style={{ fontSize: 13, color: '#1f4a3e', lineHeight: '18px' }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ flex: 'none', borderTop: '1px solid #e9eae8', padding: '10px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
        <span style={{ fontSize: 13, color: '#4a5a57' }}>Every child plays. Every child has a turn in goal and as captain this season.</span>
        <button onClick={onWhatWeSaw} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>What we saw →</button>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
