import { useState } from 'react'
import { RaiseConcernView, ConcernSentView, TellSomeoneView, TellHelenView } from './playerapp/SafeguardingFlows'
import ParentView from './playerapp/ParentView'
import ParentChatScreen from './ParentChatScreen'

type PlayerView = 'home' | 'checkin' | 'checkin-sent' | 'clip' | 'goals' | 'parent' | 'parent-avail' | 'parent-chat' | 'young-news' | 'invite' | 'raise-concern' | 'concern-sent' | 'tell-someone' | 'tell-helen'

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
  { title: 'Shoot off my left',            progress: 40, note: 'Sam set this · 2 months ago', tag: 'Finishing' },
  { title: 'Get in behind on the overlap', progress: 25, note: 'Sam set this · 1 month ago',     tag: 'Movement' },
]


export default function PlayerAppScreen({ empty, initialView = 'home' }: { empty?: boolean; initialView?: PlayerView }) {
  const [view, setView] = useState<PlayerView>(initialView)
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

  if (view === 'raise-concern') return <RaiseConcernView onBack={() => setView('parent')} onSent={() => setView('concern-sent')} />
  if (view === 'concern-sent') return <ConcernSentView onBack={() => setView('parent')} />
  if (view === 'tell-someone') return <TellSomeoneView onBack={() => setView('home')} onTellHelen={() => setView('tell-helen')} />
  if (view === 'tell-helen') return <TellHelenView onBack={() => setView('tell-someone')} />

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
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: '#1f4a3e', padding: '52px 20px 20px', flex: 'none' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>Wattle Creek U12</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Hi Mia, welcome!</div>
          <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Waiting for your mum or dad</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>Ask Kate to open the invite from the club. Then Sam can send you clips and check-ins.</div>
          </div>
        </div>
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Your first training</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: '#1f4a3e', borderRadius: 10, padding: '8px 10px', textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>THU</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>4</div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Training</div>
                <div style={{ fontSize: 13, color: '#6f7f7b' }}>5:45 pm · Wattle Creek Reserve · bring water and boots</div>
              </div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Your clips</div>
            <div style={{ fontSize: 14, color: '#6f7f7b', marginBottom: 4 }}>No clips yet</div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: 1.5 }}>After your first game, Sam can send you your best moments here.</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Your goals</div>
            <div style={{ fontSize: 14, color: '#6f7f7b', marginBottom: 4 }}>{"You'll pick your first goal with Sam"}</div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: 1.5 }}>{"Something to work on, like using your weaker foot. You'll see how you're going after every game."}</div>
          </div>
        </div>
        <div style={{ background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', height: 56, flexShrink: 0 }}>
          {([{ label: 'Home', icon: 'M4 11l8-7 8 7v9H4z', active: true }, { label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', active: false }, { label: 'Goals', icon: 'M12 2l2.4 7.4H22l-6.5 4.7 2.5 7.6L12 17l-6 4.7 2.5-7.6L3 9.4h7.6z', active: false }, { label: 'Me', icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8', active: false }]).map(tab => (
            <button key={tab.label} style={{ flex: 1, border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, fontFamily: 'inherit', fontSize: 10, fontWeight: 600, cursor: 'pointer', color: tab.active ? '#2f6252' : '#4a5a57' }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={tab.icon}/></svg>
              {tab.label}
            </button>
          ))}
        </div>
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
                <button onClick={() => { setShowAddGoal(false); setNewGoalText('') }} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => { setShowAddGoal(false); setNewGoalText('') }} style={{ flex: 2, height: 44, borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Save goal</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowAddGoal(true)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px dashed #c5c8c4', background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>
              + Add my own goal
            </button>
          )}
        </div>

        {/* Tell someone (player safeguarding) */}
        <button onClick={() => setView('tell-someone')} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', width: '100%', marginTop: 14 }}>
          <span style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </span>
          <span style={{ flexGrow: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>If something feels wrong</span>
            <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>You can tell someone. You won't be in trouble.</span>
          </span>
        </button>
      </div>
    )
  }

  /* ── PARENT AVAILABILITY ── */
  if (view === 'parent-avail') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: '#1f4a3e', padding: '52px 20px 20px', flex: 'none' }}>
          <button onClick={() => setView('parent')} style={{ display: 'flex', alignItems: 'center', gap: 8, border: 0, background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 12 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek U12 · parent</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Can Mia make it?</div>
        </div>
        {empty ? (
          <div style={{ flexGrow: 1, padding: '28px 20px' }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '24px 20px', border: '1px solid #e9eae8', textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Nothing to answer yet</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.5 }}>{"When Sam adds games and training, you'll get one quick question for each: can Mia make it?"}</div>
            </div>
          </div>
        ) : (
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
            {[
              { day: 'THU', date: 4, tag: 'Tonight', title: 'Training',          note: '5:45 to 7:15 pm · Wattle Creek Reserve' },
              { day: 'SAT', date: 6, tag: '',         title: 'vs Harbour Rovers', note: 'Home · be there 8:40 for 9:30 · white kit' },
              { day: 'TUE', date: 9, tag: '',         title: 'Training',          note: '5:45 to 7:15 pm · Wattle Creek Reserve' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <div style={{ flex: 'none', background: '#1f4a3e', borderRadius: 10, padding: '8px 10px', textAlign: 'center', minWidth: 44 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{s.day}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{s.date}</div>
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    {s.tag && <div style={{ fontSize: 11, fontWeight: 700, color: '#2f6252', marginBottom: 2 }}>{s.tag}</div>}
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px', marginTop: 2 }}>{s.note}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{"Yes, Mia's in"}</button>
                  <button style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{"Can't make it"}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  /* ── PARENT CHAT ── */
  if (view === 'parent-chat') {
    return <ParentChatScreen empty={empty} onBack={() => setView('parent')} />
  }

  /* ── YOUNG NEWS (PK1 — under-15 player news feed) ── */
  if (view === 'young-news') {
    return (
      <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: '#1f4a3e', padding: '44px 20px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setView('home')} style={{ width: 30, height: 30, border: 'none', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>Wattle Creek U12 · from your coach</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>News for Mia</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10211f' }}>MT</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {[
            { from: 'Rob, team manager', time: 'today', subject: 'Be there 8:40 on Saturday', body: 'Pitch 2. White kit.', attach: { label: 'Pitch 2, Wattle Creek Reserve', note: 'Mum has the directions' } },
            { from: 'Sam, your coach', time: 'today', subject: '14 juggles is a new best!', body: 'Sam saw your video. Can you get to 15 by Thursday?', attach: null },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '14px', border: '1px solid #e9eae8', marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: '#4a5a57', marginBottom: 4 }}>{item.from} · {item.time}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>{item.subject}</div>
              <div style={{ fontSize: 14, color: '#10211f', marginBottom: item.attach ? 10 : 0 }}>{item.body}</div>
              {item.attach && (
                <div style={{ display: 'flex', gap: 8, padding: '8px 10px', background: '#f5f6f4', borderRadius: 10, alignItems: 'center' }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: '#5a7a6e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7zM12 9a2 2 0 100-4 2 2 0 000 4"/></svg>
                  </div>
                  <div><div style={{ fontSize: 12, fontWeight: 600, color: '#10211f' }}>{item.attach.label}</div><div style={{ fontSize: 11, color: '#4a5a57' }}>{item.attach.note}</div></div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {['👍', '😀', '⚽'].map(emoji => (
                  <button key={emoji} style={{ width: 40, height: 40, borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontSize: 18, cursor: 'pointer' }}>{emoji}</button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: '#4a5a57', textAlign: 'center', lineHeight: 1.5, marginBottom: 10 }}>No chat until you're 15. You get news from your coach here. Mum or Dad writes for you.</div>
          <button onClick={() => setView('tell-someone')} style={{ display: 'block', width: '100%', textAlign: 'center', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#2f6252', padding: '4px 0' }}>Something not right? You can tell someone</button>
        </div>
        <div style={{ background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', height: 56, flexShrink: 0 }}>
          {([{ label: 'Home', icon: 'M4 11l8-7 8 7v9H4z' }, { label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' }, { label: 'Goals', icon: 'M12 2l2.4 7.4H22l-6.5 4.7 2.5 7.6L12 17l-6 4.7 2.5-7.6L3 9.4h7.6z' }, { label: 'Me', icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8' }]).map(tab => (
            <button key={tab.label} onClick={() => setView('home')} style={{ flex: 1, border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, fontFamily: 'inherit', fontSize: 10, fontWeight: 600, cursor: 'pointer', color: tab.label === 'Home' ? '#2f6252' : '#4a5a57' }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={tab.icon}/></svg>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  /* ── PARENT VIEW (Mia's week) ── */
  if (view === 'parent') {
    return <ParentView onAvailability={() => setView('parent-avail')} onRaiseConcern={() => setView('raise-concern')} />
  }

  /* ── HOME ── */
  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '52px 20px 20px', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek U12</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Hi Mia</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#10211f' }}>MT</div>
        </div>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 16px 24px' }}>
        {/* Next game */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ background: '#1f4a3e', borderRadius: 10, padding: '8px 12px', textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>SAT</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>6</div>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>vs Harbour Rovers</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>Home · kick-off 9:30 · be there 8:40</div>
            </div>
          </div>
        </div>

        {/* Check-in prompt */}
        <button onClick={() => setView('checkin')} style={{
          width: '100%', borderRadius: 14, border: 0, background: '#2f6252',
          padding: '16px 18px', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
          display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12,
        }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>How are you feeling?</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>3 quick questions before training tonight</div>
        </button>

        {/* Clip from coach */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>New from Sam</div>
          <button onClick={() => setView('clip')} style={{
            width: '100%', borderRadius: 10, background: '#10211f', border: 0,
            padding: '12px 14px', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Your goal vs Ironbark</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>0:09</div>
            </div>
          </button>
          <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px', fontStyle: 'italic' }}>"Left foot, low across the keeper. That's your goal working!"</div>
        </div>

        {/* Goals */}
        <button onClick={() => setView('goals')} style={{
          width: '100%', background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8',
          fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left', marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>My goals</div>
            <span style={{ fontSize: 11, color: '#6f7f7b' }}>1 done, 1 going</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, color: '#10211f' }}>Use my left foot more</span>
                <span style={{ color: '#6f7f7b' }}>18%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: '#f0f1f0' }}>
                <div style={{ height: 6, borderRadius: 3, background: '#2f6252', width: '18%' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ fontWeight: 600, color: '#10211f' }}>Look before the ball comes</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: 6, padding: '2px 8px' }}>Done</span>
            </div>
          </div>
        </button>

        {/* After-training check-in */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>After training: how was it?</div>
          <div style={{ fontSize: 12, color: '#6f7f7b' }}>3 quick taps, opens at 7:15 pm</div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', height: 56, flexShrink: 0 }}>
        {([
          { label: 'Home',  icon: 'M4 11l8-7 8 7v9H4z',                                               active: true },
          { label: 'Clips', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z',                 active: false },
          { label: 'Goals', icon: 'M12 2l2.4 7.4H22l-6.5 4.7 2.5 7.6L12 17l-6 4.7 2.5-7.6L3 9.4h7.6z', active: false },
          { label: 'Me',    icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8', active: false },
        ]).map(tab => (
          <button key={tab.label} style={{ flex: 1, border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, fontFamily: 'inherit', fontSize: 10, fontWeight: 600, cursor: 'pointer', color: tab.active ? '#2f6252' : '#4a5a57' }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={tab.icon}/></svg>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
