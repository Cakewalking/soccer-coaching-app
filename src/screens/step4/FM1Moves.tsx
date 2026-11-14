import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const MOVES = [
  { player: 'Isla Grant', from: 'U12 Girls Ana', to: 'U13 Girls Meg', date: '28 Apr', status: 'Approved', reason: 'Playing up for experience' },
  { player: 'Leo Park', from: 'U13 Chris', to: 'U14 Josh', date: '15 May', status: 'Approved', reason: 'Nominated by coach, family agreed' },
  { player: 'Zara Khan', from: 'U14 Josh', to: 'U13 Girls Meg', date: '2 Jun', status: 'Waiting FV', reason: 'Playing down — family request' },
  { player: 'Tom Ellis', from: 'U9 Tom', to: 'U10 Nadia', date: '4 Jun', status: 'Approved', reason: 'Moving age group mid-season' },
]
const TEAMS = ['U7 Dan', 'U8 Hannah', 'U9 Mark', 'U9 Tom', 'U10 Nadia', 'U11 Girls Kate', 'U11 Luke', 'U12 Sam', 'U12 Girls Ana', 'U13 Chris', 'U13 Girls Meg', 'U14 Josh', 'U15 Girls Bec', 'U16 Ollie']
export default function FM1Moves(_: { onBack?: () => void }) {
  const [permMove, setPermMove] = useState(true)
  const [trialMove, setTrialMove] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Players' ? 700 : 500, color: tab === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Player moves</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>4 moves this season</div>
          {MOVES.map(m => (
            <div key={m.player} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{m.player}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{m.from} → {m.to}</div>
                  <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{m.date} · {m.reason}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: m.status === 'Approved' ? PALE : '#fff8f0', color: m.status === 'Approved' ? G : '#f57c00' }}>{m.status}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '18px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 16 }}>Move a player</div>
            {['Player name', 'Move to team', 'Reason'].map(f => (
              <div key={f} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: MUT, marginBottom: 4 }}>{f}</div>
                {f === 'Move to team' ? (
                  <select style={{ width: '100%', height: 38, borderRadius: 8, border: `1px solid ${LN}`, padding: '0 10px', fontFamily: 'inherit', fontSize: 13, boxSizing: 'border-box' as const }}>
                    {TEAMS.map(tn => <option key={tn}>{tn}</option>)}
                  </select>
                ) : (
                  <input placeholder={f} style={{ width: '100%', height: 38, borderRadius: 8, border: `1px solid ${LN}`, padding: '0 10px', fontFamily: 'inherit', fontSize: 13, boxSizing: 'border-box' as const }} />
                )}
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, color: INK }}>Permanent move</div>
              <div onClick={() => setPermMove(!permMove)} style={{ width: 40, height: 22, borderRadius: 11, background: permMove ? G : LN, position: 'relative' as const, cursor: 'pointer', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute' as const, top: 2, left: permMove ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: INK }}>Trial first (3 games)</div>
              <div onClick={() => setTrialMove(!trialMove)} style={{ width: 40, height: 22, borderRadius: 11, background: trialMove ? G : LN, position: 'relative' as const, cursor: 'pointer', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute' as const, top: 2, left: trialMove ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
              </div>
            </div>
            <button onClick={() => t('Move submitted for approval.')} style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Submit move</button>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
