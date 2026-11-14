import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function DF4OwnDraw(_: { onBack?: () => void }) {
  const [drawMode, setDrawMode] = useState<'player' | 'opp' | 'cone' | 'ball' | 'pass' | 'run'>('player')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const TOOLS = [{ id: 'player', label: 'Our player', color: GD }, { id: 'opp', label: 'Opponent', color: '#7c3030' }, { id: 'cone', label: 'Cone', color: '#c0a040' }, { id: 'ball', label: 'Ball', color: '#a06020' }, { id: 'pass', label: 'Pass', color: GD }, { id: 'run', label: 'Run', color: '#808080' }]
  const SOURCES = [{ label: 'Draw it', active: true }, { label: 'From our clips', active: false }, { label: 'Upload a video', active: false }, { label: 'Photo of a whiteboard', active: false }]
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 'none', background: GD, height: 56, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Clean Sheet</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginLeft: 8 }}>Add your own drill</span>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={() => st('Cancelled.')} style={{ height: 44, padding: '0 16px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr 260px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Step 2 of 4 · Show it</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>Show the players how it works</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {SOURCES.map(s => <button key={s.label} onClick={() => s.active ? null : st(`Switching to ${s.label}.`)} style={{ height: 44, padding: '0 14px', borderRadius: 999, background: s.active ? G : '#fff', color: s.active ? '#fff' : MUT, border: `1px solid ${s.active ? G : LN}`, fontSize: 13, fontWeight: s.active ? 700 : 500, cursor: 'pointer' }}>{s.label}</button>)}
          </div>
          <div style={{ background: '#e8ede9', borderRadius: 16, flexGrow: 1, minHeight: 300, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: MUT, fontSize: 14 }}>Tap the pitch to add: <strong style={{ color: INK }}>{TOOLS.find(t => t.id === drawMode)?.label}</strong>. Hold anything to move or delete it.</div>
            {/* Simple pitch markings */}
            <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, border: '2px solid rgba(255,255,255,0.6)', borderRadius: 4 }} />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            {TOOLS.map(t => <button key={t.id} onClick={() => setDrawMode(t.id as typeof drawMode)} style={{ height: 44, padding: '0 14px', borderRadius: 10, background: drawMode === t.id ? t.color : '#fff', color: drawMode === t.id ? '#fff' : MUT, border: `1.5px solid ${drawMode === t.id ? t.color : LN}`, fontSize: 13, fontWeight: drawMode === t.id ? 700 : 500, cursor: 'pointer' }}>{t.label}</button>)}
            <button onClick={() => st('Undone.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, background: '#fff', color: MUT, border: `1.5px solid ${LN}`, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Undo</button>
            <button onClick={() => st('Cleared.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, background: '#fff', color: MUT, border: `1.5px solid ${LN}`, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Clear</button>
          </div>
        </div>
        <div style={{ background: PALE, borderRadius: 14, padding: '14px', fontSize: 13, color: MUT, lineHeight: 1.6, alignSelf: 'flex-start' as const, marginTop: 60 }}>
          Players see this on the tablet before the drill starts.
        </div>
      </main>
      <div style={{ flex: 'none', padding: '14px 28px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button onClick={() => st('Going back.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: MUT, cursor: 'pointer' }}>Back</button>
        <button onClick={() => st('Moving to Step 3.')} style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: GD, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Next</button>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
