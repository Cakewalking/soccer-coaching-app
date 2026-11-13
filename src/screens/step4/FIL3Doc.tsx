import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FIL3Doc({ onParentView, onShare }: { onParentView?: () => void; onShare?: () => void }) {
  const [view, setView] = useState<'edit' | 'parent' | 'print'>('edit')
  const [sideTab, setSideTab] = useState<'comments' | 'live' | 'opened'>('live')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  if (view === 'parent') {
    onParentView?.()
    setView('edit')
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

      {/* Doc toolbar */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 24px', display: 'flex', gap: 8, height: 44, alignItems: 'center' }}>
        <button onClick={() => st('Back to files.')} style={{ fontSize: 13, color: MUT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Files</button>
        <div style={{ width: 1, height: 24, background: LN }} />
        {['Heading 2 ▾', 'B', 'I', 'U', '≡', '☰', '⊞'].map(b => (
          <button key={b} onClick={() => st('Formatting.')} style={{ height: 28, padding: '0 10px', borderRadius: 6, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: INK }}>{b}</button>
        ))}
        <div style={{ width: 1, height: 24, background: LN }} />
        <button onClick={() => st('Inserting from Clean Sheet.')} style={{ height: 28, padding: '0 12px', borderRadius: 6, border: `1.5px solid ${G}`, background: PALE, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: G, fontWeight: 600 }}>From Clean Sheet</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {['History', 'Download'].map(a => (
            <button key={a} onClick={() => st(`${a}.`)} style={{ height: 32, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: INK }}>{a}</button>
          ))}
          <button onClick={() => onShare?.()} style={{ height: 32, padding: '0 14px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
          <button onClick={() => { onParentView?.() }} style={{ height: 32, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: G }}>As a parent sees it</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Outline */}
        <div style={{ width: 180, padding: '24px 16px', borderRight: `1px solid ${LN}`, background: '#fff', flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, marginBottom: 12 }}>Outline</div>
          {['Saturday v Harbour Rovers', 'Meet time', 'Bring', 'Club header'].map((h, i) => (
            <div key={h} style={{ fontSize: 13, color: i === 0 ? G : MUT, fontWeight: i === 0 ? 600 : 400, padding: '4px 0', cursor: 'pointer' }}>{h}</div>
          ))}
        </div>

        {/* Doc content */}
        <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
          {/* Club header band */}
          <div style={{ background: GD, color: '#fff', borderRadius: '12px 12px 0 0', padding: '16px 24px', marginBottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 15, fontWeight: 800 }}>Wattle Creek FC</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>U12 Sam · Head coach</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '0 0 12px 12px', border: `1px solid ${LN}`, borderTop: 'none', padding: '28px 32px' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK, marginBottom: 4 }}>Saturday v Harbour Rovers · where and when</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>From Sam, your coach · touch 8</div>

            {/* Live block: meet time */}
            <div style={{ background: '#f0faf5', border: `1.5px solid ${G}`, borderRadius: 10, padding: '14px 18px', marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G, marginBottom: 6 }}>📍 Live · kick-off and meeting time</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Meet 8:40</div>
              <div style={{ fontSize: 13, color: MUT }}>Kick-off 9:00 am</div>
              <div style={{ fontSize: 12, color: G, marginTop: 4 }}>Changed from 8:45 last night</div>
            </div>

            {/* Ground */}
            <div style={{ background: '#f0faf5', border: `1.5px solid ${G}`, borderRadius: 10, padding: '14px 18px', marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G, marginBottom: 6 }}>📍 Live · ground</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Wattle Creek Reserve, pitch 2</div>
              <div style={{ fontSize: 13, color: MUT }}>34 Reserve Road, Wattle Creek</div>
              <button onClick={() => st('Opening map.')} style={{ marginTop: 8, height: 30, padding: '0 14px', borderRadius: 999, background: PALE, border: 'none', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Directions</button>
            </div>

            {/* Text */}
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>What to bring</div>
            <ul style={{ margin: '0 0 16px', padding: '0 0 0 20px', fontSize: 14, color: INK, lineHeight: 1.8 }}>
              <li>Boots and shin pads</li>
              <li>Water bottle (full before you arrive)</li>
              <li>Rain jacket — showers likely</li>
            </ul>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Club header</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>Any questions, message Sam through Clean Sheet. Have a great game!</div>
          </div>
        </div>

        {/* Right side panel */}
        <div style={{ width: 260, borderLeft: `1px solid ${LN}`, background: '#fff', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Panel tabs */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${LN}` }}>
            {(['comments', 'live', 'opened'] as const).map(t => (
              <button key={t} onClick={() => setSideTab(t)} style={{ flex: 1, height: 40, background: 'none', border: 'none', borderBottom: sideTab === t ? `2px solid ${G}` : '2px solid transparent', fontSize: 12, fontWeight: sideTab === t ? 700 : 500, color: sideTab === t ? G : MUT, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{t}</button>
            ))}
          </div>

          <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
            {sideTab === 'live' && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Changed by itself</div>
                {[
                  { text: 'Meet time changed from 8:45 to 8:40', when: 'Last night at 9:12 pm', by: 'Fixture update' },
                ].map((c, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: G }}>{c.text}</div>
                    <div style={{ fontSize: 11, color: MUT }}>{c.when} · {c.by}</div>
                    <div style={{ fontSize: 11, color: MUT, marginTop: 4 }}>Families who had opened the doc got a message.</div>
                  </div>
                ))}
              </div>
            )}
            {sideTab === 'opened' && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>12 of 17 families opened</div>
                <button onClick={() => st('Sending nudge to 5 families.')} style={{ marginBottom: 12, height: 32, padding: '0 14px', borderRadius: 999, background: PALE, border: 'none', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge the 5</button>
                <div style={{ fontSize: 12, color: MUT }}>1 comment from Jess Marsh</div>
              </div>
            )}
            {sideTab === 'comments' && (
              <div>
                <div style={{ display: 'flex', gap: 10, padding: '10px 0' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>JM</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Jess Marsh</div>
                    <div style={{ fontSize: 12, color: MUT }}>Can we car pool from the oval?</div>
                    <button onClick={() => st('Opening reply.')} style={{ marginTop: 4, fontSize: 11, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Reply</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
