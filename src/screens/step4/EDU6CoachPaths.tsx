import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

export default function EDU6CoachPaths({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

  const pathDefs = [
    {
      name: 'Getting started — MiniRoos',
      lessonCount: 5,
      trigger: 'Given to every new MiniRoos coach',
      description: '5 lessons on managing a small-sided game, equal time, and talking to families.',
    },
    {
      name: 'Reading the game',
      lessonCount: 5,
      trigger: 'Sent when you turn it on for a team',
      description: '5 lessons on watching what is happening and acting on it without an app.',
    },
    {
      name: 'Your first lesson',
      lessonCount: 4,
      trigger: 'Available to any coach from the library',
      description: '4 lessons on picking a moment, writing points, and asking a player.',
    },
  ]

  const coaches = [
    { id: 'p1', coach: 'Dana Fox', team: 'U14 Josh', initials: 'DF', bg: '#6b8ea6', level: 'Club Level 2', progress: 0.65, made: 2 },
    { id: 'p2', coach: 'Sam Knight', team: 'U12 Sam', initials: 'SK', bg: '#7a9e7e', level: 'Club Level 1', progress: 0.4, made: 1 },
    { id: 'p3', coach: 'Meg Obi', team: 'U13 Girls Meg', initials: 'MO', bg: '#a09080', level: 'Club Level 2', progress: 0.8, made: 3 },
    { id: 'p4', coach: 'Chris Ward', team: 'U13 Chris', initials: 'CW', bg: '#8b7a6e', level: 'State Level 3', progress: 1.0, made: 5 },
    { id: 'p5', coach: 'Mark Dunn', team: 'U9 Mark', initials: 'MD', bg: '#7a8a9e', level: 'MiniRoos intro', progress: 0.2, made: 0 },
    { id: 'p6', coach: 'Ana Silva', team: 'U12 Girls Ana', initials: 'AS', bg: '#8e7a90', level: 'MiniRoos intro', progress: 0.3, made: 1 },
  ]

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Director top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 4, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginRight: 8 }}>Clean Sheet</div>
        {(['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'] as const).map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, padding: '0 10px', fontSize: 13, fontWeight: t === 'Coaches' ? 700 : 500, color: t === 'Coaches' ? '#fff' : 'rgba(255,255,255,0.65)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>{t}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </button>
          <button onClick={() => tool('Whole club')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', background: 'none', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
            Whole club<ChevronDown />
          </button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      {/* Coaches sub-nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={() => tool('All coaches')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>All coaches</button>
        <button onClick={() => tool('Courses')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>Courses</button>
        <button onClick={() => onNav?.('EDU4-ClubLibrary')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: `2px solid ${G}`, fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>Learn library</button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Director of football</div>
      </div>

      {/* For players / For coaches */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', alignItems: 'center', height: 44, gap: 0 }}>
        <button onClick={() => onNav?.('EDU4-ClubLibrary')} style={{ height: 44, padding: '0 20px', background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>For players</button>
        <button onClick={() => tool('For coaches')} style={{ height: 44, padding: '0 20px', background: 'none', border: 'none', borderBottom: `2px solid ${G}`, fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit' }}>For coaches</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => { tool('Make a path'); st('Pick lessons, put them in order, choose who gets it.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Make a path</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>For coaches · 14 lessons from 6 coaches · 3 paths</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>Lessons are not a test and nothing is marked. "Done" means watched and tried once.</div>
        </div>

        {/* Path cards */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Paths</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {pathDefs.map((p, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: MUT, marginBottom: 8, lineHeight: 1.5 }}>{p.description}</div>
                <div style={{ fontSize: 11, color: G, fontWeight: 700, background: PALE, borderRadius: 6, padding: '4px 8px', display: 'inline-block', marginBottom: 8 }}>{p.trigger}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <button onClick={() => { tool(`Edit path ${i + 1}`); st(`Edit "${p.name}".`) }} style={{ height: 44, flex: 1, borderRadius: 10, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coach progress table */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>Coach progress</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Nothing. Progress is between you and each coach.</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            {coaches.map((c, i) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < coaches.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{c.coach}</div>
                    <div style={{ fontSize: 11, color: MUT }}>{c.team}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, maxWidth: 160, background: LN, borderRadius: 999, height: 4 }}>
                      <div style={{ width: `${c.progress * 100}%`, height: 4, background: G, borderRadius: 999 }} />
                    </div>
                    <div style={{ fontSize: 11, color: MUT }}>{c.level}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: MUT, flexShrink: 0 }}>{c.made} lesson{c.made !== 1 ? 's' : ''} made</div>
                <button onClick={() => { tool(`Nudge ${c.coach}`); st(`A note goes to ${c.coach.split(' ')[0]}.`) }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge</button>
              </div>
            ))}
          </div>
        </div>

        {/* Courses cross-link */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>Federation courses</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6 }}>Paths sit beside the federation's coaching courses under Courses. They do not replace them.</div>
          </div>
          <button onClick={() => tool('Courses')} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Courses</button>
        </div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
