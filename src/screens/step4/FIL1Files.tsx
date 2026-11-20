import { useState } from 'react'
import { OpeningPanel, INK, MUT, HAIR, CTL, GREEN, PALEGREEN } from './directorParts'
import FileEditor, { type FileContent } from './FileEditor'

type CreatedFile = { id: string; name: string; type: 'doc' | 'sheet'; content: FileContent; shared?: string }
type Editing = { type: 'doc' | 'sheet'; name?: string; content?: FileContent; id?: string }

const GD = '#1f4a3e'

// "With families this week" — three shared files with an opened-by bar.
const SHARED = [
  { name: 'Saturday v Harbour Rovers · where and when', kind: 'Doc', when: 'Changed yesterday', opened: 12, of: 17, target: 'FIL3-Doc' },
  { name: 'Summer sevens · team sheets', kind: 'Sheet', when: 'Changed today', opened: 9, of: 17, target: 'FIL2-Sheet' },
  { name: 'Lifts and jobs for the sevens', kind: 'Sign-up sheet', when: 'Closes Thu 11 Dec', opened: 11, of: 17, target: 'FIL6-SignUp' },
]
const OTHERS = [
  { name: 'Canteen and kit roster, term 2', sub: 'Sheet · Rob can edit · Coaching team · 2 June', target: 'FIL2-Sheet' },
  { name: 'Season letter to families', sub: 'Doc · U12 Sam families · 12 May', target: 'FIL3-Doc' },
  { name: 'Ground map, Redgum Reserve.pdf', sub: 'Uploaded file · U12 Sam families · 3 May', target: 'FIL4-Share' },
  { name: "Coaches’ meeting notes, May", sub: 'Doc · Coaching team · 28 May', target: 'FIL3-Doc' },
]
const STARTS = [
  { label: 'Tournament team sheet', sub: 'Squad, games, turns in goal' },
  { label: 'Game day info', sub: 'Meet time, ground, what to bring' },
  { label: 'Duty roster', sub: 'Canteen, kit, oranges' },
  { label: 'Letter to families', sub: 'Your words, club header' },
]

export default function FIL1Files({ onOpenSheet, onOpenDoc, onNav, bare }: { onOpenSheet?: () => void; onOpenDoc?: () => void; onNav?: (s: string) => void; bare?: boolean }) {
  const [filter, setFilter] = useState('All 7')
  const [nudged, setNudged] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [created, setCreated] = useState<CreatedFile[]>([])
  const [editing, setEditing] = useState<Editing | null>(null)
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const go = (t: string) => { if (t === 'FIL2-Sheet' && onOpenSheet) onOpenSheet(); else if (t === 'FIL3-Doc' && onOpenDoc) onOpenDoc(); else onNav?.(t) }
  function saveFile(name: string, content: FileContent) {
    if (editing?.id) setCreated(prev => prev.map(f => f.id === editing.id ? { ...f, name, content } : f))
    else setCreated(prev => [{ id: `c-${prev.length + 1}`, name, type: content.kind, content }, ...prev])
    setEditing(null)
  }
  function shareFile(name: string, content: FileContent, audience: string) {
    if (editing?.id) setCreated(prev => prev.map(f => f.id === editing.id ? { ...f, name, content, shared: audience } : f))
    else setCreated(prev => [{ id: `c-${prev.length + 1}`, name, type: content.kind, content, shared: audience }, ...prev])
    setEditing(null)
    say(`“${name}” shared with ${audience}.`)
  }

  return (
    <div data-lasttool="" style={{ width: bare ? '100%' : 1180, height: bare ? '100%' : 820, flex: bare ? 1 : undefined, minHeight: bare ? 0 : undefined, overflow: 'hidden', background: '#faf5ec', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', boxSizing: 'border-box' }}>
      {!bare && (<>
      {/* Top nav (coach frame) */}
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 56, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 8 }}>Clean Sheet</div>
        {[['Home', 'T1-TabletTraining'], ['Squad', 'T4-SquadTab'], ['Training', 'T3-TrainingTab'], ['Match day', 'T2-TabletMatch'], ['Clips', 'C1-ClipsTab'], ['Record', 'REC1-RecordHub']].map(([l, t]) => (
          <button key={l} onClick={() => onNav?.(t)} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: 'inherit', padding: '0 4px' }}>{l}</button>
        ))}
        <button onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 999, height: 36, padding: '0 12px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button onClick={() => onNav?.('VS1-SwitchView')} style={{ height: 40, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>U12 Sam ▾</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
      </div>
      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${HAIR}`, padding: '0 28px', display: 'flex', gap: 22, height: 44, alignItems: 'center', flexShrink: 0 }}>
        {[['Overview', 'PH1-HomeJuniorsSame'], ['Messages', 'I1-Inbox'], ['Calendar', 'CF1-Fixtures'], ['Fixtures and results', 'CF1-Fixtures'], ['Our style', 'S1-PlayingStyle'], ["Where we’re at", 'WA1-WhereWeAt'], ['Team staff', 'ST1-TeamStaff'], ['Files', 'FIL1-Files']].map(([l, t]) => (
          <button key={l} onClick={() => onNav?.(t)} style={{ height: 44, background: 'none', border: 'none', borderBottom: l === 'Files' ? `2.5px solid ${GREEN}` : '2px solid transparent', fontSize: 13, fontWeight: l === 'Files' ? 700 : 600, color: l === 'Files' ? GREEN : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
        ))}
      </div>
      </>)}

      {editing ? (
        <FileEditor type={editing.type} initialName={editing.name} initialContent={editing.content} audiences={['U12 Sam families', 'Coaching team only', 'Just me']} onBack={() => setEditing(null)} onSave={saveFile} onShare={shareFile} />
      ) : (
      <>
      <OpeningPanel
        landing
        heading="FILES · U12 SAM"
        sentence="Saturday’s game day note has reached 12 of your 17 families. Five have not opened it."
        support="The summer sevens team sheet is at 9 of 17. Everything else is up to date."
        figures={[{ num: '12 of 17', label: 'opened Saturday’s note', proof: true }, { num: '7', label: 'files for this team' }]}
        buttons={[{ label: nudged ? '✓ Five nudged' : 'Nudge the five', main: true, onClick: () => { setNudged(true); say('A reminder goes to the 5 families who have not opened Saturday’s note.') } }, { label: 'Open the note', onClick: () => go('FIL3-Doc') }]}
      />

      {/* Filter row */}
      <div style={{ flex: 'none', padding: '12px 28px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${CTL}`, background: '#fff', fontSize: 13, color: MUT }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>Search 7 files
        </div>
        {['All 7', 'With families 5', 'Coaches only 2'].map(f => (
          <button key={f} onClick={() => { setFilter(f); say(f === 'All 7' ? 'All files.' : f === 'With families 5' ? 'Files shared with families.' : 'Files only the coaching team can see.') }} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${filter === f ? GREEN : CTL}`, background: filter === f ? PALEGREEN : '#fff', fontSize: 13, fontWeight: filter === f ? 700 : 500, color: filter === f ? GREEN : INK, cursor: 'pointer', fontFamily: 'inherit' }}>{f}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={() => setEditing({ type: 'doc' })} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${CTL}`, background: '#fff', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>+ New doc</button>
        <button onClick={() => setEditing({ type: 'sheet' })} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: GREEN, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ New sheet</button>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 300px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#7a4b5b' }}>With families this week</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {SHARED.map(f => (
              <button key={f.name} onClick={() => go(f.target)} style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 14, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: MUT }}>{f.kind} · {f.when}</span>
                <strong style={{ fontSize: 14, lineHeight: '19px', color: INK }}>{f.name}</strong>
                <span style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: HAIR, marginTop: 'auto' }}><span style={{ width: `${(f.opened / f.of) * 100}%`, background: GREEN }} /></span>
                <span style={{ fontSize: 12, color: MUT }}>{f.opened} of {f.of} families have opened it</span>
              </button>
            ))}
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#7a4b5b', marginTop: 4 }}>Everything else</span>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 14, overflow: 'hidden' }}>
            {created.map((f, i) => (
              <button key={f.id} onClick={() => setEditing({ type: f.type, name: f.name, content: f.content, id: f.id })} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, padding: '0 16px', borderTop: i ? `1px solid ${HAIR}` : 'none', background: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: PALEGREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></span>
                <span style={{ flex: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: INK }}>{f.name}</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>{f.type === 'sheet' ? 'Sheet' : 'Doc'} · {f.shared ? `Shared with ${f.shared}` : 'Only you · Just now'}</span></span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            ))}
            {OTHERS.map((f, i) => (
              <button key={f.name} onClick={() => go(f.target)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, padding: '0 16px', borderTop: (i || created.length) ? `1px solid ${HAIR}` : 'none', background: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: PALEGREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></span>
                <span style={{ flex: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: INK }}>{f.name}</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>{f.sub}</span></span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            ))}
          </div>
          <span style={{ fontSize: 12, color: MUT }}>Files with players’ names never go by open link.</span>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>Start from</h2>
            {STARTS.map((t, i) => (
              <button key={t.label} onClick={() => say(`${t.label}: a new file opens, already filled from your squad and fixtures.`)} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderTop: i ? `1px solid ${HAIR}` : 'none', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <span style={{ width: 28, height: 28, borderRadius: 6, background: PALEGREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="3" x2="9" y2="21" /></svg></span>
                <span style={{ flex: 1 }}><span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: INK }}>{t.label}</span><span style={{ display: 'block', fontSize: 11, color: MUT }}>{t.sub}</span></span>
              </button>
            ))}
            <button onClick={() => say('Pick a file from this tablet. PDF, Word, Excel, pictures.')} style={{ marginTop: 8, height: 44, borderRadius: 10, border: `1px solid ${CTL}`, background: '#fff', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Upload a file</button>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Space</div>
            <div style={{ height: 6, background: HAIR, borderRadius: 999, overflow: 'hidden', marginBottom: 6 }}><div style={{ height: '100%', width: '24%', background: GREEN, borderRadius: 999 }} /></div>
            <div style={{ fontSize: 12, color: MUT }}>1.2 of 5 GB used · video is kept with Clips</div>
          </div>
          <button onClick={() => go('FIL4-Share')} style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', color: INK, textAlign: 'left' }}>
            <span style={{ flex: 1 }}><span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>Who can see what</span><span style={{ display: 'block', fontSize: 13, color: MUT }}>Files with players’ names never go by open link</span></span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </aside>
      </main>
      </>
      )}
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 620, zIndex: 60, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    </div>
  )
}
