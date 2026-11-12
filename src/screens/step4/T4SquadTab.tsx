import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Players', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy']

const GROUPS = [
  { title: 'Keepers', players: [{ ini: 'AL', name: 'Ava L.', flag: 'Short on sleep', dot: '#40826d', metric: '3.3' }, { ini: 'TR', name: 'Tom R.', flag: 'Wrist check', dot: '#40826d', metric: '4.0' }] },
  { title: 'Defenders', players: [{ ini: 'LM', name: 'Leo M.', flag: 'Back-post runner', dot: '#40826d', metric: '4.3' }, { ini: 'GO', name: 'Grace O.', flag: '', dot: '#40826d', metric: '4.0' }, { ini: 'KR', name: 'Kai R.', flag: '', dot: '#40826d', metric: '3.8' }, { ini: 'SD', name: 'Sam D.', flag: 'No check-in', dot: '#40826d', metric: '—' }, { ini: 'RC', name: 'Ruby C.', flag: '', dot: '#40826d', metric: '4.3' }] },
  { title: 'Midfielders', players: [{ ini: 'MT', name: 'Mia T.', flag: 'High load', dot: '#9d7c80', metric: '3.3' }, { ini: 'JP', name: 'Jai P.', flag: 'Extra mins', dot: '#9d7c80', metric: '3.8' }, { ini: 'EB', name: 'Ella B.', flag: 'Low wellness', dot: '#c39797', metric: '2.3' }, { ini: 'IM', name: 'Isla M.', flag: '', dot: '#40826d', metric: '4.5' }, { ini: 'OB', name: 'Oscar B.', flag: 'Set a goal', dot: '#40826d', metric: '4.0' }] },
  { title: 'Forwards', players: [{ ini: 'NO', name: 'Noah O.', flag: 'Growth spurt', dot: '#9d7c80', metric: '3.8' }, { ini: 'ZH', name: 'Zoe H.', flag: 'Growth spurt', dot: '#9d7c80', metric: '—' }, { ini: 'FW', name: 'Finn W.', flag: '', dot: '#40826d', metric: '4.3' }, { ini: 'LN', name: 'Lily N.', flag: 'Set a goal', dot: '#40826d', metric: '4.0' }] },
]

export default function T4SquadTab(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Squad' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Squad' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button onClick={() => st('Opening team selector.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Players' ? INK : MUT, borderBottom: `3px solid ${n === 'Players' ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
        </div>
      </div>

      <div style={{ flex: 'none', padding: '12px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Squad</div>
          <div style={{ fontSize: 14, color: MUT }}>16 players · Thursday 4 Jun · 2 days to Harbour Rovers</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => st('Opening message to all parents.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>Message parents</button>
          <button onClick={() => st('Opening add player.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>+ Add player</button>
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {GROUPS.map(g => (
              <div key={g.title} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ padding: '5px 8px', borderRadius: 8, background: '#e9eae8', display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>
                  <span>{g.title}</span><span>{g.players.length}</span>
                </div>
                {g.players.map(p => (
                  <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 6, minHeight: 44, padding: '4px 6px', borderRadius: 10, border: `2px solid ${p.ini === 'EB' ? G : 'transparent'}`, background: p.ini === 'EB' ? '#f7f8f7' : '#fff', cursor: 'pointer' }}>
                    <div style={{ position: 'relative', width: 28, height: 28, flex: 'none' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#c39797', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{p.ini}</div>
                      <div style={{ position: 'absolute', right: -1, bottom: -1, width: 10, height: 10, borderRadius: '50%', border: '1.5px solid #fff', background: p.dot }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: MUT, whiteSpace: 'nowrap' as const }}>{p.flag || 'Ready'}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{p.metric}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Development goals</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>11 of 16 on track</div>
              <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', gap: 2, margin: '8px 0' }}>
                <div style={{ background: '#c39797' }} /><div style={{ flex: 3, background: '#cbbeb5' }} />
              </div>
              <div style={{ fontSize: 13, color: MUT }}>2 need work · 3 to set</div>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Wellness this week</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>3.8 / 5</div>
              <div style={{ fontSize: 13, color: G, marginTop: 4 }}>Up from 3.6</div>
              <div style={{ fontSize: 13, color: MUT }}>11 of 16 checked in today</div>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Load this week</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>3 above usual</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const, marginTop: 6 }}>
                {['Mia', 'Noah', 'Zoe'].map(n => <div key={n} style={{ fontSize: 11, fontWeight: 700, background: '#cbbeb5', borderRadius: 999, padding: '1px 7px' }}>{n}</div>)}
              </div>
              <div style={{ fontSize: 13, color: MUT, marginTop: 4 }}>Team load 118% of plan</div>
            </div>
          </div>
        </div>

        <aside style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#c39797', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 17, flex: 'none' }}>EB</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Ella Brandt</div>
              <div style={{ fontSize: 13, color: MUT }}>Holding midfield</div>
            </div>
          </div>
          <div style={{ background: '#c39797', borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Check in · Low wellness</div>
            <div style={{ fontSize: 13 }}>Quick chat before warm-up. Keep it light if she wants.</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[['Wellness', '2.3', '#c05'], ['Load', '92%', INK], ['Minutes', '250', INK]].map(([label, val, color]) => (
              <div key={label} style={{ background: '#f7f8f7', borderRadius: 10, padding: '8px 10px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: color as string }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${LN}`, paddingTop: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Development goal</div>
              <div style={{ fontSize: 11, fontWeight: 700, background: G, color: '#fff', borderRadius: 999, padding: '1px 8px' }}>On track</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Drive forward with the ball</div>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1, 2, 3, 4, 5, 6].map(k => <div key={k} style={{ flex: 1, height: 8, borderRadius: 2, background: k <= 3 ? '#40826d' : '#e9eae8' }} />)}
            </div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Carried the ball 30 m or more 5 times on Saturday.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <button onClick={() => st("Opening Ella's full profile.")} style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Full profile</button>
            <button onClick={() => st("Opening message to Ella's parent.")} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Message parent</button>
          </div>
        </aside>
      </main>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
