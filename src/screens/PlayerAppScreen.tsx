import { useState } from 'react'

type PlayerView = 'home' | 'checkin' | 'checkin-sent' | 'clip' | 'goals' | 'parent' | 'invite'

interface WellnessOption { label: string; emoji: string; value: number }

const WELLNESS_QUESTIONS: { q: string; options: WellnessOption[] }[] = [
  {
    q: 'How is your body feeling?',
    options: [
      { label: 'Great', emoji: '💪', value: 4 },
      { label: 'Good', emoji: '👍', value: 3 },
      { label: 'OK',   emoji: '😐', value: 2 },
      { label: 'Sore', emoji: '😬', value: 1 },
    ],
  },
  {
    q: 'How tired are you?',
    options: [
      { label: 'Rested',    emoji: '😴', value: 4 },
      { label: 'Fine',      emoji: '🙂', value: 3 },
      { label: 'Bit tired', emoji: '😪', value: 2 },
      { label: 'Very tired',emoji: '😩', value: 1 },
    ],
  },
  {
    q: 'How is your mood?',
    options: [
      { label: 'Buzzing', emoji: '🎉', value: 4 },
      { label: 'Good',    emoji: '😊', value: 3 },
      { label: 'Meh',     emoji: '😶', value: 2 },
      { label: 'Down',    emoji: '😔', value: 1 },
    ],
  },
]

const GOALS = [
  { title: 'First touch in tight spaces',  progress: 60, note: 'Sam set this · 3 weeks ago',    tag: 'Ball control' },
  { title: 'Shoot off my left',            progress: 40, note: 'Harper set this · 2 months ago', tag: 'Finishing' },
  { title: 'Get in behind on the overlap', progress: 25, note: 'Sam set this · 1 month ago',     tag: 'Movement' },
]

const MIA_EVENTS = [
  { day: 'Mon', label: 'Training', note: 'Arrived · left at full energy', color: '#40826d' },
  { day: 'Wed', label: 'Training', note: 'Bit tired · Sam adjusted session', color: '#c3a84a' },
  { day: 'Sat', label: 'Game',    note: 'Played 65 min · 1 assist',        color: '#40826d' },
]

export default function PlayerAppScreen({ empty }: { empty?: boolean }) {
  const [view, setView] = useState<PlayerView>('home')
  const [checkinAnswers, setCheckinAnswers] = useState<number[]>([])
  const [checkinQ, setCheckinQ] = useState(0)
  const [playClip, setPlayClip] = useState(false)
  const [inviteStep, setInviteStep] = useState<'landing' | 'toggles' | 'done'>('landing')
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoalText, setNewGoalText] = useState('')
  const [recordToggles, setRecordToggles] = useState({
    wellness: true, load: true, growth: false, clips: true,
  })

  function toggleRecord(key: keyof typeof recordToggles) {
    setRecordToggles(t => ({ ...t, [key]: !t[key] }))
  }

  if (view === 'invite') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#1f4a3e', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        {inviteStep === 'landing' && (
          <>
            <div style={{ flexGrow: 1, padding: '64px 28px 32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 60, height: 60, borderRadius: '999px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: '34px', marginBottom: 12 }}>Sam invited Mia to join Clean Sheet</div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: '22px', marginBottom: 32 }}>This is where Mia checks in before training, sees her goals, and you can follow how she's going.</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
                Clean Sheet is for the team — not sold to clubs or advertisers. You choose what gets recorded.
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px 20px', marginBottom: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>U12 Sam · Wattle Creek FC</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Under-12 · Tuesday and Thursday 6:00 pm</div>
              </div>
            </div>
            <div style={{ padding: '0 28px 48px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => setInviteStep('toggles')} style={{ height: 52, borderRadius: '999px', border: 0, background: '#fff', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Join for Mia</button>
              <button style={{ height: 48, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.4)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Mia will set up her own account</button>
            </div>
          </>
        )}

        {inviteStep === 'toggles' && (
          <>
            <div style={{ padding: '56px 28px 20px', flexShrink: 0 }}>
              <button onClick={() => setInviteStep('landing')} style={{ border: 0, background: 'none', color: 'rgba(255,255,255,0.6)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', marginBottom: 16 }}>← Back</button>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>What Mia shares with the team</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>You can change this any time in settings.</div>
            </div>
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '8px 28px 28px' }}>
              {([
                { key: 'wellness', label: 'Wellness check-ins', desc: 'Body, energy and mood before training. Only coaches see the detail.' },
                { key: 'load', label: 'Session load', desc: 'How much Mia did in training and games. Used to track safe training limits.' },
                { key: 'growth', label: 'Growth measurements', desc: 'Height and sitting height twice a season. Helps the fitness coach manage load safely.' },
                { key: 'clips', label: 'Video clips from coach', desc: 'Short clips Sam marks for Mia. Mia can see them, you can too.' },
              ] as { key: keyof typeof recordToggles; label: string; desc: string }[]).map(item => (
                <div key={item.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: '18px' }}>{item.desc}</div>
                  </div>
                  <button
                    onClick={() => toggleRecord(item.key)}
                    style={{ width: 48, height: 28, borderRadius: 14, border: 0, background: recordToggles[item.key] ? '#7cc4ab' : 'rgba(255,255,255,0.2)', cursor: 'pointer', position: 'relative', flexShrink: 0, marginTop: 2 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '999px', background: '#fff', position: 'absolute', top: 4, transition: 'left 0.15s', left: recordToggles[item.key] ? 24 : 4 }} />
                  </button>
                </div>
              ))}
              <button onClick={() => setInviteStep('done')} style={{ marginTop: 24, width: '100%', height: 52, borderRadius: '999px', border: 0, background: '#fff', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Confirm and join</button>
            </div>
          </>
        )}

        {inviteStep === 'done' && (
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px' }}>
            <div style={{ width: 72, height: 72, borderRadius: '999px', background: '#7cc4ab', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 12 }}>Mia's in the team</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: '22px', marginBottom: 40 }}>Sam will see Mia's check-ins before each session. You'll get a weekly summary.</div>
            <button onClick={() => { setView('parent'); setInviteStep('landing') }} style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: '#fff', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Go to Mia's week</button>
          </div>
        )}
      </div>
    )
  }

  if (empty) {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#1f4a3e', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', gap: 20, padding: '0 32px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7cc4ab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Welcome to Clean Sheet</div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: '22px' }}>Once your coach adds you to a team, you'll see your clips, schedule, and goals here.</div>
        <button style={{ height: 48, padding: '0 32px', borderRadius: '999px', border: 0, background: '#fff', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Got it</button>
      </div>
    )
  }

  /* ── CHECK-IN ── */
  if (view === 'checkin') {
    const q = WELLNESS_QUESTIONS[checkinQ]
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#1f4a3e', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ padding: '56px 24px 24px' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
            {WELLNESS_QUESTIONS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= checkinQ ? '#7cc4ab' : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{checkinQ + 1} of {WELLNESS_QUESTIONS.length}</div>
          <h2 style={{ margin: '0 0 40px', fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: '32px' }}>{q.q}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {q.options.map(opt => (
              <button key={opt.value} onClick={() => {
                const ans = [...checkinAnswers, opt.value]
                if (checkinQ < WELLNESS_QUESTIONS.length - 1) {
                  setCheckinAnswers(ans)
                  setCheckinQ(checkinQ + 1)
                } else {
                  setCheckinAnswers(ans)
                  setView('checkin-sent')
                }
              }} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '16px 20px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.08)', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
              }}>
                <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* ── CHECK-IN SENT ── */
  if (view === 'checkin-sent') {
    const avg = checkinAnswers.reduce((a, b) => a + b, 0) / checkinAnswers.length
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#1f4a3e', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', padding: '0 32px', gap: 20, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '999px', background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7cc4ab" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>Check-in sent</div>
        {avg <= 2 && (
          <div style={{ background: 'rgba(195,151,151,0.2)', borderRadius: 14, padding: '14px 18px', border: '1px solid rgba(195,151,151,0.4)' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Sam can see you're not 100%</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>They'll adjust tonight's session. You don't need to do anything.</div>
          </div>
        )}
        {avg > 2 && (
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: '22px' }}>
            {avg >= 3.5 ? "You're feeling great — Sam knows!" : 'Thanks. Sam will see this before training.'}
          </div>
        )}
        <button onClick={() => { setCheckinAnswers([]); setCheckinQ(0); setView('home') }} style={{ height: 48, padding: '0 32px', borderRadius: '999px', border: 0, background: '#fff', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 12 }}>Back to home</button>
      </div>
    )
  }

  /* ── CLIP FROM COACH ── */
  if (view === 'clip') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#10211f', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ flex: 'none', padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setView('home')} style={{ width: 36, height: 36, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{ color: '#7cc4ab', fontSize: 14, fontWeight: 700 }}>Clip from Sam</div>
        </div>

        {/* Video */}
        <div onClick={() => setPlayClip(p => !p)} style={{ margin: '0 20px', height: 220, borderRadius: 16, background: '#1f4a3e', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
          {!playClip && (
            <div style={{ width: 60, height: 60, borderRadius: '999px', border: '2px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            </div>
          )}
          {playClip && <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>▶ Playing…</div>}
          <div style={{ position: 'absolute', bottom: 12, right: 14, fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>0:23</div>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Your first touch on the overlap</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: '20px', marginBottom: 20 }}>
            Min 34 · Saturday vs Ironbark. Watch how you let the ball run across your body — that's the touch we've been working on. Really good.
          </div>

          <div style={{ background: '#1f4a3e', borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#7cc4ab', marginBottom: 6 }}>What to notice</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: '20px' }}>
              Your first touch directs the ball into space rather than slowing you down. This is the goal we set last month.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ flex: 1, height: 44, borderRadius: 12, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>👍 Thanks Sam</button>
            <button style={{ height: 44, padding: '0 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Reply</button>
          </div>
        </div>
      </div>
    )
  }

  /* ── MY GOALS ── */
  if (view === 'goals') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: '#1f4a3e', padding: '52px 20px 20px', flex: 'none' }}>
          <button onClick={() => setView('home')} style={{ display: 'flex', alignItems: 'center', gap: 8, border: 0, background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 12 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>My goals</div>
        </div>
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
          {GOALS.map((g, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '16px', marginBottom: 14, border: '1px solid #e9eae8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{g.title}</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#2f6252', background: '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>{g.tag}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: '#f0f1f0', marginBottom: 8 }}>
                <div style={{ height: 8, borderRadius: 4, background: '#2f6252', width: `${g.progress}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6f7f7b' }}>
                <span>{g.note}</span>
                <span style={{ fontWeight: 700, color: '#10211f' }}>{g.progress}%</span>
              </div>
            </div>
          ))}
          {showAddGoal ? (
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>New goal</div>
              <input
                value={newGoalText}
                onChange={e => setNewGoalText(e.target.value)}
                placeholder="What do you want to get better at?"
                style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 12px', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box', marginBottom: 10 }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => { setShowAddGoal(false); setNewGoalText('') }} style={{ flex: 1, height: 36, borderRadius: 10, border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => { setShowAddGoal(false); setNewGoalText('') }} style={{ flex: 2, height: 36, borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Save goal</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowAddGoal(true)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px dashed #c5c8c4', background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>
              + Add my own goal
            </button>
          )}
        </div>
      </div>
    )
  }

  /* ── PARENT VIEW (Mia's week) ── */
  if (view === 'parent') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: '#1f4a3e', padding: '52px 20px 20px', flex: 'none' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Parent view</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Mia's week</div>
        </div>
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Activity strip */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {MIA_EVENTS.map((e, i) => (
              <div key={i} style={{ flex: 1, background: '#fff', borderRadius: 12, padding: '12px', border: '1px solid #e9eae8', textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b', marginBottom: 4 }}>{e.day}</div>
                <div style={{ width: 10, height: 10, borderRadius: '999px', background: e.color, margin: '0 auto 6px' }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f' }}>{e.label}</div>
                <div style={{ fontSize: 10, color: '#6f7f7b', lineHeight: '14px', marginTop: 3 }}>{e.note}</div>
              </div>
            ))}
          </div>

          {/* Wellness summary */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Mia's check-ins this week</div>
            <div style={{ display: 'flex', gap: 24 }}>
              {[{ l: 'Body', v: '😊 Good' }, { l: 'Energy', v: '😪 Bit tired' }, { l: 'Mood', v: '😊 Good' }].map(c => (
                <div key={c.l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18 }}>{c.v.split(' ')[0]}</div>
                  <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{c.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Load card */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Weekly load</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#40826d', background: '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>Safe zone</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: '#f0f1f0', marginBottom: 6 }}>
              <div style={{ height: 8, borderRadius: 4, background: '#40826d', width: '62%' }} />
            </div>
            <div style={{ fontSize: 12, color: '#6f7f7b' }}>62% of her safe limit. Sam is monitoring this every session.</div>
          </div>

          {/* Goals */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Mia's goals</div>
            {GOALS.slice(0, 2).map((g, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: '#10211f', marginBottom: 6 }}>
                  <span>{g.title}</span><span>{g.progress}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: '#f0f1f0' }}>
                  <div style={{ height: 6, borderRadius: 3, background: '#2f6252', width: `${g.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* ── HOME ── */
  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '52px 20px 20px', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U14 Sam · Wattle Creek FC</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Hi Harper</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setView('invite')} style={{ height: 32, padding: '0 12px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'rgba(255,255,255,0.8)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Invite</button>
            <button onClick={() => setView('parent')} style={{ height: 32, padding: '0 12px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'rgba(255,255,255,0.8)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Mia's week →</button>
          </div>
        </div>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
        {/* Check-in prompt */}
        <button onClick={() => setView('checkin')} style={{
          width: '100%', borderRadius: 16, border: 0, background: '#2f6252',
          padding: '18px 20px', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Check in before training</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>Tonight at 6:00 pm · Ash Road ground 1</div>
          </div>
          <div style={{ fontSize: 24 }}>💬</div>
        </button>

        {/* Clip from coach */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>New from Sam</div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#c39797', background: '#fdf4f4', borderRadius: 6, padding: '2px 8px' }}>1 new</span>
          </div>
          <button onClick={() => setView('clip')} style={{
            width: '100%', height: 100, borderRadius: 12, background: '#10211f', border: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: '999px', border: '2px solid rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            </div>
            <div style={{ position: 'absolute', bottom: 10, left: 12, fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Your first touch on the overlap · 0:23</div>
          </button>
        </div>

        {/* Next game */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Next game</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ background: '#1f4a3e', borderRadius: 10, padding: '8px 12px', textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>SAT</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>7</div>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>vs Harbour Rovers</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>Home · kick-off 9:30 am</div>
            </div>
          </div>
        </div>

        {/* Goals */}
        <button onClick={() => setView('goals')} style={{
          width: '100%', background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8',
          fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>My goals</div>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>{GOALS.length} active goals</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
  )
}
