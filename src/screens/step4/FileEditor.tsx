import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export type FileContent = { kind: 'doc'; body: string } | { kind: 'sheet'; headers: string[]; grid: string[][] }

// A genuinely blank/editable doc or sheet. Used to create a new file and to reopen a saved one.
export default function FileEditor({ type, initialName, initialContent, onBack, onSave }: {
  type: 'doc' | 'sheet'
  initialName?: string
  initialContent?: FileContent
  onBack: () => void
  onSave: (name: string, content: FileContent) => void
}) {
  const isNew = !initialContent
  const docInit   = initialContent?.kind === 'doc' ? initialContent.body : ''
  const sheetInit = initialContent?.kind === 'sheet' ? initialContent : null

  const [title, setTitle]     = useState(initialName ?? (type === 'sheet' ? 'Untitled sheet' : 'Untitled doc'))
  const [body, setBody]       = useState(docInit)
  const [headers, setHeaders] = useState<string[]>(sheetInit?.headers ?? ['Player', 'Game 1', 'Game 2', 'Notes'])
  const [grid, setGrid]       = useState<string[][]>(sheetInit?.grid ?? Array.from({ length: 5 }, () => ['', '', '', '']))
  const [saved, setSaved]     = useState(false)

  function addRow() { setGrid(g => [...g, headers.map(() => '')]); setSaved(false) }
  function addCol() { setHeaders(h => [...h, `Column ${h.length + 1}`]); setGrid(g => g.map(r => [...r, ''])); setSaved(false) }
  function setCell(r: number, c: number, v: string) { setGrid(g => g.map((row, ri) => ri === r ? row.map((cell, ci) => ci === c ? v : cell) : row)); setSaved(false) }
  function setHeader(c: number, v: string) { setHeaders(h => h.map((hh, ci) => ci === c ? v : hh)); setSaved(false) }

  const cellInput: React.CSSProperties = { width: '100%', border: 'none', background: 'transparent', fontSize: 13, color: INK, fontFamily: 'inherit', outline: 'none', padding: '8px 12px', boxSizing: 'border-box' }

  function save() {
    const name = title.trim() || (type === 'sheet' ? 'Untitled sheet' : 'Untitled doc')
    const content: FileContent = type === 'doc' ? { kind: 'doc', body } : { kind: 'sheet', headers, grid }
    setSaved(true)
    onSave(name, content)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f4f6f5', minHeight: 0 }}>
      {/* Toolbar */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 20px', display: 'flex', gap: 8, height: 44, alignItems: 'center', flexShrink: 0 }}>
        <button onClick={onBack} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Files
        </button>
        <div style={{ width: 1, height: 20, background: LN, flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: MUT }}>New {type} · only you can see it until you share</span>
        {type === 'sheet' && (
          <>
            <button onClick={addRow} style={{ height: 36, padding: '0 12px', marginLeft: 8, borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>+ Row</button>
            <button onClick={addCol} style={{ height: 36, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>+ Column</button>
          </>
        )}
        <button onClick={save} style={{ marginLeft: 'auto', height: 36, padding: '0 18px', borderRadius: 999, border: 'none', background: saved ? '#5a8a7a' : G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{saved ? 'Saved ✓' : isNew ? 'Create file' : 'Save'}</button>
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
    </div>
  )
}
