import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'

type Nav      = 'home' | 'practice'
type PracView = 'list' | 'step1' | 'step2' | 'step3' | 'step4'

// ─── Shared ───────────────────────────────────────────────────────────────────

function SkillBar({ label, then: then_, now }: { label: string; then: number; now: number }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{label}</span>
        <span style={{ fontSize: 12, color: G2, fontWeight: 700 }}>{then_} → {now}</span>
      </div>
      <div style={{ height: 8, background: LN, borderRadius: 4, position: 'relative' as const }}>
        <div style={{ height: 8, background: G2 + '55', borderRadius: 4, position: 'absolute', left: 0, width: `${then_ / 5 * 100}%` }}/>
        <div style={{ height: 8, background: G, borderRadius: 4, position: 'absolute', left: 0, width: `${now / 5 * 100}%` }}/>
      </div>
    </div>
  )
}

// ─── ACK1 — Player home ───────────────────────────────────────────────────────

function PlayerHome({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: INK, letterSpacing: '-0.03em' }}>Hi Kai!</div>
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Your first session is on Tuesday</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Messmate Primary School, Pitch 1 at 4:30. Reece is your coach.</div>
      </div>
      {[{ l: 'Your goal', d: "One thing you'll work on this term" }, { l: 'Your skills', d: "How far you've come at the end of term" }, { l: 'Practice at home', d: 'Short drills your coach picked for you' }].map(r => (
        <div key={r.l} style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>+</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.l}</div><div style={{ fontSize: 12, color: MUT }}>{r.d}</div></div>
        </div>
      ))}
    </div>
  )

  const practice = [
    { label: 'Mon', done: true },
    { label: 'Tue', done: true },
    { label: 'Wed', done: false, today: true },
    { label: 'Thu', done: false },
    { label: 'Fri', done: false },
  ]

  const skills = [
    { label: 'First touch', then: 2, now: 3 },
    { label: 'Left foot', then: 1, now: 2 },
    { label: 'Turning in tight spaces', then: 2, now: 3 },
    { label: 'Decision-making', then: 3, now: 3 },
    { label: 'Effort and coachability', then: 4, now: 4 },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: INK, letterSpacing: '-0.03em' }}>Hi Kai!</div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>This term's goal</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: GD, lineHeight: 1.4 }}>Sharper with the left foot in tight spaces</div>
        <div style={{ fontSize: 13, color: G2, marginTop: 4 }}>From Reece · Term 2 · week 7 of 10</div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Home practice this week</div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 14 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {practice.map(d => (
              <div key={d.label} style={{ flex: 1, background: d.done ? G : d.today ? PALE : '#f5f8f7', border: `1px solid ${d.done ? G : d.today ? G + '55' : LN}`, borderRadius: 10, padding: '8px 4px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: d.done ? 'rgba(255,255,255,0.75)' : MUT }}>{d.label}</div>
                <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {d.done ? (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round"><path d="M5 12l5 5 9-10"/></svg>
                  ) : (
                    <div style={{ width: 10, height: 10, borderRadius: '50%', border: `2px solid ${d.today ? G : LN}`, background: d.today ? G + '20' : 'transparent' }}/>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: MUT }}>2 of 5 done · Today's drill: Left foot wall passes</div>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 12 }}>Your skills · end of Term 1</div>
        {skills.map(s => <SkillBar key={s.label} {...s}/>)}
        <div style={{ fontSize: 12, color: MUT, marginTop: 4, lineHeight: 1.5 }}>Bars show where you were and where you got to. The report comes at the end of term.</div>
      </div>

      <div style={{ background: PALE, borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>From Reece after Tuesday</div>
        <div style={{ fontSize: 14, color: G2, lineHeight: 1.6 }}>"Good sharp movement in the grid work, Kai. The left-foot pass is coming — you're starting to look for it now."</div>
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: GD }}>23 Apr · 48 seconds</div>
            <div style={{ fontSize: 12, color: G2 }}>Coach clip · tap to watch</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ACK2 — Practice ─────────────────────────────────────────────────────────

function PracticeView({ empty }: { empty: boolean }) {
  const [view, setView] = useState<PracView>('list')

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Practice</div>
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Your first practice appears after session 1</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Reece picks two short drills each week. They take about 10 minutes at home.</div>
      </div>
      {[{ l: 'Two drills', d: 'Pick the ones for today, in any order' }, { l: '10 minutes', d: 'Short enough to actually do' }, { l: 'Tap done', d: 'Your coach can see you kept it up' }].map(r => (
        <div key={r.l} style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>+</div>
          <div><div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.l}</div><div style={{ fontSize: 12, color: MUT }}>{r.d}</div></div>
        </div>
      ))}
    </div>
  )

  if (view === 'list') return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Home practice</div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: 14, background: GD }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 2 }}>This week · 2 drills</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>From Reece · 10 minutes total</div>
        </div>
        {[
          { n: 1, title: 'Left foot wall passes', time: '5 min', done: true, note: "Kick against a wall or fence. Only the left foot.", key: 'step1' as PracView },
          { n: 2, title: 'Ball across the body', time: '5 min', done: false, note: 'Flick it from one foot to the other and back, tight.', key: 'step2' as PracView },
        ].map((d, i) => (
          <button key={d.n} onClick={() => setView(d.key)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px', borderBottom: i < 1 ? `1px solid ${LN}` : 'none', width: '100%', textAlign: 'left', border: 'none', background: d.done ? PALE : '#fff', cursor: 'pointer', fontFamily: 'inherit', borderTop: `1px solid ${i > 0 ? LN : 'transparent'}` }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: d.done ? G : '#f5f8f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {d.done ? (
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round"><path d="M5 12l5 5 9-10"/></svg>
              ) : (
                <span style={{ fontSize: 16, fontWeight: 800, color: GD }}>{d.n}</span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{d.title}</div>
              <div style={{ fontSize: 12, color: MUT }}>{d.time} · {d.note}</div>
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>No ball? Do it with a rolled-up sock. Reece says that's how he learned.</div>
    </div>
  )

  const steps: Record<PracView, { n: number; title: string; steps: string[]; tip: string; note: string } | null> = {
    list: null,
    step3: null,
    step4: null,
    step1: {
      n: 1,
      title: 'Left foot wall passes',
      steps: [
        'Find a wall or fence — any flat surface works.',
        'Stand about 1.5 metres away.',
        'Kick the ball against the wall with the inside of your left foot.',
        'Control it back when it comes to you, using your left foot again.',
      ],
      tip: "If it's going wide, check you're hitting through the middle of the ball — not the top.",
      note: "5 minutes · keep going — most of the work happens in the last 2 minutes when you're a bit tired.",
    },
    step2: {
      n: 2,
      title: 'Ball across the body',
      steps: [
        'Stand with the ball in front of you.',
        'Flick it to the left with the outside of your right foot.',
        'Catch it with the inside of your left foot.',
        'Now flick it right with the outside of your left, catch with your right. Keep switching.',
      ],
      tip: "Your head up once you get the rhythm — that's the whole point of the drill.",
      note: '5 minutes · tight movement, the gap between your feet should be small.',
    },
  }

  const current = steps[view]
  if (!current) return null

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setView('list')} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: LN, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{current.title}</div>
          <div style={{ fontSize: 12, color: MUT }}>Drill {current.n} of 2 · {current.note}</div>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
        {current.steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 14px', borderBottom: i < current.steps.length - 1 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 15, color: INK, lineHeight: 1.5, paddingTop: 3 }}>{step}</div>
          </div>
        ))}
      </div>

      <div style={{ background: PALE, borderRadius: 14, padding: '12px 14px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: G, marginBottom: 4 }}>Reece's tip</div>
        <div style={{ fontSize: 14, color: GD, lineHeight: 1.5 }}>{current.tip}</div>
      </div>

      <button onClick={() => setView('list')} style={{ height: 52, borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
        Done ✓
      </button>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, textAlign: 'center' }}>Reece can see when you've marked a drill as done — it shows up in his session notes.</div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AcademyPlayerApp({ onBack, empty = false }: { onBack: () => void; empty?: boolean }) {
  const [nav, setNav] = useState<Nav>('home')

  const tabs: Array<{ id: Nav; label: string; icon: string }> = [
    { id: 'home',     label: 'Home',     icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { id: 'practice', label: 'Practice', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  ]

  return (
    <div style={{ width: 390, margin: '0 auto', background: '#fafafa', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ background: GD, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Kai Okonkwo</span>
        <button onClick={onBack} style={{ height: 44, padding: '0 10px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {nav === 'home'     && <PlayerHome empty={empty}/>}
        {nav === 'practice' && <PracticeView empty={empty}/>}
      </div>

      <nav style={{ flex: 'none', height: 64, background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'stretch' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setNav(t.id)} style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: 0, fontFamily: 'inherit' }}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={nav === t.id ? G : MUT} strokeWidth={nav === t.id ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round"><path d={t.icon}/></svg>
            <span style={{ fontSize: 11, fontWeight: nav === t.id ? 700 : 500, color: nav === t.id ? G : MUT }}>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
