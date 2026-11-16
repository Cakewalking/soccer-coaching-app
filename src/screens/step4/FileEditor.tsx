import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export type FileContent = { kind: 'doc'; body: string } | { kind: 'sheet'; headers: string[]; grid: string[][] }

// A genuinely blank/editable doc or sheet. Used to create a new file and to reopen a saved one.
export default function FileEditor({ type, initialName, initialContent, onBack, onSave, onShare, audiences = ['The team', 'Coaching team only', 'Just me'] }: {
  type: 'doc' | 'sheet'
  initialName?: string
  initialContent?: FileContent
  onBack: () => void
  onSave: (name: string, content: FileContent) => void
  onShare?: (name: string, content: FileContent, audience: string) => void
  audiences?: string[]
}) {
  const isNew = !initialContent
  const docInit   = initialContent?.kind === 'doc' ? initialContent.body : ''
  const sheetInit = initialContent?.kind === 'sheet' ? initialContent : null

  const [title, setTitle]     = useState(initialName ?? (type === 'sheet' ? 'Untitled sheet' : 'Untitled doc'))
  const [body, setBody]       = useState(docInit)
  const [headers, setHeaders] = useState<string[]>(sheetInit?.headers ?? ['Player', 'Game 1', 'Game 2', 'Notes'])
  const [grid, setGrid]       = useState<string[][]>(sheetInit?.grid ?? Array.from({ length: 5 }, () => ['', '', '', '']))
  const [saved, setSaved]     = useState(false)
  const [shareOpen, setShareOpen]     = useState(false)
  const [audience, setAudience]       = useState(0)
  const [access, setAccess]           = useState<'view' | 'edit'>('view')
  const [people, setPeople]           = useState<string[]>([])
  const [personInput, setPersonInput] = useState('')

  function addRow() { setGrid(g => [...g, headers.map(() => '')]); setSaved(false) }
  function addCol() { setHeaders(h => [...h, `Column ${h.length + 1}`]); setGrid(g => g.map(r => [...r, ''])); setSaved(false) }
  function setCell(r: number, c: number, v: string) { setGrid(g => g.map((row, ri) => ri === r ? row.map((cell, ci) => ci === c ? v : cell) : row)); setSaved(false) }
  function setHeader(c: number, v: string) { setHeaders(h => h.map((hh, ci) => ci === c ? v : hh)); setSaved(false) }

  const cellInput: React.CSSProperties = { width: '100%', border: 'none', background: 'transparent', fontSize: 13, color: INK, fontFamily: 'inherit', outline: 'none', padding: '8px 12px', boxSizing: 'border-box' }

  function currentName() { return title.trim() || (type === 'sheet' ? 'Untitled sheet' : 'Untitled doc') }
  function buildContent(): FileContent { return type === 'doc' ? { kind: 'doc', body } : { kind: 'sheet', headers, grid } }

  function save() { setSaved(true); onSave(currentName(), buildContent()) }

  function confirmShare() {
    const extra = people.length ? ` + ${people.length} ${people.length === 1 ? 'person' : 'people'}` : ''
    const summary = `${audiences[audience]}${extra} · can ${access}`
    setShareOpen(false)
    onShare?.(currentName(), buildContent(), summary)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f4f6f5', minHeight: 0 }}>
      {/* Toolbar */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 20px', display: 'flex', gap: 8, height: 44, alignItems: 'center', flexShrink: 0 }}>
        <button onClick={onBack} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Files
        </button>
        <div style={{ width: 1, height: 20, background: LN, flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: MUT }}>New {type} · only you can see it until you share</span>
        {type === 'sheet' && (
          <>
            <button onClick={addRow} style={{ height: 44, padding: '0 12px', marginLeft: 8, borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>+ Row</button>
            <button onClick={addCol} style={{ height: 44, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>+ Column</button>
          </>
        )}
        <button onClick={() => setShareOpen(true)} style={{ marginLeft: 'auto', height: 36, padding: '0 16px', borderRadius: 999, border: `1px solid ${G}`, background: '#fff', color: G, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
        <button onClick={save} style={{ height: 44, padding: '0 18px', borderRadius: 999, border: 'none', background: saved ? '#5a8a7a' : G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{saved ? 'Saved ✓' : isNew ? 'Create file' : 'Save'}</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: type === 'sheet' ? 820 : 680, maxWidth: '92%' }}>
          <input value={title} onChange={e => { setTitle(e.target.value); setSaved(false) }} placeholder={type === 'sheet' ? 'Untitled sheet' : 'Untitled doc'}
            style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 24, fontWeight: 800, color: INK, fontFamily: 'inherit', outline: 'none', marginBottom: 16, padding: 0 }} />

          {type === 'doc' ? (
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(16,33,31,0.07)', padding: '28px 32px', minHeight: 420 }}>
              <textarea value={body} onChange={e => { setBody(e.target.value); setSaved(false) }} placeholder="Start typing. Write a note to families, a plan for Saturday, anything."
                style={{ width: '100%', minHeight: 360, border: 'none', background: 'transparent', fontSize: 14, lineHeight: 1.7, color: INK, fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} />
            </div>
          ) : (
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, tableLayout: 'fixed' }}>
                <thead>
                  <tr style={{ background: PALE }}>
                    {headers.map((h, c) => (
                      <th key={c} style={{ borderBottom: `1px solid ${LN}`, borderRight: c < headers.length - 1 ? `1px solid ${LN}` : 'none', padding: 0 }}>
                        <input value={h} onChange={e => { setHeader(c, e.target.value); setSaved(false) }} style={{ ...cellInput, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grid.map((row, r) => (
                    <tr key={r} style={{ borderBottom: `1px solid ${LN}`, background: r % 2 === 0 ? '#fff' : '#fafafa' }}>
                      {row.map((cell, c) => (
                        <td key={c} style={{ borderRight: c < row.length - 1 ? `1px solid ${LN}` : 'none', padding: 0 }}>
                          <input value={cell} onChange={e => { setCell(r, c, e.target.value); setSaved(false) }} placeholder={r === 0 && c === 0 ? 'Type here' : ''} style={cellInput} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div style={{ fontSize: 12, color: MUT, marginTop: 12 }}>{type === 'sheet' ? 'Add rows and columns, type in any cell, then Create file.' : 'Type your document, then Create file. You choose who sees it when you share.'}</div>
        </div>
      </div>

      {shareOpen && (
        <div onClick={() => setShareOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(16,33,31,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 440, maxWidth: '92%', maxHeight: '86%', overflowY: 'auto', background: '#fff', borderRadius: 16, boxShadow: '0 12px 40px rgba(16,33,31,0.3)', padding: 24 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: INK, marginBottom: 4 }}>Share “{currentName()}”</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 18, lineHeight: 1.5 }}>Choose who gets access. Files with players’ names stay inside Clean Sheet, never an open link.</div>

            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 8 }}>Who can see it</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
              {audiences.map((a, i) => (
                <button key={a} onClick={() => setAudience(i)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${audience === i ? G : LN}`, background: audience === i ? PALE : '#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${audience === i ? G : '#c5c8c4'}`, background: audience === i ? G : '#fff', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>{a}</span>
                </button>
              ))}
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 8 }}>They can</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              {(['view', 'edit'] as const).map(lv => (
                <button key={lv} onClick={() => setAccess(lv)} style={{ flex: 1, height: 40, borderRadius: 10, border: `1.5px solid ${access === lv ? G : LN}`, background: access === lv ? PALE : '#fff', fontSize: 13, fontWeight: 700, color: access === lv ? G : INK, cursor: 'pointer', fontFamily: 'inherit' }}>{lv === 'view' ? 'View only' : 'View and edit'}</button>
              ))}
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 8 }}>Add a person</div>
            <input value={personInput} onChange={e => setPersonInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && personInput.trim()) { setPeople(p => [...p, personInput.trim()]); setPersonInput('') } }} placeholder="Type a name, press Enter"
              style={{ width: '100%', height: 40, borderRadius: 10, border: `1.5px solid ${LN}`, padding: '0 12px', fontSize: 13, color: INK, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: people.length ? 10 : 18 }} />
            {people.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                {people.map((p, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', borderRadius: 999, background: PALE, color: G, fontSize: 12, fontWeight: 600 }}>
                    {p}
                    <button onClick={() => setPeople(ps => ps.filter((_, j) => j !== i))} style={{ border: 'none', background: 'none', color: G, cursor: 'pointer', fontSize: 15, lineHeight: 1, padding: 0 }}>×</button>
                  </span>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShareOpen(false)} style={{ height: 40, padding: '0 18px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={confirmShare} style={{ height: 44, padding: '0 22px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
