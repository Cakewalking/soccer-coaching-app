import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Position = { name: string; x: number; y: number; mins: number; alert?: boolean }

const PLAYERS: Position[] = [
  { name: 'Harper', x: 50, y: 10, mins: 60 },
  { name: 'Jake', x: 20, y: 30, mins: 60 },
  { name: 'Priya', x: 40, y: 30, mins: 60 },
  { name: 'Liam', x: 60, y: 30, mins: 60 },
  { name: 'Zoe', x: 80, y: 30, mins: 60 },
  { name: 'Noah', x: 30, y: 52, mins: 50 },
  { name: 'Ruby', x: 50, y: 52, mins: 60, alert: true },
  { name: 'Kai', x: 70, y: 52, mins: 55 },
  { name: 'Mia', x: 35, y: 72, mins: 45 },
  { name: 'Leo', x: 50, y: 72, mins: 60 },
  { name: 'Ava', x: 65, y: 72, mins: 50 },
]

export default function FIL2bSheetLineup({ onBack, onShare, onNav }: {
  onBack?: () => void
  onShare?: () => void
  onNav?: (s: string) => void
}) {
  const [gameIdx, setGameIdx] = useState(0)
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

  const games = ['Game 1 · 11 Oct', 'Game 2 · 18 Oct', 'Game 3 · Northgate', 'Game 4 · 1 Nov']

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
          <div key={label} onClick={() => { tool(label); onNav?.(target) }} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, padding: '0 10px', display: 'flex', alignItems: 'center' }}>{label}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </div>
          <div onClick={() => onNav?.('PH1-HomeJuniorsSame')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer' }}>U12 Sam</div>
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
          <div key={label} onClick={() => onNav?.(target)} style={{ height: 44, minWidth: 44, display: 'flex', alignItems: 'center', borderBottom: label === 'Files' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: label === 'Files' ? 700 : 500, color: label === 'Files' ? G : MUT, cursor: 'pointer' }}>{label}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>

      {/* File toolbar */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 16px', display: 'flex', gap: 6, height: 44, alignItems: 'center', flexShrink: 0 }}>
        <button onClick={() => onBack?.()} style={{ fontSize: 13, color: MUT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '0 8px', whiteSpace: 'nowrap', minHeight: 44, display: 'flex', alignItems: 'center' }}>Back to Files</button>
        <div style={{ width: 1, height: 24, background: LN, flexShrink: 0 }} />
        {['History', 'Download'].map(b => (
          <button key={b} onClick={() => tool(b)} style={{ minHeight: 44, padding: '0 10px', borderRadius: 6, border: `1px solid ${LN}`, background: lastTool === b ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === b ? G : INK }}>{b}</button>
        ))}
        <div style={{ width: 1, height: 24, background: LN, flexShrink: 0 }} />
        <button onClick={() => tool('Shape: 2-3-1')} style={{ minHeight: 44, padding: '0 10px', borderRadius: 6, border: `1px solid ${lastTool === 'Shape: 2-3-1' ? G : LN}`, background: lastTool === 'Shape: 2-3-1' ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === 'Shape: 2-3-1' ? G : INK }}>Shape: 2-3-1</button>
        <button onClick={() => tool('Print')} style={{ minHeight: 44, padding: '0 10px', borderRadius: 6, border: `1px solid ${LN}`, background: lastTool === 'Print' ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === 'Print' ? G : INK }}>Print</button>
        <div style={{ width: 1, height: 24, background: LN, flexShrink: 0 }} />
        <button onClick={() => tool('Swap for me')} style={{ minHeight: 44, padding: '0 10px', borderRadius: 6, border: `1px solid ${LN}`, background: lastTool === 'Swap for me' ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === 'Swap for me' ? G : INK }}>Swap for me</button>
        <div style={{ display: 'flex', border: `1.5px solid ${LN}`, borderRadius: 999, overflow: 'hidden', marginLeft: 4 }}>
          <button onClick={() => onNav?.('FIL2-Sheet')} style={{ minHeight: 44, padding: '0 12px', background: '#fff', border: 'none', fontSize: 12, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Table</button>
          <button onClick={() => tool('Line-up')} style={{ minHeight: 44, padding: '0 12px', background: G, border: 'none', fontSize: 12, color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Line-up</button>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button onClick={() => onNav?.('FIL2-Sheet')} style={{ minHeight: 44, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: MUT }}>Back to the table</button>
          <button onClick={() => onShare?.()} style={{ minHeight: 44, padding: '0 12px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
        </div>
      </div>

      {/* Game tabs */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 4, height: 40, alignItems: 'center' }}>
        {games.map((g, i) => (
          <button key={g} onClick={() => { setGameIdx(i); tool(g) }} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${gameIdx === i ? G : LN}`, background: gameIdx === i ? PALE : '#fff', fontSize: 12, color: gameIdx === i ? G : MUT, fontWeight: gameIdx === i ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{g}</button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, color: MUT }}>7-a-side · 60 min · equal time U12</div>
      </div>

      {/* Sheet metadata */}
      <div style={{ background: '#fff', padding: '4px 24px', borderBottom: `1px solid ${LN}`, flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: MUT }}>Summer sevens · team sheets</div>
        <div style={{ fontSize: 12, color: MUT }}>Sheet · the same choices as the table, drawn on a pitch</div>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 24, padding: '20px 32px' }}>
        {/* Pitch */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>Drag a player to move them. The table changes with it.</div>
          <div style={{ position: 'relative', background: '#3a7a52', borderRadius: 12, overflow: 'hidden', aspectRatio: '0.65', maxHeight: 580 }}>
            <div style={{ position: 'absolute', inset: '10%', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 4 }} />
            <div style={{ position: 'absolute', left: '30%', right: '30%', top: '50%', height: 2, background: 'rgba(255,255,255,0.3)' }} />
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: 60, height: 60, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', transform: 'translate(-50%, -50%)' }} />
            <div style={{ position: 'absolute', left: '30%', right: '30%', top: '10%', height: '12%', border: '2px solid rgba(255,255,255,0.3)' }} />
            <div style={{ position: 'absolute', left: '30%', right: '30%', bottom: '10%', height: '12%', border: '2px solid rgba(255,255,255,0.3)' }} />
            {PLAYERS.map(p => (
              <div key={p.name} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)', textAlign: 'center', cursor: 'pointer', minWidth: 44 }} onClick={() => { tool(p.name); st(`${p.name}: ${p.mins} minutes`) }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.alert ? '#c05' : G, border: `2px solid ${p.alert ? '#fca5a5' : '#fff'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', margin: '0 auto', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
                  {p.name.slice(0, 2)}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', marginTop: 2, textShadow: '0 1px 2px rgba(0,0,0,0.6)', whiteSpace: 'nowrap' }}>{p.name}</div>
                <div style={{ fontSize: 9, color: p.alert ? '#fca5a5' : 'rgba(255,255,255,0.8)' }}>{p.mins}′</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#991b1b', marginBottom: 6 }}>Check · Ruby Lane</div>
            <div style={{ fontSize: 12, color: INK, lineHeight: 1.5, marginBottom: 10 }}>Ruby plays every game. Rest her in game 3 and Zoe goes in goal?</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { tool('Swap for me'); st('Swapping Ruby in game 4.') }} style={{ flex: 1, minHeight: 44, borderRadius: 999, background: '#c05', color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Swap for me</button>
              <button onClick={() => { tool('Leave it'); st('OK, left as is.') }} style={{ flex: 1, minHeight: 44, borderRadius: 999, background: '#fff', border: `1.5px solid #fca5a5`, fontSize: 12, color: '#991b1b', cursor: 'pointer', fontFamily: 'inherit' }}>Leave it</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>This game · minutes</div>
            {PLAYERS.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                <div style={{ flex: 1, fontSize: 12, color: p.alert ? '#c05' : INK, fontWeight: p.alert ? 700 : 400 }}>{p.name}</div>
                <div style={{ background: p.mins === 60 ? '#fef2f2' : PALE, borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700, color: p.mins === 60 ? '#991b1b' : G }}>{p.mins}′</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
