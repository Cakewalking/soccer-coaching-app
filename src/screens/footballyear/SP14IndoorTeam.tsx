import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const ROSTER = [
  { initials: 'MT', name: 'Mia Tran',   team: 'U12 Sam' },
  { initials: 'ZH', name: 'Zoe Hartley', team: 'U12 Sam' },
  { initials: 'FW', name: 'Finn Walsh',  team: 'U12 Sam' },
  { initials: 'PN', name: 'Priya Nair',  team: 'U12 Girls Ana' },
  { initials: 'HS', name: 'Hana Sato',   team: 'U12 Girls Ana' },
  { initials: 'EB', name: 'Eli Brooks',  team: 'U12 Luke' },
  { initials: 'DR', name: 'Dev Rao',     team: 'U12 Luke' },
  { initials: 'CH', name: 'Cleo Hart',   team: 'U12 Luke' },
]

export default function SP14IndoorTeam(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Wattle Creek Fives</div>
          <div style={{ fontSize: 14, color: MUT }}>Indoor league · Monday nights at Elderberry Park Indoor Centre · 14 September to 30 November</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Opening fixtures')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Fixtures</button>
          <button onClick={() => t("Monday's five and three subs sent to 8 families.")} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Monday's five</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Roster */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '10px 16px', background: G, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>The roster</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>8 players · game 5 of 12</span>
            </div>
            {ROSTER.map(p => (
              <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) auto', gap: 10, padding: '10px 16px', alignItems: 'center', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 11, fontWeight: 700, color: G }}>{p.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.team}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: '10px 16px', fontSize: 12, color: MUT }}>A summer team borrows players from three winter teams. It's for fun, so nothing here goes on a player's record.</div>
          </div>

          {/* Indoor rules */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>Indoor is a different game</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
              {[
                { label: 'Players',          val: '5 a side, rolling subs' },
                { label: 'Length',           val: '2 halves of 18 minutes' },
                { label: 'Ball',             val: 'Smaller, low bounce' },
                { label: 'Camera and sensors', val: 'Camera only, where the centre allows' },
              ].map(r => (
                <div key={r.label} style={{ padding: '8px 10px', borderRadius: 8, background: '#f7f8f7' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: MUT, marginBottom: 2 }}>{r.label}</div>
                  <div style={{ fontSize: 13, color: INK }}>{r.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: just for fun + Zoe note */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Just for fun</div>
            {[
              { label: 'Goals and assists',       val: "Each player sees their own tally. No list of who has most", action: 'Share', onAct: () => t('Team tally shared to the Wattle Creek Fives chat.') },
              { label: 'Team tally',              val: '23 goals in 5 games · 9 different scorers' },
              { label: 'Development numbers',     val: 'Nothing from indoor counts towards goals, tests or the season', badge: 'Off' },
            ].map(item => (
              <div key={item.label} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: MUT }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: INK, lineHeight: 1.4 }}>{item.val}</div>
                </div>
                {item.action && <button onClick={item.onAct} style={{ height: 32, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', flex: 'none' }}>{item.action}</button>}
                {item.badge && <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: '#f0f1ef', color: MUT, flex: 'none' }}>{item.badge}</span>}
              </div>
            ))}
          </div>

          <div style={{ background: '#fff3d6', border: `1px solid #e8d4a0`, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#6b5a1a', marginBottom: 4 }}>Zoe hasn't had four weeks off this year</div>
            <div style={{ fontSize: 13, color: '#7a6a2a', lineHeight: 1.5 }}>Indoor nights are still noted as football, only so the rest month can tell. December is clear if she skips the holiday clinic.</div>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
