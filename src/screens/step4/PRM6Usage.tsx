import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM6Usage({ onBill, onFeatures }: { onBill?: () => void; onFeatures?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [alertWeeks, setAlertWeeks] = useState(4)
  const [coachStop, setCoachStop] = useState(true)
  const [askedMarko, setAskedMarko] = useState(false)
  const [turnedOff, setTurnedOff] = useState(false)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const rows = [
    { team: 'U13 Chris', addon: 'Live game help', used: 7, of: 8, lastUsed: 'Sat 30 May', month: '$15', action: null, bar: 7/8 },
    { team: 'U15 Girls Bec', addon: 'Live game help', used: 8, of: 8, lastUsed: 'Sat 30 May', month: '$15', action: null, bar: 8/8 },
    { team: 'U16 Ollie', addon: 'Live game help', used: 6, of: 8, lastUsed: 'Sat 30 May', month: '$15', action: null, bar: 6/8 },
    { team: "Men's 1sts", addon: 'Live game help', used: 2, of: 8, lastUsed: 'Sat 2 May', month: '$15', action: 'Ask Marko', bar: 2/8, warn: true },
    { team: 'U12 Sam', addon: 'Vests and load', used: 15, of: 16, lastUsed: 'Tue 2 June', month: '$10', action: null, bar: 15/16 },
    { team: 'U13 Chris', addon: 'Vests and load', used: 13, of: 16, lastUsed: 'Tue 2 June', month: '$10', action: null, bar: 13/16 },
    { team: 'U15 Girls Bec', addon: 'Vests and load', used: 0, of: 16, lastUsed: 'Thu 30 April', month: '$10', action: 'Turn off', bar: 0, warn: true, noUse: '5 weeks' },
    { team: 'U16 Ollie', addon: 'Vests and load', used: 11, of: 16, lastUsed: 'Tue 2 June', month: '$10', action: null, bar: 11/16 },
    { team: 'U16 Ollie', addon: 'Extra space', used: 4.6, of: 20, lastUsed: 'Today', month: '$4', action: null, bar: 4.6/20, isGb: true },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Club' ? 700 : 500, color: t === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
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

      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '24px 24px 24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Is it being used?</div>
              <div style={{ fontSize: 13, color: MUT }}>June 2026 · every add-on, team by team, over the last 8 weeks</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
              <button onClick={() => onBill?.()} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>This month's bill</button>
              <button onClick={() => onFeatures?.()} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${G}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Features by team</button>
            </div>
          </div>

          {/* Table */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 140px 1fr 120px 80px 100px', padding: '10px 20px', borderBottom: `1px solid ${LN}`, background: '#f7f8f7' }}>
              {['Team', 'Add-on', 'Used', 'Last used', 'Month', ''].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>{h}</div>
              ))}
            </div>
            {rows.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 140px 1fr 120px 80px 100px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center', background: r.warn ? '#fffbf0' : '#fff' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.team}</div>
                <div style={{ fontSize: 13, color: MUT }}>{r.addon}</div>
                <div>
                  {r.noUse
                    ? <div style={{ fontSize: 12, color: '#c05' }}>Not used for {r.noUse}</div>
                    : <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: LN, borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${r.bar * 100}%`, background: r.warn ? '#f59e0b' : G, borderRadius: 999 }} />
                        </div>
                        <div style={{ fontSize: 12, color: INK, whiteSpace: 'nowrap' }}>{r.isGb ? `${r.used} of ${r.of} GB extra used` : `${r.used} of ${r.of} games`}</div>
                      </div>
                  }
                </div>
                <div style={{ fontSize: 12, color: MUT }}>{r.lastUsed}</div>
                <div style={{ fontSize: 13, color: INK }}>{r.month}</div>
                <div>
                  {r.action === 'Turn off' && !turnedOff && (
                    <button onClick={() => setTurnedOff(true)} style={{ height: 32, padding: '0 14px', borderRadius: 999, background: '#fef2f2', color: '#c05', border: '1.5px solid #f9a8a8', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Turn off</button>
                  )}
                  {r.action === 'Turn off' && turnedOff && (
                    <div style={{ fontSize: 12, color: MUT }}>Turned off ✓</div>
                  )}
                  {r.action === 'Ask Marko' && !askedMarko && (
                    <button onClick={() => setAskedMarko(true)} style={{ height: 32, padding: '0 14px', borderRadius: 999, background: '#fff', color: G, border: `1.5px solid ${G}`, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Marko</button>
                  )}
                  {r.action === 'Ask Marko' && askedMarko && (
                    <div style={{ fontSize: 12, color: G, fontWeight: 600 }}>Note sent ✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: MUT }}>"Used" means a coach opened it during a game or session. Prices are placeholders.</div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `2px solid #f59e0b`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>You could save</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: INK }}>$10 a month</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>One add-on has not been used for 5 weeks. One more is used in a quarter of games.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 14 }}>Tell me when</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 4 }}>An add-on is unused for</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, fontSize: 12, color: MUT }}>A note in your Needs you</div>
                <select value={alertWeeks} onChange={e => setAlertWeeks(Number(e.target.value))} style={{ height: 32, padding: '0 8px', borderRadius: 8, border: `1.5px solid ${LN}`, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>
                  {[2, 3, 4, 6, 8].map(w => <option key={w} value={w}>{w} weeks</option>)}
                </select>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>A coach stops using one</div>
                  <div style={{ fontSize: 12, color: MUT }}>So you can ask why</div>
                </div>
                <div onClick={() => setCoachStop(!coachStop)} style={{ width: 40, height: 24, borderRadius: 999, background: coachStop ? G : '#c8d4d0', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: 2, left: coachStop ? 18 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.15s' }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>What coaches see</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6 }}>Nothing here. A coach is never shown as "not using" something to anyone but you.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
