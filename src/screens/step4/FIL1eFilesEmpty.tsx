import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FIL1eFilesEmpty({ onNewFile, onTemplate }: { onNewFile?: () => void; onTemplate?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Files', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Files' ? 700 : 500, color: t === 'Files' ? '#fff' : 'rgba(255,255,255,0.65)', background: t === 'Files' ? 'rgba(255,255,255,0.15)' : 'none', borderRadius: 999, padding: '4px 12px', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 16, height: 48 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Files</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button onClick={onTemplate || (() => st('Opening templates.'))} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>From template</button>
          <button onClick={onNewFile || (() => st('Creating new file.'))} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>New file</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>No files yet</div>
        <div style={{ fontSize: 14, color: MUT, maxWidth: 440, textAlign: 'center', lineHeight: 1.6, marginBottom: 32 }}>
          Files are shared with your team and families. Docs, team sheets, sign-ups, and forms all live here.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40, width: 640 }}>
          {[
            { icon: '📋', title: 'Team sheet', desc: 'Player minutes grid' },
            { icon: '📄', title: 'Doc', desc: 'Directions, notes' },
            { icon: '✅', title: 'Sign-up', desc: 'Jobs and helpers' },
            { icon: '📝', title: 'Form', desc: 'Sizes, photos' },
          ].map((t, i) => (
            <div key={i} onClick={onNewFile || (() => st(`Creating ${t.title}.`))} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', textAlign: 'center', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = G}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = LN}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{t.title}</div>
              <div style={{ fontSize: 11, color: MUT }}>{t.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onNewFile || (() => st('Creating new file.'))} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Create a file</button>
          <button onClick={() => st('Opening file from club.')} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>From the club</button>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
