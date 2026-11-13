import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const PLAYERS = ['Ruby Lane', 'Isla Chen', 'Mia Tran', 'Grace Reid', 'Zoe Park', 'Finn Walsh', 'Noah Okafor', 'Leo Costa', 'Ava Walsh']
const GAMES = ['G1 · 13 Dec', 'G2 · 13 Dec', 'G3 · 13 Dec', 'G4 · 13 Dec']

type ViewType = 'table' | 'lineup'
type PanelTab = 'Checks' | 'Comments' | 'Data'

export default function FIL2Sheet({ onBack, onShare, onNav }: {
  onBack?: () => void
  onShare?: () => void
  onNav?: (s: string) => void
}) {
  const [view, setView] = useState<ViewType>('table')
  const [panelTab, setPanelTab] = useState<PanelTab>('Checks')
  const [activeTab, setActiveTab] = useState('Team sheets')
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

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

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }} data-lasttool={lastTool}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {[
          { label: 'Home', target: 'PH1-HomeJuniorsSame' },
          { label: 'Squad', target: 'PH1-HomeJuniorsSame' },
          { label: 'Training', target: 'PH1-HomeJuniorsSame' },
          { label: 'Match day', target: 'PH1-HomeJuniorsSame' },
          { label: 'Clips', target: 'PH1-HomeJuniorsSame' },
          { label: 'Record', target: 'REC1-RecordHub' },
        ].map(({ label, target }) => (
          <div key={label} onClick={() => onNav?.(target)} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{label}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </div>
          <div onClick={() => onNav?.('PH1-HomeJuniorsSame')} style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer' }}>U12 Sam</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center', flexShrink: 0 }}>
        {[
          { label: 'Overview', target: 'PH1-HomeJuniorsSame' },
          { label: 'Messages', target: 'PH1-HomeJuniorsSame' },
          { label: 'Calendar', target: 'PH1-HomeJuniorsSame' },
          { label: 'Fixtures and results', target: 'PH1-HomeJuniorsSame' },
          { label: 'Our style', target: 'PH1-HomeJuniorsSame' },
          { label: "Where we're at", target: 'WA1-WhereWeAt' },
          { label: 'Team staff', target: 'PH1-HomeJuniorsSame' },
          { label: 'Files', target: 'FIL1-Files' },
        ].map(({ label, target }) => (
          <div key={label} onClick={() => onNav?.(target)} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: label === 'Files' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: label === 'Files' ? 700 : 500, color: label === 'Files' ? G : MUT, cursor: 'pointer' }}>{label}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>

      {/* Sheet toolbar */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 16px', display: 'flex', gap: 4, height: 44, alignItems: 'center', flexShrink: 0 }}>
        <button onClick={() => onBack?.()} style={{ fontSize: 13, color: MUT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '0 8px', whiteSpace: 'nowrap' }}>Back to Files</button>
        <div style={{ width: 1, height: 24, background: LN, flexShrink: 0 }} />
        {['History', 'Download', 'Undo', 'Redo', 'Choice', 'B', 'Fill colour', 'Align', 'Filter', 'Sort', 'Comment', '+ Column', 'From Clean Sheet', 'Print'].map(b => (
          <button key={b} onClick={() => tool(b)} style={{ height: 28, padding: '0 8px', borderRadius: 6, border: `1px solid ${LN}`, background: lastTool === b ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === b ? G : INK, whiteSpace: 'nowrap', flexShrink: 0 }}>{b}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <div style={{ display: 'flex', border: `1.5px solid ${LN}`, borderRadius: 999, overflow: 'hidden' }}>
            <button onClick={() => { setView('table'); tool('Table') }} style={{ height: 30, padding: '0 12px', background: view === 'table' ? PALE : '#fff', border: 'none', fontSize: 12, color: view === 'table' ? G : INK, fontWeight: view === 'table' ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>Table</button>
            <button onClick={() => { setView('lineup'); tool('Line-up') }} style={{ height: 30, padding: '0 12px', background: view === 'lineup' ? PALE : '#fff', border: 'none', fontSize: 12, color: view === 'lineup' ? G : INK, fontWeight: view === 'lineup' ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>Line-up</button>
          </div>
          <button onClick={() => onShare?.()} style={{ height: 30, padding: '0 12px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
        </div>
      </div>

      {/* Checks panel */}
      <div style={{ background: '#fffbeb', borderBottom: `1px solid #fde68a`, padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div style={{ fontSize: 13, color: '#92400e' }}><strong>Check:</strong> Ruby Lane plays all four games (60 min each). The spread is wider than the template allows.</div>
        <button onClick={() => tool('Swap for me')} style={{ marginLeft: 'auto', height: 30, padding: '0 14px', borderRadius: 999, background: '#f59e0b', color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Swap for me</button>
        <button onClick={() => tool('Leave it')} style={{ height: 30, padding: '0 14px', borderRadius: 999, background: '#fff', color: '#92400e', border: '1.5px solid #fde68a', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Leave it</button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Main grid / lineup */}
        <div style={{ flex: 1, padding: '16px 24px', overflowX: 'auto', overflowY: 'auto' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 12 }}>Summer sevens · team sheets</div>

          {view === 'table' && (
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', display: 'inline-block', minWidth: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: `180px repeat(${GAMES.length}, 110px) 90px`, borderBottom: `1px solid ${LN}`, background: '#f7f8f7' }}>
                <div style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>Player</div>
                {GAMES.map(g => (
                  <div key={g} style={{ padding: '10px 12px', fontSize: 11, fontWeight: 700, color: MUT, borderLeft: `1px solid ${LN}` }}>{g}</div>
                ))}
                <div style={{ padding: '10px 12px', fontSize: 11, fontWeight: 700, color: MUT, borderLeft: `1px solid ${LN}` }}>Total min</div>
              </div>
              {PLAYERS.map((p, ri) => {
                const row = mins[p] || [45, 45, 45, 45]
                const total = row.reduce((a, b) => a + b, 0)
                const isRuby = p === 'Ruby Lane'
                return (
                  <div key={p} style={{ display: 'grid', gridTemplateColumns: `180px repeat(${GAMES.length}, 110px) 90px`, borderBottom: `1px solid ${LN}`, background: ri % 2 === 0 ? '#fff' : '#fafafa' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: `180px repeat(${GAMES.length}, 110px) 90px`, borderTop: `2px solid ${LN}`, background: '#f7f8f7' }}>
                <div style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: MUT }}>Totals</div>
                {GAMES.map((_, ci) => (
                  <div key={ci} style={{ padding: '10px 12px', fontSize: 12, fontWeight: 700, color: INK, borderLeft: `1px solid ${LN}` }}>
                    {PLAYERS.reduce((s, p) => s + (mins[p]?.[ci] ?? 45), 0)} min
                  </div>
                ))}
                <div style={{ padding: '10px 12px', borderLeft: `1px solid ${LN}` }} />
              </div>
            </div>
          )}

          {view === 'lineup' && (
            <div style={{ background: '#3a7a52', borderRadius: 12, padding: 24, maxWidth: 500, color: '#fff', textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Line-up view · G1 · 13 Dec</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                {PLAYERS.map(p => (
                  <div key={p} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 600 }}>{p.split(' ')[0]}</div>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div style={{ marginTop: 12, display: 'flex', gap: 2 }}>
            {['Team sheets', 'Contacts', 'Kit sizes'].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ height: 32, padding: '0 14px', borderRadius: '8px 8px 0 0', border: `1.5px solid ${LN}`, borderBottom: activeTab === t ? '1.5px solid #fff' : `1.5px solid ${LN}`, background: activeTab === t ? '#fff' : '#f7f8f7', fontSize: 12, color: activeTab === t ? INK : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
            ))}
            <button onClick={() => tool('+ Sheet')} style={{ height: 32, padding: '0 10px', borderRadius: '8px 8px 0 0', border: `1.5px solid ${LN}`, background: '#f7f8f7', fontSize: 12, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>+ Sheet</button>
          </div>
        </div>

        {/* Right panel: Checks / Comments / Data */}
        <div style={{ width: 220, borderLeft: `1px solid ${LN}`, background: '#fff', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${LN}` }}>
            {(['Checks', 'Comments', 'Data'] as PanelTab[]).map(t => (
              <button key={t} onClick={() => setPanelTab(t)} style={{ flex: 1, height: 38, background: 'none', border: 'none', borderBottom: panelTab === t ? `2px solid ${G}` : '2px solid transparent', fontSize: 11, fontWeight: panelTab === t ? 700 : 500, color: panelTab === t ? G : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
            ))}
          </div>
          <div style={{ flex: 1, padding: 12, fontSize: 12, color: MUT }}>
            {panelTab === 'Checks' && <div>1 check: Ruby Lane over equal-time rule.</div>}
            {panelTab === 'Comments' && <div>No comments yet.</div>}
            {panelTab === 'Data' && <div>Sheet has {PLAYERS.length} players, {GAMES.length} games.</div>}
          </div>
        </div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
