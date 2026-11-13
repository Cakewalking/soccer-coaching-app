import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'


function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div onClick={() => onChange(!value)} style={{ width: 40, height: 24, borderRadius: 999, background: value ? G : '#c8d4d0', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: value ? 18 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.15s' }} />
    </div>
  )
}

type Team = { name: string; lgh: boolean; vests: boolean; extra: boolean; asked?: string }
type Band = { label: string; sub: string; teams: Team[]; lghAllowed: boolean; vestsAllowed: boolean }

export default function PRM1FeaturesByTeam({ onShowBill, onShowTurnOn }: { onShowBill?: () => void; onShowTurnOn?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [showDefs, setShowDefs] = useState(false)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const [bands, setBands] = useState<Band[]>([
    { label: 'MiniRoos', sub: 'Under 6 to 11 · 5 teams', lghAllowed: false, vestsAllowed: false, teams: [
      { name: 'U9 Mark', lgh: false, vests: false, extra: false },
      { name: 'U11 Luke', lgh: false, vests: false, extra: false },
    ]},
    { label: 'Juniors', sub: 'Under 12 and 13 · 4 teams', lghAllowed: true, vestsAllowed: true, teams: [
      { name: 'U12 Sam', lgh: false, vests: true, extra: false, asked: 'Sam: Live game help · "A tight run of games."' },
      { name: 'U13 Chris', lgh: true, vests: true, extra: false },
    ]},
    { label: 'Youth', sub: 'Under 14 to 18 · 4 teams', lghAllowed: true, vestsAllowed: true, teams: [
      { name: 'U15 Girls Bec', lgh: true, vests: true, extra: false },
      { name: 'U16 Ollie', lgh: true, vests: true, extra: true },
    ]},
    { label: 'Seniors', sub: '1 team', lghAllowed: true, vestsAllowed: false, teams: [
      { name: "Men's 1sts", lgh: true, vests: false, extra: false },
    ]},
  ])

  function teamCost(t: Team, bi: number) {
    const b = bands[bi]
    let c = 0
    if (b.lghAllowed && t.lgh) c += 15
    if (b.vestsAllowed && t.vests) c += 10
    if (t.extra) c += 4
    return c
  }

  function bandState(bi: number, field: 'lgh' | 'vests') {
    const b = bands[bi]
    if (!b.lghAllowed && field === 'lgh') return 'na'
    if (!b.vestsAllowed && field === 'vests') return 'na'
    const vals = b.teams.map(t => t[field])
    if (vals.every(v => v)) return 'All on'
    if (vals.every(v => !v)) return 'All off'
    return 'Some teams'
  }

  function toggleBand(bi: number, field: 'lgh' | 'vests', toOn: boolean) {
    setBands(bs => bs.map((b, i) => i !== bi ? b : { ...b, teams: b.teams.map(t => ({ ...t, [field]: toOn })) }))
  }

  function toggleTeam(bi: number, ti: number, field: 'lgh' | 'vests' | 'extra', val: boolean) {
    if (val && field !== 'extra') { onShowTurnOn?.(); return }
    setBands(bs => bs.map((b, i) => i !== bi ? b : { ...b, teams: b.teams.map((t, j) => j !== ti ? t : { ...t, [field]: val }) }))
    if (!val) st('Turned off. Nothing recorded is lost.')
  }

  const totalAddon = bands.reduce((s, b, bi) => s + b.teams.reduce((ts, t) => ts + teamCost(t, bi), 0), 0)

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Club' ? 700 : 500, color: t === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['Overview', 'Messages', 'Calendar', 'Season plan', 'Playing style', 'Files', 'Features and billing'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Features and billing' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Features and billing' ? 700 : 500, color: t === 'Features and billing' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      <div style={{ display: 'flex', flex: 1, gap: 0 }}>
        {/* Main grid */}
        <div style={{ flex: 1, padding: '24px 24px 24px 32px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Features and billing</div>
            <div style={{ fontSize: 13, color: MUT }}>Wattle Creek FC · you are the billing owner</div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
              <button onClick={() => setShowDefs(d => !d)} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${showDefs ? G : LN}`, background: showDefs ? PALE : '#fff', fontSize: 13, color: showDefs ? G : INK, fontWeight: showDefs ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>What each one does</button>
              <button onClick={() => onShowBill?.()} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${G}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>This month's bill</button>
            </div>
          </div>

          {/* Grid header */}
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 1fr 1fr 80px', gap: 0, marginBottom: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, padding: '0 0 8px' }}>Age group and team</div>
            {[
              { label: 'Record and review', sub: 'In your plan' },
              { label: 'Live game help', sub: 'Add-on · $15 a team' },
              { label: 'Vests and load', sub: 'Add-on · $10 a team' },
              { label: 'Extra space', sub: 'Add-on · $4 for 20 GB' },
            ].map(h => (
              <div key={h.label} style={{ padding: '0 12px 8px', borderLeft: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>{h.label}</div>
                <div style={{ fontSize: 11, color: MUT }}>{h.sub}</div>
              </div>
            ))}
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, padding: '0 0 8px', textAlign: 'right' }}>Add-ons</div>
          </div>

          {/* Band rows */}
          {bands.map((band, bi) => (
            <div key={band.label}>
              {/* Band header */}
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 1fr 1fr 80px', background: PALE, borderTop: `1px solid ${LN}`, borderBottom: `1px solid ${LN}` }}>
                <div style={{ padding: '10px 0', fontSize: 13, fontWeight: 700, color: INK }}>
                  {band.label}
                  <div style={{ fontSize: 11, fontWeight: 400, color: MUT }}>{band.sub}</div>
                </div>
                {/* Record col - always on */}
                <div style={{ padding: '10px 12px', borderLeft: `1px solid ${LN}`, display: 'flex', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: G, fontWeight: 600 }}>All on</div>
                </div>
                {/* LGH col */}
                <div style={{ padding: '10px 12px', borderLeft: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {band.lghAllowed ? (
                    <>
                      <div style={{ fontSize: 12, color: MUT }}>{bandState(bi, 'lgh')}</div>
                      {bandState(bi, 'lgh') !== 'Some teams' && (
                        <button onClick={() => { const toOn = bandState(bi, 'lgh') === 'All off'; if (toOn) onShowTurnOn?.(); else { toggleBand(bi, 'lgh', false); st('Turned off for all.') } }} style={{ fontSize: 11, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>
                          {bandState(bi, 'lgh') === 'All on' ? 'All off' : 'All on'}
                        </button>
                      )}
                    </>
                  ) : (
                    <div style={{ fontSize: 12, color: '#aaa', fontStyle: 'italic' }}>Not for this age</div>
                  )}
                </div>
                {/* Vests col */}
                <div style={{ padding: '10px 12px', borderLeft: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {band.vestsAllowed ? (
                    <>
                      <div style={{ fontSize: 12, color: MUT }}>{bandState(bi, 'vests')}</div>
                      {bandState(bi, 'vests') !== 'Some teams' && (
                        <button onClick={() => { const toOn = bandState(bi, 'vests') === 'All off'; if (toOn) onShowTurnOn?.(); else { toggleBand(bi, 'vests', false); st('Turned off for all.') } }} style={{ fontSize: 11, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>
                          {bandState(bi, 'vests') === 'All on' ? 'All off' : 'All on'}
                        </button>
                      )}
                    </>
                  ) : (
                    <div style={{ fontSize: 12, color: '#aaa', fontStyle: 'italic' }}>Not for this age</div>
                  )}
                </div>
                {/* Extra col */}
                <div style={{ padding: '10px 12px', borderLeft: `1px solid ${LN}`, display: 'flex', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: MUT }}>All off</div>
                </div>
                <div />
              </div>
              {/* Team rows */}
              {band.teams.map((team, ti) => (
                <div key={team.name} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 1fr 1fr 80px', borderBottom: `1px solid ${LN}`, background: '#fff' }}>
                  <div style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, color: INK, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {team.name}
                    {team.asked && <span style={{ fontSize: 10, fontWeight: 700, background: '#fef3c7', color: '#92400e', borderRadius: 4, padding: '2px 6px' }}>Asked</span>}
                  </div>
                  {/* Record - always on */}
                  <div style={{ padding: '12px', borderLeft: `1px solid ${LN}`, display: 'flex', alignItems: 'center' }}>
                    <Toggle value={true} onChange={() => st('Record and review is part of the plan and cannot be turned off.')} />
                  </div>
                  {/* LGH */}
                  <div style={{ padding: '12px', borderLeft: `1px solid ${LN}`, display: 'flex', alignItems: 'center' }}>
                    {band.lghAllowed
                      ? <Toggle value={team.lgh} onChange={v => toggleTeam(bi, ti, 'lgh', v)} />
                      : <div style={{ fontSize: 12, color: '#aaa', fontStyle: 'italic' }}>Not for this age</div>
                    }
                  </div>
                  {/* Vests */}
                  <div style={{ padding: '12px', borderLeft: `1px solid ${LN}`, display: 'flex', alignItems: 'center' }}>
                    {band.vestsAllowed
                      ? <Toggle value={team.vests} onChange={v => toggleTeam(bi, ti, 'vests', v)} />
                      : <div style={{ fontSize: 12, color: '#aaa', fontStyle: 'italic' }}>Not for this age</div>
                    }
                  </div>
                  {/* Extra */}
                  <div style={{ padding: '12px', borderLeft: `1px solid ${LN}`, display: 'flex', alignItems: 'center' }}>
                    <Toggle value={team.extra} onChange={v => toggleTeam(bi, ti, 'extra', v)} />
                  </div>
                  <div style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: 13, color: teamCost(team, bi) > 0 ? INK : MUT }}>
                    ${teamCost(team, bi)}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div style={{ fontSize: 12, color: MUT, marginTop: 16 }}>Showing 7 of 14 teams. Ask Clean Sheet, Files and Messages are in the plan for every team. Prices are placeholders.</div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Add-ons this month</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: INK }}>${totalAddon}</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>On top of your club plan. Next month at today's settings: ${totalAddon}.</div>
            <button onClick={() => onShowBill?.()} style={{ width: '100%', height: 36, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Bill</button>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Your rules</div>
              <button onClick={() => st('Opening rules settings.')} style={{ fontSize: 12, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Change</button>
            </div>
            {[
              { n: 1, text: 'Live game help from under 13', reason: '"New coaches learn to read the game first."' },
              { n: 2, text: 'Vests from under 12', reason: "Clean Sheet's rule, not yours" },
            ].map(r => (
              <div key={r.n} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flexShrink: 0 }}>{r.n}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{r.text}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{r.reason}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>1 coach has asked</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>SK</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Sam: Live game help</div>
                <div style={{ fontSize: 11, color: MUT }}>U12 Sam · "A tight run of games."</div>
              </div>
              <button onClick={() => onShowTurnOn?.()} style={{ height: 28, padding: '0 12px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Open</button>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
