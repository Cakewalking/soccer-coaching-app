import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDUp1PlayerLearn() {
  const [watched, setWatched] = useState<string[]>([])
  const [reaction, setReaction] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const lessons = [
    { id: 'l1', title: 'Stepping up together', len: '0:14', tag: 'Staying compact', new: true, series: '1 of 4' },
    { id: 'l2', title: 'Closing the space behind the press', len: '0:11', tag: 'Defender', new: true },
    { id: 'l3', title: 'Scanning before the ball arrives', len: '0:18', tag: 'Building up', new: false },
    { id: 'l4', title: 'First touch away from pressure', len: '0:19', tag: 'Attacking', new: false },
  ]

  const isWatched = (id: string) => watched.includes(id)

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '14px 20px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', flex: 1 }}>Clean Sheet</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', padding: '0 20px', height: 44 }}>
        {['This week', 'Learn', 'Clips'].map(t => (
          <div key={t} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: t === 'Learn' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Learn' ? 700 : 500, color: t === 'Learn' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
      </div>

      <div style={{ flex: 1, padding: '0 0 100px', overflowY: 'auto' }}>
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 4 }}>Learn</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Short videos of your teammates. Watch them and try it at training.</div>

          {/* This week */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>This week from Sam</div>
            {lessons.filter(l => l.new).map(l => (
              <div key={l.id} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ background: GD, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                  onClick={() => { if (!isWatched(l.id)) setWatched(w => [...w, l.id]); st('Playing…') }}>
                  {isWatched(l.id) ? (
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  ) : (
                    <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '2px 6px' }}>{l.len}</div>
                  {l.new && !isWatched(l.id) && <div style={{ position: 'absolute', top: 8, left: 8, fontSize: 10, fontWeight: 800, color: '#fff', background: '#e53e3e', borderRadius: 4, padding: '2px 6px' }}>NEW</div>}
                  {l.series && <div style={{ position: 'absolute', top: 8, right: 8, fontSize: 10, fontWeight: 700, color: '#fff', background: G, borderRadius: 4, padding: '2px 6px' }}>{l.series}</div>}
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>{l.title}</div>
                  <div style={{ fontSize: 11, color: MUT, background: PALE, borderRadius: 4, display: 'inline-block', padding: '2px 8px', marginBottom: 8 }}>{l.tag}</div>
                  {isWatched(l.id) && (
                    <div>
                      <div style={{ fontSize: 12, color: MUT, marginBottom: 6 }}>What did you think?</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {['👍', '💡', '🔥'].map(r => (
                          <button key={r} onClick={() => { setReaction(prev => ({ ...prev, [l.id]: r })); st('Reaction saved.') }} style={{ flex: 1, height: 36, borderRadius: 999, border: `2px solid ${reaction[l.id] === r ? G : LN}`, background: reaction[l.id] === r ? PALE : '#fff', fontSize: 16, cursor: 'pointer' }}>{r}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* All lessons */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>All lessons</div>
            {lessons.map(l => (
              <div key={l.id} onClick={() => { if (!isWatched(l.id)) setWatched(w => [...w, l.id]); st('Playing…') }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${LN}`, cursor: 'pointer' }}>
                <div style={{ width: 60, height: 44, background: GD, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {isWatched(l.id) ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  )}
                  <div style={{ position: 'absolute', bottom: 2, right: 2, fontSize: 9, color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: 2, padding: '1px 4px' }}>{l.len}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{l.title}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{l.tag}</div>
                </div>
                {isWatched(l.id) && <div style={{ fontSize: 11, color: G, fontWeight: 600 }}>Watched</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: 390, background: '#fff', borderTop: `1px solid ${LN}`, padding: '10px 0 20px', display: 'flex', justifyContent: 'space-around' }}>
        {[
          { icon: '⚽', label: 'Team' },
          { icon: '📅', label: 'Schedule' },
          { icon: '🎬', label: 'Clips', active: true },
          { icon: '📁', label: 'Files' },
          { icon: '💬', label: 'Messages' },
        ].map(n => (
          <button key={n.label} onClick={() => n.active ? null : st(`Going to ${n.label}.`)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            <span style={{ fontSize: 20 }}>{n.icon}</span>
            <span style={{ fontSize: 11, color: n.active ? G : MUT, fontWeight: n.active ? 700 : 400 }}>{n.label}</span>
          </button>
        ))}
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
