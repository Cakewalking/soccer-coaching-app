import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const PLAYERS = ['Ruby Lane', 'Isla Chen', 'Mia Tran', 'Grace Reid', 'Zoe Park', 'Finn Walsh', 'Noah Okafor', 'Leo Costa', 'Ava Walsh']
const GAMES = ['G1 · 13 Dec', 'G2 · 13 Dec', 'G3 · 13 Dec', 'G4 · 13 Dec']

type ViewType = 'table' | 'lineup'

export default function FIL2Sheet({ onLineupView, onShare }: { onLineupView?: () => void; onShare?: () => void }) {
  const [view, setView] = useState<ViewType>('table')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const mins: Record<string, number[]> = {
    'Ruby Lane':   [60, 60, 60, 60],
    'Isla Chen':   [45, 45, 45, 45],
    'Mia Tran':    [45, 45, 45, 45],
    'Grace Reid':  [45, 45, 45, 45],
    'Finn Walsh':  [45, 45, 45, 45],
    'Zoe Park':    [45, 45, 45, 45],
    'Noah Okafor': [45, 45, 45, 45],
    'Leo Costa':   [45,  0, 45, 45],
    'Ava Walsh':   [ 0, 45,  0,  0],
  }

  if (view === 'lineup') {
    onLineupView?.()
    setView('table')
    return null
  }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Sheet toolbar */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 24px', display: 'flex', gap: 8, height: 44, alignItems: 'center' }}>
        <button onClick={() => st('Back to files.')} style={{ fontSize: 13, color: MUT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Files</button>
        <div style={{ width: 1, height: 24, background: LN }} />
        {['↩', '↪', 'Text ▾', 'B', '⬛', '≡', '⟨⟩', '⊞', 'Comment'].map(b => (
          <button key={b} onClick={() => st('Formatting.')} style={{ height: 28, padding: '0 10px', borderRadius: 6, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: INK }}>{b}</button>
        ))}
        <button onClick={() => st('Adding column from Clean Sheet data.')} style={{ height: 28, padding: '0 12px', borderRadius: 6, border: `1.5px solid ${G}`, background: PALE, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: G, fontWeight: 600 }}>From Clean Sheet</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {/* View switcher */}
          <div style={{ display: 'flex', border: `1.5px solid ${LN}`, borderRadius: 999, overflow: 'hidden' }}>
            {(['table', 'lineup'] as const).map(v => (
              <button key={v} onClick={() => { if (v === 'lineup') { onLineupView?.() } else setView(v) }} style={{ height: 32, padding: '0 14px', background: view === v ? PALE : '#fff', border: 'none', fontSize: 13, color: view === v ? G : INK, fontWeight: view === v ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{v}</button>
            ))}
          </div>
          <button onClick={() => onShare?.()} style={{ height: 32, padding: '0 14px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
        </div>
      </div>

      {/* Checks panel */}
      <div style={{ background: '#fffbeb', borderBottom: `1px solid #fde68a`, padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div style={{ fontSize: 13, color: '#92400e' }}><strong>Check:</strong> Ruby Lane plays all four games (60 min each). Everyone else plays 45 min. The spread is wider than the template allows.</div>
        <button onClick={() => st('Swapping Ruby Lane out of game 4.')} style={{ marginLeft: 'auto', height: 30, padding: '0 14px', borderRadius: 999, background: '#f59e0b', color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Swap for me</button>
        <button onClick={() => st('Check left as is.')} style={{ height: 30, padding: '0 14px', borderRadius: 999, background: '#fff', color: '#92400e', border: '1.5px solid #fde68a', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Leave it</button>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, padding: '24px 32px', overflowX: 'auto' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 16 }}>Summer sevens · team sheets</div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', display: 'inline-block', minWidth: '100%' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: `180px repeat(${GAMES.length}, 120px) 100px`, borderBottom: `1px solid ${LN}`, background: '#f7f8f7' }}>
            <div style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>Player</div>
            {GAMES.map(g => (
              <div key={g} style={{ padding: '10px 12px', fontSize: 11, fontWeight: 700, color: MUT, borderLeft: `1px solid ${LN}` }}>{g}</div>
            ))}
            <div style={{ padding: '10px 12px', fontSize: 11, fontWeight: 700, color: MUT, borderLeft: `1px solid ${LN}` }}>Total min</div>
          </div>

          {/* Player rows */}
          {PLAYERS.map((p, ri) => {
            const row = mins[p] || [45, 45, 45, 45]
            const total = row.reduce((a, b) => a + b, 0)
            const isRuby = p === 'Ruby Lane'
            return (
              <div key={p} style={{ display: 'grid', gridTemplateColumns: `180px repeat(${GAMES.length}, 120px) 100px`, borderBottom: `1px solid ${LN}`, background: ri % 2 === 0 ? '#fff' : '#fafafa' }}>
                <div style={{ padding: '10px 16px', fontSize: 13, color: INK, fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, marginRight: 8, flexShrink: 0 }}>{p.split(' ').map(w => w[0]).join('')}</div>
                  {p}
                </div>
                {row.map((m, ci) => (
                  <div key={ci} style={{ padding: '10px 12px', fontSize: 13, color: m === 0 ? '#aaa' : isRuby ? '#c05' : INK, borderLeft: `1px solid ${LN}`, fontWeight: isRuby ? 700 : 400 }}>
                    {m === 0 ? 'Bench' : `${m} min`}
                  </div>
                ))}
                <div style={{ padding: '10px 12px', fontSize: 13, color: isRuby ? '#c05' : INK, borderLeft: `1px solid ${LN}`, fontWeight: 700 }}>{total} min</div>
              </div>
            )
          })}

          {/* Totals row */}
          <div style={{ display: 'grid', gridTemplateColumns: `180px repeat(${GAMES.length}, 120px) 100px`, borderTop: `2px solid ${LN}`, background: '#f7f8f7' }}>
            <div style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: MUT }}>Totals</div>
            {GAMES.map((_, ci) => (
              <div key={ci} style={{ padding: '10px 12px', fontSize: 12, fontWeight: 700, color: INK, borderLeft: `1px solid ${LN}` }}>
                {PLAYERS.reduce((s, p) => s + (mins[p]?.[ci] ?? 45), 0)} min
              </div>
            ))}
            <div style={{ padding: '10px 12px', borderLeft: `1px solid ${LN}` }} />
          </div>
        </div>

        {/* Tab bar at bottom */}
        <div style={{ marginTop: 12, display: 'flex', gap: 2 }}>
          {['Team sheets', 'By position'].map((t, i) => (
            <button key={t} onClick={() => st(`Opening ${t} tab.`)} style={{ height: 32, padding: '0 16px', borderRadius: '8px 8px 0 0', border: `1.5px solid ${LN}`, borderBottom: i === 0 ? '1.5px solid #fff' : `1.5px solid ${LN}`, background: i === 0 ? '#fff' : '#f7f8f7', fontSize: 13, color: i === 0 ? INK : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
          ))}
          <button onClick={() => st('Adding a new tab.')} style={{ height: 32, padding: '0 12px', borderRadius: '8px 8px 0 0', border: `1.5px solid ${LN}`, background: '#f7f8f7', fontSize: 13, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>+ Tab</button>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
