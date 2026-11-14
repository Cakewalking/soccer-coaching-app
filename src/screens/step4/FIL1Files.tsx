import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type FileItem = { id: string; name: string; type: 'sheet' | 'doc' | 'upload' | 'signup'; who: string; changed: string }

const FILES: FileItem[] = [
  { id: '1', name: 'Summer sevens · team sheets', type: 'sheet', who: 'U12 Sam families · 9 of 17 opened', changed: 'Today' },
  { id: '2', name: 'Saturday v Harbour Rovers · where and when', type: 'doc', who: 'U12 Sam families · 12 of 17 opened', changed: 'Yesterday' },
  { id: '3', name: 'Canteen and kit roster, term 2', type: 'sheet', who: 'Coaching team · Rob can edit', changed: 'Tue' },
  { id: '4', name: 'Season letter to families', type: 'doc', who: 'U12 Sam families', changed: '12 May' },
  { id: '5', name: 'Ground map, Redgum Reserve.pdf', type: 'upload', who: 'U12 Sam families', changed: '3 May' },
  { id: '6', name: "Coaches' meeting notes, May", type: 'doc', who: 'Coaching team only', changed: '28 May' },
]

function FileIcon({ type }: { type: FileItem['type'] }) {
  const color = type === 'sheet' ? G : type === 'doc' ? '#6b7280' : type === 'upload' ? '#9333ea' : '#f59e0b'
  return (
    <div style={{ width: 36, height: 36, borderRadius: 8, background: type === 'sheet' ? PALE : type === 'doc' ? '#f9fafb' : type === 'upload' ? '#faf5ff' : '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {type === 'sheet' ? <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></> :
         type === 'doc' ? <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></> :
         type === 'upload' ? <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></> :
         <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>
        }
      </svg>
    </div>
  )
}

export default function FIL1Files({ onOpenSheet, onOpenDoc, onNav }: {
  onOpenSheet?: () => void
  onOpenDoc?: () => void
  onNav?: (s: string) => void
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All 6')
  const [toast, setToast] = useState<string | null>(null)
  const [uploadDone, setUploadDone] = useState(false)
  const [lastTemplate, setLastTemplate] = useState<string | null>(null)
  const [openedPdfId, setOpenedPdfId] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const filters = ['All 6', 'Shared with families 4', 'Coaching team only 2', 'From the club 3']
  const filtered = FILES.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  function handleOpen(f: FileItem) {
    if (f.type === 'sheet') onOpenSheet?.()
    else if (f.type === 'doc') onOpenDoc?.()
    else { setOpenedPdfId(f.id); st(`Opening ${f.name}`) }
  }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
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
          <div key={label} onClick={() => onNav?.(target)} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, padding: '0 10px', display: 'flex', alignItems: 'center' }}>{label}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </div>
          <div onClick={() => onNav?.('PH1-HomeJuniorsSame')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', gap: 6 }}>
            U12 Sam
          </div>
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

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Main */}
        <div style={{ flex: 1, padding: '24px 24px 24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Files</div>
              <div style={{ fontSize: 13, color: MUT }}>U12 Sam · docs, sheets and anything you upload, in one place</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
              <button onClick={() => setUploadDone(true)} style={{ minHeight: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: uploadDone ? PALE : '#fff', fontSize: 13, color: uploadDone ? G : INK, cursor: 'pointer', fontFamily: 'inherit' }}>{uploadDone ? 'Uploaded ✓' : 'Upload'}</button>
              <button onClick={() => onOpenSheet?.()} style={{ minHeight: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>New sheet</button>
              <button onClick={() => onOpenDoc?.()} style={{ minHeight: 44, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>New doc</button>
            </div>
          </div>

          {/* Search + filters */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
              <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files" style={{ width: '100%', height: 36, paddingLeft: 32, paddingRight: 12, border: `1.5px solid ${LN}`, borderRadius: 999, fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${filter === f ? G : LN}`, background: filter === f ? PALE : '#fff', fontSize: 13, color: filter === f ? G : INK, fontWeight: filter === f ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{f}</button>
            ))}
          </div>

          {/* File list */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px 100px', padding: '10px 20px', borderBottom: `1px solid ${LN}`, background: '#f7f8f7' }}>
              {['Name', 'Who can see it', 'Changed'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>{h}</div>
              ))}
            </div>
            {filtered.map((f, i) => (
              <div key={f.id} onClick={() => handleOpen(f)} style={{ display: 'grid', gridTemplateColumns: '1fr 220px 100px', padding: '14px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer', alignItems: 'center', background: openedPdfId === f.id ? PALE : '#fff' }}
                onMouseEnter={e => { if (openedPdfId !== f.id) (e.currentTarget as HTMLElement).style.background = PALE }}
                onMouseLeave={e => { if (openedPdfId !== f.id) (e.currentTarget as HTMLElement).style.background = '#fff' }}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <FileIcon type={f.type} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{f.name}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{f.type === 'sheet' ? 'Sheet' : f.type === 'doc' ? 'Doc' : f.type === 'upload' ? 'Uploaded file' : 'Sign-up'}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: MUT }}>{f.who}</div>
                <div style={{ fontSize: 13, color: MUT }}>{f.changed}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, fontSize: 12, color: MUT }}>Files with players' names can only be shared with people in Clean Sheet, never by open link.</div>
        </div>

        {/* Right: templates + space */}
        <div style={{ width: 220, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Start from</div>
            {[
              { label: 'Tournament team sheet', sub: 'Squad, games, turns in goal' },
              { label: 'Game day info', sub: 'Meet time, ground, what to bring' },
              { label: 'Duty roster', sub: 'Canteen, kit, oranges' },
              { label: 'Letter to families', sub: 'Your words, club header' },
            ].map(t => (
              <div key={t.label} onClick={() => setLastTemplate(t.label)} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: `1px solid ${LN}`, cursor: 'pointer', background: lastTemplate === t.label ? PALE : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: lastTemplate === t.label ? G : INK }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{t.sub}</div>
                </div>
              </div>
            ))}
            {lastTemplate && <div style={{ marginTop: 8, fontSize: 11, color: G }}>Opening {lastTemplate}…</div>}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Space</div>
            <div style={{ height: 6, background: LN, borderRadius: 999, overflow: 'hidden', marginBottom: 6 }}>
              <div style={{ height: '100%', width: '24%', background: G, borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: 12, color: MUT }}>1.2 of 5 GB used</div>
            <div style={{ fontSize: 11, color: MUT, marginTop: 4 }}>Video does not count. It is kept with Clips.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
