import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDU6CoachPaths({ onBack: _onBack }: { onBack?: () => void }) {
  const [activeCoach, setActiveCoach] = useState<string | null>('dana')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const coaches = [
    { id: 'dana', initials: 'DF', bg: '#6b8ea6', name: 'Dana Fox', role: 'U14 Josh · head coach', level: 'Club Level 2', progress: 0.65, next: 'State Level 3', modules: 7, done: 4 },
    { id: 'sam', initials: 'SK', bg: '#7a9e7e', name: 'Sam Knight', role: 'U12 Sam · head coach', level: 'Club Level 1', progress: 0.4, next: 'Club Level 2', modules: 6, done: 2 },
    { id: 'meg', initials: 'MO', bg: '#a09080', name: 'Meg Obi', role: 'U13 Girls · head coach', level: 'Club Level 2', progress: 0.8, next: 'State Level 3', modules: 7, done: 6 },
    { id: 'chris', initials: 'CW', bg: '#8b7a6e', name: 'Chris Ward', role: 'U13 Boys · head coach', level: 'State Level 3', progress: 1.0, next: 'Complete', modules: 9, done: 9 },
  ]

  const selected = coaches.find(c => c.id === activeCoach)

  const modules = [
    { title: 'Understanding the game model', done: true, locked: false },
    { title: 'Session design fundamentals', done: true, locked: false },
    { title: 'Working with young players (10–13)', done: true, locked: false },
    { title: 'Playing principles in practice', done: false, locked: false, current: true },
    { title: 'Goalkeeper basics for outfield coaches', done: false, locked: false },
    { title: 'Parent communication', done: false, locked: false },
    { title: 'Transitions and pressing', done: false, locked: true },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Coaches' ? 700 : 500, color: t === 'Coaches' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['All coaches', 'Learning paths'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Learning paths' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Learning paths' ? 700 : 500, color: t === 'Learning paths' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Coach list */}
        <div style={{ width: 280, borderRight: `1px solid ${LN}`, background: '#fff', padding: '16px 0' }}>
          <div style={{ padding: '0 16px 10px', fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.08em' }}>COACHES · 8</div>
          {coaches.map(c => (
            <div key={c.id} onClick={() => setActiveCoach(c.id)} style={{ padding: '12px 20px', cursor: 'pointer', background: activeCoach === c.id ? PALE : '#fff', borderLeft: `3px solid ${activeCoach === c.id ? G : 'transparent'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{c.role}</div>
                </div>
              </div>
              <div style={{ marginTop: 8, marginLeft: 46 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 11, color: MUT }}>{c.level}</div>
                  <div style={{ fontSize: 11, color: G, fontWeight: 700 }}>{Math.round(c.progress * 100)}%</div>
                </div>
                <div style={{ background: LN, borderRadius: 999, height: 4 }}>
                  <div style={{ width: `${c.progress * 100}%`, height: 4, background: G, borderRadius: 999 }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected && (
          <div style={{ flex: 1, padding: '24px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: selected.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>{selected.initials}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>{selected.name}</div>
                <div style={{ fontSize: 13, color: MUT }}>{selected.role}</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <button onClick={() => st('Sending nudge.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge</button>
              </div>
            </div>

            {/* Progress card */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px', marginBottom: 20, display: 'flex', gap: 24 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: MUT, marginBottom: 4 }}>Current level</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>{selected.level}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: MUT, marginBottom: 4 }}>Progress to {selected.next}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>{selected.done} of {selected.modules}</div>
                <div style={{ background: LN, borderRadius: 999, height: 6, marginTop: 6 }}>
                  <div style={{ width: `${selected.progress * 100}%`, height: 6, background: G, borderRadius: 999 }} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: MUT, marginBottom: 4 }}>Lessons made</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>3</div>
              </div>
            </div>

            {/* Modules */}
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Modules</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
              {modules.map((m, i) => (
                <div key={m.title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < modules.length - 1 ? `1px solid ${LN}` : 'none', opacity: m.locked ? 0.4 : 1 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: m.done ? G : m.current ? GD : '#e8edeb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {m.done ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> : m.locked ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.current ? '#fff' : '#ccc' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: m.current ? 700 : 500, color: m.done ? MUT : INK }}>{m.title}</div>
                    {m.current && <div style={{ fontSize: 11, color: G, fontWeight: 600 }}>In progress</div>}
                  </div>
                  {!m.locked && !m.done && (
                    <button onClick={() => st('Opening module.')} style={{ height: 28, padding: '0 12px', borderRadius: 999, background: m.current ? G : '#fff', border: `1.5px solid ${m.current ? G : LN}`, fontSize: 11, color: m.current ? '#fff' : MUT, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{m.current ? 'Continue' : 'Start'}</button>
                  )}
                  {m.done && <div style={{ fontSize: 11, color: G }}>Done</div>}
                  {m.locked && <div style={{ fontSize: 11, color: MUT }}>Locked</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
