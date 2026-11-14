import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NOMS = [
  { player: 'Mia Tran', team: 'U12 Sam', reason: 'Goal met early · her coach says she\'s ready for a new challenge', suggestion: 'Train with U13 Girls Meg' },
  { player: 'Jade Okoro', team: 'U12 Girls Ana', reason: '4 goals in 6 · asked to train up a year', suggestion: 'Train with U13 Girls Meg' },
  { player: 'Ruby Bell', team: 'U13 Girls Meg', reason: 'Keeper · 78% shots saved, up from 64%', suggestion: 'Goalkeeper squad' },
  { player: 'Arlo Kim', team: 'U11 Girls Kate', reason: 'Two-footed · plays above her age group in futsal', suggestion: 'Train with U12 Girls Ana' },
  { player: 'Sami Malik', team: 'U10 Nadia', reason: 'Always wants the ball · uses both feet', suggestion: 'Club skills squad' },
  { player: 'Leon Brooks', team: 'U14 Josh', reason: '30-15 test top 5 · fewest heavy days', suggestion: 'Train with U16 Ollie' },
  { player: 'Ella Hughes', team: 'U15 Girls Bec', reason: 'Captain · goals met 4 of 4', suggestion: 'Regional trial' },
  { player: 'Cody Nash', team: 'U13 Chris', reason: 'Top speed 26.4 km/h, up 1.8 this year', suggestion: 'Train with U14 Josh' },
  { player: 'Pia Jensen', team: 'U13 Girls Meg', reason: 'Goal met early · wins the ball back in 3 seconds', suggestion: 'Regional trial' },
  { player: 'Theo Ortiz', team: 'U16 Ollie', reason: 'Back from injury · minutes rising', suggestion: 'Wait until fully fit' },
  { player: 'Nia Ross', team: 'U12 Girls Ana', reason: 'Keeper · asked to try outfield too', suggestion: 'Club skills squad' },
]

export default function DN1Nominations(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Players' ? 700 : 500, color: tab === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Ready for more</div>
            <div style={{ fontSize: 13, color: MUT }}>11 coach nominations · you decide with the player and their family</div>
          </div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 120px 1fr 1fr 120px', gap: 10, padding: '10px 20px', fontSize: 12, fontWeight: 700, color: MUT, background: PALE }}>
            {['Player', 'Team', 'Why', 'Suggested', ''].map(h => <div key={h}>{h}</div>)}
          </div>
          {NOMS.map((n, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 120px 1fr 1fr 120px', gap: 10, padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{n.player}</div>
              <div style={{ fontSize: 12, color: MUT }}>{n.team}</div>
              <div style={{ fontSize: 12, color: INK }}>{n.reason}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: G }}>{n.suggestion}</div>
              <button onClick={() => t(`Talk to ${n.player.split(' ')[0]}'s family.`)} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Talk to family</button>
            </div>
          ))}
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px' }}>
          <div style={{ fontSize: 13, color: GD }}>Under 13s are never ranked against each other. 8 of these 11 were born January to June: check that late-born players aren't being missed.</div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
