import { useState } from 'react'
import { toolTarget } from '../toolTargets'
import { DARK, AMBER, PALEON } from './directorParts'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

// Who is watching. Players see their own lessons. A parent sees each child's
// lessons, so they can watch together and help at home. Players under 15 have no
// account of their own, so the parent's phone is where those lessons live.
export type LearnAudience = 'young' | 'older' | 'adult' | 'parent' | 'academyparent'
type Lesson = { id: string; al: string; title: string; credit: string; dur: string }
const lesson = (id: string, title: string, credit: string, dur: string): Lesson => ({ id, al: `${title} ${credit} · ${dur}`, title, credit, dur })
const CLUB_LESSONS = [
  lesson('l1', 'Weak-foot finish across the keeper', 'Leo, U13', '7 seconds'),
  lesson('l2', 'Passing with the other foot', 'Ava, U13 Girls', '9 seconds'),
  lesson('l3', 'Stepping up together', 'U14 back four', '14 seconds'),
  lesson('l4', 'Closing the space behind the press', 'Grace, your team', '11 seconds'),
]
const MINIROOS_LESSONS = [
  lesson('l1', 'Eyes up while you dribble', 'A U9 Tom player', '9 seconds'),
  lesson('l2', 'Stop it with the sole', 'A U9 Mark player', '8 seconds'),
  lesson('l3', 'Turn away from a defender', 'A U11 Luke player', '11 seconds'),
  lesson('l4', 'Pass to a friend, then move', 'A U8 Hannah player', '7 seconds'),
]
const ACADEMY_LESSONS = [
  lesson('l1', 'Receiving on the half-turn', 'An Advanced player', '8 seconds'),
  lesson('l2', 'Weak-foot pass against a wall', 'A Development player', '9 seconds'),
  lesson('l3', 'Looking before the ball arrives', 'An Advanced player', '10 seconds'),
  lesson('l4', 'First touch away from pressure', 'A Development player', '7 seconds'),
]
type Learner = { name?: string; team: string; coach: string; lessons: Lesson[]; used?: string; practice: string }
const LEARNERS: Record<LearnAudience, { head: string; ini: string; kids: Learner[] }> = {
  young: { head: 'U12 Sam', ini: 'MT', kids: [{ team: 'U12 Sam', coach: 'Sam', lessons: CLUB_LESSONS, used: 'Ironbark', practice: '20 passes against a wall with your left foot. From "Passing with the other foot". Counts towards your goal.' }] },
  older: { head: 'U16 Ollie', ini: 'CW', kids: [{ team: 'U16 Ollie', coach: 'Ollie', lessons: CLUB_LESSONS, used: 'Tealside Town', practice: '20 passes against a wall with your left foot. From "Passing with the other foot". Counts towards your goal.' }] },
  adult: { head: 'Men’s 1sts', ini: 'JW', kids: [{ team: 'Men’s 1sts', coach: 'Marko', lessons: CLUB_LESSONS, used: 'Glenview Park', practice: '20 passes against a wall with your weaker foot. From "Passing with the other foot". Counts towards your goal.' }] },
  parent: { head: 'Wattle Creek FC · parent', ini: 'LT', kids: [
    { name: 'Mia', team: 'U12 Sam', coach: 'Sam', lessons: CLUB_LESSONS, used: 'Ironbark', practice: '20 passes against a wall with her left foot. From "Passing with the other foot". Counts towards Mia’s goal.' },
    { name: 'Bao', team: 'U8 Hannah', coach: 'Hannah', lessons: MINIROOS_LESSONS, practice: 'One game to play at home: stop the ball with the sole ten times, then swap feet.' },
  ] },
  academyparent: { head: 'Tall Timber Academy · parent', ini: 'PB', kids: [{ name: 'Kai', team: 'Advanced · 12 to 14', coach: 'Reece', lessons: ACADEMY_LESSONS, practice: '20 passes against a wall with his weaker foot. From "Weak-foot pass against a wall". Counts towards Kai’s goal.' }] },
}

export default function EDUp1PlayerLearn({ onNav: _onNav, embedded = false, older = false, audience, bare = false }: { onNav?: (s: string) => void; embedded?: boolean; older?: boolean; audience?: LearnAudience; /** no green header: the app it sits in already has one */ bare?: boolean }) {
  const aud: LearnAudience = audience ?? (older ? 'older' : 'young')
  const cfg = LEARNERS[aud]
  const [kid, setKid] = useState(0)
  const me = cfg.kids[kid], forChild = !!me.name
  const who = { team: cfg.head, ini: cfg.ini, coach: me.coach }
  const [lastTool, setLastTool] = useState('')
  const [played, setPlayed] = useState<string | null>(null)
  const [didIt, setDidIt] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { const to = toolTarget(name); if (to && _onNav) { _onNav(to); return } setLastTool(name) }

  const lessons = me.lessons

  const navItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Clips', icon: 'clips' },
    { label: 'Learn', icon: 'learn', active: true },
    { label: 'Goals', icon: 'goals' },
    { label: 'Me', icon: 'me' },
  ]

  function NavIcon({ icon, active }: { icon: string; active?: boolean }) {
    const c = active ? G : MUT
    if (icon === 'home') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    if (icon === 'clips') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    if (icon === 'learn') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
    if (icon === 'goals') return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  }

  return (
    <div data-lasttool={lastTool} style={{ width: 390, background: '#faf5ec', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }}>
      {/* Header */}
      {!bare && <div style={{ background: G, padding: '12px 16px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)' }}>{who.team}</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Learn</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#e8cfcf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: INK }}>{who.ini}</div>
      </div>}

      {/* Content */}
      <div style={{ flex: 1, padding: '0 0 80px', overflowY: 'auto' }}>
        <div style={{ padding: '20px 20px 0' }}>
          {/* A parent with more than one child picks whose lessons to see */}
          {cfg.kids.length > 1 && (
            <div role="group" aria-label="Whose lessons" style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {cfg.kids.map((k, n) => <button key={k.name} aria-pressed={n === kid} onClick={() => { setKid(n); setPlayed(null); setDidIt(false) }} style={{ flex: 1, minHeight: 44, borderRadius: 999, border: `1.5px solid ${n === kid ? G : LN}`, background: n === kid ? G : '#fff', color: n === kid ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{k.name} · {k.team}</button>)}
            </div>
          )}
          <div style={{ background: DARK, borderRadius: 14, padding: '18px 18px', marginBottom: 20, color: '#fff' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: AMBER, letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 8 }}>This week from {who.coach}{forChild ? `, for ${me.name}` : ''}</div>
            <div style={{ fontSize: 15, color: '#fff', lineHeight: 1.5, marginBottom: 8 }}>{forChild ? `Short videos picked for ${me.name}. Watch them together and try it at home.` : 'Short videos of your teammates. Watch them and try it at training.'}</div>
            <div style={{ fontSize: 12, color: PALEON, marginBottom: 4 }}>No likes, no comments, no counts of who watched most.</div>
            {me.used && <div style={{ fontSize: 12, color: PALEON }}>{who.coach} used {forChild ? `${me.name}’s` : 'your'} pass against {me.used} to show "playing forward first time". It is in the club library.</div>}
          </div>

          {lessons.map(l => {
            const isPlayed = played === l.id
            return (
              <div key={l.id} style={{ position: 'relative', background: '#fff', border: `1px solid ${isPlayed ? G : LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
                {/* invisible button overlay — no text so aria-label is used by __find */}
                <button aria-label={l.al} onClick={() => { setPlayed(l.id); tool(l.id); st(`${l.title} plays, then shows what to notice.`) }} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'none', zIndex: 1 }} />
                <div style={{ background: GD, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '2px 6px' }}>{l.dur}</div>
                </div>
                <div style={{ padding: '12px', position: 'relative', zIndex: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: MUT, marginBottom: l.id === 'l2' ? 10 : 0 }}>{l.credit} · {l.dur}</div>
                  {l.id === 'l2' && !didIt && (
                    <>
                      <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>{me.practice}</div>
                      <button onClick={() => { setDidIt(true); tool('I did it'); st(`Nice one. ${who.coach} can see ${forChild ? me.name : 'you'} practised. 2 of 3 this week.`) }} style={{ height: 44, width: '100%', borderRadius: 10, background: AMBER, color: INK, border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', position: 'relative', zIndex: 2 }}>{forChild ? `${me.name} did it` : 'I did it'}</button>
                    </>
                  )}
                  {isPlayed && l.id !== 'l2' && (
                    <div style={{ fontSize: 12, color: G, fontWeight: 600 }}>Watched</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom nav */}
      {!embedded && <div style={{ position: 'sticky', bottom: 0, width: 390, background: '#fff', borderTop: `1px solid ${LN}`, padding: '10px 0 20px', display: 'flex', justifyContent: 'space-around' }}>
        {navItems.map(n => (
          <button
            key={n.label}
            onClick={() => { const to = ({ Home: aud === 'older' ? 'STO19-HomeStoryPlayerOlder' : 'STO18-HomeStoryPlayerYoung', Clips: 'PA-Clip', Goals: 'PA-Goals', Me: 'PS4-PlayerMe' } as Record<string, string>)[n.label]; if (to && _onNav) _onNav(to); else tool(n.label) }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', minWidth: 44, minHeight: 44, justifyContent: 'center' }}
          >
            <NavIcon icon={n.icon} active={n.active} />
            <span style={{ fontSize: 11, color: n.active ? G : MUT, fontWeight: n.active ? 700 : 400 }}>{n.label}</span>
          </button>
        ))}
      </div>}

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
